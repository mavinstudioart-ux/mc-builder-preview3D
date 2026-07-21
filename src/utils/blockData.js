export const BLOCK_CATEGORIES = [
  { id: 'all', name: 'Semua Blok' },
  { id: 'wood', name: 'Kayu & Papan' },
  { id: 'stone', name: 'Batu & Bata' },
  { id: 'decor', name: 'Dekorasi & Mebel' },
  { id: 'nature', name: 'Alam & Tanah' },
  { id: 'precious', name: 'Mineral & Berharga' },
  { id: 'special', name: 'Spesial & Dekos' },
];

export const BLOCKS = [
  {
    id: 'oak_planks',
    name: 'Papan Kayu Oak',
    category: 'wood',
    color: '#a07844',
    sound: 'wood',
    description: 'Papan kayu klasik cokelat hangat'
  },
  {
    id: 'birch_planks',
    name: 'Papan Kayu Birch',
    category: 'wood',
    color: '#d4c285',
    sound: 'wood',
    description: 'Papan kayu terang krem'
  },
  {
    id: 'dark_oak_planks',
    name: 'Papan Kayu Dark Oak',
    category: 'wood',
    color: '#472f17',
    sound: 'wood',
    description: 'Papan kayu cokelat tua tebal'
  },
  {
    id: 'oak_log',
    name: 'Batang Kayu Oak',
    category: 'wood',
    color: '#6d5032',
    sound: 'wood',
    description: 'Batang kayu alami berserat bark'
  },
  {
    id: 'stone',
    name: 'Batu (Stone)',
    category: 'stone',
    color: '#7b7b7b',
    sound: 'stone',
    description: 'Batu utuh abu-abu padat'
  },
  {
    id: 'cobblestone',
    name: 'Batu Bulat (Cobblestone)',
    category: 'stone',
    color: '#5a5a5a',
    sound: 'stone',
    description: 'Pecahan batu jalanan tekstur kasar'
  },
  {
    id: 'stone_bricks',
    name: 'Bata Batu (Stone Bricks)',
    category: 'stone',
    color: '#636363',
    sound: 'stone',
    description: 'Bata batu tersusun rapih untuk dinding benteng'
  },
  {
    id: 'bricks',
    name: 'Bata Merah (Bricks)',
    category: 'stone',
    color: '#9e4634',
    sound: 'stone',
    description: 'Bata tanah liat merah bangunan'
  },

  // --- DECORATION & FURNITURE ITEMS ---
  {
    id: 'stairs_oak',
    name: 'Tangga Kayu Oak (Stairs)',
    category: 'decor',
    color: '#b88746',
    sound: 'wood',
    geometryType: 'stairs',
    description: 'Anak tangga kayu 3D yang dapat diputar'
  },
  {
    id: 'slab_oak',
    name: 'Slab Kayu Oak (Setengah Blok)',
    category: 'decor',
    color: '#a07844',
    sound: 'wood',
    geometryType: 'slab',
    description: 'Papan kayu setengah tinggi (0.5 unit)'
  },
  {
    id: 'door_oak',
    name: 'Pintu Kayu Oak',
    category: 'decor',
    color: '#82592b',
    sound: 'wood',
    geometryType: 'door',
    transparent: true,
    description: 'Pintu kayu berpanel setinggi 2 unit'
  },
  {
    id: 'trapdoor_oak',
    name: 'Trapdoor Kayu',
    category: 'decor',
    color: '#8e6231',
    sound: 'wood',
    geometryType: 'trapdoor',
    description: 'Pintu lantai tipis horizontal/vertikal'
  },
  {
    id: 'lantern',
    name: 'Lentera Menyala (Lantern)',
    category: 'decor',
    color: '#ffc107',
    sound: 'metal',
    geometryType: 'lantern',
    emissive: '#ff9900',
    emissiveIntensity: 0.8,
    description: 'Lentera besi gantung/duduk yang memancarkan cahaya'
  },
  {
    id: 'sign_oak',
    name: 'Papan Sign Kayu',
    category: 'decor',
    color: '#9b703e',
    sound: 'wood',
    geometryType: 'sign',
    description: 'Papan kayu petunjuk dengan tiang'
  },
  {
    id: 'fence_oak',
    name: 'Pagar Kayu (Fence)',
    category: 'decor',
    color: '#a07844',
    sound: 'wood',
    geometryType: 'fence',
    description: 'Pagar tiang kayu pembatas area'
  },
  {
    id: 'glass_pane',
    name: 'Kaca Jendela (Glass Pane)',
    category: 'decor',
    color: '#d0f2ff',
    sound: 'glass',
    geometryType: 'glass_pane',
    transparent: true,
    opacity: 0.5,
    description: 'Panel kaca jendela tipis transparan'
  },

  // --- NATURE & ORES ---
  {
    id: 'dirt',
    name: 'Tanah (Dirt)',
    category: 'nature',
    color: '#866043',
    sound: 'gravel',
    description: 'Blok tanah cokelat gembur'
  },
  {
    id: 'grass_block',
    name: 'Blok Rumput (Grass)',
    category: 'nature',
    color: '#597d29',
    sound: 'grass',
    description: 'Tanah dengan lapisan rumput hijau di atas'
  },
  {
    id: 'leaves',
    name: 'Daun Oak (Leaves)',
    category: 'nature',
    color: '#38631d',
    sound: 'grass',
    transparent: true,
    description: 'Dedaunan hijau rindang'
  },
  {
    id: 'sand',
    name: 'Pasir (Sand)',
    category: 'nature',
    color: '#dbd097',
    sound: 'sand',
    description: 'Pasir pantai halus kuning muda'
  },
  {
    id: 'gold_block',
    name: 'Blok Emas',
    category: 'precious',
    color: '#fcdf3b',
    sound: 'metal',
    roughness: 0.2,
    metalness: 0.8,
    description: 'Logam emas murni berkilau'
  },
  {
    id: 'diamond_block',
    name: 'Blok Berlian',
    category: 'precious',
    color: '#55e6d6',
    sound: 'metal',
    roughness: 0.1,
    metalness: 0.6,
    description: 'Kristal berlian cyan berharga'
  },
  {
    id: 'emerald_block',
    name: 'Blok Zamrud',
    category: 'precious',
    color: '#17cf56',
    sound: 'metal',
    roughness: 0.1,
    metalness: 0.5,
    description: 'Kristal zamrud hijau terang'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    category: 'precious',
    color: '#1a1229',
    sound: 'stone',
    roughness: 0.3,
    description: 'Batu vulkanik hitam ungu sangat keras'
  },
  {
    id: 'glass',
    name: 'Kaca Transparan',
    category: 'special',
    color: '#d0f2ff',
    transparent: true,
    opacity: 0.45,
    sound: 'glass',
    description: 'Kaca tembus pandang berbingkai'
  },
  {
    id: 'glowstone',
    name: 'Glowstone (Batu Bersinar)',
    category: 'special',
    color: '#ffc86b',
    sound: 'glass',
    emissive: '#ff9900',
    emissiveIntensity: 0.6,
    description: 'Batu kristal menyala memancarkan cahaya'
  },
  {
    id: 'tnt',
    name: 'TNT',
    category: 'special',
    color: '#db3b2a',
    sound: 'grass',
    description: 'Bahan peledak merah bergaris putih'
  },
  {
    id: 'wool_red',
    name: 'Wol Merah',
    category: 'special',
    color: '#a02722',
    sound: 'cloth',
    description: 'Kain wol lembut warna merah'
  },
  {
    id: 'wool_white',
    name: 'Wol Putih',
    category: 'special',
    color: '#e8e8e8',
    sound: 'cloth',
    description: 'Kain wol lembut warna putih bersih'
  },
  {
    id: 'wool_blue',
    name: 'Wol Biru',
    category: 'special',
    color: '#3144a0',
    sound: 'cloth',
    description: 'Kain wol lembut warna biru tua'
  }
];

export const getBlockById = (id) => BLOCKS.find((b) => b.id === id) || BLOCKS[0];
