import { BLOG_POSTS } from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, User, Tag, MessageCircle, Phone, ArrowLeft, Send } from "lucide-react";
import { PROJECTS_DATA } from "@/app/cong-trinh/data";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = BLOG_POSTS[params.slug];
  
  if (!post) {
    return { title: 'Bài viết không tồn tại' };
  }

  return {
    title: `${post.title} - Nội Thất Nhựa Huy Hoàng Đà Nẵng`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = BLOG_POSTS[params.slug];

  if (!post) {
    notFound();
  }

  const otherPosts = Object.values(BLOG_POSTS)
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  const relatedProjects = Object.values(PROJECTS_DATA).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-orange-500">Trang chủ</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href="/tin-tuc" className="hover:text-orange-500">Tin tức</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-slate-900 font-bold line-clamp-1">{post.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white rounded-[2rem] p-6 md:p-12 shadow-sm order-1">
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <Calendar size={18} className="text-orange-500" />
                  <span>Cập nhật ngày {post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={18} className="text-orange-500" />
                  <span>Bởi {post.author}</span>
                </div>
              </div>
            </header>

            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
                <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Body */}
            <div 
              className="prose prose-lg max-w-none text-slate-700 leading-relaxed
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-orange-500 prose-h2:pl-4
                prose-h3:text-2xl prose-h3:mt-8
                prose-p:mb-6
                prose-ul:my-6 prose-li:mb-2
                prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:rounded-2xl prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-slate-700
                prose-strong:text-orange-600
                prose-a:text-orange-500 hover:prose-a:underline
                prose-img:rounded-3xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="mt-16 pt-10 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Tag size={18} className="text-orange-500" />
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-lg">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 order-2">
            {/* CTA Box */}
            <div className="bg-orange-500 rounded-[2rem] p-8 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden sticky top-24">
                <div className="relative z-10">
                    <h3 className="font-bold text-2xl mb-4 leading-tight">Bạn yêu thích không gian này?</h3>
                    <p className="text-orange-100 mb-8">
                        Dự toán giá thi công nhựa Ecoplast thực tế chỉ trong 15 phút với tool 3D của chúng tôi.
                    </p>
                    <div className="space-y-4">
                        <Link href="/du-toan" className="flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                             Thử Tool Thiết Kế Ngay
                        </Link>
                        <a href="https://zalo.me/0865182562" target="_blank" className="flex items-center justify-center gap-2 border-2 border-white/40 hover:bg-white/10 px-6 py-4 rounded-xl font-bold transition-all">
                            <MessageCircle size={20} /> Tư Vấn Qua Zalo
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Bài viết gần đây</h3>
                <div className="space-y-6">
                    {otherPosts.map(p => (
                        <Link href={`/tin-tuc/${p.id}`} key={p.id} className="flex gap-4 group">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100">
                             <Image src={p.image} alt="thumb" fill className="object-cover group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex flex-col justify-center">
                             <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-500 line-clamp-2 transition-colors">{p.title}</h4>
                             <p className="text-xs text-slate-500 mt-1">{p.date}</p>
                          </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Công trình thực tế</h3>
                <div className="grid grid-cols-1 gap-4">
                    {relatedProjects.map(proj => (
                         <Link href={`/cong-trinh/${proj.id}`} key={proj.id} className="relative aspect-video rounded-2xl overflow-hidden group">
                             <Image src={proj.mainImage} alt={proj.title} fill className="object-cover transition-transform group-hover:scale-110" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                             <div className="absolute bottom-3 left-3 right-3">
                                 <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">{proj.location}</p>
                                 <h4 className="text-xs font-bold text-white line-clamp-1">{proj.title}</h4>
                             </div>
                         </Link>
                    ))}
                </div>
                <Link href="/cong-trinh" className="mt-6 flex items-center justify-center gap-2 text-orange-600 font-bold text-sm hover:underline">
                    Xem tất cả công trình <ChevronRight size={16} />
                </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
