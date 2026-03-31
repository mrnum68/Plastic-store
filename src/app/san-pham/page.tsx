import Link from "next/link";
import { ChevronRight, Filter, Search, Star, Droplets, BugOff, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Sản Phẩm Nội Thất Nhựa Cao Cấp - Xưởng Huy Hoàng Đà Nẵng",
    description: "Tổng hợp mẫu tủ bếp nhựa, tủ quần áo, giường nhựa, bàn học sinh Ecoplast / Penco / Casawood / Golden Plast. Giá gốc xưởng, nhận thi công theo yêu cầu tại Đà Nẵng.",
    keywords: "tủ bếp nhựa đà nẵng, tủ quần áo nhựa, giường nhựa ecoplast, bàn học sinh nhựa, nội thất nhựa huy hoàng",
};

const products = [
    {
        id: "tu-bep-chu-l-hien-dai",
        name: "Tủ Bếp Chữ L Hiện Đại",
        category: "Tủ Bếp Nhựa",
        price: "Từ 2.500.000đ / md",
        desc: "Thiết kế chữ L tối ưu góc bếp, chất liệu nhựa Ecoplast lõi đặc chống nước tuyệt đối. Phù hợp căn hộ chung cư và nhà phố.",
        image: "/images/products/tu-bep-chu-l.png",
        popular: true,
        material: "Ecoplast / Casawood",
    },
    {
        id: "tu-bep-chu-i-don-gian",
        name: "Tủ Bếp Chữ I Đơn Giản",
        category: "Tủ Bếp Nhựa",
        price: "Từ 1.800.000đ / md",
        desc: "Dáng thẳng gọn gàng cho gian bếp nhỏ. Nhựa Penco / Golden Plast 2 lớp tiết kiệm chi phí mà vẫn bền bỉ.",
        image: "/images/products/tu-bep-chu-i.png",
        popular: false,
        material: "Penco / Golden Plast",
    },
    {
        id: "tu-quan-ao-2-canh",
        name: "Tủ Quần Áo Lắp Ghép 2 Cánh",
        category: "Tủ Quần Áo",
        price: "2.990.000đ",
        desc: "Kích thước 200 × 100 × 50 cm. Đóng sẵn, giao nhanh 3-5 ngày. Chống ẩm mốc hoàn toàn, lý tưởng cho phòng ngủ nhỏ.",
        image: "/images/products/tu-quan-ao-2-canh.png",
        popular: true,
        material: "Ecoplast",
    },
    {
        id: "tu-quan-ao-4-canh",
        name: "Tủ Quần Áo 4 Cánh Kịch Trần",
        category: "Tủ Quần Áo",
        price: "5.000.000đ",
        desc: "Kích thước 200 × 181.5 × 50 cm. Thiết kế kịch trần tối ưu không gian lưu trữ. Có ngăn treo, ngăn kéo, ngăn gấp riêng biệt.",
        image: "/images/products/tu-quan-ao-4-canh.png",
        popular: true,
        material: "Ecoplast / Casawood",
    },
    {
        id: "giuong-nhua-1m8",
        name: "Giường Nhựa 1 Mét 8",
        category: "Giường Nhựa",
        price: "4.400.000đ",
        desc: "Kích thước 200 × 200 × 35 cm. Kết cấu chắc chắn, gân chịu lực dày đặc, mặt phẳng đều. Không cong vênh, không mối mọt suốt đời sử dụng.",
        image: "/images/products/giuong-nhua-1m8.png",
        popular: false,
        material: "Ecoplast / Penco",
    },
    {
        id: "giuong-nhua-2m",
        name: "Giường Nhựa 2 Mét Cao Cấp",
        category: "Giường Nhựa",
        price: "5.100.000đ",
        desc: "Kích thước 200 × 200 × 35 cm. Phiên bản cao cấp nhựa lõi đặc Casawood, bề mặt vân gỗ sang trọng. Chịu tải trọng lớn, phù hợp gia đình.",
        image: "/images/products/giuong-nhua-2m.png",
        popular: false,
        material: "Casawood / Golden Plast",
    },
    {
        id: "ban-hoc-sinh-don",
        name: "Bàn Học Sinh Đơn Kèm Giá Sách",
        category: "Bàn Học Sinh",
        price: "1.200.000đ",
        desc: "Thiết kế nhỏ gọn, tích hợp giá sách phía trên. Chất liệu nhựa an toàn, không formaldehyde, phù hợp cho trẻ từ 6-15 tuổi.",
        image: "/images/products/ban-hoc-sinh-1.png",
        popular: false,
        material: "Penco",
    },
    {
        id: "tu-bep-dao-mini",
        name: "Tủ Bếp Có Bàn Đảo Mini",
        category: "Tủ Bếp Nhựa",
        price: "Liên hệ báo giá",
        desc: "Mẫu tủ bếp cao cấp kết hợp bàn đảo trung tâm. Thiết kế riêng theo từng không gian, bề mặt Acrylic bóng gương hoặc vân gỗ tự nhiên.",
        image: "/images/products/tu-bep-ban-dao.png",
        popular: true,
        material: "Ecoplast / Casawood",
    },
];

