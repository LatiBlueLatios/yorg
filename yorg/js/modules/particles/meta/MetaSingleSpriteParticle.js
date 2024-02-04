class MetaSingleSpriteParticle extends MetaParticle {
    constructor(id) {
        if (id === null) {
            throw new Error("sprite key is null");
        }
        super();
        this.spriteKey = i;
        this.enableCullingRadius = Math.hypot(this.width / 2, this.height / 2);
    }

    generateTexture(e) {
        var t = e.make.group(),
            i = e.make.image(0, 0, "atlas", this.spriteKey);
        (i.width = this.width), (i.height = this.height), (i.tint = this.tint), i.position.setTo(this.paddingX, this.paddingY), t.addChild(i);
        var a = t.generateTexture();
        return t.destroy(), a;
    }

    getPreviewSpritePath() {
        return this.spriteKey;
    }
}

export default MetaSingleSpriteParticle