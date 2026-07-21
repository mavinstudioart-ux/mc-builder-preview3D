import { create } from 'zustand';
import { BLOCKS } from '../utils/blockData';

const MAX_HISTORY = 30;
const STORAGE_KEY = 'mc_builder_design_v2';

export const useStore = create((set, get) => ({
  // Core block data stored as key-value map: "x,y,z" => { x, y, z, type, rotation }
  blocks: {
    // Initial starter demo build: a small wooden cottage floor
    '0,0,0': { x: 0, y: 0, z: 0, type: 'oak_log', rotation: 0 },
    '0,0,3': { x: 0, y: 0, z: 3, type: 'oak_log', rotation: 0 },
    '3,0,0': { x: 3, y: 0, z: 0, type: 'oak_log', rotation: 0 },
    '3,0,3': { x: 3, y: 0, z: 3, type: 'oak_log', rotation: 0 },
    '1,0,0': { x: 1, y: 0, z: 0, type: 'oak_planks', rotation: 0 },
    '2,0,0': { x: 2, y: 0, z: 0, type: 'oak_planks', rotation: 0 },
    '0,0,1': { x: 0, y: 0, z: 1, type: 'oak_planks', rotation: 0 },
    '0,0,2': { x: 0, y: 0, z: 2, type: 'oak_planks', rotation: 0 },
    '3,0,1': { x: 3, y: 0, z: 1, type: 'oak_planks', rotation: 0 },
    '3,0,2': { x: 3, y: 0, z: 2, type: 'oak_planks', rotation: 0 },
    '1,0,3': { x: 1, y: 0, z: 3, type: 'oak_planks', rotation: 0 },
    '2,0,3': { x: 2, y: 0, z: 3, type: 'oak_planks', rotation: 0 },
    '1,0,1': { x: 1, y: 0, z: 1, type: 'birch_planks', rotation: 0 },
    '1,0,2': { x: 1, y: 0, z: 2, type: 'birch_planks', rotation: 0 },
    '2,0,1': { x: 2, y: 0, z: 1, type: 'birch_planks', rotation: 0 },
    '2,0,2': { x: 2, y: 0, z: 2, type: 'birch_planks', rotation: 0 },
    '0,1,0': { x: 0, y: 1, z: 0, type: 'lantern', rotation: 0 },
    '3,1,0': { x: 3, y: 1, z: 0, type: 'stairs_oak', rotation: 0 },
  },

  selectedBlockId: 'oak_planks',
  activeTool: 'place', // 'place' | 'remove' | 'fill' | 'picker'
  activeRotation: 0, // 0 | 90 | 180 | 270 (in degrees)
  fillStartPos: null, // { x, y, z } for fill tool
  showGrid: true,
  gridSize: 24,

  // Undo / Redo stack
  history: [],
  historyIndex: -1,

  // Actions
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  setActiveTool: (tool) => set({ activeTool: tool, fillStartPos: null }),
  setActiveRotation: (rot) => set({ activeRotation: (rot % 360 + 360) % 360 }),
  rotateBlock: () => set((state) => ({ activeRotation: (state.activeRotation + 90) % 360 })),
  setShowGrid: (show) => set({ showGrid: show }),
  setGridSize: (size) => set({ gridSize: size }),
  setFillStartPos: (pos) => set({ fillStartPos: pos }),

  // Push current state to undo history
  pushHistory: (newBlocks) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    if (newHistory.length >= MAX_HISTORY) newHistory.shift();
    newHistory.push(JSON.stringify(newBlocks));
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  addBlock: (x, y, z, typeOverride = null, rotationOverride = null) => {
    const { blocks, selectedBlockId, activeRotation, pushHistory } = get();
    const type = typeOverride || selectedBlockId;
    const rotation = rotationOverride !== null ? rotationOverride : activeRotation;
    const key = `${x},${y},${z}`;

    const newBlocks = { ...blocks, [key]: { x, y, z, type, rotation } };
    pushHistory(blocks);
    set({ blocks: newBlocks });
    get().autoSave();
  },

  removeBlock: (x, y, z) => {
    const { blocks, pushHistory } = get();
    const key = `${x},${y},${z}`;
    if (!blocks[key]) return;

    const newBlocks = { ...blocks };
    delete newBlocks[key];
    pushHistory(blocks);
    set({ blocks: newBlocks });
    get().autoSave();
  },

  // Box Fill Tool: Fill area from start pos to end pos
  fillBox: (start, end, blockIdOverride = null) => {
    const { blocks, selectedBlockId, activeRotation, pushHistory } = get();
    const type = blockIdOverride || selectedBlockId;
    if (!start || !end) return;

    const minX = Math.min(start.x, end.x);
    const maxX = Math.max(start.x, end.x);
    const minY = Math.max(0, Math.min(start.y, end.y));
    const maxY = Math.min(64, Math.max(start.y, end.y));
    const minZ = Math.min(start.z, end.z);
    const maxZ = Math.max(start.z, end.z);

    const newBlocks = { ...blocks };
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          const key = `${x},${y},${z}`;
          newBlocks[key] = { x, y, z, type, rotation: activeRotation };
        }
      }
    }

    pushHistory(blocks);
    set({ blocks: newBlocks, fillStartPos: null });
    get().autoSave();
  },

  clearAll: () => {
    const { blocks, pushHistory } = get();
    pushHistory(blocks);
    set({ blocks: {}, fillStartPos: null });
    get().autoSave();
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex <= 0) return;
    const prevIndex = historyIndex - 1;
    const restoredBlocks = JSON.parse(history[prevIndex]);
    set({ blocks: restoredBlocks, historyIndex: prevIndex });
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    const restoredBlocks = JSON.parse(history[nextIndex]);
    set({ blocks: restoredBlocks, historyIndex: nextIndex });
  },

  autoSave: () => {
    try {
      const { blocks } = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch (e) {
      console.warn('Could not auto-save to localStorage:', e);
    }
  },

  loadFromLocalStorage: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set({ blocks: parsed });
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
  },

  exportJSON: () => {
    const { blocks } = get();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blocks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `minecraft-design-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importJSON: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        get().pushHistory(get().blocks);
        set({ blocks: parsed });
        get().autoSave();
        return true;
      }
    } catch (e) {
      alert('File JSON tidak valid!');
      return false;
    }
  }
}));
