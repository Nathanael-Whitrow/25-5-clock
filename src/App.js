import './App.css';
import { useState, useEffect } from 'react';
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

  const incrementSessionTime = () => {
    // The + 1 is because session time has not updated yet (async)
    if (props.time < 60 && !props.running) {
      props.updateSession(prev => prev + 1);
      props.updateRemaining((props.time + 1) * 60);
    }
  }

  const decrementSessionTime = () => {
    // The - 1 is because session time has not updated yet (async)
    if (props.time > 1 && !props.running) {
      props.updateSession(prev => prev - 1);
      props.updateRemaining((props.time - 1) * 60);
    }
  }

  return (
    <div id="time-adjustor">
      <p id={props.id + '-label'} className="title-2">{props.text}</p>
      <div className='count-controls'>
        <button
          id={props.id + '-increment'}
          className='button button-up'
          onClick={incrementSessionTime}
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
          onClick={decrementSessionTime}
        >
          <i className='fa-solid fa-arrow-down'></i>
        </button>
      </div>
    </div>
  )
}

function Timer(props) {
  const MS_PER_SECOND = 100;
  // State used for tracking countdown
  const [intervalId, setIntervalId] = useState(0);

  const handlePlayPause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      props.setRunning(false);
      return;
    }

    props.setRunning(true);

    const newIntervalId = setInterval(() => {
      // This is where we count down
      props.updateTime(prev => prev - 1);
    }, MS_PER_SECOND);

    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    if (intervalId && props.time === 0) {
      props.updateTime(props.sessionTime * 60);
    }
  });

  const handleReset = () => {
    // Stop the countdown
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      props.setIsRunning(false);
    }
    // Set timer to default time
    props.updateSessionTime(props.defaultTime);
    props.updateTime(props.defaultTime * 60);
  };


  // Format time for display mm:ss
  let minutes = Math.floor((props.time / 60)).toString();
  let seconds = (props.time % 60).toString();

  if (seconds.length === 1) {
    seconds = '0'.concat(seconds);
  }
  if (minutes.length === 1) {
    minutes = '0'.concat(minutes);
  }
  const formattedTime = minutes.concat(':').concat(seconds);

  return (
    <div>
      <div className='timer-text-container'>
        <p id='timer-label'>Session</p>
        <p id='time-left'>{formattedTime}</p>
      </div>
      <div className='controls'>
        <button id='start_stop' className='button controls-play' onClick={handlePlayPause}>
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button
          id='reset'
          className='button controls-restart'
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
      </div>
    </div>
  )
}

function App() {
  const DEFAULT_SESSION_TIME = 1;
  const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_TIME);
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="App">
      <Title />
      <span id="timers">
        <TimeAdjustor
          id='session'
          text='Session Time'
          time={sessionTime}
          updateSession={setSessionTime}
          updateRemaining={setTimeLeft}
          running={isRunning}
        />
      </span>
      <div className='timer-box'>
        <Timer
          time={timeLeft}
          updateTime={setTimeLeft}
          sessionTime={sessionTime}
          updateSessionTime={setSessionTime}
          defaultTime={DEFAULT_SESSION_TIME}
          setRunning={setIsRunning}
        />
      </div>
    </div>
  );
}

export default App;
