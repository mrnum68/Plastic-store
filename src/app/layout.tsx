import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyActionBar from "@/components/layout/StickyActionBar";
import FloatingZalo from "@/components/layout/FloatingZalo";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Xưởng Nội Thất Nhựa Huy Hoàng Đà Nẵng - Giá Gốc Tại Xưởng - Bảo Hành 10 Năm",
  description: "Xưởng thi công nội thất nhựa cao cấp Ecoplast / Penco / Casawood / Golden Plast tại Đà Nẵng. Tủ bếp nhựa, tủ quần áo, giường nhựa chống nước, chống mối mọt 100%. Nhận làm theo yêu cầu với giá gốc.",
  keywords: "tủ bếp nhựa đà nẵng, nội thất nhựa huy hoàng, tủ quần áo nhựa đà nẵng, thi công nội thất nhựa, xưởng nội thất nhựa, nhựa vincoplast đà nẵng, nhựa ecoplast đà nẵng",
  openGraph: {
    title: "Xưởng Nội Thất Nhựa Huy Hoàng Đà Nẵng - Giá Gốc Tại Xưởng",
    description: "Xưởng thi công nội thất nhựa cao cấp Ecoplast / Penco / Casawood / Golden Plast tại Đà Nẵng. Chống nước, chống mối mọt 100%.",
    url: "https://noithatnhuatst.com",
    siteName: "Nội Thất Nhựa Huy Hoàng",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://noithatnhuatst.com",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col pt-16`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyActionBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Nội Thất Nhựa Huy Hoàng",
              "image": "https://noithatnhuatst.com/logo-full.png",
              "@id": "https://noithatnhuatst.com",
              "url": "https://noithatnhuatst.com",
              "telephone": "+84865182562",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "400 Nguyễn Lương Bằng, Quận Liên Chiểu",
                "addressLocality": "Đà Nẵng",
                "addressRegion": "Đà Nẵng",
                "postalCode": "550000",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 16.075730,
                "longitude": 108.138245
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "08:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61578414371387",
                "https://maps.google.com/?q=400+Nguyễn+Lương+Bằng,+Liên+Chiểu,+Đà+Nẵng"
              ],
              "priceRange": "$$"
            })
          }}
        />
        <FloatingZalo />

        {/* 
          Tracking Scripts - BẬT LÊN KHI CÓ MÃ THẬT
          Thay G-XXXXXXXXXX bằng mã Google Analytics của bạn
          Thay XXXXXXXXXXXXXXX bằng mã Facebook Pixel của bạn
          Sau đó xóa comment block này đi.
        */}
        {/* <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script> */}
      </body>
    </html>
  );
}
