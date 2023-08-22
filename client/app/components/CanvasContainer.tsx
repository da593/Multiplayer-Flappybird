import { ChildrenProps } from "./types";

export function CanvasContainer({children}:ChildrenProps) {        
    return (
        <div className="canvas-container">
                {children}
        </div>
    )
}
