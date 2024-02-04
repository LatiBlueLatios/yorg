import { Config } from "../../global/Config.js";

class WaveManager {
    constructor(root) {
        this.root = root;
        this.root.signals.nightEntered.add(this.onNightStarted, this);
    }

    onNightStarted() {
        if (Config.zombiesEnabled && this.root.gamemode.autoSpawnsZombies()) {
            const day = this.root.daytime.getDay();
            this.spawnWave(day);
        }
    }

    getWaveEnemies(day) {
        const zombieLevelIncreaseDays = GAME_BALANCING.zombieLevelIncreaseDays;
        let totalZombies = GAME_BALANCING.zombieCount(day);
        const wavesBeforeBoss = Math.floor(day / zombieLevelIncreaseDays);
        const bossWaveProgress = wavesBeforeBoss === 0 ? 0 : (day % zombieLevelIncreaseDays) / zombieLevelIncreaseDays;
        const creeperAmountPercent = GAME_BALANCING.creeperAmountPercent;
        const enemies = [];
        const isBossWave = day % GAME_BALANCING.bossInterval === 0 && day !== 0;
        const bossWaveLevel = Math.max(0, Math.floor(day / GAME_BALANCING.bossLevelIncrease) - 1);

        if (isBossWave) {
            enemies.push({
                enemyClass: ZombieBoss,
                level: bossWaveLevel
            });
            totalZombies = Math.floor(totalZombies * GAME_BALANCING.zombieAmountInBossWave);
        }

        const undeadCount = totalZombies * (1 - creeperAmountPercent);
        const creeperCount = totalZombies * creeperAmountPercent;

        const normalUndead = Math.round(undeadCount * (1 - bossWaveProgress));
        const tougherUndead = Math.round(undeadCount * bossWaveProgress);
        const normalCreepers = Math.round(creeperCount * (1 - bossWaveProgress));
        const tougherCreepers = Math.round(creeperCount * bossWaveProgress);

        for (let i = 0; i < normalUndead; i++) {
            enemies.push({
                enemyClass: Zombie,
                level: wavesBeforeBoss
            });
        }

        for (let i = 0; i < tougherUndead; i++) {
            enemies.push({
                enemyClass: Zombie,
                level: wavesBeforeBoss + 1
            });
        }

        for (let i = 0; i < normalCreepers; i++) {
            enemies.push({
                enemyClass: Creeper,
                level: wavesBeforeBoss
            });
        }

        for (let i = 0; i < tougherCreepers; i++) {
            enemies.push({
                enemyClass: Creeper,
                level: wavesBeforeBoss + 1
            });
        }

        if (Config.displayWaves) {
            let waveInfo = `|-\n`;
            waveInfo += `| Day: ${day}\n`;
            waveInfo += `| Zombies: ${Math.round(undeadCount)}\n`;
            waveInfo += `| Creepers: ${Math.round(creeperCount)}\n`;
            waveInfo += `| isBossWave: ${isBossWave ? "1" : "0"}\n`;
            console.log(waveInfo);
        }

        return enemies;
    }

    async spawnWave(day) {
        const enemies = this.getWaveEnemies(day);
        const groupSize = Math.floor((day / 6) + 20); // Number of enemies per group
        const delayBetweenGroups = 200; // Delay in ms between spawning groups
        const totalGroups = Math.ceil(enemies.length / groupSize);

        for (let i = 0; i < totalGroups; i++) {
            const groupStartIndex = i * groupSize;
            const groupEnemies = enemies.slice(groupStartIndex, groupStartIndex + groupSize);

            for (const enemy of groupEnemies) {
                const {
                    enemyClass,
                    level
                } = enemy;
                await this.root.logic.spawnNewEnemy(enemyClass, level);
            }

            if (i < totalGroups - 1) {
                await this.delay(delayBetweenGroups);
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default WaveManager;