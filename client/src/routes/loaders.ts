import { getData } from "ConnectionManager/Socket";
import { Dimensions_I } from "GameState/types";

export async function dimensionsLoader():Promise<Dimensions_I> {
    const endpoint = "api";
    const data = await getData(endpoint);
    return  data.data ;
}



