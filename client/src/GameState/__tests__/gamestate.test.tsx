import React  from 'react';
import { GameState } from 'GameState';
import renderer from 'react-test-renderer';


test("test game state for 1-player", () => {
    const component = renderer.create(<GameState players={1}/>)
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot()


})

