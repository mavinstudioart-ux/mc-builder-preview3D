import React, { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Download, Upload, Trash2, Undo, Redo, Save, HelpCircle, Box } from 'lucide-react';
import { sfx } from '../../utils/audio';

export function Header({ onOpenHelp }) {
  const blocksMap = useStore((state) => state.blocks);
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  const clearAll = useStore((state) => state.clearAll);
  const autoSave = useStore((state) => state.autoSave);
  const exportJSON = useStore((state) => state.exportJSON);
  const importJSON = useStore((state) => state.importJSON);

  const fileInputRef = useRef(null);
  const blockCount = Object.keys(blocksMap).length;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      if (importJSON(content)) {
        sfx.playClickSound();
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="header-bar">
      <div className="brand-section">
        <div className="brand-icon">
          <Box size={22} color="#55e6d6" />
        </div>
        <div>
          <h1 className="brand-title">MC Builder 3D</h1>
          <p className="brand-subtitle">Minecraft Studio Preview</p>
        </div>
      </div>

      {/* Stats counter */}
      <div className="stats-badge">
        <span className="stats-dot"></span>
        <span>{blockCount} Blok Ditempatkan</span>
      </div>

      {/* Center Action Toolbar */}
      <div className="header-actions">
        <button
          className="icon-btn"
          title="Undo (Ctrl+Z)"
          onClick={() => {
            undo();
            sfx.playClickSound();
          }}
        >
          <Undo size={17} />
        </button>

        <button
          className="icon-btn"
          title="Redo (Ctrl+Y)"
          onClick={() => {
            redo();
            sfx.playClickSound();
          }}
        >
          <Redo size={17} />
        </button>

        <div className="divider" />

        <button
          className="icon-btn"
          title="Simpan Progres (LocalStorage)"
          onClick={() => {
            autoSave();
            sfx.playClickSound();
            alert('Progres desain berhasil disimpan di browser!');
          }}
        >
          <Save size={17} />
        </button>

        <button
          className="icon-btn"
          title="Export Desain ke JSON"
          onClick={() => {
            exportJSON();
            sfx.playClickSound();
          }}
        >
          <Download size={17} />
        </button>

        <button
          className="icon-btn"
          title="Import JSON Desain"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <Upload size={17} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".json"
          style={{ display: 'none' }}
        />

        <div className="divider" />

        <button
          className="icon-btn danger"
          title="Kosongkan Semua Blok"
          onClick={() => {
            if (confirm('Apakah Anda yakin ingin menghapus semua blok di kanvas?')) {
              clearAll();
              sfx.playRemoveSound();
            }
          }}
        >
          <Trash2 size={17} />
        </button>

        <button
          className="icon-btn primary"
          title="Panduan Kontrol"
          onClick={() => {
            onOpenHelp();
            sfx.playClickSound();
          }}
        >
          <HelpCircle size={17} />
        </button>
      </div>
    </header>
  );
}
