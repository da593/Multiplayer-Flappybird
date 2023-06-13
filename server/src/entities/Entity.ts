export abstract class Entity {
    #id:String;

    constructor(id:String) {
        this.#id = id;

    }

    public getEntityId() {
        return this.#id;
    }   


}