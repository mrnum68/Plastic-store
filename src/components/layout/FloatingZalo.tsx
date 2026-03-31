import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingZalo() {
    return (
        <a
            href="https://zalo.me/0865182562"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-[60] flex items-center justify-center w-14 h-14 bg-[#0068FF] text-white rounded-full shadow-[0_4px_20px_rgba(0,104,255,0.4)] hover:bg-[#005AE0] hover:scale-110 transition-all group overflow-visible"
            aria-label="Chat Zalo"
        >
            <div className="absolute inset-0 bg-[#0068FF] rounded-full animate-ping opacity-75"></div>
            <MessageCircle size={28} className="relative z-10 animate-pulse" />
            <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Nhận Báo Giá Zalo!
            </span>
        </a>
    );
}
