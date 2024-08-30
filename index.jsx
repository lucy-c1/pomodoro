import React from 'react';
import ReactDOM from 'react-dom/client';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';
import Controls from './components/Controls';

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [currentMode, setCurrentMode] = React.useState("Session");
  const [timeLeft, setTimeLeft] = React.useState("25:00");

  /* given minutes and seconds, returns a string in the format of mm:ss adding 0's if necessary */
  function formatTime(minutes, seconds) {
    let result = "";
    if (minutes <= 9) {
      result += "0" + minutes;
    } else {
      result += minutes;
    }
    result += ":";
    if (seconds <= 9) {
      result += "0" + seconds;
    } else {
      result += seconds;
    }

    return result;
  }

  function updateBreakLength(isIncrement) {
    if (isIncrement) {
      /* check if user input is valid */
      if (breakLength !== 60) {
        /* check if we need to update the timer label */
        if (currentMode === "Break") {
          setTimeLeft(formatTime(breakLength + 1, 0));
        }

        setBreakLength((prevBreakLength) => prevBreakLength + 1);
      }
    } else {
      /* check if user input is valid */
      if (breakLength !== 1) {
        /* check if we need to update the timer label */
        if (currentMode === "Break") {
          setTimeLeft(formatTime(breakLength - 1, 0));
        }

        setBreakLength((prevBreakLength) => prevBreakLength - 1);
      }
    }
  }

  function updateSessionLength(isIncrement) {
    if (isIncrement) {
      /* check if user input is valid */
      if (sessionLength !== 60) {
        /* check if we need to update the timer label */
        if (currentMode === "Session") {
          setTimeLeft(formatTime(sessionLength + 1, 0));
        }

        setSessionLength((prevSessionLength) => prevSessionLength + 1);
      }
    } else {
      /* check if user input is valid */
      if (sessionLength !== 1) {
        /* check if we need to update the timer label */
        if (currentMode === "Session") {
          setTimeLeft(formatTime(sessionLength - 1, 0));
        }

        setSessionLength((prevSessionLength) => prevSessionLength - 1);
      }
    }
  }

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setCurrentMode("Session");
    setTimeLeft("25:00");
  }

  return (
    <div className = "app-container">
      <h1>Pomodoro Clock</h1>
      <div className = "lengths-container">
        <BreakLength 
        breakLength = {breakLength}
        updateBreakLength = {updateBreakLength}
        />
        <SessionLength 
        sessionLength = {sessionLength}
        updateSessionLength = {updateSessionLength}
        />
      </div>
      <Timer 
      currentMode = {currentMode}
      timeLeft = {timeLeft}
      />
      <Controls 
      reset = {reset}
      />
      <p id = "credit">by <a href="https://github.com/lucy-c1/pomodoro" target='_blank'>lucy-c1</a></p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 