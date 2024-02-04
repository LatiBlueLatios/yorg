const tileDistance = 1.01,
    defaultTransportDistance = 3.5 * tileDistance,
    Config = {
        roundPixels: true,
        textResolution: 1,
        tileSize: 64,
        numTilesX: 200,
        numTilesY: 200,
        mapBorder: 7,
        cameraMovePerSecond: 1200,
        maxZoomLevelForDecorativeParticles: 1.2,
        dayDurationTotalSeconds: 80,
        nightDurationSeconds: 30,
        daySpeedDecrease: 0.995,
        dayNightOverlayAnimationDuration: 4e3,
        dumpInterval: 30,
        leaderboardInterval: 30,
        initialDayDurationAdditional: 45,
        gameTimeSpeedUpFactor: 1,
        startDay: 0,
        startGems: 100,
        startPoints: 0,
        fastForwardSpeed: 5,
        resourceSpeedTilesPerSecond: 1,
        getPointsStartDay: 5,
        pointsPerNight: 1,
        pointsPerBoss: 3,
        storageBurstSize: 20,
        showDebugOverlay: false,
        displayWaves: true,
        noDamage: false,
        zombiesEnabled: true,
        autoPlay: false,
        showFPS: false,
        showWelcomeScreen: true,
        showAiIdleIndicator: false,
        ignoreSkillRequirements: false,
        showSkillIds: false,
        showTotalSkillPoints: false,
        showLostFocus: true,
        simulateLag: false,
        showZoom: false,
        displayWorkerUsage: false,
        showFlowGrid: false,
        allSkillsUnlocked: false,
        allowOldSavegames: false,
        performance: { maxPathfindingPerFrame: 8 },
        radius: {
            trees: tileDistance,
            harvester: defaultTransportDistance,
            woodProcessor: defaultTransportDistance,
            uraniumMine: defaultTransportDistance,
            ironMine: defaultTransportDistance,
            steelFactory: defaultTransportDistance,
            arrowFactory: defaultTransportDistance,
            goldMine: defaultTransportDistance,
            cannonballProducer: defaultTransportDistance,
            transporter: defaultTransportDistance,
            nuclearStation: defaultTransportDistance,
            healingTower: defaultTransportDistance,
            tree: tileDistance,
            ironOre: tileDistance,
            goldOre: tileDistance,
            uraniumOre: tileDistance,
            playerBase: 3 * tileDistance,
        },
        ui: {
            buildingOuterSpace: 13,
            buildingInnerSpace: 22,
            buildingBorderRadius: 12,
            resourceOuterSpace: 4,
            wallRadius: 8,
            visualizerWidth: 200,
            visualizerSpacing: 5,
            screenBorder: 10,
            screenBorderTop: 10,
            menuBreakScreenHeight: 790,
        },
        colors: {
            playerBase: 16777215,
            gold: 16529746,
            minedGold: 16529746,
            rawWood: 12308023,
            unprocessedWood: 12308023,
            processedWood: 14192987,
            rawIron: 11779534,
            unprocessedIron: 6323595,
            steel: 6659728,
            basicArrow: 11829454,
            wall: 11184810,
            arrowTower: 5269147,
            cannonball: 13745980,
            cannon: 161725,
            bombTower: 161725,
            uranium: 7001728,
            minedUranium: 7001728,
            power: 9630169,
            lightningTower: 11620349,
            lightningProjectile: 11620349,
            healing: 4388040,
            transporter: 11184810,
            dayColor: 16510286,
            nightColor: 7440592,
            skillUnlocked: 8947848,
            river: 4372212,
            gains: {
                health: 16738134,
                critical: 16753750,
                cannonDamage: 16771926,
                cannonProjectileSpeed: 12844886,
                damage: 8650582,
                arrowDamage: 5701512,
                arrowFireRate: 5701602,
                arrowRadius: 5695743,
                lightningDamage: 5679103,
                lightningRadius: 5661951,
                miningSpeed: 10770175,
                buildingStorage: 14833407,
                processingSpeed: 16733908,
                wallHealth: 16733832,
                transporterSpeed: 5701566,
            },
            levels: [
                10066329,
                13795411,
                15462393,
                15714888,
                4185061,
                16658252,
                4910200,
                14111999,
                11730777,
                6619098,
                4244735,
                7733134,
                14696699,
                16732754,
                6942894,
                1638399,
                4492031,
                9002751,
                16728193,
                7798531,
                1960374,
                45311,
                16728040,
                5359871,
                16717636,
                58998,
                2718207,
                16768309,
                16056407,
                16777215,
            ],
            ui: { panelBackground: 2236962, panelAlpha: 0.94, placementGood: 7864183, placementBad: 16742263, active: 4249212, upgradeBuilding: 7829503, sellBuilding: 16742263, maxOutBuilding: 4910200 },
        },
        keys: {
            debugToggleRequirements: Phaser.Keyboard.FOUR,
            debugSpawnZombie: Phaser.Keyboard.FIVE,
            debugTogglePhysics: Phaser.Keyboard.SIX,
            debugToggleZombies: Phaser.Keyboard.SEVEN,
            debugFillAllStorage: Phaser.Keyboard.EIGHT,
            debugSpawnWave: Phaser.Keyboard.NINE,
            debugToggleAutoplay: Phaser.Keyboard.ZERO,
            debugDumpSceneGraph: Phaser.Keyboard.F4,
            toggleGui: Phaser.Keyboard.F2,
            fastForward: Phaser.Keyboard.Q,
            pause: Phaser.Keyboard.SPACEBAR,
            globalUpgrades: Phaser.Keyboard.R,
            viewDefense: Phaser.Keyboard.THREE,
            viewTransport: Phaser.Keyboard.TWO,
            viewProcessorUsage: Phaser.Keyboard.ONE,
            moveUp: Phaser.Keyboard.W,
            moveDown: Phaser.Keyboard.S,
            moveLeft: Phaser.Keyboard.A,
            moveRight: Phaser.Keyboard.D,
            toggleUpgradeSummary: Phaser.Keyboard.E,
            toggleMapView: Phaser.Keyboard.M,
            build: {
                wall: Phaser.Keyboard.E,
                transporter: Phaser.Keyboard.F,
                playerBase: Phaser.Keyboard.B,
                goldMine: Phaser.Keyboard.T,
                ironMine: Phaser.Keyboard.Y,
                cannonballProducer: Phaser.Keyboard.U,
                cannon: Phaser.Keyboard.I,
                bombTower: Phaser.Keyboard.Z,
                harvester: Phaser.Keyboard.O,
                steelFactory: Phaser.Keyboard.P,
                woodProcessor: Phaser.Keyboard.G,
                arrowFactory: Phaser.Keyboard.H,
                arrowTower: Phaser.Keyboard.J,
                uraniumMine: Phaser.Keyboard.K,
                nuclearStation: Phaser.Keyboard.L,
                lightningTower: Phaser.Keyboard.C,
                healingTower: Phaser.Keyboard.V,
            },
            cancelBuild: Phaser.Keyboard.ESC,
            upgradeBuilding: Phaser.Keyboard.N,
            sellBuilding: Phaser.Keyboard.X,
        },
    },
    META_GAME_SETTINGS = [
        {
            title: "performance_settings",
            settings: [
                { id: "enableParticles", defaultValue: true },
                { id: "enableFancyZombies", defaultValue: true },
                { id: "enableResourceThrowaway", defaultValue: true },
            ],
        },
        {
            title: "misc_settings",
            settings: [
                { id: "autosave", defaultValue: true },
                { id: "disableFastForwardAtNight", defaultValue: true },
                { id: "disableFastForwardDuringBoss", defaultValue: true },
            ],
        },
        {
            title: "ui_settings",
            settings: [
                { id: "enableAdvancedUi", defaultValue: true },
                { id: "showFps", defaultValue: false },
            ],
        },
    ]

export { Config, META_GAME_SETTINGS };