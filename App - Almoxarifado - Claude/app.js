/* ============================================================
   ALMOXARIFADO — app.js
   Vanilla JS · Hash Router · In-Memory State
   ============================================================ */

'use strict';

// ============================================================
// DATA STORE
// ============================================================
const EMOJIS = ['📦','🔧','⚙️','🖨️','🖥️','🔌','💡','🧰','📋','🔬'];

const db = {
  perfil: 'Admin', // Perfil atual

  fornecedores: [
    { id: 1, nome: 'Tech Supply Ltda.', contato: 'contato@techsupply.com' },
    { id: 2, nome: 'Papelaria Total',   contato: 'vendas@papeleriatotal.com' },
    { id: 3, nome: 'Elétrica & Cia',   contato: 'eletrica@cia.com.br' },
    { id: 4, nome: 'Office Pro',        contato: 'office@pro.com.br' },
  ],

  tipos: ['Eletrônico', 'Consumível', 'Ferramenta', 'EPI', 'Móvel', 'Hidráulico', 'Elétrico', 'Informática'],

  centros: ['CC-001 | Administrativo', 'CC-002 | TI', 'CC-003 | Financeiro', 'CC-004 | Comercial', 'CC-005 | Operações', 'CC-ALM | Almoxarifado'],

  setores: ['Suporte TI', 'RH', 'Contabilidade', 'Comercial', 'Diretoria', 'Manutenção'],

  colaboradores: [
    { id: 1, nome: 'João Silva',     cpf: '123.456.789-00', centro: 'CC-002 | TI',             cargo: 'Analista TI' },
    { id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', centro: 'CC-001 | Administrativo',  cargo: 'Assistente Adm.' },
    { id: 3, nome: 'Pedro Santos',   cpf: '111.222.333-44', centro: 'CC-005 | Operações',        cargo: 'Técnico Manutenção' },
    { id: 4, nome: 'Carla Mendes',   cpf: '555.666.777-88', centro: 'CC-003 | Financeiro',       cargo: 'Analista Financeiro' },
    { id: 5, nome: 'Lucas Ferreira', cpf: '999.888.777-66', centro: 'CC-004 | Comercial',        cargo: 'Consultor Comercial' },
  ],

  // Histórico de preços por itemId: [{data, preco, qtd}]
  historicoPrecos: {
    1: [{ data:'2024-08-01', preco:92.00, qtd:10 }, { data:'2024-10-15', preco:89.90, qtd:10 }],
    2: [{ data:'2024-09-01', preco:61.00, qtd:8  }],
    3: [{ data:'2024-07-01', preco:23.50, qtd:20 }, { data:'2024-11-01', preco:24.50, qtd:20 }],
    5: [{ data:'2024-10-20', preco:19.90, qtd:5  }],
  },

  _nextIds: { item:9, req:5, compra:4, colaborador:6 },

  usuarios: [
    { id: 1, nome: 'Fernando Rabello', perfil: 'Admin',        avatar: 'FR' },
    { id: 2, nome: 'Ana Paula',        perfil: 'Gestor',       avatar: 'AP' },
    { id: 3, nome: 'Carlos Lima',      perfil: 'Almoxarifado', avatar: 'CL' },
    { id: 4, nome: 'Mariana Souza',    perfil: 'Compras',      avatar: 'MS' },
    { id: 5, nome: 'Rodrigo Faria',    perfil: 'Diretoria',    avatar: 'RF' },
  ],

  itens: [
    { id: 1, codigo:'ITEM-001', descricao:'Teclado USB ABNT2',       fabricante:'Logitech',    ncm:'84716021', tipo:'Informática', fornecedor:1, status:'Ativo',   preco:89.90,   precomed:91.50, qtd:3,  min:5,  max:30, pontoReposicao:17, paraEstoque:true,  validade:'', obs:'Estoque crítico' },
    { id: 2, codigo:'ITEM-002', descricao:'Mouse Óptico sem fio',    fabricante:'Microsoft',   ncm:'84716029', tipo:'Informática', fornecedor:1, status:'Ativo',   preco:59.90,   precomed:62.00, qtd:12, min:5,  max:25, pontoReposicao:15, paraEstoque:true,  validade:'', obs:'' },
    { id: 3, codigo:'ITEM-003', descricao:'Resma Papel A4 75g',      fabricante:'Report',      ncm:'48025610', tipo:'Consumível',  fornecedor:2, status:'Ativo',   preco:24.50,   precomed:24.50, qtd:2,  min:10, max:50, pontoReposicao:30, paraEstoque:true,  validade:'2026-12-01', obs:'Crítico' },
    { id: 4, codigo:'ITEM-004', descricao:'Cartucho HP 664 Preto',   fabricante:'HP',          ncm:'84439950', tipo:'Consumível',  fornecedor:4, status:'Ativo',   preco:39.90,   precomed:38.00, qtd:8,  min:4,  max:20, pontoReposicao:12, paraEstoque:true,  validade:'2025-06-01', obs:'' },
    { id: 5, codigo:'ITEM-005', descricao:'Cabo HDMI 2m',            fabricante:'Multilaser',  ncm:'85444290', tipo:'Elétrico',    fornecedor:3, status:'Ativo',   preco:19.90,   precomed:20.00, qtd:15, min:3,  max:15, pontoReposicao:9,  paraEstoque:true,  validade:'', obs:'' },
    { id: 6, codigo:'ITEM-006', descricao:'Pen Drive 32GB',          fabricante:'Kingston',    ncm:'84717013', tipo:'Informática', fornecedor:1, status:'Ativo',   preco:29.90,   precomed:31.00, qtd:20, min:5,  max:30, pontoReposicao:17, paraEstoque:true,  validade:'', obs:'' },
    { id: 7, codigo:'ITEM-007', descricao:'Cadeira de Escritório',   fabricante:'Flexform',    ncm:'94013000', tipo:'Móvel',       fornecedor:4, status:'Inativo', preco:890.00,  precomed:890.00,qtd:6,  min:2,  max:10, pontoReposicao:6,  paraEstoque:true,  validade:'', obs:'Em revisão' },
    { id: 8, codigo:'ITEM-008', descricao:'Lâmpada LED 12W',         fabricante:'Philips',     ncm:'85393290', tipo:'Elétrico',    fornecedor:3, status:'Ativo',   preco:14.90,   precomed:14.90, qtd:18, min:10, max:40, pontoReposicao:25, paraEstoque:true,  validade:'', obs:'' },
  ],

  requisicoes: [
    {
      id: 1, codigo:'REQ-2024-001',
      solicitante:'Fernando Rabello', centro:'CC-002 | TI', setor:'Suporte TI',
      prioridade:'Alta', status:'EmAprovacaoGestor', data:'2024-11-10',
      obs:'Urgente para projeto de implantação',
      itens: [
        { itemId:1, descricao:'Teclado USB ABNT2',    qtd:5, qtdAtendida:0 },
        { itemId:2, descricao:'Mouse Óptico sem fio', qtd:3, qtdAtendida:0 },
      ]
    },
    {
      id: 2, codigo:'REQ-2024-002',
      solicitante:'Ana Paula', centro:'CC-001 | Administrativo', setor:'RH',
      prioridade:'Normal', status:'Aprovada', data:'2024-11-05',
      obs:'',
      itens: [
        { itemId:3, descricao:'Resma Papel A4 75g', qtd:20, qtdAtendida:0 },
      ]
    },
    {
      id: 3, codigo:'REQ-2024-003',
      solicitante:'Carlos Lima', centro:'CC-005 | Operações', setor:'Manutenção',
      prioridade:'Baixa', status:'Rascunho', data:'2024-11-15',
      obs:'',
      itens: [
        { itemId:8, descricao:'Lâmpada LED 12W', qtd:10, qtdAtendida:0 },
      ]
    },
    {
      id: 4, codigo:'REQ-2024-004',
      solicitante:'Mariana Souza', centro:'CC-003 | Financeiro', setor:'Contabilidade',
      prioridade:'Normal', status:'AtendidaTotal', data:'2024-10-28',
      obs:'Reposição periódica',
      itens: [
        { itemId:4, descricao:'Cartucho HP 664 Preto', qtd:4, qtdAtendida:4 },
        { itemId:6, descricao:'Pen Drive 32GB',        qtd:3, qtdAtendida:3 },
      ]
    },
  ],

  compras: [
    {
      id: 1, codigo:'OC-2024-001', origem:'Automático (Item crítico)', tipo:'Normal',
      status:'EmAprovacaoCompras', data:'2024-11-11', total:224.50,
      itens: [
        { itemId:1, descricao:'Teclado USB ABNT2',  qtd:10, preco:89.90 },
        { itemId:3, descricao:'Resma Papel A4 75g', qtd:20, preco:24.50 },
      ]
    },
    {
      id: 2, codigo:'OC-2024-002', origem:'Manual', tipo:'Normal',
      status:'Aprovada', data:'2024-11-01', total:478.00,
      itens: [
        { itemId:2, descricao:'Mouse Óptico sem fio', qtd:8, preco:59.90 },
      ]
    },
    {
      id: 3, codigo:'OC-2024-003', origem:'Automático (Item crítico)', tipo:'Normal',
      status:'Recebida', data:'2024-10-20', total:89.70,
      itens: [
        { itemId:5, descricao:'Cabo HDMI 2m', qtd:5, preco:19.90 },
      ]
    },
    {
      id: 4, codigo:'OC-2024-004', origem:'Spot — Solicitante: Fernando Rabello', tipo:'Spot',
      centro:'CC-002 | TI', status:'EmAprovacaoCompras', data:'2024-11-16', total:150.00,
      itens: [
        { itemId:0, descricao:'Adaptador USB-C 4 portas (uso imediato)', qtd:2, preco:75.00 },
      ]
    },
  ],

  _nextIds: { item:9, req:5, compra:5, colaborador:6, venda:4 },

  vendasInternas: [
    {
      id:1, reqCodigo:'REQ-2024-004', data:'2024-10-28',
      colaboradorId:4, colaborador:'Carla Mendes (555.666.777-88)',
      centro:'CC-003 | Financeiro',
      itens:[
        { descricao:'Cartucho HP 664 Preto', qtd:4, precomed:38.00, subtotal:152.00 },
        { descricao:'Pen Drive 32GB',        qtd:3, precomed:31.00, subtotal:93.00 },
      ],
      total:245.00,
    },
    {
      id:2, reqCodigo:'REQ-2024-SIM', data:'2024-11-02',
      colaboradorId:1, colaborador:'João Silva (123.456.789-00)',
      centro:'CC-002 | TI',
      itens:[
        { descricao:'Cabo HDMI 2m', qtd:2, precomed:20.00, subtotal:40.00 },
      ],
      total:40.00,
    },
    {
      id:3, reqCodigo:'REQ-2024-SIM2', data:'2024-11-10',
      colaboradorId:3, colaborador:'Pedro Santos (111.222.333-44)',
      centro:'CC-005 | Operações',
      itens:[
        { descricao:'Lâmpada LED 12W', qtd:4, precomed:14.90, subtotal:59.60 },
      ],
      total:59.60,
    },
  ],
};

// ============================================================
// STATE
// ============================================================
let state = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  breadcrumb: [],
};

// ============================================================
// UTILS
// ============================================================
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmt(n, d=2) { return Number(n||0).toLocaleString('pt-BR', {minimumFractionDigits:d, maximumFractionDigits:d}); }
function fmtDate(s) { if(!s) return '—'; const d=new Date(s+'T00:00:00'); return d.toLocaleDateString('pt-BR'); }
function isCritical(item) { return item.qtd <= item.min; }

// ============================================================
// ENGINE DE REPOSIÇÃO AUTOMÁTICA
// ============================================================
function calcPontoReposicao(min, max) {
  return Math.round((min + max) / 2);
}

// Preço médio ponderado pelo histórico de compras recebidas
// Fallback: preço de custo do item
function calcPrecoMedio(itemId) {
  const hist = db.historicoPrecos[itemId];
  if (!hist || !hist.length) {
    const item = db.itens.find(i => i.id === itemId);
    return item ? item.preco : 0;
  }
  const totalValor = hist.reduce((s, h) => s + h.preco * h.qtd, 0);
  const totalQtd   = hist.reduce((s, h) => s + h.qtd, 0);
  return totalQtd > 0 ? totalValor / totalQtd : 0;
}

// Registra preço no histórico ao receber compra
function registrarHistoricoPreco(itemId, preco, qtd) {
  if (!db.historicoPrecos[itemId]) db.historicoPrecos[itemId] = [];
  db.historicoPrecos[itemId].push({ data: new Date().toISOString().slice(0,10), preco, qtd });
  // Atualiza precomed no item
  const item = db.itens.find(i => i.id === itemId);
  if (item) item.precomed = calcPrecoMedio(itemId);
}

function checkReposicaoAutomatica(itemId) {
  const item = db.itens.find(i => i.id === itemId);
  if (!item || !item.paraEstoque) return;

  const ponto = item.pontoReposicao ?? calcPontoReposicao(item.min, item.max);

  // Dispara apenas quando cair ABAIXO (qtd < ponto)
  if (item.qtd >= ponto) return;

  // Bloqueia duplicata: já existe req automática aberta para este item?
  const statusAbertos = ['EmAprovacaoGestor','EmAprovacaoDiretoria','EmAprovacaoAlmoxarifado','Rascunho'];
  const duplicata = db.requisicoes.find(r =>
    r.origem === 'Auto-Reposição' &&
    statusAbertos.includes(r.status) &&
    r.itens.some(li => li.itemId === itemId)
  );
  if (duplicata) {
    componentToast('warning', `⚡ Reposição já em andamento para "${item.descricao}" (${duplicata.codigo})`);
    return;
  }

  // Quantidade sugerida = máximo - ponto de reposição
  const qtdSugerida = item.max - ponto;
  if (qtdSugerida <= 0) return;

  const nova = {
    id: db._nextIds.req++,
    codigo: `REQ-${new Date().getFullYear()}-${String(db._nextIds.req - 1).padStart(3,'0')}`,
    solicitante: 'Sistema (Auto-Reposição)',
    centro: 'CC-ALM | Almoxarifado',
    setor: 'Almoxarifado',
    prioridade: 'Alta',
    status: 'EmAprovacaoGestor',
    data: new Date().toISOString().slice(0,10),
    origem: 'Auto-Reposição',
    obs: `Gerada automaticamente. Qtd atual: ${item.qtd} | P.Reposição: ${ponto} | Qtd sugerida: ${qtdSugerida}`,
    itens: [{ itemId: item.id, descricao: item.descricao, qtd: qtdSugerida, qtdAtendida: 0 }],
  };
  db.requisicoes.push(nova);

  componentToast('warning',
    `🤖 Reposição automática gerada: ${nova.codigo} — "${item.descricao}" (${qtdSugerida} un.)`
  );
}
function itemInitials(d) { return d.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }
function statusReq(s) {
  const m = {
    Rascunho:               {label:'Rascunho',        cls:'badge-gray'},
    EmAprovacaoGestor:      {label:'Aguard. Gestor',  cls:'badge-warning'},
    EmAprovacaoCompras:     {label:'Aguard. Compras', cls:'badge-purple'},
    EmAprovacaoDiretoria:   {label:'Aguard. Diret.',  cls:'badge-purple'},
    EmAprovacaoAlmoxarifado:{label:'Aguard. Almox.',  cls:'badge-info'},
    Aprovada:               {label:'Aprovada',         cls:'badge-success'},
    Reprovada:              {label:'Reprovada',        cls:'badge-danger'},
    AtendidaParcial:        {label:'Atend. Parcial',   cls:'badge-warning'},
    AtendidaTotal:          {label:'Atendida',         cls:'badge-success'},
  };
  return m[s] || {label:s, cls:'badge-gray'};
}
function statusCompra(s) {
  const m = {
    EmAprovacaoCompras: {label:'Em Aprovação',  cls:'badge-warning'},
    Aprovada:           {label:'Aprovada',      cls:'badge-success'},
    Recebida:           {label:'Recebida',      cls:'badge-info'},
    Cancelada:          {label:'Cancelada',     cls:'badge-danger'},
  };
  return m[s] || {label:s, cls:'badge-gray'};
}
function getItemColor(idx) {
  const colors = ['#1A4F8A','#7C3AED','#DB2777','#D97706','#059669','#DC2626','#0891B2','#65A30D'];
  return colors[idx % colors.length];
}

