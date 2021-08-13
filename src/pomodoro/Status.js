import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function Status({ session, focusDuration, breakDuration, isTimerRunning }) {
  return (
    <div>
      {
        session ? (
          <React.Fragment>

            < div className="row mb-2">
              <div className="col">
                <h2 data-testid="session-title">
                  {(session.label === "Focusing")
                    ? session.label + " for " + minutesToDuration(focusDuration) + " minutes "
                    : session.label + " for " + minutesToDuration(breakDuration) + " minutes "

                  }</h2>

                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(session.timeRemaining)} remaining
                </p>
                {isTimerRunning ? "" : <h2>PAUSED</h2>}
              </div>
            </div>

            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={
                      100 -
                      (100 * session.timeRemaining) /
                      (session.label === "Focusing"
                        ? focusDuration * 60
                        : breakDuration * 60)
                    }
                    style={{
                      width: `${100 -
                        (100 * session.timeRemaining) /
                        (session.label === "Focusing"
                          ? focusDuration * 60
                          : breakDuration * 60)
                        }%`,
                    }}



                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null
      }
    </div>
  )
}

export default Status;