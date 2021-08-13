import React from "react";
import { minutesToDuration } from "../utils/duration";

function FocusTime({ focusDuration, handleFocusMinus, handleFocusPlus, isTimerRunning }) {
  return (
    <div className="input-group input-group-lg mb-2">

      <span className="input-group-text" data-testid="duration-focus">
        Focus Duration: {minutesToDuration(focusDuration)}
      </span>
      <div className="input-group-append">
        <button
          onClick={handleFocusMinus}
          disabled={isTimerRunning}
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
        >
          <span className="oi oi-minus" />
        </button>

        <button
          onClick={handleFocusPlus}
          disabled={isTimerRunning}
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  )
}

export default FocusTime;