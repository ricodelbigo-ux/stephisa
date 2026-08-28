'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sprout, Building2, Truck, TrendingUp, Scale } from 'lucide-react';

interface Pole {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  image: string;
  icon: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sprout': return Sprout;
    case 'Building2': return Building2;
    case 'Truck': return Truck;
    case 'TrendingUp': return TrendingUp;
    case 'Scale': return Scale;
    default: return Sprout;
  }
};

export default function PoleCard({ pole, index }: { pole: Pole; index: number }) {
  const IconComponent = getIcon(pole.icon);

  return (
    <Link
      href={`/services#${pole.id}`}
      className="group relative block h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/60 transition-all duration-500"
    >
      {/* Background Image */}
      <Image
        src={pole.image}
        alt={pole.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 via-55% to-slate-950/20 group-hover:via-slate-950/75 transition-all duration-500" />


      {/* Bottom Text Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-6 space-y-3 z-10 text-white">
        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F89B1C] transition-colors duration-300">
          {pole.title}
        </h3>

        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed line-clamp-2 font-light">
          {pole.shortDesc}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#F89B1C] group-hover:text-white transition-colors duration-300">
          <span className="uppercase tracking-wider">En savoir plus</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

