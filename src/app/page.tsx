import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import StatsBar from '@/components/StatsBar';
import PolesGrid from '@/components/PolesGrid';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Golden Gate Style Hero Carousel */}
      <HeroCarousel />

      {/* Stats Bar */}
      <StatsBar />

      {/* Presentation Section - Clean & Open */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Une Synergie d&apos;Expertise au Service du Togo
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Nés de la terre avec notre expertise fondamentale en <strong>agropastoralisme</strong>, nous avons développé des pôles d&apos;excellence en <strong>immobilier & BTP</strong>, en <strong>transport routier</strong>, en <strong>investissement</strong> et dans le <strong>domaine juridique</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Shield className="w-5 h-5 text-[#2D7D46] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Titres Fonciers Vrais</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Terrains vérifiés et garantis sans aucun litige.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Award className="w-5 h-5 text-[#F89B1C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Entreprise Agréée CFE</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Structures conformes aux lois togolaises.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/societe"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#2D7D46] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition duration-300 shadow-sm"
                >
                  <span>Découvrir Notre Histoire & Vision</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image
                  src="/assets/img/Angagemen de stephisa 1.png"
                  alt="Engagement STEPHISA SARL"
                  width={600}
                  height={450}
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5 Poles Grid */}
      <PolesGrid />

      {/* Ce Que Nos Partenaires Disent */}
      <Testimonials />

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold">
            Prêt à Réaliser Votre Projet avec STEPHISA SARL ?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Que vous ayez un besoin agricole, immobilier, logistique, d&apos;investissement ou juridique, nos experts sont à votre entière disposition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-lg transition"
            >
              Contactez nos Chargés d&apos;Affaires
            </Link>
            <a
              href="tel:+22891803546"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-8 py-3.5 rounded-xl border border-white/20 transition"
            >
              Appeler le +228 91 80 35 46
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
