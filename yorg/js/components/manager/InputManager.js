class InputManager {
    constructor(t) {
        this.root = t
        this.objects = [];
        this.currentInputDownObject = null;
        this.currentInputHoverObject = null;
        window.mouseTracker.onMouseDown.add(this.handleMouseDown, this);
        window.mouseTracker.onMouseUp.add(this.handleMouseUp, this);
        window.mouseTracker.onMouseMove.add(this.handleMouseMove, this);
        t.signals.gameFocusChanged.add(this.onFocusChanged, this);
    }

    register(e, shouldCatchInputAlways = true) {
        if (arguments.length > 1 && shouldCatchInputAlways) {
            e.inputAlwaysCatch = true;
        }
        this.objects.push(e);
    }    

    clearObjects() {
        this.objects = [];
    }

    onFocusChanged() {
        this.root.focus.isFocused() ||
            (this.currentInputHoverObject && (this.currentInputHoverObject.events.onInputUp.dispatch(), (this.currentInputHoverObject = null)),
                this.currentInputDownObject && (this.currentInputDownObject.events.onInputUp.dispatch(), (this.currentInputDownObject = null)));
    }

    isObjectViableForInput(e) {
        return e instanceof Phaser.Stage || (!!(e.alive && e.exists && e.visible) && !(!e.inputAlwaysCatch && e.parent && !this.isObjectViableForInput(e.parent)));
    }

    handleMouseUp() {
        this.currentInputDownObject && (this.currentInputDownObject.events.onInputUp.dispatch(), (this.currentInputDownObject = null));
    }

    handleMouseMove() {
        var e = this.findObjectBelowCursor();
        e !== this.currentInputHoverObject && (this.currentInputHoverObject && this.currentInputHoverObject.events.onInputOut.dispatch(), e && e.events.onInputOver.dispatch(), (this.currentInputHoverObject = e));
    }

    handleMouseDown() {
        this.currentInputDownObject = null;
        const e = this.findObjectBelowCursor();
        e && (e.events.onInputDown.dispatch(), (this.currentInputDownObject = e));
    }

    findObjectBelowCursor() {
        for (let e = window.mouseTracker.getPosition(), t = e.x, i = e.y, a = null, o = 0; o < this.objects.length; ++o) {
            var n = this.objects[o],
                r = n.getBounds();
            r && t >= r.x && i >= r.y && t <= r.x + r.width && i <= r.y + r.height && this.isObjectViableForInput(n) && (!a || n.renderOrderID > a.renderOrderID) && (a = n);
        }
    }
}

export default InputManager;