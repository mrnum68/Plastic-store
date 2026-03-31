"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Phone, Clock, CheckCircle, Trash2, RefreshCw,
    LogIn, ShieldCheck, Search, Filter
} from "lucide-react";

const ADMIN_PASS = "huyhoang2024";

interface Lead {
    id: string;
    phone: string;
    items: string;
    material: string;
    total: string;
    note: string;
    createdAt: string;
    status: "new" | "contacted" | "done";
}

const STATUS_MAP = {
    new: { label: "Mới", color: "bg-red-100 text-red-700", icon: <Clock size={14} /> },
    contacted: { label: "Đã gọi", color: "bg-yellow-100 text-yellow-700", icon: <Phone size={14} /> },
    done: { label: "Hoàn tất", color: "bg-green-100 text-green-700", icon: <CheckCircle size={14} /> },
};

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Vừa xong";
    if (m < 60) return `${m} phút trước`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    return `${d} ngày trước`;
}

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [pass, setPass] = useState("");
    const [passError, setPassError] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<"all" | "new" | "contacted" | "done">("all");
    const [search, setSearch] = useState("");

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/leads");
            const data = await res.json();
            setLeads(data);
        } catch { }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (authed) fetchLeads();
    }, [authed, fetchLeads]);

    // Auto refresh every 30s
    useEffect(() => {
        if (!authed) return;
        const interval = setInterval(fetchLeads, 30000);
        return () => clearInterval(interval);
    }, [authed, fetchLeads]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (pass === ADMIN_PASS) {
            setAuthed(true);
            setPassError(false);
        } else {
            setPassError(true);
        }
    }

    async function updateStatus(id: string, status: Lead["status"]) {
        await fetch("/api/leads", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }

    async function deleteLead(id: string) {
        if (!confirm("Xác nhận xoá lead này?")) return;
        await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
        setLeads(prev => prev.filter(l => l.id !== id));
    }

    const filtered = leads
        .filter(l => filter === "all" || l.status === filter)
        .filter(l => !search || l.phone.includes(search) || l.items.toLowerCase().includes(search.toLowerCase()));

    const counts = {
        all: leads.length,
        new: leads.filter(l => l.status === "new").length,
        contacted: leads.filter(l => l.status === "contacted").length,
        done: leads.filter(l => l.status === "done").length,
    };

    // ─── LOGIN SCREEN ───
    if (!authed) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900">Admin Panel</h1>
                        <p className="text-slate-500 text-sm mt-1">Nội Thất Nhựa Huy Hoàng</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={e => { setPass(e.target.value); setPassError(false); }}
                            className={`w-full px-4 py-3 border-2 rounded-xl font-medium focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 ${passError ? "border-red-400 bg-red-50" : "border-slate-200"}`}
                            placeholder="Nhập mật khẩu..."
                            autoFocus
                        />
                        {passError && <p className="text-red-500 text-xs mt-2 font-medium">Sai mật khẩu!</p>}
                    </div>
                    <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                        <LogIn size={18} /> Đăng nhập
                    </button>
                </form>
            </div>
        );
    }

    // ─── DASHBOARD ───
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900">📋 Quản Lý Lead</h1>
                        <p className="text-xs text-slate-500">Nội Thất Nhựa Huy Hoàng · Tự động cập nhật mỗi 30s</p>
                    </div>
                    <button onClick={fetchLeads} disabled={loading} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors disabled:opacity-50">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Làm mới
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {([
                        { key: "all", label: "Tổng lead", color: "bg-slate-900 text-white" },
                        { key: "new", label: "🔴 Chưa gọi", color: "bg-red-50 text-red-700 border border-red-200" },
                        { key: "contacted", label: "🟡 Đã gọi", color: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
                        { key: "done", label: "🟢 Hoàn tất", color: "bg-green-50 text-green-700 border border-green-200" },
                    ] as const).map(s => (
                        <button
                            key={s.key}
                            onClick={() => setFilter(s.key)}
                            className={`p-4 rounded-2xl text-left transition-all ${s.color} ${filter === s.key ? "ring-2 ring-orange-500 scale-[1.02]" : "hover:scale-[1.01]"}`}
                        >
                            <div className="text-3xl font-extrabold">{counts[s.key]}</div>
                            <div className="text-sm font-medium mt-1 opacity-80">{s.label}</div>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-4 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Tìm SĐT hoặc sản phẩm..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm font-medium text-slate-900"
                    />
                </div>

                {/* Lead Cards */}
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                        <Phone size={48} className="mx-auto mb-3 opacity-30" />
                        <p className="font-medium">Chưa có lead nào{filter !== "all" ? ` ở trạng thái "${STATUS_MAP[filter as keyof typeof STATUS_MAP]?.label}"` : ""}.</p>
                        <p className="text-sm mt-1">Khi khách gửi SĐT từ trang Dự Toán, lead sẽ hiện ở đây.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map(lead => {
                            const st = STATUS_MAP[lead.status];
                            return (
                                <div key={lead.id} className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${lead.status === "new" ? "border-red-200 border-l-4 border-l-red-500" : "border-slate-200"}`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            {/* Phone + Status */}
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <a href={`tel:${lead.phone}`} className="text-lg font-extrabold text-slate-900 hover:text-orange-500 transition-colors">
                                                    📞 {lead.phone}
                                                </a>
                                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${st.color}`}>
                                                    {st.icon} {st.label}
                                                </span>
                                                <span className="text-xs text-slate-400">{timeAgo(lead.createdAt)}</span>
                                            </div>
                                            {/* Details */}
                                            <div className="space-y-1 text-sm">
                                                <p className="text-slate-700"><strong className="text-slate-500">Sản phẩm:</strong> {lead.items}</p>
                                                <p className="text-slate-700"><strong className="text-slate-500">Chất liệu:</strong> {lead.material}</p>
                                                <p className="text-orange-600 font-bold">{lead.total}</p>
                                                {lead.note && <p className="text-slate-400 text-xs">{lead.note}</p>}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-1.5 shrink-0">
                                            {lead.status === "new" && (
                                                <button onClick={() => updateStatus(lead.id, "contacted")} className="flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                                    <Phone size={12} /> Đã gọi
                                                </button>
                                            )}
                                            {lead.status === "contacted" && (
                                                <button onClick={() => updateStatus(lead.id, "done")} className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                                    <CheckCircle size={12} /> Xong
                                                </button>
                                            )}
                                            {lead.status === "done" && (
                                                <button onClick={() => updateStatus(lead.id, "new")} className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                                    <RefreshCw size={12} /> Reset
                                                </button>
                                            )}
                                            <a href={`https://zalo.me/${lead.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#0068FF] hover:bg-[#005AE0] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors text-center justify-center">
                                                Zalo
                                            </a>
                                            <button onClick={() => deleteLead(lead.id)} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors justify-center">
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
