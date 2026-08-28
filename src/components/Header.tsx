'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar Dark Strip */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-bold text-[#F89B1C] shrink-0">STEPHISA SARL</span>
            <span className="text-slate-500 shrink-0">•</span>
            <span className="text-slate-300 text-[11px] sm:text-xs truncate">
              Excellence Agricole, Immobilière & Multiservices à Lomé, Togo
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 shrink-0">
            <a href={`tel:${CONFIG.CONTACT.PHONE_PRIMARY}`} className="flex items-center gap-1.5 hover:text-white transition font-medium">
              <Phone className="w-3.5 h-3.5 text-[#F89B1C]" />
              {CONFIG.CONTACT.PHONE_PRIMARY}
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-medium">Devis sous 24h</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white shadow-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white p-1 rounded-lg border border-slate-100 group-hover:scale-105 transition duration-300">
                <Image
                  src="/assets/img/logo stephisa.png"
                  alt="STEPHISA SARL Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-wide text-slate-900 group-hover:text-[#2D7D46] transition">
                  STEPHISA <span className="text-[#F89B1C]">SARL</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                  Lomé • Togo
                </span>
              </div>
            </Link>

            {/* Desktop Links (Centered Layout) */}
            <div className="hidden lg:flex items-center space-x-1 font-medium text-sm">
              <Link 
                href="/" 
                className={`relative px-4 py-2.5 transition ${
                  isActive('/') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                }`}
              >
                <span>Accueil</span>
                {isActive('/') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                )}
              </Link>

              {/* Dropdown 5 Pôles */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href="/services"
                  className={`relative px-4 py-2.5 flex items-center gap-1 transition ${
                    pathname.startsWith('/services') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                  }`}
                >
                  <span>Activités</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  {pathname.startsWith('/services') && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                  )}
                </Link>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-2 space-y-1">
                      {CONFIG.POLES.map((pole) => (
                        <Link
                          key={pole.id}
                          href={`/services#${pole.id}`}
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition group"
                        >
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover:text-[#2D7D46]">
                              {pole.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/produits" 
                className={`relative px-4 py-2.5 transition ${
                  isActive('/produits') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                }`}
              >
                <span>Produits</span>
                {isActive('/produits') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                )}
              </Link>

              <Link 
                href="/realisations" 
                className={`relative px-4 py-2.5 transition ${
                  isActive('/realisations') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                }`}
              >
                <span>Réalisations</span>
                {isActive('/realisations') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                )}
              </Link>

              <Link 
                href="/societe" 
                className={`relative px-4 py-2.5 transition ${
                  isActive('/societe') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                }`}
              >
                <span>À Propos</span>
                {isActive('/societe') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                )}
              </Link>

              <Link 
                href="/contact" 
                className={`relative px-4 py-2.5 transition ${
                  isActive('/contact') ? 'text-[#2D7D46] font-bold' : 'text-slate-700 hover:text-[#2D7D46]'
                }`}
              >
                <span>Contact & Devis</span>
                {isActive('/contact') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2D7D46] rounded-full" />
                )}
              </Link>
            </div>

            {/* Green Contact Pill Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className="bg-[#2D7D46] hover:bg-[#1E562F] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Contactez-nous</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Accueil
            </Link>
            <div className="space-y-1 pl-3">
              {CONFIG.POLES.map((pole) => (
                <Link
                  key={pole.id}
                  href={`/services#${pole.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#2D7D46]"
                >
                  {pole.title}
                </Link>
              ))}
            </div>
            <Link
              href="/produits"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Produits
            </Link>
            <Link
              href="/realisations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Réalisations
            </Link>
            <Link
              href="/societe"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              À Propos
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-50"
            >
              Contact & Devis
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#2D7D46] text-white font-bold py-2.5 rounded-full shadow-md"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
