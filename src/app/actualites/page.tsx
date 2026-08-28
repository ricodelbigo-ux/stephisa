'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { CONFIG } from '@/lib/config';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

const STATIC_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Lancement de la campagne de distribution d\'intrants certifiés 2026',
    excerpt: 'STEPHISA SARL renforce son soutien aux producteurs locaux avec des fertilisants et semences à haut rendement.',
    date: '20 Août 2026',
    author: 'Direction Communication',
    category: 'Agriculture',
    image: '/assets/img/culture pret au arché.png',
  },
  {
    id: '2',
    title: 'Acquisition et viabilisation de nouveaux terrains à Adidogomé Wonyomé',
    excerpt: 'Nouveau lotissement sécurisé avec titres fonciers garantis disponibles pour l\'investissement immobilier.',
    date: '12 Août 2026',
    author: 'Pôle Immobilier',
    category: 'Immobilier & BTP',
    image: '/assets/img/btp.png',
  },
  {
    id: '3',
    title: 'Ouverture du Pôle Investissement & Partenariats de STEPHISA SARL',
    excerpt: 'Une nouvelle opportunité pour les investisseurs locaux et de la diaspora togolaise de co-investir dans des projets rentables.',
    date: '05 Août 2026',
    author: 'Direction Générale',
    category: 'Investissement',
    image: '/assets/img/investissement.png',
  },
];

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>(STATIC_ARTICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        const json = await res.json();
        if (res.ok && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          const apiArticles: Article[] = json.data.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            excerpt: item.excerpt || item.short_description || item.title,
            date: item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Récemment',
            author: item.author || 'STEPHISA SARL',
            category: item.category || 'Actualité',
            image: item.image || '/assets/img/heros.png',
          }));
          setArticles(apiArticles);
        }
      } catch {
        // Silent fallback to STATIC_ARTICLES if error
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen pt-28 bg-slate-50">
      {/* Header Banner with Background Image */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/heros.png"
            alt="Actualités STEPHISA SARL"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-black tracking-tight">
            Actualités STEPHISA SARL
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Restez informé de nos derniers projets, lancements de campagnes agricoles et actualités foncières au Togo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">Chargement des actualités...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/60 group transition-all duration-500 flex flex-col justify-between"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 via-50% to-slate-950/20 group-hover:via-slate-950/80 transition-all duration-500" />

                {/* Top Category Badge */}
                <div className="relative z-10 p-4">
                  <span className="bg-[#2D7D46] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md inline-block">
                    {article.category}
                  </span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="relative z-10 p-6 space-y-3 text-white">
                  <div className="flex items-center gap-4 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#F89B1C]" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#2D7D46]" /> {article.author}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-white text-lg group-hover:text-[#F89B1C] transition leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-light">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/contact?subject=${encodeURIComponent('Information sur article: ' + article.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F89B1C] group-hover:text-white transition"
                    >
                      <span className="uppercase tracking-wider">En savoir plus</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
