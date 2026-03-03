const db = {
  userProfile: 'Almoxarifado',
  users: [
    { id: 1, nome: 'Fernando Rabello', perfil: 'Admin' },
    { id: 2, nome: 'Ana Souza', perfil: 'Compras' },
    { id: 3, nome: 'Carlos Lima', perfil: 'Gestor' },
    { id: 4, nome: 'Dora Nunes', perfil: 'Diretoria' },
    { id: 5, nome: 'Paula Mendes', perfil: 'Solicitante' },
    { id: 6, nome: 'Rafael Costa', perfil: 'Almoxarifado' }
  ],
  fornecedores: ['Memory IT', 'LogiParts', 'EletroNorte', 'FixaTudo', 'HidroTech'],
  tipos: ['Ferramenta', 'EPI', 'Elétrico', 'Hidráulico', 'Consumível'],
  centrosCusto: ['Operações', 'Manutenção', 'Produção', 'Administrativo'],
  itens: [
    { id: 1, ncm: '8205.59.00', codigo: 'ITM-001', descricao: 'Chave combinada 13mm', fabricante: 'MetalSul', validade: '', status: 'Ativo', precoCusto: 22, quantidade: 5, minimo: 5, maximo: 20, obs: '', fornecedor: 'MetalSul', tipo: 'Ferramenta', precoMedio: 23 },
    { id: 2, ncm: '6506.10.00', codigo: 'ITM-002', descricao: 'Capacete EPI', fabricante: 'FixaTudo', validade: '2027-08-01', status: 'Ativo', precoCusto: 48, quantidade: 2, minimo: 4, maximo: 30, obs: 'Classe B', fornecedor: 'FixaTudo', tipo: 'EPI', precoMedio: 49 },
    { id: 3, ncm: '8536.50.90', codigo: 'ITM-003', descricao: 'Disjuntor 20A', fabricante: 'EletroNorte', validade: '', status: 'Ativo', precoCusto: 35, quantidade: 16, minimo: 6, maximo: 40, obs: '', fornecedor: 'EletroNorte', tipo: 'Elétrico', precoMedio: 34 },
    { id: 4, ncm: '8481.80.99', codigo: 'ITM-004', descricao: 'Válvula esfera 1"', fabricante: 'HidroTech', validade: '', status: 'Ativo', precoCusto: 60, quantidade: 12, minimo: 5, maximo: 25, obs: '', fornecedor: 'HidroTech', tipo: 'Hidráulico', precoMedio: 58 },
    { id: 5, ncm: '3917.39.00', codigo: 'ITM-005', descricao: 'Mangueira industrial', fabricante: 'HidroTech', validade: '', status: 'Ativo', precoCusto: 18, quantidade: 22, minimo: 8, maximo: 60, obs: '', fornecedor: 'HidroTech', tipo: 'Consumível', precoMedio: 17.5 },
    { id: 6, ncm: '6804.22.11', codigo: 'ITM-006', descricao: 'Disco de corte 7"', fabricante: 'MetalSul', validade: '', status: 'Ativo', precoCusto: 9, quantidade: 40, minimo: 15, maximo: 120, obs: '', fornecedor: 'MetalSul', tipo: 'Consumível', precoMedio: 8.7 },
    { id: 7, ncm: '4015.19.00', codigo: 'ITM-007', descricao: 'Luva nitrílica', fabricante: 'FixaTudo', validade: '2026-11-20', status: 'Ativo', precoCusto: 3.5, quantidade: 60, minimo: 20, maximo: 180, obs: '', fornecedor: 'FixaTudo', tipo: 'EPI', precoMedio: 3.7 },
    { id: 8, ncm: '7326.90.90', codigo: 'ITM-008', descricao: 'Abraçadeira metálica', fabricante: 'LogiParts', validade: '', status: 'Inativo', precoCusto: 1.2, quantidade: 10, minimo: 6, maximo: 80, obs: '', fornecedor: 'LogiParts', tipo: 'Consumível', precoMedio: 1.1 }
  ],
  requisicoes: [
    { id: 1, codigo: 'REQ-001', solicitante: 'Paula Mendes', centroCusto: 'Operações', setor: 'Linha A', prioridade: 'Alta', status: 'EmAprovacaoGestor', data: '2026-03-01', obs: 'Urgente', linhas: [{ itemId: 2, qtd: 2, qtdAtendida: 0 }, { itemId: 6, qtd: 10, qtdAtendida: 0 }] },
    { id: 2, codigo: 'REQ-002', solicitante: 'Carlos Lima', centroCusto: 'Manutenção', setor: 'Predial', prioridade: 'Média', status: 'EmAprovacaoDiretoria', data: '2026-03-02', obs: '', linhas: [{ itemId: 3, qtd: 5, qtdAtendida: 0 }] },
    { id: 3, codigo: 'REQ-003', solicitante: 'Ana Souza', centroCusto: 'Produção', setor: 'Embalagem', prioridade: 'Baixa', status: 'EmAprovacaoAlmoxarifado', data: '2026-03-02', obs: '', linhas: [{ itemId: 5, qtd: 4, qtdAtendida: 0 }] },
    { id: 4, codigo: 'REQ-004', solicitante: 'Fernando Rabello', centroCusto: 'Administrativo', setor: 'Compras', prioridade: 'Alta', status: 'Aprovada', data: '2026-02-26', obs: '', linhas: [{ itemId: 1, qtd: 2, qtdAtendida: 0 }] }
  ],
  compras: [
    { id: 1, codigo: 'CMP-001', origem: 'REQ-001', status: 'EmAprovacaoCompras', data: '2026-03-01', totalEstimado: 980, linhas: [{ itemId: 2, qtd: 20, preco: 48 }] },
    { id: 2, codigo: 'CMP-002', origem: 'Manual', status: 'Aprovada', data: '2026-02-25', totalEstimado: 450, linhas: [{ itemId: 6, qtd: 50, preco: 9 }] },
    { id: 3, codigo: 'CMP-003', origem: 'REQ-003', status: 'Recebida', data: '2026-02-10', totalEstimado: 140, linhas: [{ itemId: 5, qtd: 8, preco: 17.5 }] }
  ]
};

