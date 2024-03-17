import "./App.css";
import TimerCard from "./TimerCard";

function App() {
  return (
    <div className="mainDiv">
      <div class="header">
        Countdown
        <span class="header2"> Timer</span>
      </div>
      <input type="date" class="date" />
      <div class="button">Start Timer</div>
      <div className="time">
        <TimerCard />
        <TimerCard />
        <TimerCard />
        <TimerCard />
      </div>
    </div>
  );
}

export default App;
