import type {
  Campaign,
  Store,
  ClientRecent,
  Transaction,
  Coupon,
  Comunicado,
  Documento,
  DemographicAge,
  DemographicGender,
  NeighborhoodData,
  SegmentShare,
} from './types';

// ==========================================
// CAMPAIGNS — múltiplas campanhas (passadas, ativa, futuras)
// ==========================================
export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    nome: 'Natal Premiado 2025',
    tema: 'natal',
    status: 'ativa',
    inicio: '2025-12-01',
    fim: '2025-12-31',
    sorteio: '2026-01-05',
    regra: 'R$ 50,00 = 1 número da sorte',
    regraValor: 50.0,
    totalCupons: 3847,
    cuponsMeta: 6000,
    premios: 5,
    premiosDescricao: '1 carro 0km, 2 motos, 2 vales-compra de R$ 5.000',
    lojasParticipantes: 34,
    icone: 'ti-christmas-tree',
    corPrimaria: '#0A2A6E',
    corSecundaria: '#F5B800',
    destaque: 'Campanha de maior tradição do Itaplan',
  },
  {
    id: 2,
    nome: 'Volta às Aulas 2026',
    tema: 'volta-aulas',
    status: 'planejada',
    inicio: '2026-01-20',
    fim: '2026-02-28',
    sorteio: '2026-03-05',
    regra: 'R$ 80,00 = 1 número da sorte',
    regraValor: 80.0,
    totalCupons: 0,
    cuponsMeta: 3000,
    premios: 3,
    premiosDescricao: '3 vales-compra de R$ 3.000 + kits escolares',
    lojasParticipantes: 28,
    icone: 'ti-backpack',
    corPrimaria: '#1E5BCF',
    corSecundaria: '#FFC72C',
  },
  {
    id: 3,
    nome: 'Dia das Mães 2026',
    tema: 'maes',
    status: 'planejada',
    inicio: '2026-04-20',
    fim: '2026-05-12',
    sorteio: '2026-05-15',
    regra: 'R$ 80,00 = 1 número da sorte',
    regraValor: 80.0,
    totalCupons: 0,
    cuponsMeta: 4500,
    premios: 4,
    premiosDescricao: 'Diárias em spa, joias, vales-compra e cestas especiais',
    lojasParticipantes: 0,
    icone: 'ti-flower',
    corPrimaria: '#B81560',
    corSecundaria: '#FFC72C',
  },
  {
    id: 4,
    nome: 'Dia dos Namorados 2026',
    tema: 'namorados',
    status: 'rascunho',
    inicio: '2026-06-01',
    fim: '2026-06-12',
    sorteio: '2026-06-15',
    regra: 'R$ 100,00 = 1 número da sorte',
    regraValor: 100.0,
    totalCupons: 0,
    cuponsMeta: 3000,
    premios: 2,
    premiosDescricao: 'Viagem para 2 pessoas + jantar premium',
    lojasParticipantes: 0,
    icone: 'ti-heart',
    corPrimaria: '#B42A2A',
    corSecundaria: '#FFC72C',
  },
  {
    id: 5,
    nome: 'Festival de Inverno 2025',
    tema: 'inverno',
    status: 'encerrada',
    inicio: '2025-06-15',
    fim: '2025-07-30',
    sorteio: '2025-08-05',
    regra: 'R$ 60,00 = 1 número da sorte',
    regraValor: 60.0,
    totalCupons: 4218,
    cuponsMeta: 4000,
    premios: 4,
    premiosDescricao: 'Viagens, vales-compra e prêmios temáticos',
    lojasParticipantes: 30,
    icone: 'ti-snowflake',
    corPrimaria: '#0F6E8C',
    corSecundaria: '#A0C4E2',
  },
  {
    id: 6,
    nome: 'Dia dos Pais 2025',
    tema: 'pais',
    status: 'encerrada',
    inicio: '2025-07-25',
    fim: '2025-08-10',
    sorteio: '2025-08-12',
    regra: 'R$ 80,00 = 1 número da sorte',
    regraValor: 80.0,
    totalCupons: 2890,
    cuponsMeta: 3000,
    premios: 3,
    premiosDescricao: 'Smart TV, churrasqueira premium, vales-compra',
    lojasParticipantes: 32,
    icone: 'ti-mustache',
    corPrimaria: '#2D5C2D',
    corSecundaria: '#F5B800',
  },
];

