import React from "react";

const stageFiveSpeckles = Array.from({ length: 10 }, (_, index) => ({
  x: 84 + ((index * 19) % 110),
  y: 88 + ((index * 29) % 104),
  radius: 1.2 + (index % 3) * 0.65,
  phase: index * 0.68,
}));

const stageSixParticles = Array.from({ length: 42 }, (_, index) => ({
  orbit: 36 + ((index * 17) % 92),
  angle: (index / 42) * Math.PI * 2,
  drift: 0.5 + (index % 5) * 0.18,
  radius: 1.4 + (index % 4) * 0.6,
  tint: index % 3,
}));

function tintForParticle(tint) {
  if (tint === 0) {
    return "rgba(232, 196, 125, 0.42)";
  }

  if (tint === 1) {
    return "rgba(124, 159, 176, 0.3)";
  }

  return "rgba(232, 196, 125, 0.24)";
}

export default function SleepVisuals({ index, stageProgress, stageIntensity }) {
  if (index === 0) {
    return (
      <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
        <defs>
          <radialGradient id="moonGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#e8c77d" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#d4a574" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b8956a" stopOpacity="0.2" />
          </radialGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="twinkleStar">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        <rect width="280" height="280" fill="rgba(15, 20, 30, 0.8)" />
        <circle cx="30" cy="35" r="1.2" fill="#e8c77d" opacity={0.6 + Math.sin(stageProgress * 4) * 0.2} filter="url(#twinkleStar)" />
        <circle cx="240" cy="28" r="0.85" fill="#e8c77d" opacity={0.5 + Math.cos(stageProgress * 3.5) * 0.15} filter="url(#twinkleStar)" />
        <circle cx="70" cy="18" r="1.1" fill="#e8c77d" opacity={0.45 + Math.sin(stageProgress * 3.8 + 1) * 0.2} filter="url(#twinkleStar)" />
        <circle cx="200" cy="45" r="0.9" fill="#e8c77d" opacity={0.55 + Math.cos(stageProgress * 3.2 + 2) * 0.15} filter="url(#twinkleStar)" />
        <circle cx="250" cy="65" r="0.7" fill="#e8c77d" opacity={0.4 + Math.sin(stageProgress * 4.1 + 0.5) * 0.15} filter="url(#twinkleStar)" />
        <circle cx="20" cy="80" r="1" fill="#d4a574" opacity={0.5 + Math.cos(stageProgress * 3.7 + 1.5) * 0.15} filter="url(#twinkleStar)" />
        <circle cx="220" cy="70" r="42" fill="url(#moonGradient)" filter="url(#softGlow)" />
        <circle cx="210" cy="60" r="4" fill="rgba(0, 0, 0, 0.2)" opacity="0.4" />
        <circle cx="225" cy="75" r="3" fill="rgba(0, 0, 0, 0.15)" opacity="0.3" />
        <circle cx="235" cy="65" r="2.5" fill="rgba(0, 0, 0, 0.1)" opacity="0.2" />

        <g opacity="0.3">
          <rect x="40" y="180" width="180" height="80" rx="12" fill="rgba(232, 196, 125, 0.1)" stroke="rgba(232, 196, 125, 0.25)" strokeWidth="2" />
          <ellipse cx="75" cy="185" rx="28" ry="18" fill="rgba(232, 196, 125, 0.08)" stroke="rgba(232, 196, 125, 0.2)" strokeWidth="1.5" />
          <ellipse cx="140" cy="185" rx="30" ry="16" fill="rgba(232, 196, 125, 0.06)" stroke="rgba(232, 196, 125, 0.18)" strokeWidth="1.5" />
        </g>

        <g opacity="0.25">
          <rect x="230" y="160" width="12" height="50" rx="3" fill="rgba(184, 149, 106, 0.4)" />
          <circle cx="236" cy="155" r="16" fill="rgba(232, 196, 125, 0.15)" stroke="rgba(232, 196, 125, 0.2)" strokeWidth="1" />
        </g>

        <g opacity="0.15">
          <rect x="250" y="120" width="20" height="35" fill="rgba(232, 196, 125, 0.08)" stroke="rgba(232, 196, 125, 0.15)" strokeWidth="1" />
          <line x1="260" y1="120" x2="260" y2="155" stroke="rgba(232, 196, 125, 0.12)" strokeWidth="0.5" />
          <line x1="250" y1="137.5" x2="270" y2="137.5" stroke="rgba(232, 196, 125, 0.12)" strokeWidth="0.5" />
        </g>
      </svg>
    );
  }

  if (index === 1) {
    const wavePhase = stageProgress * Math.PI * 4;

    return (
      <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
        <defs>
          <filter id="driftBlur">
            <feGaussianBlur stdDeviation={0.5 + stageProgress * 3.5} />
          </filter>
          <filter id="haze">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <rect width="280" height="280" fill="rgba(15, 20, 30, 0.7)" filter="url(#haze)" />
        <path d="M 0 100 Q 70 90 140 105 T 280 100" stroke="rgba(232, 196, 125, 0.25)" strokeWidth="3" fill="none" filter="url(#driftBlur)" opacity={0.8 - stageProgress * 0.2} />
        <path d="M 0 140 Q 70 145 140 135 T 280 140" stroke="rgba(124, 159, 176, 0.18)" strokeWidth="2.5" fill="none" filter="url(#driftBlur)" opacity={0.6 - stageProgress * 0.2} />
        <path d="M 0 180 Q 70 175 140 185 T 280 180" stroke="rgba(232, 196, 125, 0.15)" strokeWidth="2" fill="none" filter="url(#driftBlur)" opacity="0.4" />
        <circle cx={100 + Math.sin(wavePhase) * 30} cy={80 + Math.cos(wavePhase * 0.7) * 25} r={20 + stageProgress * 8} fill="rgba(124, 159, 176, 0.08)" filter="url(#driftBlur)" opacity={0.7 - stageProgress * 0.3} />
        <circle cx={180 - Math.sin(wavePhase * 1.3) * 25} cy={150 + Math.cos(wavePhase * 0.5) * 30} r={16 + stageProgress * 6} fill="rgba(232, 196, 125, 0.06)" filter="url(#driftBlur)" opacity={0.5 - stageProgress * 0.25} />
        <text x="140" y="220" textAnchor="middle" fontSize="18" fontWeight="300" fill="rgba(232, 196, 125, 0.5)" opacity={Math.max(0, 1 - stageProgress * 0.8)} filter="url(#driftBlur)" letterSpacing="4">
          z z z
        </text>
        <circle cx={60 + Math.sin(wavePhase * 1.5) * 40} cy="120" r="3" fill="rgba(232, 196, 125, 0.2)" opacity={0.5 - stageProgress * 0.3} filter="url(#driftBlur)" />
        <circle cx={220 - Math.cos(wavePhase * 1.2) * 35} cy="100" r="2.5" fill="rgba(124, 159, 176, 0.2)" opacity={0.4 - stageProgress * 0.2} filter="url(#driftBlur)" />
      </svg>
    );
  }

  if (index === 2) {
    const turbulenceSeed = Math.round(stageProgress * 200);
    const goldStroke = `rgba(232, 196, 125, ${0.18 + stageProgress * 0.12})`;
    const coolStroke = `rgba(124, 159, 176, ${0.14 + stageProgress * 0.08})`;

    return (
      <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
        <defs>
          <filter id="jitterFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" seed={turbulenceSeed} />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={12 + stageProgress * 25} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="strongJitter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise" seed={turbulenceSeed + 7} />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={8 + stageProgress * 20} />
          </filter>
        </defs>

        {Array.from({ length: 5 }, (_, lineIndex) => (
          <line
            key={`v-${lineIndex}`}
            x1={30 + lineIndex * 50 + Math.sin((stageProgress + lineIndex * 0.4) * Math.PI * 3) * 12}
            y1="20"
            x2={30 + lineIndex * 50 + Math.cos((stageProgress + lineIndex * 0.3) * Math.PI * 2.5) * 10}
            y2="260"
            stroke={goldStroke}
            strokeWidth="2.5"
            filter="url(#jitterFilter)"
            opacity={0.5 + stageProgress * 0.3}
          />
        ))}
        {Array.from({ length: 5 }, (_, lineIndex) => (
          <line
            key={`h-${lineIndex}`}
            x1="20"
            y1={30 + lineIndex * 50 + Math.sin((stageProgress + lineIndex * 0.5) * Math.PI * 2.8) * 15}
            x2="260"
            y2={30 + lineIndex * 50 + Math.cos((stageProgress + lineIndex * 0.4) * Math.PI * 2.2) * 12}
            stroke={coolStroke}
            strokeWidth="2"
            filter="url(#jitterFilter)"
            opacity={0.4 + stageProgress * 0.25}
          />
        ))}
        <line x1="40" y1="40" x2={240 + Math.sin(stageProgress * Math.PI * 4) * 20} y2={240 + Math.cos(stageProgress * Math.PI * 3.5) * 25} stroke="rgba(232, 196, 125, 0.12)" strokeWidth="1.5" filter="url(#strongJitter)" opacity={stageProgress * 0.4} />
        <line x1="240" y1="40" x2={40 - Math.sin(stageProgress * Math.PI * 3.5) * 15} y2={240 + Math.sin(stageProgress * Math.PI * 4.2) * 20} stroke="rgba(124, 159, 176, 0.1)" strokeWidth="1.5" filter="url(#strongJitter)" opacity={stageProgress * 0.3} />
        {Array.from({ length: 4 }, (_, circleIndex) => (
          <circle
            key={`strain-${circleIndex}`}
            cx={70 + circleIndex * 60}
            cy={140 + Math.sin((stageProgress + circleIndex * 0.6) * Math.PI * 5) * 20}
            r={6 + stageProgress * 3}
            fill="none"
            stroke="rgba(232, 196, 125, 0.2)"
            strokeWidth="1"
            filter="url(#jitterFilter)"
            opacity={0.3 + stageProgress * 0.3}
          />
        ))}
      </svg>
    );
  }

  if (index === 3) {
    const fracturePhase = stageProgress * Math.PI * 6;

    return (
      <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
        <defs>
          <filter id="sharpFracture">
            <feGaussianBlur stdDeviation={1 + stageProgress * 0.5} />
          </filter>
        </defs>

        {Array.from({ length: 8 }, (_, fractureIndex) => {
          const angle = (fractureIndex / 8) * Math.PI * 2;
          const length = 90 + Math.sin(fracturePhase + fractureIndex) * 20;

          return (
            <line
              key={`fracture-${fractureIndex}`}
              x1="140"
              y1="140"
              x2={140 + Math.cos(angle) * length}
              y2={140 + Math.sin(angle) * length}
              stroke={`rgba(232, 196, 125, ${0.3 + stageProgress * 0.2})`}
              strokeWidth={2 + stageProgress * 1.5}
              filter="url(#sharpFracture)"
              opacity={0.5 + stageProgress * 0.4}
            />
          );
        })}
        {Array.from({ length: 6 }, (_, crackIndex) => {
          const angle = (crackIndex / 6) * Math.PI * 2 + Math.PI / 12;
          const x1 = 140 + Math.cos(angle) * 50;
          const y1 = 140 + Math.sin(angle) * 50;
          const branch = Math.sin(fracturePhase + crackIndex * 0.7) * 40;

          return (
            <line
              key={`crack-${crackIndex}`}
              x1={x1}
              y1={y1}
              x2={x1 + Math.cos(angle) * branch}
              y2={y1 + Math.sin(angle) * branch}
              stroke={`rgba(124, 159, 176, ${0.2 + stageProgress * 0.15})`}
              strokeWidth="1.5"
              filter="url(#sharpFracture)"
              opacity={0.4 + stageProgress * 0.3}
            />
          );
        })}
        {Array.from({ length: 12 }, (_, shardIndex) => {
          const angle = (shardIndex / 12) * Math.PI * 2;
          const distance = 60 + Math.sin(fracturePhase + shardIndex) * 30;
          const centerX = 140 + Math.cos(angle) * distance;
          const centerY = 140 + Math.sin(angle) * distance;
          const size = 8 + Math.sin(fracturePhase + shardIndex * 0.5) * 4;

          return (
            <polygon
              key={`shard-${shardIndex}`}
              points={`${centerX},${centerY - size} ${centerX + size * 0.866},${centerY + size * 0.5} ${centerX - size * 0.866},${centerY + size * 0.5}`}
              fill={`rgba(232, 196, 125, ${0.1 + stageProgress * 0.12})`}
              stroke={`rgba(232, 196, 125, ${0.25 + stageProgress * 0.2})`}
              strokeWidth="1"
              opacity={0.6 + stageProgress * 0.3}
            />
          );
        })}
        <circle cx="140" cy="140" r={30 + stageProgress * 10} fill="none" stroke="rgba(232, 196, 125, 0.2)" strokeWidth="2" opacity={0.5 + stageProgress * 0.3} />
      </svg>
    );
  }

  if (index === 4) {
    const rgbShift = 8 + stageProgress * 12;
    const floatPhase = stageProgress * Math.PI * 3;

    return (
      <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
        <defs>
          <filter id="chromatic">
            <feGaussianBlur stdDeviation={1 + stageProgress * 1.5} />
          </filter>
        </defs>

        <circle cx={130 + rgbShift} cy={140 + Math.sin(floatPhase) * 15} r={45 + stageProgress * 15} fill="none" stroke={`rgba(232, 196, 125, ${0.35 + stageProgress * 0.25})`} strokeWidth={3 + stageProgress} opacity="0.8" filter="url(#chromatic)" />
        <circle cx={140 + Math.cos(floatPhase * 1.3) * 5} cy={140 + Math.sin(floatPhase * 0.9) * 10} r={45 + stageProgress * 15} fill="none" stroke="rgba(124, 159, 176, 0.4)" strokeWidth={3 + stageProgress} opacity="0.75" filter="url(#chromatic)" />
        <circle cx={150 - rgbShift} cy={140 + Math.sin(floatPhase * 1.5) * 12} r={45 + stageProgress * 15} fill="none" stroke={`rgba(232, 196, 125, ${0.25 + stageProgress * 0.15})`} strokeWidth={3 + stageProgress} opacity="0.7" filter="url(#chromatic)" />
        <text x={60 + stageProgress * 8} y="220" fontSize={14 + stageProgress * 4} fill="rgba(232, 196, 125, 0.4)" opacity={0.8 - stageProgress * 0.15} filter="url(#chromatic)" letterSpacing="2">
          BLUR
        </text>
        <text x={65 + stageProgress * 12} y="224" fontSize={14 + stageProgress * 4} fill="rgba(124, 159, 176, 0.3)" opacity={0.5 - stageProgress * 0.1} filter="url(#chromatic)" letterSpacing="2">
          BLUR
        </text>
        <circle cx="140" cy="140" r={20 + stageProgress * 20} fill="none" stroke="rgba(232, 196, 125, 0.2)" strokeWidth="2" opacity="0.6" />
        {stageFiveSpeckles.map((speckle, speckleIndex) => (
          <circle
            key={`speckle-${speckleIndex}`}
            cx={speckle.x + Math.sin(floatPhase + speckle.phase) * 18}
            cy={speckle.y + Math.cos(floatPhase * 0.9 + speckle.phase) * 12}
            r={speckle.radius}
            fill="rgba(232, 196, 125, 0.5)"
            opacity={stageProgress * (0.32 + (speckleIndex % 3) * 0.08)}
          />
        ))}
      </svg>
    );
  }

  const chaosScale = stageProgress < 0.7 ? stageProgress : 1 - stageProgress;
  const resetScale = stageProgress > 0.7 ? (stageProgress - 0.7) / 0.3 : 0;
  const chaosPhase = stageProgress * Math.PI * 8;
  const recoveryStrength = Math.max(stageIntensity, resetScale);

  return (
    <svg className="sleep-visual" viewBox="0 0 280 280" aria-hidden="true">
      <defs>
        <filter id="chaosFilter">
          <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="4" result="noise" seed={Math.round(stageProgress * 240)} />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={30 * chaosScale} />
        </filter>
        <filter id="recoveryGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {stageSixParticles.map((particle, particleIndex) => {
        const orbitX = 140 + Math.cos(chaosPhase * particle.drift + particle.angle) * particle.orbit;
        const orbitY = 140 + Math.sin(chaosPhase * (particle.drift + 0.18) + particle.angle) * (particle.orbit * 0.78);

        return (
          <circle
            key={`particle-${particleIndex}`}
            cx={orbitX}
            cy={orbitY}
            r={particle.radius}
            fill={tintForParticle(particle.tint)}
            filter="url(#chaosFilter)"
            opacity={Math.max(0, chaosScale * (0.52 + (particleIndex % 4) * 0.08) - (stageProgress - 0.35) * 0.8)}
          />
        );
      })}

      <circle cx="140" cy="140" r={20 + resetScale * 50} fill="none" stroke={`rgba(232, 196, 125, ${0.4 + recoveryStrength * 0.4})`} strokeWidth={2 + resetScale * 2} opacity={resetScale} filter="url(#recoveryGlow)" />
      <path d="M 110 140 L 125 155 L 165 115" stroke={`rgba(232, 196, 125, ${0.6 + recoveryStrength * 0.3})`} strokeWidth={4 + resetScale * 2} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={resetScale * 0.9} filter="url(#recoveryGlow)" />
      {Array.from({ length: 6 }, (_, rayIndex) => {
        const angle = (rayIndex / 6) * Math.PI * 2;
        const length = 40 + resetScale * 40;

        return (
          <line
            key={`ray-${rayIndex}`}
            x1="140"
            y1="140"
            x2={140 + Math.cos(angle) * length}
            y2={140 + Math.sin(angle) * length}
            stroke="rgba(232, 196, 125, 0.3)"
            strokeWidth="2"
            opacity={resetScale * 0.7}
            filter="url(#recoveryGlow)"
          />
        );
      })}
      <text x="140" y="220" textAnchor="middle" fontSize="16" fontWeight="500" fill="rgba(232, 196, 125, 0.5)" opacity={resetScale * 0.8} filter="url(#recoveryGlow)" letterSpacing="2">
        AWAKENED
      </text>
    </svg>
  );
}
