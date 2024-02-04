
class BuildingTooltipUI {
    constructor(root, uiGroup) {
        this.root = root;
        this.uiGroup = uiGroup;
        this.init();
    }

    init() {
        var e = this, t = this.root.phaser;
        (this.fixedGroup = t.make.group()),
            (this.fixedGroup.fixedToCamera = true),
            this.uiGroup.add(this.fixedGroup),
            (this.clickCatcher = t.make.graphics()),
            this.clickCatcher.beginFill(16724787, 0),
            this.clickCatcher.drawRect(0, 0, 1, 1),
            this.clickCatcher.endFill(),
            this.clickCatcher.enableInput(true),
            (this.clickCatcher.name = "ClickCatcherBuildingTooltip"),
            this.fixedGroup.add(this.clickCatcher),
            (this.radiusHelper = t.make.graphics()),
            (this.currentRadiusParams = [0, 0]),
            this.uiGroup.add(this.radiusHelper),
            (this.tooltipGroup = t.make.group()),
            this.uiGroup.add(this.tooltipGroup),
            (this.currentEntity = null),
            this.initTooltip(),
            this.bindSignals(),
            (this.unusedMouseDown = new Phaser.Signal()),
            (this.unusedMouseUp = new Phaser.Signal()),
            (this.updateTimer = Timer.makeFromIntervalMs(1e3)),
            (this.forceUpgradeAll = false),
            (this.heightToTooltipPanel = {}),
            this.root.signals.gameReset.add(function () {
                return e.hideTooltip(true);
            }),
            (window.onSellAllConfirmed = function () {
                return e.onSellAllConfirmed();
            });
    }

    isOpen() {
        return null != this.currentEntity;
    }

    getLevelUpgradeMode() {
        return this.keyAlt.isDown ? UPGRADE_MAX_LEVEL : UPGRADE_ONE_LEVEL;
    }

    getBatchUpgradeMode() {
        return this.keyShift.isDown || this.forceUpgradeAll ? UPGRADE_ALL_BUILDINGS : UPGRADE_ONE_BUILDING;
    }

    tutorialGetLevelTextPosition() {
        var e = this.tooltipLevelIcon.worldPosition, t = this.tooltipGroup.scale.x;
        return [e.x + 30 * t, e.y + 5 * t];
    }

    tutorialGetUpgradeButtonPosition() {
        var e = this.tooltipUpgradeButton.worldPosition, t = this.tooltipGroup.scale.x;
        return [e.x + (this.tooltipUpgradeButton.width / 2) * t, e.y + (this.tooltipUpgradeButton.height / 2) * t];
    }

    tutorialGetStatisticsPosition() {
        var e = this.tooltipStatLines[0].icon.worldPosition, t = this.tooltipGroup.scale.x;
        return [e.x + 70 * t, e.y + 17 * t];
    }

    onResolutionChanged(e, t) {
        this.clickCatcher.scale.setTo(e, t), this.radiusHelper.scale.setTo(1 / this.root.zoom.currentZoomLevel), this.updateGroupPosition();
    }

    bindSignals() {
        var e = this;
        this.clickCatcher.events.onInputDown.add(this.onMouseDown, this),
            this.clickCatcher.events.onInputUp.add(function () {
                return e.unusedMouseUp.dispatch();
            }),
            this.root.signals.buildingPlaced.add(this.hideTooltip, this),
            this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
            this.root.signals.mapDragged.add(this.hideTooltip, this),
            this.root.signals.actionPerformed.add(this.hideTooltip, this),
            this.root.signals.buildingDestroyed.add(this.checkTooltip, this),
            (this.keyEscape = this.root.keyboard.addKey(Phaser.Keyboard.ESC)),
            this.keyEscape.onDown.add(this.hideTooltip, this),
            (this.keyShift = this.root.keyboard.addKey(Phaser.Keyboard.SHIFT)),
            this.keyShift.onDown.add(this.updateDialogButtons, this),
            this.keyShift.onUp.add(this.updateDialogButtons, this),
            (this.keyAlt = this.root.keyboard.addKey(Phaser.Keyboard.ALT)),
            this.keyAlt.onDown.add(this.updateDialogButtons, this),
            this.keyAlt.onUp.add(this.updateDialogButtons, this);
    }

    checkTooltip() {
        (this.currentEntity && this.currentEntity.alive) || this.hideTooltip();
    }

