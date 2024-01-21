import exports from "./js/components/exportDir.js";
import { Config } from "./js/global/Config.js";

function makeTiled(game, t, i = 1, a = 3618615, o = 1) {
    const n = game.make.graphics();
    n.beginFill(a, o);
    n.drawRect(0, 0, t, i);
    n.drawRect(0, t - i, t, i);
    n.drawRect(0, i, i, t - 2 * i);
    n.drawRect(t - i, i, i, t - 2 * i);
    const s = n.generateTexture();
    return game.make.tileSprite(0, 0, Config.tileSize * Config.numTilesX, Config.tileSize * Config.numTilesY, s);
}

class MouseTracker {
    constructor(phaser) {
        this.leftButtonDown = false;
        this.rightButtonDown = false;
        this.enabled = false;

        phaser.canvas.addEventListener("mousedown", e => this.handleMouseChange(e, true), true);
        window.addEventListener("mousemove", e => this.handleMouseMove(e), true);
        window.addEventListener("mouseup", e => this.handleMouseChange(e, false), true);

        window.addEventListener("touchmove", e => this.handleTouchMove(e), true);
        phaser.canvas.addEventListener("touchstart", e => this.handleTouchClick(e, true), true);
        window.addEventListener("touchend", e => this.handleTouchClick(e, false), true);

        this.onMouseMove = new Phaser.Signal();
        this.onMouseDown = new Phaser.Signal();
        this.onMouseUp = new Phaser.Signal();
    }

    onFocusLost() {
        console.log("[MOUSE] Lost focus");
        this.leftButtonDown = false;
        this.rightButtonDown = false;
    }

    handleMouseChange(e, t) {
        this.handleMouseMove(e),
            (3 !== e.which && 2 !== e.button) || (this.rightButtonDown = t),
            (1 !== e.which && 0 !== e.button) || (this.leftButtonDown = t),
            this.enabled && (t ? this.onMouseDown.dispatch() : this.onMouseUp.dispatch());
    }

    handleTouchClick(e, t) {
        this.enabled && this.handleTouchMove(e), t ? this.onMouseDown.dispatch() : this.onMouseUp.dispatch();
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.enabled && this.onMouseMove.dispatch();
    }

    handleTouchMove(e) {
        if (!(e.touches.length < 1)) {
            for (var t = 0, i = 0, a = 0; a < e.touches.length; ++a) {
                var o = e.touches[a];
                (t += o.clientX), (i += o.clientY);
            }
            var n = e.touches.length;
            this.mouseX = t / n;
            this.mouseY = i / n;
            this.enabled && this.onMouseMove.dispatch();
        }
    }

    getPosition() {
        return { x: this.mouseX, y: this.mouseY };
    }

    static register(t) {
        window.mouseTracker = new MouseTracker(t);
    }
}

class Root {
    constructor(phaser) {
        this.stats = null;
        this.phaser = phaser;
        this.gui = null;
        this.logic = null;
        this.map = null;
        this.particles = null;
        this.gameSystems = null;
        this.entityMgr = null;
        this.daytime = null;
        this.waveMgr = null;
        this.perfStats = null;
        this.animations = null;
        this.time = null;
        this.serializer = null;
        this.syncer = null;
        this.persistent = null;
        this.leaderboard = null;
        this.dialogs = null;
        this.zoom = null;
        this.sound = null;
        this.settings = null;
        this.focus = null;
        this.api = null;
        this.mouseTracker = null;
        this.inputManager = null;
        this.culling = null;
        this.savegames = null;
        this.gamemode = null;
        this.gameStarted = false;
        this.adRunning = false;
        this.externalAdRunning = false;

        this.groups = {
            gameRootGroup: null,
            mapBordersGroup: null,
            pathfindingVisGroup: null,
            compatibleResourcesVisGroup: null,
            glowGroup: null,
            destroyedBuildingsGroup: null,
            connectionsGroup: null,
            particlesGroup: null,
            wallBordersGroup: null,
            resourcesParentBaseGroup: null,
            buildingsGroup: null,
            enemiesGroup: null,
            explosionsGroup: null,
            projectilesGroup: null,
            defensiveViewGroup: null,
            transportViewGroup: null,
            nodeGraphGroup: null,
            processorUsageViewGroup: null,
            zombieHeatmapGroup: null,
            mapFog: null,
        };

        this.componentInspector = null;

        this.signals = {
            gameSizeChanged: new Phaser.Signal(),
            gameOver: new Phaser.Signal(),
            mapLayoutChanged: new Phaser.Signal(),
            nightEntered: new Phaser.Signal(),
            nightEnded: new Phaser.Signal(),
            playerBasePlaced: new Phaser.Signal(),
            buildingPlaced: new Phaser.Signal(),
            buildingDestroyed: new Phaser.Signal(),
            buildingUpgraded: new Phaser.Signal(),
            buildingSold: new Phaser.Signal(),
            gameLoadedAndStarted: new Phaser.Signal(),
            actionPerformed: new Phaser.Signal(),
            mapDragged: new Phaser.Signal(),
            consumerNetworkRecomputed: new Phaser.Signal(),
            consistentGameUpdate: new Phaser.Signal(),
            viewSelected: new Phaser.Signal(),
            zoomLevelChanged: new Phaser.Signal(),
            uiActionPerformed: new Phaser.Signal(),
            uiActionPerformedAndFailed: new Phaser.Signal(),
            uiSkillMarkedForLevelUp: new Phaser.Signal(),
            uiNotificationDialogOpened: new Phaser.Signal(),
            skillLeveledUp: new Phaser.Signal(),
            gameFocusChanged: new Phaser.Signal(),
            gameReset: new Phaser.Signal(),
            gameReload: new Phaser.Signal(),
        };
    }

