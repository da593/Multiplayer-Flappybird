import React from 'react'
import { ChildrenProps } from './types';

export function NavigationMenu({children}:ChildrenProps) {

    return (
        <div className="navigation-menu">
            <ul>
                {children}
            </ul>
        </div>
    )
}