    onShiftDown() {
        this.updateDialogButtons();
    }

    onShiftUp() {
        this.updateDialogButtons();
    }

    onAltDown() {
        this.updateDialogButtons();
    }

    onAltUp() {
        this.updateDialogButtons();
    }

    updateDialogButtons() {
        if (this.currentEntity) {
            var e = this.currentEntity, t = e.meta;
            if (t) {
                if (t.isSellable()) {
                    this.tooltipSellButton.visible = true;
                    var i = 0, a = "";
                    this.getBatchUpgradeMode() == UPGRADE_ONE_BUILDING ? ((i = this.root.logic.getSellPrice(e)), (a = tr("sell_for"))) : ((a = tr("sell_all_for")), (i = this.root.logic.getSellPriceForAll(e))),
                        this.tooltipSellButton.textHandle.setText(a.toUpperCase(), true),
                        this.sellGemsText.setText(formatBigNumber(i), true),
                        (this.sellGemsText.visible = true),
                        (this.sellGemsIcon.visible = true),
                        (this.tooltipSellTextGroup.visible = false);
                }
                else
                    (this.tooltipSellButton.visible = false),
                        (this.sellGemsText.visible = false),
                        (this.sellGemsIcon.visible = false),
                        (this.tooltipSellTextGroup.visible = true),
                        this.tooltipSellText.setText(tr("can_not_sell_building"), true);
                this.tooltipUpgradeButton.getChildAt(0).tint = Config.colors.ui.upgradeBuilding;
                var o = this.root.logic.checkSpecialUpgradeRequirements(e);
                if (o.result)
                    if (((this.tooltipUpgradeButton.visible = true), this.root.logic.checkBuildingIsBelowBaseRequirement(e))) {
                        this.tooltipUpgradeTextGroup.visible = false;
                        var n = this.computeUpgradeCost(e);
                        this.upgradeGemsText.setText(formatBigNumber(n), true),
                            this.root.stats.gems < n
                                ? (setButtonEnabled(this.tooltipUpgradeButton, false), (this.upgradeGemsText.tint = 16742263))
                                : (setButtonEnabled(this.tooltipUpgradeButton, true), (this.upgradeGemsText.tint = 16777214));
                        var r = "upgrade", s = false;
                        this.getLevelUpgradeMode() === UPGRADE_ONE_LEVEL
                            ? (r = this.getBatchUpgradeMode() === UPGRADE_ONE_BUILDING ? "upgrade" : "upgrade_all")
                            : ((s = true), (r = this.getBatchUpgradeMode() === UPGRADE_ONE_BUILDING ? "max_out" : "max_out_all")),
                            this.tooltipUpgradeButton.textHandle.setText(tr(r).toUpperCase(), true),
                            (this.tooltipUpgradeButton.getChildAt(0).tint = s ? Config.colors.ui.maxOutBuilding : Config.colors.ui.upgradeBuilding),
                            this.root.logic.checkCanUpgradeBuilding(e).result || setButtonEnabled(this.tooltipUpgradeButton, false);
                    } else (this.tooltipUpgradeTextGroup.visible = true), this.tooltipUpgradeText.setText(tr("upgrade_base_to_upgrade_building"), true), (this.tooltipUpgradeButton.visible = false);
                else (this.tooltipUpgradeTextGroup.visible = true), this.tooltipUpgradeText.setText(o.reason, true), (this.tooltipUpgradeButton.visible = false);
            } else console.warn("Current entity has no meta");
        }
    }

