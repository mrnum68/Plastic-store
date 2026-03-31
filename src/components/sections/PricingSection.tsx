import { Check } from "lucide-react";

const tuQuanAo = [
    { name: "Tủ Quần Áo 2 Cánh", size: "200 × 100 × 50 cm", priceStd: "2.990.000", pricePre: "3.273.000" },
    { name: "Tủ Quần Áo 3 Cánh", size: "200 × 136 × 50 cm", priceStd: "3.727.000", pricePre: "4.273.000" },
    { name: "Tủ Quần Áo 4 Cánh", size: "200 × 181.5 × 50 cm", priceStd: "5.000.000", pricePre: "5.727.000" },
    { name: "Tủ Quần Áo 5 Cánh", size: "200 × 225 × 50 cm", priceStd: "5.818.000", pricePre: "6.545.000" },
    { name: "Tủ Quần Áo 6 Cánh", size: "200 × 270 × 50 cm", priceStd: "6.636.000", pricePre: "7.364.000" },
];

const giuongNgu = [
    { name: "Giường 1 mét 6", size: "160 × 200 × 35 cm", priceStd: "4.000.000", pricePre: "4.600.000" },
    { name: "Giường 1 mét 8", size: "200 × 200 × 35 cm", priceStd: "4.400.000", pricePre: "5.200.000" },
    { name: "Giường 2 mét", size: "200 × 200 × 35 cm", priceStd: "5.100.000", pricePre: "6.100.000" },
];

export default function PricingSection() {
    return (
        <section id="bang-gia" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Bảng Giá Xưởng Huy Hoàng 2025</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Minh Bạch · Giá Gốc · Không Trung Gian</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Đồ đóng sẵn một số kích thước, hàng đặt theo yêu cầu từ 3-7 ngày. Giá chưa bao gồm VAT và chi phí vận chuyển.
                    </p>
                </div>

                {/* Tủ Quần Áo */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                        Bảng Giá Tủ Quần Áo Lắp Ghép Đóng Sẵn
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                    <th className="py-4 px-6 font-bold">Loại sản phẩm</th>
                                    <th className="py-4 px-6 font-bold">Kích thước</th>
                                    <th className="py-4 px-6 font-bold text-center">Nhựa Thường (VNĐ)</th>
                                    <th className="py-4 px-6 font-bold text-center">Nhựa Cao Cấp (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tuQuanAo.map((item, idx) => (
                                    <tr key={idx} className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-orange-50 transition-colors`}>
                                        <td className="py-4 px-6 font-medium text-slate-900">{item.name}</td>
                                        <td className="py-4 px-6 text-slate-600">{item.size}</td>
                                        <td className="py-4 px-6 text-center font-semibold text-slate-800">{item.priceStd}</td>
                                        <td className="py-4 px-6 text-center font-bold text-orange-600">{item.pricePre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Giường Ngủ */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                        Bảng Giá Giường Ngủ Đóng Sẵn
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                    <th className="py-4 px-6 font-bold">Loại sản phẩm</th>
                                    <th className="py-4 px-6 font-bold">Kích thước</th>
                                    <th className="py-4 px-6 font-bold text-center">Nhựa Thường (VNĐ)</th>
                                    <th className="py-4 px-6 font-bold text-center">Nhựa Cao Cấp (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {giuongNgu.map((item, idx) => (
                                    <tr key={idx} className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-orange-50 transition-colors`}>
                                        <td className="py-4 px-6 font-medium text-slate-900">{item.name}</td>
                                        <td className="py-4 px-6 text-slate-600">{item.size}</td>
                                        <td className="py-4 px-6 text-center font-semibold text-slate-800">{item.priceStd}</td>
                                        <td className="py-4 px-6 text-center font-bold text-orange-600">{item.pricePre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tủ Bếp */}
                <div className="max-w-5xl mx-auto mb-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                        Bảng Giá Tủ Bếp Theo Mét Dài
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative rounded-3xl p-8 bg-white border border-slate-200 shadow-lg hover:-translate-y-2 transition-transform">
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">Tủ Bếp Nhựa Thường</h4>
                            <p className="text-slate-500 mb-6">Nhựa Penco / Golden Plast loại 2 lớp</p>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">1.800.000đ</span>
                                <span className="text-slate-500 font-medium"> / mét dài</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {["Bản lề giảm chấn loại thường", "Màu sắc cơ bản", "Thiết kế 2D miễn phí", "Bảo hành 2 năm"].map((f,i) => (
                                    <li key={i} className="flex items-start gap-3"><Check className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-700">{f}</span></li>
                                ))}
                            </ul>
                            <a href="#bao-gia" className="block w-full text-center py-3.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors">Nhận Báo Giá</a>
                        </div>
                        <div className="relative rounded-3xl p-8 bg-white border-2 border-orange-500 shadow-xl shadow-orange-500/10 hover:-translate-y-2 transition-transform">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">BÁN CHẠY NHẤT</div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">Tủ Bếp Nhựa Cao Cấp</h4>
                            <p className="text-slate-500 mb-6">Nhựa Ecoplast / Casawood lõi đặc siêu bền</p>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">2.500.000đ</span>
                                <span className="text-slate-500 font-medium"> / mét dài</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {["Nhựa đặc siêu bền, chịu lực tốt", "Bản lề inox 304 chống gỉ", "Đa dạng màu sắc vân gỗ", "Thiết kế 3D miễn phí", "Bảo hành 5 năm độ bền"].map((f,i) => (
                                    <li key={i} className="flex items-start gap-3"><Check className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-700">{f}</span></li>
                                ))}
                            </ul>
                            <a href="#bao-gia" className="block w-full text-center py-3.5 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors">Nhận Báo Giá</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center max-w-3xl mx-auto bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-slate-700 italic">
                        * Giá trên chưa bao gồm VAT và chi phí vận chuyển, bốc hàng tại xưởng. Hàng đặt theo yêu cầu riêng có thể chênh lệch 5-10%. Liên hệ Hotline <strong>086.518.2562</strong> hoặc Zalo để nhận báo giá chính xác nhất.
                    </p>
                </div>
            </div>
        </section>
    );
}
