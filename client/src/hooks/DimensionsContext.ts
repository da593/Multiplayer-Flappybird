import { createContext } from 'react';
import { Dimensions_I } from 'GameState/types';


export const DimensionContext = createContext<Dimensions_I | undefined>(undefined);
