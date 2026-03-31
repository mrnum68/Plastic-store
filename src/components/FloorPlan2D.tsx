"use client";

import { useMemo, useState, useRef, useCallback, useEffect } from "react";

/* ─── Furniture definitions ─── */
export interface FurnitureItem {
    id: string;
    name: string;
    w: number; // meters
    h: number; // meters
    color: string;
    label: string;
}

export const ROOM_FURNITURE: Record<string, FurnitureItem[]> = {
    "phong-ngu-master": [
        { id: "giuong", name: "Giường 1m8", w: 2.0, h: 1.8, color: "#f59e0b", label: "Giường 1.8md" },
        { id: "tu-quan-ao", name: "Tủ Áo 1.8md", w: 1.82, h: 0.5, color: "#8b5cf6", label: "Tủ Áo 1.8md" },
        { id: "ban-td", name: "Bàn Trang Điểm", w: 0.8, h: 0.45, color: "#ec4899", label: "Bàn TD" },
        { id: "ke-tivi", name: "Kệ Tivi 1.4md", w: 1.4, h: 0.4, color: "#06b6d4", label: "Kệ Tivi" },
        { id: "tab1", name: "Tab Đầu Giường", w: 0.45, h: 0.4, color: "#a3a3a3", label: "Tab" },
        { id: "tab2", name: "Tab Đầu Giường", w: 0.45, h: 0.4, color: "#a3a3a3", label: "Tab" },
    ],
    "phong-ngu-nho": [
        { id: "giuong", name: "Giường 1m6", w: 2.0, h: 1.6, color: "#f59e0b", label: "Giường 1.6md" },
        { id: "tu-quan-ao", name: "Tủ Áo 1md", w: 1.0, h: 0.5, color: "#8b5cf6", label: "Tủ Áo 1md" },
        { id: "tab1", name: "Tab Đầu Giường", w: 0.45, h: 0.4, color: "#a3a3a3", label: "Tab" },
    ],
    "phong-ngu-tre-em": [
        { id: "giuong", name: "Giường 1m6", w: 2.0, h: 1.6, color: "#f59e0b", label: "Giường 1.6md" },
        { id: "tu-quan-ao", name: "Tủ Áo 1md", w: 1.0, h: 0.5, color: "#8b5cf6", label: "Tủ Áo 1md" },
        { id: "ban-hoc", name: "Bàn Học Sinh", w: 0.6, h: 0.45, color: "#22c55e", label: "Bàn Học" },
    ],
    "nha-bep": [
        { id: "bep-tren", name: "Tủ Bếp Trên", w: 2.5, h: 0.35, color: "#ea580c", label: "Tủ Bếp Trên" },
        { id: "bep-duoi", name: "Tủ Bếp Dưới", w: 2.5, h: 0.6, color: "#dc2626", label: "Tủ Bếp Dưới" },
        { id: "tu-lanh", name: "Tủ Lạnh", w: 0.6, h: 0.7, color: "#64748b", label: "Tủ Lạnh" },
    ],
};

interface Placed {
    id: string;
    item: FurnitureItem;
    x: number; // meters
    y: number; // meters
    rotated: boolean;
}

