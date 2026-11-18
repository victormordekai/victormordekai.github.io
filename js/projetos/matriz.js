/* =========================================================
   matriz.js — demonstração simplificada da Matriz de Aderência
   Cruza o texto de uma vaga com o banco de termos que têm
   lastro real no perfil e com lacunas conhecidas.
   A análise completa (12 módulos) é feita pelo prompt;
   esta demonstração roda só no navegador, sem enviar dados.
========================================================= */

(() => {

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* Termos com lastro no perfil: [rótulo, variações] */
  const bank = [
    ['PCP', ['pcp', 'planejamento e controle da producao']],
    ['Capacidade produtiva', ['capacidade produtiva', 'capacidade de producao']],
    ['Lean', ['lean', 'kaizen', 'melhoria continua']],
    ['Indicadores / KPIs', ['kpi', 'indicador']],
    ['Gestão de equipes', ['gestao de equipe', 'gestao de pessoas', 'lideranca', 'liderar']],
    ['Conflitos', ['conflito']],
    ['Recrutamento', ['recrutamento', 'selecao', 'contratac']],
    ['Confecção / vestuário', ['confeccao', 'vestuario', 'textil', 'moda']],
    ['Modelagem', ['modelagem']],
    ['Corte e costura', ['corte', 'costura', 'acabamento']],
    ['Expedição / logística', ['expedicao', 'logistica', 'estoque']],
    ['ERP', ['erp']],
    ['CRM', ['crm']],
    ['Excel', ['excel', 'planilha', 'vba']],
    ['Power BI', ['power bi', 'bi ']],
    ['Python', ['python']],
    ['Java', ['java ', 'java,', 'java.']],
    ['HTML / CSS', ['html', 'css']],
    ['Governança', ['governanca', 'compliance']],
    ['Rastreabilidade', ['rastreabilidade', 'rastreavel']],
    ['Processos', ['processo', 'padronizacao', 'mapeamento']],
    ['Design Thinking', ['design thinking']],
    ['Desenvolvimento de produto', ['desenvolvimento de produto', 'produto']],
    ['Planejamento estratégico', ['okr', 'swot', 'canvas', 'planejamento estrategico', 'estrategia']],
    ['Ágil', ['scrum', 'kanban', 'agil']],
    ['IA / prompt', ['inteligencia artificial', ' ia ', 'prompt', 'agente']],
    ['Automação', ['automacao', 'automatizar']],
    ['Negociação', ['negociacao', 'fornecedor']],
    ['Contratos / SLA', ['contrato', 'sla', 'nivel de servico', 'memorando']],
    ['Integração de sistemas', ['integracao', 'api']]
  ];

  /* Lacunas conhecidas (sem lastro no perfil) */
  const gaps = [
    ['SQL', ['sql']],
    ['Oracle', ['oracle']],
    ['SAP', ['sap ']],
    ['ERP Senior', ['erp senior', 'senior sistemas']],
    ['TOTVS', ['totvs', 'protheus']],
    ['Redes', ['redes', 'rede de computadores']],
    ['Infraestrutura / cloud', ['infraestrutura', 'cloud', 'nuvem', 'servidor']],
    ['LGPD', ['lgpd']],
    ['ISO', ['iso 9001', 'iso 27001', 'iso ']],
    ['Six Sigma', ['six sigma', 'green belt', 'black belt']],
    ['Inglês fluente', ['ingles fluente', 'ingles avancado']],
    ['CNH B', ['cnh b', 'cnh categoria b', 'habilitacao b']]
  ];

  const mandatory = /(obrigatori|mandatori|imprescindivel|indispensavel|eliminatori)/;

  const find = (text, list) =>
    list.filter(([, variants]) => variants.some((v) => text.includes(v))).map(([label]) => label);

  /* ---------- Elementos ---------- */

  const input = document.getElementById('mx-text');
  const runBtn = document.getElementById('mx-run');
  const sampleBtn = document.getElementById('mx-sample');
  const needle = document.getElementById('dial-needle');
  const value = document.getElementById('dial-value');
  const verdict = document.getElementById('mx-verdict');
  const okList = document.getElementById('mx-ok');
  const gapList = document.getElementById('mx-gap');
  const alertBox = document.getElementById('mx-alert');

  const fillChips = (el, items, empty) => {
    el.innerHTML = '';
    if (!items.length) {
      const s = document.createElement('span');
      s.className = 'empty';
      s.textContent = empty;
      el.appendChild(s);
      return;
    }
    items.forEach((t) => {
      const s = document.createElement('span');
      s.textContent = t;
      el.appendChild(s);
    });
  };

  const setDial = (pct) => {
    const angle = -90 + (pct / 100) * 180;
    needle.style.transform = `rotate(${angle}deg)`;
    value.textContent = `${pct}%`;
  };

  const analyze = () => {

    const text = ` ${norm(input.value)} `;

    if (text.trim().length < 40) {
      verdict.innerHTML = 'Cole a descrição completa da vaga.';
      setDial(0);
      fillChips(okList, [], '—');
      fillChips(gapList, [], '—');
      alertBox.hidden = true;
      return;
    }

    const ok = find(text, bank);
    const missing = find(text, gaps);
    const total = ok.length + missing.length;
    const pct = total ? Math.round((ok.length / total) * 100) : 0;

    const hasMandatoryGap = missing.length > 0 && mandatory.test(text);
    const level = hasMandatoryGap ? 'baixa' : pct >= 70 ? 'alta' : pct >= 40 ? 'media' : 'baixa';
    const label = { alta: 'Alta', media: 'Média', baixa: 'Baixa' }[level];

    setDial(pct);
    verdict.innerHTML = `Aderência estimada <b data-level="${level}">${label}</b>`;
    fillChips(okList, ok, 'nenhum termo reconhecido');
    fillChips(gapList, missing, 'nenhuma lacuna conhecida');

    alertBox.hidden = !hasMandatoryGap;
    if (hasMandatoryGap) {
      alertBox.textContent = `A vaga usa linguagem de requisito obrigatório e menciona: ${missing.join(', ')}. Pode ser critério eliminatório: validar antes de investir na candidatura.`;
    }
  };

  const sample = `Gerente de Produção para confecção em expansão, que está internalizando a produção.
Responsabilidades: liderar a equipe de produção, planejar o cronograma, coordenar modelagem, corte, costura, acabamento, qualidade e expedição, e estruturar a área de produção.
Requisitos: experiência em gestão de produção em confecção, vivência com PCP, conhecimento da indústria de vestuário, gestão de equipes e resolução de conflitos. Ensino superior.`;

  if (runBtn) runBtn.addEventListener('click', analyze);
  if (sampleBtn) sampleBtn.addEventListener('click', () => {
    input.value = sample;
    analyze();
  });

  setDial(0);

})();
