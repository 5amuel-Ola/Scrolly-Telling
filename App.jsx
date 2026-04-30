import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./section";
import StageWheel from "./StageWheel";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "baseline",
    hours: "0-12h",
    kicker: "Stage 01 / Baseline",
    title: "The interface is calm.",
    deck: "The first section stays intentionally clean so the decline has a trustworthy baseline.",
    body: "Reaction time is still plausible. Sentences hold their grid. Scroll begins without distortion, blur, or interference.",
    signals: ["Attention tracks one target.", "No latency in copy or motion.", "The fatigue meter fills, but the screen stays stable."],
    cue: "No visible artifacts.",
    surface: "light"
  },
  {
    id: "drift",
    hours: "12-24h",
    kicker: "Stage 02 / Drift",
    title: "Latency starts to creep in.",
    deck: "Small blur and delayed movement make the page feel just slightly behind the scroll.",
    body: "This is the first believable failure mode: not collapse, just softened edges and a subtle lag between intention and execution.",
    signals: ["Micro blur enters the panel.", "Copy trails the scroll by a fraction.", "Fatigue load crosses from normal to noticeable."],
    cue: "Slight blur and delay.",
    surface: "light"
  },
  {
    id: "misalignment",
    hours: "24-36h",
    kicker: "Stage 03 / Misalignment",
    title: "Attention begins to fray.",
    deck: "Typography jitters, alignment drifts, and the layout stops feeling mechanically precise.",
    body: "The content remains readable, but the certainty is gone. Titles lean off center. Panels resist the grid they began with.",
    signals: ["Text jitter appears on scroll.", "Headline alignment starts to slip.", "Spatial confidence breaks before content does."],
    cue: "Jitter and misalignment.",
    surface: "light"
  },
  {
    id: "fracture",
    hours: "36-48h",
    kicker: "Stage 04 / Fracture",
    title: "Reality starts dropping frames.",
    deck: "Flicker, brief blackouts, and small jump cuts make the act of scrolling feel unreliable.",
    body: "This section introduces interruption. The page still obeys the narrative, but it now loses continuity in short, readable bursts.",
    signals: ["Brief blackouts punctuate the stage.", "Panels pulse with short jump cuts.", "The meter glitches on active scroll pulses."],
    cue: "Flicker, blackout, and jump cuts.",
    surface: "dark"
  },
  {
    id: "double-vision",
    hours: "48-72h",
    kicker: "Stage 05 / Double Vision",
    title: "The image splits.",
    deck: "RGB offsets and distortion pull the copy into a double-vision state without sacrificing legibility.",
    body: "The interface is still narrating, but every visual surface now behaves like a tired sensor: color bleed, ghosting, and unstable edges.",
    signals: ["Red-cyan separation enters the type.", "Card edges warp under scroll pressure.", "Noise overlays become continuously visible."],
    cue: "RGB split and distortion.",
    surface: "dark"
  },
  {
    id: "collapse",
    hours: "72h+",
    kicker: "Stage 06 / Collapse",
    title: "The system fails, then resets.",
    deck: "Chaos peaks in the final stretch and then the page strips everything back to one blunt instruction.",
    body: "At the edge of total deprivation the site becomes noisy, unstable, and visibly overloaded. In the last beats it hard resets to clean typography and one final message.",
    signals: ["Maximum chaos occupies the stage.", "Effects progressively drain out near the end.", "A clean final statement replaces the distortion."],
    cue: "Chaos, then a hard reset.",
    surface: "dark",
    finalTitle: "Sleep is not optional.",
    finalBody: "Seventy-two hours without sleep is not discipline. It is system failure. Stop scrolling. Rest."
  }
];

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const intensityEase = gsap.parseEase("power2.inOut");

function getStageIndex(progress) {
  return Math.min(STAGES.length - 1, Math.floor(clamp01(progress) * STAGES.length));
}

export default function App() {
  const containerRef = useRef(null);
  const previousProgressRef = useRef(0);
  const previousPulseAtRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPulse, setScrollPulse] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const nextProgress = clamp01(self.progress);
          const delta = Math.abs(nextProgress - previousProgressRef.current);
          const nextVelocity = clamp01(delta * 42);
          const now = performance.now();

          previousProgressRef.current = nextProgress;
          setProgress(nextProgress);
          setVelocity(nextVelocity);
          setActiveIndex(getStageIndex(nextProgress));

          if (delta > 0.002 && now - previousPulseAtRef.current > 140) {
            previousPulseAtRef.current = now;
            setScrollPulse((current) => current + 1);
          }
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeStage = STAGES[activeIndex];
  const globalIntensity = useMemo(() => {
    const normalized = clamp01((progress - 1 / STAGES.length) / (1 - 1 / STAGES.length));
    return intensityEase(normalized);
  }, [progress]);

  const resetProgress = useMemo(() => {
    const resetStart = 0.925;
    return progress <= resetStart ? 0 : clamp01((progress - resetStart) / (1 - resetStart));
  }, [progress]);

  const isResetting = activeIndex === STAGES.length - 1 && resetProgress > 0;
  const fatigueLabel = progress >= 0.985 ? "72h+" : `${Math.round(progress * 72)}h`;

  return (
    <div ref={containerRef} className={`sleep-site${isResetting ? " sleep-site--reset" : ""}`}>
      <header className="site-header sleep-site__header" style={{ display: "none" }}>
        <div className="site-header__inner">
          <div>
            <p className="site-header__eyebrow">Single-page scrollytelling experiment</p>
            <h1 className="site-header__title">72 Hours Without Sleep</h1>
          </div>

          <nav className="site-header__nav" aria-label="Current narrative stage">
            <span className="sleep-site__nav-label">{activeStage.kicker}</span>
            <span className="sleep-site__nav-separator">/</span>
            <span className="sleep-site__nav-label">{fatigueLabel} awake</span>
          </nav>
        </div>
      </header>

      <StageWheel
        progress={progress}
        activeIndex={activeIndex}
        stages={STAGES}
      />

      <main className="sleep-story" aria-label="72 Hours Without Sleep narrative">
        {STAGES.map((stage, index) => (
          <Section
            key={stage.id}
            stage={stage}
            index={index}
            globalProgress={progress}
            globalIntensity={globalIntensity}
            velocity={velocity}
            activeIndex={activeIndex}
            pulseCount={scrollPulse}
            resetProgress={resetProgress}
          />
        ))}
      </main>

      <footer className="site-footer site-footer--presentation sleep-site__footer" aria-label="Experience status">
        <div className="site-footer__inner--presentation">
          <div className="site-footer__folio">
            <span className="site-footer__folio-mark">Readable by design</span>
            <span className="site-footer__folio-separator">/</span>
            <span className="site-footer__folio-title">{activeStage.cue}</span>
          </div>

          <div className="site-footer__handouts">
            <p className="site-footer__eyebrow">Global intensity</p>
            <div className="sleep-site__footer-meter" aria-hidden="true">
              <span style={{ transform: `scaleX(${Math.max(globalIntensity, 0.02)})` }} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}