function initialPlace(roomW: number, roomH: number, furniture: FurnitureItem[], roomType: string): Placed[] {
    const G = 0.05;
    const placed: Placed[] = [];

    if (roomType === "nha-bep") {
        furniture.forEach(f => {
            if (f.id === "bep-duoi") placed.push({ id: f.id, item: f, x: G, y: roomH - f.h - G, rotated: false });
            else if (f.id === "bep-tren") placed.push({ id: f.id, item: f, x: G, y: roomH - f.h - 0.6 - 0.65, rotated: false });
            else if (f.id === "tu-lanh") placed.push({ id: f.id, item: f, x: roomW - f.w - G, y: roomH - f.h - G, rotated: false });
        });
        return placed;
    }

    const bed = furniture.find(f => f.id === "giuong");
    const wardrobe = furniture.find(f => f.id === "tu-quan-ao");
    const dresser = furniture.find(f => f.id === "ban-td");
    const tvStand = furniture.find(f => f.id === "ke-tivi");
    const desk = furniture.find(f => f.id === "ban-hoc");
    const tabs = furniture.filter(f => f.id.startsWith("tab"));

    if (bed) {
        const bx = (roomW - bed.h) / 2;
        const by = roomH - bed.w - G;
        placed.push({ id: bed.id, item: bed, x: bx, y: by, rotated: false });
        tabs.forEach((tab, i) => {
            placed.push({
                id: tab.id, item: tab,
                x: i === 0 ? bx - tab.w - 0.05 : bx + bed.h + 0.05,
                y: roomH - tab.h - G, rotated: false
            });
        });
    }
    if (wardrobe) placed.push({ id: wardrobe.id, item: wardrobe, x: G, y: G, rotated: false });
    if (dresser) placed.push({ id: dresser.id, item: dresser, x: roomW - dresser.w - G, y: G, rotated: false });
    if (tvStand) placed.push({ id: tvStand.id, item: tvStand, x: (roomW - tvStand.w) / 2, y: G + (wardrobe ? wardrobe.h + 0.1 : 0), rotated: false });
    if (desk) placed.push({ id: desk.id, item: desk, x: roomW - desk.w - G, y: G, rotated: false });

    return placed;
}

