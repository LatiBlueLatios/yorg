
class Timer {
    constructor(intervalMs) {
        if (intervalMs == null || isNaN(intervalMs) || intervalMs <= 0) {
            throw new Error("Invalid interval: " + intervalMs);
        }
        this.intervalMs = intervalMs;
        this.lastTick = null;
    }

    static makeFromTicksPerSecond(t) {
        return new Timer(1e3 / t);
    }

    static makeFromIntervalMs(t) {
        return new Timer(t);
    }

    resetTo(e) {
        this.lastTick = e;
    }

    getIntervalMs() {
        return this.intervalMs;
    }

    getTicksPerSecond() {
        return 1e3 / this.intervalMs;
    }

    takeTick(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (null === this.lastTick) return (this.lastTick = e), true;
        if (e >= this.lastTick + this.intervalMs) {
            if (t) this.lastTick = e;
            else {
                this.lastTick += this.intervalMs;
                var i = e - MAX_STALL_TIME;
                this.lastTick < i && (this.lastTick = i);
            }
            return true;
        }
        return false;
    }

    hasTicksLeft(e) {
        return null === this.lastTick || e > this.lastTick + this.intervalMs;
    }

    getNumTicksLeft(e) {
        return null === this.lastTick ? 0 : Math.floor((e - this.lastTick) / this.intervalMs);
    }

    setInterval(e) {
        (this.intervalMs = e), (this.lastTick = null);
    }
}

export default Timer;