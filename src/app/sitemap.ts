import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './tin-tuc/data'
import { PROJECTS_DATA } from './cong-trinh/data'

export default function sitemap(): MetadataRoute.Sitemap {
    const domain = 'https://huyhoanginterior.com';
    
    // Dynamic projects
    const projectUrls = Object.keys(PROJECTS_DATA).map(slug => ({
        url: `${domain}/cong-trinh/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic blogs
    const blogUrls = Object.keys(BLOG_POSTS).map(slug => ({
        url: `${domain}/tin-tuc/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {
            url: domain,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${domain}/cong-trinh`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${domain}/tin-tuc`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${domain}/du-toan`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...projectUrls,
        ...blogUrls,
    ]
}
