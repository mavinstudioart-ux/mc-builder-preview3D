'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../components/ui/Header';
import { Toolbar } from '../components/ui/Toolbar';
import { BlockInventory } from '../components/ui/BlockInventory';
import { HelpModal } from '../components/ui/HelpModal';
import { useStore } from '../store/useStore';
import { sfx } from '../utils/audio';

// Dynamically import Three.js CanvasScene without SSR
const CanvasScene = dynamic(
  () => import('../components/3d/CanvasScene').then((mod) => mod.CanvasScene),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0f19',
          color: '#38bdf8',
          gap: '16px',
        }}
      >
        <div className="stats-dot" style={{ width: '16px', height: '16px' }} />
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Memuat Engine 3D...</h2>
      </div>
    ),
  }
);

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const setActiveTool = useStore((state) => state.setActiveTool);
  const rotateBlock = useStore((state) => state.rotateBlock);
  const showGrid = useStore((state) => state.showGrid);
  const setShowGrid = useStore((state) => state.setShowGrid);
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);

  // Load saved design from localStorage on initial load
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user typing in input search box
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === '1') setActiveTool('place');
      else if (e.key === '2') setActiveTool('remove');
      else if (e.key === '3') setActiveTool('fill');
      else if (e.key === '4') setActiveTool('picker');
      else if (e.key === 'r' || e.key === 'R') {
        rotateBlock();
        sfx.playClickSound();
      } else if (e.key === 'g' || e.key === 'G') setShowGrid(!showGrid);
      else if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTool, rotateBlock, showGrid, setShowGrid, undo, redo]);

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Glassmorphism Header */}
      <Header onOpenHelp={() => setIsHelpOpen(true)} />

      {/* Floating Toolbar */}
      <Toolbar />

      {/* 3D Canvas Scene */}
      <CanvasScene />

      {/* Bottom Block Inventory Picker */}
      <BlockInventory />

      {/* Help & Shortcut Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </main>
  );
}
