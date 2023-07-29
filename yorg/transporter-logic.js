"use strict";

const b = "_";
const harvesterRadius = 200;
const transporterSpeed = 3.535;
const defaultTransporterSpeed = 1;
const resourceCodes = {
    wood: "0",
    steel: "1",
    basicArrow: "2"
};
const characterCodeOffset = 256;

let verbose = false;
let graph = null;
let entities = null;
let pendingJobs = [];

function parse(data, parseItem) {
    const result = {};
    for (let i = 0; i < data.length;) {
        if (data[i] !== b) {
            const code = data[i++];
            const item = parseItem(data, i);
            result[code] = item.item;
            i = item.index;
        } else {
            i++;
        }
    }
    return result;
}

function parseEntity(data, index) {
    const startPosition = {
        x: data[index] % harvesterRadius,
        y: Math.floor(data[index] / harvesterRadius)
    };
    const entity = {
        startPosition
    };
    index += 2;

    while (data[index] !== b) {
        const componentCode = data[index++];
        const value = (data[index++] - characterCodeOffset) / 100;

        if (componentCode === resourceCodes.wood) {
            entity.transporter = {
                speed: value
            };
        } else if (componentCode === resourceCodes.basicArrow) {
            const numResources = data[index++];
            const resources = data.slice(index, index + numResources);
            entity.consumer = {
                resources
            };
            index += numResources;
        } else if (componentCode === resourceCodes.steel) {
            entity.emitter = {
                resource: value,
                spawnMaxRadius: (data[index++] - characterCodeOffset) / 100
            };
        } else {
            throw new Error("Invalid component id: " + componentCode);
        }
    }

    return {
        item: entity,
        index
    };
}

function distance(entityA, entityB) {
    return Math.hypot(entityA.startPosition.x - entityB.startPosition.x, entityA.startPosition.y - entityB.startPosition.y);
}

function isConsumer(entity, resource) {
    return entity.consumer && entity.consumer.resources.includes(resource);
}

function isConnected(entityA, entityB, resource = null) {
    if (entityA === entityB) return false;

    const emitterA = entityA.emitter;
    const dist = distance(entityA, entityB);

    if (emitterA && entityB.transporter && (!resource || emitterA.resource === resource) && dist <= emitterA.spawnMaxRadius) {
        return true;
    }

    if (emitterA && entityB.consumer && isConsumer(entityB, emitterA.resource) && dist <= emitterA.spawnMaxRadius) {
        return true;
    }

    const transporterA = entityA.transporter;

    return !!(transporterA && entityB.consumer && (!resource || isConsumer(entityB, resource)) && dist <= transporterSpeed) || !!(transporterA && entityB.transporter && dist <= transporterSpeed);
}

function transporterSpeed(entity) {
    return entity.transporter ? entity.transporter.speed : defaultTransporterSpeed;
}

function shortestPath(startEntity, endEntity, distances, resource) {
    let currentEntity = startEntity;
    const path = [];

    for (let i = 0; i < 999; i++) {
        const currentNode = entities[currentEntity];
        let nextEntity = null;
        let shortestDistance = 1e20;

        for (const key in graph[currentEntity]) {
            const neighborEntity = entities[key];
            const neighborDistance = distances[key] + graph[currentEntity][key];

            if (neighborDistance < shortestDistance && isConnected(neighborEntity, currentNode, resource)) {
                shortestDistance = neighborDistance;
                nextEntity = key;
            }
        }

        if (nextEntity === null) {
            console.error("Invalid node net, for ", currentEntity, "there are no valid children");
            console.error("- Started from =", entities[startEntity]);
            console.error("- Target end =", entities[endEntity]);
            console.error("- Path so far =", path.map((key) => entities[key]));
            console.error("- Current Entity =", entities[currentEntity]);
            return null;
        }

        if (nextEntity === endEntity || nextEntity === startEntity) {
            return path.reverse();
        }

        path.push(nextEntity);
        currentEntity = nextEntity;
    }

    return null;
}

function computePaths(ui, hash) {
    const startEntity = entities[hash];
    const {
        distances,
        endNodes
    } = computeShortestDistances(startEntity);
    const resource = startEntity.emitter.resource;
    const paths = [];

    for (const key in endNodes) {
        const endEntity = entities[key];
        const path = shortestPath(hash, key, distances, resource);

        if (path) {
            paths.push({
                entity: key,
                stops: path
            });
        }
    }

    return {
        uid: ui,
        hash,
        result: paths
    };
}

function computeShortestDistances(startEntity) {
    const distances = Object.create(null);
    distances[startEntity] = 0;
    const consumerDistances = Object.create(null);
    const queue = new PriorityQueue();
    queue.enqueue(startEntity, 0);

    while (!queue.isEmpty()) {
        const [currentEntity, currentDistance] = queue.dequeue();

        for (const key in graph[currentEntity]) {
            const distance = currentDistance + graph[currentEntity][key];

            if (distances[key] === undefined || distance < distances[key]) {
                const neighborEntity = entities[key];
                const transporter = neighborEntity.transporter;

                if (transporter) {
                    queue.enqueue(key, distance);
                }

                distances[key] = distance;

                if (currentEntity !== key && neighborEntity.consumer && isConsumer(neighborEntity, currentEntity.emitter.resource)) {
                    consumerDistances[key] = distance;
                }
            }
        }
    }

    return {
        distances,
        endNodes: consumerDistances
    };
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(key, priority) {
        let inserted = false;

        for (let i = 0; i < this.queue.length; i++) {
            if (priority < this.queue[i][1]) {
                this.queue.splice(i, 0, [key, priority]);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            this.queue.push([key, priority]);
        }
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

self.onmessage = function(e) {
    const {
        cmd,
        payload,
        jobId
    } = e.data;

    if (cmd === "setVerboseLevel") {
        verbose = payload;
        if (verbose) console.log("[WEBWORKER] Verbose =", verbose);
    } else if (cmd === "onNewNodeNet") {
        if (verbose) console.log("[WEBWORKER] Received node net");
        graph = parse(payload.nodeNet, parseEntity);
        entities = parse(payload.entities, parseEntity);
    } else if (cmd === "computeEntity") {
        if (verbose) console.log("[WEBWORKER] Request entity computation");
        const result = computePaths(payload.ui, payload.hash);
        self.postMessage({
            jobId,
            sourceCommand: cmd,
            result
        });
    } else if (cmd === "cancelAll") {
        pendingJobs = [];
        if (verbose) console.log("[WEBWORKER] Received cancel all");
        self.postMessage({
            jobId,
            sourceCommand: cmd,
            result: null
        });
    }
};

setInterval(function() {
    while (pendingJobs.length > 0) {
        const job = pendingJobs.shift();
        if (verbose) console.log("Processing", job);

        const {
            cmd,
            jobId,
            payload
        } = job;
        let result = null;

        if (cmd === "onNewNodeNet") {
            if (verbose) console.log("Storing new node net");
            graph = parse(payload.nodeNet, parseEntity);
            entities = parse(payload.entities, parseEntity);
        } else if (cmd === "computeEntity") {
            if (verbose) console.log("Computing entity");
            result = computePaths(payload.ui, payload.hash);
        }

        self.postMessage({
            jobId,
            sourceCommand: cmd,
            result
        });
    }
}, 50);