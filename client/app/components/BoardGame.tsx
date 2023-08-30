
import { GAME_DIMENSIONS, GameState, GameStateResponse } from '@flappyblock/shared';
import { BoardBackground } from './background';
import { Scoreboard } from './Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { DimensionContext } from 'hooks/DimensionsContext';



interface Props extends GameStateResponse {
    playerId_self: string;
    hasStarted: boolean;
}

export function BoardGame({playerId_self, players, pipe, hasStarted}: Props)  {

    return (
        <div className={(players[playerId_self] && players[playerId_self].hasCollided) || !hasStarted ? "gameboard opaque" : "gameboard"}>
            <DimensionContext.Provider value={GAME_DIMENSIONS}>
                {Object.entries(players).map(([id, playerState]) => {
                        return (
                            <Scoreboard key={id} isSelf={playerId_self === id} score={playerState.score}/>
                        )
                })}
                <Pipe gapCoords={pipe.gapCoords}/>
                {Object.entries(players).map(([id, playerState]) => {
                        return (
                            <Bird key={id} isSelf={playerId_self === id} birdCoords={playerState.birdCoords}/>
                        )
                })}
                <BoardBackground/> 
            </DimensionContext.Provider>
        </div>
    )
}

