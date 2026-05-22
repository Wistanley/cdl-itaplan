import React, { useState, useMemo } from 'react';
import type {
  Portal,
  AdminTab,
  Campaign,
  Store,
  ClientRecent,
  Comunicado,
  Documento,
  ComunicadoTipo,
  ComunicadoPrioridade,
} from '../types';
import {
  EMISSIONS_DAILY_CHART,
  DEMOGRAPHIC_AGES,
  DEMOGRAPHIC_GENDER,
  NEIGHBORHOODS,
  SEGMENT_SHARES,
  FLUXO_DIARIO_CHART,
} from '../data';
import { formatCurrency, formatCompactBRL, formatNumber, formatDateBR, initials } from '../utils';
import { Badge, StatCard, Card, ItaplanLogo, Progress, EmptyState, SectionHeader } from '../components/ui';

interface AdminProps {
  setPortal: (p: Portal) => void;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  activeCampaign: Campaign;
  stores: Store[];
  setStores: React.Dispatch<React.SetStateAction<Store[]>>;
  clientsRecent: ClientRecent[];
  comunicados: Comunicado[];
  setComunicados: React.Dispatch<React.SetStateAction<Comunicado[]>>;
  documentos: Documento[];
  totalCouponsEmitted: number;
  totalRegisteredClients: number;
}

const NAV_ITEMS: { tab: AdminTab; label: string; icon: string }[] = [
  { tab: 'dashboard',     label: 'Painel',            icon: 'ti-layout-dashboard' },
  { tab: 'campanhas',     label: 'Campanhas',         icon: 'ti-confetti' },
  { tab: 'lojas',         label: 'Lojas Parceiras',   icon: 'ti-building-store' },
  { tab: 'comunicados',   label: 'Comunicados',       icon: 'ti-mail-share' },
  { tab: 'documentos',    label: 'Documentos',        icon: 'ti-folder-cog' },
  { tab: 'insights',      label: 'Inteligência',      icon: 'ti-chart-pie' },
  { tab: 'configuracoes', label: 'Configurações',     icon: 'ti-settings' },
];

