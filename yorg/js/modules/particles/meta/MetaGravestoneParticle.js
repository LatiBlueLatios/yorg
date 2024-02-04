class MetaGravestoneParticle extends MetaSingleSpriteParticle {
    constructor() {
        super("grave-stone.png");
        this.width = 20;
        this.height = 20;
    }

    isImportantParticle() {
        return true;
    }
}

export default MetaGravestoneParticle;