    computeUpgradeCost(e) {
        var t = this, i = e.meta.getLevelKeyStats(e.getLevel() + 1), a = 0;
        this.getBatchUpgradeMode() === UPGRADE_ONE_BUILDING
            ? (a = this.computeOneUpgradeCost(e))
            : this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (o) {
                o.constructor.name === e.constructor.name && (t.getLevelUpgradeMode() === UPGRADE_ONE_LEVEL ? o.getLevel() === e.getLevel() && (a += i.cost.gems) : (a += t.computeOneUpgradeCost(o)));
            });
        return a;
    }

    computeOneUpgradeCost(e) {
        var t = e.meta;
        if (this.getLevelUpgradeMode() === UPGRADE_ONE_LEVEL) return t.getLevelKeyStats(e.getLevel() + 1).cost.gems;
        var i = this.root.logic.getPlayerBaseLevel();
        e.hasComponent(PlayerBaseComponent) && (i = MAXLEVEL_INDEX);
        for (var a = 0, o = e.getLevel() + 1; o <= i; ++o) a += t.getLevelKeyStats(o).cost.gems;
        return a;
    }

    initTooltip() {
        var e = this, t = this.root.phaser, i = TOOLTIP_WIDTH - 40, a = t.make.group();
        (a.x = 20),
            (a.y = 20),
            (this.tooltipTitle = t.make.text(0, -2, "<Building Title>", { font: "20px Roboto", fill: "#eee" })),
            a.add(this.tooltipTitle),
            (this.tooltipLevelIcon = t.make.image(i - 75, 1, "atlas", "icon-level.png")),
            a.add(this.tooltipLevelIcon),
            (this.tooltipLevelText = t.make.text(0, 0, "<level>", { font: "12px Roboto", fontWeight: 700, fill: "#fff", align: "right", boundsAlignH: "right" })),
            this.tooltipLevelText.setTextBounds(i - 120, 2, 120, 20),
            a.add(this.tooltipLevelText),
            (this.detailsBackground = makePanelBackground(t, TOOLTIP_WIDTH, 100, 0, 0.15, -20)),
            a.add(this.detailsBackground),
            (this.tooltipDesc = t.make.text(0, 41, "<Description>", { font: "12px Roboto", fill: "#aaa", wordWrap: true, wordWrapWidth: i })),
            (this.tooltipDesc.lineSpacing = -5),
            a.add(this.tooltipDesc);
        var o = 84;
        this.tooltipStatLines = [];
        for (var n = 0; n < MAX_STATS; ++n) {
            var r = t.make.group();
            (r.y = o), a.add(r), (o += STAT_LINE_HEIGHT);
            var s = t.make.text(20, 0, "label", { font: "10px Roboto", fill: "#aaa" });
            r.add(s);
            var l = t.make.image(0, 1, "atlas", "icon-health.png");
            (l.width = 12 * l.scale.x), (l.height = 12 * l.scale.x), r.add(l);
            var u = t.make.text(85, 0, "value", { font: "12px Roboto Mono", fill: "#eee" });
            r.add(u);
            var c = t.make.text(130, 0, "(100)", { font: "10px Roboto Mono", fill: "#888" });
            r.add(c);
            var d = t.make.image(190, 0, "atlas", "arrow_upgrade_right.png");
            r.add(d);
            var h = t.make.text(220, 0, "new-value", { font: "12px Roboto Mono", fill: "#AAA" });
            r.add(h), this.tooltipStatLines.push({ group: r, icon: l, label: s, currentValueText: u, actualValueText: c, arrowRight: d, newValueText: h });
        }
        (this.buttonsGroup = t.make.group()), a.add(this.buttonsGroup);
        var p = this.makeTooltipButton(
            i / 2 - 5,
            tr("upgrade"),
            16777214,
            function () {
                return e.tryUpgrade();
            },
            Config.keys.upgradeBuilding
        ), g = p.button, m = p.text, _ = p.textGroup;
        (this.tooltipUpgradeButton = g), (this.tooltipUpgradeText = m), (this.tooltipUpgradeTextGroup = _);
        var f = addGemCountToButton(t, this.tooltipUpgradeButton), b = f.icon, A = f.text;
        (this.upgradeGemsIcon = b), (this.upgradeGemsText = A);
        var y = this.makeTooltipButton(
            i / 2 - 5,
            tr("sell_for"),
            Config.colors.ui.sellBuilding,
            function () {
                return e.trySell();
            },
            Config.keys.sellBuilding
        ), v = y.button, k = y.text, w = y.textGroup;
        (this.tooltipSellButton = v), (this.tooltipSellText = k), (this.tooltipSellTextGroup = w), (this.tooltipUpgradeButton.x = i / 2 + 5), (this.tooltipUpgradeTextGroup.x = i / 2 + 5);
        var V = addGemCountToButton(t, this.tooltipSellButton), C = V.icon, S = V.text;
        (this.sellGemsIcon = C), (this.sellGemsText = S), (this.innerGroup = a), this.innerGroup.kill();
    }

    makeTooltipButton(e, t, i, a, o) {
        var n = this, r = this.root.phaser, s = makeButton({ phaser: r, width: e, text: t, fill: i, clickHandler: a, keybinding: o, height: 45, clickSounds: false }), l = r.make.group(), u = r.make.graphics();
        u.beginFill(i, 0.25),
            u.drawRoundedRect(0, 0, e - 0, 45, 4),
            l.add(u),
            u.enableInput(),
            (u.name = "TextBackgroundBuildingTooltip"),
            u.events.onInputDown.add(function () {
                n.root.signals.uiActionPerformedAndFailed.dispatch();
            });
        var c = r.make.text(s.x, 9, "<Message>", { font: "10px Roboto", fill: "#fff", align: "center", boundsAlignH: "center", wordWrap: true, wordWrapWidth: s.width - 3 });
        return (c.alpha = 0.4), (c.lineSpacing = -4), c.setTextBounds(3, 0, s.width - 6, 20), l.add(c), this.buttonsGroup.add(s), this.buttonsGroup.add(l), { button: s, text: c, textGroup: l };
    }

    tryUpgrade() {
        this.currentEntity &&
            (this.root.logic.upgradeBuilding(this.currentEntity, this.getBatchUpgradeMode() === UPGRADE_ALL_BUILDINGS, this.getLevelUpgradeMode() === UPGRADE_MAX_LEVEL)
                ? this.root.sound.playUpgradeBuildingSound()
                : this.root.signals.uiActionPerformedAndFailed.dispatch(),
                this.showTooltip(this.currentEntity));
    }

    trySell() {
        if (this.currentEntity && this.currentEntity.meta.isSellable()) {
            if (this.getBatchUpgradeMode() === UPGRADE_ALL_BUILDINGS) {
                var e = this.currentEntity.meta;
                return (document.getElementById("sell_all_confirm_content").innerText = tr("sell_confirmation_text", e.getDisplayName())), void window.showDialog("sell_all_confirmation_bg");
            }
            this.root.logic.sellBuilding(this.currentEntity) && ((this.currentEntity = null), this.hideTooltip());
        }
    }

    onSellAllConfirmed() {
        this.currentEntity && (this.root.logic.sellAllBuildings(this.currentEntity) && ((this.currentEntity = null), this.hideTooltip()), window.closeDialog("sell_all_confirmation_bg"));
    }

    initializeRadiusHelper() {
        this.radiusHelper.visible = false;
        var e = this.currentEntity, t = e.getComponent(ProjectileShooterComponent), i = e.getComponent(TransporterComponent);
        if (t || i) {
            this.radiusHelper.visible = true;
            var a = Config.tileSize / 2 - Config.ui.buildingOuterSpace, o = 0;
            t ? (o = t.radius * Config.tileSize) : i && ((o = Config.radius.transporter * Config.tileSize), (a = 8));
            var n, r = o - a;
            if (this.currentRadiusParams[0] != o || this.currentRadiusParams[1] != a)
                (this.currentRadiusParams = [o, a]),
                    this.radiusHelper.clear(),
                    this.radiusHelper.lineStyle(r, 16777215, 0.1),
                    (n = this.radiusHelper).drawCircle.apply(n, _toConsumableArray(e.worldSpaceTileCenter()).concat([o + a]));
        }
    }

    showTooltip(e) {
        var t = this;
        this.currentEntity = e;
        var i = e.meta;
        if (null == i) throw new Error("Entity has no meta handle");
        (this.currentRadiusParams = [0, 0]), this.initializeRadiusHelper(), this.tooltipTitle.setText(i.getDisplayName(), true), this.tooltipDesc.setText(i.getDescription(), true);
        var a = Config.colors.levels[e.getLevel()];
        this.tooltipLevelText.setText(tr("level").toUpperCase() + " " + (e.getLevel() + 1), true), (this.tooltipLevelText.tint = a), (this.tooltipLevelIcon.tint = a);
        var o = i.getLevelKeyStats(e.getLevel()), n = i.getLevelKeyStats(e.getLevel() + 1), r = 0;
        this.tooltipStatLines.forEach(function (e) {
            e.group.visible = false;
        }),
            SUPPORTED_STATS.forEach(function (i) {
                var a = _slicedToArray(i, 2), s = a[0], l = a[1];
                if (o[s]) {
                    var u = t.tooltipStatLines[r], c = tr("stat_" + s);
                    u.icon.loadTexture("atlas", "icon-" + s + ".png");
                    var d = formatBigNumber(o[s], true);
                    if ((u.currentValueText.setText(d, true), l)) {
                        var h = formatBigNumber(l(e), true);
                        h === d ? (u.actualValueText.visible = false) : (u.actualValueText.setText("(" + h + ")", true), (u.actualValueText.visible = true));
                    } else u.actualValueText.visible = false;
                    (u.group.visible = true),
                        u.label.setText(c, true),
                        n && n[s] !== o[s] ? ((u.arrowRight.visible = true), (u.newValueText.visible = true), u.newValueText.setText(formatBigNumber(n[s], true), true)) : ((u.arrowRight.visible = false), (u.newValueText.visible = false)),
                        (r += 1);
                }
            }),
            (this.detailsBackground.scale.y = (21 * r + 64) / 100),
            (this.detailsBackground.y = 30);
        var s = r * STAT_LINE_HEIGHT + 190, l = this.getTooltipPanelForHeight(s);
        (this.buttonsGroup.y = s - 80),
            this.innerGroup.alive || this.innerGroup.revive(),
            this.innerGroup.parent && this.innerGroup.parent.remove(this.innerGroup),
            l.add(this.innerGroup),
            (this.currentGroupHandle = l),
            (this.currentTooltipHeight = s),
            this.updateDialogButtons(),
            this.updateGroupPosition();
    }

    updateGroupPosition() {
        if (this.currentGroupHandle && this.currentEntity) {
            var e = this.root.zoom.currentZoomLevel;
            this.tooltipGroup.scale.setTo(1 / e);
            var t = 0.5 + 0.5 * e;
            Config.mobileDevice && (t *= 0.75),
                this.currentGroupHandle.scale.setTo(t),
                (this.currentGroupHandle.x = Math.floor(this.currentEntity.x + Config.tileSize / 2 - (TOOLTIP_WIDTH / 2) * t)),
                (this.currentGroupHandle.y = Math.floor(this.currentEntity.y - this.currentTooltipHeight * t - 2 * t * e));
        }
    }

    getTooltipPanelForHeight(e) {
        if (!this.heightToTooltipPanel[e]) {
            Config.logOverlayRedraws && console.log("[UI] Regenerating building tooltip for height", e);
            var t = makeTooltipPanel(this.root.phaser, TOOLTIP_WIDTH, e, true, Config.colors.ui.panelBackground, false).tooltip;
            this.tooltipGroup.add(t), (this.heightToTooltipPanel[e] = t);
        }
        var i = null, a = e.toString();
        for (var o in this.heightToTooltipPanel) {
            var n = this.heightToTooltipPanel[o];
            o === a ? (n.alive || n.revive(), (i = n)) : n.alive && n.kill();
        }
        return i;
    }

    onMouseDown() {
        var e, t, i = getTileBelowCursor(this.root.phaser);
        if ((e = this.root.map).isValidCoordinate.apply(e, _toConsumableArray(i))) {
            var a = (t = this.root.map).getTileContent.apply(t, _toConsumableArray(i));
            if ((this.unusedMouseDown.dispatch(), this.canShowTooltip(a))) {
                if (this.root.gui.uiUpgradeSellMode.isUpgradeModeActive())
                    return (
                        this.root.logic.upgradeBuilding(a, false, this.getLevelUpgradeMode() === UPGRADE_MAX_LEVEL) ? this.root.sound.playUpgradeBuildingSound() : this.root.signals.uiActionPerformedAndFailed.dispatch(),
                        void this.hideTooltip()
                    );
                if (this.root.gui.uiUpgradeSellMode.isSellModeActive()) return this.root.logic.sellBuilding(a), void this.hideTooltip();
                a !== this.currentEntity && this.root.signals.uiActionPerformed.dispatch(), this.showTooltip(a);
            } else this.currentEntity && this.root.signals.uiActionPerformedAndFailed.dispatch(), this.hideTooltip(a);
        }
    }

    canShowTooltip(e) {
        return null != e && e instanceof BuildingInstance;
    }

    hideTooltip() {
        if ((arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) || !this.root.dialogs.modalDialogIsOpen())
            for (var e in ((this.currentRadiusParams = [0, 0]), (this.radiusHelper.visible = false), (this.currentEntity = null), this.heightToTooltipPanel)) {
                var t = this.heightToTooltipPanel[e];
                t.alive && t.kill();
            }
    }
    
    update() {
        this.updateTimer.takeTick(this.root.time.nowConsistent, true) ? this.currentEntity && this.showTooltip(this.currentEntity) : this.updateDialogButtons();
    }
}

export default BuildingTooltipUI;