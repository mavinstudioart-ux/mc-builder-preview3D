# MC Builder 3D 🧱✨

**MC Builder 3D** adalah aplikasi web studio 3D interaktif yang ringan dan modern khusus untuk para *builder* dan arsitek Minecraft. Aplikasi ini mempermudah perancangan, pengujian kombinasi tekstur, dan pembuatan *preview* desain bangunan sebelum direalisasikan di dalam game Minecraft.

---

## 🌟 Fitur Utama

- 🎨 **Render Voxel 3D & Tekstur Piksel Presisi**: Ditenagai oleh **Next.js**, **React Three Fiber (R3F)**, dan **Three.js** dengan tekstur piksel 16x16 prosedural yang tajam (NearestFilter) dan pencahayaan realistis (bayangan, skybox, dan bintang).
- 🧱 **Item & Dekorasi Lengkap**:
  - **Kayu & Papan**: Oak, Birch, Dark Oak, Batang Kayu Oak.
  - **Batu & Bata**: Stone, Cobblestone, Stone Bricks, Red Bricks.
  - **Dekorasi 3D**: Tangga Kayu (Stairs), Pintu Kayu (Door), Trapdoor, Lentera Menyala (Lantern dengan PointLight), Papan Sign, Pagar (Fence), Slab (Setengah Blok), dan Kaca Jendela (Glass Pane).
  - **Mineral & Berharga**: Emas, Berlian, Zamrud, Obsidian.
- 🔄 **Rotasi Orientasi 3D (Tombol 'R')**: Putar arah hadap item dekorasi (0°, 90°, 180°, 270°) sebelum dipasang.
- 🛠️ **Mode Alat Pembangun (Tools)**:
  - **Pasang (Tekan 1)**: Penempatan single block dengan *ghost preview*.
  - **Hapus (Tekan 2)**: Penghancuran block dengan wireframe highlight.
  - **Fill Area (Tekan 3)**: Pembangunan volume area kubus besar serentak.
  - **Eyedropper (Tekan 4)**: Mengambil tipe material dari kanvas 3D.
- 💾 **Save / Load & Export / Import JSON**: Menyimpan progres di LocalStorage browser serta dukungan Export/Import file `.json`.
- 🔊 **Efek Suara Web Audio API**: Suara penempatan dan penghancuran blok sintetis instan tanpa beban unduhan media eksternal.
- 💎 **Antarmuka Dark Mode Glassmorphism**: Desain UI melayang semi-transparan yang futuristik dan responsif.

---

## ⌨️ Pintasan Tombol (Shortcuts)

| Tombol | Aksi |
| :--- | :--- |
| `1` | Mode Pasang Blok |
| `2` | Mode Hapus Blok |
| `3` | Mode Fill Area (Box Fill) |
| `4` | Mode Eyedropper (Pipette) |
| `R` | Putar Rotasi Blok (0°, 90°, 180°, 270°) |
| `G` | Toggle Tampilkan / Sembunyikan Grid |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |

---

## 🚀 Memulai (Local Setup)

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/mavinstudioart-ux/mc-builder-preview3D.git
   cd mc-builder-preview3D
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi MIT.
