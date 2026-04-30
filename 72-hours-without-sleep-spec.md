# 72 Hours Without Sleep Spec

## Goal

Build a single-page scrollytelling website in React with GSAP ScrollTrigger that turns scroll progress into a readable simulation of escalating sleep deprivation over seventy-two hours.

## Functional Requirements

- The site is a single page with six scroll stages covering `0-12h`, `12-24h`, `24-36h`, `36-48h`, `48-72h`, and `72h+`.
- Each stage occupies a full-screen sticky presentation frame while the page scrolls through a taller narrative segment.
- A global scroll progress value from `0` to `1` drives the entire experience.
- A global intensity scaler derived from scroll progress modulates every visual effect.
- Stage 1 is visually clean.
- Stage 2 adds slight blur and delayed panel motion.
- Stage 3 adds readable jitter and layout misalignment.
- Stage 4 adds flicker, brief blackouts, and short jump-cut pulses tied to scroll pulses.
- Stage 5 adds RGB split, ghosting, and distortion without making the copy unreadable.
- Stage 6 peaks in controlled chaos and then hard resets to a clean final message.
- A fatigue meter fills continuously with global progress and glitches in response to scroll pulses.

## Design Requirements

- The visual system uses the reference project's editorial design tokens: warm paper background, serif display type, sans UI type, glass panels, bordered capsules, and presentation chrome.
- Layout language follows the reference presentation model: fixed header chrome, sticky full-screen stages, structured copy panels, and a footer status capsule.
- Typography remains legible at all stages, even when the interface is degraded.
- Mobile layouts collapse the two-column stage into a stacked layout without losing stage meaning.

## System Model

- `App.jsx` owns the stage definitions, global scroll progress, active stage index, intensity scaler, and scroll pulse counter.
- `section.jsx` maps each stage to local progress and applies stage-specific visual variables through CSS custom properties.
- `FatigueMeter.jsx` renders a fixed telemetry card that reflects global progress and reacts to scroll pulses.
- `Css.css` contains the reference-aligned design tokens, stage layouts, and bounded visual effects.
- `main.jsx`, `index.html`, `package.json`, and `vite.config.js` provide a minimal standalone Vite runtime for the site.

## Acceptance Criteria

- The project runs as a standalone React app with `npm install` and `npm run dev`.
- Scroll position updates the fatigue meter, stage copy, footer status, and effect intensity without layout breaks.
- Stage transitions happen in order and visibly match the six requested degradation states.
- The final stage visibly clears back to a clean, high-contrast closing message.
- The experience remains readable and responsive on desktop and mobile widths.