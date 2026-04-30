import React, { useEffect, useState } from "react";

export default function FatigueMeter({ progress, intensity, activeIndex, pulseCount, stages }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (pulseCount === 0) {
      return undefined;
    }

    setGlitch(true);
    const timeoutId = window.setTimeout(() => setGlitch(false), 180);

    return () => window.clearTimeout(timeoutId);
  }, [pulseCount]);

  const hoursLabel = progress >= 0.985 ? "72h+" : `${Math.round(progress * 72)}h`;

  return (
    <aside
      className={`fatigue-meter presentation-progress${glitch ? " fatigue-meter--glitch" : ""}`}
      aria-label="Fatigue meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      role="progressbar"
    >
      <div className="fatigue-meter__chrome">
        <div className="fatigue-meter__heading-row">
          <div>
            <p className="fatigue-meter__eyebrow">System telemetry</p>
            <p className="fatigue-meter__status">{hoursLabel} awake</p>
          </div>

          <div className="fatigue-meter__count presentation-progress__count" aria-hidden="true">
            <span className="presentation-progress__count-current">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="presentation-progress__count-separator">/</span>
            <span className="presentation-progress__count-total">06</span>
          </div>
        </div>

        <div className="fatigue-meter__track" aria-hidden="true">
          <span className="fatigue-meter__fill" style={{ transform: `scaleX(${Math.max(progress, 0.015)})` }} />
          <span className="fatigue-meter__spark" style={{ left: `calc(${Math.max(progress, 0.015)} * 100%)` }} />
        </div>

        <div className="fatigue-meter__steps" aria-hidden="true">
          {stages.map((stage, index) => (
            <span
              key={stage.id}
              className={[
                "fatigue-meter__step",
                index < activeIndex ? "fatigue-meter__step--complete" : "",
                index === activeIndex ? "fatigue-meter__step--active" : ""
              ].filter(Boolean).join(" ")}
              title={stage.hours}
            />
          ))}
        </div>

        <div className="fatigue-meter__footer">
          <span className="fatigue-meter__meta">{stages[activeIndex].cue}</span>
          <span className="fatigue-meter__meta">Intensity {Math.round(intensity * 100)}%</span>
        </div>
      </div>
    </aside>
  );
}