// ==========================================
// STORES — lojas parceiras do comércio itabirano
// ==========================================
export const INITIAL_STORES: Store[] = [
  { id: 1, nome: 'Supermercado Alfa',     responsavel: 'Carlos Silva',     categoria: 'Alimentação', bairro: 'Centro',    endereco: 'Rua Sete de Setembro, 234',          cuponsEmitidos: 1250, vendasRegistradas: 840, meta: 1500, ticketMedio: 187.50, engajamento: 94, faturamentoMes: 489_300, notasFiscais: 2845 },
  { id: 2, nome: 'Moda & Estilo',         responsavel: 'Ana Oliveira',     categoria: 'Vestuário',   bairro: 'Centro',    endereco: 'Rua João Pinheiro, 89',              cuponsEmitidos: 812,  vendasRegistradas: 530, meta: 800,  ticketMedio: 245.00, engajamento: 89, faturamentoMes: 312_800, notasFiscais: 1620 },
  { id: 3, nome: 'Farmácia Central',      responsavel: 'Roberto Santos',   categoria: 'Saúde',       bairro: 'Pedreira',  endereco: 'Av. Carlos Drummond de Andrade, 1240', cuponsEmitidos: 620,  vendasRegistradas: 410, meta: 600,  ticketMedio: 92.00,  engajamento: 78, faturamentoMes: 178_900, notasFiscais: 1980 },
  { id: 4, nome: 'Eletro Lar',            responsavel: 'Fernanda Costa',   categoria: 'Eletrônicos', bairro: 'Centro',    endereco: 'Av. Carlos Drummond de Andrade, 540',  cuponsEmitidos: 580,  vendasRegistradas: 390, meta: 1000, ticketMedio: 1290.00, engajamento: 71, faturamentoMes: 920_500, notasFiscais: 728 },
  { id: 5, nome: 'Calçados Passo Seguro', responsavel: 'Marcos Souza',     categoria: 'Vestuário',   bairro: 'Esplanada', endereco: 'Rua Vasco Lessa, 102',               cuponsEmitidos: 410,  vendasRegistradas: 290, meta: 500,  ticketMedio: 168.00, engajamento: 82, faturamentoMes: 142_300, notasFiscais: 845 },
  { id: 6, nome: 'Bazar Mil Coisas',      responsavel: 'Juliana Lima',     categoria: 'Casa',        bairro: 'Bom Jesus', endereco: 'Rua Cruzeiro, 78',                   cuponsEmitidos: 175,  vendasRegistradas: 120, meta: 300,  ticketMedio: 48.00,  engajamento: 64, faturamentoMes: 56_400,  notasFiscais: 1180 },
  { id: 7, nome: 'Café Aroma',            responsavel: 'Pedro Henrique',   categoria: 'Alimentação', bairro: 'Centro',    endereco: 'Praça da Estação, s/n',              cuponsEmitidos: 290,  vendasRegistradas: 245, meta: 350,  ticketMedio: 38.50,  engajamento: 86, faturamentoMes: 88_200,  notasFiscais: 2390 },
  { id: 8, nome: 'Beleza Glamour',        responsavel: 'Camila Andrade',   categoria: 'Beleza',      bairro: 'Centro',    endereco: 'Rua João Pinheiro, 156',             cuponsEmitidos: 340,  vendasRegistradas: 215, meta: 400,  ticketMedio: 215.00, engajamento: 88, faturamentoMes: 196_800, notasFiscais: 920 },
];

