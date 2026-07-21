import * as THREE from 'three';

// Cache generated textures to prevent re-creation
const textureCache = new Map();

/**
 * Generates a 16x16 procedural pixel art canvas texture for Minecraft blocks
 */
export function generateBlockTexture(blockId) {
  if (textureCache.has(blockId)) {
    return textureCache.get(blockId);
  }

  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');

  // Fill default background
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 16, 16);

  // Helper for noise/variations
  const drawNoise = (baseHex, variance = 15) => {
    const base = hexToRgb(baseHex);
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const offset = Math.floor((Math.random() - 0.5) * variance);
        const r = Math.min(255, Math.max(0, base.r + offset));
        const g = Math.min(255, Math.max(0, base.g + offset));
        const b = Math.min(255, Math.max(0, base.b + offset));
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  const drawPlanks = (baseColor, lineHex) => {
    drawNoise(baseColor, 12);
    ctx.fillStyle = lineHex;
    // Plank horizontal lines
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 4, 16, 1);
    ctx.fillRect(0, 8, 16, 1);
    ctx.fillRect(0, 12, 16, 1);
    // Vertical seams
    ctx.fillRect(4, 1, 1, 3);
    ctx.fillRect(12, 5, 1, 3);
    ctx.fillRect(6, 9, 1, 3);
    ctx.fillRect(14, 13, 1, 3);
  };

  const drawDoor = () => {
    drawNoise('#82592b', 15);
    ctx.fillStyle = '#4a3014';
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 15, 16, 1);
    ctx.fillRect(0, 0, 1, 16);
    ctx.fillRect(15, 0, 1, 16);
    // Door panels
    ctx.fillRect(2, 2, 5, 5);
    ctx.fillRect(9, 2, 5, 5);
    ctx.fillRect(2, 9, 5, 5);
    ctx.fillRect(9, 9, 5, 5);
    // Door handle (gold dot)
    ctx.fillStyle = '#fcdf3b';
    ctx.fillRect(13, 8, 2, 2);
  };

  const drawTrapdoor = () => {
    drawNoise('#8e6231', 12);
    ctx.fillStyle = '#422a10';
    ctx.fillRect(0, 0, 16, 2);
    ctx.fillRect(0, 14, 16, 2);
    ctx.fillRect(0, 0, 2, 16);
    ctx.fillRect(14, 0, 2, 16);
    // Metal hinges
    ctx.fillStyle = '#555';
    ctx.fillRect(2, 4, 2, 2);
    ctx.fillRect(2, 10, 2, 2);
  };

  const drawLantern = () => {
    ctx.fillStyle = '#1e1e24';
    ctx.fillRect(0, 0, 16, 16);
    // Glowing core
    ctx.fillStyle = '#ffaa33';
    ctx.fillRect(3, 3, 10, 10);
    ctx.fillStyle = '#fff4a3';
    ctx.fillRect(5, 5, 6, 6);
    // Iron frame
    ctx.fillStyle = '#3a3a42';
    ctx.fillRect(0, 0, 16, 2);
    ctx.fillRect(0, 14, 16, 2);
    ctx.fillRect(0, 0, 2, 16);
    ctx.fillRect(14, 0, 2, 16);
  };

  const drawSign = () => {
    drawNoise('#9b703e', 10);
    ctx.fillStyle = '#5e4120';
    ctx.fillRect(0, 0, 16, 1);
    ctx.fillRect(0, 15, 16, 1);
    // Text lines preview
    ctx.fillStyle = '#3a250e';
    ctx.fillRect(3, 4, 10, 1);
    ctx.fillRect(4, 7, 8, 1);
    ctx.fillRect(3, 10, 10, 1);
  };

  // Switch by block type
  switch (blockId) {
    case 'oak_planks':
    case 'stairs_oak':
    case 'slab_oak':
    case 'fence_oak':
      drawPlanks('#b88746', '#875d27');
      break;
    case 'birch_planks':
      drawPlanks('#d4c285', '#a89458');
      break;
    case 'dark_oak_planks':
      drawPlanks('#472f17', '#2e1c0a');
      break;
    case 'oak_log':
      drawNoise('#5c4125', 20);
      break;
    case 'door_oak':
      drawDoor();
      break;
    case 'trapdoor_oak':
      drawTrapdoor();
      break;
    case 'lantern':
      drawLantern();
      break;
    case 'sign_oak':
      drawSign();
      break;
    case 'stone':
      drawNoise('#7b7b7b', 16);
      break;
    case 'cobblestone':
      drawNoise('#5c5c5c', 35);
      break;
    case 'stone_bricks':
      drawNoise('#686868', 16);
      break;
    case 'bricks':
      drawNoise('#9e4634', 18);
      break;
    case 'dirt':
      drawNoise('#866043', 25);
      break;
    case 'grass_block':
      drawNoise('#866043', 20);
      ctx.fillStyle = '#597d29';
      ctx.fillRect(0, 0, 16, 4);
      break;
    case 'leaves':
      drawNoise('#38631d', 45);
      break;
    case 'sand':
      drawNoise('#dbd097', 15);
      break;
    case 'gold_block':
      drawNoise('#fcdf3b', 20);
      break;
    case 'diamond_block':
      drawNoise('#45d9c7', 20);
      break;
    case 'emerald_block':
      drawNoise('#17cf56', 20);
      break;
    case 'obsidian':
      drawNoise('#160e24', 35);
      break;
    case 'glass':
    case 'glass_pane':
      ctx.fillStyle = 'rgba(215, 245, 255, 0.4)';
      ctx.fillRect(0, 0, 16, 16);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(0, 0, 16, 1);
      ctx.fillRect(0, 15, 16, 1);
      break;
    default:
      drawNoise('#888888', 20);
  }

  // Convert canvas to Three.js CanvasTexture with pixelated filtering
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  textureCache.set(blockId, texture);
  return texture;
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
