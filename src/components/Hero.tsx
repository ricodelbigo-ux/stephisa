'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/heros.png"
          alt="STEPHISA SARL Hero Background"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D7D46]/20 border border-[#2D7D46]/40 text-[#F89B1C] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Groupe Multisectoriel au Togo & en Afrique
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              L&apos;Excellence au Service du <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D7D46] via-[#F89B1C] to-[#0A5FA5]">
                Développement Durable
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              <strong>STEPHISA SARL</strong> est un écosystème de solutions concrètes pour le Togo : 
              production agropastorale, projets BTP & immobilier sécurisé, transport de marchandises, opportunités d&apos;investissement et accompagnement juridique.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/services"
                className="w-full sm:w-auto bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#2D7D46]/30 hover:shadow-xl transition duration-300 flex items-center justify-center gap-2 group"
              >
                Découvrir Nos 5 Pôles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 backdrop-blur-sm transition text-center"
              >
                Demander un Devis
              </Link>
            </div>

            {/* Badges bar */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F89B1C]" />
                <span>Titres Fonciers Garantis</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2D7D46]" />
                <span>Entreprise Agréée CFE</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-[#0A5FA5]" />
                <span>5 Pôles d&apos;Expertise</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                <Image
                  src="/assets/img/notre-groupe.png"
                  alt="Groupe STEPHISA SARL"
                  width={600}
                  height={500}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800">
                  <div className="text-xs font-bold text-[#F89B1C] uppercase tracking-wider">Vision STEPHISA</div>
                  <div className="text-sm font-semibold text-white mt-1">Bâtir l&apos;Afrique de demain de la terre à la construction</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
