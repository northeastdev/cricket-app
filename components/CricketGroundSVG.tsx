"use client"

import { useState, useMemo } from 'react';

export default function CricketGroundSVG() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  const centerX = 500;
  const centerY = 350;
  const radius = 300;

  // Pre-calculate positions with fixed coordinates
  const positions = useMemo(() => [
    { name: "Point", color: "#000000", startAngle: -3, endAngle: 35 },
    { name: "Third Man", color: "#000000", startAngle: 35, endAngle: 90 },
    { name: "Fine Leg", color: "#000000", startAngle: 90, endAngle: 145 },
    { name: "Square Leg", color: "#000000", startAngle: 145, endAngle: 185 },
    { name: "Mid Wicket", color: "#000000", startAngle: 185, endAngle: 225 },
    { name: "Long On", color: "#000000", startAngle: 225, endAngle: 270 },
    { name: "Long Off", color: "#000000", startAngle: 270, endAngle: 315 },
    { name: "Cover", color: "#000000", startAngle: 315, endAngle: 357 },
  ].map(pos => {
    const angle = ((pos.startAngle + pos.endAngle) / 2 * Math.PI) / 180;
    return {
      ...pos,
      labelX: Number((centerX + Math.cos(angle) * (radius - 60)).toFixed(2)),
      labelY: Number((centerY + Math.sin(angle) * (radius - 60)).toFixed(2))
    };
  }), []);

  const getWedgePath = (startAngle: number, endAngle: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    const x1 = Number((centerX + radius * Math.cos(start)).toFixed(2));
    const y1 = Number((centerY + radius * Math.sin(start)).toFixed(2));
    const x2 = Number((centerX + radius * Math.cos(end)).toFixed(2));
    const y2 = Number((centerY + radius * Math.sin(end)).toFixed(2));
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      <svg width={1000} height={700} viewBox="0 0 1000 700">
        {/* Main Field */}
        <circle cx={centerX} cy={centerY} r={radius} fill="#4CAF50" />

        {/* Wedges */}
        {positions.map((pos) => (
          <path
            key={pos.name}
            d={getWedgePath(pos.startAngle, pos.endAngle)}
            fill={`${pos.color}${hoveredPosition === pos.name ? '40' : '10'}`}
            stroke="#fff"
            strokeDasharray="7 3"
            strokeWidth="1"
            onClick={() => setSelectedPosition(pos.name)}
            onMouseEnter={() => setHoveredPosition(pos.name)}
            onMouseLeave={() => setHoveredPosition(null)}
            style={{ cursor: 'pointer' }} // Make wedges clickable
          />
        ))}

        {/* Pitch */}
        <rect x={470} y={255} width={60} height={190} fill="#cfb088" />
        <line x1={459} y1={255} x2={540} y2={255} stroke="#fff" strokeWidth="2" />
        <text x={460} y={220} fontSize="14" fill="#212120">Bowlers End</text>
        <line x1={459} y1={446} x2={540} y2={446} stroke="#fff" strokeWidth="2" />
        <text x={460} y={465} fontSize="15" fill="#212120">Batters End</text>

        {/* Orientation Labels */}
        <text x={650} y={centerY} textAnchor="middle" dominantBaseline="middle" opacity={0.7} fontSize="14" fill="#fff">OFF SIDE</text>
        <text x={350} y={centerY} textAnchor="middle" dominantBaseline="middle" opacity={0.7} fontSize="14" fill="#fff">ON SIDE</text>

        {/* Batsman & Bowler */}
        <rect x={492} y={435} width={15} height={20} fill="#2c3e50" />
        <line x1={500} y1={245} x2={500} y2={265} stroke="#2c3e50" strokeWidth="4" strokeLinecap="round" />

        {/* Position Labels */}
        {positions.map((pos) => (
          <text
            key={pos.name}
            x={pos.labelX}
            y={pos.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fill="#fff"
            fontWeight="bold"
          >
            {pos.name}
          </text>
        ))}
      </svg>

      <div className="mt-4 p-3 bg-white rounded-lg shadow-md text-center">
        {selectedPosition ? (
          <p className="text-sm text-gray-600">
            Selected Position: <strong>{selectedPosition}</strong>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Click any colored wedge to select fielding position
          </p>
        )}
      </div>
    </div>
  );
};