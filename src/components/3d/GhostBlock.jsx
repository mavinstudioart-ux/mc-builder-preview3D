import React, { useMemo } from 'react';
import { generateBlockTexture } from '../../utils/textureGenerator';
import { getBlockById } from '../../utils/blockData';
import { useStore } from '../../store/useStore';

export function GhostBlock({ position, visible, isRemoveTool }) {
  const selectedBlockId = useStore((state) => state.selectedBlockId);
  const activeRotation = useStore((state) => state.activeRotation);

  const blockMeta = useMemo(() => getBlockById(selectedBlockId), [selectedBlockId]);
  const texture = useMemo(() => generateBlockTexture(selectedBlockId), [selectedBlockId]);

  if (!visible || !position) return null;

  const rotRad = (activeRotation * Math.PI) / 180;
  const geometryType = blockMeta.geometryType || 'cube';

  const renderGhostShape = () => {
    if (isRemoveTool) {
      return (
        <mesh>
          <boxGeometry args={[1.02, 1.02, 1.02]} />
          <meshBasicMaterial color="#ff3333" wireframe transparent opacity={0.8} />
        </mesh>
      );
    }

    switch (geometryType) {
      case 'stairs':
        return (
          <group>
            <mesh position={[0, -0.25, 0]}>
              <boxGeometry args={[1.02, 0.52, 1.02]} />
              <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, 0.25, 0.25]}>
              <boxGeometry args={[1.02, 0.52, 0.52]} />
              <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
            </mesh>
          </group>
        );

      case 'slab':
        return (
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[1.02, 0.52, 1.02]} />
            <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
          </mesh>
        );

      case 'door':
        return (
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.18, 2.02, 0.92]} />
            <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
          </mesh>
        );

      case 'trapdoor':
        return (
          <mesh position={[0, -0.425, 0]}>
            <boxGeometry args={[1.02, 0.18, 1.02]} />
            <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
          </mesh>
        );

      case 'lantern':
        return (
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.48, 0.62, 0.48]} />
            <meshBasicMaterial color="#ffcc33" wireframe transparent opacity={0.9} />
          </mesh>
        );

      case 'cube':
      default:
        return (
          <>
            <mesh>
              <boxGeometry args={[1.02, 1.02, 1.02]} />
              <meshBasicMaterial color="#44ff66" wireframe transparent opacity={0.8} />
            </mesh>
            <mesh>
              <boxGeometry args={[0.98, 0.98, 0.98]} />
              <meshStandardMaterial map={texture} transparent opacity={0.5} depthWrite={false} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group position={position} rotation={[0, rotRad, 0]}>
      {renderGhostShape()}
    </group>
  );
}
