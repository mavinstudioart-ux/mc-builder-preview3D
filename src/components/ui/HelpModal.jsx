import React from 'react';
import { X, MousePointer, Keyboard, Box } from 'lucide-react';
import { sfx } from '../../utils/audio';

export function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-align">
            <Box size={22} color="#55e6d6" />
            <h2>Panduan Penggunaan MC Builder 3D</h2>
          </div>
          <button className="icon-btn xs" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <section className="guide-section">
            <h3><MousePointer size={18} /> Kontrol Mouse & Kamera 3D</h3>
            <ul>
              <li><strong>Klik Kiri:</strong> Menempatkan blok baru / Pilih titik awal mode Fill.</li>
              <li><strong>Klik Kanan:</strong> Menghapus blok yang ditunjuk.</li>
              <li><strong>Drag Klik Kiri Kamera:</strong> Memutar (Rotate) pandangan kamera 3D.</li>
              <li><strong>Drag Klik Kanan / Shift + Drag:</strong> Menggeser (Pan) posisi pandangan kamera.</li>
              <li><strong>Scroll Wheel:</strong> Zoom in / Zoom out kamera.</li>
            </ul>
          </section>

          <section className="guide-section">
            <h3><Keyboard size={18} /> Pintasan Tombol (Shortcuts)</h3>
            <div className="shortcut-grid">
              <div className="shortcut-item"><kbd>1</kbd> Mode Pasang Blok</div>
              <div className="shortcut-item"><kbd>2</kbd> Mode Hapus Blok</div>
              <div className="shortcut-item"><kbd>3</kbd> Mode Fill Area (Box)</div>
              <div className="shortcut-item"><kbd>4</kbd> Mode Eyedropper</div>
              <div className="shortcut-item"><kbd>R</kbd> Putar Rotasi Blok (0°, 90°, 180°, 270°)</div>
              <div className="shortcut-item"><kbd>G</kbd> Toggle Grid Line</div>
              <div className="shortcut-item"><kbd>Ctrl + Z</kbd> Undo</div>
              <div className="shortcut-item"><kbd>Ctrl + Y</kbd> Redo</div>
            </div>
          </section>

          <section className="guide-section highlight-box">
            <h4>💡 Tips Membangun Dekorasi:</h4>
            <p>Gunakan <strong>Tombol R</strong> saat memilih <strong>Tangga Kayu (Stairs)</strong>, <strong>Pintu</strong>, atau <strong>Trapdoor</strong> untuk menyesuaikan arah hadap sebelum diletakkan!</p>
          </section>
        </div>

        <div className="modal-footer">
          <button
            className="btn-primary"
            onClick={() => {
              onClose();
              sfx.playClickSound();
            }}
          >
            Mengerti & Mulai Desain
          </button>
        </div>
      </div>
    </div>
  );
}
