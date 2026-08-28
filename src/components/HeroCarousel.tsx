'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  goldAccent: string;
  description: string;
  image: string;
  primaryCtaLink: string;
  primaryCtaText: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'L\'EXCELLENCE DU BÂTIMENT & FONCIER',
    goldAccent: 'TERRAINS TITRÉS & CONSTRUCTION BTP',
    description: 'Spécialiste de la sécurisation foncière inattaquable et des travaux de construction BTP au Togo. Terrains avec titres fonciers garantis sans aucun litige à Lomé.',
    image: '/assets/img/btp.png',
    primaryCtaLink: '/services#btp',
    primaryCtaText: 'Voir nos Offres Immobilières',
  },
  {
    id: '2',
    title: 'L\'EXCELLENCE AGROPASTORALE',
    goldAccent: 'AGRICULTURE & ÉLEVAGE À GRANDE ÉCHELLE',
    description: 'Exploitations agricoles modernes, production végétale (Maïs, Soja, Anacarde, Cacao) et distribution d\'intrants certifiés pour la souveraineté alimentaire au Togo.',
    image: '/assets/img/agriculture.png',
    primaryCtaLink: '/services#agriculture',
    primaryCtaText: 'Découvrir le Pôle Agricole',
  },
  {
    id: '3',
    title: 'L\'EXCELLENCE LOGISTIQUE',
    goldAccent: 'TRANSPORT ROUTIER & ACHEMINEMENT',
    description: 'Flotte routière performante déployée pour le transport sécurisé et ponctuel de marchandises agricoles volumineuses et de matériaux de construction.',
    image: '/assets/img/transport.png',
    primaryCtaLink: '/services#transport',
    primaryCtaText: 'Réserver un Camion',
  },
  {
    id: '4',
    title: 'L\'EXCELLENCE DES PLACEMENTS',
    goldAccent: 'INVESTISSEMENT & PARTENARIATS STRATÉGIQUES',
    description: 'Opportunités d\'investissements structurés à forte rentabilité adossés à des actifs réels au Togo, pour les investisseurs locaux et la diaspora.',
    image: '/assets/img/investissement.png',
    primaryCtaLink: '/services#investissement',
    primaryCtaText: 'Devenir Investisseur',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [typedText, setTypedText] = useState('');

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? SLIDES.length - 1 : prev - 1));
  }, []);

  const activeSlide = SLIDES[currentSlide];

  // Continuous auto-play slider loop (4 seconds per slide)
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Typewriter effect for gold accent text
  useEffect(() => {
    setTypedText('');
    const fullText = activeSlide.goldAccent;
    let index = 0;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentSlide, activeSlide.goldAccent]);

  return (
    <section 
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-28 pb-16 text-center"
    >
      {/* Background Image Carousel Slider */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover opacity-30 scale-105 transition-transform duration-[8000ms] ease-out"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        
        {/* Main Title */}
        <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-wider leading-tight text-white uppercase drop-shadow-md">
          {activeSlide.title}
        </h1>

        {/* Auto-written Subtitle (Typewriter Effect) */}
        <div className="font-serif text-base sm:text-2xl lg:text-3xl font-extrabold text-[#F89B1C] tracking-wide uppercase min-h-[58px] sm:min-h-[44px] flex items-center justify-center">
          <span>{typedText}</span>
          <span className="animate-pulse text-[#F89B1C] font-mono ml-0.5 font-bold">|</span>
        </div>

        {/* Description Paragraph */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
          {activeSlide.description}
        </p>

        {/* Centered CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg transition flex items-center justify-center gap-2 group"
          >
            <span>Contactez-nous</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={activeSlide.primaryCtaLink}
            className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-full border border-slate-700 backdrop-blur-md transition text-center"
          >
            {activeSlide.primaryCtaText}
          </Link>
        </div>
      </div>

      {/* Navigation Left/Right Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Slide précédent"
        className="absolute left-4 z-30 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-[#2D7D46] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide suivant"
        className="absolute right-4 z-30 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-[#2D7D46] text-white backdrop-blur-md border border-white/10 flex items-center justify-center transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-[#F89B1C]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
