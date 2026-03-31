"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FloorPlan2D from "@/components/FloorPlan2D";
import {
    ChevronRight, Calculator, Home, Bed, CookingPot, BookOpen,
    Tv, Plus, Minus, Trash2, Phone, MessageCircle, Sparkles,
    ChevronDown, ArrowRight, X, Send, Check
} from "lucide-react";

/* ─── Pricing Constants ─── */
const MATERIALS = [
    { id: "thuong", name: "Nhựa Thường (Penco / Golden Plast)", shortName: "Nhựa Thường" },
    { id: "caocap", name: "Nhựa Cao Cấp (Ecoplast / Casawood)", shortName: "Nhựa Cao Cấp" },
];

type MaterialId = "thuong" | "caocap";

const PRODUCTS: {
    id: string; name: string; icon: React.ReactNode; unit: string; unitLabel: string;
    prices: Record<MaterialId, number>; minSize: number; maxSize: number; step: number; defaultSize: number;
    description: string;
}[] = [
    {
        id: "tu-bep-tren", name: "Tủ Bếp Trên", icon: <CookingPot size={24} />, unit: "md", unitLabel: "mét dài",
        prices: { thuong: 1_200_000, caocap: 1_600_000 },
        minSize: 1, maxSize: 6, step: 0.5, defaultSize: 2.5, description: "Tủ treo tường phía trên bếp",
    },
    {
        id: "tu-bep-duoi", name: "Tủ Bếp Dưới", icon: <CookingPot size={24} />, unit: "md", unitLabel: "mét dài",
        prices: { thuong: 1_800_000, caocap: 2_500_000 },
        minSize: 1, maxSize: 6, step: 0.5, defaultSize: 2.5, description: "Tủ kệ phía dưới mặt bếp",
    },
    {
        id: "tu-quan-ao", name: "Tủ Quần Áo", icon: <Home size={24} />, unit: "md", unitLabel: "mét dài (cao 200cm, sâu 50cm)",
        prices: { thuong: 2_800_000, caocap: 3_200_000 },
        minSize: 0.8, maxSize: 4, step: 0.1, defaultSize: 1.0, description: "Tính theo chiều ngang tủ, cao 200cm",
    },
    {
        id: "giuong", name: "Giường Ngủ", icon: <Bed size={24} />, unit: "md", unitLabel: "mét dài (chiều ngang giường)",
        prices: { thuong: 2_600_000, caocap: 3_100_000 },
        minSize: 1.2, maxSize: 2.2, step: 0.1, defaultSize: 1.8, description: "Tính theo chiều ngang, dài cố định 2m",
    },
    {
        id: "ban-hoc", name: "Bàn Học Sinh", icon: <BookOpen size={24} />, unit: "bộ", unitLabel: "bộ kèm giá sách",
        prices: { thuong: 1_200_000, caocap: 1_600_000 },
        minSize: 1, maxSize: 5, step: 1, defaultSize: 1, description: "An toàn cho trẻ 6-15 tuổi",
    },
    {
        id: "ke-tivi", name: "Kệ Tivi", icon: <Tv size={24} />, unit: "md", unitLabel: "mét dài",
        prices: { thuong: 1_500_000, caocap: 2_200_000 },
        minSize: 1, maxSize: 4, step: 0.5, defaultSize: 1.8, description: "Kệ treo hoặc đặt sàn",
    },
];

/* ─── Room presets ─── */
const ROOM_PRESETS: {
    id: string; name: string; icon: React.ReactNode; description: string;
    suggestions: { productId: string; qty: number }[];
}[] = [
    {
        id: "phong-ngu-master", name: "Phòng Ngủ Master", icon: <Bed size={28} />,
        description: "Phòng ngủ chính cho vợ chồng (15-20m²)",
        suggestions: [
            { productId: "tu-quan-ao", qty: 1.8 },
            { productId: "giuong", qty: 1.8 },
            { productId: "ke-tivi", qty: 1.4 },
        ],
    },
    {
        id: "phong-ngu-nho", name: "Phòng Ngủ Nhỏ", icon: <Bed size={28} />,
        description: "Phòng ngủ con, phòng khách (10-14m²)",
        suggestions: [
            { productId: "tu-quan-ao", qty: 1.0 },
            { productId: "giuong", qty: 1.6 },
        ],
    },
    {
        id: "phong-ngu-tre-em", name: "Phòng Ngủ Trẻ Em", icon: <BookOpen size={28} />,
        description: "Phòng ngủ và học tập cho bé (10-14m²)",
        suggestions: [
            { productId: "tu-quan-ao", qty: 1.0 },
            { productId: "giuong", qty: 1.6 },
            { productId: "ban-hoc", qty: 1 },
        ],
    },
    {
        id: "nha-bep", name: "Nhà Bếp", icon: <CookingPot size={28} />,
        description: "Bếp gia đình tiêu chuẩn (6-12m²)",
        suggestions: [
            { productId: "tu-bep-tren", qty: 2.5 },
            { productId: "tu-bep-duoi", qty: 2.5 },
        ],
    },
];