export default function Admin(props: AdminProps) {
  const [tab, setTab] = useState<AdminTab>('dashboard');

  return (
    <div
      id="portal-admin"
      className="relative bg-[#F6F8FC] min-h-screen text-[#0E1A33] flex flex-col animate-fade-in"
    >
      {/* Top header */}
      <header className="bg-white border-b border-[#DDE3EE] py-3 px-6 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ItaplanLogo size="md" />
            <div className="border-l border-[#DDE3EE] pl-3">
              <h2 className="font-title text-base font-black tracking-tight text-[#0E1A33]">
                Administração Itaplan
              </h2>
              <p className="text-[11px] text-[#4A5878] font-medium">
                Campanha em destaque: <strong>{props.activeCampaign.nome}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="green">
              <span className="w-1.5 h-1.5 bg-[#0F8B58] rounded-full animate-pulse"></span>
              Sistema online
            </Badge>
            <Badge color="gold">
              <i className="ti ti-shield-check"></i> LGPD ativo
            </Badge>
            <div className="hidden md:flex items-center gap-2 ml-2 pl-2 border-l border-[#DDE3EE]">
              <div className="w-8 h-8 rounded-full bg-[#0A2A6E] text-[#FFC72C] flex items-center justify-center text-xs font-black">
                MV
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-[#0E1A33] leading-tight">Mariana V.</p>
                <p className="text-[10px] text-[#8893AE] leading-tight">Coordenadora</p>
              </div>
            </div>
            <button
              id="btn-admin-logout"
              onClick={() => props.setPortal('landing')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#4A5878] hover:text-[#0E1A33] bg-[#F6F8FC] hover:bg-[#EEF2F8] rounded-xl transition-colors border border-[#DDE3EE]"
            >
              <i className="ti ti-logout"></i> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1500px] w-full mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[240px] bg-white border-b md:border-b-0 md:border-r border-[#DDE3EE] p-3 md:p-4 flex flex-col gap-4 md:gap-8 md:min-h-[calc(100vh-69px)]">
          <div className="flex md:flex-col md:space-y-1 gap-1 overflow-x-auto md:overflow-visible -mx-3 md:mx-0 px-3 md:px-0 scrollbar-thin">
            <p className="hidden md:block text-[10px] font-black uppercase text-[#8893AE] tracking-widest px-3 mb-3">
              Menu principal
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = tab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`sidebar-tab-${item.tab}`}
                  onClick={() => setTab(item.tab)}
                  className={`flex-shrink-0 md:w-full text-left px-3 md:px-3.5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm flex items-center gap-2 md:gap-2.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0A2A6E] text-white font-bold shadow-md'
                      : 'text-[#4A5878] font-semibold hover:bg-[#EEF4FE] hover:text-[#0A2A6E]'
                  }`}
                >
                  <i
                    className={`ti ${item.icon} text-base md:text-lg ${
                      isActive ? 'text-[#FFC72C]' : 'text-[#8893AE]'
                    }`}
                  ></i>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Countdown card */}
          <div className="hidden md:block bg-gradient-to-br from-[#0A2A6E] to-[#103A8C] text-white rounded-2xl p-4 text-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#FFC72C]/15"></div>
            <p className="text-[10px] font-black uppercase text-[#FFC72C] tracking-wider relative">
              Tempo restante
            </p>
            <div className="font-title text-3xl font-black text-white mt-1 tracking-tight relative">
              {diasRestantes(props.activeCampaign.fim)} dias
            </div>
            <div className="h-[1px] bg-white/15 my-2 relative"></div>
            <p className="text-[10px] text-blue-100/70 font-semibold leading-tight relative">
              Sorteio em<br />
              <span className="font-bold text-[#FFC72C] block mt-0.5">{formatDateBR(props.activeCampaign.sorteio)}</span>
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 space-y-8">
          {tab === 'dashboard' && <DashboardTab {...props} />}
          {tab === 'campanhas' && <CampanhasTab campaigns={props.campaigns} setCampaigns={props.setCampaigns} />}
          {tab === 'lojas' && <LojasTab stores={props.stores} setStores={props.setStores} />}
          {tab === 'comunicados' && <ComunicadosTab comunicados={props.comunicados} setComunicados={props.setComunicados} />}
          {tab === 'documentos' && <DocumentosTab documentos={props.documentos} />}
          {tab === 'insights' && <InsightsTab />}
          {tab === 'configuracoes' && <ConfiguracoesTab />}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// HELPERS
// ==========================================
function diasRestantes(fimIso: string): number {
  const today = new Date();
  const fim = new Date(fimIso);
  const diff = Math.ceil((fim.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

// ==========================================
// TAB: DASHBOARD
// ==========================================
function DashboardTab(props: AdminProps) {
  const ativasCount = props.campaigns.filter((c) => c.status === 'ativa').length;
  const planejadasCount = props.campaigns.filter((c) => c.status === 'planejada' || c.status === 'rascunho').length;

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title="Visão consolidada"
        subtitle="Indicadores em tempo real do comércio itabirano e da campanha ativa."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          id="stat-cupons-emitidos"
          icon="ti-ticket"
          label="Cupons emitidos"
          value={formatNumber(props.totalCouponsEmitted)}
          sub={`Meta: ${formatNumber(props.activeCampaign.cuponsMeta)}`}
          trend={{ value: '+12%', up: true }}
          color="gold"
        />
        <StatCard
          id="stat-lojas-ativas"
          icon="ti-building-store"
          label="Lojas ativas"
          value={props.stores.length}
          sub={`Engajamento médio: 81%`}
          trend={{ value: '+2', up: true }}
          color="blue"
        />
        <StatCard
          id="stat-clientes"
          icon="ti-users-group"
          label="Clientes cadastrados"
          value={formatNumber(props.totalRegisteredClients)}
          sub="Consumidores únicos por CPF"
          trend={{ value: '+8%', up: true }}
          color="navy"
        />
        <StatCard
          id="stat-campanhas"
          icon="ti-confetti"
          label="Campanhas"
          value={`${ativasCount}+${planejadasCount}`}
          sub={`${ativasCount} ativa · ${planejadasCount} planejadas`}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active campaign hero */}
        <Card className="lg:col-span-2 itp-gradient-primary text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FFC72C]/10"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#1E5BCF]/20"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Badge color="gold" className="!bg-[#FFC72C] !text-[#0E1A33] !border-transparent">
                <i className="ti ti-flame"></i> Campanha em destaque
              </Badge>
              <span className="text-[11px] text-blue-100/70">
                {formatDateBR(props.activeCampaign.inicio)} → {formatDateBR(props.activeCampaign.fim)}
              </span>
            </div>
            <h3 className="font-title text-3xl font-black tracking-tight">{props.activeCampaign.nome}</h3>
            <p className="text-sm text-blue-100/80 mt-1">{props.activeCampaign.regra} · {props.activeCampaign.premiosDescricao}</p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Cupons</p>
                <p className="font-title text-2xl font-black mt-1">{formatNumber(props.totalCouponsEmitted)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Lojas</p>
                <p className="font-title text-2xl font-black mt-1">{props.activeCampaign.lojasParticipantes}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Prêmios</p>
                <p className="font-title text-2xl font-black mt-1">{props.activeCampaign.premios}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[11px] text-blue-100/70 mb-1">
                <span>Progresso da meta</span>
                <span className="font-bold text-[#FFC72C]">
                  {Math.round((props.totalCouponsEmitted / props.activeCampaign.cuponsMeta) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full itp-gradient-gold rounded-full"
                  style={{
                    width: `${Math.min(100, (props.totalCouponsEmitted / props.activeCampaign.cuponsMeta) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-4">Ações rápidas</h4>
          <div className="space-y-2">
            <QuickAction icon="ti-confetti" title="Nova campanha" subtitle="Mães, Pais, Natal..." />
            <QuickAction icon="ti-mail-share" title="Enviar comunicado" subtitle="Memo, alerta ou evento" />
            <QuickAction icon="ti-upload" title="Publicar documento" subtitle="Relatórios e contratos" />
            <QuickAction icon="ti-building-store" title="Cadastrar loja" subtitle="Nova parceria" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top sellers */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-title text-lg font-black text-[#0E1A33]">Lojas em destaque</h3>
              <p className="text-xs text-[#4A5878] mt-0.5">Top emissores ordenados por cupons gerados.</p>
            </div>
            <Badge color="blue">Destaques Itaplan</Badge>
          </div>
          <div className="space-y-5">
            {props.stores
              .slice()
              .sort((a, b) => b.cuponsEmitidos - a.cuponsEmitidos)
              .slice(0, 4)
              .map((store, idx) => {
                const percent = Math.min(100, Math.round((store.cuponsEmitidos / store.meta) * 100));
                const metMeta = store.cuponsEmitidos >= store.meta;
                return (
                  <div key={store.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-md text-[11px] font-black flex items-center justify-center ${
                            idx === 0
                              ? 'bg-[#FFC72C] text-[#0E1A33]'
                              : 'bg-[#EEF2F8] text-[#4A5878] border border-[#DDE3EE]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-bold text-[#0E1A33]">{store.nome}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-xs">
                        <span className="text-[#0E1A33] font-bold">{store.cuponsEmitidos}</span>
                        <span className="text-[#8893AE]">/ {store.meta}</span>
                      </div>
                    </div>
                    <Progress value={percent} color={metMeta ? 'green' : 'gold'} />
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#8893AE]">{store.responsavel} · {store.bairro}</span>
                      <span className={`font-bold uppercase tracking-wider ${metMeta ? 'text-[#0F8B58]' : 'text-[#C58A07]'}`}>
                        {percent}% {metMeta && '✓'}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Recent activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-title text-lg font-black text-[#0E1A33]">Últimas emissões</h3>
              <p className="text-xs text-[#4A5878] mt-0.5">Transações registradas em tempo real.</p>
            </div>
            <i className="ti ti-activity-heartbeat text-lg text-[#1E5BCF] animate-pulse"></i>
          </div>
          <div className="space-y-3">
            {props.clientsRecent.slice(0, 4).map((client, idx) => {
              const palette = [
                'bg-[#DCE7FA] text-[#103A8C]',
                'bg-[#FFF8DD] text-[#8A6204]',
                'bg-[#DEF5EA] text-[#0F8B58]',
                'bg-[#FDE7E7] text-[#B42A2A]',
              ];
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F8FC] border border-transparent hover:border-[#DDE3EE] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${palette[idx % palette.length]}`}
                    >
                      {initials(client.nome)}
                    </div>
                    <div>
                      <p className="font-bold text-[#0E1A33] text-sm">{client.nome}</p>
                      <p className="text-[11px] text-[#8893AE] font-medium">CPF: {client.cpf}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge color="gold">
                      <i className="ti ti-ticket"></i>
                      {client.cupons} {client.cupons === 1 ? 'cupom' : 'cupons'}
                    </Badge>
                    <p className="text-[10px] text-[#8893AE] mt-1 font-medium">{client.tempo}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#F6F8FC] hover:bg-[#EEF4FE] border border-[#DDE3EE] hover:border-[#1E5BCF]/30 transition-all text-left cursor-pointer group">
      <div className="w-9 h-9 rounded-lg bg-white border border-[#DDE3EE] text-[#1E5BCF] flex items-center justify-center group-hover:bg-[#1E5BCF] group-hover:text-white transition-colors">
        <i className={`ti ${icon}`}></i>
      </div>
      <div className="flex-1">
        <p className="font-bold text-[#0E1A33] text-sm">{title}</p>
        <p className="text-[11px] text-[#8893AE] font-medium">{subtitle}</p>
      </div>
      <i className="ti ti-arrow-right text-[#8893AE] group-hover:text-[#1E5BCF]"></i>
    </button>
  );
}

// ==========================================
// TAB: CAMPANHAS
// ==========================================
function CampanhasTab({
  campaigns,
  setCampaigns,
}: {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<'todas' | 'ativa' | 'planejada' | 'encerrada'>('todas');
  const [form, setForm] = useState({
    nome: '',
    tema: 'natal' as Campaign['tema'],
    inicio: '',
    fim: '',
    sorteio: '',
    regraValor: 50,
    cuponsMeta: 3000,
    premios: 3,
    premiosDescricao: '',
  });

  const filtered = filter === 'todas' ? campaigns : campaigns.filter((c) => c.status === filter);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.inicio || !form.fim) return;
    const newId = Math.max(0, ...campaigns.map((c) => c.id)) + 1;
    const newCampaign: Campaign = {
      id: newId,
      nome: form.nome,
      tema: form.tema,
      status: 'rascunho',
      inicio: form.inicio,
      fim: form.fim,
      sorteio: form.sorteio || form.fim,
      regra: `R$ ${form.regraValor.toFixed(2).replace('.', ',')} = 1 número da sorte`,
      regraValor: form.regraValor,
      totalCupons: 0,
      cuponsMeta: form.cuponsMeta,
      premios: form.premios,
      premiosDescricao: form.premiosDescricao || 'A definir',
      lojasParticipantes: 0,
      icone: themeIcon(form.tema),
      corPrimaria: '#0A2A6E',
      corSecundaria: '#FFC72C',
    };
    setCampaigns([newCampaign, ...campaigns]);
    setModalOpen(false);
    setForm({
      nome: '',
      tema: 'natal',
      inicio: '',
      fim: '',
      sorteio: '',
      regraValor: 50,
      cuponsMeta: 3000,
      premios: 3,
      premiosDescricao: '',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Gestão de campanhas"
        subtitle="Crie, agende e acompanhe múltiplas campanhas — Mães, Pais, Natal e datas comemorativas."
        action={
          <button
            id="btn-new-campaign"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 itp-gradient-primary text-white font-bold text-sm rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95"
          >
            <i className="ti ti-plus"></i> Nova campanha
          </button>
        }
      />

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['todas', 'ativa', 'planejada', 'encerrada'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f
                ? 'bg-[#0A2A6E] text-white shadow-md'
                : 'bg-white text-[#4A5878] border border-[#DDE3EE] hover:border-[#1E5BCF]/40'
            }`}
          >
            {f === 'todas' ? 'Todas' : f === 'ativa' ? 'Ativas' : f === 'planejada' ? 'Planejadas' : 'Encerradas'}
            <span
              className={`ml-2 text-[10px] ${
                filter === f ? 'text-[#FFC72C]' : 'text-[#8893AE]'
              }`}
            >
              {f === 'todas'
                ? campaigns.length
                : campaigns.filter((c) => c.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <EmptyState
            icon="ti-confetti-off"
            title="Nenhuma campanha neste filtro"
            description="Selecione outro filtro ou crie uma nova campanha para esta categoria."
          />
        </Card>
      )}

      {/* New campaign modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#06163A]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-fast">
          <div className="bg-white rounded-2xl border border-[#DDE3EE] p-6 max-w-lg w-full shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DDE3EE]">
              <div>
                <h3 className="font-title text-xl font-black text-[#0E1A33]">Nova campanha</h3>
                <p className="text-xs text-[#4A5878] mt-0.5">Inicia como rascunho — você pode ativar depois.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[#FDE7E7] hover:text-[#B42A2A] flex items-center justify-center text-[#8893AE]"
              >
                <i className="ti ti-x text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <FormField label="Nome da campanha *">
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="Ex: Dia das Mães 2026"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </FormField>

              <FormField label="Tema *">
                <select
                  className="form-input"
                  value={form.tema}
                  onChange={(e) => setForm({ ...form, tema: e.target.value as Campaign['tema'] })}
                >
                  <option value="natal">🎄 Natal</option>
                  <option value="maes">🌷 Dia das Mães</option>
                  <option value="pais">👔 Dia dos Pais</option>
                  <option value="criancas">🎈 Dia das Crianças</option>
                  <option value="namorados">❤️ Dia dos Namorados</option>
                  <option value="volta-aulas">🎒 Volta às Aulas</option>
                  <option value="inverno">❄️ Festival de Inverno</option>
                  <option value="aniversario">🎂 Aniversário de Itabira</option>
                </select>
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Início *">
                  <input
                    required
                    type="date"
                    className="form-input"
                    value={form.inicio}
                    onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                  />
                </FormField>
                <FormField label="Fim *">
                  <input
                    required
                    type="date"
                    className="form-input"
                    value={form.fim}
                    onChange={(e) => setForm({ ...form, fim: e.target.value })}
                  />
                </FormField>
              </div>

              <FormField label="Data do sorteio">
                <input
                  type="date"
                  className="form-input"
                  value={form.sorteio}
                  onChange={(e) => setForm({ ...form, sorteio: e.target.value })}
                />
              </FormField>

              <div className="grid grid-cols-3 gap-3">
                <FormField label="R$ por cupom">
                  <input
                    type="number"
                    min={10}
                    className="form-input"
                    value={form.regraValor}
                    onChange={(e) => setForm({ ...form, regraValor: Number(e.target.value) })}
                  />
                </FormField>
                <FormField label="Meta de cupons">
                  <input
                    type="number"
                    min={100}
                    className="form-input"
                    value={form.cuponsMeta}
                    onChange={(e) => setForm({ ...form, cuponsMeta: Number(e.target.value) })}
                  />
                </FormField>
                <FormField label="Prêmios">
                  <input
                    type="number"
                    min={1}
                    className="form-input"
                    value={form.premios}
                    onChange={(e) => setForm({ ...form, premios: Number(e.target.value) })}
                  />
                </FormField>
              </div>

              <FormField label="Descrição dos prêmios">
                <textarea
                  rows={2}
                  className="form-input"
                  placeholder="Ex: 1 carro 0km, 2 vales-compra de R$ 5.000"
                  value={form.premiosDescricao}
                  onChange={(e) => setForm({ ...form, premiosDescricao: e.target.value })}
                />
              </FormField>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-[#4A5878] bg-[#F6F8FC] hover:bg-[#EEF2F8] rounded-xl border border-[#DDE3EE] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white itp-gradient-primary hover:brightness-110 rounded-xl shadow-md transition-all"
                >
                  Criar rascunho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .form-input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 600;
          background-color: #F6F8FC;
          border: 1px solid #DDE3EE;
          border-radius: 12px;
          color: #0E1A33;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus { border-color: #1E5BCF; }
      `}</style>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function themeIcon(tema: Campaign['tema']): string {
  return (
    {
      natal: 'ti-christmas-tree',
      maes: 'ti-flower',
      pais: 'ti-mustache',
      criancas: 'ti-balloon',
      namorados: 'ti-heart',
      aniversario: 'ti-cake',
      'volta-aulas': 'ti-backpack',
      inverno: 'ti-snowflake',
    } as Record<Campaign['tema'], string>
  )[tema];
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusColor: Record<Campaign['status'], 'green' | 'blue' | 'gray' | 'gold'> = {
    ativa: 'green',
    planejada: 'blue',
    encerrada: 'gray',
    rascunho: 'gold',
  };
  const statusLabel: Record<Campaign['status'], string> = {
    ativa: 'Ativa',
    planejada: 'Planejada',
    encerrada: 'Encerrada',
    rascunho: 'Rascunho',
  };
  const percent = Math.min(100, Math.round((campaign.totalCupons / Math.max(1, campaign.cuponsMeta)) * 100));

  return (
    <div className="bg-white rounded-2xl border border-[#DDE3EE] hover:border-[#1E5BCF]/40 hover:shadow-lg transition-all overflow-hidden">
      <div
        className="h-2"
        style={{
          background: `linear-gradient(90deg, ${campaign.corPrimaria}, ${campaign.corSecundaria})`,
        }}
      ></div>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl"
              style={{ background: `linear-gradient(135deg, ${campaign.corPrimaria}, ${campaign.corSecundaria})` }}
            >
              <i className={`ti ${campaign.icone}`}></i>
            </div>
            <div>
              <h4 className="font-title font-black text-[#0E1A33] text-base leading-tight">{campaign.nome}</h4>
              <p className="text-[11px] text-[#8893AE] mt-0.5">
                {formatDateBR(campaign.inicio)} → {formatDateBR(campaign.fim)}
              </p>
            </div>
          </div>
          <Badge color={statusColor[campaign.status]}>{statusLabel[campaign.status]}</Badge>
        </div>

        <p className="text-xs text-[#4A5878] leading-relaxed">{campaign.regra} · {campaign.premiosDescricao}</p>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-[#8893AE] font-medium">Progresso</span>
            <span className="font-bold text-[#0E1A33]">
              {formatNumber(campaign.totalCupons)} / {formatNumber(campaign.cuponsMeta)}
            </span>
          </div>
          <Progress
            value={percent}
            color={campaign.status === 'ativa' ? 'gold' : campaign.status === 'encerrada' ? 'green' : 'blue'}
            size="sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EEF2F8] text-center">
          <Stat label="Lojas" value={campaign.lojasParticipantes} />
          <Stat label="Prêmios" value={campaign.premios} />
          <Stat label="Sorteio" value={formatDateBR(campaign.sorteio).slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-wider text-[#8893AE]">{label}</p>
      <p className="font-title text-base font-black text-[#0E1A33] mt-0.5">{value}</p>
    </div>
  );
}

// ==========================================
// TAB: LOJAS
// ==========================================
function LojasTab({
  stores,
  setStores,
}: {
  stores: Store[];
  setStores: React.Dispatch<React.SetStateAction<Store[]>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    responsavel: '',
    categoria: 'Vestuário',
    bairro: 'Centro',
    endereco: '',
    meta: 500,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.responsavel.trim()) return;
    const newId = Math.max(0, ...stores.map((s) => s.id)) + 1;
    setStores([
      ...stores,
      {
        id: newId,
        nome: form.nome,
        responsavel: form.responsavel,
        categoria: form.categoria,
        bairro: form.bairro,
        endereco: form.endereco || 'Endereço a confirmar',
        cuponsEmitidos: 0,
        vendasRegistradas: 0,
        meta: form.meta,
        ticketMedio: 0,
        engajamento: 0,
        faturamentoMes: 0,
        notasFiscais: 0,
      },
    ]);
    setForm({ nome: '', responsavel: '', categoria: 'Vestuário', bairro: 'Centro', endereco: '', meta: 500 });
    setModalOpen(false);
  };

  const totalFaturamento = stores.reduce((acc, s) => acc + s.faturamentoMes, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Lojas credenciadas em Itabira"
        subtitle={`${stores.length} comércios ativos · Faturamento agregado: ${formatCompactBRL(totalFaturamento)}/mês`}
        action={
          <button
            id="btn-add-store"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 itp-gradient-primary text-white font-bold text-sm rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95"
          >
            <i className="ti ti-plus"></i> Nova loja parceira
          </button>
        }
      />

      <Card padding="sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F6F8FC] border-b border-[#DDE3EE] text-[10px] font-black uppercase text-[#4A5878] tracking-wider">
                <th className="py-3 px-4">Loja</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Bairro / Endereço</th>
                <th className="py-3 px-4 text-right">Faturamento/mês</th>
                <th className="py-3 px-4 text-right">NFs</th>
                <th className="py-3 px-4 text-right">Cupons</th>
                <th className="py-3 px-4">Meta</th>
                <th className="py-3 px-4">Engajamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F8]">
              {stores.map((store) => {
                const percent = Math.min(100, Math.round((store.cuponsEmitidos / store.meta) * 100));
                const metMeta = store.cuponsEmitidos >= store.meta;
                return (
                  <tr key={store.id} className="text-sm hover:bg-[#F6F8FC] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0E1A33]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[#EEF4FE] text-[#103A8C] flex items-center justify-center text-xs font-black">
                          {initials(store.nome)}
                        </div>
                        <div>
                          <p>{store.nome}</p>
                          <p className="text-[10px] text-[#8893AE] font-medium">Loja #{String(store.id).padStart(3, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#4A5878]">{store.responsavel}</td>
                    <td className="py-3 px-4">
                      <Badge color="blue">{store.categoria}</Badge>
                    </td>
                    <td className="py-3 px-4 text-[#4A5878] text-xs">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#0E1A33]">{store.bairro}</span>
                        <span className="text-[10px] text-[#8893AE]">{store.endereco}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-right font-bold text-[#0E1A33]">
                      {formatCompactBRL(store.faturamentoMes)}
                    </td>
                    <td className="py-3 px-4 font-mono text-right text-[#4A5878]">{store.notasFiscais}</td>
                    <td className="py-3 px-4 font-mono text-right font-bold text-[#C58A07]">
                      {store.cuponsEmitidos}
                    </td>
                    <td className="py-3 px-4 min-w-[140px]">
                      <div className="space-y-1">
                        <Progress value={percent} color={metMeta ? 'green' : 'gold'} size="sm" />
                        <span className="text-[10px] text-[#4A5878] font-bold">
                          {percent}% de {store.meta}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            store.engajamento >= 85
                              ? 'bg-[#0F8B58]'
                              : store.engajamento >= 70
                              ? 'bg-[#F5B800]'
                              : 'bg-[#B42A2A]'
                          }`}
                        ></span>
                        <span className="text-xs font-bold text-[#0E1A33]">{store.engajamento}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 bg-[#06163A]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-fast">
          <div className="bg-white rounded-2xl border border-[#DDE3EE] p-6 max-w-md w-full shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DDE3EE]">
              <h3 className="font-title text-xl font-black text-[#0E1A33]">Cadastrar loja parceira</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[#FDE7E7] hover:text-[#B42A2A] flex items-center justify-center text-[#8893AE]"
              >
                <i className="ti ti-x text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <FormField label="Nome da loja *">
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="Ex: Farmácia do Povo"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </FormField>
              <FormField label="Responsável *">
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="Ex: Paula de Souza"
                  value={form.responsavel}
                  onChange={(e) => setForm({ ...form, responsavel: e.target.value })}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Categoria">
                  <select
                    className="form-input"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  >
                    <option>Vestuário</option>
                    <option>Alimentação</option>
                    <option>Saúde</option>
                    <option>Eletrônicos</option>
                    <option>Beleza</option>
                    <option>Casa</option>
                    <option>Serviços</option>
                  </select>
                </FormField>
                <FormField label="Bairro">
                  <select
                    className="form-input"
                    value={form.bairro}
                    onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                  >
                    <option>Centro</option>
                    <option>Pedreira</option>
                    <option>Esplanada</option>
                    <option>Bom Jesus</option>
                    <option>Major Lage</option>
                    <option>Areão</option>
                    <option>Outros</option>
                  </select>
                </FormField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Endereço">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Rua, número"
                    value={form.endereco}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                  />
                </FormField>
                <FormField label="Meta de cupons">
                  <input
                    type="number"
                    min={10}
                    className="form-input"
                    value={form.meta}
                    onChange={(e) => setForm({ ...form, meta: Math.max(10, Number(e.target.value)) })}
                  />
                </FormField>
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-[#4A5878] bg-[#F6F8FC] hover:bg-[#EEF2F8] rounded-xl border border-[#DDE3EE]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white itp-gradient-primary hover:brightness-110 rounded-xl shadow-md"
                >
                  Homologar loja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .form-input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 600;
          background-color: #F6F8FC;
          border: 1px solid #DDE3EE;
          border-radius: 12px;
          color: #0E1A33;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus { border-color: #1E5BCF; }
      `}</style>
    </div>
  );
}

// ==========================================
// TAB: COMUNICADOS
// ==========================================
function ComunicadosTab({
  comunicados,
  setComunicados,
}: {
  comunicados: Comunicado[];
  setComunicados: React.Dispatch<React.SetStateAction<Comunicado[]>>;
}) {
  const [composeOpen, setComposeOpen] = useState(false);
  const [selected, setSelected] = useState<Comunicado | null>(comunicados[0] ?? null);
  const [tipoFilter, setTipoFilter] = useState<'todos' | ComunicadoTipo>('todos');
  const [form, setForm] = useState({
    tipo: 'comunicado' as ComunicadoTipo,
    prioridade: 'media' as ComunicadoPrioridade,
    titulo: '',
    resumo: '',
    conteudo: '',
  });

  const filtered = tipoFilter === 'todos' ? comunicados : comunicados.filter((c) => c.tipo === tipoFilter);
  const unreadCount = comunicados.filter((c) => !c.lido).length;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(0, ...comunicados.map((c) => c.id)) + 1;
    const newCom: Comunicado = {
      id: newId,
      tipo: form.tipo,
      prioridade: form.prioridade,
      titulo: form.titulo,
      resumo: form.resumo || form.conteudo.slice(0, 100),
      conteudo: form.conteudo,
      remetente: 'Mariana Vasconcelos',
      cargo: 'Coordenação Itaplan',
      data: new Date().toISOString().slice(0, 10),
      lido: true,
      destinatarios: 'todas-lojas',
    };
    setComunicados([newCom, ...comunicados]);
    setSelected(newCom);
    setComposeOpen(false);
    setForm({ tipo: 'comunicado', prioridade: 'media', titulo: '', resumo: '', conteudo: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Comunicados oficiais"
        subtitle={`Memorandos, alertas e eventos enviados para as lojas parceiras · ${unreadCount} não lidos`}
        action={
          <button
            id="btn-compose"
            onClick={() => setComposeOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 itp-gradient-primary text-white font-bold text-sm rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95"
          >
            <i className="ti ti-mail-share"></i> Novo comunicado
          </button>
        }
      />

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {(['todos', 'memorando', 'alerta', 'comunicado', 'evento'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTipoFilter(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              tipoFilter === t
                ? 'bg-[#0A2A6E] text-white shadow-md'
                : 'bg-white text-[#4A5878] border border-[#DDE3EE] hover:border-[#1E5BCF]/40'
            }`}
          >
            {t === 'todos' ? 'Todos' : t.charAt(0).toUpperCase() + t.slice(1) + 's'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* List */}
        <div className="lg:col-span-2 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selected?.id === c.id
                  ? 'bg-[#EEF4FE] border-[#1E5BCF]/30 shadow-sm'
                  : 'bg-white border-[#DDE3EE] hover:border-[#1E5BCF]/30'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ComunicadoTipoIcon tipo={c.tipo} />
                  {!c.lido && <span className="w-2 h-2 rounded-full bg-[#1E5BCF]"></span>}
                </div>
                <span className="text-[10px] text-[#8893AE] font-medium">{formatDateBR(c.data)}</span>
              </div>
              <h4 className={`text-[13px] font-bold text-[#0E1A33] leading-snug ${!c.lido ? 'font-black' : ''}`}>
                {c.titulo}
              </h4>
              <p className="text-[11px] text-[#4A5878] mt-1 line-clamp-2">{c.resumo}</p>
              <div className="flex items-center gap-2 mt-2">
                <PrioridadeBadge p={c.prioridade} />
                <span className="text-[10px] text-[#8893AE]">{c.remetente}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#EEF2F8]">
                <div className="flex items-start gap-3">
                  <ComunicadoTipoIcon tipo={selected.tipo} large />
                  <div>
                    <h3 className="font-title text-xl font-black text-[#0E1A33] leading-tight">
                      {selected.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#4A5878]">
                      <span className="font-bold">{selected.remetente}</span>
                      <span className="text-[#DDE3EE]">·</span>
                      <span>{selected.cargo}</span>
                      <span className="text-[#DDE3EE]">·</span>
                      <span>{formatDateBR(selected.data)}</span>
                    </div>
                  </div>
                </div>
                <PrioridadeBadge p={selected.prioridade} />
              </div>

              <p className="text-sm text-[#0E1A33] leading-relaxed whitespace-pre-line">
                {selected.conteudo}
              </p>

              {selected.anexo && (
                <div className="mt-5 p-3 bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#B42A2A]/10 text-[#B42A2A] flex items-center justify-center">
                    <i className="ti ti-file-text text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0E1A33]">{selected.anexo}</p>
                    <p className="text-[11px] text-[#8893AE]">Anexo do comunicado</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#0A2A6E] hover:bg-[#103A8C] text-white text-xs font-bold rounded-lg transition-colors">
                    <i className="ti ti-download"></i> Baixar
                  </button>
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-[#EEF2F8] flex items-center justify-between text-xs">
                <span className="text-[#8893AE]">
                  <i className="ti ti-users mr-1"></i>
                  Enviado para: <strong className="text-[#0E1A33]">
                    {selected.destinatarios === 'todas-lojas' ? 'Todas as lojas' : selected.destinatarios}
                  </strong>
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-[#F6F8FC] hover:bg-[#EEF2F8] text-[#4A5878] font-bold rounded-lg border border-[#DDE3EE]">
                    <i className="ti ti-reply"></i> Encaminhar
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <EmptyState
                icon="ti-mail-opened"
                title="Selecione um comunicado"
                description="Escolha um item na lista ao lado para visualizar o conteúdo completo."
              />
            </Card>
          )}
        </div>
      </div>

      {/* Compose modal */}
      {composeOpen && (
        <div className="fixed inset-0 bg-[#06163A]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-fast">
          <div className="bg-white rounded-2xl border border-[#DDE3EE] p-6 max-w-2xl w-full shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DDE3EE]">
              <div>
                <h3 className="font-title text-xl font-black text-[#0E1A33]">Novo comunicado</h3>
                <p className="text-xs text-[#4A5878] mt-0.5">Será enviado para todas as lojas parceiras.</p>
              </div>
              <button
                onClick={() => setComposeOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[#FDE7E7] hover:text-[#B42A2A] flex items-center justify-center text-[#8893AE]"
              >
                <i className="ti ti-x text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSend} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Tipo">
                  <select
                    className="form-input"
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value as ComunicadoTipo })}
                  >
                    <option value="memorando">📋 Memorando</option>
                    <option value="alerta">⚠️ Alerta</option>
                    <option value="comunicado">📢 Comunicado</option>
                    <option value="evento">🎪 Evento</option>
                  </select>
                </FormField>
                <FormField label="Prioridade">
                  <select
                    className="form-input"
                    value={form.prioridade}
                    onChange={(e) => setForm({ ...form, prioridade: e.target.value as ComunicadoPrioridade })}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </FormField>
              </div>
              <FormField label="Título *">
                <input
                  required
                  type="text"
                  className="form-input"
                  placeholder="Ex: MEMO 043/2025 — Ajuste de funcionamento"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                />
              </FormField>
              <FormField label="Resumo (chamada)">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Uma frase que aparece no preview da lista"
                  value={form.resumo}
                  onChange={(e) => setForm({ ...form, resumo: e.target.value })}
                />
              </FormField>
              <FormField label="Conteúdo *">
                <textarea
                  required
                  rows={6}
                  className="form-input"
                  placeholder="Escreva o conteúdo completo do comunicado..."
                  value={form.conteudo}
                  onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                />
              </FormField>
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setComposeOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-[#4A5878] bg-[#F6F8FC] hover:bg-[#EEF2F8] rounded-xl border border-[#DDE3EE]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white itp-gradient-primary hover:brightness-110 rounded-xl shadow-md inline-flex items-center justify-center gap-2"
                >
                  <i className="ti ti-send"></i> Enviar para todas as lojas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .form-input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 600;
          background-color: #F6F8FC;
          border: 1px solid #DDE3EE;
          border-radius: 12px;
          color: #0E1A33;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-input:focus { border-color: #1E5BCF; }
        textarea.form-input { resize: vertical; min-height: 80px; font-family: inherit; line-height: 1.5; }
      `}</style>
    </div>
  );
}

function ComunicadoTipoIcon({ tipo, large }: { tipo: ComunicadoTipo; large?: boolean }) {
  const map: Record<ComunicadoTipo, { icon: string; bg: string; color: string; label: string }> = {
    memorando:  { icon: 'ti-clipboard-text', bg: 'bg-[#DCE7FA]', color: 'text-[#103A8C]', label: 'Memorando' },
    alerta:     { icon: 'ti-alert-triangle', bg: 'bg-[#FDE7E7]', color: 'text-[#B42A2A]', label: 'Alerta' },
    comunicado: { icon: 'ti-speakerphone',   bg: 'bg-[#FFF8DD]', color: 'text-[#8A6204]', label: 'Comunicado' },
    evento:     { icon: 'ti-calendar-event', bg: 'bg-[#DEF5EA]', color: 'text-[#0F8B58]', label: 'Evento' },
  };
  const cfg = map[tipo];
  if (large) {
    return (
      <div className={`w-12 h-12 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center text-xl`}>
        <i className={`ti ${cfg.icon}`}></i>
      </div>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${cfg.bg} ${cfg.color} text-[10px] font-black uppercase tracking-wider`}>
      <i className={`ti ${cfg.icon} text-xs`}></i> {cfg.label}
    </span>
  );
}

function PrioridadeBadge({ p }: { p: ComunicadoPrioridade }) {
  const map = {
    alta:  { color: 'red' as const, label: 'Alta' },
    media: { color: 'gold' as const, label: 'Média' },
    baixa: { color: 'gray' as const, label: 'Baixa' },
  };
  return <Badge color={map[p].color}>{map[p].label}</Badge>;
}

// ==========================================
// TAB: DOCUMENTOS
// ==========================================
function DocumentosTab({ documentos }: { documentos: Documento[] }) {
  const [filter, setFilter] = useState<'todos' | 'confidencial' | 'publico'>('todos');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');

  const filtered = documentos.filter((d) => {
    if (filter === 'confidencial' && !d.confidencial) return false;
    if (filter === 'publico' && d.confidencial) return false;
    if (tipoFilter !== 'todos' && d.tipo !== tipoFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Documentos & relatórios"
        subtitle="Repositório seguro de relatórios financeiros, contratos e regulamentos com controle de acesso."
        action={
          <button className="inline-flex items-center gap-2 px-5 py-2.5 itp-gradient-primary text-white font-bold text-sm rounded-xl shadow-md hover:brightness-110 active:scale-95">
            <i className="ti ti-upload"></i> Publicar documento
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon="ti-file-stack" label="Documentos" value={documentos.length} color="blue" />
        <StatCard
          icon="ti-lock"
          label="Confidenciais"
          value={documentos.filter((d) => d.confidencial).length}
          sub="Acesso restrito"
          color="red"
        />
        <StatCard
          icon="ti-eye"
          label="Acessos na semana"
          value={documentos.reduce((acc, d) => acc + d.acessosSemana, 0)}
          sub="Auditados em log"
          color="gold"
        />
        <StatCard
          icon="ti-shield-check"
          label="Conformidade"
          value="100%"
          sub="Auditoria LGPD válida"
          color="green"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[11px] font-black uppercase text-[#8893AE] tracking-wider mr-1">Filtrar:</span>
        {(['todos', 'confidencial', 'publico'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${
              filter === f
                ? 'bg-[#0A2A6E] text-white shadow-md'
                : 'bg-white text-[#4A5878] border border-[#DDE3EE]'
            }`}
          >
            {f === 'todos' ? 'Todos' : f === 'confidencial' ? '🔒 Confidenciais' : '🌐 Públicos'}
          </button>
        ))}
        <span className="text-[#DDE3EE] mx-1">|</span>
        <select
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-[#DDE3EE] text-[#4A5878] outline-none"
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
        >
          <option value="todos">Todos os tipos</option>
          <option value="relatorio-financeiro">Relatórios Financeiros</option>
          <option value="regulamento">Regulamentos</option>
          <option value="contrato">Contratos</option>
          <option value="manual">Manuais</option>
          <option value="apresentacao">Apresentações</option>
          <option value="auditoria">Auditorias</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <DocumentoCard key={doc.id} doc={doc} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <EmptyState icon="ti-folder-off" title="Nenhum documento" description="Tente ajustar os filtros." />
        </Card>
      )}
    </div>
  );
}

function DocumentoCard({ doc }: { doc: Documento }) {
  const formatColor: Record<Documento['formato'], { bg: string; color: string }> = {
    pdf:  { bg: 'bg-[#FDE7E7]', color: 'text-[#B42A2A]' },
    xlsx: { bg: 'bg-[#DEF5EA]', color: 'text-[#0F8B58]' },
    docx: { bg: 'bg-[#DCE7FA]', color: 'text-[#103A8C]' },
    pptx: { bg: 'bg-[#FFE2C2]', color: 'text-[#A05608]' },
  };
  const fc = formatColor[doc.formato];
  return (
    <div className="bg-white rounded-2xl border border-[#DDE3EE] hover:border-[#1E5BCF]/30 hover:shadow-md p-5 transition-all flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-12 h-14 rounded-lg ${fc.bg} ${fc.color} flex items-center justify-center text-[10px] font-black uppercase`}>
          {doc.formato}
        </div>
        {doc.confidencial && (
          <Badge color="red">
            <i className="ti ti-lock"></i> Confidencial
          </Badge>
        )}
      </div>
      <div>
        <h4 className="font-title font-black text-[#0E1A33] text-sm leading-tight">{doc.nome}</h4>
        <p className="text-xs text-[#4A5878] mt-1 line-clamp-2">{doc.descricao}</p>
      </div>
      <div className="flex items-center justify-between text-[11px] text-[#8893AE] pt-2 border-t border-[#EEF2F8]">
        <span>
          <i className="ti ti-user mr-1"></i>
          {doc.autor}
        </span>
        <span>{formatDateBR(doc.dataPublicacao)}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-[#8893AE] font-bold">
          {doc.tamanho} · <i className="ti ti-eye"></i> {doc.acessosSemana} acessos
        </span>
        <button className="px-3 py-1.5 bg-[#0A2A6E] hover:bg-[#103A8C] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1">
          <i className="ti ti-download"></i> Baixar
        </button>
      </div>
    </div>
  );
}

// ==========================================
// TAB: INSIGHTS (LGPD)
// ==========================================
function InsightsTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Inteligência de dados"
        subtitle="Perfil demográfico, share of wallet, share of visits — todos os dados anonimizados em conformidade com a LGPD."
      />

      <div className="bg-gradient-to-r from-[#DEF5EA] to-[#DCE7FA] border border-[#0F8B58]/20 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-[#0F8B58] flex items-center justify-center text-lg shrink-0">
          <i className="ti ti-shield-check"></i>
        </div>
        <div className="text-xs text-[#0E1A33]">
          <strong className="block font-black text-sm">Privacidade desde o início</strong>
          Nenhuma informação pessoal identificável é exibida nesta área. Os dados são agrupados,
          anonimizados e atualizados diariamente pela equipe de inteligência de dados. Todos os
          acessos ficam registrados em histórico de auditoria.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon="ti-users" label="Visitantes únicos/mês" value="892k" trend={{ value: '+12%', up: true }} color="blue" />
        <StatCard icon="ti-clock" label="Permanência média" value="1h47" sub="Acima da média setor" color="gold" />
        <StatCard icon="ti-shopping-bag" label="Ticket médio" value="R$ 168" trend={{ value: '+8%', up: true }} color="green" />
        <StatCard icon="ti-repeat" label="Frequência mensal" value="2.4x" sub="Visitas por cliente" color="navy" />
      </div>

      {/* Demographics row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Age */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-1">Faixa etária</h4>
          <p className="text-xs text-[#4A5878] mb-5">Distribuição percentual dos visitantes únicos.</p>
          <div className="space-y-3">
            {DEMOGRAPHIC_AGES.map((a) => (
              <div key={a.faixa}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#0E1A33]">{a.faixa} anos</span>
                  <span className="text-[#1E5BCF]">{a.percentual}%</span>
                </div>
                <Progress value={a.percentual * 2.5} color="blue" size="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* Gender */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-1">Distribuição por gênero</h4>
          <p className="text-xs text-[#4A5878] mb-5">Autodeclarado no cadastro do cupom.</p>
          <div className="space-y-4">
            <GenderItem
              label="Feminino"
              percent={DEMOGRAPHIC_GENDER.feminino}
              color="#B81560"
              icon="ti-gender-female"
            />
            <GenderItem
              label="Masculino"
              percent={DEMOGRAPHIC_GENDER.masculino}
              color="#1E5BCF"
              icon="ti-gender-male"
            />
            <GenderItem
              label="Outros"
              percent={DEMOGRAPHIC_GENDER.outros}
              color="#8893AE"
              icon="ti-friends"
            />
          </div>
          <p className="text-[10px] text-[#8893AE] mt-5 leading-relaxed">
            * Campo opcional. Visitantes que não responderam são excluídos do cálculo.
          </p>
        </Card>

        {/* Neighborhoods */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-1">Top bairros</h4>
          <p className="text-xs text-[#4A5878] mb-5">Origem dos visitantes (CEP do cupom).</p>
          <div className="space-y-2.5">
            {NEIGHBORHOODS.slice(0, 6).map((n, idx) => (
              <div key={n.bairro} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-[#8893AE] w-4">{idx + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold mb-0.5">
                    <span className="text-[#0E1A33]">{n.bairro}</span>
                    <span className="text-[#1E5BCF]">{n.percentual}%</span>
                  </div>
                  <Progress value={n.percentual * 4} color="blue" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Participação no gasto / nas visitas */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h4 className="font-title font-black text-[#0E1A33] text-base">Participação no gasto × Participação nas visitas</h4>
            <p className="text-xs text-[#4A5878] mt-1">
              Quanto do gasto total e quanto das visitas do consumidor cada categoria representa.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#0A2A6E] rounded-sm"></span>
              <span className="text-[#4A5878] font-bold">Participação no gasto</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[#FFC72C] rounded-sm"></span>
              <span className="text-[#4A5878] font-bold">Participação nas visitas</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {SEGMENT_SHARES.map((s) => (
            <div key={s.segmento}>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-[#0E1A33]">{s.segmento}</span>
                <div className="flex gap-4">
                  <span className="text-[#0A2A6E]">💰 {s.shareOfWallet}%</span>
                  <span className="text-[#C58A07]">👥 {s.shareOfVisits}%</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-[#EEF2F8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A2A6E] rounded-full transition-all duration-500"
                    style={{ width: `${s.shareOfWallet * 2.8}%` }}
                  ></div>
                </div>
                <div className="h-3 w-full bg-[#EEF2F8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFC72C] rounded-full transition-all duration-500"
                    style={{ width: `${s.shareOfVisits * 2.8}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Daily flow chart */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h4 className="font-title font-black text-[#0E1A33] text-base">Fluxo diário de visitantes</h4>
            <p className="text-xs text-[#4A5878] mt-1">Últimas 4 semanas · valores em milhares</p>
          </div>
          <Badge color="blue">
            <i className="ti ti-trending-up"></i> Pico: 56k (sábado)
          </Badge>
        </div>
        <div className="h-44 flex items-end gap-1 px-2 border-b border-[#EEF2F8] pb-2 pt-6">
          {FLUXO_DIARIO_CHART.map((val, idx) => {
            const isWeekend = idx % 7 === 5 || idx % 7 === 6;
            const heightPercent = `${Math.round((val / 60) * 100)}%`;
            return (
              <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative">
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-[#0E1A33] text-white font-mono text-[10px] rounded px-1.5 py-0.5 -top-6 whitespace-nowrap z-10">
                  {val}k
                </div>
                <div
                  style={{ height: heightPercent }}
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    isWeekend ? 'bg-[#FFC72C]' : 'bg-[#1E5BCF]'
                  } hover:brightness-110`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] text-[#8893AE] mt-2 font-mono font-bold">
          <span>Sem 1</span>
          <span>Sem 2</span>
          <span>Sem 3</span>
          <span>Sem 4</span>
        </div>
      </Card>

      {/* Daily emissions */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h4 className="font-title font-black text-[#0E1A33] text-base">Emissão de cupons — Dezembro</h4>
            <p className="text-xs text-[#4A5878] mt-1">Picos acima de 200/dia destacados em dourado.</p>
          </div>
        </div>
        <div className="h-44 flex items-end gap-1.5 sm:gap-2 px-2 border-b border-[#EEF2F8] pb-2 pt-6">
          {EMISSIONS_DAILY_CHART.map((val, idx) => {
            const isHigh = val >= 200;
            const heightPercent = `${Math.round((val / 260) * 100)}%`;
            return (
              <div key={idx} className="flex-1 flex flex-col justify-end items-center group relative">
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-[#0E1A33] text-white font-mono text-[10px] rounded px-1.5 py-0.5 -top-6 whitespace-nowrap z-10">
                  {val} cupons
                </div>
                <div
                  style={{ height: heightPercent }}
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    isHigh ? 'bg-[#F5B800]' : 'bg-[#1E5BCF]'
                  } hover:brightness-110`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[11px] text-[#8893AE] mt-2 font-mono font-bold">
          <span>01/Dez</span>
          <span>12/Dez</span>
          <span>23/Dez</span>
        </div>
      </Card>
    </div>
  );
}

function GenderItem({ label, percent, color, icon }: { label: string; percent: number; color: string; icon: string }) {
  return (
    <div>
      <div className="flex justify-between items-center text-xs font-bold mb-1">
        <span className="inline-flex items-center gap-1.5 text-[#0E1A33]">
          <i className={`ti ${icon}`} style={{ color }}></i>
          {label}
        </span>
        <span style={{ color }}>{percent}%</span>
      </div>
      <div className="h-2 w-full bg-[#EEF2F8] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, background: color }}></div>
      </div>
    </div>
  );
}

// ==========================================
// TAB: CONFIGURAÇÕES (LGPD + plataforma)
// ==========================================
function ConfiguracoesTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader title="Configurações" subtitle="Plataforma, conformidade LGPD e integrações." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LGPD Settings */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#DEF5EA] text-[#0F8B58] flex items-center justify-center text-lg">
              <i className="ti ti-shield-lock"></i>
            </div>
            <div>
              <h4 className="font-title font-black text-[#0E1A33] text-base">Conformidade LGPD</h4>
              <p className="text-xs text-[#4A5878]">Princípios aplicados ao tratamento de dados pessoais.</p>
            </div>
          </div>

          <div className="space-y-3">
            <SettingToggle
              icon="ti-eye-off"
              title="Anonimização automática"
              description="CPF é mascarado em todos os relatórios e exibições agregadas."
              enabled
            />
            <SettingToggle
              icon="ti-clock-shield"
              title="Retenção de dados"
              description="Dados de cupons são automaticamente expurgados 180 dias após o sorteio."
              enabled
            />
            <SettingToggle
              icon="ti-history"
              title="Log de auditoria"
              description="Todo acesso a dados sensíveis é registrado para auditoria do encarregado de dados."
              enabled
            />
            <SettingToggle
              icon="ti-user-check"
              title="Consentimento explícito"
              description="Cliente assina aceite digital no momento do cadastro do cupom."
              enabled
            />
            <SettingToggle
              icon="ti-database-export"
              title="Direito de portabilidade"
              description="Cliente pode exportar seus dados em formato aberto via área do cliente."
              enabled
            />
          </div>

          <div className="mt-6 pt-5 border-t border-[#EEF2F8] flex items-center justify-between">
            <div className="text-xs text-[#4A5878]">
              <strong className="block text-[#0E1A33] text-sm">Encarregado de Dados</strong>
              Helena Martins · helena.martins@itaplan.com.br
            </div>
            <button className="px-4 py-2 bg-[#0A2A6E] hover:bg-[#103A8C] text-white text-xs font-bold rounded-xl transition-colors">
              <i className="ti ti-file-download"></i> Baixar política LGPD
            </button>
          </div>
        </Card>

        {/* Brand */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#FFF8DD] text-[#C58A07] flex items-center justify-center text-lg">
              <i className="ti ti-palette"></i>
            </div>
            <div>
              <h4 className="font-title font-black text-[#0E1A33] text-base">Identidade visual</h4>
              <p className="text-xs text-[#4A5878]">Marca aplicada na plataforma.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#F6F8FC] rounded-xl border border-[#DDE3EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0A2A6E] border-2 border-white shadow-sm"></div>
                <div>
                  <p className="text-xs font-bold text-[#0E1A33]">Azul institucional</p>
                  <p className="text-[10px] font-mono text-[#8893AE]">#0A2A6E</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F6F8FC] rounded-xl border border-[#DDE3EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFC72C] border-2 border-white shadow-sm"></div>
                <div>
                  <p className="text-xs font-bold text-[#0E1A33]">Amarelo dourado</p>
                  <p className="text-[10px] font-mono text-[#8893AE]">#FFC72C</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F6F8FC] rounded-xl border border-[#DDE3EE]">
              <div>
                <p className="text-xs font-bold text-[#0E1A33]">Tipografia</p>
                <p className="text-[10px] text-[#8893AE]">Nunito + Nunito Sans</p>
              </div>
              <span className="font-title font-black text-[#0A2A6E] text-2xl">Aa</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#DCE7FA] text-[#103A8C] flex items-center justify-center text-lg">
            <i className="ti ti-plug"></i>
          </div>
          <div>
            <h4 className="font-title font-black text-[#0E1A33] text-base">Integrações disponíveis</h4>
            <p className="text-xs text-[#4A5878]">Sistemas que podem ser conectados na fase de produção.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <IntegrationCard icon="ti-credit-card" title="Maquininha de cartão" desc="Conciliação automática das vendas" />
          <IntegrationCard icon="ti-receipt" title="Receita / SEFAZ" desc="Validação das notas fiscais" />
          <IntegrationCard icon="ti-brand-whatsapp" title="WhatsApp" desc="Avisos pelo celular do cliente" />
          <IntegrationCard icon="ti-mail" title="Envio de e-mails" desc="Mensagens automáticas após a compra" />
          <IntegrationCard icon="ti-chart-dots" title="Análise do site" desc="Acompanhamento das visitas" />
          <IntegrationCard icon="ti-target-arrow" title="Anúncios direcionados" desc="Campanhas de retorno do cliente" />
          <IntegrationCard icon="ti-camera" title="Câmeras inteligentes" desc="Contagem anônima do movimento" />
          <IntegrationCard icon="ti-id-badge-2" title="Confirmação de CPF" desc="Verificação dos dados pelo Gov.br" />
        </div>
      </Card>
    </div>
  );
}

function SettingToggle({ icon, title, description, enabled }: { icon: string; title: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 bg-[#F6F8FC] rounded-xl border border-[#DDE3EE]">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-white border border-[#DDE3EE] text-[#1E5BCF] flex items-center justify-center shrink-0">
          <i className={`ti ${icon}`}></i>
        </div>
        <div>
          <p className="text-sm font-bold text-[#0E1A33]">{title}</p>
          <p className="text-xs text-[#4A5878] mt-0.5">{description}</p>
        </div>
      </div>
      <div className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#0F8B58]' : 'bg-[#DDE3EE]'} shrink-0 cursor-pointer`}>
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${enabled ? 'left-5' : 'left-0.5'}`}
        ></span>
      </div>
    </div>
  );
}

function IntegrationCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-3 bg-[#F6F8FC] rounded-xl border border-[#DDE3EE] hover:border-[#1E5BCF]/40 hover:bg-white transition-all cursor-pointer">
      <div className="w-9 h-9 rounded-lg bg-white border border-[#DDE3EE] text-[#1E5BCF] flex items-center justify-center mb-2">
        <i className={`ti ${icon}`}></i>
      </div>
      <p className="text-sm font-bold text-[#0E1A33]">{title}</p>
      <p className="text-[11px] text-[#4A5878] mt-0.5">{desc}</p>
    </div>
  );
}
