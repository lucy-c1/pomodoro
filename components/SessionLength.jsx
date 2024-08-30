import React from "react"

/*
Props:
- sessionLength
- updateSessionLength(isIncrement)
*/
export default function SessionLength(props) {
    return (
        <div className = "length-container">
            <h3 id = "session-label">Session Length</h3>
            <div className="increment-decrement-container">
                <button id = "session-decrement" onClick = {() => {props.updateSessionLength(false)}}>⬇</button>
                <p id = "session-length">{props.sessionLength}</p>
                <button id = "session-increment" onClick = {() => {props.updateSessionLength(true)}}>⬆</button>
            </div>
        </div>
    )
}