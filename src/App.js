import './App.css';

function Title() {
  return (
    <div>
      <h1>25 + 5 Clock</h1>
    </div>
  )
}

function TimeAdjustor() {
  return (
    <div>
      <div>
        <span>Break length</span>
      </div>
      <div>
        <button></button>
        Some text
        <button></button>
      </div>
    </div>
  )
}

function Timer() {
  return (
    <div>
      <div>
        <h2>mm:ss</h2>
      </div>
    </div>
  )
}

function Controls() {
  const text = "> || <>"
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Title />
      <span>
        <TimeAdjustor />
        <TimeAdjustor />
      </span>
      <Timer />
      <Controls />
    </div>
  );
}

export default App;
