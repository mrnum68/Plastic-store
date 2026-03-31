import Link from "next/link";
import { ChevronRight, Settings, Maximize, Palette, ShieldCheck, PenTool, Phone, MessageCircle, Ruler, Star, Droplets, BugOff, Truck } from "lucide-react";

const productData: Record<string, {
    name: string; category: string; price: string; unit: string;
    desc: string; longDesc: string; material: string; surface: string;
    size: string; accessories: string; warranty: string; lifespan: string;
    image: string; gallery: string[];
}> = {
    "tu-bep-chu-l-hien-dai": {
        name: "Tủ Bếp Chữ L Hiện Đại",
        category: "Tủ Bếp Nhựa",
        price: "2.500.000đ",
        unit: "mét dài",
        desc: "Thiết kế chữ L tối ưu góc bếp, tận dụng tối đa diện tích. Chất liệu nhựa Ecoplast lõi đặc chống nước tuyệt đối, bề mặt vân gỗ tự nhiên sang trọng.",
        longDesc: "Tủ bếp chữ L là lựa chọn phổ biến nhất cho căn hộ chung cư và nhà phố tại Đà Nẵng. Xưởng Huy Hoàng thiết kế và sản xuất 100% theo kích thước đo đạc thực tế tại nhà bạn, đảm bảo vừa khít từng centimet. Chất liệu nhựa Ecoplast / Casawood lõi đặc kết hợp bản lề inox 304 và ray bi giảm chấn cao cấp cho tuổi thọ vượt trội hơn 20 năm, hoàn toàn không sợ ẩm mốc, cong vênh hay mối mọt.",
        material: "Ecoplast / Casawood lõi đặc",
        surface: "Acrylic bóng gương hoặc Melamine vân gỗ",
        size: "Tùy chỉnh 100% theo không gian bếp",
        accessories: "Bản lề inox 304 giảm chấn, Ray bi 3 tầng, Tay nắm nhôm nguyên khối",
        warranty: "Bảo hành nhựa 5 năm · Phụ kiện 2 năm",
        lifespan: "> 20 năm với điều kiện sử dụng bình thường",
        image: "/images/products/tu-bep-chu-l.png",
        gallery: [
            "/images/products/tu-bep-chu-l.png",
            "/images/products/tu-bep-chu-i.png",
            "/images/products/tu-bep-ban-dao.png",
            "/images/products/tu-bep-chu-l.png",
        ],
    },
    "tu-bep-chu-i-don-gian": {
        name: "Tủ Bếp Chữ I Đơn Giản",
        category: "Tủ Bếp Nhựa",
        price: "1.800.000đ",
        unit: "mét dài",
        desc: "Dáng thẳng gọn gàng cho gian bếp nhỏ, tiết kiệm chi phí tối đa mà vẫn đảm bảo tính thẩm mỹ và độ bền.",
        longDesc: "Tủ bếp chữ I là giải pháp tối ưu cho không gian bếp hẹp hoặc ngân sách hạn chế. Sử dụng nhựa Penco / Golden Plast 2 lớp tiêu chuẩn, vẫn đảm bảo chống nước và chống mối mọt tốt. Thiết kế đơn giản nhưng đầy đủ công năng: tủ trên, tủ dưới, bồn rửa và khu nấu. Xưởng Huy Hoàng sản xuất bằng máy CNC cho mối nối chính xác tuyệt đối.",
        material: "Penco / Golden Plast 2 lớp",
        surface: "Melamine vân gỗ chống xước",
        size: "Tùy chỉnh theo chiều dài tường bếp",
        accessories: "Bản lề giảm chấn loại thường, Ray bi 2 tầng, Tay nắm nhôm",
        warranty: "Bảo hành nhựa 2 năm · Phụ kiện 1 năm",
        lifespan: "> 15 năm",
        image: "/images/products/tu-bep-chu-i.png",
        gallery: [
            "/images/products/tu-bep-chu-i.png",
            "/images/products/tu-bep-chu-l.png",
            "/images/products/tu-bep-ban-dao.png",
            "/images/products/tu-bep-chu-l.png",
        ],
    },
    "tu-quan-ao-2-canh": {
        name: "Tủ Quần Áo Lắp Ghép 2 Cánh",
        category: "Tủ Quần Áo",
        price: "2.990.000đ",
        unit: "bộ",
        desc: "Kích thước 200 × 100 × 50 cm. Đóng sẵn, giao nhanh 3-5 ngày. Chống ẩm mốc, lý tưởng cho phòng ngủ nhỏ.",
        longDesc: "Tủ quần áo 2 cánh là sản phẩm đóng sẵn phổ biến nhất của xưởng Huy Hoàng. Với kích thước chuẩn 200 × 100 × 50 cm, phù hợp hoàn hảo cho phòng ngủ nhỏ, phòng trọ sinh viên và nhà ở xã hội. Thiết kế 2 cánh mở với ngăn treo đồ dài bên trái, ngăn kệ gấp bên phải. Chất liệu nhựa Ecoplast chống nước 100% – không lo mùa mưa ẩm ướt tại Đà Nẵng.",
        material: "Nhựa Ecoplast loại thường",
        surface: "Phủ vân gỗ nhiều màu lựa chọn",
        size: "200 × 100 × 50 cm (Cao × Rộng × Sâu)",
        accessories: "Bản lề giảm chấn, Thanh treo inox, Kệ chia ngăn tùy chỉnh",
        warranty: "Bảo hành nhựa 5 năm",
        lifespan: "> 15 năm",
        image: "/images/products/tu-quan-ao-2-canh.png",
        gallery: [
            "/images/products/tu-quan-ao-2-canh.png",
            "/images/products/tu-quan-ao-4-canh.png",
            "/images/products/tu-quan-ao-noi-that.png",
            "/images/products/tu-quan-ao-noi-that.png",
        ],
    },
    "tu-quan-ao-4-canh": {
        name: "Tủ Quần Áo 4 Cánh Kịch Trần",
        category: "Tủ Quần Áo",
        price: "5.000.000đ",
        unit: "bộ",
        desc: "Kích thước 200 × 181.5 × 50 cm. Kịch trần tối ưu không gian. Có ngăn treo, ngăn kéo, ngăn gấp riêng biệt.",
        longDesc: "Tủ quần áo 4 cánh kịch trần là mẫu bán chạy nhất cho gia đình có từ 2 thành viên trở lên. Với 4 cánh mở rộng rãi, bố trí khoa học gồm: 2 ngăn treo đồ dài, 2 ngăn kéo nhỏ, kệ gấp đa tầng và ngăn đồ phía trên cùng. Thiết kế kịch trần (cao 200cm) tận dụng triệt để không gian phòng ngủ. Chất liệu Ecoplast / Casawood lõi đặc chịu lực tốt, không cong vênh theo thời gian.",
        material: "Ecoplast / Casawood lõi đặc",
        surface: "Melamine vân gỗ cao cấp chống xước",
        size: "200 × 181.5 × 50 cm (Cao × Rộng × Sâu)",
        accessories: "4 Bản lề inox giảm chấn, 2 Ngăn kéo ray bi 3 tầng, Thanh treo inox 304",
        warranty: "Bảo hành nhựa 5 năm · Phụ kiện 2 năm",
        lifespan: "> 20 năm",
        image: "/images/products/tu-quan-ao-4-canh.png",
        gallery: [
            "/images/products/tu-quan-ao-4-canh.png",
            "/images/products/tu-quan-ao-2-canh.png",
            "/images/products/tu-quan-ao-noi-that.png",
            "/images/products/tu-quan-ao-noi-that.png",
        ],
    },
    "giuong-nhua-1m8": {
        name: "Giường Nhựa 1 Mét 8",
        category: "Giường Nhựa",
        price: "4.400.000đ",
        unit: "bộ",
        desc: "Kích thước 200 × 200 × 35 cm. Kết cấu chắc chắn, gân chịu lực dày đặc. Không cong vênh suốt đời sử dụng.",
        longDesc: "Giường nhựa 1m8 là kích thước phổ biến nhất cho phòng ngủ vợ chồng. Với kích thước nệm chuẩn 180 × 200 cm, khung giường nhựa Ecoplast / Penco có gân tăng cứng dày đặc, chịu tải trọng lên đến 300kg. Bề mặt phẳng đều, không bị võng xệ. Hoàn toàn không bị mối mọt hay cong vênh dù sử dụng trong điều kiện ẩm ướt nhất.",
        material: "Ecoplast / Penco lõi đặc",
        surface: "Vân gỗ sáng hoặc tối tùy chọn",
        size: "200 × 200 × 35 cm (Dài × Rộng × Cao)",
        accessories: "Đầu giường nhựa cùng bộ, Chân giường chịu lực inox",
        warranty: "Bảo hành nhựa 5 năm",
        lifespan: "> 20 năm",
        image: "/images/products/giuong-nhua-1m8.png",
        gallery: [
            "/images/products/giuong-nhua-1m8.png",
            "/images/products/giuong-nhua-2m.png",
            "/images/products/giuong-nhua-closeup.png",
            "/images/products/giuong-nhua-closeup.png",
        ],
    },
    "giuong-nhua-2m": {
        name: "Giường Nhựa 2 Mét Cao Cấp",
        category: "Giường Nhựa",
        price: "5.100.000đ",
        unit: "bộ",
        desc: "Phiên bản cao cấp nhựa lõi đặc Casawood, vân gỗ sang trọng. Chịu tải lớn, phù hợp gia đình.",
        longDesc: "Giường nhựa 2 mét là phiên bản cao cấp nhất dành cho phòng ngủ master. Sử dụng nhựa Casawood / Golden Plast dòng Premium với bề mặt vân gỗ tự nhiên sang trọng. Kết cấu gân tăng cứng siêu dày, chịu tải trọng lên đến 400kg. Thiết kế đầu giường cao, tích hợp khe cắm điện thoại và đèn đọc sách (tùy chọn).",
        material: "Casawood / Golden Plast Premium",
        surface: "Vân gỗ tự nhiên cao cấp",
        size: "200 × 200 × 35 cm (Dài × Rộng × Cao)",
        accessories: "Đầu giường cao cấp, Chân giường inox mạ, Ngăn kéo dưới gầm (tùy chọn)",
        warranty: "Bảo hành nhựa 5 năm · Phụ kiện 2 năm",
        lifespan: "> 25 năm",
        image: "/images/products/giuong-nhua-2m.png",
        gallery: [
            "/images/products/giuong-nhua-2m.png",
            "/images/products/giuong-nhua-1m8.png",
            "/images/products/giuong-nhua-closeup.png",
            "/images/products/giuong-nhua-closeup.png",
        ],
    },
    "ban-hoc-sinh-don": {
        name: "Bàn Học Sinh Đơn Kèm Giá Sách",
        category: "Bàn Học Sinh",
        price: "1.200.000đ",
        unit: "bộ",
        desc: "Thiết kế nhỏ gọn, tích hợp giá sách. An toàn cho trẻ, không formaldehyde.",
        longDesc: "Bàn học sinh nhựa của xưởng Huy Hoàng được thiết kế đặc biệt cho trẻ em từ 6-15 tuổi. Chiều cao bàn 75cm phù hợp tư thế ngồi chuẩn cho bé. Tích hợp giá sách phía trên và hộc tủ nhỏ bên dưới để cất bút viết, vở. Chất liệu nhựa Penco không chứa formaldehyde hay hóa chất độc hại, bo tròn các cạnh để an toàn cho trẻ nhỏ.",
        material: "Penco an toàn cho trẻ",
        surface: "Màu pastel tươi sáng hoặc vân gỗ nhẹ",
        size: "75 × 60 × 45 cm (Cao × Rộng × Sâu bàn)",
        accessories: "Giá sách 2 tầng, Hộc tủ nhỏ có khóa, Chân bàn chống trượt",
        warranty: "Bảo hành nhựa 3 năm",
        lifespan: "> 10 năm",
        image: "/images/products/ban-hoc-sinh-1.png",
        gallery: [
            "/images/products/ban-hoc-sinh-1.png",
            "/images/products/ban-hoc-sinh-2.png",
            "/images/products/ban-hoc-sinh-3.png",
            "/images/products/ban-hoc-sinh-2.png",
        ],
    },
    "tu-bep-dao-mini": {
        name: "Tủ Bếp Có Bàn Đảo Mini",
        category: "Tủ Bếp Nhựa",
        price: "Liên hệ báo giá",
        unit: "trọn bộ",
        desc: "Mẫu tủ bếp cao cấp kết hợp bàn đảo trung tâm, thiết kế riêng theo từng không gian.",
        longDesc: "Tủ bếp có bàn đảo mini là sản phẩm cao cấp nhất trong bộ sưu tập tủ bếp của xưởng Huy Hoàng. Thiết kế 100% theo yêu cầu, bao gồm: tủ bếp chữ L hoặc chữ U kết hợp bàn đảo trung tâm đa năng (vừa làm bàn ăn nhanh, vừa là khu chế biến phụ). Chất liệu Ecoplast / Casawood lõi đặc Full cao cấp, bề mặt Acrylic bóng gương hoặc vân gỗ tự nhiên. Phù hợp cho biệt thự, nhà phố rộng tại Đà Nẵng.",
        material: "Ecoplast / Casawood Full lõi đặc cao cấp",
        surface: "Acrylic bóng gương hoặc Vân gỗ tự nhiên Premium",
        size: "Thiết kế riêng theo mặt bằng bếp",
        accessories: "Full bộ phụ kiện cao cấp: Bản lề Blum, Ray giảm chấn Blum, Giỏ gia vị, Thùng rác âm",
        warranty: "Bảo hành nhựa 5 năm · Phụ kiện Blum 3 năm",
        lifespan: "> 25 năm",
        image: "/images/products/tu-bep-ban-dao.png",
        gallery: [
            "/images/products/tu-bep-ban-dao.png",
            "/images/products/tu-bep-chu-l.png",
            "/images/products/tu-bep-chu-i.png",
            "/images/products/tu-bep-chu-l.png",
        ],
    },
};

