import { Droplets, BugOff, Hammer, ShieldCheck } from "lucide-react";

export default function MaterialSection() {
    return (
        <section id="chat-lieu" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Chất liệu nhựa cao cấp{" "}
                            <span className="text-orange-500 relative">Ecoplast · Penco · Casawood · Golden Plast
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Xưởng Huy Hoàng sử dụng các dòng nhựa tấm nội thất hàng đầu Việt Nam. So với gỗ công nghiệp MDF truyền thống, nhựa tấm cao cấp mang lại ưu điểm vượt trội, phù hợp khí hậu nóng ẩm miền Trung.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Droplets size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Chống nước 100%</h3>
                                <p className="text-slate-600">Ngâm nước 48 giờ không trương nở, không bong tróc. Lý tưởng cho tủ bếp, phòng tắm và khu vực ẩm ướt.</p>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-4">
                                    <BugOff size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Không mối mọt</h3>
                                <p className="text-slate-600">100% nhựa nguyên sinh kết hợp phụ gia UV, chấm dứt hoàn toàn nỗi lo mối mọt, cong vênh theo thời gian.</p>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                                    <Hammer size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Chịu lực siêu tốt</h3>
                                <p className="text-slate-600">Kết cấu khoang rỗng cùng gân tăng cứng dày đặc. Bám xương vít đỉnh cao, chịu tải trọng tối đa 150kg/tấm.</p>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">An toàn sức khỏe</h3>
                                <p className="text-slate-600">Không chứa formaldehyde hay hóa chất độc hại. Đạt tiêu chuẩn an toàn cho trẻ nhỏ và người lớn tuổi.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 lg:order-1 relative w-full aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="/images/products/tu-bep-chu-l.png"
                            alt="noi-that-nhua-cao-cap-ecoplast-penco-casawood"
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                                <p className="font-semibold text-lg mb-2">&quot;Đầu tư một lần - Sử dụng trọn đời&quot;</p>
                                <p className="text-white/80">Nhựa Ecoplast, Penco, Casawood, Golden Plast sở hữu kết cấu siêu vững chắc, bám xương vít đỉnh cao.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
