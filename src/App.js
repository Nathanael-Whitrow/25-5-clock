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
      <p id={props.id + '-label'} className="title-2">{props.text}</p>
      <div className='count-controls'>
        <button
          id={props.id + '-decrement'}
          className='button button-up'
          onClick={() => props.time > 0 ? props.setTime(props.time - 1) : props.setTime(props.time)}
        >
          <i className='fa-solid fa-arrow-up'></i>
        </button>

        <span
          id={props.id + '-length'}
          className='counter'
        >
          {props.time.toString()}
        </span>

        <button
          id={props.id + '-increment'}
          className='button button-down'
          onClick={() => props.time < 9999 ? props.setTime(props.time + 1) : props.setTime(props.time)}
        >
          <i className='fa-solid fa-arrow-down'></i>
        </button>
      </div>
    </div>
  )
}

function Timer(props) {
  let minutes = props.time.toString();
  let seconds = '00';

  if (seconds.length === 1) {
    seconds = '0'.concat(seconds);
  }
  if (minutes.length === 1) {
    minutes = '0'.concat(minutes);
  }
  const timeLeft = minutes.concat(':').concat(seconds);

  return (
    <div className='timer-text-container'>
      <p id='timer-label'>Session</p>
      <p id='time-left'>{timeLeft}</p>
    </div>
  )
}

function PlayControls() {
  return (
    <div className='controls'>
      <button id='start_stop' className='button controls-play'>
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button id='reset' className='button controls-restart'>
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>
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
        <TimeAdjustor id='break' text='Break Length' time={breakTime} setTime={setBreakTime} />
        <TimeAdjustor id='session' text='Session Time' time={sessionTime} setTime={setSessionTime} />
      </span>
      <div className='timer-box'>
        <Timer time={sessionTime} />
        <PlayControls />
      </div>
    </div>
  );
}

export default App;
