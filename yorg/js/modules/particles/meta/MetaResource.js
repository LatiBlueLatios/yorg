import { Config } from "../../../global/Config.js";

class MetaResource extends MetaSingleSpriteParticle {
    constructor(id) {
        super(id + ".png");
        this.resourceId = id;
        this.width = Config.tileSize - 2 * Config.ui.resourceOuterSpace;
        this.height = this.width;
        this.paddingX = Config.ui.resourceOuterSpace;
        this.paddingY = Config.ui.resourceOuterSpace;
        this.renderMode = PARTICLE_RENDER_FAST;
    }

    getRadius() {
        return Config.radius[this.resourceId];
    }

    getInstanceClass() {
        throw new Error("abstract");
    }

    isImportantParticle() {
        return true;
    }

    makeParticle(e) {
        return new (this.getInstanceClass())(e, this.precomputedTexture);
    }

    reviveParticle() {
        throw new Error("Revive not possible for resources - they should never die");
    }

    onContainerCreated(e) {
        (e.offsetX = Config.tileSize / 2), (e.offsetY = Config.tileSize / 2);
    }
}

export default MetaResource;
