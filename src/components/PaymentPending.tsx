'use client';

import React, { useState } from 'react';
import { Mail, Check, Copy, ExternalLink } from 'lucide-react';

export default function PaymentPending() {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const devEmail = 'sciencedevapp@gmail.com';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(devEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none font-sans">
      {/* Subtle dotted background grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Container with 3D Dollar behind */}
      <div className="relative z-10 text-center max-w-xl mx-auto flex flex-col items-center justify-center">
        
        {/* Animated 3D Dollar Symbol behind the text */}
        <div 
          className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{ perspective: '1000px' }}
        >
          <div className="dollar-3d-wrapper">
            <div className="dollar-3d-coin">
              {/* Dollar Coin Front */}
              <div className="dollar-face dollar-front">
                <span className="dollar-symbol">$</span>
              </div>
              {/* Dollar Coin Back */}
              <div className="dollar-face dollar-back">
                <span className="dollar-symbol">$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content in front of the 3D Dollar */}
        <div className="relative z-10 pt-16 sm:pt-20 space-y-4">
          {/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            En attente de paiement
          </h1> */}
          
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            Ce site web est temporairement indisponible.
          </p>

          {/* Email button toggle */}
          <div className="pt-4 flex flex-col items-center">
            {!showEmail ? (
              <button
                onClick={() => setShowEmail(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contacter le développeur</span>
              </button>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-200 inline-flex flex-col sm:flex-row items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
                <a
                  href={`mailto:${devEmail}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:text-slate-950 hover:underline"
                >
                  <Mail className="w-4 h-4 text-slate-600" />
                  <span>{devEmail}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <button
                  onClick={handleCopy}
                  title="Copier l'email"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Styles & Animation */}
      <style jsx>{`
        .dollar-3d-wrapper {
          width: 140px;
          height: 140px;
          position: relative;
          transform-style: preserve-3d;
          animation: float 4s ease-in-out infinite;
        }

        .dollar-3d-coin {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: spin3d 8s linear infinite;
        }

        .dollar-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
          background: radial-gradient(circle at 35% 30%, #fef08a 0%, #eab308 50%, #ca8a04 85%, #854d0e 100%);
          border: 4px solid #fef9c3;
          box-shadow: 
            0 0 30px rgba(234, 179, 8, 0.25),
            inset 0 0 15px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.6);
        }

        .dollar-front {
          transform: translateZ(8px);
        }

        .dollar-back {
          transform: rotateY(180deg) translateZ(8px);
        }

        .dollar-symbol {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 80px;
          font-weight: 900;
          color: #713f12;
          text-shadow: 
            1px 1px 0px #fef08a,
            -1px -1px 0px #854d0e,
            0 3px 6px rgba(0, 0, 0, 0.3);
          line-height: 1;
        }

        @keyframes spin3d {
          0% {
            transform: rotateY(0deg) rotateX(12deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(4deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(12deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
}
