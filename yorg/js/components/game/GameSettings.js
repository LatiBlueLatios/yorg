import { META_GAME_SETTINGS } from "../../global/Config.js";

class GameSettings {
    constructor(root) {
        this.root = root;
        this.loadSettings();
    }

    updateSetting(e, t) {
        var i = !!t,
            a = "setting_" + e;
        this.root.persistent.setBool(a, i),
            (this[e] = i),
            console.log("[SETTINGS] Changed", e, "to", i);
    }

    loadSettings() {
        const e = this;
        META_GAME_SETTINGS.forEach(function (t) {
            t.settings.forEach(function (t) {
                var i = t.id,
                    a = t.defaultValue,
                    o = "setting_" + i,
                    n = e.root.persistent.getBool(o, a);
                e[i] = n;
            });
        });
    }
}

export default GameSettings;