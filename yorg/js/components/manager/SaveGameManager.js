import { Base64 } from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.5/base64.mjs';

class SaveGameManager {
    constructor(root) {
        this.root = root;
        this.savegames = [];
        this.activeSavegameId = null;
        this.loadSavegames();

        window.deleteSavegame = e => {
            return this.deleteSavegame(e);
        }
        window.exportSavegame = e => {
            return this.exportSavegame(e);
        }
        window.restoreSavegame = e => {
            return this.restoreSavegame(e);
        }
        window.importSavegame = e => {
            return this.importSavegame(e);
        }

        this.initDropFallback();
    }

    initDropFallback() {
        document.body.ondrop = e => {
            e.preventDefault();
        }

        document.body.ondragover = e => {
            e.preventDefault();
        };
    }

    deleteSavegame(saveIdToDelete) {
        console.log("Deleting:", saveIdToDelete);
    
        const saveIndex = this.savegames.findIndex(save => save.id === saveIdToDelete);
    
        if (saveIndex !== -1) {
            const removedSave = this.savegames.splice(saveIndex, 1)[0];
            this.root.persistent.remove(`savegame_blob_${saveIdToDelete}`);
            this.root.persistent.remove(`savegame_preview_${saveIdToDelete}`);
            this.updateMetadata();
    
            const savegameDiv = document.getElementById(`savegame_div_${saveIdToDelete}`);
            if (savegameDiv) {
                savegameDiv.classList.add("removed");
            }
    
            if (saveIdToDelete === this.activeSavegameId) {
                this.activeSavegameId = null;
            }
    
            this.root.signals.uiActionPerformed.dispatch();
        } else {
            console.error("[SAVEGAME] Game with id", saveIdToDelete, "not found!");
        }
    }    

    exportSavegame(e) {
        download("yorgio-savegame.bin", this.getBlob(e));
    }

    restoreSavegame(e) {
        const t = this.getBlob(e);
        t ? (this.root.serializer.load(t), this.activeSavegameId = e, console.log("[SAVEGAME] Restored", this.activeSavegameId), window.closeDialog("savegame_bg")) : console.error("[SAVEGAME] Blob not found!");
    }

