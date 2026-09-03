import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import PaymentPending from "@/components/PaymentPending";
import { CONFIG } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STEPHISA SARL - Excellence Agricole, Immobilière & Multiservices au Togo",
  description: "STEPHISA SARL - Entreprise multisectorielle d'excellence à Lomé, Togo. Agropastoralisme, BTP, Immobilier avec Titre Foncier, Transport & Logistique, Investissement et Domaine Juridique.",
  keywords: ["STEPHISA SARL", "Agriculture Togo", "BTP Lomé", "Immobilier Togo", "Titre Foncier", "Transport Togo", "Investissement Afrique", "Services Juridiques Lomé"],
  icons: {
    icon: [
      { url: "/assets/img/logo stephisa.png", type: "image/png" },
    ],
    shortcut: "/assets/img/logo stephisa.png",
    apple: "/assets/img/logo stephisa.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (CONFIG.IS_PAYMENT_PENDING) {
    return (
      <html lang="fr" className={`${playfair.variable} ${jakarta.variable}`}>
        <body className="bg-white text-slate-900 antialiased font-sans">
          <PaymentPending />
        </body>
      </html>
    );
  }

  return (
    <html lang="fr" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-800 antialiased flex flex-col min-h-screen font-sans">
        <ScrollRevealInit />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
