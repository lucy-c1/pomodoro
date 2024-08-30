import React from "react"

export default function Controls(props) {
    return (
        <div className = "controls-container">
            <button id = "start_stop" onClick = {props.startPauseTimer}>▷||</button>
            <button id = "reset" onClick = {props.reset}>↻</button>
        </div>
    )
}