import CSVar from "./CSVar.js";
import { Config } from "../global/Config.js";

const GEM_ATTR_NAME = "\0",
    POINTS_ATTR_NAME = "",
    { gains } = Config.colors,
    GAIN_MAPPINGS = {
        damage: { color: gains.damage, default: 100 },
        health: { color: gains.health, default: 100 },
        critical: { color: gains.critical, default: 0 },
        cannonDamage: { color: gains.cannonDamage, default: 100 },
        cannonProjectileSpeed: { color: gains.cannonProjectileSpeed, default: 100 },
        arrowDamage: { color: gains.arrowDamage, default: 100 },
        arrowFireRate: { color: gains.arrowFireRate, default: 100 },
        arrowRadius: { color: gains.arrowRadius, default: 100 },
        lightningDamage: { color: gains.lightningDamage, default: 100 },
        lightningRadius: { color: gains.lightningRadius, default: 100 },
        wallHealth: { color: gains.wallHealth, default: 100 },
        minersSpeed: { color: gains.miningSpeed, default: 100 },
        buildingStorage: { color: gains.buildingStorage, default: 100 },
        factorySpeed: { color: gains.processingSpeed, default: 100 },
        transporterSpeed: { color: gains.transporterSpeed, default: 100 },
    };

class Stats {
    constructor() {
        this[GEM_ATTR_NAME] = new CSVar(Config.startGems);
        this[POINTS_ATTR_NAME] = new CSVar(Config.startPoints);
        this.unlockedSkills = [];
        this.cachedSkillData = {};
        if (Config.allSkillsUnlocked) {
            this.unlockedSkills = Object.keys(SKILL_TREE);
        }
        this.gemsOverTime = {};
        this.recomputeCachedSkillData();
    }

    storeGemsOverTime(time) {
        this.gemsOverTime[time] = this.gems;
    }

    isSkillUnlocked(skillName) {
        return this.unlockedSkills.includes(skillName);
    }

    getSkillGain(skillName) {
        if (this.cachedSkillData[skillName] === undefined) {
            throw new Error(`Invalid gain: '${skillName}'`);
        }
        return this.cachedSkillData[skillName];
    }

    recomputeCachedSkillData() {
        const newData = {};
        for (const gainName in GAIN_MAPPINGS) {
            newData[gainName] = GAIN_MAPPINGS[gainName].default;
        }
        this.unlockedSkills.forEach((skillName) => {
            const skill = SKILL_TREE[skillName];
            for (const gainName in skill.gains) {
                newData[gainName] += skill.gains[gainName];
            }
        });
        this.cachedSkillData = newData;
    }

    unlockSkill(skillName) {
        this.unlockedSkills.push(skillName);
        this.recomputeCachedSkillData();
    }

    getSkillGainMultiplier(skillName) {
        return this.getSkillGain(skillName) / 100;
    }

    serialize() {
        return {
            gems: this.gems,
            points: this.points,
            skills: this.unlockedSkills,
            gemsOverTime: this.gemsOverTime,
        };
    }

    load(data) {
        this.gems = data.gems || 0;
        this.points = data.points || 0;
        this.unlockedSkills = data.skills || [];
        this.gemsOverTime = data.gemsOverTime || [];
        this.recomputeCachedSkillData();
    }

    canAfford(cost) {
        return !(cost.gems && Math.floor(cost.gems) > this.gems);
    }

    spend(cost) {
        if (cost.gems) {
            this.gems -= Math.floor(cost.gems);
        }
    }

    grant(reward) {
        if (reward.gems) {
            this.gems += Math.floor(reward.gems);
        }
    }

    get gems() {
        return this[GEM_ATTR_NAME].getValue();
    }

    set gems(value) {
        this[GEM_ATTR_NAME].setValue(value)
    }

    get points() {
        return this[POINTS_ATTR_NAME].getValue();
    }

    set points(value) {
        this[POINTS_ATTR_NAME].setValue(value);
    }
}

export default Stats;