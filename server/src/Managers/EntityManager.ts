import { randomUUID } from "crypto";
import { Entity } from "#@/entities/Entity.js";

export class EntityManager {
    #uniqueIds: Set<string>;

    constructor() {
        this.#uniqueIds = new Set();
    }

    public generateId(): string {
        const uuid = randomUUID();
        if (this.#uniqueIds.has(uuid)) {
            throw("UUID already exists");
        }
        this.#uniqueIds.add(uuid);
        return uuid;
    }

    public deleteId(id: string): void {
        this.#uniqueIds.delete(id);
    }

    public getIds(): Set<string> {
        return this.#uniqueIds
    }


}

export const entityManager = new EntityManager();