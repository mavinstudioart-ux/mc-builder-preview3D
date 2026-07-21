import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { VoxelBlock } from './VoxelBlock';
import { GhostBlock } from './GhostBlock';
import { GridBase } from './GridBase';
import { sfx } from '../../utils/audio';
import { getBlockById } from '../../utils/blockData';

function SceneContent() {
  const { camera } = useThree();
  const blocksMap = useStore((state) => state.blocks);
  const activeTool = useStore((state) => state.activeTool);
  const selectedBlockId = useStore((state) => state.selectedBlockId);
  const activeRotation = useStore((state) => state.activeRotation);
  const fillStartPos = useStore((state) => state.fillStartPos);
  
  const addBlock = useStore((state) => state.addBlock);
  const removeBlock = useStore((state) => state.removeBlock);
  const fillBox = useStore((state) => state.fillBox);
  const setFillStartPos = useStore((state) => state.setFillStartPos);
  const setSelectedBlockId = useStore((state) => state.setSelectedBlockId);
  const setActiveRotation = useStore((state) => state.setActiveRotation);

  const [ghostPos, setGhostPos] = useState(null);
  const [ghostVisible, setGhostVisible] = useState(false);

  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const blockList = useMemo(() => Object.values(blocksMap), [blocksMap]);

  // Handle Raycasting pointer position over grid or blocks
  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    if (!e.point || !e.face) return;

    const normal = e.face.normal;
    const point = e.point.clone();

    if (activeTool === 'remove') {
      const targetPos = point.clone().sub(normal.clone().multiplyScalar(0.5)).round();
      setGhostPos([targetPos.x, targetPos.y, targetPos.z]);
    } else {
      const placePos = point.clone().add(normal.clone().multiplyScalar(0.5)).round();
      if (placePos.y < 0) placePos.y = 0;
      setGhostPos([placePos.x, placePos.y, placePos.z]);

      // Calculate camera azimuth angle (yaw) to auto-orient block facing
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      const angle = Math.atan2(-camDir.x, -camDir.z); // angle in radians
      let deg = Math.round((angle * 180) / Math.PI / 90) * 90;
      deg = (deg % 360 + 360) % 360;

      // Auto-set initial rotation based on camera angle if placing special decor
      const blockMeta = getBlockById(selectedBlockId);
      if (blockMeta.geometryType && blockMeta.geometryType !== 'cube') {
        // Keep current rotation unless needed
      }
    }

    setGhostVisible(true);
  }, [activeTool, camera, selectedBlockId]);

  const handlePointerOut = useCallback(() => {
    setGhostVisible(false);
  }, []);

  const handlePointerDown = useCallback((e) => {
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    if (!e.point || !e.face) return;

    const dx = e.clientX - pointerDownPosRef.current.x;
    const dy = e.clientY - pointerDownPosRef.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 5) return;

    const normal = e.face.normal;
    const point = e.point.clone();

    if (activeTool === 'picker') {
      const clickedBlockPos = point.clone().sub(normal.clone().multiplyScalar(0.5)).round();
      const key = `${clickedBlockPos.x},${clickedBlockPos.y},${clickedBlockPos.z}`;
      const clickedBlock = blocksMap[key];
      if (clickedBlock) {
        setSelectedBlockId(clickedBlock.type);
        if (clickedBlock.rotation !== undefined) setActiveRotation(clickedBlock.rotation);
        sfx.playClickSound();
      }
      return;
    }

    if (activeTool === 'remove' || e.button === 2) {
      const removePos = point.clone().sub(normal.clone().multiplyScalar(0.5)).round();
      removeBlock(removePos.x, removePos.y, removePos.z);
      sfx.playRemoveSound();
    } else if (activeTool === 'fill') {
      const placePos = point.clone().add(normal.clone().multiplyScalar(0.5)).round();
      if (placePos.y < 0) placePos.y = 0;

      if (!fillStartPos) {
        setFillStartPos({ x: placePos.x, y: placePos.y, z: placePos.z });
        sfx.playClickSound();
      } else {
        fillBox(fillStartPos, { x: placePos.x, y: placePos.y, z: placePos.z });
        const meta = getBlockById(selectedBlockId);
        sfx.playPlaceSound(meta.sound);
      }
    } else {
      const placePos = point.clone().add(normal.clone().multiplyScalar(0.5)).round();
      if (placePos.y < 0) placePos.y = 0;

      addBlock(placePos.x, placePos.y, placePos.z, selectedBlockId, activeRotation);
      const meta = getBlockById(selectedBlockId);
      sfx.playPlaceSound(meta.sound);
    }
  }, [activeTool, blocksMap, fillStartPos, selectedBlockId, activeRotation, addBlock, removeBlock, fillBox, setFillStartPos, setSelectedBlockId, setActiveRotation]);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[25, 40, 20]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <hemisphereLight skyColor="#b1e1ff" groundColor="#334455" intensity={0.4} />

      <Sky sunPosition={[100, 40, 100]} inclination={0.6} azimuth={0.25} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      <OrbitControls
        makeDefault
        target={[0, 2, 0]}
        minDistance={3}
        maxDistance={60}
        maxPolarAngle={Math.PI / 2 - 0.02}
      />

      <GridBase
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />

      {/* Render Voxel & Decor Blocks */}
      {blockList.map((b) => (
        <VoxelBlock
          key={`${b.x},${b.y},${b.z}`}
          position={[b.x, b.y, b.z]}
          type={b.type}
          rotation={b.rotation || 0}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      ))}

      {/* Ghost Preview */}
      <GhostBlock
        position={ghostPos}
        visible={ghostVisible}
        isRemoveTool={activeTool === 'remove'}
      />

      {/* Box Fill Preview Wireframe indicator */}
      {activeTool === 'fill' && fillStartPos && ghostPos && (
        <mesh
          position={[
            (fillStartPos.x + ghostPos[0]) / 2,
            (fillStartPos.y + ghostPos[1]) / 2,
            (fillStartPos.z + ghostPos[2]) / 2,
          ]}
        >
          <boxGeometry
            args={[
              Math.abs(ghostPos[0] - fillStartPos.x) + 1.05,
              Math.abs(ghostPos[1] - fillStartPos.y) + 1.05,
              Math.abs(ghostPos[2] - fillStartPos.z) + 1.05,
            ]}
          />
          <meshBasicMaterial color="#3399ff" wireframe transparent opacity={0.7} />
        </mesh>
      )}
    </>
  );
}

export function CanvasScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [12, 10, 16], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
