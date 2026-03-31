import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="relative bg-slate-50 pt-12 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block bg-orange-100 text-orange-600 font-semibold px-4 py-1.5 rounded-full mb-6">
                        Khuyến mãi đến 30% khi thi công trọn gói
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                        Thi Công Nội Thất Nhựa <span className="text-orange-500">Huy Hoàng Đà Nẵng</span> - Giá Tại Xưởng
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                        Thi công trọn gói từ xưởng - Không qua trung gian. Giải pháp nội thất hoàn hảo, bền bỉ vượt thời gian với nhựa Ecoplast / Penco / Casawood / Golden Plast.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
                        <Link href="/san-pham" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-orange-500/30">
                            Khám Phá Sản Phẩm
                            <ArrowRight size={20} />
                        </Link>
                        <Link href="/cong-trinh" className="bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3.5 rounded-full font-bold text-lg flex items-center justify-center transition-colors">
                            Xem Công Trình
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <CheckCircle2 className="text-orange-500" size={20} />
                            <span>Chống nước 100%</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <CheckCircle2 className="text-orange-500" size={20} />
                            <span>Không mối mọt</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <CheckCircle2 className="text-orange-500" size={20} />
                            <span>Bảo hành 5 năm</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <CheckCircle2 className="text-orange-500" size={20} />
                            <span>Giá gốc từ xưởng</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-orange-50 rounded-3xl transform rotate-3 scale-105 z-0"></div>
                    <img
                        src="/images/products/tu-bep-chu-l.png"
                        alt="tu-bep-nhua-vincoplast-da-nang-chong-nuoc.jpg"
                        className="relative z-10 rounded-3xl shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
                        loading="eager"
                    />

                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce">
                        <div className="bg-green-100 p-3 rounded-full">
                            <CheckCircle2 className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">Hoàn thiện 500+</p>
                            <p className="text-sm text-slate-600">Công trình trong năm</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
