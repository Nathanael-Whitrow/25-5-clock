import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

function Title() {
  return (
    <div id='title'>
      <h1>25 + 5 Clock</h1>
    </div>
  )
}

function TimeAdjustor(props) {

  return (
    <div id="time-adjustor">
      <p className="title-2">{props.text}</p>
      <div className='count-controls'>
        <button className='button button-up' onClick={() => props.setTime(props.time + 1)}><i className='fa-solid fa-arrow-up'></i></button>
        <span className='counter'>{props.time}</span>
        <button className='button button-down' onClick={() => props.setTime(props.time - 1)}><i className='fa-solid fa-arrow-down'></i></button>
      </div>
    </div>
  )
}

function Timer() {
  return (
    <div className='timer-text-container'>
      <p className='timer-text'>mm : ss</p>
    </div>
  )
}

function PlayControls() {
  return (
    <div className='controls'>
      <button className='button controls-play'><FontAwesomeIcon icon={faPlay} /></button>
      <button className='button controls-pause'><FontAwesomeIcon icon={faPause} /></button>
      <button className='button controls-restart'><FontAwesomeIcon icon={faArrowRotateLeft} /></button>
    </div>
  )
}

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);

  return (
    <div className="App">
      <Title />
      <span id="timers">
        <TimeAdjustor text='Break Time' time={breakTime} setTime={setBreakTime} />
        <TimeAdjustor text='Session Time' time={sessionTime} setTime={setSessionTime} />
      </span>
      <div className='timer-box'>
        <Timer />
        <PlayControls />
      </div>
    </div>
  );
}

export default App;
