import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { BLOCKS, BLOCK_CATEGORIES } from '../../utils/blockData';
import { Search, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { sfx } from '../../utils/audio';

export function BlockInventory() {
  const selectedBlockId = useStore((state) => state.selectedBlockId);
  const setSelectedBlockId = useStore((state) => state.setSelectedBlockId);
  const setActiveTool = useStore((state) => state.setActiveTool);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredBlocks = useMemo(() => {
    return BLOCKS.filter((block) => {
      const matchCategory = activeCategory === 'all' || block.category === activeCategory;
      const matchSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          block.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeBlockObj = useMemo(() => {
    return BLOCKS.find((b) => b.id === selectedBlockId) || BLOCKS[0];
  }, [selectedBlockId]);

  return (
    <div className={`inventory-drawer ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Toggle Bar */}
      <div className="drawer-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-align">
          <Layers size={18} color="#55e6d6" />
          <span className="drawer-title">Inventaris Tekstur & Material</span>
          <span className="active-badge" style={{ backgroundColor: activeBlockObj.color }}>
            {activeBlockObj.name}
          </span>
        </div>
        <button className="icon-btn xs" title={isExpanded ? 'Kecilkan Panel' : 'Buka Inventaris'}>
          {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {isExpanded && (
        <div className="drawer-body">
          {/* Controls: Search & Categories */}
          <div className="inventory-controls">
            <div className="search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Cari tekstur blok (misal: kayu, batu, emas)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-tabs">
              {BLOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`tab-chip ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    sfx.playClickSound();
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Blocks */}
          <div className="blocks-grid">
            {filteredBlocks.map((b) => {
              const isSelected = selectedBlockId === b.id;
              return (
                <button
                  key={b.id}
                  className={`block-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedBlockId(b.id);
                    setActiveTool('place');
                    sfx.playClickSound();
                  }}
                  title={`${b.name}: ${b.description}`}
                >
                  <div
                    className="block-preview-box"
                    style={{ backgroundColor: b.color }}
                  >
                    {isSelected && <div className="selected-checkmark">✓</div>}
                  </div>
                  <span className="block-label">{b.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
