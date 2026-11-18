/* =========================================================
   agentes.js — interações da página Agentes-IA
   · trilhos DT × DDD (seis etapas sincronizadas)
   · anatomia de documentos: contrato, memorando, SLA
========================================================= */

(() => {

  /* ---------- Trilhos DT × DDD ---------- */

  const stages = [
    {
      dt: ['Imersão', 'Observar o processo com quem executa. Ouvir antes de automatizar.'],
      ddd: ['Linguagem ubíqua', 'Glossário único do domínio: os termos que a operação realmente usa viram os termos do agente.'],
      out: ['Mapa do problema', 'Problema real descrito na língua do negócio, com dores, exceções e responsáveis.']
    },
    {
      dt: ['Análise e síntese', 'Agrupar o que foi observado e decidir o que importa.'],
      ddd: ['Contextos delimitados', 'Separar domínios (comercial, produção, administrativo) e definir onde cada agente atua e onde não atua.'],
      out: ['Escopo do agente', 'Fronteira clara: o que o agente lê, o que propõe e o que nunca faz.']
    },
    {
      dt: ['Ideação', 'Gerar alternativas de solução com as áreas envolvidas.'],
      ddd: ['Agregados e regras', 'Modelar entidades, invariantes e regras de negócio que o agente precisa respeitar.'],
      out: ['Regras de negócio', 'Regras explícitas e verificáveis, escritas antes do prompt.']
    },
    {
      dt: ['Prototipação', 'Construir rápido, pequeno e testável.'],
      ddd: ['Contratos e eventos', 'Contratos de dados de entrada e saída e eventos de domínio que registram cada fato.'],
      out: ['Agente piloto', 'Prompt de sistema versionado, com entradas e saídas padronizadas.']
    },
    {
      dt: ['Teste', 'Validar com usuários reais e casos de borda.'],
      ddd: ['Homologação por evidência', 'Critérios de aceite por gate. Homologa quem não executou a entrega.'],
      out: ['Agente homologado', 'Evidência registrada, versão congelada e responsável nomeado.']
    },
    {
      dt: ['Operação', 'Acompanhar, aprender e ajustar.'],
      ddd: ['Governança contínua', 'Cadastro, menor privilégio e rastreabilidade de cada execução.'],
      out: ['Agente em operação', 'Ferramenta de apoio à decisão, nunca o decisor final.']
    }
  ];

  const nav = Array.from(document.querySelectorAll('.rails-nav button'));
  const rails = document.querySelector('.rails');

  const fill = (i) => {
    const s = stages[i];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('dt-title', s.dt[0]);  set('dt-text', s.dt[1]);
    set('ddd-title', s.ddd[0]); set('ddd-text', s.ddd[1]);
    set('out-title', s.out[0]); set('out-text', s.out[1]);
  };

  const select = (i) => {
    nav.forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
    if (!rails) return fill(i);
    rails.classList.add('is-swapping');
    setTimeout(() => {
      fill(i);
      rails.classList.remove('is-swapping');
    }, 220);
  };

  nav.forEach((btn, i) => btn.addEventListener('click', () => select(i)));
  if (nav.length) fill(0);

  /* ---------- Anatomia de documentos ---------- */

  const docs = {
    contrato: {
      title: 'Contrato de prestação de serviços',
      text: 'Define quem entrega o quê, em que condições e com quais garantias para as duas partes.',
      clauses: [
        'Partes, objeto e escopo do serviço',
        'Obrigações de cada parte',
        'Prazos, marcos e critérios de aceite',
        'Remuneração, condições de pagamento e reajuste',
        'Confidencialidade, propriedade intelectual e tratamento de dados',
        'Vigência, rescisão e penalidades',
        'Foro e disposições gerais'
      ]
    },
    memorando: {
      title: 'Memorando de entendimento',
      text: 'Registra intenções e compromissos entre partes ou áreas antes de um contrato definitivo.',
      clauses: [
        'Contexto e objetivo comum',
        'Escopo do entendimento e o que fica de fora',
        'Responsabilidades de cada parte',
        'Cronograma e próximos passos',
        'Caráter vinculante ou não vinculante',
        'Pontos de contato e forma de comunicação'
      ]
    },
    sla: {
      title: 'Termo de nível de serviço (SLA)',
      text: 'Transforma expectativa em indicador: o que é medido, qual meta vale e o que acontece quando ela não é cumprida.',
      clauses: [
        'Descrição do serviço e horário de atendimento',
        'Indicadores medidos (disponibilidade, tempo de resposta, tempo de solução)',
        'Metas por indicador e forma de medição',
        'Classificação de prioridade e fluxo de escalonamento',
        'Responsabilidades do fornecedor e do cliente',
        'Relatórios, revisões periódicas e penalidades ou créditos'
      ]
    }
  };

  const docButtons = Array.from(document.querySelectorAll('.doc-switch button'));
  const docTitle = document.getElementById('doc-title');
  const docText = document.getElementById('doc-text');
  const docList = document.getElementById('doc-list');

  const showDoc = (btn) => {
    const d = docs[btn.dataset.doc];
    if (!d) return;
    docButtons.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    docTitle.textContent = d.title;
    docText.textContent = d.text;
    docList.innerHTML = '';
    d.clauses.forEach((c) => {
      const li = document.createElement('li');
      li.textContent = c;
      docList.appendChild(li);
    });
  };

  docButtons.forEach((b) => b.addEventListener('click', () => showDoc(b)));
  if (docButtons[0]) showDoc(docButtons[0]);

})();
