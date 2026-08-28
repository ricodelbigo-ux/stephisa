"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  Send, 
  Plus, 
  Trash2, 
  LogOut, 
  RefreshCw, 
} from 'lucide-react';

export default function SecretAdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'realisations' | 'contacts' | 'newsletter'>('blogs');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [realisations, setRealisations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // New Blog State
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Agriculture',
    image: '',
  });

  // New Realisation State
  const [newReal, setNewReal] = useState({
    title: '',
    category: 'Agriculture',
    image: '',
    description: '',
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();

  const loadData = async () => {
    try {
      const [resBlogs, resReals, resContacts, resNews] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/realisations'),
        fetch('/api/contact'),
        fetch('/api/newsletter'),
      ]);

      const [dataBlogs, dataReals, dataContacts, dataNews] = await Promise.all([
        resBlogs.json(),
        resReals.json(),
        resContacts.json(),
        resNews.json(),
      ]);

      if (dataBlogs.status === 'success') setBlogs(dataBlogs.data);
      if (dataReals.status === 'success') setRealisations(dataReals.data);
      if (dataContacts.status === 'success') setContacts(dataContacts.data);
      if (dataNews.status === 'success') setSubscribers(dataNews.data);
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors du chargement des données.' });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' });
    router.push('/stephisa-espace-securise-9482/login');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'blog' | 'real') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.status === 'success') {
        if (target === 'blog') {
          setNewBlog((prev) => ({ ...prev, image: json.url }));
        } else {
          setNewReal((prev) => ({ ...prev, image: json.url }));
        }
        setMessage({ type: 'success', text: 'Image téléversée avec succès !' });
      } else {
        setMessage({ type: 'error', text: 'Échec du téléversement de l\'image.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de l\'envoi de l\'image.' });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      const json = await res.json();
      if (res.ok && json.status === 'success') {
        setMessage({ type: 'success', text: 'Article créé et publié dans SQLite !' });
        setNewBlog({ title: '', excerpt: '', content: '', category: 'Agriculture', image: '' });
        loadData();
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la création de l\'article.' });
    }
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Article supprimé de la base SQLite.' });
        loadData();
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de la suppression.' });
    }
  };

  const handleCreateRealisation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReal.title || !newReal.image) return;

    try {
      const res = await fetch('/api/realisations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReal),
      });

      const json = await res.json();
      if (res.ok && json.status === 'success') {
        setMessage({ type: 'success', text: 'Réalisation ajoutée à la galerie !' });
        setNewReal({ title: '', category: 'Agriculture', image: '', description: '' });
        loadData();
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout de la réalisation.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Top Navbar Admin */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg">
            <Image src="/assets/img/logo stephisa.png" alt="STEPHISA" width={36} height={36} />
          </div>
          <div>
            <h1 className="font-bold text-white text-base">STEPHISA SARL - Administration Privée</h1>
            <span className="text-[11px] text-slate-400 font-mono">Portail Confidentiel SQLite</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadData}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition text-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rafraîchir</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {message && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between ${
            message.type === 'success' ? 'bg-[#2D7D46]/20 border border-[#2D7D46] text-[#2D7D46]' : 'bg-red-900/30 border border-red-500 text-red-400'
          }`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-4">
            <div className="p-3 bg-[#2D7D46]/20 text-[#2D7D46] rounded-xl"><FileText className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-extrabold text-white">{blogs.length}</div>
              <div className="text-xs text-slate-400 font-medium">Articles de Blog</div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 text-[#F89B1C] rounded-xl"><ImageIcon className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-extrabold text-white">{realisations.length}</div>
              <div className="text-xs text-slate-400 font-medium">Réalisations Galerie</div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl"><Mail className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-extrabold text-white">{contacts.length}</div>
              <div className="text-xs text-slate-400 font-medium">Messages Reçus</div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><Send className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-extrabold text-white">{subscribers.length}</div>
              <div className="text-xs text-slate-400 font-medium">Abonnés Newsletter</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-3 rounded-t-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'blogs' ? 'bg-slate-800 text-[#F89B1C] border-t-2 border-[#F89B1C]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Gestion des Blogs ({blogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('realisations')}
            className={`px-5 py-3 rounded-t-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'realisations' ? 'bg-slate-800 text-[#F89B1C] border-t-2 border-[#F89B1C]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Réalisations & Galerie ({realisations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-3 rounded-t-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'contacts' ? 'bg-slate-800 text-[#F89B1C] border-t-2 border-[#F89B1C]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Messages Formulaire ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-5 py-3 rounded-t-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'newsletter' ? 'bg-slate-800 text-[#F89B1C] border-t-2 border-[#F89B1C]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Newsletter ({subscribers.length})</span>
          </button>
        </div>

        {/* Tab 1: Manage Blogs */}
        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form to Add Blog */}
            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#2D7D46]" />
                Publier un Nouvel Article
              </h2>

              <form onSubmit={handleCreateBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Titre de l&apos;Article *</label>
                  <input
                    type="text"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    required
                    placeholder="ex: Lancement de la campagne 2026..."
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#2D7D46]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#2D7D46]"
                  >
                    <option value="Agriculture">Agriculture & Agropastoralisme</option>
                    <option value="Immobilier & BTP">Immobilier & BTP</option>
                    <option value="Transport & Logistique">Transport & Logistique</option>
                    <option value="Investissement">Investissement</option>
                    <option value="Juridique">Domaine Juridique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Résumé court</label>
                  <textarea
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    rows={2}
                    placeholder="Court extrait présenté sur la carte de l'article..."
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#2D7D46]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contenu Complet *</label>
                  <textarea
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                    rows={5}
                    required
                    placeholder="Rédigez l'article complet ici..."
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#2D7D46]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Image d&apos;Illustration</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'blog')}
                      className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
                    />
                    {uploading && <span className="text-xs text-[#F89B1C]">Téléversement...</span>}
                  </div>
                  {newBlog.image && (
                    <div className="mt-2 relative w-full h-24 rounded-xl overflow-hidden border border-slate-700">
                      <Image src={newBlog.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-xs py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publier dans SQLite</span>
                </button>
              </form>
            </div>

            {/* List of Existing Blogs */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-bold text-base text-white">Articles Existants ({blogs.length})</h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                        <Image src={b.image || '/assets/img/heros.png'} alt={b.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#F89B1C] bg-[#F89B1C]/10 px-2 py-0.5 rounded-md">
                          {b.category}
                        </span>
                        <h4 className="font-bold text-sm text-white line-clamp-1 mt-1">{b.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 font-light">{b.excerpt}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-lg transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Manage Realisations */}
        {activeTab === 'realisations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#F89B1C]" />
                Ajouter une Réalisation à la Galerie
              </h2>

              <form onSubmit={handleCreateRealisation} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Titre de la Réalisation *</label>
                  <input
                    type="text"
                    value={newReal.title}
                    onChange={(e) => setNewReal({ ...newReal, title: e.target.value })}
                    required
                    placeholder="ex: Aménagement Agricole de 50 Ha..."
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#F89B1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catégorie Pôle</label>
                  <select
                    value={newReal.category}
                    onChange={(e) => setNewReal({ ...newReal, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#F89B1C]"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="BTP">BTP & Immobilier</option>
                    <option value="Transport">Transport & Logistique</option>
                    <option value="Investissement">Investissement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    value={newReal.description}
                    onChange={(e) => setNewReal({ ...newReal, description: e.target.value })}
                    rows={3}
                    placeholder="Brève description..."
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-[#F89B1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Image du Projet *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'real')}
                    className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white"
                  />
                  {newReal.image && (
                    <div className="mt-2 relative w-full h-28 rounded-xl overflow-hidden border border-slate-700">
                      <Image src={newReal.image} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F89B1C] hover:bg-[#E0870D] text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enregistrer dans la Galerie</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-bold text-base text-white">Projets en Galerie ({realisations.length})</h2>
              
              <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                {realisations.map((r) => (
                  <div key={r.id} className="relative h-44 rounded-xl overflow-hidden group border border-slate-700">
                    <Image src={r.image} alt={r.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-slate-950/70 p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-[#F89B1C] bg-slate-900/80 px-2 py-0.5 rounded-md w-max">
                        {r.category}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-white">{r.title}</h4>
                        <p className="text-[10px] text-slate-300 line-clamp-1">{r.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contact Messages */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="font-bold text-base text-white">Messages du Formulaire de Contact ({contacts.length})</h2>
            
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">Aucun message reçu pour le moment.</div>
            ) : (
              <div className="space-y-3">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-slate-800/70 p-5 rounded-2xl border border-slate-700/60 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                      <div>
                        <h3 className="font-bold text-sm text-white">{c.name}</h3>
                        <p className="text-xs text-slate-400">Email: <a href={`mailto:${c.email}`} className="text-[#F89B1C]">{c.email}</a> | Tel: {c.phone || 'Non renseigné'}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7D46] bg-[#2D7D46]/10 px-2.5 py-1 rounded-md">
                          Service: {c.service}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1">{c.created_at}</div>
                      </div>
                    </div>
                    {c.subject && <div className="text-xs font-bold text-slate-200">Sujet: {c.subject}</div>}
                    <p className="text-xs text-slate-300 leading-relaxed font-light whitespace-pre-wrap">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Newsletter Subscribers */}
        {activeTab === 'newsletter' && (
          <div className="space-y-4">
            <h2 className="font-bold text-base text-white">Liste des Abonnés à la Newsletter ({subscribers.length})</h2>
            
            <div className="bg-slate-800/70 rounded-2xl border border-slate-700/60 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-700">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Adresse Email</th>
                    <th className="p-4">Date d&apos;Inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {subscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-700/30 transition">
                      <td className="p-4 font-mono text-slate-500">#{s.id}</td>
                      <td className="p-4 font-bold text-white">{s.email}</td>
                      <td className="p-4 text-slate-400">{s.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
