'use client';

import React from 'react';
import { Layers, ShieldCheck, Headphones, MapPin } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    { number: '05', label: 'Pôles d\'Expertise', icon: Layers },
    { number: '100%', label: 'Conformité & Qualité', icon: ShieldCheck },
    { number: '24/7', label: 'Disponibilité Client', icon: Headphones },
    { number: 'Lomé', label: 'Siège Social Togo', icon: MapPin },
  ];

  return (
    <div className="bg-slate-900 text-white py-8 border-y border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#F89B1C] shrink-0 border border-white/10">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{stat.number}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
