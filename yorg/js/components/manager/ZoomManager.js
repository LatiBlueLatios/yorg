import { Config } from "../../global/Config.js";

class ZoomManager {
    constructor(root) {
        this.root = root;
        this.currentZoomLevel = 1;
        this.currentZoomStack = 0;
        this.maximumWindowZoomLevel = 3;

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

    computePinchDistance(e) {
        if (e.touches && e.touches.length >= 2) {
            const t = e.touches[0];
            const i = e.touches[1];
            const pinchDistance = Math.hypot(t.clientX - i.clientX, t.clientY - i.clientY);

            if (this.currentPinchDistance === null) {
                this.currentPinchDistance = pinchDistance;
            } else {
                const pinchDelta = pinchDistance - this.currentPinchDistance;
                this.onMouseWheel(0, -pinchDelta * 3.5);
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
        const o = Math.max(0.25, Math.min(3, Math.min(i, a)));

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
            Math.abs(this.currentZoomLevel - 1) > 0.01;
    }

    isZoomOutPossible() {
        return this.root.gameStarted && !Config.tutorialActive &&
            Math.abs(this.currentZoomLevel - 3) > 0.01;
    }

    setZoomLevel(zoomLevel, signalChange = true) {
        this.currentZoomLevel = Math.min(this.maximumWindowZoomLevel,
            Math.max(1, zoomLevel));
        this.currentZoomStack = 0;
        this.root.phaser.customZoomLevel = this.currentZoomLevel;
        if (signalChange) {
            this.root.signals.zoomLevelChanged.dispatch(this.currentZoomLevel);
        }
    }

    update() {
        let a = 0;
        const SMOOTH_ZOOM = true;

        if (SMOOTH_ZOOM && Math.abs(this.currentZoomStack) > 0.01) {
            a = this.currentZoomStack * Math.min(1, 0.3 *
                (this.root.time.physicsElapsedConsistent / 0.01666));
        } else {
            a = this.currentZoomStack;
        }

        if (Math.abs(a) > 0.001) {
            this.currentZoomStack -= a;
            this.currentZoomLevel += a * 0.3;
            this.currentZoomLevel = Math.min(this.maximumWindowZoomLevel,
                Math.max(1, this.currentZoomLevel));

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

export default ZoomManager;