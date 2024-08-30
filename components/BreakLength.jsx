import React from "react"

/*
Props:
- breakLength
- updateBreakLength(isIncrement)
*/
export default function BreakLength(props) {
    return (
        <div>
            <h3 id = "break-label">Break Length</h3>
            <button id = "break-decrement">⬇</button>
            <p id = "break-length">{props.breakLength}</p>
            <button id = "break-increment">⬆</button>
        </div>
    )
}