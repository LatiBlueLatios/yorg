class ParticleCache {
    constructor(game, cacheKey, parent, metaClass) {
        this.metaClassInstance = new metaClass();
        this.metaClassInstance.initTexture(game);
        this.cacheKey = cacheKey;
        this.game = game;

        let renderMode = this.metaClassInstance.renderMode;

        if (renderMode === PARTICLE_RENDER_FAST) {
            this.container = game.add.emitter(0, 0, 0);
            this.container.makeParticles(cacheKey);
            parent.add(this.container);

            if (!this.metaClassInstance.isImportantParticle()) {
                this.container.renderCondition = () => this.game.rootRecursiveRef.settings.enableParticles;
            }
        } else if (renderMode === PARTICLE_RENDER_BATCH) {
            this.container = game.add.group();
            parent.add(this.container);

            if (!this.metaClassInstance.isImportantParticle()) {
                this.container.renderCondition = () => this.game.rootRecursiveRef.settings.enableParticles;
            }

            if (this.metaClassInstance.needsUpdates()) {
                this.container.updateWhenInvisible = true;
            }

            if (this.metaClassInstance.enableCullingRadius) {
                this.container.cullingRadius = this.metaClassInstance.enableCullingRadius;
                if (Config.logParticleGroups) {
                    console.log("[PARTICLES] Culling with r=", this.container.cullingRadius, "for", cacheKey);
                }
            } else {
                console.warn("[PARTICLES] No culling radius set on", cacheKey, "!");
            }
        } else if (renderMode === PARTICLE_RENDER_REGULAR) {
            this.container = game.add.group();
            parent.add(this.container);
        } else if (renderMode === PARTICLE_RENDER_NONE) {
            this.container = null;
        } else {
            throw new Error("Unknown render mode: " + renderMode);
        }

        this.metaClassInstance.onContainerCreated(this.container);
        this.deletedCache = [];
        this.count = 0;
        this.maxCount = 0;
    }

    spawnNew(e, t, i) {
        var a;
        if (((this.count += 1), (this.maxCount = Math.max(this.maxCount, this.count)), this.deletedCache.length > 0)) {
            var o,
                n = this.deletedCache.pop();
            return (o = this.metaClassInstance).reviveParticle.apply(o, [n].concat(_toConsumableArray(i))), n.position.setTo(e, t), (n.alpha = 1), n;
        }
        var r = (a = this.metaClassInstance).makeParticle.apply(a, [this.phaser].concat(_toConsumableArray(i)));
        return r.position.setTo(e, t), (r.particleCacheKey = this.cacheKey), this.container && this.container.add(r), r;
    }

    kill(e) {
        if (this.deletedCache.indexOf(e) >= 0) throw new Error("tried to kill particle twice on " + this.cacheKey);
        if (this.count <= 0) throw new Error("spawn/kill mismatch on " + this.cacheKey);
        (this.count -= 1), e.kill(), this.deletedCache.push(e);
    }

    killEntity() {
        if (this.count <= 0) throw new Error("spawn/kill mismatch on" + this.cacheKey);
        this.count -= 1;
    }

    clearAll() {
        this.container && clearGroup(this.container), (this.count = 0), (this.deletedCache = []);
    }

    getRenderCount() {
        switch (this.metaClassInstance.renderMode) {
            case PARTICLE_RENDER_FAST:
            case PARTICLE_RENDER_BATCH:
                return this.container.renderCount;
            default:
                return this.count;
        }
    }

    getStatsText() {
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
    }
}

export default ParticleCache;