    get keyboard() {
        return this.phaser.input.keyboard;
    }
}

class BootState extends Phaser.State {
    constructor() {
        super();
    }

    init() {
        this.stage.backgroundColor = "#333";
    }

    preload() {
        const e = this;
        this.load.atlas("atlas", 'yorg-atlas.png');
        this.load.onLoadComplete.add(function () {
            console.log("Atlas loaded at", Math.floor(performance.now())),
                setTimeout(() => {
                    e.state.start("Game", true, false);
                }, 100);
        });
    }
}

class GameState extends Phaser.State {
    constructor() {
        super();
    }

    initGameEngine() {
        const {
            numTilesX,
            numTilesY,
            tileSize,
            roundPixels,
        } = Config;

        this.game.world.setBounds(0, 0, numTilesX * tileSize, numTilesY * tileSize);
        this.game.renderer.roundPixels = roundPixels;
        this.game.renderer.renderSession.roundPixels = roundPixels;
        this.game.stage.disableVisibilityChange = true;
        this.game.stage.smoothed = false;
        this.game.scale.setShowAll();
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.fullScreenTarget = document.documentElement;

        window.addEventListener("resize", () => {
            this.onResized();
        })

        this.game.canvas.mozOpaque = true;
        this.game.canvas.webkitOpaque = true;
        this.game.canvas.opaque = true;
    }

    onResized() {
        const e = window.innerWidth;
        const t = window.innerHeight;
        this.game.scale.setGameSize(e, t);
        this.game.scale.refresh();
        this.root.signals.gameSizeChanged.dispatch(e, t);

        // Enable image smoothing to improve rendering quality.
        const context = this.game.renderer.context;
        context.mozImageSmoothingEnabled = true;
        context.oImageSmoothingEnabled = true;
        context.webkitImageSmoothingEnabled = true;
        context.msImageSmoothingEnabled = true;
        context.imageSmoothingEnabled = true;
    }

    makeBackground() {
        this.game.stage.backgroundColor = "#333";
        const gameBgGroup = this.game.add.group();
        this.root.groups.gameRootGroup.add(gameBgGroup);

        const tiledSprite = makeTiled(this.game, Config.tileSize);
        gameBgGroup.add(tiledSprite);
    }

    initGroups() {
        [
            ["mapBordersGroup", null],
            ["pathfindingVisGroup", null],
            ["compatibleResourcesVisGroup", null],
            ["glowGroup", 200],
            ["destroyedBuildingsGroup", Config.tileSize],
            ["connectionsGroup", Config.radius.transporter * Config.tileSize],
            ["particlesGroup", null],
            ["wallBordersGroup", Config.radius.transporter * Config.tileSize],
            ["resourcesParentBaseGroup", null],
            ["defensiveViewGroup", null],
            ["projectilesGroup", null],
            ["buildingsGroup", Config.tileSize],
            ["enemiesGroup", null],
            ["explosionsGroup", null],
            ["transportViewGroup", null],
            ["nodeGraphGroup", null],
            ["processorUsageViewGroup", null],
            ["zombieHeatmapGroup", null],
            ["mapFog", null],
        ].forEach(([name, radius]) => {
            const group = this.game.add.group(this.root.groups.gameRootGroup, radius);
            this.root.groups[name] = group;
            if (radius) {
                group.cullingRadius = radius;
            }
        });
    }

    onZoomLevelChanged(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            i = 1 / e;
        this.game.world.setBounds(0, 0, Math.floor(Config.numTilesX * Config.tileSize * i), Math.floor(Config.numTilesY * Config.tileSize * i)), (this.root.groups.gameRootGroup.scale = i), t && this.onResized();
    }

