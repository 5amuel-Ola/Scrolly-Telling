import React from "react";

export default function StageWheel({ progress, activeIndex, stages }) {
  const hoursLabel = progress >= 0.985 ? "72h+" : `${Math.round(progress * 72)}h`;
  const radius = 45;
  const centerX = 60;
  const centerY = 60;

  // Calculate positions for 6 stages around a circle
  const points = stages.map((stage, index) => {
    const angle = (index / stages.length) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, index };
  });

  return (
    <div className="stage-wheel" aria-label="Sleep deprivation stage indicator">
      <svg className="stage-wheel__svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232, 196, 125, 0.1)" />
            <stop offset="100%" stopColor="rgba(124, 159, 176, 0.1)" />
          </radialGradient>
        </defs>

        {/* Outer circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 8}
          fill="none"
          stroke="rgba(232, 196, 125, 0.2)"
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="url(#wheelGradient)"
          stroke="rgba(232, 196, 125, 0.15)"
          strokeWidth="1.5"
        />

        {/* Progress arc */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="rgba(232, 196, 125, 0.4)"
          strokeWidth="2"
          strokeDasharray={`${(progress * Math.PI * 2 * radius).toFixed(2)} ${(Math.PI * 2 * radius).toFixed(2)}`}
          strokeLinecap="round"
          strokeDashoffset={`${(-Math.PI * radius / 2).toFixed(2)}`}
          style={{ transition: "stroke-dasharray 0.3s ease-out" }}
        />

        {/* Stage dots */}
        {points.map((point) => (
          <g key={point.index}>
            {/* Connection line from dot to center */}
            <line
              x1={point.x}
              y1={point.y}
              x2={centerX}
              y2={centerY}
              stroke={point.index < activeIndex ? "rgba(232, 196, 125, 0.3)" : "rgba(124, 159, 176, 0.15)"}
              strokeWidth="1"
              opacity={point.index <= activeIndex ? 0.6 : 0.2}
            />

            {/* Dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r={point.index === activeIndex ? 4.5 : 3}
              fill={point.index === activeIndex ? "#e8c77d" : point.index < activeIndex ? "#d4a574" : "#7c9fb0"}
              opacity={point.index <= activeIndex ? 1 : 0.5}
              style={{
                transition: "r 0.3s ease-out, fill 0.3s ease-out",
                filter: point.index === activeIndex ? "drop-shadow(0 0 6px rgba(232, 196, 125, 0.6))" : "none"
              }}
            />

            {/* Stage number label */}
            <text
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fill={point.index === activeIndex ? "#e8e4df" : "rgba(232, 196, 125, 0.4)"}
              fontWeight={point.index === activeIndex ? "700" : "400"}
              opacity={point.index === activeIndex ? 1 : 0.5}
              pointerEvents="none"
            >
              {point.index + 1}
            </text>
          </g>
        ))}

        {/* Center text */}
        <g>
          <text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="18"
            fontWeight="600"
            fill="#e8c77d"
            fontFamily="var(--font-display)"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </text>
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="rgba(232, 196, 125, 0.8)"
            fontFamily="var(--font-sans)"
          >
            {hoursLabel}
          </text>
        </g>
      </svg>
    </div>
  );
}
