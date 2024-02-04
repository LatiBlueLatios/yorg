class MetaParticle {
    constructor() {
        this.width = 24;
        this.height = 24;
        this.paddingX = 0;
        this.paddingY = 0;
        this.tint = 16777215
        this.renderMode = PARTICLE_RENDER_FAST;
    }

    isImportantParticle() {
        return false;
    }

    needsUpdates() {
        return false;
    }

    initTexture(e) {
        if (((this.precomputedTexture = this.generateTexture(e)), null == this.precomputedTexture)) throw new Error("Precomputed texture was null");
    }

    makeParticle(e) {
        if (this.renderMode === PARTICLE_RENDER_FAST) return new FastParticleSprite(this.precomputedTexture);
        var t = e.make.image(this.paddingX, this.paddingY, this.precomputedTexture);
        return t.anchor.setTo(0.5), t;
    }

    reviveParticle(e) {
        e.revive();
        e.alpha = 1;
    }

    generateTexture() {
        throw new Error("abstract");
    }

    onContainerCreated() { }
}

export default MetaParticle;