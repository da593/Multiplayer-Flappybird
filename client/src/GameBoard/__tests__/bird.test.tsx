import React  from 'react';
import { Bird } from 'GameBoard/Bird';
import renderer from 'react-test-renderer';
import { BoxCoordinates } from 'GameState/types';
import { GAME_DIMENSIONS } from 'GameState/constants';

const birdAtCeiling:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: 0}, 
    topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: 0}, 
    botLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.BIRD_WIDTH}, 
    botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y:  GAME_DIMENSIONS.BIRD_WIDTH}
};

const birdAtY:BoxCoordinates = {
    topLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: 50}, 
    topRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y: 50}, 
    botLeft:{x: GAME_DIMENSIONS.BIRD_X_LOCATION, y: GAME_DIMENSIONS.BIRD_WIDTH}, 
    botRight:{x: GAME_DIMENSIONS.BIRD_X_LOCATION + GAME_DIMENSIONS.BIRD_WIDTH, y:  GAME_DIMENSIONS.BIRD_WIDTH}
};

test("render bird given props", () => {
    const component = renderer.create(<Bird birdCoords={birdAtCeiling}/>)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot()

    
})
