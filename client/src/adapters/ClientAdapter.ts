import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.

class ClientAdapter {
    #client

    constructor() {
        this.#client = new Colyseus.Client('ws://localhost:2567');
    }

    getClient(){
        return this.#client;
    }

    async createRoom(room_name:string) {
        try {
            const room = await this.#client.create("battle");
            console.log("created successfully", room);
          
          } catch (e) {
            console.error("create error", e);
          }
    }

    async joinRoom(room_name:string) {
        try {
            const room = await this.#client.join("battle", {/* options */});
            console.log("joined successfully", room);
          
          } catch (e) {
            console.error("join error", e);
          }
    }

}

export default new ClientAdapter();

