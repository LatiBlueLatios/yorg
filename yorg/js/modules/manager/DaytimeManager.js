import { Config } from "../../global/Config.js";

class DaytimeManager {
    constructor(t) {
        this.root = t;
        this.placedBaseAtTime = null;
        this.cached = {
            isNight: Config.startDay > 0,
            percentOfTotalDay: 0,
            day: 1
        };
        this.root.signals.playerBasePlaced.add(this.onPlayerBasePlaced, this);
    }

    isNight() {
        return this.cached.isNight;
    }

    isDay() {
        return !this.isNight();
    }

    percentOfTotalDay() {
        return this.cached.percentOfTotalDay;
    }

    secondsOfCurrentDay() {
        return this.cached.percentOfTotalDay * this.getDayDuration(this.getDay());
    }

    getDay() {
        return this.cached.day;
    }

    onPlayerBasePlaced() {
        console.log("[DAYTIME] Placed player base, starting game time"), (this.placedBaseAtTime = this.root.time.now);
    }

    getDayDuration(e) {
        return Config.dayDurationTotalSeconds * this.getDurationIncrease(e);
    }

    secondsUntilNight() {
        if (this.isNight()) return 0;
        var e = this.getDayDuration(this.getDay()),
            t = e * this.percentOfTotalDay();
        return e * (1 - Config.nightDurationSeconds / Config.dayDurationTotalSeconds) - t;
    }

    getDurationIncrease(e) {
        return 1 / Math.pow(Config.daySpeedDecrease, Math.min(100, e));
    }

    loadDay(day, savedTime) {
        const initialDayDuration = 1000 * -Config.initialDayDurationAdditional;
        let currentTime = this.root.time.now - initialDayDuration;

        for (let i = 1; i < day; ++i) {
            currentTime -= 1000 * this.getDayDuration(i);
        }

        currentTime += 1000 * savedTime;
        currentTime -= 1000;

        for (let i = 1; i < Config.startDay; ++i) {
            currentTime += 1000 * this.getDayDuration(i);
        }

        this.placedBaseAtTime = currentTime;
        this.cached.isNight = false;
        this.update();
    }

    update() {
        if (this.root.gamemode && this.root.gamemode.isAlwaysNight()) {
            this.cached.isNight = true;
            this.cached.percentOfTotalDay = 0.99999;
            this.cached.day = 1;
            return;
        }

        if (this.root.logic.playerHasPlacedBase()) {
            let initialDayDuration = 1000 * Config.initialDayDurationAdditional;
            if (Config.startDay > 0) {
                initialDayDuration = 0;
            }

            let elapsedTime = Math.max(0, this.root.time.now - this.placedBaseAtTime - initialDayDuration) / 1000;

            for (let i = 1; i < Config.startDay; ++i) {
                elapsedTime += this.getDayDuration(i);
            }

            let dayCount = 0;
            let dayDuration = 1;

            while (elapsedTime >= 0 && elapsedTime >= (dayDuration = this.getDayDuration(++dayCount))) {
                elapsedTime -= dayDuration;
            }

            const percentOfTotalDay = elapsedTime / dayDuration;
            const isNight = percentOfTotalDay >= 1 - Config.nightDurationSeconds / Config.dayDurationTotalSeconds;

            if (isNight !== this.cached.isNight) {
                this.cached.isNight = isNight;
                this.isNight() ? this.root.signals.nightEntered.dispatch(this.getDay()) : this.root.signals.nightEnded.dispatch(this.getDay());
            }

            this.cached.percentOfTotalDay = percentOfTotalDay;
            this.cached.day = dayCount;
        }
    }
}

export default DaytimeManager;