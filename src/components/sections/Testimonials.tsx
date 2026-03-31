import { Star, MessageCircle } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Anh Hoàng Nam",
        location: "Liên Chiểu, Đà Nẵng",
        text: "Thợ làm rất kỹ và sạch sẽ. Tủ bếp nhựa Acrylic của Huy Hoàng nhìn bên ngoài không khác gì gỗ công nghiệp An Cường nhưng lại chống nước 100%. Rất đáng tiền!",
        initials: "HN",
        color: "bg-orange-500",
        projectImage: "/images/products/tu-bep-chu-l.png",
        projectAlt: "tu-bep-nhua-acrylic-nha-anh-nam-lien-chieu.jpg"
    },
    {
        id: 2,
        name: "Chị Thu Thảo",
        location: "Hải Châu, Đà Nẵng",
        text: "Hài lòng nhất là thái độ phục vụ. Tôi chỉ nhắn Zalo lúc 9h tối mà kỹ thuật vẫn tư vấn nhiệt tình, hôm sau qua đo đạc luôn. Tủ áo cánh lùa làm cực êm, không bị rít.",
        initials: "TT",
        color: "bg-purple-500",
        projectImage: "/images/products/tu-quan-ao-2-canh.png",
        projectAlt: "tu-quan-ao-nhua-canh-lua-nha-chi-thao.jpg"
    },
    {
        id: 3,
        name: "Chú Bình",
        location: "Sơn Trà, Đà Nẵng",
        text: "Nhà chú gần biển nên dùng gỗ hay bị mủn và mối ăn. Chuyển sang dùng toàn bộ giường và tủ nhựa Ecoplast của xưởng Huy Hoàng giải quyết dứt điểm nỗi lo. Chất nhựa rất cứng cáp.",
        initials: "CB",
        color: "bg-teal-500",
        projectImage: "/images/products/giuong-nhua-1m8.png",
        projectAlt: "giuong-nhua-vincoplast-nha-chu-binh-son-tra.jpg"
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <span className="text-orange-500 font-bold uppercase tracking-wider text-sm mb-2 block">Đánh Giá Thực Tế</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Khách Hàng Nói Gì Về <span className="text-orange-500">Nội Thất Nhựa Huy Hoàng</span>?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        100% đánh giá thật từ các chủ nhà đã trải nghiệm dịch vụ thi công nội thất nhựa trọn gói tại Đà Nẵng và các tỉnh lân cận.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative pt-12 mt-8 transition-transform hover:-translate-y-2">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                <div className={`w-20 h-20 rounded-full border-4 border-white shadow-lg ${review.color} flex items-center justify-center`}>
                                    <span className="text-white font-extrabold text-xl">{review.initials}</span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="text-yellow-400 fill-yellow-400" size={20} />
                                ))}
                            </div>

                            <p className="text-slate-700 italic mb-6 text-center leading-relaxed">
                                "{review.text}"
                            </p>

                            <div className="text-center mb-6">
                                <h3 className="font-bold text-slate-900 text-lg">{review.name}</h3>
                                <p className="text-orange-500 text-sm font-medium">{review.location}</p>
                            </div>

                            <div className="rounded-xl overflow-hidden border border-slate-200">
                                <img src={review.projectImage} alt={review.projectAlt} className="w-full h-40 object-cover" loading="lazy" />
                                <div className="bg-white p-3 text-xs text-center font-medium text-slate-600">
                                    Ảnh thực tế thi công tại nhà khách
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative border border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Xưởng Trực Tiếp Sản Xuất - KHÔNG Qua Trung Gian
                            </h3>
                            <p className="text-slate-300 text-lg mb-6">
                                Trực tiếp theo dõi tiến độ thi công vật liệu nhựa Ecoplast / Penco / Casawood / Golden Plast tại xưởng. Kỹ thuật máy CNC chuẩn xác 100%.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-sm">✓ Vật tư chính hãng</div>
                                <div className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-sm">✓ Phụ kiện Inox 304</div>
                                <div className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium backdrop-blur-sm">✓ Đội thợ 10 năm kinh nghiệm</div>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative h-[300px] rounded-2xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1621252178971-ce488d0fc6d7?q=80&w=1632&auto=format&fit=crop" alt="tho-dang-lap-dat-tu-bep-nhua-tai-xuong.jpg" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
