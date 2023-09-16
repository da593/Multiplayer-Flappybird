import { GameStateResponse } from '@flappyblock/shared';
import { BoardBackground } from './background';
import { Scoreboard } from './Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';



interface Props extends GameStateResponse {
    playerId_self: string;
    hasStarted: boolean;
}

export function BoardGame({playerId_self, players, pipe, hasStarted}: Props)  {

    return (
        <div className={(players[playerId_self] && players[playerId_self].hasCollided) || !hasStarted ? "gameboard opaque" : "gameboard"}>
                <div className='scoreboard'>
                    {Object.entries(players).map(([id, playerState]) => {
                            return (
                                <Scoreboard key={id} isSelf={playerId_self === id} score={playerState.score}/>
                            )
                    })}
                </div>
                <Pipe gapCoords={pipe.gapCoords}/>
                {Object.entries(players).map(([id, playerState]) => {
                    return (
                        <Bird key={id} isSelf={playerId_self === id} birdCoords={playerState.birdCoords} hasCollided={playerState.hasCollided}/>
                    )
                })}
                <BoardBackground/> 
        </div>
    )
}

