"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, User, LogIn, ShieldAlert } from 'lucide-react';

export default function SecretAdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json().catch(() => null);
      if (res.ok && json?.status === 'success') {
        router.push('/stephisa-espace-securise-9482');
        router.refresh();
      } else {
        setError(json?.message || `Erreur (${res.status}): Identifiants incorrects`);
      }
    } catch (err: any) {
      setError(err?.message || 'Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-2xl mb-2">
            <Image
              src="/assets/img/logo stephisa.png"
              alt="STEPHISA SARL Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="font-serif font-black text-2xl text-slate-900">
            Portail Sécurisé STEPHISA
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Accès réservé exclusivement à la direction et aux administrateurs
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Identifiant Administrateur</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#2D7D46] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mot de Passe Secret</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#2D7D46] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Connexion en cours...' : 'Accéder au Portail'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
