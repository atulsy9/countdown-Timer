/* eslint-disable no-unused-expressions */
import { useSnackbar } from "notistack";
import "./App.css";
import TimerCard from "./TimerCard";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

function App() {
  const [data, setData] = useState();
  const [Timer, SetTimer] = useState(false);
  const [leftTime, setLeftTime] = useState(() => getTheTimeDifference(data));
  // const { enqueueSnackbar } = useSnackbar();
  const [status, SetStatus] = useState(true);
  const [error, Seterror] = useState("");
  const validateData = (val) => {
    if (!val) {
      Seterror("Date and time can't be Empty");
      return false;
    }
    const range = new Date(val) - new Date();
    const validRange = 100 * 24 * 60 * 60 * 1000;
    if (range > validRange) {
      Seterror("Date can't be more than 100Days");
      return false;
    }
    if (range < 0) {
      Seterror("Date can't be less than the current Date");
      return false;
    }
    if (!range) {
      Seterror("Date or Timing can't be less than current date & time");
      return false;
    }
    // SetStatus(true);
    return true;
  };

  function getTheTimeDifference(data, currDate) {
    const totalTimeLeft = data - currDate;
    const dateObj = {
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (totalTimeLeft < 0) {
      SetStatus(false);
      Seterror("The Countdown is over! What's next on your adventure ?");
      return dateObj;
    }
    if (totalTimeLeft) {
      dateObj.day = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
      dateObj.hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
      dateObj.minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
      dateObj.seconds = Math.floor((totalTimeLeft / 1000) % 60);
    }
    return dateObj;
  }

  const handelOnsubmit = (e) => {
    if (status) {
      e.preventDefault();
      let inputDate = e.target.date.value;
      let isValid = validateData(inputDate);
      if (isValid) {
        SetTimer(Timer ? false : true);
        setData(new Date(inputDate));
        Timer ? window.location.reload() : null;
      } else {
        !Timer ? SetStatus(false) : window.location.reload();
      }
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (data) {
      const timer = setInterval(() => {
        setLeftTime(getTheTimeDifference(data, new Date()));
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setLeftTime(getTheTimeDifference(data));
    }
  }, [Timer]);

  return (
    <div className="mainDiv">
      <div className="header">
        Countdown
        <span className="header2"> Timer</span>
      </div>
      <form className="dateForm" onSubmit={handelOnsubmit}>
        <input type="datetime-local" id="date" className="date" />
        <input
          className="button"
          type="submit"
          value={
            status ? (Timer ? "Cancel Timer" : "Start Timer") : "Reset Timer"
          }
        />
      </form>
      {status ? (
        <Grid className="time" container>
          {Object.entries(leftTime).map((val) => {
            const label = val[0];
            const value = val[1];
            return (
              <TimerCard value={value} key={label}>
                {label}
              </TimerCard>
            );
          })}
        </Grid>
      ) : (
        <div className="completeStatus">{error}</div>
      )}
    </div>
  );
}

export default App;