/* ─── Detailed furniture SVG renderers ─── */
function BedSVG({ x, y, w, h, color, label }: { x: number; y: number; w: number; h: number; color: string; label: string }) {
    return (
        <g>
            {/* Frame */}
            <rect x={x} y={y} width={w} height={h} fill={color + "20"} stroke={color} strokeWidth="2" rx="5" />
            {/* Headboard */}
            <rect x={x + 2} y={y + 2} width={w - 4} height={h * 0.08} fill={color + "55"} rx="3" />
            {/* Pillow left */}
            <rect x={x + w * 0.12} y={y + h * 0.1} width={w * 0.33} height={h * 0.15} fill="white" stroke={color + "66"} strokeWidth="1" rx="6" />
            {/* Pillow right */}
            <rect x={x + w * 0.55} y={y + h * 0.1} width={w * 0.33} height={h * 0.15} fill="white" stroke={color + "66"} strokeWidth="1" rx="6" />
            {/* Mattress area */}
            <rect x={x + 4} y={y + h * 0.28} width={w - 8} height={h * 0.65} fill={color + "10"} stroke={color + "33"} strokeWidth="1" rx="4" />
            {/* Blanket fold */}
            <line x1={x + 6} y1={y + h * 0.55} x2={x + w - 6} y2={y + h * 0.55} stroke={color + "44"} strokeWidth="1.5" strokeDasharray="6 3" />
            {/* Label */}
            <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

function WardrobeSVG({ x, y, w, h, color, label, doors }: { x: number; y: number; w: number; h: number; color: string; label: string; doors: number }) {
    const dw = (w - 6) / doors;
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="2" rx="4" />
            {/* Door panels */}
            {Array.from({ length: doors }, (_, i) => (
                <g key={i}>
                    <rect x={x + 3 + i * dw} y={y + 3} width={dw - 2} height={h - 6} fill={color + "12"} stroke={color + "55"} strokeWidth="1" rx="2" />
                    {/* Handle */}
                    <circle cx={i < doors / 2 ? x + 3 + (i + 1) * dw - 6 : x + 3 + i * dw + 4} cy={y + h / 2} r="2.5" fill={color} />
                </g>
            ))}
            <text x={x + w / 2} y={y + h + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

function DeskSVG({ x, y, w, h, color, label }: { x: number; y: number; w: number; h: number; color: string; label: string }) {
    return (
        <g>
            {/* Desktop */}
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="2" rx="3" />
            {/* Desk surface */}
            <rect x={x + 3} y={y + 3} width={w - 6} height={h * 0.4} fill={color + "28"} rx="2" />
            {/* Drawer */}
            <rect x={x + w * 0.15} y={y + h * 0.55} width={w * 0.7} height={h * 0.35} fill={color + "15"} stroke={color + "44"} strokeWidth="1" rx="2" />
            <line x1={x + w * 0.38} y1={y + h * 0.66} x2={x + w * 0.62} y2={y + h * 0.66} stroke={color + "88"} strokeWidth="1.5" strokeLinecap="round" />
            <text x={x + w / 2} y={y + h + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

function TvStandSVG({ x, y, w, h, color, label }: { x: number; y: number; w: number; h: number; color: string; label: string }) {
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="2" rx="3" />
            {/* TV screen */}
            <rect x={x + w * 0.15} y={y + 3} width={w * 0.7} height={h * 0.55} fill={color + "22"} stroke={color + "55"} strokeWidth="1" rx="2" />
            {/* Shelf */}
            <line x1={x + 4} y1={y + h * 0.7} x2={x + w - 4} y2={y + h * 0.7} stroke={color + "55"} strokeWidth="1" />
            <text x={x + w / 2} y={y + h + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

function NightstandSVG({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) {
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="1.5" rx="3" />
            {/* Drawer */}
            <rect x={x + 3} y={y + h * 0.2} width={w - 6} height={h * 0.35} fill={color + "12"} stroke={color + "44"} strokeWidth="0.8" rx="2" />
            <circle cx={x + w / 2} cy={y + h * 0.38} r="1.5" fill={color + "88"} />
            {/* Bottom shelf */}
            <rect x={x + 3} y={y + h * 0.62} width={w - 6} height={h * 0.3} fill={color + "08"} stroke={color + "33"} strokeWidth="0.8" rx="2" />
        </g>
    );
}

function KitchenCabinetSVG({ x, y, w, h, color, label, isUpper }: { x: number; y: number; w: number; h: number; color: string; label: string; isUpper: boolean }) {
    const doors = Math.max(2, Math.round(w / 40));
    const dw = (w - 4) / doors;
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="2" rx="3" />
            {Array.from({ length: doors }, (_, i) => (
                <g key={i}>
                    <rect x={x + 2 + i * dw} y={y + 2} width={dw - 2} height={h - 4} fill={color + "10"} stroke={color + "44"} strokeWidth="0.8" rx="2" />
                    <circle cx={x + 2 + i * dw + dw / 2} cy={isUpper ? y + h - 6 : y + 6} r="1.8" fill={color} />
                </g>
            ))}
            {/* Sink if lower */}
            {!isUpper && <ellipse cx={x + w * 0.7} cy={y + h * 0.4} rx={w * 0.08} ry={h * 0.25} fill={color + "11"} stroke={color + "55"} strokeWidth="1" />}
            <text x={x + w / 2} y={isUpper ? y - 5 : y + h + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

function FridgeSVG({ x, y, w, h, color, label }: { x: number; y: number; w: number; h: number; color: string; label: string }) {
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} fill={color + "18"} stroke={color} strokeWidth="2" rx="4" />
            {/* Top freezer */}
            <rect x={x + 3} y={y + 3} width={w - 6} height={h * 0.3} fill={color + "12"} stroke={color + "44"} strokeWidth="1" rx="2" />
            <line x1={x + w - 8} y1={y + 8} x2={x + w - 8} y2={y + h * 0.28} stroke={color} strokeWidth="2" strokeLinecap="round" />
            {/* Bottom fridge */}
            <rect x={x + 3} y={y + h * 0.35} width={w - 6} height={h * 0.6} fill={color + "08"} stroke={color + "33"} strokeWidth="1" rx="2" />
            <line x1={x + w - 8} y1={y + h * 0.4} x2={x + w - 8} y2={y + h * 0.7} stroke={color} strokeWidth="2" strokeLinecap="round" />
            <text x={x + w / 2} y={y + h + 13} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{label}</text>
        </g>
    );
}

/* ─── Render the right SVG for each furniture type ─── */
function FurnitureSVGItem({ item, px, py, pw, ph }: { item: FurnitureItem; px: number; py: number; pw: number; ph: number }) {
    const id = item.id;
    if (id === "giuong") return <BedSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} />;
    if (id === "tu-quan-ao") return <WardrobeSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} doors={Math.max(2, Math.round(pw / 30))} />;
    if (id === "ban-td" || id === "ban-hoc") return <DeskSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} />;
    if (id === "ke-tivi") return <TvStandSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} />;
    if (id.startsWith("tab")) return <NightstandSVG x={px} y={py} w={pw} h={ph} color={item.color} />;
    if (id === "bep-tren") return <KitchenCabinetSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} isUpper={true} />;
    if (id === "bep-duoi") return <KitchenCabinetSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} isUpper={false} />;
    if (id === "tu-lanh") return <FridgeSVG x={px} y={py} w={pw} h={ph} color={item.color} label={item.label} />;
    // Fallback
    return (
        <g>
            <rect x={px} y={py} width={pw} height={ph} fill={item.color + "22"} stroke={item.color} strokeWidth="2" rx="4" />
            <text x={px + pw / 2} y={py + ph / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={item.color}>{item.label}</text>
        </g>
    );
}

/* ─── Main Component ─── */
interface FloorPlan2DProps {
    roomWidth: number;
    roomHeight: number;
    roomType: string;
}

export default function FloorPlan2D({ roomWidth, roomHeight, roomType }: FloorPlan2DProps) {
    const furniture = ROOM_FURNITURE[roomType] || [];
    const svgRef = useRef<SVGSVGElement>(null);
    const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const PADDING = 50;
    const MAX_SVG = 440;
    const scale = MAX_SVG / Math.max(roomWidth, roomHeight);
    const svgW = roomWidth * scale;
    const svgH = roomHeight * scale;
    const totalW = svgW + PADDING * 2;
    const totalH = svgH + PADDING * 2;

    // Initialize placed furniture
    const [items, setItems] = useState<Placed[]>(() => initialPlace(roomWidth, roomHeight, furniture, roomType));

    // Reset when room type or dimensions change
    useEffect(() => {
        setItems(initialPlace(roomWidth, roomHeight, furniture, roomType));
    }, [roomWidth, roomHeight, roomType]);

    const getSVGPoint = useCallback((clientX: number, clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, y: 0 };
        const rect = svg.getBoundingClientRect();
        const viewW = totalW;
        const viewH = totalH;
        const scaleX = viewW / rect.width;
        const scaleY = viewH / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
        };
    }, [totalW, totalH]);

    // Get effective dimensions (swapped if rotated)
    const getEffective = (p: Placed) => ({
        ew: p.rotated ? p.item.h : p.item.w,
        eh: p.rotated ? p.item.w : p.item.h,
    });

    const WALL_SNAP = 0.3; // snap within 30cm of wall

    const handlePointerDown = useCallback((e: React.PointerEvent, idx: number) => {
        e.preventDefault();
        e.stopPropagation();
        const pt = getSVGPoint(e.clientX, e.clientY);
        const p = items[idx];
        const { ew, eh } = getEffective(p);
        setDragOffset({
            x: pt.x - (PADDING + p.x * scale),
            y: pt.y - (PADDING + p.y * scale),
        });
        setDraggingIdx(idx);
        (e.target as Element).setPointerCapture?.(e.pointerId);
    }, [items, scale, getSVGPoint]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (draggingIdx === null) return;
        const pt = getSVGPoint(e.clientX, e.clientY);
        const p = items[draggingIdx];
        const { ew, eh } = getEffective(p);
        let newX = (pt.x - dragOffset.x - PADDING) / scale;
        let newY = (pt.y - dragOffset.y - PADDING) / scale;
        // Clamp within room
        newX = Math.max(0, Math.min(newX, roomWidth - ew));
        newY = Math.max(0, Math.min(newY, roomHeight - eh));
        // Wall snap
        if (newX < WALL_SNAP) newX = 0;
        if (newY < WALL_SNAP) newY = 0;
        if (newX > roomWidth - ew - WALL_SNAP) newX = roomWidth - ew;
        if (newY > roomHeight - eh - WALL_SNAP) newY = roomHeight - eh;
        // Snap to 0.1m grid
        newX = Math.round(newX * 10) / 10;
        newY = Math.round(newY * 10) / 10;
        setItems(prev => prev.map((pi, i) => i === draggingIdx ? { ...pi, x: newX, y: newY } : pi));
    }, [draggingIdx, dragOffset, items, scale, roomWidth, roomHeight, getSVGPoint]);

    const handlePointerUp = useCallback(() => {
        setDraggingIdx(null);
    }, []);

    const handleRotate = useCallback((idx: number) => {
        setItems(prev => prev.map((p, i) => {
            if (i !== idx) return p;
            const { ew, eh } = getEffective(p);
            const newRotated = !p.rotated;
            const newEW = newRotated ? p.item.h : p.item.w;
            const newEH = newRotated ? p.item.w : p.item.h;
            // Keep centered after rotation
            let newX = p.x + (ew - newEW) / 2;
            let newY = p.y + (eh - newEH) / 2;
            // Clamp
            newX = Math.max(0, Math.min(newX, roomWidth - newEW));
            newY = Math.max(0, Math.min(newY, roomHeight - newEH));
            // Wall snap after rotate
            if (newX < WALL_SNAP) newX = 0;
            if (newY < WALL_SNAP) newY = 0;
            if (newX > roomWidth - newEW - WALL_SNAP) newX = roomWidth - newEW;
            if (newY > roomHeight - newEH - WALL_SNAP) newY = roomHeight - newEH;
            newX = Math.round(newX * 10) / 10;
            newY = Math.round(newY * 10) / 10;
            return { ...p, rotated: newRotated, x: newX, y: newY };
        }));
    }, [roomWidth, roomHeight]);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">📐 Sơ Đồ Mặt Bằng</h4>
                <span className="text-xs text-slate-400">{roomWidth}m × {roomHeight}m = {(roomWidth * roomHeight).toFixed(1)}m²</span>
            </div>
            <p className="text-xs text-orange-500 mb-2 font-medium">💡 Kéo thả để di chuyển · Nhấn đúp (hoặc nút 🔄) để xoay · Tự hút sát tường</p>

            <svg
                ref={svgRef}
                viewBox={`0 0 ${totalW} ${totalH}`}
                className="w-full h-auto select-none"
                style={{ maxHeight: 480, cursor: draggingIdx !== null ? "grabbing" : "default" }}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* BG */}
                <rect x="0" y="0" width={totalW} height={totalH} fill="#fafafa" rx="12" />

                {/* Room */}
                <rect x={PADDING} y={PADDING} width={svgW} height={svgH} fill="#fffbf5" stroke="#f97316" strokeWidth="3" rx="2" />

                {/* Wall hatching */}
                <defs>
                    <pattern id="wallHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="6" stroke="#fdba74" strokeWidth="1" />
                    </pattern>
                </defs>
                {/* Left wall */}
                <rect x={PADDING - 8} y={PADDING} width={8} height={svgH} fill="url(#wallHatch)" />
                {/* Right wall */}
                <rect x={PADDING + svgW} y={PADDING} width={8} height={svgH} fill="url(#wallHatch)" />
                {/* Top wall */}
                <rect x={PADDING} y={PADDING - 8} width={svgW} height={8} fill="url(#wallHatch)" />
                {/* Bottom wall */}
                <rect x={PADDING} y={PADDING + svgH} width={svgW} height={8} fill="url(#wallHatch)" />

                {/* Grid */}
                {Array.from({ length: Math.floor(roomWidth) }, (_, i) => (
                    <line key={`gv${i}`} x1={PADDING + (i + 1) * scale} y1={PADDING} x2={PADDING + (i + 1) * scale} y2={PADDING + svgH} stroke="#fed7aa" strokeWidth="0.5" strokeDasharray="4 4" />
                ))}
                {Array.from({ length: Math.floor(roomHeight) }, (_, i) => (
                    <line key={`gh${i}`} x1={PADDING} y1={PADDING + (i + 1) * scale} x2={PADDING + svgW} y2={PADDING + (i + 1) * scale} stroke="#fed7aa" strokeWidth="0.5" strokeDasharray="4 4" />
                ))}

                {/* Dimension: width */}
                <line x1={PADDING} y1={PADDING - 22} x2={PADDING + svgW} y2={PADDING - 22} stroke="#94a3b8" strokeWidth="1" markerStart="url(#aL)" markerEnd="url(#aR)" />
                <text x={PADDING + svgW / 2} y={PADDING - 28} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{roomWidth}m</text>

                {/* Dimension: height */}
                <line x1={PADDING - 22} y1={PADDING} x2={PADDING - 22} y2={PADDING + svgH} stroke="#94a3b8" strokeWidth="1" markerStart="url(#aU)" markerEnd="url(#aD)" />
                <text x={PADDING - 28} y={PADDING + svgH / 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569" transform={`rotate(-90, ${PADDING - 28}, ${PADDING + svgH / 2})`}>{roomHeight}m</text>

                {/* Door */}
                <g>
                    <rect x={PADDING + svgW / 2 - 22} y={PADDING - 10} width={44} height={10} fill="#f97316" rx="2" />
                    <text x={PADDING + svgW / 2} y={PADDING + 14} textAnchor="middle" fontSize="9" fill="#f97316" fontWeight="bold">CỬA</text>
                    {/* Door arc */}
                    <path d={`M ${PADDING + svgW / 2 - 22} ${PADDING} A 44 44 0 0 1 ${PADDING + svgW / 2 + 22} ${PADDING}`} fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" />
                </g>

                {/* Furniture items - draggable & rotatable */}
                {items.map((p, idx) => {
                    const { ew, eh } = getEffective(p);
                    const px = PADDING + p.x * scale;
                    const py = PADDING + p.y * scale;
                    const pw = ew * scale;
                    const ph = eh * scale;
                    const isDragging = draggingIdx === idx;

                    return (
                        <g key={`${p.id}-${idx}`}>
                            {/* Drop shadow when dragging */}
                            {isDragging && (
                                <rect x={px + 3} y={py + 3} width={pw} height={ph} fill="rgba(0,0,0,0.1)" rx="4" />
                            )}
                            {/* Draggable furniture */}
                            <g
                                onPointerDown={e => handlePointerDown(e, idx)}
                                onDoubleClick={() => handleRotate(idx)}
                                style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
                                opacity={isDragging ? 0.8 : 1}
                            >
                                {p.rotated ? (
                                    <g transform={`translate(${px + pw / 2}, ${py + ph / 2}) rotate(90) translate(${-px - ph / 2}, ${-py - pw / 2})`}>
                                        <FurnitureSVGItem item={p.item} px={px} py={py} pw={ph} ph={pw} />
                                    </g>
                                ) : (
                                    <FurnitureSVGItem item={p.item} px={px} py={py} pw={pw} ph={ph} />
                                )}
                                {/* Hover/drag border */}
                                <rect x={px - 1} y={py - 1} width={pw + 2} height={ph + 2} fill="transparent" stroke={isDragging ? "#f97316" : "transparent"} strokeWidth="2" rx="5" strokeDasharray="4 2" />
                            </g>
                            {/* Rotate button */}
                            <g
                                onClick={(e) => { e.stopPropagation(); handleRotate(idx); }}
                                style={{ cursor: "pointer" }}
                            >
                                <circle cx={px + pw - 2} cy={py - 2} r="10" fill="white" stroke="#f97316" strokeWidth="1.5" />
                                <text x={px + pw - 2} y={py + 2} textAnchor="middle" fontSize="11" fill="#f97316">↻</text>
                            </g>
                        </g>
                    );
                })}

                {/* Arrow markers */}
                <defs>
                    <marker id="aL" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto"><path d="M6 0 L0 3 L6 6" fill="none" stroke="#94a3b8" strokeWidth="1" /></marker>
                    <marker id="aR" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#94a3b8" strokeWidth="1" /></marker>
                    <marker id="aU" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0 6 L3 0 L6 6" fill="none" stroke="#94a3b8" strokeWidth="1" /></marker>
                    <marker id="aD" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto"><path d="M0 0 L3 6 L6 0" fill="none" stroke="#94a3b8" strokeWidth="1" /></marker>
                </defs>
            </svg>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-2">
                {furniture.filter((f, i, arr) => arr.findIndex(x => x.name === f.name) === i).map(f => (
                    <span key={f.id} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg" style={{ backgroundColor: f.color + "15", color: f.color, border: `1px solid ${f.color}33` }}>
                        <span className="w-3 h-3 rounded" style={{ backgroundColor: f.color }}></span>
                        {f.name}
                    </span>
                ))}
            </div>
        </div>
    );
}
