import React from 'react';
import ReactDOM from 'react-dom';
import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import Timer from './components/Timer';
import Controls from './components/Controls';

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [currentMode, setCurrentMode] = React.useState("Session");
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState("25:00");
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const audioRef = React.useRef(null);

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
    if (!timerIsRunning) {
      if (isIncrement) {
        /* check if user input is valid */
        if (breakLength !== 60) {
          /* check if we need to update the timer label */
          if (currentMode === "Break") {
            setMinutes(breakLength + 1);
            setSeconds(0);
            setTimeLeft(formatTime(breakLength + 1, 0));
          }
  
          setBreakLength((prevBreakLength) => prevBreakLength + 1);
        }
      } else {
        /* check if user input is valid */
        if (breakLength !== 1) {
          /* check if we need to update the timer label */
          if (currentMode === "Break") {
            setMinutes(breakLength - 1);
            setSeconds(0);
            setTimeLeft(formatTime(breakLength - 1, 0));
          }
  
          setBreakLength((prevBreakLength) => prevBreakLength - 1);
        }
      }
    }
  }

  function updateSessionLength(isIncrement) {
    if (!timerIsRunning) {
      if (isIncrement) {
        /* check if user input is valid */
        if (sessionLength !== 60) {
          /* check if we need to update the timer label */
          if (currentMode === "Session") {
            setMinutes(sessionLength + 1);
            setSeconds(0);
            setTimeLeft(formatTime(sessionLength + 1, 0));
          }
  
          setSessionLength((prevSessionLength) => prevSessionLength + 1);
        }
      } else {
        /* check if user input is valid */
        if (sessionLength !== 1) {
          /* check if we need to update the timer label */
          if (currentMode === "Session") {
            setMinutes(sessionLength - 1);
            setSeconds(0);
            setTimeLeft(formatTime(sessionLength - 1, 0));
          }
  
          setSessionLength((prevSessionLength) => prevSessionLength - 1);
        }
      }
    }
  }

  function reset() {
    setBreakLength(5);
    setSessionLength(25);
    setCurrentMode("Session");
    setTimeLeft("25:00");
    setMinutes(25);
    setSeconds(0);
    setTimerIsRunning(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  React.useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      console.log("timer reached 0");
      /* make a beeping sound */
      audioRef.current.play();
    }
  }, [seconds, minutes])

  React.useEffect(() => {
    if (timerIsRunning) {
      /* start timer */
      const timerId = setInterval(() => {
        console.log("1 second has passed");
        
        /* below is what happens every second */
          if (seconds > 0) {
            setTimeLeft(formatTime(minutes, seconds - 1));
            setSeconds((prevSeconds) => prevSeconds - 1);
          } else if (seconds === 0 && minutes !== 0) {
            setTimeLeft(formatTime(minutes - 1, 59));
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else if (seconds === 0 && minutes === 0) {
            setCurrentMode((prevCurrentMode) => {
              if (prevCurrentMode === "Session") {
                console.log("Breaklength: " + breakLength);
                setMinutes(breakLength);
                setSeconds(0);
                setTimeLeft(formatTime(breakLength, 0));
                return "Break";
              } else {
                setMinutes(sessionLength);
                setSeconds(0);
                setTimeLeft(formatTime(sessionLength, 0));
                return "Session";
              }
            })
          }
      }, 1000)

      return () => clearInterval(timerId);
    }
  }, [timerIsRunning, minutes, seconds]) /* create a new interval when timerIsRunning starts as well as whenever 
  minutes and seconds update because this makes sure that seconds and minutes used in 
  the function is the most updated form*/

  function startPauseTimer() {
    if (timerIsRunning) {
      setTimerIsRunning(false);
    } else {
      setTimerIsRunning(true);
    }
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
      startPauseTimer = {startPauseTimer}
      />
      <p id = "credit">by <a href="https://github.com/lucy-c1/pomodoro" target='_blank'>lucy-c1</a></p>
      {/* the beeping sound audio when the timer reaches 00:00 */}
      <audio ref = {audioRef} id = "beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById("root"));
// ReactDOM.createRoot(document.getElementById('root')).render(<App />); 