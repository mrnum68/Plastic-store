"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Maximize2, Minimize2, Move, RotateCw, Eye, EyeOff, X, MessageCircle, Check, Phone, Send } from "lucide-react";
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

/* ─── Real-time Pricing Logic ─── */
const FURNITURE_UNIT_PRICES: Record<string, number> = {
  "giuong": 2600000,
  "tu-quan-ao": 3200000,
  "bep-tren": 1600000,
  "bep-duoi": 2500000,
  "ke-tivi": 1500000,
  "ban-hoc": 1200000,
  "ban-td": 1400000,
  "tab1": 500000,
  "tab2": 500000,
  "tu-lanh": 0, // Không tính
};

function useCountUp(target: number, duration = 400) {
    const [value, setValue] = useState(target);
    useEffect(() => {
        const start = value;
        const diff = target - start;
        if (diff === 0) return;
        const startTime = performance.now();
        let animationFrame: number;
        function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(start + diff * eased);
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
        }
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);
    return value;
}

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
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  const [showRoomSettings, setShowRoomSettings] = useState(false);
  const [localRoomDims, setLocalRoomDims] = useState({ 
      w: roomWidth, 
      d: roomDepth, 
      h: 2.6, 
      hasDoor: true, 
      hasWindow: false 
  });

  // Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    setLocalRoomDims(prev => ({ ...prev, w: roomWidth, d: roomDepth }));
    
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

  // Compute Estimate
  const estimatedTotal = useMemo(() => {
     let total = 0;
     furniture.forEach(f => {
         const cfg = configs[f.id];
         if (cfg && cfg.isVisible !== false) {
             const w = cfg.width || f.w;
             const priceMap = FURNITURE_UNIT_PRICES[f.id] || 0;
             total += w * priceMap;
         }
     });
     return total;
  }, [configs, furniture]);

  const animatedTotal = useCountUp(estimatedTotal);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate taking screenshot and pushing to Telegram/Zapier API
      setTimeout(() => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setTimeout(() => {
             setShowQuoteModal(false);
             setSubmitSuccess(false);
          }, 3000);
      }, 1500);
  };

  const wrapperClass = isFullscreen 
    ? "fixed inset-0 z-[999999] bg-slate-900 flex flex-col" 
    : "w-full max-w-full h-[85vh] min-h-[600px] lg:h-[700px] bg-slate-900 rounded-2xl flex flex-col overflow-hidden border border-slate-700 shadow-xl max-w-[100vw]";

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
                   {localRoomDims.w.toFixed(1)}m × {localRoomDims.d.toFixed(1)}m
               </span>
            </div>
            <div className="flex items-center gap-2">
               <button
                   onClick={() => setShowControls(v => !v)}
                   className="px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors border border-slate-600 whitespace-nowrap"
               >
                   {showControls ? "Ẩn Bảng Vật Liệu" : "Hiện Vật Liệu"}
               </button>
               <button
                   onClick={() => setIsFullscreen(true)}
                   className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-orange-600 hover:bg-orange-500 border border-orange-500 text-white rounded-lg font-bold text-xs transition-colors ml-1 sm:ml-2"
               >
                   <Maximize2 size={16} />
                   <span className="hidden sm:inline">Toàn Màn Hình</span>
               </button>
            </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
        
        {/* Canvas Area */}
        <div className="relative bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 min-w-0 shrink-0 lg:shrink h-[45vh] min-h-[300px] lg:h-auto lg:flex-1">
          <div className="absolute inset-0">
            <Room3DScene
              roomWidth={localRoomDims.w}
              roomDepth={localRoomDims.d}
              roomHeight={localRoomDims.h}
              hasDoor={localRoomDims.hasDoor}
              hasWindow={localRoomDims.hasWindow}
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
          </div>

          {/* Modest Exit Fullscreen Button */}
          {isFullscreen && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[99] pointer-events-auto">
                 <button
                     onClick={() => setIsFullscreen(false)}
                     className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-orange-600 hover:bg-orange-500 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(234,88,12,0.6)] border border-orange-400 transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
                 >
                     <Minimize2 size={20} className="sm:block hidden" strokeWidth={2.5} />
                     <span>THOÁT TOÀN MÀN HÌNH</span>
                 </button>
             </div>
          )}

          {/* Overlay Hints */}
          {!selectedItemId && (
            <div className={`absolute left-1/2 -translate-x-1/2 z-[90] pointer-events-none w-max transition-all ${
                isFullscreen ? 'top-6 lg:top-12' : 'bottom-6 hidden sm:block'
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
          <div className="w-full lg:w-80 xl:w-88 shrink-0 bg-slate-800 flex flex-col flex-1 lg:flex-none right-0 top-0 overflow-y-auto z-10 custom-scrollbar pb-6 text-sm">
            <div className={`p-4 border-b border-slate-700 bg-slate-800/80 backdrop-blur sticky top-0 z-20 ${isFullscreen ? 'lg:pt-12 border-b-2 border-orange-500/20' : ''}`}>
              <h4 className="text-white text-sm font-bold tracking-wider">THÔNG SỐ VẬT LIỆU</h4>
              <p className="text-slate-400 text-xs mt-1">Click vào đồ vật để tùy chỉnh kiểu dáng & màu</p>
            </div>

            <div className="p-4 space-y-4">
              
              {/* Room Settings (Bedrooms only) */}
              {!roomType.includes("bep") && (
                 <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden shadow-sm">
                    <button 
                        onClick={() => setShowRoomSettings(!showRoomSettings)}
                        className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                        <span className="text-sm font-bold text-slate-200">Cấu Trúc Phòng</span>
                        <span className="text-xs text-orange-400 font-bold">{showRoomSettings ? 'Ẩn' : 'Chỉnh sửa'}</span>
                    </button>
                    
                    {showRoomSettings && (
                        <div className="p-4 border-t border-slate-700 bg-slate-900/50 space-y-4">
                            {/* Sliders */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[11px] text-slate-400 uppercase tracking-wide">Chiều Rộng</span>
                                        <span className="text-xs font-bold text-slate-100">{localRoomDims.w.toFixed(1)}m</span>
                                    </div>
                                    <input
                                        type="range" min={2.0} max={6.0} step={0.1} value={localRoomDims.w}
                                        onChange={e => setLocalRoomDims(p => ({...p, w: parseFloat(e.target.value)}))}
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-orange-500"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[11px] text-slate-400 uppercase tracking-wide">Chiều Dài</span>
                                        <span className="text-xs font-bold text-slate-100">{localRoomDims.d.toFixed(1)}m</span>
                                    </div>
                                    <input
                                        type="range" min={2.0} max={6.0} step={0.1} value={localRoomDims.d}
                                        onChange={e => setLocalRoomDims(p => ({...p, d: parseFloat(e.target.value)}))}
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-orange-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-[11px] text-slate-400 uppercase tracking-wide">Chiều Cao Trần</span>
                                    <span className="text-xs font-bold text-slate-100">{localRoomDims.h.toFixed(1)}m</span>
                                </div>
                                <input
                                    type="range" min={2.2} max={3.6} step={0.1} value={localRoomDims.h}
                                    onChange={e => setLocalRoomDims(p => ({...p, h: parseFloat(e.target.value)}))}
                                    className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-orange-500"
                                />
                            </div>
                            {/* Toggles */}
                            <div className="flex gap-4 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox" checked={localRoomDims.hasDoor}
                                        onChange={e => setLocalRoomDims(p => ({...p, hasDoor: e.target.checked}))}
                                        className="rounded bg-slate-800 border-slate-600 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="text-[11px] uppercase tracking-wide text-slate-300 group-hover:text-white transition-colors">Cửa Chính</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="checkbox" checked={localRoomDims.hasWindow}
                                        onChange={e => setLocalRoomDims(p => ({...p, hasWindow: e.target.checked}))}
                                        className="rounded bg-slate-800 border-slate-600 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="text-[11px] uppercase tracking-wide text-slate-300 group-hover:text-white transition-colors">Cửa Sổ</span>
                                </label>
                            </div>
                        </div>
                    )}
                 </div>
              )}

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
                                    {id.includes("tu-quan-ao") && cfg.depth < 0.5 && (
                                        <p className="text-red-400 text-[10px] mt-1 font-semibold leading-tight">⚠️ Chú ý: Tủ áo sâu dưới 0.5m khó sản xuất.</p>
                                    )}
                                    {id.includes("bep-duoi") && cfg.depth < 0.6 && (
                                        <p className="text-red-400 text-[10px] mt-1 font-semibold leading-tight">⚠️ Mặt bếp dưới tối thiểu 0.6m.</p>
                                    )}
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
                                {COLOR_PALETTE.map(c => {
                                let label = "Màu Sơn Trơn";
                                if (c === "#f8fafc" || c === "#bae6fd" || c === "#e2e8f0") label = "Màu Đơn Sắc (Nhựa Ecoplast)";
                                if (c === "#b47d53" || c === "#936136" || c === "#794c25" || c === "#a16207") label = "Màu Vân Gỗ (Nhựa Vincoplast)";
                                if (c === "#1e293b" || c === "#334155") label = "Màu Đen Nhám (Ecoplast Cao Cấp)";

                                return (
                                <button
                                    key={c}
                                    onClick={() => updateConfig(id, "color", c)}
                                    className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-125 ${cfg.color === c ? 'border-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-slate-700/50'}`}
                                    style={{ backgroundColor: c }}
                                    title={label}
                                />
                                );
                                })}
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

      {/* Quote/Lead Form Modal */}
      {showQuoteModal && (
          <div className="fixed inset-0 z-[9999999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={() => setShowQuoteModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2"><X size={20}/></button>
                  <div className="p-6 pb-2 border-b border-slate-100 bg-orange-50/50">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                          <MessageCircle size={24} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800 mb-1">Gửi Báo Giá Chi Tiết</h3>
                      <p className="text-sm text-slate-600 font-medium mb-4">Để nhận bảng phụ kiện chính xác cho bản vẽ hiện tại, vui lòng để lại số Zalo để KTS gửi ngay cho bạn.</p>
                  </div>
                  {submitSuccess ? (
                      <div className="p-6 text-center">
                          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                              <Check size={32} strokeWidth={3} />
                          </div>
                          <h4 className="text-xl font-bold text-slate-800 mb-2">Thành công!</h4>
                          <p className="text-sm text-slate-600">Bản thiết kế 3D và thông tin kích thước đã được hệ thống lưu lại. Chuyên viên sẽ phản hồi bạn qua Zalo trong vài phút tới.</p>
                      </div>
                  ) : (
                      <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Họ & Tên</label>
                              <input required type="text" placeholder="Anh/Chị tên là gì?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800 font-medium" onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại (Zalo)</label>
                              <div className="relative">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                  <input required type="tel" placeholder="09xx xxx xxx" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800 font-medium" onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} />
                              </div>
                          </div>
                          <button disabled={isSubmitting} type="submit" className={`w-full text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 uppercase tracking-wider mt-2 ${isSubmitting ? 'bg-orange-400 pointer-events-none' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border border-orange-400'}`}>
                              {isSubmitting ? <span className="animate-pulse">Đang gửi biểu mẫu...</span> : <><Send size={18} /> Nhận Báo Giá Miễn Phí</>}
                          </button>
                      </form>
                  )}
              </div>
          </div>
      )}
    </div>
  );
}
