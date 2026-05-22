import { useState, useMemo } from 'react';
import type {
  Portal,
  Campaign,
  Store,
  ClientRecent,
  Transaction,
  Coupon,
  Comunicado,
  Documento,
} from './types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_STORES,
  INITIAL_CLIENTS_RECENT,
  INITIAL_TRANSACTIONS,
  INITIAL_CPF_DATABASE,
  INITIAL_COMUNICADOS,
  INITIAL_DOCUMENTOS,
} from './data';
import Landing from './portals/Landing';
import Admin from './portals/Admin';
import Lojista from './portals/Lojista';
import Cliente from './portals/Cliente';

export default function App() {
  const [portal, setPortal] = useState<Portal>('landing');

  // Global shared state — kept in memory only
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [clientsRecent, setClientsRecent] = useState<ClientRecent[]>(INITIAL_CLIENTS_RECENT);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cpfDatabase, setCpfDatabase] = useState<Record<string, { nome: string; cupons: Coupon[] }>>(
    INITIAL_CPF_DATABASE,
  );
  const [comunicados, setComunicados] = useState<Comunicado[]>(INITIAL_COMUNICADOS);
  const [documentos] = useState<Documento[]>(INITIAL_DOCUMENTOS);

  // Derived
  const activeCampaign = useMemo(
    () => campaigns.find((c) => c.status === 'ativa') || campaigns[0],
    [campaigns],
  );

  const newlyCreatedCoupons = useMemo(() => {
    const initialSum = INITIAL_STORES.reduce((acc, s) => acc + s.cuponsEmitidos, 0);
    const currentSum = stores.reduce((acc, s) => acc + s.cuponsEmitidos, 0);
    return Math.max(0, currentSum - initialSum);
  }, [stores]);

  const totalCouponsEmitted = activeCampaign.totalCupons + newlyCreatedCoupons;
  const totalRegisteredClients = 1293 + Math.floor(newlyCreatedCoupons / 4);

  return (
    <div className="min-h-screen text-[#0E1A33] font-sans antialiased">
      {portal === 'landing' && (
        <Landing
          setPortal={setPortal}
          activeCampaign={activeCampaign}
          totalLojas={stores.length}
          totalCupons={totalCouponsEmitted}
        />
      )}

      {portal === 'admin' && (
        <Admin
          setPortal={setPortal}
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          activeCampaign={activeCampaign}
          stores={stores}
          setStores={setStores}
          clientsRecent={clientsRecent}
          comunicados={comunicados}
          setComunicados={setComunicados}
          documentos={documentos}
          totalCouponsEmitted={totalCouponsEmitted}
          totalRegisteredClients={totalRegisteredClients}
        />
      )}

      {portal === 'lojista' && (
        <Lojista
          setPortal={setPortal}
          campaigns={campaigns}
          activeCampaign={activeCampaign}
          stores={stores}
          setStores={setStores}
          transactions={transactions}
          setTransactions={setTransactions}
          clientsRecent={clientsRecent}
          setClientsRecent={setClientsRecent}
          cpfDatabase={cpfDatabase}
          setCpfDatabase={setCpfDatabase}
          comunicados={comunicados}
          documentos={documentos}
        />
      )}

      {portal === 'cliente' && (
        <Cliente
          setPortal={setPortal}
          cpfDatabase={cpfDatabase}
          campaigns={campaigns}
          activeCampaign={activeCampaign}
        />
      )}
    </div>
  );
}