const routeMap = {
  '#/home': { label: 'Home', menu: 'home' },
  '#/itens': { label: 'Itens de Estoque', menu: 'itens' },
  '#/requisicoes': { label: 'Requisições de Retirada', menu: 'requisicoes' },
  '#/compras': { label: 'Solicitações de Compra', menu: 'compras' },
  '#/relatorios': { label: 'Relatórios', menu: 'relatorios' },
  '#/config': { label: 'Configurações', menu: 'config' }
};

function saveState() {
  localStorage.setItem('almoxState', JSON.stringify(db));
}

function loadState() {
  const state = localStorage.getItem('almoxState');
  if (state) Object.assign(db, JSON.parse(state));
}

function parseRoute() {
  const hash = window.location.hash || '#/home';
  const parts = hash.split('/').filter(Boolean);
  return { hash, parts };
}

function navigateTo(route) {
  window.location.hash = route;
}

function initials(text) {
  return text.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
}

function isCritical(item) {
  return item.quantidade <= item.minimo;
}

function canApproveReq(req) {
  const p = db.userProfile;
  return (req.status === 'EmAprovacaoGestor' && (p === 'Gestor' || p === 'Admin')) ||
    (req.status === 'EmAprovacaoDiretoria' && (p === 'Diretoria' || p === 'Admin')) ||
    (req.status === 'EmAprovacaoAlmoxarifado' && (p === 'Almoxarifado' || p === 'Admin'));
}

function renderTopbar() {
  const { hash } = parseRoute();
  const base = Object.keys(routeMap).find(r => hash.startsWith(r)) || '#/home';
  const crumb = routeMap[base]?.label || 'Detalhe';
  return `
    <header class="topbar">
      <button id="toggleSidebar" class="btn icon">☰</button>
      <div class="brand"><div class="brand-mark">ALM</div><h1>Almoxarifado</h1></div>
      <div class="breadcrumb"><span>Home</span><strong>›</strong><span>${crumb}</span></div>
      <div class="topbar-actions">
        <button class="btn ghost">❔ Ajuda</button>
        <button class="btn ghost">🔔 Notif.</button>
        <span class="user-pill">Fernando Rabello (${db.userProfile})</span>
      </div>
    </header>`;
}

