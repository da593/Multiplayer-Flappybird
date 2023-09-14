import { ChildrenProps } from "./types";

export function DivContainer ({className, children}:ChildrenProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}