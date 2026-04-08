import Link from "next/link";
import { ChevronRight, Calendar, MapPin, User, Ruler, Award, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "../data";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const data = PROJECTS_DATA[params.slug];
    if (!data) return { title: "Dự Án Không Tồn Tại" };
    
    return {
        title: `Dự Án: ${data.title} - Thi Công Nội Thất Nhựa Huy Hoàng`,
        description: `Xem chi tiết quá trình thiết kế và thi công dự án ${data.title}. Giải pháp chống mối mọt, chống nước 100% bằng nhựa Ecoplast cao cấp.`,
    };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = PROJECTS_DATA[params.slug];

    if (!project) return notFound();

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-40 bg-white/95 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-3 flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
                    <ChevronRight size={14} className="shrink-0" />
                    <Link href="/cong-trinh" className="hover:text-orange-500 transition-colors">Công Trình</Link>
                    <ChevronRight size={14} className="shrink-0" />
                    <span className="text-slate-900 font-medium truncate">{project.title}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">

                {/* Project Header Info */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 mb-8 text-center pt-12 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{project.title}</h1>

                    <div className="flex flex-wrap justify-center gap-6 text-slate-600 text-sm md:text-base">
                        <span className="flex items-center gap-2"><User className="text-orange-500" size={18} /> CĐT: {project.customer}</span>
                        <span className="flex items-center gap-2"><MapPin className="text-orange-500" size={18} /> {project.location}</span>
                        <span className="flex items-center gap-2"><Calendar className="text-orange-500" size={18} /> Hoàn thành: {project.date}</span>
                        <span className="flex items-center gap-2"><Ruler className="text-orange-500" size={18} /> Tổng diện tích: {project.area}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content & Gallery */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Main Featured Image */}
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                            <img src={project.mainImage} alt={project.title} className="w-full h-[400px] md:h-[500px] object-cover object-center" />
                            <div className="p-4 bg-slate-100 text-slate-600 text-sm text-center italic border-t border-slate-200">
                                {project.mainImageCaption}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">1. Hiện trạng và Yêu cầu khách hàng</h2>
                            <p className="text-slate-700 text-base leading-relaxed mb-4">
                                {project.description}
                            </p>
                            <p className="text-slate-900 font-bold text-base mb-3">Yêu cầu đặt ra:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700 text-base">
                                {project.requirements.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>

                            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">2. Giải pháp kỹ thuật từ Xưởng Huy Hoàng</h2>
                            <p className="text-slate-700 text-base leading-relaxed mb-6">
                                {project.solution}
                            </p>

                            <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {project.gallery.map((img, idx) => (
                                    <div key={idx} className={`rounded-xl overflow-hidden shadow-md ${project.gallery.length === 1 ? 'md:col-span-2 lg:col-span-3 h-80' : ''}`}>
                                        <img src={img.src} alt="Dự án thực tế" className={`w-full object-cover ${project.gallery.length === 1 ? 'h-72 object-center' : 'h-64'}`} />
                                        <div className="p-3 bg-slate-50 text-xs text-center font-medium text-slate-700 line-clamp-1">{img.caption}</div>
                                    </div>
                                ))}
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
                                        {project.items.map((item, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                                <td className="py-3 px-4 font-medium text-slate-900 border border-slate-300">{item.name}</td>
                                                <td className="py-3 px-4 text-slate-700 border border-slate-300">{item.material}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">Sự hài lòng của khách hàng</h3>
                            <blockquote className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg mb-4">
                                <p className="text-slate-700 italic text-base leading-relaxed">
                                    &quot;{project.quote}&quot; — <strong className="text-slate-900">{project.customer}</strong>
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
                                <p className="text-orange-100 mb-6">Chúng tôi có thể điều chỉnh toàn bộ kích thước, layout và màu sắc để phù hợp với riêng không gian nhà bạn.</p>
                                <div className="space-y-4">
                                    <a href="https://zalo.me/0865182562" target="_blank" className="block w-full text-center bg-white text-orange-600 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-colors">
                                        Nhận Báo Giá Mẫu Này
                                    </a>
                                    <a href="tel:0865182562" className="w-full flex items-center justify-center gap-2 border-2 border-white/40 hover:bg-white/10 font-bold py-3.5 rounded-xl transition-colors">
                                        <Phone size={18} /> Hotline: 086.518.2562
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-900 text-lg mb-4">Dự Án Khác</h3>
                                <div className="space-y-4">
                                    {Object.values(PROJECTS_DATA).filter(p => p.id !== project.id).slice(0, 3).map(p => (
                                        <Link href={`/cong-trinh/${p.id}`} key={p.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                <img src={p.mainImage} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-900 text-sm group-hover:text-orange-500 line-clamp-2 transition-colors">{p.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">Hoàn thành: {p.date}</p>
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
