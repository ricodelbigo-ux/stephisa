'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'intrants' | 'recoltes' | 'materiel';
  categoryLabel: string;
  description: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'anacarde',
    name: 'Anacarde (Noix de Cajou)',
    category: 'recoltes',
    categoryLabel: 'Exportation & Récoltes',
    description: 'Noix de qualité supérieure, triées et prêtes pour l\'exportation et la transformation.',
    image: '/assets/img/categorisé/anacarde .jpeg',
  },
  {
    id: 'cacao',
    name: 'Fèves de Cacao',
    category: 'recoltes',
    categoryLabel: 'Exportation & Récoltes',
    description: 'Cacao fermenté et séché, riche en arômes pour l\'industrie chocolatière.',
    image: '/assets/img/categorisé/cacao.jpeg',
  },
  {
    id: 'cafe',
    name: 'Café Robusta',
    category: 'recoltes',
    categoryLabel: 'Exportation & Récoltes',
    description: 'Grains de café soigneusement sélectionnés pour leur goût intense et corsé.',
    image: '/assets/img/categorisé/café.jpeg',
  },
  {
    id: 'sesame',
    name: 'Graines de Sésame',
    category: 'recoltes',
    categoryLabel: 'Graines & Récoltes',
    description: 'Sésame blanc purifié, idéal pour la confiserie, la boulangerie et l\'extraction d\'huile.',
    image: '/assets/img/categorisé/productions  de sésame.jpeg',
  },
  {
    id: 'mais-graines',
    name: 'Maïs Grain Blanc',
    category: 'recoltes',
    categoryLabel: 'Céréales',
    description: 'Grains de maïs de haute qualité, séchés et triés pour l\'alimentation et la transformation.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'soja-bio',
    name: 'Soja Biologique',
    category: 'recoltes',
    categoryLabel: 'Légumineuses',
    description: 'Graines de soja riches en protéines, cultivées selon des normes durables sans pesticides.',
    image: '/assets/img/categorisé/soja2.jpeg',
  },
  {
    id: 'fertilisant-npk',
    name: 'Engrais Complexe NPK & Urée',
    category: 'intrants',
    categoryLabel: 'Intrants Agricoles',
    description: 'Solutions de fertilisation certifiées (sacs de NPK & Urée) pour maximiser la fertilité des sols.',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'katana-50-ec',
    name: 'Produits Phyto & Insecticides',
    category: 'intrants',
    categoryLabel: 'Intrants Agricoles',
    description: 'Protection maximale des cultures contre les chenilles, pucerons et ravageurs.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'pulverisateur',
    name: 'Pulvérisateur Agricole',
    category: 'materiel',
    categoryLabel: 'Matériel',
    description: 'Équipement ergonomique de pulvérisation à dos pour entretien des plantations.',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop',
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-28 bg-slate-50">
      {/* Header Banner with Background Image */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/agriculture.png"
            alt="Produits Agricoles & Intrants STEPHISA"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight">
            Produits Agricoles & Intrants
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Retrouvez nos intrants certifiés, récoltes vivrières et équipements agricoles de première qualité à Lomé.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Clean Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#2D7D46] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedCategory('intrants')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'intrants'
                  ? 'bg-[#2D7D46] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Intrants
            </button>
            <button
              onClick={() => setSelectedCategory('recoltes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'recoltes'
                  ? 'bg-[#2D7D46] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Récoltes
            </button>
            <button
              onClick={() => setSelectedCategory('materiel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === 'materiel'
                  ? 'bg-[#2D7D46] text-white'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Matériel
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-white border border-slate-200 text-slate-800 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#2D7D46]"
            />
          </div>
        </div>

        {/* Clean Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
            >
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#2D7D46]">
                    {product.categoryLabel}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="w-full bg-slate-900 hover:bg-[#2D7D46] text-white text-xs font-bold py-2.5 rounded-xl transition text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Commander</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
