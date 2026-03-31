"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: 1,
        title: "Tủ Bếp Chữ L Vân Gỗ",
        location: "Sơn Trà, Đà Nẵng",
        image: "/images/products/tu-bep-ban-dao.png"
    },
    {
        id: 2,
        title: "Nội Thất Phòng Ngủ Hiện Đại",
        location: "Liên Chiểu, Đà Nẵng",
        image: "/images/products/tu-bep-chu-l.png"
    },
    {
        id: 3,
        title: "Tủ Bếp Acrylic Kịch Trần",
        location: "Hải Châu, Đà Nẵng",
        image: "/images/products/tu-bep-ban-dao.png"
    },
    {
        id: 4,
        title: "Tủ Quần Áo Cửa Lùa Cao Cấp",
        location: "Cẩm Lệ, Đà Nẵng",
        image: "/images/products/tu-quan-ao-2-canh.png"
    }
];

export default function ProjectsSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 3000 })]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section id="cong-trinh" className="py-20 bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="text-left max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Công Trình Thực Tế</h2>
                        <p className="text-lg text-slate-400">
                            Chiêm ngưỡng các không gian đẹp được đội ngũ Xưởng Huy Hoàng thiết kế và thi công trực tiếp cho khách hàng. Hình ảnh thật, chất lượng thật.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="embla" ref={emblaRef}>
                    <div className="embla__container flex">
                        {projects.map((project) => (
                            <div key={project.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-6">
                                <Link href={`/cong-trinh/du-an-so-${project.id}`} className="group rounded-2xl overflow-hidden relative block w-full h-full">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <p className="text-orange-400 font-medium mb-1">{project.location}</p>
                                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
