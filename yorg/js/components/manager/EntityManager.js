class EntityManager {
    constructor(root) {
        this.root = root;
        this.entities = [];
        this.dynamicEntities = [];
        this.destroyList = [];
        this.componentToEntity = new Map();
    }

    getStatsText() {
        return this.entities.length + " entities [" + this.dynamicEntities.length + " dynamic] [" + this.destroyList.length + " to kill]";
    }

    update() {
        this.processDestroyList();
    }

    registerEntity(e) {
        if (this.entities.indexOf(e) >= 0) throw new Error("RegisterEntity() called twice for entity " + e);
        for (let t in (this.entities.push(e), e.isDynamic() && this.dynamicEntities.push(e), e.components)) this.componentToEntity[t] ? this.componentToEntity[t].push(e) : (this.componentToEntity[t] = [e]);
        e.registered = true;
    }

    registerPostLoadComponent(e, t) {
        this.componentToEntity[t] ? this.componentToEntity[t].push(e) : (this.componentToEntity[t] = [e]);
    }

    foreachEntityHavingComponents(components, callback, includeRenderable = true) {
        if (!components || components.length < 1) {
            throw new Error("Components are empty");
        }
    
        const componentNames = components.map((component) => component.name);
        let selectedEntities = this.entities;
    
        for (const componentName of componentNames) {
            const entitiesWithComponent = this.componentToEntity[componentName];
    
            if (!entitiesWithComponent) {
                return;
            }
    
            if (entitiesWithComponent.length < selectedEntities.length) {
                selectedEntities = entitiesWithComponent;
            }
        }
    
        for (const entity of selectedEntities) {
            if ((includeRenderable || entity.renderable) && entity.alive) {
                for (const componentName of componentNames) {
                    entity.hasComponentId(componentName);
                }
    
                callback(entity, entity.components);
            }
        }
    }    

    getAllEntitiesWithComponent(e) {
        return this.componentToEntity[e.name] || [];
    }

    unregisterEntityComponents(e) {
        for (var t in e.components) fastArrayDeleteValue(this.componentToEntity[t], e);
    }

    processDestroyList() {
        var e = this;
        this.destroyList.forEach(function (t) {
            fastArrayDeleteValue(e.entities, t),
                t.isDynamic() && fastArrayDeleteValue(e.dynamicEntities, t),
                e.unregisterEntityComponents(t),
                e.root.particles.tryKillEntity(t),
                e.root.map.removeEntityFromMap(t),
                (t.registered = false),
                t.destroy(),
                t instanceof PlayerBaseBuilding && (console.warn("Player base building got destroyed"), e.root.signals.gameOver.dispatch()),
                t instanceof BuildingInstance && (e.root.logic.resetBuildingCountCache(), e.root.signals.buildingDestroyed.dispatch(t));
        })
        this.destroyList = [];
    }

    destroyEntity(e) {
        e.alive || console.error("Trying to destroy killed entity!"), this.destroyList.indexOf(e) < 0 ? (this.destroyList.push(e), (e.alive = false)) : console.error("Trying to destroy entity twice:", e);
    }

    destroyAll() {
        var e = this;
        this.root.map.reset(),
            this.entities.forEach(function (t) {
                e.root.particles.tryKillEntity(t), t.destroy();
            }),
            (this.entities = []),
            (this.dynamicEntities = []),
            (this.componentToEntity = {}),
            (this.destroyList = []);
    }
}

export default EntityManager;