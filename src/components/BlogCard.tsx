import Link from "next/link";
import { BlogPost } from "@/app/tin-tuc/data";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <Link href={`/tin-tuc/${post.id}`} className="block aspect-[16/9] w-full shrink-0 overflow-hidden relative">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-orange-500" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} className="text-orange-500" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <Link href={`/tin-tuc/${post.id}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        
        <Link 
          href={`/tin-tuc/${post.id}`} 
          className="inline-flex items-center gap-2 text-orange-600 font-bold text-sm hover:gap-3 transition-all"
        >
          Xem chi tiết <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
