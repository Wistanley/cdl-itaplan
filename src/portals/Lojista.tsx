import React, { useState, useMemo } from 'react';
import type {
  Portal,
  LojistaTab,
  Campaign,
  Store,
  Transaction,
  ClientRecent,
  Comunicado,
  Documento,
  Coupon,
} from '../types';
import { formatCPF, maskCPF, formatCurrency, formatCompactBRL, formatNumber, formatDateBR, initials } from '../utils';
import { Badge, StatCard, Card, ItaplanLogo, Progress, EmptyState, SectionHeader } from '../components/ui';

interface LojistaProps {
  setPortal: (p: Portal) => void;
  campaigns: Campaign[];
  activeCampaign: Campaign;
  stores: Store[];
  setStores: React.Dispatch<React.SetStateAction<Store[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  clientsRecent: ClientRecent[];
  setClientsRecent: React.Dispatch<React.SetStateAction<ClientRecent[]>>;
  cpfDatabase: Record<string, { nome: string; cupons: Coupon[] }>;
  setCpfDatabase: React.Dispatch<React.SetStateAction<Record<string, { nome: string; cupons: Coupon[] }>>>;
  comunicados: Comunicado[];
  documentos: Documento[];
}

const NAV_ITEMS: { tab: LojistaTab; label: string; icon: string }[] = [
  { tab: 'dashboard',   label: 'Dashboard',     icon: 'ti-layout-dashboard' },
  { tab: 'vendas',      label: 'Registrar venda', icon: 'ti-receipt-2' },
  { tab: 'campanhas',   label: 'Campanhas',     icon: 'ti-confetti' },
  { tab: 'comunicados', label: 'Comunicados',   icon: 'ti-mail' },
  { tab: 'documentos',  label: 'Documentos',    icon: 'ti-folder' },
  { tab: 'insights',    label: 'Minha loja',    icon: 'ti-chart-line' },
];

export default function Lojista(props: LojistaProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [tab, setTab] = useState<LojistaTab>('dashboard');
  const [activeStoreId, setActiveStoreId] = useState<number>(2);

  const selectedStore = useMemo(() => {
    return props.stores.find((s) => s.id === activeStoreId) || props.stores[0];
  }, [props.stores, activeStoreId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser.trim() || !loginPwd.trim()) {
      alert('Preencha usuário e senha.');
      return;
    }
    setIsLoadingLogin(true);
    setTimeout(() => {
      setIsLoadingLogin(false);
      setIsLoggedIn(true);
    }, 900);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginUser('');
    setLoginPwd('');
    setTab('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <LoginView
        setPortal={props.setPortal}
        onSubmit={handleLogin}
        isLoading={isLoadingLogin}
        loginUser={loginUser}
        setLoginUser={setLoginUser}
        loginPwd={loginPwd}
        setLoginPwd={setLoginPwd}
        activeCampaign={props.activeCampaign}
      />
    );
  }

  return (
    <div id="portal-lojista" className="bg-[#F6F8FC] min-h-screen animate-fade-in flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#DDE3EE] py-3 px-6 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ItaplanLogo size="md" />
            <div className="border-l border-[#DDE3EE] pl-3">
              <select
                className="font-title text-base font-black tracking-tight text-[#0E1A33] cursor-pointer hover:text-[#1E5BCF] bg-transparent border-none py-0 pl-0 pr-6 focus:ring-0 outline-none"
                value={activeStoreId}
                onChange={(e) => setActiveStoreId(Number(e.target.value))}
              >
                {props.stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[#4A5878] font-medium">
                {selectedStore.loja} · {selectedStore.piso} · {selectedStore.responsavel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge color="green">
              <span className="w-1.5 h-1.5 bg-[#0F8B58] rounded-full animate-pulse"></span>
              Operador online
            </Badge>
            <button
              id="btn-lojista-logout"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#4A5878] hover:text-[#B42A2A] bg-[#F6F8FC] hover:bg-[#FDE7E7] rounded-xl transition-colors border border-[#DDE3EE]"
            >
              <i className="ti ti-logout"></i> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-[1500px] w-full mx-auto flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-[230px] bg-white border-r border-[#DDE3EE] p-4 flex flex-col gap-6 md:min-h-[calc(100vh-69px)]">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-[#8893AE] tracking-widest px-3 mb-3">
              Portal do lojista
            </p>
            {NAV_ITEMS.map((item) => {
              const isActive = tab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setTab(item.tab)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0A2A6E] text-white font-bold shadow-md'
                      : 'text-[#4A5878] font-semibold hover:bg-[#EEF4FE] hover:text-[#0A2A6E]'
                  }`}
                >
                  <i
                    className={`ti ${item.icon} text-lg ${
                      isActive ? 'text-[#FFC72C]' : 'text-[#8893AE]'
                    }`}
                  ></i>
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-auto bg-gradient-to-br from-[#FFF8DD] to-[#FFE2C2] border border-[#FFC72C]/40 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase text-[#8A6204] tracking-wider">Sua loja</p>
            <div className="font-title text-lg font-black text-[#0E1A33] mt-1 leading-tight">
              {selectedStore.nome}
            </div>
            <div className="h-[1px] bg-[#FFC72C]/30 my-2"></div>
            <div className="space-y-1.5 text-[11px] text-[#0E1A33]">
              <div className="flex justify-between">
                <span>Engajamento</span>
                <strong>{selectedStore.engajamento}%</strong>
              </div>
              <div className="flex justify-between">
                <span>Cupons</span>
                <strong>{selectedStore.cuponsEmitidos}</strong>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-8 space-y-8">
          {tab === 'dashboard' && (
            <DashboardTab store={selectedStore} transactions={props.transactions} clientsRecent={props.clientsRecent} activeCampaign={props.activeCampaign} />
          )}
          {tab === 'vendas' && (
            <VendasTab
              store={selectedStore}
              setStores={props.setStores}
              transactions={props.transactions}
              setTransactions={props.setTransactions}
              clientsRecent={props.clientsRecent}
              setClientsRecent={props.setClientsRecent}
              cpfDatabase={props.cpfDatabase}
              setCpfDatabase={props.setCpfDatabase}
              activeCampaign={props.activeCampaign}
            />
          )}
          {tab === 'campanhas' && <CampanhasTab campaigns={props.campaigns} store={selectedStore} />}
          {tab === 'comunicados' && <ComunicadosTab comunicados={props.comunicados} />}
          {tab === 'documentos' && <DocumentosTab documentos={props.documentos} />}
          {tab === 'insights' && <InsightsTab store={selectedStore} />}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// LOGIN VIEW
// ==========================================
function LoginView({
  setPortal,
  onSubmit,
  isLoading,
  loginUser,
  setLoginUser,
  loginPwd,
  setLoginPwd,
  activeCampaign,
}: {
  setPortal: (p: Portal) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  loginUser: string;
  setLoginUser: (v: string) => void;
  loginPwd: string;
  setLoginPwd: (v: string) => void;
  activeCampaign: Campaign;
}) {
  return (
    <div className="min-h-screen itp-gradient-hero flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#DDE3EE] p-8 shadow-2xl relative animate-scale-up">
        <div className="flex justify-center -mt-16 mb-4">
          <div className="w-16 h-16 rounded-2xl itp-gradient-primary flex items-center justify-center shadow-lg relative overflow-hidden">
            <span className="font-title font-black text-[#FFC72C] text-2xl">i.</span>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 itp-gradient-gold"></div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h3 className="font-title text-2xl font-black text-[#0E1A33]">Portal do Lojista</h3>
          <p className="text-xs text-[#4A5878] mt-1 font-semibold">
            Itaplan · {activeCampaign.nome}
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
              Usuário ou CNPJ
            </label>
            <input
              required
              type="text"
              className="w-full px-3.5 py-2.5 text-sm bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl focus:outline-hidden focus:border-[#1E5BCF] text-[#0E1A33] font-semibold transition-colors"
              placeholder="Digite seu login cadastrado"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
              Senha
            </label>
            <input
              required
              type="password"
              className="w-full px-3.5 py-2.5 text-sm bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl focus:outline-hidden focus:border-[#1E5BCF] text-[#0E1A33] font-semibold transition-colors"
              placeholder="••••••••••••"
              value={loginPwd}
              onChange={(e) => setLoginPwd(e.target.value)}
            />
          </div>
          <div className="bg-[#EEF4FE] text-[#103A8C] text-[11px] py-2 px-3 rounded-xl border border-[#1E5BCF]/20 flex gap-2 font-medium">
            <i className="ti ti-info-circle text-base"></i>
            <span>Protótipo · qualquer usuário e senha funcionam.</span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 itp-gradient-primary hover:brightness-110 disabled:opacity-85 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Autenticando...
              </>
            ) : (
              <>
                <i className="ti ti-login"></i> Entrar no portal
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setPortal('landing')}
            className="w-full py-2.5 text-xs font-bold text-[#4A5878] hover:text-[#0E1A33] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <i className="ti ti-arrow-back-up"></i> Voltar à tela inicial
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// TAB: DASHBOARD
// ==========================================
function DashboardTab({
  store,
  transactions,
  clientsRecent,
  activeCampaign,
}: {
  store: Store;
  transactions: Transaction[];
  clientsRecent: ClientRecent[];
  activeCampaign: Campaign;
}) {
  const storeTxns = transactions.filter((t) => t.lojaNome === store.nome);
  const emittedToday = 42 + storeTxns.reduce((acc, t) => acc + t.cupons, 0);
  const salesToday = 14 + storeTxns.length;
  const percent = Math.min(100, Math.round((store.cuponsEmitidos / store.meta) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeader
        title={`Bem-vinda(o) à ${store.nome}`}
        subtitle={`Sua performance na campanha ${activeCampaign.nome}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon="ti-ticket" label="Cupons hoje" value={emittedToday} sub="Em tempo real" color="gold" />
        <StatCard icon="ti-receipt" label="Vendas hoje" value={salesToday} sub="Operações validadas" color="blue" />
        <StatCard
          icon="ti-trending-up"
          label="Faturamento mês"
          value={formatCompactBRL(store.faturamentoMes)}
          sub={`${formatNumber(store.notasFiscais)} NFs registradas`}
          color="green"
          trend={{ value: '+15%', up: true }}
        />
        <StatCard
          icon="ti-target"
          label="Meta da campanha"
          value={`${percent}%`}
          sub={`${store.cuponsEmitidos} / ${store.meta} cupons`}
          color="navy"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign callout */}
        <Card className="lg:col-span-2 itp-gradient-primary text-white relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#FFC72C]/10"></div>
          <div className="flex items-start justify-between mb-4 relative">
            <Badge color="gold" className="!bg-[#FFC72C] !text-[#0E1A33] !border-transparent">
              <i className="ti ti-flame"></i> Campanha ativa
            </Badge>
            <span className="text-[11px] text-blue-100/70">
              Sorteio em {formatDateBR(activeCampaign.sorteio)}
            </span>
          </div>
          <h3 className="font-title text-2xl font-black tracking-tight">{activeCampaign.nome}</h3>
          <p className="text-sm text-blue-100/80 mt-1">{activeCampaign.regra}</p>
          <p className="text-xs text-blue-100/60 mt-2">{activeCampaign.premiosDescricao}</p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Sua loja</p>
              <p className="font-title text-2xl font-black mt-1">{store.cuponsEmitidos}</p>
              <p className="text-[10px] text-blue-100/60">cupons emitidos</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Ticket médio</p>
              <p className="font-title text-2xl font-black mt-1">{formatCurrency(store.ticketMedio).replace('R$', 'R$ ')}</p>
              <p className="text-[10px] text-blue-100/60">por venda</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#FFC72C] font-black">Engajamento</p>
              <p className="font-title text-2xl font-black mt-1">{store.engajamento}%</p>
              <p className="text-[10px] text-blue-100/60">vs. shopping</p>
            </div>
          </div>
        </Card>

        {/* Activity */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-4">Atividade recente</h4>
          <div className="space-y-3">
            {clientsRecent.slice(0, 4).map((c, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F6F8FC] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EEF4FE] text-[#103A8C] flex items-center justify-center font-bold text-xs">
                  {initials(c.nome)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0E1A33] truncate">{c.nome}</p>
                  <p className="text-[10px] text-[#8893AE]">{c.tempo}</p>
                </div>
                <Badge color="gold">{c.cupons}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Last transactions */}
      <Card>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h4 className="font-title text-lg font-black text-[#0E1A33]">Últimos registros desta loja</h4>
            <p className="text-xs text-[#4A5878]">Transações enviadas por {store.nome}.</p>
          </div>
          <Badge color="blue">
            <i className="ti ti-receipt"></i> {storeTxns.length} hoje
          </Badge>
        </div>

        {storeTxns.length === 0 ? (
          <EmptyState icon="ti-receipt-off" title="Sem registros hoje" description="As transações registradas aparecerão aqui." />
        ) : (
          <div className="space-y-2.5">
            {storeTxns.map((txn) => (
              <div
                key={txn.id}
                className="p-3 bg-[#F6F8FC] border border-[#DDE3EE] hover:border-[#1E5BCF]/30 rounded-xl flex items-center justify-between text-xs transition-all"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 rounded-lg bg-[#DEF5EA] text-[#0F8B58] flex items-center justify-center">
                    <i className="ti ti-receipt"></i>
                  </div>
                  <div>
                    <p className="font-bold text-[#0E1A33] text-sm">{txn.clienteNome}</p>
                    <p className="text-[11px] text-[#8893AE]">
                      {txn.cpf} · {txn.horario} · {txn.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0E1A33] text-sm">{formatCurrency(txn.valor)}</p>
                  <Badge color="gold">
                    {txn.cupons} {txn.cupons === 1 ? 'cupom' : 'cupons'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ==========================================
// TAB: VENDAS (emit coupons)
// ==========================================
function VendasTab({
  store,
  setStores,
  transactions,
  setTransactions,
  clientsRecent,
  setClientsRecent,
  cpfDatabase,
  setCpfDatabase,
  activeCampaign,
}: {
  store: Store;
  setStores: React.Dispatch<React.SetStateAction<Store[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  clientsRecent: ClientRecent[];
  setClientsRecent: React.Dispatch<React.SetStateAction<ClientRecent[]>>;
  cpfDatabase: Record<string, { nome: string; cupons: Coupon[] }>;
  setCpfDatabase: React.Dispatch<React.SetStateAction<Record<string, { nome: string; cupons: Coupon[] }>>>;
  activeCampaign: Campaign;
}) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [isEmitting, setIsEmitting] = useState(false);
  const [success, setSuccess] = useState<{ cliente: string; cupons: string[]; count: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (cpf.length !== 14) {
      setError('Digite um CPF completo (11 dígitos).');
      return;
    }
    const normalizedValue = parseFloat(valor.replace(',', '.'));
    if (isNaN(normalizedValue) || normalizedValue < activeCampaign.regraValor) {
      setError(`Valor mínimo: R$ ${activeCampaign.regraValor.toFixed(2)}.`);
      return;
    }

    setIsEmitting(true);
    setTimeout(() => {
      const count = Math.floor(normalizedValue / activeCampaign.regraValor);
      const generatedTickets: string[] = [];
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      for (let i = 0; i < count; i++) {
        const luckyValue = Math.floor(100000 + Math.random() * 900000);
        generatedTickets.push(`2025-${luckyValue}`);
      }

      const fallbackName = nome.trim() || 'Cliente Itaplan';

      setTransactions([
        {
          id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
          cpf: maskCPF(cpf),
          clienteNome: fallbackName,
          valor: normalizedValue,
          cupons: count,
          horario: formattedTime,
          data: formattedDate,
          lojaNome: store.nome,
          campanhaId: activeCampaign.id,
        },
        ...transactions,
      ]);

      setStores((prev) =>
        prev.map((s) =>
          s.id === store.id
            ? {
                ...s,
                cuponsEmitidos: s.cuponsEmitidos + count,
                vendasRegistradas: s.vendasRegistradas + 1,
                faturamentoMes: s.faturamentoMes + normalizedValue,
                notasFiscais: s.notasFiscais + 1,
              }
            : s,
        ),
      );

      setClientsRecent([
        { cpf: maskCPF(cpf), nome: fallbackName, cupons: count, tempo: 'Agora mesmo', campanhaId: activeCampaign.id },
        ...clientsRecent.slice(0, 3),
      ]);

      setCpfDatabase((prev) => {
        const existing = prev[cpf] || { nome: fallbackName, cupons: [] };
        return {
          ...prev,
          [cpf]: {
            nome: fallbackName,
            cupons: [
              ...generatedTickets.map((num) => ({
                numero: num,
                data: formattedDate,
                nomeLoja: store.nome,
                valor: normalizedValue,
                campanhaId: activeCampaign.id,
                campanhaNome: activeCampaign.nome,
              })),
              ...existing.cupons,
            ],
          },
        };
      });

      setSuccess({ cliente: fallbackName, cupons: generatedTickets, count });
      setCpf('');
      setNome('');
      setValor('');
      setIsEmitting(false);
    }, 1100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Registrar nova venda"
        subtitle={`Emita cupons da campanha ${activeCampaign.nome} para o cliente.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <Card>
            <form onSubmit={handleEmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
                    CPF do cliente *
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={14}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl focus:outline-hidden focus:border-[#1E5BCF] text-[#0E1A33] font-semibold transition-colors"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
                    Nome (opcional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl focus:outline-hidden focus:border-[#1E5BCF] text-[#0E1A33] font-semibold transition-colors"
                    placeholder="Ex: Stanley de Oliveira"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A5878] mb-1.5">
                  Valor total da compra (R$) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#4A5878]">R$</span>
                  <input
                    required
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl focus:outline-hidden focus:border-[#1E5BCF] text-[#0E1A33] font-semibold transition-colors"
                    placeholder="0,00"
                    value={valor}
                    onChange={(e) => setValor(e.target.value.replace(/[^0-9,.]/g, ''))}
                  />
                </div>
              </div>

              {/* Preview */}
              {valor &&
                (() => {
                  const value = parseFloat(valor.replace(',', '.'));
                  if (isNaN(value)) return null;
                  if (value >= activeCampaign.regraValor) {
                    const howMany = Math.floor(value / activeCampaign.regraValor);
                    const nextGap = activeCampaign.regraValor - (value % activeCampaign.regraValor);
                    return (
                      <div className="p-3.5 bg-[#DEF5EA] text-[#0F8B58] rounded-xl border border-[#0F8B58]/20 flex items-center justify-between animate-fade-in-fast text-xs">
                        <div className="flex items-center gap-2 font-bold">
                          <i className="ti ti-ticket text-lg animate-pulse"></i>
                          ✓ {howMany} {howMany === 1 ? 'número' : 'números'} da sorte
                        </div>
                        {nextGap < activeCampaign.regraValor && (
                          <span className="text-[10px] text-[#4A5878]">+ R$ {nextGap.toFixed(2)} para mais um</span>
                        )}
                      </div>
                    );
                  }
                  const missing = activeCampaign.regraValor - value;
                  return (
                    <div className="p-3.5 bg-[#FFF8DD] text-[#8A6204] rounded-xl border border-[#C58A07]/20 text-xs flex items-center gap-2 font-semibold">
                      <i className="ti ti-alert-circle text-base"></i>
                      Faltam R$ {missing.toFixed(2)} para gerar o primeiro cupom.
                    </div>
                  );
                })()}

              {success && (
                <div className="p-4 bg-[#DEF5EA] text-[#0F8B58] border border-[#0F8B58]/20 rounded-2xl animate-fade-in-fast space-y-3">
                  <div className="flex items-start gap-2.5">
                    <i className="ti ti-circle-check text-xl mt-0.5"></i>
                    <div>
                      <h5 className="font-black text-sm text-[#0E1A33]">Transação processada!</h5>
                      <p className="text-xs">
                        <strong>{success.count} {success.count === 1 ? 'cupom' : 'cupons'}</strong> da sorte gerados para{' '}
                        <strong>{success.cliente}</strong>.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {success.cupons.map((code) => (
                      <div
                        key={code}
                        className="bg-[#0A2A6E] text-[#FFC72C] font-mono text-[11px] font-black px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 tracking-wider animate-bounce-short"
                      >
                        <i className="ti ti-ticket"></i>
                        {code}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] italic">✓ Cliente receberá confirmação por SMS e e-mail.</p>
                </div>
              )}

              {error && (
                <div className="p-3.5 bg-[#FDE7E7] text-[#B42A2A] border border-[#B42A2A]/20 rounded-xl text-xs flex items-center gap-2 font-bold animate-fade-in-fast">
                  <i className="ti ti-exclamation-circle text-base"></i>
                  Erro: {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isEmitting}
                className="w-full py-3.5 itp-gradient-primary hover:brightness-110 disabled:opacity-85 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isEmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <i className="ti ti-ticket text-lg"></i> Emitir cupons da sorte
                  </>
                )}
              </button>
            </form>
          </Card>

          {/* LGPD notice */}
          <div className="mt-4 bg-[#DCE7FA] border border-[#1E5BCF]/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#103A8C]">
            <i className="ti ti-shield-check text-base mt-0.5"></i>
            <span>
              <strong>LGPD:</strong> o CPF é mascarado nos relatórios públicos. Os dados pessoais
              não são compartilhados com outras lojas — apenas dados agregados e anonimizados.
            </span>
          </div>
        </div>

        {/* Right side: rules + transactions */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <h4 className="font-title font-black text-[#0E1A33] text-sm mb-3">Regra da campanha</h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2 bg-[#F6F8FC] rounded-lg">
                <span className="text-[#4A5878]">Campanha</span>
                <strong className="text-[#0E1A33]">{activeCampaign.nome}</strong>
              </div>
              <div className="flex justify-between p-2 bg-[#F6F8FC] rounded-lg">
                <span className="text-[#4A5878]">Regra</span>
                <strong className="text-[#0E1A33]">{activeCampaign.regra}</strong>
              </div>
              <div className="flex justify-between p-2 bg-[#F6F8FC] rounded-lg">
                <span className="text-[#4A5878]">Período</span>
                <strong className="text-[#0E1A33]">
                  {formatDateBR(activeCampaign.inicio)} → {formatDateBR(activeCampaign.fim)}
                </strong>
              </div>
              <div className="flex justify-between p-2 bg-[#F6F8FC] rounded-lg">
                <span className="text-[#4A5878]">Sorteio</span>
                <strong className="text-[#0E1A33]">{formatDateBR(activeCampaign.sorteio)}</strong>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-title font-black text-[#0E1A33] text-sm">Últimas vendas registradas</h4>
              <Badge color="blue">{store.nome}</Badge>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {transactions
                .filter((t) => t.lojaNome === store.nome)
                .slice(0, 6)
                .map((txn) => (
                  <div
                    key={txn.id}
                    className="p-2.5 bg-[#F6F8FC] rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#0E1A33]">{txn.clienteNome}</p>
                      <p className="text-[10px] text-[#8893AE]">{txn.cpf} · {txn.horario}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0E1A33]">{formatCurrency(txn.valor)}</p>
                      <span className="text-[10px] text-[#C58A07] font-bold">
                        {txn.cupons} {txn.cupons === 1 ? 'cupom' : 'cupons'}
                      </span>
                    </div>
                  </div>
                ))}
              {transactions.filter((t) => t.lojaNome === store.nome).length === 0 && (
                <p className="text-xs text-[#8893AE] italic text-center py-6">Sem vendas registradas hoje.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// TAB: CAMPANHAS (visão lojista)
// ==========================================
function CampanhasTab({ campaigns, store }: { campaigns: Campaign[]; store: Store }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Campanhas Itaplan"
        subtitle="Promoções em andamento, futuras e histórico — sua loja participa de todas as ativas."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {campaigns.map((c) => {
          const statusMap: Record<Campaign['status'], { color: 'green' | 'blue' | 'gray' | 'gold'; label: string }> = {
            ativa: { color: 'green', label: 'Em andamento' },
            planejada: { color: 'blue', label: 'Em breve' },
            encerrada: { color: 'gray', label: 'Encerrada' },
            rascunho: { color: 'gold', label: 'Rascunho' },
          };
          const isParticipating = c.status === 'ativa' || c.status === 'planejada';
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-[#DDE3EE] hover:border-[#1E5BCF]/40 hover:shadow-lg transition-all overflow-hidden"
            >
              <div
                className="h-24 relative flex items-end p-4"
                style={{
                  background: `linear-gradient(135deg, ${c.corPrimaria}, ${c.corSecundaria})`,
                }}
              >
                <i className={`ti ${c.icone} text-white text-5xl opacity-30 absolute top-3 right-3`}></i>
                <div className="text-white">
                  <h4 className="font-title font-black text-lg leading-tight">{c.nome}</h4>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    {formatDateBR(c.inicio)} → {formatDateBR(c.fim)}
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge color={statusMap[c.status].color}>{statusMap[c.status].label}</Badge>
                  {isParticipating && (
                    <span className="text-[10px] text-[#0F8B58] font-black uppercase tracking-wider inline-flex items-center gap-1">
                      <i className="ti ti-circle-check"></i> Você participa
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4A5878] leading-relaxed">{c.regra}</p>
                <p className="text-[11px] text-[#8893AE]">{c.premiosDescricao}</p>

                {c.status === 'ativa' && (
                  <div className="pt-3 border-t border-[#EEF2F8]">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#8893AE]">Sua loja</span>
                      <strong className="text-[#0E1A33]">
                        {store.cuponsEmitidos} / {store.meta} cupons
                      </strong>
                    </div>
                    <Progress value={Math.min(100, (store.cuponsEmitidos / store.meta) * 100)} color="gold" size="sm" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// TAB: COMUNICADOS (read only)
// ==========================================
function ComunicadosTab({ comunicados }: { comunicados: Comunicado[] }) {
  const [selected, setSelected] = useState<Comunicado | null>(comunicados[0] ?? null);
  const unread = comunicados.filter((c) => !c.lido).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Comunicados da administração"
        subtitle={`Memorandos, alertas e eventos do Itaplan · ${unread} não lidos`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {comunicados.map((c) => (
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
                <ComunicadoTipoMini tipo={c.tipo} />
                <span className="text-[10px] text-[#8893AE]">{formatDateBR(c.data)}</span>
              </div>
              <h4 className={`text-[13px] font-bold text-[#0E1A33] leading-snug ${!c.lido ? 'font-black' : ''}`}>
                {!c.lido && <span className="w-2 h-2 rounded-full bg-[#1E5BCF] inline-block mr-1.5 align-middle"></span>}
                {c.titulo}
              </h4>
              <p className="text-[11px] text-[#4A5878] mt-1 line-clamp-2">{c.resumo}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-[#EEF2F8]">
                <div>
                  <ComunicadoTipoMini tipo={selected.tipo} />
                  <h3 className="font-title text-xl font-black text-[#0E1A33] leading-tight mt-2">{selected.titulo}</h3>
                  <p className="text-xs text-[#4A5878] mt-1">
                    <strong>{selected.remetente}</strong> · {selected.cargo} · {formatDateBR(selected.data)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#0E1A33] leading-relaxed whitespace-pre-line">{selected.conteudo}</p>
              {selected.anexo && (
                <div className="mt-5 p-3 bg-[#F6F8FC] border border-[#DDE3EE] rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#B42A2A]/10 text-[#B42A2A] flex items-center justify-center">
                    <i className="ti ti-file-text text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0E1A33]">{selected.anexo}</p>
                    <p className="text-[11px] text-[#8893AE]">Anexo</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#0A2A6E] hover:bg-[#103A8C] text-white text-xs font-bold rounded-lg transition-colors">
                    <i className="ti ti-download"></i> Baixar
                  </button>
                </div>
              )}
            </Card>
          ) : (
            <Card>
              <EmptyState icon="ti-mail-opened" title="Selecione um comunicado" description="Escolha um item na lista ao lado." />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ComunicadoTipoMini({ tipo }: { tipo: Comunicado['tipo'] }) {
  const map = {
    memorando:  { icon: 'ti-clipboard-text', bg: 'bg-[#DCE7FA]', color: 'text-[#103A8C]', label: 'Memorando' },
    alerta:     { icon: 'ti-alert-triangle', bg: 'bg-[#FDE7E7]', color: 'text-[#B42A2A]', label: 'Alerta' },
    comunicado: { icon: 'ti-speakerphone',   bg: 'bg-[#FFF8DD]', color: 'text-[#8A6204]', label: 'Comunicado' },
    evento:     { icon: 'ti-calendar-event', bg: 'bg-[#DEF5EA]', color: 'text-[#0F8B58]', label: 'Evento' },
  } as const;
  const cfg = map[tipo];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${cfg.bg} ${cfg.color} text-[10px] font-black uppercase tracking-wider`}>
      <i className={`ti ${cfg.icon} text-xs`}></i> {cfg.label}
    </span>
  );
}

// ==========================================
// TAB: DOCUMENTOS (read only — only public for lojista)
// ==========================================
function DocumentosTab({ documentos }: { documentos: Documento[] }) {
  const accessible = documentos.filter((d) => !d.confidencial || d.tipo === 'regulamento' || d.tipo === 'manual');
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Documentos e materiais"
        subtitle="Regulamentos, manuais e materiais de campanha disponíveis para sua loja."
      />
      <div className="bg-[#DCE7FA] border border-[#1E5BCF]/20 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#103A8C]">
        <i className="ti ti-info-circle text-lg mt-0.5"></i>
        <span>
          Documentos confidenciais (relatórios financeiros, contratos e auditorias) ficam restritos
          à administração do shopping. Para solicitar acesso, fale com seu gerente de relacionamento.
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accessible.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-[#DDE3EE] hover:border-[#1E5BCF]/30 hover:shadow-md p-5 transition-all flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-14 rounded-lg flex items-center justify-center text-[10px] font-black uppercase ${
                  doc.formato === 'pdf'
                    ? 'bg-[#FDE7E7] text-[#B42A2A]'
                    : doc.formato === 'xlsx'
                    ? 'bg-[#DEF5EA] text-[#0F8B58]'
                    : doc.formato === 'docx'
                    ? 'bg-[#DCE7FA] text-[#103A8C]'
                    : 'bg-[#FFE2C2] text-[#A05608]'
                }`}
              >
                {doc.formato}
              </div>
            </div>
            <div>
              <h4 className="font-title font-black text-[#0E1A33] text-sm leading-tight">{doc.nome}</h4>
              <p className="text-xs text-[#4A5878] mt-1 line-clamp-2">{doc.descricao}</p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#8893AE] pt-2 border-t border-[#EEF2F8]">
              <span>{doc.autor}</span>
              <span>{formatDateBR(doc.dataPublicacao)}</span>
            </div>
            <button className="w-full mt-1 py-2 bg-[#0A2A6E] hover:bg-[#103A8C] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center justify-center gap-1">
              <i className="ti ti-download"></i> Baixar ({doc.tamanho})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// TAB: INSIGHTS DA LOJA
// ==========================================
function InsightsTab({ store }: { store: Store }) {
  const fakeWeekly = [42, 58, 51, 67, 73, 89, 64];
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title={`Inteligência — ${store.nome}`}
        subtitle="Performance da sua loja no Itaplan · dados anonimizados, em conformidade LGPD."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon="ti-cash"
          label="Faturamento mês"
          value={formatCompactBRL(store.faturamentoMes)}
          trend={{ value: '+15%', up: true }}
          color="green"
        />
        <StatCard
          icon="ti-receipt"
          label="Notas fiscais"
          value={formatNumber(store.notasFiscais)}
          sub={`Ticket médio: ${formatCurrency(store.ticketMedio)}`}
          color="blue"
        />
        <StatCard
          icon="ti-ticket"
          label="Engajamento campanha"
          value={`${store.engajamento}%`}
          sub="vs. média do shopping (81%)"
          color="gold"
          trend={{ value: '+7%', up: true }}
        />
        <StatCard
          icon="ti-users"
          label="Clientes únicos"
          value={Math.round(store.notasFiscais * 0.62)}
          sub="No mês atual"
          color="navy"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly sales */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h4 className="font-title font-black text-[#0E1A33] text-base">Vendas da semana</h4>
              <p className="text-xs text-[#4A5878]">Notas fiscais por dia</p>
            </div>
            <Badge color="green">
              <i className="ti ti-trending-up"></i> +18% vs. semana anterior
            </Badge>
          </div>
          <div className="h-44 flex items-end gap-3 px-2 border-b border-[#EEF2F8] pb-2 pt-6">
            {fakeWeekly.map((val, idx) => {
              const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
              const isWeekend = idx >= 5;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex-1 flex items-end">
                    <div className="absolute opacity-0 group-hover:opacity-100 transition bg-[#0E1A33] text-white text-[10px] font-mono px-1.5 py-0.5 rounded -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      {val} NFs
                    </div>
                    <div
                      style={{ height: `${(val / 90) * 100}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isWeekend ? 'bg-[#FFC72C]' : 'bg-[#1E5BCF]'
                      } hover:brightness-110`}
                    ></div>
                  </div>
                  <span className="text-[11px] text-[#4A5878] font-bold">{days[idx]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Customer profile */}
        <Card>
          <h4 className="font-title font-black text-[#0E1A33] text-base mb-1">Perfil do cliente</h4>
          <p className="text-xs text-[#4A5878] mb-5">Agregado, anonimizado.</p>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase font-black text-[#8893AE] tracking-wider mb-2">Faixa etária predominante</p>
              <div className="flex items-center gap-2">
                <div className="font-title text-2xl font-black text-[#0A2A6E]">25-44</div>
                <span className="text-xs text-[#4A5878] font-medium">anos (62%)</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-[#8893AE] tracking-wider mb-2">Gênero predominante</p>
              <div className="flex items-center gap-2">
                <i className="ti ti-gender-female text-2xl text-[#B81560]"></i>
                <div className="font-title text-2xl font-black text-[#0A2A6E]">Feminino</div>
                <span className="text-xs text-[#4A5878] font-medium">(64%)</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-[#8893AE] tracking-wider mb-2">Top bairro</p>
              <div className="flex items-center gap-2">
                <i className="ti ti-map-pin text-2xl text-[#1E5BCF]"></i>
                <div className="font-title text-base font-black text-[#0A2A6E]">Jardim Europa</div>
                <span className="text-xs text-[#4A5878] font-medium">(18%)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign performance */}
      <Card>
        <h4 className="font-title font-black text-[#0E1A33] text-base mb-5">Engajamento por campanha</h4>
        <div className="space-y-4">
          {[
            { nome: 'Natal Premiado 2025', cupons: store.cuponsEmitidos, meta: store.meta, status: 'Em andamento' },
            { nome: 'Dia dos Pais 2025', cupons: Math.round(store.meta * 0.94), meta: store.meta, status: 'Encerrada' },
            { nome: 'Festival de Inverno 2025', cupons: Math.round(store.meta * 1.08), meta: store.meta, status: 'Encerrada' },
          ].map((c, idx) => {
            const percent = Math.min(100, Math.round((c.cupons / c.meta) * 100));
            return (
              <div key={idx}>
                <div className="flex justify-between mb-1 text-xs">
                  <span className="font-bold text-[#0E1A33]">{c.nome}</span>
                  <span className="text-[#4A5878]">
                    {c.cupons} / {c.meta} ({percent}%) · {c.status}
                  </span>
                </div>
                <Progress value={percent} color={c.status === 'Em andamento' ? 'gold' : 'blue'} />
              </div>
            );
          })}
        </div>
      </Card>

      <div className="bg-[#DEF5EA] border border-[#0F8B58]/20 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#0E1A33]">
        <i className="ti ti-shield-check text-lg text-[#0F8B58] mt-0.5"></i>
        <span>
          <strong>LGPD:</strong> os dados exibidos são exclusivamente da sua loja, agregados e
          anonimizados. Em nenhum momento o Itaplan compartilha CPFs ou informações pessoais
          identificáveis com terceiros ou outras lojas parceiras.
        </span>
      </div>
    </div>
  );
}
