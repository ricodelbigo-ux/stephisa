import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONFIG } from '@/lib/config';
import { 
  Sprout, 
  Wheat, 
  Tractor, 
  Factory, 
  Building2, 
  MapPin, 
  HardHat, 
  Home, 
  Truck, 
  PackageCheck, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  Handshake, 
  Globe2, 
  Scale, 
  FileText, 
  Briefcase, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

interface FeatureItem {
  label: string;
  sublabel?: string;
  desc: string;
  icon: any;
}

interface ServiceSectionData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  description: string;
  impactText: string;
  image: string;
  features: FeatureItem[];
  ctaText: string;
}

const POLES_DATA: ServiceSectionData[] = [
  {
    id: 'agriculture',
    number: '01',
    title: 'Agriculture & Agropastoralisme',
    subtitle: 'Souveraineté Alimentaire & Production à Grande Échelle',
    tagline: 'CŒUR DE MÉTIER & PRODUCTION VÉGÉTALE',
    accentColor: '#2D7D46',
    badgeBg: 'bg-[#2D7D46]/10 text-[#2D7D46]',
    description: 'STEPHISA SARL exploite des terres agricoles à fort potentiel au Togo. Nous maîtrisons l\'ensemble du cycle agricole, de la sélection rigoureuse des intrants jusqu\'à la distribution des récoltes et la transformation agroalimentaire.',
    impactText: 'Une approche technique rigoureuse garantissant des rendements élevés et des denrées alimentaires de première qualité pour les marchés locaux et sous-régionaux.',
    image: '/assets/img/agriculture.png',
    features: [
      { label: 'Production Végétale', desc: 'Maïs, Soja, Anacarde, Sésame, Café & Cacao cultivés selon des normes strictes.', icon: Wheat },
      { label: 'Élevage Moderne', desc: 'Gestion pastorale contrôlée, suivi sanitaire et production de bétail sain.', icon: Tractor },
      { label: 'Intrants & Fertilisants', desc: 'Distribution de semences certifiées et fertilisants adaptés aux sols togolais.', icon: Sprout },
      { label: 'Transformation Agro', desc: 'Unités de conditionnement et de valorisation des récoltes brutes.', icon: Factory },
    ],
    ctaText: 'Commander nos Produits Agricoles',
  },
  {
    id: 'btp',
    number: '02',
    title: 'Immobilier & BTP',
    subtitle: 'Sécurité Foncière Absolue & Infrastructures Solides',
    tagline: 'TITRES FONCIERS & CONSTRUCTION',
    accentColor: '#0A5FA5',
    badgeBg: 'bg-[#0A5FA5]/10 text-[#0A5FA5]',
    description: 'L\'accès à la propriété foncière et la construction nécessitent une rigueur juridique et technique totale. Notre pôle BTP garantit des parcelles sécurisées avec titres fonciers inattaquables et des réalisations architecturales durables.',
    impactText: 'Zéro litige foncier garanti. Nous protégeons votre capital immobilier de la phase d\'acquisition du terrain jusqu\'à la remise des clés.',
    image: '/assets/img/btp.png',
    features: [
      { label: 'Terrains avec Titre Foncier', desc: 'Parcelles bornées, vérifiées auprès du cadastre et 100% sécurisées à Lomé.', icon: MapPin },
      { label: 'Construction & Génie Civil', desc: 'Bâtiments résidentiels, commerciaux et ouvrages d\'infrastructure respectant les normes.', icon: HardHat },
      { label: 'Gestion Immobilière', desc: 'Promotion, valorisation foncière et gestion locative professionnelle.', icon: Home },
      { label: 'Expertise Technique', desc: 'Études de sol, plans d\'architecte et maîtrise d\'œuvre rigoureuse.', icon: Building2 },
    ],
    ctaText: 'Explorer les Offres Immobilières',
  },
  {
    id: 'transport',
    number: '03',
    title: 'Transport & Logistique',
    subtitle: 'Maîtrise des Flux & Acheminement Sécurisé',
    tagline: 'LOGISTIQUE ROUTIÈRE & TRAÇABILITÉ',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-500/10 text-amber-600',
    description: 'La fluidité de la chaîne d\'approvisionnement est un facteur stratégique de réussite. STEPHISA déploie une flotte logistique moderne adaptée au transport de marchandises agricoles volumineuses et de matériaux de construction.',
    impactText: 'Ponctualité rigoureuse et protection totale des cargaisons sur l\'ensemble des axes routiers du Togo et de la sous-région.',
    image: '/assets/img/transport.png',
    features: [
      { label: 'Transport de Marchandises', desc: 'Camions haute capacité pour céréales, intrants et produits manufacturés.', icon: Truck },
      { label: 'Logistique de Matériaux BTP', desc: 'Acheminement de ciment, fer, granulats et équipements sur chantiers.', icon: PackageCheck },
      { label: 'Ponctualité Garantie', desc: 'Planification optimisée pour respecter vos délais de livraison.', icon: Clock },
      { label: 'Traçabilité & Sécurité', desc: 'Suivi rigoureux et protection des biens transportés contre les pertes.', icon: ShieldCheck },
    ],
    ctaText: 'Réserver un Véhicule / Camion',
  },
  {
    id: 'investissement',
    number: '04',
    title: 'Investissement & Partenariats',
    subtitle: 'Des opportunités d’investissement à fort potentiel au Togo',
    tagline: 'DÉVELOPPEMENT & CRÉATION DE VALEUR',
    accentColor: '#2D7D46',
    badgeBg: 'bg-[#2D7D46]/10 text-[#2D7D46]',
    description: `STEPHISA SARL accompagne les investisseurs institutionnels, privés et les membres de la diaspora dans l’identification, la structuration et le développement d’opportunités d’investissement au Togo.

Notre approche repose sur des projets adossés à des actifs réels et tangibles, dans des secteurs stratégiques et porteurs de croissance : Agropastoralisme • Transformation agro-industrielle • Immobilier.

Nous privilégions des projets structurés, fondés sur une analyse rigoureuse des opportunités, une sélection attentive des actifs et une vision de création de valeur durable et pérenne.`,
    impactText: `NOTRE ENGAGEMENT — Identifier. Structurer. Investir. Valoriser.

Chez STEPHISA SARL, nous sommes convaincus que l’investissement doit s’appuyer sur des projets concrets, des actifs identifiables et une stratégie claire de création de valeur. Nous mettons notre connaissance du terrain, notre réseau de partenaires et notre capacité de structuration au service d’investisseurs souhaitant participer au développement économique du Togo.

STEPHISA SARL : Votre partenaire pour investir et créer de la valeur au Togo.`,
    image: '/assets/img/investissement.png',
    features: [
      {
        label: 'PROJETS AGROPASTORAUX',
        sublabel: 'Investir dans le potentiel agricole du Togo',
        desc: 'STEPHISA SARL propose des opportunités de co-investissement dans des projets agropastoraux et de production agricole à vocation commerciale et industrielle. L’objectif est de valoriser les ressources foncières et agricoles à travers des modèles de production structurés, capables de générer de la valeur sur le long terme.',
        icon: TrendingUp
      },
      {
        label: 'IMMOBILIER & FONCIER',
        sublabel: 'Transformer le foncier en opportunités de création de valeur',
        desc: 'Nous identifions et structurons des opérations immobilières et foncières situées dans des zones présentant un potentiel de développement et de valorisation. Les investissements peuvent notamment porter sur l’acquisition, la sécurisation et la valorisation d’actifs fonciers et immobiliers.',
        icon: Landmark
      },
      {
        label: 'PARTENARIATS STRATÉGIQUES',
        sublabel: 'Construire ensemble des projets d’envergure',
        desc: 'STEPHISA SARL développe des partenariats avec des investisseurs, entreprises et acteurs institutionnels souhaitant participer au développement de projets structurants au Togo. Selon la nature des opérations, ces collaborations peuvent prendre la forme de joint-ventures, de co-investissements ou de partenariats stratégiques.',
        icon: Handshake
      },
      {
        label: 'ACCOMPAGNEMENT DE LA DIASPORA',
        sublabel: 'Investir au Togo avec un accompagnement de proximité',
        desc: 'La diaspora constitue un partenaire essentiel du développement économique du Togo. STEPHISA SARL accompagne les investisseurs de la diaspora dans leur démarche, depuis l’identification des opportunités jusqu’au suivi de leurs projets d’investissement. Notre ambition : faciliter l’investissement à distance, renforcer la transparence des opérations et favoriser une relation de confiance durable avec chaque investisseur.',
        icon: Globe2
      },
    ],
    ctaText: 'Devenir Investisseur / Partenaire',
  },
  {
    id: 'juridique',
    number: '05',
    title: 'Domaine Juridique & Administratif',
    subtitle: 'Conformité Fiscale, Légale & Assistance CFE',
    tagline: 'PROTECTION JURIDIQUE & FORMALITÉS',
    accentColor: '#334155',
    badgeBg: 'bg-slate-700/10 text-slate-700',
    description: 'Créer et gérer une entreprise exige une conformité sans faille. Notre équipe d\'experts juridiques vous accompagne dans toutes vos démarches administratives, la rédaction contractuelle et le suivi réglementaire au Togo.',
    impactText: 'Sérénité juridique garantie. Nous sécurisons vos transactions, statuts d\'entreprise et actes administratifs selon le droit des affaires OHADA.',
    image: '/assets/img/juridique.png',
    features: [
      { label: 'Création d\'Entreprise (CFE)', desc: 'Obtention rapide des immatriculations (RCCM, NIF, Carte Opérateur Economique).', icon: Briefcase },
      { label: 'Rédaction de Contrats', desc: 'Élaboration de bail commercial, contrats d\'associés, partenariats & ventes.', icon: FileText },
      { label: 'Conseils Fiscaux & Sociaux', desc: 'Optimisation légale, conformité fiscale et gestion des déclarations sociales.', icon: Scale },
      { label: 'Suivi Administratif', desc: 'Assistance lors des démarches officielles auprès des ministères et institutions.', icon: CheckCircle2 },
    ],
    ctaText: 'Consulter nos Experts Juridiques',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-28 bg-white">
      
      {/* Header Banner - Open & Editorial with Background Image */}
      <section className="py-20 md:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/img/heros.png"
            alt="Nos Secteurs d'Activités STEPHISA"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Nos Secteurs d&apos;Activités STEPHISA
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base font-light leading-relaxed">
            Une organisation structurée et spécialisée pour garantir l&apos;excellence opérationnelle dans chaque secteur clé du développement économique au Togo.
          </p>
        </div>
      </section>

      {/* Fast Navigation Strip */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto text-xs font-bold text-slate-600 no-scrollbar">
          {POLES_DATA.map((pole) => (
            <a
              key={pole.id}
              href={`#${pole.id}`}
              className="px-3 py-1.5 rounded-lg hover:text-[#2D7D46] hover:bg-slate-50 transition shrink-0 flex items-center gap-1.5"
            >
              <span className="text-[10px] text-slate-400 font-mono">{pole.number}</span>
              <span>{pole.title.split('&')[0]}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Open Editorial Sections for Each Pole (No Boxed Cards Inside Cards!) */}
      <div className="divide-y divide-slate-100">
        {POLES_DATA.map((pole, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              key={pole.id}
              id={pole.id}
              className={`py-20 scroll-mt-32 ${isEven ? 'bg-white' : 'bg-slate-50/70'}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Editorial Information */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    
                    {/* Titles */}
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {pole.title}
                      </h2>
                      <p className="text-sm font-semibold text-[#2D7D46] mt-1">
                        {pole.subtitle}
                      </p>
                    </div>

                    {/* Main Description */}
                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {pole.description}
                    </div>

                    {/* Psychological Impact Statement */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100/80 text-xs text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                      {pole.impactText}
                    </div>

                    {/* 4 Feature Points with Clean Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {pole.features.map((feat, fIdx) => {
                        const IconComponent = feat.icon;
                        return (
                          <div key={fIdx} className="space-y-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                              <IconComponent className="w-4 h-4 text-[#2D7D46] shrink-0" />
                              <span>{feat.label}</span>
                            </div>
                            {feat.sublabel && (
                              <p className="text-[11px] font-semibold text-[#2D7D46] pl-6 italic">
                                {feat.sublabel}
                              </p>
                            )}
                            <p className="text-[11px] text-slate-500 leading-normal pl-6">
                              {feat.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Link */}
                    <div className="pt-4">
                      <Link
                        href={`/contact?service=${pole.id}`}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#2D7D46] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition duration-300 shadow-sm group"
                      >
                        <span>{pole.ctaText}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>

                  </div>

                  {/* Right Column: Clean High-Res Image (No nested boxed cards!) */}
                  <div className={`lg:col-span-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 group">
                      <Image
                        src={pole.image}
                        alt={pole.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-extrabold">Vous avez un projet spécifique ?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Nos équipes dans chaque pôle d&apos;activité sont prêtes à vous accompagner dès aujourd&apos;hui.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition"
            >
              Discuter avec nos experts
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
