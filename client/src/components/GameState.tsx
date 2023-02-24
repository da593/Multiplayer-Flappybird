import React, {useState,useEffect} from "react";
import { BoardGame } from "./BoardGame";
import * as consts from "components/GameConstants";

export interface Coordinates {
    x: number;
    y: number;
}

export interface BoxCoordinates {
    topLeft: Coordinates;
    topRight: Coordinates;
    botLeft: Coordinates;
    botRight: Coordinates;
}

export function GameState() {
    const [xPipeLoc,setXPipeLoc] = useState(consts.GAME_WIDTH + consts.PIPE_WIDTH);
    const [yGapLoc,setYGapLoc] = useState(randomizeYGapLocation());
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>({topLeft: {x: 0, y:0}, topRight: {x: 0, y:0}, botLeft: {x: 0, y:0}, botRight: {x: 0, y:0}});

    const [yBirdLoc,setYBirdLoc] = useState(consts.GAP_HEIGHT / 3);
    const [birdCoords,setBirdCoords] = useState<BoxCoordinates>({topLeft: {x: 0, y:0}, topRight: {x: 0, y:0}, botLeft: {x: 0, y:0}, botRight: {x: 0, y:0}});

    const [hasCollided,setHasCollided] = useState(false);
    const [hasKeyClicked,setHasKeyClicked] = useState(false);

    function randomizeYGapLocation():number {
        return Math.floor(Math.random() * (consts.GAME_WIDTH - consts.GAP_HEIGHT));
    }

    const detectCollision = () => {
        if (birdCoords.botLeft.y >= consts.GAME_HEIGHT) {
            setHasCollided(true);
        }
    }   

    const animatePipe = (frameCount:number) => {
        if (frameCount == 0) {
            setYGapLoc(randomizeYGapLocation());
            setXPipeLoc(consts.GAME_WIDTH + consts.PIPE_WIDTH);
        }
        else {
            setXPipeLoc(xPipeLoc - frameCount);
        }  
    }

    const animateBird = (frameCount:number,isEvent=false) => {
        if (hasKeyClicked == true) {
            setYBirdLoc(yBirdLoc - 40);
            setHasKeyClicked(false);
        }
        else if (frameCount == 0) {
            setYBirdLoc(consts.GAP_HEIGHT / 3)
        }
        else {
            setYBirdLoc(yBirdLoc + frameCount);
        }
    }

    const handleClick = (e:KeyboardEvent) => {
        if (e.key === "w") {
            setHasKeyClicked(true);
        }
    }    
    useEffect(() => {
        let raf:number;
        let frameCount = 0;
        const render = () => {
            if (!hasCollided) {
                frameCount == consts.GAME_WIDTH + consts.PIPE_WIDTH ? frameCount = 0 : frameCount++;
                animatePipe(frameCount)
                raf = window.requestAnimationFrame(render);
            }
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[hasCollided])

    useEffect(() => {
        window.addEventListener("keydown",handleClick)
        let raf:number;
        let frameCount = 0;
        const render = () => {
            if (!hasCollided) {
                frameCount++
                animateBird(frameCount);
                raf = window.requestAnimationFrame(render);
            }
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[hasCollided,hasKeyClicked])
    
    useEffect(() => {
        const gapTopLeft:Coordinates = {x:xPipeLoc - consts.PIPE_WIDTH, y:yGapLoc - consts.GAP_HEIGHT};
        const gapTopRight:Coordinates = {x:xPipeLoc, y:yGapLoc - consts.GAP_HEIGHT};
        const gapBotLeft:Coordinates = {x:xPipeLoc - consts.PIPE_WIDTH, y:yGapLoc};
        const gapBotRight:Coordinates = {x:xPipeLoc, y:yGapLoc};
        setGapCoords({topLeft:gapTopLeft,topRight: gapTopRight, botLeft: gapBotLeft, botRight: gapBotRight})

        const birdTopLeft:Coordinates = {x: consts.BIRD_X_LOCATION - consts.BIRD_WIDTH, y: yBirdLoc - consts.BIRD_WIDTH};
        const birdTopRight:Coordinates = {x: consts.BIRD_X_LOCATION, y: yBirdLoc - consts.BIRD_WIDTH};
        const birdBotLeft:Coordinates = {x: consts.BIRD_X_LOCATION - consts.BIRD_WIDTH, y: yBirdLoc};
        const birdBotRight:Coordinates = {x: consts.BIRD_X_LOCATION, y: yBirdLoc};

        setBirdCoords({topLeft:birdTopLeft,topRight:birdTopRight, botLeft:birdBotLeft, botRight:birdBotRight})
    },[xPipeLoc,yBirdLoc])

    useEffect(() => {
        detectCollision()
    },[gapCoords,birdCoords])


    return (
        <BoardGame width={consts.GAME_WIDTH} height={consts.GAME_HEIGHT} xPipeLoc={xPipeLoc} yGapLoc={yGapLoc} yBirdLoc={yBirdLoc}/>
    )
}