export const INITIAL_CLIENTS_RECENT: ClientRecent[] = [
  { cpf: '123.***.***-00', nome: 'Stanley Oliveira',  cupons: 10, tempo: '2 min atrás',  campanhaId: 1 },
  { cpf: '456.***.***-11', nome: 'Clara Fernandes',   cupons: 3,  tempo: '15 min atrás', campanhaId: 1 },
  { cpf: '789.***.***-22', nome: 'Bernardo Rocha',    cupons: 5,  tempo: '34 min atrás', campanhaId: 1 },
  { cpf: '987.***.***-33', nome: 'Gabriela Neves',    cupons: 2,  tempo: '1 hora atrás', campanhaId: 1 },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TXN-8492', cpf: '456.***.***-11', clienteNome: 'Clara Fernandes',  valor: 135.50, cupons: 2, horario: '12:42', data: '22/12/2025', lojaNome: 'Moda & Estilo',     campanhaId: 1 },
  { id: 'TXN-3129', cpf: '789.***.***-22', clienteNome: 'Bernardo Rocha',   valor: 270.00, cupons: 5, horario: '12:23', data: '22/12/2025', lojaNome: 'Eletro Lar',        campanhaId: 1 },
  { id: 'TXN-5510', cpf: '987.***.***-33', clienteNome: 'Gabriela Neves',   valor: 110.00, cupons: 2, horario: '11:56', data: '22/12/2025', lojaNome: 'Bazar Mil Coisas',  campanhaId: 1 },
  { id: 'TXN-1002', cpf: '123.***.***-00', clienteNome: 'Stanley Oliveira', valor: 500.00, cupons: 10, horario: '10:15', data: '22/12/2025', lojaNome: 'Supermercado Alfa', campanhaId: 1 },
];

