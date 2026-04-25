/* =====================================================
   Passos Verdes — script.js
   Vanilla JS: questionnaire gating, header scroll,
   smooth scroll, year, FAQ already native via <details>.
   ===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'passos-verdes:onboarding-v1';

  // ---------------- Steps definition ----------------
  const steps = [
    {
      kind: 'intro',
      icon: '❤️',
      eyebrow: 'Antes de começar',
      title: 'Por que esse questionário existe?',
      lead:
        'Antes de te mostrar a Passos Verdes, queremos entender você. Sua rotina, seu corpo, seu momento. É assim que a gente monta um plano que cabe na sua vida — e não um treino genérico que você vai abandonar em duas semanas.',
      bullets: [
        { title: 'Movimentar o corpo é remédio', body: 'Pessoas sedentárias têm até 30% mais risco de doenças cardíacas, diabetes e ansiedade. Trinta minutos por dia já mudam essa estatística.' },
        { title: 'Correr é o atalho mais barato', body: 'Sem mensalidade de academia, sem equipamento caro. Um par de tênis, a rua e um plano que respeita o seu ritmo.' },
        { title: 'Esse plano é seu, ninguém mais', body: 'Suas respostas aqui viram um treino adaptado para o seu corpo, seu tempo livre e seu objetivo real.' }
      ],
    },
    {
      kind: 'choice',
      icon: '🏃',
      eyebrow: 'Pergunta 1 de 5',
      title: 'Como está seu corpo hoje?',
      lead: 'Seja honesto. Não tem certo ou errado — tem ponto de partida.',
      field: 'activityLevel',
      options: [
        { value: 'sedentary', label: 'Sedentário(a) total', desc: 'Faz meses ou anos sem treinar. Subir escada já cansa.' },
        { value: 'occasional', label: 'Me mexo de vez em quando', desc: 'Caminho às vezes, mas sem rotina. Começo e paro o tempo todo.' },
        { value: 'regular', label: 'Treino 1-2 vezes por semana', desc: 'Já tenho alguma constância, mas quero evoluir de verdade.' },
        { value: 'active', label: 'Já corro com regularidade', desc: 'Corro 3+ vezes por semana e quero melhorar meu pace ou distância.' }
      ],
    },
    {
      kind: 'choice',
      icon: '⏰',
      eyebrow: 'Pergunta 2 de 5',
      title: 'Quanto tempo você consegue dedicar por semana?',
      lead: 'Pode parecer pouco, mas 90 minutos bem usados já transformam um corpo em 8 semanas.',
      field: 'timeAvailable',
      options: [
        { value: 'lt2', label: 'Menos de 2 horas', desc: 'Tenho a rotina apertada — preciso de um plano enxuto.' },
        { value: '2to4', label: '2 a 4 horas', desc: 'Consigo encaixar 3 treinos curtos na semana.' },
        { value: '4to6', label: '4 a 6 horas', desc: 'Treinar é prioridade. Posso somar treinos longos.' },
        { value: '6plus', label: 'Mais de 6 horas', desc: 'Quero performance — tempo não é o meu limitador.' }
      ],
    },
    {
      kind: 'choice',
      icon: '🎯',
      eyebrow: 'Pergunta 3 de 5',
      title: 'Qual é o seu objetivo principal agora?',
      field: 'goal',
      options: [
        { value: 'first_5k', label: 'Sair do zero e correr meus primeiros 5km', desc: 'Plano de 8 semanas com caminhada + corrida progressiva.' },
        { value: 'weight_loss', label: 'Emagrecer correndo, sem sofrer', desc: 'Foco em queima calórica gradual e constância de longo prazo.' },
        { value: 'conditioning', label: 'Ganhar fôlego e disposição no dia a dia', desc: 'Subir escada sem ofegar, dormir melhor, render mais.' },
        { value: '10k_pace', label: 'Evoluir para 10km e baixar meu pace', desc: 'Treinos intervalados, longão e plano de progressão.' },
        { value: 'race', label: 'Me preparar para uma prova oficial', desc: 'Periodização específica para sua data e distância.' }
      ],
    },
    {
      kind: 'choice',
      icon: '🛡️',
      eyebrow: 'Pergunta 4 de 5',
      title: 'O que mais te impede de começar (ou continuar)?',
      lead: 'A gente já viu isso mil vezes. Saber qual é o seu freio nos ajuda a destravar.',
      field: 'obstacle',
      options: [
        { value: 'motivation', label: 'Falta de constância e motivação', desc: 'Começo animado e largo na terceira semana.' },
        { value: 'knowledge', label: 'Não sei por onde começar', desc: 'Tenho medo de fazer errado, me machucar ou exagerar.' },
        { value: 'injury', label: 'Tenho ou já tive alguma lesão', desc: 'Joelho, tornozelo, coluna. Preciso de cuidado extra.' },
        { value: 'time', label: 'Acho que não tenho tempo', desc: 'Trabalho, filhos, casa. O dia some.' },
        { value: 'shame', label: 'Tenho vergonha de começar', desc: 'Acho que estou fora de forma demais para correr na rua.' }
      ],
    },
    {
      kind: 'form',
      icon: '✨',
      eyebrow: 'Pergunta 5 de 5',
      title: 'Para onde mandamos o seu plano?',
      lead: 'Um treinador da Passos Verdes vai analisar suas respostas e te chamar no WhatsApp em até 24 horas, com o plano ideal para o seu momento.'
    }
  ];

  const TOTAL = steps.length;
  const initialAnswers = {
    name: '', whatsapp: '', age: '',
    activityLevel: '', timeAvailable: '', goal: '', obstacle: ''
  };

  let stepIdx = 0;
  let answers = Object.assign({}, initialAnswers);
  let submitting = false;

  // ---------------- Storage helpers ----------------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { answers: Object.assign({}, initialAnswers), done: false };
      const parsed = JSON.parse(raw);
      return {
        answers: Object.assign({}, initialAnswers, parsed.answers || {}),
        done: !!parsed.done
      };
    } catch (e) {
      return { answers: Object.assign({}, initialAnswers), done: false };
    }
  }

  function saveState(done) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: answers,
        done: !!done,
        completedAt: done ? Date.now() : null
      }));
    } catch (e) { /* ignore */ }
  }

  // ---------------- Init ----------------
  function init() {
    const state = loadState();
    answers = state.answers;

    if (state.done) {
      unlockSite();
    } else {
      document.body.style.overflow = 'hidden';
      renderStep();
    }

    setupSiteHeader();
    setupYear();
  }

  function unlockSite() {
    const q = document.getElementById('questionnaire');
    const site = document.getElementById('site');
    if (q) q.classList.add('hidden');
    if (site) site.classList.remove('hidden');
    document.body.style.overflow = '';
    personalize();
  }

  function personalize() {
    const first = (answers.name || '').trim().split(' ')[0];
    if (!first) return;
    const heading = document.getElementById('ns-heading');
    const body = document.getElementById('ns-body');
    if (heading) heading.textContent = first + ', suas respostas estão salvas.';
    if (body) body.textContent = first + ', seu plano está sendo montado pelo nosso time. Enquanto isso, escolha o nível de acompanhamento que combina com você — é o próximo passo pra começar de verdade.';
  }

  // ---------------- Render ----------------
  function setProgress() {
    const pct = Math.round(((stepIdx + 1) / TOTAL) * 100);
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    if (bar) bar.style.width = pct + '%';
    if (text) text.textContent = pct + '%';
  }

  function renderStep() {
    setProgress();
    const step = steps[stepIdx];
    const card = document.getElementById('q-card');
    if (!card) return;

    let body = '';
    if (step.kind === 'intro') {
      body = '<div class="q-bullets">' + step.bullets.map(function (b) {
        return '<div class="q-bullet"><h4>' + escapeHTML(b.title) + '</h4><p>' + escapeHTML(b.body) + '</p></div>';
      }).join('') + '</div>';
    } else if (step.kind === 'choice') {
      body = '<div class="q-options">' + step.options.map(function (opt) {
        const sel = answers[step.field] === opt.value ? ' selected' : '';
        return '<button type="button" class="q-option' + sel + '" data-value="' + opt.value + '">' +
          '<span class="q-radio">' + (sel ? '✓' : '') + '</span>' +
          '<span><span class="q-option-label">' + escapeHTML(opt.label) + '</span>' +
          (opt.desc ? '<span class="q-option-desc">' + escapeHTML(opt.desc) + '</span>' : '') +
          '</span></button>';
      }).join('') + '</div>';
    } else if (step.kind === 'form') {
      body =
        '<div class="q-form">' +
          '<div class="q-field"><label for="qf-name">Seu nome</label><input id="qf-name" type="text" placeholder="Como podemos te chamar?" value="' + escapeAttr(answers.name) + '" autofocus></div>' +
          '<div class="q-form-row">' +
            '<div class="q-field"><label for="qf-wa">WhatsApp</label><input id="qf-wa" type="tel" placeholder="(DDD) 90000-0000" value="' + escapeAttr(answers.whatsapp) + '"></div>' +
            '<div class="q-field"><label for="qf-age">Idade</label><input id="qf-age" type="number" inputmode="numeric" placeholder="Ex: 34" value="' + escapeAttr(answers.age) + '"></div>' +
          '</div>' +
          '<p class="q-form-note">Seus dados são usados apenas para montar o seu plano. Não enviamos spam, não compartilhamos com terceiros.</p>' +
        '</div>';
    }

    const isLast = stepIdx === TOTAL - 1;
    const nextLabel = isLast ? 'Receber meu plano →' : (step.kind === 'intro' ? 'Vamos começar →' : 'Continuar →');

    card.innerHTML =
      '<div class="q-eyebrow"><span class="q-eyebrow-icon">' + step.icon + '</span><span class="q-eyebrow-text">' + escapeHTML(step.eyebrow) + '</span></div>' +
      '<h2 class="q-title">' + escapeHTML(step.title) + '</h2>' +
      (step.lead ? '<p class="q-lead">' + escapeHTML(step.lead) + '</p>' : '') +
      body +
      '<div class="q-actions">' +
        '<button type="button" class="btn btn-ghost" id="q-back"' + (stepIdx === 0 ? ' disabled' : '') + '>← Voltar</button>' +
        '<button type="button" class="btn btn-primary" id="q-next">' + nextLabel + '</button>' +
      '</div>';

    bindStep();
  }

  function bindStep() {
    const back = document.getElementById('q-back');
    const next = document.getElementById('q-next');
    const step = steps[stepIdx];

    if (back) back.addEventListener('click', function () {
      if (stepIdx > 0) { stepIdx--; renderStep(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });

    if (next) {
      updateNextEnabled();
      next.addEventListener('click', advance);
    }

    if (step.kind === 'choice') {
      const opts = document.querySelectorAll('.q-option');
      opts.forEach(function (el) {
        el.addEventListener('click', function () {
          answers[step.field] = el.getAttribute('data-value');
          // visually mark selection
          opts.forEach(function (o) { o.classList.remove('selected'); o.querySelector('.q-radio').textContent = ''; });
          el.classList.add('selected');
          el.querySelector('.q-radio').textContent = '✓';
          updateNextEnabled();
          // auto-advance
          setTimeout(function () { if (stepIdx < TOTAL - 1) { stepIdx++; renderStep(); } }, 250);
        });
      });
    }

    if (step.kind === 'form') {
      const n = document.getElementById('qf-name');
      const w = document.getElementById('qf-wa');
      const a = document.getElementById('qf-age');
      [n, w, a].forEach(function (el) {
        if (!el) return;
        el.addEventListener('input', function () {
          if (el === n) answers.name = el.value;
          if (el === w) answers.whatsapp = el.value;
          if (el === a) answers.age = el.value;
          updateNextEnabled();
        });
      });
    }
  }

  function canAdvance() {
    const step = steps[stepIdx];
    if (step.kind === 'intro') return true;
    if (step.kind === 'choice') return !!answers[step.field];
    if (step.kind === 'form') {
      const phone = (answers.whatsapp || '').replace(/\D/g, '');
      const age = Number(answers.age);
      return (answers.name || '').trim().length >= 2 && phone.length >= 10 && age >= 12 && age <= 90;
    }
    return false;
  }

  function updateNextEnabled() {
    const next = document.getElementById('q-next');
    if (!next) return;
    next.disabled = !canAdvance() || submitting;
  }

  function advance() {
    if (submitting || !canAdvance()) return;
    if (stepIdx < TOTAL - 1) {
      stepIdx++;
      renderStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      submit();
    }
  }

  function submit() {
    if (submitting) return;
    submitting = true;
    const next = document.getElementById('q-next');
    if (next) {
      next.disabled = true;
      next.innerHTML = '<span class="spinner"></span> Montando seu plano...';
    }
    setTimeout(function () {
      saveState(true);
      const first = (answers.name || '').trim().split(' ')[0] || 'corredor(a)';
      showToast('Plano em construção, ' + first + '!', 'Recebemos suas respostas. Um treinador vai te chamar no WhatsApp em até 24h com o seu plano personalizado.');
      submitting = false;
      unlockSite();
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1200);
  }

  // ---------------- Toast ----------------
  let toastTimer;
  function showToast(title, body) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.innerHTML = '<h4>' + escapeHTML(title) + '</h4><p>' + escapeHTML(body) + '</p>';
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 6000);
  }

  // ---------------- Header on scroll ----------------
  function setupSiteHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 30) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function setupYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  // ---------------- HTML escape ----------------
  function escapeHTML(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHTML(s); }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
