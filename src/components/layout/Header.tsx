"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, Calculator, X } from "lucide-react";

const navLinks = [
  { href: "/#nhu-cau-thuc", label: "Nhu Cầu Thực" },
  { href: "/#bang-gia", label: "Bảng Giá Xưởng" },
  { href: "/#chat-lieu", label: "Chất Liệu" },
  { href: "/#cong-trinh", label: "Công Trình Thực Tế" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src="/logo-icon.png" alt="Nội Thất Nhựa Huy Hoàng Logo" className="w-16 h-16 object-contain mix-blend-multiply" />
          <span className="font-bold text-2xl text-slate-800 hidden sm:block">
            Nội Thất Nhựa <span className="text-orange-500">Huy Hoàng</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-orange-500 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/du-toan" className="flex items-center gap-1 bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-full font-semibold transition-colors">
            <Calculator size={16} /> Dự Toán Giá
          </Link>
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="tel:0865182562"
            className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-medium transition-colors"
          >
            <Phone size={18} />
            <span>086.518.2562</span>
          </a>
          <button
            className="md:hidden text-slate-600 hover:text-orange-500 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-slate-700 font-medium hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/du-toan"
            onClick={() => setOpen(false)}
            className="py-3 px-4 rounded-xl font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 flex items-center gap-2 transition-colors"
          >
            <Calculator size={18} /> Dự Toán Giá
          </Link>
          <hr className="my-2 border-slate-100" />
          <a
            href="tel:0865182562"
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-colors"
          >
            <Phone size={18} /> Gọi 086.518.2562
          </a>
        </nav>
      </div>
    </header>
  );
}