// ==========================================
// CPF DATABASE — Cliente busca cupons aqui
// ==========================================
export const INITIAL_CPF_DATABASE: Record<string, { nome: string; cupons: Coupon[] }> = {
  '123.456.789-00': {
    nome: 'Stanley Oliveira',
    cupons: [
      { numero: '2025-294021', data: '04/12/2025', nomeLoja: 'Supermercado Alfa', valor: 50.00,  campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-294022', data: '04/12/2025', nomeLoja: 'Supermercado Alfa', valor: 50.00,  campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-301140', data: '10/12/2025', nomeLoja: 'Moda & Estilo',     valor: 95.00,  campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-412290', data: '15/12/2025', nomeLoja: 'Supermercado Alfa', valor: 150.00, campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-412291', data: '15/12/2025', nomeLoja: 'Supermercado Alfa', valor: 150.00, campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-412292', data: '15/12/2025', nomeLoja: 'Supermercado Alfa', valor: 150.00, campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      { numero: '2025-492305', data: '20/12/2025', nomeLoja: 'Farmácia Central',  valor: 170.00, campanhaId: 1, campanhaNome: 'Natal Premiado 2025' },
      // Campanha encerrada — histórico
      { numero: '2025-188204', data: '12/08/2025', nomeLoja: 'Eletro Lar',        valor: 280.00, campanhaId: 6, campanhaNome: 'Dia dos Pais 2025' },
      { numero: '2025-188205', data: '12/08/2025', nomeLoja: 'Eletro Lar',        valor: 280.00, campanhaId: 6, campanhaNome: 'Dia dos Pais 2025' },
      { numero: '2025-188206', data: '12/08/2025', nomeLoja: 'Eletro Lar',        valor: 280.00, campanhaId: 6, campanhaNome: 'Dia dos Pais 2025' },
    ],
  },
};

// ==========================================
// CHART DATA — emissões diárias dezembro
// ==========================================
export const EMISSIONS_DAILY_CHART: number[] = [
  140, 180, 210, 195, 170, 220, 230, 150, 160, 205, 240, 190,
  180, 215, 225, 210, 190, 200, 248, 235, 185, 195, 210,
];

// ==========================================
// COMUNICADOS — memorandos / alertas
// ==========================================
export const INITIAL_COMUNICADOS: Comunicado[] = [
  {
    id: 1,
    tipo: 'memorando',
    titulo: 'MEMO 042/2025 — Ajuste de horário no período natalino',
    resumo: 'Comércio itabirano em horário estendido entre 18 e 24 de dezembro.',
    conteudo: 'A administração do Itaplan, em conjunto com a Prefeitura de Itabira e a CDL, informa que entre os dias 18 e 24 de dezembro o comércio do Centro funcionará em horário estendido das 09h00 às 22h00. As lojas credenciadas devem garantir equipe completa neste período e ajustar escalas. Lojas dos bairros Pedreira e Esplanada com aderência facultativa.',
    remetente: 'Mariana Vasconcelos',
    cargo: 'Coordenação Itaplan',
    data: '2025-12-15',
    lido: false,
    prioridade: 'alta',
    destinatarios: 'todas-lojas',
  },
  {
    id: 2,
    tipo: 'alerta',
    titulo: 'ALERTA — Manutenção programada do sistema de PDV',
    resumo: 'Janela de manutenção do gateway de pagamento na madrugada de 20/12.',
    conteudo: 'Comunicamos que haverá manutenção programada do sistema de pagamento integrado ao Itaplan entre 02h00 e 04h00 do dia 20/12/2025. Operações com cartão podem ficar instáveis neste período. Recomendamos avisar a equipe noturna e ter uma forma alternativa de cobrança disponível.',
    remetente: 'Tiago Ribeiro',
    cargo: 'Coordenação de TI',
    data: '2025-12-17',
    lido: false,
    prioridade: 'alta',
    destinatarios: 'todas-lojas',
  },
  {
    id: 3,
    tipo: 'comunicado',
    titulo: 'Resultado da pesquisa de satisfação — Nov/2025',
    resumo: 'Nota de satisfação do comércio itabirano atingiu 78 pontos, alta de 6 pontos.',
    conteudo: 'A pesquisa de satisfação aplicada em novembro/2025 com 1.842 consumidores registrou nota consolidada do comércio itabirano de 78 pontos (em outubro foi 72). Pontos elogiados: atendimento, variedade de lojas e preços. Pontos a melhorar: sinalização das vagas de estacionamento no Centro e cobertura de internet nas praças. Plano de ação em anexo.',
    remetente: 'Camila Andrade',
    cargo: 'Marketing Itaplan',
    data: '2025-12-10',
    lido: true,
    prioridade: 'media',
    destinatarios: 'todas-lojas',
    anexo: 'pesquisa-nps-novembro-2025.pdf',
  },
  {
    id: 4,
    tipo: 'evento',
    titulo: 'Treinamento gratuito: Atendimento de Excelência',
    resumo: 'Auditório central, 10/01/2026, 14h às 17h. Vagas limitadas.',
    conteudo: 'O Itaplan oferece, em parceria com o Senac, o treinamento "Atendimento de Excelência no Varejo", com a Profa. Helena Vieira. Auditório central, dia 10/01/2026 das 14h às 17h. Inscrições pelo portal do lojista até 05/01/2026. Vagas limitadas a 2 colaboradores por loja.',
    remetente: 'Núcleo de Treinamentos',
    cargo: 'RH Itaplan',
    data: '2025-12-08',
    lido: true,
    prioridade: 'baixa',
    destinatarios: 'todas-lojas',
  },
  {
    id: 5,
    tipo: 'memorando',
    titulo: 'MEMO 041/2025 — Política de devoluções no pós-Natal',
    resumo: 'Diretrizes obrigatórias para o atendimento de trocas entre 26/12 e 10/01.',
    conteudo: 'Está vigente a política unificada de trocas pós-Natal entre 26/12/2025 e 10/01/2026. Lojas devem aceitar trocas mediante apresentação de nota fiscal, em itens lacrados e sem uso. Casos especiais devem ser tratados na ouvidoria central. Documentação completa anexada.',
    remetente: 'Mariana Vasconcelos',
    cargo: 'Superintendente Itaplan',
    data: '2025-12-05',
    lido: true,
    prioridade: 'media',
    destinatarios: 'todas-lojas',
    anexo: 'politica-trocas-pos-natal-2025.pdf',
  },
  {
    id: 6,
    tipo: 'alerta',
    titulo: 'ALERTA — Vistoria do Corpo de Bombeiros nas lojas credenciadas',
    resumo: 'Vistoria oficial agendada para 22/12 nas lojas do Centro e Pedreira.',
    conteudo: 'Em razão de vistoria oficial do Corpo de Bombeiros de Itabira agendada para 22/12/2025, todas as lojas credenciadas Itaplan devem manter saídas de emergência desobstruídas, extintores na validade e AVCB visível na entrada. A equipe técnica do Itaplan estará em ronda preventiva nas lojas do Centro e Pedreira entre 19 e 21/12.',
    remetente: 'Lucas Pereira',
    cargo: 'Segurança e Conformidade',
    data: '2025-12-12',
    lido: false,
    prioridade: 'alta',
    destinatarios: 'todas-lojas',
  },
  {
    id: 7,
    tipo: 'comunicado',
    titulo: 'Relatório mensal de fluxo — Novembro 2025',
    resumo: '892.430 visitantes únicos. Crescimento de 12% YoY.',
    conteudo: 'O fluxo consolidado nas lojas credenciadas do comércio itabirano em novembro/2025 atingiu 892.430 visitas únicas (somatório das lojas), alta de 12% em relação a novembro/2024. Pico de fluxo: sábado 22/11 (54.200 visitas). Tempo médio de permanência no Centro: 1h47min. Dados completos no relatório anexo.',
    remetente: 'Inteligência de Dados',
    cargo: 'Inteligência de Dados Itaplan',
    data: '2025-12-03',
    lido: true,
    prioridade: 'baixa',
    destinatarios: 'todas-lojas',
    anexo: 'relatorio-fluxo-novembro-2025.pdf',
  },
];

// ==========================================
// DOCUMENTOS — repositório seguro
// ==========================================
export const INITIAL_DOCUMENTOS: Documento[] = [
  {
    id: 1,
    nome: 'Relatório Financeiro Consolidado — Nov/2025',
    tipo: 'relatorio-financeiro',
    formato: 'pdf',
    tamanho: '4.2 MB',
    dataPublicacao: '2025-12-05',
    autor: 'Diretoria Financeira',
    confidencial: true,
    acessosSemana: 142,
    descricao: 'Demonstrativo financeiro consolidado de novembro: receitas, mensalidades de credenciamento, custos operacionais e provisões.',
  },
  {
    id: 2,
    nome: 'Regulamento — Natal Premiado 2025',
    tipo: 'regulamento',
    formato: 'pdf',
    tamanho: '880 KB',
    dataPublicacao: '2025-11-28',
    autor: 'Jurídico Itaplan',
    confidencial: false,
    acessosSemana: 489,
    descricao: 'Regulamento oficial registrado em cartório. SUSEP nº 03/2025.',
  },
  {
    id: 3,
    nome: 'Contrato de Adesão — Lojistas 2026',
    tipo: 'contrato',
    formato: 'docx',
    tamanho: '215 KB',
    dataPublicacao: '2025-12-01',
    autor: 'Jurídico Itaplan',
    confidencial: true,
    acessosSemana: 67,
    descricao: 'Modelo padrão de contrato de adesão ao programa de campanhas e benefícios para 2026.',
  },
  {
    id: 4,
    nome: 'Auditoria LGPD — 3º Trimestre 2025',
    tipo: 'auditoria',
    formato: 'pdf',
    tamanho: '2.8 MB',
    dataPublicacao: '2025-10-30',
    autor: 'Encarregado de Dados Itaplan',
    confidencial: true,
    acessosSemana: 31,
    descricao: 'Relatório de auditoria de conformidade LGPD: tratamento de CPFs, anonimização e logs de acesso.',
  },
  {
    id: 5,
    nome: 'Manual do Lojista — Portal Itaplan',
    tipo: 'manual',
    formato: 'pdf',
    tamanho: '6.1 MB',
    dataPublicacao: '2025-09-15',
    autor: 'Operações',
    confidencial: false,
    acessosSemana: 218,
    descricao: 'Guia completo de uso do portal: cadastro de vendas, emissão de cupons e relatórios.',
  },
  {
    id: 6,
    nome: 'Apresentação Comercial — Campanha Volta às Aulas',
    tipo: 'apresentacao',
    formato: 'pptx',
    tamanho: '12.4 MB',
    dataPublicacao: '2025-12-18',
    autor: 'Marketing Itaplan',
    confidencial: false,
    acessosSemana: 95,
    descricao: 'Estratégia, mecânica, mídia e materiais de PDV para a campanha de Volta às Aulas 2026.',
  },
  {
    id: 7,
    nome: 'Planilha Master — Mensalidades de Credenciamento 2025',
    tipo: 'relatorio-financeiro',
    formato: 'xlsx',
    tamanho: '1.6 MB',
    dataPublicacao: '2025-12-01',
    autor: 'Controladoria',
    confidencial: true,
    acessosSemana: 22,
    descricao: 'Planilha consolidada de mensalidades de credenciamento, aging e inadimplência por loja parceira.',
  },
  {
    id: 8,
    nome: 'Código de Conduta — Lojistas e Colaboradores',
    tipo: 'regulamento',
    formato: 'pdf',
    tamanho: '540 KB',
    dataPublicacao: '2025-02-10',
    autor: 'Conformidade',
    confidencial: false,
    acessosSemana: 18,
    descricao: 'Princípios éticos, condutas esperadas e canais de denúncia.',
  },
];

// ==========================================
// INSIGHTS — perfil demográfico (anonimizado, LGPD)
// ==========================================
export const DEMOGRAPHIC_AGES: DemographicAge[] = [
  { faixa: '18-24', percentual: 14 },
  { faixa: '25-34', percentual: 29 },
  { faixa: '35-44', percentual: 24 },
  { faixa: '45-54', percentual: 17 },
  { faixa: '55-64', percentual: 11 },
  { faixa: '65+',   percentual: 5  },
];

export const DEMOGRAPHIC_GENDER: DemographicGender = {
  feminino: 58,
  masculino: 39,
  outros: 3,
};

export const NEIGHBORHOODS: NeighborhoodData[] = [
  { bairro: 'Centro',        visitantes: 24_580, percentual: 27, ticketMedio: 168.0 },
  { bairro: 'Pedreira',      visitantes: 18_320, percentual: 20, ticketMedio: 154.0 },
  { bairro: 'Esplanada',     visitantes: 14_215, percentual: 16, ticketMedio: 142.0 },
  { bairro: 'Bom Jesus',     visitantes: 11_890, percentual: 13, ticketMedio: 189.0 },
  { bairro: 'Major Lage',    visitantes: 9_410,  percentual: 10, ticketMedio: 96.0  },
  { bairro: 'Areão',         visitantes: 6_620,  percentual: 7,  ticketMedio: 115.0 },
  { bairro: 'Outros bairros', visitantes: 6_890, percentual: 7,  ticketMedio: 132.0 },
];

export const SEGMENT_SHARES: SegmentShare[] = [
  { segmento: 'Moda e Vestuário',    shareOfWallet: 28, shareOfVisits: 24, cor: '#1E5BCF' },
  { segmento: 'Alimentação',          shareOfWallet: 22, shareOfVisits: 35, cor: '#F5B800' },
  { segmento: 'Eletro e Tech',        shareOfWallet: 18, shareOfVisits: 8,  cor: '#0A2A6E' },
  { segmento: 'Beleza e Saúde',       shareOfWallet: 12, shareOfVisits: 14, cor: '#B81560' },
  { segmento: 'Casa e Decoração',     shareOfWallet: 10, shareOfVisits: 6,  cor: '#0F8B58' },
  { segmento: 'Serviços e Outros',    shareOfWallet: 10, shareOfVisits: 13, cor: '#8893AE' },
];

export const FLUXO_DIARIO_CHART: number[] = [
  /* Seg–Dom × 4 semanas, valores em milhares */
  18, 22, 24, 26, 32, 48, 41,
  19, 24, 26, 28, 35, 52, 44,
  21, 25, 28, 30, 38, 54, 46,
  22, 27, 29, 32, 40, 56, 48,
];
