import React, { useMemo } from 'react';
import { generateBlockTexture } from '../../utils/textureGenerator';
import { getBlockById } from '../../utils/blockData';

export const VoxelBlock = React.memo(function VoxelBlock({
  position,
  type,
  rotation = 0,
  onPointerMove,
  onPointerOut,
  onPointerDown,
  onPointerUp,
}) {
  const blockMeta = useMemo(() => getBlockById(type), [type]);
  const texture = useMemo(() => generateBlockTexture(type), [type]);

  const isTransparent = blockMeta.transparent || false;
  const opacity = blockMeta.opacity || (isTransparent ? 0.6 : 1.0);
  const rotRad = (rotation * Math.PI) / 180;

  const geometryType = blockMeta.geometryType || 'cube';

  const renderGeometry = () => {
    switch (geometryType) {
      case 'stairs':
        return (
          <group>
            {/* Lower full step */}
            <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 0.5, 1]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
            {/* Upper back step */}
            <mesh position={[0, 0.25, 0.25]} castShadow receiveShadow>
              <boxGeometry args={[1, 0.5, 0.5]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
          </group>
        );

      case 'slab':
        return (
          <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.5, 1]} />
            <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
          </mesh>
        );

      case 'door':
        return (
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 2, 0.9]} />
            <meshStandardMaterial
              map={texture}
              color={texture ? '#ffffff' : blockMeta.color}
              transparent
              opacity={0.9}
            />
          </mesh>
        );

      case 'trapdoor':
        return (
          <mesh position={[0, -0.425, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.15, 1]} />
            <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
          </mesh>
        );

      case 'lantern':
        return (
          <group>
            {/* Lantern Outer Frame */}
            <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.6, 0.45]} />
              <meshStandardMaterial
                map={texture}
                color={texture ? '#ffffff' : blockMeta.color}
                emissive="#ffaa33"
                emissiveIntensity={0.8}
              />
            </mesh>
            {/* Chain hook */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
              <meshStandardMaterial color="#444444" metalness={0.8} />
            </mesh>
            {/* Soft point light emitted by lantern */}
            <pointLight position={[0, 0, 0]} color="#ff9900" intensity={1.8} distance={7} />
          </group>
        );

      case 'sign':
        return (
          <group>
            {/* Vertical post */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.12, 0.6, 0.12]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
            {/* Notice Board */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.45, 0.1]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
          </group>
        );

      case 'fence':
        return (
          <group>
            {/* Center post */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 1, 0.25]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
            {/* Horizontal rails */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 0.12, 0.12]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 0.12, 0.12]} />
              <meshStandardMaterial map={texture} color={texture ? '#ffffff' : blockMeta.color} />
            </mesh>
          </group>
        );

      case 'glass_pane':
        return (
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 0.12]} />
            <meshStandardMaterial
              map={texture}
              color={texture ? '#ffffff' : blockMeta.color}
              transparent
              opacity={opacity}
            />
          </mesh>
        );

      case 'cube':
      default:
        return (
          <mesh castShadow={!isTransparent} receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              map={texture}
              color={texture ? '#ffffff' : blockMeta.color}
              transparent={isTransparent}
              opacity={opacity}
              roughness={blockMeta.roughness ?? 0.7}
              metalness={blockMeta.metalness ?? 0.1}
              emissive={blockMeta.emissive ?? '#000000'}
              emissiveIntensity={blockMeta.emissiveIntensity ?? 0}
            />
          </mesh>
        );
    }
  };

  return (
    <group
      position={position}
      rotation={[0, rotRad, 0]}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {renderGeometry()}
    </group>
  );
});
