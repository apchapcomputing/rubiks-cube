import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CUBE_COLORS = {
  front: '#ff0000', // red
  back: '#ff8c00', // orange
  top: '#ffffff', // white
  bottom: '#ffff00', // yellow
  right: '#00ff00', // green
  left: '#0000ff' // blue
};

function CubePiece({ position, colors }) {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      {/* Create materials for each face */}
      {Object.entries(colors).map(([face, color], index) => (
        <meshStandardMaterial
          key={face}
          attach={`material-${index}`}
          color={color}
        />
      ))}
    </mesh>
  );
}

export function RubiksCube() {
  // Create a 3x3x3 cube
  const createCubePieces = () => {
    const pieces = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const colors = {
            right: x === 1 ? CUBE_COLORS.right : '#1a1a1a',
            left: x === -1 ? CUBE_COLORS.left : '#1a1a1a',
            top: y === 1 ? CUBE_COLORS.top : '#1a1a1a',
            bottom: y === -1 ? CUBE_COLORS.bottom : '#1a1a1a',
            front: z === 1 ? CUBE_COLORS.front : '#1a1a1a',
            back: z === -1 ? CUBE_COLORS.back : '#1a1a1a'
          };

          pieces.push(
            <CubePiece
              key={`${x}-${y}-${z}`}
              position={[x, y, z]}
              colors={colors}
            />
          );
        }
      }
    }
    return pieces;
  };

  return <group>{createCubePieces()}</group>;
}
