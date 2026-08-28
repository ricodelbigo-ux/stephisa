'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CONFIG } from '@/lib/config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl w-fit">
              <Image
                src="/assets/img/logo stephisa.png"
                alt="STEPHISA Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-extrabold text-slate-900 text-lg">
                STEPHISA <span className="text-[#F89B1C]">SARL</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Une entreprise multisectorielle engagée pour le développement durable du Togo et de la sous-région. 
              Nous excellons dans l&apos;agriculture, l&apos;immobilier, le transport, l&apos;investissement et les services juridiques.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F89B1C]" /> Entreprise Agréée
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D7D46]" /> Titres Fonciers Garantis
              </span>
            </div>
          </div>

          {/* Column 2: 5 Pôles d'Activités */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D7D46]"></span>
              Nos Secteurs d&apos;Activités
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CONFIG.POLES.map((pole) => (
                <li key={pole.id}>
                  <Link 
                    href={`/services#${pole.id}`}
                    className="hover:text-[#F89B1C] transition flex items-center gap-2 group text-slate-400 hover:translate-x-1 duration-200"
                  >
                    <span className="text-[#2D7D46] group-hover:text-[#F89B1C]">›</span>
                    {pole.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F89B1C]"></span>
              Coordonnées & Siège
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F89B1C] shrink-0 mt-1" />
                <span>{CONFIG.CONTACT.ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F89B1C] shrink-0" />
                <a href={`tel:${CONFIG.CONTACT.PHONE_PRIMARY}`} className="hover:text-white transition">
                  {CONFIG.CONTACT.PHONE_PRIMARY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F89B1C] shrink-0" />
                <a href={`tel:${CONFIG.CONTACT.PHONE_SECONDARY}`} className="hover:text-white transition">
                  {CONFIG.CONTACT.PHONE_SECONDARY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F89B1C] shrink-0" />
                <a href={`mailto:${CONFIG.CONTACT.EMAIL}`} className="hover:text-white transition">
                  {CONFIG.CONTACT.EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0A5FA5]"></span>
              Restez Informé
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Abonnez-vous à notre newsletter pour recevoir nos opportunités d&apos;investissement et produits agricoles.
            </p>

            {status === 'success' ? (
              <div className="bg-[#2D7D46]/20 border border-[#2D7D46] text-[#2D7D46] p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Merci ! Vous êtes bien inscrit.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    required
                    className="w-full bg-slate-900 text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-[#2D7D46] transition"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-1 top-1 bottom-1 bg-[#2D7D46] hover:bg-[#1E562F] text-white px-3.5 rounded-lg flex items-center justify-center transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-xs text-red-400">Erreur lors de l&apos;inscription. Réessayez.</p>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} STEPHISA SARL. Tous droits réservés. - Conçu avec excellence par SMARTFLOW</p>
          <div className="flex items-center space-x-3">
            <span className="text-slate-400">Agriculture</span> •
            <span className="text-slate-400">BTP & Immo</span> •
            <span className="text-slate-400">Transport</span> •
            <span className="text-slate-400">Investissement</span> •
            <span className="text-slate-400">Juridique</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
