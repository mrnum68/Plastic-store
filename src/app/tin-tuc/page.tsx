import { BLOG_POSTS } from "./data";
import BlogCard from "@/components/BlogCard";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  const posts = Object.values(BLOG_POSTS);
  const featuredPost = posts[0]; // Assuming the first one is featured
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-bold">Tin tức & Hướng dẫn</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-12 pb-20 border-b border-slate-100 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Tin Tức <span className="text-orange-500">&</span> Hướng Dẫn Nội Thất
            </h1>
            <p className="text-lg text-slate-600">
              Cập nhật xu hướng thiết kế mới nhất 2026, hướng dẫn kỹ thuật và kinh nghiệm chọn mua nội thất nhựa cao cấp tại Đà Nẵng.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="relative group rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[500px]">
                <div className="lg:w-3/5 relative h-[300px] lg:h-auto overflow-hidden">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute top-6 left-6 block sm:hidden">
                    <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      Mới nhất
                    </span>
                  </div>
                </div>
                
                <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10 text-white">
                   <div className="mb-6 hidden sm:block">
                    <span className="bg-orange-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      Nổi bật nhất
                    </span>
                  </div>
                  <div className="text-orange-400 font-bold mb-3">{featuredPost.category}</div>
                  <Link href={`/tin-tuc/${featuredPost.id}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:text-orange-400 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-slate-300 mb-8 line-clamp-3 md:line-clamp-4 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <Link 
                    href={`/tin-tuc/${featuredPost.id}`}
                    className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:translate-x-3 w-fit"
                  >
                    Đọc bài viết ngay
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-3xl font-bold text-slate-900">Bài viết mới cập nhật</h2>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-orange-500 focus:outline-none bg-white transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            posts.map((post) => (
               <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-16 flex justify-center">
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-orange-500 hover:text-orange-600 transition-all">
                Xem thêm bài viết
            </button>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="container mx-auto px-4 mt-20">
          <div className="bg-orange-500 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn cần tư vấn thiết kế riêng?</h2>
                  <p className="text-orange-100 text-lg mb-10">
                      Gửi ngay kích thước phòng hoặc ý tưởng của bạn, đội ngũ Huy Hoàng sẽ hỗ trợ thiết kế 3D miễn phí và báo giá chi tiết tận xưởng.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a href="https://zalo.me/0865182562" target="_blank" className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
                          Nhắn Zalo Ngay
                      </a>
                      <a href="/du-toan" className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all">
                          Tự Thiết Kế 3D
                      </a>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
