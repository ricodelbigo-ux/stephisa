'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    category: 'agriculture',
    categoryLabel: 'Agriculture & Élevage',
    title: 'Exploitation Agropastorale & Récoltes',
    image: '/assets/img/agriculture.png',
    description: 'Champs de maïs et soja à haut rendement et élevage moderne.',
  },
  {
    id: '2',
    category: 'btp',
    categoryLabel: 'BTP & Immobilier',
    title: 'Chantiers de Construction & Terrains Titrés',
    image: '/assets/img/btp.png',
    description: 'Réalisations immobilières et viabilisation de parcelles sécurisées.',
  },
  {
    id: '3',
    category: 'transport',
    categoryLabel: 'Transport & Logistique',
    title: 'Flotte Routière & Logistique',
    image: '/assets/img/transport.png',
    description: 'Acheminement sécurisé de marchandises et matériaux au Togo.',
  },
  {
    id: '4',
    category: 'investissement',
    categoryLabel: 'Investissement & Partenariats',
    title: 'Projets d\'Investissement Structurés',
    image: '/assets/img/investissement.png',
    description: 'Partenariats d\'affaires et placements agropastoraux et fonciers.',
  },
  {
    id: '5',
    category: 'equipe',
    categoryLabel: 'Vie de l\'Équipe',
    title: 'Nos Experts sur le Terrain',
    image: '/assets/img/notre-groupe.png',
    description: 'Équipe pluridisciplinaire au bureau et sur les chantiers.',
  },
  {
    id: '6',
    category: 'evenements',
    categoryLabel: 'Événements',
    title: 'Moment Forts & Lancement de Projets',
    image: '/assets/img/heros.png',
    description: 'Rencontres partenariales et cérémonies d\'inauguration.',
  },
];

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);

  useEffect(() => {
    async function fetchRealisations() {
      try {
        const res = await fetch('/api/realisations');
        const json = await res.json();
        if (res.ok && json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
          const apiItems: GalleryItem[] = json.data.map((r: any) => ({
            id: `api-${r.id}`,
            category: r.category ? r.category.toLowerCase() : 'all',
            categoryLabel: r.category || 'Réalisation',
            title: r.title,
            image: r.image || '/assets/img/btp.png',
            description: r.description || r.title,
          }));
          setItems([...apiItems, ...GALLERY_ITEMS]);
        }
      } catch {
        // Fallback to static gallery
      }
    }
    fetchRealisations();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter((item) => item.category.includes(activeCategory) || activeCategory.includes(item.category));

  return (
    <main className="min-h-screen pt-28 bg-slate-50">
      {/* Header Banner with Background Image */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/btp.png"
            alt="Nos Réalisations STEPHISA"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-black tracking-tight">
            Nos Réalisations sur le Terrain
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Découvrez en images nos accomplissements dans l&apos;agriculture, le BTP, le transport, l&apos;investissement et la vie de notre groupe au Togo.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'all'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Toutes les Réalisations
          </button>
          <button
            onClick={() => setActiveCategory('agriculture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'agriculture'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Agriculture
          </button>
          <button
            onClick={() => setActiveCategory('btp')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'btp'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            BTP & Immobilier
          </button>
          <button
            onClick={() => setActiveCategory('transport')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'transport'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Transport & Logistique
          </button>
          <button
            onClick={() => setActiveCategory('investissement')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'investissement'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Investissement
          </button>
          <button
            onClick={() => setActiveCategory('equipe')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeCategory === 'equipe'
                ? 'bg-[#2D7D46] text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Vie d&apos;Équipe
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition duration-300 group cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-slate-900">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#2D7D46] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {item.categoryLabel}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#2D7D46] transition">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl space-y-4 p-4 border border-slate-100"
            >
              <div className="relative h-96 w-full rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="px-4 pb-2 space-y-1">
                <div className="text-xs font-bold text-[#2D7D46] uppercase">
                  {selectedImage.categoryLabel}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedImage.title}</h3>
                <p className="text-slate-600 text-sm">{selectedImage.description}</p>
              </div>
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