export default function ProductsPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header with SEO */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/products/tu-bep-chu-l.png')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                        <Link href="/" className="hover:text-orange-400 transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <span className="text-orange-400 font-medium">Sản Phẩm</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Sản Phẩm Nội Thất Nhựa Cao Cấp</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Khám phá bộ sưu tập nội thất nhựa <strong className="text-orange-400">Ecoplast · Penco · Casawood · Golden Plast</strong> được thiết kế và thi công tại xưởng Huy Hoàng. Tất cả đều tùy chỉnh kích thước theo yêu cầu.
                    </p>
                    <div className="flex items-center justify-center gap-6 mt-8 text-sm">
                        <span className="flex items-center gap-1.5"><Droplets size={16} className="text-blue-400" /> Chống nước 100%</span>
                        <span className="flex items-center gap-1.5"><BugOff size={16} className="text-red-400" /> Không mối mọt</span>
                        <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-green-400" /> Bảo hành 5 năm</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
                {/* Sidebar Filter */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-6">
                            <Filter size={20} /> Bộ Lọc Sản Phẩm
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-medium text-slate-900 mb-3">Danh Mục</h4>
                                <div className="space-y-2">
                                    {["Tất cả", "Tủ Bếp Nhựa", "Tủ Quần Áo", "Giường Nhựa", "Bàn Học Sinh"].map((cat, i) => (
                                        <label key={cat} className="flex items-center gap-2 text-slate-600 hover:text-orange-500 cursor-pointer">
                                            <input type="checkbox" className="accent-orange-500" defaultChecked={i === 0} /> {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="font-medium text-slate-900 mb-3">Chất Liệu</h4>
                                <div className="space-y-2">
                                    {["Ecoplast", "Penco", "Casawood", "Golden Plast"].map(m => (
                                        <label key={m} className="flex items-center gap-2 text-slate-600 hover:text-orange-500 cursor-pointer">
                                            <input type="checkbox" className="accent-orange-500" /> {m}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="font-medium text-slate-900 mb-3">Mức Giá</h4>
                                <div className="space-y-2">
                                    {["Tất cả", "Dưới 3 Triệu", "3 - 5 Triệu", "Trên 5 Triệu"].map((p, i) => (
                                        <label key={p} className="flex items-center gap-2 text-slate-600 hover:text-orange-500 cursor-pointer">
                                            <input type="radio" name="price" className="accent-orange-500" defaultChecked={i === 0} /> {p}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">Áp dụng</button>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-slate-600">Hiển thị <span className="font-bold text-slate-900">{products.length}</span> sản phẩm</p>
                        <div className="relative">
                            <input type="text" placeholder="Tìm kiếm nhanh..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500" />
                            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link href={`/san-pham/${product.id}`} key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-orange-500 transition-all duration-300 flex flex-col">
                                <div className="relative h-56 overflow-hidden bg-slate-100">
                                    <img src={product.image} alt={`${product.name} - Nội Thất Nhựa Huy Hoàng Đà Nẵng`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    {product.popular && (
                                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                                            <Star size={12} fill="white" /> Bán Chạy
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-md text-slate-700">{product.category}</div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">{product.name}</h2>
                                        <p className="text-sm text-slate-500 mb-2 line-clamp-2">{product.desc}</p>
                                        <p className="text-xs text-slate-400 mb-3">Chất liệu: <span className="font-medium text-slate-600">{product.material}</span></p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                                        <span className="text-orange-500 font-bold text-lg">{product.price}</span>
                                        <span className="text-sm text-orange-500 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">Xem chi tiết <ChevronRight size={16} /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Không tìm thấy mẫu ưng ý?</h2>
                        <p className="text-white/90 mb-6 max-w-lg mx-auto">Xưởng Huy Hoàng nhận thiết kế và thi công 100% theo yêu cầu kích thước, màu sắc, kiểu dáng. Liên hệ ngay để được tư vấn miễn phí!</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://zalo.me/0865182562" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors">Nhắn Zalo Báo Giá</a>
                            <a href="tel:0865182562" className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">Gọi 086.518.2562</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
