import { Config } from "../../global/Config.js";
import { randomInt } from "../../global/functions.js";

class GameLogic {
    constructor(root) {
        this.root = root;
        this.buildingCountCache = {};
        this.mapSeed = randomInt(1e10, 1e11 - 1)
        this.root.signals.nightEnded.add(this.nightEndCallback, this)
        this.root.signals.nightEntered.add(this.nightStartCallback, this)
        this.root.signals.gameLoadedAndStarted.add(this.onGameStarted, this);
    }
    static get name() {
        return "GameLogic"
    }

    init() {
        this.createMapBorders(), this.createMapFog();
    }

    createMapBorders() {
        const e = Config.numTilesX * Config.tileSize;
        const t = Config.numTilesY * Config.tileSize;
        const i = Config.mapBorder * Config.tileSize;
    
        const borders = [
            [0, 0, e, i],
            [0, i, i, t - 2 * i],
            [e - i, i, i, t - 2 * i],
            [i, t - i, e - 2 * i, i],
        ];
    
        const graphics = this.root.phaser.make.graphics();
        graphics.beginFill(15658734);
        borders.forEach(([x, y, width, height]) => {
            graphics.drawRect(x, y, width, height);
        });
        
        graphics.blendMode = PIXI.blendModes.MULTIPLY;
        graphics.endFill();
        this.root.groups.mapBordersGroup.add(graphics);
    }

    createMapFog() {
        for (var e = this.root.phaser.make.graphics(), t = Config.mapBorder * Config.tileSize, i = 0; i < t; ++i) {
            var a = Math.max(0, i - 60) / (t - 60 - 60),
                o = Math.pow(1 - a, 1.05);
            e.beginFill(2236962, o), e.drawRect(0, i, 1, 1);
        }
        var n = e.generateTexture(),
            r = this.root.phaser.make.image(0, 0, n);
        this.root.groups.mapFog.add(r), (r.width = Config.numTilesX * Config.tileSize);
        var s = this.root.phaser.make.image(0, 0, n);
        this.root.groups.mapFog.add(s), (s.width = Config.numTilesX * Config.tileSize), (s.y = Config.numTilesY * Config.tileSize), (s.scale.y = -1);
        var l = this.root.phaser.make.image(0, 0, n);
        this.root.groups.mapFog.add(l), (l.width = Config.numTilesX * Config.tileSize), (l.angle = -90), l.anchor.setTo(1, 0);
        var u = this.root.phaser.make.image(0, 0, n);
        this.root.groups.mapFog.add(u), (u.width = Config.numTilesX * Config.tileSize), (u.angle = 90), (u.x = Config.numTilesX * Config.tileSize);
    }

    spawnWave() {
        for (var e = 0; e < 300; ++e) this.spawnNewEnemy(Zombie, 0);
    }

    spawnNewEnemy(enemyType) {
        const position = this.root.map.getRandomBorderTile(0);
        const args = Array.prototype.slice.call(arguments, 1);
        const newEnemy = new enemyType(this.root.phaser, position.x, position.y, args);

        this.root.entityMgr.registerEntity(newEnemy);
        this.root.groups.enemiesGroup.add(newEnemy);

        return newEnemy;
    }

    playerHasPlacedBase() {
        return null != this.getPlayerBase();
    }

    getPlayerBase() {
        return this.root.entityMgr.getAllEntitiesWithComponent(PlayerBaseComponent)[0];
    }

    getPlayerBaseLevel() {
        var e = this.getPlayerBase();
        return e ? e.getLevel() : -1;
    }

