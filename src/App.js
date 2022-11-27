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
          id={props.id + '-increment'}
          className='button button-up'
          onClick={props.increment}
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
          id={props.id + '-decrement'}
          className='button button-down'
          onClick={props.decrement}
        >
          <i className='fa-solid fa-arrow-down'></i>
        </button>
      </div>
    </div>
  )
}

function Timer(props) {
  let minutes = Math.floor((props.time / 60)).toString();
  let seconds = (props.time % 60).toString();

  if (seconds.length === 1) {
    seconds = '0'.concat(seconds);
  }
  if (minutes.length === 1) {
    minutes = '0'.concat(minutes);
  }
  const timeLeft = minutes.concat(':').concat(seconds);

  let text = 'Session';
  if (!props.sessionFlag) {
    text = 'Break';
  }
  if (props.time === 0) {
    props.handleTimeout();
  }
  return (
    <div className='timer-text-container'>
      <p id='timer-label'>{text}</p>
      <p id='time-left'>{timeLeft}</p>
    </div>
  )
}

function PlayControls(props) {

  return (
    <div className='controls'>
      <button id='start_stop' className='button controls-play' onClick={props.click}>
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
  const MS_PER_SECOND = 100;
  const DEFAULT_BREAK_TIME = 1;
  const DEFAULT_SESSION_TIME = 1;

  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_TIME);

  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [inSession, setInSession] = useState(true);

  const [intervalId, setIntervalId] = useState(0);


  // Thought: Do I need to hand the state stuff in as parameters?
  const handlePlayPause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      // This is where we count down
      setTimeLeft(prev => prev - 1);
    }, MS_PER_SECOND);

    setIntervalId(newIntervalId);
  }

  const timeout = () => {
    console.log(timeLeft, 'TIMEOUT!');
    // Swap from session to break
    clearInterval(intervalId);
    setIntervalId(0);
    inSession ? setTimeLeft(breakTime) : setTimeLeft(sessionTime);
    setInSession(!inSession);
    // handlePlayPause();
  }

  const incrementSessionTime = () => {
    if (sessionTime < 60) {
      // The + 1 is because session time has not updated yet (async)
      setTimeLeft(() => (sessionTime + 1) * 60);
      setSessionTime((prev) => prev + 1);
    }
    return;
  }

  const decrementSessionTime = () => {
    if (sessionTime > 1) {
      // The - 1 is because session time has not updated yet (async)
      setTimeLeft(() => (sessionTime - 1) * 60);
      setSessionTime((prev) => prev - 1);
    }
    return;
  }

  const incrementBreakTime = () => breakTime < 60 ? setBreakTime((prev) => prev + 1) : setBreakTime((prev) => prev);
  const decrementBreakTime = () => breakTime > 1 ? setBreakTime((prev) => prev - 1) : setBreakTime((prev) => prev);



  return (
    <div className="App">
      <Title />
      <span id="timers">
        <TimeAdjustor id='break' text='Break Length' time={breakTime} increment={incrementBreakTime} decrement={decrementBreakTime} />
        <TimeAdjustor id='session' text='Session Time' time={sessionTime} increment={incrementSessionTime} decrement={decrementSessionTime} />
      </span>
      <div className='timer-box'>
        <Timer time={timeLeft} sessionFlag={inSession} handleTimeout={timeout} />
        <PlayControls click={handlePlayPause} />
      </div>
    </div>
  );
}

export default App;
