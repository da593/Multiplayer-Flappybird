interface ChildrenProps {
    children:React.ReactNode,
    
}

export function BodyContainer(props:ChildrenProps) {

        
    return (
        <div className="body-container">
            <div className="canvas-container">
                {props.children}
            </div>
        </div>
    )
}