    countBuildings(e) {
        if (null != this.buildingCountCache[e.name]) return this.buildingCountCache[e.name];
        var t = 0;
        return (
            this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (i) {
                i instanceof e && (t += 1);
            }),
            (this.buildingCountCache[e.name] = t),
            t
        );
    }

    nightEndCallback() {
        var e = this.root.daytime.getDay();
        e >= Config.getPointsStartDay && (e % GAME_BALANCING.bossInterval == 0 ? (this.root.stats.points += Config.pointsPerBoss) : (this.root.stats.points += Config.pointsPerNight)),
            this.root.gamemode && !this.root.gamemode.isSandbox() && this.root.persistent.setMaximumStat("stat_max_day_reached", e),
            this.root.stats.storeGemsOverTime(e),
            this.root.serializer.updateLastSavegame(),
            this.root.settings.autosave && (console.log("[LOGIC] Triggering autosave"), this.root.savegames.saveGame());
    }

    nightStartCallback() {
        this.root.serializer.updateLastSavegame();
    }

    initCameraSpawn() {
        let spawnPoint = {
            x: Math.floor(Config.numTilesX / 2),
            y: Math.floor(Config.numTilesY / 2),
        };
    
        if (Config.spawnDefaultBuildings) {
            spawnPoint = { x: 10, y: 10 };
        }
    
        const [spawnX, spawnY] = tileCenterToWorld(spawnPoint.x, spawnPoint.y);
        const camera = this.root.phaser.camera;
        const zoomLevel = this.root.zoom.currentZoomLevel;
    
        camera.setPosition(spawnX / zoomLevel - camera.width / 2, spawnY / zoomLevel - camera.height / 2);
    }    

    spawnResources() {
        var e = this;
        if ((initializeMap(this.root, this.mapSeed), Config.spawnDefaultBuildings)) {
            Config.ignoreBuildRequirements = true;
            var t = [],
                i = BuildingRegistry.getMetaBuildings();
            Object.keys(i).forEach(function (e, a) {
                for (var o = i[e], n = 1; n <= MAXLEVEL_INDEX + 1; ++n) t.push({
                    type: o,
                    y: 8 + n,
                    x: 10 + 2 * a,
                    level: n
                });
            });
            for (var a = BuildingRegistry.getMetaclassByClassHandle(WallMeta), o = 1; o <= MAXLEVEL_INDEX + 1; ++o)
                for (var n = 0; n < 10; ++n) t.push({
                    type: a,
                    y: 8 + 2 * o,
                    x: 44 + n,
                    level: o
                });
            t.forEach(function (t) {
                var i = t.type,
                    a = t.x,
                    o = t.y,
                    n = t.level;
                e.tryPlaceBuilding({
                    building: i,
                    position: {
                        tileX: a,
                        tileY: o
                    }
                });
                var r = e.root.map.getTileContent(a, o);
                if (r)
                    for (var s = 1; s < n; ++s) e.upgradeBuilding(r);
                else console.error("failed to place building!");
            });
        }
    }

    tryPlaceBuilding(e) {
        var t = e.building,
            i = e.position;
        if (!this.checkBuildingRequirements({
            building: t,
            position: i
        }).result) return false;
        if (this.root.entityMgr.getAllEntitiesWithComponent(EnemyAIComponent).length > 0 && Config.gameTimeSpeedUpFactor < 1) return false;
        Config.ignoreBuildRequirements || this.root.stats.spend(t.getUpgradeCost(0));
        var a = this.doPlaceBuilding(t, i.tileX, i.tileY);
        return (
            a.getComponent(PlayerBaseComponent) && (this.root.map.recomputeFlowGrid(), this.root.signals.playerBasePlaced.dispatch(a), this.root.serializer && this.root.serializer.updateLastSavegame()),
            this.root.signals.buildingPlaced.dispatch(a),
            true
        );
    }

    resetBuildingCountCache() {
        this.buildingCountCache = {};
    }

    doPlaceBuilding(e, t, i) {
        var a = e.makeInstance(this.root.phaser, t, i);
        return this.root.groups.buildingsGroup.add(a), this.root.map.setTileContent(t, i, a), this.root.entityMgr.registerEntity(a), this.resetBuildingCountCache(), a;
    }

    sellBuilding(e) {
        if (!(e instanceof BuildingInstance)) throw new Error("Trying to sell non-building");
        return e.meta.isSellable() ?
            (this.root.stats.grant({
                gems: this.getSellPrice(e)
            }), this.root.signals.buildingSold.dispatch(e), this.resetBuildingCountCache(), this.root.entityMgr.destroyEntity(e), true) :
            (console.warn("Trying to sell non sellable building"), false);
    }

    sellAllBuildings(e) {
        var t = this,
            i = false;
        return (
            this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (a) {
                a.constructor.name === e.constructor.name && t.sellBuilding(a) && (i = true);
            }),
            i
        );
    }

    getSellPrice(e) {
        for (var t = 0, i = 0, a = e.getLevel(); i <= a; ++i) t += e.meta.getUpgradeCost(i).gems;
        return Math.floor(t * GAME_BALANCING.refundOnSell, 5);
    }

    getSellPriceForAll(e) {
        var t = this,
            i = 0;
        return (
            this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (a) {
                a.constructor.name === e.constructor.name && (i += t.getSellPrice(a));
            }),
            i
        );
    }

    checkBuildingDependencies(e) {
        if (Config.ignoreBuildRequirements) return {
            result: true
        };
        for (var t = 0; t < e.dependsOnBuildings.length; ++t) {
            var i = e.dependsOnBuildings[t],
                a = BuildingRegistry.getMetaclassByClassHandle(i),
                o = a.getInstanceClass();
            if (0 === this.countBuildings(o)) return {
                result: false,
                reason: tr("place_dependent_building_first", a.getDisplayName())
            };
        }
        return {
            result: true
        };
    }

    checkBuildingIsBelowBaseRequirement(e) {
        var t = this.getPlayerBaseLevel();
        return !(e.getLevel() >= t && !e.hasComponent(PlayerBaseComponent));
    }

    checkCanUpgradeBuilding(e) {
        var t = e.meta;
        if (!this.checkBuildingIsBelowBaseRequirement(e) && !Config.ignoreBuildRequirements) return {
            result: false,
            reason: tr("upgrade_base_first")
        };
        var i = this.checkSpecialUpgradeRequirements(e);
        if (!i.result) return i;
        var a = t.getUpgradeCost(e.getLevel() + 1);
        return this.root.stats.canAfford(a) || Config.ignoreBuildRequirements ? {
            result: true
        } : {
            result: false,
            reason: tr("can_not_afford_upgrade")
        };
    }

    checkSpecialUpgradeRequirements(e) {
        var t = e.meta;
        return e.getLevel() >= t.getMaxLevel() ? {
            result: false,
            reason: tr("no_further_upgrades")
        } : {
            result: true,
            reason: ""
        };
    }

    upgradeBuilding(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2]) {
            var i = this.getPlayerBaseLevel();
            if (((e instanceof PlayerBaseBuilding || Config.ignoreBuildRequirements) && (i = MAXLEVEL_INDEX), t)) {
                for (var a = this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent), o = false, n = 0; n <= i; ++n)
                    for (var r = 0, s = a.length; r < s; ++r) {
                        var l = a[r];
                        l.getLevel() === n && l.constructor.name === e.constructor.name && (o = this.upgradeBuildingSingle(l) || o);
                    }
                return o;
            }
            for (var u = false, c = e.getLevel(); c <= i; ++c) u = this.upgradeBuildingSingle(e) || u;
            return u;
        }
        if (t) {
            var d = e.getLevel();
            if (!this.upgradeBuildingSingle(e)) return false;
            for (var h = this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent), p = 0; p < h.length; ++p) {
                var g = h[p];
                g.constructor.name === e.constructor.name && g.getLevel() === d && this.upgradeBuildingSingle(g);
            }
            return true;
        }
        return this.upgradeBuildingSingle(e);
    }

    upgradeBuildingSingle(building) {
        const canUpgrade = this.checkCanUpgradeBuilding(building).result;
        if (canUpgrade) {
            const upgradeCost = building.meta.getUpgradeCost(building.getLevel() + 1);
            Config.ignoreBuildRequirements || this.root.stats.spend(upgradeCost);
            building.meta.upgradeInstance(this.root.phaser, building);
            if (building instanceof PlayerBaseBuilding && this.root.gamemode && !this.root.gamemode.isSandbox()) {
                this.root.persistent.setMaximumStat("stat_max_base_level", building.getLevel());
            }
            this.root.signals.buildingUpgraded.dispatch(building);
            return true;
        }
        return false;
    }

    checkBuildingRequirements(e) {
        var t = e.building,
            i = e.position,
            a = void 0 === i ? null : i;
        if (null == t) throw new Error("building is null");
        var o = this.checkBuildingDependencies(t);
        if (!o.result) return o;
        if (null != a && !this.root.map.isValidCoordinate(a.tileX, a.tileY, Config.mapBorder)) return {
            result: false,
            reason: tr("not_in_map_bounds")
        };
        if (!Config.ignoreBuildRequirements) {
            if (this.root.stats.isSkillUnlocked("transporterFeatureGlobal") && "transporter" === t.buildingId) return {
                result: false,
                reason: tr("transporter_no_use")
            };
            for (var n = t.getRequirements(), r = 0; r < n.length; ++r) {
                var s = n[r];
                if ((null != a || !s.dependsOnPosition()) && !s.check(this.root, a)) return {
                    result: false,
                    reason: s.getErrorText(this.root)
                };
            }
            if (!this.root.stats.canAfford(t.getUpgradeCost(0))) return {
                result: false,
                reason: tr("can_not_afford")
            };
        }
        if (null != a) {
            if (this.root.map.isTileUsed(a.tileX, a.tileY)) return {
                result: false,
                reason: tr("space_already_occupied")
            };
            if (this.root.map.tileIsOccupiedByDynamicEntities(a.tileX, a.tileY)) return {
                result: false,
                reason: tr("tile_occupied_by_enemies")
            };
        }
        return {
            result: true
        };
    }

    canUnlockSkill(e) {
        var t = SKILL_TREE[e];
        if (this.root.stats.isSkillUnlocked(e)) return false;
        if (Config.ignoreSkillRequirements) return true;
        if (this.root.stats.points < t.cost) return false;
        for (var i = t.dependsOn, a = 0; a < i.length; ++a) {
            var o = i[a];
            if (!this.root.stats.isSkillUnlocked(o)) return false;
        }
        return true;
    }

    unlockSkill(e) {
        if (!this.canUnlockSkill(e)) return false;
        var t = SKILL_TREE[e];
        return (
            (this.root.stats.points -= t.cost),
            this.root.stats.unlockSkill(e),
            this.root.signals.skillLeveledUp.dispatch(e),
            this.refreshBuildingInstances(),
            true
        );
    }

    clearGame() {
        this.root.entityMgr.destroyAll();
        this.resetBuildingCountCache();
        this.root.animations.cancelAllNonUIAnimations();
        this.root.particles.clearAll();
        this.root.signals.gameReset.dispatch();
    }

    onSavegameLoaded() {
        this.resetBuildingCountCache();
        this.root.signals.gameReload.dispatch();
        this.root.signals.skillLeveledUp.dispatch();
        this.refreshBuildingInstances();
        this.updateSandboxOverlay();
    }

    updateSandboxOverlay() {
        var e = document.getElementById("sandbox_overlay");
        e && this.root.gamemode && (this.root.gamemode.isAlwaysNight() ? (e.style.display = "block") : (e.style.display = "none"));
    }

    onGameStarted() {
        this.updateSandboxOverlay();

        if (this.root.gamemode.isAlwaysNight()) {
            this.root.signals.nightEntered.dispatch(1);
        }

        if (this.root.gamemode.isSandbox()) {
            window.spawnSandboxWave = () => this.spawnSandboxWave();
            window.sandboxHeal = () => this.sandboxHeal();
            window.sandboxFill = () => this.sandboxFill();
        }
    }

    sandboxHeal() {
        this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (e) {
            var t = e.getComponent(HealthComponent);
            t && t.healAll();
        });
    }

    sandboxFill() {
        this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (e) {
            var t = e.getComponent(StorageComponent);
            t && t.fillAll();
        });
    }

    spawnSandboxWave() {
        if (this.root.gamemode && this.root.gamemode.isSandbox()) {
            if (this.playerHasPlacedBase()) {
                this.root.signals.uiActionPerformed.dispatch();
                const sandboxWavesDiv = document.getElementById("sandbox_waves");
                if (sandboxWavesDiv) {
                    const waveValue = prompt('Insert wave value here:');
                    const enteredValue = parseInt(waveValue, 10);
                    if (waveValue !== null && !isNaN(enteredValue) && enteredValue >= 1) {
                        sandboxWavesDiv.textContent = `Wave: ${waveValue}`;
                        console.log("[SANDBOX] Spawn wave", enteredValue);
                        this.root.waveMgr.spawnWave(enteredValue);
                    } else if (waveValue === null) {
                        alert('value cannot be null!');
                    } else if (isNaN(enteredValue) === true) {
                        alert('Value must be a number!');
                    } else if (enteredValue <= 0) {
                        alert('Wave must be above 0!');
                    }
                }
            } else {
                this.root.gui.uiNotifications.showError(tr("place_base_before_wave"));
            }
        }
    }

    refreshBuildingInstances() {
        for (var e = this, t = this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent), i = 0; i < t.length; ++i) {
            var a = t[i];
            a.meta.refreshInstance(a);
        }
        for (var o = this.root.entityMgr.getAllEntitiesWithComponent(ResourceComponent), n = 0; n < o.length; ++n) {
            o[n].refreshInstance();
        }
        META_BUILDINGS.forEach(function (t) {
            t.refreshSelf(e.root);
        });
    }
}

export default GameLogic;