import { useSnackbar } from "notistack";
import "./App.css";
import TimerCard from "./TimerCard";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [Timer, SetTimer] = useState(false);
  const [leftTime, setLeftTime] = useState(() => getTheTimeDifference(data));
  const [token, SetToken] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [status, SetStatus] = useState(false);
  const validateData = (val) => {
    const range = new Date(val) - new Date();
    const validRange = 99 * 24 * 60 * 60 * 1000;
    if (!token) {
      return false;
    }
    if (range > validRange) {
      enqueueSnackbar("Date can't be more than 99Days", { variant: "error" });
      return false;
    }
    if (range < 0) {
      enqueueSnackbar("Date can't be less than the current Date", {
        variant: "error",
      });
      return false;
    }
    if (!range) {
      enqueueSnackbar("Check the date or timing", { variant: "error" });
      return false;
    }
    enqueueSnackbar("Timer has been set Sucessfully.", { variant: "success" });
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
      SetStatus(true);
      SetToken(0);
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
    e.preventDefault();
    SetToken(Math.random());
    let inputDate = e.target.date.value;
    let isValid = validateData(inputDate);
    if (isValid) {
      SetTimer(Timer ? false : true);
    }
    !Timer ? setData(new Date(inputDate)) : window.location.reload();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          value={Timer ? "Cancel Timer" : "Start Timer"}
        />
      </form>
      <div className="time">
        {Object.entries(leftTime).map((val) => {
          const label = val[0];
          const value = val[1];
          return (
            <TimerCard value={value} key={label}>
              {label}
            </TimerCard>
          );
        })}
      </div>
      {status ? (
        <div className="completeStatus">
          The Countdown is over! What's next on your adventure ?
        </div>
      ) : null}
    </div>
  );
}

export default App;
