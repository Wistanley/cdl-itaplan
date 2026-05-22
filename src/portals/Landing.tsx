import React from 'react';
import type { Portal, Campaign } from '../types';
import { ItaplanLogo } from '../components/ui';

interface LandingProps {
  setPortal: (p: Portal) => void;
  activeCampaign: Campaign;
  totalLojas: number;
  totalCupons: number;
}

export default function Landing({ setPortal, activeCampaign, totalLojas, totalCupons }: LandingProps) {
  return (
    <div
      id="portal-landing"
      className="itp-gradient-hero min-h-screen text-white py-12 px-4 flex flex-col justify-between animate-fade-in relative overflow-hidden"
    >
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      ></div>

      {/* Top nav */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between relative z-10 mb-8">
        <ItaplanLogo size="md" invert />
        <div className="hidden sm:flex items-center gap-6 text-[12px] font-semibold text-blue-100/80">
          <span className="inline-flex items-center gap-1.5">
            <i className="ti ti-shield-check text-[#FFC72C]"></i> Plataforma LGPD-ready
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="ti ti-building text-[#FFC72C]"></i> Itaplan Shopping
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto w-full text-center my-auto flex flex-col justify-center items-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC72C]/15 border border-[#FFC72C]/30 text-[#FFC72C] font-bold text-[11px] tracking-widest uppercase mb-7 shadow-inner">
          <span className="w-1.5 h-1.5 bg-[#FFC72C] rounded-full animate-pulse"></span>
          Campanha ativa · {activeCampaign.nome}
        </div>

        {/* Title */}
        <h1 className="font-title text-4xl sm:text-5xl md:text-[64px] font-black text-white leading-[1.05] tracking-tight max-w-4xl">
          A central de relacionamento{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC72C] via-[#FFE08A] to-[#F5B800]">
            do seu shopping
          </span>
          .
        </h1>

        <p className="mt-6 text-blue-100/80 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
          Campanhas multi-temáticas, comunicados oficiais, documentos sensíveis em ambiente seguro
          e inteligência de dados anonimizada — tudo o que antes vivia disperso em e-mails, agora
          centralizado em uma única plataforma.
        </p>

        {/* Trust strip */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl">
          <TrustItem icon="ti-building-store" value={`${totalLojas}+`} label="Lojas parceiras" />
          <TrustItem icon="ti-ticket" value={totalCupons.toLocaleString('pt-BR')} label="Cupons emitidos" />
          <TrustItem icon="ti-shield-lock" value="100%" label="Conformidade LGPD" />
        </div>

        <div className="h-[2px] w-12 bg-[#F5B800] my-10 rounded-full"></div>

        {/* Portal selector */}
        <p className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#FFC72C]/90 mb-6">
          Selecione seu portal de acesso
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl text-left">
          <PortalCard
            id="btn-portal-admin"
            onClick={() => setPortal('admin')}
            icon="ti-shield-lock"
            accent="gold"
            title="Administração Itaplan"
            description="Gestão de campanhas, comunicados oficiais, documentos sensíveis e inteligência de dados em um único painel."
            cta="Acessar painel admin"
          />
          <PortalCard
            id="btn-portal-lojista"
            onClick={() => setPortal('lojista')}
            icon="ti-building-store"
            accent="blue"
            title="Portal do Lojista"
            description="Registre vendas, emita cupons, receba comunicados da administração e acompanhe a performance da sua loja."
            cta="Entrar como lojista"
          />
          <PortalCard
            id="btn-portal-cliente"
            onClick={() => setPortal('cliente')}
            icon="ti-user-heart"
            accent="navy"
            title="Área do Cliente"
            description="Consulte por CPF seus números da sorte de todas as campanhas Itaplan, atuais e anteriores."
            cta="Consultar meus cupons"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-blue-100/50 mt-12 relative z-10 max-w-4xl mx-auto">
        <p className="font-semibold">
          Itaplan • Protótipo interativo de apresentação · Sem persistência em banco · Dados em memória
        </p>
      </footer>
    </div>
  );
}

function TrustItem({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl py-3 px-3 sm:px-4">
      <div className="flex items-center justify-center gap-2">
        <i className={`ti ${icon} text-[#FFC72C] text-lg`}></i>
        <span className="font-title font-black text-white text-lg sm:text-xl">{value}</span>
      </div>
      <p className="text-[10px] uppercase tracking-wider text-blue-200/60 mt-1 font-bold">{label}</p>
    </div>
  );
}

interface PortalCardProps {
  id: string;
  onClick: () => void;
  icon: string;
  accent: 'gold' | 'blue' | 'navy';
  title: string;
  description: string;
  cta: string;
}

function PortalCard({ id, onClick, icon, accent, title, description, cta }: PortalCardProps) {
  const accentMap = {
    gold: {
      iconBg: 'bg-[#FFC72C]/10 text-[#FFC72C] group-hover:bg-[#FFC72C]/20',
      border: 'border-[#FFC72C]/30 hover:border-[#FFC72C]/60',
      hoverTitle: 'group-hover:text-[#FFC72C]',
      ctaText: 'text-[#FFC72C]',
    },
    blue: {
      iconBg: 'bg-[#1E5BCF]/20 text-[#9BB8F2] group-hover:bg-[#1E5BCF]/30',
      border: 'border-[#1E5BCF]/30 hover:border-[#1E5BCF]/70',
      hoverTitle: 'group-hover:text-[#9BB8F2]',
      ctaText: 'text-[#9BB8F2]',
    },
    navy: {
      iconBg: 'bg-white/10 text-white group-hover:bg-white/20',
      border: 'border-white/15 hover:border-white/40',
      hoverTitle: 'group-hover:text-white',
      ctaText: 'text-blue-100',
    },
  }[accent];

  return (
    <button
      id={id}
      onClick={onClick}
      className={`group relative h-full bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border ${accentMap.border} p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between text-left cursor-pointer`}
    >
      <div>
        <div
          className={`w-12 h-12 rounded-xl ${accentMap.iconBg} flex items-center justify-center mb-5 transition-colors`}
        >
          <i className={`ti ${icon} text-2xl`}></i>
        </div>
        <h3 className={`font-title text-xl font-black text-white ${accentMap.hoverTitle} transition-colors`}>
          {title}
        </h3>
        <p className="text-sm text-blue-100/70 mt-2 leading-relaxed">{description}</p>
      </div>
      <div
        className={`flex items-center gap-2 mt-6 text-[11px] ${accentMap.ctaText} font-extrabold tracking-wider uppercase transition-transform group-hover:translate-x-1`}
      >
        {cta} <i className="ti ti-arrow-right text-sm"></i>
      </div>
    </button>
  );
}
