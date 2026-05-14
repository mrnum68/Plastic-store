"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { type KitchenConfig, type LowerModuleType, type UpperModuleType } from "./kitchen3d/KitchenScene";

// Next.js dynamic import (ssr: false)
const KitchenScene = dynamic(
  () => import("./kitchen3d/KitchenScene").then(m => m.KitchenScene),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center"><span className="text-slate-500">Đang tải 3D...</span></div> }
);

/* ─── Pricing Constants ─── */
type MaterialKey = "penco" | "golden" | "ecoplast" | "chinhue";
const MATERIAL_CONFIG: Record<MaterialKey, { name: string; upperPrice: number; lowerPrice: number }> = {
  golden: { name: "Nhựa Golden", upperPrice: 1200000, lowerPrice: 1500000 },
  penco: { name: "Nhựa Penco", upperPrice: 1400000, lowerPrice: 1800000 },
  ecoplast: { name: "Nhựa Ecoplast", upperPrice: 1600000, lowerPrice: 2500000 },
  chinhue: { name: "Nhựa Chinhue Plus", upperPrice: 1800000, lowerPrice: 2800000 },
};

const HINGE_PRICE = 25000;
const HANDLE_PRICE = 35000;

/* ─── Module Types ─── */
interface UIModule {
  id: string;
  type: string;
  label: string;
  width: number;
  flex: boolean;
  icon: string;
  enabled: boolean;
}

const DEFAULT_LOWER: UIModule[] = [
  { id: 'l1', type: 'drawer', label: 'Tủ Thường (Lấp đầy)', width: 600, flex: true, icon: '🚪', enabled: true },
  { id: 'l2', type: 'stove', label: 'Bếp Nấu', width: 800, flex: false, icon: '🔥', enabled: true },
  { id: 'l3', type: 'spice', label: 'Gia Vị', width: 400, flex: false, icon: '🧂', enabled: false },
  { id: 'l4', type: 'sink', label: 'Bồn Rửa', width: 800, flex: false, icon: '🚿', enabled: true },
  { id: 'l5', type: 'dish-rack', label: 'Tủ Chén Bát (Dưới)', width: 800, flex: false, icon: '🥣', enabled: false },
  { id: 'l6', type: 'dw', label: 'Máy Rửa Bát', width: 600, flex: false, icon: '🍽️', enabled: false },
  { id: 'l7', type: 'rice', label: 'Tủ Gạo', width: 300, flex: false, icon: '🌾', enabled: false },
];

const DEFAULT_UPPER: UIModule[] = [
  { id: 'u1', type: 'drawer', label: 'Tủ Thường (Lấp đầy)', width: 600, flex: true, icon: '🚪', enabled: true },
  { id: 'u2', type: 'hood', label: 'Hút Mùi', width: 800, flex: false, icon: '💨', enabled: true },
  { id: 'u3', type: 'dish-rack', label: 'Kệ Chén (Trên)', width: 800, flex: false, icon: '🍽️', enabled: false },
  { id: 'u4', type: 'altar', label: 'Bàn Thờ Ông Táo', width: 450, flex: false, icon: '🙏', enabled: true },
];

function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4 px-2 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h3>
  );
}

