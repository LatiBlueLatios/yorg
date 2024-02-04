class GameFocus {
    constructor(t) {
        this.root = t;
        this.visibilitySupported = false;
        this.windowIsFocused = true;
        this.windowIsVisible = true;
        this.initFocusListener();
        this.initVisbilityListener();
    }

    initFocusListener() {
        var e = this;
        window.addEventListener("focus", function () {
            (e.windowIsFocused = true), e.root.signals.gameFocusChanged.dispatch();
        }),
            window.addEventListener("blur", function () {
                (e.windowIsFocused = false), e.root.keyboard.releaseAllKeys(), e.root.signals.gameFocusChanged.dispatch(), window.mouseTracker.onFocusLost();
            });
    }

    initVisbilityListener() {
        // TODO: Revamp this shit code and remove Firefox support cause fuck that
        var e = this,
            t = "";
        void 0 !== document.hidden
            ? ((this.documentHiddenPropertyName = "hidden"), (t = "visibilitychange"))
            : void 0 !== document.msHidden
                ? ((this.documentHiddenPropertyName = "msHidden"), (t = "msvisibilitychange"))
                : void 0 !== document.webkitHidden && ((this.documentHiddenPropertyName = "webkitHidden"), (t = "webkitvisibilitychange")),
            void 0 === document.addEventListener || void 0 === document[this.documentHiddenPropertyName]
                ? console.warn("[FOCUS] This game requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.")
                : (document.addEventListener(
                    t,
                    function () {
                        return e.handleVisibilityChange();
                    },
                    false
                ),
                    (this.visibilitySupported = true));
    }

    handleVisibilityChange() {
        document[this.documentHiddenPropertyName] ? ((this.windowIsVisible = false), window.mouseTracker.onFocusLost()) : (this.windowIsVisible = true), this.root.signals.gameFocusChanged.dispatch();
    }

    isFocused() {
        return this.windowIsFocused;
    }

    isVisible() {
        return this.windowIsVisible;
    }

    isVisibleAndFocused() {
        return this.visibilitySupported ? this.isVisible() : this.isFocused();
    }
}

export default GameFocus;