// Fallback for unknown slugs
const defaultProduct = productData["tu-bep-chu-l-hien-dai"];

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const product = productData[params.slug] || defaultProduct;
    return {
        title: `${product.name} | ${product.price !== "Liên hệ báo giá" ? product.price + "/" + product.unit : "Báo Giá Xưởng"} - Huy Hoàng Đà Nẵng`,
        description: `${product.desc} Chất liệu ${product.material}. ${product.warranty}. Xưởng thi công trực tiếp, giá gốc không qua trung gian.`,
        keywords: `${product.name.toLowerCase()}, ${product.category.toLowerCase()} đà nẵng, nội thất nhựa huy hoàng, ${product.material.toLowerCase()}`,
    };
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const product = productData[params.slug] || defaultProduct;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-3 flex items-center text-sm text-slate-500 gap-2 flex-wrap">
                    <Link href="/" className="hover:text-orange-500 transition-colors">Trang chủ</Link>
                    <ChevronRight size={14} />
                    <Link href="/san-pham" className="hover:text-orange-500 transition-colors">Sản Phẩm</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 font-medium">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Main Product Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-10 mb-8">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Image Gallery */}
                        <div className="w-full lg:w-1/2">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-slate-100 bg-slate-50">
                                <img
                                    src={product.image}
                                    alt={`${product.name} - Nội Thất Nhựa Huy Hoàng Đà Nẵng`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {product.gallery.map((img, i) => (
                                    <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-orange-500' : 'border-slate-200 opacity-70 hover:opacity-100'} transition-all cursor-pointer`}>
                                        <img src={img} alt={`${product.name} góc ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:w-1/2 flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <PenTool size={14} /> Tùy chỉnh 100%
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <Droplets size={14} /> Chống nước
                                </span>
                                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                                    <BugOff size={14} /> Không mối mọt
                                </span>
                            </div>

                            <span className="text-sm text-orange-500 font-medium mb-1">{product.category}</span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{product.name}</h1>

                            <div className="text-3xl font-bold text-orange-500 mb-2 border-b border-slate-100 pb-6">
                                {product.price} <span className="text-lg text-slate-500 font-normal">/ {product.unit}</span>
                                <p className="text-sm font-normal text-slate-400 mt-2 italic">* Giá cuối cùng phụ thuộc kích thước và phụ kiện đi kèm.</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <p className="text-slate-700 leading-relaxed">{product.longDesc}</p>

                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                                        <ShieldCheck className="text-orange-500 shrink-0" size={18} /> {product.warranty}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                                        <Droplets className="text-blue-500 shrink-0" size={18} /> Chống nước 100%
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                                        <BugOff className="text-red-500 shrink-0" size={18} /> Không mối mọt
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-700 text-sm">
                                        <Truck className="text-green-500 shrink-0" size={18} /> Giao & Lắp tận nơi
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://zalo.me/0865182562" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#0068FF] hover:bg-[#005AE0] text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-blue-500/20">
                                    <MessageCircle size={22} /> Nhận Tư Vấn Zalo
                                </a>
                                <a href="tel:0865182562" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-orange-500/30">
                                    <Phone size={22} className="animate-pulse" /> 086.518.2562
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="bg-slate-900 p-6 flex items-center gap-3">
                        <Settings className="text-orange-500" />
                        <h2 className="text-xl font-bold text-white">Thông Số Kỹ Thuật</h2>
                    </div>
                    <div className="p-6 md:p-10">
                        <div className="bg-orange-50 border border-orange-100 text-orange-800 p-4 rounded-xl mb-8 flex gap-3 text-sm">
                            <Ruler className="shrink-0 mt-0.5" size={18} />
                            <p>Xưởng Huy Hoàng hỗ trợ <strong>tùy chỉnh 100% kích thước, màu sắc và công năng</strong>. Thông số bên dưới là thông số cơ bản tham khảo.</p>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <tbody>
                                {[
                                    { icon: <Maximize size={16} className="text-slate-400" />, label: "Kích thước", value: product.size },
                                    { icon: <Settings size={16} className="text-slate-400" />, label: "Chất liệu cốt", value: product.material },
                                    { icon: <Palette size={16} className="text-slate-400" />, label: "Bề mặt phủ", value: product.surface },
                                    { icon: <Settings size={16} className="text-slate-400" />, label: "Phụ kiện đi kèm", value: product.accessories },
                                    { icon: <ShieldCheck size={16} className="text-slate-400" />, label: "Bảo hành", value: product.warranty },
                                    { icon: <Star size={16} className="text-slate-400" />, label: "Tuổi thọ vật liệu", value: product.lifespan },
                                ].map((spec, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <th className="py-4 pr-4 font-semibold text-slate-700 w-1/3">
                                            <span className="flex items-center gap-2">{spec.icon} {spec.label}</span>
                                        </th>
                                        <td className="py-4 text-slate-600 font-medium">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Bạn muốn đặt {product.name}?</h2>
                    <p className="text-white/90 mb-6 max-w-lg mx-auto">
                        Liên hệ xưởng Huy Hoàng ngay để nhận tư vấn miễn phí, đo đạc tại nhà và báo giá chính xác nhất!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://zalo.me/0865182562" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 font-bold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors">
                            Nhắn Zalo Báo Giá
                        </a>
                        <Link href="/san-pham" className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
                            ← Xem Tất Cả Sản Phẩm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