// ============================================================
// ROUTER
// ============================================================
function parseRoute() {
  const hash = location.hash.replace('#', '') || '/home';
  const parts = hash.split('/').filter(Boolean);
  return { full: hash, parts };
}

function navigateTo(path) {
  location.hash = path;
}

function setBreadcrumb(crumbs) {
  state.breadcrumb = crumbs;
  renderTopbar();
}

// ============================================================
// TOPBAR
// ============================================================
function renderTopbar() {
  const bc = state.breadcrumb;
  const user = db.usuarios.find(u=>u.nome==='Fernando Rabello');
  const bcHtml = bc.map((c,i) => {
    if(i === bc.length-1) return `<span class="bc-current">${esc(c.label)}</span>`;
    return `<a href="#${c.path}" style="color:rgba(255,255,255,.7)">${esc(c.label)}</a><span>›</span>`;
  }).join('');

  document.getElementById('topbar').innerHTML = `
    <button class="topbar-toggle" id="toggle-sidebar" title="Expandir/Recolher menu">☰</button>
    <div class="topbar-brand">
      <div class="topbar-brand-icon">ALM</div>
      <span>Almoxarifado</span>
    </div>
    <div class="topbar-breadcrumb">${bcHtml}</div>
    <div class="topbar-actions">
      <button class="topbar-btn" onclick="showHelp()">❓ Ajuda</button>
      <button class="topbar-btn" onclick="showNotifications()">🔔 Notif.</button>
      <div class="topbar-user">
        <div class="topbar-avatar">${esc(user?.avatar||'FR')}</div>
        <span class="topbar-username">${esc(user?.nome||'Fernando Rabello')}</span>
      </div>
    </div>
  `;
  document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
}

function showHelp() {
  componentToast('info', 'Documentação disponível em docs.memoryit.com.br');
}
function showNotifications() {
  const criticos = db.itens.filter(isCritical).length;
  componentToast('warning', `Você tem ${criticos} item(s) crítico(s) no estoque.`);
}

// ============================================================
// SIDEBAR
// ============================================================
const NAV_ITEMS = [
  { id:'home',          label:'Home',                  icon:'🏠',  route:'/home' },
  { id:'itens',         label:'Itens de Estoque',       icon:'📦',  route:'/itens' },
  { id:'requisicoes',   label:'Requisições',             icon:'📋',  route:'/requisicoes' },
  { id:'compras',       label:'Solicit. de Compra',      icon:'🛒',  route:'/compras' },
  { id:'inventario',    label:'Inventário',               icon:'🗃️',  route:'/inventario' },
  { id:'colaboradores', label:'Colaboradores',            icon:'👥',  route:'/colaboradores' },
  { id:'relatorios',    label:'Relatórios',               icon:'📊',  route:'/relatorios' },
  { id:'config',        label:'Configurações',            icon:'⚙️',  route:'/config' },
];

function renderSidebar() {
  const route = parseRoute();
  const active = route.parts[0] || 'home';

  const critCount = db.itens.filter(isCritical).length;
  const reqPend   = db.requisicoes.filter(r=>r.status==='EmAprovacaoGestor'||r.status==='EmAprovacaoDiretoria'||r.status==='EmAprovacaoAlmoxarifado').length;

  const badges = { itens: critCount||'', requisicoes: reqPend||'' };

  const items = NAV_ITEMS.map(n => {
    const isActive = active === n.id;
    const badge = badges[n.id] ? `<span class="nav-badge">${badges[n.id]}</span>` : '';
    return `<div class="nav-item${isActive?' active':''}" data-route="${n.route}">
      <div class="nav-icon">${n.icon}</div>
      <span class="nav-label">${esc(n.label)}</span>
      ${badge}
    </div>`;
  }).join('');

  document.getElementById('sidebar').innerHTML = `
    <div class="sidebar-section">
      <div class="sidebar-section-title">Menu Principal</div>
      ${items}
    </div>
    <div style="flex:1"></div>
    <div class="sidebar-section" style="border-top:1px solid var(--border);padding-top:8px;">
      <div class="nav-item" data-route="/config">
        <div class="nav-icon">👤</div>
        <span class="nav-label">Perfil: <strong>${esc(db.perfil)}</strong></span>
      </div>
    </div>
  `;

  document.getElementById('sidebar').addEventListener('click', e => {
    const item = e.target.closest('[data-route]');
    if(item) {
      navigateTo(item.dataset.route);
      closeMobileSidebar();
    }
  });
}

function toggleSidebar() {
  const w = window.innerWidth;
  if(w <= 768) {
    state.mobileSidebarOpen = !state.mobileSidebarOpen;
    document.getElementById('sidebar').classList.toggle('mobile-open', state.mobileSidebarOpen);
    document.getElementById('sidebar-overlay').classList.toggle('active', state.mobileSidebarOpen);
  } else {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    document.getElementById('sidebar').classList.toggle('collapsed', state.sidebarCollapsed);
  }
}
function closeMobileSidebar() {
  state.mobileSidebarOpen = false;
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}

// ============================================================
// COMPONENTS
// ============================================================
function componentToast(type='info', message='') {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `
    <span class="toast-icon">${icons[type]||'ℹ️'}</span>
    <span class="toast-message">${esc(message)}</span>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', ()=>el.remove());
  }, 4000);
}

function componentModalConfirm(title, message, onConfirm, { hasInput=false, inputLabel='', inputPlaceholder='' }={}) {
  const mc = document.getElementById('modal-container');
  mc.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal">
        <div class="modal-title">${esc(title)}</div>
        <div class="modal-body">${esc(message)}</div>
        ${hasInput ? `<div class="form-group" style="margin-bottom:16px">
          <label class="form-label">${esc(inputLabel)}</label>
          <textarea id="modal-input" class="form-control" placeholder="${esc(inputPlaceholder)}" rows="3"></textarea>
        </div>` : ''}
        <div class="modal-actions">
          <button class="btn btn-secondary" id="modal-cancel">Cancelar</button>
          <button class="btn btn-primary" id="modal-confirm">Confirmar</button>
        </div>
      </div>
    </div>`;
  const cancel = () => mc.innerHTML = '';
  mc.querySelector('#modal-cancel').addEventListener('click', cancel);
  mc.querySelector('#modal-backdrop').addEventListener('click', e => { if(e.target===mc.querySelector('#modal-backdrop')) cancel(); });
  mc.querySelector('#modal-confirm').addEventListener('click', () => {
    const val = hasInput ? (mc.querySelector('#modal-input')?.value||'') : null;
    mc.innerHTML = '';
    onConfirm(val);
  });
}

function componentBadge(statusKey, type='req') {
  const s = type==='compra' ? statusCompra(statusKey) : statusReq(statusKey);
  return `<span class="badge ${s.cls}">${esc(s.label)}</span>`;
}

function componentStatCard(title, value, subtitle, accentColor='var(--brand)', onClick='') {
  return `<div class="stat-card" ${onClick?`onclick="${onClick}" style="cursor:pointer"`:''}>
    <div class="stat-card-accent" style="background:${accentColor}"></div>
    <div class="stat-card-title">${esc(title)}</div>
    <div class="stat-card-value">${esc(String(value))}</div>
    <div class="stat-card-sub">${esc(subtitle)}</div>
  </div>`;
}

function componentTable(columns, rows, renderActions) {
  const ths = columns.map(c=>`<th>${esc(c)}</th>`).join('');
  if(!rows.length) return `<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-title">Nenhum registro encontrado</div></div>`;
  const trs = rows.map(r=>`<tr>${r.cells.map(c=>`<td>${c}</td>`).join('')}<td class="table-actions">${renderActions(r.raw)}</td></tr>`).join('');
  return `<div class="table-wrapper"><table class="data-table"><thead><tr>${ths}<th>Ações</th></tr></thead><tbody>${trs}</tbody></table></div>`;
}

// ============================================================
// VIEWS
// ============================================================

// ---------- HOME ----------
function viewHome() {
  setBreadcrumb([{label:'Home',path:'/home'}]);
  const criticos = db.itens.filter(isCritical);
  const pendentes = db.requisicoes.filter(r=>['EmAprovacaoGestor','EmAprovacaoDiretoria','EmAprovacaoAlmoxarifado'].includes(r.status));
  const comprasAbertas = db.compras.filter(c=>c.status==='EmAprovacaoCompras');

  const alertas = [
    ...criticos.map(i=>`<div class="alert alert-danger">⚠️ <strong>${esc(i.codigo)}</strong> — ${esc(i.descricao)}: estoque crítico (${i.qtd}/${i.min})</div>`),
    ...comprasAbertas.map(c=>`<div class="alert alert-warning">🛒 <strong>${esc(c.codigo)}</strong> aguardando aprovação de compra</div>`),
  ].join('') || `<div class="alert alert-success">✅ Tudo ok, sem alertas no momento.</div>`;

  return `
    <div class="page-header">
      <div><div class="page-title">Dashboard</div><div class="page-subtitle">Visão geral do almoxarifado</div></div>
    </div>
    <div class="stat-cards">
      ${componentStatCard('Itens Críticos', criticos.length, 'Abaixo do mínimo', 'var(--danger)', "navigateTo('/itens')")}
      ${componentStatCard('Req. Pendentes', pendentes.length, 'Aguardam aprovação', 'var(--warning)', "navigateTo('/requisicoes')")}
      ${componentStatCard('Compras em Aberto', comprasAbertas.length, 'Aguardam aprovação', 'var(--info)', "navigateTo('/compras')")}
      ${componentStatCard('Total de Itens', db.itens.length, 'Cadastrados no sistema', 'var(--success)')}
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-header"><div class="card-title">⚠️ Alertas do Sistema</div></div>
        ${alertas}
      </div>
      <div class="card">
        <div class="card-header"><div class="card-title">🚀 Atalhos Rápidos</div></div>
        <div class="shortcut-grid">
          <div class="shortcut-btn" onclick="navigateTo('/itens/novo')"><span class="shortcut-icon">➕</span>Novo Item</div>
          <div class="shortcut-btn" onclick="navigateTo('/requisicoes/nova')"><span class="shortcut-icon">📋</span>Nova Requisição</div>
          <div class="shortcut-btn" onclick="navigateTo('/compras')"><span class="shortcut-icon">🛒</span>Ver Compras</div>
          <div class="shortcut-btn" onclick="navigateTo('/relatorios')"><span class="shortcut-icon">📊</span>Relatórios</div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:20px">
      <div class="card-header"><div class="card-title">📦 Últimas Requisições</div><a href="#/requisicoes" class="btn btn-sm btn-secondary">Ver todas</a></div>
      ${componentTable(
        ['Código','Solicitante','Centro','Status','Data'],
        db.requisicoes.slice(-4).reverse().map(r=>({
          raw:r,
          cells:[
            `<strong>${esc(r.codigo)}</strong>`,
            esc(r.solicitante),
            esc(r.centro.split('|')[1]?.trim()||r.centro),
            componentBadge(r.status),
            fmtDate(r.data)
          ]
        })),
        r=>`<button class="btn btn-sm btn-secondary" onclick="navigateTo('/requisicoes/${r.id}')">Ver</button>`
      )}
    </div>`;
}

// ---------- ITENS LIST ----------
function viewItens() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Itens de Estoque',path:'/itens'}]);
  const canCreate = ['Admin','Almoxarifado'].includes(db.perfil);
  return `
    <div class="page-header">
      <div><div class="page-title">📦 Itens de Estoque</div><div class="page-subtitle">${db.itens.length} itens cadastrados</div></div>
      ${canCreate?`<button class="btn btn-primary" onclick="navigateTo('/itens/novo')">＋ Novo Item</button>`:''}
    </div>
    <div class="card">
      <div class="search-bar" id="itens-filter-bar">
        <div class="search-input-wrap"><span class="search-icon">🔍</span><input type="text" id="itens-search" placeholder="Buscar por código, descrição, fabricante..." /></div>
        <select class="filter-select" id="itens-status"><option value="">Todos os Status</option><option>Ativo</option><option>Inativo</option></select>
        <select class="filter-select" id="itens-tipo"><option value="">Todos os Tipos</option>${db.tipos.map(t=>`<option>${t}</option>`).join('')}</select>
      </div>
      <div id="itens-table"></div>
    </div>`;
}

function renderItensTable() {
  const q   = (document.getElementById('itens-search')?.value||'').toLowerCase();
  const st  = document.getElementById('itens-status')?.value||'';
  const tp  = document.getElementById('itens-tipo')?.value||'';
  const filtered = db.itens.filter(i =>
    (!q || i.codigo.toLowerCase().includes(q)||i.descricao.toLowerCase().includes(q)||i.fabricante.toLowerCase().includes(q)) &&
    (!st || i.status===st) &&
    (!tp || i.tipo===tp)
  );
  const canEdit = ['Admin','Almoxarifado'].includes(db.perfil);
  const html = componentTable(
    ['','Código','Descrição','Fabricante','Qtd','Mín','P.Rep.','Máx','Tipo','Status'],
    filtered.map((item,idx)=>({
      raw:item,
      cells:[
        `<div class="item-avatar" style="background:${getItemColor(idx)}">${itemInitials(item.descricao)}</div>`,
        `<strong>${esc(item.codigo)}</strong>`,
        esc(item.descricao) + (isCritical(item)?` <span class="badge badge-danger" style="font-size:10px">Crítico</span>`:'')
          + (item.paraEstoque ? `` : ` <span class="badge badge-gray" style="font-size:10px">Sem estoque</span>`),
        esc(item.fabricante),
        `<span class="qty-badge ${isCritical(item)?'critical':item.qtd<=(item.pontoReposicao??calcPontoReposicao(item.min,item.max))?'low':'ok'}">${item.qtd}</span>`,
        item.min,
        item.paraEstoque
          ? `<span class="badge badge-info" style="font-size:11px">${item.pontoReposicao ?? calcPontoReposicao(item.min, item.max)}</span>`
          : `<span style="color:var(--text-3)">—</span>`,
        item.max,
        `<span class="tag">${esc(item.tipo)}</span>`,
        `<span class="badge ${item.status==='Ativo'?'badge-success':'badge-gray'}">${esc(item.status)}</span>`,
      ]
    })),
    item => `
      <button class="btn btn-sm btn-secondary" onclick="navigateTo('/itens/${item.id}')">👁 Ver</button>
      ${canEdit?`<button class="btn btn-sm btn-primary" onclick="navigateTo('/itens/${item.id}/editar')">✏️ Editar</button>`:''}
    `
  );
  const el = document.getElementById('itens-table');
  if(el) el.innerHTML = html;
}

