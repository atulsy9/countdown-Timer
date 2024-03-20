import "./timerCard.css";

export default function TimerCard({ value, children }) {
  return (
    <div className="timerCard">
      <div className="count">{value}</div>
      <div className="text">{children}</div>
    </div>
  );
}
