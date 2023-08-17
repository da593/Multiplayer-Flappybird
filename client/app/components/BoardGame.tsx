
import { GAME_DIMENSIONS, GameState } from '@flappyblock/shared';
import { BoardBackground } from './background';
import { Scoreboard } from './Scoreboard';
import { Pipe } from './Pipe';
import { Bird } from './Bird';
import { DimensionContext } from 'hooks/DimensionsContext';



interface Props extends GameState {
    playerId_self: string;
    id: string;
    hasStarted: boolean;

}

export function BoardGame({id, playerId_self, player, pipe, hasStarted}: Props)  {
    const isSelf = playerId_self === id;
    return (
        <div className={player.hasCollided || !hasStarted ? "gameboard opaque" : "gameboard"}>
            <DimensionContext.Provider value={GAME_DIMENSIONS}>
                <Scoreboard isSelf={isSelf} score={player.score}/>
                <Pipe gapCoords={pipe.gapCoords}/>
                <Bird  isSelf={isSelf} birdCoords={player.birdCoords}/>
                <BoardBackground/> 
            </DimensionContext.Provider>
        </div>
    )
}

