import './App.css';
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
        <button className='button button-up'><i className='fa-solid fa-arrow-up'></i></button>
        <span className='counter'>Count</span>
        <button className='button button-down'><i className='fa-solid fa-arrow-down'></i></button>
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

function Controls() {
  return (
    <div className='controls'>
      <button className='button controls-play'><FontAwesomeIcon icon={faPlay} /></button>
      <button className='button controls-pause'><FontAwesomeIcon icon={faPause} /></button>
      <button className='button controls-restart'><FontAwesomeIcon icon={faArrowRotateLeft} /></button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Title />
      <span id="timers">
        <TimeAdjustor text='Break Time' />
        <TimeAdjustor text='Session Time' />
      </span>
      <div className='timer-box'>
        <Timer />
        <Controls />
      </div>
    </div>
  );
}

export default App;
