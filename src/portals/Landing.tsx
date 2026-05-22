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
            <i className="ti ti-shield-check text-[#FFC72C]"></i> Em conformidade com a LGPD
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="ti ti-map-pin text-[#FFC72C]"></i> Itabira · Minas Gerais
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
        <h1 className="font-title text-4xl sm:text-5xl md:text-[64px] font-black text-white leading-[1.05] tracking-tight max-w-4xl px-2">
          A central de relacionamento{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC72C] via-[#FFE08A] to-[#F5B800]">
            do comércio itabirano
          </span>
          .
        </h1>

        <p className="mt-6 text-blue-100/80 text-base sm:text-lg max-w-2xl font-medium leading-relaxed px-2">
          Campanhas multi-temáticas, comunicados oficiais entre lojas, documentos sensíveis em
          ambiente seguro e inteligência de dados anonimizada — tudo o que antes vivia disperso em
          e-mails e grupos de WhatsApp, agora centralizado em uma única plataforma para o comércio
          de Itabira.
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
            description="Registre vendas, emita cupons, receba comunicados da administração e acompanhe o desempenho da sua loja."
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

      {/* Features section */}
      <FeaturesSection />

      {/* Footer */}
      <footer className="text-center text-[11px] text-blue-100/50 mt-12 relative z-10 max-w-4xl mx-auto px-4">
        <p className="font-semibold">
          Itaplan · Protótipo interativo · Comércio itabirano · Dados em memória, sem persistência
        </p>
      </footer>
    </div>
  );
}

// ==========================================
// FEATURES SECTION — funcionalidades planejadas
// ==========================================
type FeatureTag = 'em-breve' | 'pronto' | 'em-testes';
const FEATURES: { icon: string; title: string; description: string; tag: FeatureTag }[] = [
  {
    icon: 'ti-brand-whatsapp',
    title: 'WhatsApp integrado',
    description: 'Envio automático de comunicados, avisos e confirmação de cupons direto no WhatsApp do cliente e do lojista.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-device-mobile',
    title: 'Aplicativo do consumidor',
    description: 'Instalável no celular, sem precisar baixar de loja de aplicativos. Consulta de cupons, avisos e carteira digital de prêmios.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-coin',
    title: 'Programa de fidelidade unificado',
    description: 'Dinheiro de volta acumulado em todas as lojas credenciadas, podendo ser usado em qualquer comércio participante.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-map-2',
    title: 'Mapa das lojas em Itabira',
    description: 'Vitrine com a localização de cada loja participante, rota, horário de funcionamento e promoções em tempo real.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-shopping-cart',
    title: 'Vitrine digital do comércio',
    description: 'Loja virtual única do comércio itabirano com pagamento online, retirada no balcão ou entrega por motoboy.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-credit-card',
    title: 'Integração com a maquininha de cartão',
    description: 'Cupons emitidos automaticamente no momento do pagamento, sem precisar digitar nada na hora da venda.',
    tag: 'em-testes',
  },
  {
    icon: 'ti-heart-handshake',
    title: 'Selo "Compre Local"',
    description: 'Identificação visual e benefícios diferenciados para lojas que apoiam o comércio da cidade.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-chart-arcs',
    title: 'Análise preditiva com inteligência artificial',
    description: 'Previsão de demanda, sugestão de mix de produtos, aviso de perda de cliente e oportunidades de venda combinada entre lojas.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-video',
    title: 'Sorteios ao vivo pela internet',
    description: 'Transmissão oficial dos sorteios pelo YouTube e Instagram, com confirmação pública dos números sorteados.',
    tag: 'pronto',
  },
  {
    icon: 'ti-star',
    title: 'Pesquisa de satisfação após a compra',
    description: 'O cliente recebe automaticamente uma pesquisa rápida após cada compra. Resultado consolidado por loja e categoria.',
    tag: 'em-testes',
  },
  {
    icon: 'ti-trophy',
    title: 'Conquistas e prêmios para clientes',
    description: 'Distintivos, lista de clientes mais engajados, missões temáticas e recompensas exclusivas para quem compra no comércio local.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-calendar-event',
    title: 'Agenda de eventos do comércio',
    description: 'Liquidações, feiras, datas especiais e eventos culturais da cidade — tudo em um único calendário compartilhado com clientes e lojas.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-id-badge-2',
    title: 'Validação automática de CPF e CNPJ',
    description: 'Confirmação dos dados do cliente e da loja diretamente com fontes oficiais, sem precisar cadastrar duas vezes.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-truck-delivery',
    title: 'Rede de motoboys da cidade',
    description: 'As lojas credenciadas compartilham uma rede única de entrega em Itabira, com preço já combinado por bairro.',
    tag: 'em-breve',
  },
  {
    icon: 'ti-camera',
    title: 'Contagem de visitantes por câmera',
    description: 'Contagem anônima do fluxo de pessoas em vitrines e ruas comerciais, sem coletar nenhum dado pessoal.',
    tag: 'em-breve',
  },
];

function FeaturesSection() {
  return (
    <section className="relative z-10 mt-20 sm:mt-28 max-w-6xl mx-auto w-full px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-blue-100/80 text-[11px] uppercase font-black tracking-widest mb-4">
          <i className="ti ti-sparkles text-[#FFC72C]"></i> Próximas funcionalidades
        </div>
        <h2 className="font-title text-3xl sm:text-4xl font-black text-white tracking-tight">
          Tudo que o Itaplan{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC72C] to-[#F5B800]">
            pode fazer pelo seu comércio
          </span>
        </h2>
        <p className="text-blue-100/70 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          Funcionalidades já disponíveis, em testes e planejadas — pensadas especificamente para
          a realidade do varejo de Itabira e região.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, idx) => (
          <FeatureCard key={idx} feature={f} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-blue-100/60 font-bold">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0F8B58]"></span> Pronto
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FFC72C]"></span> Em testes
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#9BB8F2]"></span> Em breve
        </span>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof FEATURES[number] }) {
  const tagMap = {
    'pronto':    { color: '#0F8B58', label: 'Pronto',    bg: 'rgba(15,139,88,0.15)'  },
    'em-testes': { color: '#FFC72C', label: 'Em testes', bg: 'rgba(255,199,44,0.12)' },
    'em-breve':  { color: '#9BB8F2', label: 'Em breve',  bg: 'rgba(30,91,207,0.12)'  },
  } as const;
  const tag = tagMap[feature.tag];
  return (
    <div className="group bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#FFC72C]/40 hover:bg-white/[0.08] rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl bg-[#0A2A6E] border border-white/10 text-[#FFC72C] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
          <i className={`ti ${feature.icon}`}></i>
        </div>
        <span
          className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full border"
          style={{ color: tag.color, background: tag.bg, borderColor: tag.bg }}
        >
          {tag.label}
        </span>
      </div>
      <h3 className="font-title font-black text-white text-base leading-tight">{feature.title}</h3>
      <p className="text-[12px] text-blue-100/70 mt-2 leading-relaxed">{feature.description}</p>
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
