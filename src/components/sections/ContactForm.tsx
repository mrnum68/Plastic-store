"use client";

import { useState } from "react";
import { Clock, Banknote, ShieldCheck, MapPin, Send, Check } from "lucide-react";

const PRODUCTS_LIST = [
    { value: "TuBep", label: "Tủ Bếp Nhựa" },
    { value: "TuQuanAo", label: "Tủ Quần Áo" },
    { value: "GiuongNhua", label: "Giường Nhựa" },
    { value: "BanHoc", label: "Bàn Học Sinh" },
    { value: "KeTivi", label: "Kệ Tivi" },
    { value: "TronGoi", label: "Thi Công Trọn Gói" },
];

export default function ContactForm() {
    const [phone, setPhone] = useState("");
    const [product, setProduct] = useState("TuBep");
    const [note, setNote] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (phone.length < 9) return;
        setSending(true);
        setError("");

        const productLabel = PRODUCTS_LIST.find(p => p.value === product)?.label || product;

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone,
                    items: productLabel,
                    material: "",
                    total: "Chờ báo giá",
                    note: note ? `Ghi chú: ${note} | Nguồn: Form trang chủ` : "Nguồn: Form trang chủ",
                }),
            });
            if (!res.ok) throw new Error("Failed");
            setSent(true);
        } catch {
            setError("Gửi thất bại. Vui lòng gọi 086.518.2562");
        } finally {
            setSending(false);
        }
    }

    return (
        <section id="bao-gia" className="py-20 bg-orange-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-white">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl pl-0 lg:pl-12">

                    <div className="flex-1 w-full p-8 lg:p-0 py-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nhận Báo Giá Nhanh Chóng</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Để lại kích thước sơ bộ hoặc yêu cầu của bạn, kỹ thuật viên xưởng sẽ tư vấn và báo giá chi tiết trong vòng 15 phút.
                        </p>

                        {!sent ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        placeholder="Nhập số điện thoại"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                        maxLength={11}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow text-slate-900"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Sản phẩm quan tâm</label>
                                    <select
                                        value={product}
                                        onChange={e => setProduct(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow bg-white text-slate-900"
                                    >
                                        {PRODUCTS_LIST.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú (tuỳ chọn)</label>
                                    <input
                                        type="text"
                                        placeholder="VD: Tủ bếp dài 3m, chất liệu Ecoplast"
                                        value={note}
                                        onChange={e => setNote(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow text-slate-900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={phone.length < 9 || sending}
                                    className={`w-full font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                                        phone.length >= 9 && !sending
                                            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30 active:scale-95"
                                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                                >
                                    {sending ? (
                                        <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Đang gửi...</>
                                    ) : (
                                        <><Send size={18} /> Nhận Báo Giá Khuyến Mãi</>
                                    )}
                                </button>
                                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                            </form>
                        ) : (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check size={32} />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Gửi Thành Công!</h3>
                                <p className="text-slate-600">Xưởng Huy Hoàng sẽ gọi lại số <strong>{phone}</strong> trong vòng 15 phút để tư vấn chi tiết.</p>
                                <button onClick={() => { setSent(false); setPhone(""); setNote(""); }} className="mt-4 text-orange-500 font-medium text-sm hover:underline">
                                    Gửi yêu cầu khác →
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-slate-50 w-full h-full p-8 md:p-12 lg:min-h-[600px] flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">Cam Kết Từ Xưởng Huy Hoàng</h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                    <Banknote size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Thi công giá rẻ tận xưởng</h4>
                                    <p className="text-slate-600">Đơn giản hóa quy trình, bỏ qua các chi phí trung gian, giúp bạn tiết kiệm đến 30%.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Vật liệu rõ nguồn gốc</h4>
                                    <p className="text-slate-600">100% sử dụng nhựa tấm lõi đặc Ecoplast / Penco / Casawood / Golden Plast chính hãng, bảo hành 5 năm.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Đúng tiến độ thi công</h4>
                                    <p className="text-slate-600">Quy trình sản xuất bằng máy CNC hiện đại, đảm bảo độ nét và bàn giao đúng hẹn.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">Hỗ trợ nhanh tại Đà Nẵng</h4>
                                    <p className="text-slate-600">Đội ngũ kỹ thuật túc trực, dễ dàng bảo hành, bảo trì chuyên nghiệp tận nơi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="max-w-6xl mx-auto mt-16 rounded-3xl overflow-hidden shadow-2xl border border-white h-[400px] bg-slate-100">
                    <iframe
                        src="https://maps.google.com/maps?q=400%20Nguyễn%20Lương%20Bằng,%20Liên%20Chiểu,%20Đà%20Nẵng&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Bản đồ chỉ đường Xưởng Nội Thất Nhựa Huy Hoàng"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