    initResourceParticleGroups() {
        const { registerSpecialGroup } = this.root.particles;

        const i = this.root.groups.resourcesParentBaseGroup;
        registerSpecialGroup(MetaTree.name, i);
        registerSpecialGroup(MetaGoldOre.name, i);
        registerSpecialGroup(MetaUraniumOre.name, i);
        registerSpecialGroup(MetaIronOre.name, i);

        const a = this.root.groups.explosionsGroup;
        registerSpecialGroup(MetaCannonExplosionParticle.name, a);
        registerSpecialGroup(MetaEnemyExplosionParticle.name, a);

        LEVEL_TO_PARTICLE.forEach((i) => {
            t.registerSpecialGroup(i.name, e.root.groups.explosionsGroup);
        });

        const o = this.root.groups.projectilesGroup;
        registerSpecialGroup(MetaCannonProjectile.name, o);
        registerSpecialGroup(MetaLightningParticle.name, o);
        registerSpecialGroup(MetaPlayerBaseProjectile.name, o);
        registerSpecialGroup(MetaArrowProjectile.name, o);
        registerSpecialGroup(MetaCriticalHitParticle.name, a);
    }

    create() {
        console.log("Game loaded at", Math.floor(performance.now()));
        this.initGameEngine();

        // Create Root and groups
        this.root = new Root(this.game);
        this.root.groups.gameRootGroup = this.game.add.group(null, "gameRootGroup");
        this.game.rootRecursiveRef = this.root;

        // Initialize various components
        this.makeBackground();
        this.initGroups();
        this.root.time = new exports.gameTime();
        this.root.persistent = new exports.persistentStorage();
        this.root.savegames = new exports.saveGameManager(this.root);
        this.root.settings = new exports.gameSettings(this.root);
        this.root.dialogs = new exports.dialogManager(this.root);
        this.root.zoom = new exports.zoomManager(this.root);
        this.root.culling = new exports.cullManager(this.root);
        this.root.inputManager = new exports.inputManager(this.root);
        this.root.focus = new exports.gameFocus(this.root);

        // Add event listeners
        this.root.signals.zoomLevelChanged.add(this.onZoomLevelChanged, this);
        this.root.signals.gameOver.add(() => this.onGameOver());

        // Initialize systems and managers
        // All of these need to be filled out
        this.root.gameSystems = new exports.gameSysManager(this.root);
        this.root.entityMgr = new exports.entityManager(this.root);
        this.root.daytime = new exports.dayTimeManager(this.root);
        this.root.waveMgr = new exports.waveManager(this.root);
        this.root.api = new exports.onlineAPI(this.root);
        this.root.stats = new exports.stats();
        this.root.perfStats = new exports.perfStats(this.root);

        // Replace with Phaser's built in stuff
        // this.root.animations = new AnimationManager(this.root);

        this.root.map = new exports.map(this.root);

        function connectSignals(e, t) {
            e.add(t.dispatch, t);
        }
        connectSignals(this.root.map.changed, this.root.signals.mapLayoutChanged);

        this.root.logic = new exports.gameLogic(this.root);
        this.root.logic.init();

        this.root.particles = new exports.particleFactory(this.root);
        // TODO: Finish all the meta bullshit
        // this.initResourceParticleGroups();

        this.root.sound = new SoundManager(this.root);
        this.root.gui = new GUI(this.root);

        this.root.gameSystems.initializeDefaultSystems();
        this.root.logic.spawnResources();
        this.root.logic.initCameraSpawn();

        // Component Inspector 
        // Note: IS this needed?
        if (Config.showComponentInspector) {
            this.root.componentInspector = new ComponentInspectorUI(this.root);
        }

        this.root.serializer = new GameSerializer(this.root);
        this.cameraManager = new CameraManager(this.root);
        this.cameraManager.moved.add(this.onKeyboardCamMovement, this);
        this.onResized();

        this.root.leaderboard = new LeaderboardUI(this.root);
        this.root.syncer = new StatSyncer(this.root);

        // Check if to show welcome screen or start the game directly
        const lastPlayerName = this.root.persistent.getString("lastPlayerName");
        const lastGameMode = this.root.persistent.getString("lastGameMode", "easy");

        this.root.keyboard.stop();
        this.performUpdate();

        window.startGame = (tutorial) => {
            this.startPlaying(tutorial);
            return false;
        };

        window.startTutorial = () => {
            this.startTutorial();
            return false;
        };

        initWelcomeScreen(lastPlayerName, lastGameMode, this.root);
    }

    onKeyboardCamMovement(e, t) {
        var i = this.root.phaser.camera;
        (i.x += e), (i.y += t);
    }

    startTutorial() {
        if (Config.tutorialActive = true) this.startPlaying(true);
    }

    getSelectedGameModeId() {
        if (Config.tutorialActive) return "easy";
        if (!Config.showWelcomeScreen) return "easy";
        var e = document.getElementById("gamemode_select");
        if (!e) return console.error("Could not extract gamemode, element dismished!"), null;
        const t = e.selectedIndex;
        return e.options[t].value;
    }

