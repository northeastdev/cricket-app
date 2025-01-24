"use client";

import { Stage, Layer, Circle, Text, Rect, Shape, Line } from "react-konva";
import Konva from "konva";
import { useState } from "react";

const CricketGround = () => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  const centerX = 500;
  const centerY = 350;
  const radius = 300;

  const positions = [
    { name: "Third Man", color: "#000000", startAngle: 0, endAngle: 90 },
    { name: "Fine Leg", color: "#000000", startAngle: 90, endAngle: 180 },
    { name: "Square Leg", color: "#000000", startAngle: 180, endAngle: 220 },
    { name: "Long On", color: "#000000", startAngle: 220, endAngle: 270 },
    { name: "Long Off", color: "#000000", startAngle: 270, endAngle: 320 },
    { name: "Cover", color: "#000000", startAngle: 320, endAngle: 360 },
  ];

  const drawWedge = (context: Konva.Context, shape: Konva.Shape, position: typeof positions[0]) => {
    const start = (position.startAngle * Math.PI) / 180;
    const end = (position.endAngle * Math.PI) / 180;
    
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, start, end, false);
    context.closePath();
    context.fillStrokeShape(shape);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg">
      <Stage width={1000} height={700}>
        <Layer>
          {/* Main Field */}
          <Circle x={centerX} y={centerY} radius={radius} fill="#4CAF50" />
          
          {/* Wedges */}
          {positions.map((pos) => (
            <Shape
              key={pos.name}
              sceneFunc={(context, shape) => drawWedge(context, shape, pos)}
              fill={`${pos.color}${hoveredPosition === pos.name ? '40' : '10'}`} // Opacity change on hover
            //   fill={`${pos.color}60`}
              stroke="#fff"
              dash={[6, 6]}
              strokeWidth={1}
              onClick={() => {
                setSelectedPosition(pos.name);
                console.log("Selected:", pos.name);
              }}
              onMouseEnter={() => setHoveredPosition(pos.name)}
              onMouseLeave={() => setHoveredPosition(null)}
              hitFunc={(context, shape) => drawWedge(context, shape, pos)}
            />
          ))}

          {/* Pitch with Proper End Markings */}
          <Rect x={450} y={200} width={100} height={300} fill="#e6d4ae" />
          
          {/* Bowler End (Top) */}
          <Line points={[450, 230, 550, 230]} stroke="#fff" strokeWidth={2} />
          <Text x={460} y={180} text="Bowler End" fontSize={14} fill="#fff" />

          {/* Batter End (Bottom) */}
          <Line points={[450, 470, 550, 470]} stroke="#fff" strokeWidth={2} />
          <Text x={460} y={520} text="Batter End" fontSize={14} fill="#fff" />

          {/* Crease Markings */}
          {/* <Line points={[495, 200, 495, 220]} stroke="#fff" strokeWidth={2} />
          <Line points={[545, 200, 545, 220]} stroke="#fff" strokeWidth={2} />
          <Line points={[495, 500, 495, 480]} stroke="#fff" strokeWidth={2} />
          <Line points={[545, 500, 545, 480]} stroke="#fff" strokeWidth={2} /> */}

          {/* Orientation Labels */}
          <Text x={650} y={centerY} text="Off Side" fontSize={16} fill="#fff" />
          <Text x={350} y={centerY} text="On Side" fontSize={16} fill="#fff" />

          {/* Batsman Representation */}
          <Rect x={490} y={475} width={20} height={30} fill="#2c3e50" />

          {/* Position Labels */}
          {positions.map((pos) => (
            <Text
              key={pos.name}
              x={centerX + Math.cos(((pos.startAngle + pos.endAngle) / 2 * Math.PI) / 180) * (radius - 60)}
              y={centerY + Math.sin(((pos.startAngle + pos.endAngle) / 2 * Math.PI) / 180) * (radius - 60)}
              text={pos.name}
              fontSize={14}
              fill="#fff"
              fontStyle="bold"
            />
          ))}
        </Layer>
      </Stage>

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

export default CricketGround;