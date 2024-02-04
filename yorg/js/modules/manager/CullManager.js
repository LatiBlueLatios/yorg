class CullManager {
    constructor(root) {
        this.root = root;
    }

    update() {
        const e = this.root.phaser.camera.position,
            t = this.root.zoom.currentZoomLevel,
            i = [this.root.phaser.width, this.root.phaser.height];
 
        this.bounds = { 
            left: e.x * t - CULLING_BORDER_SIZE, 
            right: (e.x + i[0]) * t + CULLING_BORDER_SIZE, 
            top: e.y * t - CULLING_BORDER_SIZE, 
            bottom: (e.y + i[1]) * t + CULLING_BORDER_SIZE 
        };
    }

    isRectInView(e, t, i, a) {
        return !!this.bounds && this.bounds.left <= e + i && e <= this.bounds.right && this.bounds.top <= t + a && t <= this.bounds.bottom;
    }

    isCircleInView(e, t, i) {
        return this.isRectInView(e - i, t - i, 2 * i, 2 * i);
    }
}

export default CullManager;