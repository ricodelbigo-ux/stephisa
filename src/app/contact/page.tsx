"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2 } from 'lucide-react';
import { CONFIG } from '@/lib/config';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');
  const productParam = searchParams.get('product');
  const subjectParam = searchParams.get('subject');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Togo',
    service: 'agriculture',
    subject: '',
    message: '',
    newsletterOptIn: true,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        service: serviceParam,
        subject: `Demande concernant le service : ${serviceParam}`,
      }));
    } else if (productParam) {
      setFormData((prev) => ({
        ...prev,
        service: 'agriculture',
        subject: `Commande / Information Produit : ${productParam}`,
      }));
    } else if (subjectParam) {
      setFormData((prev) => ({
        ...prev,
        subject: subjectParam,
      }));
    }
  }, [serviceParam, productParam, subjectParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicePillSelect = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim() || 'Client STEPHISA',
      email: formData.email,
      phone: `${formData.phone} (${formData.country})`,
      service: formData.service,
      subject: formData.subject || `Demande ${formData.service}`,
      message: formData.message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        setStatusMessage(result.message || 'Votre message a été transmis avec succès. Notre équipe vous recontactera sous 24h.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: 'Togo',
          service: 'agriculture',
          subject: '',
          message: '',
          newsletterOptIn: true,
        });
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (error: any) {
      setStatus('error');
      setStatusMessage(error.message || 'Impossible d\'envoyer le formulaire. Veuillez vérifier vos informations.');
    }
  };

  const serviceOptions = [
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'btp', label: 'Immobilier & BTP' },
    { id: 'transport', label: 'Transport' },
    { id: 'investissement', label: 'Investissement' },
    { id: 'juridique', label: 'Juridique' },
    { id: 'autre', label: 'Autres' },
  ];

  return (
    <div className="w-full">
      
      {/* Full-width Split Section without outer margins or rounded card gaps */}
      <section className="w-full bg-slate-950 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Editorial Section with Background Media */}
          <div className="lg:col-span-6 relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white overflow-hidden bg-slate-950">
            
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/img/heros.png"
                alt="STEPHISA SARL"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-20 scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50 z-10" />
            </div>

            {/* Top Title & Subtitle */}
            <div className="relative z-20 space-y-6 pt-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
                Vous Avez des Projets, <br />
                <span className="text-[#F89B1C]">Nous Avons des Solutions.</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-md">
                Découvrez des opportunités d&apos;investissement et un accompagnement sur mesure conçus pour vous immerger au cœur de la réussite au Togo.
              </p>
            </div>

            {/* Bottom Info Section */}
            <div className="relative z-20 pt-12 mt-auto grid grid-cols-2 gap-6 border-t border-slate-800/80 text-xs">
              <div className="space-y-1.5">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Siège Social</h4>
                <p className="text-slate-300 leading-relaxed font-light">
                  {CONFIG.CONTACT.ADDRESS}
                </p>
                <p className="text-[11px] text-slate-400 pt-1">{CONFIG.CONTACT.HOURS_WEEKDAYS}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Réseaux Sociaux</h4>
                <div className="flex flex-col space-y-1 text-slate-300">
                  <a href={CONFIG.SOCIAL.WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-[#F89B1C] transition">WhatsApp</a>
                  <a href={CONFIG.SOCIAL.FACEBOOK} target="_blank" rel="noreferrer" className="hover:text-[#F89B1C] transition">Facebook</a>
                  <a href={CONFIG.SOCIAL.LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-[#F89B1C] transition">LinkedIn</a>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Adresse Email</h4>
                <p className="text-slate-300 font-medium">
                  <a href={`mailto:${CONFIG.CONTACT.EMAIL}`} className="hover:text-[#F89B1C] transition">
                    {CONFIG.CONTACT.EMAIL}
                  </a>
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Téléphones Directs</h4>
                <p className="text-slate-300 font-medium space-y-0.5">
                  <a href={`tel:${CONFIG.CONTACT.PHONE_PRIMARY}`} className="block hover:text-[#F89B1C] transition">
                    {CONFIG.CONTACT.PHONE_PRIMARY}
                  </a>
                  <a href={`tel:${CONFIG.CONTACT.PHONE_SECONDARY}`} className="block hover:text-[#F89B1C] transition">
                    {CONFIG.CONTACT.PHONE_SECONDARY}
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Right Section: Clean White Form Panel (No dark frame padding, flush layout) */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-12 lg:p-16 text-slate-900 flex flex-col justify-between">
            
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Dites-nous ce dont vous avez besoin
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Notre équipe est prête à vous assister pour chaque détail, grand ou petit.
              </p>
            </div>

            {status === 'success' ? (
              <div className="bg-[#2D7D46]/10 border border-[#2D7D46] text-[#2D7D46] p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <span>Demande transmise avec succès !</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{statusMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 bg-[#2D7D46] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-[#1E562F] transition"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Prénom"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Nom"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Pays / Ville (ex: Togo)"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Numéro de Téléphone"
                      required
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adresse Email"
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400"
                  />
                </div>

                {/* Type of Inquiry (Pill Selector) */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700">Type de Demande / Pôle</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleServicePillSelect(opt.id)}
                        className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition border ${
                          formData.service === opt.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Message / Détails de votre projet..."
                    required
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs p-4 rounded-xl focus:outline-none focus:border-[#2D7D46] transition placeholder:text-slate-400 resize-y"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newsletterOptIn"
                    checked={formData.newsletterOptIn}
                    onChange={(e) => setFormData((prev) => ({ ...prev, newsletterOptIn: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#2D7D46] focus:ring-[#2D7D46]"
                  />
                  <label htmlFor="newsletterOptIn" className="text-[11px] text-slate-500 font-light select-none">
                    J&apos;aimerais recevoir les opportunités d&apos;investissement et mises à jour de STEPHISA.
                  </label>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs">
                    {statusMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#2D7D46] hover:bg-[#1E562F] text-white font-bold text-xs py-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma Demande'}</span>
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* Google Maps Section (Clean Full-width Container) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl overflow-hidden border border-slate-200 h-96 w-full shadow-lg">
          <iframe
            src={CONFIG.CONTACT.MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-slate-50">
      <Suspense fallback={<div className="text-center py-20 text-slate-500 text-sm">Chargement du formulaire...</div>}>
        <ContactFormContent />
      </Suspense>
    </main>
  );
}
