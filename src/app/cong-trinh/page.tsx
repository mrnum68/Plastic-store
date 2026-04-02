import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Home, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dự Án Công Trình Nội Thất Nhựa Đã Thi Công - Huy Hoàng",
    description: "Tổng hợp các dự án, công trình thi công tủ bếp nhựa, tủ quần áo, giường ngủ bằng nhựa Ecoplast / Penco / Casawood / Golden Plast do Huy Hoàng thực hiện.",
};

import { PROJECTS_DATA } from "./data";

const projects = Object.values(PROJECTS_DATA);

export default function ProjectsPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-slate-900 py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1631&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                        <Home size={16} /> 500+ Công Trình Đã Bàn Giao
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">Công Trình Thực Tế</h1>
                    <p className="text-slate-300 max-w-3xl mx-auto text-lg hover:text-white transition-colors">
                        Hình ảnh thật 100% không qua chỉnh sửa ảo. Cùng xem quy trình biến đổi không gian từ bản vẽ 3D đến khi hoàn thiện lắp đặt tại nhà khách hàng. Trăm nghe không bằng một nhìn!
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 mt-12">
                {/* Navigation Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium shadow-md transition-transform hover:scale-105">Tất Cả Dự Án</button>
                    <button className="px-6 py-2.5 bg-white text-slate-700 hover:text-orange-500 hover:border-orange-500 rounded-full font-medium border border-slate-200 transition-colors">Combo Trọn Gói</button>
                    <button className="px-6 py-2.5 bg-white text-slate-700 hover:text-orange-500 hover:border-orange-500 rounded-full font-medium border border-slate-200 transition-colors">Tủ Bếp</button>
                    <button className="px-6 py-2.5 bg-white text-slate-700 hover:text-orange-500 hover:border-orange-500 rounded-full font-medium border border-slate-200 transition-colors">Phòng Ngủ</button>
                    <button className="px-6 py-2.5 bg-white text-slate-700 hover:text-orange-500 hover:border-orange-500 rounded-full font-medium border border-slate-200 transition-colors">Cải Tạo</button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link href={`/cong-trinh/${project.id}`} key={project.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-slate-200 transition-all duration-300 flex flex-col">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.mainImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                    {project.category}
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-sm">
                                    <span className="flex items-center gap-1.5 drop-shadow-md"><MapPin size={14} /> {project.location}</span>
                                    <span className="flex items-center gap-1.5 drop-shadow-md"><Calendar size={14} /> {project.date}</span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                                    {project.title}
                                </h2>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto border-t border-slate-100 pt-4 cursor-pointer text-orange-500 font-semibold group-hover:gap-3 flex justify-between items-center transition-all">
                                    <span>Xem chi tiết dự án</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Call to action */}
                <div className="mt-16 bg-orange-50 rounded-3xl p-8 md:p-12 text-center border border-orange-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Bạn Đã Sẵn Sàng Biến Nhà Mình Thay Đổi?</h2>
                    <p className="text-slate-600 mb-6">Bạn đã chọn được phong cách thiết kế ưng ý? Gửi ngay cho chúng tôi để nhận bản vẽ 3D và báo giá chi tiết hoàn toàn miễn phí!</p>
                    <a href="tel:0865182562" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-orange-500/40 transition-all hover:-translate-y-1">
                        <Phone size={24} className="animate-pulse" /> Nhận Tư Vấn Ngay
                    </a>
                </div>
            </div>
        </div>
    );
}
