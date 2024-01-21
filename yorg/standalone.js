function antiError(module, exports, __webpack_require__) {
    "use strict";
    var _typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
            }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            },
        _slicedToArray = (function () {
            return function (e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e))
                    return (function (e, t) {
                        var i = [],
                            a = true,
                            o = false,
                            n = void 0;
                        try {
                            for (var r, s = e[Symbol.iterator](); !(a = (r = s.next()).done) && (i.push(r.value), !t || i.length !== t); a = true);
                        } catch (e) {
                            (o = true), (n = e);
                        } finally {
                            try {
                                !a && s.return && s.return();
                            } finally {
                                if (o) throw n;
                            }
                        }
                        return i;
                    })(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
        })(),
        _createClass = (function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var a = t[i];
                    (a.enumerable = a.enumerable || false), (a.configurable = true), "value" in a && (a.writable = true), Object.defineProperty(e, a.key, a);
                }
            }
            return function (t, i, a) {
                return i && e(t.prototype, i), a && e(t, a), t;
            };
        })(),
        _phaserCe = __webpack_require__(70),
        _pixi = __webpack_require__(70),
        _pathfinding = __webpack_require__(343),
        _pathfinding2 = _interopRequireDefault(_pathfinding),
        _jsBase = __webpack_require__(359),
        _screenfull = __webpack_require__(363),
        _screenfull2 = _interopRequireDefault(_screenfull),
        _superagent = __webpack_require__(364),
        _superagent2 = _interopRequireDefault(_superagent),
        _isMobile = __webpack_require__(370),
        _isMobile2 = _interopRequireDefault(_isMobile),
        _queryString = __webpack_require__(371),
        _queryString2 = _interopRequireDefault(_queryString),
        _randomJs = __webpack_require__(374),
        _randomJs2 = _interopRequireDefault(_randomJs),
        _trim = __webpack_require__(375),
        _trim2 = _interopRequireDefault(_trim),
        _chance = __webpack_require__(376),
        _chance2 = _interopRequireDefault(_chance),
        _howler = __webpack_require__(377),
        _lzString = __webpack_require__(378),
        _lzString2 = _interopRequireDefault(_lzString),
        _en = __webpack_require__(379),
        _en2 = _interopRequireDefault(_en),
        _zhCN = __webpack_require__(392),
        _zhCN2 = _interopRequireDefault(_zhCN),
        _ja = __webpack_require__(380),
        _ja2 = _interopRequireDefault(_ja);

    function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
    }
    function _toConsumableArray(e) {
        if (Array.isArray(e)) {
            for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
            return i;
        }
        return Array.from(e);
    }
    function _possibleConstructorReturn(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function _inherits(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        (e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } })), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
    }
    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    
    const Phaser = _phaserCe.Phaser;
    var Animation = (function () {
        function e(t, i) {
            _classCallCheck(this, e),
                (this._id = t),
                (this._object = i),
                (this._props = newEmptyMap()),
                (this._easing = EASING.linear),
                (this._callback = null),
                (this._initialProps = newEmptyMap()),
                (this._startTime = null),
                (this._duration = 1e3),
                (this._yojo = false),
                (this._playWhilePaused = false),
                (this._uiAnim = false);
        }
        return (
            _createClass(e, null, [
                {
                    key: "name",
                    get: function () {
                        return "Animation";
                    },
                },
            ]),
            (e.prototype.playWhilePaused = function () {
                return (this._playWhilePaused = true), this;
            }),
            (e.prototype.uiAnim = function () {
                return (this._uiAnim = true), (this._playWhilePaused = true), this;
            }),
            (e.prototype.ease = function (e) {
                return (this._easing = e), this;
            }),
            (e.prototype.getId = function () {
                return this._id;
            }),
            (e.prototype.yojo = function () {
                return (this._yojo = true), this;
            }),
            (e.prototype.to = function (e, t) {
                if (null == t || t < 1) throw new Error("Invalid duration");
                return (this._props = Object.assign({}, e)), (this._duration = t), this;
            }),
            (e.prototype.onDone = function (e) {
                if (null !== this._callback) throw new Error("More than 1 onDone callback");
                return (this._callback = e), this;
            }),
            (e.prototype.readInitialProps = function () {
                for (var e in ((this._initialProps = newEmptyMap()), this._props)) this._initialProps[e] = this._object[e];
            }),
            (e.prototype.processEasing = function (e) {
                return e;
            }),
            (e.prototype.setPropertiesLerp = function (e) {
                for (var t in this._props) {
                    var i = this._initialProps[t],
                        a = this._props[t],
                        o = this._easing(e);
                    this._object[t] = i * (1 - o) + a * o;
                }
            }),
            (e.prototype.callOnDoneCallback = function () {
                null !== this._callback && this._callback();
            }),
            (e.prototype.update = function (e) {
                if (!this._object.alive || !this._object.exists) return this.callOnDoneCallback(), false;
                if (null === this._startTime) return (this._startTime = e), this.readInitialProps(), true;
                var t = (e - this._startTime) / this._duration;
                if (t >= 1) return this.setPropertiesLerp(1), this._yojo ? ((this._startTime = null), this.to(this._initialProps, this._duration), true) : (this.callOnDoneCallback(), false);
                var i = this.processEasing(t);
                return this.setPropertiesLerp(i), true;
            }),
            e
        );
    })(),
        LinearPathAnimation = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, a));
                return (o.pathPoints = []), (o.startPoint = null), (o.currentIndex = 0), (o.timeCounter = 0), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "LinearPathAnimation";
                        },
                    },
                ]),
                (t.prototype.ease = function () {
                    throw new Error("not available");
                }),
                (t.prototype.yojo = function () {
                    throw new Error("not available");
                }),
                (t.prototype.to = function (e, t) {
                    this.pathPoints.push({ pos: e, starts: this.timeCounter, ends: this.timeCounter + t, duration: t }), (this.timeCounter += t);
                }),
                (t.prototype.readInitialProps = function () {
                    this.startPoint = [this._object.position.x, this._object.position.y];
                }),
                (t.prototype.setDataFromPoint = function (e, t) {
                    var i = this.startPoint;
                    e > 0 && (i = this.pathPoints[e - 1].pos);
                    var a = this.pathPoints[e].pos;
                    this._object.position.setTo(i[0] * (1 - t) + a[0] * t, i[1] * (1 - t) + a[1] * t);
                }),
                (t.prototype.update = function (e) {
                    if (!this._object.alive || !this._object.exists) return this.callOnDoneCallback(), false;
                    if (null === this._startTime) return (this._startTime = e), this.readInitialProps(), true;
                    var t = e - this._startTime,
                        i = this.pathPoints[this.currentIndex];
                    if (t >= i.ends) {
                        if (this.currentIndex >= this.pathPoints.length - 1) return this.setDataFromPoint(this.currentIndex, 1), this.callOnDoneCallback(), false;
                        this.currentIndex += 1;
                    }
                    var a = (t - i.starts) / i.duration;
                    return (a = Math.min(1, a)), this.setDataFromPoint(this.currentIndex, a), true;
                }),
                t
            );
        })(Animation),
        TimerAnimation = (function () {
            function e(t) {
                _classCallCheck(this, e), (this._id = t), (this._duration = 0), (this._callback = null), (this._startTime = null), (this._uiAnim = false);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TimerAnimation";
                        },
                    },
                ]),
                (e.prototype.duration = function (e) {
                    this._duration = e;
                }),
                (e.prototype.getId = function () {
                    return this._id;
                }),
                (e.prototype.uiAnim = function () {
                    return (this._uiAnim = true), this;
                }),
                (e.prototype.update = function (e) {
                    return null === this._startTime ? ((this._startTime = e), true) : !(e > this._startTime + this._duration) || (this.callOnDoneCallback(), false);
                }),
                (e.prototype.onDone = function (e) {
                    if (null !== this._callback) throw new Error("More than 1 onDone callback");
                    return (this._callback = e), this;
                }),
                (e.prototype.callOnDoneCallback = function () {
                    null !== this._callback && this._callback();
                }),
                e
            );
        })(),
        AnimationManager = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.idPool = []), (this.nextId = 0), (this.animations = newEmptyMap()), (this.animationCount = 0);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "AnimationManager";
                        },
                    },
                ]),
                (e.prototype.makeId = function () {
                    return this.idPool.length > 0 ? this.idPool.pop() : ((this.nextId += 1), this.nextId);
                }),
                (e.prototype.animate = function (e) {
                    if (null == e) throw new Error("object is null");
                    return this._addAnimation(e, Animation);
                }),
                (e.prototype.animateLinearPath = function (e) {
                    if (null == e) throw new Error("object is null");
                    return this._addAnimation(e, LinearPathAnimation);
                }),
                (e.prototype.animatedTimer = function () {
                    return this._addAnimation(null, TimerAnimation);
                }),
                (e.prototype._addAnimation = function (e, t) {
                    var i = this.makeId(),
                        a = new t(i, e);
                    return (this.animations[i] = a), (this.animationCount += 1), a;
                }),
                (e.prototype.update = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = this.root.time.now,
                        i = new Date().getTime(),
                        a = [];
                    for (var o in this.animations) {
                        var n = this.animations[o];
                        if (!e || n._playWhilePaused) {
                            var r = t;
                            n._playWhilePaused && (r = i), n.update(r) || a.push(o);
                        }
                    }
                    for (var s = 0, l = a.length; s < l; ++s) {
                        var u = a[s];
                        delete this.animations[u], this.idPool.push(u);
                    }
                    this.animationCount -= a.length;
                }),
                (e.prototype.cancelById = function (e) {
                    void 0 !== this.animations[e] && (this.animations[e].callOnDoneCallback(), delete this.animations[e], this.idPool.push(e), (this.animationCount -= 1));
                }),
                (e.prototype.cancelAllNonUIAnimations = function () {
                    var e = this,
                        t = 0;
                    Object.keys(this.animations).forEach(function (i) {
                        e.animations[i]._uiAnim || (delete e.animations[i], e.idPool.push(i), (e.animationCount -= 1), (t += 1));
                    }),
                        console.log("[ANIMATIONS] Cleared up", t, "animations");
                }),
                (e.prototype.debugStr = function () {
                    return this.animationCount + " animations [nextId=" + this.nextId + ", pool=" + this.idPool.length + "]";
                }),
                (e.prototype.getAnimationCount = function () {
                    return this.animationCount;
                }),
                e
            );
        })(),
        Timer = (function () {
            function e(t) {
                if ((_classCallCheck(this, e), null == t || isNaN(t) || t <= 0)) throw new Error("Invalid interval: " + t);
                (this.intervalMs = t), (this.lastTick = null);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Timer";
                        },
                    },
                ]),
                (e.makeFromTicksPerSecond = function (t) {
                    return new e(1e3 / t);
                }),
                (e.makeFromIntervalMs = function (t) {
                    return new e(t);
                }),
                (e.prototype.resetTo = function (e) {
                    this.lastTick = e;
                }),
                (e.prototype.getIntervalMs = function () {
                    return this.intervalMs;
                }),
                (e.prototype.getTicksPerSecond = function () {
                    return 1e3 / this.intervalMs;
                }),
                (e.prototype.takeTick = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (null === this.lastTick) return (this.lastTick = e), true;
                    if (e >= this.lastTick + this.intervalMs) {
                        if (t) this.lastTick = e;
                        else {
                            this.lastTick += this.intervalMs;
                            var i = e - MAX_STALL_TIME;
                            this.lastTick < i && (this.lastTick = i);
                        }
                        return true;
                    }
                    return false;
                }),
                (e.prototype.hasTicksLeft = function (e) {
                    return null === this.lastTick || e > this.lastTick + this.intervalMs;
                }),
                (e.prototype.getNumTicksLeft = function (e) {
                    return null === this.lastTick ? 0 : Math.floor((e - this.lastTick) / this.intervalMs);
                }),
                (e.prototype.setInterval = function (e) {
                    (this.intervalMs = e), (this.lastTick = null);
                }),
                e
            );
        })(),
        NearbyBuildingPlacementHelper = (function () {
            function e(t) {
                var i = t.entityClass,
                    a = t.radius,
                    o = t.condition;
                _classCallCheck(this, e), checkParamsSet(i, a), (this.condition = o), (this.entityClass = i), (this.radius = a);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "NearbyBuildingPlacementHelper";
                        },
                    },
                ]),
                e
            );
        })(),
        RadiusPlacementHelper = (function () {
            function e(t) {
                _classCallCheck(this, e), checkParamsSet(t), (this.radius = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RadiusPlacementHelper";
                        },
                    },
                ]),
                e
            );
        })(),
        BuildingRequirement = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.errorText = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingRequirement";
                        },
                    },
                ]),
                (e.prototype.check = function () {
                    throw new Error("abstract: check()");
                }),
                (e.prototype.getErrorText = function (e) {
                    return this.errorText;
                }),
                (e.prototype.dependsOnPosition = function () {
                    return false;
                }),
                e
            );
        })(),
        NearbyRequirement = (function (e) {
            function t(i) {
                var a = i.errorText,
                    o = i.resourceType,
                    n = i.radius;
                _classCallCheck(this, t);
                var r = _possibleConstructorReturn(this, e.call(this, a));
                return checkParamsSet(o, n, a), (r.resourceType = o), (r.radius = n), r;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "NearbyRequirement";
                        },
                    },
                ]),
                (t.prototype.check = function (e, t) {
                    var i = t.tileX,
                        a = t.tileY;
                    return null !== e.map.findClosestEntityOfClass({ tileX: i, tileY: a, radius: this.radius, classType: this.resourceType });
                }),
                (t.prototype.dependsOnPosition = function () {
                    return true;
                }),
                t
            );
        })(BuildingRequirement),
        PlayerLevelDependentMaxCountRequirement = (function (e) {
            function t(i) {
                var a = i.errorText,
                    o = i.buildingType,
                    n = i.amounts,
                    r = void 0 === n ? null : n;
                _classCallCheck(this, t);
                var s = _possibleConstructorReturn(this, e.call(this, a));
                return checkParamsSet(o, r), (s.buildingType = o), (s.amounts = r), s;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PlayerLevelDependentMaxCountRequirement";
                        },
                    },
                ]),
                (t.prototype.check = function (e) {
                    return this.getCurrentCount(e) < this.getMaximumCount(e);
                }),
                (t.prototype.getMaximumCount = function (e) {
                    var t = e.logic.getPlayerBaseLevel();
                    return t < 0 ? 0 : this.amounts[t];
                }),
                (t.prototype.getCurrentCount = function (e) {
                    return e.logic.countBuildings(this.buildingType);
                }),
                (t.prototype.dependsOnPosition = function () {
                    return false;
                }),
                (t.prototype.getErrorText = function (e) {
                    if (0 === this.getMaximumCount(e)) {
                        for (var t = 0, i = 0; i <= MAXLEVEL_INDEX; ++i)
                            if (this.amounts[i] > 0) {
                                t = i + 1;
                                break;
                            }
                        return tr("upgrade_base_to_level_first", t);
                    }
                    return this.errorText;
                }),
                t
            );
        })(BuildingRequirement),
        CompatibleResourcesPlacementHelper = (function () {
            function e(t) {
                var i = t.resourceClass,
                    a = t.radius,
                    o = void 0 === a ? 1.01 : a;
                _classCallCheck(this, e), checkParamsSet(i), (this.resourceClass = i), (this.radius = o);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "CompatibleResourcesPlacementHelper";
                        },
                    },
                ]),
                e
            );
        })(),
        MetaBuilding = (function () {
            function e(t) {
                _classCallCheck(this, e),
                    (this.name = tr("building_" + t)),
                    (this.buildingId = t),
                    (this.levelStats = GAME_BALANCING.buildings[t]),
                    (this.requirements = []),
                    (this.placementHelpers = []),
                    (this.cachedTextures = newEmptyMap()),
                    (this.dependsOnBuildings = []),
                    (this.transporterEnabled = false),
                    GAME_BALANCING.amountLimits[t] && this.addMaximumAmountRequirement(GAME_BALANCING.amountLimits[t]);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaBuilding";
                        },
                    },
                ]),
                (e.prototype.getDescription = function () {
                    return tr("building_" + this.buildingId + "_desc");
                }),
                (e.prototype.useTransporters = function () {
                    this.transporterEnabled = true;
                }),
                (e.prototype.refreshSelf = function () { }),
                (e.prototype.getMaxLevel = function () {
                    return this.levelStats.length - 1;
                }),
                (e.prototype.getUpgradeCost = function (e) {
                    return this.levelStats[e].cost;
                }),
                (e.prototype.getLevelKeyStats = function (e) {
                    return this.levelStats[e];
                }),
                (e.prototype.getRadius = function () {
                    return Config.radius[this.buildingId];
                }),
                (e.prototype.getDisplayName = function () {
                    return this.name;
                }),
                (e.prototype.getPreviewSpritePath = function () {
                    return "building-" + this.buildingId + ".png";
                }),
                (e.prototype.isSellable = function () {
                    return true;
                }),
                (e.prototype.getKeybinding = function () {
                    return Config.keys.build[this.buildingId];
                }),
                (e.prototype.getRequirements = function () {
                    return this.requirements;
                }),
                (e.prototype.getPlacementHelpers = function () {
                    return this.placementHelpers;
                }),
                (e.prototype.getInstanceClass = function () {
                    throw new Error("Abstract");
                }),
                (e.prototype.addRequirement = function (e) {
                    this.requirements.push(e);
                }),
                (e.prototype.addNearbyRequirement = function (e) {
                    var t = e.errorText,
                        i = e.resourceType,
                        a = e.radius;
                    this.addRequirement(new NearbyRequirement({ errorText: t, resourceType: i, radius: a })), this.addNearbyPlacementHelper({ entityClass: i, radius: a });
                }),
                (e.prototype.addPlacementHelper = function (e) {
                    this.placementHelpers.push(e);
                }),
                (e.prototype.addRadiusPlacementHelper = function (e) {
                    this.addPlacementHelper(new RadiusPlacementHelper(e));
                }),
                (e.prototype.addCompatibleResourcesPlacementHelper = function (e) {
                    this.addPlacementHelper(new CompatibleResourcesPlacementHelper({ resourceClass: e }));
                }),
                (e.prototype.addNearbyPlacementHelper = function (e) {
                    var t = e.entityClass,
                        i = e.radius,
                        a = e.condition,
                        o = void 0 === a ? null : a;
                    this.addPlacementHelper(new NearbyBuildingPlacementHelper({ entityClass: t, condition: o, radius: i }));
                }),
                (e.prototype.addMaximumAmountRequirement = function (e) {
                    this.addRequirement(new PlayerLevelDependentMaxCountRequirement({ errorText: tr("reached_maximum_limit"), buildingType: this.getInstanceClass(), amounts: e }));
                }),
                (e.prototype.addDependency = function (e) {
                    this.dependsOnBuildings.push(e);
                }),
                (e.prototype.getBackgroundColor = function () {
                    return Config.colors[this.buildingId];
                }),
                (e.prototype.getDockingStyle = function () {
                    return "regular";
                }),
                (e.prototype.upgradeInstance = function (e, t) {
                    (t.level += 1), t.mainTexture.loadTexture(this.getTexture(e, t.level)), this.refreshInstance(t);
                }),
                (e.prototype.refreshInstance = function (e) {
                    e.updateComponentsToStats(this.levelStats[e.level]);
                }),
                (e.prototype.makeInstance = function (e, t, i) {
                    var a = new (this.getInstanceClass())(e, this, t, i),
                        o = e.make.image(0, 0, this.getTexture(e, 0));
                    return o.anchor.setTo(0.5, 0.5), o.position.setTo(Config.tileSize / 2, Config.tileSize / 2), a.addChild(o), (a.mainTexture = o), this.refreshInstance(a), a;
                }),
                (e.prototype.getTexture = function (e, t) {
                    if (this.cachedTextures[t]) return this.cachedTextures[t];
                    var i = this.makeSprite(e, t);
                    return (this.cachedTextures[t] = i), i;
                }),
                (e.prototype.makeSprite = function (e, t) {
                    var i = e.make.group(),
                        a = Config.ui.buildingOuterSpace,
                        o = Config.tileSize / 2 - a,
                        n = Config.colors.levels[t],
                        r = { background: mixColorPerChannel(n, 0.9, 51), dockings: mixColorPerChannel(n, 0, 51), borderColor: n, borderWidth: 3, spriteColor: n },
                        s = e.make.graphics(0, 0);
                    s.beginFill(16777215, 1e-4), s.drawRect(-l, -l, 2 * l, 2 * l), s.beginFill(2236962, 0.25), s.drawCircle(0.4, 2.5, 2 * o + 9), i.add(s);
                    var l = Config.tileSize / 2 + 10,
                        u = e.make.graphics(0, 0);
                    u.beginFill(16777215, 1e-4), u.drawRect(-l, -l, 2 * l, 2 * l), u.beginFill(r.background), u.lineStyle(r.borderWidth, r.borderColor), u.drawCircle(0, 0, 2 * o), i.addChild(u), u.anchor.setTo(0.5, 0.5);
                    var c = e.make.image(0, 0, "atlas", this.getPreviewSpritePath());
                    c.anchor.setTo(0.5, 0.5), (c.tint = r.spriteColor), i.addChild(c);
                    var d = i.generateTexture();
                    return i.destroy(), d;
                }),
                e
            );
        })(),
        Component = (function () {
            function e() {
                _classCallCheck(this, e);
            }
            return (
                (e.prototype.debugStr = function () {
                    return "(no debug info)";
                }),
                (e.prototype.makeTimerFromTicksPerSecond = function (e) {
                    return Timer.makeFromTicksPerSecond(e);
                }),
                (e.prototype.makeTimerFromIntervalMs = function (e) {
                    return Timer.makeFromIntervalMs(e);
                }),
                (e.prototype.destroy = function () { }),
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Component";
                        },
                    },
                ]),
                e
            );
        })(),
        HealthComponent = (function (e) {
            function t(i) {
                var a = i.maxHealth;
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(a), (o.maxHealth = a), (o.health = o.maxHealth), (o.pendingDamage = 0), Config.testHealthBars && (o.health *= 0.7), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "HealthComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return roundDecimals(this.health, 1) + " out of " + this.maxHealth + " points (pending: " + this.pendingDamage + ")";
                }),
                (t.prototype.onDamage = function (e) {
                    Config.noDamage || ((this.health = Math.max(0, this.health - e)), (this.pendingDamage = Math.max(0, this.pendingDamage - e)));
                }),
                (t.prototype.regenerate = function (e) {
                    this.health = Math.min(this.maxHealth, this.health + e);
                }),
                (t.prototype.healAll = function () {
                    this.health = this.maxHealth;
                }),
                (t.prototype.addPendingDamage = function (e) {
                    this.pendingDamage += e;
                }),
                (t.prototype.willDieSoon = function () {
                    return this.pendingDamage > this.health;
                }),
                (t.prototype.changeMaxHealth = function (e) {
                    var t = Math.ceil(e);
                    (this.health = t), (this.maxHealth = t), Config.testHealthBars && (this.health *= 0.7);
                }),
                t
            );
        })(Component),
        RegenHealthOnDayComponent = (function (e) {
            function t(i) {
                var a = i.regenPercentPerSecond;
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(a), (o.regenPercentPerSecond = a), Config.testHealthBars && (o.regenPercentPerSecond = 0), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RegenHealthOnDayComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Regenerate " + this.regenPercentPerSecond + " % of health per second, during daytime";
                }),
                t
            );
        })(Component),
        HealthBarComponent = (function (e) {
            function t(i) {
                var a = i.style,
                    o = void 0 === a ? "regular" : a;
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(this, e.call(this));
                return (n.style = o), (n.radius = 10), n;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "HealthBarComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Display health bar in '" + this.style + "' style";
                }),
                t
            );
        })(Component),
        VisualizeConnectionsComponent = (function (e) {
            function t(i) {
                var a = i.connectToClasses,
                    o = i.group,
                    n = void 0 === o ? null : o;
                _classCallCheck(this, t);
                var r = _possibleConstructorReturn(this, e.call(this));
                for (var s in (checkParamsSet(a), (r.group = n), (r.connectToClasses = a), r.connectToClasses)) {
                    var l = r.connectToClasses[s];
                    l.color || console.error("Data has no color:", l, "for class", s), l.radius || (console.error("Data has no radius:", l, "for class", s), (l.radius = 1));
                }
                return (r.cachedImage = null), (r.needsRedraw = true), (r.needsRedrawCheck = false), (r.connectionCount = -1), (r.drawDashed = false), r;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "VisualizeConnectionsComponent";
                        },
                    },
                ]),
                (t.prototype.destroy = function () {
                    this.cachedImage && this.cachedImage.destroy(true, true);
                }),
                (t.prototype.debugStr = function () {
                    var e = "draw connections: ";
                    for (var t in this.connectToClasses) e += t + " [" + JSON.stringify(this.connectToClasses[t]) + "] ";
                    return e;
                }),
                t
            );
        })(Component);

        class BuildingComponent extends Component {
            constructor() {
                super();
            }
        
            static get name() {
                return "BuildingComponent";
            }
        }

        class SpawnGraveOnDeathComponent extends Component {
            constructor({
                particleClass = null,
                fadeDuration = 5,
                randomFactor = 0,
                startAlpha = 0.3,
                destinationAlpha = 0,
                sprite = null,
                showOnMinimap = false,
            }) {
                super();
        
                this.particleClass = particleClass;
                this.fadeDuration = fadeDuration;
                this.randomFactor = randomFactor;
                this.destinationAlpha = destinationAlpha;
                this.startAlpha = startAlpha;
                this.sprite = sprite;
                this.showOnMinimap = showOnMinimap;
            }
        
            static get name() {
                return "SpawnGraveOnDeathComponent";
            }
        }
        
        const StorageComponent = (function (e) {
            function t(i) {
                var a = i.limits,
                    o = i.initialResources;
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(this, e.call(this));
                return (n.limits = a || {}), (n.resources = o || {}), (n.pending = newEmptyMap()), n;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "StorageComponent";
                        },
                    },
                ]),
                (t.prototype.getResources = function () {
                    return this.resources;
                }),
                (t.prototype.removeResource = function (e) {
                    delete this.limits[e], delete this.resources[e], delete this.pending[e];
                }),
                (t.prototype.getPendingResources = function () {
                    return this.pending;
                }),
                (t.prototype.getFirstLimit = function () {
                    for (var e in this.limits) return this.limits[e];
                    return 0;
                }),
                (t.prototype.debugStr = function () {
                    var e = "";
                    for (var t in this.resources) {
                        var i = ", " + (this.pending[t] || 0) + " pending";
                        (e += t + "(" + this.resources[t]), (e += " of " + (this.limits[t] + i) + ") ");
                    }
                    for (var a in this.limits)
                        if (void 0 === this.resources[a]) {
                            var o = ", " + (this.pending[a] || 0) + " pending";
                            e += a + "(0 of " + this.limits[a] + o + ") ";
                        }
                    return e;
                }),
                (t.prototype.fillAll = function () {
                    for (var e in this.limits) {
                        var t = this.pending[e] || 0;
                        this.resources[e] = this.limits[e] - t;
                    }
                }),
                (t.prototype.isAnyFull = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = false;
                    for (var i in this.limits) this.hasSpaceLeft(i, 1, e) || (t = true);
                    return t;
                }),
                (t.prototype.takeResource = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return null != this.resources[e] && this.resources[e] >= t && ((this.resources[e] -= t), true);
                }),
                (t.prototype.addResource = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    null == this.resources[e] && (this.resources[e] = 0), (this.resources[e] += t);
                }),
                (t.prototype.getResourceCount = function (e) {
                    return this.resources[e] || 0;
                }),
                (t.prototype.haveResourceAmount = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return this.getResourceCount(e) >= t;
                }),
                (t.prototype.getResourceLimit = function (e) {
                    return this.limits[e] || 0;
                }),
                (t.prototype.addPendingResources = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    null == this.pending[e] && (this.pending[e] = 0), null == this.resources[e] && (this.resources[e] = 0), (this.pending[e] += t);
                }),
                (t.prototype.takeRecipe = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    if (null == e || countObjectKeysUnsafe(e) < 1) throw new Error("invalid recipe");
                    var i = true;
                    for (var a in e) i = i && this.takeResource(a, e[a] * t);
                    return i;
                }),
                (t.prototype.resolvePendingResources = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    if (null == this.pending[e]) throw new Error("resolve: pending resource is null");
                    this.pending[e] < t ? (this.pending[e] = 0) : ((this.pending[e] -= t), (this.resources[e] += t), this.resources[e] > this.limits[e] && (this.resources[e] = this.limits[e]));
                }),
                (t.prototype.hasSpaceLeft = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        a = this.getResourceCount(e) + t;
                    return i || (a += this.pending[e] || 0), a <= this.getResourceLimit(e);
                }),
                (t.prototype.canBuildRecipe = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return 0 == this.getMissingResourcesForRecipe(e, t).length;
                }),
                (t.prototype.getMissingResourcesForRecipe = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    if (null == e || countObjectKeysUnsafe(e) < 1) throw new Error("invalid recipe");
                    var i = [];
                    for (var a in e) {
                        var o = e[a] * t;
                        this.haveResourceAmount(a, o) || i.push(a);
                    }
                    return i;
                }),
                t
            );
        })(Component),
        FastParticleSprite = (function () {
            function e(t) {
                _classCallCheck(this, e), (this._texture = t.baseTexture), (this.alive = true), (this.exists = true), (this.position = new Phaser.Point(0, 0)), (this.alpha = 1);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FastParticleSprite";
                        },
                    },
                ]),
                (e.prototype.kill = function () {
                    (this.alive = false), (this.exists = false);
                }),
                (e.prototype.revive = function () {
                    (this.alive = true), (this.exists = true);
                }),
                (e.prototype.destroy = function () {
                    (this._texture = null), (this.exists = false), (this.alive = false);
                }),
                _createClass(e, [
                    {
                        key: "x",
                        get: function () {
                            return this.position.x;
                        },
                        set: function (e) {
                            this.position.x = e;
                        },
                    },
                    {
                        key: "y",
                        get: function () {
                            return this.position.y;
                        },
                        set: function (e) {
                            this.position.y = e;
                        },
                    },
                ]),
                e
            );
        })(),
        FastParticleContainer = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.name = i),
                    (this.children = []),
                    (this.phaser = t),
                    (this.offsetX = 0),
                    (this.offsetY = 0),
                    (this.alive = true),
                    (this.exists = true),
                    (this.visible = true),
                    (this.renderCount = 0),
                    (this.renderCondition = null);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FastParticleContainer";
                        },
                    },
                ]),
                (e.prototype.add = function (e) {
                    this.children.push(e), (e.parent = this);
                }),
                (e.prototype.removeChild = function (e) {
                    fastArrayDeleteValue(this.children, e), (e.parent = null);
                }),
                (e.prototype.preUpdate = function () { }),
                (e.prototype.destroy = function () {
                    this.children.forEach(function (e) {
                        return e.destroy();
                    }),
                        (this.children = []);
                }),
                (e.prototype.destroyAllChildren = function () {
                    if (this.destroyPhase) throw new Error("destroyAllChildren while in destroy phase");
                    this.destroyPhase = true;
                    for (var e = 0; e < this.children.length; ++e) {
                        var t = this.children[e];
                        t.destroy(), (t.parent = void 0);
                    }
                    (this.children = []), (this.destroyPhase = false);
                }),
                (e.prototype.update = function () { }),
                (e.prototype.postUpdate = function () { }),
                (e.prototype.updateTransform = function () { }),
                (e.prototype._renderCanvas = function (e) {
                    var t = this.children.length;
                    if (((this.renderCount = 0), !(t < 1) && (!this.renderCondition || this.renderCondition()))) {
                        var i = this.children[0]._texture;
                        if (!i) throw (console.warn("Texture is empty:", this), new Error("stop"));
                        var a = e.resolution,
                            o = i.width / i.resolution,
                            n = i.height / i.resolution,
                            r = i.source,
                            s = this.parent.worldTransform,
                            l = s.a,
                            u = s.tx - (o / 2 - this.offsetX) * l,
                            c = s.ty - (n / 2 - this.offsetY) * l,
                            d = e.context;
                        d.save(), d.setTransform(1, 0, 0, 1, 0, 0), (d.globalCompositeOperation = "source-over");
                        for (var h = l * i.resolution * a * i.resolution, p = Math.round(o * h), g = Math.round(n * h), m = this.phaser.rootRecursiveRef.culling, _ = 0, f = 0; f < t; ++f) {
                            var b = this.children[f];
                            if (b.alive && b.alpha > 0.0039) {
                                var A = b.position.x * l + u,
                                    y = b.position.y * l + c;
                                m.isRectInView(b.position.x, b.position.y, o, n) && ((_ += 1), (d.globalAlpha = b.alpha), d.drawImage(r, Math.round(A * a), Math.round(y * a), p, g));
                            }
                        }
                        (this.renderCount = _), d.restore();
                    }
                }),
                e
            );
        })(),
        FastGroup = (function () {
            function e(t, i, a) {
                _classCallCheck(this, e),
                    (this.phaser = t),
                    (this.name = i),
                    (this.children = []),
                    (this.position = new Phaser.Point(0, 0)),
                    (a = a || this.phaser.world).addChild ? a.addChild(this) : (console.error("Parent has no addChild method:", a), a.add(this)),
                    (this.z = this.parent.children.length),
                    (this.worldTransform = new Phaser.Matrix()),
                    (this.visible = true),
                    (this.renderable = true),
                    (this.alive = true),
                    (this.exists = true),
                    (this.scale = 1),
                    (this.destroyPhase = false),
                    (this.renderCount = 0),
                    (this.cullingRadius = null),
                    (this.worldAlpha = 1);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FastGroup";
                        },
                    },
                ]),
                (e.prototype.destroy = function () {
                    if (this.destroyPhase) throw new Error("destroyed while in destroy phase");
                    (this.destroyPhase = true), this.parent && (this.parent instanceof Phaser.Group ? this.parent.remove(this) : this.parent.removeChild(this));
                    for (var e = 0; e < this.children.length; ++e) {
                        var t = this.children[e];
                        t.destroy(), (t.parent = void 0);
                    }
                    (this.children = []),
                        (this.parent = void 0),
                        (this.alive = false),
                        (this.exists = false),
                        (this.visible = false),
                        (this.renderable = false),
                        (this.worldTransform = null),
                        (this.destroyPhase = false),
                        (this.renderCondition = null),
                        (this.updateWhenInvisible = false);
                }),
                (e.prototype.kill = function () {
                    (this.alive = false), (this.exists = false), (this.visible = false);
                }),
                (e.prototype.revive = function () {
                    (this.alive = true), (this.exists = true), (this.visible = true);
                }),
                (e.prototype.destroyAllChildren = function () {
                    if (this.destroyPhase) throw new Error("destroyAllChildren while in destroy phase");
                    this.destroyPhase = true;
                    for (var e = 0; e < this.children.length; ++e) {
                        var t = this.children[e];
                        t.destroy(), (t.parent = void 0);
                    }
                    (this.children = []), (this.destroyPhase = false);
                }),
                (e.prototype.preUpdate = function () { }),
                (e.prototype.postUpdate = function () { }),
                (e.prototype.updateTransform = function () {
                    return this;
                }),
                (e.prototype.update = function () { }),
                (e.prototype._renderCanvas = function (e) {
                    if (this.parent && this.visible && this.renderable) {
                        var t = this.children.length,
                            i = this.children;
                        if (!this.renderCondition || this.renderCondition()) {
                            var a = this.parent.worldTransform;
                            (this.worldTransform.tx = this.position.x * a.a + a.tx), (this.worldTransform.ty = this.position.y * a.d + a.ty), (this.worldTransform.a = a.a * this.scale), (this.worldTransform.d = a.d * this.scale);
                            var o = this.phaser.rootRecursiveRef.culling,
                                n = 0;
                            if (this.cullingRadius)
                                for (var r = 0; r < t; ++r) {
                                    var s = i[r];
                                    s.visible && s.alive && (s.update(), o.isCircleInView(s.x, s.y, this.cullingRadius) && ((n += 1), s.updateTransform(), s._renderCanvas(e)));
                                }
                            else {
                                for (var l = 0; l < t; ++l) {
                                    var u = i[l];
                                    u.visible && u.alive && ((n += 1), u.update(), u.updateTransform(), u._renderCanvas(e));
                                }
                                this.cullWarningShown || (this.cullWarningShown = true);
                            }
                            (this.renderCount = n), this.children.length;
                        } else if (this.updateWhenInvisible)
                            for (var c = 0; c < t; ++c) {
                                var d = i[c];
                                d.alive && d.update();
                            }
                    }
                }),
                (e.prototype.addChild = function (e) {
                    e.parent && e.parent.removeChild(e), (e.parent = this), this.children.push(e);
                }),
                (e.prototype.add = function (e) {
                    this.addChild(e);
                }),
                (e.prototype.removeChild = function (e) {
                    if (!this.destroyPhase) {
                        var t = this.children.indexOf(e);
                        t >= 0 ? ((e.parent = void 0), this.children.splice(t, 1)) : console.error("[FAST GROUP] removeChild called, but child is not parented to this group! Child =", e, "This=", this);
                    }
                }),
                _createClass(e, [
                    {
                        key: "x",
                        get: function () {
                            return this.position.x;
                        },
                        set: function (e) {
                            this.position.x = e;
                        },
                    },
                    {
                        key: "y",
                        get: function () {
                            return this.position.y;
                        },
                        set: function (e) {
                            this.position.y = e;
                        },
                    },
                ]),
                e
            );
        })(),
        ParticleCache = (function () {
            function e(t, i, a, o) {
                var n = this;
                _classCallCheck(this, e), (this.metaClassInstance = new o()), this.metaClassInstance.initTexture(t), (this.cacheKey = i), (this.phaser = t);
                var r = this.metaClassInstance.renderMode;
                if (r === PARTICLE_RENDER_FAST)
                    Config.logParticleGroups && console.log("[PARTICLES] Using super fast rendering for", i),
                        (this.container = new FastParticleContainer(t, i)),
                        a.add(this.container),
                        this.metaClassInstance.isImportantParticle() ||
                        (this.container.renderCondition = function () {
                            return n.phaser.rootRecursiveRef.settings.enableParticles;
                        });
                else if (r === PARTICLE_RENDER_BATCH)
                    Config.logParticleGroups && console.log("[PARTICLES] Using fast group container for", i),
                        (this.container = new FastGroup(t, "ent-group-" + i, a)),
                        this.metaClassInstance.isImportantParticle() ||
                        (this.container.renderCondition = function () {
                            return n.phaser.rootRecursiveRef.settings.enableParticles;
                        }),
                        this.metaClassInstance.needsUpdates() && (this.container.updateWhenInvisible = true),
                        this.metaClassInstance.enableCullingRadius
                            ? ((this.container.cullingRadius = this.metaClassInstance.enableCullingRadius), Config.logParticleGroups && console.log("[PARTICLES] Culling with r=", this.container.cullingRadius, "for", i))
                            : console.warn("[PARTICLES] No culling radius set on", i, "!");
                else if (r === PARTICLE_RENDER_REGULAR) Config.logParticleGroups && console.log("[PARTICLES] Using regular sprites for", i), (this.container = t.make.group(null, i)), a.add(this.container);
                else {
                    if (r !== PARTICLE_RENDER_NONE) throw new Error("Unkown render mode: " + r);
                    this.container = null;
                }
                this.metaClassInstance.onContainerCreated(this.container), (this.deletedCache = []), (this.count = 0), (this.maxCount = 0);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ParticleCache";
                        },
                    },
                ]),
                (e.prototype.spawnNew = function (e, t, i) {
                    var a;
                    if (((this.count += 1), (this.maxCount = Math.max(this.maxCount, this.count)), this.deletedCache.length > 0)) {
                        var o,
                            n = this.deletedCache.pop();
                        return (o = this.metaClassInstance).reviveParticle.apply(o, [n].concat(_toConsumableArray(i))), n.position.setTo(e, t), (n.alpha = 1), n;
                    }
                    var r = (a = this.metaClassInstance).makeParticle.apply(a, [this.phaser].concat(_toConsumableArray(i)));
                    return r.position.setTo(e, t), (r.particleCacheKey = this.cacheKey), this.container && this.container.add(r), r;
                }),
                (e.prototype.kill = function (e) {
                    if (this.deletedCache.indexOf(e) >= 0) throw new Error("tried to kill particle twice on " + this.cacheKey);
                    if (this.count <= 0) throw new Error("spawn/kill mismatch on " + this.cacheKey);
                    (this.count -= 1), e.kill(), this.deletedCache.push(e);
                }),
                (e.prototype.killEntity = function () {
                    if (this.count <= 0) throw new Error("spawn/kill mismatch on" + this.cacheKey);
                    this.count -= 1;
                }),
                (e.prototype.clearAll = function () {
                    this.container && clearGroup(this.container), (this.count = 0), (this.deletedCache = []);
                }),
                (e.prototype.getRenderCount = function () {
                    switch (this.metaClassInstance.renderMode) {
                        case PARTICLE_RENDER_FAST:
                        case PARTICLE_RENDER_BATCH:
                            return this.container.renderCount;
                        default:
                            return this.count;
                    }
                }),
                (e.prototype.getStatsText = function () {
                    var e = "",
                        t = "",
                        i = 0;
                    switch (this.metaClassInstance.renderMode) {
                        case PARTICLE_RENDER_FAST:
                            (e = "fast"), (i = this.container.renderCount);
                            break;
                        case PARTICLE_RENDER_BATCH:
                            (e = "batch"), (i = this.container.renderCount), (t = "(cul" + Math.round(this.container.cullingRadius) + ") ");
                            break;
                        case PARTICLE_RENDER_REGULAR:
                            e = "regular";
                            break;
                        case PARTICLE_RENDER_NONE:
                            e = "none";
                            break;
                        default:
                            e = "unkown";
                    }
                    var a = "<span class='particle_badge mode_" + e + "'>" + e + "</span>";
                    return t + " <i>" + this.count + "</i> (cache <i>" + this.deletedCache.length + "</i>) (vis <i>" + i + "</i>) " + a;
                }),
                e
            );
        })(),
        ParticleFactory = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.caches = newEmptyMap()), (this.particleContainer = this.root.groups.particlesGroup), (this.specialGroups = {});
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ParticleFactory";
                        },
                    },
                ]),
                (e.prototype.registerSpecialGroup = function (e, t) {
                    this.specialGroups[e] = t;
                }),
                (e.prototype.getParticleStatsText = function () {
                    var e = 0,
                        t = 0,
                        i = 0,
                        a = "<b>Particles</b><br />";
                    for (var o in this.caches) {
                        var n = this.caches[o];
                        o.startsWith("AnimLevel") || (a += "<b>" + o.replace("Meta", "") + "</b> " + n.getStatsText() + "<br />"), (e += n.count), (i += n.maxCount), (t += n.getRenderCount());
                    }
                    return (a += "Total: <b>" + e + "</b> | Rendered: <b>" + t + "</b> | Max: <b>" + i + "</b><br />");
                }),
                (e.prototype.spawnNew = function (e, t, i, a) {
                    var o = i.name,
                        n = this.caches[o];
                    if (null == n) {
                        var r = this.specialGroups[o] || this.particleContainer;
                        Config.logParticleGroups && this.specialGroups[o] && console.log("[PARTICLES] Using custom group for", o), (n = new ParticleCache(this.root.phaser, o, r, i)), (this.caches[o] = n);
                    }
                    return n.spawnNew(e, t, a || []);
                }),
                (e.prototype.clearAll = function () {
                    for (var e in this.caches) this.caches[e].clearAll();
                }),
                (e.prototype.kill = function (e) {
                    if (!e.particleCacheKey) throw new Error("particle not registered");
                    this.caches[e.particleCacheKey].kill(e);
                }),
                (e.prototype.tryKillEntity = function (e) {
                    e.particleCacheKey && this.caches[e.particleCacheKey].killEntity(e);
                }),
                e
            );
        })(),
        MetaParticle = (function () {
            function e() {
                _classCallCheck(this, e), (this.width = 24), (this.height = 24), (this.paddingX = 0), (this.paddingY = 0), (this.tint = 16777215), (this.renderMode = PARTICLE_RENDER_FAST);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaParticle";
                        },
                    },
                ]),
                (e.prototype.isImportantParticle = function () {
                    return false;
                }),
                (e.prototype.needsUpdates = function () {
                    return false;
                }),
                (e.prototype.initTexture = function (e) {
                    if (((this.precomputedTexture = this.generateTexture(e)), null == this.precomputedTexture)) throw new Error("Precomputed texture was null");
                }),
                (e.prototype.makeParticle = function (e) {
                    if (this.renderMode === PARTICLE_RENDER_FAST) return new FastParticleSprite(this.precomputedTexture);
                    var t = e.make.image(this.paddingX, this.paddingY, this.precomputedTexture);
                    return t.anchor.setTo(0.5), t;
                }),
                (e.prototype.reviveParticle = function (e) {
                    e.revive(), (e.alpha = 1);
                }),
                (e.prototype.generateTexture = function () {
                    throw new Error("abstract");
                }),
                (e.prototype.onContainerCreated = function () { }),
                e
            );
        })(),
        MetaSingleSpriteParticle = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this));
                if (null == i) throw new Error("sprite key is null");
                return (a.spriteKey = i), (a.enableCullingRadius = Math.hypot(a.width / 2, a.height / 2)), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaSingleSpriteParticle";
                        },
                    },
                ]),
                (t.prototype.generateTexture = function (e) {
                    var t = e.make.group(),
                        i = e.make.image(0, 0, "atlas", this.spriteKey);
                    (i.width = this.width), (i.height = this.height), (i.tint = this.tint), i.position.setTo(this.paddingX, this.paddingY), t.addChild(i);
                    var a = t.generateTexture();
                    return t.destroy(), a;
                }),
                (t.prototype.getPreviewSpritePath = function () {
                    return this.spriteKey;
                }),
                t
            );
        })(MetaParticle),
        MetaRectangleParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.renderMode = PARTICLE_RENDER_BATCH), (i.enableCullingRadius = Math.hypot(i.width / 2, i.height / 2)), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaRectangleParticle";
                        },
                    },
                ]),
                (t.prototype.generateTexture = function (e) {
                    var t = e.make.graphics();
                    return t.beginFill(this.tint), t.drawRect(0, 0, this.width, this.height), t.endFill(), t.generateTexture();
                }),
                t
            );
        })(MetaParticle),
        MetaGravestoneParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "grave-stone.png"));
                return (i.width = 20), (i.height = 20), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaGravestoneParticle";
                        },
                    },
                ]),
                (t.prototype.isImportantParticle = function () {
                    return true;
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaWallDestroyedParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "destroyed-wall-indicator.png"));
                return (i.width = 20), (i.height = 20), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaWallDestroyedParticle";
                        },
                    },
                ]),
                (t.prototype.isImportantParticle = function () {
                    return true;
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaGoldMineDecorativeParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.width = 20), (i.height = 20), (i.tint = Config.colors.gold), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaGoldMineDecorativeParticle";
                        },
                    },
                ]),
                t
            );
        })(MetaRectangleParticle),
        MetaBuildingAnimationParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.width = 20), (i.height = 20), (i.tint = Config.colors.levels[0]), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaBuildingAnimationParticle";
                        },
                    },
                ]),
                t
            );
        })(MetaRectangleParticle),
        MetaSkillAnimationParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.width = 12), (i.height = 12), (i.tint = Config.colors.skillUnlocked), (i.enableCullingRadius = null), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaSkillAnimationParticle";
                        },
                    },
                ]),
                t
            );
        })(MetaRectangleParticle),
        MetaZombieAttackParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "zombie-attack.png"));
                return (i.width = 26), (i.height = 26), (i.renderMode = PARTICLE_RENDER_FAST), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaZombieAttackParticle";
                        },
                    },
                ]),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaCircularParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this)),
                    a = i.spriteRadius();
                return (i.width = 2 * a), (i.height = 2 * a), (i.outlineOnly = false), (i.enableCullingRadius = a), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaCircularParticle";
                        },
                    },
                ]),
                (t.prototype.spriteRadius = function () {
                    return 3;
                }),
                (t.prototype.spriteColor = function () {
                    return 7829367;
                }),
                (t.prototype.lineSize = function () {
                    return 3;
                }),
                (t.prototype.generateTexture = function (e) {
                    var t = e.make.graphics();
                    t.beginFill(16777215, 0),
                        t.drawRect(-10, -10, 20, 20),
                        this.outlineOnly
                            ? (t.lineStyle(this.lineSize(), this.spriteColor()), t.drawCircle(0, 0, 2 * this.spriteRadius()))
                            : (t.beginFill(2236962, 0.4),
                                t.drawCircle(0.5, 2, 2 * this.spriteRadius() + 4),
                                t.beginFill(mixColorPerChannel(this.spriteColor(), 0.4, 51), 1),
                                t.drawCircle(0.5, 2, 2 * this.spriteRadius()),
                                t.beginFill(this.spriteColor()),
                                t.drawCircle(0, 0, 2 * this.spriteRadius())),
                        t.endFill();
                    var i = t.generateTexture();
                    return t.destroy(), i;
                }),
                t
            );
        })(MetaParticle),
        MetaCannonExplosionParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.renderMode = PARTICLE_RENDER_BATCH), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaCannonExplosionParticle";
                        },
                    },
                ]),
                (t.prototype.spriteRadius = function () {
                    return 100;
                }),
                (t.prototype.spriteColor = function () {
                    return 15658734;
                }),
                t
            );
        })(MetaCircularParticle),
        MetaEnemyExplosionParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.renderMode = PARTICLE_RENDER_BATCH), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaEnemyExplosionParticle";
                        },
                    },
                ]),
                (t.prototype.spriteRadius = function () {
                    return 100;
                }),
                (t.prototype.spriteColor = function () {
                    return 16742263;
                }),
                t
            );
        })(MetaCircularParticle),
        MetaCriticalHitParticle = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteRadius = function () {
                    return 40;
                }),
                (t.prototype.spriteColor = function () {
                    return 1764852;
                }),
                (t.prototype.generateTexture = function (e) {
                    var t = e.make.graphics();
                    t.lineStyle(1, this.spriteColor());
                    var i = 25;
                    drawJaggedLine(t, [0, 0], [30, i]), drawJaggedLine(t, [0, 0], [-i, 20]), drawJaggedLine(t, [0, 0], [22, -18]), drawJaggedLine(t, [0, 0], [-22, -i]), t.endFill();
                    var a = t.generateTexture();
                    return t.destroy(), a;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaCriticalHitParticle";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        MinedGold = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.minedGold;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MinedGold";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        RawWood = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.rawWood;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RawWood";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        UnprocessedWood = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.unprocessedWood;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UnprocessedWood";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        ProcessedWood = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.processedWood;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProcessedWood";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        RawGold = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.gold;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RawGold";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        RawIron = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.rawIron;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RawIron";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        Uranium = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.uranium;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Uranium";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        MinedUranium = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.minedUranium;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MinedUranium";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        Power = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.power;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Power";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        UnprocessedIron = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.unprocessedIron;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UnprocessedIron";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        Steel = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.steel;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Steel";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        BasicArrow = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.basicArrow;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BasicArrow";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        Cannonball = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.spriteColor = function () {
                    return Config.colors.cannonball;
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Cannonball";
                        },
                    },
                ]),
                t
            );
        })(MetaCircularParticle),
        Healing = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.outlineOnly = true), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Healing";
                        },
                    },
                ]),
                (t.prototype.spriteColor = function () {
                    return Config.colors.healing;
                }),
                (t.prototype.spriteRadius = function () {
                    return 5;
                }),
                (t.prototype.lineSize = function () {
                    return 2;
                }),
                t
            );
        })(MetaCircularParticle),
        DodgeComponent = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this));
                return (a.chance = i), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DodgeComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return 100 * this.chance + "% chance to doge";
                }),
                t
            );
        })(Component),
        Entity = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.phaser = t), (this.level = 0), (this.components = newEmptyMap()), (this.uniqueID = ENTITY_UID_COUNTER), (ENTITY_UID_COUNTER += 1);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Entity";
                        },
                    },
                ]),
                (e.prototype.toString = function () {
                    throw new Error("cannot convert to string");
                }),
                (e.prototype.getMinimapColor = function () {
                    return 16777215;
                }),
                (e.prototype.getMinimapScale = function () {
                    return 1;
                }),
                (e.prototype.destroy = function () {
                    for (var e in this.components) this.components[e].destroy();
                }),
                (e.prototype.useInPathfinding = function () {
                    return false;
                }),
                (e.prototype.isDynamic = function () {
                    return false;
                }),
                (e.prototype.worldSpaceTileCenter = function () {
                    return [this.position.x + Config.tileSize / 2, this.position.y + Config.tileSize / 2];
                }),
                (e.prototype.getTileX = function () {
                    return Math.round(this.position.x / Config.tileSize);
                }),
                (e.prototype.getTileY = function () {
                    return Math.round(this.position.y / Config.tileSize);
                }),
                (e.prototype.getTile = function () {
                    return [this.getTileX(), this.getTileY()];
                }),
                (e.prototype.getTileNonSnapped = function () {
                    return [this.position.x / Config.tileSize, this.position.y / Config.tileSize];
                }),
                (e.prototype.getWorldPos = function () {
                    return [this.position.x, this.position.y];
                }),
                (e.prototype.tileDistanceTo = function (e) {
                    return distanceEuclidian(this.getTile(), e.getTile());
                }),
                (e.prototype.tileDistanceToNonSnapped = function (e) {
                    return distanceEuclidian(this.getTileNonSnapped(), e.getTileNonSnapped());
                }),
                (e.prototype.worldDistanceTo = function (e) {
                    return distanceEuclidian([this.position.x, this.position.y], [e.position.x, e.position.y]);
                }),
                (e.prototype.addComponent = function (e) {
                    var t = e.constructor.name;
                    if (null == t) throw new Error("Component has no id: " + e);
                    (this.components[t] = e), this.registered && this.phaser.rootRecursiveRef.entityMgr.registerPostLoadComponent(this, t);
                }),
                (e.prototype.hasComponent = function (e) {
                    return null != this.components[e.name];
                }),
                (e.prototype.hasComponentId = function (e) {
                    return null != this.components[e];
                }),
                (e.prototype.getComponent = function (e) {
                    return this.getComponentById(e.name);
                }),
                (e.prototype.getComponentById = function (e) {
                    return this.components[e] || null;
                }),
                (e.prototype.removeComponent = function (e) {
                    delete this.components[e.name];
                }),
                (e.prototype.mouseIsAboveEntity = function () {
                    var e = getWorldSpaceMouse(this.phaser),
                        t = _slicedToArray(e, 2),
                        i = t[0],
                        a = t[1];
                    return i >= this.position.x && a >= this.position.y && i <= this.position.x + Config.tileSize && a <= this.position.y + Config.tileSize;
                }),
                (e.prototype.takeDamage = function (e) {
                    if (!(arguments.length > 1 && void 0 !== arguments[1] && arguments[1])) {
                        var t = this.getComponent(DodgeComponent);
                        if (t && Math.random() < t.chance) return;
                        var i = this.getComponent(StorageComponent);
                        if (i && i.takeResource(Healing.name)) return;
                    }
                    this.takeTrueDamage(e);
                }),
                (e.prototype.takeTrueDamage = function (e) {
                    this.getComponent(HealthComponent).onDamage(e);
                }),
                _createClass(e, [
                    {
                        key: "minimapColor",
                        get: function () {
                            return this.cachedMinimapColor || (this.cachedMinimapColor = this.getMinimapColor()), this.cachedMinimapColor;
                        },
                    },
                ]),
                e
            );
        })(),
        EntityRenderObject = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(this, e.call(this, i)),
                    r = tileToWorld(a, o),
                    s = _slicedToArray(r, 2),
                    l = s[0],
                    u = s[1];
                return (
                    (n.position = new Phaser.Point(l, u)),
                    (n.parent = void 0),
                    (n.worldTransform = new Phaser.Matrix()),
                    (n.visible = true),
                    (n.renderable = true),
                    (n.alive = true),
                    (n.exists = true),
                    (n.worldAlpha = 1),
                    (n.children = []),
                    (n.destroyPhase = false),
                    n
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EntityRenderObject";
                        },
                    },
                ]),
                (t.prototype.addChild = function (e) {
                    e.parent && e.parent.removeChild(e), (e.parent = this), this.children.push(e);
                }),
                (t.prototype.removeChild = function (e) {
                    e.parent = void 0;
                    var t = this.children.indexOf(e);
                    t >= 0 && this.children.splice(t, 1);
                }),
                (t.prototype.destroy = function () {
                    if ((e.prototype.destroy.call(this), this.destroyPhase)) throw new Error("destroyed while in destroy phase");
                    (this.destroyPhase = true), this.parent && (this.parent instanceof Phaser.Group ? this.parent.remove(this) : this.parent.removeChild(this));
                    for (var t = 0; t < this.children.length; ++t) this.children[t].destroy();
                    (this.children = []), (this.parent = void 0), (this.alive = false), (this.exists = false), (this.visible = false), (this.renderable = false), (this.worldTransform = null), (this.destroyPhase = false);
                }),
                (t.prototype.preUpdate = function () { }),
                (t.prototype.update = function () { }),
                (t.prototype.postUpdate = function () { }),
                (t.prototype.updateTransform = function () {
                    return this;
                }),
                (t.prototype._renderCanvas = function (e) {
                    if (this.visible && this.renderable && this.parent) {
                        var t = this.position,
                            i = this.parent.worldTransform;
                        (this.worldTransform.tx = t.x * i.a + i.tx), (this.worldTransform.ty = t.y * i.d + i.ty), (this.worldTransform.a = i.a), (this.worldTransform.d = i.d);
                        for (var a = this.children.length, o = 0; o < a; ++o) {
                            var n = this.children[o];
                            n.alive && (n.updateTransform(), n._renderCanvas(e));
                        }
                    }
                }),
                _createClass(t, [
                    {
                        key: "x",
                        get: function () {
                            return this.position.x;
                        },
                        set: function (e) {
                            this.position.x = e;
                        },
                    },
                    {
                        key: "y",
                        get: function () {
                            return this.position.y;
                        },
                        set: function (e) {
                            this.position.y = e;
                        },
                    },
                ]),
                t
            );
        })(Entity),
        BuildingInstance = (function (e) {
            function t(i, a, o, n) {
                _classCallCheck(this, t);
                var r = _possibleConstructorReturn(this, e.call(this, i, o, n));
                return (
                    (r.meta = a),
                    (r.level = 0),
                    r.addComponent(new BuildingComponent()),
                    r.addComponent(new HealthComponent({ maxHealth: 1e3 })),
                    r.addComponent(new HealthBarComponent({ style: "regular" })),
                    r.addComponent(new RegenHealthOnDayComponent({ regenPercentPerSecond: 2 })),
                    r.addComponent(new SpawnGraveOnDeathComponent({ particleClass: null, fadeDuration: 55, startAlpha: 0.5, destinationAlpha: 0.25, sprite: r.meta.getPreviewSpritePath(), showOnMinimap: true })),
                    r
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingInstance";
                        },
                    },
                ]),
                (t.prototype.getLevel = function () {
                    return this.level;
                }),
                (t.prototype.getMinimapColor = function () {
                    return pastellizeColor(this.meta.getBackgroundColor());
                }),
                (t.prototype.updateComponentsToStats = function (e) {
                    var t = e.health;
                    if (t) {
                        var i = this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("health");
                        this.getComponent(HealthComponent).changeMaxHealth(t * i);
                    } else console.error("'health' key missing in stats! Fix balancing for", this.constructor.name);
                }),
                (t.prototype.addVisualizeConnections = function (e) {
                    var t = [];
                    e.forEach(function (e) {
                        var i = window.GLOBAL_BUILDING_REGISTRY.getMetaclassByClassHandle(e);
                        t[i.getInstanceClass().name] = { color: 5592405, radius: i.getRadius(), alpha: 0.9, lineSize: 2 };
                    }),
                        this.addComponent(new VisualizeConnectionsComponent({ connectToClasses: t }));
                }),
                t
            );
        })(EntityRenderObject),
        PlayerBaseComponent = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.debugStr = function () {
                    return "Player Base";
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PlayerBaseComponent";
                        },
                    },
                ]),
                t
            );
        })(Component),
        UniqueRequirement = (function (e) {
            function t(i) {
                var a = i.errorText,
                    o = i.buildingType,
                    n = i.maxInstances,
                    r = void 0 === n ? 1 : n;
                _classCallCheck(this, t);
                var s = _possibleConstructorReturn(this, e.call(this, a));
                return (s.buildingType = o), (s.maxInstances = r), s;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UniqueRequirement";
                        },
                    },
                ]),
                (t.prototype.check = function (e) {
                    return e.logic.countBuildings(this.buildingType) < this.maxInstances;
                }),
                (t.prototype.dependsOnPosition = function () {
                    return false;
                }),
                t
            );
        })(BuildingRequirement);

        class EnemyAIComponent extends Component {
            constructor({
                speedTilesPerSecond = 1,
                farSpeedBoost = 10,
                nearDistanceTiles = 6,
                farDistanceTiles = 20,
            }) {
                super();
        
                this.speedTilesPerSecond = speedTilesPerSecond;
                this.farSpeedBoost = farSpeedBoost;
                this.nearDistanceTiles = nearDistanceTiles;
                this.farDistanceTiles = farDistanceTiles;
                this.targetsBaseOnly = false;
                this.currentAttackTargetTile = null;
            }
        
            static get name() {
                return "EnemyAIComponent";
            }
        }
        
        class DamageOnHitComponent extends Component {
            constructor({ targetClass, damage, hitsPerSecond, maxRadiusTiles = meleeAttackDistance, attackParticle = null, attackStyle = ATTACK_REGULAR }) {
                super();
                this.targetClass = targetClass;
                this.damage = damage;
                this.maxRadiusTiles = maxRadiusTiles;
                this.hitTimer = this.makeTimerFromTicksPerSecond(hitsPerSecond);
                this.attackParticle = attackParticle;
                this.attackStyle = attackStyle;
                this.penetratesShields = false;
            }
        
            static get name() {
                return "DamageOnHitComponent";
            }
        }
        
        class GrantOnKillComponent extends Component {
            constructor({ resources }) {
                super();
                this.resources = resources;
                for (let resource in this.resources) {
                    let amount = this.resources[resource];
                    if (amount == null || amount < 0) {
                        throw new Error(`Invalid amount: ${amount}`);
                    }
                }
                this.hitByProjectile = false;
            }
        
            static get name() {
                return "GrantOnKillComponent";
            }
        
            onExternalDamage() {
                this.hitByProjectile = true;
            }
        }
        
        class FlashOnDamageComponent extends Component {
            constructor() {
                super();
                this.lastFlashTime = 0;
                this.lastHealthRecorded = 0;
            }
        
            static get name() {
                return "FlashOnDamageComponent";
            }
        
            debugStr() {
                return "flashes red on damage";
            }
        }
        
        class BurnsOnDayComponent extends Component {
            constructor({ loseHealthPercent = 2, ticksPerSecond = 1 }) {
                super();
                this.loseHealthPercent = loseHealthPercent;
                let randomFactor = Math.random();
                this.loseHealthTimer = this.makeTimerFromTicksPerSecond(ticksPerSecond + randomFactor);
            }
        
            static get name() {
                return "BurnsOnDayComponent";
            }
        }
        
        class FlipToMovementDirectionComponent extends Component {
            constructor() {
                super();
                this.lastX = 0;
            }
        
            static get name() {
                return "FlipToMovementDirectionComponent";
            }
        }
        
        class PhysicsComponent extends Component {
            constructor() {
                super();
                this.velocityX = 0;
                this.velocityY = 0;
                this.desiredVelocityX = 0;
                this.desiredVelocityY = 0;
                this.velocityChangeSmoothness = 2;
                this.bodySize = 10;
            }
        
            static get name() {
                return "PhysicsComponent";
            }
        }   

        class Enemy extends EntityRenderObject {
            constructor(i, a, o, n, r) {
                super(i, a, o);
        
                this.level = n;
                this.balancing = r;
                this.uniqueId = idPool;
                idPool += 1;
        
                this.addComponent(new EnemyAIComponent({ speedTilesPerSecond: r.speed(n) }));
                this.addComponent(new SpawnGraveOnDeathComponent({ particleClass: MetaGravestoneParticle, randomFactor: 1 }));
                this.addComponent(new FlipToMovementDirectionComponent({}));
                this.addComponent(new HealthComponent({ maxHealth: r.health(n) }));
                this.addComponent(new HealthBarComponent({ style: "bar" }));
                this.addComponent(new BurnsOnDayComponent({}));
                this.addComponent(new GrantOnKillComponent({ resources: { gems: r.grantsGold(n) } }));
        
                if (r.damage && r.hitsPerSecond) {
                    this.addComponent(new DamageOnHitComponent({
                        targetClass: BuildingInstance,
                        damage: r.damage(n),
                        hitsPerSecond: r.hitsPerSecond(n),
                    }));
                }
        
                this.addComponent(new FlashOnDamageComponent());
                this.addComponent(new PhysicsComponent());
                this.makeSprite(this.level);
            }
        
            static get name() {
                return "Enemy";
            }
        
            getUniqueId() {
                return this.uniqueId;
            }
        
            isDynamic() {
                return true;
            }
        
            useInPathfinding() {
                return false;
            }
        }
        
        const ProjectileShooterComponent = (function (e) {
            function t(i) {
                var a = i.projectileClass,
                    o = i.projectileParams,
                    n = void 0 === o ? null : o,
                    r = i.shootsPerSecond,
                    s = void 0 === r ? 1 : r,
                    l = i.radius,
                    u = void 0 === l ? 1 : l,
                    c = i.destinationClass,
                    d = void 0 === c ? Enemy : c,
                    h = i.consumeResource,
                    p = void 0 === h ? null : h,
                    g = i.consumeAmount,
                    m = void 0 === g ? 1 : g,
                    _ = i.canCriticalStrike,
                    f = void 0 !== _ && _;
                _classCallCheck(this, t);
                var b = _possibleConstructorReturn(this, e.call(this));
                return (
                    checkParamsSet(a),
                    checkParamsSet(d),
                    (b.projectileClass = a),
                    (b.projectileParams = n || {}),
                    (b.radius = u),
                    (b.destinationClass = d),
                    (b.consumeResource = p ? p.name : null),
                    (b.consumeAmount = m),
                    b.setShootsPerSecond(s),
                    (b.canCriticalStrike = f),
                    (b.lastShootTime = null),
                    b
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProjectileShooterComponent";
                        },
                    },
                ]),
                (t.prototype.setShootsPerSecond = function (e) {
                    checkParamsSet(e), (this.timer = this.makeTimerFromTicksPerSecond(e));
                }),
                (t.prototype.getShootsPerSecond = function () {
                    return this.timer.getTicksPerSecond();
                }),
                (t.prototype.debugStr = function () {
                    var e;
                    e = this.timer.getTicksPerSecond() * this.projectileParams.damage;
                    var t = "shoot " + this.timer.getTicksPerSecond() + " " + this.projectileClass.name;
                    return (
                        (t += " /s at " + this.destinationClass.name + ", params " + JSON.stringify(this.projectileParams)),
                        (t += ", radius " + roundDecimals(this.radius, 2)),
                        (t += ", consumeResource " + this.consumeResource + " x " + this.consumeAmount + ", DPS " + e),
                        this.canCriticalStrike && (t += " [can crit]"),
                        (t += " lastShootAt " + this.lastShootTime)
                    );
                }),
                t
            );
        })(Component),
        FastCore = function () { };
    (FastCore.install = function (e) {
        Phaser.Utils.mixinPrototype(this, FastCore.prototype), (this.components = {});
        for (var t = 0; t < e.length; t++) {
            var i = e[t],
                a = false;
            if (("Destroy" === i && (a = true), !Phaser.Component[i])) throw new Error("Unkown component: " + i);
            Phaser.Utils.mixinPrototype(this, Phaser.Component[i].prototype, a), (this.components[i] = true);
        }
    }),
        (FastCore.init = function (e, t, i, a, o) {
            (this.game = e),
                (this.key = a),
                (this.data = {}),
                this.position.set(t, i),
                (this.world = new Phaser.Point(t, i)),
                (this.previousPosition = new Phaser.Point(t, i)),
                (this.events = new Phaser.Events(this)),
                (this._bounds = new Phaser.Rectangle()),
                this.components.Animation && (this.animations = new Phaser.AnimationManager(this)),
                this.components.LoadTexture && null !== a && this.loadTexture(a, o),
                this.components.FixedToCamera && (this.cameraOffset = new Phaser.Point(t, i));
        }),
        (FastCore.preUpdate = function () {
            if (!this.exists || !this.parent.exists) return (this.renderOrderID = -1), false;
            var e = this.game.camera,
                t = this.worldTransform;
            return (this.world.x = e.x + t.tx), (this.world.y = e.y + t.ty), this.visible && (this.renderOrderID = this.game.stage.currentRenderOrderID++), this.preUpdateChildren(), true;
        }),
        (FastCore.prototype = {
            game: null,
            components: {},
            z: 0,
            events: void 0,
            animations: void 0,
            key: "",
            world: null,
            renderOrderID: 0,
            _bounds: null,
            _exists: true,
            exists: {
                get: function () {
                    return this._exists;
                },
                set: function (e) {
                    e ? ((this._exists = true), (this.visible = true)) : ((this._exists = false), (this.visible = false));
                },
            },
            preUpdateChildren: function () { },
            update: function () { },
            postUpdate: function () { },
        });
    var FastImage = function (e, t, i, a, o) {
        (t = t || 0),
            (i = i || 0),
            (a = a || null),
            (o = o || null),
            (this.type = Phaser.IMAGE),
            _pixi.PIXI.Sprite.call(this, Phaser.Cache.DEFAULT),
            FastCore.init.call(this, e, t, i, a, o),
            "atlas" === a && this.scale.setTo(e.resolution);
    };
    (FastImage.prototype = Object.create(_pixi.PIXI.Sprite.prototype)),
        (FastImage.prototype.constructor = FastImage),
        FastCore.install.call(FastImage.prototype, ["Angle", "Animation", "Destroy", "FixedToCamera", "LifeSpan", "LoadTexture"]),
        (FastImage.prototype.preUpdate = FastCore.preUpdate);
    var SeekingProjectile = (function (e) {
        function t(i, a) {
            _classCallCheck(this, t);
            var o = _possibleConstructorReturn(this, e.call(this, i, 0, 0, a));
            return (o.phaser = i), o.anchor.setTo(0.5, 0.5), (o.angleOffset = 90), o;
        }
        return (
            _inherits(t, e),
            _createClass(t, null, [
                {
                    key: "name",
                    get: function () {
                        return "SeekingProjectile";
                    },
                },
            ]),
            (t.prototype.onSpawned = function (e) {
                var t = e.projectileParams,
                    i = e.targetEntity,
                    a = e.finishCallback,
                    o = e.criticalChance,
                    n = e.criticalMultiplier;
                (this.speedTilesPerSecond = t.speedTilesPerSecond),
                    (this.damage = t.damage),
                    (this.finishCallback = a),
                    (this.targetEntity = i),
                    (this.criticalChance = o),
                    (this.criticalMultiplier = n),
                    i.getComponent(HealthComponent).addPendingDamage(this.damage);
            }),
            (t.prototype.approachTo = function (e) {
                var t = this.x - e[0],
                    i = this.y - e[1],
                    a = vectorLength(t, i);
                if (a < 5) return this.onHit(), void this.finishCallback();
                var o = this.speedTilesPerSecond * Config.tileSize,
                    n = Math.min(1, (1 / a) * o * this.phaser.rootRecursiveRef.time.physicsElapsed);
                if (n > 0.995) return this.onHit(), void this.finishCallback();
                (this.x -= t * n), (this.y -= i * n);
            }),
            (t.prototype.onHit = function () {
                applyProjectileStrike({ target: this.targetEntity, phaser: this.phaser, damage: this.damage, criticalChance: this.criticalChance, criticalMultiplier: this.criticalMultiplier }),
                    this.phaser.rootRecursiveRef.sound.playArrowSound(this.x, this.y);
            }),
            (t.prototype.update = function () {
                if (this.alive && !(Config.gameTimeSpeedUpFactor < 1))
                    if (this.targetEntity && this.targetEntity.alive) {
                        var e = this.targetEntity.worldSpaceTileCenter();
                        this.approachTo(e), (this.angle = Phaser.Math.radToDeg(Math.atan2(e[1] - this.y, e[0] - this.x)) - this.angleOffset);
                    } else this.finishCallback();
            }),
            t
        );
    })(FastImage),
        LinearProjectile = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, 0, 0, a));
                return (o.phaser = i), o.anchor.setTo(0.5, 0.5), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "LinearProjectile";
                        },
                    },
                ]),
                (t.prototype.onSpawned = function (e) {
                    var t = e.projectileParams,
                        i = e.targetEntity,
                        a = e.targetClass,
                        o = e.finishCallback,
                        n = e.criticalChance,
                        r = e.criticalMultiplier;
                    this.alpha = 1;
                    var s = t.speedTilesPerSecond,
                        l = t.damage,
                        u = t.aoeRadiusTiles,
                        c = t.explosionClass;
                    (this.speedTilesPerSecond = s),
                        (this.damage = l),
                        (this.aoeRadiusTiles = u),
                        (this.explosionClass = c),
                        (this.criticalChance = n),
                        (this.criticalMultiplier = r),
                        (this.targetClass = a),
                        (this.finishCallback = o),
                        (this.targetEntity = i),
                        (this.direction = null),
                        (this.startPos = null),
                        (this.maxDistance = null);
                }),
                (t.prototype.computeDirection = function () {
                    this.startPos = [this.x, this.y];
                    var e = this.targetEntity.worldSpaceTileCenter();
                    (this.direction = normalizedDirection(this.startPos, e)), (this.maxDistance = distanceEuclidian(this.startPos, e));
                }),
                (t.prototype.applyDamage = function () {
                    var e = this;
                    if (isValidWorldCoordinate(this.x, this.y)) {
                        for (
                            var t = this.aoeRadiusTiles + 0.25,
                            i = this.phaser.rootRecursiveRef.map.findDynamicEntitiesInRadiusWorldSpace({
                                x: this.x,
                                y: this.y,
                                radius: t * Config.tileSize,
                                condition: function (t) {
                                    return t instanceof e.targetClass;
                                },
                            }),
                            a = 0;
                            a < i.length;
                            ++a
                        )
                            applyProjectileStrike({ target: i[a], phaser: this.phaser, damage: this.damage, criticalChance: this.criticalChance, criticalMultiplier: this.criticalMultiplier });
                        this.startHitAnimation();
                    }
                }),
                (t.prototype.startHitAnimation = function () {
                    var e = this,
                        t = this.aoeRadiusTiles * Config.tileSize,
                        i = this.phaser.rootRecursiveRef.particles.spawnNew(this.x, this.y, this.explosionClass);
                    (i.width = 2 * t),
                        (i.height = 2 * t),
                        (i.alpha = 0.15),
                        this.phaser.rootRecursiveRef.animations
                            .animate(i)
                            .to({ alpha: 0, width: 10, height: 10 }, 300)
                            .onDone(function () {
                                e.phaser.rootRecursiveRef.particles.kill(i);
                            }),
                        this.phaser.rootRecursiveRef.sound.playCannonExplosion(this.x, this.y);
                }),
                (t.prototype.update = function () {
                    if (this.alive && this.exists && !(Config.gameTimeSpeedUpFactor < 1)) {
                        null === this.direction && this.computeDirection();
                        var e = this.speedTilesPerSecond * Config.tileSize * this.phaser.rootRecursiveRef.time.physicsElapsed,
                            t = this.x + this.direction[0] * e,
                            i = this.y + this.direction[1] * e;
                        if (!isValidWorldCoordinate(t, i)) return this.applyDamage(), void this.finishCallback();
                        (this.x = t), (this.y = i), distanceEuclidian(this.startPos, [this.x, this.y]) > this.maxDistance && (this.applyDamage(), this.finishCallback());
                    }
                }),
                t
            );
        })(FastImage),
        ccFixBaseLightningProjectile = Phaser.Graphics,
        LightningProjectile = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i));
                return (a.phaser = i), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "LightningProjectile";
                        },
                    },
                ]),
                (t.prototype.onSpawned = function (e) {
                    var t = e.projectileParams,
                        i = e.targetEntity,
                        a = e.maxRadius,
                        o = e.finishCallback,
                        n = e.criticalChance,
                        r = e.criticalMultiplier,
                        s = t.damage,
                        l = t.spread,
                        u = t.fillColor;
                    this.clear(),
                        (this.damage = s),
                        (this.maxSpread = l),
                        (this.maxRadius = a),
                        (this.finishCallback = o),
                        (this.targetEntity = i),
                        (this.fillColor = u),
                        (this.criticalChance = n),
                        (this.criticalMultiplier = r),
                        (this.visited = [i.getUniqueId()]),
                        (this.visitNext = []),
                        (this.visitTimer = Timer.makeFromIntervalMs(SPREAD_MS)),
                        (this.spreadsLeft = this.maxSpread - 1),
                        (this.initialized = false);
                }),
                (t.prototype.drawLine = function (e, t) {
                    this.phaser.rootRecursiveRef.settings.enableParticles && drawJaggedLine(this, e, t, DISTURB_AMOUNT, LINE_POINTS);
                }),
                (t.prototype.drawLineToEntity = function (e, t) {
                    this.drawLine(this.pointToLocal(e.x, e.y), this.pointToLocal(t.x, t.y));
                }),
                (t.prototype.pointToLocal = function (e, t) {
                    var i = Config.tileSize / 2;
                    return [e - this.x + i, t - this.y + i];
                }),
                (t.prototype.spreadOut = function (e) {
                    var t = this;
                    !e.alive || e.exists;
                    for (
                        var i = this.phaser.rootRecursiveRef.map.findDynamicEntitiesInRadiusWorldSpace({
                            x: e.x,
                            y: e.y,
                            radius: this.maxRadius * Config.tileSize,
                            condition: function (e) {
                                return !!e.hasComponent(EnemyAIComponent) && t.visited.indexOf(e.getUniqueId()) < 0;
                            },
                            maxAmount: DIVISIONS,
                        }),
                        a = this.pointToLocal(e.x, e.y),
                        o = 0;
                        o < i.length;
                        ++o
                    ) {
                        var n = i[o];
                        this.drawLine(a, this.pointToLocal(n.x, n.y)), this.visitNext.push(n), this.visited.push(n.getUniqueId()), this.doDamage(n);
                    }
                    for (var r = 0; r < Math.max(0, DIVISIONS - i.length); ++r) {
                        var s = randomPointInCircle(Config.tileSize);
                        this.drawLine(a, [a[0] + s[0], a[1] + s[1]]);
                    }
                }),
                (t.prototype.doDamage = function (e) {
                    applyProjectileStrike({ target: e, phaser: this.phaser, damage: this.damage, criticalChance: this.criticalChance, criticalMultiplier: this.criticalMultiplier });
                }),
                (t.prototype.initialize = function () {
                    var e = this;
                    (this.initialized = true),
                        this.visitTimer.resetTo(this.phaser.rootRecursiveRef.time.now),
                        this.clear(),
                        this.lineStyle(LINE_SIZE, this.fillColor),
                        this.drawLine([0, 0], this.pointToLocal(this.targetEntity.x, this.targetEntity.y)),
                        (this.visitNext = [this.targetEntity]),
                        this.doDamage(this.targetEntity),
                        (this.alpha = LINE_ALPHA),
                        this.phaser.rootRecursiveRef.animations
                            .animate(this)
                            .to({ alpha: 0 }, FADE_DURATION)
                            .onDone(function () {
                                return e.finishCallback();
                            });
                }),
                (t.prototype.update = function () {
                    if (this.alive && !(Config.gameTimeSpeedUpFactor < 1) && (this.initialized || this.initialize(), !(this.spreadsLeft <= 0)))
                        for (; this.visitTimer.takeTick(this.phaser.rootRecursiveRef.time.now);) {
                            (this.damage *= DAMAGE_DECAY), this.lineStyle(LINE_SIZE * (this.spreadsLeft / this.maxSpread), this.fillColor);
                            var e = this.visitNext;
                            this.visitNext = [];
                            for (var t = 0; t < e.length; ++t) {
                                var i = e[t];
                                this.spreadOut(i);
                            }
                            (this.spreadsLeft -= 1), this.phaser.rootRecursiveRef.sound.playLightningSound(this.x, this.y);
                        }
                }),
                t
            );
        })(ccFixBaseLightningProjectile),
        MetaSeekingProjectile = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i));
                return (a.angleOffset = 0), (a.renderMode = PARTICLE_RENDER_BATCH), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaSeekingProjectile";
                        },
                    },
                ]),
                (t.prototype.makeParticle = function (e, t) {
                    var i = new SeekingProjectile(e, this.precomputedTexture);
                    return (i.angleOffset = this.angleOffset), i.onSpawned(t), i;
                }),
                (t.prototype.reviveParticle = function (e, t) {
                    e.revive(), (e.alpha = 1), e.onSpawned(t);
                }),
                (t.prototype.needsUpdates = function () {
                    return true;
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaPlayerBaseProjectile = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "projectile-player_base.png"));
                return (i.width = 24), (i.height = 24), (i.tint = 11184810), (i.angleOffset = 100), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaPlayerBaseProjectile";
                        },
                    },
                ]),
                t
            );
        })(MetaSeekingProjectile),
        MetaArrowProjectile = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "projectile-arrow.png"));
                return (i.width = 24), (i.height = 24), (i.tint = 11184810), (i.angleOffset = 0), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaArrowProjectile";
                        },
                    },
                ]),
                t
            );
        })(MetaSeekingProjectile),
        MetaLinearProjectile = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i));
                return (a.renderMode = PARTICLE_RENDER_BATCH), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaLinearProjectile";
                        },
                    },
                ]),
                (t.prototype.makeParticle = function (e, t) {
                    var i = new LinearProjectile(e, this.precomputedTexture);
                    return i.onSpawned(t), i;
                }),
                (t.prototype.reviveParticle = function (e, t) {
                    e.revive(), (e.alpha = 1), e.onSpawned(t);
                }),
                (t.prototype.needsUpdates = function () {
                    return true;
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaCannonProjectile = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "projectile-cannon.png"));
                return (i.width = 12), (i.height = 12), (i.tint = 11184810), (i.renderMode = PARTICLE_RENDER_BATCH), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaCannonProjectile";
                        },
                    },
                ]),
                t
            );
        })(MetaLinearProjectile),
        MetaLightningParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this));
                return (i.renderMode = PARTICLE_RENDER_REGULAR), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaLightningParticle";
                        },
                    },
                ]),
                (t.prototype.initTexture = function () { }),
                (t.prototype.makeParticle = function (e, t) {
                    var i = new LightningProjectile(e);
                    return i.onSpawned(t), i;
                }),
                (t.prototype.reviveParticle = function (e, t) {
                    e.revive(), (e.alpha = 1), e.onSpawned(t);
                }),
                (t.prototype.needsUpdates = function () {
                    return true;
                }),
                t
            );
        })(MetaParticle),
        ReachableRequirement = (function (e) {
            function t(i) {
                var a = i.errorText;
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, a));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ReachableRequirement";
                        },
                    },
                ]),
                (t.prototype.check = function (e, t) {
                    var i = t.tileX,
                        a = t.tileY;
                    return e.map.checkTileIsReachable(i, a);
                }),
                (t.prototype.dependsOnPosition = function () {
                    return true;
                }),
                t
            );
        })(BuildingRequirement);

        class GainStatsComponent extends Component {
            constructor() {
                super();
            }
        
            static get name() {
                return "GainStatsComponent";
            }
        }
          
        const ConsumerComponent = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this));
                return a.setConsumeClasses(i || []), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ConsumerComponent";
                        },
                    },
                ]),
                (t.prototype.setConsumeClasses = function (e) {
                    checkParamsSet(e),
                        (this.consumeResourceIds = e.map(function (e) {
                            return e.name;
                        }));
                }),
                (t.prototype.setConsumeIds = function (e) {
                    this.consumeResourceIds = e;
                }),
                (t.prototype.debugStr = function () {
                    var e = "";
                    return (
                        this.consumeResourceIds.forEach(function (t) {
                            e += t + " ";
                        }),
                        e
                    );
                }),
                (t.prototype.consumesResources = function (e) {
                    return this.consumeResourceIds.indexOf(e) >= 0;
                }),
                (t.prototype.canConsume = function (e) {
                    return this.consumeResourceIds.indexOf(e) >= 0;
                }),
                t
            );
        })(Component),
        EmitterComponent = (function (e) {
            function t(i) {
                var a = i.resourceClass,
                    o = i.spawnMaxRadius,
                    n = i.emitPerSecond,
                    r = void 0 === n ? 1 : n,
                    s = i.emitEvenIfNoConsumer,
                    l = void 0 === s || s,
                    u = i.precomputeConsumers,
                    c = void 0 === u || u,
                    d = i.desiredBatchesPerSecond,
                    h = void 0 === d ? 2 : d;
                _classCallCheck(this, t);
                var p = _possibleConstructorReturn(this, e.call(this));
                if ((checkParamsSet(a, o, r, l, c, h), null == a)) throw new Error("Spawn class is null");
                if (null == o) throw new Error("Spawn radius is null");
                return (
                    (p.resourceClass = a),
                    (p.spawnMaxRadius = o),
                    (p.emitEvenIfNoConsumer = l),
                    (p.precomputeConsumers = c),
                    (p.desiredBatchesPerSecond = h),
                    (p.precomputedPossibleConsumers = []),
                    (p.precomputedConsumersDirty = p.precomputeConsumers),
                    p.setEmitPerSecond(r),
                    p
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EmitterComponent";
                        },
                    },
                ]),
                (t.prototype.setEmitPerSecond = function (e) {
                    checkParamsSet(e);
                    var t = this.desiredBatchesPerSecond + 0.3 * Math.random(),
                        i = Math.max(1, Math.floor(e / t)),
                        a = e / i;
                    (this.emitBatchSize = i), (this.spawnTimer = this.makeTimerFromTicksPerSecond(a));
                }),
                (t.prototype.getEmitPerSecond = function () {
                    return this.spawnTimer.getTicksPerSecond() * this.emitBatchSize;
                }),
                (t.prototype.setResourceClass = function (e) {
                    checkParamsSet(e), (this.resourceClass = e);
                }),
                (t.prototype.debugStr = function () {
                    var e = "";
                    return (
                        (e += "emit " + this.spawnTimer.getTicksPerSecond() + " (batch: " + this.emitBatchSize + ") "),
                        (e += this.resourceClass.name + "/s "),
                        (e += ", max " + this.spawnMaxRadius + " tiles"),
                        (e += ", precompute=" + this.precomputeConsumers),
                        this.precomputeConsumers && (e += ", precomputed=[ " + this.precomputedPossibleConsumers.length + " consumers, dirty=" + this.precomputedConsumersDirty + "]"),
                        e
                    );
                }),
                t
            );
        })(Component),
        DecorativeParticlesComponent = (function (e) {
            function t(i) {
                var a = i.radius,
                    o = i.particleClass,
                    n = i.spawnPerSecond,
                    r = i.lifeSpanMs,
                    s = void 0 === r ? 1e3 : r;
                _classCallCheck(this, t);
                var l = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(a, o, n), (l.radius = a), (l.particleClass = o), (l.timer = l.makeTimerFromTicksPerSecond(n)), (l.lifeSpanMs = s), l;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DecorativeParticlesComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Spawn " + this.timer.getTicksPerSecond() + " " + this.particleClass.name + " per second, up to " + this.radius + " tiles";
                }),
                t
            );
        })(Component),
        ResourceComponent = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.debugStr = function () {
                    return "Is a resource";
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ResourceComponent";
                        },
                    },
                ]),
                t
            );
        })(Component),
        EntitySpriteObj = (function (e) {
            function t(i, a, o, n) {
                _classCallCheck(this, t);
                var r = _possibleConstructorReturn(this, e.call(this, i)),
                    s = tileToWorld(a, o),
                    l = _slicedToArray(s, 2),
                    u = l[0],
                    c = l[1];
                return (r._texture = n.baseTexture), (r.alive = true), (r.exists = true), (r.visible = true), (r.position = new Phaser.Point(u, c)), (r.alpha = 1), r;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EntitySpriteObj";
                        },
                    },
                ]),
                (t.prototype.kill = function () {
                    (this.alive = false), (this.exists = false);
                }),
                (t.prototype.revive = function () {
                    (this.alive = true), (this.exists = true);
                }),
                (t.prototype.destroy = function () {
                    e.prototype.destroy.call(this),
                        (this._texture = null),
                        (this.exists = false),
                        (this.alive = false),
                        this.parent && (this.parent instanceof Phaser.Group ? this.parent.remove(this) : this.parent.removeChild(this), (this.parent = null));
                }),
                _createClass(t, [
                    {
                        key: "x",
                        get: function () {
                            return this.position.x;
                        },
                        set: function (e) {
                            this.position.x = e;
                        },
                    },
                    {
                        key: "y",
                        get: function () {
                            return this.position.y;
                        },
                        set: function (e) {
                            this.position.y = e;
                        },
                    },
                ]),
                t
            );
        })(Entity),
        MetaResource = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i + ".png"));
                return (
                    (a.resourceId = i),
                    (a.width = Config.tileSize - 2 * Config.ui.resourceOuterSpace),
                    (a.height = a.width),
                    (a.paddingX = Config.ui.resourceOuterSpace),
                    (a.paddingY = Config.ui.resourceOuterSpace),
                    (a.renderMode = PARTICLE_RENDER_FAST),
                    a
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaResource";
                        },
                    },
                ]),
                (t.prototype.getRadius = function () {
                    return Config.radius[this.resourceId];
                }),
                (t.prototype.getInstanceClass = function () {
                    throw new Error("abstract");
                }),
                (t.prototype.isImportantParticle = function () {
                    return true;
                }),
                (t.prototype.makeParticle = function (e) {
                    return new (this.getInstanceClass())(e, this.precomputedTexture);
                }),
                (t.prototype.reviveParticle = function () {
                    throw new Error("Revive not possible for resources - they should never die");
                }),
                (t.prototype.onContainerCreated = function (e) {
                    (e.offsetX = Config.tileSize / 2), (e.offsetY = Config.tileSize / 2);
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        MetaTree = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "tree"));
                return (i.paddingY += 1), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaTree";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return Tree;
                }),
                t
            );
        })(MetaResource),
        MetaGoldOre = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "goldOre"));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaGoldOre";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return GoldOre;
                }),
                (t.getRadiusStatic = function (e) {
                    var t = Config.radius.goldOre;
                    return e.isSkillUnlocked("minersRadius_feature1") && (t += 0.5), e.isSkillUnlocked("minersRadius_feature2") && (t += 0.5), t;
                }),
                t
            );
        })(MetaResource),
        MetaIronOre = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "ironOre"));
                return (i.paddingX += 1), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaIronOre";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return IronOre;
                }),
                t
            );
        })(MetaResource),
        MetaUraniumOre = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "uraniumOre"));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaUraniumOre";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return UraniumOre;
                }),
                t
            );
        })(MetaResource),
        Resource = (function (e) {
            function t(i, a) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, 0, 0, a));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Resource";
                        },
                    },
                ]),
                (t.prototype.useInPathfinding = function () {
                    return true;
                }),
                (t.prototype.onSpawned = function () { }),
                (t.prototype.refreshInstance = function () { }),
                t
            );
        })(EntitySpriteObj),
        Tree = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, a));
                return (
                    o.addComponent(new StorageComponent({ limits: { RawWood: UNLIMITED_STORAGE }, initialResources: { RawWood: UNLIMITED_STORAGE } })),
                    o.addComponent(
                        new EmitterComponent({
                            resourceClass: RawWood,
                            spawnMaxRadius: Config.radius.tree,
                            emitEvenIfNoConsumer: false,
                            emitPerSecond: 4 * GAME_BALANCING.buildings.harvester[MAXLEVEL_INDEX].throughput,
                            precomputeConsumers: false,
                        })
                    ),
                    o.addComponent(new ResourceComponent()),
                    o
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Tree";
                        },
                    },
                ]),
                (t.prototype.getMinimapColor = function () {
                    return pastellizeColor(Config.colors.rawWood);
                }),
                t
            );
        })(Resource),
        GoldOre = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, a));
                return (
                    o.addComponent(new StorageComponent({ limits: { RawGold: UNLIMITED_STORAGE }, initialResources: { RawGold: UNLIMITED_STORAGE } })),
                    o.addComponent(
                        new EmitterComponent({
                            resourceClass: RawGold,
                            spawnMaxRadius: Config.radius.goldOre,
                            emitEvenIfNoConsumer: false,
                            emitPerSecond: 12 * GAME_BALANCING.buildings.goldMine[MAXLEVEL_INDEX].throughput,
                            precomputeConsumers: false,
                            desiredBatchesPerSecond: 12,
                        })
                    ),
                    o.addComponent(new DecorativeParticlesComponent({ radius: 1, particleClass: MetaGoldMineDecorativeParticle, spawnPerSecond: 45 + 5 * Math.random(), lifeSpanMs: 1e3 })),
                    Config.mobileDevice,
                    o.addComponent(new ResourceComponent()),
                    o
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldOre";
                        },
                    },
                ]),
                (t.prototype.getMinimapColor = function () {
                    return pastellizeColor(Config.colors.gold, 0.4);
                }),
                (t.prototype.refreshInstance = function () {
                    var e = this.phaser.rootRecursiveRef.stats;
                    this.getComponent(EmitterComponent).spawnMaxRadius = MetaGoldOre.getRadiusStatic(e);
                }),
                t
            );
        })(Resource),
        IronOre = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, a));
                return (
                    o.addComponent(new StorageComponent({ limits: { RawIron: UNLIMITED_STORAGE }, initialResources: { RawIron: UNLIMITED_STORAGE } })),
                    o.addComponent(
                        new EmitterComponent({
                            resourceClass: RawIron,
                            spawnMaxRadius: Config.radius.ironOre,
                            emitEvenIfNoConsumer: false,
                            emitPerSecond: 4 * GAME_BALANCING.buildings.ironMine[MAXLEVEL_INDEX].throughput,
                            precomputeConsumers: false,
                        })
                    ),
                    o.addComponent(new ResourceComponent()),
                    o
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "IronOre";
                        },
                    },
                ]),
                (t.prototype.getMinimapColor = function () {
                    return pastellizeColor(Config.colors.rawIron);
                }),
                t
            );
        })(Resource),
        UraniumOre = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, a));
                return (
                    o.addComponent(new StorageComponent({ limits: { Uranium: UNLIMITED_STORAGE }, initialResources: { Uranium: UNLIMITED_STORAGE } })),
                    o.addComponent(
                        new EmitterComponent({
                            resourceClass: Uranium,
                            spawnMaxRadius: Config.radius.uraniumOre,
                            emitEvenIfNoConsumer: false,
                            emitPerSecond: 4 * GAME_BALANCING.buildings.uraniumMine[MAXLEVEL_INDEX].throughput,
                            precomputeConsumers: false,
                        })
                    ),
                    o.addComponent(new ResourceComponent()),
                    o
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UraniumOre";
                        },
                    },
                ]),
                (t.prototype.getMinimapColor = function () {
                    return pastellizeColor(Config.colors.uranium);
                }),
                (t.prototype.onSpawned = function () {
                    this.makeGlow();
                }),
                (t.prototype.destroy = function () {
                    e.prototype.destroy.call(this), this.glowSprite && this.glowSprite.alive && (this.glowSprite.parent && this.glowSprite.parent.removeChild(this.glowSprite), this.glowSprite.destroy());
                }),
                (t.prototype.makeGlow = function () {
                    this.glowSprite && console.error("[RESOURCE] Glow sprite already exists!");
                    var e = this.phaser.make.image(Config.tileSize / 2, Config.tileSize / 2, "atlas", "glow.png");
                    (e.width = 150),
                        (e.height = 150),
                        e.anchor.setTo(0.5, 0.5),
                        (e.alpha = 0.8),
                        (e.tint = Config.colors.uranium),
                        e.position.setTo(this.x + Config.tileSize / 2, this.y + Config.tileSize / 2),
                        this.phaser.rootRecursiveRef.groups.glowGroup.add(e),
                        (this.glowSprite = e);
                }),
                t
            );
        })(Resource),
        ProcessorComponent = (function (e) {
            function t(i) {
                var a = i.produceResource,
                    o = i.produceAmount,
                    n = void 0 === o ? 1 : o,
                    r = i.recipe,
                    s = i.produceMaxPerSecond,
                    l = void 0 === s ? 1 : s,
                    u = i.processingDuration;
                _classCallCheck(this, t);
                var c = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(a, n, r, u), (c.produceAmount = n), (c.recipe = r), (c.processingDuration = u), (c.productionQueue = []), c.setProduceResource(a), c.setProduceMaxPerSecond(l), (c.multiplier = 1), c;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProcessorComponent";
                        },
                    },
                ]),
                (t.prototype.getProduceMaxPerSecond = function () {
                    return this.produceTimer.getTicksPerSecond();
                }),
                (t.prototype.getProduceMaxPerSecondDisplay = function () {
                    return this.getProduceMaxPerSecond() * this.multiplier;
                }),
                (t.prototype.setProduceMaxPerSecond = function (e) {
                    checkParamsSet(e);
                    var t = 5 + Math.random();
                    this.multiplier = Math.max(1, Math.floor(e / t));
                    var i = e / this.multiplier;
                    this.produceTimer = this.makeTimerFromTicksPerSecond(i);
                }),
                (t.prototype.setProduceResource = function (e) {
                    this.produceResourceId = e.name;
                }),
                (t.prototype.getProductionQueueSize = function () {
                    return this.productionQueue.length;
                }),
                (t.prototype.getMaxProductionQueueSize = function () {
                    return this.produceTimer.getTicksPerSecond() * this.processingDuration;
                }),
                (t.prototype.getProductionUsagePercentage = function () {
                    return this.getProductionQueueSize() / Math.max(1, this.getMaxProductionQueueSize());
                }),
                (t.prototype.setRecipe = function (e) {
                    if ((checkParamsSet(e), this.productionQueue.length > 0)) throw new Error("Cannot change recipe while production queue is not empty");
                    this.recipe = e;
                }),
                (t.prototype.finishAllProductions = function () {
                    this.productionQueue = [];
                }),
                (t.prototype.setProduceAmount = function (e) {
                    checkParamsSet(e), (this.produceAmount = e);
                }),
                (t.prototype.debugStr = function () {
                    var e = "process [";
                    for (var t in this.recipe) e += this.recipe[t] + " " + t + " ";
                    return (
                        (e += "] (x " + this.multiplier + ") to " + this.produceAmount + " (x " + this.multiplier + ") " + this.produceResourceId + " "),
                        (e += ", max " + this.produceTimer.getTicksPerSecond() + " /s"),
                        (e += ", takes " + this.processingDuration + "s to assemble"),
                        (e += ", " + this.productionQueue.length + " in production (usage: "),
                        (e += roundDecimals(100 * this.getProductionUsagePercentage(), 1) + " %)")
                    );
                }),
                (t.prototype.startProduction = function (e) {
                    return !!this.produceTimer.takeTick(e) && (this.productionQueue.push(e), true);
                }),
                (t.prototype.finishProduction = function (e) {
                    if (this.productionQueue.length > 0 && e > this.productionQueue[0] + 1e3 * this.processingDuration) return this.productionQueue.shift(), true;
                    return false;
                }),
                (t.prototype.isProducing = function () {
                    return this.productionQueue.length > 0;
                }),
                t
            );
        })(Component),
        BasicResourceMiner = (function (e) {
            function t(i, a, o, n, r) {
                _classCallCheck(this, t);
                var s = _possibleConstructorReturn(this, e.call(this, i, a, o, n));
                return s.init(r), s;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BasicResourceMiner";
                        },
                    },
                ]),
                (t.prototype.init = function (e) {
                    var t = e.producerMetaClass,
                        i = e.sourceResource,
                        a = e.destResource;
                    checkParamsSet(t, i, a), this.addVisualizeConnections([t]), this.addComponent(new StorageComponent({})), this.addComponent(new ConsumerComponent([i]));
                    var o = {};
                    (o[i.name] = 1),
                        this.addComponent(new ProcessorComponent({ produceResource: a, recipe: o, processingDuration: 1 })),
                        this.addComponent(new EmitterComponent({ resourceClass: a, spawnMaxRadius: this.meta.getRadius(), emitEvenIfNoConsumer: true })),
                        (this.sourceResourceId = i.name),
                        (this.destResourceId = a.name);
                }),
                (t.prototype.updateComponentsToStats = function (t) {
                    e.prototype.updateComponentsToStats.call(this, t);
                    var i = t.throughput;
                    (i *= this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("minersSpeed")), this.getComponent(ProcessorComponent).setProduceMaxPerSecond(i), this.getComponent(EmitterComponent).setEmitPerSecond(i);
                    var a = {};
                    (a[this.sourceResourceId] = i * MINER_CACHE_SIZE), (a[this.destResourceId] = i * MINER_CACHE_SIZE), (this.getComponent(StorageComponent).limits = a);
                }),
                t
            );
        })(BuildingInstance),
        GoldMineMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "goldMine"));
                return (
                    i.addNearbyRequirement({ resourceType: GoldOre, radius: Config.radius.goldOre, errorText: tr("error_place_next_to_crystal") }),
                    i.addCompatibleResourcesPlacementHelper(GoldOre),
                    i.addDependency(PlayerBaseMeta),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldMineMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return GoldMineBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.gold;
                }),
                (t.prototype.getDockingStyle = function () {
                    return "miner";
                }),
                (t.prototype.refreshSelf = function (e) {
                    var t = MetaGoldOre.getRadiusStatic(e.stats);
                    this.requirements.forEach(function (e) {
                        e instanceof NearbyRequirement && (e.radius = t);
                    }),
                        this.placementHelpers.forEach(function (e) {
                            e instanceof CompatibleResourcesPlacementHelper && (e.radius = t), e instanceof NearbyBuildingPlacementHelper && (e.radius = t);
                        });
                }),
                t
            );
        })(MetaBuilding),
        GoldMineBuilding = (function (e) {
            function t(i, a, o, n) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producerMetaClass: MetaGoldOre, sourceResource: RawGold, destResource: MinedGold }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldMineBuilding";
                        },
                    },
                ]),
                (t.prototype.updateComponentsToStats = function (t) {
                    e.prototype.updateComponentsToStats.call(this, t);
                    var i = MetaGoldOre.getRadiusStatic(this.phaser.rootRecursiveRef.stats),
                        a = this.getComponent(VisualizeConnectionsComponent);
                    (a.connectToClasses[GoldOre.name].radius = i), (a.needsRedraw = true);
                }),
                t
            );
        })(BasicResourceMiner),
        PlayerBaseMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "playerBase"));
                return (
                    i.addRequirement(new UniqueRequirement({ errorText: tr("error_only_one_base"), buildingType: PlayerBaseBuilding })),
                    i.addRequirement(new ReachableRequirement({ errorText: tr("error_base_unreachable") })),
                    i.addRadiusPlacementHelper(Config.radius.playerBase),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PlayerBaseMeta";
                        },
                    },
                ]),
                (t.prototype.isSellable = function () {
                    return false;
                }),
                (t.prototype.getInstanceClass = function () {
                    return PlayerBaseBuilding;
                }),
                (t.prototype.getDockingStyle = function () {
                    return "base";
                }),
                t
            );
        })(MetaBuilding),
        PlayerBaseBuilding = (function (e) {
            function t(i, a, o, n) {
                _classCallCheck(this, t);
                var r = _possibleConstructorReturn(this, e.call(this, i, a, o, n));
                return (
                    r.addVisualizeConnections([GoldMineMeta]),
                    r.addComponent(new PlayerBaseComponent()),
                    r.addComponent(
                        new ProjectileShooterComponent({
                            projectileClass: MetaPlayerBaseProjectile,
                            projectileParams: { speedTilesPerSecond: 25, damage: 100 },
                            shootsPerSecond: 1,
                            radius: Config.radius.playerBase,
                            destinationClass: Enemy,
                            hitCallback: function (e) {
                                return r.onProjectileHitEnemy(e);
                            },
                            canCriticalStrike: true,
                        })
                    ),
                    r.addComponent(new ConsumerComponent([MinedGold])),
                    r.addComponent(new StorageComponent({ limits: { MinedGold: UNLIMITED_STORAGE } })),
                    r.addComponent(new GainStatsComponent()),
                    r.makeGlow(),
                    r
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PlayerBaseBuilding";
                        },
                    },
                ]),
                (t.prototype.useInPathfinding = function () {
                    return true;
                }),
                (t.prototype.getMinimapScale = function () {
                    return 2;
                }),
                (t.prototype.updateComponentsToStats = function (t) {
                    if ((e.prototype.updateComponentsToStats.call(this, t), !t.damage)) throw new Error("Missing key 'damage' for building playerBase");
                    (this.getComponent(ProjectileShooterComponent).projectileParams.damage = t.damage * this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("damage")), (this.glowSprite.tint = Config.colors.levels[this.level]);
                }),
                (t.prototype.destroy = function () {
                    e.prototype.destroy.call(this), this.glowSprite && this.glowSprite.alive && (this.glowSprite.parent && this.glowSprite.parent.removeChild(this.glowSprite), this.glowSprite.destroy());
                }),
                (t.prototype.makeGlow = function () {
                    var e = this.phaser.make.image(Config.tileSize / 2, Config.tileSize / 2, "atlas", "glow.png");
                    (e.width = 500),
                        (e.height = 500),
                        e.anchor.setTo(0.5, 0.5),
                        (e.tint = this.meta.getBackgroundColor()),
                        e.position.setTo(this.x + Config.tileSize / 2, this.y + Config.tileSize / 2),
                        this.phaser.rootRecursiveRef.groups.glowGroup.add(e),
                        (this.glowSprite = e);
                }),
                t
            );
        })(BuildingInstance),
        HarvesterMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "harvester"));
                return (
                    i.addNearbyRequirement({ resourceType: Tree, radius: Config.radius.tree, errorText: tr("error_place_next_to_tree") }),
                    i.addCompatibleResourcesPlacementHelper(Tree),
                    i.addDependency(PlayerBaseMeta),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "HarvesterMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return HarvesterBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.unprocessedWood;
                }),
                (t.prototype.getDockingStyle = function () {
                    return "miner";
                }),
                t
            );
        })(MetaBuilding),
        HarvesterBuilding = (function (e) {
            function t(i, a, o, n) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producerMetaClass: MetaTree, sourceResource: RawWood, destResource: UnprocessedWood }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "HarvesterBuilding";
                        },
                    },
                ]),
                t
            );
        })(BasicResourceMiner),
        VisualizeMissingResourcesComponent = (function (e) {
            function t(i) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 7;
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(i, a), (o.resourceIdsAndAmount = i), (o.minTimeSeconds = a), (o.lastSuccessTime = 0), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "VisualizeMissingResourcesComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    var e = "Badges when " + JSON.stringify(this.resourceIdsAndAmount);
                    return (e += " are missing for " + this.minTimeSeconds + " seconds");
                }),
                t
            );
        })(Component),
        BasicProcessor = (function (e) {
            function t(i, a, o, n, r) {
                _classCallCheck(this, t);
                var s = _possibleConstructorReturn(this, e.call(this, i, a, o, n));
                return s.init(r), s;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BasicProcessor";
                        },
                    },
                ]),
                (t.prototype.init = function (e) {
                    var t = e.producersMetaClasses,
                        i = e.recipe,
                        a = e.produceResource,
                        o = e.processingDuration,
                        n = void 0 === o ? 1 : o;
                    checkParamsSet(t, i, a, n), this.addVisualizeConnections(t), this.addComponent(new VisualizeMissingResourcesComponent(i)), this.addComponent(new StorageComponent({}));
                    var r = new ConsumerComponent();
                    r.setConsumeIds(Object.keys(i)),
                        this.addComponent(r),
                        this.addComponent(new ProcessorComponent({ produceResource: a, recipe: i, processingDuration: n })),
                        this.addComponent(new EmitterComponent({ resourceClass: a, spawnMaxRadius: this.meta.getRadius(), emitEvenIfNoConsumer: true })),
                        (this.recipe = i),
                        (this.produceResourceId = a.name);
                }),
                (t.prototype.updateComponentsToStats = function (t) {
                    e.prototype.updateComponentsToStats.call(this, t);
                    var i = t.throughput,
                        a = t.outcome || 1;
                    (i *= this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("factorySpeed")),
                        this.phaser.rootRecursiveRef.stats.isSkillUnlocked("factoryFeatureSpeed") && ((i *= 1.5), (a *= 1.75)),
                        this.getComponent(ProcessorComponent).setProduceMaxPerSecond(i),
                        this.getComponent(ProcessorComponent).setProduceAmount(a),
                        this.getComponent(EmitterComponent).setEmitPerSecond(i * a);
                    var o = {};
                    for (var n in this.recipe) o[n] = i * this.recipe[n] * Config.storageBurstSize;
                    (o[this.produceResourceId] = i * a * Config.storageBurstSize), (this.getComponent(StorageComponent).limits = o);
                }),
                t
            );
        })(BuildingInstance),
        WoodProcessorMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "woodProcessor"));
                return i.addNearbyPlacementHelper({ entityClass: HarvesterBuilding, radius: Config.radius.harvester }), i.addDependency(HarvesterMeta), i.useTransporters(), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "WoodProcessorMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return WoodProcessorBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.processedWood;
                }),
                t
            );
        })(MetaBuilding),
        WoodProcessorBuilding = (function (e) {
            function t(i, a, o, n) {
                return (
                    _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producersMetaClasses: [HarvesterMeta], recipe: { UnprocessedWood: 2 }, produceResource: ProcessedWood, processingDuration: 2 }))
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "WoodProcessorBuilding";
                        },
                    },
                ]),
                t
            );
        })(BasicProcessor),
        IronMineMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "ironMine"));
                return (
                    i.addNearbyRequirement({ resourceType: IronOre, radius: Config.radius.ironOre, errorText: tr("error_place_next_to_iron_ore") }),
                    i.addCompatibleResourcesPlacementHelper(IronOre),
                    i.addDependency(PlayerBaseMeta),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "IronMineMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return IronMineBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.unprocessedIron;
                }),
                (t.prototype.getDockingStyle = function () {
                    return "miner";
                }),
                t
            );
        })(MetaBuilding),
        IronMineBuilding = (function (e) {
            function t(i, a, o, n) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producerMetaClass: MetaIronOre, sourceResource: RawIron, destResource: UnprocessedIron }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "IronMineBuilding";
                        },
                    },
                ]),
                t
            );
        })(BasicResourceMiner),
        SteelFactoryMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "steelFactory"));
                return (
                    i.addNearbyPlacementHelper({ entityClass: HarvesterBuilding, radius: Config.radius.harvester }),
                    i.addNearbyPlacementHelper({ entityClass: IronMineBuilding, radius: Config.radius.ironMine }),
                    i.addDependency(HarvesterMeta),
                    i.addDependency(IronMineMeta),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "SteelFactoryMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return SteelFactoryBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.steel;
                }),
                t
            );
        })(MetaBuilding),
        SteelFactoryBuilding = (function (e) {
            function t(i, a, o, n) {
                return (
                    _classCallCheck(this, t),
                    _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producersMetaClasses: [HarvesterMeta, IronMineMeta], recipe: { UnprocessedWood: 1, UnprocessedIron: 2 }, produceResource: Steel, processingDuration: 2 }))
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "SteelFactoryBuilding";
                        },
                    },
                ]),
                t
            );
        })(BasicProcessor),
        ArrowFactoryMeta = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "arrowFactory"));
                return (
                    i.addNearbyPlacementHelper({ entityClass: SteelFactoryBuilding, radius: Config.radius.steelFactory }),
                    i.addNearbyPlacementHelper({ entityClass: WoodProcessorBuilding, radius: Config.radius.woodProcessor }),
                    i.addDependency(SteelFactoryMeta),
                    i.addDependency(WoodProcessorMeta),
                    i.useTransporters(),
                    i
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ArrowFactoryMeta";
                        },
                    },
                ]),
                (t.prototype.getInstanceClass = function () {
                    return ArrowFactoryBuilding;
                }),
                (t.prototype.getBackgroundColor = function () {
                    return Config.colors.basicArrow;
                }),
                t
            );
        })(MetaBuilding),
        ArrowFactoryBuilding = (function (e) {
            function t(i, a, o, n) {
                return (
                    _classCallCheck(this, t),
                    _possibleConstructorReturn(this, e.call(this, i, a, o, n, { producersMetaClasses: [SteelFactoryMeta, WoodProcessorMeta], recipe: { Steel: 1, ProcessedWood: 1 }, produceResource: BasicArrow, processingDuration: 3 }))
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ArrowFactoryBuilding";
                        },
                    },
                ]),
                t
            );
        })(BasicProcessor),
        ArrowTowerComponent = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.debugStr = function () {
                    return "Is an arrow tower";
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ArrowTowerComponent";
                        },
                    },
                ]),
                t
            );
        })(Component),
        StorageVisualizerComponent = (function (e) {
            function t(i) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(i, a), (o.resourceClass = i), (o.divisor = a), (o.radius = Config.tileSize / 2 - Config.ui.buildingOuterSpace + 2), (o.inverse = false), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "StorageVisualizerComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Visualize amount of " + this.resourceClass.name + " in storage";
                }),
                t
            );
        })(Component);
        
        class BasicDefensiveTower extends BuildingInstance {
            constructor(i, a, o, n, r) {
                super(i, a, o, n);
                this.init(r);
            }
        
            static get name() {
                return "BasicDefensiveTower";
            }
        
            init({
                producerMetaClass,
                projectileResource,
                projectileClass,
                additionalProjectileParams = null,
                radiusMultiplierKey = null,
                damageMultiplierKey = null,
                shootsPerSecondMultiplierKey = null,
                canCriticalStrike = false,
            }) {
        
                checkParamsSet(producerMetaClass, projectileResource, projectileClass);
                this.addVisualizeConnections([producerMetaClass]);
                this.addComponent(new StorageVisualizerComponent(projectileResource));
                this.addComponent(new VisualizeMissingResourcesComponent({}));
                this.addComponent(new StorageComponent({}));
                this.addComponent(new ConsumerComponent([projectileResource]));
                this.addComponent(new ProjectileShooterComponent({
                    projectileClass: projectileClass,
                    consumeResource: projectileResource,
                    projectileParams: additionalProjectileParams || {},
                    canCriticalStrike,
                }));
                
                this.projectileResourceId = projectileResource.name;
                this.radiusMultiplierKey = radiusMultiplierKey;
                this.damageMultiplierKey = damageMultiplierKey;
                this.shootsPerSecondMultiplierKey = shootsPerSecondMultiplierKey;
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
                if (!t.consumeAmount) throw new Error("Missing key 'consumeAmount' for defensive tower");
                if (!t.radius) throw new Error("Missing key 'radius' for defensive tower");
                if (!t.shootsPerSecond) throw new Error("Missing key 'shootsPerSecond' for defensive tower");
                if (!t.damage) throw new Error("Missing key 'damage' for defensive tower");
                
                const i = this.phaser.rootRecursiveRef;
                let a = t.consumeAmount;
                let o = t.radius;
                let n = t.damage;
                let r = t.shootsPerSecond;
        
                if (this.radiusMultiplierKey) {
                    o *= i.stats.getSkillGainMultiplier(this.radiusMultiplierKey);
                }
                if (this.damageMultiplierKey) {
                    n *= i.stats.getSkillGainMultiplier(this.damageMultiplierKey);
                    n *= i.stats.getSkillGainMultiplier("damage");
                }
                if (this.shootsPerSecondMultiplierKey) {
                    r *= i.stats.getSkillGainMultiplier(this.shootsPerSecondMultiplierKey);
                }
        
                let s = t.storage;
                s *= i.stats.getSkillGainMultiplier("buildingStorage");
                if (i.stats.isSkillUnlocked("buildingStorageDouble")) {
                    s *= 2;
                }
        
                let l = {};
                l[this.projectileResourceId] = Math.round(s);
                this.getComponent(StorageComponent).limits = l;
                this.getComponent(StorageVisualizerComponent).divisor = a;
        
                let u = this.getComponent(ProjectileShooterComponent);
                u.projectileParams.damage = n;
                u.consumeAmount = a;
                u.radius = o;
                u.setShootsPerSecond(r);
        
                let c = {};
                c[this.projectileResourceId] = a;
                this.getComponent(VisualizeMissingResourcesComponent).resourceIdsAndAmount = c;
            }
        }       

        class ArrowTowerMeta extends MetaBuilding {
            constructor() {
                super('arrowTower');
                this.addNearbyPlacementHelper({ entityClass: ArrowFactoryBuilding, radius: Config.radius.arrowFactory })
                this.addRadiusPlacementHelper(GAME_BALANCING.buildings.arrowTower[0].radius)
                this.addDependency(ArrowFactoryMeta)
                this.useTransporters();
            }
        
            static get name() {
                return "ArrowTowerMeta";
            }
        
            getInstanceClass() {
                return ArrowTowerBuilding;
            }
        
            getDockingStyle() {
                return "sharp";
            }
        }

        class ArrowTowerBuilding extends BasicDefensiveTower {
            constructor(i, a, o, n) {
                super(i, a, o, n, {
                    producerMetaClass: ArrowFactoryMeta,
                    projectileResource: BasicArrow,
                    projectileClass: MetaArrowProjectile,
                    additionalProjectileParams: {
                        speedTilesPerSecond: 17
                    },
                    radiusMultiplierKey: "arrowRadius",
                    damageMultiplierKey: "arrowDamage",
                    shootsPerSecondMultiplierKey: "arrowFireRate",
                    canCriticalStrike: true,
                });
        
                this.addComponent(new ArrowTowerComponent());
            }
        
            static get name() {
                return "ArrowTowerBuilding";
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
        
                if (this.phaser.rootRecursiveRef.stats.isSkillUnlocked("arrowFeatureDoubleDamage")) {
                    const projectileShooterComponent = this.getComponent(ProjectileShooterComponent);
                    projectileShooterComponent.projectileParams.damage *= 2;
                    projectileShooterComponent.consumeAmount *= 3;
                }
            }
        }
        const MultiplacePlacementHelper = (function () {
            function e(t) {
                var i = t.multiplace,
                    a = void 0 !== i && i,
                    o = t.smartPlace,
                    n = void 0 !== o && o,
                    r = t.smartPlaceRadius,
                    s = void 0 === r ? null : r;
                _classCallCheck(this, e), (this.smartPlace = n), (this.multiplace = a), (this.smartPlaceRadius = s), this.smartPlace && checkParamSet(s);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MultiplacePlacementHelper";
                        },
                    },
                ]),
                e
            );
        })();
        
        class WallMeta extends MetaBuilding {
            constructor() {
                super("wall");
                this.addNearbyPlacementHelper({ entityClass: WallBuilding, radius: oneTileDiagonalDistance });
                this.addNearbyPlacementHelper({ entityClass: Resource, radius: oneTileDiagonalDistance });
                this.addPlacementHelper(new MultiplacePlacementHelper({ multiplace: true, smartPlace: true, smartPlaceRadius: oneTileDiagonalDistance }));
                this.addDependency(PlayerBaseMeta);
            }
        
            static get name() {
                return "WallMeta";
            }
        
            getInstanceClass() {
                return WallBuilding;
            }
        
            makeSprite(e, t) {
                const i = e.make.group();
                const a = 2 * Config.ui.wallRadius + 1.3 * t;
                const o = e.make.graphics(0, 0);
                const l = Config.tileSize / 2 + 10;
        
                o.beginFill(16777215, 1e-4);
                o.drawRect(-l, -l, 2 * l, 2 * l);
                o.beginFill(2236962, 0.35);
                o.drawCircle(0.4, 4.5, a + 8);
                const n = mixColorPerChannel(Config.colors.levels[t], 0.32, 0);
                o.beginFill(n);
                o.lineStyle(3, n);
                for (let r = 0; r < 3; ++r) o.drawCircle(0.2 * r, 1 + r, a);
                i.add(o);

                const s = e.make.graphics(0, 0);
                s.beginFill(16777215, 1e-4);
                s.drawRect(-l, -l, 2 * l, 2 * l);
                s.lineStyle(3, Config.colors.levels[t]);
                s.beginFill(3355443);
                s.beginFill(mixColorPerChannel(Config.colors.levels[t], 0.4, 51));
                s.drawCircle(0, 0, a);
                s.endFill();
                i.addChild(s);
                const u = i.generateTexture();
                i.destroy();
                return u;
            }
        }
        
        class WallBuilding extends BuildingInstance {
            constructor(i, a, o, n) {
                super(i, a, o, n);
                this.addComponent(new VisualizeConnectionsComponent({
                    connectToClasses: {
                        WallBuilding: { color: Config.colors.wall, lineSize: 4, alpha: 1, radius: oneTileDiagonalDistance },
                        Resource: { color: Config.colors.wall, lineSize: 4, alpha: 1, radius: oneTileDiagonalDistance },
                        HealingTowerBuilding: { color: Config.colors.healing, lineSize: 1, alpha: 0.2, radius: Config.radius.healingTower },
                        TransporterBuilding: { color: Config.colors.healing, lineSize: 1, alpha: 0.2, radius: Config.radius.healingTower },
                    },
                    group: i.rootRecursiveRef.groups.wallBordersGroup,
                }));
                this.addComponent(new DodgeComponent(0));
                this.addComponent(new ConsumerComponent([Healing]));
                this.addComponent(new StorageComponent({ limits: { Healing: 10 } }));
                this.addComponent(new StorageVisualizerComponent(Healing));
                this.getComponent(StorageVisualizerComponent).inverse = true;
                this.getComponent(HealthBarComponent).style = "regular_custom_radius";
            }
        
            static get name() {
                return "WallBuilding";
            }
        
            getMinimapScale() {
                return 0.75;
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
                const i = this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("wallHealth");
                const a = this.getComponent(HealthComponent).maxHealth * i;
                this.getComponent(HealthComponent).changeMaxHealth(a);
        
                const o = this.getComponent(VisualizeConnectionsComponent).connectToClasses;
                o.WallBuilding.color = mixColorPerChannel(Config.colors.levels[this.level], 0.3, 51);
                o.WallBuilding.lineSize = Math.floor(4 + 0.4 * this.level);
                o.Resource.color = o.WallBuilding.color;
                o.Resource.lineSize = o.WallBuilding.lineSize;
                this.getComponent(VisualizeConnectionsComponent).needsRedraw = true;
        
                const n = (2 + Config.ui.wallRadius + 1.3 * this.level) / 2;
                this.getComponent(HealthBarComponent).radius = n;
                this.getComponent(StorageVisualizerComponent).radius = n + 7;
                this.getComponent(StorageComponent).limits[Healing.name] = t.shieldStorage;
                this.phaser.rootRecursiveRef.stats.isSkillUnlocked("wallHealthFeatureMiss") ? this.getComponent(DodgeComponent).chance = 0.2 : this.getComponent(DodgeComponent).chance = 0;
            }
        }
        
        class CannonballProducerMeta extends MetaBuilding {
            constructor() {
                super("cannonballProducer");
                this.addNearbyPlacementHelper({ entityClass: IronMineBuilding, radius: Config.radius.ironMine });
                this.addDependency(IronMineMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "CannonballProducerMeta";
            }
        
            getInstanceClass() {
                return CannonballProducerBuilding;
            }
        
            getBackgroundColor() {
                return Config.colors.cannonball;
            }
        }
        
        class CannonballProducerBuilding extends BasicProcessor {
            constructor(i, a, o, n) {
                super(i, a, o, n, {
                    producersMetaClasses: [IronMineMeta],
                    recipe: { UnprocessedIron: 2 },
                    produceResource: Cannonball,
                    processingDuration: 2
                });
            }
        
            static get name() {
                return "CannonballProducerBuilding";
            }
        }
        
        class CannonTowerComponent extends Component {
            constructor() {
                super();
            }
        
            debugStr() {
                return "Is a cannon tower";
            }
        
            static get name() {
                return "CannonTowerComponent";
            }
        }
        
        class CannonMeta extends MetaBuilding {
            constructor() {
                super("cannon");
                this.addNearbyPlacementHelper({ entityClass: CannonballProducerBuilding, radius: Config.radius.cannonballProducer });
                this.addRadiusPlacementHelper(GAME_BALANCING.buildings.cannon[0].radius);
                this.addDependency(CannonballProducerMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "CannonMeta";
            }
        
            getInstanceClass() {
                return CannonBuilding;
            }
        
            getDockingStyle() {
                return "sharp";
            }
        }
        
        class CannonBuilding extends BasicDefensiveTower {
            constructor(i, a, o, n) {
                super(i, a, o, n, {
                    producerMetaClass: CannonballProducerMeta,
                    projectileClass: MetaCannonProjectile,
                    projectileResource: Cannonball,
                    additionalProjectileParams: {
                        speedTilesPerSecond: 8,
                        aoeRadiusTiles: oneTileDistance,
                        explosionClass: MetaCannonExplosionParticle
                    },
                    damageMultiplierKey: "cannonDamage",
                    canCriticalStrike: true
                });
                this.addComponent(new CannonTowerComponent());
            }
        
            static get name() {
                return "CannonBuilding";
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
                const i = 8 * this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("cannonProjectileSpeed");
                this.getComponent(ProjectileShooterComponent).projectileParams.speedTilesPerSecond = i;
        
                if (this.phaser.rootRecursiveRef.stats.isSkillUnlocked("cannon_feature_double_dmg")) {
                    this.getComponent(ProjectileShooterComponent).projectileParams.damage *= 2;
                    this.getComponent(ProjectileShooterComponent).consumeAmount *= 3;
                }
            }
        }
        
        class TransporterComponent extends Component {
            constructor(speed) {
                super();
                this.speed = speed;
            }
        
            setSpeed(speed) {
                this.speed = speed;
            }
        
            debugStr() {
                return "Transports resources";
            }
        
            static get name() {
                return "TransporterComponent";
            }
        }
        
        class InvisibleComponent extends Component {
            debugStr() {
                return "Invisible to attackers. Can be walked over";
            }
        
            static get name() {
                return "InvisibleComponent";
            }
        }
        
        class TransporterMeta extends MetaBuilding {
            constructor() {
                super("transporter");
                this.addNearbyPlacementHelper({ entityClass: BuildingInstance, radius: Config.radius.transporter, condition: isRelevantForTransport });
                this.addPlacementHelper(new MultiplacePlacementHelper({ multiplace: true, smartPlace: true, smartPlaceRadius: Config.radius.transporter }));
                this.addRadiusPlacementHelper(Config.radius.transporter);
                this.addDependency(PlayerBaseMeta);
            }
        
            static get name() {
                return "TransporterMeta";
            }
        
            getInstanceClass() {
                return TransporterBuilding;
            }
        
            makeSprite(e, t) {
                const i = e.make.group();
                const a = e.make.graphics(0, 0);
                const o = Config.tileSize / 2 + 10;
        
                a.beginFill(16777215, 1e-4);
                a.drawRect(-o, -o, 2 * o, 2 * o);
                a.beginFill(2236962, 0.5);
                a.drawRoundedRect(-6.6, -4, 14, 14, 3);
        
                const n = mixColorPerChannel(Config.colors.levels[t], 0.32, 0);
                a.beginFill(n);
        
                for (let r = 0; r < 3; ++r) {
                    a.drawRoundedRect(0.2 * r - 5, -4 + r, 10, 10, 3);
                }
        
                a.beginFill(Config.colors.levels[t]);
                a.drawRoundedRect(-5, -5, 10, 10, 3);
                a.endFill();
        
                i.addChild(a);
                const s = i.generateTexture();
                i.destroy();
                return s;
            }
        }
        
        class TransporterBuilding extends BuildingInstance {
            constructor(i, a, o, n) {
                super(i, a, o, n);
                const r = this;
                const visualizeConnectionsComponent = new VisualizeConnectionsComponent({
                    connectToClasses: {
                        TransporterBuilding: { color: Config.colors.transporter, lineSize: 2, alpha: 0.5, radius: Config.radius.transporter, style: STYLE_DOUBLE, doubleSpacing: 2 },
                        BuildingInstance: {
                            color: Config.colors.transporter,
                            lineSize: 2,
                            alpha: 0.3,
                            radius: Config.radius.transporter,
                            condition: function (e) {
                                return isRelevantForTransport(e) && !e.hasComponent(TransporterComponent);
                            },
                        },
                    },
                });
        
                visualizeConnectionsComponent.needsRedraw = true;
                visualizeConnectionsComponent.drawDashed = true;
                this.addComponent(visualizeConnectionsComponent);
                this.addComponent(new TransporterComponent());
                this.getComponent(HealthBarComponent).style = "regular_custom_radius";
                this.getComponent(HealthBarComponent).radius = 3;
                this.getComponent(SpawnGraveOnDeathComponent).particleClass = MetaWallDestroyedParticle;
            }
        
            static get name() {
                return "TransporterBuilding";
            }
        
            getMinimapScale() {
                return 0.75;
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
                const i = this.phaser.rootRecursiveRef.stats.getSkillGainMultiplier("transporterSpeed");
                this.getComponent(TransporterComponent).setSpeed(t.transportSpeed * i);
        
                if (this.phaser.rootRecursiveRef.stats.isSkillUnlocked("transporterFeatureInvisible") && !this.hasComponent(InvisibleComponent)) {
                    this.addComponent(new InvisibleComponent());
                    const a = this.getComponent(VisualizeConnectionsComponent);
                    const o = a.connectToClasses;
                    for (let n in o) {
                        o[n].alpha *= 0.5;
                    }
                    a.needsRedraw = true;
                    this.children[0].alpha = 0.5;
                    a.drawDashed = true;
                }
            }
        }
        
        class UraniumMineMeta extends MetaBuilding {
            constructor() {
                super("uraniumMine");
                this.addNearbyRequirement({ resourceType: UraniumOre, radius: Config.radius.uraniumOre, errorText: tr("error_place_next_to_uranium_ore") });
                this.addCompatibleResourcesPlacementHelper(UraniumOre);
                this.addDependency(PlayerBaseMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "UraniumMineMeta";
            }
        
            getInstanceClass() {
                return UraniumMineBuilding;
            }
        
            getBackgroundColor() {
                return Config.colors.uranium;
            }
        
            getDockingStyle() {
                return "miner";
            }
        }
        
        class UraniumMineBuilding extends BasicResourceMiner {
            constructor(i, a, o, n) {
                super(i, a, o, n, { producerMetaClass: MetaUraniumOre, sourceResource: Uranium, destResource: MinedUranium });
            }
        
            static get name() {
                return "UraniumMineBuilding";
            }
        }
        
        class NuclearStationMeta extends MetaBuilding {
            constructor() {
                super("nuclearStation");
                this.addNearbyPlacementHelper({ entityClass: UraniumMineBuilding, radius: Config.radius.uraniumMine });
                this.addDependency(UraniumMineMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "NuclearStationMeta";
            }
        
            getInstanceClass() {
                return NuclearStationBuilding;
            }
        
            getBackgroundColor() {
                return Config.colors.power;
            }
        }
        
        class NuclearStationBuilding extends BasicProcessor {
            constructor(i, a, o, n) {
                super(i, a, o, n, { producersMetaClasses: [UraniumMineMeta], recipe: { MinedUranium: 1 }, produceResource: Power, processingDuration: 2 });
            }
        
            static get name() {
                return "NuclearStationBuilding";
            }
        }

        class BombTowerComponent extends Component {
            constructor() {
                super();
            }
        
            debugStr() {
                return "Is a bomb tower";
            }
        
            static get name() {
                return "BombTowerComponent";
            }
        }
        
        class BombTowerMeta extends MetaBuilding {
            constructor() {
                super("bombTower");
                this.addNearbyPlacementHelper({ entityClass: CannonballProducerBuilding, radius: Config.radius.cannonballProducer });
                this.addRadiusPlacementHelper(GAME_BALANCING.buildings.cannon[0].radius);
                this.addDependency(CannonballProducerMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "BombMeta";
            }
        
            getInstanceClass() {
                return BombBuilding;
            }
        
            getDockingStyle() {
                return "sharp";
            }
        }
        
        class BombBuilding extends BasicDefensiveTower {
            constructor(i, a, o, n) {
                super(i, a, o, n, {
                    producerMetaClass: CannonballProducerMeta,
                    projectileClass: MetaCannonProjectile,
                    projectileResource: Cannonball,
                    additionalProjectileParams: {
                        speedTilesPerSecond: 2,
                        aoeRadiusTiles: 8,
                        explosionClass: MetaCannonExplosionParticle
                    },
                    //damageMultiplierKey: "bombDamage"
                });
                this.addComponent(new BombTowerComponent());
            }
        
            static get name() {
                return "BombBuilding";
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
            }
        }
        
        class LightningTowerComponent extends Component {
            debugStr() {
                return "Is a lightning tower";
            }
        
            static get name() {
                return "LightningTowerComponent";
            }
        }
        
        class LightningTowerMeta extends MetaBuilding {
            constructor() {
                super("lightningTower");
                this.addNearbyPlacementHelper({ entityClass: NuclearStationBuilding, radius: Config.radius.nuclearStation });
                this.addRadiusPlacementHelper(GAME_BALANCING.buildings.lightningTower[0].radius);
                this.addDependency(NuclearStationMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "LightningTowerMeta";
            }
        
            getInstanceClass() {
                return LightningTowerBuilding;
            }
        
            getDockingStyle() {
                return "sharp";
            }
        }
        
        class LightningTowerBuilding extends BasicDefensiveTower {
            constructor(i, a, o, n) {
                super(i, a, o, n, {
                    producerMetaClass: NuclearStationMeta,
                    projectileResource: Power,
                    projectileClass: MetaLightningParticle,
                    radiusMultiplierKey: "lightningRadius",
                });
                this.addComponent(new LightningTowerComponent());
            }
        
            static get name() {
                return "LightningTowerBuilding";
            }
        
            updateComponentsToStats(t) {
                super.updateComponentsToStats(t);
                if (!t.spread) {
                    throw new Error("missing 'spread' for lightning tower");
                }
                const i = t.spread;
                this.getComponent(ProjectileShooterComponent).projectileParams.spread = i;
                this.getComponent(ProjectileShooterComponent).projectileParams.fillColor = Config.colors.levels[this.level];
                if (this.phaser.rootRecursiveRef.stats.isSkillUnlocked("lightningFeatureCrit")) {
                    this.getComponent(ProjectileShooterComponent).canCriticalStrike = true;
                }
            }
        }
        
        class HealingTowerMeta extends MetaBuilding {
            constructor() {
                super("healingTower");
                this.addNearbyPlacementHelper({ entityClass: UraniumMineBuilding, radius: Config.radius.uraniumMine });
                this.addDependency(UraniumMineMeta);
                this.useTransporters();
            }
        
            static get name() {
                return "HealingTowerMeta";
            }
        
            getInstanceClass() {
                return HealingTowerBuilding;
            }
        
            getBackgroundColor() {
                return Config.colors.healing;
            }
        }
        
        class HealingTowerBuilding extends BasicProcessor {
            constructor(i, a, o, n) {
                super(i, a, o, n, { producersMetaClasses: [UraniumMineMeta], recipe: { MinedUranium: 4 }, produceResource: Healing, processingDuration: 2 });
            }
        
            static get name() {
                return "HealingTowerBuilding";
            }
        }
        
        const BuildingRegistry = (function () {
            function e() {
                _classCallCheck(this, e);
            }
            return (
                (e.getMetaBuildings = function () {
                    return META_BUILDINGS;
                }),
                (e.getMetaclassByName = function (e) {
                    return META_BUILDINGS.find(function (t) {
                        return t.constructor.name === e;
                    });
                }),
                (e.getMetaclassByClassHandle = function (e) {
                    var t = META_BUILDINGS.find(function (t) {
                        return t instanceof e;
                    });
                    if (!t) {
                        var i = META_RESOURCES.find(function (t) {
                            return t instanceof e;
                        });
                        if (!i) throw new Error('Building or resource "' + e.name + '" not found');
                        return i;
                    }
                    return t;
                }),
                (e.mapResourceToPreviewSprite = function (e) {
                    var t = RESOURCE_TO_META[e];
                    if (null == t) throw new Error("Unkown resource " + e);
                    return this.getMetaclassByClassHandle(t).getPreviewSpritePath();
                }),
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingRegistry";
                        },
                    },
                ]),
                e
            );
        })();

        class Map {
            constructor(root) {
                this.root = root;
                this.changed = new Phaser.Signal();
                this.reset();
            }
        
            static get name() {
                return "Map"
            }
        
            reset() {
                var e = [Config.numTilesX, Config.numTilesY];
                (this.tiles = make2DArray.apply(
                    void 0,
                    e.concat([
                        function () {
                            return null;
                        },
                    ])
                )),
                    (this.pathfindingGrid = make2DArray.apply(
                        void 0,
                        e.concat([
                            function () {
                                return 0;
                            },
                        ])
                    )),
                    (this.flowGrid = make2DArray.apply(
                        void 0,
                        e.concat([
                            function () {
                                return { weight: 1e20, visited: true, walkable: true };
                            },
                        ])
                    )),
                    (this.dynamicEntitiesMapping = make1DArray(Config.numTilesX * Config.numTilesY, function () {
                        return [];
                    })),
                    (this.flowGridDirty = true);
            }
        
            checkCoordinates(e, t) {
                null == e && console.error("Invalid coordinates (#1):", e, t),
                    null == t && console.error("Invalid coordinates (#2):", e, t),
                    isNaN(e) && console.error("Invalid coordinates (#3):", e, t),
                    isNaN(t) && console.error("Invalid coordinates (#4):", e, t),
                    (e < 0 || e >= Config.numTilesX) && console.error("Invalid coordinates (#5):", e, t),
                    (t < 0 || t >= Config.numTilesY) && console.error("Invalid coordinates (#6):", e, t);
            }
        
            isValidCoordinate(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                return !(null == e || null == t || isNaN(e) || isNaN(t) || e < 0 || t < 0) && e >= i && t >= i && e < Config.numTilesX - i && t < Config.numTilesY - i;
            }
        
            isInBounds(e, t) {
                return e >= 0 && t >= 0 && e < Config.numTilesX && t < Config.numTilesY;
            }
        
            isTileUsed(e, t) {
                var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                this.checkCoordinates(e, t);
                var a = this.tiles[e][t];
                return i ? null !== a : null !== a && !a.hasComponent(InvisibleComponent);
            }
        
            getTileContent(e, t) {
                return this.checkCoordinates(e, t), this.tiles[e][t];
            }
        
            clearTile(e, t) {
                this.checkCoordinates(e, t);
                var i = this.tiles[e][t];
                (this.tiles[e][t] = null), (this.pathfindingGrid[e][t] = 0), (this.flowGrid[e][t].walkable = true), (this.flowGridDirty = true), this.changed.dispatch(e, t, i, TILE_CLEARED);
            }
        
            recomputeFlowGrid() {
                this.flowGridDirty = false;
                console.log("[MAP] Updating flow grid");
            
                const { numTilesX, numTilesY } = Config;
                const { flowGrid } = this;
            
                // Initialize flow grid
                for (let t = 0; t < numTilesX; t++) {
                    for (let i = 0; i < numTilesY; i++) {
                        const a = flowGrid[t][i];
                        a.weight = 1e20;
                        a.visited = false;
                    }
                }
            
                const o = this.root.logic.getPlayerBase();
            
                if (o) {
                    const n = o.getTileX();
                    const r = o.getTileY();
                    const s = flowGrid[n][r];
                    s.visited = true;
                    s.weight = 0;
                    s.walkable = true;
        
                    const l = [];
            
                    DIRECT_TILE_NEIGHBORS.forEach(([a, o]) => {
                        const x = n + a;
                        const y = r + o;
            
                        if (x >= 0 && x < numTilesX && y >= 0 && y < numTilesY) {
                            const u = flowGrid[x][r];
                            const c = flowGrid[n][y];
            
                            if (u.walkable && c.walkable) {
                                l.push([x, y]);
                            }
                        }
                    });
            
                    for (let u = 0; u < l.length; u++) {
                        const [d, h] = l[u];
                        const p = flowGrid[d][h];
            
                        if (!p.visited && p.walkable) {
                            let g = 1e20;
            
                            for (let m = 0; m < DIRECT_TILE_NEIGHBORS.length; m++) {
                                const [f, b, A] = DIRECT_TILE_NEIGHBORS[m];
                                const y = d + f;
                                const v = h + b;
            
                                if (y >= 0 && v >= 0 && y < numTilesX && v < numTilesY) {
                                    const k = flowGrid[y][v];
            
                                    if (f !== 0 && b !== 0) {
                                        const w = flowGrid[d][v];
                                        const V = flowGrid[y][h];
            
                                        if (!w.walkable || !V.walkable) {
                                            continue;
                                        }
                                    }
            
                                    if (k.walkable && k.visited) {
                                        const C = k.weight + A;
                                        g = Math.min(C, g);
                                    } else {
                                        l.push([y, v]);
                                    }
                                }
                            }
            
                            p.visited = true;
                            p.weight = g;
                        }
                    }
            
                    if (Config.showFlowGrid) {
                        if (!this.cachedFlowGridGraphics) {
                            this.cachedFlowGridGraphics = this.root.phaser.make.graphics();
                            this.root.groups.zombieHeatmapGroup.add(this.cachedFlowGridGraphics);
                        }
            
                        this.cachedFlowGridGraphics.clear();
            
                        for (let S = 0; S < numTilesX; S++) {
                            for (let q = 0; q < numTilesY; q++) {
                                const T = flowGrid[S][q];
            
                                if (T.weight < 1e15) {
                                    const x = Math.max(0, Math.min(1, T.weight / 30));
                                    const B = (Math.floor(255 * x) << 16) | (Math.floor(255 - 255 * x) << 8) | 127;
                                    this.cachedFlowGridGraphics.beginFill(B, 0.7);
                                    this.cachedFlowGridGraphics.drawRect(S * Config.tileSize, q * Config.tileSize, Config.tileSize, Config.tileSize);
                                }
                            }
                        }
                    }
                }
            }    
        
            updateMap() {
                for (var e = Config.numTilesX * Config.numTilesY, t = this.dynamicEntitiesMapping, i = 0; i < e; ++i) t[i] = null;
                for (var a = this.root.entityMgr.dynamicEntities, o = 0; o < a.length; ++o) {
                    var n = a[o];
                    if (n.alive && n.exists) {
                        var r = n.getTile(),
                            s = _slicedToArray(r, 2),
                            l = s[0],
                            u = s[1],
                            c = l * Config.numTilesX + u,
                            d = t[c];
                        null === d ? (t[c] = [n]) : d.push(n);
                    }
                }
                this.flowGridDirty && a.length > 0 && (Config.spawnDefaultBuildings || this.recomputeFlowGrid());
            }
        
            setTileContent(e, t, i) {
                if ((this.checkCoordinates(e, t), !(i instanceof Entity))) throw new Error("entity is no Entity: " + i);
                this.tiles[e][t] = i;
                var a = !i.useInPathfinding();
                this.flowGrid[e][t].walkable !== a && ((this.flowGrid[e][t].walkable = a), (this.flowGridDirty = true)),
                    (this.pathfindingGrid[e][t] = a ? 0 : 1),
                    (i.mapX = e),
                    (i.mapY = t),
                    this.changed.dispatch(e, t, i, TILE_FILLED);
            }
        
            removeEntityFromMap(e) {
                if (e.mapX) {
                    if (e.mapX !== e.getTileX()) throw new Error("Immovable entity moved x from " + e.mapX + " to " + e.getTileX());
                    if (e.mapY !== e.getTileY()) throw new Error("Immovable entity moved y from " + e.mapY + " to " + e.getTileY());
                    this.clearTile(e.mapX, e.mapY);
                }
            }
        
            getRandomTile() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return { x: randomInt(e, Config.numTilesX - e), y: randomInt(e, Config.numTilesY - e) };
            }
        
            getRandomUnusedTile() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = 999; t > 0;) {
                    var i = this.getRandomTile(e),
                        a = i.x,
                        o = i.y;
                    if (!this.isTileUsed(a, o)) return { x: a, y: o };
                    t -= 1;
                }
                return { x: 0, y: 0 };
            }
        
            getRandomUnusedReachableTile() {
                for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = 999; t > 0;) {
                    var i = this.getRandomTile(e),
                        a = i.x,
                        o = i.y;
                    if (!this.isTileUsed(a, o) && this.checkTileIsReachable(a, o)) return { x: a, y: o };
                    t -= 1;
                }
                return { x: 0, y: 0 };
            }
        
            getRandomBorderTile(e) {
                var t = Config.numTilesX - 2 * e - 1,
                    i = Config.numTilesY - 2 * e - 1,
                    a = randomInt(0, 2 * t + 2 * i);
                return a <= t ? { x: e + a, y: e } : (a -= t) <= i ? { x: Config.numTilesX - e - 1, y: e + a } : (a -= i) <= t ? { x: e + a, y: Config.numTilesY - e - 1 } : (a -= t) <= i ? { x: e, y: e + a } : { x: e, y: e };
            }
        
            getIncrementalSearchParams(e) {
                if (!e || isNaN(e) || e < 0) throw new Error("Invalid radius");
                var t = Math.ceil(e - 0.1);
                if (t >= INCREMENTAL_SEARCH.length) throw new Error("radius too big: " + e);
                var i = INCREMENTAL_SEARCH[t];
                return { offsets: i, numOffsets: i.length / 2 };
            }
        
            incrementalSearch(e) {
                var t = e.tileX,
                    i = e.tileY,
                    a = e.radiusTileSpace,
                    o = e.handlerAndAbortCondition;
                this.checkCoordinates(t, i);
                for (var n = this.getIncrementalSearchParams(a), r = n.offsets, s = n.numOffsets, l = a * a, u = 0; u < s; ++u) {
                    var c = r[2 * u],
                        d = r[2 * u + 1],
                        h = t + c,
                        p = i + d;
                    if (this.isInBounds(h, p)) {
                        var g = c * c + d * d;
                        if (g <= l && o(h, p, g)) return;
                    }
                }
            }
        
            getUsedTilesArround(e) {
                var t = this,
                    i = e.tileX,
                    a = e.tileY,
                    o = e.radius,
                    n = e.condition,
                    r = [];
                return (
                    this.incrementalSearch({
                        tileX: i,
                        tileY: a,
                        radiusTileSpace: o,
                        handlerAndAbortCondition: function (e, i, a) {
                            var o = t.tiles[e][i];
                            return !o || (n && !n(o)) || r.push({ entity: o, distanceSquare: a }), false;
                        },
                    }),
                    r
                );
            }
        
            findClosestEntity(e) {
                var t = this,
                    i = e.tileX,
                    a = e.tileY,
                    o = e.radius,
                    n = e.condition,
                    r = null;
                return (
                    this.incrementalSearch({
                        tileX: i,
                        tileY: a,
                        radiusTileSpace: o,
                        handlerAndAbortCondition: function (e, i) {
                            var a = t.tiles[e][i];
                            return !(!a || (n && !n(a))) && ((r = a), true);
                        },
                    }),
                    r
                );
            }
        
            findDynamicEntitiesInRadiusWorldSpace(e) {
                var t = this,
                    i = e.x,
                    a = e.y,
                    o = e.radius,
                    n = e.condition,
                    r = e.maxAmount,
                    s = void 0 === r ? 1e4 : r;
                if (0 === this.root.entityMgr.dynamicEntities.length) return [];
                var l = worldToTile(i, a),
                    u = _slicedToArray(l, 2),
                    c = u[0],
                    d = u[1];
                if (!this.isValidCoordinate(c, d)) return console.error("Invalid world coordinates for dynamic entities:", i, a, "->", c, d), [];
                var h = Math.floor(o / Config.tileSize + 1),
                    p = o * o,
                    g = [i, a],
                    m = [];
                return (
                    this.incrementalSearch({
                        tileX: c,
                        tileY: d,
                        radiusTileSpace: h,
                        handlerAndAbortCondition: function (e, i) {
                            var a = t.dynamicEntitiesMapping[e * Config.numTilesX + i];
                            if (!a) return false;
                            for (var o = 0; o < a.length; ++o) {
                                var r = a[o];
                                if (!n || n(r)) if (distanceEuclidianSquare(r.worldSpaceTileCenter(), g) <= p && (m.push(r), m.length >= s)) return true;
                            }
                            return false;
                        },
                    }),
                    m
                );
            }
        
            findClosestDynamicEntityWorldSpace(e) {
                var t = e.x,
                    i = e.y,
                    a = e.radius,
                    o = e.condition,
                    n = this.findDynamicEntitiesInRadiusWorldSpace({ x: t, y: i, radius: a, condition: o, maxAmount: 1 });
                return 0 === n.length ? null : n[0];
            }
        
            findClosestEntityOfClass(e) {
                var t = e.tileX,
                    i = e.tileY,
                    a = e.radius,
                    o = e.classType,
                    n = e.condition;
                if ((this.checkCoordinates(t, i), null == o)) throw new Error("Class " + o + " is not a valid class");
                return this.findClosestEntity({
                    tileX: t,
                    tileY: i,
                    radius: a,
                    condition: function (e) {
                        return e instanceof o && (!n || n(e));
                    },
                });
            }
        
            findPath(e, t) {
                if ((this.checkCoordinates(e.x, e.y), this.checkCoordinates(t.x, t.y), e.x === t.x && e.y === t.y)) return [[e.x, e.y]];
                var i = new _pathfinding2.default.Grid(this.pathfindingGrid);
                i.setWalkableAt(e.y, e.x, true), i.setWalkableAt(t.y, t.x, true);
                var a = new _pathfinding2.default.AStarFinder({ allowDiagonal: true, dontCrossCorners: true }).findPath(e.y, e.x, t.y, t.x, i);
                return null === a || a.length < 1
                    ? null
                    : a.map(function (e) {
                        var t = _slicedToArray(e, 2),
                            i = t[0];
                        return [t[1], i];
                    });
            }
        
            checkAllDirectNeighborsAreBlocked(e, t) {
                for (
                    var i = [
                        [-1, 0],
                        [1, 0],
                        [0, -1],
                        [0, 1],
                    ],
                    a = true,
                    o = 0;
                    o < i.length;
                    ++o
                ) {
                    var n = _slicedToArray(i[o], 2),
                        r = n[0],
                        s = n[1];
                    this.isTileUsed(e + r, t + s) || (a = false);
                }
                return a;
            }
        
            checkTileIsReachable(e, t) {
                return this.checkCoordinates(e, t), !this.checkAllDirectNeighborsAreBlocked(e, t) && !!this.findPath({ x: e, y: t }, { x: 0, y: 0 });
            }
        
            findClosestFreeTileArround(e, t) {
                var i = this,
                    a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    o = null;
                return (
                    this.incrementalSearch({
                        tileX: e,
                        tileY: t,
                        radiusTileSpace: MAX_INCREMENTAL_SEARCH_RADIUS,
                        handlerAndAbortCondition: function (e, t) {
                            return i.tiles[e][t] ? !(!a || !i.tiles[e][t].hasComponent(InvisibleComponent)) && ((o = [e, t]), true) : ((o = [e, t]), true);
                        },
                    }),
                    o
                );
            }
        
            checkIsTileFreeArround(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1.01,
                    a = this.findClosestFreeTileArround(e, t);
                return !!a && distanceEuclidianSquare([e, t], a) <= i * i;
            }
        
            singleTileMovementIsPossible(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return (
                    this.checkCoordinates(e[0], e[1]),
                    this.checkCoordinates(t[0], t[1]),
                    e[0] === t[0] && e[1] === t[1]
                        ? (console.warn("Checking for same point movement"), true)
                        : !(!i && (this.isTileUsed.apply(this, _toConsumableArray(e)) || this.isTileUsed.apply(this, _toConsumableArray(t)))) &&
                        (e[0] === t[0] || e[1] === t[1] || !this.isTileUsed(e[0], t[1]) || !this.isTileUsed(t[0], e[1]))
                );
            }
        
            tileIsOccupiedByDynamicEntities(e, t) {
                if ((this.checkCoordinates(e, t), this.dynamicEntitiesMapping)) {
                    var i = this.dynamicEntitiesMapping[e * Config.numTilesX + t];
                    return null !== i && 0 !== i.length;
                }
                return false;
            }
        
            findNextTileOnPathToBaseWorldSpace(e, t) {
                for (var i = worldToTile(e, t), a = _slicedToArray(i, 2), o = a[0], n = a[1], r = null, s = 1e20, l = 0, u = DIRECT_TILE_NEIGHBORS.length; l < u; ++l) {
                    var c = _slicedToArray(DIRECT_TILE_NEIGHBORS[l], 3),
                        d = c[0],
                        h = c[1],
                        p = c[2],
                        g = o + d,
                        m = n + h;
                    if (this.isInBounds(g, m)) {
                        var _ = this.flowGrid[g][m];
                        if (this.singleTileMovementIsPossible([o, n], [g, m], true)) {
                            var f = _.weight + p;
                            f < s && ((s = f), (r = [g, m]));
                        }
                    }
                }
                return r;
            }
        
            getPathLengthToBase(e, t) {
                return this.flowGrid[e][t].weight;
            }
        }

    const NUM_LEVELS = 30;
    const LEVEL_TO_PARTICLE = [];

    for (let level = 0; level <= NUM_LEVELS; level++) {
        const className = `AnimLevel${level}`;
        const animClass = class extends MetaBuildingAnimationParticle {
            constructor() {
                super();
                this.tint = Config.colors.levels[level];
            }

            static get name() {
                return className;
            }
        };

        LEVEL_TO_PARTICLE.push(animClass);
    }

    const CameraManager = (function () {
        function e(t) {
            _classCallCheck(this, e), (this.root = t), (this.moved = new Phaser.Signal()), this.initKeys();
        }
        return (
            _createClass(e, null, [
                {
                    key: "name",
                    get: function () {
                        return "CameraManager";
                    },
                },
            ]),
            (e.prototype.initKeys = function () {
                this.root.keyboard.addKeyCapture([Config.keys.moveUp, Config.keys.moveDown, Config.keys.moveRight, Config.keys.moveLeft]), (this.arrowCursors = this.root.keyboard.createCursorKeys());
            }),
            (e.prototype.update = function (e) {
                var t = this.root.keyboard,
                    i = 0,
                    a = 0;
                (t.isDown(Config.keys.moveUp) || this.arrowCursors.up.isDown) && (a = -1),
                    (t.isDown(Config.keys.moveDown) || this.arrowCursors.down.isDown) && (a = 1),
                    (t.isDown(Config.keys.moveLeft) || this.arrowCursors.left.isDown) && (i = -1),
                    (t.isDown(Config.keys.moveRight) || this.arrowCursors.right.isDown) && (i = 1);
                var o = i * Config.cameraMovePerSecond * e,
                    n = a * Config.cameraMovePerSecond * e;
                (0 === o && 0 === n) || this.moved.dispatch(o, n);
            }),
            e
        );
    })(),
        CSVar = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.checksum = ""), this.setValue(t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "CSVar";
                        },
                    },
                ]),
                (e.prototype.getValue = function () {
                    return this.getChecksum() !== this.checksum && this.setValue(0), this.decode(this[ATTRIBUTE_NAMES[0]], 0);
                }),
                (e.prototype.encode = function (e, t) {
                    return PREFIX + (e * (MULTIPLIER_BASE + t) + ADD_BASE).toString();
                }),
                (e.prototype.decode = function (e, t) {
                    if (!e.substr(0, PREFIX.length) === PREFIX) return console.error("Bad value:", e), 0;
                    var i = e.substr(PREFIX.length);
                    try {
                        return Math.floor((parseInt(i, 10) - ADD_BASE) / (MULTIPLIER_BASE + t));
                    } catch (t) {
                        return console.error("Failed to parse int:", e, "raw:", i), 0;
                    }
                }),
                (e.prototype.getChecksum = function () {
                    var e = this,
                        t = "";
                    return (
                        ATTRIBUTE_NAMES.forEach(function (i) {
                            t += e[i] + ",";
                        }),
                        t
                    );
                }),
                (e.prototype.setValue = function (e) {
                    for (var t = Math.floor(Number(e)), i = 0; i < ATTRIBUTE_NAMES.length; ++i) this[ATTRIBUTE_NAMES[i]] = this.encode(t, i);
                    this.checksum = this.getChecksum();
                }),
                e
            );
        })(),
        CullManager = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "CullManager";
                        },
                    },
                ]),
                (e.prototype.update = function () {
                    var e = this.root.phaser.camera.position,
                        t = this.root.zoom.currentZoomLevel,
                        i = [this.root.phaser.width, this.root.phaser.height];
                    this.bounds = { left: e.x * t - CULLING_BORDER_SIZE, right: (e.x + i[0]) * t + CULLING_BORDER_SIZE, top: e.y * t - CULLING_BORDER_SIZE, bottom: (e.y + i[1]) * t + CULLING_BORDER_SIZE };
                }),
                (e.prototype.isRectInView = function (e, t, i, a) {
                    return !!this.bounds && this.bounds.left <= e + i && e <= this.bounds.right && this.bounds.top <= t + a && t <= this.bounds.bottom;
                }),
                (e.prototype.isCircleInView = function (e, t, i) {
                    return this.isRectInView(e - i, t - i, 2 * i, 2 * i);
                }),
                e
            );
        })(),
        DaytimeManager = (function () {
            function e(t) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.placedBaseAtTime = null),
                    (this.cached = { isNight: Config.startDay > 0, percentOfTotalDay: 0, day: 1 }),
                    this.root.signals.playerBasePlaced.add(this.onPlayerBasePlaced, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DaytimeManager";
                        },
                    },
                ]),
                (e.prototype.isNight = function () {
                    return this.cached.isNight;
                }),
                (e.prototype.isDay = function () {
                    return !this.isNight();
                }),
                (e.prototype.percentOfTotalDay = function () {
                    return this.cached.percentOfTotalDay;
                }),
                (e.prototype.secondsOfCurrentDay = function () {
                    return this.cached.percentOfTotalDay * this.getDayDuration(this.getDay());
                }),
                (e.prototype.getDay = function () {
                    return this.cached.day;
                }),
                (e.prototype.onPlayerBasePlaced = function () {
                    console.log("[DAYTIME] Placed player base, starting game time"), (this.placedBaseAtTime = this.root.time.now);
                }),
                (e.prototype.getDayDuration = function (e) {
                    return Config.dayDurationTotalSeconds * this.getDurationIncrease(e);
                }),
                (e.prototype.secondsUntilNight = function () {
                    if (this.isNight()) return 0;
                    var e = this.getDayDuration(this.getDay()),
                        t = e * this.percentOfTotalDay();
                    return e * (1 - Config.nightDurationSeconds / Config.dayDurationTotalSeconds) - t;
                }),
                (e.prototype.getDurationIncrease = function (e) {
                    return 1 / Math.pow(Config.daySpeedDecrease, Math.min(100, e));
                }),
                (e.prototype.loadDay = function (e, t) {
                    for (var i = 1e3 * -Config.initialDayDurationAdditional, a = 1; a < e; ++a) i -= 1e3 * this.getDayDuration(a);
                    i += this.root.time.now;
                    var o = this.getDayDuration(e);
                    (t < 0 || t > o) && (console.log("[DAYTIME] Fixing up old savegame seconds by setting it to 0!"), (t = 0)), (i -= 1e3 * t), (i -= 1e3);
                    for (var n = 1; n < Config.startDay; ++n) i += 1e3 * this.getDayDuration(n);
                    (this.placedBaseAtTime = i), (this.cached.isNight = false), this.update();
                }),
                (e.prototype.update = function () {
                    if (this.root.gamemode && this.root.gamemode.isAlwaysNight()) return (this.cached.isNight = true), (this.cached.percentOfTotalDay = 0.99999), void (this.cached.day = 1);
                    if (this.root.logic.playerHasPlacedBase()) {
                        var e = 1e3 * Config.initialDayDurationAdditional;
                        Config.startDay > 0 && (e = 0);
                        for (var t = Math.max(0, this.root.time.now - this.placedBaseAtTime - e) / 1e3, i = 1; i < Config.startDay; ++i) t += this.getDayDuration(i);
                        for (var a = t, o = 0, n = 1; a >= 0 && ((o += 1), a >= (n = this.getDayDuration(o)));) a -= n;
                        var r = a / n,
                            s = r >= 1 - Config.nightDurationSeconds / Config.dayDurationTotalSeconds,
                            l = this.cached.isNight;
                        (this.cached.isNight = s),
                            (this.cached.percentOfTotalDay = r),
                            (this.cached.day = o),
                            l !== this.cached.isNight &&
                            (this.isNight()
                                ? this.root.signals.nightEntered.dispatch(this.getDay())
                                : (this.root.signals.nightEnded.dispatch(this.getDay())));
                    }
                }),
                e
            );
        })(),
        ZombieHeatmap = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.group = t.groups.zombieHeatmapGroup), (this.graphics = t.phaser.make.graphics()), this.group.add(this.graphics);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ZombieHeatmap";
                        },
                    },
                ]),
                (e.prototype.visualizeTile = function (e, t, i) {
                    if (i.length > 0) {
                        var a = Math.max(0, Math.min(1, i.length / 10)),
                            o = pastellizeColor((Math.round(255 * a) << 16) | (Math.round(255 * (1 - a)) << 8) | 17, 0.2);
                        this.graphics.beginFill(o, 0.2);
                        var n = tileToWorld(e, t),
                            r = _slicedToArray(n, 2),
                            s = r[0],
                            l = r[1];
                        this.graphics.drawRect(s, l, Config.tileSize, Config.tileSize);
                        var u = this.root.phaser.make.text(s + 5, l + 5, i.length, { font: "10px Roboto Mono", fill: "#00FFFF" });
                        this.graphics.addChild(u);
                    }
                }),
                (e.prototype.update = function () {
                    if ((clearGroup(this.graphics), this.graphics.clear(), Config.showZombieHeatmap && this.root.map.dynamicEntitiesMapping)) {
                        this.graphics.revive();
                        for (var e = 0; e < Config.numTilesX; ++e)
                            for (var t = 0; t < Config.numTilesX; ++t) {
                                var i = this.root.map.dynamicEntitiesMapping[e][t];
                                this.visualizeTile(e, t, i);
                            }
                    } else this.graphics.kill();
                }),
                e
            );
        })(),
        DebugManager = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), this.init();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DebugManager";
                        },
                    },
                ]),
                (e.prototype.init = function () { }),
                (e.prototype.showSceneGraph = function () {
                    var e = "Scene graph:\n";
                    (e += this.dumpNodes(this.root.phaser.world, 0)), console.log(e);
                }),
                (e.prototype.dumpNodes = function (e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        a = "--".repeat(i),
                        o = e.name || "<no name>",
                        n = e.constructor.name;
                    e instanceof Phaser.Group
                        ? (n = "Phaser.Group")
                        : e instanceof Phaser.Text
                            ? ((n = "Phaser.Text"), (o = "text='" + e.text + "'"))
                            : e instanceof Phaser.Sprite
                                ? (n = "Phaser.Sprite")
                                : e instanceof Phaser.Image
                                    ? (n = "Phaser.Image")
                                    : e instanceof FastImage
                                        ? (n = "FastImage")
                                        : e instanceof Phaser.Graphics
                                            ? (n = "Phaser.Graphics")
                                            : e instanceof Phaser.TileSprite && (n = "Phaser.TileSprite"),
                        e instanceof Phaser.SpriteBatch && (n = "Phaser.SpriteBatch"),
                        e instanceof Entity && (o = "tile=" + e.getTile()),
                        e.alive || (o += " !alive"),
                        e.exists || (o += " !exists"),
                        e.visible || (o += " !visible");
                    var r = n + "[" + o + "]",
                        s = e.children || [],
                        l = a + r + " - " + s.length + " children:\n";
                    return (
                        s.forEach(function (e) {
                            l += t.dumpNodes(e, i + 1);
                        }),
                        l
                    );
                }),
                (e.prototype.update = function () {
                    0;
                }),
                e
            );
        })(),
        DialogManager = (function () {
            function e(t) {
                var i = this;
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.cachedStatus = false),
                    this.root.signals.consistentGameUpdate.add(function () {
                        i.cachedStatus = i.computeDialogIsOpen();
                    }),
                    window.addEventListener("keydown", function (e) {
                        return i.handleKeyDown(e);
                    });
                var a = window.showDialog;
                window.showDialog = function (e) {
                    a(e), i.root.keyboard.stop();
                };
                var o = window.closeDialog;
                window.closeDialog = function (e) {
                    o(e), i.root.keyboard.start();
                };
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DialogManager";
                        },
                    },
                ]),
                (e.prototype.modalDialogIsOpen = function () {
                    return this.cachedStatus;
                }),
                (e.prototype.getOpenDialog = function () {
                    var e = document.querySelector(".dialog_overlay_bg.visible_dialog");
                    return e && "tutorial_bg" === e.id ? null : e;
                }),
                (e.prototype.computeDialogIsOpen = function () {
                    if (this.getOpenDialog()) return true;
                    var e = this.root.gui.uiGlobalUpgradesDialog;
                    return !(!e || !e.isDialogOpen());
                }),
                (e.prototype.handleKeyDown = function (e) {
                    if (27 === e.keyCode) {
                        var t = this.getOpenDialog();
                        t && window.closeDialog(t.id);
                    }
                }),
                e
            );
        })(),
        EntityManager = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.entities = []), (this.dynamicEntities = []), (this.destroyList = []), (this.componentToEntity = newEmptyMap());
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EntityManager";
                        },
                    },
                ]),
                (e.prototype.getStatsText = function () {
                    return this.entities.length + " entities [" + this.dynamicEntities.length + " dynamic] [" + this.destroyList.length + " to kill]";
                }),
                (e.prototype.update = function () {
                    this.processDestroyList();
                }),
                (e.prototype.registerEntity = function (e) {
                    if (this.entities.indexOf(e) >= 0) throw new Error("RegisterEntity() called twice for entity " + e);
                    for (var t in (this.entities.push(e), e.isDynamic() && this.dynamicEntities.push(e), e.components)) this.componentToEntity[t] ? this.componentToEntity[t].push(e) : (this.componentToEntity[t] = [e]);
                    e.registered = true;
                }),
                (e.prototype.registerPostLoadComponent = function (e, t) {
                    this.componentToEntity[t] ? this.componentToEntity[t].push(e) : (this.componentToEntity[t] = [e]);
                }),
                (e.prototype.foreachEntityHavingComponents = function (e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (!e || e.length < 1) throw new Error("Components are empty");
                    for (
                        var a = e.map(function (e) {
                            return e.name;
                        }),
                        o = this.entities,
                        n = 0,
                        r = a.length;
                        n < r;
                        ++n
                    ) {
                        var s = this.componentToEntity[a[n]];
                        if (!s) return;
                        s.length < o.length && (o = s);
                    }
                    for (var l = 0, u = o.length; l < u; ++l) {
                        var c = o[l];
                        if ((i || c.renderable) && c.alive) {
                            for (var d = 0, h = a.length; d < h; ++d) c.hasComponentId(a[d]);
                            t(c, c.components);
                        }
                    }
                }),
                (e.prototype.getAllEntitiesWithComponent = function (e) {
                    return this.componentToEntity[e.name] || [];
                }),
                (e.prototype.unregisterEntityComponents = function (e) {
                    for (var t in e.components) fastArrayDeleteValue(this.componentToEntity[t], e);
                }),
                (e.prototype.processDestroyList = function () {
                    var e = this;
                    this.destroyList.forEach(function (t) {
                        fastArrayDeleteValue(e.entities, t),
                            t.isDynamic() && fastArrayDeleteValue(e.dynamicEntities, t),
                            e.unregisterEntityComponents(t),
                            e.root.particles.tryKillEntity(t),
                            e.root.map.removeEntityFromMap(t),
                            (t.registered = false),
                            t.destroy(),
                            t instanceof PlayerBaseBuilding && (console.warn("Player base building got destroyed"), e.root.signals.gameOver.dispatch()),
                            t instanceof BuildingInstance && (e.root.logic.resetBuildingCountCache(), e.root.signals.buildingDestroyed.dispatch(t));
                    }),
                        (this.destroyList = []);
                }),
                (e.prototype.destroyEntity = function (e) {
                    e.alive || console.error("Trying to destroy killed entity!"), this.destroyList.indexOf(e) < 0 ? (this.destroyList.push(e), (e.alive = false)) : console.error("Trying to destroy entity twice:", e);
                }),
                (e.prototype.destroyAll = function () {
                    var e = this;
                    this.root.map.reset(),
                        this.entities.forEach(function (t) {
                            e.root.particles.tryKillEntity(t), t.destroy();
                        }),
                        (this.entities = []),
                        (this.dynamicEntities = []),
                        (this.componentToEntity = {}),
                        (this.destroyList = []);
                }),
                e
            );
        })(),
        GameFocus = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.visibilitySupported = false), (this.windowIsFocused = true), (this.windowIsVisible = true), this.initFocusListener(), this.initVisbilityListener();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameFocus";
                        },
                    },
                ]),
                (e.prototype.initFocusListener = function () {
                    var e = this;
                    window.addEventListener("focus", function () {
                        (e.windowIsFocused = true), e.root.signals.gameFocusChanged.dispatch();
                    }),
                        window.addEventListener("blur", function () {
                            (e.windowIsFocused = false), e.root.keyboard.releaseAllKeys(), e.root.signals.gameFocusChanged.dispatch(), window.mouseTracker.onFocusLost();
                        });
                }),
                (e.prototype.initVisbilityListener = function () {
                    var e = this,
                        t = "";
                    void 0 !== document.hidden
                        ? ((this.documentHiddenPropertyName = "hidden"), (t = "visibilitychange"))
                        : void 0 !== document.msHidden
                            ? ((this.documentHiddenPropertyName = "msHidden"), (t = "msvisibilitychange"))
                            : void 0 !== document.webkitHidden && ((this.documentHiddenPropertyName = "webkitHidden"), (t = "webkitvisibilitychange")),
                        void 0 === document.addEventListener || void 0 === document[this.documentHiddenPropertyName]
                            ? console.warn("[FOCUS] This game requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.")
                            : (document.addEventListener(
                                t,
                                function () {
                                    return e.handleVisibilityChange();
                                },
                                false
                            ),
                                (this.visibilitySupported = true));
                }),
                (e.prototype.handleVisibilityChange = function () {
                    document[this.documentHiddenPropertyName] ? ((this.windowIsVisible = false), window.mouseTracker.onFocusLost()) : (this.windowIsVisible = true), this.root.signals.gameFocusChanged.dispatch();
                }),
                (e.prototype.isFocused = function () {
                    return this.windowIsFocused;
                }),
                (e.prototype.isVisible = function () {
                    return this.windowIsVisible;
                }),
                (e.prototype.isVisibleAndFocused = function () {
                    return this.visibilitySupported ? this.isVisible() : this.isFocused();
                }),
                e
            );
        })(),
        MovementDistractionComponent = (function (e) {
            function t(i) {
                var a = i.slowdownFactor,
                    o = void 0 === a ? 0.3 : a,
                    n = i.forceX,
                    r = void 0 === n ? 0 : n,
                    s = i.forceY,
                    l = void 0 === s ? 0 : s;
                _classCallCheck(this, t);
                var u = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(o, r, l), (u.slowdownFactor = 0.3), (u.forceX = r), (u.forceY = l), u;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MovementDistractionComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Slows down attackers to " + this.slowdownFactor + " and force " + this.forceX + " / " + this.forceY;
                }),
                t
            );
        })(Component),
        MetaRiverEntity = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "river.png"));
                return (i.width = 64), (i.height = i.width), (i.paddingX = 0), (i.paddingY = 0), (i.renderMode = PARTICLE_RENDER_NONE), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaRiverEntity";
                        },
                    },
                ]),
                (t.prototype.isImportantParticle = function () {
                    return true;
                }),
                (t.prototype.makeParticle = function (e) {
                    return new RiverEntity(e, this.precomputedTexture);
                }),
                (t.prototype.reviveParticle = function () {
                    throw new Error("Revive not possible for resources - they should never die");
                }),
                t
            );
        })(MetaSingleSpriteParticle),
        RiverEntity = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, 0, 0, a));
                return o.addComponent(new InvisibleComponent()), o.addComponent(new MovementDistractionComponent({ slowdownFactor: 0.8, forceX: 0.2, forceY: 0 })), o;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RiverEntity";
                        },
                    },
                ]),
                (t.prototype.useInPathfinding = function () {
                    return false;
                }),
                (t.prototype.onSpawned = function () { }),
                (t.prototype.refreshInstance = function () { }),
                (t.prototype.getMinimapColor = function () {
                    return Config.colors.river;
                }),
                t
            );
        })(EntitySpriteObj);

    class BaseSkill {
        constructor(key, position, gains, dependsOn = null) {
            this.key = key;
            this.gains = gains;
            this.position = position;
            this.dependsOn = dependsOn || [];
        }

        get cost() {
            return 1;
        }

        getScale() {
            return 1;
        }

        getCircleStyle() {
            return "regular";
        }

        getSpriteColor() {
            return 16777215;
        }

        getActiveColor() {
            return Config.colors.skillUnlocked;
        }

        getBackgroundColor() {
            for (const e in this.gains) {
                return GAIN_MAPPINGS[e].color;
            }
            return 8947848;
        }

        static get name() {
            return "BaseSkill";
        }
    }

    class BigSkill extends BaseSkill {
        getScale() {
            return 1.2;
        }

        getCircleStyle() {
            return "polygon";
        }

        getPolygonEdges() {
            return 6;
        }

        get cost() {
            return 5;
        }

        static get name() {
            return "BigSkill";
        }
    }

    class FeatureSkill extends BaseSkill {
        constructor(key, position, description, dependsOn = null, skillCost = 15) {
            super(key, position, {}, dependsOn);
            this.description = description;
            this.skillCost = skillCost;
        }

        getScale() {
            return 1.5;
        }

        getCircleStyle() {
            return "polygon";
        }

        getPolygonEdges() {
            return 6;
        }

        getBackgroundColor() {
            return SKILL_TREE[this.dependsOn[0]].getBackgroundColor();
        }

        get cost() {
            return this.skillCost;
        }

        static get name() {
            return "FeatureSkill";
        }
    }

    class InitialSkill extends BigSkill {
        get cost() {
            return 1;
        }

        static get name() {
            return "InitialSkill";
        }
    }

    class Skill2Points extends BaseSkill {
        get cost() {
            return 2;
        }

        static get name() {
            return "Skill2Points";
        }
    }

    class Skill3Points extends BaseSkill {
        get cost() {
            return 3;
        }

        static get name() {
            return "Skill3Points";
        }
    }
    
    class GameLogic {
        constructor(t) {
            (this.root = t),
                (this.buildingCountCache = {}),
                (this.mapSeed = randomInt(1e10, 1e11 - 1)),
                this.root.signals.nightEnded.add(this.nightEndCallback, this),
                this.root.signals.nightEntered.add(this.nightStartCallback, this),
                this.root.signals.gameLoadedAndStarted.add(this.onGameStarted, this);
        }
        static get name() {
            return "GameLogic"
        }

        init() {
            this.createMapBorders(), this.createMapFog();
        }

        createMapBorders() {
            var e = Config.numTilesX * Config.tileSize,
                t = Config.numTilesY * Config.tileSize,
                i = Config.mapBorder * Config.tileSize,
                a = [
                    [0, 0, e, i],
                    [0, i, i, t - i],
                    [e - i, i, i, t - i],
                    [i, t - i, e - 2 * i, i],
                ],
                o = this.root.phaser.make.graphics();
            o.beginFill(15658734),
                a.forEach(function (e) {
                    var t = _slicedToArray(e, 4),
                        i = t[0],
                        a = t[1],
                        n = t[2],
                        r = t[3];
                    o.drawRect(i, a, n, r);
                }),
                (o.blendMode = _pixi.PIXI.blendModes.MULTIPLY),
                o.endFill(),
                this.root.groups.mapBordersGroup.add(o);
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
            var e = {
                x: Math.floor(Config.numTilesX / 2),
                y: Math.floor(Config.numTilesY / 2)
            };
            Config.spawnDefaultBuildings && (e = {
                x: 10,
                y: 10
            });
            var t = tileCenterToWorld(e.x, e.y),
                i = _slicedToArray(t, 2),
                a = i[0],
                o = i[1],
                n = this.root.phaser.camera,
                r = this.root.zoom.currentZoomLevel;
            n.setPosition(a / r - n.width / 2, o / r - n.height / 2);
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

    class GameMode {
        getId() {
            throw new Error("abstract");
        }
        getTitle() {
            throw new Error("abstract");
        }
        getUniqueIndex() {
            throw new Error("abstract");
        }
        getColor() {
            throw new Error("abstract");
        }
        initialize() {
            Config.initialDayDurationAdditional = 45;
        }
        isChallenge() {
            return false;
        }
        isSandbox() {
            return false;
        }
        isAlwaysNight() {
            return false;
        }
        autoSpawnsZombies() {
            return true;
        }
        static get name() {
            return "GameMode";
        }
    }

    class EasyMode extends GameMode {
        getId() {
            return "easy";
        }

        getTitle() {
            return tr("gamemode_easy");
        }

        getColor() {
            return 2544453;
        }

        getUniqueIndex() {
            return 1;
        }

        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 0.6,
                zombieDamageMultiplier: 0.6,
                zombieHealthMultiplier: 0.6
            });
        }
        static get name() {
            return "EasyMode";
        }
    }

    class RegularMode extends GameMode {
        getId() {
            return "regular";
        }
        getTitle() {
            return tr("gamemode_regular");
        }
        getColor() {
            return 11184810;
        }
        getUniqueIndex() {
            return 2;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 1,
                zombieDamageMultiplier: 1,
                zombieHealthMultiplier: 1
            });
        }
        static get name() {
            return "RegularMode";
        }
    }

    class HardMode extends GameMode {
        getId() {
            return "hard";
        }
        getTitle() {
            return tr("gamemode_hard");
        }
        getColor() {
            return 16035906;
        }
        getUniqueIndex() {
            return 3;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 1.5,
                zombieDamageMultiplier: 1,
                zombieHealthMultiplier: 4
            });
        }
        static get name() {
            return "HardMode";
        }
    }

    class ImpossibleMode extends GameMode {
        getId() {
            return "impossible";
        }
        getTitle() {
            return tr("gamemode_impossible");
        }
        getColor() {
            return 16720767;
        }
        getUniqueIndex() {
            return 4;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 2,
                zombieDamageMultiplier: 1.5,
                zombieHealthMultiplier: 6
            });
        }
        static get name() {
            return "ImpossibleMode";
        }
    }

    class GlassCannonMode extends GameMode {
        getId() {
            return "brutal";
        }
        getTitle() {
            return "GlassCannon";
        }
        getColor() {
            return 19769666;
        }
        getUniqueIndex() {
            return 5;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 0.5,
                zombieDamageMultiplier: 10,
                zombieHealthMultiplier: 5
            });
        }
        static get name() {
            return "GlassCannonMode";
        }
    }

    class ChallengeBossOnly extends GameMode {
        getId() {
            return "challenge_boss_only";
        }
        getTitle() {
            return tr("gamemode_challenge_boss_only");
        }
        getColor() {
            return 16742263;
        }
        isChallenge() {
            return true;
        }
        getUniqueIndex() {
            return 1001;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 1.25,
                zombieDamageMultiplier: 1,
                zombieHealthMultiplier: 1,
                bossInterval: 1,
                zombieAmountInBossWave: 0.95
            });
            Config.initialDayDurationAdditional = 300;
        }
        static get name() {
            return "ChallengeBossOnly";
        }
    }

    class SandboxMode extends GameMode {
        getId() {
            return "sandbox";
        }
        getColor() {
            return 3381759;
        }
        getTitle() {
            return tr("gamemode_sandbox");
        }
        getUniqueIndex() {
            return 2000;
        }
        isSandbox() {
            return true;
        }
        initialize() {
            super.initialize();
            const initBalancing = new Balancing({
                upgradeCostMultiplier: 0,
                zombieDamageMultiplier: 1,
                zombieHealthMultiplier: 1,
                bossInterval: 10
            });
        }
        isAlwaysNight() {
            return true;
        }
        autoSpawnsZombies() {
            return false;
        }
        static get name() {
            return "SandboxMode";
        }
    }

    class GameSerializer {
        constructor(root) {
            this.root = root;
            this.lastSavegame = "None available";
        }
    
        static get name() {
            return "GameSerializer";
        }
    
        updateLastSavegame() {
            this.lastSavegame = this.serialize();
        }
    
        getLastSavegame() {
            return this.root.daytime.isDay() && this.updateLastSavegame(), this.lastSavegame;
        }
    
        serialize() {
            const camera = this.root.phaser.camera;
            const t = {
                random: randomInt(1e3, 1e13),
                version: SAVEGAME_VERSION,
                beta: YORGIO.IS_BETA,
                day: this.root.daytime.getDay(),
                daySeconds: this.root.daytime.secondsOfCurrentDay(),
                stats: this.root.stats.serialize(),
                mapSeed: this.root.logic.mapSeed,
                gamemode: this.root.gamemode.getId(),
                view: {
                    zoom: this.root.zoom.currentZoomLevel,
                    x: camera.view.x,
                    y: camera.view.y
                },
                sync: this.root.syncer.serialize(),
            };
            const buildings = [];
            this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach((e) => {
                let t = {};
                if (e.hasComponent(StorageComponent)) {
                    t = e.getComponent(StorageComponent).resources;
                }
                buildings.push({
                    className: e.meta.constructor.name,
                    level: e.level,
                    tileX: e.getTileX(),
                    tileY: e.getTileY(),
                    storage: t,
                });
            });
            t.buildings = buildings;
            return this.dataToString(t);
        }
    
        generatePreview(e) {
            const t = this.stringToData(e, false);
            if (!t) {
                console.log("[SERIALIZER] Failed to decompress savegame for preview");
                return null;
            }
            const canvas = document.createElement("canvas");
            canvas.width = Config.numTilesX;
            canvas.height = Config.numTilesY;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#111111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            t.buildings.forEach((e) => {
                const className = e.className;
                const tileX = e.tileX;
                const tileY = e.tileY;
                const buildingClass = BuildingRegistry.getMetaclassByName(className);
                if (buildingClass) {
                    const color = buildingClass.getBackgroundColor();
                    ctx.fillStyle = "#" + color.toString(16).padStart(6, "0");
                    ctx.fillRect(tileX - 0.5, tileY - 0.5, 2, 2);
                }
            });
            return canvas.toDataURL();
        }
    
        load(e, forceCompatibility = true) {
            const data = this.stringToData(e, forceCompatibility);
            if (!data) return false;
            if (data.version > SAVEGAME_VERSION) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("savegame_too_new"));
                return false;
            }
            if (data.version < LAST_COMPATIBLE_VERSION) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("savegame_too_old"));
                return false;
            }
            if (data.version < SAVEGAME_VERSION && forceCompatibility) {
                this.root.gui.uiNotifications.showLongHint(tr("savegame_old_version"));
            }
        
            const isBeta = YORGIO.IS_BETA;
            if (data.beta && !isBeta) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("savegame_from_beta"));
                return false;
            }
        
            const gamemodeId = data.gamemode || "impossible";
            const gameMode = createGameModeFromId(gamemodeId);
            if (!gameMode) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("gamemode_no_longer_exists", gamemodeId));
                return false;
            }
        
            this.root.gamemode = gameMode;
            this.root.gamemode.initialize();
            this.root.logic.clearGame();
            this.root.stats.load(data.stats);
            this.root.logic.mapSeed = data.mapSeed;
            this.root.logic.spawnResources();
        
            // Call the async function to process the buildings
            this.processBuildingsAsync(data)
                .then(() => {
                    console.log("Buildings processed successfully.");

                    this.root.logic.onSavegameLoaded();
                    const daySeconds = data.daySeconds || 0;
                    this.root.daytime.loadDay(data.day, daySeconds);
                    this.root.phaser.camera.view.setTo(data.view.x, data.view.y);
                    this.root.zoom.setZoomLevel(data.view.zoom, true);
                    this.root.syncer.load(data.sync);
                    this.root.gui.uiGameTimeButtons.requestPause();
                    this.root.gui.uiNotifications.showLongSuccess(tr("game_successfully_loaded"));
                    this.lastSavegame = e;
                })
                .catch((error) => {
                    console.error("An error occurred while processing buildings:", error);
                });
        
            return true;
        }
        
        async processBuildingsAsync(data) {
            const batchSize = 40; // Number of buildings loaded at once
            const delayBetweenBatches = 200; // Adjust the delay in milliseconds
            const totalBuildings = data.buildings.length;
        
            for (let startIndex = 0; startIndex < totalBuildings; startIndex += batchSize) {
                const endIndex = Math.min(startIndex + batchSize, totalBuildings);
                const batch = data.buildings.slice(startIndex, endIndex);
        
                await Promise.all(batch.map(async (e) => {
                    const className = e.className;
                    const level = e.level;
                    const tileX = e.tileX;
                    const tileY = e.tileY;
                    const storage = e.storage;
                    const buildingClass = BuildingRegistry.getMetaclassByName(className);
        
                    if (buildingClass && !this.root.map.isTileUsed(tileX, tileY)) {
                        const buildingInstance = this.root.logic.doPlaceBuilding(buildingClass, tileX, tileY);
        
                        for (let i = 0; i < level; ++i) {
                            buildingClass.upgradeInstance(this.root.phaser, buildingInstance);
                        }
        
                        const storageComponent = buildingInstance.getComponent(StorageComponent);
                        if (storageComponent) {
                            storageComponent.resources = storage;
                        }
                    }
                }));
        
                // Introduce a delay before processing the next batch
                await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
            }
        }
 
        dataToString(e) {
            const str = JSON.stringify(e, null, 2);
            return _lzString2.default.compressToEncodedURIComponent(str);
        }
    
        stringToData(e) {
            const forceCompatibility = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            const trimmed = e.trim();
            let decompressed = "";
            try {
                decompressed = _lzString2.default.decompressFromEncodedURIComponent(trimmed);
            } catch (err) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("invalid_or_corrupt_savegame"));
                return null;
            }
            if (decompressed === null) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("invalid_or_corrupt_savegame"));
                return null;
            }
            let data = {};
            try {
                data = JSON.parse(decompressed);
            } catch (err) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("invalid_or_corrupt_savegame"));
                return null;
            }
            if (data === null) {
                if (forceCompatibility) this.root.gui.uiNotifications.showLongError(tr("invalid_or_corrupt_savegame"));
                return null;
            }
            return data;
        }
    }
        const GameSettings = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), this.loadSettings();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameSettings";
                        },
                    },
                ]),
                (e.prototype.updateSetting = function (e, t) {
                    var i = !!t,
                        a = "setting_" + e;
                    this.root.persistent.setBool(a, i),
                        (this[e] = i),
                        console.log("[SETTINGS] Changed", e, "to", i);
                }),
                (e.prototype.loadSettings = function () {
                    var e = this;
                    META_GAME_SETTINGS.forEach(function (t) {
                        t.settings.forEach(function (t) {
                            var i = t.id,
                                a = t.defaultValue,
                                o = "setting_" + i,
                                n = e.root.persistent.getBool(o, a);
                            e[i] = n;
                        });
                    });
                }),
                e
            );
        })(),
        GameSystem = (function () {
            function e(t, i) {
                var a = i.necessaryComponents,
                    o = i.updateOutOfScreen,
                    n = void 0 === o || o;
                if ((_classCallCheck(this, e), (this.root = t), !a)) throw new Error("necessaryComponents is required");
                if (!Array.isArray(a)) throw new Error("necessaryComponents is not an array");
                (this.necessaryComponents = a), (this.updateOutOfScreen = n), t.signals.gameReset.add(this.onGameReset, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameSystem";
                        },
                    },
                ]),
                (e.prototype.onGameReset = function () { }),
                (e.prototype.processEntity = function () {
                    throw new Error("abstract");
                }),
                (e.prototype.forEachEntity = function (e) {
                    this.root.entityMgr.foreachEntityHavingComponents(this.necessaryComponents, e, this.updateOutOfScreen);
                }),
                (e.prototype.update = function () {
                    var e = this;
                    this.forEachEntity(function (t, i) {
                        return e.processEntity(t, i);
                    });
                }),
                e
            );
        })(),
        EmitterSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [EmitterComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EmitterSystem";
                        },
                    },
                ]),
                (t.prototype.findNextConsumer = function (e, t) {
                    var i = this,
                        a = t.resourceClass.name,
                        o = [];
                    if (
                        (o = t.precomputeConsumers
                            ? t.precomputedPossibleConsumers
                            : this.root.map.getUsedTilesArround({
                                tileX: e.getTileX(),
                                tileY: e.getTileY(),
                                radius: t.spawnMaxRadius,
                                condition: function (e) {
                                    return i.isValidConsumer(e, a);
                                },
                            })).length < 1
                    )
                        return { consumer: null };
                    null == t.currentEmitIndex && (t.currentEmitIndex = 0);
                    var n = o.length;
                    t.currentEmitIndex = t.currentEmitIndex % n;
                    for (var r = 0; r < n; ++r) {
                        var s = o[t.currentEmitIndex],
                            l = s.entity,
                            u = s.stops;
                        if (((t.currentEmitIndex = (t.currentEmitIndex + 1) % n), this.isValidConsumer(l, a))) return { consumer: l, stops: u };
                    }
                    return { consumer: null };
                }),
                (t.prototype.isValidConsumer = function (e, t) {
                    if (!e.alive || !e.exists) return false;
                    var i = e.getComponentById(ID_CONSUMER_COMPONENT);
                    if (null !== i) {
                        var a = this.root.time.now;
                        if (i.canConsume(t, a)) return e.getComponentById(ID_STORAGE_COMPONENT).hasSpaceLeft(t);
                    }
                    return false;
                }),
                (t.prototype.getRandomPointInCircle = function (e, t) {
                    var i = Math.random() * t,
                        a = 2 * Math.random() * Math.PI;
                    return { x: Math.sin(a) * i + e.x + Config.tileSize / 2, y: Math.cos(a) * i + e.y + Config.tileSize / 2 };
                }),
                (t.prototype.processEntity = function (e, t) {
                    for (
                        var i = t.EmitterComponent, a = t.StorageComponent, o = this.root.time.now, n = { x: e.x + Config.tileSize / 2, y: e.y + Config.tileSize / 2 }, r = i.resourceClass;
                        i.spawnTimer.takeTick(o) && a.haveResourceAmount(r.name, i.emitBatchSize);

                    ) {
                        var s = this.findNextConsumer(e, i),
                            l = s.consumer,
                            u = s.stops;
                        if (null === l && !i.emitEvenIfNoConsumer) break;
                        if (!a.takeResource(r.name, i.emitBatchSize)) throw new Error("Storage said we have resources, but we dont");
                        if ((null !== l || this.root.settings.enableParticles) && (null !== l || this.root.settings.enableResourceThrowaway)) {
                            var c = null;
                            if (null === l) {
                                var d = i.spawnMaxRadius * Config.tileSize;
                                c = this.getRandomPointInCircle(e, d);
                            } else {
                                var h = l.worldSpaceTileCenter(),
                                    p = _slicedToArray(h, 2);
                                (c = { x: p[0], y: p[1] }), l.getComponent(StorageComponent).addPendingResources(r.name, i.emitBatchSize);
                            }
                            this.createParticle({ resourceClass: r, consumer: l, startPos: n, endPos: c, stops: u, emitterComp: i });
                        }
                    }
                }),
                (t.prototype.computeDuration = function (e, t) {
                    var i = ((arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null) || Config.resourceSpeedTilesPerSecond) * Config.tileSize;
                    return (distanceEuclidian(e, t) / i) * 1e3;
                }),
                (t.prototype.createParticle = function (e) {
                    var t = this,
                        i = e.resourceClass,
                        a = e.emitterComp,
                        o = e.consumer,
                        n = e.startPos,
                        r = e.endPos,
                        s = e.stops;
                    if (null === s && o) null !== o && o.getComponent(StorageComponent).resolvePendingResources(i.name, a.emitBatchSize);
                    else {
                        var l = this.root.particles.spawnNew(n.x, n.y, i);
                        if (null === o) {
                            s && s.length > 0 && console.error("stops specified on empty consumer"),
                                this.root.animations
                                    .animate(l)
                                    .to(r, 2e3)
                                    .onDone(function () {
                                        var e = t.root.animations.animate(l);
                                        e.to({ alpha: 0 }, 1e3),
                                            e.onDone(function () {
                                                t.root.particles.kill(l);
                                            });
                                    });
                        } else {
                            var u = null;
                            if (s && 0 !== s.length) {
                                u = this.root.animations.animateLinearPath(l);
                                var c = null,
                                    d = s[0];
                                d.hasComponent(TransporterComponent) && (c = d.getComponent(TransporterComponent).speed);
                                for (var h = [n.x, n.y], p = 0, g = s.length; p < g; ++p) {
                                    var m = s[p];
                                    if (m.hasComponent(TransporterComponent)) {
                                        var _ = m.worldSpaceTileCenter();
                                        u.to(_, this.computeDuration(h, _, c)), (h = _), (c = m.getComponent(TransporterComponent).speed);
                                    } else console.error("entity is no valid stop:", m);
                                }
                                u.to([r.x, r.y], this.computeDuration(h, [r.x, r.y], c));
                            } else {
                                var f = this.computeDuration([n.x, n.y], [r.x, r.y]);
                                u = this.root.animations.animate(l).to(r, f);
                            }
                            u.onDone(function () {
                                t.root.particles.kill(l), o.getComponent(StorageComponent).resolvePendingResources(i.name, a.emitBatchSize);
                            });
                        }
                    }
                }),
                t
            );
        })(GameSystem),
        ProcessorSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [ProcessorComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProcessorSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    for (
                        var i = t.ProcessorComponent, a = t.StorageComponent, o = this.root.time.now, n = i.recipe, r = i.produceResourceId, s = i.multiplier, l = i.produceAmount * s;
                        a.canBuildRecipe(n, s) && a.hasSpaceLeft(r, l) && i.startProduction(o);

                    )
                        if ((a.addPendingResources(r, l), !a.takeRecipe(n, s))) throw new Error("Not enough for recipe, but got ensured before");
                    for (; i.finishProduction(o);) a.resolvePendingResources(r, l);
                    this.updateProcessingSprite(e, i);
                }),
                (t.prototype.getProcessingSprite = function (e) {
                    var t = null;
                    if (PROCESSOR_SPRITE_CACHE[e]) t = PROCESSOR_SPRITE_CACHE[e];
                    else {
                        Config.logOverlayRedraws && console.log("[RENDER] Generating processor sprite for color", e);
                        var i = this.root.phaser.make.graphics(Config.tileSize / 2, Config.tileSize / 2),
                            a = Config.tileSize / 2 - Config.ui.buildingOuterSpace;
                        i.beginFill(16777215, 0.6), i.drawCircle(a, 0, 3), i.drawCircle(-a, 0, 3), i.drawCircle(0, a, 3), i.drawCircle(0, -a, 3);
                        var o = Config.tileSize / 2;
                        i.beginFill(16777215, 0.001), i.lineStyle(), i.drawRect(-o, -o, 2 * o, 2 * o), (t = i.generateTexture()), (PROCESSOR_SPRITE_CACHE[e] = t);
                    }
                    return t;
                }),
                (t.prototype.updateProcessingSprite = function (e, t) {
                    var i = this;
                    if (this.root.settings.enableParticles) {
                        if (e.renderable)
                            if (t.isProducing()) {
                                var a = createOrGetEntityAttachment(e, "processingIndicator", function () {
                                    var e = i.getProcessingSprite(3355443),
                                        t = i.root.phaser.make.sprite(0, 0, e);
                                    return t.anchor.setTo(0.5, 0.5), t.position.setTo(Config.tileSize / 2), (t.smoothed = true), t;
                                }),
                                    o = t.getProductionUsagePercentage();
                                ((this.root.time.now / 1e3) % 3) / 3 <= o && (a.angle = (a.angle + 180 * this.root.time.physicsElapsed) % 360);
                            } else hideEntityAttachment(e, "processingIndicator");
                    } else hideEntityAttachment(e, "processingIndicator");
                }),
                t
            );
        })(GameSystem),
        GainStatsSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [GainStatsComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GainStatsSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.StorageComponent,
                        a = { MinedGold: 1 };
                    for (var o in a) {
                        var n = a[o],
                            r = i.getResourceCount(o);
                        r > 0 && (i.takeResource(o, r), (this.root.stats.gems += r * n));
                    }
                }),
                t
            );
        })(GameSystem),
        EnemyAISystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [EnemyAIComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "EnemyAISystem";
                        },
                    },
                ]),
                (t.prototype.getMovementSpeed = function (e, t) {
                    var i,
                        a = t.speedTilesPerSecond,
                        o = (i = this.root.map).getPathLengthToBase.apply(i, _toConsumableArray(e.getTile()));
                    if (o > t.nearDistanceTiles) {
                        var n = o - t.nearDistanceTiles;
                        (n /= t.farDistanceTiles - t.nearDistanceTiles), (a *= 1 - (n = Math.min(1, n)) + n * t.farSpeedBoost);
                    }
                    return a;
                }),
                (t.prototype.processEntity = function (e, t) {
                    var i,
                        a = t.EnemyAIComponent,
                        o = t.PhysicsComponent,
                        n = (i = this.root.map).findNextTileOnPathToBaseWorldSpace.apply(i, _toConsumableArray(e.worldSpaceTileCenter()));
                    if (n) {
                        var r = n[0] * Config.tileSize - e.x,
                            s = n[1] * Config.tileSize - e.y,
                            l = this.getMovementSpeed(e, a),
                            u = vectorClamp([r, s]);
                        (o.desiredVelocityX = u[0] * l), (o.desiredVelocityY = u[1] * l), (a.currentAttackTargetTile = n);
                    } else (o.desiredVelocityX = 0), (o.desiredVelocityY = 0), (a.currentAttackTargetTile = null);
                }),
                (t.prototype.update = function () {
                    Config.gameTimeSpeedUpFactor < 1 || e.prototype.update.call(this);
                }),
                t
            );
        })(GameSystem),
        HealthBarSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [HealthBarComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "HealthBarSystem";
                        },
                    },
                ]),
                (t.prototype.drawAsBar = function (e, t) {
                    var i = this;
                    if (this.root.settings.enableFancyZombies) {
                        var a = createOrGetEntityAttachment(e, "healthBar", function () {
                            var e = i.root.phaser.make.fastGroup();
                            (e.x = 10), (e.y = Config.tileSize - 2 - 3);
                            var t = makeRoundedPanelBackground(i.root.phaser, Config.tileSize - 20, 8, 0, 0.2);
                            e.addChild(t);
                            var a = makeRoundedPanelBackground(i.root.phaser, Config.tileSize - 20 - 4, 4, 15658734, 1);
                            return a.position.setTo(2, 2), e.addChild(a), (e.innerBar = a), e;
                        }),
                            o = t.health / t.maxHealth;
                        a.innerBar.scale.x = o;
                    } else hideEntityAttachment(e, "healthBar");
                }),
                (t.prototype.drawAsArc = function (e, t, i) {
                    var a = this,
                        o = createOrGetEntityAttachment(e, "healthBar", function () {
                            var e = a.root.phaser.make.graphics(Config.tileSize / 2, Config.tileSize / 2);
                            return (e.displaysHealth = { percentage: 0, radius: 0 }), e;
                        }),
                        n = t.health / t.maxHealth,
                        r = { radius: i.radius, percentage: Math.round(720 * n) / 720 };
                    if (o.displaysHealth.percentage != r.percentage || o.displaysHealth.radius != r.radius) {
                        (o.displaysHealth = r), Config.logOverlayRedraws && console.log("[RENDER] Redrawing health bar overlay for payload", r), o.clear();
                        var s = 360 * r.percentage - 90,
                            l = 10;
                        if ("regular" === i.style) l = Config.tileSize / 2 - Config.ui.buildingOuterSpace;
                        else {
                            if ("regular_custom_radius" !== i.style) throw new Error("Unkown health bar style: '" + i.style + "'");
                            l = i.radius + 3;
                        }
                        o.lineStyle(5, 3355443, 1), o.arc(0, 0, l, Math.radians(-90), Math.radians(s), true);
                    }
                }),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.HealthComponent,
                        a = t.HealthBarComponent;
                    i.health > i.maxHealth - 0.5 ? hideEntityAttachment(e, "healthBar") : "bar" === a.style ? this.drawAsBar(e, i, a) : this.drawAsArc(e, i, a);
                }),
                t
            );
        })(GameSystem),
        ProjectileShooterSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [ProjectileShooterComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProjectileShooterSystem";
                        },
                    },
                ]),
                (t.prototype.createProjectile = function (e, t, i) {
                    var a = this,
                        o = e.worldSpaceTileCenter(),
                        n = normalizedDirection(o, i.worldSpaceTileCenter());
                    if (((o[0] += n[0] * Config.tileSize * 0.25), (o[1] += n[1] * Config.tileSize * 0.25), null == i)) throw new Error("target entity is null");
                    var r = this.root.stats.getSkillGainMultiplier("critical"),
                        s = 2;
                    this.root.stats.isSkillUnlocked("double_crit_feature") && (s = 3);
                    var l = this.root.particles.spawnNew(o[0], o[1], t.projectileClass, [
                        {
                            projectileParams: t.projectileParams,
                            maxRadius: t.radius,
                            targetEntity: i,
                            targetClass: t.destinationClass,
                            finishCallback: function () {
                                return a.root.particles.kill(l);
                            },
                            criticalChance: t.canCriticalStrike ? r : 0,
                            criticalMultiplier: s,
                        },
                    ]);
                }),
                (t.prototype.isValidTarget = function (e, t) {
                    if (e instanceof t && e.alive && !e.getComponent(HealthComponent).willDieSoon()) return true;
                    return false;
                }),
                (t.prototype.processEntity = function (e, t) {
                    for (var i = this, a = t.ProjectileShooterComponent, o = this.root.time.now, n = a.destinationClass; a.timer.takeTick(o);) {
                        var r = a.radius,
                            s = this.root.map.findClosestDynamicEntityWorldSpace({
                                x: e.x,
                                y: e.y,
                                radius: (r + 2) * Config.tileSize,
                                condition: function (e) {
                                    return i.isValidTarget(e, n);
                                },
                            });
                        if (null === s) break;
                        if (e.worldDistanceTo(s) / Config.tileSize - 0.3 > r) break;
                        var l = false;
                        if (a.consumeResource) {
                            var u = e.getComponent(StorageComponent);
                            if (!u) throw new Error("Projectile Shooter Component with consumeResource used on entity without storage component");
                            u.takeResource(a.consumeResource, a.consumeAmount) && (l = true);
                        } else l = true;
                        l && (this.createProjectile(e, a, s), (a.lastShootTime = this.root.time.now));
                    }
                }),
                t
            );
        })(GameSystem),
        DamageOnHitSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [DamageOnHitComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DamageOnHitSystem";
                        },
                    },
                ]),
                (t.prototype.getTargetOnPath = function (e, t) {
                    var i = e.getComponent(EnemyAIComponent);
                    if (!i) throw new Error("Entity is configured to only attack on path, but has no ai");
                    if (i.currentAttackTargetTile) {
                        var a = i.currentAttackTargetTile;
                        if (distanceEuclidian(a, e.getTile()) <= t.maxRadiusTiles) {
                            var o,
                                n = (o = this.root.map).getTileContent.apply(o, _toConsumableArray(a));
                            return n instanceof t.targetClass ? (n.hasComponent(InvisibleComponent) ? null : n) : null;
                        }
                    }
                    return null;
                }),
                (t.prototype.processEntity = function (e, t) {
                    for (
                        var i = this,
                        a = t.DamageOnHitComponent,
                        o = this.root.time.now,
                        n = function () {
                            var t = i.getTargetOnPath(e, a);
                            if (null != t) {
                                var o,
                                    n,
                                    r = [e.getTileX(), t.getTileY()],
                                    s = [t.getTileX(), e.getTileY()],
                                    l = [r, s];
                                (o = i.root.map).isTileUsed.apply(o, r.concat([false])) &&
                                    (n = i.root.map).isTileUsed.apply(n, s.concat([false])) &&
                                    ((t = null),
                                        l.forEach(function (e) {
                                            var o,
                                                n = (o = i.root.map).getTileContent.apply(o, _toConsumableArray(e));
                                            n instanceof a.targetClass && !t.hasComponent(InvisibleComponent) && (t = n);
                                        }));
                            }
                            if (
                                (null == t &&
                                    (t = i.root.map.findClosestEntity({
                                        tileX: e.getTileX(),
                                        tileY: e.getTileY(),
                                        radius: a.maxRadiusTiles,
                                        condition: function (e) {
                                            return e instanceof a.targetClass && !e.hasComponent(InvisibleComponent);
                                        },
                                    })),
                                    null == t)
                            )
                                return "break";
                            a.attackStyle === ATTACK_REGULAR ? i.spawnAttackParticle(e, t, a) : a.attackStyle === ATTACK_BOSS && i.spawnBossAttack(e, t, a);
                        };
                        a.hitTimer.takeTick(o);

                    ) {
                        if ("break" === n()) break;
                    }
                }),
                (t.prototype.applyDamage = function (e, t) {
                    e.alive && e.exists && e.takeDamage(t.damage, t.penetratesShields);
                }),
                (t.prototype.spawnBossAttack = function (e, t, i) {
                    var a;
                    if (this.root.settings.enableParticles) {
                        var o = this.root.phaser.make.graphics(0, 0);
                        e.addChild(o), o.lineStyle(2, 16726218);
                        var n = e.position,
                            r = t.worldSpaceTileCenter();
                        (r[0] -= n.x),
                            (r[1] -= n.y),
                            e.getEyesPosition().forEach(function (e) {
                                var t = [r[0] + randomInt(-8, 8), r[1] + randomInt(-8, 8)];
                                drawJaggedLine(o, e, t, 0.12, 8);
                            }),
                            (o.alpha = 1),
                            this.root.animations
                                .animate(o)
                                .to({ alpha: 0 }, 400)
                                .onDone(function () {
                                    o.destroy();
                                });
                    }
                    this.applyDamage(t, i), (a = this.root.sound).playZombieBossHitSound.apply(a, _toConsumableArray(t.worldSpaceTileCenter()));
                }),
                (t.prototype.spawnAttackParticle = function (e, t, i) {
                    var a = this,
                        o = t.worldSpaceTileCenter(),
                        n = e.worldSpaceTileCenter(),
                        r = this.root.particles.spawnNew(n[0], n[1], i.attackParticle);
                    (r.alpha = 1),
                        this.root.animations
                            .animate(r)
                            .to({ x: o[0], y: o[1], alpha: 0 }, 150)
                            .onDone(function () {
                                var e;
                                a.applyDamage(t, i), a.root.particles.kill(r), (e = a.root.sound).playZombieHitSound.apply(e, _toConsumableArray(o));
                            });
                }),
                t
            );
        })(GameSystem),
        RegenHealthOnDaySystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [RegenHealthOnDayComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RegenHealthOnDaySystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.RegenHealthOnDayComponent,
                        a = t.HealthComponent,
                        o = (i.regenPercentPerSecond / 100) * a.maxHealth;
                    if (!(a.health <= 0)) {
                        var n = false;
                        this.root.daytime.isDay() && (n = true);
                        var r = e.getComponent(StorageComponent);
                        if ((r && r.haveResourceAmount(Healing.name) && (n = true), this.root.stats.isSkillUnlocked("health_regen_feature") && (n = true), n)) {
                            var s = o * this.root.time.physicsElapsed;
                            a.regenerate(s);
                        }
                    }
                }),
                t
            );
        })(GameSystem),
        VisualizeConnectionsSystem = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [VisualizeConnectionsComponent], updateOutOfScreen: false }));
                return a.root.signals.buildingPlaced.add(a.onBuildingChanged, a), a.root.signals.buildingDestroyed.add(a.onBuildingChanged, a), (a.connectionsGroup = a.root.groups.connectionsGroup), (a.buildingsChanged = true), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "VisualizeConnectionsSystem";
                        },
                    },
                ]),
                (t.prototype.onBuildingChanged = function () {
                    for (var e = this.root.entityMgr.getAllEntitiesWithComponent(VisualizeConnectionsComponent), t = 0, i = e.length; t < i; ++t) e[t].getComponent(VisualizeConnectionsComponent).needsRedrawCheck = true;
                }),
                (t.prototype.onGameReset = function () {
                    this.connectionsGroup.destroyAllChildren(), this.onBuildingChanged();
                }),
                (t.prototype.checkEntityNeedsRedraw = function (e, t) {
                    var i = 0,
                        a = this.getConnections(e, t);
                    for (var o in a) i += a[o].length;
                    i != t.connectionCount && ((t.needsRedraw = true), (t.connectionCount = i));
                }),
                (t.prototype.getConnections = function (e, t) {
                    var i = 0,
                        a = t.connectToClasses;
                    for (var o in a) {
                        var n = t.connectToClasses[o];
                        Number.isFinite(n.radius) || (console.error("Fixing invalid radius:", n.radius, "on class", o, "of", e.constructor.name), (n.radius = 1)), (i = Math.max(i, n.radius));
                    }
                    var r = this.root.map.getUsedTilesArround({ tileX: e.getTileX(), tileY: e.getTileY(), radius: i }),
                        s = newEmptyMap();
                    for (var l in a) {
                        for (var u = [], c = t.connectToClasses[l], d = c.radius, h = c.condition, p = d * d, g = 0; g < r.length; ++g) {
                            var m = r[g],
                                _ = m.entity,
                                f = m.distanceSquare;
                            _ !== e && isinstanceString(_, l) && f <= p && ((h && !h(_)) || u.push(_));
                        }
                        s[l] = u;
                    }
                    return s;
                }),
                (t.prototype.movePathOutOfBuildings = function (e, t, i) {
                    var a = [].concat(_toConsumableArray(e)),
                        o = [].concat(_toConsumableArray(t));
                    return i && ((o[0] = (o[0] + a[0]) / 2), (o[1] = (o[1] + a[1]) / 2)), { start: (a = [Math.floor(a[0]), Math.floor(a[1])]), end: (o = [Math.floor(o[0]), Math.floor(o[1])]) };
                }),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.VisualizeConnectionsComponent;
                    if ((i.needsRedrawCheck && (this.checkEntityNeedsRedraw(e, i), (i.needsRedrawCheck = false)), i.needsRedraw)) {
                        i.needsRedraw = false;
                        var a = [0, 0],
                            o = this.getConnections(e, i),
                            n = this.root.phaser.make.graphics();
                        for (var r in (i.drawDashed && (n.drawDashed = true), o)) {
                            var s = i.connectToClasses[r],
                                l = s.lineSize || 12,
                                u = s.color;
                            Config.flashOnRedraw && (u = 16777215 * Math.random()), n.lineStyle(l, u, s.alpha || 0.2);
                            for (var c = r === e.constructor.name, d = o[r], h = 0; h < d.length; ++h) {
                                var p = d[h],
                                    g = [p.x - e.x, p.y - e.y],
                                    m = this.movePathOutOfBuildings(a, g, c),
                                    _ = m.start,
                                    f = m.end,
                                    b = s.style || STYLE_REGULAR;
                                if (b === STYLE_REGULAR) n.moveTo.apply(n, _toConsumableArray(_)), n.lineTo.apply(n, _toConsumableArray(f));
                                else if (b === STYLE_DOUBLE) {
                                    var A = findNormalVectorTo(normalizedDirection(f, _)),
                                        y = s.doubleSpacing || 4,
                                        v = y * A[0],
                                        k = y * A[1];
                                    n.moveTo(_[0] + v, _[1] + k), n.lineTo(f[0] + v, f[1] + k), n.moveTo(_[0] - v, _[1] - k), n.lineTo(f[0] - v, f[1] - k);
                                } else console.error("unsupported style:", s.style);
                            }
                        }
                        var w = n.generateTexture();
                        i.cachedImage
                            ? (i.cachedImage.texture.destroy(true), i.cachedImage.loadTexture(w))
                            : ((i.cachedImage = this.root.phaser.make.image(0, 0, w)), i.group ? i.group.addChild(i.cachedImage) : this.connectionsGroup.addChild(i.cachedImage));
                        var V = n.getBounds();
                        n.destroy();
                        var C = e.worldSpaceTileCenter();
                        i.cachedImage.position.setTo(C[0] + V.x, C[1] + V.y);
                    }
                }),
                t
            );
        })(GameSystem),
        FlashOnDamageSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [FlashOnDamageComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FlashOnDamageSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.FlashOnDamageComponent,
                        a = t.HealthComponent,
                        o = this.root.time.now;
                    i.lastHealthRecorded > a.health && (i.lastFlashTime = o), (i.lastHealthRecorded = a.health);
                    var n = (o - i.lastFlashTime) / 200;
                    n = Math.max(0, Math.min(1, n));
                    var r = Math.floor(255 * n),
                        s = 16711680 | (r << 8) | r;
                    e.mainSprite.tint = s;
                }),
                (t.prototype.update = function () {
                    this.root.settings.enableFancyZombies && e.prototype.update.call(this);
                }),
                t
            );
        })(GameSystem),
        StorageVisualizerSystem = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [StorageVisualizerComponent], updateOutOfScreen: false }));
                return (a.spriteCache = {}), (a.spriteCacheSize = 0), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "StorageVisualizerSystem";
                        },
                    },
                ]),
                (t.prototype.checkCacheSize = function () {
                    this.spriteCacheSize > MAX_SPRITE_CACHE_SIZE && (console.warn("Sprite cache size exceeded", MAX_SPRITE_CACHE_SIZE, "entries, resetting"), (this.spriteCache = []), (this.spriteCacheSize = 0));
                }),
                (t.prototype.drawOverlaySprite = function (e, t, i, a) {
                    var o = e + ";" + t + ";" + i + ";" + (a ? "1" : "0");
                    if (this.spriteCache[o]) return this.spriteCache[o];
                    this.checkCacheSize(), Config.logOverlayRedraws && console.log("[RENDER] Generating storage overlay for", o, "cache size=", this.spriteCacheSize);
                    var n = this.root.phaser.make.graphics(Config.tileSize / 2, Config.tileSize / 2),
                        r = t / i,
                        s = Math.radians(-90.001),
                        l = Math.radians(360 * r - 90);
                    n.clear(), a ? (n.lineStyle(2, Config.colors.healing, 1), n.arc(0, 0, e, s, l, false)) : (n.lineStyle(3, 3355443, 1), n.arc(0, 0, e - 5, s, l, true), n.lineStyle(3, 16777215, 0.4), n.arc(0, 0, e - 5, s, l, false));
                    var u = Config.tileSize / 2;
                    n.beginFill(16777215, 0.001), n.lineStyle(), n.drawRect(-u, -u, 2 * u, 2 * u);
                    var c = n.generateTexture();
                    return (this.spriteCache[o] = c), (this.spriteCacheSize += 1), c;
                }),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.StorageVisualizerComponent,
                        o = t.StorageComponent,
                        n = a.resourceClass.name,
                        r = o.getResourceCount(n),
                        s = Math.max(1, o.getResourceLimit(n)),
                        l = a.divisor,
                        u = a.radius,
                        c = a.inverse,
                        d = createOrGetEntityAttachment(e, "storageVisualizer", function () {
                            var e = i.root.phaser.make.image(Config.tileSize / 2, Config.tileSize / 2);
                            return e.anchor.setTo(0.5, 0.5), (e.cachedData = {}), e;
                        }),
                        h = { amount: r, maxAmount: s, divisor: l, inverse: c, radius: u };
                    (d.cachedData.amount === h.amount && d.cachedData.maxAmount === h.maxAmount && d.cachedData.divisor === h.divisor && d.cachedData.radius === h.radius && d.cachedData.inverse === h.inverse) ||
                        ((d.cachedData = h), d.loadTexture(this.drawOverlaySprite(u, Math.floor(r / l), Math.floor(s / l), c)));
                }),
                t
            );
        })(GameSystem),
        VisualizeMissingResourcesSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [VisualizeMissingResourcesComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "VisualizeMissingResourcesSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.VisualizeMissingResourcesComponent,
                        o = t.StorageComponent,
                        n = a.resourceIdsAndAmount,
                        r = o.getMissingResourcesForRecipe(n);
                    r.sort();
                    var s = this.root.time.now / 1e3;
                    if (0 === r.length) return (a.lastSuccessTime = s), void hideEntityAttachment(e, "missingResources");
                    if (s - a.lastSuccessTime < a.minTimeSeconds) hideEntityAttachment(e, "missingResources");
                    else {
                        var l = createOrGetEntityAttachment(e, "missingResources", function () {
                            var e = i.root.phaser.make.group();
                            return (e.displaysResources = []), (e.alpha = 0.5), i.root.animations.animate(e).to({ alpha: 1 }, 700).yojo(), e;
                        });
                        arraysAreEqual(r, l.displaysResources) || ((l.displaysResources = r), Config.logOverlayRedraws && console.log("[RENDER] Redrawing missing resources"), clearGroup(l), this.drawMissingResourcesToGroup(r, l));
                    }
                }),
                (t.prototype.drawMissingResourcesToGroup = function (e, t) {
                    var i = this,
                        a = this.root.phaser.make.graphics();
                    a.beginFill(15658734), t.addChild(a);
                    var o = -90,
                        n = Config.tileSize / 2;
                    e.forEach(function (e) {
                        var r = Math.radians(o),
                            s = Math.cos(r) * n + Config.tileSize / 2,
                            l = Math.sin(r) * n + Config.tileSize / 2;
                        a.drawCircle(s, l, 21);
                        var u = BuildingRegistry.mapResourceToPreviewSprite(e),
                            c = i.root.phaser.make.image(s, l, "atlas", u);
                        (c.width = 12), (c.height = 12), c.anchor.setTo(0.5, 0.5), (c.tint = 3355443), t.addChild(c), (o += 50);
                    });
                }),
                t
            );
        })(GameSystem),
        DetectKillSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [HealthComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DetectKillSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    if (t.HealthComponent.health <= 0 && e.alive) {
                        var i = e.getComponent(GrantOnKillComponent);
                        i && i.hitByProjectile && this.root.stats.grant(i.resources), this.root.entityMgr.destroyEntity(e);
                        var a = e.getComponent(SpawnGraveOnDeathComponent);
                        a && this.spawnGrave(e, a);
                    }
                }),
                (t.prototype.spawnGrave = function (e, t) {
                    var i = this,
                        a = e.worldSpaceTileCenter();
                    if ((t.showOnMinimap && this.root.gui.uiMinimap.showNotificationAt(a), this.root.settings.enableParticles))
                        if (t.sprite) {
                            var o,
                                n = this.root.phaser.make.image(0, 0, "atlas", t.sprite);
                            this.root.groups.destroyedBuildingsGroup.add(n),
                                (n.alpha = t.startAlpha),
                                (o = n.position).setTo.apply(o, _toConsumableArray(a)),
                                n.anchor.setTo(0.5),
                                (n.tint = 16742263),
                                this.root.animations
                                    .animate(n)
                                    .to({ alpha: t.destinationAlpha }, 1e3 * t.fadeDuration)
                                    .onDone(function () {
                                        i.root.groups.destroyedBuildingsGroup.removeChild(n);
                                    });
                        } else {
                            var r = this.root.particles.spawnNew(a[0] + t.randomFactor * randomInt(-8, 8), a[1] + t.randomFactor * randomInt(-8, 8), t.particleClass);
                            (r.alpha = t.startAlpha),
                                this.root.animations
                                    .animate(r)
                                    .to({ alpha: t.destinationAlpha }, 1e3 * t.fadeDuration)
                                    .onDone(function () {
                                        i.root.particles.kill(r);
                                    });
                        }
                }),
                t
            );
        })(GameSystem),
        BurnsOnDaySystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [BurnsOnDayComponent] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BurnsOnDaySystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.HealthComponent,
                        o = t.BurnsOnDayComponent;
                    if (this.root.daytime.isDay()) {
                        for (var n = this.root.time.now; o.looseHealthTimer.takeTick(n);) {
                            var r = (o.looseHealthPercent / 100) * a.maxHealth;
                            e.takeDamage(r);
                        }
                        if (this.root.settings.enableParticles) {
                            var s = createOrGetEntityAttachment(e, "burnIndicator", function () {
                                var e = i.root.phaser.make.image(Config.tileSize / 2, 0, "atlas", "burn-indicator.png");
                                return e.anchor.setTo(0.5, 0.5), (e.width = 25), (e.height = 25), e;
                            }),
                                l = o.looseHealthTimer.getIntervalMs(),
                                u = (n % l) / l;
                            (s.y = (1 - u) * Config.tileSize * 0.3 + 5), (s.alpha = 1 - u);
                        } else hideEntityAttachment(e, "burnIndicator");
                    } else hideEntityAttachment(e, "burnIndicator");
                }),
                t
            );
        })(GameSystem),
        CullingSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [], updateOutOfScreen: true }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "CullingSystem";
                        },
                    },
                ]),
                (t.prototype.update = function () {
                    for (var e = Config.tileSize, t = 0, i = this.root.entityMgr.entities, a = this.root.culling, o = 0, n = i.length; o < n; ++o) {
                        var r = i[o],
                            s = r.position;
                        a.isRectInView(s.x, s.y, e, e) ? ((r.renderable = true), (r.visible = true), (t += 1)) : ((r.renderable = false), (r.visible = false));
                    }
                    this.root.perfStats.setRenderedEntities(t);
                }),
                t
            );
        })(GameSystem),
        FlipToMovementDirectionSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [FlipToMovementDirectionComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FlipToMovementDirectionSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = t.FlipToMovementDirectionComponent,
                        a = e.x,
                        o = e.x - i.lastX;
                    if (!(Math.abs(o) < 0.01)) {
                        i.lastX = a;
                        var n = o < 0;
                        (e.mainSprite.scale.x = n ? -1 : 1), (e.mainSprite.scale.x *= this.root.phaser.resolution);
                    }
                }),
                t
            );
        })(GameSystem),
        WorkerUsageUI = (function () {
            function e(t, i, a) {
                _classCallCheck(this, e), (this.name = i), (this.root = t), (this.dataPoints = []), (this.dataProvider = a), this.init(), this.update(), this.root.signals.consistentGameUpdate.add(this.update, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "WorkerUsageUI";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    (this.container = document.createElement("div")),
                        (this.container.className = "worker_usage_canvas"),
                        document.body.appendChild(this.container),
                        (this.text = document.createElement("span")),
                        this.container.appendChild(this.text),
                        (this.canvas = document.createElement("canvas")),
                        (this.canvas.width = 150),
                        (this.canvas.height = 40),
                        this.container.appendChild(this.canvas),
                        (this.context = this.canvas.getContext("2d"));
                }),
                (e.prototype.update = function () {
                    var e = this;
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    var t = this.dataProvider();
                    this.dataPoints.push(t);
                    this.dataPoints.length > this.canvas.width && this.dataPoints.shift(), (this.text.innerText = this.name + ": " + t), (this.context.strokeStyle = "white"), this.context.beginPath();
                    var i = 999;
                    this.dataPoints.forEach(function (t, a) {
                        var o = i - t,
                            n = (1 - Math.min(0.99, o / 2)) * e.canvas.height;
                        0 === a && e.context.moveTo(0, n), e.context.lineTo(a, n), (i = t);
                    }),
                        this.context.stroke();
                }),
                e
            );
        })(),
        DedicatedWorker = (function () {
            function e(t) {
                var i = this;
                _classCallCheck(this, e),
                    (this.jobIdCounter = 0),
                    (this.pendingJobRequests = {}),
                    (this.pendingCount = 0),
                    (this.jobKeys = {}),
                    (this.worker = new Worker(t)),
                    this.worker.addEventListener(
                        "message",
                        function (e) {
                            return i.handleWorkerMessage(e);
                        },
                        false
                    ),
                    this.worker.postMessage({ cmd: "setVerboseLevel", payload: WEBWORKER_VERBOSE }),
                    (this.onMessage = new _phaserCe.Signal());
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DedicatedWorker";
                        },
                    },
                ]),
                (e.prototype.terminate = function () {
                    this.worker.terminate(), (this.worker = null), (this.jobKeys = {}), (this.pendingJobRequests = {}), (this.jobIdCounter = 0);
                }),
                (e.prototype.handleWorkerMessage = function (e) {
                    var t = e.data,
                        i = t.sourceCommand,
                        a = t.jobId;
                    WEBWORKER_VERBOSE && console.log("[UPC] Worker finished job:", a, t), this.cancelById(a), this.onMessage.dispatch(i, t.result);
                }),
                (e.prototype.queue = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    this.jobIdCounter += 1;
                    var a = this.jobIdCounter,
                        o = { cmd: e, payload: i, jobId: a };
                    this.worker.postMessage(o),
                        (this.pendingJobRequests[this.jobIdCounter] = { key: t }),
                        (this.pendingCount += 1),
                        null !== t && ((this.jobKeys[t] = a), WEBWORKER_VERBOSE && console.log("[UPC] Job key marked as running:", t, "under job id", a)),
                        WEBWORKER_VERBOSE && console.log("[UPC] Worker job queued:", "id=", this.jobIdCounter, "key=", t, o);
                }),
                (e.prototype.cancelByKey = function (e) {
                    var t = this.jobKeys[e];
                    t && this.cancelById(t);
                }),
                (e.prototype.cancelById = function (e) {
                    var t = this.pendingJobRequests[e];
                    t
                        ? (null !== t && (WEBWORKER_VERBOSE && console.log("[UPC] Job key got done/canceled:", t.key), Reflect.deleteProperty(this.jobKeys, t.key)),
                            Reflect.deleteProperty(this.pendingJobRequests, e),
                            (this.pendingCount -= 1))
                        : WEBWORKER_VERBOSE && console.warn("[UPC] job id no longer requested, can not cancel");
                }),
                (e.prototype.isJobTypeAlreadySeen = function (e) {
                    return null != this.jobKeys[e];
                }),
                (e.prototype.getPendingCount = function () {
                    return this.pendingCount;
                }),
                (e.prototype.cancelAll = function () {
                    (this.pendingJobRequests = {}), (this.pendingCount = 0), (this.jobKeys = {}), this.queue("cancelAll");
                }),
                e
            );
        })(),
        WorkerPool = (function () {
            function e(t, i, a) {
                var o = this,
                    n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                _classCallCheck(this, e);
                var r = 1;
                navigator.hardwareConcurrency && (r = Math.max(1, navigator.hardwareConcurrency - 2)),
                    n && (r = n),
                    WEBWORKER_VERBOSE && (r = 1),
                    console.log("[POOL] Using", r, "webworker threads"),
                    (this.compiledWorker = this.compileWorker(a)),
                    (this.threads = r),
                    (this.name = i),
                    (this.onMessage = new _phaserCe.Signal()),
                    (this.workers = []),
                    this.refresh(),
                    Config.displayWorkerUsage &&
                    (this.visualizer = new WorkerUsageUI(t, i, function () {
                        return o.getBusyWorkerCount();
                    }));
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "WorkerPool";
                        },
                    },
                ]),
                (e.prototype.compileWorker = function (e) {
                    var t = null;
                    try {
                        t = new Blob([e], { type: "application/javascript" });
                    } catch (i) {
                        (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder), (t = new window.BlobBuilder()).append(e), (t = t.getBlob());
                    }
                    return URL.createObjectURL(t);
                }),
                (e.prototype.cancelAllJobs = function () {
                    this.workers.forEach(function (e) {
                        return e.cancelAll();
                    });
                }),
                (e.prototype.cancelByKey = function (e) {
                    this.workers.forEach(function (t) {
                        return t.cancelByKey(e);
                    });
                }),
                (e.prototype.getBusyWorkerCount = function () {
                    var e = 0;
                    return (
                        this.workers.forEach(function (t) {
                            e += t.getPendingCount();
                        }),
                        e
                    );
                }),
                (e.prototype.queue = function (e) {
                    for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, a = null, o = 0; o < this.workers.length; ++o) {
                        var n = this.workers[o];
                        if (((!a || n.getPendingCount() < a.getPendingCount()) && (a = n), null !== t && n.isJobTypeAlreadySeen(t)))
                            return void (WEBWORKER_VERBOSE && console.log("[WEBWORKER] Not queuing job", t, "because its already running as", n.jobKeys[t]));
                    }
                    a.queue(e, t, i);
                }),
                (e.prototype.queueShared = function () {
                    for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    this.workers.forEach(function (e) {
                        return e.queue.apply(e, t);
                    });
                }),
                (e.prototype.refresh = function () {
                    console.log("[UPC] Refreshing workers"),
                        this.workers.forEach(function (e) {
                            return e.terminate();
                        }),
                        (this.workers = []);
                    for (var e = 0; e < this.threads; ++e) {
                        var t = new DedicatedWorker(this.compiledWorker);
                        this.workers.push(t), t.onMessage.add(this.onMessage.dispatch, this.onMessage);
                    }
                }),
                e
            );
        })(),
        UpdatePossibleConsumersSystem = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [EmitterComponent] }));
                return (
                    (a.nodeNetDirty = true),
                    (a.nodeNet = null),
                    a.root.signals.mapLayoutChanged.add(a.onMapChanged, a),
                    a.root.signals.gameReset.add(a.onGameReset, a),
                    a.root.signals.gameReload.add(a.markDirty, a),
                    a.root.signals.buildingUpgraded.add(a.onBuildingUpgraded, a),
                    a.root.signals.skillLeveledUp.add(a.checkForSkillLevelUp, a),
                    (a.visualizer = a.root.phaser.make.graphics(0, 0)),
                    a.root.groups.nodeGraphGroup.add(a.visualizer),
                    (a.workers = new WorkerPool(a.root, "Update Consumers", WorkerImpl)),
                    a.workers.onMessage.add(a.handleWorkerResponse, a),
                    a
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UpdatePossibleConsumersSystem";
                        },
                    },
                ]),
                (t.prototype.onGameReset = function () {
                    (this.nodeNet = null), this.markDirty(), this.workers.refresh();
                }),
                (t.prototype.checkForSkillLevelUp = function (e) {
                    if ("transporterFeatureGlobal" === e) {
                        this.markDirty(), this.workers.refresh();
                        for (var t = this.root.entityMgr.getAllEntitiesWithComponent(TransporterComponent).slice(), i = 0; i < t.length; ++i) this.root.logic.sellBuilding(t[i]);
                    }
                }),
                (t.prototype.hasGlobalTransport = function () {
                    return this.root.stats.isSkillUnlocked("transporterFeatureGlobal");
                }),
                (t.prototype.handleWorkerResponse = function (e, t) {
                    if (!this.hasGlobalTransport())
                        if ("computeEntity" === e) {
                            var i = t.hash,
                                a = t.result,
                                o = JSON.stringify(a).length;
                            WEBWORKER_VERBOSE && console.log("[UPC] Recieved", (o / 1e3).toFixed(2), "KB from worker");
                            for (var n = [], r = 0; r < a.length; ++r) {
                                var s = a[r],
                                    l = this.hashToEntity(s.entity);
                                if (l) {
                                    for (var u = false, c = [], d = 0; d < s.stops.length; ++d) {
                                        var h = this.hashToEntity(s.stops[d]);
                                        if (!h) {
                                            u = true;
                                            break;
                                        }
                                        c.push(h);
                                    }
                                    u || n.push({ entity: l, stops: c });
                                }
                            }
                            var p = this.hashToEntity(i);
                            if (!p) return;
                            WEBWORKER_VERBOSE && console.log("[UPC] Webworker computed entity paths:", p, n);
                            var g = p.getComponentById(EmitterCompName);
                            if (!g) return void console.warn("[UPC] Computed entity did not die, but lost its emitter component!");
                            (g.precomputedConsumersDirty = false), (g.precomputedPossibleConsumers = n), this.root.signals.consumerNetworkRecomputed.dispatch();
                        } else if ("onNewNodeNet" === e) WEBWORKER_VERBOSE && console.log("[UPC] Webworker signaled ready to run computations");
                        else if ("cancelAll" !== e) throw new Error("unkown cmd: " + e);
                }),
                (t.prototype.onMapChanged = function (e, t, i, a) {
                    if (this.root.gameStarted)
                        if (this.hasGlobalTransport())
                            a === TILE_CLEARED
                                ? i.hasComponentId(ConsumerCompName) && this.markDirty(i.getComponentById(ConsumerCompName).consumeResourceIds)
                                : a === TILE_FILLED && i.hasComponentId(ConsumerCompName) && this.markDirty(i.getComponentById(ConsumerCompName).consumeResourceIds);
                        else if (a === TILE_CLEARED) {
                            if (i.hasComponentId(TransporterCompName)) return void this.markDirty();
                            i.hasComponentId(EmitterCompName) && (this.nodeNetDirty = true), i.hasComponentId(ConsumerCompName) && (this.nodeNetDirty = true);
                        } else {
                            if (a !== TILE_FILLED) throw new Error("unkown reason");
                            if (i.hasComponentId(TransporterCompName)) return void this.markDirty();
                            i.hasComponentId(ConsumerCompName) && this.markDirty(i.getComponentById(ConsumerCompName).consumeResourceIds), i.hasComponentId(EmitterCompName) && (this.nodeNetDirty = true);
                        }
                }),
                (t.prototype.onBuildingUpgraded = function (e) {
                    this.hasGlobalTransport() || (e.hasComponentId(TransporterCompName) && this.markDirty());
                }),
                (t.prototype.markDirty = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    this.nodeNetDirty = true;
                    for (var t = this.root.entityMgr.getAllEntitiesWithComponent(EmitterComponent), i = 0, a = t.length; i < a; ++i) {
                        var o = t[i].getComponentById(EmitterCompName);
                        o.precomputeConsumers && (!e || e.indexOf(o.resourceClass.name) >= 0) && (o.precomputedConsumersDirty = true);
                    }
                }),
                (t.prototype.transportIsPossible = function (e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                    if (e === t) return false;
                    var a = e.getComponentById(EmitterCompName),
                        o = t.getComponentById(ConsumerCompName),
                        n = e.tileDistanceTo(t);
                    if (a && t.hasComponentId(TransporterCompName) && (!i || a.resourceClass.name === i) && n <= a.spawnMaxRadius) return true;
                    if (a && o && o.consumesResources(a.resourceClass.name) && n <= a.spawnMaxRadius) return true;
                    var r = e.getComponentById(TransporterCompName);
                    return !!(r && o && (!i || o.consumesResources(i)) && n <= Config.radius.transporter) || !!(r && t.hasComponentId(TransporterCompName) && n <= Config.radius.transporter);
                }),
                (t.prototype.isEndConsumerFor = function (e, t) {
                    if (e === t) return false;
                    var i = t.getComponentById(ConsumerCompName);
                    if (!i) return false;
                    var a = e.getComponentById(EmitterCompName).resourceClass.name;
                    return !!i.consumesResources(a);
                }),
                (t.prototype.hashToEntity = function (e) {
                    var t = e.codePointAt(0) - CP_BIAS,
                        i = t % CP_MULTIPLIER,
                        a = Math.floor(t / CP_MULTIPLIER);
                    return this.root.map.getTileContent(i, a);
                }),
                (t.prototype.determineTransportSpeed = function (e) {
                    return e.hasComponentId(TransporterCompName) ? e.getComponentById(TransporterCompName).speed : Config.resourceSpeedTilesPerSecond;
                }),
                (t.prototype.determineTransportSpeedBetween = function (e, t) {
                    var i = this.determineTransportSpeed(e),
                        a = this.determineTransportSpeed(t);
                    return e.hasComponentId(TransporterCompName) && (t.hasComponentId(ConsumerCompName) || t.hasComponentId(EmitterCompName))
                        ? i
                        : t.hasComponentId(TransporterCompName) && (e.hasComponentId(ConsumerCompName) || e.hasComponentId(EmitterCompName))
                            ? a
                            : (i + a) / 2;
                }),
                (t.prototype.addNodeToNet = function (e, t) {
                    for (
                        var i = this,
                        a = this.root.map.getUsedTilesArround({
                            tileX: t.getTileX(),
                            tileY: t.getTileY(),
                            radius: Config.radius.transporter,
                            condition: function (e) {
                                return i.transportIsPossible(t, e);
                            },
                        }),
                        o = entityToHash(t),
                        n = newEmptyMap(),
                        r = 0;
                        r < a.length;
                        ++r
                    ) {
                        var s,
                            l,
                            u = a[r],
                            c = u.entity,
                            d = u.distanceSquare,
                            h = t.worldSpaceTileCenter(),
                            p = c.worldSpaceTileCenter(),
                            g = Math.sqrt(d),
                            m = this.determineTransportSpeedBetween(t, c),
                            _ = g / Math.max(0.001, m);
                        if (Config.visualizeNodeNet)
                            (s = this.visualizer).moveTo.apply(s, _toConsumableArray(h)),
                                (l = this.visualizer).lineTo.apply(l, _toConsumableArray(p)),
                                this.addDebugText((h[0] + p[0]) / 2, (h[1] + p[1]) / 2, "W: " + roundDecimals(_, 1));
                        n[entityToHash(c)] = _;
                    }
                    e[o] = n;
                }),
                (t.prototype.addDebugText = function (e, t, i) {
                    var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "#99F",
                        o = this.root.phaser.make.text(0, 0, i, { font: "10px Roboto Mono", fill: a, boundsAlignH: "center", align: "center" });
                    o.setTextBounds(e - 30, t, 60, 20);
                    var n = makePanelBackground(this.root.phaser, 60, 18, 0, 0.8);
                    n.position.setTo(e - 30, t - 3), this.visualizer.addChild(n), this.visualizer.addChild(o);
                }),
                (t.prototype.computeNodeNet = function () {
                    if (!this.hasGlobalTransport()) {
                        0, this.visualizer.clear(), clearGroup(this.visualizer), this.visualizer.lineStyle(3, 7829503);
                        for (var e = newEmptyMap(), t = newEmptyMap(), i = this.root.entityMgr.getAllEntitiesWithComponent(EmitterComponent), a = 0; a < i.length; ++a) {
                            var o = i[a];
                            o.getComponentById(EmitterCompName).precomputeConsumers && (this.addNodeToNet(e, o), (t[entityToHash(o)] = this.serializeEntity(o)));
                        }
                        for (var n = this.root.entityMgr.getAllEntitiesWithComponent(TransporterComponent), r = 0; r < n.length; ++r) {
                            var s = n[r];
                            this.addNodeToNet(e, s), (t[entityToHash(s)] = this.serializeEntity(s));
                        }
                        for (var l = this.root.entityMgr.getAllEntitiesWithComponent(ConsumerComponent), u = 0; u < l.length; ++u) {
                            var c = l[u];
                            t[entityToHash(c)] = this.serializeEntity(c);
                        }
                        (this.nodeNet = e), this.makeNetBidirectional(), this.workers.cancelAllJobs();
                        var d = { nodeNet: this.serializeNodeNet(), entities: this.serializeEntities(t) };
                        WEBWORKER_VERBOSE &&
                            (console.log("[UPC] Transferring", (JSON.stringify(d).length / 1e3).toFixed(2), "KB to worker"),
                                console.log("[UPC] Entities", (JSON.stringify(d.entities).length / 1e3).toFixed(2), "KB"),
                                console.log("[UPC] Nodenet:", (d.nodeNet.length / 1e3).toFixed(2), "KB"),
                                console.log("[UPC] VS:", (JSON.stringify(this.nodeNet).length / 1e3).toFixed(2), "KB"),
                                console.log(JSON.stringify(d))),
                            this.workers.queueShared("onNewNodeNet", null, d, true);
                    }
                }),
                (t.prototype.serializeFloat = function (e) {
                    return String.fromCodePoint(CP_BIAS + Math.round(100 * e));
                }),
                (t.prototype.serializeInt = function (e) {
                    return String.fromCodePoint(CP_BIAS + e);
                }),
                (t.prototype.serializeNodeNet = function () {
                    var e = [];
                    for (var t in this.nodeNet) {
                        var i = this.nodeNet[t],
                            a = [t];
                        for (var o in i) {
                            var n = Math.round(100 * i[o]);
                            a.push(o), a.push(this.serializeFloat(n));
                        }
                        e.push(a.join(""));
                    }
                    return e.join(DATA_DIVISOR);
                }),
                (t.prototype.serializeEntities = function (e) {
                    var t = [];
                    for (var i in e) t.push(i), t.push(e[i]), t.push(DATA_DIVISOR);
                    return t.join("");
                }),
                (t.prototype.serializeEntity = function (e) {
                    var t = this,
                        i = [],
                        a = e.getComponentById(TransporterCompName);
                    a && (i.push(KEY_TRANSPORTER), i.push(this.serializeFloat(a.speed)));
                    var o = e.getComponentById(ConsumerCompName);
                    if (o) {
                        i.push(KEY_CONSUMER);
                        var n = o.consumeResourceIds;
                        i.push(this.serializeInt(n.length)),
                            n.forEach(function (e) {
                                i.push(t.serializeResourceId(e));
                            });
                    }
                    var r = e.getComponentById(EmitterCompName);
                    return r && (i.push(KEY_EMITTER), i.push(this.serializeResourceId(r.resourceClass.name)), i.push(this.serializeFloat(r.spawnMaxRadius))), i.join("");
                }),
                (t.prototype.serializeResourceId = function (e) {
                    return COMPRESSED_RESOURCE_NAMES[e]
                        ? COMPRESSED_RESOURCE_NAMES[e]
                        : ((COMPRESSED_RESOURCE_NAMES[e] = this.serializeInt(NEXT_COMPRESSED_RESOURCE_ID)), (NEXT_COMPRESSED_RESOURCE_ID += 1), COMPRESSED_RESOURCE_NAMES[e]);
                }),
                (t.prototype.makeNetBidirectional = function () {
                    for (var e = Object.keys(this.nodeNet), t = 0; t < e.length; ++t) {
                        var i = e[t],
                            a = this.nodeNet[i];
                        for (var o in a) {
                            var n = a[o];
                            this.nodeNet[o]
                                ? (this.nodeNet[o][i] && this.nodeNet[o][i] !== n && console.error("DISTANCE MISMATCH: from", i, "to", o, "dA is", n, "and dB is", this.nodeNet[o][i]), (this.nodeNet[o][i] = n))
                                : ((this.nodeNet[o] = newEmptyMap()), (this.nodeNet[o][i] = n));
                        }
                    }
                }),
                (t.prototype.computeEntityGlobal = function (e, t) {
                    for (var i = t.resourceClass.name, a = this.root.entityMgr.getAllEntitiesWithComponent(ConsumerComponent), o = [], n = 0; n < a.length; ++n) {
                        var r = a[n];
                        r.getComponentById(ConsumerCompName).consumesResources(i) && o.push({ entity: r, stops: null });
                    }
                    (t.precomputedConsumersDirty = false), (t.precomputedPossibleConsumers = o);
                }),
                (t.prototype.update = function () {
                    this.nodeNetDirty && (this.hasGlobalTransport() || this.computeNodeNet(), (this.nodeNetDirty = false));
                    for (var e = this.root.entityMgr.getAllEntitiesWithComponent(EmitterComponent), t = 0; t < e.length; ++t) {
                        var i = e[t],
                            a = i.getComponentById(EmitterCompName);
                        a.precomputeConsumers &&
                            a.precomputedConsumersDirty &&
                            (this.hasGlobalTransport() ? this.computeEntityGlobal(i, a) : this.workers.queue("computeEntity", i.uniqueID.toString(), { hash: entityToHash(i), uid: i.uniqueID }));
                    }
                }),
                t
            );
        })(GameSystem),
        DecorativeParticlesSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [DecorativeParticlesComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DecorativeParticlesSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.DecorativeParticlesComponent;
                    if (this.root.time.averageFPS() < 30) a.timer.resetTo(this.root.time.nowConsistent);
                    else if (this.root.zoom.currentZoomLevel > Config.maxZoomLevelForDecorativeParticles) a.timer.resetTo(this.root.time.nowConsistent);
                    else if (this.root.settings.enableParticles)
                        for (
                            var o = e.worldSpaceTileCenter(),
                            n = function () {
                                var e = i.root.particles.spawnNew(o[0], o[1], a.particleClass),
                                    t = randomPointInCircle(a.radius * Config.tileSize),
                                    n = _slicedToArray(t, 2),
                                    r = n[0],
                                    s = n[1];
                                (e.alpha = 0.5 + 0.5 * Math.random()),
                                    (e.angle = 360 * Math.random()),
                                    e.scale.setTo(0.2 + 0.5 * Math.random()),
                                    i.root.animations
                                        .animate(e)
                                        .to({ x: r + o[0], y: s + o[1], alpha: 0, angle: 360 * Math.random() }, a.lifeSpanMs)
                                        .playWhilePaused()
                                        .onDone(function () {
                                            i.root.particles.kill(e);
                                        });
                            };
                            a.timer.takeTick(this.root.time.nowConsistent);

                        )
                            n();
                    else a.timer.resetTo(this.root.time.nowConsistent);
                }),
                t
            );
        })(GameSystem),
        GoldEmitterComponent = (function (e) {
            function t(i) {
                var a = i.emitPerSecond,
                    o = i.maxRadius,
                    n = i.maxLifetimeMs,
                    r = void 0 === n ? 3e3 : n;
                _classCallCheck(this, t);
                var s = _possibleConstructorReturn(this, e.call(this));
                return checkParamsSet(a, o), (s.maxRadius = o), (s.maxLifetimeMs = r), (s.timer = s.makeTimerFromTicksPerSecond(a)), s;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldEmitterComponent";
                        },
                    },
                ]),
                (t.prototype.debugStr = function () {
                    return "Emit collectable gold up to " + this.timer.getTicksPerSecond() + " times / second, up to " + this.maxRadius + " tiles";
                }),
                t
            );
        })(Component),
        MetaGoldParticle = (function (e) {
            function t() {
                _classCallCheck(this, t);
                var i = _possibleConstructorReturn(this, e.call(this, "particle-gold.png"));
                return (i.width = 20), (i.height = 20), (i.tint = pastellizeColor(Config.colors.gold, 0.5)), (i.renderMode = PARTICLE_RENDER_BATCH), i;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MetaGoldParticle";
                        },
                    },
                ]),
                (t.prototype.initTexture = function () { }),
                (t.prototype.makeParticle = function (e) {
                    var t = new GoldParticle(e);
                    return t.anchor.setTo(0.5), t;
                }),
                t
            );
        })(MetaParticle),
        GoldParticle = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, 0, 0, "atlas", "collectableGem.png"));
                return (a.phaser = i), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldParticle";
                        },
                    },
                ]),
                (t.prototype.onSpawned = function () {
                    (this.flyingToMouse = false), (this.speedMultiplier = 1);
                }),
                (t.prototype._renderCanvas = function (t) {
                    if ((e.prototype._renderCanvas.call(this, t), this.alive && !(Config.gameTimeSpeedUpFactor < 1) && !(Config.gameTimeSpeedUpFactor < 0.01))) {
                        var i = this.phaser.customZoomLevel,
                            a = getWorldSpaceMouse(this.phaser),
                            o = distanceEuclidian(a, [this.x, this.y]);
                        if (!this.flyingToMouse) {
                            if (!(o < FLY_DISTANCE_PIXELS)) return;
                            this.flyingToMouse = true;
                        }
                        var n = a[0] - this.x,
                            r = a[1] - this.y;
                        this.speedMultiplier *= 1.08;
                        var s = this.phaser.rootRecursiveRef.time.physicsElapsed / o;
                        (s *= FLY_SPEED_PIXELS_PER_SECOND * i * this.speedMultiplier),
                            (s = Math.min(1, s)),
                            (this.x += n * s),
                            (this.y += r * s),
                            distanceEuclidian(a, [this.x, this.y]) < MIN_DISTANCE_GOAL_PIXELS * i && (this.phaser.rootRecursiveRef.stats.grant({ gems: 1 }), this.phaser.rootRecursiveRef.sound.playCollectGemSound(), this.kill());
                    }
                }),
                t
            );
        })(FastImage),
        GoldEmitterSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [GoldEmitterComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldEmitterSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.GoldEmitterComponent,
                        o = e.worldSpaceTileCenter();
                    if (!this.root.map.findClosestEntityOfClass({ tileX: e.getTileX(), tileY: e.getTileY(), radius: Config.radius.goldOre, classType: GoldMineBuilding }))
                        for (
                            var n = function () {
                                var e = i.root.particles.spawnNew(o[0], o[1], MetaGoldParticle),
                                    t = randomPointInCircle(a.maxRadius * Config.tileSize),
                                    n = _slicedToArray(t, 2),
                                    r = n[0],
                                    s = n[1];
                                (e.angle = 360 * Math.random()),
                                    e.position.setTo(o[0] + r, o[1] + s),
                                    (e.alpha = 0.5),
                                    (e.width = 8),
                                    (e.height = 8),
                                    e.onSpawned(),
                                    i.root.animations
                                        .animate(e)
                                        .to({ alpha: 1, width: 20, height: 20 }, 500)
                                        .onDone(function () {
                                            i.root.animations
                                                .animate(e)
                                                .to({ alpha: 0 }, a.maxLifetimeMs)
                                                .onDone(function () {
                                                    i.root.particles.kill(e);
                                                });
                                        });
                            };
                            a.timer.takeTick(this.root.time.now);

                        )
                            n();
                }),
                (t.prototype.update = function () {
                    this.root.logic.playerHasPlacedBase() && (Config.gameTimeSpeedUpFactor < 0.01 || e.prototype.update.call(this));
                }),
                t
            );
        })(GameSystem);

        class ExplodesOnHitComponent extends Component {
            constructor({ radiusTiles = 1.5, damage = 10000, minimumDistance = 0.9 } = {}) {
                super();
                this.radiusTiles = radiusTiles;
                this.damage = damage;
                this.minimumDistance = minimumDistance;
            }
        
            static get name() {
                return "ExplodesOnHitComponent";
            }
        }
        
        class ExplodesOnHitSystem extends GameSystem {
            constructor(config) {
                super(config, { necessaryComponents: [ExplodesOnHitComponent] });
            }
        
            static get name() {
                return "ExplodesOnHitSystem";
            }
        
            explodeEntity(entity, component) {
                entity.getComponent(HealthComponent).health = 0;
                const tileCenter = entity.worldSpaceTileCenter();
                this.damageNearbyBuildings(entity, component.radiusTiles, component.damage);
                this.spawnExplosion(tileCenter, component.radiusTiles);
            }
        
            damageNearbyBuildings(entity, radius, damage) {
                const usedTiles = this.root.map.getUsedTilesArround({
                    tileX: entity.getTileX(),
                    tileY: entity.getTileY(),
                    radius: radius + 1,
                    condition: (tile) =>
                        tile.hasComponent(BuildingComponent) && !tile.hasComponent(InvisibleComponent)
                });
        
                for (const tile of usedTiles) {
                    const buildingEntity = tile.entity;
                    if (buildingEntity.tileDistanceToNonSnapped(entity) <= radius) {
                        buildingEntity.takeDamage(damage);
                    }
                }
            }
        
            spawnExplosion(center, radius) {
                const size = radius * Config.tileSize;
                const particle = this.root.particles.spawnNew(center[0], center[1], MetaEnemyExplosionParticle);
                particle.width = 2 * size;
                particle.height = 2 * size;
                particle.alpha = 0.1;

                this.root.animations
                    .animate(particle)
                    .to({ alpha: 0, width: 10, height: 10 }, 500)
                    .onDone(() => {
                        this.root.particles.kill(particle);
                    });

                this.root.sound.playCreeperExplosion(...center);
            }
        
            processEntity(entity, component) {
                const { ExplodesOnHitComponent } = component;
                const usedTiles = this.root.map.getUsedTilesArround({
                    tileX: entity.getTileX(),
                    tileY: entity.getTileY(),
                    radius: ExplodesOnHitComponent.minimumDistance + 1,
                    condition: (tile) =>
                        tile.hasComponent(BuildingComponent) && !tile.hasComponent(InvisibleComponent)
                });
        
                let shouldExplode = false;
        
                for (const tile of usedTiles) {
                    if (tile.entity.tileDistanceToNonSnapped(entity) <= ExplodesOnHitComponent.minimumDistance) {
                        shouldExplode = true;
                        break;
                    }
                }
        
                if (shouldExplode) {
                    this.explodeEntity(entity, ExplodesOnHitComponent);
                }
            }
        }
        
        const BuildingAnimationsSystem = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [] }));
                return i.signals.buildingPlaced.add(a.onBuildingPlaced, a), i.signals.buildingUpgraded.add(a.onBuildingUpgraded, a), (a.spawnList = []), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingAnimationsSystem";
                        },
                    },
                ]),
                (t.prototype.onBuildingPlaced = function (e) {
                    this.queueToSpawnList(e);
                }),
                (t.prototype.onBuildingUpgraded = function (e) {
                    this.queueToSpawnList(e);
                }),
                (t.prototype.onGameReset = function () {
                    this.spawnList = [];
                }),
                (t.prototype.queueToSpawnList = function (e) {
                    e.queuedForLevelUpAnimation || (this.root.settings.enableParticles && (Config.spawnDefaultBuildings || ((e.queuedForLevelUpAnimation = true), this.spawnList.push(e))));
                }),
                (t.prototype.spawnParticles = function (e) {
                    if (((e.queuedForLevelUpAnimation = false), !(this.root.time.averageFPS() < 25))) {
                        var t = e.getLevel(),
                            i = 30,
                            a = 80,
                            o = 60;
                        e.hasComponent(PlayerBaseComponent) && ((i = 120), (a = 100), (o = 60), (i = 100), (a = 150), (o = 120)),
                            makeParticleExplosion({ root: this.root, numParticles: i, minRadius: o, maxRadius: a, start: e.worldSpaceTileCenter(), particleClass: LEVEL_TO_PARTICLE[t] });
                    }
                }),
                (t.prototype.update = function () {
                    for (var e = 0, t = this.spawnList.length; e < t; ++e) this.spawnParticles(this.spawnList[e]);
                    this.spawnList = [];
                }),
                t
            );
        })(GameSystem),
        UpdateMapSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [] }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UpdateMapSystem";
                        },
                    },
                ]),
                (t.prototype.update = function () {
                    this.root.map.updateMap();
                }),
                t
            );
        })(GameSystem),
        ShootAnimationsSystem = (function (e) {
            function t(i) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [ProjectileShooterComponent], updateOutOfScreen: false }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ShootAnimationsSystem";
                        },
                    },
                ]),
                (t.prototype.processEntity = function (e, t) {
                    var i = this,
                        a = t.ProjectileShooterComponent;
                    if (this.root.settings.enableParticles && a.lastShootTime) {
                        var o = this.root.time.now - a.lastShootTime;
                        if (o <= ANIM_DURATION) {
                            var n = createOrGetEntityAttachment(e, "shootAnim", function () {
                                return i.root.phaser.make.graphics(Config.tileSize / 2, Config.tileSize / 2);
                            }),
                                r = Config.tileSize - 2 * Config.ui.buildingOuterSpace,
                                s = EASING.easeOutQuint(o / ANIM_DURATION),
                                l = r + s * Config.tileSize * 0.7,
                                u = 1 - s;
                            return n.clear(), n.lineStyle(2, Config.colors.levels[e.getLevel()], u), void n.drawCircle(0, 0, l);
                        }
                    }
                    hideEntityAttachment(e, "shootAnim");
                }),
                t
            );
        })(GameSystem),
        PhysicsSystem = (function (e) {
            function t(i) {
                _classCallCheck(this, t);
                var a = _possibleConstructorReturn(this, e.call(this, i, { necessaryComponents: [PhysicsComponent] }));
                return (a.updateTimer = Timer.makeFromIntervalMs(1e3 * PHYSICS_DELTA)), a;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PhysicsSystem";
                        },
                    },
                ]),
                (t.prototype.simulatePhysics = function (e, t, i) {
                    var a = t.PhysicsComponent;
                    (a.velocityX = 0 * a.velocityX + 1 * a.desiredVelocityX), (a.velocityY = 0 * a.velocityY + 1 * a.desiredVelocityY);
                    var o = a.velocityX * i * Config.tileSize,
                        n = a.velocityY * i * Config.tileSize,
                        r = e.getTileX(),
                        s = e.getTileY(),
                        l = this.root.map.getTileContent(r, s);
                    if (l) {
                        var u = l.getComponent(MovementDistractionComponent);
                        u && ((o *= u.slowdownFactor), (n *= u.slowdownFactor), (o += u.forceX * i * Config.tileSize), (n += u.forceY * i * Config.tileSize));
                    }
                    var c = Config.tileSize / 2,
                        d = this.root.map.findClosestDynamicEntityWorldSpace({
                            x: e.x + Config.tileSize / 2,
                            y: e.y + Config.tileSize / 2,
                            radius: c,
                            condition: function (t) {
                                return t !== e;
                            },
                        });
                    if (d) {
                        var h = vectorNormalize([e.x - d.x + 0.1 * Math.random() - 0.05, e.y - d.y + 0.1 * Math.random() - 0.05]),
                            p = Math.min(c, ZOMBIE_COLLISION_FORCE * Config.tileSize * i);
                        (o += h[0] * p), (n += h[1] * p);
                    }
                    var g = a.bodySize,
                        m = Config.tileSize / 2,
                        _ = (Config.numTilesX - 1) * Config.tileSize,
                        f = (Config.numTilesY - 1) * Config.tileSize,
                        b = 0,
                        A = 0;
                    r + 1 < Config.numTilesX && this.root.map.isTileUsed(r + 1, s, false) && (_ = (r + 1) * Config.tileSize - g - m),
                        r > 0 && this.root.map.isTileUsed(r - 1, s, false) && (b = r * Config.tileSize + g - m),
                        s + 1 < Config.numTilesY && this.root.map.isTileUsed(r, s + 1, false) && (f = (s + 1) * Config.tileSize - g - m),
                        s > 0 && this.root.map.isTileUsed(r, s - 1, false) && (A = s * Config.tileSize + g - m),
                        (e.x = Math.max(b, Math.min(_, e.x + o))),
                        (e.y = Math.max(A, Math.min(f, e.y + n))),
                        this.moveEntityOutOfBuildings(e, a);
                }),
                (t.prototype.moveEntityOutOfBuildings = function (e, t) {
                    var i,
                        a = e.getTile();
                    if ((i = this.root.map).isTileUsed.apply(i, _toConsumableArray(a).concat([false])))
                        if (t.lastTrackedFreePosition) {
                            var o;
                            (o = e.position).setTo.apply(o, _toConsumableArray(t.lastTrackedFreePosition));
                        } else {
                            var n,
                                r = (n = this.root.map).findClosestFreeTileArround.apply(n, _toConsumableArray(a).concat([true]));
                            if (!r) return void console.error("Failed to move entity out of building");
                            var s = tileToWorld.apply(void 0, _toConsumableArray(r));
                            console.log("The closest free tile was", s), (e.x = s[0]), (e.y = s[1]);
                        }
                    else t.lastTrackedFreePosition = [e.x, e.y];
                }),
                (t.prototype.update = function () {
                    for (var e = this; this.updateTimer.takeTick(this.root.time.now);)
                        this.forEachEntity(function (t, i) {
                            return e.simulatePhysics(t, i, PHYSICS_DELTA);
                        });
                }),
                t
            );
        })(GameSystem),
        GameSystemManager = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.systems = []);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameSystemManager";
                        },
                    },
                ]),
                (e.prototype.update = function () {
                    for (var e = 0, t = this.systems.length; e < t; ++e) {
                        var i = this.systems[e];
                        try {
                            i.update();
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }),
                (e.prototype.initializeDefaultSystems = function () {
                    var e = this.root;
                    this.addSystem(new CullingSystem(e)),
                        this.addSystem(new VisualizeMissingResourcesSystem(e)),
                        this.addSystem(new ProcessorSystem(e)),
                        this.addSystem(new UpdatePossibleConsumersSystem(e)),
                        this.addSystem(new EmitterSystem(e)),
                        this.addSystem(new DecorativeParticlesSystem(e)),
                        this.addSystem(new GoldEmitterSystem(e)),
                        this.addSystem(new EnemyAISystem(e)),
                        this.addSystem(new PhysicsSystem(e)),
                        this.addSystem(new UpdateMapSystem(e)),
                        this.addSystem(new FlashOnDamageSystem(e)),
                        this.addSystem(new BurnsOnDaySystem(e)),
                        this.addSystem(new ExplodesOnHitSystem(e)),
                        this.addSystem(new ProjectileShooterSystem(e)),
                        this.addSystem(new DamageOnHitSystem(e)),
                        this.addSystem(new DetectKillSystem(e)),
                        this.addSystem(new RegenHealthOnDaySystem(e)),
                        this.addSystem(new GainStatsSystem(e)),
                        this.addSystem(new BuildingAnimationsSystem(e)),
                        this.addSystem(new HealthBarSystem(e)),
                        this.addSystem(new VisualizeConnectionsSystem(e)),
                        this.addSystem(new StorageVisualizerSystem(e)),
                        this.addSystem(new FlipToMovementDirectionSystem(e)),
                        this.addSystem(new ShootAnimationsSystem(e));
                }),
                (e.prototype.addSystem = function (e) {
                    if (!(e instanceof GameSystem)) throw new Error("Not a system: " + e);
                    this.systems.push(e);
                }),
                e
            );
        })(),
        GameTime = (function () {
            function e() {
                _classCallCheck(this, e), (this.now = 0), (this.nowConsistent = 0), (this.physicsElapsed = 0), (this.physicsElapsedConsistent = 0), (this.frameIndex = 0), (this.msCache = []);
                for (var t = 0; t < keepEntries; ++t) this.msCache.push(16);
                (this.msIndex = 0), (this.cached = { maxFrameTime: 16, avgFrameTime: 16 });
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameTime";
                        },
                    },
                ]),
                (e.prototype.reset = function () {
                    (this.now = 1e3 * (Config.dayDurationTotalSeconds - Config.nightDurationSeconds + Config.initialDayDurationAdditional + 1)), (this.nowConsistent = this.now);
                }),
                (e.prototype.averageFrameTime = function () {
                    return this.cached.avgFrameTime;
                }),
                (e.prototype.maxFrameTime = function () {
                    return this.cached.maxFrameTime;
                }),
                (e.prototype.averageFPS = function () {
                    return 1e3 / this.averageFrameTime();
                }),
                (e.prototype.update = function (e) {
                    e > 0.2 && (e = 0.2),
                        (this.frameIndex += 1),
                        (this.msCache[this.msIndex] = 1e3 * e),
                        (this.msIndex = (this.msIndex + 1) % keepEntries),
                        (this.nowConsistent += 1e3 * e),
                        (this.physicsElapsedConsistent = e),
                        (e *= Config.gameTimeSpeedUpFactor),
                        (this.now += 1e3 * e),
                        (this.physicsElapsed = e),
                        (this.cached = {
                            maxFrameTime: Math.max.apply(Math, _toConsumableArray(this.msCache)),
                            avgFrameTime:
                                this.msCache.reduce(function (e, t) {
                                    return e + t;
                                }) / keepEntries,
                        });
                }),
                e
            );
        })(),
        StatDisplayUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.uiGroup = i),
                    (this.root = t),
                    this.init(),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.root.signals.gameLoadedAndStarted.add(this.onLoaded, this),
                    this.root.signals.gameReload.add(this.onLoaded, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "StatDisplayUI";
                        },
                    },
                ]),
                (e.prototype.tutorialGetPosition = function () {
                    return [this.root.phaser.width / 2, this.panelGroup.y + 30];
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.lastGemCount = null),
                        this.uiGroup.add((this.fixedGroup = e.make.group())),
                        (this.fixedGroup.fixedToCamera = true),
                        this.fixedGroup.add((this.panelGroup = e.make.group())),
                        (this.panelGroupWidth = 250),
                        (this.panelGroup.y = 0);
                    var t = e.make.image(this.panelGroupWidth / 2, 74, "atlas", "gem.png");
                    (t.width = 20 * e.resolution),
                        (t.height = 20 * e.resolution),
                        t.anchor.setTo(0.5, 0.5),
                        this.panelGroup.add(t),
                        Config.mobileDevice && ((t.width = 12 * e.resolution), (t.height = 12 * e.resolution), (t.y = 40)),
                        (this.gems = e.make.text(0, 0, "0", { font: Config.mobileDevice ? "30px Roboto" : "60px Roboto", fill: "#fff", align: "center", boundsAlignH: "center", fontWeight: 300 })),
                        this.gems.setTextBounds(0, 0, this.panelGroupWidth, 40),
                        this.panelGroup.add(this.gems),
                        (this.gamemodeText = e.make.text(0, 0, "", { font: Config.mobileDevice ? "10px Roboto" : "14px Roboto", fill: "#fff", align: "center", boundsAlignH: "center", fontWeight: 700 })),
                        this.gamemodeText.setTextBounds(0, -8, this.panelGroupWidth, 40),
                        this.panelGroup.add(this.gamemodeText),
                        (this.updateTimer = Timer.makeFromIntervalMs(100)),
                        (this.updateAnimTimer = Timer.makeFromIntervalMs(1e3)),
                        (this.averageGemsPerSecond = 0);
                }),
                (e.prototype.onLoaded = function () {
                    this.gamemodeText.setText(this.root.gamemode.getTitle().toUpperCase(), true), (this.gamemodeText.tint = this.root.gamemode.getColor());
                }),
                (e.prototype.onResolutionChanged = function (e) {
                    (this.panelGroup.x = (e - this.panelGroupWidth) / 2), (this.panelGroup.y = Config.ui.screenBorderTop);
                }),
                (e.prototype.update = function () {
                    for (var e = this.root.stats.gems; this.updateTimer.takeTick(this.root.time.nowConsistent, true);) this.doUpdate();
                    for (; this.updateAnimTimer.takeTick(this.root.time.nowConsistent, true);)
                        if (null === this.lastGemCount) this.lastGemCount = e;
                        else if (e !== this.lastGemCount) {
                            var t = e - this.lastGemCount;
                            this.addGemGainAnim(t), (this.lastGemCount = e);
                        }
                }),
                (e.prototype.doUpdate = function () {
                    if (this.root.gamemode && this.root.gamemode.isSandbox()) this.gems.setText("∞", true);
                    else {
                        var e = this.root.stats.gems;
                        e < 1e3 ? this.gems.setText(e.toString(), true) : this.gems.setText(formatBigNumber(e), true);
                    }
                }),
                (e.prototype.addGemGainAnim = function (e) {
                    if (!this.root.gamemode || !this.root.gamemode.isSandbox()) {
                        var t = null,
                            i = (e >= 0 ? "+" : "-") + formatBigNumber(Math.abs(e)).padStart(this.gems.text.length - 1, " ");
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
                }),
                e
            );
        })(),
        BuildingsDisplayUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.onSelectBuilding = new Phaser.Signal()),
                    (this.classNameToGroup = newEmptyMap()),
                    this.init(),
                    this.initKeybindings(),
                    this.makeTooltip(),
                    (this.dirty = false),
                    this.updateBar(),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.root.signals.buildingPlaced.add(this.queueUpdate, this),
                    this.root.signals.buildingUpgraded.add(this.queueUpdate, this),
                    this.root.signals.buildingDestroyed.add(this.queueUpdate, this),
                    this.root.signals.actionPerformed.add(this.hideTooltip, this),
                    (this.updateTimer = Timer.makeFromIntervalMs(1e3));
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingsDisplayUI";
                        },
                    },
                ]),
                (e.prototype.queueUpdate = function () {
                    this.dirty = true;
                }),
                (e.prototype.initKeybindings = function () {
                    var e = this;
                    BuildingRegistry.getMetaBuildings().forEach(function (t) {
                        var i = t.getKeybinding();
                        e.root.keyboard.addKey(i).onDown.add(function () {
                            e.root.dialogs.modalDialogIsOpen() || (e.root.signals.actionPerformed.dispatch(), e.root.logic.checkBuildingRequirements({ building: t }).result && e.onSelectBuilding.dispatch(t));
                        });
                    });
                }),
                (e.prototype.tutorialGetPositionOf = function (e) {
                    var t = this.classNameToGroup[e.name].group.worldPosition;
                    return [t.x + BUILDING_BAR_ENTRY_SIZE / 2, t.y + BUILDING_BAR_ENTRY_SIZE / 2];
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    var i = this,
                        a = MAX_ITEMS_PER_ROW,
                        o = BUILDING_BAR_ENTRY_SIZE + BUILDING_BAR_ENTRY_SPACING,
                        n = o + 10;
                    e < a * o + n + 10 && (a = 5);
                    var r = [WallMeta, TransporterMeta],
                        s = 0,
                        l = 0,
                        u = 0;
                    META_BUILDINGS.forEach(function (e) {
                        var t = i.classNameToGroup[e.constructor.name].group,
                            c = false;
                        r.forEach(function (t) {
                            e instanceof t && (c = true);
                        }),
                            c ? (t.position.setTo(0, o * u), (u += 1)) : (t.position.setTo(n + l * o, s * o), (l += 1) >= a && ((l = 0), (s += 1)));
                    }),
                        0 === l && (s -= 1);
                    var c = a * o + n,
                        d = (s + 1) * o - BUILDING_BAR_ENTRY_SPACING;
                    e < 720
                        ? ((this.panelGroup.x = Math.floor((e - c) / 2)), (this.panelGroup.y = t - d - Config.ui.screenBorder))
                        : ((this.panelGroup.x = Math.max(Config.ui.visualizerWidth + Config.ui.screenBorder + 10, Math.floor((e - c) / 2))), (this.panelGroup.y = t - d - Config.ui.screenBorder));
                }),
                (e.prototype.updateBar = function () {
                    var e = this;
                    (this.dirty = false),
                        BuildingRegistry.getMetaBuildings().forEach(function (t) {
                            var i = t.constructor,
                                a = e.root.logic.checkBuildingRequirements({ building: t }),
                                o = e.classNameToGroup[i.name];
                            (o.amountText.visible = false), "transporter" === t.buildingId && e.root.stats.isSkillUnlocked("transporterFeatureGlobal") ? (o.group.visible = false) : (o.group.visible = true);
                            var n = t.getRequirements().find(function (e) {
                                return e instanceof PlayerLevelDependentMaxCountRequirement;
                            }),
                                r = -1;
                            n && ((o.amountText.visible = true), (r = n.getMaximumCount(e.root) - n.getCurrentCount(e.root)));
                            var s = t.getRequirements().find(function (e) {
                                return e instanceof UniqueRequirement;
                            });
                            s && ((o.amountText.visible = true), (r = s.check(e.root) ? 1 : 0)),
                                r < 0 ? (o.amountText.visible = false) : ((o.amountText.visible = true), r > 500 ? o.amountText.setText(tr("no_limit"), true) : o.amountText.setText(r, true));
                            var l = pastellizeColor(t.getBackgroundColor()),
                                u = 1,
                                c = 1;
                            (l = Config.colors.ui.panelBackground),
                                a.result || ((c = 0.4), (l = 2763306), (u = 0.9), r > 0 && ((l = 5583667), (c = 0.4), (u = 0.9))),
                                (o.panel.tint = l),
                                (o.panel.alpha = u),
                                (o.sprite.alpha = c),
                                (o.amountText.alpha = "0" === o.amountText.text ? 0.3 : 1),
                                o.keyText && (o.keyText.alpha = o.amountText.alpha);
                        });
                }),
                (e.prototype.makeTooltip = function () {
                    var e = this.root.phaser,
                        t = makeTooltipPanel(e, BUILD_TOOLTIP_W, BUILD_TOOLTIP_H, true),
                        i = t.tooltip,
                        a = t.outerGroup;
                    (this.tooltipGroup = i), this.uiGroup.add(a), this.tooltipGroup.kill();
                    var o = BUILD_TOOLTIP_W - 40,
                        n = BUILD_TOOLTIP_H - 40,
                        r = e.make.group();
                    (r.x = 20),
                        (r.y = 20),
                        this.tooltipGroup.add(r),
                        (this.tooltipTitle = e.make.text(0, 0, "<Building Title>", { font: "20px Roboto", fill: "#eee" })),
                        r.add(this.tooltipTitle),
                        (this.tooltipSprite = e.make.image(o - 20, 0)),
                        r.add(this.tooltipSprite),
                        (this.tooltipDesc = e.make.text(0, 30, "<Description>", { font: "12px Roboto", fill: "#aaa", wordWrap: true, wordWrapWidth: o })),
                        r.add(this.tooltipDesc),
                        (this.tooltipDependency = e.make.text(0, 73, "<Depends on>", { font: "12px Roboto", fill: "#F77", wordWrap: true, wordWrapWidth: o })),
                        r.add(this.tooltipDependency);
                    var s = e.make.image(0, n - 9, "atlas", "gem.png");
                    (s.width = 12),
                        (s.height = 12),
                        r.add(s),
                        (this.tooltipPriceTextGems = e.make.text(20, n - 10, "5.000", { font: "12px Roboto Mono", fill: "#eee" })),
                        r.add(this.tooltipPriceTextGems),
                        (this.tooltipHotkey = e.make.text(0, 0, "<hotkey>", { font: "12px Roboto", fill: "#eee", boundsAlignH: "right" })),
                        this.tooltipHotkey.setTextBounds(o - 100, n - 12, 100, 10),
                        r.add(this.tooltipHotkey);
                }),
                (e.prototype.showTooltip = function (e, t, i) {
                    if (!(this.root.phaser.width < 500)) {
                        this.tooltipGroup.revive(),
                            (this.tooltipGroup.alpha = 0),
                            this.root.animations.animate(this.tooltipGroup).to({ alpha: 1 }, 100).uiAnim(),
                            (this.tooltipGroup.x = t - BUILD_TOOLTIP_W / 2),
                            (this.tooltipGroup.y = i - BUILD_TOOLTIP_H),
                            (this.tooltipTitle.text = e.getDisplayName()),
                            this.tooltipSprite.loadTexture("atlas", e.getPreviewSpritePath()),
                            (this.tooltipSprite.width = 20),
                            (this.tooltipSprite.height = 20),
                            (this.tooltipSprite.tint = pastellizeColor(e.getBackgroundColor())),
                            (this.tooltipDesc.text = e.getDescription());
                        var a = e.getUpgradeCost(0),
                            o = formatBigNumber(a.gems);
                        0 === a.gems && (o = tr("no_cost")),
                            (this.tooltipPriceTextGems.text = o),
                            this.root.stats.canAfford(a) ? (this.tooltipPriceTextGems.tint = 16777215) : (this.tooltipPriceTextGems.tint = 16742263),
                            (this.tooltipHotkey.text = (0, _trim2.default)(tr("prefix_hotkey")) + " " + keyToString(e.getKeybinding()));
                        var n = this.root.logic.checkBuildingRequirements({ building: e });
                        n.result ? (this.tooltipDependency.visible = false) : ((this.tooltipDependency.text = n.reason), (this.tooltipDependency.visible = true));
                    }
                }),
                (e.prototype.hideTooltip = function () {
                    this.tooltipGroup.kill(), this.tooltipGroup.position.setTo(-999, -999);
                }),
                (e.prototype.init = function () {
                    var e = this,
                        t = this.root.phaser;
                    this.uiGroup.add((this.fixedGroup = t.make.group())),
                        (this.fixedGroup.fixedToCamera = true),
                        this.fixedGroup.add((this.panelGroup = t.make.group())),
                        BuildingRegistry.getMetaBuildings().forEach(function (i) {
                            var a = t.make.group();
                            e.panelGroup.add(a);
                            var o = makeRoundedPanelBackground(t, BUILDING_BAR_ENTRY_SIZE - 0, BUILDING_BAR_ENTRY_SIZE - 0, 16777215, 1);
                            o.position.setTo(0, 0),
                                o.enableInput(),
                                (o.name = "BuildingPanelBg"),
                                a.add(o),
                                o.events.onInputDown.add(function () {
                                    e.root.signals.actionPerformed.dispatch();
                                    var t = e.root.logic.checkBuildingRequirements({ building: i });
                                    t.result ? (e.onSelectBuilding.dispatch(i), e.root.signals.uiActionPerformed.dispatch()) : e.root.gui.uiNotifications.showError(t.reason);
                                }),
                                o.events.onInputOver.add(function () {
                                    e.root.logic.checkBuildingRequirements({ building: i }).result && (t.canvas.style.cursor = "pointer"), e.showTooltip(i, o.worldPosition.x + BUILDING_BAR_ENTRY_SIZE / 2, o.worldPosition.y - 20);
                                }),
                                o.events.onInputOut.add(function () {
                                    (t.canvas.style.cursor = "default"), e.hideTooltip();
                                });
                            var n = t.make.image(BUILDING_BAR_ENTRY_SIZE / 2, BUILDING_BAR_ENTRY_SIZE / 2, "atlas", i.getPreviewSpritePath());
                            n.anchor.setTo(0.5), Config.mobileDevice && n.scale.setTo(0.8 * n.scale.x), a.add(n);
                            var r = t.make.text(0, 0, "0", { font: "10px Roboto", fill: "#eee", boundsAlignH: "right", align: "right" });
                            r.setTextBounds(0, BUILDING_BAR_ENTRY_SIZE - 15, BUILDING_BAR_ENTRY_SIZE - 0 - 5, 20), a.add(r);
                            var s = null;
                            Config.mobileDevice ||
                                ((s = t.make.text(0, 0, keyToString(i.getKeybinding()), { font: "10px Roboto", fill: "#eee", boundsAlignH: "left", align: "left" })).setTextBounds(5, 3, BUILDING_BAR_ENTRY_SIZE - 0 - 5, 20), a.add(s)),
                                (e.classNameToGroup[i.constructor.name] = { panel: o, sprite: n, amountText: r, keyText: s, group: a });
                        });
                }),
                (e.prototype.update = function () {
                    for (; this.updateTimer.takeTick(this.root.time.nowConsistent, true);) this.updateBar();
                    this.dirty && this.updateBar();
                }),
                e
            );
        })(),
        CurrentlyPlacingUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.placing = false),
                    (this.lastPlacedPosition = null),
                    (this.smartPlaceActive = false),
                    (this.objectToPlace = null),
                    (this.lastMousePos = null),
                    this.init(),
                    this.initKeybindings(),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    (this.keyAlt = this.root.keyboard.addKey(Phaser.Keyboard.ALT));
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "CurrentlyPlacingUI";
                        },
                    },
                ]),
                (e.prototype.isCurrentlyPlacing = function () {
                    return null != this.objectToPlace;
                }),
                (e.prototype.initKeybindings = function () {
                    var e = this;
                    this.root.keyboard.addKey(Config.keys.cancelBuild).onDown.add(this.cancelPlacement, this),
                        this.root.keyboard.addKey(Phaser.Keyboard.SHIFT).onUp.add(function () {
                            var t = window.mouseTracker.leftButtonDown;
                            (null === e.lastPlacedPosition && t) || e.cancelPlacement(true);
                        });
                }),
                (e.prototype.onPlacementFinished = function () {
                    if (this.smartPlaceActive && this.lastPositionInRadius) {
                        var e = this.getCurrentTileSpacePosition(),
                            t = { building: this.objectToPlace, position: { tileX: e[0], tileY: e[1] } };
                        this.doPlaceBuilding(t);
                    }
                }),
                (e.prototype.cancelPlacement = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    null !== this.objectToPlace &&
                        (e || this.onPlacementFinished(),
                            (this.smartPlaceActive = false),
                            (this.objectToPlace = null),
                            this.cancelGroup && this.cancelGroup.kill(),
                            this.root.signals.actionPerformed.dispatch(),
                            (this.lastPlacedPosition = null),
                            (this.lastPositionInRadius = null));
                }),
                (e.prototype.init = function () {
                    var e = this,
                        t = this.root.phaser;
                    (this.objectToPlace = null),
                        (this.group = t.make.group()),
                        this.uiGroup.add(this.group),
                        (this.placementGroup = t.make.group()),
                        this.group.add(this.placementGroup),
                        (this.radiusIndicator = t.make.graphics(0, 0)),
                        this.radiusIndicator.beginFill(16777215, 0.07),
                        this.radiusIndicator.drawCircle(0, 0, 200),
                        this.radiusIndicator.endFill(),
                        this.placementGroup.add(this.radiusIndicator),
                        (this.previewCircle = t.make.graphics(0, 0)),
                        this.previewCircle.beginFill(16777215, 0.3),
                        this.previewCircle.drawCircle(0, 0, Config.tileSize - 2 * Config.ui.buildingOuterSpace + 10),
                        this.previewCircle.endFill(),
                        this.placementGroup.add(this.previewCircle),
                        (this.connectionsIndicator = t.make.graphics(0, 0)),
                        this.connectionsIndicator.anchor.setTo(0.5, 0.5),
                        this.placementGroup.add(this.connectionsIndicator),
                        (this.compatibleResourcesIndicator = t.make.graphics(0, 0)),
                        (this.compatibleResourcesCache = null),
                        this.root.groups.compatibleResourcesVisGroup.add(this.compatibleResourcesIndicator),
                        this.root.animations.animate(this.compatibleResourcesIndicator).to({ alpha: 0.4 }, 350).yojo().uiAnim(),
                        (this.previewSprite = t.make.sprite(0, 0)),
                        (this.previewSprite.smoothed = true),
                        this.placementGroup.add(this.previewSprite),
                        (this.reasonGroup = t.make.group()),
                        this.placementGroup.add(this.reasonGroup),
                        (this.reasonBackground = makeRoundedPanelBackground(t, 400, 25, 2236962, 0.9)),
                        this.reasonBackground.position.setTo(0, 35),
                        this.reasonBackground.pivot.setTo(200, 0),
                        this.reasonGroup.add(this.reasonBackground),
                        (this.reasonText = t.make.text(-200, 40, "Can not place building", { font: "12px Roboto", fill: "#FF7777", boundsAlignH: "center" })),
                        this.reasonText.setTextBounds(0, 0, 400, 20),
                        this.reasonGroup.add(this.reasonText),
                        (this.clickCatcher = t.make.graphics(0, 0)),
                        this.clickCatcher.beginFill(255, 0),
                        this.clickCatcher.drawRect(0, 0, 1, 1),
                        this.clickCatcher.endFill(),
                        (this.clickCatcher.fixedToCamera = true),
                        this.group.add(this.clickCatcher),
                        this.clickCatcher.enableInput(),
                        (this.clickCatcher.name = "CurrentlyPlacingClickCatcher"),
                        this.clickCatcher.events.onInputDown.add(function () {
                            window.mouseTracker.rightButtonDown ? e.cancelPlacement() : ((e.lastPlacedPosition = null), (e.lastPositionInRadius = null), (e.lastMousePos = null), (e.placing = true));
                        }),
                        this.clickCatcher.events.onInputUp.add(function () {
                            (e.placing = false),
                                e.root.keyboard.isDown(Phaser.Keyboard.SHIFT) ? e.smartPlaceActive && e.onPlacementFinished() : e.cancelPlacement(),
                                (e.lastPlacedPosition = null),
                                (e.lastPositionInRadius = null),
                                (e.lastMousePos = null);
                        }),
                        Config.mobileDevice &&
                        ((this.cancelGroup = t.make.group()),
                            (this.cancelGroup.fixedToCamera = true),
                            (this.cancelButton = makeButton({
                                phaser: this.root.phaser,
                                text: tr("kb_cancel_placement"),
                                width: 140,
                                fill: Config.colors.ui.sellBuilding,
                                clickHandler: function () {
                                    return e.cancelPlacement(true);
                                },
                            })),
                            this.cancelGroup.add(this.cancelButton),
                            this.cancelGroup.kill(),
                            this.uiGroup.add(this.cancelGroup));
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    this.clickCatcher.scale.setTo(e, t), this.cancelButton && ((this.cancelButton.x = (e - 140) / 2), (this.cancelButton.y = t - 185)), this.placementGroup.scale.setTo(1 / this.root.zoom.currentZoomLevel);
                }),
                (e.prototype.selectBuilding = function (e) {
                    if (e === this.objectToPlace) return console.log("[UI] deselecting building"), void this.cancelPlacement(true);
                    (this.objectToPlace = e), (this.lastPlacedPosition = null), (this.lastPositionInRadius = null), (this.smartPlaceActive = false), this.cancelGroup && this.cancelGroup.revive();
                    var t = e.getTexture(this.root.phaser, 0);
                    this.previewSprite.loadTexture(t), this.previewSprite.anchor.setTo(0.5), this.previewSprite.scale.setTo(0.85);
                }),
                (e.prototype.placeCurrentPreview = function (e) {
                    var t = this;
                    if (null !== this.objectToPlace) {
                        var i = false,
                            a = false,
                            o = false;
                        if (
                            (this.objectToPlace.getPlacementHelpers().forEach(function (n) {
                                if (n instanceof MultiplacePlacementHelper && ((o = n.multiplace), n.smartPlace && null !== t.lastPlacedPosition)) {
                                    var r = distanceEuclidian(t.lastPlacedPosition, e);
                                    (i = true), r < n.smartPlaceRadius && (a = true);
                                }
                            }),
                                (this.smartPlaceActive = i),
                                a)
                        )
                            return;
                        var n = e;
                        i && (this.lastPositionInRadius ? (n = this.lastPositionInRadius) : (console.error("no last position in radius, using", n), (this.lastPlacedPosition = null)));
                        var r = { building: this.objectToPlace, position: { tileX: n[0], tileY: n[1] } };
                        this.doPlaceBuilding(r) && (this.lastPlacedPosition = n);
                        var s = this.root.keyboard.isDown(Phaser.Keyboard.SHIFT),
                            l = false;
                        o || s || (l = true), this.root.logic.checkBuildingRequirements({ building: this.objectToPlace }).result || (l = true), l && this.cancelPlacement();
                    }
                }),
                (e.prototype.doPlaceBuilding = function (e) {
                    if (!this.root.logic.tryPlaceBuilding(e)) return false;
                    var t = this.root.map.getTileContent(e.position.tileX, e.position.tileY);
                    if (this.keyAlt.isDown) for (; this.root.logic.upgradeBuilding(t););
                    return true;
                }),
                (e.prototype.getCurrentTileSpacePosition = function () {
                    return worldToTile.apply(void 0, _toConsumableArray(getWorldSpaceMouse(this.root.phaser)));
                }),
                (e.prototype.drawVisualizeConnections = function (e, t, i, a) {
                    var o = this;
                    e.lineStyle(2, 11184810, 0.7),
                        t.getPlacementHelpers().forEach(function (t) {
                            t instanceof NearbyBuildingPlacementHelper &&
                                o.root.map
                                    .getUsedTilesArround({
                                        tileX: i,
                                        tileY: a,
                                        radius: t.radius,
                                        condition: function (e) {
                                            return e instanceof t.entityClass && (!t.condition || t.condition(e));
                                        },
                                    })
                                    .forEach(function (t) {
                                        var o = t.entity;
                                        e.moveTo(0, 0);
                                        var n = [(o.getTileX() - i) * Config.tileSize, (o.getTileY() - a) * Config.tileSize];
                                        e.lineTo.apply(e, n), e.drawCircle.apply(e, n.concat([10]));
                                    });
                        });
                }),
                (e.prototype.drawCompatibleResource = function (e, t) {
                    var i = null,
                        a = null;
                    if (
                        (t.getPlacementHelpers().forEach(function (e) {
                            e instanceof CompatibleResourcesPlacementHelper && ((i = e.resourceClass), (a = e.radius));
                        }),
                            !i)
                    )
                        return e.clear(), void (this.compatibleResourcesCache = null);
                    var o = this.root.phaser.camera.view,
                        n = { cameraX: o.x, cameraY: o.y, resourceClass: i };
                    if (!this.compatibleResourcesCache || this.compatibleResourcesCache.cameraX !== n.cameraX || this.compatibleResourcesCache.cameraY !== n.cameraY || this.compatibleResourcesCache.resourceClass !== n.resourceClass) {
                        Config.logOverlayRedraws && console.log("[UI] redrawing compatible resources"), (this.compatibleResourcesCache = n), e.clear(), e.lineStyle(3, 16777215, 0.7), e.beginFill(16777215, 0.06);
                        for (var r = this.root.entityMgr.getAllEntitiesWithComponent(ResourceComponent), s = 0; s < r.length; ++s) {
                            var l,
                                u = r[s];
                            if (u.visible && u instanceof i)
                                if ((l = this.root.map).checkIsTileFreeArround.apply(l, _toConsumableArray(u.getTile()).concat([a]))) {
                                    var c = u.worldSpaceTileCenter();
                                    e.drawCircle(c[0], c[1], Config.tileSize + 10);
                                }
                        }
                    }
                }),
                (e.prototype.placePreviewsTracked = function () {
                    var e = this,
                        t = this.lastMousePos,
                        i = getWorldSpaceMouse(this.root.phaser),
                        a = function (t) {
                            null !== e.objectToPlace && e.root.logic.checkBuildingRequirements({ building: e.objectToPlace, position: { tileX: t[0], tileY: t[1] } }).result && (e.lastPositionInRadius = t);
                        };
                    if (null === t) {
                        var o = worldToTile.apply(void 0, _toConsumableArray(i));
                        this.placeCurrentPreview(o), a(o);
                    } else {
                        var n = distanceEuclidian(t, i);
                        if (n < 2) {
                            var r = worldToTile.apply(void 0, _toConsumableArray(i));
                            this.placeCurrentPreview(r), a(r);
                        } else
                            for (var s = Math.max(2, Math.ceil(n / 5)), l = vectorSubstract(i, t), u = 0; u < s; ++u) {
                                var c = u / (s - 1),
                                    d = l[0] * c,
                                    h = l[1] * c,
                                    p = [t[0] + d, t[1] + h],
                                    g = worldToTile.apply(void 0, p);
                                this.placeCurrentPreview(g), a(g);
                            }
                    }
                    this.lastMousePos = i;
                }),
                (e.prototype.update = function () {
                    var e;
                    this.placing && null !== this.objectToPlace && (this.placePreviewsTracked(), (this.compatibleResourcesCache = null));
                    var t = this.getCurrentTileSpacePosition(),
                        i = { building: this.objectToPlace, position: { tileX: t[0], tileY: t[1] } };
                    if (null !== this.objectToPlace && (e = this.root.map).isValidCoordinate.apply(e, _toConsumableArray(t))) {
                        var a;
                        this.group.visible = true;
                        var o = vectorScalarMultiply(tileCenterToWorld.apply(void 0, _toConsumableArray(t)), 1 / this.root.zoom.currentZoomLevel);
                        (a = this.placementGroup.position).setTo.apply(a, _toConsumableArray(o)),
                            this.connectionsIndicator.clear(),
                            this.drawVisualizeConnections.apply(this, [this.connectionsIndicator, this.objectToPlace].concat(_toConsumableArray(t))),
                            (this.compatibleResourcesIndicator.visible = true),
                            this.drawCompatibleResource(this.compatibleResourcesIndicator, this.objectToPlace);
                        var n = this.objectToPlace.getPlacementHelpers().find(function (e) {
                            return e instanceof RadiusPlacementHelper;
                        });
                        n ? ((this.radiusIndicator.visible = true), this.radiusIndicator.scale.setTo((n.radius * Config.tileSize) / 100)) : (this.radiusIndicator.visible = false);
                        var r = this.root.logic.checkBuildingRequirements(i),
                            s = Config.colors.ui.placementGood;
                        this.root.entityMgr.getAllEntitiesWithComponent(EnemyAIComponent).length > 0 && Config.gameTimeSpeedUpFactor < 1 && (r = { result: false, reason: tr("placement_not_possible_during_night_paused") }),
                            r.result
                                ? ((this.reasonText.visible = false), (this.reasonBackground.visible = false))
                                : ((s = Config.colors.ui.placementBad),
                                    (this.reasonBackground.visible = true),
                                    (this.reasonText.visible = true),
                                    this.reasonGroup.scale.setTo(this.root.zoom.currentZoomLevel),
                                    r.reason !== this.reasonText.text &&
                                    (Config.logOverlayRedraws && console.log("[RENDER] Redrawing placement reason text"), this.reasonText.setText(r.reason, true), (this.reasonBackground.width = this.reasonText.width + 20))),
                            (this.previewCircle.tint = s),
                            (this.previewSprite.tint = pastellizeColor(s, 0.7)),
                            (this.connectionsIndicator.tint = s);
                    } else (this.group.visible = false), this.compatibleResourcesIndicator.clear(), (this.compatibleResourcesIndicator.visible = false), (this.compatibleResourcesCache = null);
                }),
                e
            );
        })(),
        DebugOverlayUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.uiGroup = i), (this.root = t), (this.updateTimer = Timer.makeFromIntervalMs(100));
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DebugOverlayUI";
                        },
                    },
                ]),
                (e.prototype.update = function () { }),
                e
            );
        })(),
        DayNightOverlay = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.root.phaser = t.phaser),
                    (this.uiGroup = i),
                    this.root.signals.gameSizeChanged.add(this.sizeChanged, this),
                    this.root.signals.nightEntered.add(this.showNightOverlay, this),
                    this.root.signals.nightEnded.add(this.hideNightOverlay, this),
                    this.setupDisplay(),
                    this.setupOverlay();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DayNightOverlay";
                        },
                    },
                ]),
                (e.prototype.tutorialGetPosition = function () {
                    var e = this.dayText.worldPosition;
                    return [e.x + 10, e.y + 15];
                }),
                (e.prototype.sizeChanged = function (e, t) {
                    (this.overlayGraphics.width = e),
                        (this.overlayGraphics.height = t),
                        (this.displayGroup.x = Config.ui.screenBorder + HALF_LINE_THICKNESS),
                        (this.displayGroup.y = Config.ui.screenBorderTop + HALF_LINE_THICKNESS + 7),
                        this.displayGroup.scale.setTo(1);
                }),
                (e.prototype.setupOverlay = function () {
                    var e = this.root.phaser.make.group();
                    (e.fixedToCamera = true), (e.alpha = 0), this.uiGroup.add(e), (this.overlayGroup = e);
                    var t = this.root.phaser.make.graphics();
                    t.beginFill(16777215), t.drawRect(0, 0, 1, 1), t.endFill(), (t.alpha = 0.3), e.add(t), (this.overlayGraphics = t);
                }),
                (e.prototype.precomputeClockGraphics = function () {
                    var e = Config.dayDurationTotalSeconds - Config.nightDurationSeconds,
                        t = this.root.phaser.make.graphics();
                    t.beginFill(3355443, 0.8), t.lineStyle(LINE_THICKNESS, Config.colors.dayColor), t.drawCircle(0, 0, 2 * RADIUS), t.endFill();
                    for (var i = 0; i < 360; ++i) {
                        var a = i / 360,
                            o = 360 * a - 90,
                            n = 0,
                            r = a * Config.dayDurationTotalSeconds;
                        if ((r <= GRADIENT_SIZE && (n = 1 - r / GRADIENT_SIZE), r > e)) {
                            n = 1;
                            var s = r - e;
                            s < GRADIENT_SIZE && (n = s / GRADIENT_SIZE);
                        }
                        n > 0 && (t.lineStyle(LINE_THICKNESS + 0.5, Config.colors.nightColor, n), t.arc(0, 0, RADIUS, Math.radians(o), Math.radians(o + 1 + 0.5)));
                    }
                    t.lineStyle(), t.beginFill(16777215, 0.001);
                    var l = RADIUS + LINE_THICKNESS + 2;
                    return t.drawRect(-l, -l, 2 * l, 2 * l), t;
                }),
                (e.prototype.setupDisplay = function () {
                    var e = this.root.phaser,
                        t = e.make.group();
                    (t.fixedToCamera = true), this.uiGroup.add(t), (this.displayGroup = e.make.group()), t.add(this.displayGroup);
                    var i = this.precomputeClockGraphics(),
                        a = i.generateTexture(),
                        o = e.make.sprite(0, 0, a);
                    i.destroy(), o.anchor.setTo(0.5, 0.5), o.position.setTo(RADIUS, RADIUS), (o.smoothed = false), this.displayGroup.add(o), (this.clock = o);
                    var n = e.make.image(RADIUS, -4, "atlas", "day-indicator.png");
                    n.anchor.setTo(0.5, 0.5),
                        this.displayGroup.add(n),
                        (this.dayText = e.make.text(0, 5, "1", { font: "30px Roboto", fontWeight: 700, fill: "#fff", boundsAlignH: "center", align: "center", boundsAlignV: "middle" })),
                        this.dayText.setTextBounds(0, 0, 2 * RADIUS, 2 * RADIUS),
                        this.displayGroup.add(this.dayText);
                }),
                (e.prototype.update = function () {
                    var e = this.root.daytime;
                    this.root.gamemode && this.root.gamemode.isAlwaysNight() ? this.dayText.setText("-", true) : this.dayText.setText(e.getDay().toString(), true);
                    var t = e.percentOfTotalDay();
                    e.getDay() <= 1 && (t = Math.max(t, GRADIENT_SIZE / Config.dayDurationTotalSeconds)), (this.clock.angle = 360 * -t);
                    var i = e.getDay() > 99 ? 25 : 30;
                    Config.mobileDevice && (i *= 0.7), (this.dayText.fontSize = Math.floor(i));
                }),
                (e.prototype.showNightOverlay = function (e) {
                    var t = "active";
                    e % GAME_BALANCING.bossInterval == 0 && (t += " boss"), (document.getElementById("day_night_overlay").className = t);
                }),
                (e.prototype.hideNightOverlay = function () {
                    document.getElementById("day_night_overlay").className = "";
                }),
                e
            );
        })(),
        BuildingTooltipUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.init();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BuildingTooltipUI";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    var e = this,
                        t = this.root.phaser;
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
                }),
                (e.prototype.isOpen = function () {
                    return null != this.currentEntity;
                }),
                (e.prototype.getLevelUpgradeMode = function () {
                    return this.keyAlt.isDown ? UPGRADE_MAX_LEVEL : UPGRADE_ONE_LEVEL;
                }),
                (e.prototype.getBatchUpgradeMode = function () {
                    return this.keyShift.isDown || this.forceUpgradeAll ? UPGRADE_ALL_BUILDINGS : UPGRADE_ONE_BUILDING;
                }),
                (e.prototype.tutorialGetLevelTextPosition = function () {
                    var e = this.tooltipLevelIcon.worldPosition,
                        t = this.tooltipGroup.scale.x;
                    return [e.x + 30 * t, e.y + 5 * t];
                }),
                (e.prototype.tutorialGetUpgradeButtonPosition = function () {
                    var e = this.tooltipUpgradeButton.worldPosition,
                        t = this.tooltipGroup.scale.x;
                    return [e.x + (this.tooltipUpgradeButton.width / 2) * t, e.y + (this.tooltipUpgradeButton.height / 2) * t];
                }),
                (e.prototype.tutorialGetStatisticsPosition = function () {
                    var e = this.tooltipStatLines[0].icon.worldPosition,
                        t = this.tooltipGroup.scale.x;
                    return [e.x + 70 * t, e.y + 17 * t];
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    this.clickCatcher.scale.setTo(e, t), this.radiusHelper.scale.setTo(1 / this.root.zoom.currentZoomLevel), this.updateGroupPosition();
                }),
                (e.prototype.bindSignals = function () {
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
                }),
                (e.prototype.checkTooltip = function () {
                    (this.currentEntity && this.currentEntity.alive) || this.hideTooltip();
                }),
                (e.prototype.onShiftDown = function () {
                    this.updateDialogButtons();
                }),
                (e.prototype.onShiftUp = function () {
                    this.updateDialogButtons();
                }),
                (e.prototype.onAltDown = function () {
                    this.updateDialogButtons();
                }),
                (e.prototype.onAltUp = function () {
                    this.updateDialogButtons();
                }),
                (e.prototype.updateDialogButtons = function () {
                    if (this.currentEntity) {
                        var e = this.currentEntity,
                            t = e.meta;
                        if (t) {
                            if (t.isSellable()) {
                                this.tooltipSellButton.visible = true;
                                var i = 0,
                                    a = "";
                                this.getBatchUpgradeMode() == UPGRADE_ONE_BUILDING ? ((i = this.root.logic.getSellPrice(e)), (a = tr("sell_for"))) : ((a = tr("sell_all_for")), (i = this.root.logic.getSellPriceForAll(e))),
                                    this.tooltipSellButton.textHandle.setText(a.toUpperCase(), true),
                                    this.sellGemsText.setText(formatBigNumber(i), true),
                                    (this.sellGemsText.visible = true),
                                    (this.sellGemsIcon.visible = true),
                                    (this.tooltipSellTextGroup.visible = false);
                            } else
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
                                    var r = "upgrade",
                                        s = false;
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
                }),
                (e.prototype.computeUpgradeCost = function (e) {
                    var t = this,
                        i = e.meta.getLevelKeyStats(e.getLevel() + 1),
                        a = 0;
                    this.getBatchUpgradeMode() === UPGRADE_ONE_BUILDING
                        ? (a = this.computeOneUpgradeCost(e))
                        : this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (o) {
                            o.constructor.name === e.constructor.name && (t.getLevelUpgradeMode() === UPGRADE_ONE_LEVEL ? o.getLevel() === e.getLevel() && (a += i.cost.gems) : (a += t.computeOneUpgradeCost(o)));
                        });
                    return a;
                }),
                (e.prototype.computeOneUpgradeCost = function (e) {
                    var t = e.meta;
                    if (this.getLevelUpgradeMode() === UPGRADE_ONE_LEVEL) return t.getLevelKeyStats(e.getLevel() + 1).cost.gems;
                    var i = this.root.logic.getPlayerBaseLevel();
                    e.hasComponent(PlayerBaseComponent) && (i = MAXLEVEL_INDEX);
                    for (var a = 0, o = e.getLevel() + 1; o <= i; ++o) a += t.getLevelKeyStats(o).cost.gems;
                    return a;
                }),
                (e.prototype.initTooltip = function () {
                    var e = this,
                        t = this.root.phaser,
                        i = TOOLTIP_WIDTH - 40,
                        a = t.make.group();
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
                    ),
                        g = p.button,
                        m = p.text,
                        _ = p.textGroup;
                    (this.tooltipUpgradeButton = g), (this.tooltipUpgradeText = m), (this.tooltipUpgradeTextGroup = _);
                    var f = addGemCountToButton(t, this.tooltipUpgradeButton),
                        b = f.icon,
                        A = f.text;
                    (this.upgradeGemsIcon = b), (this.upgradeGemsText = A);
                    var y = this.makeTooltipButton(
                        i / 2 - 5,
                        tr("sell_for"),
                        Config.colors.ui.sellBuilding,
                        function () {
                            return e.trySell();
                        },
                        Config.keys.sellBuilding
                    ),
                        v = y.button,
                        k = y.text,
                        w = y.textGroup;
                    (this.tooltipSellButton = v), (this.tooltipSellText = k), (this.tooltipSellTextGroup = w), (this.tooltipUpgradeButton.x = i / 2 + 5), (this.tooltipUpgradeTextGroup.x = i / 2 + 5);
                    var V = addGemCountToButton(t, this.tooltipSellButton),
                        C = V.icon,
                        S = V.text;
                    (this.sellGemsIcon = C), (this.sellGemsText = S), (this.innerGroup = a), this.innerGroup.kill();
                }),
                (e.prototype.makeTooltipButton = function (e, t, i, a, o) {
                    var n = this,
                        r = this.root.phaser,
                        s = makeButton({ phaser: r, width: e, text: t, fill: i, clickHandler: a, keybinding: o, height: 45, clickSounds: false }),
                        l = r.make.group(),
                        u = r.make.graphics();
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
                }),
                (e.prototype.tryUpgrade = function () {
                    this.currentEntity &&
                        (this.root.logic.upgradeBuilding(this.currentEntity, this.getBatchUpgradeMode() === UPGRADE_ALL_BUILDINGS, this.getLevelUpgradeMode() === UPGRADE_MAX_LEVEL)
                            ? this.root.sound.playUpgradeBuildingSound()
                            : this.root.signals.uiActionPerformedAndFailed.dispatch(),
                            this.showTooltip(this.currentEntity));
                }),
                (e.prototype.trySell = function () {
                    if (this.currentEntity && this.currentEntity.meta.isSellable()) {
                        if (this.getBatchUpgradeMode() === UPGRADE_ALL_BUILDINGS) {
                            var e = this.currentEntity.meta;
                            return (document.getElementById("sell_all_confirm_content").innerText = tr("sell_confirmation_text", e.getDisplayName())), void window.showDialog("sell_all_confirmation_bg");
                        }
                        this.root.logic.sellBuilding(this.currentEntity) && ((this.currentEntity = null), this.hideTooltip());
                    }
                }),
                (e.prototype.onSellAllConfirmed = function () {
                    this.currentEntity && (this.root.logic.sellAllBuildings(this.currentEntity) && ((this.currentEntity = null), this.hideTooltip()), window.closeDialog("sell_all_confirmation_bg"));
                }),
                (e.prototype.initializeRadiusHelper = function () {
                    this.radiusHelper.visible = false;
                    var e = this.currentEntity,
                        t = e.getComponent(ProjectileShooterComponent),
                        i = e.getComponent(TransporterComponent);
                    if (t || i) {
                        this.radiusHelper.visible = true;
                        var a = Config.tileSize / 2 - Config.ui.buildingOuterSpace,
                            o = 0;
                        t ? (o = t.radius * Config.tileSize) : i && ((o = Config.radius.transporter * Config.tileSize), (a = 8));
                        var n,
                            r = o - a;
                        if (this.currentRadiusParams[0] != o || this.currentRadiusParams[1] != a)
                            (this.currentRadiusParams = [o, a]),
                                this.radiusHelper.clear(),
                                this.radiusHelper.lineStyle(r, 16777215, 0.1),
                                (n = this.radiusHelper).drawCircle.apply(n, _toConsumableArray(e.worldSpaceTileCenter()).concat([o + a]));
                    }
                }),
                (e.prototype.showTooltip = function (e) {
                    var t = this;
                    this.currentEntity = e;
                    var i = e.meta;
                    if (null == i) throw new Error("Entity has no meta handle");
                    (this.currentRadiusParams = [0, 0]), this.initializeRadiusHelper(), this.tooltipTitle.setText(i.getDisplayName(), true), this.tooltipDesc.setText(i.getDescription(), true);
                    var a = Config.colors.levels[e.getLevel()];
                    this.tooltipLevelText.setText(tr("level").toUpperCase() + " " + (e.getLevel() + 1), true), (this.tooltipLevelText.tint = a), (this.tooltipLevelIcon.tint = a);
                    var o = i.getLevelKeyStats(e.getLevel()),
                        n = i.getLevelKeyStats(e.getLevel() + 1),
                        r = 0;
                    this.tooltipStatLines.forEach(function (e) {
                        e.group.visible = false;
                    }),
                        SUPPORTED_STATS.forEach(function (i) {
                            var a = _slicedToArray(i, 2),
                                s = a[0],
                                l = a[1];
                            if (o[s]) {
                                var u = t.tooltipStatLines[r],
                                    c = tr("stat_" + s);
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
                    var s = r * STAT_LINE_HEIGHT + 190,
                        l = this.getTooltipPanelForHeight(s);
                    (this.buttonsGroup.y = s - 80),
                        this.innerGroup.alive || this.innerGroup.revive(),
                        this.innerGroup.parent && this.innerGroup.parent.remove(this.innerGroup),
                        l.add(this.innerGroup),
                        (this.currentGroupHandle = l),
                        (this.currentTooltipHeight = s),
                        this.updateDialogButtons(),
                        this.updateGroupPosition();
                }),
                (e.prototype.updateGroupPosition = function () {
                    if (this.currentGroupHandle && this.currentEntity) {
                        var e = this.root.zoom.currentZoomLevel;
                        this.tooltipGroup.scale.setTo(1 / e);
                        var t = 0.5 + 0.5 * e;
                        Config.mobileDevice && (t *= 0.75),
                            this.currentGroupHandle.scale.setTo(t),
                            (this.currentGroupHandle.x = Math.floor(this.currentEntity.x + Config.tileSize / 2 - (TOOLTIP_WIDTH / 2) * t)),
                            (this.currentGroupHandle.y = Math.floor(this.currentEntity.y - this.currentTooltipHeight * t - 2 * t * e));
                    }
                }),
                (e.prototype.getTooltipPanelForHeight = function (e) {
                    if (!this.heightToTooltipPanel[e]) {
                        Config.logOverlayRedraws && console.log("[UI] Regenerating building tooltip for height", e);
                        var t = makeTooltipPanel(this.root.phaser, TOOLTIP_WIDTH, e, true, Config.colors.ui.panelBackground, false).tooltip;
                        this.tooltipGroup.add(t), (this.heightToTooltipPanel[e] = t);
                    }
                    var i = null,
                        a = e.toString();
                    for (var o in this.heightToTooltipPanel) {
                        var n = this.heightToTooltipPanel[o];
                        o === a ? (n.alive || n.revive(), (i = n)) : n.alive && n.kill();
                    }
                    return i;
                }),
                (e.prototype.onMouseDown = function () {
                    var e,
                        t,
                        i = getTileBelowCursor(this.root.phaser);
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
                }),
                (e.prototype.canShowTooltip = function (e) {
                    return null != e && e instanceof BuildingInstance;
                }),
                (e.prototype.hideTooltip = function () {
                    if ((arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) || !this.root.dialogs.modalDialogIsOpen())
                        for (var e in ((this.currentRadiusParams = [0, 0]), (this.radiusHelper.visible = false), (this.currentEntity = null), this.heightToTooltipPanel)) {
                            var t = this.heightToTooltipPanel[e];
                            t.alive && t.kill();
                        }
                }),
                (e.prototype.update = function () {
                    this.updateTimer.takeTick(this.root.time.nowConsistent, true) ? this.currentEntity && this.showTooltip(this.currentEntity) : this.updateDialogButtons();
                }),
                e
            );
        })(),
        BossComponent = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.debugStr = function () {
                    return "Is a boss";
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BossComponent";
                        },
                    },
                ]),
                t
            );
        })(Component),
        MinimapUI = (function () {
            function e(t, i) {
                var a = this;
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.dynamicSpritesCache = []),
                    (this.bossIndicatorSprite = null),
                    (this.enemySprite = null),
                    (this.scaleFactor = 1),
                    this.init(),
                    (this.textureCache = {}),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.root.signals.buildingPlaced.add(this.markMapDirty, this),
                    this.root.signals.buildingDestroyed.add(this.markMapDirty, this),
                    this.root.signals.gameReload.add(this.onMapInitialized, this),
                    this.root.signals.gameLoadedAndStarted.add(this.onMapInitialized, this),
                    (this.dirty = false),
                    (this.dragging = false),
                    (this.dragOffset = null);
                var o = this.root.keyboard.addKey(Config.keys.toggleMapView);
                o.onDown.add(function () {
                    return a.toggleScale(3);
                }),
                    o.onUp.add(function () {
                        return a.toggleScale(1);
                    });
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MinimapUI";
                        },
                    },
                ]),
                (e.prototype.tutorialGetPosition = function () {
                    return this.group.visible ? [this.group.position.x + 0.5 * Config.numTilesX * this.scaleFactor, this.group.position.y + 0.5 * Config.numTilesX * this.scaleFactor] : null;
                }),
                (e.prototype.toggleScale = function (e) {
                    (this.scaleFactor = e), this.onGameReset(), this.mapPanel.scale.setTo(this.scaleFactor), this.onResolutionChanged(this.root.phaser.width, this.root.phaser.height);
                    for (var t = this.notificationsBatch.children, i = 0; i < t.length; ++i) {
                        var a = t[i],
                            o = a.sourcePos;
                        (a.x = (o[0] / Config.tileSize) * this.scaleFactor), (a.y = (o[1] / Config.tileSize) * this.scaleFactor);
                    }
                }),
                (e.prototype.markMapDirty = function () {
                    this.dirty = true;
                }),
                (e.prototype.onMapInitialized = function () {
                    this.markMapDirty(), this.drawResources();
                }),
                (e.prototype.onGameReset = function () {
                    this.redrawMap(), this.drawResources();
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    var i = Config.numTilesX * this.scaleFactor,
                        a = Config.numTilesY * this.scaleFactor;
                    1 === this.scaleFactor
                        ? e < 940
                            ? ((this.group.visible = false), this.group.position.setTo(-1e3, -1e3))
                            : (this.group.position.setTo(e - i - Config.ui.screenBorder, t - a - Config.ui.screenBorder), (this.group.visible = true))
                        : ((this.group.visible = true), this.group.position.setTo(Math.floor((e - i) / 2), Math.floor((t - a) / 2)));
                    var o = this.root.zoom.currentZoomLevel;
                    this.cameraRect.clear(), this.cameraRect.lineStyle(2, 13421772, 1), this.cameraRect.drawRect(0, 0, Math.round((e / Config.tileSize) * o * this.scaleFactor), Math.round((t / Config.tileSize) * o * this.scaleFactor));
                }),
                (e.prototype.startDrag = function () {
                    var e = window.mouseTracker.getPosition(),
                        t = this.cameraRect.worldPosition;
                    (this.dragOffset = [0, 0]),
                        e.x >= t.x &&
                        e.y >= t.y &&
                        e.x <= t.x + this.cameraRect.width &&
                        e.y <= t.y + this.cameraRect.height &&
                        (this.dragOffset = [t.x - e.x + 0.5 * this.cameraRect.width - 3 + 0.5, t.y - e.y + 0.5 * this.cameraRect.height - 3 + 0.5]),
                        this.root.signals.actionPerformed.dispatch(),
                        (this.dragging = true),
                        this.updateDrag();
                }),
                (e.prototype.update = function () {
                    this.dirty && this.redrawMap(), this.updateDrag();
                    var e = this.root.zoom.currentZoomLevel,
                        t = this.root.phaser.camera.position;
                    (this.cameraRect.x = Math.round(((t.x * e) / Config.tileSize) * this.scaleFactor + 2)), (this.cameraRect.y = Math.round(((t.y * e) / Config.tileSize) * this.scaleFactor + 2)), this.updateDynamicEntities();
                }),
                (e.prototype.precomputeEnemySprite = function () {
                    var e = this.root.phaser.make.graphics();
                    e.beginFill(16720418), e.drawCircle(0, 0, 2 * this.scaleFactor), e.endFill(), (this.enemySprite = e.generateTexture());
                    var t = this.root.phaser.make.graphics();
                    t.clear(), t.beginFill(16720639), t.drawCircle(0, 0, 8 * this.scaleFactor), t.endFill(), (this.enemyBigSprite = t.generateTexture());
                }),
                (e.prototype.updateDynamicEntities = function () {
                    for (var e = 0; e < this.dynamicSpritesCache.length; ++e) (this.dynamicSpritesCache[e].visible = false), (this.dynamicSpritesCache[e].renderable = false);
                    for (var t = Config.mapBorder, i = this.root.entityMgr.getAllEntitiesWithComponent(EnemyAIComponent), a = 0; a < i.length; ++a) {
                        var o = i[a];
                        if (!o.hasComponent(BossComponent)) {
                            var n = null;
                            a < this.dynamicSpritesCache.length
                                ? (n = this.dynamicSpritesCache[a])
                                : ((n = this.root.phaser.make.image(0, 0, this.enemySprite)).anchor.setTo(0.5), this.dynamicSpritesCache.push(n), this.dynamicBatch.add(n)),
                                (n.visible = true),
                                (n.renderable = true);
                            var r = o.getTile(),
                                s = o.getTileNonSnapped(),
                                l = 1;
                            (l *= Math.min(1, r[0] / t)),
                                (l *= Math.min(1, r[1] / t)),
                                (l *= Math.min(1, (Config.numTilesX - r[0] - 1) / t)),
                                (l *= Math.min(1, (Config.numTilesY - r[1] - 1) / t)),
                                (n.alpha = l),
                                n.position.setTo(s[0] * this.scaleFactor, s[1] * this.scaleFactor);
                        }
                    }
                    this.bossIndicatorSprite || ((this.bossIndicatorSprite = this.root.phaser.make.image(0, 0, this.enemyBigSprite)), this.bossIndicatorSprite.anchor.setTo(0.5), this.dynamicBatch.add(this.bossIndicatorSprite));
                    var u = this.root.entityMgr.getAllEntitiesWithComponent(BossComponent);
                    if (0 === u.length) (this.bossIndicatorSprite.renderable = false), (this.bossIndicatorSprite.visible = false);
                    else {
                        (this.bossIndicatorSprite.renderable = true), (this.bossIndicatorSprite.visible = true);
                        var c = u[0];
                        this.bossIndicatorSprite.position.setTo((c.x / Config.tileSize + 0.5) * this.scaleFactor, (c.y / Config.tileSize + 0.5) * this.scaleFactor);
                        var d = 0.7 * upDownLinearMorph(this.root.time.now / 1e3, 0.3) + 0.3;
                        this.bossIndicatorSprite.alpha = d;
                    }
                }),
                (e.prototype.updateDrag = function () {
                    if (this.dragging) {
                        var e,
                            t = window.mouseTracker.getPosition(),
                            i = this.mapPanel.worldPosition,
                            a = this.root.zoom.currentZoomLevel,
                            o = [t.x - i.x + this.dragOffset[0], t.y - i.y + this.dragOffset[1]],
                            n = this.root.phaser.width,
                            r = this.root.phaser.height,
                            s = [(o[0] * Config.tileSize) / this.scaleFactor - (n * a) / 2, (o[1] * Config.tileSize) / this.scaleFactor - (r * a) / 2];
                        (s[0] = Math.max(0, Math.min(Config.numTilesX * Config.tileSize, s[0] / a))), (s[1] = Math.max(0, Math.min(Config.numTilesY * Config.tileSize, s[1] / a))), (e = this.root.phaser.camera).setPosition.apply(e, s);
                    }
                }),
                (e.prototype.endDrag = function () {
                    (this.dragging = false), (this.dragOffset = null);
                }),
                (e.prototype.redrawMap = function () {
                    Config.logOverlayRedraws && console.log("[RENDER] Redrawing minimap ui"), (this.dirty = false), this.mapImage.loadTexture(this.generateMapTexture(BuildingComponent, 0.75));
                }),
                (e.prototype.drawResources = function () {
                    this.mapResourcesImage.loadTexture(this.generateMapTexture(ResourceComponent, 0.3)), this.riverImage.loadTexture(this.generateMapTexture(MovementDistractionComponent, 0.1));
                }),
                (e.prototype.generateMapTexture = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                        i = this.root.phaser.make.graphics(),
                        a = this.scaleFactor;
                    i.beginFill(16777215, 0.001), i.drawRect(0, 0, Config.numTilesX * a, Config.numTilesY * a);
                    for (var o = this.root.entityMgr.getAllEntitiesWithComponent(e), n = 0, r = o.length; n < r; ++n) {
                        var s = o[n];
                        i.beginFill(s.minimapColor, t);
                        var l = s.getTileX() * a,
                            u = s.getTileY() * a;
                        1 === this.scaleFactor ? i.drawRect(l, u, this.scaleFactor, this.scaleFactor) : i.drawCircle(l, u, Math.floor(this.scaleFactor * s.getMinimapScale() + 1));
                    }
                    var c = i.generateTexture();
                    return i.destroy(), c;
                }),
                (e.prototype.showNotificationAt = function (e) {
                    var t = this;
                    this.root.sound.playMapNotificationSound();
                    var i = this.root.phaser.make.image(0, 0, "atlas", "minimap-notification.png");
                    i.anchor.setTo(0.5),
                        (i.x = (e[0] / Config.tileSize) * this.scaleFactor),
                        (i.y = (e[1] / Config.tileSize) * this.scaleFactor),
                        (i.smoothed = true),
                        (i.width = 128),
                        (i.height = 128),
                        (i.sourcePos = e),
                        (i.alpha = 0.5),
                        this.notificationsBatch.add(i),
                        this.root.animations
                            .animate(i)
                            .to({ width: 8, height: 8, alpha: 1 }, 200)
                            .uiAnim()
                            .onDone(function () {
                                t.root.animations
                                    .animate(i)
                                    .to({ alpha: 0.5, width: 20, height: 20 }, 15e3)
                                    .ease(EASING.easeBlink)
                                    .uiAnim()
                                    .onDone(function () {
                                        t.notificationsBatch.removeChild(i);
                                    });
                            });
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.fixedGroup = e.make.group()),
                        (this.fixedGroup.fixedToCamera = true),
                        this.uiGroup.add(this.fixedGroup),
                        (this.group = e.make.group()),
                        this.fixedGroup.add(this.group),
                        (this.mapPanel = makeRoundedPanelBackground(e, Config.numTilesX, Config.numTilesY, Config.colors.ui.panelBackground, 0.8)),
                        this.group.add(this.mapPanel),
                        this.mapPanel.enableInput(),
                        (this.mapPanel.name = "MinimapPanel"),
                        this.mapPanel.events.onInputDown.add(this.startDrag, this),
                        this.mapPanel.events.onInputUp.add(this.endDrag, this),
                        this.mapPanel.scale.setTo(this.scaleFactor),
                        (this.mapResourcesImage = e.make.image()),
                        this.group.add(this.mapResourcesImage),
                        (this.riverImage = e.make.image()),
                        this.group.add(this.riverImage),
                        (this.mapImage = e.make.image()),
                        this.group.add(this.mapImage),
                        (this.dynamicBatch = e.make.fastGroup(this.group, "Minimap-Dynamic")),
                        (this.notificationsBatch = e.make.fastGroup(this.group, "Minimap-Notifications")),
                        this.precomputeEnemySprite(),
                        (this.cameraRect = e.make.graphics()),
                        this.group.add(this.cameraRect);
                }),
                e
            );
        })(),
        BaseDirectionIndicatorUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.init();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BaseDirectionIndicatorUI";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.fixedGroup = e.make.group()), (this.fixedGroup.fixedToCamera = true), this.uiGroup.add(this.fixedGroup), (this.group = e.make.group()), this.fixedGroup.add(this.group);
                    var t = e.make.image(0, 0, "atlas", "base-direction-indicator.png");
                    (t.width = 32),
                        (t.height = 20),
                        t.anchor.setTo(0.5, 0.5),
                        this.group.add(t),
                        (this.arrowSprite = t),
                        (this.text = e.make.text(0, 0, tr("base_arrow_hint").toUpperCase(), { font: "22px Roboto", fill: "#FFF" })),
                        this.text.anchor.setTo(0.5, 0.5),
                        (this.text.y = 30),
                        this.group.add(this.text);
                }),
                (e.prototype.update = function () {
                    var e = this.root.logic.getPlayerBase();
                    if (e) {
                        this.group.visible = true;
                        var t = this.root.phaser.width,
                            i = this.root.phaser.height,
                            a = this.root.phaser.camera.position,
                            o = [a.x + t / 2, a.y + i / 2],
                            n = vectorScalarMultiply(e.worldSpaceTileCenter(), 1 / this.root.zoom.currentZoomLevel),
                            r = Math.abs(o[0] - n[0]),
                            s = function (e) {
                                return Math.max(0, Math.min(1, e));
                            },
                            l = 1 - s((i / 2 - Math.abs(o[1] - n[1]) + 50) / 100),
                            u = 1 - s((t / 2 - r + 50) / 100),
                            c = Math.max(l, u);
                        if (c < 0.01) return void (this.group.visible = false);
                        this.group.alpha = c;
                        var d = normalizedDirection(o, n),
                            h = Math.min((0.5 * Math.max(0, t - 200)) / Math.max(0.001, Math.abs(d[0])), (0.5 * Math.max(0, i - 200)) / Math.max(0.001, Math.abs(d[1])));
                        this.group.position.setTo(d[0] * h + t / 2, d[1] * h + i / 2);
                        var p = 180 - Phaser.Math.radToDeg(Math.atan2(d[0], d[1]));
                        (this.arrowSprite.angle = p), this.text.position.setTo(50 * -d[0], 40 * -d[1] + 2);
                    } else this.group.visible = false;
                }),
                e
            );
        })(),
        MovementGestureUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), (this.lastPos = null), (this.startPos = null), (this.dragging = false);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MovementGestureUI";
                        },
                    },
                ]),
                (e.prototype.onGestureStart = function () {
                    (this.lastPos = window.mouseTracker.getPosition()), (this.startPos = Object.assign({}, this.lastPos)), (this.dragging = true);
                }),
                (e.prototype.onGestureEnd = function () {
                    (this.lastPos = null), (this.startPos = null), (this.dragging = false);
                }),
                (e.prototype.update = function () {
                    if (this.dragging) {
                        var e = window.mouseTracker.getPosition();
                        distanceEuclidian([e.x, e.y], [this.startPos.x, this.startPos.y]) >= DRAG_THRESHOLD_PIXELS && this.root.signals.mapDragged.dispatch();
                        var t = this.root.phaser.camera;
                        (t.x -= e.x - this.lastPos.x), (t.y -= e.y - this.lastPos.y), (this.lastPos = Object.assign({}, e));
                    }
                }),
                e
            );
        })(),
        FPSDisplayUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.uiGroup = i), (this.root = t), (this.updateTimer = Timer.makeFromIntervalMs(500));
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "FPSDisplayUI";
                        },
                    },
                ]),
                (e.prototype.update = function () {
                    if (this.root.gameStarted)
                        for (; this.updateTimer.takeTick(this.root.time.nowConsistent, true);) {
                            var e = document.getElementById("fps_overlay");
                            if (!e) return;
                            if (this.root.settings.showFps) {
                                var t = "",
                                    i = this.root.time;
                                (t += Math.round(i.averageFPS()) + " FPS | "), (t += "max " + Math.round(i.maxFrameTime()) + " ms"), (e.innerHTML = t), (e.style.display = "block");
                            } else e.style.display = "none";
                        }
                }),
                e
            );
        })(),
        Visualizer = (function () {
            function e(t, i, a, o) {
                var n = o.height,
                    r = o.label,
                    s = void 0 === r ? null : r,
                    l = o.updateInterval,
                    u = o.consistent,
                    c = void 0 !== u && u;
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.height = n),
                    (this.offset = a),
                    (this.labelText = s),
                    (this.consistent = c),
                    (this.updateTimer = Timer.makeFromIntervalMs(l)),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.init();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "Visualizer";
                        },
                    },
                ]),
                (e.prototype.show = function () {
                    this.fixedGroup.visible = true;
                }),
                (e.prototype.hide = function () {
                    this.fixedGroup.visible = false;
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.fixedGroup = e.make.group()), (this.fixedGroup.fixedToCamera = true), this.uiGroup.add(this.fixedGroup), (this.group = e.make.group()), this.fixedGroup.add(this.group), this.group.position.setTo(0.5, 0.5);
                    var t = makeRoundedPanelBackground(e, Config.ui.visualizerWidth, this.height, Config.colors.ui.panelBackground, Config.colors.ui.panelAlpha);
                    if ((this.group.add(t), this.labelText)) {
                        var i = e.make.text(10, 10, this.labelText, { font: "11px Roboto", fontWeight: 700, fill: "#aaa" });
                        this.group.add(i);
                    }
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    e < 940 || t < 700 ? (this.group.visible = false) : ((this.group.visible = true), this.group.position.setTo(e - Config.ui.screenBorder - Config.ui.visualizerWidth, t - 260 - this.offset - this.height));
                }),
                (e.prototype.addHorizontalDivider = function (e) {
                    var t = this.root.phaser.make.graphics(Math.floor(e) + 0.5, 0);
                    t.lineStyle(1, pastellizeColor(Config.colors.ui.panelBackground, 0.06), 1), t.moveTo(0, 0), t.lineTo(0, this.height), this.group.add(t);
                }),
                (e.prototype.addVerticalDivider = function (e) {
                    var t = this.root.phaser.make.graphics(0, Math.floor(e) + 0.5);
                    t.lineStyle(1, pastellizeColor(Config.colors.ui.panelBackground, 0.06), 1), t.moveTo(0, 0), t.lineTo(Config.ui.visualizerWidth, 0), this.group.add(t);
                }),
                (e.prototype.doUpdate = function () {
                    throw new Error("abstract");
                }),
                (e.prototype.update = function () {
                    for (var e = this.consistent ? this.root.time.nowConsistent : this.root.time.now; this.updateTimer.takeTick(e, true);) this.doUpdate();
                }),
                e
            );
        })(),
        DefenseVisualizerUI = (function (e) {
            function t(i, a, o) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, { height: 40, updateInterval: 500, consistent: true }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DefenseVisualizerUI";
                        },
                    },
                ]),
                (t.prototype.tutorialGetCannonballsPosition = function () {
                    if (!this.group.visible) return null;
                    var e = this.barHandles.cannonballs.barBackground;
                    return [e.worldPosition.x + e.width / 2, e.worldPosition.y + e.height / 2 - 4];
                }),
                (t.prototype.init = function () {
                    var t = this;
                    e.prototype.init.call(this);
                    var i = this.root.phaser,
                        a = [
                            { label: tr("cannon"), id: "cannonballs", color: Config.colors.cannonball },
                            { label: tr("arrow"), id: "arrows", color: Config.colors.basicArrow },
                            { label: tr("lightning"), id: "power", color: Config.colors.power },
                        ];
                    this.barHandles = {};
                    var o = 10,
                        n = Math.round(Config.ui.visualizerWidth / a.length);
                    a.forEach(function (e, a) {
                        var r = e.label,
                            s = e.id,
                            l = e.color,
                            u = i.make.text(o, 10, r.toUpperCase(), { font: "10px Roboto", fill: "#" + pastellizeColor(l, 0.3).toString(16) });
                        t.group.add(u);
                        var c = makeRoundedPanelBackground(i, n - 20, 5, 15658734, 0.1);
                        c.position.setTo(o, 26), t.group.add(c);
                        var d = makeRoundedPanelBackground(i, n - 20, 5, pastellizeColor(l));
                        d.position.setTo(c.x, c.y), t.group.add(d), (t.barHandles[s] = { bar: d, text: u, barBackground: c }), 0 !== a && t.addHorizontalDivider(o - 10), (o += n);
                    });
                }),
                (t.prototype.doUpdate = function () {
                    for (var e = 0, t = 0, i = 0, a = 0, o = 0, n = 0, r = this.root.entityMgr.getAllEntitiesWithComponent(ProjectileShooterComponent), s = 0; s < r.length; ++s) {
                        var l = r[s].getComponent(StorageComponent);
                        (e += l.getResourceCount(BasicArrow.name)),
                            (t += l.getResourceLimit(BasicArrow.name)),
                            (i += l.getResourceCount(Cannonball.name)),
                            (a += l.getResourceLimit(Cannonball.name)),
                            (o += l.getResourceCount(Power.name)),
                            (n += l.getResourceLimit(Power.name));
                    }
                    (this.barHandles.arrows.bar.scale.x = e / Math.max(1, t)),
                        (this.barHandles.cannonballs.bar.scale.x = i / Math.max(1, a)),
                        (this.barHandles.power.bar.scale.x = o / Math.max(1, n)),
                        (this.barHandles.arrows.text.alpha = this.root.entityMgr.getAllEntitiesWithComponent(ArrowTowerComponent).length > 0 ? 1 : 0.3),
                        (this.barHandles.cannonballs.text.alpha = this.root.entityMgr.getAllEntitiesWithComponent(CannonTowerComponent).length > 0 ? 1 : 0.3),
                        (this.barHandles.power.text.alpha = this.root.entityMgr.getAllEntitiesWithComponent(LightningTowerComponent).length > 0 ? 1 : 0.3);
                }),
                t
            );
        })(Visualizer),
        GoldIncomeVisualizerUI = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(this, e.call(this, i, a, o, { height: 33, label: tr("crystals_per_sec").toUpperCase(), updateInterval: 500 }));
                return (n.lastGemCount = n.root.stats.gems), (n.gainAverage = 0), n.root.signals.gameLoadedAndStarted.add(n.doUpdate, n), n;
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GoldIncomeVisualizerUI";
                        },
                    },
                ]),
                (t.prototype.init = function () {
                    e.prototype.init.call(this),
                        (this.text = this.root.phaser.make.text(0, 0, "523", { font: "12px Roboto Mono", fontWeight: 700, fill: "#FF7777", align: "right", boundsAlignH: "right" })),
                        this.text.setTextBounds(0, 10, Config.ui.visualizerWidth - 10, 20),
                        this.group.add(this.text);
                }),
                (t.prototype.doUpdate = function () {
                    if (this.root.gamemode && this.root.gamemode.isSandbox()) return this.text.setText("-", true), void (this.group.visible = false);
                    var e = this.root.stats.gems,
                        t = Math.max(0, e - this.lastGemCount);
                    this.lastGemCount = e;
                    var i = t * this.updateTimer.getTicksPerSecond();
                    this.gainAverage = 0.94 * this.gainAverage + i * (1 - 0.94);
                    var a = formatBigNumber(Math.abs(this.gainAverage));
                    this.text.setText((this.gainAverage > -1 ? "" : "- ") + a, true);
                }),
                t
            );
        })(Visualizer),
        ResourceVisualizerUI = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(this, e.call(this, i, a, o, { height: 85, updateInterval: 100, consistent: true }));
                return (
                    (n.dirty = true),
                    n.root.signals.buildingPlaced.add(n.markDirty, n),
                    n.root.signals.buildingDestroyed.add(n.markDirty, n),
                    n.root.signals.buildingUpgraded.add(n.markDirty, n),
                    n.root.signals.gameReset.add(n.markDirty, n),
                    n
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ResourceVisualizerUI";
                        },
                    },
                ]),
                (t.prototype.markDirty = function () {
                    this.dirty = true;
                }),
                (t.prototype.init = function () {
                    var t = this;
                    e.prototype.init.call(this);
                    var i = this.root.phaser,
                        a = Config.ui.visualizerWidth,
                        o = i.make.group();
                    o.position.setTo(10, 10);
                    var n = Math.floor(a / 3),
                        r = 0,
                        s = 0;
                    (this.resourceIdToData = newEmptyMap()),
                        this.addHorizontalDivider(n),
                        this.addHorizontalDivider(2 * n),
                        this.addVerticalDivider(this.height / 2),
                        DISPLAY_RESOURCES.forEach(function (e) {
                            var a = e.title,
                                l = e.resourceClass,
                                u = e.color,
                                c = r * n,
                                d = s * Math.floor(t.height / 2),
                                h = i.make.image(c, d + 19, "atlas", "icon-equal.png");
                            h.anchor.setTo(0, 0.5), o.addChild(h);
                            var p = i.make.text(c, d, a.toUpperCase(), { font: "10px Roboto", fill: "#" + pastellizeColor(u, 0.3).toString(16) });
                            o.addChild(p);
                            var g = i.make.text(c + 15, d + 13, "0", { font: "10px Roboto Mono", fill: "#eee" });
                            o.addChild(g), (r += 1) >= 3 && ((r = 0), (s += 1)), (t.resourceIdToData[l.name] = { icon: h, text: g });
                        }),
                        this.group.add(o);
                }),
                (t.prototype.doUpdate = function () {
                    var e = this;
                    if (this.dirty) {
                        this.dirty = false;
                        for (var t = newEmptyMap(), i = this.root.entityMgr.getAllEntitiesWithComponent(ProcessorComponent), a = 0, o = i.length; a < o; ++a) {
                            var n = i[a].getComponent(ProcessorComponent);
                            for (var r in n.recipe) {
                                var s = n.recipe[r] * n.getProduceMaxPerSecondDisplay();
                                t[r] = (t[r] || 0) - s;
                            }
                            var l = n.getProduceMaxPerSecondDisplay() * n.produceAmount;
                            t[n.produceResourceId] = (t[n.produceResourceId] || 0) + l;
                        }
                        for (var u = this.root.entityMgr.getAllEntitiesWithComponent(ProjectileShooterComponent), c = 0, d = u.length; c < d; ++c) {
                            var h = u[c],
                                p = h.getComponent(ProjectileShooterComponent),
                                g = h.getComponent(StorageComponent);
                            if (p.consumeResource) {
                                var m = g.limits[p.consumeResource] / Config.dayDurationTotalSeconds;
                                t[p.consumeResource] = (t[p.consumeResource] || 0) - m;
                            }
                        }
                        DISPLAY_RESOURCES.forEach(function (i) {
                            var a = i.resourceClass.name,
                                o = e.resourceIdToData[a],
                                n = Math.round(t[a] || 0);
                            o.text.setText(formatBigNumber(Math.abs(n)), true),
                                0 === n
                                    ? (o.icon.loadTexture("atlas", "icon-equal.png"), (o.icon.tint = 8947848), (o.text.tint = 8947848))
                                    : n < 0
                                        ? (o.icon.loadTexture("atlas", "icon-visualizer-missingResources.png"), (o.icon.tint = 16777214), (o.text.tint = 16742263))
                                        : (o.icon.loadTexture("atlas", "icon-visualizer-goodResources.png"), (o.icon.tint = 16777214), (o.text.tint = 7864183));
                        });
                    }
                }),
                t
            );
        })(Visualizer),
        PauseOverlayUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.root.signals.gameFocusChanged.add(this.onFocusChanged, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PauseOverlayUI";
                        },
                    },
                ]),
                (e.prototype.onFocusChanged = function () {
                    this.root.gameStarted &&
                        (this.root.focus.isVisibleAndFocused() ? (document.getElementById("focus_lost_bg").style.display = "none") : Config.showLostFocus && (document.getElementById("focus_lost_bg").style.display = "flex"));
                }),
                e
            );
        })(),
        TimeUntilZombiesUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.init(), this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TimeUntilZombiesUI";
                        },
                    },
                ]),
                (e.prototype.onResolutionChanged = function () {
                    Config.mobileDevice ? this.panelGroup.position.setTo(Config.ui.screenBorder + 50, Config.ui.screenBorder + 65) : this.panelGroup.position.setTo(Config.ui.screenBorder + 95, Config.ui.screenBorder + 70);
                }),
                (e.prototype.tutorialGetPosition = function () {
                    var e = this.panelGroup.position;
                    return [e.x + 60, e.y + 30];
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    this.uiGroup.add((this.fixedGroup = e.make.group())),
                        (this.fixedGroup.fixedToCamera = true),
                        this.fixedGroup.add((this.panelGroup = e.make.group())),
                        (this.label = e.make.text(0, 0, "<label>", { font: Config.mobileDevice ? "11px Roboto" : "14px Roboto", fill: "#fff" })),
                        this.panelGroup.add(this.label),
                        (this.text = e.make.text(-3, Config.mobileDevice ? 12 : 15, "<x> s", { font: Config.mobileDevice ? "20px Roboto" : "35px Roboto", fill: "#fff" })),
                        this.panelGroup.add(this.text);
                }),
                (e.prototype.setDisplayParameters = function (e, t) {
                    if ((this.label.setText(e.toUpperCase(), true), t >= 60)) {
                        var i = Math.floor(t / 60),
                            a = t % 60;
                        this.text.setText(i + tr("minute_suffix") + " " + a.toString().padStart(2, "0") + tr("seconds_suffix"), true);
                    } else this.text.setText(t + tr("seconds_suffix"), true);
                    if (t <= 15) {
                        (this.root.time.now / 1e3) % 0.4 > 0.2 ? (this.text.tint = 16742263) : (this.text.tint = 16777214);
                    }
                }),
                (e.prototype.update = function () {
                    if (((this.panelGroup.visible = false), this.root.gamemode && this.root.gamemode.autoSpawnsZombies())) {
                        var e = this.root.daytime;
                        if (e.placedBaseAtTime && 0 === Config.startDay) {
                            var t = this.root.time.now - e.placedBaseAtTime,
                                i = Config.initialDayDurationAdditional + Config.dayDurationTotalSeconds - Config.nightDurationSeconds - t / 1e3,
                                a = Math.floor(i);
                            a > 0 && ((this.panelGroup.visible = true), this.setDisplayParameters(tr("first_zombie_wave_in"), a));
                        }
                        if (e.placedBaseAtTime && e.getDay() % GAME_BALANCING.bossInterval == 0 && !e.isNight() && e.getDay() > 1) {
                            this.panelGroup.visible = true;
                            var o = Math.floor(e.secondsUntilNight());
                            this.setDisplayParameters(tr("zombie_boss_in"), o);
                        }
                    }
                }),
                e
            );
        })(),
        LabelTooltip = (function () {
            function e(t, i, a, o) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.title = i),
                    (this.description = a),
                    (this.fadeAnimId = null),
                    (this.connectedElement = o),
                    this.init(),
                    (this.visibility = false),
                    (this.alignRight = false),
                    (this.alignBottom = false),
                    this.root.signals.consistentGameUpdate.add(this.checkVisibility, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "LabelTooltip";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    (this.group = this.root.phaser.make.group()), this.group.kill(), (this.label = this.root.phaser.make.text(0, 0, this.title.toUpperCase(), { font: Config.mobileDevice ? "11px Roboto" : "14px Roboto", fill: "#eee" }));
                    this.description
                        ? ((this.descriptionLabel = this.root.phaser.make.text(0, 23, this.description, {
                            font: Config.mobileDevice ? "10px Roboto" : "13px Roboto",
                            fill: "#999",
                            wordWrap: true,
                            wordWrapWidth: Config.mobileDevice ? 200 : 300,
                        })),
                            (this.descriptionLabel.lineSpacing = -3),
                            (this.background = makeRoundedPanelBackground(
                                this.root.phaser,
                                Math.max(this.label.width, this.descriptionLabel.width) + 20,
                                this.descriptionLabel.y + this.descriptionLabel.height + 20 - 8,
                                Config.colors.ui.panelBackground,
                                Config.colors.ui.panelAlpha
                            )),
                            this.group.add(this.background),
                            this.group.add(this.descriptionLabel),
                            (this.descriptionLabel.x = 10),
                            (this.descriptionLabel.y += 10))
                        : ((this.background = makeRoundedPanelBackground(this.root.phaser, this.label.width + 20, this.label.height + 20 - 8, Config.colors.ui.panelBackground, Config.colors.ui.panelAlpha)),
                            this.group.add(this.background)),
                        this.label.position.setTo(10),
                        this.group.add(this.label);
                }),
                (e.prototype.getWidth = function () {
                    return this.background.width;
                }),
                (e.prototype.getHeight = function () {
                    return this.background.height;
                }),
                (e.prototype.show = function () {
                    this.group.revive(), this.animLabel(1);
                }),
                (e.prototype.hide = function () {
                    var e = this;
                    this.group.alive &&
                        this.animLabel(0, function () {
                            return e.group.kill();
                        });
                }),
                (e.prototype.handle = function () {
                    return this.group;
                }),
                (e.prototype.checkVisibility = function () {
                    var e = window.mouseTracker.getPosition(),
                        t = false,
                        i = this.connectedElement.worldPosition;
                    (0 === i.x && 0 === i.y) ||
                        (e.x >= i.x && e.x <= i.x + this.connectedElement.width && e.y >= i.y && e.y <= i.y + this.connectedElement.height && (t = true),
                            this.root.dialogs.modalDialogIsOpen() && (t = false),
                            t !== this.visibility && (t ? ((this.root.phaser.canvas.style.cursor = "pointer"), this.show()) : ((this.root.phaser.canvas.style.cursor = "default"), this.hide()), (this.visibility = t)));
                }),
                (e.prototype.animLabel = function (e, t) {
                    var i = this;
                    this.labelFadeAnimId && this.root.animations.cancelById(this.labelFadeAnimId),
                        (this.group.alpha = 1 - e),
                        (this.labelFadeAnimId = this.root.animations
                            .animate(this.group)
                            .to({ alpha: e }, 80)
                            .onDone(function () {
                                (i.labelFadeAnimId = null), t && t();
                            })
                            .uiAnim()
                            .getId());
                }),
                e
            );
        })(),
        ccFixBaseMenuButton = Phaser.Group,
        MenuButton = (function (e) {
            function t(i) {
                var a = i.root,
                    o = i.spriteKey,
                    n = i.toggleable,
                    r = void 0 !== n && n,
                    s = i.title,
                    l = i.description,
                    u = i.keybinding,
                    c = void 0 === u ? null : u,
                    d = i.tooltipPosition,
                    h = void 0 === d ? "right" : d,
                    p = i.haveBadge,
                    g = void 0 !== p && p,
                    m = i.small,
                    _ = void 0 !== m && m,
                    f = i.bgColor,
                    b = void 0 === f ? null : f;
                _classCallCheck(this, t);
                var A = _possibleConstructorReturn(this, e.call(this, a.phaser, null, "menu-button-" + o));
                return (
                    (A.root = a),
                    (A.spriteKey = o),
                    (A.toggleable = r),
                    (A.title = s),
                    (A.description = l),
                    (A.keybinding = c),
                    (A.tooltipPosition = h),
                    (A.haveBadge = g),
                    (A.small = _),
                    (A.bgColor = b),
                    (A.dimensions = Config.mobileDevice ? 30 : 40),
                    A.small && (A.dimensions = 20),
                    (A.enabled = true),
                    A.init(),
                    A.initSignals(),
                    A
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MenuButton";
                        },
                    },
                ]),
                (t.prototype.hide = function () {
                    this.kill();
                }),
                (t.prototype.show = function () {
                    this.revive();
                }),
                (t.prototype.initSignals = function () {
                    var e = this;
                    (this.toggleable ? ((this.toggled = new Phaser.Signal()), (this.isToggled = false)) : (this.clicked = new Phaser.Signal()), this.keybinding) &&
                        this.root.keyboard.addKey(this.keybinding).onDown.add(function () {
                            e.handleClick();
                        });
                }),
                (t.prototype.setBadgeNumber = function (e) {
                    e <= 0 ? (this.badge.visible = false) : ((this.badge.visible = true), e > 99 && (e = 99), this.badgeText.setText(e, true));
                }),
                (t.prototype.handleClick = function () {
                    this.root.signals.uiActionPerformed.dispatch(this),
                        this.toggleable ? (this.setToggleState(!this.isToggled), this.toggled.dispatch(this.isToggled)) : this.clicked.dispatch();
                }),
                (t.prototype.setToggleState = function (e) {
                    (this.isToggled = e), this.isToggled ? (this.activeBackground.visible = true) : (this.activeBackground.visible = false);
                }),
                (t.prototype.setEnabled = function (e) {
                    (this.enabled = e), this.enabled ? (this.alpha = 1) : (this.alpha = 0.5);
                }),
                (t.prototype.setTexture = function (e) {
                    this.sprite.loadTexture("atlas", e);
                }),
                (t.prototype.init = function () {
                    var e = this,
                        t = this.root.phaser;
                    if (
                        ((this.buttonBackground = makeRoundedPanelBackground(t, this.dimensions, this.dimensions, 16777215, Config.colors.ui.panelAlpha)),
                            (this.buttonBackground.tint = this.bgColor || Config.colors.ui.panelBackground),
                            this.buttonBackground.enableInput(),
                            (this.buttonBackground.name = "MenuButton"),
                            this.add(this.buttonBackground),
                            this.toggleable && ((this.activeBackground = makeRoundedPanelBackground(t, this.dimensions, this.dimensions, Config.colors.ui.active, 1)), this.add(this.activeBackground), (this.activeBackground.visible = false)),
                            (this.sprite = t.make.image(0, 0, "atlas", this.spriteKey)),
                            this.sprite.anchor.setTo(0.5, 0.5),
                            this.sprite.position.setTo(this.dimensions / 2),
                            this.small ? this.sprite.scale.setTo(0.6 * this.sprite.scale.x) : Config.mobileDevice && this.sprite.scale.setTo(0.8 * this.sprite.scale.x),
                            this.add(this.sprite),
                            this.keybinding && !Config.mobileDevice)
                    ) {
                        var i = t.make.text(0, this.dimensions - 14, keyToString(this.keybinding), { font: "10px Roboto", fill: "#eee", align: "right", boundsAlignH: "right" });
                        i.setTextBounds(0, 0, this.dimensions - 5, 20), this.add(i);
                    }
                    if (this.haveBadge) {
                        (this.badge = makeRoundedPanelBackground(t, 22, 16, 2146659, 1, 12)),
                            this.badge.position.setTo(24, -5),
                            (this.badgeText = t.make.text(0, 1, "5", { fill: "#eee", font: "12px Roboto", align: "center", fontWeight: 700, boundsAlignH: "center" })),
                            this.badgeText.setTextBounds(0, 0, 22, 15),
                            this.add(this.badge),
                            this.badge.addChild(this.badgeText),
                            this.root.animations.animate(this.badge).uiAnim().to({ alpha: 0.7 }, 700).yojo();
                    }
                    (this.tooltip = new LabelTooltip(this.root, this.title, this.description, this.buttonBackground)),
                        this.add(this.tooltip.handle()),
                        this.setTooltipPosition(this.tooltipPosition),
                        this.buttonBackground.events.onInputDown.add(function () {
                            e.handleClick();
                        });
                }),
                (t.prototype.setTooltipPosition = function (e) {
                    this.tooltipPosition = e;
                    var t = this.tooltip.handle();
                    switch (this.tooltipPosition) {
                        case "right":
                            t.position.setTo(this.dimensions + 10, 0);
                            break;
                        case "bottom":
                            t.position.setTo(0, this.dimensions + 10);
                            break;
                        case "top":
                            t.position.setTo(this.dimensions - this.tooltip.getWidth(), -10 - this.tooltip.getHeight());
                            break;
                        case "left":
                            t.position.setTo(-this.tooltip.getWidth() - 10, this.dimensions - this.tooltip.getHeight());
                            break;
                        default:
                            throw new Error("Invalid position: " + e);
                    }
                }),
                t
            );
        })(ccFixBaseMenuButton),
        BaseViewUI = (function () {
            function e(t) {
                var i = t.root,
                    a = t.uiGroup,
                    o = t.index,
                    n = t.spriteKey,
                    r = t.title,
                    s = t.description,
                    l = t.keybinding;
                _classCallCheck(this, e),
                    (this.root = i),
                    (this.uiGroup = a),
                    (this.index = o),
                    (this.spriteKey = n),
                    (this.title = r),
                    (this.description = s),
                    (this.keybinding = l),
                    (this.active = false),
                    this.initButton(),
                    this.root.signals.viewSelected.add(this.onViewSelected, this),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BaseViewUI";
                        },
                    },
                ]),
                (e.prototype.hide = function () {
                    this.active && (console.log("[VIEW] deactivating because hidden"), (this.active = false), this.onDeactivated()), this.button.hide();
                }),
                (e.prototype.show = function () {
                    this.button.show();
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    var i = this.button.dimensions + 6;
                    if (e < 940) {
                        var a = 402 - (this.button.dimensions + this.index * i) + Config.ui.screenBorderTop,
                            o = e - Config.ui.screenBorder - this.button.dimensions;
                        this.button.setTooltipPosition("left"), Config.mobileDevice && ((a = 75 + (6.5 + this.index) * i), (o = Config.ui.screenBorder), this.button.setTooltipPosition("right")), this.button.cameraOffset.setTo(o, a);
                    } else {
                        var n = this.button.dimensions + this.index * i;
                        this.button.cameraOffset.setTo(e - Config.ui.screenBorder - n, t - this.button.dimensions - 205 - Config.ui.screenBorder), this.button.setTooltipPosition("top");
                    }
                }),
                (e.prototype.onViewSelected = function (e) {
                    this instanceof e || (this.button.isToggled && (console.log("[VIEW] Deactivated", this.title), this.button.setToggleState(false), (this.active = false), this.onDeactivated()));
                }),
                (e.prototype.onToggled = function (e) {
                    e
                        ? (console.log("[VIEW] Activated", this.title), this.root.signals.viewSelected.dispatch(this.constructor), (this.active = true), this.onActivated())
                        : (console.log("[VIEW] Deactivated", this.title), (this.active = false), this.onDeactivated());
                }),
                (e.prototype.initButton = function () {
                    (this.button = new MenuButton({ root: this.root, spriteKey: this.spriteKey, title: this.title, description: this.description, keybinding: this.keybinding, toggleable: true, tooltipPosition: "top" })),
                        (this.button.fixedToCamera = true),
                        this.button.cameraOffset.setTo(Config.ui.screenBorder, 120 + this.index * (this.button.dimensions + 6)),
                        this.button.toggled.add(this.onToggled, this),
                        this.uiGroup.add(this.button);
                }),
                (e.prototype.update = function () { }),
                (e.prototype.onActivated = function () { }),
                (e.prototype.onDeactivated = function () { }),
                e
            );
        })(),
        DefenseViewUI = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(
                    this,
                    e.call(this, { root: i, uiGroup: a, index: o, spriteKey: "view-defense.png", title: tr("defense_view"), description: tr("defense_view_desc"), keybinding: Config.keys.viewDefense })
                );
                return (
                    (n.group = n.root.groups.defensiveViewGroup),
                    (n.graphics = n.root.phaser.make.graphics()),
                    n.group.add(n.graphics),
                    n.root.signals.buildingDestroyed.add(n.maybeRedraw, n),
                    n.root.signals.buildingUpgraded.add(n.maybeRedraw, n),
                    n.root.signals.buildingPlaced.add(n.maybeRedraw, n),
                    n.root.signals.skillLeveledUp.add(n.maybeRedraw, n),
                    n
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "DefenseViewUI";
                        },
                    },
                ]),
                (t.prototype.maybeRedraw = function () {
                    this.active && this.generateGraphics();
                }),
                (t.prototype.onActivated = function () {
                    e.prototype.onActivated.call(this), (this.group.visible = true), this.graphics.revive(), this.generateGraphics();
                }),
                (t.prototype.generateGraphics = function () {
                    var e = this;
                    this.graphics.clear(),
                        this.graphics.beginFill(16777215, 0.1),
                        Config.logOverlayRedraws && console.log("[UI] Redrawing defense view"),
                        this.root.entityMgr.getAllEntitiesWithComponent(ProjectileShooterComponent).forEach(function (t) {
                            var i,
                                a = t.getComponent(ProjectileShooterComponent).radius * Config.tileSize;
                            e.graphics.beginFill(pastellizeColor(t.meta.getBackgroundColor(), 0.4), 0.08), (i = e.graphics).drawCircle.apply(i, _toConsumableArray(t.worldSpaceTileCenter()).concat([2 * a]));
                        });
                }),
                (t.prototype.onDeactivated = function () {
                    e.prototype.onDeactivated.call(this), (this.group.visible = false), this.graphics.clear(), this.graphics.kill();
                }),
                t
            );
        })(BaseViewUI),
        TransportViewUI = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(
                    this,
                    e.call(this, { root: i, uiGroup: a, index: o, spriteKey: "view-transport.png", title: tr("transport_view"), description: tr("transport_view_desc"), keybinding: Config.keys.viewTransport })
                );
                return (
                    (n.group = n.root.groups.transportViewGroup),
                    n.init(),
                    (n.dirty = true),
                    (n.currentHighlightedEntity = null),
                    n.root.signals.buildingPlaced.add(n.markDirty, n),
                    n.root.signals.buildingDestroyed.add(n.markDirty, n),
                    n.root.signals.consumerNetworkRecomputed.add(n.markDirty, n),
                    n
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TransportViewUI";
                        },
                    },
                ]),
                (t.prototype.init = function () {
                    (this.backgroundGroup = this.root.phaser.make.group()),
                        this.group.add(this.backgroundGroup),
                        (this.backgroundOverlay = makePanelBackground(this.root.phaser, Config.numTilesX * Config.tileSize, Config.numTilesY * Config.tileSize, 3685695, 0.7)),
                        this.backgroundGroup.add(this.backgroundOverlay),
                        (this.tileOverlay = makeTiled(this.root.phaser, Config.tileSize / 4, 0.5, 16777215, 0.1)),
                        this.backgroundGroup.add(this.tileOverlay),
                        this.backgroundGroup.kill(),
                        (this.graphics = this.root.phaser.make.graphics()),
                        this.group.add(this.graphics);
                }),
                (t.prototype.markDirty = function () {
                    this.dirty = true;
                }),
                (t.prototype.onActivated = function () {
                    e.prototype.onActivated.call(this), this.backgroundGroup.revive(), this.graphics.revive(), (this.currentHighlightedEntity = null), (this.dirty = true), this.generateGraphics();
                }),
                (t.prototype.onDeactivated = function () {
                    e.prototype.onDeactivated.call(this), this.graphics.clear(), this.graphics.kill(), this.backgroundGroup.kill(), (this.currentHighlightedEntity = null), (this.dirty = true);
                }),
                (t.prototype.transportIsPossible = function (e, t) {
                    return this.transportFromToIsPossible(e, t) || this.transportFromToIsPossible(t, e);
                }),
                (t.prototype.transportFromToIsPossible = function (e, t) {
                    return e.hasComponent(EmitterComponent) && t.hasComponent(TransporterComponent)
                        ? !(e instanceof Resource)
                        : !!(e.hasComponent(EmitterComponent) && t.hasComponent(ConsumerComponent) && t.getComponent(ConsumerComponent).canConsume(e.getComponent(EmitterComponent).resourceClass.name)) ||
                        !(!e.hasComponent(TransporterComponent) || !t.hasComponent(ConsumerComponent)) ||
                        !(!e.hasComponent(TransporterComponent) || !t.hasComponent(TransporterComponent));
                }),
                (t.prototype.drawEntityMarker = function (e) {
                    var t, i;
                    if (e instanceof WallBuilding) return this.graphics.beginFill(16777215, 0.5), void (t = this.graphics).drawCircle.apply(t, _toConsumableArray(e.worldSpaceTileCenter()).concat([10]));
                    this.shouldHighlightEntity(e) && (this.graphics.beginFill(16777215, 0.2), (i = this.graphics).drawCircle.apply(i, _toConsumableArray(e.worldSpaceTileCenter()).concat([Config.tileSize - 10])));
                    if (e.hasComponent(TransporterComponent)) {
                        var a;
                        this.graphics.beginFill(16777215), (a = this.graphics).drawCircle.apply(a, _toConsumableArray(e.worldSpaceTileCenter()).concat([10]));
                    } else {
                        var o, n;
                        this.graphics.beginFill(e.minimapColor), (o = this.graphics).drawCircle.apply(o, _toConsumableArray(e.worldSpaceTileCenter()).concat([Config.tileSize - Config.ui.buildingInnerSpace]));
                        var r = (n = this.root.phaser.make).image.apply(n, _toConsumableArray(e.worldSpaceTileCenter()).concat(["atlas", e.meta.getPreviewSpritePath()]));
                        r.anchor.setTo(0.5, 0.5), this.graphics.addChild(r);
                    }
                }),
                (t.prototype.processEntity = function (e) {
                    var t = this,
                        i = this.root.map.getUsedTilesArround({
                            tileX: e.getTileX(),
                            tileY: e.getTileY(),
                            radius: Config.radius.transporter,
                            condition: function (e) {
                                return e.hasComponent(TransporterComponent) || e.hasComponent(EmitterComponent) || e.hasComponent(ConsumerComponent);
                            },
                        }),
                        a = this.graphics;
                    a.lineStyle(3, 14540287, 0.5),
                        i.forEach(function (i) {
                            var o = i.entity;
                            t.transportIsPossible(e, o) && (a.moveTo.apply(a, _toConsumableArray(e.worldSpaceTileCenter())), a.lineTo.apply(a, _toConsumableArray(o.worldSpaceTileCenter())));
                        });
                }),
                (t.prototype.shouldHighlightEntity = function (e) {
                    return null !== this.currentHighlightedEntity && (e === this.currentHighlightedEntity || (!e.hasComponent(TransporterComponent) && this.transportIsPossible(e, this.currentHighlightedEntity)));
                }),
                (t.prototype.processEntityResourcePaths = function (e) {
                    var t = this,
                        i = e.getComponent(EmitterComponent);
                    if (i.precomputeConsumers) {
                        var a = this.shouldHighlightEntity(e);
                        i.precomputedPossibleConsumers.forEach(function (i) {
                            var o,
                                n,
                                r = i.entity,
                                s = i.stops;
                            (a && t.shouldHighlightEntity(r) ? t.graphics.lineStyle(4, e.minimapColor, 0.4) : t.graphics.lineStyle(4, 16777215, 0.05), s) &&
                                ((o = t.graphics).moveTo.apply(o, _toConsumableArray(e.worldSpaceTileCenter())),
                                    s.forEach(function (e) {
                                        var i;
                                        (i = t.graphics).lineTo.apply(i, _toConsumableArray(e.worldSpaceTileCenter()));
                                    }),
                                    (n = t.graphics).lineTo.apply(n, _toConsumableArray(r.worldSpaceTileCenter())));
                        });
                    }
                }),
                (t.prototype.checkForMouseOver = function () {
                    var e,
                        t = null,
                        i = getTileBelowCursor(this.root.phaser);
                    if ((e = this.root.map).isValidCoordinate.apply(e, _toConsumableArray(i))) {
                        var a,
                            o = (a = this.root.map).getTileContent.apply(a, _toConsumableArray(i));
                        if (o && !(o instanceof Resource)) {
                            var n = o.getComponent(ConsumerComponent),
                                r = o.getComponent(EmitterComponent);
                            (n || r) && (t = o);
                        }
                    }
                    t !== this.currentHighlightedEntity && ((this.dirty = true), (this.currentHighlightedEntity = t));
                }),
                (t.prototype.update = function () {
                    e.prototype.update.call(this), this.active && (this.checkForMouseOver(), this.generateGraphics());
                }),
                (t.prototype.generateGraphics = function () {
                    var e = this;
                    this.dirty &&
                        ((this.dirty = false),
                            this.graphics.clear(),
                            clearGroup(this.graphics),
                            (this.visitedEntities = {}),
                            Config.logOverlayRedraws && console.log("[UI] Redrawing transport view"),
                            this.root.entityMgr.getAllEntitiesWithComponent(EmitterComponent).forEach(function (t) {
                                e.processEntityResourcePaths(t);
                            }),
                            this.graphics.lineStyle(),
                            this.root.entityMgr.getAllEntitiesWithComponent(BuildingComponent).forEach(function (t) {
                                e.drawEntityMarker(t);
                            }));
                }),
                t
            );
        })(BaseViewUI);
        
        class BaseTutorialStep {
            constructor(...text) {
                this.text = text.map(e => tr(e)).join("<br /><br />");
            }
        
            getLinkedElement() {
                return null;
            }
        
            isEnabled(e) {
                const linkedElement = this.getLinkedElement(e);
                return !linkedElement || (linkedElement.tutorialGetPosition && linkedElement.tutorialGetPosition() !== null);
            }
        
            requiresArrowAction() {
                return false;
            }
        
            getArrowSize() {
                return 100;
            }
        
            hasNextButton() {
                return !this.requiresArrowAction();
            }
        
            getCameraYOffset() {
                return 0;
            }
        
            getCameraXOffset() {
                return 0;
            }
        
            hasAbortButton() {
                return true;
            }
        
            prepareStep() {}
        
            updateStep() {
                return true;
            }
        
            onStepFinished() {}
        
            getArrowPosition(e) {
                const linkedElement = this.getLinkedElement(e);
                return linkedElement ? linkedElement.tutorialGetPosition() : null;
            }
        }
        
        class BaseTutorialStepSelectInBuildingBar extends BaseTutorialStep {
            getBuildingClass() {
                throw new Error("abstract");
            }
        
            getArrowPosition(e) {
                return e.gui.uiBuildingsDisplay.tutorialGetPositionOf(this.getBuildingClass());
            }
        
            requiresArrowAction() {
                return true;
            }
        
            static get name() {
                return "BaseTutorialStepSelectInBuildingBar";
            }
        }
        
        class BaseTutorialStepClickOnTile extends BaseTutorialStep {
            getTile() {
                throw new Error("abstract");
            }
        
            requiresArrowAction() {
                return true;
            }
        
            getArrowPosition(e) {
                const tile = this.getTile(e);
                const worldPosition = tileToWorld(...tile);
                const cameraView = e.phaser.camera.view;
                const zoomLevel = e.zoom.currentZoomLevel;
                return [
                    (worldPosition[0] + Config.tileSize / 2) / zoomLevel - cameraView.x,
                    (worldPosition[1] + Config.tileSize / 2) / zoomLevel - cameraView.y,
                ];
            }
        
            static get name() {
                return "BaseTutorialStepClickOnTile";
            }
        }
        

        class BaseTutorialStepPlaceBuilding extends BaseTutorialStepClickOnTile {
            getBuildingClass() {
                throw new Error("abstract");
            }
        
            onStepFinished(root) {
                const tile = this.getTile(root);
                root.logic.tryPlaceBuilding({
                    building: BuildingRegistry.getMetaclassByClassHandle(this.getBuildingClass()),
                    position: { tileX: tile[0], tileY: tile[1] },
                });
                root.gameSystems.update();
            }
        
            static get name() {
                return "BaseTutorialStepPlaceBuilding";
            }
        }
        
        class BaseTutorialStepWaitLiveSeconds extends BaseTutorialStep {
            getSecondsToWait() {
                throw new Error("abstract");
            }
        
            hasNextButton() {
                return false;
            }
        
            requiresArrowAction() {
                return false;
            }
        
            prepareStep(e) {
                Config.gameTimeSpeedUpFactor = 1.5;
                this.startTime = e.time.now;
                document.getElementById("tutorial_time_bar").style.display = "block";
                document.getElementById("tutorial_time_bar_value").style.width = "0%";
            }
        
            updateStep(e) {
                const t = 1000 * this.getSecondsToWait();
                const i = (e.time.now - this.startTime) / t;
                document.getElementById("tutorial_time_bar_value").style.width = roundDecimals(100 * i, 3) + "%";
                return !(i >= 1) || (console.log("[TUTORIAL] Finishing timed step"), false);
            }
        
            onStepFinished() {
                document.getElementById("tutorial_time_bar").style.display = "none";
                Config.gameTimeSpeedUpFactor = 1e-11;
                console.log("[TUTORIAL] Reset speed");
            }
        
            static get name() {
                return "BaseTutorialStepWaitLiveSeconds";
            }
        }
        
        class BaseTutorialStepWaitCondition extends BaseTutorialStep {
            conditionIsFullfilled() {
                throw new Error("abstract");
            }
        
            hasNextButton() {
                return false;
            }
        
            requiresArrowAction() {
                return false;
            }
        
            prepareStep() {
                Config.gameTimeSpeedUpFactor = 1.5;
            }
        
            updateStep(e) {
                return !this.conditionIsFullfilled(e);
            }
        
            onStepFinished() {
                Config.gameTimeSpeedUpFactor = 1e-11;
                console.log("[TUTORIAL] Reset speed");
            }
        
            static get name() {
                return "BaseTutorialStepWaitCondition";
            }
        }
        
        class TutorialStepInitial extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_initial");
            }
        
            static get name() {
                return "TutorialStepInitial";
            }
        }
        
        class TutorialStepGameExplanation extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_game_explanation_1", "tutorial_step_game_explanation_2");
            }
        
            static get name() {
                return "TutorialStepGameExplanation";
            }
        }
        
        class TutorialStepShowGems extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_show_gems");
            }
        
            getLinkedElement(e) {
                return e.gui.uiStatDisplay;
            }
        
            getArrowSize() {
                return 150;
            }
        
            static get name() {
                return "TutorialStepShowGems";
            }
        }
        
        class TutorialStepMinimap extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_minimap_1", "tutorial_step_minimap_2");
            }
        
            static get name() {
                return "TutorialStepMinimap";
            }
        
            getLinkedElement(e) {
                return e.gui.uiMinimap;
            }
        
            getArrowSize() {
                return 200;
            }
        }
        
        class TutorialStepDayNight extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_day_night");
            }
        
            static get name() {
                return "TutorialStepDayNight";
            }
        
            getLinkedElement(e) {
                return e.gui.uiDayNight;
            }
        }
        
        class TutorialStepGameSpeed extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_game_speed_1", "tutorial_step_game_speed_2");
            }
        
            static get name() {
                return "TutorialStepGameSpeed";
            }
        
            getLinkedElement(e) {
                return e.gui.uiGameTimeButtons;
            }
        }
        
        class TutorialStepSelectBase extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super();
            }
        
            static get name() {
                return "TutorialStepSelectBase";
            }
        
            getBuildingClass() {
                return PlayerBaseMeta;
            }
        }
        
        class TutorialStepPlaceBase extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_base");
            }
        
            static get name() {
                return "TutorialStepPlaceBase";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2), Math.round(Config.numTilesY / 2)];
            }
        
            getBuildingClass() {
                return PlayerBaseMeta;
            }
        }
        
        class TutorialStepExplainZombieStart extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_explain_zombie_start");
            }
        
            static get name() {
                return "TutorialStepExplainZombieStart";
            }
        
            getLinkedElement(e) {
                return Config.mobileDevice ? null : e.gui.uiTimeUntilZombies;
            }
        
            getArrowSize() {
                return 150;
            }
        }
        
        class TutorialStepSelectGoldMine extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super();
            }
        
            static get name() {
                return "TutorialStepSelectGoldMine";
            }
        
            getBuildingClass() {
                return GoldMineMeta;
            }
        }
        
        class TutorialStepPlaceGoldMine extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_gold_mine_1", "tutorial_step_place_gold_mine_2");
            }
        
            static get name() {
                return "TutorialStepPlaceGoldMine";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2) - 2, Math.round(Config.numTilesY / 2)];
            }
        
            getBuildingClass() {
                return GoldMineMeta;
            }
        }
        
        class TutorialStepSelectGoldMine2 extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super("tutorial_step_select_second_gold_mine_1", "tutorial_step_select_second_gold_mine_2");
            }
        
            static get name() {
                return "TutorialStepSelectGoldMine2";
            }
        
            getBuildingClass() {
                return GoldMineMeta;
            }
        }
        
        class TutorialStepPlaceGoldMine2 extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_second_gold_mine");
            }
        
            static get name() {
                return "TutorialStepPlaceGoldMine2";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2) - 3, Math.round(Config.numTilesY / 2) + 1];
            }
        
            getBuildingClass() {
                return GoldMineMeta;
            }
        }
        
        class TutorialStepSelectIronMine extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super("tutorial_step_select_iron_mine_1", "tutorial_step_select_iron_mine_2");
            }
        
            static get name() {
                return "TutorialStepSelectIronMine";
            }
        
            getBuildingClass() {
                return IronMineMeta;
            }
        }
        
        class TutorialStepPlaceIronMine extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_iron_mine");
            }
        
            static get name() {
                return "TutorialStepPlaceIronMine";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2) + 2, Math.round(Config.numTilesY / 2) - 1];
            }
        
            getBuildingClass() {
                return IronMineMeta;
            }
        }
        
        class TutorialStepSelectCannonballProducer extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super("tutorial_step_select_cannonball_producer_1", "tutorial_step_select_cannonball_producer_2");
            }
        
            static get name() {
                return "TutorialStepSelectCannonballProducer";
            }
        
            getBuildingClass() {
                return CannonballProducerMeta;
            }
        }
        
        class TutorialStepPlaceCannonballProducer extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_cannonball_producer_1", "tutorial_step_place_cannonball_producer_2");
            }
        
            static get name() {
                return "TutorialStepPlaceCannonballProducer";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2), Math.round(Config.numTilesY / 2) + 2];
            }
        
            getBuildingClass() {
                return CannonballProducerMeta;
            }
        }
        
        class TutorialStepSelectFirstTransporter extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super("tutorial_step_select_first_transporter_1", "tutorial_step_select_first_transporter_2");
            }
        
            static get name() {
                return "TutorialStepSelectFirstTransporter";
            }
        
            getBuildingClass() {
                return TransporterMeta;
            }
        }
        
        class TutorialStepPlaceFirstTransporter extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_first_transporter_1", "tutorial_step_place_first_transporter_2");
            }
        
            static get name() {
                return "TutorialStepPlaceFirstTransporter";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2) + 2, Math.round(Config.numTilesY / 2) + 1];
            }
        
            getBuildingClass() {
                return TransporterMeta;
            }
        }
        
        class TutorialStepSelectCannon extends BaseTutorialStepSelectInBuildingBar {
            constructor() {
                super("tutorial_step_select_cannon");
            }
        
            static get name() {
                return "TutorialStepSelectCannon";
            }
        
            getBuildingClass() {
                return CannonMeta;
            }
        }
        
        class TutorialStepPlaceCannon extends BaseTutorialStepPlaceBuilding {
            constructor() {
                super("tutorial_step_place_cannon_1", "tutorial_step_place_cannon_2", "tutorial_step_place_cannon_3");
            }
        
            static get name() {
                return "TutorialStepPlaceCannon";
            }
        
            getTile() {
                return [Math.round(Config.numTilesX / 2) - 1, Math.round(Config.numTilesY / 2) + 1];
            }
        
            getBuildingClass() {
                return CannonMeta;
            }
        }
        
        class TutorialStepWaitForProduction extends BaseTutorialStepWaitLiveSeconds {
            constructor() {
                super("tutorial_step_wait_for_production_1");
            }
        
            static get name() {
                return "TutorialStepWaitForProduction";
            }
        
            getSecondsToWait() {
                return 20;
            }
        }
        
        class TutorialStepSpawnZombies extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_spawn_zombies");
            }
        
            static get name() {
                return "TutorialStepSpawnZombies";
            }
        
            prepareStep(e) {
                e.time.placedBaseAtTime = 0;
                e.time.reset();
                e.daytime.update();
                e.gui.update();
            }
        }
        
        class TutorialStepWatchZombiesDie extends BaseTutorialStepWaitCondition {
            constructor() {
                super("tutorial_step_watch_zombies_die");
            }
        
            static get name() {
                return "TutorialStepWatchZombiesDie";
            }
        
            conditionIsFullfilled(e) {
                return this.zombiesDiedAt
                    ? e.time.now - this.zombiesDiedAt > 2000
                    : this.anyZombiesSeen
                    ? e.entityMgr.getAllEntitiesWithComponent(EnemyAIComponent).length === 0 && (this.zombiesDiedAt = e.time.now)
                    : e.entityMgr.getAllEntitiesWithComponent(EnemyAIComponent).length > 0 && (this.anyZombiesSeen = true);
            }
        }
        
        class TutorialStepZombiesDied extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_zombies_died_1", "tutorial_step_zombies_died_2");
            }
        
            static get name() {
                return "TutorialStepZombiesDied";
            }
        }
        
        class TutorialStepShowBaseTooltip extends BaseTutorialStepClickOnTile {
            constructor() {
                if (Config.mobile) {
                    super("tutorial_step_show_base_tooltip_2", "tutorial_step_show_base_tooltip_3");
                } else {
                    super("tutorial_step_show_base_tooltip_1", "tutorial_step_show_base_tooltip_2", "tutorial_step_show_base_tooltip_3");
                }
            }
        
            static get name() {
                return "TutorialStepShowBaseTooltip";
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        
            onStepFinished(e) {
                const t = e.logic.getPlayerBase();
                if (!t) throw new Error("no base");
                e.gui.uiBuildingTooltip.showTooltip(t);
                e.gui.update();
            }
        
            getTile() {
                return [Config.numTilesX / 2, Config.numTilesY / 2];
            }
        }
        
        class TutorialStepExplainTooltipLevel extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_explain_tooltip_level_1", "tutorial_step_explain_tooltip_level_2");
            }
        
            static get name() {
                return "TutorialStepExplainTooltipLevel";
            }
        
            isEnabled() {
                return !Config.mobileDevice;
            }
        
            getArrowPosition(e) {
                return e.gui.uiBuildingTooltip.tutorialGetLevelTextPosition();
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        }
        
        class TutorialStepExplainTooltipStats extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_explain_tooltip_stats");
            }
        
            static get name() {
                return "TutorialStepExplainTooltipStats";
            }
        
            getArrowPosition(e) {
                return e.gui.uiBuildingTooltip.tutorialGetStatisticsPosition();
            }
        
            getArrowSize() {
                return 140;
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        }
        
        class TutorialStepUgradeBase extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_upgrade_base");
            }
        
            static get name() {
                return "TutorialStepUgradeBase";
            }
        
            hasNextButton() {
                return false;
            }
        
            getArrowPosition(e) {
                return e.gui.uiBuildingTooltip.tutorialGetUpgradeButtonPosition();
            }
        
            requiresArrowAction() {
                return true;
            }
        
            onStepFinished(e) {
                e.gui.uiBuildingTooltip.tryUpgrade();
                e.gui.update();
                e.gui.uiStatDisplay.doUpdate();
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        }
        
        class TutorialStepShowGoldMineTooltip extends BaseTutorialStepClickOnTile {
            constructor() {
                super("tutorial_step_show_gold_mine_tooltip_1", "tutorial_step_show_gold_mine_tooltip_2");
            }
        
            static get name() {
                return "TutorialStepShowGoldMineTooltip";
            }
        
            getCameraXOffset() {
                return goldMineXOffset;
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        
            onStepFinished(e) {
                let i = e.map.getTileContent(...this.getTile());
                if (!i) throw new Error("no mine");
                e.gui.uiBuildingTooltip.showTooltip(i);
                e.gui.update();
            }
        
            getTile() {
                return [Config.numTilesX / 2 - 2, Config.numTilesY / 2];
            }
        }
        
        class TutorialStepUpgradeAllGoldMinesPressShift extends BaseTutorialStepWaitCondition {
            constructor() {
                super("tutorial_step_upgrade_all_gold_mines_press_shift_1", "tutorial_step_upgrade_all_gold_mines_press_shift_2");
            }
        
            static get name() {
                return "TutorialStepUpgradeAllGoldMinesPressShift";
            }
        
            isEnabled() {
                return !Config.mobileDevice;
            }
        
            prepareStep() {
                let e = this;
                let t = null;
                t = function (i) {
                    if (i.shiftKey) {
                        e.shiftDown = true;
                        window.removeEventListener("keydown", t, false);
                    }
                };
                window.addEventListener("keydown", t, false);
            }
        
            conditionIsFullfilled(e) {
                return this.shiftDown;
            }
        
            onStepFinished(e) {
                e.gui.uiBuildingTooltip.forceUpgradeAll = true;
            }
        
            getCameraXOffset() {
                return goldMineXOffset;
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        }
        
        class TutorialStepPerformUpgradeOnAllGoldMines extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_perform_upgrade_on_all_gold_mines_1", "tutorial_step_perform_upgrade_on_all_gold_mines_2");
            }
        
            static get name() {
                return "TutorialStepPerformUpgradeOnAllGoldMines";
            }
        
            hasNextButton() {
                return false;
            }
        
            requiresArrowAction() {
                return true;
            }
        
            isEnabled() {
                return !Config.mobileDevice;
            }
        
            getArrowPosition(e) {
                return e.gui.uiBuildingTooltip.tutorialGetUpgradeButtonPosition();
            }
        
            onStepFinished(e) {
                e.gui.uiBuildingTooltip.tryUpgrade();
                e.gui.uiBuildingTooltip.hideTooltip();
                e.gui.update();
                e.gui.uiBuildingTooltip.forceUpgradeAll = false;
                e.gui.uiStatDisplay.doUpdate();
            }
        
            getCameraXOffset() {
                return goldMineXOffset;
            }
        
            getCameraYOffset() {
                return buildingTooltipYOffset;
            }
        }
        
        class TutorialStepFinished extends BaseTutorialStep {
            constructor() {
                super("tutorial_step_finished");
            }
        
            static get name() {
                return "TutorialStepFinished";
            }
        
            hasAbortButton() {
                return false;
            }
        }
        

        class TutorialUI {
            constructor(root, uiGroup) {
                this.root = root;
                this.uiGroup = uiGroup;
                this.currentStepIndex = 0;
                this.abortRequested = false;
                this.currentCameraXOffs = 0;
                this.currentCameraYOffs = 0;
        
                this.root.signals.gameLoadedAndStarted.add(this.startTutorial, this);
            }
        
            static get name() {
                return "TutorialUI";
            }
        
            nextStep() {
                if (this.currentStepIndex !== 0) {
                    this.getCurrentStepInstance().onStepFinished(this.root);
                }
        
                this.currentStepIndex += 1;
        
                if (this.currentStepIndex >= TUTORIAL_STEPS.length) {
                    this.finishTutorial();
                } else {
                    const currentStep = this.getCurrentStepInstance();
        
                    if (currentStep.isEnabled(this.root)) {
                        currentStep.prepareStep(this.root);
                        this.renderStep();
                    } else {
                        console.warn("[TUTORIAL] Skipping step", currentStep.constructor.name, "because it's not enabled or visible");
                        this.nextStep();
                    }
                }
            }
        
            getCurrentStepInstance() {
                return this.currentStepIndex < TUTORIAL_STEPS.length ? TUTORIAL_STEPS[this.currentStepIndex] : null;
            }
        
            finishTutorial() {
                console.log("[TUTORIAL] Finished");
                document.getElementById("tutorial_bg").remove();
                Config.gameTimeSpeedUpFactor = 1;
                Config.tutorialActive = false;
                this.root.keyboard.start();
        
                this.root.signals.gameSizeChanged.remove(this.onResolutionChanged, this);
                this.root.signals.gameLoadedAndStarted.remove(this.startTutorial, this);
                this.root.signals.consistentGameUpdate.remove(this.update, this);
                window.removeEventListener("keydown", this.keyboardHandler, true);
            }
        
            startTutorial() {
                if (Config.tutorialActive) {
                    console.log("[TUTORIAL] Starting");
                    this.root.stats.gems = 1500;
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this);
                    this.root.signals.consistentGameUpdate.add(this.update, this);
                    Config.gameTimeSpeedUpFactor = 1e-11;
                    this.root.keyboard.stop();
                    this.init();
                    document.getElementById("tutorial_bg").classList.add("visible_dialog");
                    this.keyboardHandler = function (e) {
                        0;
                    };
                    window.addEventListener("keydown", this.keyboardHandler, true);
                }
            }
        
            renderStep() {
                const currentStep = this.getCurrentStepInstance();
        
                if (currentStep) {
                    document.getElementById("tutorial_next_text").innerHTML = currentStep.text;
                    if (this.currentStepIndex === TUTORIAL_STEPS.length - 1) {
                        document.getElementById("next_tutorial_btn").innerText = tr("tutorial_finish");
                    }
        
                    this.updateArrowPosition();
        
                    if (currentStep.requiresArrowAction()) {
                        document.getElementById("tutorial_arrow").classList.add("clickable");
                    } else {
                        document.getElementById("tutorial_arrow").classList.remove("clickable");
                    }
        
                    if (currentStep.hasNextButton()) {
                        document.getElementById("next_tutorial_btn").style.display = "inline-block";
                    } else {
                        document.getElementById("next_tutorial_btn").style.display = "none";
                    }
        
                    if (currentStep.hasAbortButton()) {
                        document.getElementById("abort_tutorial_btn").style.display = "block";
                    } else {
                        document.getElementById("abort_tutorial_btn").style.display = "none";
                    }
                } else {
                    console.error("[TUTORIAL] Invalid instance handle:", this.currentStepIndex);
                }
            }
        
            updateArrowPosition() {
                const currentStep = this.getCurrentStepInstance();
                const arrowPosition = currentStep.getArrowPosition(this.root);
                const arrow = document.getElementById("tutorial_arrow");
        
                if (arrowPosition) {
                    arrow.style.display = "block";
                    arrow.style.left = Math.floor(arrowPosition[0]) + "px";
                    arrow.style.top = Math.floor(arrowPosition[1]) + "px";
                    const arrowSize = currentStep.getArrowSize();
                    arrow.style.width = arrowSize + "px";
                    arrow.style.height = arrowSize + "px";
                    arrow.style.marginLeft = Math.round(-arrowSize / 2 - 4) + "px";
                    arrow.style.marginTop = Math.round(-arrowSize / 2 - 4) + "px";
                } else {
                    arrow.style.display = "none";
                }
            }
        
            resetTutorialButtons() {
                this.abortRequested = false;
                try {
                    document.getElementById("abort_tutorial_btn").innerText = tr("tutorial_abort");
                } catch (e) {}
            }
        
            init() {
                this.resetTutorialButtons();
                this.renderStep();
                
                window.tutorialNextStep = () => {
                    this.root.signals.uiActionPerformed.dispatch();
                    this.resetTutorialButtons();
                    this.nextStep();
                };
        
                window.stopTutorial = () => {
                    if (this.abortRequested) {
                        this.finishTutorial();
                        this.root.stats.gems = 100;
                    } else {
                        this.abortRequested = true;
                        document.getElementById("abort_tutorial_btn").innerText = tr("tutorial_confirm_abort");
                        setTimeout(() => this.resetTutorialButtons(), 2000);
                    }
                    this.root.signals.uiActionPerformed.dispatch();
                };
        
                window.tutorialArrowClicked = () => {
                    console.log("[TUTORIAL] Clicked arrow");
                    const currentStep = this.getCurrentStepInstance();
        
                    if (currentStep && currentStep.requiresArrowAction()) {
                        this.nextStep();
                        this.root.signals.uiActionPerformed.dispatch();
                    }
                };
            }
        
            onResolutionChanged() {
                const currentStep = this.getCurrentStepInstance();
        
                if (currentStep) {
                    setTimeout(() => this.renderStep(), 0);
                } else {
                    console.error("[TUTORIAL] Invalid callback #1");
                }
            }
        
            updateCamera() {
                const currentStep = this.getCurrentStepInstance();
        
                if (currentStep) {
                    this.currentCameraXOffs = 0.96 * this.currentCameraXOffs + currentStep.getCameraXOffset() * (1 - 0.96);
                    this.currentCameraYOffs = 0.96 * this.currentCameraYOffs + currentStep.getCameraYOffset() * (1 - 0.96);
        
                    const camera = this.root.phaser.camera;
                    const zoomLevel = this.root.zoom.currentZoomLevel;
                    camera.focusOnXY(
                        ((Config.numTilesX / 2) * Config.tileSize + this.currentCameraXOffs) / zoomLevel,
                        ((Config.numTilesX / 2) * Config.tileSize + this.currentCameraYOffs) / zoomLevel
                    );
        
                    this.updateArrowPosition();
                } else {
                    console.error("[TUTORIAL] Invalid callback #2");
                }
            }
        
            update() {
                const currentStep = this.getCurrentStepInstance();
        
                if (currentStep) {
                    if (currentStep.updateStep(this.root)) {
                        this.nextStep();
                    }
        
                    this.updateCamera();
                }
            }
        }
        
        const ProcessorUsageViewUI = (function (e) {
            function t(i, a, o) {
                _classCallCheck(this, t);
                var n = _possibleConstructorReturn(
                    this,
                    e.call(this, { root: i, uiGroup: a, index: o, spriteKey: "view-processor_usage.png", title: tr("processor_usage_view"), description: tr("processor_usage_view_desc"), keybinding: Config.keys.viewProcessorUsage })
                );
                return (
                    (n.group = n.root.groups.processorUsageViewGroup),
                    n.init(),
                    (n.redrawTimer = Timer.makeFromIntervalMs(250)),
                    n.root.signals.buildingDestroyed.add(n.maybeRedraw, n),
                    n.root.signals.buildingUpgraded.add(n.maybeRedraw, n),
                    n.root.signals.buildingPlaced.add(n.maybeRedraw, n),
                    n
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ProcessorUsageViewUI";
                        },
                    },
                ]),
                (t.prototype.init = function () {
                    (this.backgroundGroup = this.root.phaser.make.group()),
                        this.group.add(this.backgroundGroup),
                        (this.bgFixedGroup = this.root.phaser.make.group()),
                        (this.bgFixedGroup.fixedToCamera = true),
                        this.backgroundGroup.add(this.bgFixedGroup),
                        (this.backgroundOverlay = makePanelBackground(this.root.phaser, Config.numTilesX * Config.tileSize, Config.numTilesY * Config.tileSize, 3685695, 0.7)),
                        this.backgroundGroup.add(this.backgroundOverlay),
                        (this.tileOverlay = makeTiled(this.root.phaser, Config.tileSize / 4, 0.5, 16777215, 0.1)),
                        this.backgroundGroup.add(this.tileOverlay),
                        this.backgroundGroup.kill(),
                        this.backgroundGroup.kill(),
                        (this.graphics = this.root.phaser.make.graphics()),
                        this.group.add(this.graphics);
                }),
                (t.prototype.maybeRedraw = function () {
                    this.active && this.generateGraphics();
                }),
                (t.prototype.onActivated = function () {
                    e.prototype.onActivated.call(this), this.graphics.revive(), this.graphics.clear(), this.backgroundGroup.revive(), this.generateGraphics();
                }),
                (t.prototype.onDeactivated = function () {
                    e.prototype.onDeactivated.call(this), this.backgroundGroup.kill(), this.graphics.clear(), this.graphics.kill();
                }),
                (t.prototype.generateGraphics = function () {
                    this.graphics.clear(), clearGroup(this.graphics), this.graphics.beginFill(16777215, 0.1), Config.logOverlayRedraws && console.log("[UI] Redrawing processor usage view");
                    for (var e = this.root.entityMgr.getAllEntitiesWithComponent(ProcessorComponent), t = 0, i = e.length; t < i; ++t) {
                        var a,
                            o,
                            n = e[t];
                        if (n.visible) {
                            var r = n.getComponent(ProcessorComponent),
                                s = Math.max(0, Math.min(1, r.getProductionUsagePercentage())),
                                l = pastellizeColor((Math.round(255 * (1 - s)) << 16) | (Math.round(255 * s) << 8) | 17, 0.2),
                                u = Config.tileSize - 2 * Config.ui.buildingOuterSpace;
                            this.graphics.lineStyle(4, l, 0.7), this.graphics.beginFill(l, 0.3), (a = this.graphics).drawCircle.apply(a, _toConsumableArray(n.worldSpaceTileCenter()).concat([u])), this.graphics.endFill();
                            var c = (o = this.root.phaser.make).image.apply(o, _toConsumableArray(n.worldSpaceTileCenter()).concat(["atlas", n.meta.getPreviewSpritePath()]));
                            c.anchor.setTo(0.5, 0.5), this.graphics.addChild(c);
                        }
                    }
                }),
                (t.prototype.update = function () {
                    for (e.prototype.update.call(this); this.redrawTimer.takeTick(this.root.time.now, true);) this.active && this.generateGraphics();
                }),
                t
            );
        })(BaseViewUI),
        GameTimeButton = (function () {
            function e(t) {
                var i = t.root,
                    a = t.parentGroup,
                    o = t.spriteKey,
                    n = t.title,
                    r = t.description,
                    s = t.spriteXOffs,
                    l = void 0 === s ? 0 : s;
                _classCallCheck(this, e),
                    (this.root = i),
                    (this.parentGroup = a),
                    (this.spriteKey = o),
                    (this.title = n),
                    (this.description = r),
                    (this.spriteXOffs = l),
                    (this.clicked = new Phaser.Signal()),
                    this.init(),
                    this.initTooltip();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameTimeButton";
                        },
                    },
                ]),
                (e.prototype.handle = function () {
                    return this.group;
                }),
                (e.prototype.activate = function () {
                    this.sprite.tint = Config.colors.ui.active;
                }),
                (e.prototype.deactivate = function () {
                    this.sprite.tint = 16777214;
                }),
                (e.prototype.init = function () {
                    var e = this,
                        t = this.root.phaser;
                    this.group = t.make.group();
                    var i = Config.mobileDevice ? 28 : 38,
                        a = Config.mobileDevice ? 30 : 40;
                    (this.clickCatcher = makePanelBackground(t, i, a, 16777215, 0.001)),
                        this.group.add(this.clickCatcher),
                        this.clickCatcher.enableInput(),
                        (this.clickCatcher.name = "GameTimeButtons"),
                        this.clickCatcher.events.onInputDown.add(function () {
                            e.clicked.dispatch();
                        }),
                        (this.sprite = t.make.image(0, 0, "atlas", this.spriteKey)),
                        this.sprite.anchor.setTo(0.5, 0.5),
                        this.sprite.position.setTo(i / 2 + this.spriteXOffs, a / 2),
                        this.group.add(this.sprite),
                        this.parentGroup.add(this.group),
                        this.deactivate();
                }),
                (e.prototype.initTooltip = function () {
                    (this.tooltip = new LabelTooltip(this.root, this.title, this.description, this.clickCatcher)), this.tooltip.handle().position.setTo(0, Config.mobileDevice ? 40 : 50), this.group.add(this.tooltip.handle());
                }),
                e
            );
        })(),
        GameTimeButtonsUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    this.init(),
                    this.initKeybinding(),
                    (this.currentHintAnimId = null),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.root.signals.nightEntered.add(this.onNightStarted, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameTimeButtonsUI";
                        },
                    },
                ]),
                (e.prototype.onNightStarted = function () {
                    this.root.settings.disableFastForwardAtNight && Config.gameTimeSpeedUpFactor > 1 && this.requestRegularSpeed();
                }),
                (e.prototype.onResolutionChanged = function (e) {
                    if ((this.panelGroup.position.setTo(e / 2, 150), (this.buttonGroup.position.y = Config.ui.screenBorderTop), (this.buttonGroup.position.x = Config.ui.screenBorder + 95), e < 650)) {
                        var t = Config.mobileDevice ? 85 : 117;
                        this.buttonGroup.position.x = e - t - Config.ui.screenBorder;
                    }
                }),
                (e.prototype.tutorialGetPosition = function () {
                    var e = this.buttonGroup.position;
                    return [e.x + 55, e.y + 20];
                }),
                (e.prototype.isBossAlive = function () {
                    return this.root.entityMgr.getAllEntitiesWithComponent(BossComponent).length > 0;
                }),
                (e.prototype.isBasePlaced = function () {
                    return this.root.logic.playerHasPlacedBase();
                }),
                (e.prototype.update = function () {
                    this.root.daytime.isNight() && Config.gameTimeSpeedUpFactor < 1
                        ? Config.tutorialActive
                        : this.isBossAlive() && Config.gameTimeSpeedUpFactor >= 1 && this.root.settings.disableFastForwardDuringBoss && this.requestRegularSpeed();
                }),
                (e.prototype.initKeybinding = function () {
                    var e = this;
                    this.root.keyboard.addKey(Config.keys.fastForward).onDown.add(function () {
                        return e.toggleFastForward();
                    }),
                        this.root.keyboard.addKey(Config.keys.pause).onDown.add(function () {
                            return e.togglePause();
                        });
                }),
                (e.prototype.showNotAvailableHint = function (e) {
                    this.root.gui.uiNotifications.showError(e);
                }),
                (e.prototype.togglePause = function () {
                    Config.gameTimeSpeedUpFactor < 0.01 ? this.requestRegularSpeed() : this.requestPause();
                }),
                (e.prototype.toggleFastForward = function () {
                    Config.gameTimeSpeedUpFactor > 1 ? this.requestRegularSpeed() : this.reqeustFastForward();
                }),
                (e.prototype.clearActiveState = function () {
                    this.buttonSpeedFast.deactivate(), this.buttonSpeedRegular.deactivate(), this.buttonSpeedPause.deactivate();
                }),
                (e.prototype.requestPause = function () {
                    return (
                        !Config.tutorialActive &&
                        (this.isBasePlaced()
                            ? ((Config.gameTimeSpeedUpFactor = 1e-12), this.setTimeIndicator("icon-pause.png", 700), this.clearActiveState(), this.buttonSpeedPause.activate(), true)
                            : (this.showNotAvailableHint(tr("pause_not_possible_before_base")), false))
                    );
                }),
                (e.prototype.requestRegularSpeed = function () {
                    return !Config.tutorialActive && ((Config.gameTimeSpeedUpFactor = 1), this.clearTimeIndicator(), this.clearActiveState(), this.buttonSpeedRegular.activate(), true);
                }),
                (e.prototype.reqeustFastForward = function () {
                    return (
                        !Config.tutorialActive &&
                        (this.isBossAlive() && this.root.settings.disableFastForwardDuringBoss
                            ? (this.showNotAvailableHint(tr("fastforward_disabled_while_boss")), this.requestRegularSpeed(), false)
                            : this.isBasePlaced()
                                ? ((Config.gameTimeSpeedUpFactor = Config.fastForwardSpeed), this.setTimeIndicator("icon-fast-forward.png", 150), this.clearActiveState(), this.buttonSpeedFast.activate(), true)
                                : (this.showNotAvailableHint(tr("fastforward_not_possible_before_base")), this.requestRegularSpeed(), false))
                    );
                }),
                (e.prototype.setTimeIndicator = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
                    this.icon.loadTexture("atlas", e),
                        (this.panelGroup.visible = true),
                        this.currentIconAnimId && this.root.animations.cancelById(this.currentIconAnimId),
                        (this.panelGroup.alpha = 1),
                        (this.currentIconAnimId = this.root.animations.animate(this.panelGroup).to({ alpha: 0.3 }, t).yojo().uiAnim().getId());
                }),
                (e.prototype.clearTimeIndicator = function () {
                    this.panelGroup.visible = false;
                }),
                (e.prototype.makeButtons = function () {
                    var e = this;
                    (this.buttonGroup = this.root.phaser.make.group()), this.fixedGroup.add(this.buttonGroup);
                    var t = Config.mobileDevice ? 28 : 38,
                        i = Config.mobileDevice ? 30 : 40,
                        a = makeRoundedPanelBackground(this.root.phaser, 3 * t, i, Config.colors.ui.panelBackground, Config.colors.ui.panelAlpha);
                    this.buttonGroup.add(a),
                        (this.buttonSpeedPause = new GameTimeButton({ root: this.root, parentGroup: this.buttonGroup, spriteKey: "icon-pause-button.png", title: tr("pause_game"), description: tr("pause_game_desc") })),
                        this.buttonSpeedPause.clicked.add(function () {
                            e.requestPause() ? e.root.signals.uiActionPerformed.dispatch(e) : e.root.signals.uiActionPerformedAndFailed.dispatch(e);
                        }, this),
                        (this.buttonSpeedRegular = new GameTimeButton({
                            root: this.root,
                            parentGroup: this.buttonGroup,
                            spriteKey: "icon-regular-speed-button.png",
                            title: tr("regular_speed"),
                            description: tr("regular_speed_desc"),
                            spriteXOffs: 1,
                        })),
                        (this.buttonSpeedRegular.handle().position.x = t),
                        this.buttonSpeedRegular.clicked.add(function () {
                            e.requestRegularSpeed() ? e.root.signals.uiActionPerformed.dispatch(e) : e.root.signals.uiActionPerformedAndFailed.dispatch(e);
                        }, this),
                        (this.buttonSpeedFast = new GameTimeButton({
                            root: this.root,
                            parentGroup: this.buttonGroup,
                            spriteKey: "icon-fast-forward-button.png",
                            title: tr("fast_forward"),
                            description: tr("fast_forward_desc"),
                            spriteXOffs: 1,
                        })),
                        (this.buttonSpeedFast.handle().position.x = 2 * t),
                        this.buttonSpeedFast.clicked.add(function () {
                            e.reqeustFastForward() ? e.root.signals.uiActionPerformed.dispatch(e) : e.root.signals.uiActionPerformedAndFailed.dispatch(e);
                        }, this);
                    var o = this.root.phaser.make.graphics(0, 0);
                    [t, 2 * t].forEach(function (e) {
                        o.lineStyle(1, 16777215, 0.06), o.moveTo(Math.floor(e) + 0.5, 0), o.lineTo(Math.floor(e) + 0.5, i);
                    }),
                        this.buttonGroup.add(o);
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    this.uiGroup.add((this.fixedGroup = e.make.group())), (this.fixedGroup.fixedToCamera = true), this.fixedGroup.add((this.panelGroup = e.make.group())), this.makeButtons();
                    (this.panelBg = makeRoundedPanelBackground(e, 60, 60, Config.colors.ui.panelBackground, Config.colors.ui.panelAlpha)),
                        this.panelBg.position.setTo(-30),
                        this.panelGroup.add(this.panelBg),
                        (this.icon = e.make.image(0, 0, "atlas", "icon-fast-forward.png")),
                        this.icon.anchor.setTo(0.5),
                        this.panelGroup.add(this.icon),
                        (this.panelGroup.visible = false),
                        this.requestRegularSpeed();
                }),
                e
            );
        })(),
        ccFixBaseSingleSpriteButton = Phaser.Image,
        SingleSpriteButton = (function (e) {
            function t(i, a) {
                _classCallCheck(this, t);
                var o = _possibleConstructorReturn(this, e.call(this, i, 0, 0, "atlas", a));
                return (
                    o.enableInput(),
                    (o.name = "SingleSpriteButton"),
                    (o.clicked = new Phaser.Signal()),
                    o.events.onInputOver.add(function () {
                        (i.canvas.style.cursor = "pointer"), (o.alpha = 0.8);
                    }),
                    o.events.onInputOut.add(function () {
                        (i.canvas.style.cursor = "default"), (o.alpha = 1);
                    }),
                    o.events.onInputDown.add(function () {
                        o.clicked.dispatch();
                    }),
                    o
                );
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "SingleSpriteButton";
                        },
                    },
                ]),
                t
            );
        })(ccFixBaseSingleSpriteButton),
        GlobalUpgradesDialog = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.skillPositionCache = {}),
                    (this.positionRegistry = {}),
                    this.initButton(),
                    this.initDialog(),
                    (this.updateTimer = Timer.makeFromIntervalMs(350)),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                    this.root.signals.consistentGameUpdate.add(this.update, this),
                    (this.dragging = false),
                    (this.lastDragPosition = null),
                    this.toggleDialog(false),
                    this.root.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.hideDialogIfOpen, this),
                    (this.cameraManager = new CameraManager(this.root)),
                    this.cameraManager.moved.add(this.onKeyboardMovement, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GlobalUpgradesDialog";
                        },
                    },
                ]),
                (e.prototype.onResolutionChanged = function (e, t) {
                    this.descriptionGroup.position.setTo(Math.floor((e - DESCRIPTION_WIDTH) / 2), 50),
                        this.dialogBackground.scale.setTo(e, t),
                        this.toggleStatsButton.position.setTo(Config.ui.screenBorder, t - Config.ui.screenBorder - this.toggleStatsButton.height),
                        this.closeButton.position.setTo(e - Config.ui.screenBorder - this.closeButton.width, t - Config.ui.screenBorder - this.closeButton.height),
                        Config.mobileDevice
                            ? (this.pointsLeftBadge.position.setTo(Config.ui.screenBorder, t - Config.ui.screenBorder - this.closeButton.height),
                                this.noPointsText.position.setTo(e - Config.ui.screenBorder - 250, t - Config.ui.screenBorder - 80))
                            : (this.pointsLeftBadge.position.setTo(this.closeButton.x - 130, t - Config.ui.screenBorder - this.closeButton.height),
                                this.noPointsText.position.setTo(this.closeButton.x - 280, t - Config.ui.screenBorder - this.closeButton.height)),
                        t < Config.ui.menuBreakScreenHeight
                            ? (this.button.cameraOffset.setTo(e - Config.ui.screenBorder - this.button.dimensions, 220), this.button.setTooltipPosition("left"))
                            : (this.button.cameraOffset.setTo(Config.ui.screenBorder, Config.ui.screenBorderTop + 470), this.button.setTooltipPosition("right")),
                        (this.dragging = false),
                        this.isDialogOpen() && this.rerenderSummary(),
                        this.clampViewToBounds();
                }),
                (e.prototype.tryUnlock = function (e) {
                    if (this.root.logic.unlockSkill(e)) {
                        this.rerenderSkillTree(), this.rerenderBadge();
                        var t = SKILL_TREE[e].getScale(),
                            i = 50 * t,
                            a = 70 * t,
                            o = 70 * t * t;
                        return makeParticleExplosion({ root: this.root, numParticles: o, minRadius: i, maxRadius: a, start: this.getSkillPosition(e), particleClass: MetaSkillAnimationParticle }), true;
                    }
                    return false;
                }),
                (e.prototype.clampViewToBounds = function () {
                    var e = Math.floor(this.root.phaser.width / 2),
                        t = Math.floor(this.root.phaser.height / 2);
                    this.contentGroup.position.set(Math.max(-MAXBOUNDS + e, Math.min(MAXBOUNDS + e, this.contentGroup.x)), Math.max(-MAXBOUNDS + t, Math.min(MAXBOUNDS + t, this.contentGroup.y)));
                }),
                (e.prototype.initButton = function () {
                    (this.button = new MenuButton({
                        root: this.root,
                        spriteKey: "icon-global-upgrades.png",
                        title: tr("global_upgrades"),
                        description: tr("global_upgrades_desc"),
                        keybinding: Config.keys.globalUpgrades,
                        toggleable: true,
                        haveBadge: true,
                    })),
                        this.uiGroup.add(this.button),
                        (this.button.fixedToCamera = true),
                        this.button.toggled.add(this.toggleDialog, this);
                }),
                (e.prototype.toggleDialog = function (e) {
                    (this.dialogGroup.visible = e),
                        this.button.setToggleState(e),
                        e && (this.rerenderSkillTree(), this.contentGroup.position.setTo(Math.floor(this.root.phaser.width / 2), Math.floor(this.root.phaser.height / 2)), this.clampViewToBounds()),
                        this.hideTooltip(),
                        this.endDrag(),
                        this.isDialogOpen()
                            ? (document.body.classList.add("globalUpgradesDialogOpen"), window.restartGame)
                            : (document.body.classList.remove("globalUpgradesDialogOpen"), window.restartGame);
                }),
                (e.prototype.isDialogOpen = function () {
                    return this.dialogGroup.visible;
                }),
                (e.prototype.hideDialogIfOpen = function () {
                    this.isDialogOpen() && this.toggleDialog(false);
                }),
                (e.prototype.startDrag = function () {
                    (this.dragging = true), (this.lastDragPosition = window.mouseTracker.getPosition());
                }),
                (e.prototype.endDrag = function () {
                    (this.dragging = false), (this.lastDragPosition = null);
                }),
                (e.prototype.onKeyboardMovement = function (e, t) {
                    this.contentGroup.position.add(-e, -t), this.clampViewToBounds();
                }),
                (e.prototype.checkMouseMove = function () {
                    if (this.dragging) {
                        var e = window.mouseTracker.getPosition();
                        this.contentGroup.position.add(e.x - this.lastDragPosition.x, e.y - this.lastDragPosition.y), this.clampViewToBounds(), (this.lastDragPosition = Object.assign({}, e));
                    }
                }),
                (e.prototype.initDialog = function () {
                    var e = this,
                        t = this.root.phaser;
                    (this.dialogGroup = t.make.group()),
                        (this.dialogGroup.fixedToCamera = true),
                        this.uiGroup.add(this.dialogGroup),
                        (this.dialogBackground = makePanelBackground(t, 1, 1, 2434351, 0.98)),
                        this.dialogGroup.add(this.dialogBackground),
                        this.dialogBackground.enableInput(),
                        (this.dialogBackground.name = "GlobalUpgradesDialogBackground"),
                        this.dialogBackground.events.onInputDown.add(this.startDrag, this),
                        this.dialogBackground.events.onInputUp.add(this.endDrag, this),
                        (this.contentGroup = t.make.group()),
                        this.dialogGroup.add(this.contentGroup),
                        (this.particleGroup = t.make.group()),
                        this.contentGroup.add(this.particleGroup),
                        (this.labelsGroup = t.make.group()),
                        this.contentGroup.add(this.labelsGroup),
                        this.root.particles.registerSpecialGroup(MetaSkillAnimationParticle.name, this.particleGroup);
                    var i = t.make.group();
                    this.dialogGroup.add(i), (this.descriptionGroup = i);
                    var a = makeRoundedPanelBackground(t, DESCRIPTION_WIDTH, DESCRIPTION_HEIGHT, UI_BACKGROUND, 0.9);
                    this.descriptionGroup.add(a);
                    var o = t.make.group();
                    o.position.setTo(PADDING), this.descriptionGroup.add(o);
                    var n = t.make.text(0, 2, tr("global_upgrades").toUpperCase(), { font: "18px Roboto", fill: "#fff" });
                    o.add(n);
                    (this.pointsLeftBadge = makeBorderedRoundedPanelBackground({ phaser: t, w: 120, h: 30, fill: 3355448, lineFill: 2414703, lineWidth: 2, alpha: 1, borderRadius: 4 })),
                        this.dialogGroup.add(this.pointsLeftBadge),
                        (this.pointsLeftBadge.x = 170),
                        (this.pointsLeftBadge.y = -2),
                        (this.pointsLeftBadge.alpha = 1),
                        this.root.animations.animate(this.pointsLeftBadge).to({ alpha: 0.6 }, 700).yojo().ease(EASING.easeSin).uiAnim(),
                        (this.pointsLeftText = t.make.text(0, 8, "0 Points", { fill: "#" + (2414703).toString(16).padStart(6, "0"), font: "12px Roboto", fontWeight: 700, align: "center", boundsAlignH: "center" })),
                        this.pointsLeftText.setTextBounds(0, 0, 120, 20),
                        this.pointsLeftBadge.addChild(this.pointsLeftText),
                        (this.noPointsText = t.make.text(0, 0, tr("no_points"), { fill: "#f77", font: "14px Roboto", fontWeight: 700, align: "right", boundsAlignH: "right" })),
                        this.noPointsText.setTextBounds(0, 7, 250, 20),
                        this.dialogGroup.add(this.noPointsText),
                        (this.closeButton = makeButton({
                            phaser: t,
                            width: 130,
                            text: tr("close_dialog"),
                            fill: 16742263,
                            clickHandler: function () {
                                return e.toggleDialog(false);
                            },
                            keybinding: Phaser.Keyboard.ESC,
                        })),
                        this.dialogGroup.add(this.closeButton);
                    var r = t.make.text(0, 32, tr("global_upgrades_explain"), { font: "13px Roboto", fill: "#999", wordWrap: true, wordWrapWidth: DESCRIPTION_WIDTH - 2 * PADDING });
                    o.add(r);
                    var s = new SingleSpriteButton(t, "icon-close.png");
                    o.add(s),
                        (s.x = DESCRIPTION_WIDTH - 2 * PADDING),
                        (s.anchor.x = 1),
                        s.clicked.add(function () {
                            e.descriptionGroup.kill(), e.root.signals.uiActionPerformed.dispatch();
                        }),
                        (this.toggleStatsButton = makeButton({
                            phaser: t,
                            width: 160,
                            text: tr("toggle_skill_summary"),
                            fill: 7829503,
                            clickHandler: function () {
                                return e.toggleSummary();
                            },
                            keybinding: Config.keys.toggleUpgradeSummary,
                        })),
                        this.dialogGroup.add(this.toggleStatsButton),
                        (this.summaryGroup = t.make.fastGroup()),
                        this.dialogGroup.add(this.summaryGroup),
                        Config.mobileDevice && (this.toggleStatsButton.kill(), (this.summaryGroup.visible = false)),
                        this.root.persistent.getBool("skillTreeSummaryOpen", true) || (this.summaryGroup.visible = false),
                        this.initContent(this.contentGroup);
                }),
                (e.prototype.getSkillPosition = function (e) {
                    var t = this.getSkillInternalPosition(e);
                    return [Math.round(t[0] * NODE_SCALE), Math.round(-t[1] * NODE_SCALE)];
                }),
                (e.prototype.getSkillInternalPosition = function (e) {
                    if (this.skillPositionCache[e]) return this.skillPositionCache[e];
                    var t = SKILL_TREE[e];
                    if (!t) throw new Error("Unkown skill: '" + e + "'");
                    var i = t.position,
                        a = [0, 0];
                    t.dependsOn.length > 0 && (a = this.getSkillInternalPosition(t.dependsOn[0]));
                    var o = [i[0] + a[0], i[1] + a[1]],
                        n = o[0] + "-" + o[1];
                    if (this.positionRegistry[n]) throw new Error("Skills overlap: " + e + " and " + this.positionRegistry[n]);
                    return (this.positionRegistry[n] = e), (this.skillPositionCache[e] = o), o;
                }),
                (e.prototype.makeConnectionsForSkill = function (e, t) {
                    var i = this,
                        a = this.getSkillPosition(e);
                    t.lineStyle(1, 16777215),
                        SKILL_TREE[e].dependsOn.forEach(function (e) {
                            var o = i.getSkillPosition(e);
                            t.moveTo.apply(t, _toConsumableArray(a)), t.lineTo.apply(t, _toConsumableArray(o));
                        });
                }),
                (e.prototype.drawRegionLabels = function () {
                    var e = this,
                        t = this.root.phaser;
                    SKILLTREE_LABELS.forEach(function (i) {
                        var a = _slicedToArray(i, 4),
                            o = a[0],
                            n = a[1],
                            r = a[2],
                            s = a[3],
                            l = n * NODE_SCALE,
                            u = -r * NODE_SCALE,
                            c = mixColorPerChannel(s.color, 0.2, 34),
                            d = t.make.text(l, u, tr("skill_group_" + o).toUpperCase(), { font: "14px Roboto", fill: "#" + c.toString(16).padStart(6, "0"), align: "center", fontWeight: 700, boundsAlignH: "center" });
                        d.setTextBounds(-100, 0, 200, 30), e.labelsGroup.add(d);
                    });
                }),
                (e.prototype.drawSkills = function () {
                    var e = this,
                        t = this.root.phaser,
                        i = this.nodesGroup,
                        a = {},
                        o = function (o) {
                            var n,
                                r = SKILL_TREE[o],
                                s = t.make.group();
                            i.add(s), (n = s.position).setTo.apply(n, _toConsumableArray(e.getSkillPosition(o)));
                            var l = null;
                            "regular" !== r.getCircleStyle() && ((l = t.make.image(0, 0, "atlas", "glow.png")).anchor.setTo(0.5, 0.5), (l.width = 60 * r.getScale()), (l.height = l.width), (l.alpha = 0.6), s.add(l));
                            var u = t.make.graphics();
                            u.beginFill(0, 0.001), u.drawRect(-12, -12, 24, 24), u.beginFill(16777215);
                            "regular" === r.getCircleStyle() ? u.drawCircle(0, 0, Math.floor(12 * r.getScale())) : "polygon" === r.getCircleStyle() && drawPolygon(u, r.getPolygonEdges(), Math.floor(12 * r.getScale())),
                                s.add(u),
                                u.enableInput(),
                                (u.name = "GlobalUpgradesDialogGraphics"),
                                u.events.onInputOver.add(function () {
                                    e.root.logic.canUnlockSkill(o) && (t.canvas.style.cursor = "pointer"), e.showTooltip(o);
                                }),
                                u.events.onInputOut.add(function () {
                                    (t.canvas.style.cursor = "default"), e.hideTooltip();
                                }),
                                u.events.onInputDown.add(function () {
                                    e.root.stats.isSkillUnlocked(o) && e.root.signals.uiActionPerformedAndFailed.dispatch(),
                                        e.tryUnlock(o) ? e.root.signals.uiSkillMarkedForLevelUp.dispatch() : e.root.gui.uiNotifications.showError(tr("can_not_unlock_skill"));
                                });
                            var c = t.make.graphics();
                            s.add(c);
                            var d = null;
                            "regular" !== r.getCircleStyle() &&
                                ((d = t.make.image(0, 0, "atlas", "skill-" + r.key + ".png")).anchor.setTo(0.5, 0.5),
                                    (d.width = Math.floor(10 * r.getScale())),
                                    (d.height = Math.floor(10 * r.getScale())),
                                    (d.tint = r.getSpriteColor()),
                                    s.add(d));
                            var h = t.make.graphics();
                            e.connectionsGroup.add(h), e.makeConnectionsForSkill(o, h), (a[o] = { group: s, background: u, connections: h, sprite: d, glow: l });
                        };
                    for (var n in SKILL_TREE) o(n);
                    this.skillIdToHandles = a;
                }),
                (e.prototype.makeSkillTooltip = function () {
                    var e = this.root.phaser;
                    (this.tooltipHeightToPanel = {}), (this.tooltipBackgrounds = e.make.group()), this.tooltipGroup.add(this.tooltipBackgrounds);
                    var t = e.make.text(10, 10, "", { font: "12px Roboto", fill: "#eee", wordWrap: true, wordWrapWidth: TOOLTIP_W - 20 });
                    this.tooltipGroup.add(t);
                    for (var i = [], a = 0; a < 3; ++a) {
                        var o = 10 + 20 * a,
                            n = e.make.text(10, o, "", { font: "12px Roboto", fill: "#fff" }),
                            r = e.make.text(0, 0, "", { font: "12px Roboto Mono", fill: "#fff", align: "right", boundsAlignH: "right" });
                        r.setTextBounds(TOOLTIP_W - 100 - 10, o + 1, 100, 20), this.tooltipGroup.add(n), this.tooltipGroup.add(r), i.push({ text: n, value: r });
                    }
                    var s = e.make.text(0, 0, "", { font: "12px Roboto", fill: "#fff", align: "right", boundsAlignH: "right" });
                    s.setTextBounds(TOOLTIP_W - 150 - 10, 0, 150, 20), this.tooltipGroup.add(s), this.tooltipGroup.kill(), (this.tooltipContentHandles = { stats: i, description: t, cost: s });
                }),
                (e.prototype.hideTooltip = function () {
                    this.tooltipGroup.kill();
                }),
                (e.prototype.showTooltip = function (e) {
                    this.tooltipGroup.revive();
                    var t = SKILL_TREE[e],
                        i = this.getSkillPosition(e),
                        a = 20,
                        o = this.tooltipContentHandles,
                        n = o.stats,
                        r = o.description,
                        s = o.cost;
                    if (
                        (n.forEach(function (e) {
                            var t = e.text,
                                i = e.value;
                            (t.visible = false), (i.visible = false);
                        }),
                            t.description)
                    )
                        (r.visible = true), r.setText(t.description, true), (a = r.height + 15);
                    else {
                        r.visible = false;
                        var l = 0;
                        GAIN_DISPLAY_ORDER.forEach(function (e) {
                            if (null != t.gains[e]) {
                                var i = GAIN_MAPPINGS[e],
                                    a = n[l],
                                    o = a.text,
                                    r = a.value;
                                (o.tint = i.color), o.setText(tr("gain_" + e), true), r.setText("+" + t.gains[e] + "%", true), (o.visible = true), (r.visible = true), (l += 1);
                            }
                        }),
                            (a = 20 * l + 15);
                    }
                    (s.y = a + 2),
                        (a += 25),
                        1 === t.cost ? s.setText(tr("points_cost_single", t.cost), true) : s.setText(tr("points_cost", t.cost), true),
                        t.cost > this.root.stats.points ? (s.tint = 16751001) : (s.tint = 10066431),
                        Config.showSkillIds && (s.setText(t.cost + " // " + e, true), (s.tint = 3381759)),
                        this.tooltipGroup.position.setTo(i[0] - TOOLTIP_W / 2, i[1] - a - Math.floor(14 * t.getScale()) - 15);
                    var u = true;
                    for (var c in this.tooltipHeightToPanel) c === a ? ((this.tooltipHeightToPanel[c].visible = true), (u = false)) : (this.tooltipHeightToPanel[c].visible = false);
                    if (u) {
                        var d = makeTooltipPanel(this.root.phaser, TOOLTIP_W, a, true, UI_BACKGROUND, false).tooltip;
                        this.tooltipBackgrounds.add(d), (this.tooltipHeightToPanel[a] = d);
                    }
                }),
                (e.prototype.initContent = function (e) {
                    var t = this.root.phaser;
                    (this.graphGroup = t.make.group()),
                        e.add(this.graphGroup),
                        (this.connectionsGroup = t.make.fastGroup()),
                        (this.connectionsGroup.alpha = 0.8),
                        this.graphGroup.add(this.connectionsGroup),
                        (this.nodesGroup = t.make.group()),
                        this.graphGroup.add(this.nodesGroup),
                        (this.tooltipGroup = t.make.group()),
                        this.graphGroup.add(this.tooltipGroup),
                        this.drawRegionLabels(),
                        this.drawSkills(),
                        this.makeSkillTooltip();
                }),
                (e.prototype.toggleSummary = function () {
                    Config.mobileDevice ||
                        (this.isDialogOpen() &&
                            this.toggleStatsButton.visible &&
                            (this.summaryGroup.visible ? (this.summaryGroup.visible = false) : (this.summaryGroup.visible = true),
                                this.root.persistent.setBool("skillTreeSummaryOpen", this.summaryGroup.visible),
                                this.root.signals.uiActionPerformed.dispatch()));
                }),
                (e.prototype.rerenderSkillTree = function () {
                    var e = this;
                    Config.logOverlayRedraws && console.log("[UI] Redrawing global upgrades dialog badges");
                    var t = function (t) {
                        var i = SKILL_TREE[t],
                            a = e.skillIdToHandles[t],
                            o = a.background,
                            n = a.connections,
                            r = a.sprite,
                            s = a.glow,
                            l = e.root.stats.isSkillUnlocked(t),
                            u = true;
                        i.dependsOn.forEach(function (t) {
                            e.root.stats.isSkillUnlocked(t) || (u = false), e.root.stats.points < i.cost && (u = false);
                        });
                        var c = 16777214,
                            d = i.getBackgroundColor(),
                            h = 1;
                        l ? ((c = d), (d = mixColorPerChannel(d, 0.2, 68)), s && ((s.tint = d), (s.visible = true))) : (s && (s.visible = false), u ? ((c = 8947854), (h = 0.8), (d = 8947855)) : ((c = 4473929), (h = 0.4), (d = 4473931))),
                            (o.tint = d),
                            (n.tint = c),
                            r && (r.alpha = h);
                    };
                    for (var i in SKILL_TREE) t(i);
                    this.rerenderSummary();
                }),
                (e.prototype.rerenderSummary = function () {
                    var e = this;
                    if (!Config.mobileDevice) {
                        var t = this.root.phaser;
                        clearGroup(this.summaryGroup);
                        var i = [];
                        this.root.stats.unlockedSkills.forEach(function (e) {
                            var t = SKILL_TREE[e];
                            t instanceof FeatureSkill && i.push({ color: 15658734, text: t.description, value: "" });
                        }),
                            GAIN_DISPLAY_ORDER.forEach(function (t) {
                                var a = e.root.stats.getSkillGain(t),
                                    o = GAIN_MAPPINGS[t];
                                if (a !== o.default) {
                                    var n = Math.floor(a - o.default) + " %";
                                    0 !== o.default && (n = "+ " + n), i.push({ color: o.color, text: tr("gain_" + t), value: n });
                                }
                            }),
                            i.length < 1 ? ((this.summaryGroup.renderable = false), (this.toggleStatsButton.visible = false)) : ((this.summaryGroup.renderable = true), (this.toggleStatsButton.visible = true));
                        var a = UI_BACKGROUND,
                            o = makeRoundedPanelBackground(t, 250, 22 * i.length + 20, a, 0.9);
                        this.summaryGroup.add(o);
                        var n = 10;
                        i.forEach(function (i, a) {
                            var o = i.color,
                                r = i.text,
                                s = i.value,
                                l = 22 * a + 10,
                                u = t.make.text(10, l, r, { font: "12px Roboto", fill: "#" + o.toString(16).padStart(6, "0") });
                            if ((e.summaryGroup.add(u), (n = Math.max(n, u.width)), "" !== s)) {
                                var c = t.make.text(110, 0, s, { font: "12px Roboto Mono", fill: "#fff", align: "right", boundsAlignH: "right" });
                                c.setTextBounds(0, l + 1, 100, 20), e.summaryGroup.add(c), (n = Math.max(n, 90 + c.position.x));
                            }
                        }),
                            (o.width = n + 20);
                        var r = t.make.graphics();
                        r.beginFill(16777215, 0.1), this.summaryGroup.add(r);
                        for (var s = 1; s < i.length; ++s) r.drawRect(8, 22 * s + 7, o.width - 16, 1);
                        var l = 22 * i.length + 20,
                            u = t.make.image(30, l, "atlas", "tooltip-arrow.png");
                        (u.tint = a), (u.alpha = 0.9), this.summaryGroup.add(u), this.summaryGroup.position.setTo(Config.ui.screenBorder, this.root.phaser.height - Config.ui.screenBorder - l - 45);
                    }
                }),
                (e.prototype.rerenderBadge = function () {
                    if (this.root.stats.points > 0) {
                        (this.pointsLeftBadge.visible = true), (this.noPointsText.visible = false);
                        var e = tr("points_cost", this.root.stats.points);
                        1 === this.root.stats.points && (e = tr("points_cost_single", this.root.stats.points)), this.pointsLeftText.setText(e.toUpperCase(), true);
                    } else (this.noPointsText.visible = true), (this.pointsLeftBadge.visible = false);
                }),
                (e.prototype.update = function (e) {
                    this.button.setBadgeNumber(this.root.stats.points), this.isDialogOpen() && (this.checkMouseMove(), this.updateTimer.takeTick(this.root.time.nowConsistent, true) && this.rerenderBadge(), this.cameraManager.update(e));
                }),
                e
            );
        })(),
        KeybindingsDialog = (function () {
            function e() {
                _classCallCheck(this, e);
            }
            return (
                (e.prototype.show = function () {
                    var e = "",
                        t = function (t, i) {
                            (e += "<span class='keybinding_entry'>\n                <span class='keybinding_name'>" + t + "</span>\n                <span class='keybinding_keys'>"),
                                Array.isArray(i)
                                    ? i.forEach(function (t) {
                                        e += "string" == typeof t ? t + " " : "<span class='keybinding_key'>" + keyToString(t) + "</span>";
                                    })
                                    : (e += "<span class='keybinding_key'>" + keyToString(i) + "</span>"),
                                (e += "</span></span>");
                        },
                        i = function (t) {
                            e += '<b class="keybinding_section_header">' + t + "</b>";
                        },
                        a = Phaser.Keyboard;
                    i(tr("kb_section_building")),
                        t(tr("kb_place_multiple"), a.SHIFT),
                        t(tr("kb_place_maxlevel"), a.ALT),
                        t(tr("kb_cancel_placement"), a.ESC),
                        t(tr("kb_sell_building"), Config.keys.sellBuilding),
                        t(tr("kb_sell_all_building"), [a.SHIFT, "+", Config.keys.sellBuilding]),
                        i(tr("kb_section_upgrading")),
                        t(tr("upgrade"), Config.keys.upgradeBuilding),
                        t(tr("upgrade_all"), [a.SHIFT, "+", Config.keys.upgradeBuilding]),
                        t(tr("max_out"), [a.ALT, "+", Config.keys.upgradeBuilding]),
                        t(tr("max_out_all"), [a.ALT, "+", a.SHIFT, "+", Config.keys.upgradeBuilding]),
                        i(tr("kb_section_movement")),
                        t(tr("kb_move"), [Config.keys.moveUp, Config.keys.moveLeft, Config.keys.moveDown, Config.keys.moveRight]),
                        t(tr("kb_move_alternate"), [a.UP, a.LEFT, a.DOWN, a.RIGHT]),
                        (e += "<span class='mouse_hint'>" + tr("kb_mouse_hint") + "</span><br>"),
                        i(tr("kb_section_misc")),
                        t(tr("fast_forward"), Config.keys.fastForward),
                        t(tr("pause_game"), Config.keys.pause),
                        t(tr("restart_game"), a.F5),
                        t(tr("toggle_gui"), Config.keys.toggleGui),
                        t(tr("toggle_minimap"), Config.keys.toggleMapView),
                        t(tr("zoom"), [tr("mouse_wheel")]),
                        (document.getElementById("keybindings_content").innerHTML = e),
                        window.showDialog("keybindings_dialog_bg");
                }),
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "KeybindingsDialog";
                        },
                    },
                ]),
                e
            );
        })(),
        SettingsDialog = (function () {
            function e(t) {
                var i = this;
                _classCallCheck(this, e),
                    (this.root = t),
                    (window.updateGameSetting = function (e, t) {
                        i.root.settings.updateSetting(e, t.checked), i.root.signals.uiActionPerformed.dispatch();
                    });
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "SettingsDialog";
                        },
                    },
                ]),
                (e.prototype.show = function () {
                    var e = this,
                        t = "";
                    META_GAME_SETTINGS.forEach(function (i) {
                        var a = i.title,
                            o = i.settings;
                        (t += "<strong>" + a + "</strong>"),
                            o.forEach(function (i) {
                                var a = i.id,
                                    o = e.root.settings[a];
                                (t += "<label class='settings_row'>"),
                                    (t += "<input onchange='window.updateGameSetting(\"" + a + "\", this)'  type='checkbox'"),
                                    (t += o ? " checked" : ""),
                                    (t += ">"),
                                    (t += tr("setting_" + a)),
                                    (t += "<span>" + tr("setting_" + a + "_desc") + "</span>"),
                                    (t += "</label>");
                            });
                    }),
                        (t += "<strong>Build Information</strong>"),
                        (t += "<span class='build_info'>"),
                        (t += "<b>Version:</b> " + YORGIO.VERSION + "<br />"),
                        (t += "<b>Environment:</b> <span style='color: " + YORGIO.ENVIRONMENT_COLOR + "'>"),
                        (t += YORGIO.ENVIRONMENT),
                        (t += "</span><br>"),
                        (t += "Built using JavaScript, HTML5, PIXI.js and modified Phaser CE <i>(it sucks, don't use it)</i><br />"),
                        (t += "YORG.io &copy; 2018 Tobias Springer"),
                        (t += "</span>"),
                        (document.getElementById("settings_dialog_dynamic_content").innerHTML = t),
                        window.showDialog("settings_dialog_bg");
                }),
                e
            );
        })(),
        MenuButtonBarUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    (this.buttons = []),
                    (this.updateTimer = Timer.makeFromIntervalMs(350)),
                    this.initGroup(),
                    (this.keybindingsDialog = new KeybindingsDialog()),
                    (this.settingsDialog = new SettingsDialog(this.root)),
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MenuButtonBarUI";
                        },
                    },
                ]),
                (e.prototype.onResolutionChanged = function (e, t) {
                    for (var i = 0; i < this.buttons.length; ++i) {
                        var a = this.buttons[this.buttons.length - 1 - i];
                        t < Config.ui.menuBreakScreenHeight ? ((a.y = (i % 4) * (a.dimensions + 6)), (a.x = Math.floor(i / 4) * (a.dimensions + 6))) : ((a.x = 0), (a.y = i * (a.dimensions + 6)));
                    }
                }),
                (e.prototype.initGroup = function () {
                    var e = this,
                        t = this.root.phaser;
                    (this.group = t.make.group()),
                        (this.group.fixedToCamera = true),
                        this.uiGroup.add(this.group),
                        this.group.cameraOffset.setTo(Config.ui.screenBorder, Config.ui.screenBorderTop + (Config.mobileDevice ? 75 : 95)),
                        (this.settingsButton = new MenuButton({ root: this.root, title: tr("settings"), description: tr("settings_desc"), spriteKey: "menu-settings.png", tooltipPosition: "right" })),
                        this.settingsButton.clicked.add(this.showSettingsDialog, this),
                        this.addButton(this.settingsButton),
                        Config.mobileDevice ||
                        ((this.keybindingsButton = new MenuButton({ root: this.root, title: tr("keyboard_shortcuts"), description: tr("keyboard_shortcuts_desc"), spriteKey: "menu-keyboard.png", tooltipPosition: "right" })),
                            this.keybindingsButton.clicked.add(this.showKeybindingsDialog, this),
                            this.addButton(this.keybindingsButton)),
                        (this.restartButton = new MenuButton({ root: this.root, title: tr("back_to_menu"), description: tr("back_to_menu_desc"), spriteKey: "menu-restart.png", tooltipPosition: "right" })),
                        this.restartButton.clicked.add(this.showRestartDialog, this),
                        this.addButton(this.restartButton),
                        Config.mobileDevice ||
                        ((this.fullscreenButton = new MenuButton({ root: this.root, title: tr("toggle_fullscreen"), description: tr("toggle_fullscreen_desc"), spriteKey: "menu-fullscreen-on.png", tooltipPosition: "right" })),
                            this.fullscreenButton.clicked.add(this.toggleFullscreen, this),
                            this.addButton(this.fullscreenButton)),
                        (this.soundToggleButton = new MenuButton({ root: this.root, title: tr("toggle_sound"), description: tr("toggle_sound_desc"), spriteKey: "menu-sound-on.png", tooltipPosition: "right" })),
                        this.soundToggleButton.clicked.add(this.toggleSounds, this),
                        this.addButton(this.soundToggleButton),
                        (this.musicToggleButton = new MenuButton({ root: this.root, title: tr("toggle_music"), description: tr("toggle_music_desc"), spriteKey: "menu-music-on.png", tooltipPosition: "right" })),
                        this.musicToggleButton.clicked.add(this.toggleMusic, this),
                        this.addButton(this.musicToggleButton),
                        (this.saveButton = new MenuButton({ root: this.root, title: tr("save_game"), description: tr("save_game_desc"), spriteKey: "menu-save.png", tooltipPosition: "right" })),
                        this.saveButton.clicked.add(this.saveGame, this),
                        this.addButton(this.saveButton),
                        (this.loadButton = new MenuButton({ root: this.root, title: tr("load_game"), description: tr("load_game_desc"), spriteKey: "menu-load.png", tooltipPosition: "right" })),
                        this.loadButton.clicked.add(this.loadGame, this),
                        this.addButton(this.loadButton),
                        this.buttons.reverse().forEach(function (t) {
                            return e.group.add(t);
                        }),
                        this.updateMuteButtons(),
                        this.updateFullscreenButton();
                }),
                (e.prototype.saveGame = function () {
                    this.root.logic.playerHasPlacedBase() ? this.root.savegames.saveGame() : this.root.gui.uiNotifications.showError(tr("error_save_not_possible_before_base"));
                }),
                (e.prototype.loadGame = function () {
                    this.root.savegames.showDialog();
                }),
                (e.prototype.toggleMusic = function () {
                    this.root.sound.toggleMusic(), this.updateMuteButtons();
                }),
                (e.prototype.toggleSounds = function () {
                    this.root.sound.toggleSounds(), this.updateMuteButtons();
                }),
                (e.prototype.updateMuteButtons = function () {
                    this.musicToggleButton.setTexture(this.root.sound.musicMuted ? "menu-music-off.png" : "menu-music-on.png"), this.soundToggleButton.setTexture(this.root.sound.soundsMuted ? "menu-sound-off.png" : "menu-sound-on.png");
                }),
                (e.prototype.addButton = function (e) {
                    this.buttons.push(e);
                }),
                (e.prototype.update = function () {
                    this.updateTimer.takeTick(this.root.time.nowConsistent, true) && this.updateFullscreenButton();
                }),
                (e.prototype.toggleFullscreen = function () {
                    var e = this;
                    _screenfull2.default.toggle(),
                        this.updateFullscreenButton(),
                        setTimeout(function () {
                            return e.updateFullscreenButton;
                        }, 1);
                }),
                (e.prototype.showKeybindingsDialog = function () {
                    this.keybindingsDialog.show();
                }),
                (e.prototype.showSettingsDialog = function () {
                    this.settingsDialog.show();
                }),
                (e.prototype.showRestartDialog = function () {
                    window.showDialog("restart_dialog_bg");
                }),
                (e.prototype.updateFullscreenButton = function () {
                    if (this.fullscreenButton)
                        if (_screenfull2.default.enabled) {
                            var e = _screenfull2.default.isFullscreen;
                            this.fullscreenButton.setEnabled(true), this.fullscreenButton.setTexture(e ? "menu-fullscreen-off.png" : "menu-fullscreen-on.png");
                        } else this.fullscreenButton.setEnabled(false);
                }),
                e
            );
        })(),
        BaseUnlockTip = (function () {
            function e(t, i, a) {
                _classCallCheck(this, e),
                    (this.title = tr(t)),
                    (this.description = i
                        .map(function (e) {
                            return tr(e);
                        })
                        .join("<br />")),
                    (this.shown = false),
                    (this.imageData = a);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BaseUnlockTip";
                        },
                    },
                ]),
                (e.prototype.shouldShow = function () {
                    throw new Error("not implemented");
                }),
                (e.prototype.getLinkAction = function () {
                    return null;
                }),
                e
            );
        })(),
        TipPlaceBase = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_base_title", ["unlock_base_text_2", "unlock_base_text_3", "unlock_base_text_4", "unlock_base_text_5"], null));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipPlaceBase";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return !e.logic.playerHasPlacedBase() && !Config.tutorialActive;
                }),
                t
            );
        })(BaseUnlockTip),
        TipUnlockedSkillPoint = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_skills_title", ["unlock_skills_text_1", "unlock_skills_text_2"], __webpack_require__(427)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipUnlockedSkillPoint";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return e.stats.points >= 1;
                }),
                t
            );
        })(BaseUnlockTip),
        TipMoreThan10Points = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_more_than_10_points_title", ["unlock_more_than_10_points_text_1", "unlock_more_than_10_points_text_2"], __webpack_require__(428)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipMoreThan10Points";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return e.stats.points >= 10;
                }),
                t
            );
        })(BaseUnlockTip),
        TipUnlockedLightningTower = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_lightning_title", ["unlock_lightning_text_1", "unlock_lightning_text_2"], __webpack_require__(429)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipUnlockedLightningTower";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    var t = e.logic.getPlayerBaseLevel();
                    return t > 0 && GAME_BALANCING.amountLimits.lightningTower[t] > 0;
                }),
                t
            );
        })(BaseUnlockTip),
        TipUnlockedShieldTower = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_shield_title", ["unlock_shield_text_1", "unlock_shield_text_2"], __webpack_require__(430)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipUnlockedShieldTower";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    var t = e.logic.getPlayerBaseLevel();
                    return t > 0 && GAME_BALANCING.amountLimits.healingTower[t] > 0;
                }),
                t
            );
        })(BaseUnlockTip),
        TipBoss = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_boss_title", ["unlock_boss_text_1", "unlock_boss_text_2"], __webpack_require__(431)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipBoss";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return e.daytime.getDay() >= 10;
                }),
                t
            );
        })(BaseUnlockTip),
        TipPerformance = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_performance_title", ["unlock_performance_text_1", "unlock_performance_text_2"], __webpack_require__(432)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipPerformance";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return e.daytime.getDay() >= 80;
                }),
                t
            );
        })(BaseUnlockTip),
        TipUsefulSettings = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_keybindings_title", ["unlock_keybindings_text_1", "unlock_keybindings_text_2"], __webpack_require__(433)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipUsefulSettings";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return e.daytime.getDay() >= 42;
                }),
                t
            );
        })(BaseUnlockTip),
        TipVoteForUs = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_vote_for_us_title", ["unlock_vote_for_us_text_1"], __webpack_require__(434)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipVoteForUs";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return false;
                }),
                (t.prototype.getLinkAction = function () {
                    return window.inThirdpartyIframe ? null : { text: tr("unlock_vote_visit_iogames_space"), url: "http://iogames.space/yorg-io" };
                }),
                t
            );
        })(BaseUnlockTip),
        TipSteamVersion = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_standalone_title", ["unlock_standalone_text_1"], __webpack_require__(100)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipSteamVersion";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return false;
                }),
                (t.prototype.getLinkAction = function () {
                    return { text: tr("unlock_standalone_btn"), url: "http://steam.yorg.io" };
                }),
                t
            );
        })(BaseUnlockTip),
        TipSteamVersion2 = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_standalone_title", ["unlock_standalone_text_1"], __webpack_require__(100)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipSteamVersion2";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return false;
                }),
                (t.prototype.getLinkAction = function () {
                    return { text: tr("unlock_standalone_btn"), url: "http://steam.yorg.io" };
                }),
                t
            );
        })(BaseUnlockTip),
        TipSteamVersion3 = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_standalone_title", ["unlock_standalone_text_1"], __webpack_require__(100)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipSteamVersion3";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return false;
                }),
                (t.prototype.getLinkAction = function () {
                    return { text: tr("unlock_standalone_btn"), url: "http://steam.yorg.io" };
                }),
                t
            );
        })(BaseUnlockTip),
        TipFollowTwitter = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, "unlock_follow_twitter_title", ["unlock_follow_twitter_text_1"], __webpack_require__(435)));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "TipFollowTwitter";
                        },
                    },
                ]),
                (t.prototype.shouldShow = function (e) {
                    return false;
                }),
                (t.prototype.getLinkAction = function () {
                    return { text: tr("unlock_follow_twitter_visit_twitter"), url: "https://twitter.com/yorg_io" };
                }),
                t
            );
        })(BaseUnlockTip),
        UnlockTipsManager = (function () {
            function e(t) {
                _classCallCheck(this, e),
                    (this.root = t),
                    this.initTips(),
                    (window.closeUnlockTips = function () {
                        document.getElementById("unlock_tips_dialog_bg").classList.remove("visible");
                    });
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UnlockTipsManager";
                        },
                    },
                ]),
                (e.prototype.initTips = function () {
                    var e = this;
                    Config.alwayShowUnlockTips ||
                        TIPS.forEach(function (t) {
                            var i = e.getKeyForTip(t);
                            e.root.persistent.getBool(i, false) && (t.shown = true);
                        });
                }),
                (e.prototype.getKeyForTip = function (e) {
                    return "tip_shown_" + e.constructor.name;
                }),
                (e.prototype.update = function () {
                    var e = this;
                    if (this.root.gameStarted) {
                        var t = false;
                        TIPS.forEach(function (i) {
                            !i.shown && i.shouldShow(e.root) && (e.showTip(i), (t = true));
                        }),
                            t && this.root.signals.uiNotificationDialogOpened.dispatch();
                    }
                }),
                (e.prototype.showTip = function (e) {
                    e.shown = true;
                    var t = e.description;
                        (window.trackUnlockLinkClick = function () {
                            // no
                        });
                    var i = e.getLinkAction();
                    null !== i && (t += "<br/><button class='' onclick='window.open(\"" + i.url + '", "blank"); window.trackUnlockLinkClick()\'>' + i.text + "</button>"),
                        (document.getElementById("unlock_tips_header").innerHTML = e.title),
                        (document.getElementById("unlock_tips_dynamic_content").innerHTML = t);
                    var a = document.getElementById("unlock_tips_image");
                    e.imageData ? ((a.src = e.imageData), a.classList.add("isVisible")) : a.classList.remove("isVisible"), document.getElementById("unlock_tips_dialog_bg").classList.add("visible");
                    var o = this.getKeyForTip(e);
                    this.root.persistent.setBool(o, true);
                }),
                e
            );
        })(),
        UpgradeSellModeUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.uiGroup = i),
                    this.init(),
                    (this.keyUpgrade = this.root.keyboard.addKey(Config.keys.upgradeBuilding)),
                    (this.keySell = this.root.keyboard.addKey(Config.keys.sellBuilding)),
                    (this.keyMaxOut = this.root.keyboard.addKey(Phaser.Keyboard.ALT)),
                    this.root.signals.consistentGameUpdate.add(this.update, this),
                    this.root.signals.gameFocusChanged.add(this.onFocusChange, this),
                    (this.cachedMode = null);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "UpgradeSellModeUI";
                        },
                    },
                ]),
                (e.prototype.onFocusChange = function () {
                    this.root.focus.isFocused() || (this.keyUpgrade.processKeyUp(), this.keySell.processKeyUp(), this.keyMaxOut.processKeyUp());
                }),
                (e.prototype.getMode = function () {
                    return this.root.gui.uiCurrentlyPlacing.isCurrentlyPlacing()
                        ? this.keyMaxOut.isDown
                            ? MODE_PLACE_MAXED_OUT
                            : MODE_NONE
                        : this.root.gui.uiBuildingTooltip.isOpen()
                            ? MODE_NONE
                            : this.keyUpgrade.isDown
                                ? MODE_UPGRADE
                                : this.keySell.isDown
                                    ? MODE_SELL
                                    : this.keyMaxOut.isDown
                                        ? MODE_MAX_OUT
                                        : MODE_NONE;
                }),
                (e.prototype.isUpgradeModeActive = function () {
                    return this.getMode() === MODE_UPGRADE || this.getMode() === MODE_MAX_OUT;
                }),
                (e.prototype.isSellModeActive = function () {
                    return this.getMode() === MODE_SELL;
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.group = e.make.group()),
                        (this.group.fixedToCamera = true),
                        this.uiGroup.add(this.group),
                        (this.upgradeModeHint = this.makeHint(tr("upgrade_mode_active"), Config.colors.ui.upgradeBuilding)),
                        this.group.add(this.upgradeModeHint),
                        (this.sellModeHint = this.makeHint(tr("sell_mode_active"), Config.colors.ui.sellBuilding)),
                        this.group.add(this.sellModeHint),
                        (this.placeMaxedOutHint = this.makeHint(tr("place_maxed_out_active"), Config.colors.ui.maxOutBuilding)),
                        this.group.add(this.placeMaxedOutHint),
                        (this.maxOutHint = this.makeHint(tr("max_out_mode_active"), Config.colors.ui.maxOutBuilding)),
                        this.group.add(this.maxOutHint);
                }),
                (e.prototype.makeHint = function (e, t) {
                    var i = this.root.phaser,
                        a = i.make.group(),
                        o = i.make.text(16, -6, e.toUpperCase(), { font: "14px Roboto", fill: "#" + t.toString(16).padStart(6, "0"), fontWeight: 700 });
                    return a.add(o), a;
                }),
                (e.prototype.update = function () {
                    var e = this.getMode();
                    e !== this.cachedMode &&
                        ((this.cachedMode = e),
                            e === MODE_UPGRADE ? this.upgradeModeHint.revive() : this.upgradeModeHint.kill(),
                            e === MODE_SELL ? this.sellModeHint.revive() : this.sellModeHint.kill(),
                            e === MODE_PLACE_MAXED_OUT ? this.placeMaxedOutHint.revive() : this.placeMaxedOutHint.kill(),
                            e === MODE_MAX_OUT ? this.maxOutHint.revive() : this.maxOutHint.kill());
                    var t = window.mouseTracker.getPosition();
                    this.group.cameraOffset.setTo(t.x, t.y);
                }),
                e
            );
        })(),
        GameNotificationsUI = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GameNotificationsUI";
                        },
                    },
                ]),
                (e.prototype.showError = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this._create(e, "error", t), this.root.sound.playErrorNotification();
                }),
                (e.prototype.showSuccess = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this._create(e, "success", t), this.root.sound.playSuccessNotification();
                }),
                (e.prototype.showHint = function (e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this._create(e, "hint", t), this.root.sound.playSuccessNotification();
                }),
                (e.prototype.showLongError = function (e) {
                    this.showError(e, true);
                }),
                (e.prototype.showLongHint = function (e) {
                    this.showHint(e, true);
                }),
                (e.prototype.showLongSuccess = function (e) {
                    this.showSuccess(e, true);
                }),
                (e.prototype._create = function (e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        a = document.createElement("div");
                    (a.className = "notification " + t), i && (a.className += " long"), (a.innerText = e);
                    var o = document.getElementById("notifications_dynamic"),
                        n = o.getElementsByTagName("div")[0];
                    n ? o.insertBefore(a, n) : o.appendChild(a),
                        setTimeout(
                            function () {
                                a.remove();
                            },
                            i ? 6e3 : 3e3
                        );
                }),
                e
            );
        })(),
        RecomputingNetworkHintUI = (function (e) {
            function t(i, a, o) {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.call(this, i, a, o, { height: 48, updateInterval: 500 }));
            }
            return (
                _inherits(t, e),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RecomputingNetworkHintUI";
                        },
                    },
                ]),
                (t.prototype.init = function () {
                    e.prototype.init.call(this);
                    var t = this.root.phaser;
                    (this.graphics = t.make.graphics(10, 22)),
                        this.group.add(this.graphics),
                        (this.text = t.make.text(29, 10, tr("updating_routes").toUpperCase(), { font: "12px Roboto", fontWeight: 400, fill: "#eee" })),
                        (this.textAmount = t.make.text(10, 27, "", { font: "11px Roboto", fontWeight: 700, fill: "#aaa" })),
                        this.group.add(this.textAmount),
                        this.group.add(this.text);
                }),
                (t.prototype.update = function () {
                    for (var e = 0, t = this.root.entityMgr.getAllEntitiesWithComponent(EmitterComponent), i = 0, a = t.length; i < a; ++i) {
                        var o = t[i].getComponent(EmitterComponent);
                        o.precomputeConsumers && o.precomputedConsumersDirty && (e += 1);
                    }
                    if (e > 5) {
                        (this.group.visible = true), this.textAmount.setText(tr("routes_remaining", e).toUpperCase(), true);
                        var n = 7864183;
                        e >= 50 && (n = 16777079), e >= 100 && (n = 16742263), (this.text.tint = n), this.graphics.clear();
                        var r = 0.01 * new Date().getTime();
                        this.graphics.beginFill(n);
                        for (var s = 0; s < 3; ++s) {
                            var l = 12 * (0.4 * Math.sin(r + 1.4 * s) + 0.5);
                            this.graphics.drawRect(4 * s, 0, 3, -l);
                        }
                    } else this.graphics.clear(), (this.group.visible = false);
                }),
                t
            );
        })(Visualizer),
        ZoomButtonsUI = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.init(), this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this), this.root.signals.consistentGameUpdate.add(this.update, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ZoomButtonsUI";
                        },
                    },
                ]),
                (e.prototype.onResolutionChanged = function (e, t) {
                    this.group.cameraOffset.setTo(e - Config.ui.screenBorder - 200, t - 225 - Config.ui.screenBorder), (this.group.visible = !(e < 940));
                }),
                (e.prototype.init = function () {
                    var e = this.root.phaser;
                    (this.group = e.make.group()),
                        (this.group.fixedToCamera = true),
                        this.uiGroup.add(this.group),
                        (this.zoomInButton = new MenuButton({ root: this.root, spriteKey: "icon-zoom-in.png", title: tr("zoom_in"), description: tr("zoom_in_desc"), small: true, tooltipPosition: "top" })),
                        this.group.add(this.zoomInButton),
                        this.zoomInButton.clicked.add(this.zoomIn, this),
                        (this.zoomOutButton = new MenuButton({ root: this.root, spriteKey: "icon-zoom-out.png", title: tr("zoom_out"), description: tr("zoom_out_desc"), small: true, tooltipPosition: "top" })),
                        this.group.add(this.zoomOutButton),
                        this.zoomOutButton.clicked.add(this.zoomOut, this),
                        (this.zoomOutButton.x = 24);
                }),
                (e.prototype.zoomIn = function () {
                    this.root.zoom.zoomIn();
                }),
                (e.prototype.zoomOut = function () {
                    this.root.zoom.zoomOut();
                }),
                (e.prototype.update = function () {
                    this.zoomInButton.setEnabled(this.root.zoom.isZoomInPossible()), this.zoomOutButton.setEnabled(this.root.zoom.isZoomOutPossible());
                }),
                e
            );
        })(),
        IngameChat = (function () {
            function e(t, i) {
                _classCallCheck(this, e), (this.root = t), (this.uiGroup = i), this.initButton(), this.root.signals.gameLoadedAndStarted.add(this.init, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "IngameChat";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    this.root.signals.gameSizeChanged.add(this.onResolutionChanged, this),
                        (this.element = document.getElementById("ingame_chat")),
                        this.bindEvents(),
                        this.root.persistent.getBool("chatVisible", true) && !Config.tutorialActive ? this.showChat() : this.hideChat(),
                        this.onResolutionChanged(window.innerWidth, window.innerHeight),
                        this.initIframe();
                }),
                (e.prototype.onResolutionChanged = function (e, t) {
                    this.button.isToggled ? this.button.cameraOffset.setTo(Config.ui.screenBorder, t - this.button.dimensions - 220) : this.button.cameraOffset.setTo(Config.ui.screenBorder, t - this.button.dimensions - 10);
                }),
                (e.prototype.initButton = function () {
                    (this.button = new MenuButton({
                        root: this.root,
                        spriteKey: "menu-chat.png",
                        title: tr("chat"),
                        description: tr("chat_desc"),
                        keybinding: null,
                        toggleable: true,
                        haveBadge: true,
                        tooltipPosition: "right",
                        bgColor: Config.colors.ui.active,
                    })),
                        this.uiGroup.add(this.button),
                        (this.button.fixedToCamera = true),
                        this.button.setBadgeNumber(1),
                        this.button.toggled.add(this.toggle, this);
                }),
                (e.prototype.initIframe = function () {
                    var e = _lzString2.default.compressToEncodedURIComponent(this.root.syncer.playerName),
                        t = "yorgio-chat-backend-v2";
                    "ru" === CURRENT_LANGUAGE && (t = "yorgio-chat-backend-v2-ru");
                    var i = "https://" + t + ".herokuapp.com/frame?" + e + "#token=" + _lzString2.default.compressToEncodedURIComponent("yorg.io/chat/live"),
                        a = document.createElement("iframe");
                    (a.allowFullscreen = false), (a.allowTransparency = true), (a.src = i), this.element.appendChild(a);
                }),
                (e.prototype.toggle = function () {
                    this.element && (this.root.persistent.getBool("chatVisible", true) ? this.hideChat() : this.showChat());
                }),
                (e.prototype.showChat = function () {
                    this.root.persistent.setBool("chatVisible", true), this.button.setBadgeNumber(0), this.button.setToggleState(true), this.element.classList.add("visible"), this.onResolutionChanged(window.innerWidth, window.innerHeight);
                }),
                (e.prototype.hideChat = function () {
                    this.root.persistent.setBool("chatVisible", false), this.button.setToggleState(false), this.element.classList.remove("visible"), this.onResolutionChanged(window.innerWidth, window.innerHeight);
                }),
                (e.prototype.bindEvents = function () {
                    this.element.addEventListener(
                        "mousewheel",
                        function (e) {
                            return e.stopPropagation(), e.stopImmediatePropagation(), false;
                        },
                        true
                    );
                }),
                e
            );
        })(),
        GUI = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), this.init();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "GUI";
                        },
                    },
                ]),
                (e.prototype.init = function () {
                    var e = this;
                    (this.uiGroup = this.root.phaser.add.group(null, "gui")),
                        (this.uiGroup.smoothed = false),
                        (this.visualizerInstances = []),
                        (this.viewInstances = []),
                        (this.menuButtonInstances = []),
                        Config.spawnDefaultBuildings || (this.uiStatDisplay = new StatDisplayUI(this.root, this.uiGroup)),
                        (this.uiBuildingTooltip = new BuildingTooltipUI(this.root, this.uiGroup)),
                        Config.spawnDefaultBuildings || (this.uiBaseIndicator = new BaseDirectionIndicatorUI(this.root, this.uiGroup)),
                        (this.uiCurrentlyPlacing = new CurrentlyPlacingUI(this.root, this.uiGroup)),
                        Config.spawnDefaultBuildings ||
                        ((this.uiTimeUntilZombies = new TimeUntilZombiesUI(this.root, this.uiGroup)),
                            (this.uiGameTimeButtons = new GameTimeButtonsUI(this.root, this.uiGroup)),
                            this.createVisualizers(),
                            this.createViews(),
                            (this.zoombuttonsUi = new ZoomButtonsUI(this.root, this.uiGroup)),
                            (this.menuButtonsUi = new MenuButtonBarUI(this.root, this.uiGroup)),
                            (this.uiBuildingsDisplay = new BuildingsDisplayUI(this.root, this.uiGroup)),
                            this.uiBuildingsDisplay.onSelectBuilding.add(function (t) {
                                return e.uiCurrentlyPlacing.selectBuilding(t);
                            }),
                            (this.uiMinimap = new MinimapUI(this.root, this.uiGroup)),
                            (this.uiDayNight = new DayNightOverlay(this.root, this.uiGroup))),
                        (this.unlockTips = new UnlockTipsManager(this.root)),
                        (this.gestures = new MovementGestureUI(this.root, this.uiGroup)),
                        (this.uiUpgradeSellMode = new UpgradeSellModeUI(this.root, this.uiGroup)),
                        !Config.mobileDevice && window.WebSocket && (this.uiChat = new IngameChat(this.root, this.uiGroup)),
                        (this.uiGlobalUpgradesDialog = new GlobalUpgradesDialog(this.root, this.uiGroup)),
                        (this.uiNotifications = new GameNotificationsUI(this.root)),
                        this.uiBuildingTooltip.unusedMouseDown.add(this.gestures.onGestureStart, this.gestures),
                        this.uiBuildingTooltip.unusedMouseUp.add(this.gestures.onGestureEnd, this.gestures),
                        Config.showDebugOverlay && (this.uiDebugOverlay = new DebugOverlayUI(this.root, this.uiGroup)),
                        (this.uiFPS = new FPSDisplayUI(this.root, this.uiGroup)),
                        (this.uiTutorial = new TutorialUI(this.root, this.uiGroup)),
                        (this.uiPauseOverlay = new PauseOverlayUI(this.root, this.uiGroup)),
                        this.updateAdvancedUIVisibility();
                }),
                (e.prototype.updateAdvancedUIVisibility = function () {
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
                }),
                (e.prototype.initToggling = function () {
                    var e = this,
                        t = this.root.phaser.add.group(),
                        i = this.root.phaser.make.text(Config.ui.screenBorder, Config.ui.screenBorder, keyToString(Config.keys.toggleGui) + ": " + tr("toggle_gui"), { font: "12px Roboto", fill: "#eee" });
                    (t.fixedToCamera = true),
                        t.add(i),
                        (this.toggleHint = t),
                        (this.toggleHint.visible = false),
                        this.root.keyboard.addKey(Config.keys.toggleGui).onDown.add(function () {
                            e.root.gameStarted && e.toggleVisibility();
                        }),
                        this.toggleVisibility(),
                        this.root.signals.gameLoadedAndStarted.add(this.toggleVisibility, this);
                }),
                (e.prototype.isVisible = function () {
                    return this.uiGroup.visible;
                }),
                (e.prototype.toggleVisibility = function () {
                    console.log("[UI] Toggling");
                    var e = !this.uiGroup.visible;
                    e ? ((this.uiGroup.visible = true), (this.uiGroup.renderable = true)) : ((this.uiGroup.visible = false), (this.uiGroup.renderable = false)),
                        (this.toggleHint.visible = this.root.gameStarted && !this.uiGroup.visible),
                        ["leaderboard", "beta_overlay", "report_bug_button", "fps_overlay", "debug_overlay", "notifications_area", "component_inspector"].forEach(function (t) {
                            try {
                                document.getElementById(t).style.visibility = e ? "visible" : "hidden";
                            } catch (e) { }
                        });
                }),
                (e.prototype.createViews = function () {
                    var e = this;
                    [DefenseViewUI, TransportViewUI, ProcessorUsageViewUI].forEach(function (t, i) {
                        e.viewInstances.push(new t(e.root, e.uiGroup, i));
                    });
                }),
                (e.prototype.createVisualizers = function () {
                    var e = this,
                        t = [RecomputingNetworkHintUI, GoldIncomeVisualizerUI, DefenseVisualizerUI, ResourceVisualizerUI],
                        i = Config.ui.screenBorder;
                    t.reverse().forEach(function (t) {
                        var a = new t(e.root, e.uiGroup, i);
                        (i += a.height + Config.ui.visualizerSpacing), e.visualizerInstances.push(a);
                    });
                }),
                (e.prototype.getVisualizerByClass = function (e) {
                    return this.visualizerInstances.find(function (t) {
                        return t instanceof e;
                    });
                }),
                (e.prototype.update = function () {
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
                }),
                e
            );
        })(),
        InputManager = (function () {
            function e(t) {
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.objects = []),
                    (this.currentInputDownObject = null),
                    (this.currentInputHoverObject = null),
                    window.mouseTracker.onMouseDown.add(this.handleMouseDown, this),
                    window.mouseTracker.onMouseUp.add(this.handleMouseUp, this),
                    window.mouseTracker.onMouseMove.add(this.handleMouseMove, this),
                    t.signals.gameFocusChanged.add(this.onFocusChanged, this);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "InputManager";
                        },
                    },
                ]),
                (e.prototype.register = function (e) {
                    arguments.length > 1 && void 0 !== arguments[1] && arguments[1] && (e.inputAlwaysCatch = true), this.objects.push(e);
                }),
                (e.prototype.clearObjects = function () {
                    this.objects = [];
                }),
                (e.prototype.onFocusChanged = function () {
                    this.root.focus.isFocused() ||
                        (this.currentInputHoverObject && (this.currentInputHoverObject.events.onInputUp.dispatch(), (this.currentInputHoverObject = null)),
                            this.currentInputDownObject && (this.currentInputDownObject.events.onInputUp.dispatch(), (this.currentInputDownObject = null)));
                }),
                (e.prototype.isObjectViableForInput = function (e) {
                    return e instanceof Phaser.Stage || (!!(e.alive && e.exists && e.visible) && !(!e.inputAlwaysCatch && e.parent && !this.isObjectViableForInput(e.parent)));
                }),
                (e.prototype.handleMouseUp = function () {
                    this.currentInputDownObject && (this.currentInputDownObject.events.onInputUp.dispatch(), (this.currentInputDownObject = null));
                }),
                (e.prototype.handleMouseMove = function () {
                    var e = this.findObjectBelowCursor();
                    e !== this.currentInputHoverObject && (this.currentInputHoverObject && this.currentInputHoverObject.events.onInputOut.dispatch(), e && e.events.onInputOver.dispatch(), (this.currentInputHoverObject = e));
                }),
                (e.prototype.handleMouseDown = function () {
                    this.currentInputDownObject = null;
                    var e = this.findObjectBelowCursor();
                    e && (e.events.onInputDown.dispatch(), (this.currentInputDownObject = e));
                }),
                (e.prototype.findObjectBelowCursor = function () {
                    for (var e = window.mouseTracker.getPosition(), t = e.x, i = e.y, a = null, o = 0; o < this.objects.length; ++o) {
                        var n = this.objects[o],
                            r = n.getBounds();
                        r && t >= r.x && i >= r.y && t <= r.x + r.width && i <= r.y + r.height && this.isObjectViableForInput(n) && (!a || n.renderOrderID > a.renderOrderID) && (a = n);
                    }
                    return a;
                }),
                e
            );
        })(),
        ccFixBaseBootState = Phaser.State,
        BootState = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype.init = function () {
                    this.stage.backgroundColor = "#333";
                }),
                (t.prototype.preload = function () {
                    var e = this;
                    this.load.atlas("atlas", __webpack_require__(436), null, ATLAS, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY),
                        this.load.onLoadComplete.add(function () {
                            console.log("Atlas loaded at", Math.floor(performance && performance.now())),
                                setTimeout(function () {
                                    e.state.start("Game", true, false);
                                }, 100);
                        });
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "BootState";
                        },
                    },
                ]),
                t
            );
        })(ccFixBaseBootState);

        class Stats {
            constructor() {
                this[GEM_ATTR_NAME] = new CSVar(Config.startGems);
                this[POINTS_ATTR_NAME] = new CSVar(Config.startPoints);
                this.unlockedSkills = [];
                this.cachedSkillData = {};
                if (Config.allSkillsUnlocked) {
                    this.unlockedSkills = Object.keys(SKILL_TREE);
                }
                this.gemsOverTime = {};
                this.recomputeCachedSkillData();
            }
        
            storeGemsOverTime(time) {
                this.gemsOverTime[time] = this.gems;
            }
        
            isSkillUnlocked(skillName) {
                return this.unlockedSkills.includes(skillName);
            }
        
            getSkillGain(skillName) {
                if (this.cachedSkillData[skillName] === undefined) {
                    throw new Error(`Invalid gain: '${skillName}'`);
                }
                return this.cachedSkillData[skillName];
            }
        
            recomputeCachedSkillData() {
                const newData = {};
                for (const gainName in GAIN_MAPPINGS) {
                    newData[gainName] = GAIN_MAPPINGS[gainName].default;
                }
                this.unlockedSkills.forEach((skillName) => {
                    const skill = SKILL_TREE[skillName];
                    for (const gainName in skill.gains) {
                        newData[gainName] += skill.gains[gainName];
                    }
                });
                this.cachedSkillData = newData;
            }
        
            unlockSkill(skillName) {
                this.unlockedSkills.push(skillName);
                this.recomputeCachedSkillData();
            }
        
            getSkillGainMultiplier(skillName) {
                return this.getSkillGain(skillName) / 100;
            }
        
            serialize() {
                return {
                    gems: this.gems,
                    points: this.points,
                    skills: this.unlockedSkills,
                    gemsOverTime: this.gemsOverTime,
                };
            }
        
            load(data) {
                this.gems = data.gems || 0;
                this.points = data.points || 0;
                this.unlockedSkills = data.skills || [];
                this.gemsOverTime = data.gemsOverTime || [];
                this.recomputeCachedSkillData();
            }
        
            canAfford(cost) {
                return !(cost.gems && Math.floor(cost.gems) > this.gems);
            }
        
            spend(cost) {
                if (cost.gems) {
                    this.gems -= Math.floor(cost.gems);
                }
            }
        
            grant(reward) {
                if (reward.gems) {
                    this.gems += Math.floor(reward.gems);
                }
            }
        
            get gems() {
                return this[GEM_ATTR_NAME].getValue();
            }

            set gems(value) {
                this[GEM_ATTR_NAME].setValue(value)
            }
        
            get points() {
                return this[POINTS_ATTR_NAME].getValue();
            }
        
            set points(value) {
                this[POINTS_ATTR_NAME].setValue(value);
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
        
            static get name() {
                return "Root";
            }
        }
        
        const ComponentInspectorUI = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "ComponentInspectorUI";
                        },
                    },
                ]),
                (e.prototype.updateDebugText = function (e) {
                    var t = "";
                    for (var i in ((t += "Rendering: "), e.renderable && (t += "[renderable] "), e.alive && (t += "[alive] "), e.visible && (t += "[visible] "), (t += "<br/>"), e.components)) {
                        var a = e.getComponentById(i).debugStr();
                        t += '<span class="component_id">' + (i = i.replace("Component", "")) + "</span> " + a + "<br>";
                    }
                    var o = e.constructor.name,
                        n = e.getTile(),
                        r = o + " | tileX " + n[0] + ", tileY  " + n[1] + " | ",
                        s = "<b class='component_title'>" + (r += "x " + e.x + ", y " + e.y) + "</b><br>";
                    (s += t.replace("\n", "<br>")), (document.getElementById("component_inspector").innerHTML = s);
                }),
                (e.prototype.update = function () {
                    var e = null,
                        t = getTileBelowCursor(this.root.phaser),
                        i = _slicedToArray(t, 2),
                        a = i[0],
                        o = i[1],
                        n = this.root.map;
                    n.isValidCoordinate(a, o) && n.isTileUsed(a, o) && (e = n.getTileContent(a, o));
                    for (var r = this.root.entityMgr.dynamicEntities, s = 0; s < r.length; ++s) {
                        var l = r[s];
                        l.mouseIsAboveEntity() && (e = l);
                    }
                    e ? (this.updateDebugText(e), (document.getElementById("component_inspector").style.display = "block")) : (document.getElementById("component_inspector").style.display = "none");
                }),
                e
            );
        })();

        class ZombieBoss extends Enemy {
            constructor(i, a, o, n) {
                const r = n[0];
                super(i, a, o, r, GAME_BALANCING.enemies.zombieBoss);
                this.getComponent(DamageOnHitComponent).attackParticle = MetaZombieAttackParticle;
                this.getComponent(DamageOnHitComponent).attackStyle = ATTACK_BOSS;
                this.getComponent(DamageOnHitComponent).maxRadiusTiles = 2 * oneTileDistance;
                this.getComponent(DamageOnHitComponent).penetratesShields = true;
                this.getComponent(EnemyAIComponent).targetsBaseOnly = true;
                this.addComponent(new BossComponent());
            }
        
            getEyesPosition() {
                return this.mainSprite.scale.x < 0
                    ? [
                          [21, 22],
                          [42, 22],
                      ]
                    : [
                          [26, 22],
                          [47, 22],
                      ];
            }
        
            makeSprite() {
                const e = this.phaser.make.image(10, 10, "atlas", "zombie-boss.png");
                e.position.setTo(Config.tileSize / 2);
                e.anchor.setTo(0.5, 0.5);
                this.addChild(e);
                this.mainSprite = e;
            }
        
            static get name() {
                return "ZombieBoss";
            }
        }    

        class Zombie extends Enemy {
            constructor(i, a, o, n) {
                const r = n[0];
                super(i, a, o, r, GAME_BALANCING.enemies.zombie);
        
                this.animationSeed = ZOMBIE_ANIMATION_SEED;
                ZOMBIE_ANIMATION_SEED += 1;
        
                this.level = r;
                this.getComponent(EnemyAIComponent).targetsBaseOnly = this.level > 0 ? Math.random() <= GAME_BALANCING.enemies.zombie.percentageAttackingBase : true;
                this.getComponent(DamageOnHitComponent).attackParticle = MetaZombieAttackParticle;
            }
        
            static get name() {
                return "Zombie";
            }
        
            update() {
                super.update();
                const t = 2 * upDownLinearMorph(this.phaser.rootRecursiveRef.time.now / 1e3 + 1.195234 * this.animationSeed, 2) - 1;
                this.mainSprite.pivot.setTo(0.5 * Math.sin(t * Math.PI), 3 * t);
            }
        
            makeSprite(e) {
                const t = this.phaser.make.image(10, 10, "atlas", "zombie-level-" + (e % 7) + ".png");
                t.position.setTo(Config.tileSize / 2), t.anchor.setTo(0.5, 0.5), this.addChild(t), (this.mainSprite = t);
            }
        }
        
        class Creeper extends Enemy {
            constructor(i, a, o, n) {
                const r = n[0];
                super(i, a, o, r, GAME_BALANCING.enemies.creeper);
        
                this.animationSeed = CREEPER_ANIMATION_SEED;
                CREEPER_ANIMATION_SEED += 1;
        
                this.level = r;
                this.getComponent(EnemyAIComponent).targetsBaseOnly = Math.random() <= GAME_BALANCING.enemies.creeper.percentageAttackingBase;
                this.getComponent(EnemyAIComponent).farSpeedBoost = 2;
                this.addComponent(new ExplodesOnHitComponent({ damage: this.balancing.damage(r), radiusTiles: this.balancing.explosionRadius(r) }));
        
                this.blinkSprite = i.make.image(Config.tileSize / 2, 13, "atlas", "creeper-overlay.png");
                this.blinkSprite.anchor.x = 0.5;
                this.addChild(this.blinkSprite);
            }
        
            static get name() {
                return "Creeper";
            }
        
            update() {
                super.update();
                const t = this.phaser.rootRecursiveRef.time.now / 1e3 + 1.05123 * this.animationSeed;
                this.blinkSprite.visible = t % 0.3 > 0.15;
            }
        
            makeSprite(e) {
                const t = this.phaser.make.image(10, 10, "atlas", "creeper-level-" + (e % 7) + ".png");
                t.position.setTo(Config.tileSize / 2), t.anchor.setTo(0.5, 0.5), this.addChild(t), (this.mainSprite = t);
            }
        }

        class WaveManager {
            constructor(root) {
                this.root = root;
                this.root.signals.nightEntered.add(this.onNightStarted, this);
            }
        
            static get name() {
                return "WaveManager";
            }
        
            onNightStarted() {
                if (Config.zombiesEnabled && this.root.gamemode.autoSpawnsZombies()) {
                    const day = this.root.daytime.getDay();
                    this.spawnWave(day);
                }
            }
        
            getWaveEnemies(day) {
                const zombieLevelIncreaseDays = GAME_BALANCING.zombieLevelIncreaseDays;
                let totalZombies = GAME_BALANCING.zombieCount(day);
                const wavesBeforeBoss = Math.floor(day / zombieLevelIncreaseDays);
                const bossWaveProgress = wavesBeforeBoss === 0 ? 0 : (day % zombieLevelIncreaseDays) / zombieLevelIncreaseDays;
                const creeperAmountPercent = GAME_BALANCING.creeperAmountPercent;
                const enemies = [];
                const isBossWave = day % GAME_BALANCING.bossInterval === 0 && day !== 0;
                const bossWaveLevel = Math.max(0, Math.floor(day / GAME_BALANCING.bossLevelIncrease) - 1);
        
                if (isBossWave) {
                    enemies.push({
                        enemyClass: ZombieBoss,
                        level: bossWaveLevel
                    });
                    totalZombies = Math.floor(totalZombies * GAME_BALANCING.zombieAmountInBossWave);
                }
        
                const undeadCount = totalZombies * (1 - creeperAmountPercent);
                const creeperCount = totalZombies * creeperAmountPercent;
        
                const normalUndead = Math.round(undeadCount * (1 - bossWaveProgress));
                const tougherUndead = Math.round(undeadCount * bossWaveProgress);
                const normalCreepers = Math.round(creeperCount * (1 - bossWaveProgress));
                const tougherCreepers = Math.round(creeperCount * bossWaveProgress);
        
                for (let i = 0; i < normalUndead; i++) {
                    enemies.push({
                        enemyClass: Zombie,
                        level: wavesBeforeBoss
                    });
                }
        
                for (let i = 0; i < tougherUndead; i++) {
                    enemies.push({
                        enemyClass: Zombie,
                        level: wavesBeforeBoss + 1
                    });
                }
        
                for (let i = 0; i < normalCreepers; i++) {
                    enemies.push({
                        enemyClass: Creeper,
                        level: wavesBeforeBoss
                    });
                }
        
                for (let i = 0; i < tougherCreepers; i++) {
                    enemies.push({
                        enemyClass: Creeper,
                        level: wavesBeforeBoss + 1
                    });
                }
        
                if (Config.displayWaves) {
                    let waveInfo = `|-\n`;
                    waveInfo += `| Day: ${day}\n`;
                    waveInfo += `| Zombies: ${Math.round(undeadCount)}\n`;
                    waveInfo += `| Creepers: ${Math.round(creeperCount)}\n`;
                    waveInfo += `| isBossWave: ${isBossWave ? "1" : "0"}\n`;
                    console.log(waveInfo);
                }
        
                console.log(enemies);
                return enemies;
            }
        
            async spawnWave(day) {
                const enemies = this.getWaveEnemies(day);
                const groupSize = Math.floor((day / 6) + 20); // Number of enemies per group
                const delayBetweenGroups = 200; // Delay in ms between spawning groups
                const totalGroups = Math.ceil(enemies.length / groupSize);

                for (let i = 0; i < totalGroups; i++) {
                    const groupStartIndex = i * groupSize;
                    const groupEnemies = enemies.slice(groupStartIndex, groupStartIndex + groupSize);

                    for (const enemy of groupEnemies) {
                        const {
                            enemyClass,
                            level
                        } = enemy;
                        await this.root.logic.spawnNewEnemy(enemyClass, level);
                    }

                    if (i < totalGroups - 1) {
                        await this.delay(delayBetweenGroups);
                    }
                }
            }

            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
        const PerformanceStats = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t), (this.frameStats = null), this.postFrameCallback();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "PerformanceStats";
                        },
                    },
                ]),
                (e.prototype.setRenderedEntities = function (e) {
                    this.frameStats.renderedEntities = e;
                }),
                (e.prototype.postFrameCallback = function () {
                    this.frameStats = { renderedEntities: 0 };
                }),
                (e.prototype.getStatsText = function () {
                    var e = "<b>Performance:</b><br />";
                    return (e += this.root.entityMgr.getStatsText() + "<br />"), (e += this.frameStats.renderedEntities + " rendered entities<br />"), (e += this.root.animations.debugStr() + "<br />");
                }),
                e
            );
        })(),
        StatSyncer = (function () {
            function e(t) {
                var i = this;
                _classCallCheck(this, e),
                    (this.root = t),
                    (this.playerId = this.generatePlayerId()),
                    (this.gameId = null),
                    (this.playerName = "Player"),
                    console.log("[SYNC] PlayerId =", this.playerId),
                    console.log("[SYNC] GameSite =", this.getGameSite()),
                    (this.pageload = new Date().getTime()),
                    (this.usedTutorial = false),
                    (window.setPlayerName = function (e) {
                        return i.setPlayerName(e);
                    });
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "StatSyncer";
                        },
                    },
                ]),
                (e.prototype.serialize = function () {
                    return { playerId: this.playerId, gameId: this.gameId, playerName: this.playerName, pageload: this.pageload, usedTutorial: this.usedTutorial };
                }),
                (e.prototype.load = function (e) {
                    (this.playerId = e.playerId), (this.gameId = e.gameId), (this.playerName = e.playerName), (this.pageload = e.pageload), (this.usedTutorial = e.usedTutorial), this.sendDump();
                }),
                (e.prototype.generatePlayerId = function () {
                    return _jsBase.Base64.encode(new Date().getTime() + "-" + randomInt(1e10, 1e11)).replace("=", "A");
                }),
                (e.prototype.setPlayerName = function (e) {
                    this.gameId
                        ? console.error("Player name set after game was registered, ignoring")
                        : (isValidName(e)
                            ? ((this.playerName = e), console.log("[SYNC] PlayerName set to '" + this.playerName + "'"))
                            : ((this.playerName = generateInitialPlayerName()), console.warn("[SNYC] Player name '" + e + "' is not valid, using '" + this.playerName + "' instead")),
                            this.root.persistent.setString("lastPlayerName", this.playerName),
                            this.root.persistent.setString("stdPlayerName", this.playerName));
                }),
                (e.prototype.sendDump = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    Config.tutorialActive && (this.usedTutorial = true),
                        this.root.focus.isVisible() &&
                        ((this.root.gamemode && this.root.gamemode.isSandbox()) ||
                            (this.gameId ? this.sendUpdate(e) : this.registerGame()));
                }),
                (e.prototype.registerGame = function () {
                    var e = this;
                    console.log("[SYNC] Registering game ...");
                    var t = {
                        PlayerId: this.playerId,
                        PlayerName: this.playerName,
                        GamesSite: this.getGameSite(),
                        Adblock: !window.adsSupported,
                        Mapseed: this.root.logic.mapSeed.toString(),
                        Version: YORGIO.VERSION,
                        Tutorial: Config.tutorialActive,
                        GameMode: this.root.gamemode.getId(),
                    };
                    this.root.api.registerGame(
                        t,
                        function (t) {
                            var i = t.GameId;
                            console.log("[SYNC] Got game id:", i), (e.gameId = i);
                        },
                        function () {
                            console.log("[SYNC] Failed to get game id!");
                        }
                    );
                }),
                (e.prototype.sendGameOver = function () {
                    this.sendDump(true);
                }),
                (e.prototype.sendUpdate = function () {
                    this.root.api.updateGame(
                        this.gameId,
                        { Paused: Config.gameTimeSpeedUpFactor < 1, FPS: Math.round(this.root.time.averageFPS()), Day: this.root.daytime.getDay(), Gems: Math.floor(this.root.stats.gems) },
                        function () {
                            console.log("[SYNC] Sucessfully synced");
                        },
                        function () {
                            console.warn("[SYNC] Unsucessfull sync.");
                        }
                    );
                }),
                (e.prototype.getGameSite = function () {
                    try {
                        return new URL(document.referrer).hostname;
                    } catch (e) {
                        return "";
                    }
                }),
                (e.prototype.createDump = function () {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        i = {};
                    return (
                        META_BUILDINGS.forEach(function (t) {
                            var a = t.getInstanceClass();
                            i[a.name] = e.root.logic.countBuildings(a);
                        }),
                        {
                            version: YORGIO.VERSION,
                            playerid: this.playerId,
                            playername: this.playerName,
                            pageload: this.pageload,
                            gems: this.root.stats.gems,
                            day: this.root.daytime.getDay(),
                            actions: "{}",
                            mapseed: this.root.logic.mapSeed,
                            gameover: t,
                            buildings: i,
                            paused: Config.gameTimeSpeedUpFactor < 1,
                            fps: roundDecimals(this.root.time.averageFPS(), 1),
                            adblock: !window.adsSupported,
                            intutorial: Config.tutorialActive,
                            usedtutorial: this.usedTutorial,
                            gamessite: this.getGameSite(),
                            language: CURRENT_LANGUAGE,
                        }
                    );
                }),
                e
            );
        })()

    class LeaderboardUI {
        constructor(t) {
            this.root = t;
            this.lastUpdate = 0;
            this.currentData = [];
            this.permanentData = null;
            this.fetchPermanentBoard();
            window.refreshWelcomeBoard = () => this.rerenderPermanentBoard();
        }

        static get name() {
            return "LeaderboardUI";
        }

        fetchPermanentBoard() {
            this.root.api.getPermanentLeaderboard(
                this.onPermanentLeaderboardData.bind(this),
                this.onPermanentLeaderboardFail.bind(this)
            );
        }

        onPermanentLeaderboardData(data) {
            this.permanentData = data;
            this.rerenderPermanentBoard();
        }

        rerenderPermanentBoard() {
            if (!document) {
                console.warn("Document is null!");
                return;
            }

            let entriesHtml = tr("score_no_entries");
            if (this.permanentData && this.permanentData.Entries) {
                const modeSelector = document.getElementById("leaderboardGamemodeSelector");
                const rangeSelector = document.getElementById("leaderboardRangeSelector");

                if (!modeSelector || !rangeSelector) return;

                const selectedMode = modeSelector.options[modeSelector.selectedIndex].value;
                const selectedRange = `${selectedMode}.${rangeSelector.options[rangeSelector.selectedIndex].value}`;
                const entries = this.permanentData.Entries[selectedRange];

                if (entries && entries.length > 0) {
                    entriesHtml = `<table>${entries.map(({ PlayerName, Day, Gems }, index) => `
                          <tr class='lbRank${index}'>
                            <td class='lbPlayerName'>${PlayerName}</td>
                            <td class='lbPlayerGems'>${formatBigNumber(Gems)}</td>
                            <td class='lbDay'>${Day}</td>
                          </tr>
                        `).join("")}</table>`;
                }
            }

            try {
                const dynamicInner = document.getElementById("permanentLeaderboardDynamicInner");
                if (dynamicInner) dynamicInner.innerHTML = entriesHtml;
            } catch (error) {
                console.error(error);
            }
        }

        onPermanentLeaderboardFail() {
            console.error("Failed to get permanent leaderboard!");
            try {
                const dynamicInner = document.getElementById("permanentLeaderboardDynamicInner");
                if (dynamicInner) dynamicInner.innerHTML = tr("failed_to_fetch_leaderboard");
            } catch (error) {
                console.error(error);
            }
        }

        makeRow(playerName, day, isCurrentPlayer, rank, topDivider = false) {
            const rowClass = isCurrentPlayer ? `currentPlayer${topDivider ? " topDivider" : ""}` : "";
            const dayId = isCurrentPlayer ? "id='curentPlayerDay'" : "";

            return `<tr class='${rowClass}'><td class='td_rank'>${rank}</td><td class='td_player'>${playerName}</td><td class='td_day' ${dayId}>${day}</td></tr>`;
        }

        fetchNewData() {
            this.lastUpdate = new Date().getTime();
            this.root.api.getCurrentLeaderboard(
                this.root.syncer.gameId,
                this.root.syncer.playerId,
                this.root.gamemode.getId(),
                this.onNewLeaderboardData.bind(this),
                this.onLeaderboardFailed.bind(this)
            );
        }

        onNewLeaderboardData(data) {
            this.currentData = data;
            this.redrawLeaderboard();
        }

        onLeaderboardFailed() {
            this.currentData = [];
            try {
                const leaderboardElement = document.getElementById("leaderboard");
                if (leaderboardElement) leaderboardElement.innerHTML = "<span class='leaderboard_error'>Leaderboard not available</span>";
            } catch (error) {
                console.error(error);
            }
        }

        redrawLeaderboard() {
            let leaderboardHtml = "<table border='0' cellspacing='0'>";
            ["rank", "name", "day"].forEach((header) => {
                leaderboardHtml += `<th>${tr("leaderboard_" + header)}</th>`;
            });

            let isTopPlayer = this.currentData.PlayerRank > 0 && this.currentData.PlayerRank < 5;

            this.currentData.Entries.forEach(({
                GameId,
                PlayerName,
                Day,
                PlayerId
            }, index) => {
                let playerNameShort = PlayerName || "Player";
                playerNameShort = playerNameShort.substr(0, 15);

                const isCurrentPlayer = GameId === this.root.syncer.gameId || PlayerId === this.root.syncer.playerId;
                if (isCurrentPlayer) isTopPlayer = true;

                leaderboardHtml += this.makeRow(playerNameShort, Day || 0, isCurrentPlayer, index + 1);
            });

            if (!isTopPlayer) {
                const currentPlayerRank = this.currentData.PlayerRank > 0 ? this.currentData.PlayerRank : "";
                leaderboardHtml += this.makeRow(this.root.syncer.playerName, 0, true, currentPlayerRank, true);
            }

            leaderboardHtml += "</table>";

            try {
                const leaderboardElement = document.getElementById("leaderboard");
                if (leaderboardElement) leaderboardElement.innerHTML = leaderboardHtml;
            } catch (error) {
                Raven.captureException(error, {
                    extra: {
                        msg: "Leaderboard div dismissed",
                    },
                });
            }
        }

        forceUpdate() {
            this.lastUpdate = null;
        }

        update() {
            const leaderboardElement = document.getElementById("leaderboard");
            if (Config.tutorialActive || !this.root.gameStarted || this.root.gamemode.isSandbox()) {
                if (leaderboardElement) leaderboardElement.style.display = "none";
            } else {
                if (leaderboardElement) leaderboardElement.style.display = "block";

                if (!this.lastUpdate || new Date().getTime() - this.lastUpdate > 1000 * Config.leaderboardInterval) {
                    this.fetchNewData();
                }

                const currentPlayerDay = document.getElementById("curentPlayerDay");
                if (currentPlayerDay) currentPlayerDay.innerText = this.root.daytime.getDay();
            }
        }
    }

    class ZoomManager {
        constructor(root) {
            this.root = root;
            this.currentZoomLevel = 1;
            this.currentZoomStack = 0;
            this.maximumWindowZoomLevel = MAX_ZOOM_LEVEL;
    
            this.root.phaser.customZoomLevel = this.currentZoomLevel;
    
            this.root.signals.consistentGameUpdate.add(this.update, this);
    
            window.addEventListener("resize", () => this.updateMaximumZoom());
            window.addEventListener("wheel", (e) => this.handleWheelEvent(e), { passive: false });
    
            setTimeout(() => this.updateMaximumZoom(), 1);
    
            this.currentPinchDistance = null;
            window.addEventListener("touchmove", (e) => this.computePinchDistance(e), false);
            window.addEventListener("touchstart", (e) => {
                this.currentPinchDistance = null;
                this.computePinchDistance(e);
            }, false);
        }
    
        static get name() {
            return "ZoomManager";
        }
    
        computePinchDistance(e) {
            if (e.touches && e.touches.length >= 2) {
                const t = e.touches[0];
                const i = e.touches[1];
                const pinchDistance = Math.hypot(t.clientX - i.clientX, t.clientY - i.clientY);
    
                if (this.currentPinchDistance === null) {
                    this.currentPinchDistance = pinchDistance;
                } else {
                    const pinchDelta = pinchDistance - this.currentPinchDistance;
                    this.onMouseWheel(0, -pinchDelta * PINCH_STRENGTH);
                    console.log("Mousewheel:", pinchDelta);
                    this.currentPinchDistance = pinchDistance;
                }
                e.preventDefault();
            }
        }
    
        updateMaximumZoom() {
            const e = Config.numTilesX * Config.tileSize;
            const t = Config.numTilesY * Config.tileSize;
            const i = e / window.innerWidth / 1;
            const a = t / window.innerHeight / 1;
            const o = Math.max(0.25, Math.min(MAX_ZOOM_LEVEL, Math.min(i, a)));
    
            this.maximumWindowZoomLevel = o;
    
            if (this.currentZoomLevel > this.maximumWindowZoomLevel) {
                console.log("[Zoom] Adjusting zoom to max:", this.maximumWindowZoomLevel);
                this.setZoomLevel(this.maximumWindowZoomLevel, true);
            }
        }
    
        handleWheelEvent(e) {
            if (this.root.dialogs.modalDialogIsOpen()) {
                if (true === e.ctrlKey) e.preventDefault();
            } else {
                this.root.gameStarted && e.preventDefault();
                let t = e.deltaX || 0;
                let i = e.deltaY || 0;
                let a = e.deltaZ || 0;
                const o = e.deltaMode;
                let n = 1;
    
                switch (o) {
                    case 0:
                        break;
                    case 1:
                        n = 18;
                        break;
                    case 2:
                        n = window.innerHeight;
                        break;
                    default:
                        console.error("[ZOOM] Unknown event.deltaMode:", o);
                }
    
                i *= n;
                a *= n;
                t *= n;
    
                if (t || i || a) {
                    this.onMouseWheel(t, i, a);
                }
            }
        }
    
        onMouseWheel(t, i) {
            if (this.root.gameStarted && !Config.tutorialActive) {
                const a = i / 100;
                this.currentZoomStack += a;
            }
        }
    
        zoomIn() {
            this.onMouseWheel(0, -250);
        }
    
        zoomOut() {
            this.onMouseWheel(0, 250);
        }
    
        isZoomInPossible() {
            return this.root.gameStarted && !Config.tutorialActive &&
                Math.abs(this.currentZoomLevel - MIN_ZOOM_LEVEL) > 0.01;
        }
    
        isZoomOutPossible() {
            return this.root.gameStarted && !Config.tutorialActive &&
                Math.abs(this.currentZoomLevel - MAX_ZOOM_LEVEL) > 0.01;
        }
    
        setZoomLevel(zoomLevel, signalChange = true) {
            this.currentZoomLevel = Math.min(this.maximumWindowZoomLevel,
                Math.max(MIN_ZOOM_LEVEL, zoomLevel));
            this.currentZoomStack = 0;
            this.root.phaser.customZoomLevel = this.currentZoomLevel;
            if (signalChange) {
                this.root.signals.zoomLevelChanged.dispatch(this.currentZoomLevel);
            }
        }
    
        update() {
            let a = 0;
    
            if (SMOOTH_ZOOM && Math.abs(this.currentZoomStack) > 0.01) {
                a = this.currentZoomStack * Math.min(1, ZOOM_TAKE *
                    (this.root.time.physicsElapsedConsistent / 0.01666));
            } else {
                a = this.currentZoomStack;
            }
    
            if (Math.abs(a) > 0.001) {
                this.currentZoomStack -= a;
                this.currentZoomLevel += a * ZOOM_STRENGTH;
                this.currentZoomLevel = Math.min(this.maximumWindowZoomLevel,
                    Math.max(MIN_ZOOM_LEVEL, this.currentZoomLevel));
    
                const t = window.mouseTracker.getPosition();
                const i = this.root.phaser.camera.view;
                const o = this.root.phaser.customZoomLevel - this.currentZoomLevel;
                this.root.phaser.customZoomLevel = this.currentZoomLevel;
                const n = [(i.x + t.x) * o, (i.y + t.y) * o];
                const r = this.root.phaser.camera;
                r.x += Math.round(n[0] / this.currentZoomLevel);
                r.y += Math.round(n[1] / this.currentZoomLevel);
                this.root.signals.zoomLevelChanged.dispatch(this.currentZoomLevel);
            } else {
                this.currentZoomStack = 0;
            }
        }
    }
        
    const SoundManager = (function () {
            function e(t) {
                _classCallCheck(this, e),
                    (this.root = t),
                    this.loadSounds(),
                    (this.currentBackgroundState = "normal"),
                    (this.playedBuildingSoundThisFrame = false),
                    (this.howlerIsMuted = false),
                    (this.currentBackgroundRate = 1),
                    (this.backgroundMuteState = false),
                    (this.numSfxStartedThisFrame = 0),
                    (this.soundsMuted = this.root.persistent.getBool("soundsMuted", false)),
                    (this.musicMuted = this.root.persistent.getBool("musicMuted", false)),
                    (_howler.Howler.autoSuspend = false),
                    this.initSignals();
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "SoundManager";
                        },
                    },
                ]),
                (e.prototype.initSignals = function () {
                    var e = this,
                        t = this.root.signals;
                    [
                        [t.uiActionPerformed, this.buttonClickSound],
                        [t.uiActionPerformedAndFailed, this.buttonFailSound],
                        [t.gameLoadedAndStarted, this.buttonClickSound],
                        [t.uiSkillMarkedForLevelUp, this.buildingPlacedSound],
                        [t.uiNotificationDialogOpened, this.notificationSound],
                    ].forEach(function (t) {
                        var i = _slicedToArray(t, 2),
                            a = i[0],
                            o = i[1];
                        a.add(function () {
                            e.soundsMuted || o.play();
                        });
                    }),
                        t.buildingPlaced.add(function () {
                            e.playedBuildingSoundThisFrame || ((e.playedBuildingSoundThisFrame = true), e.playWorldSpace(e.buildingPlacedSound));
                        }),
                        t.buildingDestroyed.add(function (t) {
                            e.playSFX(e.buildingDestroyedSound, t.x, t.y);
                        }),
                        t.gameLoadedAndStarted.add(function () {
                            e.backgroundSounds.normal.play(), e.backgroundSounds.night.play(), e.backgroundSounds.boss.play();
                        }),
                        t.gameOver.add(function () {
                            for (var t in (_howler.Howler.mute(true), e.backgroundSounds)) e.backgroundSounds[t].mute(true);
                        }),
                        t.consistentGameUpdate.add(this.update, this);
                    var i = window.closeDialog;
                    (window.closeDialog = function (t, a) {
                        return i && i(t), a || e.soundsMuted || e.buttonClickSound.play(), true;
                    }),
                        this.root.signals.gameFocusChanged.add(this.update, this);
                }),
                (e.prototype.toggleSounds = function () {
                    (this.soundsMuted = !this.soundsMuted), this.root.persistent.setBool("soundsMuted", this.soundsMuted);
                }),
                (e.prototype.toggleMusic = function () {
                    (this.musicMuted = !this.musicMuted), this.root.persistent.setBool("musicMuted", this.musicMuted);
                }),
                (e.prototype.playCannonExplosion = function (e, t) {
                    this.playSFX(this.cannonExplosionSound, e, t);
                }),
                (e.prototype.playLightningSound = function (e, t) {
                    this.playSFX(this.lightningSound, e, t);
                }),
                (e.prototype.playArrowSound = function (e, t) {
                    this.playSFX(this.arrowSound, e, t);
                }),
                (e.prototype.playZombieHitSound = function () {
                    Config.gameTimeSpeedUpFactor;
                }),
                (e.prototype.playZombieBossHitSound = function (e, t) {
                    this.playSFX(this.zombieBossAttackSound, e, t);
                }),
                (e.prototype.playCreeperExplosion = function (e, t) {
                    this.playSFX(this.creeperExplosionSound, e, t);
                }),
                (e.prototype.playUpgradeBuildingSound = function () {
                    this.playWorldSpace(this.buildingPlacedSound);
                }),
                (e.prototype.playSFX = function (e, t, i) {
                    if (!this.soundsMuted && this.numSfxStartedThisFrame < MAX_SOUNDS_PER_FRAME) {
                        var a = this.root.phaser.camera.view,
                            o = this.root.zoom.currentZoomLevel,
                            n = [t / o, i / o],
                            r = [a.x + a.width / 2, a.y + a.height / 2],
                            s = (1 / o) * ((1 - Math.min(1, Math.abs(n[0] - r[0]) / a.width)) * (1 - Math.min(1, Math.abs(n[1] - r[1]) / a.height))) * e.volume();
                        if (s < 0.01) return;
                        this.numSfxStartedThisFrame += 1;
                        var l = e.play();
                        e.volume(s, l);
                    }
                }),
                (e.prototype.playWorldSpace = function (e) {
                    if (!this.soundsMuted) {
                        var t = 1 / this.root.zoom.currentZoomLevel,
                            i = e.play();
                        e.volume(i, t * e.volume());
                    }
                }),
                (e.prototype.playZombieSound = function () { }),
                (e.prototype.playCollectGemSound = function () { }),
                (e.prototype.playErrorNotification = function () {
                    this.soundsMuted || this.errorNotification.play();
                }),
                (e.prototype.playSuccessNotification = function () {
                    this.soundsMuted || this.notificationSound.play();
                }),
                (e.prototype.playMapNotificationSound = function () {
                    this.soundsMuted || this.mapNotificationSound.play();
                }),
                (e.prototype.update = function () {
                    var e = "normal";
                    if (
                        ((this.numSfxStartedThisFrame = 0),
                            (this.playedBuildingSoundThisFrame = false),
                            this.root.daytime.isNight() && (e = "night"),
                            this.root.entityMgr.getAllEntitiesWithComponent(BossComponent).length > 0 && (e = "boss"),
                            e !== this.currentBackgroundState)
                    ) {
                        console.log("[SOUND] State changed to", e),
                            this.backgroundSounds[this.currentBackgroundState].fade(1, 0, 2e3),
                            (this.currentBackgroundState = e),
                            this.backgroundSounds[this.currentBackgroundState].fade(0, 1, 2e3);
                    }
                    var t = false;
                    if (
                        (this.root.focus.isVisibleAndFocused() || (t = true),
                            (this.root.adRunning || this.root.externalAdRunning) && (t = true),
                            t !== this.howlerIsMuted && ((this.howlerIsMuted = t), _howler.Howler.mute(t)),
                            this.musicMuted !== this.backgroundMuteState)
                    )
                        for (var i in ((this.backgroundMuteState = this.musicMuted), this.backgroundSounds)) this.backgroundSounds[i].mute(this.musicMuted);
                    var a = 1;
                    Config.gameTimeSpeedUpFactor > 1 && !Config.tutorialActive && (a = 1.6),
                        a !== this.currentBackgroundRate && ((this.currentBackgroundRate = a), this.backgroundSounds.normal.rate(a), this.cannonExplosionSound.rate(a), this.lightningSound.rate(a));
                }),
                (e.prototype.loadSounds = function () {
                    (this.buildingPlacedSound = new _howler.Howl({ src: [__webpack_require__(437)] })),
                        (this.buttonClickSound = new _howler.Howl({ src: [__webpack_require__(438)] })),
                        (this.buttonFailSound = new _howler.Howl({ src: [__webpack_require__(439)] })),
                        (this.buildingDestroyedSound = new _howler.Howl({ src: [__webpack_require__(440)], volume: 0.5 })),
                        (this.cannonExplosionSound = new _howler.Howl({ src: [__webpack_require__(441)], volume: 0.7 })),
                        (this.arrowSound = new _howler.Howl({ src: [__webpack_require__(442)], volume: 0.4 })),
                        (this.lightningSound = new _howler.Howl({ src: [__webpack_require__(443)], volume: 0.3 })),
                        (this.mapNotificationSound = new _howler.Howl({ src: [__webpack_require__(444)] })),
                        (this.zombieBossAttackSound = new _howler.Howl({ src: [__webpack_require__(445)], volume: 0.2 })),
                        (this.creeperExplosionSound = new _howler.Howl({ src: [__webpack_require__(446)] })),
                        (this.notificationSound = new _howler.Howl({ src: [__webpack_require__(447)] })),
                        (this.errorNotification = new _howler.Howl({ src: [__webpack_require__(448)] })),
                        (this.backgroundSounds = {
                            normal: new _howler.Howl({ src: ["./asset/sound_pkg/background.mp3"], loop: true, autoplay: false, html5: true, preload: false }),
                            boss: new _howler.Howl({ src: ["./asset/sound_pkg/background_boss.mp3"], loop: true, autoplay: false, html5: true, preload: false, volume: 0 }),
                            night: new _howler.Howl({ src: ["./asset/sound_pkg/background_night.mp3"], loop: true, autoplay: false, html5: true, preload: false, volume: 0 }),
                        });
                }),
                e
            );
        })(),
        OnlineAPI = (function () {
            function e(t) {
                _classCallCheck(this, e), (this.root = t);
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "OnlineAPI";
                        },
                    },
                ]),
                (e.prototype.getCurrentLeaderboard = function (e, t, i, a, o) {
                    this.get("/highscore/current", { GameId: e, PlayerId: t, GameMode: i }, a, o);
                }),
                (e.prototype.getPermanentLeaderboard = function (e, t) {
                    this.get("/highscore/total", {}, e, t);
                }),
                (e.prototype.registerGame = function (e, t, i) {
                    this.post("/game/create", e, t, i);
                }),
                (e.prototype.updateGame = function (e, t, i, a) {
                    var o = { GameId: e, Status: t };
                    this.post("/game/update", o, i, a);
                }),
                (e.prototype.post = function (e, t, i, a) {
                    this.submitRequest(
                        e,
                        _superagent2.default
                            .post(API_HOST + e)
                            .set("Content-Type", "text/plain")
                            .send(_lzString2.default.compressToUTF16(JSON.stringify(t))),
                        i,
                        a
                    );
                }),
                (e.prototype.get = function (e, t, i, a) {
                    (t.cacheKey = new Date().getTime()), this.submitRequest(e, _superagent2.default.get(API_HOST + e).query(t), i, a);
                }),
                (e.prototype.submitRequest = function (e, t, i, a) {
                    var o = this;
                    console.log("[API] Sending request to", e),
                        t.end(function (t, n) {
                            return o.handleResponse(e, t, n, i, a);
                        });
                }),
                (e.prototype.handleResponse = function (e, t, i, a, o) {
                    if (i && 400 === i.statusCode) return console.warn("[API] ERROR while contacting api, bad request!"), o();
                    if (t || !i) return console.warn("[API] ERROR while contacting online api: ", t), o();
                    if (200 !== i.statusCode) return console.warn("[API] Invalid status code:", i.statusCode), o();
                    var n = i.text;
                    if (!n || n.length < 1) return console.warn("[API] Got empty response"), o();
                    var r = [];
                    try {
                        r = JSON.parse(n);
                    } catch (e) {
                        return console.warn("[API] Invalid json!", e), o();
                    }
                    return r ? a(r, i) : (console.warn("[API] Invalid json!"), o());
                }),
                (e.prototype.makeCacheSuffix = function () {
                    return "?" + new Date().getTime();
                }),
                e
            );
        })(),
        RiverBackgroundRendering = (function (e) {
            function t() {
                return _classCallCheck(this, t), _possibleConstructorReturn(this, e.apply(this, arguments));
            }
            return (
                _inherits(t, e),
                (t.prototype._renderCanvas = function (e) {
                    var t = this.parent.worldTransform,
                        i = t.a,
                        a = e.context;
                    a.save(), a.setTransform(1, 0, 0, 1, 0, 0), (a.globalCompositeOperation = "source-over"), a.beginPath();
                    for (var o = -10; o <= Config.numTilesX + 10; o += 2) {
                        var n = RIVER_METHOD(o / Config.numTilesX) * Config.numTilesY,
                            r = (o - 0.5) * Config.tileSize * i + t.tx,
                            s = n * Config.tileSize * i + t.ty;
                        -10 === o ? a.moveTo(r, s) : a.lineTo(r, s);
                    }
                    (a.strokeStyle = "#" + Config.colors.river.toString(16).padStart(6, "0")), (a.globalAlpha = 0.4);
                    var l = 10 * Math.sin((this.phaser.rootRecursiveRef.time.nowConsistent / 1e3) * 2.3);
                    (a.lineWidth = 2 * (RIVER_HEIGHT_METHOD(0) * Config.tileSize + l) * i), a.stroke(), a.restore();
                }),
                _createClass(t, null, [
                    {
                        key: "name",
                        get: function () {
                            return "RiverBackgroundRendering";
                        },
                    },
                ]),
                t
            );
        })(EntityRenderObject);

    class SavegameManager {
        constructor(t) {
            const i = this;
            this.root = t;
            this.savegames = [];
            this.activeSavegameId = null;
            this.loadSavegames();
            window.deleteSavegame = e => {
                return i.deleteSavegame(e);
            }, window.exportSavegame = e => {
                return i.exportSavegame(e);
            }, window.restoreSavegame = e => {
                return i.restoreSavegame(e);
            }, window.importSavegame = e => {
                return i.importSavegame(e);
            }, this.initDropFallback();
        }

        static get name() {
            return "SavegameManager";
        }

        initDropFallback() {
            document.body.ondrop = e => {
                e.preventDefault();
            }, document.body.ondragover = e => {
                e.preventDefault();
            };
        }

        deleteSavegame(e) {
            console.log("Deleting:", e);
            for (var t = null, i = 0; i < this.savegames.length; ++i)
                if (this.savegames[i].id === e) {
                    t = i;
                    break;
                } null !== t ? (this.savegames.splice(t, 1), this.root.persistent.remove("savegame_blob_" + e), this.root.persistent.remove("savegame_preview_" + e), this.updateMetadata(), document.getElementById("savegame_div_" + e).classList.add("removed"), e === this.activeSavegameId && (this.activeSavegameId = null), this.root.signals.uiActionPerformed.dispatch()) : console.error("[SAVEGAME] Game with id", e, "not found!");
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
            return _jsBase.Base64.encode((new Date).getTime() + "-" + randomInt(1e5, 1e6 - 1)).replace("=", "A").replace("=", "B");
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
                showComponentInspector,
                testGameOver,
                autoPlay,
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

            makePhaserFast();

            this.game.canvas.mozOpaque = true;
            this.game.canvas.webkitOpaque = true;
            this.game.canvas.opaque = true;
        }

        initMessageHandling() {
            window.addEventListener("message", this.onMessage);
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

        onMessage(event) {
            const {
                data
            } = event;
            if (data === "resume") {
                console.log("[MSG] Received resume message from external frame");
                this.root.externalAdRunning = false;
            } else if (data === "pause") {
                console.log("[MSG] Received pause message from external frame");
                this.root.externalAdRunning = true;
            }
        }

        makeBackground() {
            this.game.stage.backgroundColor = "#333";
            var e = this.game.add.fastGroup(this.root.groups.gameRootGroup, "game-bg");
            e.add(makeTiled(this.game, Config.tileSize));
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
                const group = this.game.add.fastGroup(this.root.groups.gameRootGroup, radius);
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
            var e = this,
                t = this.root.particles,
                i = this.root.groups.resourcesParentBaseGroup;
            t.registerSpecialGroup(MetaTree.name, i), t.registerSpecialGroup(MetaGoldOre.name, i), t.registerSpecialGroup(MetaUraniumOre.name, i), t.registerSpecialGroup(MetaIronOre.name, i);
            var a = this.root.groups.explosionsGroup;
            t.registerSpecialGroup(MetaCannonExplosionParticle.name, a),
                t.registerSpecialGroup(MetaEnemyExplosionParticle.name, a),
                LEVEL_TO_PARTICLE.forEach(function (i) {
                    t.registerSpecialGroup(i.name, e.root.groups.explosionsGroup);
                });
            var o = this.root.groups.projectilesGroup;
            t.registerSpecialGroup(MetaCannonProjectile.name, o),
                t.registerSpecialGroup(MetaLightningParticle.name, o),
                t.registerSpecialGroup(MetaPlayerBaseProjectile.name, o),
                t.registerSpecialGroup(MetaArrowProjectile.name, o),
                t.registerSpecialGroup(MetaCriticalHitParticle.name, a);
        }

        create() {
            console.log("Game loaded at", Math.floor(performance && performance.now()));
            this.initGameEngine();
            this.initMessageHandling();

            // Create Root and groups
            this.root = new Root(this.game);
            this.root.groups.gameRootGroup = this.game.add.fastGroup(null, "gameRootGroup");
            this.game.rootRecursiveRef = this.root;
            this.game.animations = this.root.animations;

            // Initialize various components
            this.makeBackground();
            this.initGroups();
            this.root.time = new GameTime();
            this.root.persistent = new PersistentStorage();
            this.root.savegames = new SavegameManager(this.root);
            this.root.settings = new GameSettings(this.root);
            this.root.dialogs = new DialogManager(this.root);
            this.root.zoom = new ZoomManager(this.root);
            this.root.culling = new CullManager(this.root);
            this.root.inputManager = new InputManager(this.root);
            this.root.focus = new GameFocus(this.root);

            // Add event listeners
            this.root.signals.zoomLevelChanged.add(this.onZoomLevelChanged, this);
            this.root.signals.gameOver.add(() => this.onGameOver());

            // Initialize systems and managers
            this.root.gameSystems = new GameSystemManager(this.root);
            this.root.entityMgr = new EntityManager(this.root);
            this.root.daytime = new DaytimeManager(this.root);
            this.root.waveMgr = new WaveManager(this.root);
            this.root.api = new OnlineAPI(this.root);
            this.root.stats = new Stats();
            this.root.perfStats = new PerformanceStats(this.root);
            this.root.animations = new AnimationManager(this.root);
            this.root.map = new Map(this.root);
            connectSignals(this.root.map.changed, this.root.signals.mapLayoutChanged);
            this.root.logic = new GameLogic(this.root);
            this.root.logic.init();
            this.root.particles = new ParticleFactory(this.root);
            this.initResourceParticleGroups();
            this.root.sound = new SoundManager(this.root);
            this.root.gui = new GUI(this.root);
            this.root.gameSystems.initializeDefaultSystems();
            this.root.logic.spawnResources();
            this.root.logic.initCameraSpawn();

            // Component Inspector
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
            const autoStartOnNextPlay = this.root.persistent.getBool("autoStartOnNextPlay", false);
            this.root.persistent.setBool("autoStartOnNextPlay", false);
            const lastPlayerName = this.root.persistent.getString("lastPlayerName");
            const lastGameMode = this.root.persistent.getString("lastGameMode", "easy");

            if (Config.showWelcomeScreen && !autoStartOnNextPlay) {
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
            } else {
                this.root.syncer.setPlayerName(lastPlayerName);
                this.startPlaying(true);
            }

            window.restartGame = () => {
                console.log("[GAME] Restarting ...");
                window.onbeforeunload = undefined;
                window.location.reload();
            };
        }

        onKeyboardCamMovement(e, t) {
            var i = this.root.phaser.camera;
            (i.x += e), (i.y += t);
        }

        startTutorial() {
            (Config.tutorialActive = true), this.startPlaying(true);
        }

        getSelectedGameModeId() {
            if (Config.tutorialActive) return "easy";
            if (!Config.showWelcomeScreen) return "easy";
            var e = document.getElementById("gamemode_select");
            if (!e) return console.error("Could not extract gamemode, element dismished!"), null;
            var t = e.selectedIndex;
            return e.options[t].value;
        }

        startPlaying(e) {
            console.log("[GAME] Attempt to start playing");
            const selectedGameModeId = this.getSelectedGameModeId();
            if (selectedGameModeId) {
                const gameMode = createGameModeFromId(selectedGameModeId);
                if (gameMode) {
                    const sandboxIntentShown = gameMode.isSandbox() && this.root.persistent.setBool("sandboxDiscordIntentShown", true);
                    const hasPlayedYet = this.root.persistent.getBool("hasPlayedYet", false);

                    if (!e && !hasPlayedYet) {
                        this.root.signals.uiActionPerformed.dispatch();
                        window.showDialog("first_time_dialog_bg");
                        return;
                    }

                    console.log("[GAME] Actually start playing");
                    this.root.gamemode = gameMode;
                    this.root.gamemode.initialize();
                    console.log("[GAME] Gamemode =", selectedGameModeId);
                    this.root.persistent.setString("lastGameMode", this.root.gamemode.getId());
                    this.root.persistent.setBool("hasPlayedYet", true);
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

                    try {
                        const welcomeFull = document.getElementById("welcomeFull");
                        if (welcomeFull) {
                            welcomeFull.remove();
                        }
                    } catch (e) {
                        console.warn("Failed to remove welcome screen:", e);
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
            var a = _pixi.PIXI.Texture.fromCanvas(t);
            this.root.inputManager.clearObjects(),
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
            return !!this.root.dialogs.modalDialogIsOpen() || !this.root.focus.isVisibleAndFocused();
        }

        update() {
            this.root.gameStarted && this.performUpdate();
        }

        performUpdate() {
            if (Config.simulateLag)
                for (var e = 2e8; e > 0;) e -= 1;
            var t = this.root.phaser.time.elapsed / 1e3;
            if ((this.root.signals.consistentGameUpdate.dispatch(t), this.gameIsPaused())) this.root.animations.update(true);
            else
                try {
                    this.cameraManager.update(this.root.time.physicsElapsedConsistent),
                        this.root.culling.update(),
                        this.root.time.update(t),
                        cart || (this.root.daytime.update(), this.root.gameSystems.update()),
                        this.root.gui.update(),
                        Config.showComponentInspector && this.root.componentInspector.update(),
                        this.root.entityMgr.update(),
                        this.root.animations.update(),
                        this.root.perfStats.postFrameCallback(),
                        this.root.leaderboard.update(),
                        this.debugManager && this.debugManager.update();
                } catch (e) {
                    console.error(e), console.error(e.stack), EXCEPTION_SHOWN || (EXCEPTION_SHOWN = true);
                }
        }
        static get name() {
            return "GameState"
        }
    }

    class GameOverUI {
        constructor(t, i, a) {
            this.phaser = t;
            this.uiGroup = i;
            this.stats = a;
            this.init();
    
            try {
                document.getElementById("day_night_overlay").className = "";
            } catch (e) {}
    
            window.onbeforeunload = void 0;
        }
    
        static get name() {
            return "GameOverUI";
        }
    
        /**
         * Generate a compressed token using the given parameters.
         * @param {number} e - Some numeric value.
         * @param {number} t - Another numeric value.
         * @param {string} i - A string used to construct the token.
         * @returns {string} - The compressed token.
         */
        genTok(gamemode, day, name) {
            // Determine the base value depending on whether it's beta or not
            const baseValue = YORGIO.IS_BETA ? String.fromCodePoint(1001) : String.fromCodePoint(1000);

            // Pad the input string with '=' characters to a length of 16 characters
            const paddedInput = name.toLowerCase().padEnd(16, "=");

            // Initialize the result with the base value
            let result = baseValue;

            // Loop through the input string in pairs of characters
            for (let r = 0; r < 8; ++r) {
                const firstChar = paddedInput[2 * r];
                const secondChar = paddedInput[2 * r + 1];
                const firstCharIndex = CHARMAP.indexOf(firstChar);
                const secondCharIndex = CHARMAP.indexOf(secondChar);

                // If either character is not found in CHARMAP, add 0 to the result
                if (firstCharIndex < 0 || secondCharIndex < 0) {
                    result += String.fromCodePoint(0);
                } else {
                    // Otherwise, calculate the combined index and add the result to the result string
                    const combinedIndex = 100 * firstCharIndex + secondCharIndex;
                    result += String.fromCodePoint(combinedIndex);
                }
            }

            // Add the unique index and the 't' value to the result
            result += String.fromCodePoint(gamemode.getUniqueIndex()); //1 = Easy
            result += String.fromCodePoint(day);

            // Compress the result using _lzString2.default.compressToEncodedURIComponent()
            return _lzString2.default.compressToEncodedURIComponent(result);
        }

    
        init() {
            const e = this.phaser;
            this.overlay = makePanelBackground(e, 1, 1, 2228241, 0.77);
            this.uiGroup.add(this.overlay);
    
            this.group = e.make.group();
            this.uiGroup.add(this.group);
    
            this.bg = makeRoundedPanelBackground(e, 560, 380, 2236962, 0);
            this.group.add(this.bg);
    
            this.logo = e.make.image(0, 30, "atlas", "small-logo.png");
            this.logo.x = 30;
            this.logo.y = this.bg.height - this.logo.height - 30;
            this.group.add(this.logo);
    
            this.gameOverText = e.make.text(0, 30, tr("game_over").toUpperCase(), {
                font: "60px Roboto",
                fill: "#FF5555",
                boundsAlignH: "center",
                align: "center",
                fontWeight: 400,
            });
            this.gameOverText.setTextBounds(0, 0, this.bg.width, 20);
            this.group.add(this.gameOverText);
    
            let t = "";
            let i = this.stats.day;
            t += tr("gameover_surived_text", i) + " - ";
            t += this.rateDay(i) + "\n\n";
            t += tr("gameover_stats_text", formatBigNumber(this.stats.gems), formatBigNumber(this.stats.score));
    
            this.statsText = e.make.text(0, 120, t, {
                font: "14px Roboto",
                fill: "#CCC",
                boundsAlignH: "center",
                align: "center",
            });
            this.statsText.lineSpacing = -12;
            this.statsText.setTextBounds(0, 0, this.bg.width, 20);
            this.group.add(this.statsText);
    
            this.gemsHeader = e.make.text(30, 200, tr("gameover_gems_over_time").toUpperCase(), {
                font: "13px Roboto",
                fill: "#f77",
                fontWeight: 700,
            });
            this.group.add(this.gemsHeader);
    
            this.gemsGraphics = e.make.graphics(30, 275);
            this.gemsGraphics.lineStyle(1, 16742263);
            this.gemsGraphics.moveTo(0, 0);
    
            let a = [];
            for (let o = 1; o <= this.stats.day; ++o) {
                if (this.stats.gemsOverTime[o]) {
                    a.push(this.stats.gemsOverTime[o]);
                }
            }
    
            let n = a.map((e) => Math.log(Math.max(1, e)));
            let r = Math.max.apply(Math, n);
            let s = 498 / Math.max(1, a.length - 1);
    
            for (let l = 0; l < a.length; ++l) {
                let u = n[l] / r;
                this.gemsGraphics.lineTo(1 + s * l, -49 * u - 1);
            }
    
            this.gemsGraphics.lineStyle(1, 6710886);
            this.gemsGraphics.moveTo(0, 0);
            this.gemsGraphics.lineTo(0, -50);
            this.gemsGraphics.moveTo(0, 0);
            this.gemsGraphics.lineTo(500, 0);
            this.group.add(this.gemsGraphics);
    
            let c = this.genTok(this.stats.gamemode, this.stats.day, this.stats.name);
            let d = document.createElement("div");
            d.id = ["va", "li", "da", "ti", "on", "To", "ke", "n"].join("");
            d.innerText = c;
    
            let h = document.createElement("span");
            h.className = "channelHint";
            h.innerText = tr("validation_token_desc2");
            d.appendChild(h);
    
            document.body.appendChild(d);
    
            this.retryButton = makeButton({
                phaser: e,
                width: 190,
                text: tr("gameover_try_again"),
                fill: 16733525,
                clickHandler: () => {
                    window.location.reload(true);
                },
                keybinding: Phaser.Keyboard.F5,
            });
            this.retryButton.x = Math.floor(this.bg.width - this.retryButton.width - 30);
            this.retryButton.y = this.bg.height - this.retryButton.height - 30;
            this.group.add(this.retryButton);
            e.add.tween(this.retryButton).to({
                alpha: 0.8
            }, 200, Phaser.Easing.Linear.None, true, 0, false, true);
        }
    
        rateDay(e) {
            const t = [0, 5, 10, 20, 30, 50, 100, 150, 200];
    
            for (let i = t.length - 1; i >= 0; i -= 1) {
                let a = t[i];
                if (e >= a) {
                    return tr("gameover_score_" + a);
                }
            }
    
            return "Something went wrong ...";
        }
    
        update() {
            const e = window.innerWidth;
            const t = window.innerHeight;
            this.group.x = Math.floor((e - this.bg.width) / 2);
            this.group.y = 110;
            this.overlay.scale.setTo(e, t);
        }
    }

    class GameOverState extends Phaser.State {
        constructor() {
            super();
        }

        init(e) {
            this.stage.backgroundColor = "#333";
            this.group = this.add.group(null, "game-over");
            this.group.fixedToCamera = true;
            this.background = e.background;
            this.backgroundSprite = this.make.image(0, 0, this.background);
            this.backgroundSprite.anchor.setTo(0.5, 0.5);
            this.group.add(this.backgroundSprite);

            this.ui = new GameOverUI(this, this.group, e);

            document.body.classList.add("gameOver");
        }

        update() {
            this.ui.update();
            this.backgroundSprite.position.setTo(this.game.width / 2, this.game.height / 2);
            this.backgroundSprite.width = this.game.width;
            this.backgroundSprite.height = this.game.height;
        }

        static get name() {
            return "GameOverState";
        }
    }
        const MouseTracker = (function () {
            function e(t) {
                var i = this;
                _classCallCheck(this, e), (this.leftButtonDown = false), (this.rightButtonDown = false), (this.enabled = false);
                var a = t.canvas;
                Config.mobileDevice ||
                    (a.addEventListener(
                        "mousedown",
                        function (e) {
                            return i.handleMouseChange(e, true);
                        },
                        true
                    ),
                        window.addEventListener(
                            "mousemove",
                            function (e) {
                                return i.handleMouseMove(e);
                            },
                            true
                        ),
                        window.addEventListener(
                            "mouseup",
                            function (e) {
                                return i.handleMouseChange(e, false);
                            },
                            true
                        )),
                    window.addEventListener(
                        "touchmove",
                        function (e) {
                            return i.handleTouchMove(e);
                        },
                        true
                    ),
                    a.addEventListener(
                        "touchstart",
                        function (e) {
                            return i.handleTouchClick(e, true);
                        },
                        true
                    ),
                    window.addEventListener(
                        "touchend",
                        function (e) {
                            return i.handleTouchClick(e, false);
                        },
                        true
                    ),
                    t.input.mouse.stop(),
                    t.input.touch.stop(),
                    t.input.mspointer.stop(),
                    (this.onMouseMove = new Phaser.Signal()),
                    (this.onMouseDown = new Phaser.Signal()),
                    (this.onMouseUp = new Phaser.Signal());
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "MouseTracker";
                        },
                    },
                ]),
                (e.prototype.onFocusLost = function () {
                    console.log("[MOUSE] Lost focus"), (this.leftButtonDown = false), (this.rightButtonDown = false);
                }),
                (e.prototype.handleMouseChange = function (e, t) {
                    this.handleMouseMove(e),
                        (3 !== e.which && 2 !== e.button) || (this.rightButtonDown = t),
                        (1 !== e.which && 0 !== e.button) || (this.leftButtonDown = t),
                        this.enabled && (t ? this.onMouseDown.dispatch() : this.onMouseUp.dispatch());
                }),
                (e.prototype.handleTouchClick = function (e, t) {
                    this.enabled && (this.handleTouchMove(e), t ? this.onMouseDown.dispatch() : this.onMouseUp.dispatch());
                }),
                (e.prototype.handleMouseMove = function (e) {
                    (this.mouseX = e.clientX), (this.mouseY = e.clientY), this.enabled && this.onMouseMove.dispatch();
                }),
                (e.prototype.handleTouchMove = function (e) {
                    if (!(e.touches.length < 1)) {
                        for (var t = 0, i = 0, a = 0; a < e.touches.length; ++a) {
                            var o = e.touches[a];
                            (t += o.clientX), (i += o.clientY);
                        }
                        var n = e.touches.length;
                        (this.mouseX = t / n), (this.mouseY = i / n), this.enabled && this.onMouseMove.dispatch();
                    }
                }),
                (e.prototype.getPosition = function () {
                    return { x: this.mouseX, y: this.mouseY };
                }),
                (e.register = function (t) {
                    window.mouseTracker = new e(t);
                }),
                e
            );
        })(),
        App = (function () {
            function e() {
                _classCallCheck(this, e), console.log("App booted at", Math.floor(performance && performance.now())), s(), Config.mobileDevice ? document.body.classList.add("mobileDevice") : this.addBetaHint();
                var t = {
                    width: "100%",
                    height: "100%",
                    renderer: Phaser.CANVAS,
                    antialias: false,
                    multiTexture: false,
                    transparent: false,
                    parent: "renderer",
                    legacy: true,
                    resolution: (Config.mobileDevice && window.devicePixelRatio) || 1,
                    roundPixels: Config.roundPixels,
                    state: { Boot: BootState, Game: GameState, GameOver: GameOverState },
                },
                    i = new Phaser.Game(t);
                setTimeout(function () {
                    MouseTracker.register(i);
                }, 1),
                    i.state.add("Boot", BootState, false),
                    i.state.add("Game", GameState, false),
                    i.state.add("GameOver", GameOverState, false),
                    i.state.start("Boot");
            }
            return (
                _createClass(e, null, [
                    {
                        key: "name",
                        get: function () {
                            return "App";
                        },
                    },
                ]),
                (e.prototype.addBetaHint = function () { }),
                e
            );
        })();

        class StorageFullIndicatorSystem extends GameSystem {
            constructor(stuff) {
                super(stuff, { necessaryComponents: [StorageComponent] });
            }
        
            static get name() {
                return "StorageFullIndicatorSystem";
            }
        
            processEntity(entity, storageComponent) {
                if (storageComponent.isAnyFull(true)) {
                    createOrGetEntityAttachment(entity, "storageFullText", () => {
                        const text = this.root.phaser.make.text(0, 0, "FULL", {
                            font: "11px Roboto",
                            fill: "#AA1100",
                            boundsAlignH: "center",
                            fontWeight: 700,
                        });
                        text.setTextBounds(0, Config.tileSize - 3, Config.tileSize, 15);
                        return text;
                    });
                } else {
                    hideEntityAttachment(entity, "storageFullText");
                }
            }
        }
        
        class BasementHealthVisualizerUI extends Visualizer {
            constructor(stuff, config, options) {
                super(stuff, config, options, { height: 32, label: "BASE HEALTH", updateInterval: 350 });
            }
        
            static get name() {
                return "BasementHealthVisualizerUI";
            }
        
            init() {
                super.init();
                const t = this.root.phaser;
                const i = Config.ui.visualizerWidth;
                const a = Math.floor(i / 3) + 10;
                const o = makeRoundedPanelBackground(t, i - 10 - a, 12, 15658734, 0.1, 2);
                o.position.setTo(a, 11);
                this.group.add(o);
        
                this.bar = makeRoundedPanelBackground(t, i - 10 - a, 12, 16742263, 1, 2);
                this.bar.position.setTo(a, o.y);
                this.group.add(this.bar);
            }
        
            doUpdate() {
                const e = this.root.logic.getPlayerBase();
                if (e) {
                    const t = e.getComponent(HealthComponent);
                    const i = t.health / t.maxHealth;
                    this.bar.scale.x = i;
                    this.bar.visible = true;
                } else {
                    this.bar.visible = false;
                }
            }
        }            

    const YORGIO = {
        VERSION: "dev-unknown",
        IS_BETA: true,
        ENVIRONMENT: "unknown",
        ENVIRONMENT_COLOR: "#fff"
    };

    function setEnvironmentInfo() {
        if (YORGIO.IS_BETA) {
            YORGIO.ENVIRONMENT = "InDev";
            YORGIO.ENVIRONMENT_COLOR = "#8c42f4";
        } else {
            YORGIO.ENVIRONMENT = "live";
            YORGIO.ENVIRONMENT_COLOR = "#6D6";
        }
    }

    function printYorgVersionHeader() {
        console.log(
            `%cYORG.io CE Edition`,
            "color: gray; font-size: 27px; font-family: Roboto, Arial; font-weight: 700;"
        );
        console.log(
            `%cMod made by BlueLatios, Copyright of Tobspr`,
            "color: gray; font-size: 11px;"
        );
        console.log(
            `%cVersion: %c${YORGIO.VERSION}`,
            "font-size: 11px;",
            `color: #39f; font-size: 11px;`
        );
        setEnvironmentInfo();
        console.log(
            `%cEnvironment: %c${YORGIO.ENVIRONMENT}`,
            "",
            `color: ${YORGIO.ENVIRONMENT_COLOR}`
        );
    }

    printYorgVersionHeader(); 

    var tileDistance = 1.01,
        defaultTransportDistance = 3.5 * tileDistance,
        cameFromThirdparty = window.location.search.indexOf("came_from_thirdparty") >= 0,
        isMobile = (0, _isMobile2.default)(),
        Config = {
            roundPixels: true,
            mobileDevice: isMobile,
            videoAdIntervalMinutes: 11,
            textResolution: isMobile ? 2 : 1,
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
            tutorialActive: false,
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
            showPhysics: false,
            showComponentInspector: false,
            showPathfinding: true,
            showZombieHeatmap: false,
            ignoreBuildRequirements: false,
            logOverlayRedraws: false,
            flashOnRedraw: false,
            emptyMap: false,
            spawnDefaultBuildings: false,
            testHealthBars: false,
            visualizeNodeNet: false,
            displayBalancing: false,
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
            testTranslations: false,
            alwayShowUnlockTips: false,
            logParticleGroups: false,
            displayWorkerUsage: false,
            testGameOver: false,
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
        };

    const LANGUAGES = {
        en: _en2.default, // English 
        "zh-cn": _zhCN2.default, // Simplified Chinese
        ja: _ja2.default, // Japanese **EXPERIMENTAL**
    };

    const browserLocale = () => (
        navigator.languages && navigator.languages.length ?
            navigator.languages[0] :
            navigator.userLanguage ?
                navigator.userLanguage :
                navigator.language
    );

    const initLanguage = () => {
        const queryParameters = _queryString2.default.parse(location.search);

        if (queryParameters.lang) {
            const lang = queryParameters.lang.toLowerCase();
            if (LANGUAGES[lang]) {
                try {
                    window.localStorage.setItem("languageOverride", lang);
                    return lang;
                } catch (e) {
                    console.warn("[LANG] Failed to set local storage item, local storage unsupported?");
                }
            } else {
                console.error("[LANG] Unknown language specified:", lang);
            }
        }

        let storedLanguage = null;
        try {
            storedLanguage = window.localStorage.getItem("languageOverride");
        } catch (e) {
            console.warn("[LANG] Failed to get language from local storage, maybe unsupported?");
        }

        if (storedLanguage) {
            const languageOverride = storedLanguage;
            if (LANGUAGES[languageOverride]) return languageOverride;
            console.error("[LANG] Unknown language in local storage:", languageOverride);
        }

        const browserLocaleLowerCase = browserLocale().toLowerCase();
        if (LANGUAGES[browserLocaleLowerCase]) {
            console.log("[LANG] Auto detected to", browserLocaleLowerCase);
            return browserLocaleLowerCase;
        }

        const languageWithoutCountry = browserLocaleLowerCase.split("-")[0];
        let usableCountryLocale = null;

        for (const language in LANGUAGES) {
            if (languageWithoutCountry === language.split("-")[0].toLowerCase()) {
                usableCountryLocale = language;
            }
        }

        if (usableCountryLocale) {
            console.warn("[LANG] Unknown language", browserLocaleLowerCase, "but usable country locale:", usableCountryLocale);
            return usableCountryLocale;
        } else {
            console.warn("[LANG] Unknown browser locale:", browserLocaleLowerCase);
            return "en";
        }
    };

    const BASE_LANGUAGE_DICT = _en2.default;
    const CURRENT_LANGUAGE = initLanguage();
    console.log("[LANG] Using language", CURRENT_LANGUAGE);
    const CURRENT_LANG_DICT = LANGUAGES[CURRENT_LANGUAGE];

    const parseTranslation = (text) => (
        text.replace(/\[\[([^\]]*)\]\]/g, "<i>$1</i>").replace(/\[([^\]]*)\]/g, "<b>$1</b>")
    );

    const tr = (key, ...values) => {
        if (Config.testTranslations) return `[${key}]`;

        let translation = CURRENT_LANG_DICT[key];

        if (!translation) {
            if (!BASE_LANGUAGE_DICT[key]) {
                console.error("[LANG] Invalid id:", key);
                return `[${key}]`;
            }
            translation = BASE_LANGUAGE_DICT[key];
        }

        values.forEach((value, index) => {
            translation = translation.replace(`%${index + 1}`, value);
        });

        return parseTranslation(translation);
    };

    const translateDocument = () => {
        console.log("[LANG] Translating document ...");

        if (document.querySelectorAll) {
            Array.from(document.querySelectorAll("[data-translate]")).forEach((element) => {
                const translationKey = element.getAttribute("data-translate");
                element.innerHTML = tr(translationKey);
            });

            const languageChooserParent = document.getElementById("languageChooserParent");
            if (languageChooserParent) {
                languageChooserParent.classList.add("loaded");
            }

            const languageChooserInner = document.getElementById("languageChooserInner");
            if (languageChooserInner) {
                languageChooserInner.classList.add("loaded");
                for (let i = 0; i < languageChooserInner.options.length; i++) {
                    if (languageChooserInner.options[i].value === CURRENT_LANGUAGE) {
                        languageChooserInner.selectedIndex = i;
                        break;
                    }
                }
            }

            if (Config.testTranslations) {
                document.body.classList.add("highlightTranslations");
            }
        } else {
            console.error("[LANG] Query selector all not supported! Not translating document");
        }
    };

    var oneTileDistance = 1.01,
        meleeAttackDistance = 2,
        oneTileDiagonalDistance = 1.42;
    function tileToWorld(e, t) {
        return [e * Config.tileSize, t * Config.tileSize];
    }
    function tileCenterToWorld(e, t) {
        return [Math.floor((e + 0.5) * Config.tileSize), Math.floor((t + 0.5) * Config.tileSize)];
    }
    function worldToTile(e, t) {
        return [Math.floor(e / Config.tileSize), Math.floor(t / Config.tileSize)];
    }
    function isValidWorldCoordinate(e, t) {
        return e >= 0 && t >= 0 && e < Config.numTilesX * Config.tileSize && t < Config.numTilesY * Config.tileSize;
    }
    function randomInt(e, t) {
        return e + Math.floor(Math.random() * (t - e));
    }
    function randomArrayEntry(e) {
        return e[randomInt(0, e.length)];
    }
    function make2DArray(e, t, i) {
        for (var a = [], o = 0; o < e; ++o) {
            for (var n = [], r = 0; r < t; ++r) n.push(i(o, r));
            a.push(n);
        }
        return a;
    }
    function make1DArray(e, t) {
        for (var i = [], a = 0; a < e; ++a) i.push(t(a));
        return i;
    }
    function distanceManhattan(e, t) {
        return Math.max(Math.abs(e[0] - t[0]), Math.abs(e[1] - t[1]));
    }
    function distanceEuclidianSquare(e, t) {
        var i = e[0] - t[0],
            a = e[1] - t[1];
        return i * i + a * a;
    }
    function distanceEuclidian(e, t) {
        return Math.sqrt(distanceEuclidianSquare(e, t));
    }
    function vectorLength(e, t) {
        return Math.sqrt(e * e + t * t);
    }
    function vectorSubstract(e, t) {
        return [e[0] - t[0], e[1] - t[1]];
    }
    function vectorNormalize(e) {
        var t = Math.max(1e-10, vectorLength.apply(void 0, _toConsumableArray(e)));
        return [e[0] / t, e[1] / t];
    }
    function vectorClamp(e) {
        var t = Math.max(1, vectorLength.apply(void 0, _toConsumableArray(e)));
        return [e[0] / t, e[1] / t];
    }
    function dotProduct(e, t) {
        return e[0] * t[0] + e[1] * t[1];
    }
    function vectorScalarMultiply(e, t) {
        return [e[0] * t, e[1] * t];
    }
    function normalizedDirection(e, t) {
        return vectorNormalize(vectorSubstract(t, e));
    }
    function findNormalVectorTo(e) {
        return [-e[1], e[0]];
    }
    function createOrGetEntityAttachment(e, t, i) {
        var a = e[t];
        if (a) return a.alive || a.revive(), a;
        var o = i();
        if (!o) throw new Error("creator() returned null");
        return e.addChild(o), (e[t] = o), o;
    }
    function hideEntityAttachment(e, t) {
        var i = e[t];
        i && i.alive && i.kill();
    }
    function destroyEntityAttachment(e, t) {
        var i = e[t];
        i && i.alive && i.destroy(), Reflect.deleteProperty(e, t);
    }
    function getWorldSpaceMouse(e) {
        var t = e.customZoomLevel;
        return vectorScalarMultiply(getWorldSpaceMouseNoZoom(e), t);
    }
    function getWorldSpaceMouseNoZoom(e) {
        var t = window.mouseTracker.getPosition();
        return [t.x + e.camera.x, t.y + e.camera.y];
    }
    function getTileBelowCursor(e) {
        var t = getWorldSpaceMouse(e),
            i = _slicedToArray(t, 2);
        return worldToTile(i[0], i[1]);
    }
    function upDownLinearMorph(e, t) {
        var i = (e % t) / t;
        return (i = 2 * Math.min(i, 1 - i));
    }
    function connectSignals(e, t) {
        e.add(t.dispatch, t);
    }
    function normalizeAngle(e) {
        for (var t = e; t < 0;) t += 2 * Math.PI;
        return t % 360;
    }
    function isinstanceString(e, t) {
        var i = e.constructor;
        if (i.name === t) return true;
        for (var a = 20; null != i && null != i.name && i.name.length > 0 && a > 0;) {
            if (i.name === t) return true;
            (i = i.__proto__), (a -= 1);
        }
        return false;
    }
    function arraysAreEqual(e, t) {
        return (
            e.length == t.length &&
            e.every(function (e, i) {
                return e === t[i];
            })
        );
    }
    function clearGroup(e) {
        if (e.destroyAllChildren) e.destroyAllChildren();
        else if (e.removeAll) e.removeAll(true, true);
        else {
            var t = e.children;
            e.children = [];
            for (var i = 0; i < t.length; ++i) {
                var a = t[i];
                (a.alive = false), (a.exists = false), (a.renderable = false), (a.game = null), (a.parent = null), a.clear && a.clear(), (a.texture = null);
            }
        }
    }
    function checkParamSet(e) {
        if (null === e || void 0 === e) throw new Error("Parameter is null or NaN: '" + e + "'!");
        if ("number" == typeof e && isNaN(e)) throw new Error("Parameter is NaN: '" + e + "'!");
    }
    function checkParamsSet() {
        for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
        t.forEach(function (e) {
            return checkParamSet(e);
        });
    }
    function checkIsSetAndArray(e) {
        if ((checkParamSet(e), !Array.isArray(e))) throw new Error("Parameter is no array");
    }
    function fastArrayDelete(e, t) {
        if (t < 0 || t >= e.length) throw new Error("Out of bounds");
        if (t == e.length - 1) return e.pop();
        var i = e.pop();
        return (e[t] = i), i;
    }
    function fastArrayDeleteValue(e, t) {
        if (null == e) throw new Error("Tried to delete from non array!");
        var i = e.indexOf(t);
        return i < 0 ? (console.error("Value", t, "not contained in array:", e, "!"), t) : fastArrayDelete(e, i);
    }
    function countObjectKeysUnsafe(e) {
        var t = 0;
        for (var i in e) t += 1;
        return t;
    }
    var NUMBER_ENTRIES = [
        [1e15, tr("quadrillion_suffix"), 1e15],
        [1e12, tr("trillions_suffix"), 1e12],
        [1e9, tr("billions_suffix"), 1e9],
        [1e6, tr("millions_suffix"), 1e6],
        [1e3, tr("thousands_suffix"), 1e4],
    ];
    function formatBigNumber(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (e < 0) return "-" + formatBigNumber(-e, t);
        for (var i = 0; i < NUMBER_ENTRIES.length; ++i) {
            var a = _slicedToArray(NUMBER_ENTRIES[i], 3),
                o = a[0],
                n = a[1];
            if (e >= a[2]) {
                var r = e / o;
                return r < 10 ? floorDecimals(r, 2).toFixed(2).replace(",", ".") + n : r < 100 ? floorDecimals(r, 1).toFixed(1).replace(",", ".") + n : Math.floor(r) + n;
            }
        }
        if (e >= 100) return Math.floor(e).toString();
        if (t) {
            var s = Math.floor((e % 1) * 10);
            return 0 === s ? Math.floor(e).toString() : Math.floor(e) + "." + s;
        }
        return Math.floor(e).toString();
    }
    function formatBigNumberIfNumber(e) {
        return Number(e) === e ? formatBigNumber(e) : (console.log("STR:", e), e);
    }
    function keyToString(e) {
        return e === Phaser.Keyboard.ESC
            ? tr("key_esc")
            : e >= Phaser.Keyboard.F1 && e <= Phaser.Keyboard.F15
                ? "F" + (e - Phaser.Keyboard.F1 + 1)
                : e === Phaser.Keyboard.SHIFT
                    ? tr("key_shift")
                    : e === Phaser.Keyboard.ALT
                        ? tr("key_alt")
                        : e === Phaser.Keyboard.UP
                            ? "&#8593;"
                            : e === Phaser.Keyboard.DOWN
                                ? "&#8595;"
                                : e === Phaser.Keyboard.LEFT
                                    ? "&#8592;"
                                    : e === Phaser.Keyboard.RIGHT
                                        ? "&#8594;"
                                        : e === Phaser.Keyboard.SPACEBAR
                                            ? tr("key_space")
                                            : e === Phaser.Keyboard.ENTER
                                                ? tr("key_enter")
                                                : String.fromCharCode(e);
    }
    function roundDecimals(e, t) {
        var i = Math.pow(10, t);
        return Math.round(e * i) / i;
    }
    function floorDecimals(e, t) {
        var i = Math.pow(10, t);
        return Math.floor(e * i) / i;
    }
    function newEmptyMap() {
        return Object.create(null);
    }
    function randomPointInCircle() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
            t = Math.random() * e,
            i = 2 * Math.random() * Math.PI;
        return [Math.sin(i) * t, Math.cos(i) * t];
    }
    function drawJaggedLine(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0.1,
            o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 7,
            n = i[0] - t[0],
            r = i[1] - t[1],
            s = -1 * r,
            l = n;
        e.moveTo(t[0], t[1]);
        for (var u = 0; u < o; ++u) {
            var c = (u + 1) / o,
                d = 2 * Math.random() - 1,
                h = n * c + t[0] + s * d * a,
                p = r * c + t[1] + l * d * a;
            e.lineTo(h, p);
        }
    }
    function secondsToDuration(e) {
        var t = Math.floor(e),
            i = Math.floor(t / 60),
            a = Math.floor(i / 60),
            o = Math.floor(a / 24);
        return t <= 60
            ? t <= 1
                ? tr("second_before")
                : tr("seconds_before", t)
            : i <= 60
                ? i <= 1
                    ? tr("minute_before")
                    : tr("minutes_before", i)
                : a <= 60
                    ? a <= 1
                        ? tr("hour_before")
                        : tr("hours_before", a)
                    : o <= 1
                        ? tr("day_before")
                        : tr("days_before", o);
    }
    window.fn = formatBigNumber;
    var EASING = {
        linear: function (e) {
            return e;
        },
        easeInQuad: function (e) {
            return e * e;
        },
        easeOutQuad: function (e) {
            return e * (2 - e);
        },
        easeInOutQuad: function (e) {
            return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
        },
        easeInCubic: function (e) {
            return e * e * e;
        },
        easeOutCubic: function (e) {
            return --e * e * e + 1;
        },
        easeInOutCubic: function (e) {
            return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
        },
        easeInQuart: function (e) {
            return e * e * e * e;
        },
        easeOutQuart: function (e) {
            return 1 - --e * e * e * e;
        },
        easeInOutQuart: function (e) {
            return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e;
        },
        easeInQuint: function (e) {
            return e * e * e * e * e;
        },
        easeOutQuint: function (e) {
            return 1 + --e * e * e * e * e;
        },
        easeInOutQuint: function (e) {
            return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e;
        },
        easeSin: function (e) {
            return 0.5 * -Math.cos(e * Math.PI) + 0.5;
        },
        easeBlink: function (e) {
            return 0.5 * Math.sin(300 * e) + 0.5;
        },
    }

    let GAME_BALANCING = {};
    const MAXLEVEL_INDEX = 29;

    class Balancing {
        constructor({
            upgradeCostMultiplier = 1,
            healthMultiplier = 1,
            damageMultiplier = 1,
            zombieAmountInBossWave = 0.3,
            bossInterval = 10
        } = {}) {
            this.upgradeCostMultiplier = upgradeCostMultiplier;
            this.healthMultiplier = healthMultiplier;
            this.damageMultiplier = damageMultiplier;
            this.zombieAmountInBossWave = zombieAmountInBossWave;
            this.bossInterval = bossInterval;
    
            console.log("[BALANCING] (Re-)Initializing balancing");
    
            let d = {
                    refundOnSell: 0.6,
                    zombieLevelIncreaseDays: 13,
                    bossLevelIncrease: 10,
                    bossInterval: bossInterval,
                    zombieCount: function(wave) {
                        return 1 + Math.floor(1.3 * Math.pow(wave, 1.2));
                    },
                    creeperAmountPercent: 0.2,
                    zombieAmountInBossWave: zombieAmountInBossWave,
                    enemies: {
                        zombie: {
                            health: (wave) => this.healthMultiplier * (270 + 1000 * Math.pow(wave, 3.4)),
                            grantsGold: (wave) => Math.floor(20 + 12 * Math.pow(wave, 1.1)),
                            damage: (wave) => this.damageMultiplier * (40 + 60 * Math.pow(wave, 2.5)),
                            hitsPerSecond: (wave) => Math.min(1 + 0.1 * wave, 10),
                            percentageAttackingBase: 0.7,
                            speed: (wave) => 0.6 + 0.1 * Math.min(wave, 10) + 0.7 * Math.random(),
                        },
                        creeper: {
                            health: (wave) => this.healthMultiplier * (100 + 1200 * Math.pow(wave, 1.6)),
                            grantsGold: (wave) => 50 + 17 * wave,
                            damage: (wave) => this.damageMultiplier * (200 + 200 * Math.pow(wave, 1.3)),
                            explosionRadius: (wave) => Math.min(1.5 + 0.05 * wave, 100),
                            speed: (wave) => 2 + 0.2 * Math.min(wave, 10) + Math.random(),
                            percentageAttackingBase: 0.8,
                        },
                        zombieBoss: {
                            health: (wave) => this.healthMultiplier * (15000 + 40000 * Math.pow(wave, 3.2)),
                            grantsGold: (wave) => 5000 + Math.floor(20000 * Math.pow(wave, 2)),
                            damage: (wave) => this.damageMultiplier * (35 + 225 * Math.pow(wave, 1.6)),
                            hitsPerSecond: () => 10,
                            speed: (wave) => 0.9 + 0.1 * Math.min(wave, 10),
                        },
                    },
                    buildings: {},
                    amountLimits: {
                        goldMine: this.exponentialRaiseIntegersStartOffset(2.49, 1.35),
                        transporter: this.exponentialRaiseIntegersStartOffset(10, 1.35),
                        wall: this.exponentialRaiseIntegersStartOffset(20, 1.35),
                        ironMine: [],
                        cannonballProducer: [],
                        cannon: this.exponentialRaiseIntegersStartOffset(2, 1.35),
                        bombTower: this.exponentialRaiseIntegersStartOffset(2, 1.2, 4),
                        harvester: [],
                        steelFactory: [],
                        woodProcessor: [],
                        arrowFactory: [],
                        arrowTower: this.exponentialRaiseIntegersStartOffset(2.5, 1.35, 2),
                        uraniumMine: [],
                        nuclearStation: [],
                        lightningTower: this.exponentialRaiseIntegersStartOffset(2.5, 1.35, 5),
                        healingTower: this.exponentialRaiseIntegersStartOffset(1.5, 1.35, 8),
                    },
                },
                h = this.exponentialRaise(500, 1.35),
                mineConfig = {
                    health: this.exponentialRaise(800, 1.4),
                    throughput: this.exponentialRaise(2.5, 1.22),
                    cost: this.exponentialRaise(150, 1.9)
                },
                factoryConfig = {
                    health: h,
                    throughput: this.exponentialRaise(2, 1.2),
                    cost: this.exponentialRaise(150, 1.95)
                },
                f = {
                    goldMine: {
                        health: h,
                        throughput: this.exponentialRaise(3.5),
                        cost: this.exponentialRaiseFirstZero(150)
                    },
                    playerBase: {
                        health: this.exponentialRaise(1e3, 1.95),
                        damage: this.exponentialRaise(50),
                        cost: this.exponentialRaiseFirstZero(850, 2.8)
                    },
                    wall: {
                        health: this.exponentialRaise(3e3),
                        shieldStorage: this.linearRaise(10, 3),
                        cost: this.exponentialRaise(30, 2)
                    },
                    cannon: {
                        health: h,
                        damage: this.exponentialRaise(100),
                        cost: this.exponentialRaise(100, 2.1),
                        shootsPerSecond: this.linearRaise(1, 0.3),
                        consumeAmount: this.exponentialRaise(2, 1.2),
                        radius: this.linearRaise(5, 0.5)
                    },
                    cannonballProducer: factoryConfig,
                    steelFactory: factoryConfig,
                    woodProcessor: factoryConfig,
                    nuclearStation: factoryConfig,
                    harvester: mineConfig,
                    ironMine: mineConfig,
                    uraniumMine: mineConfig,
                    arrowFactory: {
                        health: h,
                        throughput: this.exponentialRaise(2, 1.2),
                        outcome: this.linearRaise(2, 0.3),
                        cost: this.exponentialRaise(200, 1.95)
                    },
                    arrowTower: {
                        health: h,
                        damage: this.exponentialRaise(200),
                        radius: this.linearRaise(6, 0.3),
                        shootsPerSecond: this.linearRaise(1, 0.5),
                        consumeAmount: this.linearRaise(2, 1),
                        cost: this.exponentialRaise(250, 1.9)
                    },
                    bombTower: {
                        health: this.exponentialRaise(100),
                        damage: this.exponentialRaise(400),
                        radius: this.linearRaise(6, 0.3),
                        shootsPerSecond: this.linearRaise(1, 0.1),
                        consumeAmount: this.linearRaise(2, 2),
                        cost: this.exponentialRaise(400, 2.1)
                    },
                    lightningTower: {
                        damage: this.exponentialRaise(150),
                        health: this.exponentialRaise(400),
                        radius: this.linearRaise(4, 0.125),
                        spread: this.linearRaise(3, 0.25),
                        shootsPerSecond: this.linearRaise(1, 0.4),
                        consumeAmount: this.linearRaise(1, 1.8),
                        cost: this.exponentialRaise(1e3, 1.75),
                    },
                    transporter: {
                        cost: this.exponentialRaiseFirstZero(100, 1.9),
                        health: this.exponentialRaise(100, 1.7),
                        transportSpeed: this.linearRaise(1, 0.45)
                    },
                    healingTower: {
                        cost: this.exponentialRaise(5e4, 1.25),
                        health: h,
                        throughput: this.linearRaise(1, 1.6),
                        outcome: this.linearRaise(1, 0.12)
                    },
                };
            for (var b in f) {
                for (var A = f[b], y = [], v = 0; v <= MAXLEVEL_INDEX; ++v) {
                    var k = {
                        cost: {
                            gems: A.cost[v] * upgradeCostMultiplier
                        }
                    };
                    for (var w in A) "cost" !== w && (k[w] = A[w][v]);
                    y.push(k);
                }
                d.buildings[b] = y;
            }
    
            function calculateAmountLimits() {
                const {
                    amountLimits,
                    buildings
                } = d;
    
                for (let q = 0; q <= MAXLEVEL_INDEX; ++q) {
                    const {
                        arrowTower,
                        cannon,
                        bombTower,
                        lightningTower,
                        ironMine,
                        cannonballProducer,
                        harvester,
                        steelFactory,
                        woodProcessor,
                        arrowFactory,
                        nuclearStation,
                        uraniumMine,
                    } = amountLimits;
    
                    const updateStorage = (building, amount) => {
                        building.storage = Math.ceil(
                            building.shootsPerSecond * building.consumeAmount * 25
                        );
                    };
    
                    const updateBuildingLimits = (e) => {
                        const t = amountLimits.arrowTower[e];
                        const i = Math.ceil(t / 4);
                        const a = i;
                        const o = i;
                        const n = 2 * a + o;
                        const r = amountLimits.cannon[e];
                        const s = Math.ceil(r / 3);
                        const l = 2 * s + 2 * o;
                        const u = amountLimits.lightningTower[e];
                        const c = amountLimits.healingTower[e];
                        const d = u > 0 ? Math.ceil(u / 2) : 0;
                        const h = d + 4 * c;
    
                        ironMine.push(l);
                        cannonballProducer.push(s);
                        harvester.push(n);
                        steelFactory.push(o);
                        woodProcessor.push(a);
                        arrowFactory.push(i);
                        nuclearStation.push(d);
                        uraniumMine.push(h);
    
                        ["arrowTower", "cannon", "bombTower", "lightningTower"].forEach((t) =>
                            updateStorage(buildings[t][e], amountLimits[t][e])
                        );
                    };
    
                    updateBuildingLimits(q);
                }
            }
    
            calculateAmountLimits();
            this.overrideObj(GAME_BALANCING, d);
        }
    
        exponentialRaise(base, ratio = 1.6) {
            const result = [];
            for (let a = 0; a <= MAXLEVEL_INDEX; ++a) {
                result.push(Math.round(base * Math.pow(ratio, a)));
            }
            return result;
        }
    
        exponentialRaiseFirstZero(base, ratio = 1.6) {
            const result = this.exponentialRaise(base, ratio);
            result.unshift(0);
            result.pop();
            return result;
        }
    
        exponentialRaiseIntegersStartOffset(base, ratio, offset = 0) {
            const result = [];
            for (let o = 0; o < offset; ++o) {
                result.push(0);
            }
            for (let n = 0; n <= MAXLEVEL_INDEX - offset; ++n) {
                result.push(Math.round(base * Math.pow(ratio, n) + n));
            }
            return result;
        }
    
        linearRaise(start, increment) {
            const result = [];
            for (let a = 0; a <= MAXLEVEL_INDEX; ++a) {
                result.push(Math.round(start + increment * a));
            }
            return result;
        }
    
        overrideObj(target, source) {
            for (const key in source) {
                if (target[key] && typeof target[key] === 'object') {
                    this.overrideObj(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        }
    }
    const initBalancing = new Balancing({});
    var MAX_STALL_TIME = 1e3;
    function makePanelBackground(e, t, i, a) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
            n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            r = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            s = e.make.graphics();
        return s.beginFill(a, o), s.drawRect(n, r, t, i), s.endFill(), s;
    }
    function makeRoundedPanelBackground(e, t, i, a) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
            n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 4,
            r = e.make.graphics();
        return r.beginFill(a, o), r.drawRoundedRect(0, 0, t, i, n), r.endFill(), r;
    }
    function makeRoundedPanelBackground3D(e, t, i, a) {
        var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
            n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 4,
            r = e.make.graphics();
        r.beginFill(mixColorPerChannel(a, 0.3, 0), o);
        for (var s = 0; s < 3; ++s) r.drawRoundedRect(0.2 * s, 0, t, i + 1 + s, n);
        r.beginFill(a, o), r.drawRoundedRect(0, 0, t, i, n), r.endFill();
        var l = e.make.sprite(0, 0, r.generateTexture());
        return r.destroy(), l;
    }
    function makeBorderedRoundedPanelBackground(e) {
        var t = e.phaser,
            i = e.w,
            a = e.h,
            o = e.fill,
            n = e.lineFill,
            r = e.lineWidth,
            s = void 0 === r ? 2 : r,
            l = e.alpha,
            u = void 0 === l ? 1 : l,
            c = e.borderRadius,
            d = void 0 === c ? 4 : c,
            h = t.make.graphics();
        h.lineStyle(s, n), h.beginFill(o, u);
        var p = s / 2;
        return h.drawRoundedRect(p, p, i - 2 * p, a - 2 * p, d), h.endFill(), h;
    }
    function hex2rgb(e) {
        var t = e.toString(16).padStart(6, "0");
        return [parseInt(t.substr(0, 2), 16), parseInt(t.substr(2, 2), 16), parseInt(t.substr(4, 2), 16)];
    }
    function rgb2hex(e) {
        var t = _slicedToArray(e, 3),
            i = t[0],
            a = t[1],
            o = t[2];
        return (65536 * Math.floor(i)) | (256 * Math.floor(a)) | Math.floor(o);
    }
    function pastellizeColor(e) {
        return mixColorPerChannel(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.2, 255);
    }
    function darkenColor(e) {
        return mixColorPerChannel(e, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.2, 0);
    }
    function mixColorPerChannel(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0.2,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
        return mapColorPerChannel(e, function (e) {
            return Math.floor(e * (1 - t) + i * t);
        });
    }
    function mapColorPerChannel(e, t) {
        return rgb2hex(hex2rgb(e).map(t));
    }
    function makeTooltipPanel(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Config.colors.ui.panelBackground,
            n = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
            r = null,
            s = e.make.group();
        if ((n && (((r = e.make.group()).fixedToCamera = true), r.add(s)), a)) {
            var l = e.make.group();
            s.add(l), l.add(makeRoundedPanelBackground(e, t, i, 0));
            var u = e.make.image(t / 2, i, "atlas", "tooltip-arrow.png");
            u.anchor.setTo(0.5, 0), (u.width = 20), (u.height = 10), (u.tint = o), (u.x = t / 2), (u.y = i), l.add(u), (l.alpha = 0.1), (l.x = 3), (l.y = 5);
        }
        var c = e.make.image(t / 2, i, "atlas", "tooltip-arrow.png");
        c.anchor.setTo(0.5, 0), (c.width = 20 * c.scale.x), (c.height = 10 * c.scale.x), (c.tint = o), (c.x = t / 2), (c.y = i), (c.alpha = Config.colors.ui.panelAlpha), s.add(c);
        var d = makeRoundedPanelBackground(e, t, i, o, Config.colors.ui.panelAlpha);
        return s.add(d), { tooltip: s, outerGroup: r };
    }
    function makeButton(e) {
        var t = e.phaser,
            i = e.width,
            a = e.text,
            o = e.fill,
            n = e.clickHandler,
            r = e.keybinding,
            s = void 0 === r ? null : r,
            l = e.height,
            u = void 0 === l ? 30 : l,
            c = e.clickSounds,
            d = void 0 === c || c,
            h = t.make.group(),
            p = u,
            g = makeRoundedPanelBackground3D(t, i, p, o);
        g.enableInput(),
            (g.name = "Button[" + a + "]"),
            g.events.onInputUp.add(function () {
                g.positionAtMousedown
                    ? distanceEuclidian([g.worldPosition.x, g.worldPosition.y], [g.positionAtMousedown.x, g.positionAtMousedown.y]) > 2
                        ? console.warn("Blocking invalid click (See gh #82)")
                        : (g.isMouseOver && (d && t.rootRecursiveRef && t.rootRecursiveRef.signals.uiActionPerformed.dispatch(), n()), h.pivot.setTo(0, 0))
                    : console.warn("Mouseup without corresponding mousedown!");
            }),
            g.events.onInputDown.add(function () {
                (g.positionAtMousedown = g.worldPosition.clone()), h.alpha > 0.5 && h.pivot.setTo(0, -1);
            }),
            g.events.onInputOver.add(function () {
                h.alpha > 0.5 && t.canvas && (t.canvas.style.cursor = "pointer"), (g.alpha = 0.95), (g.isMouseOver = true);
            }),
            g.events.onInputOut.add(function () {
                t.canvas && (t.canvas.style.cursor = "default"), (g.alpha = 1), (g.isMouseOver = false);
            }),
            h.add(g);
        var m = t.make.text(0, 0, a.toUpperCase(), { font: "12px Roboto", fontWeight: 700, fill: "#eee", align: "center", boundsAlignH: s ? "left" : "center" });
        if ((m.setTextBounds(10, 0, i - 20, p), (m.y = 8), h.add(m), (h.textHandle = m), null !== s && !Config.mobileDevice)) {
            t.input.keyboard.addKey(s).onDown.add(function () {
                n();
            });
            var _ = "[ " + keyToString(s) + " ]",
                f = t.make.text(0, 0, _, { font: "12px Roboto", fontWeight: 700, fill: "#eee", align: "right", boundsAlignH: "right" });
            (f.alpha = 0.5), f.setTextBounds(0, 0, i - 10, p), (f.y = 8), h.add(f);
        }
        return h;
    }
    function setButtonEnabled(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        e.alpha = t ? 1 : 0.4;
    }
    function makeTiled(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3618615,
            o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
            n = e.make.graphics();
        n.beginFill(a, o);
        var r = i;
        n.drawRect(0, 0, t, r), n.drawRect(0, t - r, t, r), n.drawRect(0, r, r, t - 2 * r), n.drawRect(t - r, r, r, t - 2 * r);
        var s = n.generateTexture();
        return e.make.tileSprite(0, 0, Config.tileSize * Config.numTilesX, Config.tileSize * Config.numTilesY, s);
    }
    function addGemCountToButton(e, t) {
        var i = e.make.image(10, 25, "atlas", "gem-14.png");
        t.addChild(i);
        var a = e.make.text(30, 25, "2,000", { font: "12px Roboto Mono", fill: "#eee" });
        return t.addChild(a), { icon: i, text: a };
    }
    function drawPolygon(e, t, i) {
        for (var a = [], o = 0; o < t; ++o) {
            var n = (o / t) * 2 * Math.PI;
            a.push([Math.sin(n) * i, -Math.cos(n) * i]);
        }
        e.drawPolygon(a);
    }
    function makeParticleExplosion(e) {
        for (
            var t = e.root,
            i = e.numParticles,
            a = void 0 === i ? 20 : i,
            o = e.minRadius,
            n = void 0 === o ? 10 : o,
            r = e.maxRadius,
            s = void 0 === r ? 30 : r,
            l = e.start,
            u = e.particleClass,
            c = function (e) {
                var i = 2 * Math.random() * Math.PI,
                    a = Math.random() * (s - n) + n,
                    o = 1e3 + 1e3 * Math.random(),
                    r = Math.sin(i) * a,
                    c = Math.cos(i) * a,
                    d = t.particles.spawnNew(l[0], l[1], u);
                (d.alpha = 0.6 + 0.3 * Math.random()),
                    (d.angle = 180 * Math.random()),
                    d.scale.setTo(0.4 + 0.4 * Math.random()),
                    t.animations
                        .animate(d)
                        .to({ x: r + l[0], y: c + l[1], alpha: 0, angle: 360 * Math.random() }, o)
                        .playWhilePaused()
                        .ease(EASING.easeOutQuint)
                        .onDone(function () {
                            t.particles.kill(d);
                        });
            },
            d = 0;
            d < a;
            ++d
        )
            c();
    }
    var STYLE_REGULAR = 1,
        STYLE_DOUBLE = 2,
        UNLIMITED_STORAGE = 1e20,
        PARTICLE_RENDER_REGULAR = 1,
        PARTICLE_RENDER_FAST = 2,
        PARTICLE_RENDER_BATCH = 3,
        PARTICLE_RENDER_NONE = 4,
        ENTITY_UID_COUNTER = 1,
        ATTACK_REGULAR = 1,
        ATTACK_BOSS = 2,
        idPool = 0;
    function applyProjectileStrike(e) {
        var t = e.target,
            i = e.phaser,
            a = e.damage,
            o = e.criticalChance,
            n = void 0 === o ? 0 : o,
            r = e.criticalMultiplier,
            s = void 0 === r ? 1 : r;
        if (Math.random() < n) {
            var l;
            t.takeDamage(a * s);
            var u = t.worldSpaceTileCenter(),
                c = (l = i.rootRecursiveRef.particles).spawnNew.apply(l, _toConsumableArray(u).concat([MetaCriticalHitParticle]));
            (c.alpha = 1),
                i.rootRecursiveRef.animations
                    .animate(c)
                    .to({ alpha: 0 }, 300)
                    .onDone(function () {
                        i.rootRecursiveRef.particles.kill(c);
                    });
        } else t.takeDamage(a);
        var d = t.getComponent(GrantOnKillComponent);
        d && d.onExternalDamage();
    }
    var LINE_SIZE = 2,
        SPREAD_MS = 120,
        LINE_ALPHA = 0.8,
        DIVISIONS = 2,
        LINE_POINTS = 7,
        DISTURB_AMOUNT = 0.1,
        FADE_DURATION = 6 * SPREAD_MS,
        DAMAGE_DECAY = 0.9,
        MINER_CACHE_SIZE = 4,
        isRelevantForTransport = function (e) {
            return (e.hasComponent(ConsumerComponent) || e.hasComponent(EmitterComponent) || e.hasComponent(TransporterComponent)) && !(e instanceof WallBuilding);
        },
        META_BUILDINGS = [
            new PlayerBaseMeta(),
            new GoldMineMeta(),
            new WallMeta(),
            new TransporterMeta(),
            new IronMineMeta(),
            new CannonballProducerMeta(),
            new CannonMeta(),
            new BombTowerMeta(),
            new HarvesterMeta(),
            new SteelFactoryMeta(),
            new WoodProcessorMeta(),
            new ArrowFactoryMeta(),
            new ArrowTowerMeta(),
            new UraniumMineMeta(),
            new NuclearStationMeta(),
            new LightningTowerMeta(),
            new HealingTowerMeta(),
        ],
        META_RESOURCES = [new MetaTree(), new MetaIronOre(), new MetaGoldOre(), new MetaUraniumOre()];
    META_BUILDINGS.forEach(function (e) {
        e.transporterEnabled && e.addNearbyPlacementHelper({ entityClass: TransporterBuilding, radius: Config.radius.transporter });
    });
    var RESOURCE_TO_META = {
        RawWood: MetaTree,
        UnprocessedWood: HarvesterMeta,
        ProcessedWood: WoodProcessorMeta,
        RawGold: MetaGoldOre,
        RawIron: MetaIronOre,
        UnprocessedIron: IronMineMeta,
        Steel: SteelFactoryMeta,
        BasicArrow: ArrowFactoryMeta,
        Cannonball: CannonballProducerMeta,
        MinedUranium: UraniumMineMeta,
        Power: NuclearStationMeta,
    };
    window.GLOBAL_BUILDING_REGISTRY = BuildingRegistry;
    var INCREMENTAL_SEARCH = [];
    function initIncrementalSearch() {
        for (
            var e = function (e) {
                for (var t = [], i = -e; i <= e; ++i) for (var a = -e; a <= e; ++a) i * i + a * a <= e * e && t.push([i, a, i * i + a * a]);
                var o = [];
                t.sort(function (e, t) {
                    return e[2] - t[2];
                }),
                    t.forEach(function (e) {
                        var t = _slicedToArray(e, 2),
                            i = t[0],
                            a = t[1];
                        o.push(i), o.push(a);
                    }),
                    INCREMENTAL_SEARCH.push(o);
            },
            t = 0;
            t <= 50;
            ++t
        )
            e(t);
    }
    initIncrementalSearch();
    var MAX_INCREMENTAL_SEARCH_RADIUS = INCREMENTAL_SEARCH.length - 2,
        TILE_CLEARED = 1,
        TILE_FILLED = 2,
        DIRECT_TILE_NEIGHBORS = [
            [-1, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
            [0, -1, 1],
            [-1, -1, 1.41],
            [1, -1, 1.41],
            [-1, 1, 1.41],
            [1, 1, 1.41],
        ],
        THINKING_TIME = 0.03,
        INITIAL_SLEEP = 1,
        BASE_RADIUS_TILES = 20;
    function entity2str(e) {
        return "[" + e.constructor.name + "@" + e.getTileX() + "/" + e.getTileY() + "]";
    }
    var PREFIX = "x.9" + randomInt(1e4, 9e4),
        MULTIPLIER_BASE = 2,
        ADD_BASE = 68234,
        ATTRIBUTE_NAMES = ["\0"],
        CULLING_BORDER_SIZE = 10;

    (window.showDialog = function (e) {
        console.log("[UI] Showing dialog", e),
            document.getElementById(e).classList.add("visible_dialog"),
            document.getElementById("renderer").classList.add("blurred"),
            document.body.classList.add("dialogOpened");
    }),
        (window.closeDialog = function (e) {
            return (
                console.log("[UI] Closing dialog", e),
                document.getElementById(e).classList.remove("visible_dialog"),
                document.body.classList.remove("dialogOpened"),
                document.getElementById("renderer").classList.remove("blurred"),
                true
            );
        }),
        (window.showBugReporter = function () {
            if (window.showDialog) {
                if ((!window.Stomt)) {
                    console.log("Initializing stomt ..."), (window.Stomt = []);
                    var e = document.createElement("script"),
                        t = document.getElementsByTagName("script")[0];
                    (e.async = 1), (e.src = "https://www.stomt.com/widget.js"), t.parentNode.insertBefore(e, t), window.Stomt.push(["addCreate", { appId: "QWnUsNB7JtXEKyw9axrpWBfGn" }]);
                }
                window.showDialog("bug_report_bg");
            }
        });
    var ZOMBIE_ANIMATION_SEED = 0,
        MAP_DISTRIBUTE_X = _randomJs2.default.integer(Config.mapBorder, Config.numTilesX - Config.mapBorder - 1),
        MAP_DISTRIBUTE_Y = _randomJs2.default.integer(Config.mapBorder, Config.numTilesY - Config.mapBorder - 1),
        INIT_RADIUS = Math.min(MAX_INCREMENTAL_SEARCH_RADIUS, 6),
        CENTER_X = Config.numTilesX / 2,
        CENTER_Y = Config.numTilesY / 2,
        TUTORIAL_AREA_SIZE = 3;
    function isInTutorialArea(e, t) {
        return e > CENTER_X - TUTORIAL_AREA_SIZE && e < CENTER_X + TUTORIAL_AREA_SIZE && t > CENTER_Y - TUTORIAL_AREA_SIZE && t < CENTER_Y + TUTORIAL_AREA_SIZE;
    }
    var randomize1 = 0.2 * Math.random() + 0.8,
        randomize2 = 0.2 * Math.random() + 0.8,
        RIVER_METHOD = function (e) {
            return 0.3 + 0.04 * Math.sin(64 + 23.745 * e) * randomize1 + 0.06 * Math.sin(7 * e) * randomize2;
        },
        RIVER_HEIGHT_METHOD = function () {
            return 5;
        };

    function getRandomUnusedTileSeed(e, t, maxAttempts = 50) {
        while (maxAttempts > 0) {
            const [a, o] = getRandomCoordinates(t);

            if (!e.isTileUsed(a, o) && !isInTutorialArea(a, o)) {
                return [a, o];
            }

            maxAttempts--;
        }

        console.error("Failed to find a free tile on the map!");
        return [0, 0];
    }

    function getRandomCoordinates(t) {
        return [MAP_DISTRIBUTE_X(t), MAP_DISTRIBUTE_Y(t)];
    }

    function getRandomUnusedTileSeedMultiple(e, t) {
        let bestSeed = { pos: null, distanceToClosest: 0 };
    
        for (let a = 0; a < 3; ++a) {
            const [r, s] = getRandomUnusedTileSeed(e, t);
            const closestEntity = e.findClosestEntity({
                tileX: r,
                tileY: s,
                radius: INIT_RADIUS,
                condition: entity => !(entity instanceof RiverEntity),
            });
    
            const distanceToClosest = closestEntity
                ? Math.pow(r - closestEntity.getTileX(), 2) + Math.pow(s - closestEntity.getTileY(), 2)
                : Math.pow(INIT_RADIUS + 1, 2);
    
            if (distanceToClosest > bestSeed.distanceToClosest) {
                bestSeed = { pos: [r, s], distanceToClosest };
            }
        }
    
        return bestSeed.pos;
    }

    const BINOMES = {
        river: {
            id: 0,
            color: 3381759,
            resource: MetaRiverEntity,
            density: 1
        },
        forest: {
            id: 1,
            color: 7864183,
            resource: MetaTree,
            density: 0.3
        },
        mines: {
            id: 2,
            color: 11184810,
            resource: MetaIronOre,
            density: 0.2
        },
        uranium: {
            id: 3,
            color: 7001728,
            resource: MetaUraniumOre,
            density: 0.3
        },
        crystals: {
            id: 4,
            color: 16742263,
            resource: MetaGoldOre,
            density: 0.4
        },
    };

    function initializeMap(e, seed = 0) {
        if (Config.emptyMap || Config.spawnDefaultBuildings) {
            return;
        }
    
        const map = e.map;
    
        const spawnEntity = (t, a, resource) => {
            const [s, l] = tileToWorld(t, a);
            const u = e.particles.spawnNew(s, l, resource);
            map.setTileContent(t, a, u);
            e.entityMgr.registerEntity(u);
            u.onSpawned(t, a);
        };
    
        const o = _randomJs2.default.engines.mt19937();
        console.log(`World seed generated: ${seed}`)
        o.seed(seed);
    
        spawnEntity(CENTER_X - 3, CENTER_Y, MetaGoldOre);
        spawnEntity(CENTER_X + 2, CENTER_Y - 2, MetaIronOre);
        spawnEntity(CENTER_X - 2, CENTER_Y - 1, MetaTree);
        spawnEntity(CENTER_X + 1, CENTER_Y + 2, MetaUraniumOre);
    
        const spawnResources = (amount, resource) => {
            for (let n = 0; n < amount; ++n) {
                const [x, y] = getRandomUnusedTileSeedMultiple(map, o);
                spawnEntity(x, y, resource);
            }
        };
    
        spawnResources(300, MetaUraniumOre);
        spawnResources(270, MetaTree);
        spawnResources(400, MetaIronOre);
        spawnResources(1000, MetaGoldOre);
    }

    var BASE = "base",
        DAMAGE = "damage",
        HEALTH = "health",
        CRITICAL = "critical",
        CANNON = "cannon",
        LIGHTNING = "lightningTower",
        ARROW = "arrowTower",
        BOMB = "bombTower",
        WALL = "wall",
        MINERS = "miners",
        BUILDINGS = "building",
        FACTORIES = "factories",
        TRANSPORTERS = "transporter",
        GAIN_MAPPINGS = {
            damage: { color: Config.colors.gains.damage, default: 100 },
            health: { color: Config.colors.gains.health, default: 100 },
            critical: { color: Config.colors.gains.critical, default: 0 },
            cannonDamage: { color: Config.colors.gains.cannonDamage, default: 100 },
            cannonProjectileSpeed: { color: Config.colors.gains.cannonProjectileSpeed, default: 100 },
            arrowDamage: { color: Config.colors.gains.arrowDamage, default: 100 },
            arrowFireRate: { color: Config.colors.gains.arrowFireRate, default: 100 },
            arrowRadius: { color: Config.colors.gains.arrowRadius, default: 100 },
            lightningDamage: { color: Config.colors.gains.lightningDamage, default: 100 },
            lightningRadius: { color: Config.colors.gains.lightningRadius, default: 100 },
            wallHealth: { color: Config.colors.gains.wallHealth, default: 100 },
            minersSpeed: { color: Config.colors.gains.miningSpeed, default: 100 },
            buildingStorage: { color: Config.colors.gains.buildingStorage, default: 100 },
            factorySpeed: { color: Config.colors.gains.processingSpeed, default: 100 },
            transporterSpeed: { color: Config.colors.gains.transporterSpeed, default: 100 },
        },
        GAIN_DISPLAY_ORDER = Object.keys(GAIN_MAPPINGS).sort(),
        skill = BaseSkill,
        skill2 = Skill2Points,
        skill3 = Skill3Points,
        big = BigSkill,
        feature = FeatureSkill,
        SKILL_TREE = {
            base: new InitialSkill(BASE, [0, 0], { damage: 3, health: 3 }),
            damage_0: new skill(DAMAGE, [1.5, 0], { damage: 2 }, ["base"]),
            damage_1: new skill(DAMAGE, [1, 1], { damage: 2 }, ["damage_0"]),
            damage_2: new skill(DAMAGE, [1, 0], { damage: 2 }, ["damage_1"]),
            damage_3: new skill2(DAMAGE, [1, 0], { damage: 2 }, ["damage_2"]),
            damage_circle_l: new skill2(DAMAGE, [1, 0], { damage: 2 }, ["damage_3"]),
            damage_circle_tl: new skill2(DAMAGE, [0.75, 1], { damage: 2 }, ["damage_circle_l"]),
            damage_circle_bl: new skill2(DAMAGE, [0.75, -1], { damage: 2 }, ["damage_circle_l"]),
            damage_circle_tr: new skill2(DAMAGE, [0.75, 0], { damage: 2 }, ["damage_circle_tl"]),
            damage_circle_br: new skill2(DAMAGE, [0.75, 0], { damage: 2 }, ["damage_circle_bl"]),
            damage_circle_r: new skill2(DAMAGE, [0.75, -1], { damage: 2 }, ["damage_circle_tr", "damage_circle_br"]),
            damage_circle_center: new big(DAMAGE, [-1.125, 0], { damage: 10 }, ["damage_circle_r"]),
            damage_4: new skill3(DAMAGE, [1.25, 0], { damage: 2 }, ["damage_circle_r"]),
            crit_0: new skill(DAMAGE, [1, -1], { damage: 2 }, ["damage_0"]),
            crit_initial: new big(CRITICAL, [1, 0], { critical: 5 }, ["crit_0"]),
            crit_1: new skill2(CRITICAL, [1, -1], { critical: 2 }, ["crit_initial"]),
            crit_2: new skill2(CRITICAL, [1, 0], { critical: 2 }, ["crit_1"]),
            crit_3_t: new skill2(CRITICAL, [0.75, 0.75], { critical: 2 }, ["crit_2"]),
            crit_3_b: new skill2(CRITICAL, [0.75, -0.75], { critical: 2 }, ["crit_2"]),
            crit_3_r: new skill2(CRITICAL, [0.75, -0.75], { critical: 2 }, ["crit_3_t", "crit_3_b"]),
            crit_n_damage: new big(CRITICAL, [1, 0], { damage: 2, critical: 6 }, ["crit_3_r"]),
            crit_4: new skill3(CRITICAL, [1, 0], { critical: 2 }, ["crit_n_damage"]),
            crit_5: new skill3(CRITICAL, [0, 1], { critical: 2 }, ["crit_4"]),
            crit_n_damage_1: new skill3(DAMAGE, [1, -1], { damage: 2, critical: 2 }, ["damage_4", "crit_5"]),
            double_crit_feature: new feature(DAMAGE, [1, 0], tr("feature_criticalHitsx3"), ["crit_n_damage_1"]),
            health_0: new skill(HEALTH, [-1, 1], { health: 3 }, ["base"]),
            health_1: new skill(HEALTH, [-1, 0], { health: 3 }, ["health_0"]),
            health_2: new skill(HEALTH, [-1, 1], { health: 3 }, ["health_1"]),
            health_3: new big(HEALTH, [-1, 0], { health: 10 }, ["health_2"]),
            health_4: new skill2(HEALTH, [-1, 0], { health: 3 }, ["health_3"]),
            health_circle_tr: new skill2(HEALTH, [-0.75, 1], { health: 3 }, ["health_4"]),
            health_circle_br: new skill2(HEALTH, [-0.75, -1], { health: 3 }, ["health_4"]),
            health_circle_tl: new skill2(HEALTH, [-0.75, 0], { health: 3 }, ["health_circle_tr"]),
            health_circle_bl: new skill2(HEALTH, [-0.75, 0], { health: 3 }, ["health_circle_br"]),
            health_circle_l: new skill2(HEALTH, [-0.75, -1], { health: 3 }, ["health_circle_tl", "health_circle_bl"]),
            health_circle_center: new big(HEALTH, [1.125, 0], { health: 10 }, ["health_circle_l", "health_circle_l"]),
            health_5: new skill3(HEALTH, [-1, 0], { health: 3 }, ["health_circle_l"]),
            health_6: new skill3(HEALTH, [-1, -1], { health: 3 }, ["health_5"]),
            health_regen_feature: new feature(HEALTH, [0, -1], tr("feature_buildingHealthReg"), ["health_6"]),
            cannonDamage_0: new skill(CANNON, [1, -1], { cannonDamage: 4 }, ["base"]),
            cannonDamage_1: new skill(CANNON, [0, -1], { cannonProjectileSpeed: 10 }, ["cannonDamage_0"]),
            cannonDamage_2: new skill2(CANNON, [1, -1], { cannonDamage: 4 }, ["cannonDamage_1"]),
            cannonDamage_3: new skill2(CANNON, [-0.75, -0.75], { cannonProjectileSpeed: 10 }, ["cannonDamage_2"]),
            cannonDamage_4: new skill2(CANNON, [0.75, -0.75], { cannonProjectileSpeed: 10 }, ["cannonDamage_2"]),
            cannonDamage_5: new skill2(CANNON, [-0.75, -0.75], { cannonDamage: 4 }, ["cannonDamage_4", "cannonDamage_3"]),
            cannonDamage_6: new big(CANNON, [0, -1], { cannonDamage: 15, cannonProjectileSpeed: 10 }, ["cannonDamage_5"]),
            cannonDamage_7: new skill3(CANNON, [1, -1], { cannonDamage: 4 }, ["cannonDamage_6"]),
            cannonDamage_8: new skill3(CANNON, [1, 0], { cannonDamage: 4 }, ["cannonDamage_7"]),
            cannon_feature_double_dmg: new feature(CANNON, [1, 0], tr("feature_cannonDoubleDmg"), ["cannonDamage_8"]),
            arrowDamage_0: new skill(ARROW, [0, -1.5], { arrowDamage: 4 }, ["base"]),
            arrowDamage_1: new skill(ARROW, [0, -1], { arrowDamage: 4 }, ["arrowDamage_0"]),
            arrowFireRate_0: new skill2(ARROW, [0, -1], { arrowFireRate: 5 }, ["arrowDamage_1"]),
            arrowFireRate_1: new big(ARROW, [0, -1], { arrowFireRate: 5, arrowDamage: 10 }, ["arrowFireRate_0"]),
            arrowDamage_2: new skill2(ARROW, [1, -1], { arrowDamage: 4 }, ["arrowFireRate_1"]),
            arrowDamage_3: new skill2(ARROW, [0, -1], { arrowDamage: 4 }, ["arrowDamage_2"]),
            arrowRadius_0: new skill2(ARROW, [-1, -1], { arrowRadius: 15 }, ["arrowFireRate_1"]),
            arrowRadius_1: new skill2(ARROW, [0, -1], { arrowRadius: 15 }, ["arrowRadius_0"]),
            arrowRadius_2: new big(ARROW, [1, -1], { arrowRadius: 35, arrowDamage: 10 }, ["arrowRadius_1", "arrowDamage_3"]),
            arrowRadius_3: new skill3(ARROW, [0, -1], { arrowRadius: 15 }, ["arrowRadius_2"]),
            arrowFeatureDoubleDamage: new feature(ARROW, [0, -1], tr("feature_arrowDoubleDmg"), ["arrowRadius_3"]),
            lightningDamage_0: new skill(LIGHTNING, [-1, -1], { lightningDamage: 4 }, ["base"]),
            lightningRadius_0: new skill(LIGHTNING, [0, -1], { lightningRadius: 5 }, ["lightningDamage_0"]),
            lightningDamage_1: new skill2(LIGHTNING, [-1, -1], { lightningDamage: 4 }, ["lightningRadius_0"]),
            lightningRadius_1: new skill2(LIGHTNING, [0, -1], { lightningRadius: 5 }, ["lightningDamage_1"]),
            lightningDamage_2: new skill2(LIGHTNING, [-1, -1], { lightningDamage: 4 }, ["lightningRadius_1"]),
            lightningDamageRadius_0: new big(LIGHTNING, [-1, 0], { lightningRadius: 5, lightningDamage: 7 }, ["lightningDamage_2"]),
            lightningDamage_3: new skill3(LIGHTNING, [0, -1], { lightningDamage: 4 }, ["lightningDamageRadius_0"]),
            lightningRadius_2: new skill3(LIGHTNING, [-1, -1], { lightningRadius: 5 }, ["lightningDamage_3"]),
            lightningRadius_3: new skill3(LIGHTNING, [0, -1], { lightningRadius: 5 }, ["lightningRadius_2"]),
            lightningFeatureCrit: new feature(LIGHTNING, [0, -1], tr("feature_lightningCritV2"), ["lightningRadius_3"]),
            wallHealth_0: new skill(WALL, [-1.5, 0], { wallHealth: 4 }, ["base"]),
            wallHealth_1: new skill(WALL, [-1, -1], { wallHealth: 4 }, ["wallHealth_0"]),
            wallHealth_2: new skill(WALL, [-1, 0], { wallHealth: 4 }, ["wallHealth_1"]),
            wallHealth_3: new skill2(WALL, [-1, 0], { wallHealth: 4 }, ["wallHealth_2"]),
            wallHealthSub_1: new skill2(WALL, [0, -1], { wallHealth: 4 }, ["wallHealth_3"]),
            wallHealthSub_2: new skill2(WALL, [-0.75, -1], { wallHealth: 4 }, ["wallHealthSub_1"]),
            wallHealth_4: new big(WALL, [-1.5, 0], { wallHealth: 10 }, ["wallHealth_3", "health_circle_bl"]),
            wallHealth_5: new skill2(WALL, [-1, -1], { wallHealth: 4 }, ["wallHealth_4"]),
            wallHealth_6: new skill2(WALL, [0, -1], { wallHealth: 4 }, ["wallHealth_5"]),
            wallHealth_7: new skill3(WALL, [1, -1], { wallHealth: 4 }, ["wallHealth_6", "wallHealthSub_2"]),
            wallHealthFeatureMiss: new feature(WALL, [0, -1], tr("feature_wallMiss"), ["wallHealth_7"]),
            minersSpeed_0: new skill(MINERS, [0, 1.5], { minersSpeed: 4, transporterSpeed: 5 }, ["base"]),
            minersSpeed_1: new skill(MINERS, [-1, 1], { minersSpeed: 4 }, ["minersSpeed_0"]),
            minersSpeed_2: new big(MINERS, [-1, 0], { minersSpeed: 12 }, ["minersSpeed_1"]),
            minersSpeed_3: new skill2(MINERS, [0, 1], { minersSpeed: 4 }, ["minersSpeed_2"]),
            minersSpeed_4_bl: new skill2(MINERS, [-1, 0.75], { minersSpeed: 4 }, ["minersSpeed_3"]),
            minersSpeed_4_br: new skill2(MINERS, [1, 0.75], { minersSpeed: 4 }, ["minersSpeed_3"]),
            minersSpeed_4_tl: new skill2(MINERS, [0, 0.75], { minersSpeed: 4 }, ["minersSpeed_4_bl"]),
            minersSpeed_4_tr: new skill2(MINERS, [0, 0.75], { minersSpeed: 4 }, ["minersSpeed_4_br"]),
            minersSpeed_4_top: new skill2(MINERS, [1, 0.75], { minersSpeed: 4 }, ["minersSpeed_4_tl", "minersSpeed_4_tr"]),
            minersSpeed_4_inner: new big(MINERS, [0, -1.125], { minersSpeed: 12 }, ["minersSpeed_4_top"]),
            minersSpeed_5: new skill3(MINERS, [0, 1], { minersSpeed: 4 }, ["minersSpeed_4_top"]),
            minersSpeed_6: new skill3(MINERS, [-1, 1], { minersSpeed: 4 }, ["minersSpeed_5"]),
            minersRadius_feature1: new feature(MINERS, [-1, 1], tr("feature_minerRadius1"), ["minersSpeed_6"], 25),
            minersSpeed_7: new skill3(MINERS, [-1, 0], { minersSpeed: 4 }, ["minersRadius_feature1"]),
            minersSpeed_8: new skill3(MINERS, [-1, 0], { minersSpeed: 4 }, ["minersSpeed_7"]),
            minersRadius_feature2: new feature(MINERS, [-1, 1], tr("feature_minerRadius2"), ["minersSpeed_8"], 50),
            buildingStorage_0: new skill2(BUILDINGS, [-1, 1], { buildingStorage: 15 }, ["minersSpeed_4_tl"]),
            buildingStorage_1: new skill2(BUILDINGS, [-1, 0], { buildingStorage: 15 }, ["buildingStorage_0"]),
            buildingStorage_2: new big(BUILDINGS, [-1, 0], { buildingStorage: 40 }, ["buildingStorage_1"]),
            buildingStorage_3: new skill3(BUILDINGS, [-1, 0], { buildingStorage: 15 }, ["buildingStorage_2"]),
            buildingStorage_4: new skill3(BUILDINGS, [-1, -1], { buildingStorage: 15 }, ["buildingStorage_3"]),
            buildingStorageDouble: new feature(DAMAGE, [-1, 0], tr("feature_doubleStorage"), ["buildingStorage_4"]),
            factorySpeed_0: new skill(FACTORIES, [1, 1], { factorySpeed: 10 }, ["base"]),
            factorySpeed_1: new skill(FACTORIES, [0, 1], { factorySpeed: 10 }, ["factorySpeed_0"]),
            factorySpeed_2: new skill(FACTORIES, [1, 1], { factorySpeed: 10 }, ["factorySpeed_1"]),
            factorySpeed_3_b: new skill2(FACTORIES, [1, 0], { factorySpeed: 10 }, ["factorySpeed_2"]),
            factorySpeed_3_ru: new skill2(FACTORIES, [1, 1], { factorySpeed: 10 }, ["factorySpeed_3_b"]),
            factorySpeed_3_u: new skill2(FACTORIES, [0, 1], { factorySpeed: 10 }, ["factorySpeed_2"]),
            factorySpeed_3_rl: new skill2(FACTORIES, [1, 1], { factorySpeed: 10 }, ["factorySpeed_3_u"]),
            factorySpeed_3_t: new big(FACTORIES, [0, 1], { factorySpeed: 30 }, ["factorySpeed_3_ru", "factorySpeed_3_rl"]),
            factorySpeed_4: new skill3(FACTORIES, [1, 0], { factorySpeed: 10 }, ["factorySpeed_3_t"]),
            factoryFeatureSpeed: new feature(FACTORIES, [1, 1], tr("feature_factoriesSpeed"), ["factorySpeed_4"]),
            transporterFeatureInvisible: new feature(TRANSPORTERS, [0, 1.5], tr("feature_transporterInvisible"), ["minersSpeed_0"], 5),
            transporterSpeed_0: new skill2(TRANSPORTERS, [0, 1], { transporterSpeed: 10 }, ["transporterFeatureInvisible"]),
            transporterSpeed_1: new skill2(TRANSPORTERS, [1, 1], { transporterSpeed: 10 }, ["transporterSpeed_0"]),
            transporterSpeed_2: new skill2(TRANSPORTERS, [0, 1], { transporterSpeed: 10 }, ["transporterSpeed_1"]),
            transporterSpeed_3_l: new skill3(TRANSPORTERS, [-1, 0.75], { transporterSpeed: 10 }, ["transporterSpeed_2"]),
            transporterSpeed_3_lm: new skill3(TRANSPORTERS, [0, 0.75], { transporterSpeed: 10 }, ["transporterSpeed_3_l"]),
            transporterSpeed_3_r: new skill3(TRANSPORTERS, [1, 0.75], { transporterSpeed: 10 }, ["transporterSpeed_2"]),
            transporterSpeed_3_rm: new skill3(TRANSPORTERS, [0, 0.75], { transporterSpeed: 10 }, ["transporterSpeed_3_r"]),
            transporterSpeed_3_t: new skill3(TRANSPORTERS, [1, 0.75], { transporterSpeed: 10 }, ["transporterSpeed_3_lm", "transporterSpeed_3_rm"]),
            transporterSpeed_3_c: new big(TRANSPORTERS, [0, 1.125], { transporterSpeed: 40 }, ["transporterSpeed_3_t"]),
            transporterFeatureGlobal: new feature(TRANSPORTERS, [0, 1.125], tr("feature_transporterGlobal"), ["transporterSpeed_3_c"], 25),
        };
    if (Config.showTotalSkillPoints) {
        var points = 0;
        for (var skillId in SKILL_TREE) {
            var handle = SKILL_TREE[skillId];
            points += handle.cost;
        }
        console.log("[SKILLS] Total Points:", points);
    }
    var GAME_MODES = [new EasyMode(), new RegularMode(), new HardMode(), new ImpossibleMode(), new SandboxMode(), new ChallengeBossOnly(), new GlassCannonMode()];
    function createGameModeFromId(e) {
        return GAME_MODES.find(function (t) {
            return t.getId() === e;
        });
    }
    var SAVEGAME_VERSION = 1012,
        LAST_COMPATIBLE_VERSION = Config.allowOldSavegames ? 0 : 1012,
        JSON_PARSE = JSON.parse,
        JSON_STRINGIFY = JSON.stringify,
        META_GAME_SETTINGS = [
            {
                title: tr("performance_settings"),
                settings: [
                    { id: "enableParticles", defaultValue: true },
                    { id: "enableFancyZombies", defaultValue: true },
                    { id: "enableResourceThrowaway", defaultValue: true },
                ],
            },
            {
                title: tr("misc_settings"),
                settings: [
                    { id: "autosave", defaultValue: true },
                    { id: "disableFastForwardAtNight", defaultValue: true },
                    { id: "disableFastForwardDuringBoss", defaultValue: true },
                ],
            },
            {
                title: tr("ui_settings"),
                settings: [
                    { id: "enableAdvancedUi", defaultValue: true },
                    { id: "showFps", defaultValue: false },
                ],
            },
        ],
        ID_CONSUMER_COMPONENT = ConsumerComponent.name,
        ID_STORAGE_COMPONENT = StorageComponent.name,
        PROCESSOR_SPRITE_CACHE = newEmptyMap(),
        MAX_SPRITE_CACHE_SIZE = 500,
        WEBWORKER_VERBOSE = false,
        WorkerImpl = __webpack_require__(450),
        USE_VERBOSE_HASH = false;
    USE_VERBOSE_HASH && console.warn("[CONSUMERS] Using verbose hash - SLOW!");
    var CP_MULTIPLIER = Config.numTilesX,
        CP_BIAS = 256;
    function entityToHash(e) {
        return String.fromCodePoint(e.getTileX() + CP_MULTIPLIER * e.getTileY() + CP_BIAS);
    }
    var TransporterCompName = TransporterComponent.name,
        EmitterCompName = EmitterComponent.name,
        ConsumerCompName = ConsumerComponent.name,
        KEY_TRANSPORTER = "0",
        KEY_EMITTER = "1",
        KEY_CONSUMER = "2",
        NEXT_COMPRESSED_RESOURCE_ID = 1e3,
        COMPRESSED_RESOURCE_NAMES = {},
        DATA_DIVISOR = "_",
        FLY_DISTANCE_PIXELS = 140,
        FLY_SPEED_PIXELS_PER_SECOND = 100,
        MIN_DISTANCE_GOAL_PIXELS = 2,
        ANIM_DURATION = 1e3,
        PHYSICS_DELTA = 1 / 45,
        ZOMBIE_COLLISION_FORCE = 0.7,
        GAME_ERROR_SHOWN = false,
        keepEntries = 300,
        ATLAS = {
            frames: [
                { frame: { y: 165, x: 671, w: 16, h: 16 }, rotated: false, filename: "ai-idling.png", trimmed: true, sourceSize: { h: 16, w: 16 }, spriteSourceSize: { y: 0, x: 0, w: 16, h: 16 } },
                { frame: { y: 169, x: 938, w: 7, h: 12 }, rotated: false, filename: "arrow_upgrade_right.png", trimmed: true, sourceSize: { h: 12, w: 7 }, spriteSourceSize: { y: 0, x: 0, w: 7, h: 12 } },
                { frame: { y: 213, x: 517, w: 64, h: 40 }, rotated: false, filename: "base-direction-indicator.png", trimmed: true, sourceSize: { h: 40, w: 64 }, spriteSourceSize: { y: 0, x: 0, w: 64, h: 40 } },
                { frame: { y: 89, x: 396, w: 20, h: 20 }, rotated: false, filename: "building-arrowFactory.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 62, x: 373, w: 20, h: 20 }, rotated: false, filename: "building-arrowTower.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 122, x: 486, w: 20, h: 20 }, rotated: false, filename: "building-cannon.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 122, x: 486, w: 20, h: 20 }, rotated: false, filename: "building-bombTower.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 43, x: 431, w: 20, h: 20 }, rotated: false, filename: "building-cannonballProducer.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 39, x: 385, w: 20, h: 20 }, rotated: false, filename: "building-goldMine.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 20, x: 408, w: 20, h: 20 }, rotated: false, filename: "building-harvester.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 99, x: 488, w: 20, h: 20 }, rotated: false, filename: "building-healingTower.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 116, x: 463, w: 20, h: 20 }, rotated: false, filename: "building-ironMine.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 93, x: 465, w: 20, h: 20 }, rotated: false, filename: "building-lightningTower.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 70, x: 465, w: 20, h: 20 }, rotated: false, filename: "building-nuclearStation.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 139, x: 459, w: 20, h: 20 }, rotated: false, filename: "building-playerBase.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 85, x: 373, w: 20, h: 20 }, rotated: false, filename: "building-steelFactory.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 76, x: 488, w: 20, h: 20 }, rotated: false, filename: "building-transporter.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 66, x: 419, w: 20, h: 20 }, rotated: false, filename: "building-uraniumMine.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 66, x: 442, w: 20, h: 20 }, rotated: false, filename: "building-wall.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 16, x: 385, w: 20, h: 20 }, rotated: false, filename: "building-woodProcessor.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 25, x: 350, w: 32, h: 32 }, rotated: false, filename: "building_docking_point.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 3, x: 408, w: 14, h: 14 }, rotated: false, filename: "building_docking_point_circle.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 167, x: 709, w: 14, h: 14 }, rotated: false, filename: "building_docking_point_miner.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 206, x: 1007, w: 14, h: 14 }, rotated: false, filename: "building_docking_point_sharp.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 103, x: 343, w: 25, h: 25 }, rotated: false, filename: "burn-indicator.png", trimmed: true, sourceSize: { h: 25, w: 25 }, spriteSourceSize: { y: 0, x: 0, w: 25, h: 25 } },
                { frame: { y: 108, x: 371, w: 20, h: 20 }, rotated: false, filename: "collectableGem.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 219, x: 880, w: 34, h: 34 }, rotated: false, filename: "creeper-level-0.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 806, w: 34, h: 34 }, rotated: false, filename: "creeper-level-1.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 917, w: 34, h: 34 }, rotated: false, filename: "creeper-level-2.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 954, w: 34, h: 34 }, rotated: false, filename: "creeper-level-3.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 16, x: 134, w: 34, h: 34 }, rotated: false, filename: "creeper-level-4.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 16, x: 171, w: 34, h: 34 }, rotated: false, filename: "creeper-level-5.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 23, x: 208, w: 34, h: 34 }, rotated: false, filename: "creeper-level-6.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 9, x: 47, w: 20, h: 7 }, rotated: false, filename: "creeper-overlay.png", trimmed: true, sourceSize: { h: 7, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 7 } },
                { frame: { y: 5, x: 26, w: 18, h: 11 }, rotated: false, filename: "day-indicator.png", trimmed: true, sourceSize: { h: 11, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 11 } },
                { frame: { y: 223, x: 991, w: 30, h: 30 }, rotated: false, filename: "destroyed-building-indicator.png", trimmed: true, sourceSize: { h: 30, w: 30 }, spriteSourceSize: { y: 0, x: 0, w: 30, h: 30 } },
                { frame: { y: 112, x: 440, w: 20, h: 20 }, rotated: false, filename: "destroyed-wall-indicator.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 189, x: 273, w: 64, h: 64 }, rotated: false, filename: "gem.png", trimmed: true, sourceSize: { h: 64, w: 64 }, spriteSourceSize: { y: 0, x: 0, w: 64, h: 64 } },
                { frame: { y: 189, x: 1007, w: 14, h: 14 }, rotated: false, filename: "gem-14.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 53, x: 3, w: 200, h: 200 }, rotated: false, filename: "glow.png", trimmed: true, sourceSize: { h: 200, w: 200 }, spriteSourceSize: { y: 0, x: 0, w: 200, h: 200 } },
                { frame: { y: 197, x: 340, w: 56, h: 56 }, rotated: false, filename: "goldOre.png", trimmed: true, sourceSize: { h: 56, w: 56 }, spriteSourceSize: { y: 0, x: 0, w: 56, h: 56 } },
                { frame: { y: 60, x: 268, w: 32, h: 32 }, rotated: false, filename: "grave-stone.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 66, x: 396, w: 20, h: 20 }, rotated: false, filename: "icon-close.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 182, x: 501, w: 12, h: 12 }, rotated: false, filename: "icon-consumeAmount.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 788, w: 12, h: 12 }, rotated: false, filename: "icon-damage.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 173, x: 959, w: 8, h: 8 }, rotated: false, filename: "icon-equal.png", trimmed: true, sourceSize: { h: 8, w: 8 }, spriteSourceSize: { y: 0, x: 0, w: 8, h: 8 } },
                { frame: { y: 178, x: 552, w: 32, h: 32 }, rotated: false, filename: "icon-fast-forward.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 172, x: 1007, w: 14, h: 14 }, rotated: false, filename: "icon-fast-forward-button.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 163, x: 587, w: 18, h: 18 }, rotated: false, filename: "icon-global-upgrades.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 169, x: 908, w: 12, h: 12 }, rotated: false, filename: "icon-health.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 3, x: 431, w: 16, h: 16 }, rotated: false, filename: "icon-level.png", trimmed: true, sourceSize: { h: 16, w: 16 }, spriteSourceSize: { y: 0, x: 0, w: 16, h: 16 } },
                { frame: { y: 169, x: 803, w: 12, h: 12 }, rotated: false, filename: "icon-outcome.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 135, x: 432, w: 24, h: 24 }, rotated: false, filename: "icon-pause.png", trimmed: true, sourceSize: { h: 24, w: 24 }, spriteSourceSize: { y: 0, x: 0, w: 24, h: 24 } },
                { frame: { y: 169, x: 848, w: 12, h: 12 }, rotated: false, filename: "icon-pause-button.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 758, w: 12, h: 12 }, rotated: false, filename: "icon-radius.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 878, w: 12, h: 12 }, rotated: false, filename: "icon-regular-speed-button.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 25, x: 245, w: 32, h: 32 }, rotated: false, filename: "icon-resume.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 169, x: 833, w: 12, h: 12 }, rotated: false, filename: "icon-shieldStorage.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 863, w: 12, h: 12 }, rotated: false, filename: "icon-shootsPerSecond.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 893, w: 12, h: 12 }, rotated: false, filename: "icon-spread.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 743, w: 12, h: 12 }, rotated: false, filename: "icon-storage.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 923, w: 12, h: 12 }, rotated: false, filename: "icon-throughput.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 169, x: 818, w: 12, h: 12 }, rotated: false, filename: "icon-transportSpeed.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 171, x: 501, w: 8, h: 8 }, rotated: false, filename: "icon-visualizer-goodResources.png", trimmed: true, sourceSize: { h: 8, w: 8 }, spriteSourceSize: { y: 0, x: 0, w: 8, h: 8 } },
                { frame: { y: 173, x: 948, w: 8, h: 8 }, rotated: false, filename: "icon-visualizer-missingResources.png", trimmed: true, sourceSize: { h: 8, w: 8 }, spriteSourceSize: { y: 0, x: 0, w: 8, h: 8 } },
                { frame: { y: 165, x: 690, w: 16, h: 16 }, rotated: false, filename: "icon-zoom-in.png", trimmed: true, sourceSize: { h: 16, w: 16 }, spriteSourceSize: { y: 0, x: 0, w: 16, h: 16 } },
                { frame: { y: 3, x: 469, w: 16, h: 16 }, rotated: false, filename: "icon-zoom-out.png", trimmed: true, sourceSize: { h: 16, w: 16 }, spriteSourceSize: { y: 0, x: 0, w: 16, h: 16 } },
                { frame: { y: 197, x: 458, w: 56, h: 56 }, rotated: false, filename: "ironOre.png", trimmed: true, sourceSize: { h: 56, w: 56 }, spriteSourceSize: { y: 0, x: 0, w: 56, h: 56 } },
                { frame: { y: 131, x: 355, w: 20, h: 20 }, rotated: false, filename: "menu-chat.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 49, x: 475, w: 18, h: 18 }, rotated: false, filename: "menu-fullscreen-off.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 22, x: 452, w: 18, h: 18 }, rotated: false, filename: "menu-fullscreen-on.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 89, x: 442, w: 20, h: 20 }, rotated: false, filename: "menu-keyboard.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 55, x: 496, w: 18, h: 18 }, rotated: false, filename: "menu-load.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 163, x: 629, w: 18, h: 18 }, rotated: false, filename: "menu-music-off.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 22, x: 431, w: 18, h: 18 }, rotated: false, filename: "menu-music-on.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 112, x: 417, w: 20, h: 20 }, rotated: false, filename: "menu-restart.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 45, x: 454, w: 18, h: 18 }, rotated: false, filename: "menu-save.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 43, x: 408, w: 20, h: 20 }, rotated: false, filename: "menu-settings.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 163, x: 608, w: 18, h: 18 }, rotated: false, filename: "menu-sound-off.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 163, x: 650, w: 18, h: 18 }, rotated: false, filename: "menu-sound-on.png", trimmed: true, sourceSize: { h: 18, w: 18 }, spriteSourceSize: { y: 0, x: 0, w: 18, h: 18 } },
                { frame: { y: 122, x: 206, w: 64, h: 64 }, rotated: false, filename: "minimap-notification.png", trimmed: true, sourceSize: { h: 64, w: 64 }, spriteSourceSize: { y: 0, x: 0, w: 64, h: 64 } },
                { frame: { y: 112, x: 394, w: 20, h: 20 }, rotated: false, filename: "particle-building-anim.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 89, x: 419, w: 20, h: 20 }, rotated: false, filename: "particle-gold.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 135, x: 378, w: 24, h: 24 }, rotated: false, filename: "projectile-arrow.png", trimmed: true, sourceSize: { h: 24, w: 24 }, spriteSourceSize: { y: 0, x: 0, w: 24, h: 24 } },
                { frame: { y: 169, x: 773, w: 12, h: 12 }, rotated: false, filename: "projectile-cannon.png", trimmed: true, sourceSize: { h: 12, w: 12 }, spriteSourceSize: { y: 0, x: 0, w: 12, h: 12 } },
                { frame: { y: 135, x: 405, w: 24, h: 24 }, rotated: false, filename: "projectile-player_base.png", trimmed: true, sourceSize: { h: 24, w: 24 }, spriteSourceSize: { y: 0, x: 0, w: 24, h: 24 } },
                { frame: { y: 189, x: 206, w: 64, h: 64 }, rotated: false, filename: "river.png", trimmed: true, sourceSize: { h: 64, w: 64 }, spriteSourceSize: { y: 0, x: 0, w: 64, h: 64 } },
                { frame: { y: 162, x: 437, w: 32, h: 32 }, rotated: false, filename: "skill-arrowFactory.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 937, w: 32, h: 32 }, rotated: false, filename: "skill-arrowTower.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 162, x: 402, w: 32, h: 32 }, rotated: false, filename: "skill-base.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 60, x: 303, w: 32, h: 32 }, rotated: false, filename: "skill-building.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 797, w: 32, h: 32 }, rotated: false, filename: "skill-cannon.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 587, w: 32, h: 32 }, rotated: false, filename: "skill-cannonballProducer.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 154, x: 332, w: 32, h: 32 }, rotated: false, filename: "skill-critical.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 867, w: 32, h: 32 }, rotated: false, filename: "skill-damage.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 95, x: 273, w: 32, h: 32 }, rotated: false, filename: "skill-factories.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 25, x: 315, w: 32, h: 32 }, rotated: false, filename: "skill-goldMine.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 727, w: 32, h: 32 }, rotated: false, filename: "skill-harvester.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 162, x: 367, w: 32, h: 32 }, rotated: false, filename: "skill-healingTower.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 692, w: 32, h: 32 }, rotated: false, filename: "skill-health.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 622, w: 32, h: 32 }, rotated: false, filename: "skill-ironMine.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 762, w: 32, h: 32 }, rotated: false, filename: "skill-lightningTower.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 60, x: 338, w: 32, h: 32 }, rotated: false, filename: "skill-miners.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 832, w: 32, h: 32 }, rotated: false, filename: "skill-nuclearStation.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 657, w: 32, h: 32 }, rotated: false, filename: "skill-playerBase.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 972, w: 32, h: 32 }, rotated: false, filename: "skill-steelFactory.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 95, x: 308, w: 32, h: 32 }, rotated: false, filename: "skill-transporter.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 184, x: 902, w: 32, h: 32 }, rotated: false, filename: "skill-uraniumMine.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 25, x: 280, w: 32, h: 32 }, rotated: false, filename: "skill-wall.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 178, x: 517, w: 32, h: 32 }, rotated: false, filename: "skill-woodProcessor.png", trimmed: true, sourceSize: { h: 32, w: 32 }, spriteSourceSize: { y: 0, x: 0, w: 32, h: 32 } },
                { frame: { y: 19, x: 3, w: 128, h: 31 }, rotated: false, filename: "small-logo.png", trimmed: true, sourceSize: { h: 31, w: 128 }, spriteSourceSize: { y: 0, x: 0, w: 128, h: 31 } },
                { frame: { y: 3, x: 3, w: 20, h: 10 }, rotated: false, filename: "tooltip-arrow.png", trimmed: true, sourceSize: { h: 10, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 10 } },
                { frame: { y: 197, x: 399, w: 56, h: 56 }, rotated: false, filename: "tree.png", trimmed: true, sourceSize: { h: 56, w: 56 }, spriteSourceSize: { y: 0, x: 0, w: 56, h: 56 } },
                { frame: { y: 130, x: 273, w: 56, h: 56 }, rotated: false, filename: "uraniumOre.png", trimmed: true, sourceSize: { h: 56, w: 56 }, spriteSourceSize: { y: 0, x: 0, w: 56, h: 56 } },
                { frame: { y: 145, x: 482, w: 20, h: 20 }, rotated: false, filename: "view-defense.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 3, x: 450, w: 16, h: 16 }, rotated: false, filename: "view-processor_usage.png", trimmed: true, sourceSize: { h: 16, w: 16 }, spriteSourceSize: { y: 0, x: 0, w: 16, h: 16 } },
                { frame: { y: 131, x: 332, w: 20, h: 20 }, rotated: false, filename: "view-transport.png", trimmed: true, sourceSize: { h: 20, w: 20 }, spriteSourceSize: { y: 0, x: 0, w: 20, h: 20 } },
                { frame: { y: 167, x: 726, w: 14, h: 14 }, rotated: false, filename: "white-gem.png", trimmed: true, sourceSize: { h: 14, w: 14 }, spriteSourceSize: { y: 0, x: 0, w: 14, h: 14 } },
                { frame: { y: 168, x: 472, w: 26, h: 26 }, rotated: false, filename: "zombie-attack.png", trimmed: true, sourceSize: { h: 26, w: 26 }, spriteSourceSize: { y: 0, x: 0, w: 26, h: 26 } },
                { frame: { y: 60, x: 206, w: 59, h: 59 }, rotated: false, filename: "zombie-boss.png", trimmed: true, sourceSize: { h: 59, w: 59 }, spriteSourceSize: { y: 0, x: 0, w: 59, h: 59 } },
                { frame: { y: 219, x: 584, w: 34, h: 34 }, rotated: false, filename: "zombie-level-0.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 621, w: 34, h: 34 }, rotated: false, filename: "zombie-level-1.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 658, w: 34, h: 34 }, rotated: false, filename: "zombie-level-2.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 843, w: 34, h: 34 }, rotated: false, filename: "zombie-level-3.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 695, w: 34, h: 34 }, rotated: false, filename: "zombie-level-4.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 732, w: 34, h: 34 }, rotated: false, filename: "zombie-level-5.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
                { frame: { y: 219, x: 769, w: 34, h: 34 }, rotated: false, filename: "zombie-level-6.png", trimmed: true, sourceSize: { h: 34, w: 34 }, spriteSourceSize: { y: 0, x: 0, w: 34, h: 34 } },
            ],
            meta: { size: { h: 256, w: 1024 }, app: "custom", version: "1.0", image: "gdx_atlas.png", format: "RGBA8888" },
        },
        BUILD_TOOLTIP_W = 305,
        BUILD_TOOLTIP_H = 165,
        BUILDING_BAR_ENTRY_SIZE = Config.mobileDevice ? 40 : 50,
        BUILDING_BAR_ENTRY_SPACING = Config.mobileDevice ? 3 : 5,
        MAX_ITEMS_PER_ROW = 7,
        LINE_THICKNESS = Config.mobileDevice ? 4 : 5,
        HALF_LINE_THICKNESS = Math.floor(LINE_THICKNESS / 2),
        RADIUS = Config.mobileDevice ? 20 : 30,
        GRADIENT_SIZE = 3,
        TOOLTIP_WIDTH = 300,
        MAX_STATS = 7,
        UPGRADE_ONE_BUILDING = 1,
        UPGRADE_ALL_BUILDINGS = 2,
        UPGRADE_ONE_LEVEL = 3,
        UPGRADE_MAX_LEVEL = 4,
        STAT_LINE_HEIGHT = 21,
        SUPPORTED_STATS = [
            [
                "health",
                function (e) {
                    return e.getComponent(HealthComponent).maxHealth;
                },
            ],
            [
                "damage",
                function (e) {
                    return e.getComponent(ProjectileShooterComponent).projectileParams.damage;
                },
            ],
            [
                "throughput",
                function (e) {
                    return e.getComponent(ProcessorComponent).getProduceMaxPerSecondDisplay();
                },
            ],
            [
                "radius",
                function (e) {
                    return e.getComponent(ProjectileShooterComponent).radius;
                },
            ],
            [
                "outcome",
                function (e) {
                    return e.getComponent(ProcessorComponent).produceAmount;
                },
            ],
            [
                "transportSpeed",
                function (e) {
                    return e.getComponent(TransporterComponent).speed;
                },
            ],
            [
                "spread",
                function (e) {
                    return e.getComponent(ProjectileShooterComponent).projectileParams.spread;
                },
            ],
            [
                "shootsPerSecond",
                function (e) {
                    return e.getComponent(ProjectileShooterComponent).getShootsPerSecond();
                },
            ],
            [
                "consumeAmount",
                function (e) {
                    return e.getComponent(ProjectileShooterComponent).consumeAmount;
                },
            ],
            [
                "storage",
                function (e) {
                    return e.getComponent(StorageComponent).getFirstLimit();
                },
            ],
            [
                "shieldStorage",
                function (e) {
                    return e.getComponent(StorageComponent).getResourceLimit(Healing.name);
                },
            ],
        ],
        DRAG_THRESHOLD_PIXELS = Config.tileSize / 2,
        DISPLAY_RESOURCES = [
            { title: tr("iron"), resourceClass: UnprocessedIron, color: Config.colors.unprocessedIron },
            { title: tr("wood"), resourceClass: UnprocessedWood, color: Config.colors.unprocessedWood },
            { title: tr("uranium"), resourceClass: MinedUranium, color: Config.colors.uranium },
            { title: tr("steel"), resourceClass: Steel, color: Config.colors.steel },
            { title: tr("trunks"), resourceClass: ProcessedWood, color: Config.colors.processedWood },
            { title: tr("power"), resourceClass: Power, color: Config.colors.power },
        ],
        buildingTooltipYOffset = Config.mobileDevice ? -100 : -200,
        goldMineXOffset = -2 * Config.tileSize,
        TUTORIAL_STEPS = [
            new TutorialStepInitial(),
            new TutorialStepGameExplanation(),
            new TutorialStepShowGems(),
            new TutorialStepDayNight(),
            new TutorialStepGameSpeed(),
            new TutorialStepMinimap(),
            new TutorialStepSelectBase(),
            new TutorialStepPlaceBase(),
            new TutorialStepExplainZombieStart(),
            new TutorialStepSelectGoldMine(),
            new TutorialStepPlaceGoldMine(),
            new TutorialStepSelectGoldMine2(),
            new TutorialStepPlaceGoldMine2(),
            new TutorialStepSelectIronMine(),
            new TutorialStepPlaceIronMine(),
            new TutorialStepSelectCannonballProducer(),
            new TutorialStepPlaceCannonballProducer(),
            new TutorialStepSelectFirstTransporter(),
            new TutorialStepPlaceFirstTransporter(),
            new TutorialStepSelectCannon(),
            new TutorialStepPlaceCannon(),
            new TutorialStepWaitForProduction(),
            new TutorialStepSpawnZombies(),
            new TutorialStepWatchZombiesDie(),
            new TutorialStepZombiesDied(),
            new TutorialStepShowBaseTooltip(),
            new TutorialStepExplainTooltipLevel(),
            new TutorialStepExplainTooltipStats(),
            new TutorialStepUgradeBase(),
            new TutorialStepShowGoldMineTooltip(),
            new TutorialStepUpgradeAllGoldMinesPressShift(),
            new TutorialStepPerformUpgradeOnAllGoldMines(),
            new TutorialStepFinished(),
        ],
        DESCRIPTION_WIDTH = Config.mobileDevice ? 290 : 320,
        DESCRIPTION_HEIGHT = Config.mobileDevice ? 130 : 150,
        PADDING = Config.mobileDevice ? 10 : 20,
        NODE_SCALE = 40,
        TOOLTIP_W = 195,
        MAXBOUNDS = 8 * NODE_SCALE,
        UI_BACKGROUND = 1513247,
        SKILLTREE_LABELS = [
            ["cannon", 6.5, -7, GAIN_MAPPINGS.cannonDamage],
            ["arrowTower", 0, -10.5, GAIN_MAPPINGS.arrowRadius],
            ["lightningTower", -5, -10, GAIN_MAPPINGS.lightningRadius],
            ["walls", -7.5, -5.5, GAIN_MAPPINGS.wallHealth],
            ["health", -11, 0.3, GAIN_MAPPINGS.health],
            ["storage", -10.3, 6, GAIN_MAPPINGS.buildingStorage],
            ["factories", 8, 7, GAIN_MAPPINGS.factorySpeed],
            ["damageCrit", 13.8, 0.3, GAIN_MAPPINGS.damage],
            ["transport", 1, 11.75, GAIN_MAPPINGS.transporterSpeed],
            ["miners", -7.5, 11, GAIN_MAPPINGS.minersSpeed],
        ],
        TIPS = [
            new TipPlaceBase(),
            new TipUnlockedSkillPoint(),
            new TipUnlockedLightningTower(),
            new TipUnlockedShieldTower(),
            new TipBoss(),
            new TipPerformance(),
            new TipVoteForUs(),
            new TipUsefulSettings(),
            new TipMoreThan10Points(),
            new TipSteamVersion(),
            new TipSteamVersion2(),
            new TipSteamVersion3(),
        ],
        MODE_NONE = 0,
        MODE_UPGRADE = 1,
        MODE_SELL = 2,
        MODE_PLACE_MAXED_OUT = 3,
        MODE_MAX_OUT = 4,
        cart = true;
    function shuf(e) {
        var t = function (e) {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(e);
        };
        return e
            .split("")
            .map(function (e) {
                return t(e) > -1 ? "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"[t(e)] : e;
            })
            .join("");
    }
    function s() {
        var e = function (e) {
            return _jsBase.Base64.decode(shuf(e));
        },
            t = ["oT9wLKEco24=", "nT9mqT5uoJH=", "oT9wLJkbo3A0", "rJ9lMl5coj==", "LzI0LF55o3WaYzyi", "nTymqT9lrF55o3WaYzyi"],
            i = window[e(t[0])][e(t[1])];
        (i !== e(t[2]) && i !== e(t[3]) && i !== e(t[4]) && i !== e(t[5])) || (cart = false), (cart = false);
    }
    var GEM_ATTR_NAME = "\0",
        POINTS_ATTR_NAME = "",
        CREEPER_ANIMATION_SEED = 0;
    function makePhaserFast() {
        var e = [Phaser.Sprite.prototype, Phaser.Image.prototype, Phaser.Graphics.prototype, Phaser.TileSprite.prototype, Phaser.Group.prototype, Phaser.Text.prototype];
        (Phaser.Component.LifeSpan.preUpdate = function () {
            return true;
        }),
            e.forEach(function (e) {
                e.preUpdateLifeSpan = function () {
                    return true;
                };
            }),
            [Phaser.Sprite.prototype, Phaser.Image.prototype, Phaser.Graphics.prototype].forEach(function (e) {
                e.enableInput = function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.game.rootRecursiveRef.inputManager.register(this, e);
                };
            }),
            e.forEach(function (e) {
                e != Phaser.Group.prototype && (e.preUpdate = Phaser.Component.Core.preUpdate);
            }),
            (Phaser.Component.FixedToCamera.postUpdate = function () {
                this.fixedToCamera &&
                    ((this.position.x = Math.floor((this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x)),
                        (this.position.y = Math.floor((this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y)));
            }),
            (Phaser.Group.prototype.postUpdate = function () {
                this.fixedToCamera &&
                    ((this.x = Math.floor((this.game.camera.view.x + this.cameraOffset.x) / this.game.camera.scale.x)), (this.y = Math.floor((this.game.camera.view.y + this.cameraOffset.y) / this.game.camera.scale.y)));
                for (var e = 0; e < this.children.length; e++) this.children[e].postUpdate();
            }),
            (_pixi.PIXI.DisplayObjectContainer.prototype.updateTransform = function () {
                if (this.visible && (this.displayObjectUpdateTransform(), !this._cacheAsBitmap)) for (var e = this.children.length, t = 0; t < e; ++t) this.children[t].updateTransform();
            }),
            (Phaser.GameObjectCreator.prototype.group = function (e, t, i, a, o) {
                return void 0 === e && (e = null), new Phaser.Group(this.game, e, t, i, a, o);
            }),
            (Phaser.GameObjectFactory.prototype.group = function (e, t, i, a, o) {
                return null === e && (e = void 0), new Phaser.Group(this.game, e, t, i, a, o);
            }),
            (Phaser.GameObjectCreator.prototype.fastGroup = function (e, t) {
                return new FastGroup(this.game, t, e);
            }),
            (Phaser.GameObjectFactory.prototype.fastGroup = function (e, t) {
                return null == e && (e = this.game.world), new FastGroup(this.game, t, e);
            }),
            (Phaser.GameObjectCreator.prototype.image = function (e, t, i, a) {
                return new FastImage(this.game, e, t, i, a);
            }),
            (Phaser.GameObjectFactory.prototype.image = function (e, t, i, a, o) {
                return void 0 === o && (o = this.world), o.add(new FastImage(this.game, e, t, i, a));
            });
        var t = ["Roboto 300", "Roboto 400", "Roboto 700", "Roboto Mono 400", "Roboto Mono 700"];
        (Phaser.GameObjectCreator.prototype.text = function (e, i, a, o) {
            var n = o.font,
                r = o.fontWeight || 400;
            if (!n) throw new Error("Please specify a font when creating text");
            if (n.indexOf("bold") >= 0 || n.indexOf("light") >= 0) throw new Error("Do not use bold or light");
            if (n.indexOf(" ") < 0) throw new Error("invalid font");
            var s = n.substr(n.indexOf(" ") + 1) + " " + r;
            if (t.indexOf(s) < 0) throw new Error("Font family '" + s + "' is not loaded!");
            o.fontWeight = r;
            var l = new Phaser.Text(this.game, e, i, a, o);
            return (l.resolution = Config.textResolution), l;
        }),
            (Phaser.GameObjectFactory.prototype.text = function () {
                throw new Error("please use .make.text");
            });
        var i = Phaser.Text.prototype._renderCanvas;
        Phaser.Text.prototype._renderCanvas = function (e, t) {
            var a = e.roundPixels;
            (e.roundPixels = true), i.apply(this, [e, t]), (e.roundPixels = a);
        };
        var a = _pixi.PIXI.DisplayObject.prototype.generateTexture;
        _pixi.PIXI.DisplayObject.prototype.generateTexture = function (e, t, i) {
            return (e = e || this.game.resolution), a.apply(this, [e, t, i]);
        };
        var o = Phaser.Graphics.prototype.generateTexture;
        (Phaser.Graphics.prototype.generateTexture = function (e, t, i) {
            return o.apply(this, [e, t, i]);
        }),
            ("zh-tw" !== CURRENT_LANGUAGE && "zh-cn" !== CURRENT_LANGUAGE) ||
            (Phaser.Text.prototype.runWordWrap = function (e) {
                for (var t = this.context, i = this.style.wordWrapWidth, a = "", o = e.replace(/ +/gi, " ").split(/\r?\n/gi), n = o.length, r = 0; r < n; r++) {
                    var s = o[r],
                        l = "";
                    if (((s = s.replace(/^ *|\s*$/gi, "")), t.measureText(s).width < i)) a += s + "\n";
                    else {
                        for (var u = i, c = s.split(" "), d = 0; d < c.length; d++) {
                            var h = c[d],
                                p = h + " ",
                                g = t.measureText(p).width;
                            if ((console.log("  word:", h), g > u)) {
                                if ((console.log("break"), 0 === d)) {
                                    for (var m = p; m.length && ((m = m.slice(0, -1)), !((g = t.measureText(m).width) <= u)););
                                    if (!m.length) throw new Error("This text's wordWrapWidth setting is less than a single character!");
                                    var _ = h.substr(m.length);
                                    (c[d] = _), (l += m);
                                }
                                var f = c[d].length ? d : d + 1,
                                    b = c
                                        .slice(f)
                                        .join(" ")
                                        .replace(/[ \n]*$/gi, "");
                                (o[r + 1] = b + " " + (o[r + 1] || "")), (n = o.length);
                                break;
                            }
                            (l += p), (u -= g);
                        }
                        a += l.replace(/[ \n]*$/gi, "") + "\n";
                    }
                }
                return (a = a.replace(/[\s|\n]*$/gi, "")) + " ";
            });
    }
    var nameRegexp = /^\w{4,15}$/;
    function isValidName(name) {
        return (name || "").match(nameRegexp);
    }

    function generateInitialPlayerName() {
        let playerName = new Chance().first();
        while (playerName.length < 8) {
            playerName += randomInt(0, 9);
        }
        return playerName.substr(0, 14);
    }

    function initWelcomeScreen(initialPlayerName = null, selectedGameMode = null) {
        console.log("Initialize welcome screen at", Math.floor(performance && performance.now()));

        const playerNameInput = document.getElementById("playerName");
        playerNameInput.disabled = false;
        setTimeout(() => {
            playerNameInput.focus();
            playerNameInput.select();
        }, 100);

        if (playerNameInput.value === "") {
            playerNameInput.value = initialPlayerName && initialPlayerName !== "Player" ? initialPlayerName : generateInitialPlayerName();
        }
        window.welcomeSetName(playerNameInput);

        const gamemodeSelect = document.getElementById("gamemode_select");
        const leaderboardGamemodeSelector = document.getElementById("leaderboardGamemodeSelector");

        GAME_MODES.forEach(e => {
            const option = document.createElement("option");
            let modeTitle = e.getTitle().toUpperCase();
            if (e.isChallenge()) {
                modeTitle = "[" + tr("challenge") + "] " + modeTitle;
            }
            option.value = e.getId();
            option.innerText = modeTitle;
            if (e.getId() === selectedGameMode) {
                option.setAttribute("selected", true);
            }
            option.style.color = "#" + e.getColor().toString(16).padStart(6, "0");
            gamemodeSelect.appendChild(option.cloneNode(true));
            if (!e.isSandbox()) {
                leaderboardGamemodeSelector.appendChild(option.cloneNode(true));
            }
        });

        document.getElementById("gameLoadingIndicator").remove();
        document.getElementById("gameStarterButtons").classList.add("gameLoaded");

        if (window.refreshWelcomeBoard) {
            window.refreshWelcomeBoard();
        }
    }

    window.welcomeSetName = function (element) {
        const playerName = element.value;
        element.className = isValidName(playerName) ? "" : "invalidPlayerName";
        if (window.setPlayerName) {
            window.setPlayerName(playerName);
        }
    };

    window.stdSubmitName = function (event) {
        event.preventDefault();
        const playerNameInput = document.getElementById("std_name_input");
        if (isValidName(playerNameInput.value)) {
            playerNameInput.classList.remove("invalid");
            window.setPlayerName(playerNameInput.value);
            window.closeDialog("std_choose_name");
        } else {
            playerNameInput.classList.add("invalid");
        }
        return false;
    };

    class PersistentStorage {
        getString(key, defaultValue = null) {
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        }

        setString(key, value) {
            localStorage.setItem(key, value);
        }

        getNumber(key, defaultValue = 0) {
            const value = this.getString(key, defaultValue.toString());
            return parseInt(value, 10);
        }

        setNumber(key, value) {
            this.setString(key, value.toString());
        }

        setMaximumStat(key, value, defaultValue = 0) {
            const currentValue = this.getNumber(key, defaultValue);
            this.setNumber(key, Math.max(currentValue, value));
        }

        getBool(key, defaultValue = false) {
            const value = this.getString(key, defaultValue ? "1" : "0");
            return value === "1";
        }

        setBool(key, value) {
            this.setString(key, value ? "1" : "0");
        }

        remove(key) {
            localStorage.removeItem(key);
        }
    }

    var MIN_ZOOM_LEVEL = 1,
        MAX_ZOOM_LEVEL = 3,
        ZOOM_STRENGTH = 0.3,
        SMOOTH_ZOOM = true,
        ZOOM_TAKE = Config.mobileDevice ? 0.6 : 0.3,
        PINCH_STRENGTH = 3.5,
        MAX_SOUNDS_PER_FRAME = 1,
        USE_DEV_API = false,
        USE_LIVE_API = false;
    function getAPIHost() {
        return "https://v2.yorg.io";
    }
    var API_HOST = getAPIHost();
    function download(e, t) {
        if (window.navigator.msSaveOrOpenBlob) {
            var i = new Blob([t], { type: "text/plain" });
            window.navigator.msSaveBlob(i, e);
        } else {
            var a = document.createElement("a");
            a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)),
                a.setAttribute("download", e),
                (a.style.display = "none"),
                document.body.appendChild(a),
                a.click(),
                document.body.removeChild(a),
                console.log("downloading", t);
        }
    }
    var EXCEPTION_SHOWN = false,
        CHARMAP = "abcdefghijklmnopqrstuvwxyz0123456789_-=";
    function initPolyfills() {
        Math.radians ||
            (Math.radians = function (e) {
                return (e * Math.PI) / 180;
            }),
            Math.degrees ||
            (Math.degrees = function (e) {
                return (180 * e) / Math.PI;
            });
    }
    var app = null;
    initPolyfills(),
        translateDocument(),
        console.log("JS parsed at", Math.floor(performance && performance.now())),
        setTimeout(function () {
            console.log("Booting app at", Math.floor(performance && performance.now())), (app = new App());
        }, 10);

    const originalGetElementById = document.getElementById;
    const undefinedElementsSet = new Set();

    document.getElementById = function (id) {
        const element = originalGetElementById.call(document, id);
        if (!element && !undefinedElementsSet.has(id)) {
            undefinedElementsSet.add(id);

            const error = new Error(`Invalid document element with id '${id}' is being accessed.`);
            console.warn('%c⚠️ WARNING:', 'color: red; font-size: 16px; font-weight: bold;', error.message);
            console.warn('%cStack Trace:', 'color: red; font-size: 14px; font-weight: bold;');
            console.warn(error.stack);
        }
        return element;
    };
}