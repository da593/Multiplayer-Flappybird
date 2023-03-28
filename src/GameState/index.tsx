import React, {useState,useEffect,useRef} from "react";
import { BoardGame } from "../GameBoard";
import { GAME_WIDTH, PIPE_WIDTH, GAP_HEIGHT, GAME_HEIGHT, BIRD_X_LOCATION, BIRD_WIDTH } from "./constants";
import {calculateBirdCoords, calculateGapCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision, randomizeYGapLocation} from "./helper"
import { Coordinates,BoxCoordinates } from "./types";

export function GameState() {
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(calculateGapCoords(GAME_WIDTH,randomizeYGapLocation()));
    const [birdCoords,setBirdCoords] = useState<BoxCoordinates>(calculateBirdCoords(GAP_HEIGHT / 3));
    const [hasCollided,setHasCollided] = useState(false);
    const [hasKeyClicked,setHasKeyClicked] = useState(false);

    const [score,setScore] = useState(0);
    const handleClick = (e:KeyboardEvent) => {
        if (e.key === "w") {
            setHasKeyClicked(true);
        }
    }  

    useEffect(() => {
        window.addEventListener("keydown",handleClick)
        let raf:number;
        let frameCount = 0;
        const render = () => {
            if (!hasCollided) {
                frameCount++
                setGapCoords(calculateNewGapCoords(gapCoords,frameCount))
                setBirdCoords(calculateNewBirdCoords(birdCoords,frameCount,hasKeyClicked))
                setHasKeyClicked(false);
                raf = window.requestAnimationFrame(render);
            }
        }
        render();
        return () => {
            window.cancelAnimationFrame(raf);
        }
    },[hasCollided,hasKeyClicked])


    useEffect(() => {
        if (detectCollision(birdCoords,gapCoords)) {
            setHasCollided(true);
        }
        else if (birdCoords.topLeft.x === gapCoords.topRight.x + 1) {
            setScore(score + 1)
        }
    },[gapCoords,birdCoords])


    return (
        <BoardGame width={GAME_WIDTH} height={GAME_HEIGHT} gapCoords={gapCoords} birdCoords={birdCoords} score={score} hasCollided={hasCollided}/>
    )
}

