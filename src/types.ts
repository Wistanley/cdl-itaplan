export type Portal = 'landing' | 'admin' | 'lojista' | 'cliente';

export type AdminTab =
  | 'dashboard'
  | 'campanhas'
  | 'lojas'
  | 'comunicados'
  | 'documentos'
  | 'insights'
  | 'configuracoes';

export type LojistaTab =
  | 'dashboard'
  | 'vendas'
  | 'campanhas'
  | 'comunicados'
  | 'documentos'
  | 'insights';

export type CampaignTheme =
  | 'natal'
  | 'maes'
  | 'pais'
  | 'criancas'
  | 'namorados'
  | 'aniversario'
  | 'volta-aulas'
  | 'inverno';

export type CampaignStatus = 'ativa' | 'planejada' | 'encerrada' | 'rascunho';

export interface Campaign {
  id: number;
  nome: string;
  tema: CampaignTheme;
  status: CampaignStatus;
  inicio: string;
  fim: string;
  sorteio: string;
  regra: string;
  regraValor: number;
  totalCupons: number;
  cuponsMeta: number;
  premios: number;
  premiosDescricao: string;
  lojasParticipantes: number;
  icone: string;
  corPrimaria: string;
  corSecundaria: string;
  destaque?: string;
}

export interface Store {
  id: number;
  nome: string;
  responsavel: string;
  categoria: string;
  piso: string;
  loja: string;
  cuponsEmitidos: number;
  vendasRegistradas: number;
  meta: number;
  ticketMedio: number;
  engajamento: number;
  faturamentoMes: number;
  notasFiscais: number;
}

export interface ClientRecent {
  cpf: string;
  nome: string;
  cupons: number;
  tempo: string;
  campanhaId: number;
}

export interface Transaction {
  id: string;
  cpf: string;
  clienteNome: string;
  valor: number;
  cupons: number;
  horario: string;
  data: string;
  lojaNome: string;
  campanhaId: number;
}

export interface Coupon {
  numero: string;
  data: string;
  nomeLoja: string;
  valor: number;
  campanhaId: number;
  campanhaNome: string;
}

export type ComunicadoTipo = 'memorando' | 'alerta' | 'comunicado' | 'evento';
export type ComunicadoPrioridade = 'alta' | 'media' | 'baixa';

export interface Comunicado {
  id: number;
  tipo: ComunicadoTipo;
  titulo: string;
  resumo: string;
  conteudo: string;
  remetente: string;
  cargo: string;
  data: string;
  lido: boolean;
  prioridade: ComunicadoPrioridade;
  destinatarios: 'todas-lojas' | 'segmento' | 'gerentes';
  anexo?: string;
}

export type DocumentoTipo =
  | 'relatorio-financeiro'
  | 'regulamento'
  | 'contrato'
  | 'manual'
  | 'apresentacao'
  | 'auditoria';
export type DocumentoFormato = 'pdf' | 'xlsx' | 'docx' | 'pptx';

export interface Documento {
  id: number;
  nome: string;
  tipo: DocumentoTipo;
  formato: DocumentoFormato;
  tamanho: string;
  dataPublicacao: string;
  autor: string;
  confidencial: boolean;
  acessosSemana: number;
  descricao: string;
}

export interface DemographicAge {
  faixa: string;
  percentual: number;
}

export interface DemographicGender {
  feminino: number;
  masculino: number;
  outros: number;
}

export interface NeighborhoodData {
  bairro: string;
  visitantes: number;
  percentual: number;
  ticketMedio: number;
}

export interface SegmentShare {
  segmento: string;
  shareOfWallet: number;
  shareOfVisits: number;
  cor: string;
}
