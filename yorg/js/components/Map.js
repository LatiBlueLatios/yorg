import { Config } from "../global/Config.js";
import { make2DArray, make1DArray } from "../global/functions.js";

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

export default Map