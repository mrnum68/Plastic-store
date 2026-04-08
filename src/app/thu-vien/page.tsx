import Image from "next/image";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Thư Viện Hình Ảnh | Nội Thất Huy Hoàng",
  description: "Khám phá hàng ngàn bức ảnh thực tế từ xưởng Nội Thất Nhựa Huy Hoàng.",
};

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  let images: string[] = [];

  try {
    const files = fs.readdirSync(galleryDir);
    images = files
      .filter((f) => f.endsWith(".webp") || f.endsWith(".jpg") || f.endsWith(".png"))
      .sort((a, b) => {
        // Sort naturally if files are numerical
        const matchA = a.match(/\d+/);
        const matchB = b.match(/\d+/);
        if (matchA && matchB) {
          return parseInt(matchA[0]) - parseInt(matchB[0]);
        }
        return a.localeCompare(b);
      });
  } catch (err) {
    console.error("Gallery directory not found or empty.");
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-['Outfit']">
            Thư Viện <span className="text-orange-500">Hình Ảnh</span>
          </h1>
          <p className="text-lg text-slate-600">
            Khám phá những khoảnh khắc đẹp và sản phẩm thực tế được chụp trực tiếp từ xưởng sản xuất và công trình thi công của Nội Thất Nhựa Huy Hoàng.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((filename, index) => (
            <div 
              key={filename} 
              className="relative rounded-2xl overflow-hidden group break-inside-avoid bg-white shadow-sm border border-slate-100"
            >
              <div className="relative w-full">
                <Image
                  src={`/gallery/${filename}`}
                  alt={`Thư viện nội thất nhựa Huy Hoàng - Ảnh ${index + 1}`}
                  width={600}
                  height={800} // This defines the maximum quality aspect ratio Next.js will allocate without forced proportions.
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 w-full flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-medium text-sm drop-shadow-md">Nội Thất Huy Hoàng</p>
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {images.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Đang cập nhật hình ảnh...
          </div>
        )}
      </div>
    </div>
  );
}
