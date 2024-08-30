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

  return (
    <div className = "app-container">
      <h1>Pomodoro Clock</h1>
      <div className = "lengths-container">
        <BreakLength 
        breakLength = {breakLength}
        />
        <SessionLength 
        sessionLength = {sessionLength}
        />
      </div>
      <Timer 
      currentMode = {currentMode}
      timeLeft = {timeLeft}
      />
      <Controls />
      <p id = "credit">by <a href="https://github.com/lucy-c1/pomodoro" target='_blank'>lucy-c1</a></p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 