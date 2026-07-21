import React from 'react';
import { useStore } from '../../store/useStore';
import { PlusSquare, Eraser, Maximize, Pipette, Grid, RotateCw } from 'lucide-react';
import { sfx } from '../../utils/audio';

export function Toolbar() {
  const activeTool = useStore((state) => state.activeTool);
  const setActiveTool = useStore((state) => state.setActiveTool);
  const activeRotation = useStore((state) => state.activeRotation);
  const rotateBlock = useStore((state) => state.rotateBlock);
  const showGrid = useStore((state) => state.showGrid);
  const setShowGrid = useStore((state) => state.setShowGrid);
  const fillStartPos = useStore((state) => state.fillStartPos);

  const tools = [
    { id: 'place', name: 'Pasang Blok', icon: PlusSquare, shortcut: '1' },
    { id: 'remove', name: 'Hapus Blok', icon: Eraser, shortcut: '2' },
    { id: 'fill', name: 'Fill Area (Box)', icon: Maximize, shortcut: '3' },
    { id: 'picker', name: 'Eyedropper (Pilih Blok)', icon: Pipette, shortcut: '4' },
  ];

  return (
    <div className="toolbar-container">
      <div className="toolbar-pill">
        {tools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              className={`tool-button ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTool(t.id);
                sfx.playClickSound();
              }}
              title={`${t.name} (Tekan ${t.shortcut})`}
            >
              <Icon size={18} />
              <span className="tool-name">{t.name}</span>
            </button>
          );
        })}

        <div className="divider-vert" />

        <button
          className="tool-button"
          onClick={() => {
            rotateBlock();
            sfx.playClickSound();
          }}
          title="Putar Orientasi Blok (Tekan R)"
        >
          <RotateCw size={18} />
          <span className="tool-name">Rotasi ({activeRotation}°)</span>
        </button>

        <button
          className={`tool-button ${showGrid ? 'active' : ''}`}
          onClick={() => {
            setShowGrid(!showGrid);
            sfx.playClickSound();
          }}
          title="Tampilkan / Sembunyikan Grid (G)"
        >
          <Grid size={18} />
          <span className="tool-name">Grid</span>
        </button>
      </div>

      {activeTool === 'fill' && (
        <div className="fill-status-pill">
          {fillStartPos ? (
            <span className="status-pulse">
              📍 Titik awal diset ({fillStartPos.x}, {fillStartPos.y}, {fillStartPos.z}). Klik titik kedua untuk mengisi area!
            </span>
          ) : (
            <span>💡 Mode Fill: Klik titik sudut pertama untuk memulai area box fill.</span>
          )}
        </div>
      )}
    </div>
  );
}
