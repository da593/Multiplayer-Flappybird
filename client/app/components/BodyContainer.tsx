import { ChildrenProps } from "./types";

export function BodyContainer({children}:ChildrenProps) {        
    return (
        <div className="body-container">
            <div className="canvas-container">
                {children}
            </div>
        </div>
    )
}