function renderSidebar() {
  const { hash } = parseRoute();
  const critCount = db.itens.filter(isCritical).length;
  const items = [
    ['home', '#/home', '🏠', 'Home', ''],
    ['itens', '#/itens', '📦', 'Itens de Estoque', critCount ? `<span class="side-pill">${critCount}</span>` : ''],
    ['requisicoes', '#/requisicoes', '📋', 'Requisições', ''],
    ['compras', '#/compras', '🛒', 'Solicit. de Compra', ''],
    ['relatorios', '#/relatorios', '📊', 'Relatórios', ''],
    ['config', '#/config', '⚙️', 'Configurações', '']
  ];
  return `
    <aside id="sidebar" class="sidebar">
      <div class="nav-title">Navegação</div>
      ${items.map(([key, href, icon, label, extra]) => `<a class="side-link ${(hash.startsWith(href) || (href === '#/home' && hash === '#/')) ? 'active' : ''}" data-route="${href}" href="${href}"><span class="side-ico">${icon}</span>${label}${extra}</a>`).join('')}
      <div class="sidebar-footer">Perfil: <strong>${db.userProfile}</strong></div>
    </aside>`;
}

function componentToast(type, message) {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function componentModalConfirm(title, message, onConfirm, withInput = false) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal">
      <h3>${title}</h3><p>${message}</p>
      ${withInput ? '<textarea id="modalJust" rows="3" placeholder="Informe a justificativa"></textarea>' : ''}
      <div class="row end gap-sm">
        <button id="mcancel" class="btn ghost">Cancelar</button>
        <button id="mconfirm" class="btn primary">Confirmar</button>
      </div></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector('#mcancel').onclick = () => overlay.remove();
  overlay.querySelector('#mconfirm').onclick = () => {
    const value = withInput ? overlay.querySelector('#modalJust').value.trim() : undefined;
    onConfirm(value);
    overlay.remove();
  };
}

function componentBadge(status) {
  const tone = /Aprovada|Ativo|Recebida|AtendidaTotal/.test(status) ? 'success' : /Crítico|Reprovada|Inativo/.test(status) ? 'danger' : 'warn';
  return `<span class="badge ${tone}">${status}</span>`;
}

function componentStatCard(title, value, subtitle) {
  return `<article class="card stat-card"><div class="stat-title">${title}</div><div class="stat-value">${value}</div><div class="stat-sub">${subtitle}</div></article>`;
}

