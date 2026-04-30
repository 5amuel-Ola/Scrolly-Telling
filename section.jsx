import React, { useEffect, useMemo, useState } from "react";
import SleepVisuals from "./SleepVisuals";

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const TOTAL_STAGES = 6;

export default function Section({
  stage,
  index,
  globalProgress,
  globalIntensity,
  velocity,
  activeIndex,
  pulseCount,
  resetProgress
}) {
  const [isPulsing, setIsPulsing] = useState(false);
  const isActive = activeIndex === index;

  useEffect(() => {
    if (!isActive || pulseCount === 0 || index < 3) {
      return undefined;
    }

    setIsPulsing(true);
    const timeoutId = window.setTimeout(() => setIsPulsing(false), 150);

    return () => window.clearTimeout(timeoutId);
  }, [isActive, pulseCount, index]);

  const stageStart = index / TOTAL_STAGES;
  const stageEnd = (index + 1) / TOTAL_STAGES;
  const stageProgress = clamp01((globalProgress - stageStart) / (stageEnd - stageStart));
  const stageIntensity = index === 0 ? 0 : clamp01(globalIntensity * (0.35 + stageProgress * 0.75));
  const waveformA = Math.sin((globalProgress * 26 + index * 0.9) * Math.PI);
  const waveformB = Math.cos((globalProgress * 19 + index * 0.75) * Math.PI);
  const effectiveReset = index === TOTAL_STAGES - 1 ? resetProgress : 0;
  const fadeOut = 1 - effectiveReset;
  const enterProgress = index === 0 ? 1 : clamp01(stageProgress / 0.26);
  const exitProgress = index === TOTAL_STAGES - 1 ? 1 : clamp01((1 - stageProgress) / 0.22);
  const stageVisibility = Math.min(enterProgress, exitProgress);
  const stageShiftY = (1 - enterProgress) * 12 - (1 - exitProgress) * 6;
  const stageScale = 0.975 + stageVisibility * 0.025;

  const effects = useMemo(() => {
    const blur = index === 0 ? 0 : stageIntensity * [0, 1.8, 2.8, 3.8, 4.8, 6.5][index] * fadeOut;
    const lagX = index >= 1 ? waveformA * stageIntensity * [0, 6, 9, 11, 13, 16][index] * fadeOut : 0;
    const lagY = index >= 1 ? waveformB * stageIntensity * [0, 4, 6, 7, 9, 12][index] * fadeOut : 0;
    const jitterX = index >= 2 ? waveformA * stageIntensity * [0, 0, 7, 9, 12, 15][index] * fadeOut : 0;
    const jitterY = index >= 2 ? waveformB * stageIntensity * [0, 0, 5, 6, 8, 10][index] * fadeOut : 0;
    const misalign = index >= 2 ? clamp01(stageIntensity * 0.8 + stageProgress * 0.2) * fadeOut : 0;
    const flicker = index >= 3 ? clamp01(stageIntensity * 0.24 + (waveformA > 0.92 ? 0.22 : 0)) * fadeOut : 0;
    const blackout = index >= 3 && isActive ? clamp01((waveformB > 0.978 ? 0.58 : 0) + (isPulsing ? 0.12 : 0)) * fadeOut : 0;
    const noise = index >= 3 ? clamp01(stageIntensity * 0.18 + velocity * 0.22) * fadeOut : 0;
    const rgb = index >= 4 ? (4 + stageIntensity * 14) * fadeOut : 0;
    const distortion = index >= 4 ? clamp01(stageIntensity * 0.8 + velocity * 0.35) * fadeOut : 0;
    const pulseShift = isPulsing && index >= 3 ? Math.min(14, 5 + velocity * 18) : 0;
    const chaos = index === TOTAL_STAGES - 1 ? clamp01(stageProgress * 1.2) * fadeOut : 0;
    const narrativeOpacity = index === TOTAL_STAGES - 1 ? clamp01(1 - effectiveReset * 1.25) : 1;
    const resetOpacity = index === TOTAL_STAGES - 1 ? clamp01((effectiveReset - 0.2) / 0.8) : 0;

    return {
      blur,
      lagX,
      lagY,
      jitterX,
      jitterY,
      misalign,
      flicker,
      blackout,
      noise,
      rgb,
      distortion,
      pulseShift,
      chaos,
      narrativeOpacity,
      resetOpacity
    };
  }, [effectiveReset, fadeOut, index, isActive, isPulsing, stageIntensity, stageProgress, velocity, waveformA, waveformB]);

  const style = {
    "--stage-progress": stageProgress.toFixed(3),
    "--stage-intensity": stageIntensity.toFixed(3),
    "--stage-blur": `${effects.blur.toFixed(2)}px`,
    "--stage-lag-x": `${effects.lagX.toFixed(2)}px`,
    "--stage-lag-y": `${effects.lagY.toFixed(2)}px`,
    "--stage-jitter-x": `${effects.jitterX.toFixed(2)}px`,
    "--stage-jitter-y": `${effects.jitterY.toFixed(2)}px`,
    "--stage-misalign": effects.misalign.toFixed(3),
    "--stage-flicker": effects.flicker.toFixed(3),
    "--stage-blackout": effects.blackout.toFixed(3),
    "--stage-noise": effects.noise.toFixed(3),
    "--stage-rgb": `${effects.rgb.toFixed(2)}px`,
    "--stage-distortion": effects.distortion.toFixed(3),
    "--stage-pulse": `${effects.pulseShift.toFixed(2)}px`,
    "--stage-chaos": effects.chaos.toFixed(3),
    "--stage-copy-opacity": effects.narrativeOpacity.toFixed(3),
    "--stage-reset-opacity": effects.resetOpacity.toFixed(3),
    "--stage-visibility": stageVisibility.toFixed(3),
    "--stage-shift-y": `${stageShiftY.toFixed(2)}vh`,
    "--stage-scale": stageScale.toFixed(3),
    "--reset-progress": effectiveReset.toFixed(3),
    "--float-offset": `${Math.max(-20, (1 - stageProgress) * 12)}vh`
  };

  return (
    <section
      className={[
        "sleep-segment",
        `sleep-segment--${stage.id}`,
        stage.surface === "dark" ? "sleep-segment--dark" : "sleep-segment--light",
        isActive ? "is-active" : "",
        isPulsing ? "is-pulsing" : ""
      ].filter(Boolean).join(" ")}
      style={style}
      aria-labelledby={`sleep-stage-title-${index}`}
    >
      <div className="sleep-segment__stage">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="sleep-segment__noise" aria-hidden="true" />
        <div className="sleep-segment__blackout" aria-hidden="true" />

        <div className="sleep-layout-wrapper">
          <div className={`sleep-layout${index % 2 === 1 ? " sleep-layout--reversed" : ""}`}>
            <div className="sleep-layout__content">
              <article className="sleep-panel glass-panel">
                <div className="sleep-panel__copy">
                  <p className="sleep-stage__eyebrow">{stage.hours}</p>

                  <div className="sleep-stage__headline">
                    <h2 className="sleep-stage__title" id={`sleep-stage-title-${index}`}>
                      <span className="sleep-stage__title-main">{stage.title}</span>
                      <span className="sleep-stage__title-ghost" aria-hidden="true">{stage.title}</span>
                    </h2>
                    <p className="sleep-stage__dek">{stage.deck}</p>
                  </div>

                  <p className="sleep-stage__body">{stage.body}</p>

                  <div className="sleep-stage__local-meter" aria-hidden="true">
                    <span style={{ transform: `scaleX(${Math.max(stageProgress, 0.02)})` }} />
                  </div>

                  <p className="sleep-stage__note">Active effect: {stage.cue}</p>
                </div>

                {stage.finalTitle ? (
                  <div className="sleep-stage__reset-block" aria-live="polite">
                    <p className="sleep-stage__reset-label">Hard reset</p>
                    <h3 className="sleep-stage__reset-title">{stage.finalTitle}</h3>
                    <p className="sleep-stage__reset-body">{stage.finalBody}</p>
                  </div>
                ) : null}
              </article>
            </div>

            <aside className="sleep-layout__aside">
              <div className="sleep-diagnostic glass-panel">
                <div className="sleep-diagnostic__visual">
                  <SleepVisuals 
                    stage={stage}
                    index={index}
                    stageProgress={stageProgress}
                    stageIntensity={stageIntensity}
                  />
                </div>
                <p className="sleep-diagnostic__eyebrow">Observed degradation</p>
                <div className="sleep-diagnostic__stats">
                  <div className="sleep-diagnostic__stat">
                    <span className="sleep-diagnostic__label">Stage load</span>
                    <strong className="sleep-diagnostic__value">{Math.round(stageProgress * 100)}%</strong>
                  </div>
                  <div className="sleep-diagnostic__stat">
                    <span className="sleep-diagnostic__label">Global intensity</span>
                    <strong className="sleep-diagnostic__value">{Math.round(globalIntensity * 100)}%</strong>
                  </div>
                </div>

                <ul className="sleep-diagnostic__list">
                  {stage.signals.map((signal) => (
                    <li key={signal} className="sleep-diagnostic__item">{signal}</li>
                  ))}
                </ul>

                <p className="sleep-diagnostic__cue">{stage.kicker}</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}