import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusTime from './FocusTime';
import BreakTime from "./BreakTime";
import PlayPauseStop from "./PlayPauseStop";
import Status from "./Status";

// These functions are defined outside of the component to insure they do not have access to state


/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */

function nextTick(prevState) {


  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */

function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing")
    {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}


function Pomodoro() {

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);

  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);


  const handleFocusMinus = () => {

    setFocusDuration(Math.max(5, focusDuration - 5));
  };

  const handleFocusPlus = () => {
    setFocusDuration(Math.min(60, focusDuration + 5));
  };

  const handleBreakMinus = () => {
    setBreakDuration(Math.max(1, breakDuration - 1));
  };
  const handleBreakPlus = () => {
    setBreakDuration(Math.min(15, breakDuration + 1));
  };

  const handleStopClick = () => {


    setFocusDuration(25);
    setBreakDuration(5);
    setSession(null);
    setIsTimerRunning();
  };

  /**
   * Custom hook that invokes the callback function every second *
   **/

  useInterval(() => {


    if (session.timeRemaining === 0)
    {
      new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
      return setSession(nextSession(focusDuration, breakDuration));

    }
    return setSession(nextTick);

  },

    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */

  function playPause() {

    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState)
      {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null)
          {

            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }

          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusTime
            focusDuration={focusDuration}
            handleFocusMinus={handleFocusMinus}
            handleFocusPlus={handleFocusPlus}
            isTimerRunning={isTimerRunning}
          />
        </div>

        <div className="col">
          <div className="float-right">
            <BreakTime
              breakDuration={breakDuration}
              handleBreakMinus={handleBreakMinus}
              handleBreakPlus={handleBreakPlus}
              isTimerRunning={isTimerRunning}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <PlayPauseStop
            playPause={playPause}
            handleStopClick={handleStopClick}
            isTimerRunning={isTimerRunning}
          />
        </div>
      </div>
      <Status
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
      />
    </div >
  );
}

export default Pomodoro;