// ---------- ITEM FORM ----------
function viewItemForm(id) {
  const isEdit = !!id;
  const item = isEdit ? db.itens.find(i=>i.id===+id) : null;
  if(isEdit && !item) { navigateTo('/itens'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Itens',path:'/itens'},{label:isEdit?'Editar Item':'Novo Item',path:''}]);
  const v = item || { codigo:'', descricao:'', fabricante:'', ncm:'', tipo:'', fornecedor:'', status:'Ativo', preco:'', precomed:'', qtd:'', min:'', max:'', pontoReposicao:'', paraEstoque:true, validade:'', obs:'' };
  const pr = v.pontoReposicao ?? (v.min && v.max ? calcPontoReposicao(+v.min, +v.max) : '');
  const estqChecked = v.paraEstoque !== false ? 'checked' : '';
  return `
    <div class="page-header">
      <div><div class="page-title">${isEdit?'✏️ Editar Item':'➕ Novo Item'}</div></div>
      <button class="btn btn-secondary" onclick="navigateTo('/itens')">← Voltar</button>
    </div>
    <div class="card">
      <div class="photo-placeholder" id="photo-ph">${item?itemInitials(item.descricao||'N'):'📦'}</div>
      <form id="item-form" autocomplete="off">
        <div class="form-grid">
          <div class="form-group"><label class="form-label">Código *</label><input id="f-codigo" class="form-control" value="${esc(v.codigo)}" required /></div>
          <div class="form-group"><label class="form-label">NCM</label><input id="f-ncm" class="form-control" value="${esc(v.ncm)}" /></div>
          <div class="form-group full-width"><label class="form-label">Descrição *</label><input id="f-descricao" class="form-control" value="${esc(v.descricao)}" required /></div>
          <div class="form-group"><label class="form-label">Fabricante</label><input id="f-fabricante" class="form-control" value="${esc(v.fabricante)}" /></div>
          <div class="form-group"><label class="form-label">Tipo de Produto</label>
            <select id="f-tipo" class="form-control">${db.tipos.map(t=>`<option${v.tipo===t?' selected':''}>${t}</option>`).join('')}</select>
          </div>
          <div class="form-group"><label class="form-label">Fornecedor</label>
            <select id="f-fornecedor" class="form-control"><option value="">—</option>${db.fornecedores.map(f=>`<option value="${f.id}"${v.fornecedor===f.id?' selected':''}>${esc(f.nome)}</option>`).join('')}</select>
          </div>
          <div class="form-group"><label class="form-label">Status</label>
            <select id="f-status" class="form-control"><option${v.status==='Ativo'?' selected':''}>Ativo</option><option${v.status==='Inativo'?' selected':''}>Inativo</option></select>
          </div>
          <div class="form-group"><label class="form-label">Validade</label><input type="date" id="f-validade" class="form-control" value="${esc(v.validade)}" /></div>
          <div class="form-group"><label class="form-label">Preço de Custo (R$) *</label><input type="number" step="0.01" min="0" id="f-preco" class="form-control" value="${v.preco}" /></div>
          <div class="form-group"><label class="form-label">Preço Médio (R$)</label><input type="number" step="0.01" min="0" id="f-precomed" class="form-control" value="${v.precomed}" /></div>
          <div class="form-group"><label class="form-label">Quantidade *</label><input type="number" min="0" id="f-qtd" class="form-control" value="${v.qtd}" /></div>
          <div class="form-group"><label class="form-label">Localização Física</label><input id="f-loc" class="form-control" value="${esc(v.localizacao||'')}" placeholder="Ex: Prateleira A-3, Gaveta 2" /></div>
        </div>

        <!-- BLOCO: PARA ESTOQUE -->
        <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:18px;margin-top:18px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <label class="form-label" style="margin:0;font-size:14px;text-transform:none;letter-spacing:0">📦 Este item é para estoque?</label>
            <label class="toggle-switch">
              <input type="checkbox" id="f-para-estoque" ${estqChecked} onchange="toggleEstoqueFields()" />
              <span class="toggle-slider"></span>
            </label>
            <span id="f-para-estoque-label" style="font-size:13px;font-weight:700;color:var(--brand)">${estqChecked?'Sim — controlar estoque':'Não — uso imediato/spot'}</span>
          </div>
          <div id="estoque-fields" style="display:${estqChecked?'grid':'none'};grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px">
            <div class="form-group">
              <label class="form-label">Estoque Mínimo *</label>
              <input type="number" min="0" id="f-min" class="form-control" value="${v.min}" oninput="autoCalcPonto()" />
            </div>
            <div class="form-group">
              <label class="form-label">Estoque Máximo *</label>
              <input type="number" min="0" id="f-max" class="form-control" value="${v.max}" oninput="autoCalcPonto()" />
            </div>
            <div class="form-group">
              <label class="form-label">
                Ponto de Reposição
                <span style="font-size:10px;font-weight:400;color:var(--text-3);margin-left:4px">(calculado automaticamente)</span>
              </label>
              <input type="number" min="0" id="f-ponto-rep" class="form-control" value="${pr}"
                style="background:var(--surface2);font-weight:700;color:var(--brand)" readonly />
            </div>
          </div>
          <div id="estoque-off-msg" style="display:${estqChecked?'none':'block'};font-size:13px;color:var(--text-2)">
            ⚡ Compra spot — sem controle de mínimo/máximo. O item será debitado diretamente no centro de custo do solicitante.
          </div>
        </div>

        <div class="form-grid" style="margin-top:16px">
          <div class="form-group full-width"><label class="form-label">Observações</label><textarea id="f-obs" class="form-control">${esc(v.obs)}</textarea></div>
        </div>
        <div id="form-errors"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="navigateTo('/itens')">Cancelar</button>
          <button type="submit" class="btn btn-primary">💾 Salvar</button>
        </div>
      </form>
    </div>`;
}

function toggleEstoqueFields() {
  const checked = document.getElementById('f-para-estoque')?.checked;
  document.getElementById('estoque-fields').style.display = checked ? 'grid' : 'none';
  document.getElementById('estoque-off-msg').style.display = checked ? 'none' : 'block';
  document.getElementById('f-para-estoque-label').textContent = checked ? 'Sim — controlar estoque' : 'Não — uso imediato/spot';
}

function autoCalcPonto() {
  const min = parseFloat(document.getElementById('f-min')?.value) || 0;
  const max = parseFloat(document.getElementById('f-max')?.value) || 0;
  const el  = document.getElementById('f-ponto-rep');
  if (el && min > 0 && max > 0 && max >= min) {
    el.value = calcPontoReposicao(min, max);
  }
}

function bindItemForm(id) {
  const form = document.getElementById('item-form');
  if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const errors = [];
    const val = s => document.getElementById(s)?.value?.trim()||'';
    const num = s => parseFloat(document.getElementById(s)?.value)||0;
    const paraEstoque = document.getElementById('f-para-estoque')?.checked ?? true;
    if(!val('f-codigo')) errors.push('Código é obrigatório.');
    if(!val('f-descricao')) errors.push('Descrição é obrigatória.');
    const qtd=num('f-qtd'), preco=num('f-preco');
    if(qtd<0) errors.push('Quantidade não pode ser negativa.');
    if(preco<0) errors.push('Preço não pode ser negativo.');
    let min=0, max=0, pontoReposicao=0;
    if(paraEstoque) {
      min=num('f-min'); max=num('f-max');
      if(min>max) errors.push('Estoque mínimo não pode ser maior que o máximo.');
      pontoReposicao = num('f-ponto-rep') || calcPontoReposicao(min, max);
    }
    document.getElementById('form-errors').innerHTML = errors.map(e=>`<div class="alert alert-danger">${esc(e)}</div>`).join('');
    if(errors.length) return;
    const data = {
      codigo:val('f-codigo'), ncm:val('f-ncm'), descricao:val('f-descricao'),
      fabricante:val('f-fabricante'), tipo:val('f-tipo'),
      fornecedor:parseInt(document.getElementById('f-fornecedor').value)||'',
      status:val('f-status'), validade:val('f-validade'),
      preco, precomed:num('f-precomed'), qtd,
      paraEstoque,
      min: paraEstoque ? min : 0,
      max: paraEstoque ? max : 0,
      pontoReposicao: paraEstoque ? pontoReposicao : 0,
      localizacao: val('f-loc'),
      obs:val('f-obs'),
    };
    if(id) {
      const idx = db.itens.findIndex(i=>i.id===+id);
      db.itens[idx] = {...db.itens[idx], ...data};
      componentToast('success','Item atualizado com sucesso!');
      if(paraEstoque) checkReposicaoAutomatica(db.itens[idx].id);
    } else {
      const newItem = {id:db._nextIds.item++, ...data};
      db.itens.push(newItem);
      componentToast('success','Item cadastrado com sucesso!');
      if(paraEstoque) checkReposicaoAutomatica(newItem.id);
    }
    navigateTo('/itens');
  });
}

