export abstract class Entity {
    #id:string;

    constructor(id:string) {
        this.#id = id;

    }

    public getEntityId() {
        return this.#id;
    }   


}