    startPlaying() {
        console.log("[GAME] Attempt to start playing");
        const selectedGameModeId = this.getSelectedGameModeId();
        if (selectedGameModeId) {
            const gameMode = createGameModeFromId(selectedGameModeId);
            if (gameMode) {
                console.log("[GAME] Actually start playing");
                this.root.gamemode = gameMode;
                this.root.gamemode.initialize();
                console.log("[GAME] Gamemode =", selectedGameModeId);
                this.root.persistent.setString("lastGameMode", this.root.gamemode.getId());
                this.root.keyboard.start();
                this.root.gameStarted = true;
                window.mouseTracker.enabled = true;
                this.root.syncer.sendDump();

                this.dumpInterval = setInterval(() => this.root.syncer.sendDump(), 1000 * Config.dumpInterval);
                this.root.leaderboard.forceUpdate();
                this.root.persistent.setString("lastPlayerName", this.root.syncer.playerName);
                window.startGame = undefined;

                this.root.phaser.camera.focusOnXY(6400, 6400);

                this.performUpdate();

                const welcomeFull = document.getElementById("welcomeFull");
                if (welcomeFull) {
                    welcomeFull.remove();
                }

                this.root.signals.gameLoadedAndStarted.dispatch();
                this.root.signals.consistentGameUpdate.dispatch();

                if (Config.testGameOver) {
                    setTimeout(() => this.onGameOver(), 7000);
                }
            } else {
                alert(`Failed to create gamemode: ${selectedGameModeId}. Please report this!`);
            }
        } else {
            alert("Unable to determine the game mode. Please report this.");
        }
    }

    onGameOver() {
        for (var e in (console.warn("GAME OVER"),
            this.dumpInterval && clearInterval(this.dumpInterval),
            this.root.syncer.sendGameOver(),
            this.root.keyboard.stop(),
            this.root.signals)) {
            this.root.signals[e].dispose();
        }
        var t = document.createElement("canvas"),
            i = t.getContext("2d");
        (t.width = this.root.phaser.width * this.root.phaser.resolution), (t.height = this.root.phaser.height * this.root.phaser.resolution), i.drawImage(this.root.phaser.canvas, 0, 0);
        var a = PIXI.Texture.fromCanvas(t);
        this.root.inputManager.clearObjects();
        this.state.start("GameOver", true, false, {
            day: this.root.daytime.getDay(),
            score: Math.floor(1933.52 * this.root.daytime.getDay() + 0.91562 * this.root.stats.gems),
            gems: this.root.stats.gems,
            background: a,
            name: this.root.syncer.playerName,
            gamemode: this.root.gamemode,
            gemsOverTime: this.root.stats.gemsOverTime,
        });
    }

    gameIsPaused() {
        return !!this.root.dialogs.modalDialogIsOpen();
    }

    update() {
        this.root.gameStarted && this.performUpdate();
    }

    performUpdate() {
        const time = this.root.phaser.time.elapsed / 1e3;
        if ((this.root.signals.consistentGameUpdate.dispatch(time), this.gameIsPaused())) this.root.animations.update(true);
        else
            try {
                this.cameraManager.update(this.root.time.physicsElapsedConsistent),
                    this.root.culling.update(),
                    this.root.time.update(time),
                    cart || (this.root.daytime.update(), this.root.gameSystems.update()),
                    this.root.gui.update(),
                    Config.showComponentInspector && this.root.componentInspector.update(),
                    this.root.entityMgr.update(),
                    this.root.animations.update(),
                    this.root.perfStats.postFrameCallback(),
                    this.root.leaderboard.update(),
                    this.debugManager && this.debugManager.update();
            } catch (e) {
                console.error(e);
                console.error(e.stack);
                EXCEPTION_SHOWN || (EXCEPTION_SHOWN = true);
            }
    }
}

class GameOverState extends Phaser.State {
    constructor() {
        super();
    }
}

class App {
    constructor() {
        console.log("App booted at", Math.floor(performance.now()))

        this.options = {
            width: "100%",
            height: "100%",
            renderer: Phaser.CANVAS,
            antialias: false,
            multiTexture: false,
            transparent: false,
            parent: "renderer",
            legacy: true,
            resolution: 1,
            roundPixels: true,
            state: { Boot: BootState, Game: GameState, GameOver: GameOverState },
        }

        this.game = new Phaser.Game(this.options);

        setTimeout(() => {
            MouseTracker.register(this.game);
        }, 1);

        this.game.state.add("Boot", BootState, false);
        this.game.state.add("Game", GameState, false);
        this.game.state.add("GameOver", GameOverState, false);
        this.game.state.start("Boot");
    }
}

const app = new App();