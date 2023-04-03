import React, {useState,useEffect} from "react";
import { BoardGame } from "../GameBoard";
import {calculateNewBirdCoords, calculateNewGapCoords, detectCollision} from "./helper"
import { BoxCoordinates } from "./types";
import { INITAL_STATE } from "./constants";


export function GameState() {
    

    const [hasCollided,setHasCollided] = useState(INITAL_STATE.hasCollided);
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(INITAL_STATE.gapCoords);
    const [birdCoords,setBirdCoords] = useState<BoxCoordinates>(INITAL_STATE.birdCoords);
    const [hasKeyClicked,setHasKeyClicked] = useState(INITAL_STATE.hasKeyClicked);
    const [score,setScore] = useState(INITAL_STATE.score);
    

    const handleKeyBoardEvent = (e:KeyboardEvent) => {
        if (e.key === "w") {
            setHasKeyClicked(true);
        }
    }  

    const handleReset = () => {
        setGapCoords(INITAL_STATE.gapCoords)
        setBirdCoords(INITAL_STATE.birdCoords);
        setHasCollided(INITAL_STATE.hasCollided);
        setHasKeyClicked(INITAL_STATE.hasKeyClicked);
        setScore(INITAL_STATE.score);
    }

    useEffect(() => {
        window.addEventListener("keydown",handleKeyBoardEvent)
        let raf:number;
        const frameCount = 1;
        const render = () => {
            if (!hasCollided) {
                setBirdCoords(prevBirdCoords => calculateNewBirdCoords(prevBirdCoords,frameCount,hasKeyClicked))
                setGapCoords(prevGapCoords => calculateNewGapCoords(prevGapCoords,frameCount));
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
        else if (birdCoords.topLeft.x === gapCoords.topRight.x + 1 && !hasCollided) {
            setScore(score + 1)
        }
    },[gapCoords,birdCoords])


    return (
        <BoardGame gapCoords={gapCoords} birdCoords={birdCoords} score={score} hasCollided={hasCollided} handleReset={handleReset}/>
    )
}

