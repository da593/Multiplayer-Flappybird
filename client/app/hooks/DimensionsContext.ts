'use client'
import { Dimensions_I } from '@flappyblock/shared';
import { createContext } from 'react';



export const DimensionContext = createContext<Dimensions_I | undefined>(undefined);
