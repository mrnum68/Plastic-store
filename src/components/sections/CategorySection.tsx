import { ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        id: "tu-bep",
        title: "Tủ Bếp Nhựa",
        description: "Giải pháp cho không gian bếp hiện đại, chống ẩm mốc, dễ dàng lau chùi.",
        image: "/images/products/tu-bep-chu-i.png",
        link: "/san-pham/tu-bep-nhua"
    },
    {
        id: "tu-quan-ao",
        title: "Tủ Quần Áo",
        description: "Thiết kế đo ni đóng giày, tối ưu diện tích, không lo mối mọt cắn phá.",
        image: "/images/products/tu-quan-ao-2-canh.png",
        link: "/san-pham/tu-quan-ao"
    },
    {
        id: "giuong-nhua",
        title: "Giường Nhựa",
        description: "Kết cấu vững chắc, đa dạng màu sắc giả gỗ tuyệt đẹp, tích hợp ngăn kéo tiện lợi.",
        image: "/images/products/giuong-nhua-1m8.png",
        link: "/san-pham/giuong-nhua"
    },
    {
        id: "ban-hoc",
        title: "Bàn Học Sinh",
        description: "Bàn học hiện đại kèm giá sách, an toàn cho trẻ em, độ bền trên 10 năm.",
        image: "/images/products/ban-hoc-sinh-1.png",
        link: "/san-pham/ban-hoc-sinh"
    }
];

export default function CategorySection() {
    return (
        <section id="nhu-cau-thuc" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Bạn Đang Tìm Kiếm Sản Phẩm Gì?</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Khám phá các dòng sản phẩm nội thất nhựa cao cấp được thiết kế và thi công trực tiếp bởi Xưởng Huy Hoàng.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 bg-white">
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-slate-600 mb-4 h-12 line-clamp-2">
                                    {category.description}
                                </p>
                                <Link href={category.link} className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all">
                                    Xem chi tiết <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
