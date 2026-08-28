import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists inside public
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'stephisa.db');
const db = new Database(dbPath);

// Enable WAL mode for high performance concurrent reads/writes
db.pragma('journal_mode = WAL');

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blogs (
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
  );

  CREATE TABLE IF NOT EXISTS realisations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Default Admin User if empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  // Default login: admin / admin123
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', 'admin123');
}

// Seed Initial Blogs if empty
const blogCount = db.prepare('SELECT COUNT(*) as count FROM blogs').get() as { count: number };
if (blogCount.count === 0) {
  const insertBlog = db.prepare(`
    INSERT INTO blogs (title, slug, excerpt, content, image, category, author, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBlog.run(
    'Lancement de la campagne de distribution d\'intrants certifiés 2026',
    'lancement-campagne-intrants-2026',
    'STEPHISA SARL renforce son soutien aux producteurs locaux avec des fertilisants et semences à haut rendement.',
    'Dans le cadre de la préparation de la nouvelle saison agropastorale, STEPHISA SARL déploie un dispositif d\'approvisionnement massif en engrais certifiés (NPK, Urée) et semences sélectionnées de maïs et soja à Lomé et dans les régions du Togo. Notre objectif est d\'assurer la souveraineté alimentaire et de maximiser le rendement hectare des exploitants partenaires.',
    '/assets/img/culture pret au arché.png',
    'Agriculture',
    'Direction Communication',
    'published',
    '2026-08-20 10:00:00'
  );

  insertBlog.run(
    'Acquisition et viabilisation de nouveaux terrains à Adidogomé Wonyomé',
    'acquisition-terrains-adidogome-wonyome',
    'Nouveau lotissement sécurisé avec titres fonciers garantis disponibles pour l\'investissement immobilier.',
    'Le pôle BTP & Immobilier de STEPHISA SARL annonce la mise en vente de parcelles viabilisées avec Titre Foncier inattaquable dans la zone résidentielle d\'Adidogomé Wonyomé à Lomé. Chaque terrain a fait l\'objet d\'un bornage contradictoire et d\'un contrôle rigoureux au Cadastre.',
    '/assets/img/btp.png',
    'Immobilier & BTP',
    'Pôle Immobilier',
    'published',
    '2026-08-12 14:30:00'
  );

  insertBlog.run(
    'Ouverture du Pôle Investissement & Partenariats de STEPHISA SARL',
    'ouverture-pole-investissement-partenariats',
    'Une nouvelle opportunité pour les investisseurs locaux et de la diaspora togolaise de co-investir dans des projets rentables.',
    'Afin de répondre à la forte demande des investisseurs privés et de la diaspora togolaise en Europe et Amérique, STEPHISA SARL structure des véhicules de placement adossés à des actifs réels : exploitations agricoles industrielles, parcelles immobilières et flotte de transport logistique.',
    '/assets/img/investissement.png',
    'Investissement',
    'Direction Générale',
    'published',
    '2026-08-05 09:15:00'
  );
}

// Seed Initial Realisations if empty
const realCount = db.prepare('SELECT COUNT(*) as count FROM realisations').get() as { count: number };
if (realCount.count === 0) {
  const insertReal = db.prepare(`
    INSERT INTO realisations (title, category, image, description)
    VALUES (?, ?, ?, ?)
  `);

  insertReal.run('Aménagement Agricole de 50 Hectares', 'Agriculture', '/assets/img/agriculture.png', 'Préparation des sols et semences mécanisées au Togo.');
  insertReal.run('Chantier BTP & Construction Résidentielle', 'BTP', '/assets/img/btp.png', 'Ouvrages de maçonnerie lourde et terrassement à Lomé.');
  insertReal.run('Flotte Logistique en Convoyage', 'Transport', '/assets/img/transport.png', 'Acheminement routier sécurisé de cargaisons volumineuses.');
  insertReal.run('Nouveau Projet Foncier Titré', 'Investissement', '/assets/img/investissement.png', 'Valorisation de parcelles sécurisées pour investisseurs.');
}

export default db;
