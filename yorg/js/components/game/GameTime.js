class GameTime {
    constructor() {
        this.now = 0;
        this.nowConsistent = 0;
        this.physicsElapsed = 0;
        this.physicsElapsedConsistent = 0;
        this.frameIndex = 0;
        this.msCache = [];
        for (let t = 0; t < 300; ++t) this.msCache.push(16);
        this.msIndex = 0;
        this.cached = { maxFrameTime: 16, avgFrameTime: 16 };
    }

    reset() {
        this.now = 1e3 * (Config.dayDurationTotalSeconds - Config.nightDurationSeconds + Config.initialDayDurationAdditional + 1);
        this.nowConsistent = this.now;
    }

    averageFrameTime() {
        return this.cached.avgFrameTime;
    }

    maxFrameTime() {
        return this.cached.maxFrameTime;
    }

    averageFPS() {
        return 1e3 / this.averageFrameTime();
    }

    update(e) {
        e > 0.2 && (e = 0.2),
            (this.frameIndex += 1),
            (this.msCache[this.msIndex] = 1e3 * e),
            (this.msIndex = (this.msIndex + 1) % keepEntries),
            (this.nowConsistent += 1e3 * e),
            (this.physicsElapsedConsistent = e),
            (e *= Config.gameTimeSpeedUpFactor),
            (this.now += 1e3 * e),
            (this.physicsElapsed = e),
            (this.cached = {
                maxFrameTime: Math.max.apply(Math, _toConsumableArray(this.msCache)),
                avgFrameTime:
                    this.msCache.reduce(function (e, t) {
                        return e + t;
                    }) / keepEntries,
            });
    }
}

export default GameTime;