/* ─── Main Component ─── */
export default function KitchenConfigurator3D() {
  /* State */
  const [layout, setLayout] = useState<"I" | "L">("L");
  const [lengthA, setLengthA] = useState(3000);
  const [lengthB, setLengthB] = useState(2000);
  const [material, setMaterial] = useState<MaterialKey>("ecoplast");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Module state
  const [lowerItems, setLowerItems] = useState<UIModule[]>(DEFAULT_LOWER);
  const [upperItems, setUpperItems] = useState<UIModule[]>(DEFAULT_UPPER);

  const moveItem = (arr: UIModule[], setArr: (val: UIModule[]) => void, index: number, dir: -1 | 1) => {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    const copy = [...arr];
    [copy[index], copy[newIdx]] = [copy[newIdx], copy[index]];
    setArr(copy);
  };

  const toggleItem = (arr: UIModule[], setArr: (val: UIModule[]) => void, id: string) => {
    setArr(arr.map(i => i.id === id && !i.flex ? { ...i, enabled: !i.enabled } : i));
  };

  /* Derived for Scene config */
  const lowerModules = useMemo(() => lowerItems.filter(i => i.enabled).map(i => ({
    id: i.id, type: i.type as LowerModuleType, width: i.width, flex: i.flex
  })), [lowerItems]);

  const upperModules = useMemo(() => upperItems.filter(i => i.enabled).map(i => ({
    id: i.id, type: i.type as UpperModuleType, width: i.width, flex: i.flex
  })), [upperItems]);

  const sceneConfig: KitchenConfig = {
    layout, lengthA, lengthB,
    upperHeight: 700, upperDepth: 350,
    lowerHeight: 850, lowerDepth: 600,
    lowerModules, upperModules,
    material,
  };

  /* Pricing (Estimate based on linear meter) */
  const matCfg = MATERIAL_CONFIG[material];
  const linearMeters = (lengthA / 1000) + (layout === "L" ? (lengthB / 1000) : 0);
  const doorsEstimate = Math.max(0, Math.round(linearMeters / 0.5) * 2); // roughly 1 door per 500mm x 2 layers

  const hingesCost = doorsEstimate * 2 * HINGE_PRICE;
  const handlesCost = doorsEstimate * HANDLE_PRICE;
  const upperCost = linearMeters * matCfg.upperPrice;
  const lowerCost = linearMeters * matCfg.lowerPrice;
  const totalCost = upperCost + lowerCost + hingesCost + handlesCost;

  const fmt = (v: number) => Math.round(v).toLocaleString('vi-VN');

  const canvasSection = (
    <div className={isFullscreen ? "fixed inset-0 z-[9999]" : "absolute inset-0"}>
      <KitchenScene config={sceneConfig} />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm text-slate-300 text-[11px] px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
          <span>🖱️</span> Kéo xoay · Cuộn zoom · Nhấn giữ Shift để Pan
        </div>
      </div>
      <button
        onClick={() => setIsFullscreen(f => !f)}
        className="absolute top-3 right-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
      >
        {isFullscreen ? "↙ Thu nhỏ" : "↗ Toàn màn hình"}
      </button>
    </div>
  );

  const renderModuleList = (items: UIModule[], setArr: (val: UIModule[]) => void) => (
    <div className="space-y-1 mt-2">
      {items.map((item, idx) => (
        <div key={item.id} className={`flex items-center gap-2 p-2 rounded-lg border ${item.enabled ? 'bg-slate-800 border-slate-700' : 'bg-slate-800/40 border-slate-700/50 opacity-60'} transition-all`}>
          <label className="flex items-center gap-2 cursor-pointer relative z-10 w-8 pl-1">
            {item.flex ? (
              <input type="checkbox" checked readOnly disabled className="accent-orange-500 w-3.5 h-3.5 cursor-not-allowed opacity-50" />
            ) : (
              <input type="checkbox" checked={item.enabled} onChange={() => toggleItem(items, setArr, item.id)} className="accent-orange-500 w-3.5 h-3.5" />
            )}
          </label>
          <div className="flex-1 min-w-0" onClick={() => !item.flex && toggleItem(items, setArr, item.id)}>
            <div className="text-xs font-medium text-slate-200 truncate cursor-pointer select-none">
              <span className="mr-2">{item.icon}</span>{item.label}
            </div>
            <div className="text-[10px] text-slate-500">
              {item.flex ? "Kích thước tự động bồi đắp" : `Kích thước: ${item.width}mm`}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <button onClick={() => moveItem(items, setArr, idx, -1)} disabled={idx === 0} className="text-slate-500 hover:text-white disabled:opacity-30 p-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg></button>
            <button onClick={() => moveItem(items, setArr, idx, 1)} disabled={idx === items.length - 1} className="text-slate-500 hover:text-white disabled:opacity-30 p-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800" style={{ height: "calc(100vh - 5rem)" }}>
      
      {/* ── Sidebar Controls ── */}
      <div className="w-full lg:w-80 flex flex-col bg-slate-800/50 border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🍳</span> Configurator Bếp 3D
            </h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Tùy biến module trực quan</p>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-0.5 overflow-y-auto min-h-0 bg-slate-900/50 hook-scrollbar">
          
          <SectionHeading icon="📐" title="Hình dáng" />
          <div className="grid grid-cols-2 gap-2 p-2">
            <button onClick={() => setLayout("I")} className={`py-1.5 text-xs font-bold rounded-lg border transition ${layout === "I" ? "bg-slate-800 border-orange-500 text-orange-400" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>━ Thẳng (I)</button>
            <button onClick={() => setLayout("L")} className={`py-1.5 text-xs font-bold rounded-lg border transition ${layout === "L" ? "bg-slate-800 border-orange-500 text-orange-400" : "border-slate-700 text-slate-400 hover:border-slate-500"}`}>┛ Góc (L)</button>
          </div>

          <div className="px-2 pb-2 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-slate-400 font-medium">Chiều dài A</span><span className="text-white font-bold">{lengthA}mm</span></div>
              <input type="range" min={1500} max={6000} step={100} value={lengthA} onChange={e => setLengthA(Number(e.target.value))} className="w-full accent-orange-500 h-1.5 bg-slate-700 rounded-lg" />
            </div>
            {layout === "L" && (
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-400 font-medium">Chiều dài B</span><span className="text-white font-bold">{lengthB}mm</span></div>
                 <input type="range" min={1000} max={4000} step={100} value={lengthB} onChange={e => setLengthB(Number(e.target.value))} className="w-full accent-orange-500 h-1.5 bg-slate-700 rounded-lg" />
              </div>
            )}
          </div>

          <SectionHeading icon="🧊" title="Chất liệu nhựa" />
          <div className="p-2">
            <select value={material} onChange={e => setMaterial(e.target.value as MaterialKey)} className="w-full bg-slate-800 border border-slate-600 text-sm font-medium text-white rounded-lg px-3 py-2 outline-none focus:border-orange-500">
              {Object.entries(MATERIAL_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 border-t border-slate-800/80 pt-2">
             <SectionHeading icon="👇" title="Sắp xếp Tủ Dưới" />
             <p className="text-[10px] text-slate-500 px-2 italic">Tick bật/tắt và di chuyển ↕ để thay đổi vị trí từ trái qua phải</p>
             {renderModuleList(lowerItems, setLowerItems)}
          </div>

          <div className="mt-6 border-t border-slate-800/80 pt-2 mb-4">
             <SectionHeading icon="👆" title="Sắp xếp Tủ Trên" />
             {renderModuleList(upperItems, setUpperItems)}
          </div>
        </div>

        {/* ── Pricing Footer ── */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 shrink-0">
          <SectionHeading icon="💰" title="Dự toán sơ bộ" />
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-slate-400">Tủ trên ({linearMeters.toFixed(1)}md)</span><span className="text-slate-200">{fmt(upperCost)}đ</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tủ dưới ({linearMeters.toFixed(1)}md)</span><span className="text-slate-200">{fmt(lowerCost)}đ</span></div>
            <div className="flex justify-between pb-2 border-b border-slate-800"><span className="text-slate-400">Phụ kiện (khoảng)</span><span className="text-slate-200">{fmt(hingesCost + handlesCost)}đ</span></div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-slate-300 font-medium text-sm">TỔNG CỘNG</span>
              <span className="text-orange-500 font-bold text-xl">{fmt(totalCost)}đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3D Viewport ── */}
      <div className="flex-1 relative bg-slate-900">
        {canvasSection}
      </div>
    </div>
  );
}
