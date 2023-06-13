export class IdManager {
    #uniqueIds:Set<String>;

    constructor() {
        this.#uniqueIds= new Set();
    }

    public generateId():String {
        const uuid = self.crypto.randomUUID();
        if (this.#uniqueIds.has(uuid)) {
            throw("UUID already exists");
        }
        this.#uniqueIds.add(uuid);
        return uuid;
    }

    public getIds():Set<String> {
        return this.#uniqueIds
    }

}

export const idManager = new IdManager();