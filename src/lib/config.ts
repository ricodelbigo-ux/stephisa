export const CONFIG = {
  COMPANY_NAME: 'STEPHISA SARL',
  TAGLINE: 'Excellence Agricole & Multiservices au Togo',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost/STEPHISA/backend',
  CONTACT: {
    ADDRESS: 'ADIDOGOMÉ WONYOME, Lomé, Togo',
    PHONE_PRIMARY: '+228 91 80 35 46',
    PHONE_SECONDARY: '+228 99 58 57 25',
    EMAIL: 'contact@stephisa.com',
    HOURS_WEEKDAYS: 'Lun - Ven : 07h00 - 17h00',
    HOURS_SATURDAY: 'Samedi : 07h00 - 12h00',
    MAPS_EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.565673867054!2d1.1506132749900957!3d6.188827993798768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTEnMTkuOCJOIDHCsDA5JzExLjUiRQ!5e0!3m2!1sfr!2stg!4v1770056145544!5m2!1sfr!2stg',
  },
  SOCIAL: {
    WHATSAPP: 'https://wa.me/22891803546',
    FACEBOOK: 'https://facebook.com/stephisasarl',
    LINKEDIN: 'https://linkedin.com/company/stephisasarl',
  },
  POLES: [
    {
      id: 'agriculture',
      slug: 'agriculture',
      title: 'Agriculture & Élevage',
      shortDesc: 'Production végétale, élevage moderne et distribution d\'intrants agricoles de première qualité.',
      fullDesc: 'Nous exploitons de vastes terres fertiles pour produire des denrées de première nécessité (Maïs, Soja, Ignames, Anacarde, Sésame, Café et Cacao) et assurons l\'élevage de bétail dans le respect des normes sanitaires.',
      image: '/assets/img/agriculture.png',
      badge: 'Cœur de Métier',
      icon: 'Sprout',
      features: [
        'Production Végétale & Récoltes',
        'Élevage Moderne & Pastoralisme',
        'Vente d\'Intrants & Fertilisants',
        'Transformation Agroalimentaire'
      ],
      ctaText: 'Besoin d\'Intrants ou Produits ?'
    },
    {
      id: 'btp',
      slug: 'btp',
      title: 'Immobilier & BTP',
      shortDesc: 'Construction, rénovation de bâtiments et gestion de biens immobiliers sécurisés à Lomé.',
      fullDesc: 'Que vous cherchiez à acquérir un terrain sécurisé avec titre foncier garanti ou à construire votre bâtiment, notre pôle BTP maîtrise toute la chaîne de valeur, de la fondation aux finitions.',
      image: '/assets/img/btp.png',
      badge: 'Titre Foncier Garanti',
      icon: 'Building2',
      features: [
        'Vente de Terrains Titrés & Sans Litige',
        'Construction & Rénovation BTP',
        'Gestion & Promotion Immobilière',
        'Études & Suivi de Chantiers'
      ],
      ctaText: 'Voir nos offres immobilières'
    },
    {
      id: 'transport',
      slug: 'transport',
      title: 'Transport & Logistique',
      shortDesc: 'Solutions de transport routier fiables pour l\'acheminement de vos marchandises en toute sécurité.',
      fullDesc: 'Dans un secteur où la ponctualité est clé, STEPHISA déploie sa flotte routière pour assurer le transport de vos biens (produits agricoles, matériaux de construction) sur toute l\'étendue du territoire.',
      image: '/assets/img/transport.png',
      badge: 'Flotte Sécurisée',
      icon: 'Truck',
      features: [
        'Transport de Marchandises Agricoles',
        'Logistique de Matériaux de BTP',
        'Flotte Récente & Ponctualité',
        'Traçabilité & Sécurité des Livraisons'
      ],
      ctaText: 'Réserver un camion'
    },
    {
      id: 'investissement',
      slug: 'investissement',
      title: 'Investissement & Partenariats',
      shortDesc: 'Placement et financement de projets d\'avenir, opportunités agricoles et immobilières hautement rentables.',
      fullDesc: 'STEPHISA SARL offre aux investisseurs locaux et de la diaspora des opportunités uniques de placements structurés dans des secteurs porteurs tels que l\'agropastoralisme, la transformation agroalimentaire et le développement immobilier au Togo.',
      image: '/assets/img/investissement.png',
      badge: 'Forte Rentabilité',
      icon: 'TrendingUp',
      features: [
        'Projets Agropastoraux à Forte Rentabilité',
        'Placements Immobiliers & Foncier Sécurisé',
        'Co-investissement & Partenariats Stratégiques',
        'Accompagnement des Investisseurs de la Diaspora'
      ],
      ctaText: 'Devenir Investisseur / Partenaire'
    },
    {
      id: 'juridique',
      slug: 'juridique',
      title: 'Domaine Juridique & Administratif',
      shortDesc: 'Accompagnement dans vos démarches administratives, création d\'entreprise et conseils fiscaux.',
      fullDesc: 'Naviguer dans les procédures administratives peut être complexe. STEPHISA vous offre un accompagnement rigoureux pour la création d\'entreprise, la gestion fiscale et le suivi de vos dossiers juridiques.',
      image: '/assets/img/juridique.png',
      badge: 'Conformité 100%',
      icon: 'Scale',
      features: [
        'Assistance Création d\'Entreprise (CFE)',
        'Conseils Fiscaux & Sociaux',
        'Rédaction de Contrats & Statuts',
        'Accompagnement & Suivi Administratif'
      ],
      ctaText: 'Consulter nos experts'
    }
  ]
};