function componentTable(columns, rows, actions = []) {
  return `<div class="table-wrap"><table><thead><tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}${actions.length ? `<td>${actions.map(a => `<button class="btn xs" data-action="${a.action}" data-id="${a.id}">${a.label}</button>`).join('')}</td>` : ''}</tr>`).join('')}</tbody></table></div>`;
}

function componentForm(fields, initialValues, onSubmit) {
  const form = document.createElement('form');
  form.className = 'card form-grid';
  form.innerHTML = fields.map(f => {
    const val = initialValues[f.name] ?? '';
    if (f.type === 'textarea') return `<label>${f.label}<textarea name="${f.name}">${val}</textarea></label>`;
    if (f.type === 'select') return `<label>${f.label}<select name="${f.name}">${f.options.map(o => `<option ${o===val?'selected':''}>${o}</option>`).join('')}</select></label>`;
    return `<label>${f.label}<input type="${f.type || 'text'}" name="${f.name}" value="${val}" /></label>`;
  }).join('') + `<div class="row end"><button class="btn primary" type="submit">Salvar</button></div>`;
  form.onsubmit = (e) => {
    e.preventDefault();
    onSubmit(Object.fromEntries(new FormData(form).entries()));
  };
  return form;
}

function renderHome() {
  const crit = db.itens.filter(isCritical);
  const pend = db.requisicoes.filter(r => r.status.startsWith('EmAprovacao')).length;
  const abertas = db.compras.filter(c => c.status !== 'Recebida').length;
  return `<section class="page-head"><h2>Dashboard</h2><p>Visão geral do almoxarifado</p></section>
    <section class="grid-4">
      ${componentStatCard('Itens críticos', crit.length, 'Necessitam reposição')}
      ${componentStatCard('Requisições pendentes', pend, 'Aguardando aprovação')}
      ${componentStatCard('Compras em aberto', abertas, 'Fluxo de compras')}
      ${componentStatCard('Total de itens', db.itens.length, 'Cadastrados no sistema')}
    </section>
    <section class="split-2">
      <section class="card"><h3>⚠️ Alertas do Sistema</h3><ul class="alert-list">${crit.map(i=>`<li><strong>${i.codigo}</strong> — ${i.descricao}: estoque crítico (${i.quantidade}/${i.minimo})</li>`).join('') || '<li>Sem alertas críticos</li>'}</ul></section>
      <section class="card"><h3>🚀 Atalhos Rápidos</h3><div class="shortcuts"><button class="btn shortcut" data-route="#/itens/novo">+ Novo Item</button><button class="btn shortcut" data-route="#/requisicoes/nova">+ Nova Requisição</button><button class="btn shortcut" data-route="#/compras">Ver Compras</button><button class="btn shortcut" data-route="#/relatorios">Relatórios</button></div></section>
    </section>`;
}

function renderItensList() {
  const rows = db.itens.map(i => [i.codigo, i.descricao, i.fabricante, i.quantidade, i.minimo, i.maximo, componentBadge(isCritical(i) ? 'Crítico' : i.status), `<button class=\"btn xs\" data-route=\"#/itens/${i.id}\">Ver</button><button class=\"btn xs\" data-route=\"#/itens/${i.id}/editar\">Editar</button>`]);
  return `<section class=\"page-head row between\"><div><h2>📦 Itens de Estoque</h2><p>${db.itens.length} itens cadastrados</p></div><button class=\"btn primary\" data-route=\"#/itens/novo\">+ Novo Item</button></section>
  <section class=\"card row gap-sm\"><input id=\"itemSearch\" placeholder=\"Buscar descrição/código\"/><select id=\"itemStatus\"><option value=\"\">Status</option><option>Ativo</option><option>Inativo</option></select><select id=\"itemTipo\"><option value=\"\">Tipo</option>${db.tipos.map(t=>`<option>${t}</option>`).join('')}</select></section>
  <div class=\"table-wrap\"><table><thead><tr><th>Código</th><th>Descrição</th><th>Fabricante</th><th>Quantidade</th><th>Mínimo</th><th>Máximo</th><th>Status</th><th>Ações</th></tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderItemForm(id) {
  const item = db.itens.find(i => i.id === id) || { status: 'Ativo' };
  const container = document.createElement('section');
  container.innerHTML = `<h2>${id ? 'Editar Item' : 'Novo Item'}</h2><div class="card photo-mock">${initials(item.descricao || 'Novo Item')}</div>`;
  const fields = [
    { name: 'ncm', label: 'NCM' }, { name: 'codigo', label: 'Código' }, { name: 'descricao', label: 'Descrição' },
    { name: 'fabricante', label: 'Fabricante' }, { name: 'validade', label: 'Validade', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo'] },
    { name: 'precoCusto', label: 'Preço custo', type: 'number' }, { name: 'quantidade', label: 'Quantidade', type: 'number' },
    { name: 'minimo', label: 'Mínimo', type: 'number' }, { name: 'maximo', label: 'Máximo', type: 'number' },
    { name: 'obs', label: 'Observações', type: 'textarea' },
    { name: 'fornecedor', label: 'Fornecedor', type: 'select', options: db.fornecedores },
    { name: 'tipo', label: 'Tipo de produto', type: 'select', options: db.tipos },
    { name: 'precoMedio', label: 'Preço médio', type: 'number' }
  ];
  container.appendChild(componentForm(fields, item, (data) => {
    data.quantidade = Number(data.quantidade);
    data.minimo = Number(data.minimo);
    data.maximo = Number(data.maximo);
    data.precoCusto = Number(data.precoCusto);
    data.precoMedio = Number(data.precoMedio);
    if (data.minimo > data.maximo) return componentToast('error', 'Mínimo não pode ser maior que máximo.');
    if (data.quantidade < 0 || data.precoCusto < 0 || data.precoMedio < 0) return componentToast('error', 'Valores inválidos (negativos).');
    if (id) Object.assign(item, data);
    else db.itens.push({ ...data, id: Date.now() });
    saveState();
    componentToast('success', 'Item salvo com sucesso!');
    navigateTo('#/itens');
  }));
  return container;
}

function renderItemDetail(id) {
  const item = db.itens.find(i => i.id === id);
  if (!item) return '<p>Item não encontrado.</p>';
  return `<section class="card"><h2>${item.descricao}</h2><div class="photo-mock">${initials(item.descricao)}</div>
    <p><strong>Código:</strong> ${item.codigo}</p><p><strong>Fabricante:</strong> ${item.fabricante}</p>
    <p><strong>Quantidade:</strong> ${item.quantidade} / Min: ${item.minimo}</p>
    <p><strong>Status:</strong> ${componentBadge(isCritical(item) ? 'Crítico' : item.status)}</p>
    <div class="row gap-sm">
      <button class="btn" data-action="gerar-compra" data-id="${item.id}">Gerar Solicitação de Compra</button>
      <button class="btn" data-route="#/itens/${item.id}/editar">Editar</button>
      <button class="btn ghost" data-route="#/itens">Voltar</button>
    </div></section>`;
}

function renderRequisicoes() {
  const rows = db.requisicoes.map(r => [r.codigo, r.solicitante, r.centroCusto, componentBadge(r.status), r.data, `<button class="btn xs" data-route="#/requisicoes/${r.id}">Ver</button>${canApproveReq(r)?`<button class="btn xs" data-route="#/requisicoes/${r.id}/aprovar">Aprovar</button>`:''}<button class="btn xs" data-route="#/requisicoes/${r.id}/atender">Atender</button>`]);
  return `<section class="row between"><h2>Requisições de Retirada</h2><button class="btn primary" data-route="#/requisicoes/nova">Nova Requisição</button></section>
    <div class="table-wrap"><table><thead><tr><th>Código</th><th>Solicitante</th><th>Centro de custo</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead>
    <tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderReqNova() {
  const idTemp = Date.now();
  const state = { linhas: [] };
  const itensList = db.itens.map(i => `<option value="${i.id}">${i.codigo} - ${i.descricao}</option>`).join('');
  return `<section class="card"><h2>Nova Requisição</h2>
  <div class="form-grid">
    <label>Centro de custo<select id="reqCentro">${db.centrosCusto.map(c=>`<option>${c}</option>`)}</select></label>
    <label>Setor requisitante<select id="reqSetor"><option>Linha A</option><option>Predial</option><option>Compras</option><option>TI</option></select></label>
    <label>Prioridade<select id="reqPrioridade"><option>Baixa</option><option>Média</option><option>Alta</option></select></label>
    <label>Observação<textarea id="reqObs"></textarea></label>
  </div>
  <h3>Itens</h3><div class="row gap-sm"><input list="itensDatalist" id="reqItem" placeholder="Selecione item"><datalist id="itensDatalist">${itensList}</datalist><input type="number" id="reqQtd" placeholder="Qtd"><button class="btn" data-action="req-add-item">Adicionar</button></div>
  <div id="reqLinhas" class="table-wrap"></div>
  <button class="btn primary" data-action="req-submit" data-id="${idTemp}">Enviar para aprovação</button></section>`;
}

