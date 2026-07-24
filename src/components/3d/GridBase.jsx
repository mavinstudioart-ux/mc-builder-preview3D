import React from 'react';
import { useStore } from '../../store/useStore';

export function GridBase({ onPointerMove, onPointerOut, onPointerDown, onPointerUp }) {
  const showGrid = useStore((state) => state.showGrid);
  const gridSize = useStore((state) => state.gridSize);

  return (
    <group position={[0, -0.5, 0]}>
      {/* Visual Grid Lines shifted by 0.5 so grid lines bound each 1x1 block */}
      {showGrid && (
        <gridHelper
          args={[gridSize, gridSize, '#667799', '#334455']}
          position={[0.5, 0.01, 0.5]}
        />
      )}

      {/* Dark background raycast receiver plane aligned with grid lines */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0.5, 0, 0.5]}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        receiveShadow
      >
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>
    </group>
  );
}

