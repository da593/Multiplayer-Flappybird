
import { Dimensions_I } from "@flappyblock/shared";
import { getData } from "api/axios";



export async function dimensionsLoader(): Promise<Dimensions_I> {
    const endpoint = "api";
    const promise = await getData(endpoint);
    const data = promise.data;
    return data;
}