/* ─── Types ─── */
interface CartItem {
    productId: string;
    qty: number;
    material: MaterialId;
}

/* ─── Helper ─── */
function formatVND(n: number): string {
    return n.toLocaleString("vi-VN") + "đ";
}

/* ─── Counting animation hook ─── */
function useCountUp(target: number, duration = 500) {
    const [value, setValue] = useState(target);
    useEffect(() => {
        const start = value;
        const diff = target - start;
        if (diff === 0) return;
        const startTime = performance.now();
        function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(start + diff * eased));
            if (progress < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }, [target, duration]);
    return value;
}

/* ─── Main Component ─── */
export default function EstimationToolPage() {
    const [activeTab, setActiveTab] = useState<"single" | "room">("single");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [globalMaterial, setGlobalMaterial] = useState<MaterialId>("caocap");
    const [showPopup, setShowPopup] = useState(false);
    const [phone, setPhone] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [roomLength, setRoomLength] = useState(4.5);
    const [roomWidth, setRoomWidth] = useState(3.5);

    // Computed total
    const total = cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        if (!product) return sum;
        return sum + product.prices[item.material] * item.qty;
    }, 0);

    const animatedTotal = useCountUp(total);

    function addToCart(productId: string, qty?: number) {
        setCart(prev => {
            const existing = prev.find(i => i.productId === productId && i.material === globalMaterial);
            if (existing) {
                return prev.map(i =>
                    i.productId === productId && i.material === globalMaterial
                        ? { ...i, qty: i.qty + (qty || PRODUCTS.find(p => p.id === productId)!.step) }
                        : i
                );
            }
            const product = PRODUCTS.find(p => p.id === productId)!;
            return [...prev, { productId, qty: qty || product.defaultSize, material: globalMaterial }];
        });
    }

    function updateQty(index: number, newQty: number) {
        const product = PRODUCTS.find(p => p.id === cart[index].productId)!;
        if (newQty < product.minSize) { removeItem(index); return; }
        if (newQty > product.maxSize) return;
        setCart(prev => prev.map((item, i) => i === index ? { ...item, qty: newQty } : item));
    }

    function removeItem(index: number) {
        setCart(prev => prev.filter((_, i) => i !== index));
    }

    function applyRoomPreset(presetId: string) {
        const preset = ROOM_PRESETS.find(r => r.id === presetId);
        if (!preset) return;
        setSelectedRoom(presetId);
        const newItems: CartItem[] = preset.suggestions.map(s => ({
            productId: s.productId,
            qty: s.qty,
            material: globalMaterial,
        }));
        setCart(newItems);
    }

    async function handleSubmitPhone() {
        if (phone.length < 9) return;
        setSending(true);
        setSendError("");

        const itemsText = cart.map(item => {
            const p = PRODUCTS.find(x => x.id === item.productId)!;
            return `${p.name} x${item.qty} ${p.unit}`;
        }).join(", ");

        const materialName = MATERIALS.find(m => m.id === globalMaterial)?.shortName || "";
        const roomInfo = selectedRoom ? ROOM_PRESETS.find(r => r.id === selectedRoom)?.name : "Chọn món lẻ";

        const payload = {
            phone,
            items: itemsText,
            material: materialName,
            total: formatVND(total),
            note: `Loại phòng: ${roomInfo} | Kích thước: ${roomLength}m × ${roomWidth}m`,
        };

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed");
            setSubmitted(true);
        } catch (err) {
            console.error("Failed to send lead:", err);
            setSendError("Gửi thất bại. Vui lòng gọi trực tiếp 086.518.2562");
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(249,115,22,0.3),transparent_70%)]"></div>
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-orange-400 font-medium">Dự Toán Chi Phí</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        <Calculator size={16} /> Miễn phí · Không cần đăng ký
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Tự Tính Giá Nội Thất Nhựa<br className="hidden md:block" />
                        <span className="text-orange-400"> Trong 30 Giây</span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Công cụ dự toán thông minh từ Xưởng Huy Hoàng. Chọn sản phẩm, nhập kích thước — biết giá ngay. Giá gốc xưởng, không qua trung gian.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-6 relative z-10">
                {/* Tab Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl p-1.5 shadow-lg border border-slate-200 inline-flex">
                        <button
                            onClick={() => setActiveTab("single")}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "single" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 hover:text-orange-500"}`}
                        >
                            <span className="flex items-center gap-2"><Calculator size={16} /> Tính Theo Món Lẻ</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("room")}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === "room" ? "bg-orange-500 text-white shadow-md" : "text-slate-600 hover:text-orange-500"}`}
                        >
                            <span className="flex items-center gap-2"><Home size={16} /> Tính Theo Phòng</span>
                        </button>
                    </div>
                </div>

                {/* Material Selector */}
                <div className="max-w-4xl mx-auto mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Chọn loại nhựa áp dụng chung:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {MATERIALS.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setGlobalMaterial(m.id as MaterialId)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${globalMaterial === m.id
                                    ? "border-orange-500 bg-orange-50 shadow-md"
                                    : "border-slate-200 bg-white hover:border-orange-300"
                                }`}
                            >
                                <span className={`font-bold ${globalMaterial === m.id ? "text-orange-600" : "text-slate-800"}`}>{m.name}</span>
                                {m.id === "caocap" && <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Phổ biến nhất</span>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Left: Product Selection */}
                    <div className="flex-1">
                        {activeTab === "single" ? (
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Calculator size={20} className="text-orange-500" /> Chọn sản phẩm cần dự toán
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {PRODUCTS.map(product => {
                                        const inCart = cart.some(i => i.productId === product.id);
                                        return (
                                            <button
                                                key={product.id}
                                                onClick={() => addToCart(product.id)}
                                                className={`p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md group ${inCart ? "border-green-500 bg-green-50" : "border-slate-200 bg-white hover:border-orange-400"}`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${inCart ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}>
                                                        {product.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-slate-900 text-sm">{product.name}</h3>
                                                        <p className="text-xs text-slate-500 mt-0.5">{product.description}</p>
                                                        <p className="text-orange-500 font-bold text-sm mt-1">
                                                            {formatVND(product.prices[globalMaterial])} / {product.unit}
                                                        </p>
                                                    </div>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${inCart ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-500"}`}>
                                                        {inCart ? <Check size={14} /> : <Plus size={14} />}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <Sparkles size={20} className="text-orange-500" /> Nhập kích thước & chọn phòng
                                </h2>

                                {/* Room Dimension Inputs */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                    <h3 className="font-bold text-slate-800 mb-4 text-sm">📏 Kích thước phòng (mét)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Chiều dài</label>
                                            <div className="flex items-center">
                                                <input type="range" min="2" max="8" step="0.5" value={roomLength}
                                                    onChange={e => setRoomLength(Number(e.target.value))}
                                                    className="flex-1 accent-orange-500 h-2"
                                                />
                                                <span className="ml-3 bg-orange-50 text-orange-600 font-extrabold px-3 py-1.5 rounded-lg text-sm min-w-[60px] text-center">{roomLength}m</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Chiều rộng</label>
                                            <div className="flex items-center">
                                                <input type="range" min="2" max="7" step="0.5" value={roomWidth}
                                                    onChange={e => setRoomWidth(Number(e.target.value))}
                                                    className="flex-1 accent-orange-500 h-2"
                                                />
                                                <span className="ml-3 bg-orange-50 text-orange-600 font-extrabold px-3 py-1.5 rounded-lg text-sm min-w-[60px] text-center">{roomWidth}m</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <span className="text-sm text-slate-500">Diện tích: </span>
                                        <span className="font-extrabold text-orange-500 text-lg">{(roomLength * roomWidth).toFixed(1)} m²</span>
                                    </div>
                                </div>

                                {/* Room Type Selector */}
                                <div className="grid grid-cols-2 gap-3">
                                    {ROOM_PRESETS.map(room => (
                                        <button
                                            key={room.id}
                                            onClick={() => applyRoomPreset(room.id)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all group ${
                                                selectedRoom === room.id
                                                    ? "border-orange-500 bg-orange-50 shadow-md"
                                                    : "border-slate-200 bg-white hover:border-orange-400 hover:shadow-md"
                                            }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                                                selectedRoom === room.id
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"
                                            }`}>
                                                {room.icon}
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-sm">{room.name}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{room.description}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Floor Plan Preview */}
                                {selectedRoom && (
                                    <FloorPlan2D
                                        roomWidth={roomLength}
                                        roomHeight={roomWidth}
                                        roomType={selectedRoom}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Cart / Summary */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 sticky top-24 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-5 text-white">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Calculator size={20} /> Giỏ Dự Toán
                                </h3>
                                <p className="text-orange-100 text-sm mt-1">{cart.length} sản phẩm đã chọn</p>
                            </div>

                            <div className="p-5 max-h-[400px] overflow-y-auto">
                                {cart.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400">
                                        <Calculator size={40} className="mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Chưa có sản phẩm nào.<br />Chọn sản phẩm bên trái để bắt đầu.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item, idx) => {
                                            const product = PRODUCTS.find(p => p.id === item.productId)!;
                                            const itemTotal = product.prices[item.material] * item.qty;
                                            return (
                                                <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-sm">{product.name}</h4>
                                                            <p className="text-xs text-slate-500">{MATERIALS.find(m => m.id === item.material)?.shortName}</p>
                                                        </div>
                                                        <button onClick={() => removeItem(idx)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-0.5">
                                                            <button onClick={() => updateQty(idx, item.qty - product.step)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600">
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="font-extrabold text-base w-12 text-center text-slate-900">{item.qty}</span>
                                                            <button onClick={() => updateQty(idx, item.qty + product.step)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600">
                                                                <Plus size={14} />
                                                            </button>
                                                            <span className="text-xs text-slate-400 pr-1">{product.unit}</span>
                                                        </div>
                                                        <span className="font-bold text-orange-500 text-sm">{formatVND(itemTotal)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Total Section */}
                            <div className="border-t border-slate-200 p-5 bg-slate-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-700 font-medium">Tổng dự toán:</span>
                                    <span className="text-2xl font-extrabold text-orange-500">
                                        {formatVND(animatedTotal)}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-4 italic">* Giá tham khảo. Giá chính xác sau khảo sát thực tế tại nhà.</p>

                                <button
                                    onClick={() => cart.length > 0 && setShowPopup(true)}
                                    disabled={cart.length === 0}
                                    className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${cart.length > 0
                                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                                >
                                    <Send size={18} /> Nhận Báo Giá Chi Tiết
                                </button>

                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    <a href="https://zalo.me/0865182562" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-[#0068FF] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#005AE0] transition-colors">
                                        <MessageCircle size={14} /> Zalo
                                    </a>
                                    <a href="tel:0865182562" className="flex items-center justify-center gap-1.5 bg-green-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors">
                                        <Phone size={14} /> 086.518.2562
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Section */}
                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "500+", label: "Công trình hoàn thiện" },
                            { value: "5 Năm", label: "Bảo hành nhựa" },
                            { value: "100%", label: "Chống nước & mối mọt" },
                            { value: "30s", label: "Biết giá ngay" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="text-2xl font-extrabold text-orange-500">{stat.value}</div>
                                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Phone Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPopup(false)}>
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>

                        {!submitted ? (
                            <>
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Send size={28} />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900">Nhận Báo Giá Chi Tiết</h3>
                                    <p className="text-slate-500 mt-2 text-sm">Nhập số điện thoại để nhận báo giá đầy đủ bao gồm: phụ kiện, vật tư, công lắp đặt.</p>
                                </div>

                                <div className="mb-4">
                                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Tổng dự toán sơ bộ:</span>
                                            <span className="font-bold text-orange-600">{formatVND(total)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-slate-600">Số sản phẩm:</span>
                                            <span className="font-bold text-slate-800">{cart.length} món</span>
                                        </div>
                                    </div>

                                    <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        placeholder="Ví dụ: 0865 182 562"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl text-lg font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-center tracking-widest"
                                        maxLength={11}
                                        autoFocus
                                    />
                                </div>

                                <button
                                    onClick={handleSubmitPhone}
                                    disabled={phone.length < 9 || sending}
                                    className={`w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${phone.length >= 9 && !sending
                                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                                >
                                    {sending ? (
                                        <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Đang gửi...</>
                                    ) : (
                                        <><Send size={18} /> Gửi & Nhận Báo Giá</>
                                    )}
                                </button>
                                {sendError && (
                                    <p className="text-xs text-red-500 text-center mt-2 font-medium">{sendError}</p>
                                )}
                                <p className="text-xs text-slate-400 text-center mt-3">
                                    Xưởng Huy Hoàng sẽ gọi lại trong vòng 15 phút. Cam kết không spam.
                                </p>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check size={36} />
                                </div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Đã Gửi Thành Công!</h3>
                                <p className="text-slate-500 mb-6">Xưởng Huy Hoàng sẽ liên hệ bạn qua số <strong>{phone}</strong> trong vòng 15 phút để tư vấn chi tiết.</p>
                                <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
                                    <p className="text-green-800 font-medium">Tổng dự toán: <span className="text-xl font-extrabold">{formatVND(total)}</span></p>
                                </div>
                                <button onClick={() => { setShowPopup(false); setSubmitted(false); setPhone(""); }} className="bg-slate-100 text-slate-700 font-medium px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                                    Đóng
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
