import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="bg-white inline-block p-1 rounded-2xl mb-4">
                        <img src="/logo-full.png" alt="Nội Thất Nhựa Huy Hoàng Logo" className="w-48 object-contain mix-blend-multiply" />
                    </div>
                    <p className="mb-4">
                        Xưởng sản xuất nội thất nhựa cao cấp Ecoplast / Penco / Casawood / Golden Plast. Thi công trọn gói từ xưởng, không qua trung gian.
                    </p>
                    <p>📍 Xưởng sản xuất: 400 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                    <p>📞 Hotline: 086.518.2562</p>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Danh Mục Sản Phẩm</h3>
                    <ul className="space-y-2">
                        <li><Link href="/#nhu-cau-thuc" className="hover:text-orange-500 transition-colors">Tủ Bếp Nhựa</Link></li>
                        <li><Link href="/#nhu-cau-thuc" className="hover:text-orange-500 transition-colors">Tủ Quần Áo</Link></li>
                        <li><Link href="/#nhu-cau-thuc" className="hover:text-orange-500 transition-colors">Giường Nhựa</Link></li>
                        <li><Link href="/#nhu-cau-thuc" className="hover:text-orange-500 transition-colors">Bàn Học Sinh</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-4">Chính Sách</h3>
                    <ul className="space-y-2">
                        <li>Bảo hành 5 năm độ bền nhựa</li>
                        <li>Bảo hành 2 năm phụ kiện</li>
                        <li>Miễn phí thiết kế 3D</li>
                        <li>Miễn phí vận chuyển nội thành</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-700 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Nội Thất Nhựa Huy Hoàng. All rights reserved.</p>
            </div>
        </footer>
    );
}
