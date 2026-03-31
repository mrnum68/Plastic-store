import { Phone, MessageCircle } from "lucide-react";

export default function StickyActionBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
            <div className="flex gap-2 w-full max-w-md mx-auto">
                <a
                    href="https://zalo.me/0865182562"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] text-white py-3 rounded-xl font-medium shadow-sm active:scale-95 transition-transform"
                >
                    <MessageCircle size={20} />
                    <span>Chat Zalo</span>
                </a>
                <a
                    href="tel:0865182562"
                    className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-medium shadow-sm active:scale-95 transition-transform"
                >
                    <Phone size={20} className="animate-pulse" />
                    <span>Gọi điện ngay</span>
                </a>
            </div>
        </div>
    );
}
