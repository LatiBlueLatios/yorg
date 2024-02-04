class GameSystemManager {
    constructor(t) {
        this.root = t;
        this.systems = [];
    }

    update() {
        for (var e = 0, t = this.systems.length; e < t; ++e) {
            var i = this.systems[e];
            try {
                i.update();
            } catch (e) {
                console.error(e);
            }
        }
    }

    initializeDefaultSystems() {
        var e = this.root;
        this.addSystem(new CullingSystem(e));
        this.addSystem(new VisualizeMissingResourcesSystem(e));
        this.addSystem(new ProcessorSystem(e));
        this.addSystem(new UpdatePossibleConsumersSystem(e));
        this.addSystem(new EmitterSystem(e));
        this.addSystem(new DecorativeParticlesSystem(e));
        this.addSystem(new GoldEmitterSystem(e));
        this.addSystem(new EnemyAISystem(e));
        this.addSystem(new PhysicsSystem(e));
        this.addSystem(new UpdateMapSystem(e));
        this.addSystem(new FlashOnDamageSystem(e));
        this.addSystem(new BurnsOnDaySystem(e));
        this.addSystem(new ExplodesOnHitSystem(e));
        this.addSystem(new ProjectileShooterSystem(e));
        this.addSystem(new DamageOnHitSystem(e));
        this.addSystem(new DetectKillSystem(e));
        this.addSystem(new RegenHealthOnDaySystem(e));
        this.addSystem(new GainStatsSystem(e));
        this.addSystem(new BuildingAnimationsSystem(e));
        this.addSystem(new HealthBarSystem(e));
        this.addSystem(new VisualizeConnectionsSystem(e));
        this.addSystem(new StorageVisualizerSystem(e));
        this.addSystem(new FlipToMovementDirectionSystem(e));
        this.addSystem(new ShootAnimationsSystem(e));
    }

    addSystem(e) {
        if (!(e instanceof GameSystem)) throw new Error("Not a system: " + e);
        this.systems.push(e);
    }
}

export default GameSystemManager;