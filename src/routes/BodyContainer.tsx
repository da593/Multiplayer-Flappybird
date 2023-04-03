import { ChildrenProps } from "NavigationMenu/types";
import * as React from "react";


export function BodyContainer(props:ChildrenProps) {

        
    return (
        <div className="body-container">
            <div className="canvas-container">
                {props.children}
            </div
        </div>
    )
}