function renderReqAprovar(id) {
  const req = db.requisicoes.find(r => r.id === id);
  if (!req) return '<p>Requisição não encontrada.</p>';
  return `<section class="card"><h2>Aprovar ${req.codigo}</h2>
    <div class="timeline"><span class="${req.status==='EmAprovacaoGestor'?'active':''}">Gestor</span><span class="${req.status==='EmAprovacaoDiretoria'?'active':''}">Diretoria</span><span class="${req.status==='EmAprovacaoAlmoxarifado'?'active':''}">Almoxarifado</span></div>
    <div class="row gap-sm"><button class="btn primary" data-action="aprovar-req" data-id="${id}">Aprovar</button><button class="btn danger" data-action="reprovar-req" data-id="${id}">Reprovar</button></div>
  </section>`;
}

function renderReqAtender(id) {
  const req = db.requisicoes.find(r => r.id === id);
  if (!req) return '<p>Requisição não encontrada.</p>';
  const rows = req.linhas.map((l, idx) => {
    const item = db.itens.find(i => i.id === l.itemId);
    return `<tr><td>${item.codigo}</td><td>${item.descricao}</td><td>${l.qtd}</td><td>${item.quantidade}</td><td><input type="number" min="0" max="${item.quantidade}" data-atender-index="${idx}" value="${l.qtdAtendida||0}"></td></tr>`;
  }).join('');
  return `<section class="card"><h2>Atendimento ${req.codigo}</h2><table><thead><tr><th>Código</th><th>Descrição</th><th>Solicitada</th><th>Estoque</th><th>Qtd Atendida</th></tr></thead><tbody>${rows}</tbody></table>
  <button class="btn primary" data-action="confirmar-retirada" data-id="${id}">Confirmar Retirada</button></section>`;
}

