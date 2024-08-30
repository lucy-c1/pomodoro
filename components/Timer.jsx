import React from "react"

/*
Props:
- currentMode: can be session or break
- timeLeft
 
*/
export default function Timer(props) {
    return (
        <div className = "timer-container">
            <h3 id = "timer-label">{props.currentMode}</h3>
            <h2 id = "time-left">{props.timeLeft}</h2>
        </div>
    )
}