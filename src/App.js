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
  const MS_PER_SECOND = 1000;
  // State used for tracking countdown
  const [intervalId, setIntervalId] = useState(0);
  const [inSession, setInSession] = useState(true);

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
      document.getElementById("beep").play();
      if (inSession) {
        props.updateTime(props.breakTime * 60);
        setInSession(false);
      }
      else {
        props.updateTime(props.sessionTime * 60);
        setInSession(true);
      }
    }
  }, [intervalId, props, inSession]);

  const handleReset = () => {
    // Stop the countdown
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      props.setRunning(false);
    }
    // Set timer to default time
    props.updateSessionTime(props.defaultSessionTime);
    props.updateBreakTime(props.defaultBreakTime);
    props.updateTime(props.defaultSessionTime * 60);
    setInSession(true);
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

  let text = 'Session';
  if (!inSession) {
    text = 'Break';
  }

  return (
    <div>
      <div className='timer-text-container'>
        <p id='timer-label'>{text}</p>
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
  const DEFAULT_SESSION_TIME = 25;
  const DEFAULT_BREAK_TIME = 5;
  const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const incrementSessionTime = () => {
    // The + 1 is because session time has not updated yet (async)
    if (sessionTime < 60 && !isRunning) {
      setSessionTime(prev => prev + 1);
      setTimeLeft((sessionTime + 1) * 60);
    }
  }

  const decrementSessionTime = () => {
    // The - 1 is because session time has not updated yet (async)
    if (sessionTime > 1 && !isRunning) {
      setSessionTime(prev => prev - 1);
      setTimeLeft((sessionTime - 1) * 60);
    }
  }

  const incrementBreakTime = () => {
    if (breakTime < 60 && !isRunning) {
      setBreakTime(prev => prev + 1);
    }
  }

  const decrementBreakTime = () => {
    if (breakTime > 1 && !isRunning) {
      setBreakTime(prev => prev - 1);
    }
  }

  return (
    <div className="App">
      <Title />
      <span id="timers">
        <TimeAdjustor
          id='session'
          text='Session Time'
          increment={incrementSessionTime}
          decrement={decrementSessionTime}
          time={sessionTime}
        />
        <TimeAdjustor
          id='break'
          text='Break Time'
          increment={incrementBreakTime}
          decrement={decrementBreakTime}
          time={breakTime}
        />
      </span>
      <div className='timer-box'>
        <Timer
          time={timeLeft}
          updateTime={setTimeLeft}
          sessionTime={sessionTime}
          updateSessionTime={setSessionTime}
          defaultSessionTime={DEFAULT_SESSION_TIME}
          breakTime={breakTime}
          updateBreakTime={setBreakTime}
          defaultBreakTime={DEFAULT_BREAK_TIME}
          setRunning={setIsRunning}
        />
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
}

export default App;

