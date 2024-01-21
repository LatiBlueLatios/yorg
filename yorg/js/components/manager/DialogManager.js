class DialogManager {
    constructor(root) {
        this.root = root;
        this.cachedStatus = false;

        this.root.signals.consistentGameUpdate.add(function () {
            this.cachedStatus = this.computeDialogIsOpen();
        })
        window.addEventListener("keydown", function (e) {
            return this.handleKeyDown(e);
        });

        var a = window.showDialog;
        window.showDialog = function (e) {
            a(e), this.root.keyboard.stop();
        };

        var o = window.closeDialog;
        window.closeDialog = function (e) {
            o(e), this.root.keyboard.start();
        };
    }

    modalDialogIsOpen() {
        return this.cachedStatus;
    }

    getOpenDialog() {
        const e = document.querySelector(".dialog_overlay_bg.visible_dialog");
        return e && "tutorial_bg" === e.id ? null : e;
    }

    computeDialogIsOpen() {
        if (this.getOpenDialog()) return true;
        const e = this.root.gui.uiGlobalUpgradesDialog;
        return !(!e || !e.isDialogOpen());
    }
    
    handleKeyDown(e) {
        if (27 === e.keyCode) {
            const t = this.getOpenDialog();
            t && window.closeDialog(t.id);
        }
    }
}

export default DialogManager;