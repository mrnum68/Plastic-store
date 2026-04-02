"use client";

import { useState } from "react";

export default function ProductGallery({ 
    images, 
    productName 
}: { 
    images: string[], 
    productName: string 
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-slate-100 bg-slate-50 shadow-sm relative group">
                <img
                    src={images[activeIndex]}
                    alt={`${productName} - Hình ảnh chi tiết ${activeIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 cursor-zoom-in"
                    key={activeIndex} // this forces re-render if I want or fade effect. Let's just keep it simple.
                />
            </div>
            <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                    <div 
                        key={i} 
                        onClick={() => setActiveIndex(i)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeIndex === i ? 'border-orange-500 shadow-md transform scale-105 z-10' : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                        }`}
                    >
                        <img src={img} alt={`${productName} góc ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}
