'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  review: string;
  rating: number;
  initials: string;
  bgColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Koffi Mensah',
    role: 'Directeur Général',
    company: 'Agro-Invest Togo',
    sector: 'Agropastoralisme',
    review: 'Une expertise rare au Togo. STEPHISA SARL nous accompagne sur nos projets agricoles avec un professionnalisme exemplaire, des rendements élevés et une transparence totale.',
    rating: 5,
    initials: 'KM',
    bgColor: 'bg-[#2D7D46]',
  },
  {
    id: '2',
    name: 'Awa Traoré',
    role: 'Investisseuse Immobilière',
    company: 'Diaspora France-Togo',
    sector: 'Immobilier & Titres Fonciers',
    review: 'Leur pôle juridique et BTP est d\'une grande rigueur pour la sécurisation foncière. J\'ai pu acquérir mon terrain à Lomé avec titre foncier inattaquable en toute sérénité.',
    rating: 5,
    initials: 'AT',
    bgColor: 'bg-[#0A5FA5]',
  },
  {
    id: '3',
    name: 'Jean-Claude Yao',
    role: 'Président',
    company: 'Coopérative Agricole de Kara',
    sector: 'Intrants & Fertilisants',
    review: 'Réactivité et qualité irréprochable des engrais certifiés. La livraison de nos intrants pour la campagne a été effectuée exactement dans les délais prévus.',
    rating: 5,
    initials: 'JY',
    bgColor: 'bg-amber-600',
  },
  {
    id: '4',
    name: 'Amadou Diallo',
    role: 'Directeur Logistique',
    company: 'Sael Export-Import',
    sector: 'Transport & Logistique',
    review: 'Un service de transport routier fiable, ponctuel et hautement sécurisé. Nos cargaisons volumineuses arrivent toujours intactes sur les axes de la sous-région.',
    rating: 5,
    initials: 'AD',
    bgColor: 'bg-slate-800',
  },
  {
    id: '5',
    name: 'Dr. Fousséni Bamazi',
    role: 'Consultant Agro-Alimentaire',
    company: 'Togo BioAgri',
    sector: 'Transformation & Export',
    review: 'STEPHISA SARL est le partenaire idéal pour les récoltes de soja et maïs bio de qualité exportable. Leur maîtrise des filières est un atout majeur au Togo.',
    rating: 5,
    initials: 'FB',
    bgColor: 'bg-emerald-700',
  },
  {
    id: '6',
    name: 'Sylvie Lawson',
    role: 'Promotrice Immobilière',
    company: 'Résidences Horizon Lomé',
    sector: 'Domaine Juridique & BTP',
    review: 'Un accompagnement juridique et administratif sans aucune faille pour la création de nos structures et la rédaction des actes baux commerciaux.',
    rating: 5,
    initials: 'SL',
    bgColor: 'bg-indigo-700',
  },
];

export default function Testimonials() {
  // Double list for smooth infinite scrolling loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header (Tagline removed as requested) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Ce Que Nos Partenaires Disent
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl mx-auto font-light">
            Découvrez les retours d&apos;expérience de nos investisseurs, coopératives agricoles et clients institutionnels à travers le Togo et l&apos;international.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Track */}
      <div className="relative w-full">
        {/* Left & Right Subtle Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee gap-6 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[280px] sm:w-[360px] bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between group relative overflow-hidden shrink-0"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#2D7D46] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <Quote className="w-8 h-8 text-[#F89B1C]/30 group-hover:text-[#F89B1C] transition-colors" />
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F89B1C] text-[#F89B1C]" />
                    ))}
                  </div>
                </div>

                {/* Sector Badge */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7D46] bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    {item.sector}
                  </span>
                </div>

                {/* Review Paragraph */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light italic">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.bgColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7D46] shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role} &bull; <span className="text-slate-700">{item.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
