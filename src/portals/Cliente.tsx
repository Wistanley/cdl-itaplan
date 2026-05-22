import React, { useState, useMemo } from 'react';
import type { Portal, Coupon, Campaign } from '../types';
import { formatCPF, formatCurrency } from '../utils';
import { ItaplanLogo } from '../components/ui';
import { Snowfall, ChristmasLights, ChristmasBadge } from '../components/christmas';

interface ClienteProps {
  setPortal: (p: Portal) => void;
  cpfDatabase: Record<string, { nome: string; cupons: Coupon[] }>;
  campaigns: Campaign[];
  activeCampaign: Campaign;
}

export default function Cliente({ setPortal, cpfDatabase, campaigns, activeCampaign }: ClienteProps) {
  const [cpfInput, setCpfInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    nome?: string;
    cupons?: Coupon[];
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfInput || cpfInput.length < 14) {
      alert('Por favor, digite o CPF completo (000.000.000-00)');
      return;
    }
    setIsSearching(true);
    setSearchResult(null);
    setTimeout(() => {
      setIsSearching(false);
      const record = cpfDatabase[cpfInput];
      if (record) {
        setSearchResult({ found: true, nome: record.nome, cupons: record.cupons });
      } else {
        setSearchResult({ found: false });
      }
    }, 900);
  };

  const couponsByCampaign = useMemo(() => {
    if (!searchResult?.cupons) return [];
    const grouped = new Map<number, { campanha: Campaign; cupons: Coupon[] }>();
    for (const c of searchResult.cupons) {
      const campanha = campaigns.find((ca) => ca.id === c.campanhaId);
      if (!campanha) continue;
      if (!grouped.has(c.campanhaId)) {
        grouped.set(c.campanhaId, { campanha, cupons: [] });
      }
      grouped.get(c.campanhaId)!.cupons.push(c);
    }
    return Array.from(grouped.values()).sort((a, b) => {
      if (a.campanha.status === 'ativa' && b.campanha.status !== 'ativa') return -1;
      if (b.campanha.status === 'ativa' && a.campanha.status !== 'ativa') return 1;
      return b.campanha.inicio.localeCompare(a.campanha.inicio);
    });
  }, [searchResult, campaigns]);

  return (
    <div
      id="portal-cliente"
      className="min-h-screen text-slate-100 flex flex-col justify-between animate-fade-in font-sans relative overflow-hidden"
      style={{
        background:
          'radial-gradient(900px 500px at 80% -10%, rgba(180,42,42,0.35), transparent 60%),' +
          'radial-gradient(700px 400px at -10% 110%, rgba(15,139,88,0.30), transparent 60%),' +
          'linear-gradient(135deg, #06163A 0%, #0A2A6E 50%, #1a0d3a 100%)',
      }}
    >
      {/* Snowfall overlay */}
      <Snowfall count={50} density="normal" />

      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <header className="backdrop-blur-md bg-[#06163A]/60 border-b border-[#FFC72C]/10 sticky top-0 z-30 shadow-lg">
        {/* Christmas lights string */}
        <ChristmasLights count={40} />
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 py-3 px-6">
          <div className="flex items-center gap-3">
            <ItaplanLogo size="md" invert />
            <span className="hidden sm:inline-block text-2xl">🎄</span>
          </div>
          <button
            id="btn-client-back"
            onClick={() => setPortal('landing')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white hover:text-[#FFC72C] bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 cursor-pointer uppercase tracking-wider"
          >
            <i className="ti ti-arrow-left"></i> Início
          </button>
        </div>
      </header>

      <div className="max-w-[820px] mx-auto w-full px-4 pt-10 sm:pt-12 pb-6 text-center space-y-4 relative z-10">
        <ChristmasBadge>Natal Premiado · Itabira 2025</ChristmasBadge>
        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          🎁 Seus números{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC72C] via-[#FFE08A] to-[#F5B800]">
            da sorte
          </span>
        </h1>
        <p className="text-sm text-blue-100/70 max-w-xl mx-auto leading-relaxed px-2">
          Consulte por CPF os cupons emitidos em qualquer campanha Itaplan — atual ou anterior. Os
          dados são exibidos apenas para você, anonimizados em registros públicos.
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-2 items-center justify-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#FFC72C] bg-[#FFC72C]/10 px-3.5 py-1.5 rounded-full border border-[#FFC72C]/20">
            <i className="ti ti-calendar-event"></i> Sorteio em{' '}
            <strong>{activeCampaign.sorteio.split('-').reverse().join('/')}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white bg-[#B42A2A]/30 px-3.5 py-1.5 rounded-full border border-[#B42A2A]/40">
            <i className="ti ti-gift"></i> Prêmio: 1 carro 0km + motos + vales
          </span>
        </div>
      </div>

      <div className="max-w-[820px] mx-auto w-full px-4 flex-1 pb-16 space-y-8 relative z-10">
        {/* Search */}
        <div className="bg-[#0f233d]/70 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[#FFC72C]/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B42A2A] via-[#FFC72C] to-[#0F8B58]"></div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#B42A2A]/20 text-[#FFC72C] flex items-center justify-center">
              <i className="ti ti-search"></i>
            </div>
            <h4 className="font-title text-sm font-black text-white">Consulte seu CPF</h4>
          </div>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9BB8F2]">
                  <i className="ti ti-user"></i>
                </span>
                <input
                  required
                  type="text"
                  maxLength={14}
                  className="w-full pl-10 pr-4 py-3 bg-[#06163A] text-white border border-[#1E5BCF]/25 focus:border-[#FFC72C] rounded-xl focus:outline-hidden text-sm font-bold placeholder:text-slate-500 transition-colors"
                  placeholder="000.000.000-00"
                  value={cpfInput}
                  onChange={(e) => setCpfInput(formatCPF(e.target.value))}
                />
              </div>
              <button
                id="btn-client-search"
                type="submit"
                disabled={isSearching}
                className="py-3 px-6 itp-gradient-gold hover:brightness-110 disabled:opacity-85 text-[#0E1A33] font-extrabold text-sm rounded-xl cursor-pointer transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Buscando...
                  </>
                ) : (
                  <>
                    <i className="ti ti-search text-base"></i> Consultar
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Apenas dígitos do CPF — sem armazenamento.</span>
              <button
                type="button"
                onClick={() => setCpfInput('123.456.789-00')}
                className="text-[#FFC72C] hover:text-[#FFE08A] font-extrabold cursor-pointer transition-colors"
              >
                💡 CPF de exemplo
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {searchResult && (
          <div id="client-search-results" className="space-y-6">
            {searchResult.found ? (
              <div className="space-y-6 animate-scale-up">
                {/* Profile */}
                <div className="bg-[#122b4f]/60 border border-[#1E5BCF]/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFC72C]/10 border border-[#FFC72C]/30 text-[#FFC72C] flex items-center justify-center text-2xl font-black">
                      {searchResult.nome?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-title text-lg font-black text-white">{searchResult.nome}</h4>
                      <p className="text-xs text-blue-200/80">
                        CPF: <strong className="font-mono">{cpfInput}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="itp-gradient-gold text-[#0E1A33] rounded-xl py-2 px-5 text-center shadow-lg">
                    <span className="text-[10px] font-black uppercase tracking-wider">Total acumulado</span>
                    <h3 className="font-title text-2xl font-black mt-0.5 tracking-tight leading-none">
                      {searchResult.cupons?.length} cupons
                    </h3>
                  </div>
                </div>

                {/* Coupons grouped by campaign */}
                {couponsByCampaign.map(({ campanha, cupons }) => {
                  const isActive = campanha.status === 'ativa';
                  const isNatal = campanha.tema === 'natal';
                  return (
                    <section key={campanha.id} className="space-y-3">
                      <div className={`flex items-center justify-between border-l-4 pl-3 ${isNatal && isActive ? 'border-[#B42A2A]' : 'border-[#FFC72C]'}`}>
                        <div>
                          <h5 className="font-title text-base font-black text-white flex items-center gap-1.5">
                            {isNatal && <span>🎄</span>}
                            {campanha.nome}
                          </h5>
                          <p className="text-[11px] text-blue-200/70">
                            {cupons.length} {cupons.length === 1 ? 'cupom' : 'cupons'} · {campanha.regra}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${
                            isNatal && isActive
                              ? 'bg-[#B42A2A]/30 text-[#FFE08A] border border-[#B42A2A]/50'
                              : isActive
                              ? 'bg-[#0F8B58]/20 text-[#7AE6B4] border border-[#0F8B58]/30'
                              : 'bg-white/5 text-blue-200/70 border border-white/10'
                          }`}
                        >
                          {isActive ? 'Concorrendo' : 'Encerrada'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cupons.map((coupon, idx) => (
                          <div
                            key={idx}
                            className={`relative rounded-2xl p-4 shadow-lg flex flex-col justify-between gap-2 group transition-all overflow-hidden ${
                              isNatal && isActive
                                ? 'bg-gradient-to-br from-[#3a0e0e] via-[#1a0820] to-[#071324] border-2 border-[#B42A2A]/40 hover:border-[#FFC72C]/60'
                                : 'bg-gradient-to-br from-[#0c203b] to-[#071324] border border-[#1E5BCF]/10 hover:border-[#FFC72C]/30'
                            }`}
                          >
                            {isNatal && isActive && (
                              <span className="absolute -top-2 -right-2 text-xl rotate-12 opacity-70">🎁</span>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200/50">
                                {isNatal && isActive ? '🎅 Nº da Sorte' : 'Número da sorte'}
                              </span>
                              <span className="text-[10px] text-blue-300/80 font-mono">{coupon.data}</span>
                            </div>
                            <div className={`font-title text-xl font-black tracking-wider ${
                              isNatal && isActive
                                ? 'text-[#FFE08A] group-hover:text-white'
                                : 'text-[#FFC72C] group-hover:text-[#FFE08A]'
                            }`}>
                              {coupon.numero}
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-white/5">
                              <span className="font-bold text-slate-300 truncate max-w-[170px]">{coupon.nomeLoja}</span>
                              <span className="font-semibold text-slate-400">{formatCurrency(coupon.valor)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}

                <div className="bg-[#FFC72C]/10 border border-[#FFC72C]/20 rounded-xl p-4 flex gap-3 text-[#FFC72C] text-xs">
                  <i className="ti ti-shield-check text-lg"></i>
                  <div>
                    Seus dados são exibidos apenas para você. Em registros públicos do sorteio, o CPF
                    aparece anonimizado conforme a LGPD.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#B42A2A]/10 border border-[#B42A2A]/20 rounded-2xl p-8 text-center space-y-4 animate-scale-up">
                <div className="w-12 h-12 rounded-full bg-[#B42A2A]/15 text-red-300 flex items-center justify-center mx-auto text-xl">
                  <i className="ti ti-ticket-off"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-title font-black text-base text-red-300">Nenhum cupom encontrado</h4>
                  <p className="text-xs text-slate-300">
                    O CPF <strong className="font-mono text-red-200">{cpfInput}</strong> ainda não
                    possui cupons em campanhas Itaplan.
                  </p>
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Para entrar no <strong className="text-[#FFC72C]">{activeCampaign.nome} 🎄</strong>,
                  faça compras a partir de <strong>R$ {activeCampaign.regraValor.toFixed(2).replace('.', ',')}</strong>{' '}
                  nas lojas credenciadas em Itabira e peça seu cupom no caixa.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-[#040a14]/80 backdrop-blur py-6 text-center text-xs text-blue-200/40 border-t border-[#FFC72C]/10 relative z-10">
        <p className="px-4">🎄 Itaplan · Comércio itabirano · Boas festas e boa sorte!</p>
      </div>
    </div>
  );
}
