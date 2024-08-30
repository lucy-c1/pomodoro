import React from "react"

/*
Props:
- breakLength
- updateBreakLength(isIncrement)
*/
export default function BreakLength(props) {
    return (
        <div className = "length-container">
            <h3 id = "break-label">Break Length</h3>
            <div className = "increment-decrement-container">
                <button id = "break-decrement">⬇</button>
                <p id = "break-length">{props.breakLength}</p>
                <button id = "break-increment">⬆</button>
            </div>
        </div>
    )
}