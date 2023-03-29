import React, {useState,useEffect,useRef} from "react";
import { BoardGame } from "../GameBoard";
import { GAME_WIDTH, PIPE_WIDTH, GAP_HEIGHT, GAME_HEIGHT, BIRD_X_LOCATION, BIRD_WIDTH } from "./constants";
import {calculateBirdCoords, calculateGapCoords, calculateNewBirdCoords, calculateNewGapCoords, detectCollision, randomizeYGapLocation} from "./helper"
import { BoxCoordinates } from "./types";

export function GameState() {
    const INITIAL_VALUES = {
        gapCoords: calculateGapCoords(GAME_WIDTH,randomizeYGapLocation()),
        birdCoords: calculateBirdCoords(GAP_HEIGHT / 3),
        hasCollided: false,
        hasKeyClicked: false,
        score: 0,
    }
    const [gapCoords,setGapCoords] = useState<BoxCoordinates>(INITIAL_VALUES.gapCoords);
    const [birdCoords,setBirdCoords] = useState<BoxCoordinates>(INITIAL_VALUES.birdCoords);
    const [hasCollided,setHasCollided] = useState(INITIAL_VALUES.hasCollided);
    const [hasKeyClicked,setHasKeyClicked] = useState(INITIAL_VALUES.hasKeyClicked);
    const [score,setScore] = useState(0);

    const handleKeyBoardEvent = (e:KeyboardEvent) => {
        if (e.key === "w") {
            setHasKeyClicked(true);
        }
    }  

    const handleReset = () => {
        setGapCoords(INITIAL_VALUES.gapCoords);
        setBirdCoords(INITIAL_VALUES.birdCoords);
        setHasCollided(INITIAL_VALUES.hasCollided);
        setHasKeyClicked(INITIAL_VALUES.hasKeyClicked);
        setScore(INITIAL_VALUES.score);
    }

    useEffect(() => {
        window.addEventListener("keydown",handleKeyBoardEvent)
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
        <BoardGame width={GAME_WIDTH} height={GAME_HEIGHT} gapCoords={gapCoords} birdCoords={birdCoords} score={score} hasCollided={hasCollided} handleReset={handleReset}/>
    )
}

