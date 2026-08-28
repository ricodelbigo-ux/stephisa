'use client';

import React from 'react';
import { CONFIG } from '@/lib/config';
import PoleCard from './PoleCard';

export default function PolesGrid() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header (Tagline removed as requested) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-100">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nos Secteurs d&apos;Activités
            </h2>
          </div>
          <p className="text-slate-500 text-xs max-w-md leading-relaxed">
            Une expertise sectorielle spécialisée pour répondre précisément aux besoins agricoles, immobiliers, logistiques, financiers et juridiques au Togo.
          </p>
        </div>

        {/* 5 Poles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {CONFIG.POLES.map((pole, idx) => (
            <PoleCard key={pole.id} pole={pole} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
