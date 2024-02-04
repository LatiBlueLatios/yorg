import { Config } from "../../../global/Config.js";
import Timer from "../../../global/Timer.js";

class StatDisplayUI {
    constructor(root, uiGroup) {
        this.uiGroup = uiGroup;
        this.root = root;
        this.init();
        this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
            this.root.signals.gameLoadedAndStarted.add(this.onLoaded, this),
            this.root.signals.gameReload.add(this.onLoaded, this);
    }

    tutorialGetPosition() {
        return [this.root.phaser.width / 2, this.panelGroup.y + 30];
    }

    init() {
        const phaser = this.root.phaser;
        this.lastGemCount = null;
    
        this.uiGroup.add(this.fixedGroup = phaser.make.group());
        this.fixedGroup.fixedToCamera = true;
    
        this.fixedGroup.add(this.panelGroup = phaser.make.group());
        this.panelGroupWidth = 250;
        this.panelGroup.y = 0;
    
        const gemImage = phaser.make.image(this.panelGroupWidth / 2, 74, "atlas", "gem.png");
        gemImage.width = 20 * phaser.resolution;
        gemImage.height = 20 * phaser.resolution;
        gemImage.anchor.setTo(0.5, 0.5);
        this.panelGroup.add(gemImage);
    
        this.gems = phaser.make.text(0, 0, "0", {
            font: "60px Roboto",
            fill: "#fff",
            align: "center",
            boundsAlignH: "center",
            fontWeight: 300,
        });
        this.gems.setTextBounds(0, 0, this.panelGroupWidth, 40);
        this.panelGroup.add(this.gems);
    
        this.gamemodeText = phaser.make.text(0, 0, "", {
            font: "14px Roboto",
            fill: "#fff",
            align: "center",
            boundsAlignH: "center",
            fontWeight: 700,
        });
        this.gamemodeText.setTextBounds(0, -8, this.panelGroupWidth, 40);
        this.panelGroup.add(this.gamemodeText);
    
        this.updateTimer = Timer.makeFromIntervalMs(100);
        this.updateAnimTimer = Timer.makeFromIntervalMs(1000);
        this.averageGemsPerSecond = 0;
    }    

    onLoaded() {
        this.gamemodeText.setText(this.root.gamemode.getTitle().toUpperCase(), true), (this.gamemodeText.tint = this.root.gamemode.getColor());
    }

    onResolutionChanged(e) {
        (this.panelGroup.x = (e - this.panelGroupWidth) / 2), (this.panelGroup.y = Config.ui.screenBorderTop);
    }

    update() {
        for (var e = this.root.stats.gems; this.updateTimer.takeTick(this.root.time.nowConsistent, true);) this.doUpdate();
        for (; this.updateAnimTimer.takeTick(this.root.time.nowConsistent, true);)
            if (null === this.lastGemCount) this.lastGemCount = e;
            else if (e !== this.lastGemCount) {
                var t = e - this.lastGemCount;
                this.addGemGainAnim(t), (this.lastGemCount = e);
            }
    }

    doUpdate() {
        if (this.root.gamemode && this.root.gamemode.isSandbox()) this.gems.setText("∞", true);
        else {
            var e = this.root.stats.gems;
            e < 1e3 ? this.gems.setText(e.toString(), true) : this.gems.setText(formatBigNumber(e), true);
        }
    }

    addGemGainAnim(e) {
        if (!this.root.gamemode || !this.root.gamemode.isSandbox()) {
            var t = null, i = (e >= 0 ? "+" : "-") + formatBigNumber(Math.abs(e)).padStart(this.gems.text.length - 1, " ");
            this.panelGroup.add((t = this.root.phaser.make.text(0, 90, i, { font: "20px Roboto Mono", fill: "#f4415c", align: "center", boundsAlignH: "center" }))),
                t.setTextBounds(0, 0, this.panelGroupWidth, 20),
                this.root.animations
                    .animate(t)
                    .to({ y: 65, alpha: 0 }, 500)
                    .onDone(function () {
                        t.destroy();
                    }, this)
                    .uiAnim();
        }
    }
}

export default StatDisplayUI;