function renderCompras() {
  const rows = db.compras.map(c => `<tr><td>${c.codigo}</td><td>${c.origem}</td><td>${componentBadge(c.status)}</td><td>${c.data}</td><td>R$ ${c.totalEstimado.toFixed(2)}</td><td><button class="btn xs" data-route="#/compras/${c.id}">Ver</button></td></tr>`).join('');
  return `<section><h2>Solicitações de Compra</h2><div class="table-wrap"><table><thead><tr><th>Código</th><th>Origem</th><th>Status</th><th>Data</th><th>Total Estimado</th><th>Ações</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}

function renderCompraDetalhe(id) {
  const c = db.compras.find(i => i.id === id);
  if (!c) return '<p>Compra não encontrada.</p>';
  const linhas = c.linhas.map(l => { const item = db.itens.find(i => i.id === l.itemId); return `<tr><td>${item.codigo}</td><td>${item.descricao}</td><td>${l.qtd}</td><td>R$ ${l.preco.toFixed(2)}</td></tr>`; }).join('');
  return `<section class="card"><h2>${c.codigo}</h2><p>Status: ${componentBadge(c.status)}</p>
  <table><thead><tr><th>Item</th><th>Descrição</th><th>Qtd</th><th>Preço</th></tr></thead><tbody>${linhas}</tbody></table>
  <div class="row gap-sm"><button class="btn" data-action="aprovar-compra" data-id="${id}">Aprovar Compras</button><button class="btn primary" data-action="receber-compra" data-id="${id}">Marcar como Recebido</button></div></section>`;
}

function renderRelatorios() {
  const crit = db.itens.filter(isCritical).length;
  const abertas = db.compras.filter(c => c.status !== 'Recebida').length;
  const byStatus = Object.groupBy(db.requisicoes, r => r.status);
  const bars = Object.entries(byStatus).map(([k,v]) => `<div class="bar-row"><span>${k}</span><div class="bar" style="--w:${v.length*30}px"></div><strong>${v.length}</strong></div>`).join('');
  const rows = Object.entries(byStatus).map(([k,v]) => `<tr><td>${k}</td><td>${v.length}</td></tr>`).join('');
  return `<section class="grid-3">${componentStatCard('Itens críticos', crit, 'Monitoramento')}${componentStatCard('Compras em aberto', abertas, 'Pendências')}${componentStatCard('Requisições', db.requisicoes.length, 'Total')}</section>
  <section class="card"><h3>Requisições por status</h3>${bars}</section>
  <section class="card"><table><thead><tr><th>Status</th><th>Qtd</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function renderConfig() {
  return `<section class="card"><h2>Configurações</h2><label>Perfil atual<select id="perfilAtual">${['Admin','Almoxarifado','Compras','Solicitante','Gestor','Diretoria'].map(p=>`<option ${p===db.userProfile?'selected':''}>${p}</option>`)}</select></label></section>`;
}

function renderView() {
  const { hash, parts } = parseRoute();
  if (!window.location.hash) navigateTo('#/home');
  if (hash === '#/home') return renderHome();
  if (hash === '#/itens') return renderItensList();
  if (hash === '#/itens/novo') return renderItemForm();
  if (/^#\/itens\/\d+\/editar$/.test(hash)) return renderItemForm(Number(parts[1]));
  if (/^#\/itens\/\d+$/.test(hash)) return renderItemDetail(Number(parts[1]));
  if (hash === '#/requisicoes') return renderRequisicoes();
  if (hash === '#/requisicoes/nova') return renderReqNova();
  if (/^#\/requisicoes\/\d+\/aprovar$/.test(hash)) return renderReqAprovar(Number(parts[1]));
  if (/^#\/requisicoes\/\d+\/atender$/.test(hash)) return renderReqAtender(Number(parts[1]));
  if (hash.startsWith('#/requisicoes/')) return '<section class="card">Detalhe simples da requisição. Use ações da lista.</section>';
  if (hash === '#/compras') return renderCompras();
  if (/^#\/compras\/\d+$/.test(hash)) return renderCompraDetalhe(Number(parts[1]));
  if (hash === '#/relatorios') return renderRelatorios();
  if (hash === '#/config') return renderConfig();
  return '<p>Rota não encontrada.</p>';
}

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `${renderTopbar()}${renderSidebar()}<main class="content"><div class="view-shell" id="content"></div></main><footer class="footer">Portal Almoxarifado - Mock offline</footer>`;
  const view = renderView();
  const content = document.getElementById('content');
  if (typeof view === 'string') content.innerHTML = view;
  else { content.innerHTML = ''; content.appendChild(view); }
}

function setupEvents() {
  document.body.addEventListener('click', (e) => {
    const route = e.target.dataset.route;
    if (route) {
      e.preventDefault();
      navigateTo(route);
    }
    if (e.target.id === 'toggleSidebar') document.getElementById('sidebar')?.classList.toggle('open');

    if (e.target.dataset.action === 'gerar-compra') {
      const id = Number(e.target.dataset.id);
      const existing = db.compras.find(c => c.status !== 'Recebida' && c.linhas.some(l => l.itemId === id));
      if (existing) return componentToast('warn', 'Já existe compra aberta para este item.');
      componentModalConfirm('Nova compra', 'Deseja gerar solicitação de compra para este item?', () => {
        const item = db.itens.find(i => i.id === id);
        db.compras.push({ id: Date.now(), codigo: `CMP-${String(db.compras.length+1).padStart(3,'0')}`, origem: item.codigo, status: 'EmAprovacaoCompras', data: new Date().toISOString().slice(0,10), totalEstimado: item.precoMedio * (item.maximo - item.quantidade), linhas: [{ itemId: id, qtd: Math.max(item.maximo-item.quantidade,1), preco: item.precoMedio }] });
        saveState();
        componentToast('success', 'Solicitação de compra criada.');
      });
    }

    if (e.target.dataset.action === 'aprovar-req') {
      const req = db.requisicoes.find(r => r.id === Number(e.target.dataset.id));
      const next = { EmAprovacaoGestor: 'EmAprovacaoDiretoria', EmAprovacaoDiretoria: 'EmAprovacaoAlmoxarifado', EmAprovacaoAlmoxarifado: 'Aprovada' };
      req.status = next[req.status] || req.status;
      saveState(); componentToast('success', 'Requisição avançou no fluxo.'); renderApp();
    }

    if (e.target.dataset.action === 'reprovar-req') {
      const req = db.requisicoes.find(r => r.id === Number(e.target.dataset.id));
      componentModalConfirm('Reprovar', 'Informe justificativa:', (just) => { req.status = 'Reprovada'; req.obs = `Reprovação: ${just || 'Sem justificativa'}`; saveState(); componentToast('warn', 'Requisição reprovada.'); renderApp(); }, true);
    }

    if (e.target.dataset.action === 'confirmar-retirada') {
      const req = db.requisicoes.find(r => r.id === Number(e.target.dataset.id));
      const inputs = [...document.querySelectorAll('[data-atender-index]')];
      let total = 0;
      inputs.forEach((inp) => {
        const idx = Number(inp.dataset.atenderIndex);
        const qtd = Number(inp.value || 0);
        req.linhas[idx].qtdAtendida = qtd;
        const item = db.itens.find(i => i.id === req.linhas[idx].itemId);
        item.quantidade = Math.max(item.quantidade - qtd, 0);
        total += qtd;
        if (item.quantidade <= item.minimo) componentToast('warn', `${item.codigo} em nível mínimo. Considere abrir compra.`);
      });
      const requested = req.linhas.reduce((a,b)=>a+b.qtd,0);
      req.status = total >= requested ? 'AtendidaTotal' : 'AtendidaParcial';
      saveState(); componentToast('success', 'Retirada confirmada e estoque atualizado.'); navigateTo('#/requisicoes');
    }

    if (e.target.dataset.action === 'aprovar-compra') {
      const c = db.compras.find(x => x.id === Number(e.target.dataset.id));
      if (c.status === 'EmAprovacaoCompras') c.status = 'Aprovada';
      saveState(); componentToast('success', 'Compra aprovada.'); renderApp();
    }

    if (e.target.dataset.action === 'receber-compra') {
      const c = db.compras.find(x => x.id === Number(e.target.dataset.id));
      c.linhas.forEach(l => {
        const item = db.itens.find(i => i.id === l.itemId);
        item.quantidade += l.qtd;
      });
      c.status = 'Recebida'; saveState(); componentToast('success', 'Compra recebida e estoque atualizado.'); renderApp();
    }

    if (e.target.dataset.action === 'req-add-item') {
      componentToast('warn', 'Protótipo: adição de linhas simplificada nesta versão.');
    }

    if (e.target.dataset.action === 'req-submit') {
      const centro = document.getElementById('reqCentro').value;
      const setor = document.getElementById('reqSetor').value;
      const prioridade = document.getElementById('reqPrioridade').value;
      const obs = document.getElementById('reqObs').value;
      const itemRaw = document.getElementById('reqItem').value;
      const itemId = Number(itemRaw.split(' - ')[0]);
      const qtd = Number(document.getElementById('reqQtd').value || 0);
      const linhas = itemId && qtd > 0 ? [{ itemId, qtd, qtdAtendida: 0 }] : [];
      db.requisicoes.push({ id: Date.now(), codigo: `REQ-${String(db.requisicoes.length+1).padStart(3,'0')}`, solicitante: 'Fernando Rabello', centroCusto: centro, setor, prioridade, status: 'EmAprovacaoGestor', data: new Date().toISOString().slice(0,10), obs, linhas });
      saveState(); componentToast('success', 'Requisição enviada para aprovação.'); navigateTo('#/requisicoes');
    }
  });

  document.body.addEventListener('change', (e) => {
    if (e.target.id === 'perfilAtual') {
      db.userProfile = e.target.value;
      saveState();
      componentToast('success', `Perfil alterado para ${db.userProfile}`);
      renderApp();
    }
    if (['itemSearch', 'itemStatus', 'itemTipo'].includes(e.target.id)) {
      const search = document.getElementById('itemSearch').value.toLowerCase();
      const status = document.getElementById('itemStatus').value;
      const tipo = document.getElementById('itemTipo').value;
      const rows = db.itens.filter(i => (!search || i.descricao.toLowerCase().includes(search) || i.codigo.toLowerCase().includes(search)) && (!status || i.status===status) && (!tipo || i.tipo===tipo))
        .map(i => `<tr><td>${i.codigo}</td><td>${i.descricao}</td><td>${i.fabricante}</td><td>${i.quantidade}</td><td>${i.minimo}</td><td>${i.maximo}</td><td>${componentBadge(isCritical(i)?'Crítico':i.status)}</td><td><button class="btn xs" data-route="#/itens/${i.id}">Ver</button><button class="btn xs" data-route="#/itens/${i.id}/editar">Editar</button></td></tr>`).join('');
      document.querySelector('.table-wrap tbody').innerHTML = rows;
    }
  });

  window.addEventListener('hashchange', renderApp);
}

loadState();
setupEvents();
renderApp();
