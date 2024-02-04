import ParticleCache from "./ParticleCache.js";

class ParticleFactory {
    constructor(root) {
        this.root = root;
        this.caches = new Map();
        this.particleContainer = this.root.groups.particlesGroup;
        this.specialGroups = {};
    }

    registerSpecialGroup(name, group) {
        this.specialGroups[name] = group;
    }

    getParticleStatsText() {
        let totalParticles = 0;
        let renderedParticles = 0;
        let maxParticles = 0;
        let statsText = "<b>Particles</b><br />";

        for (let cacheName in this.caches) {
            if (cacheName.startsWith("AnimLevel")) continue;

            const cache = this.caches[cacheName];
            statsText += `<b>${cacheName.replace("Meta", "")}</b> ${cache.getStatsText()}<br />`;
            totalParticles += cache.count;
            maxParticles += cache.maxCount;
            renderedParticles += cache.getRenderCount();
        }

        statsText += `Total: <b>${totalParticles}</b> | Rendered: <b>${renderedParticles}</b> | Max: <b>${maxParticles}</b><br />`;

        return statsText;
    }

    spawnNew(position, particleConfig, options) {
        const cacheKey = particleConfig.name;
        let cache = this.caches[cacheKey];

        if (!cache) {
            const particleGroup = this.specialGroups[cacheKey] || this.particleContainer;
            if (Config.logParticleGroups && this.specialGroups[cacheKey]) {
                console.log("[PARTICLES] Using custom group for", cacheKey);
            }
            cache = new ParticleCache(this.root.phaser, cacheKey, particleGroup, particleConfig);
            this.caches[cacheKey] = cache;
        }

        return cache.spawnNew(position, particleConfig, options || []);
    }

    clearAll() {
        for (let cacheKey in this.caches) {
            this.caches[cacheKey].clearAll();
        }
    }

    kill(particle) {
        if (!particle.particleCacheKey) {
            throw new Error("Particle not registered");
        }
        this.caches[particle.particleCacheKey].kill(particle);
    }

    tryKillEntity(entity) {
        if (entity.particleCacheKey) {
            this.caches[entity.particleCacheKey].killEntity(entity);
        }
    }
}

export default ParticleFactory;