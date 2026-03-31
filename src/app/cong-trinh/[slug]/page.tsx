import Link from "next/link";
import { ChevronRight, Calendar, MapPin, User, Ruler, Award, Phone } from "lucide-react";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const title = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    return {
        title: `Dự Án: ${title} - Thi Công Nội Thất Nhựa Huy Hoàng`,
        description: `Xem chi tiết quá trình thiết kế và thi công dự án ${title}. Giải pháp chống mối mọt, chống nước 100% bằng nhựa Ecoplast cao cấp.`,
    };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const titleName = params.slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-40 bg-white/95 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-3 flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
                    <ChevronRight size={14} className="shrink-0" />
                    <Link href="/cong-trinh" className="hover:text-orange-500 transition-colors">Công Trình</Link>
                    <ChevronRight size={14} className="shrink-0" />
                    <span className="text-slate-900 font-medium truncate">{titleName}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">

                {/* Project Header Info */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 mb-8 text-center pt-12 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{titleName}</h1>

                    <div className="flex flex-wrap justify-center gap-6 text-slate-600 text-sm md:text-base">
                        <span className="flex items-center gap-2"><User className="text-orange-500" size={18} /> CĐT: Anh Hoàng Gia</span>
                        <span className="flex items-center gap-2"><MapPin className="text-orange-500" size={18} /> Cẩm Lệ, Đà Nẵng</span>
                        <span className="flex items-center gap-2"><Calendar className="text-orange-500" size={18} /> Hoàn thành: 10/2026</span>
                        <span className="flex items-center gap-2"><Ruler className="text-orange-500" size={18} /> Tổng diện tích: 120m2</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content & Gallery */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Main Featured Image */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                            <img src="/images/products/tu-bep-chu-l.png" alt="Không gian tổng quan" className="w-full h-[400px] md:h-[500px] object-cover" />
                            <div className="p-4 bg-slate-100 text-slate-600 text-sm text-center italic border-t border-slate-200">
                                Hình ảnh không gian phòng khách liền kề bếp sau khi bàn giao.
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">1. Hiện trạng và Yêu cầu khách hàng</h2>
                            <p className="text-slate-700 text-base leading-relaxed mb-4">
                                Gia đình anh Hoàng Gia vừa nhận bàn giao căn nhà phố 3 tầng. Trước đây gia đình từng sử dụng tủ bếp MDF nhưng do khu vực tầng trệt bị ngập lụt nhẹ vào mùa mưa khiến tủ bị ẩm mốc, bung nở và mối mọt tấn công dữ dội.
                            </p>
                            <p className="text-slate-900 font-bold text-base mb-3">Yêu cầu đặt ra:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700 text-base">
                                <li>Phải dùng vật liệu chống nước 100%, chống mối mọt tuyệt đối vì nhà mặt đất.</li>
                                <li>Thiết kế theo phong cách hiện đại, màu vân gỗ kết hợp trắng tinh tế để mở rộng không gian.</li>
                                <li>Hệ tủ quần áo kịch trần để tối đa diện tích lưu trữ.</li>
                                <li>Ngân sách thi công hợp lý, bền vững &quot;dùng 20 năm không hỏng&quot;.</li>
                            </ul>

                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">2. Giải pháp kỹ thuật từ Xưởng Huy Hoàng</h2>
                            <p className="text-slate-700 text-base leading-relaxed mb-6">
                                Sau khi kỹ thuật viên Huy Hoàng đến khảo sát đo đạc thực tế, chúng tôi đề xuất sử dụng toàn bộ <strong className="text-slate-900">Vật liệu Nhựa Ecoplast cao cấp</strong> cho toàn bộ các hạng mục cốt lõi. Bề mặt tủ bếp trên phủ Acrylic bóng gương giúp dễ vệ sinh, tủ bếp dưới dùng vân gỗ dập nổi chống xước.
                            </p>

                            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-xl overflow-hidden shadow-md">
                                    <img src="/images/products/tu-bep-chu-l.png" alt="Tủ bếp trước và sau" className="w-full h-64 object-cover" />
                                    <div className="p-3 bg-slate-50 text-sm text-center font-medium text-slate-700">Hệ tủ bếp chữ L ốp kính cường lực màu Xanh ngọc</div>
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-md">
                                    <img src="/images/products/tu-quan-ao-2-canh.png" alt="Tủ áo kịch trần" className="w-full h-64 object-cover" />
                                    <div className="p-3 bg-slate-50 text-sm text-center font-medium text-slate-700">Tủ quần áo cánh lùa cao kịch trần 3.2m</div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">3. Hạng mục thi công chi tiết</h2>
                            <div className="overflow-x-auto my-6">
                                <table className="w-full border-collapse border border-slate-300 text-sm">
                                    <thead>
                                        <tr className="bg-orange-50">
                                            <th className="py-3 px-4 text-left font-bold text-slate-900 border border-slate-300">Hạng mục</th>
                                            <th className="py-3 px-4 text-left font-bold text-slate-900 border border-slate-300">Vật liệu sử dụng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="py-3 px-4 font-medium text-slate-900 border border-slate-300">Tủ bếp trên & dưới</td>
                                            <td className="py-3 px-4 text-slate-700 border border-slate-300">Nhựa Ecoplast, Cánh Acrylic bóng gương, Phụ kiện Inox 304</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="py-3 px-4 font-medium text-slate-900 border border-slate-300">3 Tủ quần áo kịch trần</td>
                                            <td className="py-3 px-4 text-slate-700 border border-slate-300">Nhựa Ecoplast màu vân mã óc chó, cánh trắng lùa</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-3 px-4 font-medium text-slate-900 border border-slate-300">2 Giường ngủ có ngăn kéo</td>
                                            <td className="py-3 px-4 text-slate-700 border border-slate-300">Nhựa Ecoplast gia cố bằng khung chịu lực cứng cáp</td>
                                        </tr>
                                        <tr className="bg-slate-50">
                                            <td className="py-3 px-4 font-medium text-slate-900 border border-slate-300">Bàn học và Giá sách</td>
                                            <td className="py-3 px-4 text-slate-700 border border-slate-300">Tấm nhựa Ecoplast tiêu chuẩn an toàn cho bé</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">Sự hài lòng của khách hàng</h3>
                            <blockquote className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg mb-4">
                                <p className="text-slate-700 italic text-base leading-relaxed">
                                    &quot;Đội thợ thi công nhanh, sạch sẽ. Tủ nhựa nhưng làm lên trông sắc sảo không khác gì gỗ công nghiệp đắt tiền. Điểm ưng ý nhất là giờ không còn sợ mùi ẩm mốc hay lo nước đổ xuống gầm tủ bếp nữa. Xưởng trực tiếp làm nên giá cả rất tốt!&quot; — <strong className="text-slate-900">Anh Hoàng Gia</strong>
                                </p>
                            </blockquote>
                        </div>

                        <div className="flex gap-4 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                            <Award className="text-blue-600 shrink-0" size={32} />
                            <div>
                                <h4 className="font-bold text-slate-900 text-lg mb-1">Dự án được bảo hành 5 năm</h4>
                                <p className="text-slate-600">Toàn bộ hạng mục tại dự án đi kèm Phiếu Bảo Hành độ bền tấm nhựa 5 năm, bảo hành phụ kiện 2 năm đổi mới. Hotline hỗ trợ kỹ thuật 24/7.</p>
                            </div>
                        </div>

                    </div>

                    {/* Sticky Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">

                            <div className="bg-orange-500 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-orange-500/20">
                                <h3 className="font-bold text-2xl mb-4">Bạn thích mẫu thiết kế này?</h3>
                                <p className="text-orange-100 mb-6">Chúng tôi có thể điều chỉnh toàn bộ kích thước, layout và màu sắc để phù hợp với riêng bản vẽ nhà bạn.</p>
                                <div className="space-y-4">
                                    <a href="https://zalo.me/0865182562" target="_blank" className="block w-full text-center bg-white text-orange-600 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-colors">
                                        Nhận Bản Vẽ Miễn Phí
                                    </a>
                                    <a href="tel:0865182562" className="w-full flex items-center justify-center gap-2 border-2 border-white/40 hover:bg-white/10 font-bold py-3.5 rounded-xl transition-colors">
                                        <Phone size={18} /> Hotline: 086.518.2562
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4">Dự Án Tương Tự</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <Link href={`/cong-trinh/du-an-tuong-tu-${i}`} key={i} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                <img src="/images/products/tu-bep-chu-i.png" alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-900 text-sm group-hover:text-orange-500 line-clamp-2 transition-colors">Thi công tủ bếp nhựa chữ U tại Sơn Trà</h4>
                                                <p className="text-xs text-slate-500 mt-1">Hoàn thành: 09/2026</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
