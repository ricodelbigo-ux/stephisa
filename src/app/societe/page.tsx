import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, ShieldCheck, Users, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 bg-slate-50">
      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/heros.png"
            alt="Société STEPHISA SARL"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl font-black tracking-tight">
            Société STEPHISA SARL
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base font-light">
            Une entreprise togolaise multisectorielle guidée par l&apos;excellence, l&apos;intégrité et la passion du développement local.
          </p>
        </div>
      </section>

      {/* History & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#2D7D46]/10 text-[#2D7D46]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Une Vision d&apos;Avenir Fondée au Togo</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              En 2018, <strong>STEPHISA SARL</strong> est née d&apos;une ambition claire : valoriser le potentiel agropastoral exceptionnel du Togo tout en répondant aux besoins structurants en infrastructures, transport, investissements et conformité juridique.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Parti d&apos;un noyau d&apos;experts engagés, notre groupe s&apos;est rapidement affirmé comme un acteur clé de l&apos;économie nationale, avec plus de 150 projets concrétisés avec succès.
            </p>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <Image
              src="/assets/img/Angagemen de stephisa 2.png"
              alt="Vision STEPHISA"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">Nos Valeurs Cardinales</h2>
          <p className="text-slate-600 text-sm">Ce qui guide chacune de nos actions et décisions au quotidien.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D7D46]/10 text-[#2D7D46] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Intégrité & Transparence</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Titres fonciers vérifiés sans litige et relations partenariales basées sur la confiance absolue.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F89B1C]/10 text-[#F89B1C] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Excellence Métier</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Exigence de qualité rigoureuse, de la semence agricole aux finitions de chantiers BTP.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A5FA5]/10 text-[#0A5FA5] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Impact Économique Local</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Création d&apos;emplois durable et développement de solutions concrètes pour les communautés au Togo.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
