import "./timerCard.css";
import Grid from "@mui/material/Grid";

export default function TimerCard({ value, children }) {
  return (
    <Grid item sm={2} xs={4} lg={2} md={2} className="timerCard">
      <div className="count">{value}</div>
      <div className="text">{children}</div>
    </Grid>
  );
}