    importSavegame(e) {
        window.closeDialog("savegame_bg");
        window.showDialog("load_game_dialog_bg");

        const dropArea = document.getElementById("load_game_dragdrop_area");
        dropArea.classList.remove("acceptDrag");

        dropArea.ondrop = (event) => {
            window.closeDialog("load_game_dialog_bg");
            event.preventDefault();

            const fileList = event.dataTransfer.items || event.dataTransfer.files;
            const file = Array.from(fileList).find((item) => item.kind === "file")?.getAsFile();

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (e) {
                        window.startGame(true);
                        console.warn("[SAVEGAME] Starting SAVEGAME!");
                        console.warn("[ALERT] Custom WARN Message by BlueLatios!")
                    }
                    if (this.root.serializer.load(reader.result)) {
                        this.activeSavegameId = null;
                        this.saveGame();
                    }
                };
                reader.readAsText(file);
            }
        };

        dropArea.ondragenter = () => {
            dropArea.classList.add("acceptDrag");
        };

        dropArea.ondragleave = () => {
            dropArea.classList.remove("acceptDrag");
        };

        dropArea.ondragover = (event) => {
            event.preventDefault();
        };
    }

    getMetadataById(e) {
        for (let t = 0; t < this.savegames.length; ++t)
            if (this.savegames[t].id === e)
                return this.savegames[t];
        return null;
    }

    showDialog() {
        const e = this;
        let t = "";
        this.savegames.forEach(i => {
            i.id === e.activeSavegameId && (t += e.generateSavegameHTML(i, true));
        }), this.savegames.forEach(i => {
            i.id !== e.activeSavegameId && (t += e.generateSavegameHTML(i));
        }), 0 === this.savegames.length && (t += tr("no_savegames_yet")), document.getElementById("savegames_list").innerHTML = t, window.showDialog("savegame_bg");
    }

    generateSavegameHTML({
        id,
        time,
        day,
        gamemode
    }, t = false, i = true) {
        const s = secondsToDuration((new Date().getTime() - time) / 1000);
        const l = `savegame_img_id_${id}`;
        const u = this.getImageData(id);
        const c = `&nbsp; <button class="dialog_button restore_savegame" onclick="window.${i ? "restoreSavegame" : "requestRestoreSavegameOutgame"}('${id}')"></button>`;

        return `<div class="savegame ${t ? "active" : ""}" id="savegame_div_${id}">
                <img class="savegame_preview" id="${l}" src="${u}">
                <div class="savegame_stats">
                  <strong class="sv_stat sv_day"><i>Day</i>${day}</strong>
                  <strong class="sv_stat sv_base"><i>Saved</i>${s}</strong>
                  <strong class="sv_stat sv_gamemode"><i>Mode</i>${tr("gamemode_" + gamemode)}</strong>
                </div>
                <div class="delete_savegame_confirm" id="sv_confirm_delete_${id}">
                  ${tr("delete_savegame_warning")}<br />
                  <button class="dialog_button cancel" onclick="window.deleteSavegame('${id}')">${tr("delete_savegame")}</button>
                  <button class="dialog_button" onclick="document.getElementById('sv_confirm_delete_${id}').classList.remove('visible')">${tr("keep_savegame")}</button>
                </div>
                <div class="savegame_actions">
                  <span class="delete_savegame" onclick="document.getElementById('sv_confirm_delete_${id}').classList.add('visible')"></span>
                  ${i ? `<span class="export_savegame" onclick="window.exportSavegame('${id}')"></span>` : ""}
                  ${c}
                </div>
              </div>`;
    }

    getImageData(e) {
        const t = this.root.persistent.getString("savegame_preview_" + e, "");
        return t.length > 0 ? t : this.rebuildImageData(e);
    }

    rebuildImageData(e) {
        console.log("[SAVEGAMES] Generating preview for", e);
        const t = this.root.serializer.generatePreview(this.getBlob(e));
        return t ? (this.root.persistent.setString("savegame_preview_" + e, t), t) : (console.warn("Preview was null. Unable to set preview"), i(449));
    }

    saveGame() {
        const e = this.root.serializer.getLastSavegame();
        if (this.activeSavegameId) {
            console.log("[SAVEGAMES] Updating savegame:", this.activeSavegameId);
            const t = this.getMetadataById(this.activeSavegameId);
            t.time = (new Date).getTime(), t.day = this.root.daytime.getDay(), this.root.gui.uiNotifications.showLongSuccess(tr("existing_savegame_updated"));
        } else {
            const i = this.generateSavegameId();
            console.log("[SAVEGAMES] Creating new savegame:", i);
            const a = {
                id: i,
                time: (new Date).getTime(),
                day: this.root.daytime.getDay(),
                gamemode: this.root.gamemode.getId()
            };
            this.savegames.unshift(a), this.activeSavegameId = i, this.root.gui.uiNotifications.showLongSuccess(tr("new_savegame_created"));
        }
        this.storeBlob(this.activeSavegameId, e), this.updateMetadata(), this.rebuildImageData(this.activeSavegameId);
    }

    generateSavegameId() {
        return Base64.encode((new Date).getTime() + "-" + randomInt(1e5, 1e6 - 1)).replace("=", "A").replace("=", "B");
    }

    storeBlob(e, t) {
        this.root.persistent.setString("savegame_blob_" + e, t);
    }

    getBlob(e) {
        return this.root.persistent.getString("savegame_blob_" + e, "");
    }

    updateMetadata() {
        const e = JSON.stringify(this.savegames);
        this.root.persistent.setString("savegame_metadata", e);
    }

    loadSavegames() {
        const e = this.root.persistent.getString("savegame_metadata", "");
        if (e.length < 1)
            return console.log("[SAVEGAMES] No stored savegames found"), void this.updateMetadata();
        let t = {};
        try {
            t = JSON.parse(e);
        } catch (e) {
            return void console.error("[SAVEGAMES] Failed to parse JSON:", e);
        }
        console.log("[SAVEGAMES] Found", t.length, "stored savegames"), this.savegames = t;
    }
}

export default SaveGameManager;