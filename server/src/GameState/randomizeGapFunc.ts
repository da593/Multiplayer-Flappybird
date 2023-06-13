import { GAME_DIMENSIONS } from "./constants";


export const randomizeYGapLocation = ():number => {
    return Math.floor(Math.random() * (GAME_DIMENSIONS.GAME_HEIGHT - GAME_DIMENSIONS.GAP_HEIGHT));
}