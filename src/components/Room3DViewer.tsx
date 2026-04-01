"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import { Maximize2, Minimize2, Move, RotateCw, Eye, EyeOff } from "lucide-react";
import {
  Room3DSceneProps,
  FurnitureConfigs,
  FurniturePositions,
  FurnitureConfig,
  DEFAULT_FURNITURE_HEIGHTS,
  DEFAULT_FURNITURE_COLORS,
  COLOR_PALETTE,
} from "./Room3DScene";
import { ROOM_FURNITURE, FurnitureItem } from "./FloorPlan2D";

/* ─── Lazy Load with custom fallback ─── */
const Room3DScene = dynamic(
  () => import("./Room3DScene").then((m) => ({ default: m.Room3DScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 absolute inset-0">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-300 text-sm font-medium">Đang tải không gian 3D chất lượng cao...</p>
      </div>
    ),
  }
);

/* ─── Height presets ─── */
const HEIGHT_PRESETS: Record<string, { min: number; max: number; step: number; label: string }> = {
  giuong: { min: 0.3, max: 0.8, step: 0.05, label: "Giường" },
  "tu-quan-ao": { min: 1.4, max: 2.8, step: 0.1, label: "Tủ Quần Áo" },
  "ban-td": { min: 0.5, max: 0.9, step: 0.05, label: "Bàn Trang Điểm" },
  "ban-hoc": { min: 0.5, max: 0.9, step: 0.05, label: "Bàn Học" },
  "ke-tivi": { min: 0.3, max: 0.8, step: 0.05, label: "Kệ Tivi" },
  tab1: { min: 0.4, max: 0.8, step: 0.05, label: "Tab Giường" },
  tab2: { min: 0.4, max: 0.8, step: 0.05, label: "Tab Giường" },
  "bep-tren": { min: 0.4, max: 0.9, step: 0.05, label: "Tủ Bếp Trên" },
  "bep-duoi": { min: 0.7, max: 1.0, step: 0.05, label: "Tủ Bếp Dưới" },
  "tu-lanh": { min: 1.4, max: 1.9, step: 0.1, label: "Tủ Lạnh" },
};

/* ─── Initial 3D Layout Logic ─── */
function getInitialPlacement(roomW: number, roomD: number, furniture: FurnitureItem[], roomType: string): FurniturePositions {
  const G = 0.05;
  const positions: FurniturePositions = {};

  if (roomType === "nha-bep") {
    furniture.forEach(f => {
      if (f.id === "bep-duoi") positions[f.id] = { x: G, z: roomD - f.h - G, rotated: false };
      else if (f.id === "bep-tren") positions[f.id] = { x: G, z: roomD - f.h - 0.6 - 0.65, rotated: false };
      else if (f.id === "tu-lanh") positions[f.id] = { x: roomW - f.w - G, z: roomD - f.h - G, rotated: false };
    });
    return positions;
  }

  const bed = furniture.find(f => f.id === "giuong");
  const wardrobe = furniture.find(f => f.id === "tu-quan-ao");
  const dresser = furniture.find(f => f.id === "ban-td");
  const tvStand = furniture.find(f => f.id === "ke-tivi");
  const desk = furniture.find(f => f.id === "ban-hoc");
  const tabs = furniture.filter(f => f.id.startsWith("tab"));

  if (bed) {
    const bx = (roomW - bed.h) / 2;
    const bz = roomD - bed.w - G;
    positions[bed.id] = { x: bx, z: bz, rotated: false };
    tabs.forEach((tab, i) => {
      positions[tab.id] = { x: i === 0 ? bx - tab.w - 0.05 : bx + bed.h + 0.05, z: roomD - tab.h - G, rotated: false };
    });
  }
  if (wardrobe) positions[wardrobe.id] = { x: G, z: G, rotated: false };
  if (dresser) positions[dresser.id] = { x: roomW - dresser.w - G, z: G, rotated: false };
  if (tvStand) positions[tvStand.id] = { x: (roomW - tvStand.w) / 2, z: G + (wardrobe ? wardrobe.h + 0.1 : 0), rotated: false };
  if (desk) positions[desk.id] = { x: roomW - desk.w - G, z: G, rotated: false };

  return positions;
}


/* ─── Props ─── */
interface Room3DViewerProps {
  roomWidth: number;
  roomDepth: number;
  roomType: string;
}

export default function Room3DViewer({ roomWidth, roomDepth, roomType }: Room3DViewerProps) {
  const furniture = ROOM_FURNITURE[roomType] || [];
  
  // States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Layout positions
  const [positions, setPositions] = useState<FurniturePositions>(() => getInitialPlacement(roomWidth, roomDepth, furniture, roomType));
  
  // Component configs
  const [configs, setConfigs] = useState<FurnitureConfigs>(() => {
    const init: FurnitureConfigs = {};
    furniture.forEach(f => {
      init[f.id] = {
        height: DEFAULT_FURNITURE_HEIGHTS[f.id] ?? 0.8,
        color: DEFAULT_FURNITURE_COLORS[f.id] ?? "#f97316",
        width: f.w,
        depth: f.h,
        isVisible: true,
        styleVariant: "modern", // Default
      };
    });
    return init;
  });

  // Re-sync on room dimension / type change
  useEffect(() => {
    setPositions(getInitialPlacement(roomWidth, roomDepth, furniture, roomType));
    
    setConfigs(prev => {
      const updated = { ...prev };
      furniture.forEach(f => {
        if (!updated[f.id]) {
          updated[f.id] = {
            height: DEFAULT_FURNITURE_HEIGHTS[f.id] ?? 0.8,
            color: DEFAULT_FURNITURE_COLORS[f.id] ?? "#f97316",
            width: f.w,
            depth: f.h,
            isVisible: true,
            styleVariant: "modern",
          };
        }
      });
      return updated;
    });

    if (selectedItemId && !furniture.find(f => f.id === selectedItemId)) {
      setSelectedItemId(null);
    }
  }, [roomWidth, roomDepth, roomType, furniture]); 

  const updatePosition = useCallback((id: string, x: number, z: number, rotated: boolean) => {
    setPositions(prev => ({ ...prev, [id]: { x, z, rotated } }));
  }, []);

  const updateConfig = useCallback((id: string, key: keyof FurnitureConfig, value: any) => {
    setConfigs(prev => ({ ...prev, [id]: { ...prev[id], [key]: value } }));
  }, []);

  const rotateItem = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPositions(prev => {
      const pos = prev[id];
      if (!pos) return prev;
      return { ...prev, [id]: { ...pos, rotated: !pos.rotated } };
    });
  }, []);

  const toggleVisibility = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfigs(prev => {
      const isVisible = !(prev[id]?.isVisible);
      if (!isVisible && selectedItemId === id) setSelectedItemId(null); 
      return { ...prev, [id]: { ...prev[id], isVisible } };
    });
  }, [selectedItemId]);

  /* ─── Render ─── */
  const MIN_WIDTH = 0.3;
  const MAX_WIDTH = 3.5;

  const wrapperClass = isFullscreen 
    ? "fixed inset-0 z-[999999] bg-slate-900 flex flex-col" 
    : "w-full h-full bg-slate-900 flex flex-col overflow-hidden";

  return (
    <div className={wrapperClass}>
      
      {/* Top Header - ONLY visible in Windowed Mode */}
      {!isFullscreen && (
        <div className="flex items-center justify-between px-4 bg-slate-800 border-b border-slate-700 shrink-0 h-14 z-50">
            <div className="flex items-center gap-3">
               <span className="text-orange-400 font-extrabold flex items-center gap-2">
                   🧊 3D Live View
               </span>
               <span className="bg-slate-700 px-3 py-1 rounded-full text-slate-300 text-xs font-bold font-mono">
                   {roomWidth}m × {roomDepth}m
               </span>
            </div>
            <div className="flex items-center gap-2">
               <button
                   onClick={() => setShowControls(v => !v)}
                   className="px-4 py-2 text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-slate-600"
               >
                   {showControls ? "Ẩn Bảng Vật Liệu" : "Hiện Bảng Vật Liệu"}
               </button>
               <button
                   onClick={() => setIsFullscreen(true)}
                   className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white rounded-lg font-bold text-xs transition-colors ml-2"
               >
                   <Maximize2 size={16} />
                   <span>Toàn Màn Hình</span>
               </button>
            </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Modest Exit Fullscreen Button */}
        {isFullscreen && (
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[999999]">
               <button
                   onClick={() => setIsFullscreen(false)}
                   className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(234,88,12,0.6)] border border-orange-400 transition-transform hover:scale-105 active:scale-95"
               >
                   <Minimize2 size={20} strokeWidth={2.5} />
                   <span>THOÁT TOÀN MÀN HÌNH</span>
               </button>
           </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden min-w-0">
          
          <Room3DScene
            roomWidth={roomWidth}
            roomDepth={roomDepth}
            roomType={roomType}
            configs={configs}
            positions={positions}
            selectedItemId={selectedItemId}
            onSelectItem={id => {
               if (id && configs[id]?.isVisible === false) return;
               setSelectedItemId(id);
            }}
            onUpdatePosition={updatePosition}
          />
          
          {/* Overlay Hints */}
          {!selectedItemId && (
            <div className={`absolute left-1/2 -translate-x-1/2 z-[90] pointer-events-none w-max transition-all ${
                isFullscreen ? 'top-12' : 'bottom-6'
            }`}>
              <div className={`px-4 py-2 rounded-full backdrop-blur flex items-center gap-2 shadow-lg border ${
                  isFullscreen ? 'bg-black/80 border-slate-600 text-white' : 'bg-black/60 border-slate-700 text-slate-300'
              }`}>
                <Move size={14} className={isFullscreen ? 'text-orange-400' : 'text-slate-400'} />
                <span className="text-xs font-medium">Bạn có thể dùng chuột chộp & kéo đồ vật — Bấm đúp để xoay</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        {showControls && (
          <div className="w-80 sm:w-88 shrink-0 bg-slate-800 flex flex-col h-full right-0 top-0 overflow-y-auto z-10 custom-scrollbar pb-6 text-sm">
            <div className="p-4 border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-20">
              <h4 className="text-white text-sm font-bold tracking-wider">THÔNG SỐ VẬT LIỆU</h4>
              <p className="text-slate-400 text-xs mt-1">Click vào đồ vật để tùy chỉnh kiểu dáng & màu</p>
            </div>

            <div className="p-4 space-y-4">
              {furniture.map(f => {
                const id = f.id;
                const isSelected = selectedItemId === id;
                const cfg = configs[id] || { height: 1, color: "#fff", width: f.w, depth: f.h, isVisible: true, styleVariant: "modern" };
                const preset = HEIGHT_PRESETS[id];
                const isHidden = cfg.isVisible === false;

                const hasStyles = id === "giuong" || id === "tu-quan-ao";
                const styles = id === "giuong" 
                  ? [{id: 'modern', label: 'Hiện Đại'}, {id: 'classic', label: 'Tân Cổ Điển'}, {id: 'minimalist', label: 'Tối Giản'}]
                  : id === "tu-quan-ao" 
                  ? [{id: 'modern', label: 'Cánh Phẳng'}, {id: 'classic', label: 'Cánh Huỳnh'}, {id: 'open', label: 'Không Cánh'}]
                  : [];

                return (
                  <div
                    key={id}
                    onClick={() => {
                        if (isHidden) return; 
                        setSelectedItemId(isSelected ? null : id);
                    }}
                    className={`rounded-xl border p-4 transition-all ${!isHidden ? 'cursor-pointer' : ''} shadow-sm ${
                      isSelected 
                        ? 'border-orange-500 bg-slate-700/80 shadow-orange-500/10' 
                        : isHidden ? 'border-dashed border-slate-700 bg-slate-900/30 opacity-60' : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: cfg.color }} />
                      <span className={`text-sm font-bold flex-1 ${isSelected ? 'text-white' : 'text-slate-300'} ${isHidden ? 'line-through' : ''}`}>
                        {f.name}
                      </span>
                      
                      {/* Quick Actions Header */}
                      <div className="flex gap-1">
                        {!isHidden && (
                            <button 
                                onClick={(e) => rotateItem(id, e)} 
                                className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors"
                                title="Xoay dọc/ngang"
                            >
                                <RotateCw size={14} />
                            </button>
                        )}
                        <button 
                            onClick={(e) => toggleVisibility(id, e)} 
                            className={`p-1.5 rounded transition-colors ${isHidden ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                            title={isHidden ? "Hiện lại" : "Ẩn đồ vật này"}
                        >
                            {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    {!isHidden && (
                        <div onClick={e => e.stopPropagation()}>
                            
                            {/* Style Preset Selector */}
                            {hasStyles && (
                                <div className="mb-4">
                                    <span className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 block">Kiểu Dáng</span>
                                    <div className="flex gap-2">
                                        {styles.map(st => (
                                            <button 
                                                key={st.id}
                                                onClick={() => updateConfig(id, "styleVariant", st.id)}
                                                className={`flex-1 py-1.5 rounded-md text-[11px] font-bold tracking-wide transition-colors ${cfg.styleVariant === st.id ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-600'}`}
                                            >
                                                {st.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dimension Sliders Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-3 p-3 bg-slate-900/50 rounded-lg">
                                {/* Width Slider */}
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[11px] text-slate-400 uppercase tracking-wide">Rộng X</span>
                                        <span className="text-xs font-bold text-slate-100">{cfg.width.toFixed(2)}m</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={MIN_WIDTH} max={MAX_WIDTH} step={0.05}
                                        value={cfg.width}
                                        onChange={e => updateConfig(id, "width", parseFloat(e.target.value))}
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-slate-700"
                                        style={{ accentColor: '#94a3b8' }}
                                    />
                                </div>

                                {/* Depth (Z) Slider */}
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[11px] text-slate-400 uppercase tracking-wide">Sâu Z</span>
                                        <span className="text-xs font-bold text-slate-100">{cfg.depth.toFixed(2)}m</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={MIN_WIDTH} max={MAX_WIDTH} step={0.05}
                                        value={cfg.depth}
                                        onChange={e => updateConfig(id, "depth", parseFloat(e.target.value))}
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-slate-700"
                                        style={{ accentColor: '#94a3b8' }}
                                    />
                                </div>
                            </div>

                            {/* Height Slider */}
                            {preset && (
                            <div className="mb-4">
                                <div className="flex justify-between items-end mb-1">
                                <span className="text-[11px] text-slate-400 uppercase tracking-wide">Cao Y</span>
                                <span className="text-xs font-extrabold text-white">{cfg.height.toFixed(2)}m</span>
                                </div>
                                <input
                                type="range"
                                min={preset.min} max={preset.max} step={preset.step}
                                value={cfg.height}
                                onChange={e => updateConfig(id, "height", parseFloat(e.target.value))}
                                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-800"
                                style={{ accentColor: cfg.color }}
                                />
                            </div>
                            )}

                            {/* Colors */}
                            <div>
                            <span className="text-[11px] text-slate-400 mb-2 block uppercase tracking-wide">Màu Sắc / Bề Mặt</span>
                            <div className="flex flex-wrap gap-2">
                                {COLOR_PALETTE.map(c => (
                                <button
                                    key={c}
                                    onClick={() => updateConfig(id, "color", c)}
                                    className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-125 ${cfg.color === c ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-slate-700/50'}`}
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                                ))}
                            </div>
                            </div>
                        </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
