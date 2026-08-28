import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:./data/stephisa.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Track initialization
let initialized = false;

export async function initDB() {
  if (initialized) return;

  await client.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      image TEXT,
      category TEXT DEFAULT 'Agriculture',
      author TEXT DEFAULT 'Direction STEPHISA',
      status TEXT DEFAULT 'published',
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS realisations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
  ]);

  // Seed default admin user if table is empty
  const userCount = await client.execute('SELECT COUNT(*) as count FROM users');
  if (Number(userCount.rows[0].count) === 0) {
    await client.execute({
      sql: 'INSERT INTO users (username, password) VALUES (?, ?)',
      args: ['admin', 'admin123'],
    });
  }

  // Seed initial blogs if empty
  const blogCount = await client.execute('SELECT COUNT(*) as count FROM blogs');
  if (Number(blogCount.rows[0].count) === 0) {
    await client.execute({
      sql: `INSERT INTO blogs (title, slug, excerpt, content, image, category, author, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'Lancement de la campagne de distribution d\'intrants certifiés 2026',
        'lancement-campagne-intrants-2026',
        'STEPHISA SARL renforce son soutien aux producteurs locaux avec des fertilisants et semences à haut rendement.',
        'Dans le cadre de la préparation de la nouvelle saison agropastorale, STEPHISA SARL déploie un dispositif d\'approvisionnement massif en engrais certifiés (NPK, Urée) et semences sélectionnées de maïs et soja à Lomé et dans les régions du Togo.',
        '/assets/img/culture pret au arché.png',
        'Agriculture',
        'Direction Communication',
        'published',
        '2026-08-20 10:00:00',
      ],
    });
    await client.execute({
      sql: `INSERT INTO blogs (title, slug, excerpt, content, image, category, author, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'Acquisition et viabilisation de nouveaux terrains à Adidogomé Wonyomé',
        'acquisition-terrains-adidogome-wonyome',
        'Nouveau lotissement sécurisé avec titres fonciers garantis disponibles pour l\'investissement immobilier.',
        'Le pôle BTP & Immobilier de STEPHISA SARL annonce la mise en vente de parcelles viabilisées avec Titre Foncier inattaquable dans la zone résidentielle d\'Adidogomé Wonyomé à Lomé.',
        '/assets/img/btp.png',
        'Immobilier & BTP',
        'Pôle Immobilier',
        'published',
        '2026-08-12 14:30:00',
      ],
    });
    await client.execute({
      sql: `INSERT INTO blogs (title, slug, excerpt, content, image, category, author, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'Ouverture du Pôle Investissement & Partenariats de STEPHISA SARL',
        'ouverture-pole-investissement-partenariats',
        'Une nouvelle opportunité pour les investisseurs locaux et de la diaspora togolaise de co-investir dans des projets rentables.',
        'Afin de répondre à la forte demande des investisseurs privés et de la diaspora togolaise en Europe et Amérique, STEPHISA SARL structure des véhicules de placement adossés à des actifs réels.',
        '/assets/img/investissement.png',
        'Investissement',
        'Direction Générale',
        'published',
        '2026-08-05 09:15:00',
      ],
    });
  }

  // Seed initial realisations if empty
  const realCount = await client.execute('SELECT COUNT(*) as count FROM realisations');
  if (Number(realCount.rows[0].count) === 0) {
    await client.batch([
      { sql: 'INSERT INTO realisations (title, category, image, description) VALUES (?, ?, ?, ?)', args: ['Aménagement Agricole de 50 Hectares', 'Agriculture', '/assets/img/agriculture.png', 'Préparation des sols et semences mécanisées au Togo.'] },
      { sql: 'INSERT INTO realisations (title, category, image, description) VALUES (?, ?, ?, ?)', args: ['Chantier BTP & Construction Résidentielle', 'BTP', '/assets/img/btp.png', 'Ouvrages de maçonnerie lourde et terrassement à Lomé.'] },
      { sql: 'INSERT INTO realisations (title, category, image, description) VALUES (?, ?, ?, ?)', args: ['Flotte Logistique en Convoyage', 'Transport', '/assets/img/transport.png', 'Acheminement routier sécurisé de cargaisons volumineuses.'] },
      { sql: 'INSERT INTO realisations (title, category, image, description) VALUES (?, ?, ?, ?)', args: ['Nouveau Projet Foncier Titré', 'Investissement', '/assets/img/investissement.png', 'Valorisation de parcelles sécurisées pour investisseurs.'] },
    ]);
  }

  initialized = true;
}

export default client;
