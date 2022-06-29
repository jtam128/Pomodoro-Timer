import React from "react";
import classNames from "../utils/class-names";

function PlayPauseStop({ playPause, handleStopClick, isTimerRunning }) {
  return (
    <div
      className="btn-group btn-group-lg mb-2"
      role="group"
      aria-label="Timer controls"
    >

      <button
        type="button"
        className="btn btn-dark"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={playPause}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
      <button
        onClick={handleStopClick}
        disabled={!isTimerRunning}
        type="button"
        className="btn btn-secondary"
        data-testid="stop"
        title="Stop the session"
      >
        <span className="oi oi-media-stop" />
      </button>
    </div>
  )
}

export default PlayPauseStop;