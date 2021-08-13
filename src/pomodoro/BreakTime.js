import React from "react";
import { minutesToDuration } from "../utils/duration";

function BreakTime({ breakDuration, handleBreakMinus, handleBreakPlus, isTimerRunning }) {
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-break">
        Break Duration: {minutesToDuration(breakDuration)}
      </span>
      <div className="input-group-append">

        <button
          onClick={handleBreakMinus}
          disabled={isTimerRunning}
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-break"
        >
          <span className="oi oi-minus" />
        </button>
        <button
          onClick={handleBreakPlus}
          disabled={isTimerRunning}
          type="button"
          className="btn btn-secondary"
          data-testid="increase-break"
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  )
}

export default BreakTime;