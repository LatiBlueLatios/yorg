import StatDisplayUI from './components/UiStats.js';
import BuildingTooltipUI from './components/UiBuildingTooltip.js';

class GUI {
    constructor(root) {
        this.root = root;
        this.init();
    }

    init() {
        this.uiGroup = this.root.phaser.add.group(null, "gui");
        this.uiGroup.smoothed = false;
        this.visualizerInstances = [];
        this.viewInstances = [];
        this.menuButtonInstances = [];

        this.uiStatDisplay = new StatDisplayUI(this.root, this.uiGroup);

        this.uiBuildingTooltip = new BuildingTooltipUI(this.root, this.uiGroup);
        this.uiBaseIndicator = new BaseDirectionIndicatorUI(this.root, this.uiGroup);

        this.uiCurrentlyPlacing = new CurrentlyPlacingUI(this.root, this.uiGroup);
        this.uiTimeUntilZombies = new TimeUntilZombiesUI(this.root, this.uiGroup);
        this.uiGameTimeButtons = new GameTimeButtonsUI(this.root, this.uiGroup);
        this.createVisualizers();
        this.createViews();
        this.zoombuttonsUi = new ZoomButtonsUI(this.root, this.uiGroup);
        this.menuButtonsUi = new MenuButtonBarUI(this.root, this.uiGroup);
        this.uiBuildingsDisplay = new BuildingsDisplayUI(this.root, this.uiGroup);
        this.uiBuildingsDisplay.onSelectBuilding.add((t) => this.uiCurrentlyPlacing.selectBuilding(t));
        this.uiMinimap = new MinimapUI(this.root, this.uiGroup);
        this.uiDayNight = new DayNightOverlay(this.root, this.uiGroup);


        this.unlockTips = new UnlockTipsManager(this.root);
        this.gestures = new MovementGestureUI(this.root, this.uiGroup);
        this.uiUpgradeSellMode = new UpgradeSellModeUI(this.root, this.uiGroup);

        this.uiChat = new IngameChat(this.root, this.uiGroup);

        this.uiGlobalUpgradesDialog = new GlobalUpgradesDialog(this.root, this.uiGroup);
        this.uiNotifications = new GameNotificationsUI(this.root);

        this.uiBuildingTooltip.unusedMouseDown.add(this.gestures.onGestureStart, this.gestures);
        this.uiBuildingTooltip.unusedMouseUp.add(this.gestures.onGestureEnd, this.gestures);

        this.uiDebugOverlay = new DebugOverlayUI(this.root, this.uiGroup);


        this.uiFPS = new FPSDisplayUI(this.root, this.uiGroup);
        this.uiTutorial = new TutorialUI(this.root, this.uiGroup);
        this.uiPauseOverlay = new PauseOverlayUI(this.root, this.uiGroup);

        this.updateAdvancedUIVisibility();
    }

    updateAdvancedUIVisibility() {
        console.log("[UI] Updating advanced ui visibility"),
            this.root.settings.enableAdvancedUi
                ? (this.visualizerInstances.forEach(function (e) {
                    return e.show();
                }),
                    this.viewInstances.forEach(function (e) {
                        return e.show();
                    }))
                : (this.visualizerInstances.forEach(function (e) {
                    return e.hide();
                }),
                    this.viewInstances.forEach(function (e) {
                        return e.hide();
                    })),
            (this.lastAdvancedUiVisibility = this.root.settings.enableAdvancedUi);
    }

    initToggling() {
        var e = this, t = this.root.phaser.add.group(), i = this.root.phaser.make.text(Config.ui.screenBorder, Config.ui.screenBorder, keyToString(Config.keys.toggleGui) + ": " + tr("toggle_gui"), { font: "12px Roboto", fill: "#eee" });
        (t.fixedToCamera = true),
            t.add(i),
            (this.toggleHint = t),
            (this.toggleHint.visible = false),
            this.root.keyboard.addKey(Config.keys.toggleGui).onDown.add(function () {
                e.root.gameStarted && e.toggleVisibility();
            }),
            this.toggleVisibility(),
            this.root.signals.gameLoadedAndStarted.add(this.toggleVisibility, this);
    }

    isVisible() {
        return this.uiGroup.visible;
    }

    toggleVisibility() {
        console.log("[UI] Toggling");
        var e = !this.uiGroup.visible;
        e ? ((this.uiGroup.visible = true), (this.uiGroup.renderable = true)) : ((this.uiGroup.visible = false), (this.uiGroup.renderable = false)),
            (this.toggleHint.visible = this.root.gameStarted && !this.uiGroup.visible),
            ["leaderboard", "beta_overlay", "report_bug_button", "fps_overlay", "debug_overlay", "notifications_area", "component_inspector"].forEach(function (t) {
                try {
                    document.getElementById(t).style.visibility = e ? "visible" : "hidden";
                } catch (e) { }
            });
    }

    createViews() {
        var e = this;
        [DefenseViewUI, TransportViewUI, ProcessorUsageViewUI].forEach(function (t, i) {
            e.viewInstances.push(new t(e.root, e.uiGroup, i));
        });
    }

    createVisualizers() {
        var e = this, t = [RecomputingNetworkHintUI, GoldIncomeVisualizerUI, DefenseVisualizerUI, ResourceVisualizerUI], i = Config.ui.screenBorder;
        t.reverse().forEach(function (t) {
            var a = new t(e.root, e.uiGroup, i);
            (i += a.height + Config.ui.visualizerSpacing), e.visualizerInstances.push(a);
        });
    }

    getVisualizerByClass(e) {
        return this.visualizerInstances.find(function (t) {
            return t instanceof e;
        });
    }

    update() {
        this.root.settings.enableAdvancedUi !== this.lastAdvancedUiVisibility && this.updateAdvancedUIVisibility(),
            this.uiStatDisplay && this.uiStatDisplay.update(),
            this.unlockTips.update(),
            this.uiCurrentlyPlacing.update(),
            Config.showDebugOverlay && this.uiDebugOverlay.update(),
            this.uiFPS && this.uiFPS.update(),
            this.uiBuildingTooltip.update(),
            Config.spawnDefaultBuildings ||
            (this.uiDayNight.update(),
                this.uiMinimap.update(),
                this.uiBuildingsDisplay.update(),
                this.uiBaseIndicator.update(),
                this.uiTimeUntilZombies.update(),
                this.visualizerInstances.forEach(function (e) {
                    return e.update();
                }),
                this.viewInstances.forEach(function (e) {
                    return e.update();
                }),
                this.menuButtonsUi.update(),
                this.uiGameTimeButtons.update()),
            this.gestures.update();
    }
}

export default GUI;