import { randomUUID } from "crypto";
import { Entity } from "entities/Entity";

export class EntityManager {
    #uniqueIds: Set<string>;
    #idToEntity: Map<string, Entity>;

    constructor() {
        this.#uniqueIds = new Set();
        this.#idToEntity = new Map();
    }

    public generateId():string {
        const uuid = randomUUID();
        if (this.#uniqueIds.has(uuid)) {
            throw("UUID already exists");
        }
        this.#uniqueIds.add(uuid);
        return uuid;
    }

    public getIds():Set<string> {
        return this.#uniqueIds
    }

    public addEntity(entity: Entity) {
        const id = entity.getEntityId();
        this.#idToEntity.set(id, entity);
    }

    public deleteEntity(entity: Entity) {
        const idToRemove = entity.getEntityId();
        this.#idToEntity.delete(idToRemove);
    }

    
    public getEntity(id: string): Entity {
        return this.#idToEntity.get(id)!;
    }

}

export const entityManager = new EntityManager();