// ---------- ITEM DETAIL ----------
function viewItemDetalhe(id) {
  const item = db.itens.find(i=>i.id===+id);
  if(!item) { navigateTo('/itens'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Itens',path:'/itens'},{label:item.codigo,path:''}]);
  const forn = db.fornecedores.find(f=>f.id===item.fornecedor);
  const crit = isCritical(item);
  const pct = Math.min(100, Math.round((item.qtd/item.max)*100));
  const ponto = item.pontoReposicao ?? calcPontoReposicao(item.min, item.max);
  const nearPonto = item.paraEstoque && item.qtd < ponto;
  const canEdit = ['Admin','Almoxarifado'].includes(db.perfil);
  return `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:16px">
        <div class="item-avatar" style="width:52px;height:52px;font-size:18px;background:${getItemColor(item.id)}">${itemInitials(item.descricao)}</div>
        <div>
          <div class="page-title">${esc(item.descricao)} ${crit?'<span class="badge badge-danger">⚠️ Crítico</span>':''}</div>
          <div class="page-subtitle">${esc(item.codigo)} · ${esc(item.tipo)}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${canEdit?`<button class="btn btn-primary" onclick="navigateTo('/itens/${id}/editar')">✏️ Editar</button>`:''}
        ${crit&&canEdit?`<button class="btn btn-warning" onclick="gerarCompraFromItem(${id})">🛒 Gerar Compra</button>`:''}
        <button class="btn btn-secondary" onclick="navigateTo('/itens')">← Voltar</button>
      </div>
    </div>
    ${crit?`<div class="alert alert-danger" style="margin-bottom:20px">⚠️ Estoque crítico! Quantidade atual (${item.qtd}) atingiu o nível mínimo (${item.min}). Considere gerar uma solicitação de compra.</div>`:''}
    ${!crit && nearPonto && item.paraEstoque ? `<div class="alert alert-warning" style="margin-bottom:20px">🤖 Estoque abaixo do ponto de reposição (${ponto}). Uma requisição automática pode ser gerada.</div>` : ''}
    <div class="card" style="margin-bottom:20px">
      <div class="card-header"><div class="card-title">Nível de Estoque</div></div>
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
        <div class="progress-bar" style="flex:1"><div class="progress-fill" style="width:${pct}%;background:${crit?'var(--danger)':nearPonto?'var(--warning)':'var(--success)'}"></div></div>
        <span style="font-size:13px;font-weight:700;color:${crit?'var(--danger)':'var(--text)'}">${item.qtd} / ${item.max}</span>
      </div>
      <div style="font-size:11px;color:var(--text-3)">
        Mínimo: ${item.min} · 
        <span style="color:var(--brand);font-weight:700">P.Reposição: ${item.paraEstoque ? ponto : '—'}</span> · 
        Máximo: ${item.max}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title">Dados do Item</div></div>
      <div class="detail-grid">
        <div class="detail-field"><div class="detail-label">Código</div><div class="detail-value">${esc(item.codigo)}</div></div>
        <div class="detail-field"><div class="detail-label">NCM</div><div class="detail-value">${esc(item.ncm)||'—'}</div></div>
        <div class="detail-field"><div class="detail-label">Fabricante</div><div class="detail-value">${esc(item.fabricante)||'—'}</div></div>
        <div class="detail-field"><div class="detail-label">Tipo</div><div class="detail-value">${esc(item.tipo)||'—'}</div></div>
        <div class="detail-field"><div class="detail-label">Fornecedor</div><div class="detail-value">${esc(forn?.nome)||'—'}</div></div>
        <div class="detail-field"><div class="detail-label">Validade</div><div class="detail-value">${fmtDate(item.validade)}</div></div>
        <div class="detail-field"><div class="detail-label">Preço de Custo</div><div class="detail-value">R$ ${fmt(item.preco)}</div></div>
        <div class="detail-field"><div class="detail-label">Preço Médio (calculado)</div><div class="detail-value"><strong style="color:var(--brand)">R$ ${fmt(calcPrecoMedio(item.id))}</strong> <span style="font-size:11px;color:var(--text-3)">${(db.historicoPrecos[item.id]?.length||0)} compra(s)</span></div></div>
        <div class="detail-field"><div class="detail-label">Localização</div><div class="detail-value">${esc(item.localizacao||'—')}</div></div>
        <div class="detail-field"><div class="detail-label">Status</div><div class="detail-value"><span class="badge ${item.status==='Ativo'?'badge-success':'badge-gray'}">${esc(item.status)}</span></div></div>
        <div class="detail-field"><div class="detail-label">Para Estoque</div><div class="detail-value">${item.paraEstoque ? '<span class="badge badge-success">✔ Sim</span>' : '<span class="badge badge-gray">✖ Não (Spot)</span>'}</div></div>
        ${item.paraEstoque ? `<div class="detail-field"><div class="detail-label">Ponto de Reposição</div><div class="detail-value"><span class="badge badge-info">${ponto}</span></div></div>` : ''}
        <div class="detail-field full-width"><div class="detail-label">Observações</div><div class="detail-value">${esc(item.obs)||'—'}</div></div>
      </div>
    </div>`;
}

function gerarCompraFromItem(itemId) {
  const item = db.itens.find(i=>i.id===+itemId);
  if(!item) return;
  const jaExiste = db.compras.find(c=>c.status==='EmAprovacaoCompras'&&c.itens.some(li=>li.itemId===item.id));
  if(jaExiste) { componentToast('warning',`Já existe uma compra aberta (${jaExiste.codigo}) para este item.`); return; }
  componentModalConfirm(
    '🛒 Gerar Solicitação de Compra',
    `Deseja gerar uma solicitação de compra para "${item.descricao}"? Será sugerida a quantidade para atingir o máximo.`,
    () => {
      const qtdSugerida = item.max - item.qtd;
      const nova = {
        id: db._nextIds.compra++,
        codigo: `OC-${new Date().getFullYear()}-${String(db._nextIds.compra-1).padStart(3,'0')}`,
        origem: `Automático (${item.codigo})`,
        status: 'EmAprovacaoCompras',
        data: new Date().toISOString().slice(0,10),
        total: qtdSugerida * item.preco,
        itens: [{ itemId:item.id, descricao:item.descricao, qtd:qtdSugerida, preco:item.preco }]
      };
      db.compras.push(nova);
      componentToast('success',`Solicitação ${nova.codigo} criada com sucesso!`);
      navigateTo('/compras');
    }
  );
}

// ---------- REQUISIÇÕES LIST ----------
function viewRequisicoes() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Requisições',path:'/requisicoes'}]);
  const canCreate = ['Admin','Solicitante','Gestor','Almoxarifado'].includes(db.perfil);
  return `
    <div class="page-header">
      <div><div class="page-title">📋 Requisições de Retirada</div><div class="page-subtitle">${db.requisicoes.length} requisições</div></div>
      ${canCreate?`<button class="btn btn-primary" onclick="navigateTo('/requisicoes/nova')">＋ Nova Requisição</button>`:''}
    </div>
    <div class="card">
      <div class="search-bar">
        <div class="search-input-wrap"><span class="search-icon">🔍</span><input type="text" id="req-search" placeholder="Buscar por código, solicitante..." /></div>
        <select class="filter-select" id="req-status">
          <option value="">Todos os Status</option>
          <option value="Rascunho">Rascunho</option>
          <option value="EmAprovacaoGestor">Aguard. Gestor</option>
          <option value="EmAprovacaoDiretoria">Aguard. Diretoria</option>
          <option value="EmAprovacaoAlmoxarifado">Aguard. Almox.</option>
          <option value="Aprovada">Aprovada</option>
          <option value="Reprovada">Reprovada</option>
          <option value="AtendidaTotal">Atendida</option>
        </select>
      </div>
      <div id="req-table"></div>
    </div>`;
}

function renderRequisicoesTable() {
  const q  = (document.getElementById('req-search')?.value||'').toLowerCase();
  const st = document.getElementById('req-status')?.value||'';
  const filtered = db.requisicoes.filter(r=>
    (!q || r.codigo.toLowerCase().includes(q)||r.solicitante.toLowerCase().includes(q)) &&
    (!st || r.status===st)
  ).sort((a,b)=>b.id-a.id);
  const html = componentTable(
    ['Código','Solicitante','Centro de Custo','Prioridade','Status','Data'],
    filtered.map(r=>({
      raw:r,
      cells:[
        `<strong>${esc(r.codigo)}</strong>${r.origem==='Auto-Reposição'?' <span class="badge badge-purple" style="font-size:10px">🤖 Auto</span>':''}`,
        esc(r.solicitante),
        esc(r.centro.split('|')[1]?.trim()||r.centro),
        `<span class="badge ${r.prioridade==='Alta'?'badge-danger':r.prioridade==='Baixa'?'badge-gray':'badge-info'}">${esc(r.prioridade)}</span>`,
        componentBadge(r.status),
        fmtDate(r.data)
      ]
    })),
    r => {
      const aprovar = ['EmAprovacaoGestor','EmAprovacaoDiretoria','EmAprovacaoAlmoxarifado'].includes(r.status) &&
        ['Admin','Gestor','Diretoria','Almoxarifado'].includes(db.perfil);
      const atender = r.status === 'Aprovada' && ['Admin','Almoxarifado'].includes(db.perfil);
      return `
        <button class="btn btn-sm btn-secondary" onclick="navigateTo('/requisicoes/${r.id}')">👁 Ver</button>
        ${aprovar?`<button class="btn btn-sm btn-warning" onclick="navigateTo('/requisicoes/${r.id}/aprovar')">✅ Aprovar</button>`:''}
        ${atender?`<button class="btn btn-sm btn-success" onclick="navigateTo('/requisicoes/${r.id}/atender')">📤 Atender</button>`:''}
      `;
    }
  );
  const el = document.getElementById('req-table');
  if(el) el.innerHTML = html;
}

// ---------- NOVA REQUISIÇÃO ----------
let novaReqItens = [];

function viewNovaRequisicao() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Requisições',path:'/requisicoes'},{label:'Nova Requisição',path:''}]);
  novaReqItens = [];
  return `
    <div class="page-header">
      <div><div class="page-title">➕ Nova Requisição</div></div>
      <button class="btn btn-secondary" onclick="navigateTo('/requisicoes')">← Voltar</button>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:16px">Dados da Requisição</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Centro de Custo *</label>
          <select id="req-centro" class="form-control"><option value="">Selecione...</option>${db.centros.map(c=>`<option>${esc(c)}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Setor Requisitante *</label>
          <select id="req-setor" class="form-control"><option value="">Selecione...</option>${db.setores.map(s=>`<option>${esc(s)}</option>`).join('')}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Prioridade</label>
          <select id="req-prioridade" class="form-control"><option>Normal</option><option>Alta</option><option>Baixa</option></select>
        </div>
        <div class="form-group full-width">
          <label class="form-label">Observação</label>
          <textarea id="req-obs" class="form-control" rows="2"></textarea>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">📦 Itens da Requisição</div>
      <div class="inline-add">
        <div class="form-group" style="flex:1;min-width:200px">
          <label class="form-label">Item</label>
          <div class="autocomplete-wrap">
            <input type="text" id="req-item-search" class="form-control" placeholder="Digite para buscar item..." autocomplete="off" />
            <div id="req-autocomplete" class="autocomplete-list" style="display:none"></div>
          </div>
          <input type="hidden" id="req-item-id" />
        </div>
        <div class="form-group" style="width:120px">
          <label class="form-label">Quantidade</label>
          <input type="number" min="1" id="req-item-qtd" class="form-control" value="1" />
        </div>
        <div class="form-group" style="justify-content:flex-end">
          <label class="form-label">&nbsp;</label>
          <button class="btn btn-secondary" onclick="addReqItem()">➕ Adicionar</button>
        </div>
      </div>
      <div id="req-itens-table"></div>
      <div id="req-errors"></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="navigateTo('/requisicoes')">Cancelar</button>
        <button class="btn btn-primary" onclick="submitRequisicao()">📤 Enviar para Aprovação</button>
      </div>
    </div>`;
}

function bindNovaRequisicao() {
  const searchEl = document.getElementById('req-item-search');
  const listEl   = document.getElementById('req-autocomplete');
  if(!searchEl) return;
  searchEl.addEventListener('input', () => {
    const q = searchEl.value.toLowerCase();
    const matches = q ? db.itens.filter(i=>i.status==='Ativo'&&(i.codigo.toLowerCase().includes(q)||i.descricao.toLowerCase().includes(q))) : [];
    if(!matches.length) { listEl.style.display='none'; return; }
    listEl.innerHTML = matches.slice(0,8).map(i=>`<div class="autocomplete-item" data-id="${i.id}" data-label="${esc(i.codigo)} — ${esc(i.descricao)}">${esc(i.codigo)} — ${esc(i.descricao)} <span style="color:var(--text-3)">(${i.qtd} un.)</span></div>`).join('');
    listEl.style.display = 'block';
  });
  listEl.addEventListener('click', e=>{
    const it = e.target.closest('.autocomplete-item');
    if(!it) return;
    document.getElementById('req-item-id').value = it.dataset.id;
    searchEl.value = it.dataset.label;
    listEl.style.display = 'none';
  });
  document.addEventListener('click', e=>{ if(!e.target.closest('.autocomplete-wrap')) listEl.style.display='none'; }, {once:false});
  renderReqItensTable();
}

function addReqItem() {
  const itemId = parseInt(document.getElementById('req-item-id')?.value)||0;
  const qtd    = parseInt(document.getElementById('req-item-qtd')?.value)||0;
  const item   = db.itens.find(i=>i.id===itemId);
  const errEl  = document.getElementById('req-errors');
  if(!item) { errEl.innerHTML='<div class="alert alert-danger">Selecione um item válido.</div>'; return; }
  if(qtd<=0)  { errEl.innerHTML='<div class="alert alert-danger">Quantidade deve ser maior que zero.</div>'; return; }
  errEl.innerHTML='';
  const existing = novaReqItens.find(r=>r.itemId===itemId);
  if(existing) { existing.qtd+=qtd; } else { novaReqItens.push({itemId, descricao:item.descricao, qtd, qtdAtendida:0}); }
  document.getElementById('req-item-search').value='';
  document.getElementById('req-item-id').value='';
  document.getElementById('req-item-qtd').value='1';
  renderReqItensTable();
}

function removeReqItem(idx) {
  novaReqItens.splice(idx,1);
  renderReqItensTable();
}

function renderReqItensTable() {
  const el = document.getElementById('req-itens-table');
  if(!el) return;
  if(!novaReqItens.length) { el.innerHTML='<div class="empty-state" style="padding:24px"><div class="empty-icon">📦</div><div class="empty-title">Nenhum item adicionado</div></div>'; return; }
  el.innerHTML = `<table class="data-table"><thead><tr><th>Item</th><th>Qtd Solicitada</th><th>Disponível</th><th></th></tr></thead><tbody>
    ${novaReqItens.map((r,i)=>{
      const item = db.itens.find(it=>it.id===r.itemId);
      return `<tr><td>${esc(r.descricao)}</td><td><strong>${r.qtd}</strong></td><td><span class="${item?.qtd>=r.qtd?'qty-badge ok':'qty-badge critical'}">${item?.qtd||0} un.</span></td><td><button class="btn btn-sm btn-danger" onclick="removeReqItem(${i})">🗑️</button></td></tr>`;
    }).join('')}
  </tbody></table>`;
}

function submitRequisicao() {
  const centro   = document.getElementById('req-centro')?.value;
  const setor    = document.getElementById('req-setor')?.value;
  const prioridade=document.getElementById('req-prioridade')?.value||'Normal';
  const obs      = document.getElementById('req-obs')?.value||'';
  const errEl    = document.getElementById('req-errors');
  if(!centro) { errEl.innerHTML='<div class="alert alert-danger">Selecione o Centro de Custo.</div>'; return; }
  if(!setor)  { errEl.innerHTML='<div class="alert alert-danger">Selecione o Setor.</div>'; return; }
  if(!novaReqItens.length) { errEl.innerHTML='<div class="alert alert-danger">Adicione ao menos um item.</div>'; return; }
  const nova = {
    id: db._nextIds.req++,
    codigo: `REQ-${new Date().getFullYear()}-${String(db._nextIds.req-1).padStart(3,'0')}`,
    solicitante: 'Fernando Rabello',
    centro, setor, prioridade, obs,
    status: 'EmAprovacaoGestor',
    data: new Date().toISOString().slice(0,10),
    itens: [...novaReqItens],
  };
  db.requisicoes.push(nova);
  componentToast('success',`Requisição ${nova.codigo} enviada para aprovação!`);
  navigateTo('/requisicoes');
}

// ---------- REQUISIÇÃO DETALHE ----------
function viewRequisicaoDetalhe(id) {
  const req = db.requisicoes.find(r=>r.id===+id);
  if(!req) { navigateTo('/requisicoes'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Requisições',path:'/requisicoes'},{label:req.codigo,path:''}]);
  const aprovar = ['EmAprovacaoGestor','EmAprovacaoDiretoria','EmAprovacaoAlmoxarifado'].includes(req.status) && ['Admin','Gestor','Diretoria','Almoxarifado'].includes(db.perfil);
  const atender = req.status==='Aprovada' && ['Admin','Almoxarifado'].includes(db.perfil);
  return `
    <div class="page-header">
      <div><div class="page-title">📋 ${esc(req.codigo)}</div><div class="page-subtitle">${componentBadge(req.status)}</div></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${aprovar?`<button class="btn btn-warning" onclick="navigateTo('/requisicoes/${id}/aprovar')">✅ Aprovar</button>`:''}
        ${atender?`<button class="btn btn-success" onclick="navigateTo('/requisicoes/${id}/atender')">📤 Atender</button>`:''}
        <button class="btn btn-secondary" onclick="navigateTo('/requisicoes')">← Voltar</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="detail-grid">
        <div class="detail-field"><div class="detail-label">Solicitante</div><div class="detail-value">${esc(req.solicitante)}</div></div>
        <div class="detail-field"><div class="detail-label">Centro de Custo</div><div class="detail-value">${esc(req.centro)}</div></div>
        <div class="detail-field"><div class="detail-label">Setor</div><div class="detail-value">${esc(req.setor)}</div></div>
        <div class="detail-field"><div class="detail-label">Prioridade</div><div class="detail-value"><span class="badge ${req.prioridade==='Alta'?'badge-danger':req.prioridade==='Baixa'?'badge-gray':'badge-info'}">${esc(req.prioridade)}</span></div></div>
        <div class="detail-field"><div class="detail-label">Data</div><div class="detail-value">${fmtDate(req.data)}</div></div>
        <div class="detail-field"><div class="detail-label">Status</div><div class="detail-value">${componentBadge(req.status)}</div></div>
        ${req.colaboradorRetirada?`<div class="detail-field"><div class="detail-label">Retirado por</div><div class="detail-value">👤 ${esc(req.colaboradorRetirada)}</div></div>`:''}
        ${req.dataRetirada?`<div class="detail-field"><div class="detail-label">Data Retirada</div><div class="detail-value">${fmtDate(req.dataRetirada)}</div></div>`:''}
        <div class="detail-field full-width"><div class="detail-label">Observação</div><div class="detail-value">${esc(req.obs)||'—'}</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Itens Solicitados</div>
      <table class="data-table"><thead><tr><th>Descrição</th><th>Qtd Solicitada</th><th>Qtd Atendida</th></tr></thead><tbody>
        ${req.itens.map(it=>`<tr><td>${esc(it.descricao)}</td><td>${it.qtd}</td><td>${it.qtdAtendida||0}</td></tr>`).join('')}
      </tbody></table>
    </div>`;
}

// ---------- APROVAR REQUISIÇÃO ----------
// Detecta o tipo de fluxo: reposição automática usa Gestor→Compras→Almoxarifado
// Retirada normal usa Gestor→Almoxarifado
function getFluxoRequisicao(req) {
  const isReposicao = req.origem === 'Auto-Reposição';
  if(isReposicao) {
    return {
      tipo: 'reposicao',
      steps: [
        { key:'EmAprovacaoGestor',       label:'Gestor',       icon:'👤', desc:'Aprovação do gestor da área' },
        { key:'EmAprovacaoCompras',       label:'Compras',      icon:'🛒', desc:'Validação pelo setor de compras' },
        { key:'EmAprovacaoAlmoxarifado',  label:'Almoxarifado', icon:'📦', desc:'Confirmação do almoxarifado' },
        { key:'Aprovada',                 label:'Concluída',    icon:'✅', desc:'Requisição aprovada e liberada' },
      ],
      next: {
        EmAprovacaoGestor:      'EmAprovacaoCompras',
        EmAprovacaoCompras:     'EmAprovacaoAlmoxarifado',
        EmAprovacaoAlmoxarifado:'Aprovada',
      },
      perfilPorStep: {
        EmAprovacaoGestor:      ['Admin','Gestor'],
        EmAprovacaoCompras:     ['Admin','Compras'],
        EmAprovacaoAlmoxarifado:['Admin','Almoxarifado'],
      }
    };
  }
  return {
    tipo: 'retirada',
    steps: [
      { key:'EmAprovacaoGestor',       label:'Solicitação',  icon:'📋', desc:'Criada pelo solicitante' },
      { key:'EmAprovacaoGestor',       label:'Gestor',       icon:'👤', desc:'Aprovação do gestor da área' },
      { key:'EmAprovacaoAlmoxarifado', label:'Almoxarifado', icon:'📦', desc:'Separação e entrega' },
      { key:'Aprovada',                label:'Concluída',    icon:'✅', desc:'Retirada confirmada' },
    ],
    next: {
      EmAprovacaoGestor:      'EmAprovacaoAlmoxarifado',
      EmAprovacaoAlmoxarifado:'Aprovada',
    },
    perfilPorStep: {
      EmAprovacaoGestor:      ['Admin','Gestor'],
      EmAprovacaoAlmoxarifado:['Admin','Almoxarifado'],
    }
  };
}

function buildTimeline(req, fluxo) {
  const steps = fluxo.steps;
  const statusOrder = steps.map(s=>s.key);
  const curIdx = statusOrder.lastIndexOf(req.status);

  // Eventos registrados na requisição (quem aprovou e quando)
  const eventos = req.eventos || [];

  return steps.map((step, i) => {
    const isDone    = i < curIdx || req.status === 'Aprovada' || req.status === 'AtendidaTotal';
    const isCurrent = i === curIdx && !['Aprovada','Reprovada','AtendidaTotal','AtendidaParcial'].includes(req.status);
    const isReprov  = req.status === 'Reprovada' && i === curIdx;
    const evento    = eventos.find(e=>e.step===step.key);

    let cls = '';
    if(isReprov)  cls = 'reprovada';
    else if(isDone)    cls = 'done';
    else if(isCurrent) cls = 'current';

    const dataEvento = evento ? `<div class="timeline-evento-data">${fmtDate(evento.data)}</div>` : '';
    const ator       = evento ? `<div class="timeline-evento-ator">${esc(evento.ator)}</div>` : (isCurrent ? '<div class="timeline-evento-ator" style="color:var(--warning)">Aguardando...</div>' : '');

    return `<div class="timeline-step ${cls}">
      <div class="timeline-circle">${isDone && !isReprov ? '✓' : isReprov ? '✕' : step.icon}</div>
      <div class="timeline-info">
        <div class="timeline-label">${esc(step.label)}</div>
        <div class="timeline-desc">${esc(step.desc)}</div>
        ${dataEvento}${ator}
      </div>
    </div>`;
  }).join('');
}

function viewAprovarRequisicao(id) {
  const req = db.requisicoes.find(r=>r.id===+id);
  if(!req) { navigateTo('/requisicoes'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Requisições',path:'/requisicoes'},{label:req.codigo,path:''}]);
  const fluxo = getFluxoRequisicao(req);
  const timelineHtml = buildTimeline(req, fluxo);
  const podAprovar = (fluxo.perfilPorStep[req.status]||[]).includes(db.perfil);
  const canAction = podAprovar && !['Aprovada','Reprovada','AtendidaTotal','AtendidaParcial'].includes(req.status);
  const isReposicao = fluxo.tipo === 'reposicao';
  const totalEstimado = req.itens.reduce((s,it)=>{
    const item = db.itens.find(i=>i.id===it.itemId);
    return s + (item ? item.precomed * it.qtd : 0);
  }, 0);

  return `
    <div class="page-header">
      <div>
        <div class="page-title">${isReposicao?'🤖':'✅'} ${isReposicao?'Reposição Automática':'Aprovação'} — ${esc(req.codigo)}</div>
        <div class="page-subtitle" style="display:flex;align-items:center;gap:8px">${componentBadge(req.status)} ${isReposicao?'<span class="badge badge-purple">🤖 Auto-Reposição</span>':''}</div>
      </div>
      <button class="btn btn-secondary" onclick="navigateTo('/requisicoes/${id}')">← Voltar</button>
    </div>

    ${isReposicao ? `<div class="alert alert-info" style="margin-bottom:20px">
      🤖 Esta requisição foi <strong>gerada automaticamente</strong> pelo sistema quando o estoque de 
      <strong>${esc(req.itens[0]?.descricao||'—')}</strong> caiu abaixo do ponto de reposição.
      O fluxo segue: <strong>Gestor → Compras → Almoxarifado</strong> conforme configurado no Power Automate.
    </div>` : ''}

    <!-- TIMELINE VISUAL -->
    <div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div class="card-title">${isReposicao?'⚡ Fluxo de Reposição':'📋 Fluxo de Aprovação'}</div>
        <span style="font-size:12px;color:var(--text-3)">Integração: Power Automate</span>
      </div>
      <div class="timeline-vertical">${timelineHtml}</div>
    </div>

    <!-- DADOS GERAIS -->
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:12px">Dados da Requisição</div>
      <div class="detail-grid">
        <div class="detail-field"><div class="detail-label">Código</div><div class="detail-value">${esc(req.codigo)}</div></div>
        <div class="detail-field"><div class="detail-label">Solicitante</div><div class="detail-value">${esc(req.solicitante)}</div></div>
        <div class="detail-field"><div class="detail-label">Centro de Custo</div><div class="detail-value">${esc(req.centro)}</div></div>
        <div class="detail-field"><div class="detail-label">Prioridade</div><div class="detail-value"><span class="badge ${req.prioridade==='Alta'?'badge-danger':req.prioridade==='Baixa'?'badge-gray':'badge-info'}">${esc(req.prioridade)}</span></div></div>
        <div class="detail-field"><div class="detail-label">Data</div><div class="detail-value">${fmtDate(req.data)}</div></div>
        <div class="detail-field"><div class="detail-label">Valor Estimado</div><div class="detail-value"><strong style="color:var(--brand)">R$ ${fmt(totalEstimado)}</strong></div></div>
      </div>
    </div>

    <!-- ITENS -->
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:12px">Itens da Requisição</div>
      <table class="data-table">
        <thead><tr><th>Descrição</th><th>Qtd</th><th>Preço Médio</th><th>Subtotal</th></tr></thead>
        <tbody>
          ${req.itens.map(it=>{
            const item = db.itens.find(i=>i.id===it.itemId);
            const pm = item ? calcPrecoMedio(item.id) : 0;
            return `<tr><td>${esc(it.descricao)}</td><td>${it.qtd}</td><td>R$ ${fmt(pm)}</td><td><strong>R$ ${fmt(pm*it.qtd)}</strong></td></tr>`;
          }).join('')}
        </tbody>
        <tfoot><tr style="background:var(--surface2)">
          <td colspan="3" style="text-align:right;font-weight:700">Total estimado:</td>
          <td><strong>R$ ${fmt(totalEstimado)}</strong></td>
        </tr></tfoot>
      </table>
    </div>

    <!-- AÇÕES -->
    ${canAction ? `
      <div class="card" style="border:2px solid var(--brand)">
        <div class="card-title" style="margin-bottom:8px">Sua aprovação</div>
        <p style="font-size:13px;color:var(--text-2);margin-bottom:16px">
          Você está aprovando como <strong>${db.perfil}</strong>. 
          Esta ação ficará registrada na linha do tempo.
        </p>
        <div style="display:flex;gap:12px;justify-content:flex-end">
          <button class="btn btn-danger" onclick="reprovarRequisicao(${id})">✕ Reprovar</button>
          <button class="btn btn-success" onclick="aprovarRequisicao(${id})">✓ Aprovar</button>
        </div>
      </div>
    ` : req.status === 'Aprovada' ? `
      <div class="alert alert-success">✅ Esta requisição foi <strong>totalmente aprovada</strong> e está pronta para atendimento.</div>
    ` : req.status === 'Reprovada' ? `
      <div class="alert alert-danger">✕ Esta requisição foi <strong>reprovada</strong>. ${esc(req.obs||'')}</div>
    ` : `
      <div class="alert alert-info">👁 Seu perfil (<strong>${db.perfil}</strong>) não tem permissão para aprovar esta etapa.</div>
    `}`;
}

function aprovarRequisicao(id) {
  const req = db.requisicoes.find(r=>r.id===+id);
  if(!req) return;
  const fluxo = getFluxoRequisicao(req);
  const nextStatus = fluxo.next[req.status];
  if(!nextStatus) return;
  // Registra evento na timeline
  if(!req.eventos) req.eventos = [];
  req.eventos.push({
    step: req.status,
    ator: `${db.perfil} — ${db.usuarios.find(u=>u.perfil===db.perfil)?.nome||db.perfil}`,
    data: new Date().toISOString().slice(0,10),
    acao: 'Aprovado',
  });
  req.status = nextStatus;
  componentToast('success', `Aprovado! Novo status: ${statusReq(req.status).label}`);
  renderView(parseRoute());
  renderSidebar();
}

function reprovarRequisicao(id) {
  componentModalConfirm('Reprovar Requisição','Informe o motivo da reprovação:',val=>{
    const req = db.requisicoes.find(r=>r.id===+id);
    if(req) { req.status='Reprovada'; req.obs=(req.obs?req.obs+' | ':'')+`Reprovado: ${val||'sem justificativa'}`; }
    componentToast('error','Requisição reprovada.');
    navigateTo('/requisicoes');
  },{hasInput:true, inputLabel:'Justificativa', inputPlaceholder:'Descreva o motivo...'});
}

// ---------- ATENDER REQUISIÇÃO ----------
function viewAtenderRequisicao(id) {
  const req = db.requisicoes.find(r=>r.id===+id);
  if(!req) { navigateTo('/requisicoes'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Requisições',path:'/requisicoes'},{label:req.codigo+' — Atendimento',path:''}]);
  const rows = req.itens.map((it,idx)=>{
    const itemDb = db.itens.find(i=>i.id===it.itemId);
    const precomed = itemDb ? calcPrecoMedio(itemDb.id) : 0;
    return `<tr>
      <td>${esc(it.descricao)}</td>
      <td>${it.qtd}</td>
      <td><span class="${(itemDb?.qtd||0)>0?'qty-badge ok':'qty-badge critical'}">${itemDb?.qtd||0} disp.</span></td>
      <td>R$ ${fmt(precomed)}</td>
      <td><strong>R$ ${fmt(precomed * Math.min(it.qtd, itemDb?.qtd||0))}</strong></td>
      <td><input type="number" class="form-control" style="width:90px" id="atend-${idx}" min="0" max="${Math.min(it.qtd,itemDb?.qtd||0)}" value="${Math.min(it.qtd,itemDb?.qtd||0)}" /></td>
    </tr>`;
  }).join('');
  return `
    <div class="page-header">
      <div><div class="page-title">📤 Atendimento — ${esc(req.codigo)}</div></div>
      <button class="btn btn-secondary" onclick="navigateTo('/requisicoes/${id}')">← Voltar</button>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:12px">👤 Retirada por Colaborador</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Colaborador que vai retirar *</label>
          <select id="atend-colaborador" class="form-control">
            <option value="">Selecione o colaborador...</option>
            ${db.colaboradores.map(c=>`<option value="${c.id}">${esc(c.nome)} — ${esc(c.cpf)} (${esc(c.cargo)})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Centro de Custo (débito)</label>
          <input class="form-control" value="${esc(req.centro)}" readonly style="background:var(--surface2)" />
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Itens — Preço Médio e Quantidade</div>
      <div class="alert alert-info" style="margin-bottom:16px">📌 O valor a ser debitado é calculado com base no <strong>preço médio</strong> de cada item. Informe a quantidade efetivamente entregue.</div>
      <table class="data-table">
        <thead><tr><th>Item</th><th>Solicitado</th><th>Disponível</th><th>Preço Médio</th><th>Total Débito</th><th>Qtd Atendida</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <!-- CONFIRMAÇÃO / ASSINATURA (checkbox simples) -->
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin-top:20px">
        <div class="card-title" style="margin-bottom:10px">✍️ Confirmação de Retirada</div>
        <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer">
          <input type="checkbox" id="atend-confirma" style="width:18px;height:18px;margin-top:2px;accent-color:var(--brand)" />
          <span style="font-size:13px;color:var(--text)">
            Confirmo que os itens listados acima foram entregues ao colaborador selecionado, 
            que está ciente da retirada e responsável pelos materiais recebidos. 
            O valor será debitado no centro de custo indicado.
          </span>
        </label>
      </div>
      <div id="atend-errors"></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="navigateTo('/requisicoes/${id}')">Cancelar</button>
        <button class="btn btn-success" onclick="confirmarRetirada(${id})">✓ Confirmar Retirada</button>
      </div>
    </div>`;
}

function confirmarRetirada(id) {
  const req = db.requisicoes.find(r=>r.id===+id);
  if(!req) return;
  const errEl = document.getElementById('atend-errors');
  const colabId = document.getElementById('atend-colaborador')?.value;
  const confirmado = document.getElementById('atend-confirma')?.checked;
  if(!colabId) { errEl.innerHTML='<div class="alert alert-danger">Selecione o colaborador que está retirando.</div>'; return; }
  if(!confirmado) { errEl.innerHTML='<div class="alert alert-danger">É necessário marcar a confirmação de retirada antes de continuar.</div>'; return; }
  const colaborador = db.colaboradores.find(c=>c.id===+colabId);
  let totalSolicitado=0, totalAtendido=0;
  const itensVenda = [];
  req.itens.forEach((it,idx)=>{
    const qtd = parseInt(document.getElementById(`atend-${idx}`)?.value)||0;
    it.qtdAtendida = qtd;
    totalSolicitado += it.qtd;
    totalAtendido   += qtd;
    const itemDb = db.itens.find(i=>i.id===it.itemId);
    if(itemDb && qtd>0) {
      const pm = calcPrecoMedio(itemDb.id);
      itemDb.qtd = Math.max(0, itemDb.qtd - qtd);
      if(isCritical(itemDb)) componentToast('warning',`⚠️ "${itemDb.descricao}" atingiu nível crítico!`);
      checkReposicaoAutomatica(itemDb.id);
      itensVenda.push({ descricao:it.descricao, qtd, precomed:pm, subtotal:pm*qtd });
    }
  });
  req.status = totalAtendido>=totalSolicitado ? 'AtendidaTotal' : 'AtendidaParcial';
  req.colaboradorRetirada = colaborador ? `${colaborador.nome} (${colaborador.cpf})` : '';
  req.colaboradorId = colaborador?.id;
  req.dataRetirada = new Date().toISOString().slice(0,10);

  // Registra venda interna
  if(itensVenda.length) {
    const totalVenda = itensVenda.reduce((s,i)=>s+i.subtotal,0);
    if(!db.vendasInternas) db.vendasInternas=[];
    db.vendasInternas.push({
      id: db._nextIds.venda++,
      reqCodigo: req.codigo,
      data: req.dataRetirada,
      colaboradorId: colaborador?.id||0,
      colaborador: req.colaboradorRetirada,
      centro: req.centro,
      itens: itensVenda,
      total: totalVenda,
    });
  }

  componentToast('success',`Retirada confirmada por ${colaborador?.nome||'—'}! Status: ${statusReq(req.status).label}`);
  renderSidebar();
  navigateTo('/requisicoes');
}

// ---------- COMPRAS LIST ----------
function viewCompras() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Solicitações de Compra',path:'/compras'}]);
  const canApprove = ['Admin','Compras','Diretoria'].includes(db.perfil);
  const canSpot    = ['Admin','Solicitante','Gestor','Almoxarifado','Compras'].includes(db.perfil);
  const html = componentTable(
    ['Código','Tipo','Origem','Status','Data','Total Estimado'],
    [...db.compras].sort((a,b)=>b.id-a.id).map(c=>({
      raw:c,
      cells:[
        `<strong>${esc(c.codigo)}</strong>`,
        c.tipo==='Spot'
          ? `<span class="badge badge-warning">⚡ Spot</span>`
          : `<span class="badge badge-gray">Normal</span>`,
        esc(c.origem),
        componentBadge(c.status,'compra'),
        fmtDate(c.data),
        `<strong>R$ ${fmt(c.total)}</strong>`
      ]
    })),
    c=>`
      <button class="btn btn-sm btn-secondary" onclick="navigateTo('/compras/${c.id}')">👁 Ver</button>
      ${canApprove&&c.status==='EmAprovacaoCompras'?`<button class="btn btn-sm btn-warning" onclick="navigateTo('/compras/${c.id}')">✅ Aprovar</button>`:''}
    `
  );
  return `
    <div class="page-header">
      <div><div class="page-title">🛒 Solicitações de Compra</div><div class="page-subtitle">${db.compras.length} solicitações</div></div>
      ${canSpot?`<button class="btn btn-warning" onclick="navigateTo('/compras/spot')">⚡ Nova Compra Spot</button>`:''}
    </div>
    <div class="card">${html}</div>`;
}

// ---------- COMPRA DETALHE ----------
function viewCompraDetalhe(id) {
  const compra = db.compras.find(c=>c.id===+id);
  if(!compra) { navigateTo('/compras'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Compras',path:'/compras'},{label:compra.codigo,path:''}]);
  const canApprove = ['Admin','Compras','Diretoria'].includes(db.perfil);
  const canReceive = ['Admin','Almoxarifado'].includes(db.perfil) && compra.tipo !== 'Spot';
  const isSpot = compra.tipo === 'Spot';
  return `
    <div class="page-header">
      <div>
        <div class="page-title">🛒 ${esc(compra.codigo)} ${isSpot?'<span class="badge badge-warning">⚡ Spot</span>':''}</div>
        <div class="page-subtitle">${componentBadge(compra.status,'compra')}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${canApprove&&compra.status==='EmAprovacaoCompras'?`<button class="btn btn-success" onclick="aprovarCompra(${id})">✅ Aprovar Compra</button>`:''}
        ${canReceive&&compra.status==='Aprovada'?`<button class="btn btn-primary" onclick="receberCompra(${id})">📦 Marcar como Recebido</button>`:''}
        ${isSpot&&compra.status==='Aprovada'&&['Admin','Almoxarifado'].includes(db.perfil)?`<button class="btn btn-success" onclick="confirmarEntregaSpot(${id})">✅ Confirmar Entrega ao Solicitante</button>`:''}
        <button class="btn btn-secondary" onclick="navigateTo('/compras')">← Voltar</button>
      </div>
    </div>
    ${isSpot?`<div class="alert alert-warning" style="margin-bottom:20px">⚡ <strong>Compra Spot</strong> — Este item é de uso imediato. Ao receber, notificar o solicitante para retirada. O valor será debitado diretamente no centro de custo <strong>${esc(compra.centro||'—')}</strong>.</div>`:''}
    <div class="card" style="margin-bottom:20px">
      <div class="detail-grid">
        <div class="detail-field"><div class="detail-label">Código</div><div class="detail-value">${esc(compra.codigo)}</div></div>
        <div class="detail-field"><div class="detail-label">Tipo</div><div class="detail-value">${isSpot?'<span class="badge badge-warning">⚡ Spot</span>':'<span class="badge badge-gray">Normal</span>'}</div></div>
        <div class="detail-field"><div class="detail-label">Origem</div><div class="detail-value">${esc(compra.origem)}</div></div>
        <div class="detail-field"><div class="detail-label">Data</div><div class="detail-value">${fmtDate(compra.data)}</div></div>
        <div class="detail-field"><div class="detail-label">Total Estimado</div><div class="detail-value">R$ ${fmt(compra.total)}</div></div>
        <div class="detail-field"><div class="detail-label">Status</div><div class="detail-value">${componentBadge(compra.status,'compra')}</div></div>
        ${compra.centro?`<div class="detail-field"><div class="detail-label">Centro de Custo (débito)</div><div class="detail-value">${esc(compra.centro)}</div></div>`:''}
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">Itens da Compra</div>
      <table class="data-table"><thead><tr><th>Descrição</th><th>Qtd</th><th>Preço Unit.</th><th>Subtotal</th></tr></thead><tbody>
        ${compra.itens.map(it=>`<tr><td>${esc(it.descricao)}</td><td>${it.qtd}</td><td>R$ ${fmt(it.preco)}</td><td><strong>R$ ${fmt(it.qtd*it.preco)}</strong></td></tr>`).join('')}
      </tbody><tfoot><tr style="background:var(--surface2)"><td colspan="3" style="text-align:right;font-weight:700">Total:</td><td><strong>R$ ${fmt(compra.total)}</strong></td></tr></tfoot></table>
    </div>`;
}

// ---------- NOVA COMPRA SPOT ----------
let spotItens = [];

function viewCompraSpot() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Compras',path:'/compras'},{label:'Nova Compra Spot',path:''}]);
  spotItens = [];
  return `
    <div class="page-header">
      <div>
        <div class="page-title">⚡ Nova Compra Spot</div>
        <div class="page-subtitle">Item de uso imediato — débito direto no centro de custo</div>
      </div>
      <button class="btn btn-secondary" onclick="navigateTo('/compras')">← Voltar</button>
    </div>
    <div class="alert alert-warning" style="margin-bottom:20px">
      ⚡ Compra Spot é para itens de <strong>uso imediato</strong>, sem entrada em estoque. O valor é debitado diretamente no centro de custo selecionado. Ao chegar, o solicitante deve retirar imediatamente.
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:16px">Dados da Solicitação</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Centro de Custo (débito) *</label>
          <select id="spot-centro" class="form-control">
            <option value="">Selecione...</option>
            ${db.centros.filter(c=>!c.includes('ALM')).map(c=>`<option>${esc(c)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Solicitante *</label>
          <select id="spot-solicitante" class="form-control">
            <option value="">Selecione...</option>
            ${db.colaboradores.map(c=>`<option value="${c.id}">${esc(c.nome)} — ${esc(c.cargo)}</option>`).join('')}
          </select>
        </div>
        <div class="form-group full-width">
          <label class="form-label">Justificativa *</label>
          <textarea id="spot-obs" class="form-control" rows="2" placeholder="Descreva a necessidade e urgência..."></textarea>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">📦 Itens a Comprar</div>
      <div class="inline-add">
        <div class="form-group" style="flex:1;min-width:200px">
          <label class="form-label">Descrição do item *</label>
          <input type="text" id="spot-item-desc" class="form-control" placeholder="Ex: Adaptador USB-C, Cabo de força..." />
        </div>
        <div class="form-group" style="width:90px">
          <label class="form-label">Qtd *</label>
          <input type="number" min="1" id="spot-item-qtd" class="form-control" value="1" />
        </div>
        <div class="form-group" style="width:130px">
          <label class="form-label">Preço Unit. (R$)</label>
          <input type="number" min="0" step="0.01" id="spot-item-preco" class="form-control" value="0" />
        </div>
        <div class="form-group" style="justify-content:flex-end">
          <label class="form-label">&nbsp;</label>
          <button class="btn btn-secondary" onclick="addSpotItem()">➕ Adicionar</button>
        </div>
      </div>
      <div id="spot-itens-table"></div>
      <div id="spot-total" style="text-align:right;font-size:15px;font-weight:700;padding:12px 0;color:var(--brand)"></div>
      <div id="spot-errors"></div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="navigateTo('/compras')">Cancelar</button>
        <button class="btn btn-warning" onclick="submitCompraSpot()">⚡ Enviar Solicitação Spot</button>
      </div>
    </div>`;
}

function addSpotItem() {
  const desc  = document.getElementById('spot-item-desc')?.value?.trim();
  const qtd   = parseInt(document.getElementById('spot-item-qtd')?.value)||0;
  const preco = parseFloat(document.getElementById('spot-item-preco')?.value)||0;
  const errEl = document.getElementById('spot-errors');
  if(!desc)  { errEl.innerHTML='<div class="alert alert-danger">Informe a descrição do item.</div>'; return; }
  if(qtd<=0) { errEl.innerHTML='<div class="alert alert-danger">Quantidade deve ser maior que zero.</div>'; return; }
  errEl.innerHTML='';
  spotItens.push({ descricao:desc, qtd, preco, itemId:0 });
  document.getElementById('spot-item-desc').value='';
  document.getElementById('spot-item-qtd').value='1';
  document.getElementById('spot-item-preco').value='0';
  renderSpotItensTable();
}

function removeSpotItem(idx) {
  spotItens.splice(idx,1);
  renderSpotItensTable();
}

function renderSpotItensTable() {
  const el = document.getElementById('spot-itens-table');
  const totalEl = document.getElementById('spot-total');
  if(!el) return;
  if(!spotItens.length) {
    el.innerHTML='<div class="empty-state" style="padding:20px"><div class="empty-icon">⚡</div><div class="empty-title">Nenhum item adicionado</div></div>';
    if(totalEl) totalEl.textContent='';
    return;
  }
  const total = spotItens.reduce((s,i)=>s+i.preco*i.qtd,0);
  el.innerHTML=`<table class="data-table"><thead><tr><th>Descrição</th><th>Qtd</th><th>Preço Unit.</th><th>Subtotal</th><th></th></tr></thead><tbody>
    ${spotItens.map((it,i)=>`<tr>
      <td>${esc(it.descricao)}</td><td>${it.qtd}</td>
      <td>R$ ${fmt(it.preco)}</td>
      <td><strong>R$ ${fmt(it.qtd*it.preco)}</strong></td>
      <td><button class="btn btn-sm btn-danger" onclick="removeSpotItem(${i})">🗑️</button></td>
    </tr>`).join('')}
  </tbody></table>`;
  if(totalEl) totalEl.textContent=`Total estimado: R$ ${fmt(total)}`;
}

function submitCompraSpot() {
  const centro  = document.getElementById('spot-centro')?.value;
  const solId   = document.getElementById('spot-solicitante')?.value;
  const obs     = document.getElementById('spot-obs')?.value?.trim();
  const errEl   = document.getElementById('spot-errors');
  if(!centro) { errEl.innerHTML='<div class="alert alert-danger">Selecione o Centro de Custo.</div>'; return; }
  if(!solId)  { errEl.innerHTML='<div class="alert alert-danger">Selecione o solicitante.</div>'; return; }
  if(!obs)    { errEl.innerHTML='<div class="alert alert-danger">Informe a justificativa.</div>'; return; }
  if(!spotItens.length) { errEl.innerHTML='<div class="alert alert-danger">Adicione ao menos um item.</div>'; return; }
  const colaborador = db.colaboradores.find(c=>c.id===+solId);
  const total = spotItens.reduce((s,i)=>s+i.preco*i.qtd,0);
  const nova = {
    id: db._nextIds.compra++,
    codigo: `OC-${new Date().getFullYear()}-${String(db._nextIds.compra-1).padStart(3,'0')}`,
    tipo: 'Spot',
    origem: `Spot — Solicitante: ${colaborador?.nome||'—'}`,
    centro,
    status: 'EmAprovacaoCompras',
    data: new Date().toISOString().slice(0,10),
    total,
    obs,
    itens: [...spotItens],
  };
  db.compras.push(nova);
  componentToast('success',`Compra Spot ${nova.codigo} enviada para aprovação!`);
  navigateTo('/compras');
}

function confirmarEntregaSpot(id) {
  componentModalConfirm('✅ Confirmar Entrega Spot','Confirma que o solicitante retirou os itens? Esta ação finaliza a compra spot.',()=>{
    const c = db.compras.find(c=>c.id===+id);
    if(c) c.status = 'Recebida';
    componentToast('success','Entrega spot confirmada!');
    renderView(parseRoute());
  });
}

function aprovarCompra(id) {
  componentModalConfirm('✅ Aprovar Compra','Confirma a aprovação desta solicitação de compra?',()=>{
    const c = db.compras.find(c=>c.id===+id);
    if(c) c.status='Aprovada';
    componentToast('success','Compra aprovada com sucesso!');
    renderView(parseRoute());
  });
}

function receberCompra(id) {
  componentModalConfirm('📦 Confirmar Recebimento','Confirma o recebimento dos itens desta compra? O estoque e o preço médio serão atualizados.',()=>{
    const c = db.compras.find(c=>c.id===+id);
    if(!c) return;
    c.itens.forEach(li=>{
      const item = db.itens.find(i=>i.id===li.itemId);
      if(item) {
        item.qtd = Math.min(item.max, item.qtd + li.qtd);
        registrarHistoricoPreco(item.id, li.preco, li.qtd);
      }
    });
    c.status = 'Recebida';
    componentToast('success','Recebimento confirmado! Estoque e preço médio atualizados.');
    renderView(parseRoute());
    renderSidebar();
  });
}

// ---------- INVENTÁRIO ----------
function viewInventario() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Inventário',path:'/inventario'}]);
  const canEdit = ['Admin','Almoxarifado','Compras'].includes(db.perfil);
  const itensEstoque = db.itens.filter(i=>i.paraEstoque);
  return `
    <div class="page-header">
      <div>
        <div class="page-title">🗃️ Inventário de Estoque</div>
        <div class="page-subtitle">Posição atual · ${itensEstoque.length} itens · Última atualização: ${new Date().toLocaleDateString('pt-BR')}</div>
      </div>
      ${canEdit?`<button class="btn btn-primary" onclick="saveInventario()">💾 Salvar Ajustes</button>`:''}
    </div>
    ${canEdit?`<div class="alert alert-warning" style="margin-bottom:20px">
      ⚠️ <strong>Modo de Edição Ativo.</strong> Ajustes de inventário devem ser realizados com acompanhamento da contabilidade. Todas as alterações ficam registradas.
    </div>`:''}
    <div class="card">
      <table class="data-table" id="inv-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Qtd Atual</th>
            <th>Mín</th>
            <th>P.Rep.</th>
            <th>Máx</th>
            <th>Localização</th>
            <th>Preço Médio</th>
            <th>Valor Total</th>
            ${canEdit?'<th>Qtd Inventário</th>':''}
          </tr>
        </thead>
        <tbody>
          ${itensEstoque.map((item,idx)=>{
            const pm = calcPrecoMedio(item.id);
            const ponto = item.pontoReposicao ?? calcPontoReposicao(item.min, item.max);
            const crit = isCritical(item);
            return `<tr style="${crit?'background:#FEF2F2':''}">
              <td><strong>${esc(item.codigo)}</strong></td>
              <td>${esc(item.descricao)}${crit?' <span class="badge badge-danger" style="font-size:10px">Crítico</span>':''}</td>
              <td><span class="tag">${esc(item.tipo)}</span></td>
              <td><span class="qty-badge ${crit?'critical':item.qtd<ponto?'low':'ok'}">${item.qtd}</span></td>
              <td>${item.min}</td>
              <td><span class="rep-marker">${ponto}</span></td>
              <td>${item.max}</td>
              <td>
                ${canEdit
                  ? `<input type="text" class="form-control" style="min-width:130px" id="inv-loc-${item.id}" value="${esc(item.localizacao||'')}" placeholder="Ex: Prateleira A-3" />`
                  : `<span style="color:var(--text-2)">${esc(item.localizacao||'—')}</span>`
                }
              </td>
              <td>R$ ${fmt(pm)}</td>
              <td><strong>R$ ${fmt(pm * item.qtd)}</strong></td>
              ${canEdit?`<td><input type="number" min="0" class="form-control" style="width:90px" id="inv-qtd-${item.id}" value="${item.qtd}" /></td>`:''}
            </tr>`;
          }).join('')}
        </tbody>
        <tfoot>
          <tr style="background:var(--surface2)">
            <td colspan="${canEdit?9:8}" style="text-align:right;font-weight:700">Valor Total do Inventário:</td>
            <td colspan="2"><strong style="color:var(--brand);font-size:15px">
              R$ ${fmt(itensEstoque.reduce((s,i)=>s+calcPrecoMedio(i.id)*i.qtd,0))}
            </strong></td>
          </tr>
        </tfoot>
      </table>
    </div>`;
}

function saveInventario() {
  const canEdit = ['Admin','Almoxarifado','Compras'].includes(db.perfil);
  if(!canEdit) return;
  let alteracoes = 0;
  db.itens.filter(i=>i.paraEstoque).forEach(item=>{
    const novaQtd = parseInt(document.getElementById(`inv-qtd-${item.id}`)?.value);
    const novaLoc = document.getElementById(`inv-loc-${item.id}`)?.value?.trim()||'';
    if(!isNaN(novaQtd) && novaQtd !== item.qtd) {
      item.qtd = Math.max(0, novaQtd);
      alteracoes++;
      checkReposicaoAutomatica(item.id);
    }
    if(novaLoc !== (item.localizacao||'')) {
      item.localizacao = novaLoc;
      alteracoes++;
    }
  });
  renderSidebar();
  componentToast('success', `Inventário salvo! ${alteracoes} alteração(ões) registrada(s).`);
  renderView(parseRoute());
}

// ---------- COLABORADORES ----------
function viewColaboradores() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Colaboradores',path:'/colaboradores'}]);
  const canEdit = ['Admin','Almoxarifado'].includes(db.perfil);
  return `
    <div class="page-header">
      <div><div class="page-title">👥 Colaboradores</div><div class="page-subtitle">${db.colaboradores.length} cadastrados</div></div>
      ${canEdit?`<button class="btn btn-primary" onclick="navigateTo('/colaboradores/novo')">＋ Novo Colaborador</button>`:''}
    </div>
    <div class="card">
      ${componentTable(
        ['Nome','CPF','Centro de Custo','Cargo','Retiradas'],
        db.colaboradores.map(c=>{
          const retiradas = (db.vendasInternas||[]).filter(v=>v.colaboradorId===c.id).length;
          return {
            raw:c,
            cells:[
              `<div style="display:flex;align-items:center;gap:10px">
                <div class="item-avatar" style="width:32px;height:32px;font-size:11px;background:var(--brand)">${itemInitials(c.nome)}</div>
                <strong>${esc(c.nome)}</strong>
              </div>`,
              `<span class="tag">${esc(c.cpf)}</span>`,
              esc(c.centro.split('|')[1]?.trim()||c.centro),
              esc(c.cargo),
              retiradas > 0
                ? `<span class="badge badge-info">${retiradas} retirada${retiradas>1?'s':''}</span>`
                : `<span style="color:var(--text-3);font-size:12px">—</span>`,
            ]
          };
        }),
        c=>`
          <button class="btn btn-sm btn-secondary" onclick="navigateTo('/colaboradores/${c.id}')">👁 Ver</button>
          ${canEdit?`<button class="btn btn-sm btn-primary" onclick="navigateTo('/colaboradores/${c.id}/editar')">✏️ Editar</button>`:''}
        `
      )}
    </div>`;
}

function viewColaboradorDetalhe(id) {
  const colab = db.colaboradores.find(c=>c.id===+id);
  if(!colab) { navigateTo('/colaboradores'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Colaboradores',path:'/colaboradores'},{label:colab.nome,path:''}]);
  const canEdit = ['Admin','Almoxarifado'].includes(db.perfil);
  const historico = (db.vendasInternas||[]).filter(v=>v.colaboradorId===colab.id).sort((a,b)=>b.id-a.id);
  const totalRetirado = historico.reduce((s,v)=>s+v.total,0);
  const totalItens    = historico.reduce((s,v)=>s+v.itens.reduce((si,i)=>si+i.qtd,0),0);

  const histRows = historico.length
    ? historico.map(v=>`
        <tr>
          <td>${fmtDate(v.data)}</td>
          <td><strong>${esc(v.reqCodigo)}</strong></td>
          <td>${esc(v.centro.split('|')[1]?.trim()||v.centro)}</td>
          <td>${v.itens.map(i=>`<div style="font-size:12px">${esc(i.descricao)} × ${i.qtd}</div>`).join('')}</td>
          <td><strong>R$ ${fmt(v.total)}</strong></td>
        </tr>`).join('')
    : `<tr><td colspan="5" style="text-align:center;color:var(--text-3);padding:20px">Nenhuma retirada registrada.</td></tr>`;

  return `
    <div class="page-header">
      <div><div class="page-title">👤 ${esc(colab.nome)}</div><div class="page-subtitle">${esc(colab.cargo)} · ${esc(colab.centro)}</div></div>
      <div style="display:flex;gap:8px">
        ${canEdit?`<button class="btn btn-primary" onclick="navigateTo('/colaboradores/${id}/editar')">✏️ Editar</button>`:''}
        <button class="btn btn-secondary" onclick="navigateTo('/colaboradores')">← Voltar</button>
      </div>
    </div>

    <div class="stat-cards" style="margin-bottom:20px">
      ${componentStatCard('Total Retiradas', historico.length, 'Requisições atendidas', 'var(--brand)')}
      ${componentStatCard('Itens Retirados', totalItens, 'Unidades no total', 'var(--info)')}
      ${componentStatCard('Valor Total', `R$ ${fmt(totalRetirado)}`, 'Débito acumulado', 'var(--warning)')}
    </div>

    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:12px">Dados do Colaborador</div>
      <div class="detail-grid">
        <div class="detail-field"><div class="detail-label">Nome</div><div class="detail-value">${esc(colab.nome)}</div></div>
        <div class="detail-field"><div class="detail-label">CPF</div><div class="detail-value"><span class="tag">${esc(colab.cpf)}</span></div></div>
        <div class="detail-field"><div class="detail-label">Cargo</div><div class="detail-value">${esc(colab.cargo)||'—'}</div></div>
        <div class="detail-field"><div class="detail-label">Centro de Custo</div><div class="detail-value">${esc(colab.centro)||'—'}</div></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">📦 Histórico de Retiradas</div>
        <span style="font-size:12px;color:var(--text-3)">${historico.length} registro(s)</span>
      </div>
      <table class="data-table">
        <thead><tr><th>Data</th><th>Requisição</th><th>Centro de Custo</th><th>Itens</th><th>Valor</th></tr></thead>
        <tbody>${histRows}</tbody>
        ${historico.length?`<tfoot><tr style="background:var(--surface2)">
          <td colspan="4" style="text-align:right;font-weight:700">Total debitado:</td>
          <td><strong style="color:var(--brand)">R$ ${fmt(totalRetirado)}</strong></td>
        </tr></tfoot>`:''}
      </table>
    </div>`;
}

function viewColaboradorForm(id) {
  const isEdit = !!id;
  const colab = isEdit ? db.colaboradores.find(c=>c.id===+id) : null;
  if(isEdit && !colab) { navigateTo('/colaboradores'); return ''; }
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Colaboradores',path:'/colaboradores'},{label:isEdit?'Editar':'Novo',path:''}]);
  const v = colab || { nome:'', cpf:'', centro:'', cargo:'' };
  return `
    <div class="page-header">
      <div><div class="page-title">${isEdit?'✏️ Editar Colaborador':'➕ Novo Colaborador'}</div></div>
      <button class="btn btn-secondary" onclick="navigateTo('/colaboradores')">← Voltar</button>
    </div>
    <div class="card">
      <form id="colab-form" autocomplete="off">
        <div class="form-grid">
          <div class="form-group full-width"><label class="form-label">Nome Completo *</label><input id="cf-nome" class="form-control" value="${esc(v.nome)}" required /></div>
          <div class="form-group"><label class="form-label">CPF *</label><input id="cf-cpf" class="form-control" value="${esc(v.cpf)}" placeholder="000.000.000-00" required /></div>
          <div class="form-group"><label class="form-label">Cargo</label><input id="cf-cargo" class="form-control" value="${esc(v.cargo)}" /></div>
          <div class="form-group"><label class="form-label">Centro de Custo</label>
            <select id="cf-centro" class="form-control">
              <option value="">Selecione...</option>
              ${db.centros.map(c=>`<option${v.centro===c?' selected':''}>${esc(c)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div id="cf-errors"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="navigateTo('/colaboradores')">Cancelar</button>
          <button type="submit" class="btn btn-primary">💾 Salvar</button>
        </div>
      </form>
    </div>`;
}

function bindColaboradorForm(id) {
  const form = document.getElementById('colab-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const val = s => document.getElementById(s)?.value?.trim()||'';
    const errors = [];
    if(!val('cf-nome')) errors.push('Nome é obrigatório.');
    if(!val('cf-cpf'))  errors.push('CPF é obrigatório.');
    document.getElementById('cf-errors').innerHTML = errors.map(e=>`<div class="alert alert-danger">${esc(e)}</div>`).join('');
    if(errors.length) return;
    const data = { nome:val('cf-nome'), cpf:val('cf-cpf'), cargo:val('cf-cargo'), centro:val('cf-centro') };
    if(id) {
      const idx = db.colaboradores.findIndex(c=>c.id===+id);
      db.colaboradores[idx]={...db.colaboradores[idx],...data};
      componentToast('success','Colaborador atualizado!');
    } else {
      db.colaboradores.push({id:db._nextIds.colaborador++,...data});
      componentToast('success','Colaborador cadastrado!');
    }
    navigateTo('/colaboradores');
  });
}
// ---------- RELATÓRIOS ----------
function viewRelatorios() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Relatórios',path:'/relatorios'}]);

  const criticos       = db.itens.filter(isCritical);
  const comprasAbertas = db.compras.filter(c=>c.status==='EmAprovacaoCompras');
  const vendas         = db.vendasInternas || [];
  const totalVendas    = vendas.reduce((s,v)=>s+v.total, 0);
  const valorEstoque   = db.itens.filter(i=>i.paraEstoque).reduce((s,i)=>s+calcPrecoMedio(i.id)*i.qtd, 0);

  // Req por status — bar chart
  const reqByStatus = {};
  db.requisicoes.forEach(r=>{ reqByStatus[r.status]=(reqByStatus[r.status]||0)+1; });
  const maxVal = Math.max(...Object.values(reqByStatus), 1);
  const barChart = Object.entries(reqByStatus).map(([s,v])=>{
    const pct = Math.round((v/maxVal)*100);
    return `<div class="bar-group">
      <div class="bar-value">${v}</div>
      <div class="bar" style="height:${pct}%"></div>
      <div class="bar-label">${esc(statusReq(s).label)}</div>
    </div>`;
  }).join('');

  // Vendas por CC
  const vendasPorCC = {};
  vendas.forEach(v=>{ vendasPorCC[v.centro]=(vendasPorCC[v.centro]||0)+v.total; });
  const topCC = Object.entries(vendasPorCC).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxCC = Math.max(...topCC.map(x=>x[1]), 1);

  // Top itens mais retirados
  const consumoPorItem = {};
  vendas.forEach(v=>v.itens.forEach(i=>{
    consumoPorItem[i.descricao]=(consumoPorItem[i.descricao]||0)+i.qtd;
  }));
  const topItens = Object.entries(consumoPorItem).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // Consumo por colaborador
  const consumoPorColab = {};
  vendas.forEach(v=>{
    const key = v.colaborador;
    if(!consumoPorColab[key]) consumoPorColab[key]={nome:key, qtd:0, total:0};
    consumoPorColab[key].total += v.total;
    consumoPorColab[key].qtd   += v.itens.reduce((s,i)=>s+i.qtd,0);
  });
  const topColabs = Object.values(consumoPorColab).sort((a,b)=>b.total-a.total).slice(0,5);

  return `
    <div class="page-header"><div><div class="page-title">📊 Relatórios</div></div></div>

    <!-- KPIs -->
    <div class="stat-cards" style="margin-bottom:24px">
      ${componentStatCard('Valor em Estoque', `R$ ${fmt(valorEstoque)}`, 'Preço médio × qtd', 'var(--brand)')}
      ${componentStatCard('Vendas Internas', `R$ ${fmt(totalVendas)}`, `${vendas.length} transações`, 'var(--success)')}
      ${componentStatCard('Itens Críticos', criticos.length, 'Abaixo do mínimo', 'var(--danger)')}
      ${componentStatCard('Compras em Aberto', comprasAbertas.length, 'Aguardam aprovação', 'var(--warning)')}
    </div>

    <!-- Req por status + Itens críticos -->
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card">
        <div class="card-title" style="margin-bottom:16px">📈 Requisições por Status</div>
        <div class="bar-chart">${barChart||'<div class="empty-state" style="padding:20px"><div class="empty-icon">📋</div><div class="empty-title">Sem dados</div></div>'}</div>
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">📉 Itens com Estoque Baixo</div>
        ${criticos.length ? criticos.map(i=>`
          <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)">
            <div class="item-avatar" style="background:var(--danger);width:32px;height:32px;font-size:11px">${itemInitials(i.descricao)}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${esc(i.descricao)}</div>
              <div style="font-size:11px;color:var(--text-3)">${esc(i.codigo)}</div>
            </div>
            <span class="badge badge-danger">${i.qtd}/${i.min}</span>
          </div>`).join('') :
          `<div class="empty-state" style="padding:24px"><div class="empty-icon">✅</div><div class="empty-title">Nenhum item crítico</div></div>`}
      </div>
    </div>

    <!-- Vendas internas por CC + Top itens -->
    <div class="grid-2" style="margin-bottom:24px">
      <div class="card">
        <div class="card-title" style="margin-bottom:16px">💰 Vendas Internas por Centro de Custo</div>
        ${topCC.length ? topCC.map(([cc,val])=>{
          const pct = Math.round((val/maxCC)*100);
          const label = cc.split('|')[1]?.trim()||cc;
          return `<div style="margin-bottom:12px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
              <span style="font-weight:600">${esc(label)}</span>
              <strong>R$ ${fmt(val)}</strong>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--brand)"></div></div>
          </div>`;
        }).join('') :
        `<div class="empty-state" style="padding:20px"><div class="empty-icon">💰</div><div class="empty-title">Sem vendas registradas</div></div>`}
      </div>
      <div class="card">
        <div class="card-title" style="margin-bottom:12px">🏆 Itens Mais Retirados</div>
        ${topItens.length ? topItens.map(([desc,qtd],i)=>`
          <div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="width:24px;height:24px;border-radius:50%;background:var(--brand);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i+1}</div>
            <div style="flex:1;font-size:13px">${esc(desc)}</div>
            <span class="badge badge-info">${qtd} un.</span>
          </div>`).join('') :
          `<div class="empty-state" style="padding:20px"><div class="empty-icon">📦</div><div class="empty-title">Sem retiradas</div></div>`}
      </div>
    </div>

    <!-- Consumo por colaborador -->
    <div class="card" style="margin-bottom:24px">
      <div class="card-header">
        <div class="card-title">👤 Consumo por Colaborador</div>
        <a href="#/colaboradores" class="btn btn-sm btn-secondary">Ver todos</a>
      </div>
      ${topColabs.length ?
        `<table class="data-table">
          <thead><tr><th>Colaborador</th><th>Itens Retirados</th><th>Valor Total</th><th>Última Retirada</th></tr></thead>
          <tbody>
            ${topColabs.map(c=>{
              const ultima = [...vendas].filter(v=>v.colaborador===c.nome).sort((a,b)=>b.id-a.id)[0];
              return `<tr>
                <td><strong>${esc(c.nome.split('(')[0].trim())}</strong></td>
                <td>${c.qtd} un.</td>
                <td><strong>R$ ${fmt(c.total)}</strong></td>
                <td>${ultima?fmtDate(ultima.data):'—'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>` :
        `<div class="empty-state" style="padding:20px"><div class="empty-icon">👤</div><div class="empty-title">Sem retiradas registradas</div></div>`}
    </div>

    <!-- Posição completa de estoque -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">📋 Posição de Estoque</div>
        <strong style="color:var(--brand)">Total: R$ ${fmt(valorEstoque)}</strong>
      </div>
      <table class="data-table">
        <thead><tr><th>Código</th><th>Descrição</th><th>Qtd</th><th>Mín</th><th>P.Rep.</th><th>Máx</th><th>Preço Médio</th><th>Valor Total</th><th>Nível</th></tr></thead>
        <tbody>
          ${db.itens.filter(i=>i.paraEstoque).map(i=>{
            const pct   = i.max>0 ? Math.min(100,Math.round((i.qtd/i.max)*100)) : 0;
            const ponto = i.pontoReposicao ?? calcPontoReposicao(i.min, i.max);
            const pm    = calcPrecoMedio(i.id);
            const crit  = isCritical(i);
            return `<tr>
              <td>${esc(i.codigo)}</td>
              <td>${esc(i.descricao)}</td>
              <td><strong>${i.qtd}</strong></td>
              <td>${i.min}</td>
              <td><span class="rep-marker">${ponto}</span></td>
              <td>${i.max}</td>
              <td>R$ ${fmt(pm)}</td>
              <td><strong>R$ ${fmt(pm*i.qtd)}</strong></td>
              <td><div class="progress-bar" style="width:90px"><div class="progress-fill" style="width:${pct}%;background:${crit?'var(--danger)':i.qtd<ponto?'var(--warning)':'var(--success)'}"></div></div></td>
            </tr>`;
          }).join('')}
        </tbody>
        <tfoot>
          <tr style="background:var(--surface2)">
            <td colspan="7" style="text-align:right;font-weight:700">Valor total em estoque:</td>
            <td colspan="2"><strong style="color:var(--brand);font-size:14px">R$ ${fmt(valorEstoque)}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Histórico completo de vendas internas -->
    <div class="card" style="margin-top:24px">
      <div class="card-header">
        <div class="card-title">🧾 Vendas Internas — Histórico Completo</div>
        <strong style="color:var(--success)">Total: R$ ${fmt(totalVendas)}</strong>
      </div>
      ${vendas.length ?
        `<table class="data-table">
          <thead><tr><th>Data</th><th>Requisição</th><th>Colaborador</th><th>Centro de Custo</th><th>Itens</th><th>Valor</th></tr></thead>
          <tbody>
            ${[...vendas].sort((a,b)=>b.id-a.id).map(v=>`<tr>
              <td>${fmtDate(v.data)}</td>
              <td><strong>${esc(v.reqCodigo)}</strong></td>
              <td>${esc(v.colaborador.split('(')[0].trim())}</td>
              <td>${esc(v.centro.split('|')[1]?.trim()||v.centro)}</td>
              <td style="font-size:12px">${v.itens.map(i=>`${esc(i.descricao)} ×${i.qtd}`).join(', ')}</td>
              <td><strong>R$ ${fmt(v.total)}</strong></td>
            </tr>`).join('')}
          </tbody>
          <tfoot><tr style="background:var(--surface2)">
            <td colspan="5" style="text-align:right;font-weight:700">Total:</td>
            <td><strong style="color:var(--success)">R$ ${fmt(totalVendas)}</strong></td>
          </tr></tfoot>
        </table>` :
        `<div class="empty-state" style="padding:24px"><div class="empty-icon">🧾</div><div class="empty-title">Nenhuma venda interna registrada</div></div>`}
    </div>`;
}

// ---------- CONFIGURAÇÕES ----------
function viewConfig() {
  setBreadcrumb([{label:'Home',path:'/home'},{label:'Configurações',path:'/config'}]);
  const perfis = ['Admin','Almoxarifado','Compras','Solicitante','Gestor','Diretoria'];
  const perms = {
    Admin:         { itens:'✅','req':'✅',compras:'✅',aprovar:'✅',atender:'✅' },
    Almoxarifado:  { itens:'✅','req':'✅',compras:'⭕',aprovar:'✅',atender:'✅' },
    Compras:       { itens:'👁','req':'👁',compras:'✅',aprovar:'⭕',atender:'⭕' },
    Solicitante:   { itens:'👁','req':'✅',compras:'⭕',aprovar:'⭕',atender:'⭕' },
    Gestor:        { itens:'👁','req':'👁',compras:'👁',aprovar:'✅',atender:'⭕' },
    Diretoria:     { itens:'👁','req':'👁',compras:'✅',aprovar:'✅',atender:'⭕' },
  };
  return `
    <div class="page-header"><div><div class="page-title">⚙️ Configurações</div></div></div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:16px">👤 Perfil de Acesso Atual</div>
      <div class="form-group" style="max-width:300px">
        <label class="form-label">Perfil Ativo (simulação)</label>
        <select class="form-control" id="perfil-select" onchange="trocarPerfil(this.value)">
          ${perfis.map(p=>`<option${p===db.perfil?' selected':''}>${p}</option>`).join('')}
        </select>
      </div>
      <p style="font-size:13px;color:var(--text-3);margin-top:8px">⚠️ Trocar o perfil altera as permissões exibidas no app (simulação).</p>
    </div>
    <div class="card" style="margin-bottom:20px">
      <div class="card-title" style="margin-bottom:12px">🔒 Matriz de Permissões</div>
      <table class="data-table">
        <thead><tr><th>Perfil</th><th>Itens (editar)</th><th>Requisição (criar)</th><th>Compras (gerir)</th><th>Aprovar Req.</th><th>Atender Req.</th></tr></thead>
        <tbody>
          ${Object.entries(perms).map(([p,v])=>`<tr${p===db.perfil?' style="background:#EEF4FF"':''}>
            <td><strong>${p}${p===db.perfil?' ← atual':''}</strong></td>
            <td style="text-align:center">${v.itens}</td>
            <td style="text-align:center">${v.req}</td>
            <td style="text-align:center">${v.compras}</td>
            <td style="text-align:center">${v.aprovar}</td>
            <td style="text-align:center">${v.atender}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:12px">👥 Usuários do Sistema (Mock)</div>
      <table class="data-table"><thead><tr><th>Avatar</th><th>Nome</th><th>Perfil</th></tr></thead><tbody>
        ${db.usuarios.map(u=>`<tr><td><div class="item-avatar" style="width:32px;height:32px;font-size:11px">${u.avatar}</div></td><td>${esc(u.nome)}</td><td><span class="badge badge-info">${esc(u.perfil)}</span></td></tr>`).join('')}
      </tbody></table>
    </div>`;
}

function trocarPerfil(p) {
  db.perfil = p;
  componentToast('info', `Perfil alterado para: ${p}`);
  renderSidebar();
  renderTopbar();
  renderView(parseRoute());
}

// ============================================================
// ROUTER — renderView
// ============================================================
function renderView(route) {
  const { parts } = route;
  const container = document.getElementById('view-container');
  let html = '';

  if(!parts.length || parts[0]==='home') {
    html = viewHome();
  } else if(parts[0]==='itens') {
    if(!parts[1]) {
      html = viewItens();
      setTimeout(()=>{
        renderItensTable();
        document.getElementById('itens-search')?.addEventListener('input', renderItensTable);
        document.getElementById('itens-status')?.addEventListener('change', renderItensTable);
        document.getElementById('itens-tipo')?.addEventListener('change', renderItensTable);
      },0);
    } else if(parts[1]==='novo') {
      html = viewItemForm(null);
      setTimeout(()=>bindItemForm(null),0);
    } else if(parts[2]==='editar') {
      html = viewItemForm(parts[1]);
      setTimeout(()=>bindItemForm(parts[1]),0);
    } else {
      html = viewItemDetalhe(parts[1]);
    }
  } else if(parts[0]==='requisicoes') {
    if(!parts[1]) {
      html = viewRequisicoes();
      setTimeout(()=>{
        renderRequisicoesTable();
        document.getElementById('req-search')?.addEventListener('input', renderRequisicoesTable);
        document.getElementById('req-status')?.addEventListener('change', renderRequisicoesTable);
      },0);
    } else if(parts[1]==='nova') {
      html = viewNovaRequisicao();
      setTimeout(()=>bindNovaRequisicao(),0);
    } else if(parts[2]==='aprovar') {
      html = viewAprovarRequisicao(parts[1]);
    } else if(parts[2]==='atender') {
      html = viewAtenderRequisicao(parts[1]);
    } else {
      html = viewRequisicaoDetalhe(parts[1]);
    }
  } else if(parts[0]==='compras') {
    if(!parts[1]) {
      html = viewCompras();
    } else if(parts[1]==='spot') {
      html = viewCompraSpot();
      setTimeout(()=>{
        renderSpotItensTable();
      },0);
    } else {
      html = viewCompraDetalhe(parts[1]);
    }
  } else if(parts[0]==='inventario') {
    html = viewInventario();
  } else if(parts[0]==='colaboradores') {
    if(!parts[1]) {
      html = viewColaboradores();
    } else if(parts[1]==='novo') {
      html = viewColaboradorForm(null);
      setTimeout(()=>bindColaboradorForm(null),0);
    } else if(parts[2]==='editar') {
      html = viewColaboradorForm(parts[1]);
      setTimeout(()=>bindColaboradorForm(parts[1]),0);
    } else {
      html = viewColaboradorDetalhe(parts[1]);
    }
  } else if(parts[0]==='relatorios') {
    html = viewRelatorios();
  } else if(parts[0]==='config') {
    html = viewConfig();
  } else {
    html = `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">Página não encontrada</div><div class="empty-sub">Rota: ${esc(route.full)}</div></div>`;
  }

  container.innerHTML = html;
  window.scrollTo(0,0);
  document.getElementById('main-content').scrollTo(0,0);
}

// ============================================================
// INIT
// ============================================================
function init() {
  renderTopbar();
  renderSidebar();

  document.getElementById('sidebar-overlay').addEventListener('click', closeMobileSidebar);

  window.addEventListener('hashchange', () => {
    renderSidebar();
    renderView(parseRoute());
  });

  renderView(parseRoute());

  window.toggleEstoqueFields = toggleEstoqueFields;
  window.autoCalcPonto = autoCalcPonto;
  window.checkReposicaoAutomatica = checkReposicaoAutomatica;
  window.navigateTo = navigateTo;
  window.gerarCompraFromItem = gerarCompraFromItem;
  window.aprovarRequisicao = aprovarRequisicao;
  window.reprovarRequisicao = reprovarRequisicao;
  window.confirmarRetirada = confirmarRetirada;
  window.aprovarCompra = aprovarCompra;
  window.receberCompra = receberCompra;
  window.confirmarEntregaSpot = confirmarEntregaSpot;
  window.addReqItem = addReqItem;
  window.removeReqItem = removeReqItem;
  window.submitRequisicao = submitRequisicao;
  window.addSpotItem = addSpotItem;
  window.removeSpotItem = removeSpotItem;
  window.submitCompraSpot = submitCompraSpot;
  window.saveInventario = saveInventario;
  window.trocarPerfil = trocarPerfil;
  window.showHelp = showHelp;
  window.showNotifications = showNotifications;
}

document.addEventListener('DOMContentLoaded', init);
