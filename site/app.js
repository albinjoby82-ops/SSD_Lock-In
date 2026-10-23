/* SSD Lock-In practice site.
   Reads the markdown in questions/ and mock/ at runtime, so editing the .md files
   updates the site. No build step. */
(() => {
'use strict';

const REPO_BLOB = 'https://github.com/albinjoby82-ops/SSD_Lock-In/blob/main/';
const app = document.getElementById('app');

// ---------------------------------------------------------------- storage
const store = {
  get(k, d = null) { try { const v = localStorage.getItem('ssd:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ssd:' + k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem('ssd:' + k); } catch {} },
  clearAll() { try { Object.keys(localStorage).filter(k => k.startsWith('ssd:') && !k.startsWith('ssd:pref:')).forEach(k => localStorage.removeItem(k)); } catch {} },
};
const markOf = key => store.get('mark:' + key);
const setMark = (key, v) => v ? store.set('mark:' + key, v) : store.del('mark:' + key);

// ---------------------------------------------------------------- prefs
const root = document.documentElement;
const applyPrefs = () => {
  // light (blue) by default; dark only if chosen with the ☾ button
  if (store.get('pref:theme2') === 'dark') root.dataset.theme = 'dark'; else root.dataset.theme = 'light';
  root.style.setProperty('--fs', store.get('pref:fs', 19) + 'px');
};
applyPrefs();
document.getElementById('btn-theme').onclick = () => {
  store.set('pref:theme2', root.dataset.theme === 'dark' ? 'light' : 'dark'); applyPrefs();
};
document.getElementById('btn-bigger').onclick = () => { store.set('pref:fs', Math.min(26, store.get('pref:fs', 19) + 1)); applyPrefs(); };
document.getElementById('btn-smaller').onclick = () => { store.set('pref:fs', Math.max(15, store.get('pref:fs', 19) - 1)); applyPrefs(); };

// ---------------------------------------------------------------- markdown + maths
marked.setOptions({ gfm: true, breaks: true });

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function md(text, baseDir = '', inline = false) {
  const maths = [];
  let src = String(text).replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => { maths.push([m, true]); return `@@M${maths.length - 1}@@`; });
  src = src.replace(/(^|[^\\$\w])\$([^\s$][^$\n]*?[^\s$\\]|[^\s$])\$(?![\w$])/g, (_, pre, m) => { maths.push([m, false]); return `${pre}@@M${maths.length - 1}@@`; });
  let html = inline ? marked.parseInline(src) : marked.parse(src);
  html = html.replace(/@@M(\d+)@@/g, (_, i) => {
    const [m, display] = maths[+i];
    try {
      const k = katex.renderToString(m, { displayMode: display, throwOnError: false, strict: 'ignore' });
      return display ? `<div class="mathblock">${k}</div>` : k;
    } catch { return esc(m); }
  });
  // a display-maths line on its own gets wrapped in <p>; unwrap it
  html = html.replace(/<p>\s*(<div class="mathblock">[\s\S]*?<\/div>)\s*<\/p>/g, '$1');
  return fixLinks(html, baseDir);
}

function resolvePath(href, baseDir) {
  if (/^(https?:|mailto:|#|data:)/.test(href)) return null;
  const parts = (baseDir + href).split('/');
  const out = [];
  for (const p of parts) { if (p === '..') out.pop(); else if (p !== '.' && p !== '') out.push(p); }
  return out.join('/');
}
function fixLinks(html, baseDir) {
  const t = document.createElement('template');
  t.innerHTML = html;
  t.content.querySelectorAll('img[src]').forEach(img => {
    const p = resolvePath(img.getAttribute('src'), baseDir); if (p !== null) img.setAttribute('src', p);
    img.loading = 'lazy';
  });
  t.content.querySelectorAll('a[href]').forEach(a => {
    const raw = a.getAttribute('href');
    const p = resolvePath(raw, baseDir); if (p === null) return;
    const [file, hash] = p.split('#');
    if (file === 'formula-sheet.md' || file === 'periodic-table.md') { a.setAttribute('href', '#'); a.dataset.doc = file; return; }
    const q = file.match(/^questions\/(\d\d)-/); if (q) { a.setAttribute('href', '#/topic/' + q[1]); return; }
    const mk = file.match(/^mock\/midterm-(\d+)\.md$/); if (mk) { a.setAttribute('href', '#/mock/' + mk[1]); return; }
    a.setAttribute('href', REPO_BLOB + file + (hash ? '#' + hash : '')); a.target = '_blank'; a.rel = 'noopener';
  });
  prettyScripts(t.content);
  return t.innerHTML;
}

// Turn plain-text notation like w_p, N_A^-, E_C, φ_Si, n'_p into real subscripts/superscripts.
const SUB_RE = /([A-Za-z0-9\u0370-\u03FF'ℰ)\]])_(\{[^}]+\}|[A-Za-z0-9]+)/g;
const unbrace = x => x.replace(/^\{|\}$/g, '');
function prettyText(str) {
  return esc(str)
    .replace(SUB_RE, (_, b, x) => `${b}<sub>${unbrace(x)}</sub>`)
    .replace(/(<\/sub>|[A-Za-z0-9\u0370-\u03FF)\]·])\^(\((?:[^()]|\([^()]*\))*\)|\{[^}]+\}|[+\-−]?[0-9]+|[+\-−](?![\w])|[A-Za-z]+|…|\.\.\.)/g,
      (_, b, x) => `${b}<sup>${x.replace(/^[({]|[)}]$/g, x[0] === '(' || x[0] === '{' ? '' : '$&').replace(/^-/, '−')}</sup>`);
}
function prettyScripts(rootNode) {
  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
  const hits = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (!/[_^]/.test(n.nodeValue)) continue;
    if (n.parentElement && n.parentElement.closest('code, pre, .katex, script, style')) continue;
    hits.push(n);
  }
  hits.forEach(n => {
    const html = prettyText(n.nodeValue);
    if (html === esc(n.nodeValue)) return;
    const t = document.createElement('template'); t.innerHTML = html;
    n.replaceWith(t.content);
  });
}
const pretty = s => prettyText(String(s));

// ---------------------------------------------------------------- loading
const cache = {};
async function load(path) {
  if (!cache[path]) cache[path] = fetch(path, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(path + ' → ' + r.status); return r.text(); });
  return cache[path];
}

const FALLBACK_TOPICS = [
  [1, 'Bond model', '01-bond-model', 1], [2, 'Doping, mass action, charge neutrality', '02-doping-carrier-concentration', 1],
  [3, 'Drift', '03-drift', 1], [4, 'Diffusion', '04-diffusion', 1], [5, 'Fermi level', '05-fermi-level', 1],
  [6, 'Workfunction', '06-workfunction', 1], [7, 'Bands under a field', '07-bands-under-field', 1],
  [8, 'Bringing materials into contact', '08-contact', 2], [9, 'Metal–semiconductor', '09-metal-semiconductor', 2],
  [10, 'pn diode at zero bias', '10-pn-zero-bias', 2], [11, 'pn diode under bias', '11-pn-under-bias', 2],
  [12, 'Minority carrier injection', '12-minority-injection', 2], [13, 'Diode current', '13-diode-current', 2],
  [14, 'Depletion width', '14-depletion-width', 2],
].map(([n, title, slug, ch]) => ({ n, title, slug, ch, file: `questions/${slug}.md`, notes: `notes/${slug}.md`, weight: '', tutQs: '' }));

async function loadIndex() {
  let topics = [], mocks = [];
  try {
    const t = await load('TOPICS.md');
    let ch = 1;
    for (const line of t.split('\n')) {
      const c = line.match(/^##\s+Chapter\s+(\d)/i); if (c) ch = +c[1];
      const m = line.match(/^\|\s*(\d+)\s*\|\s*\[([^\]]+)\]\((notes\/[^)]+)\)\s*\|[^|]*\|\s*\[([^\]]+)\]\((questions\/([^)]+)\.md)\)\s*\|\s*([^|]*)\|/);
      if (m) topics.push({ n: +m[1], title: m[2], notes: m[3], tutQs: m[4], file: m[5], slug: m[6], ch, weight: m[7].trim() });
      const k = line.match(/\[([^\]]*Mock[^\]]*)\]\((mock\/midterm-(\d+)\.md)\)\s*(\(([^)]*)\))?/i);
      if (k && line.startsWith('|')) mocks.push({ title: k[1], file: k[2], id: k[3], note: k[5] || '' });
    }
  } catch (e) { console.warn(e); }
  if (!topics.length) topics = FALLBACK_TOPICS;
  if (!mocks.length) mocks = [1, 2].map(i => ({ title: 'Mock Midterm ' + i, file: `mock/midterm-${i}.md`, id: String(i), note: '' }));
  return { topics, mocks };
}

// ---------------------------------------------------------------- parsing a questions file
function parseQuestions(text, topic) {
  const lines = text.replace(/\r/g, '').split('\n');
  const qs = []; const intro = [];
  let part = 'tut', cur = null, inAns = false;
  const push = () => { if (cur) qs.push(finish(cur, topic)); cur = null; inAns = false; };
  for (const line of lines) {
    if (/^##\s+Part\s+A/i.test(line)) { push(); part = 'tut'; continue; }
    if (/^##\s+Part\s+B/i.test(line)) { push(); part = 'mid'; continue; }
    const h = line.match(/^###\s+(.*)$/);
    if (h) { push(); cur = { heading: h[1].trim(), part, body: [], ans: [] }; continue; }
    if (!cur) { if (!/^#\s/.test(line) && !/^##\s/.test(line)) intro.push(line); continue; }
    if (/<details>/i.test(line)) { inAns = true; const rest = line.replace(/.*<\/summary>/i, '').replace(/<details>.*?<summary>.*?<\/summary>/i, ''); if (rest.trim() && !/<details>/i.test(rest)) cur.ans.push(rest); continue; }
    if (/<\/details>/i.test(line)) { inAns = false; continue; }
    (inAns ? cur.ans : cur.body).push(line);
  }
  push();
  return { intro: cleanIntro(intro.join('\n')), qs };
}
function cleanIntro(s) {
  return s.replace(/^\s*Try each question first\.?\s*$/mi, '').replace(/^\s*Then click to check\.?\s*$/mi, '')
    .replace(/^\s*Each answer says which notes section.*$/mi, '').replace(/^\s*---\s*$/gm, '').trim();
}
const trimBlock = arr => arr.join('\n').replace(/\n\s*---\s*$/g, '').replace(/^\s*---\s*\n/, '').trim();

function finish(q, topic) {
  const m = q.heading.match(/^([A-Za-z]*\d+[a-z]*)\s*[:.]?\s*(.*)$/);
  const qid = m ? m[1] : q.heading;
  let title = m ? m[2] : '';
  let tut = '';
  const tm = title.match(/\((Tutorial[^)]*)\)/i);
  if (tm) { tut = tm[1]; title = title.replace(tm[0], '').trim(); }
  const body = trimBlock(q.body), ans = trimBlock(q.ans);
  const fromM = ans.match(/^\s*(?:From|→)\s*:?\s*(.+)$/mi);
  const out = {
    key: `${topic.file}#${qid}`, qid, title: title || (q.part === 'tut' ? 'Tutorial question' : ''), tut, part: q.part,
    body, ans, from: fromM ? fromM[1].trim() : '', topic, type: 'open',
  };
  if (/true\s*or\s*false/i.test(title)) {
    const st = [...body.matchAll(/^\s*\d+\.\s+(.+)$/gm)].map(x => x[1]);
    const an = [...ans.matchAll(/^\s*\d+\.\s+\*\*(True|False)\.?\*\*\.?\s*(.*)$/gim)].map(x => ({ v: x[1][0].toUpperCase() + x[1].slice(1).toLowerCase(), why: x[2] }));
    if (st.length && st.length === an.length) {
      out.type = 'tf'; out.items = st.map((s, i) => ({ s, ...an[i] }));
      out.stem = body.replace(/^\s*\d+\.\s+.+$/gm, '').trim();
    }
  } else if (/multiple\s*choice/i.test(title) || /^\s*-\s+[A-E]\.\s/m.test(body)) {
    const opts = [...body.matchAll(/^\s*[-*]\s+([A-E])[.)]\s+(.+)$/gm)].map(x => ({ L: x[1], t: x[2] }));
    const a = ans.match(/\*\*\s*([A-E])\b/);
    if (opts.length >= 2 && a) {
      out.type = 'mcq'; out.opts = opts; out.correct = a[1];
      out.stem = body.replace(/^\s*[-*]\s+[A-E][.)]\s+.+$/gm, '').trim();
    }
  }
  return out;
}

// split a worked answer into steps the user can reveal one at a time
function splitSteps(ans) {
  const lines = ans.split('\n'); const chunks = []; let cur = [];
  const flush = () => { const s = cur.join('\n').trim(); if (s) chunks.push(s); cur = []; };
  lines.forEach((ln, i) => {
    if (/^\s*<br\s*\/?>\s*$/i.test(ln)) { flush(); return; }
    const prevBlank = i === 0 || !lines[i - 1].trim();
    if (prevBlank && /^\*\*\s*([a-h]|[ivx]+|\d+|Part|Sample|Method|Step|Order)\b[^*]{0,40}\*\*/i.test(ln) && cur.join('').trim()) flush();
    cur.push(ln);
  });
  flush();
  // glue a trailing "From:" line onto the step before it
  if (chunks.length > 1 && /^(From|→)\b/.test(chunks[chunks.length - 1])) chunks.splice(-2, 2, chunks[chunks.length - 2] + '\n\n' + chunks[chunks.length - 1]);
  return chunks;
}

// ---------------------------------------------------------------- number checking
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
const supToAscii = s => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, c => SUP[c]);
function numbersIn(text) {
  const out = [];
  const t = supToAscii(text).replace(/−/g, '-').replace(/,(?=\d{3})/g, '');
  const re = /(-?\d+(?:\.\d+)?)\s*(?:[×x*]\s*10\s*\^?\s*([+-]?\d+))?|(?<![\d.])10\s*\^?\s*([+-]\d+)/g;
  let m;
  while ((m = re.exec(t))) {
    if (m[3]) { out.push(Math.pow(10, +m[3])); continue; }
    if (!m[1]) continue;
    let v = parseFloat(m[1]);
    if (m[2]) v *= Math.pow(10, +m[2]);
    else if (/^-?10$/.test(m[1]) && /^\d/.test(t.slice(re.lastIndex))) continue; // "10" followed by an exponent we didn't catch
    out.push(v);
  }
  return out;
}
function answerNumbers(ans) {
  const vals = [];
  for (const m of ans.matchAll(/\*\*([^*]+)\*\*/g)) {
    const s = m[1].trim();
    if (/^(Part|Sample|Method|Step|Order|Q\d|[a-h]\.|\d+\.$)/i.test(s) || /:$/.test(s)) continue;
    if (!/\d/.test(s)) continue;
    numbersIn(s).forEach(v => vals.push(v));
  }
  return vals.filter(v => isFinite(v));
}
function parseUserNumber(s) {
  let t = supToAscii(s.trim()).replace(/−/g, '-').replace(/\s+/g, '');
  t = t.replace(/[×x*]10\^?\(?([+-]?\d+)\)?/i, 'e$1').replace(/^10\^\(?([+-]?\d+)\)?/, '1e$1').replace(/E/, 'e');
  const m = t.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);
  return m ? parseFloat(m[0]) : NaN;
}

// ---------------------------------------------------------------- rendering helpers
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const MARK_LABEL = { got: '✓ Got it', part: '~ Partly', miss: '✗ Missed' };

function typeLabel(q) {
  if (q.type === 'tf') return 'True / false';
  if (q.type === 'mcq') return 'Multiple choice';
  return q.part === 'tut' ? 'Tutorial' : 'Midterm-style';
}

function renderCard(q, { showTopic = false, index } = {}) {
  const base = q.topic.file.replace(/[^/]+$/, '');
  const card = h(`<article class="card" id="q-${esc(q.qid)}-${q.topic.n}"></article>`);
  const tag = q.tut ? `<span class="tag tut">${esc(q.tut)}</span>` : `<span class="tag">${typeLabel(q)}</span>`;
  const topicTag = showTopic ? `<a class="tag from" href="#/topic/${String(q.topic.n).padStart(2, '0')}">Topic ${q.topic.n} · ${esc(q.topic.title.split(':')[0])}</a>` : '';
  const head = h(`<div class="card-head">${tag}${topicTag}<h3>${index != null ? index + '. ' : ''}${q.tut ? '' : esc(q.qid) + (q.title ? ': ' : '')}${md(q.title || (q.tut ? 'Tutorial question' : ''), base, true)}</h3><span class="badge"></span></div>`);
  card.append(head);
  const badge = head.querySelector('.badge');
  const paint = () => {
    const v = markOf(q.key);
    card.classList.remove('st-got', 'st-part', 'st-miss');
    badge.className = 'badge'; badge.textContent = '';
    if (v) { card.classList.add('st-' + v); badge.classList.add(v); badge.textContent = MARK_LABEL[v]; }
    card.querySelectorAll('.sm').forEach(b => b.classList.toggle('on', b.dataset.v === v));
    document.dispatchEvent(new CustomEvent('marks-changed'));
  };

  const selfmark = h(`<div class="selfmark" hidden><p>How did you do?</p><div class="row">
      <button class="sm got" data-v="got">✓ Got it</button>
      <button class="sm part" data-v="part">~ Partly</button>
      <button class="sm miss" data-v="miss">✗ Missed it</button></div></div>`);
  selfmark.querySelectorAll('.sm').forEach(b => b.onclick = () => { setMark(q.key, markOf(q.key) === b.dataset.v ? null : b.dataset.v); paint(); });

  const hintBox = h(`<div class="hint" hidden></div>`);
  if (q.from) hintBox.innerHTML = `💡 This is in <a href="${REPO_BLOB + q.topic.notes}" target="_blank" rel="noopener">Topic ${q.topic.n} notes</a> → ${md(q.from, base, true)}`;

  if (q.type === 'tf') {
    if (q.stem) card.append(h(`<div class="md">${md(q.stem, base)}</div>`));
    const ol = h(`<ol class="tf"></ol>`); const picks = {};
    q.items.forEach((it, i) => {
      const li = h(`<li><div class="stmt"><div>${md(it.s, base, true)}</div></div><div class="tfb"><button data-v="True">True</button><button data-v="False">False</button></div><div class="why" hidden></div></li>`);
      li.querySelectorAll('.tfb button').forEach(b => b.onclick = () => {
        if (ol.dataset.done) return;
        picks[i] = b.dataset.v; li.querySelectorAll('.tfb button').forEach(x => x.classList.toggle('pick', x === b));
      });
      ol.append(li);
    });
    card.append(ol);
    const acts = h(`<div class="actions"><button class="btn go">Check my answers</button><button class="btn ghost">Reset</button></div>`);
    const [check, reset] = acts.querySelectorAll('button');
    check.onclick = () => {
      let right = 0;
      ol.dataset.done = '1';
      [...ol.children].forEach((li, i) => {
        const it = q.items[i], p = picks[i], ok = p === it.v; if (ok) right++;
        li.querySelectorAll('.tfb button').forEach(b => { b.classList.remove('pick'); if (b.dataset.v === it.v) b.classList.add('right'); else if (b.dataset.v === p) b.classList.add('wrong'); });
        const why = li.querySelector('.why'); why.hidden = false; why.className = 'why ' + (ok ? 'ok' : 'no');
        why.innerHTML = `<b>${it.v}.</b> ${md(it.why, base, true)}`;
      });
      const n = q.items.length;
      setMark(q.key, right === n ? 'got' : right >= Math.ceil(n / 2) ? 'part' : 'miss'); paint();
      check.textContent = `${right} / ${n} right`; check.disabled = true; selfmark.hidden = false;
    };
    reset.onclick = () => {
      delete ol.dataset.done; Object.keys(picks).forEach(k => delete picks[k]);
      ol.querySelectorAll('.tfb button').forEach(b => b.className = ''); ol.querySelectorAll('.why').forEach(w => w.hidden = true);
      check.disabled = false; check.textContent = 'Check my answers';
    };
    card.append(acts);
  } else if (q.type === 'mcq') {
    if (q.stem) card.append(h(`<div class="md">${md(q.stem, base)}</div>`));
    const opts = h(`<div class="opts"></div>`);
    const ansBox = h(`<div class="answer" hidden></div>`);
    q.opts.forEach(o => {
      const b = h(`<button class="opt"><span class="L">${o.L}</span><span>${md(o.t, base, true)}</span></button>`);
      b.onclick = () => {
        opts.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (x === b) x.classList.add(o.L === q.correct ? 'right' : 'wrong'); if (x.querySelector('.L').textContent === q.correct) x.classList.add('right'); });
        ansBox.hidden = false; ansBox.innerHTML = `<div class="step md">${md(q.ans, base)}</div>`;
        setMark(q.key, o.L === q.correct ? 'got' : 'miss'); paint(); selfmark.hidden = false; retry.hidden = false;
      };
      opts.append(b);
    });
    card.append(opts);
    const acts = h(`<div class="actions"><button class="btn ghost" hidden>Try again</button></div>`);
    const retry = acts.querySelector('button');
    retry.onclick = () => { opts.querySelectorAll('.opt').forEach(x => { x.disabled = false; x.classList.remove('right', 'wrong'); }); ansBox.hidden = true; retry.hidden = true; };
    card.append(acts, ansBox);
  } else {
    card.append(h(`<div class="md">${md(q.body, base)}</div>`));
    const nums = answerNumbers(q.ans);
    if (nums.length) {
      const nc = h(`<div class="numcheck"><label for="nc-${q.key}">Got a number? Check it before you look:</label>
        <input id="nc-${q.key}" inputmode="decimal" autocomplete="off" placeholder="e.g.  1.92   or   4.41e-6   or   4.41 x 10^-6">
        <button class="btn">Check</button><span class="numres" aria-live="polite"></span></div>`);
      const inp = nc.querySelector('input'), res = nc.querySelector('.numres');
      const go = () => {
        const v = parseUserNumber(inp.value);
        if (!isFinite(v)) { res.className = 'numres meh'; res.textContent = 'Type a number, like 2.1e3 or 2.1 x 10^3.'; return; }
        const close = (a, b) => Math.abs(a - b) <= 0.03 * Math.max(Math.abs(a), Math.abs(b)) || (a === 0 && b === 0);
        if (nums.some(n => close(v, n))) { res.className = 'numres ok'; res.textContent = '✓ That matches a final answer. Open the answer to check your method.'; }
        else if (nums.some(n => close(Math.abs(v), Math.abs(n)))) { res.className = 'numres meh'; res.textContent = '~ Right size, wrong sign. Check the direction.'; }
        else if (nums.some(n => n && Math.abs(Math.log10(Math.abs(v / n))) > 0.9 && close(Math.abs(v) / Math.pow(10, Math.round(Math.log10(Math.abs(v / n)))), Math.abs(n)))) { res.className = 'numres meh'; res.textContent = '~ Right digits, wrong power of 10. Check your units (cm vs m).'; }
        else { res.className = 'numres no'; res.textContent = '✗ Not one of the final answers. Try again, or reveal a step.'; }
      };
      nc.querySelector('button').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
      card.append(nc);
    }
    const steps = splitSteps(q.ans);
    const acts = h(`<div class="actions"></div>`);
    const hintBtn = h(`<button class="btn">💡 Hint</button>`);
    const nextBtn = h(`<button class="btn go"></button>`);
    const allBtn = h(`<button class="btn">Show full answer</button>`);
    const ansBox = h(`<div class="answer"></div>`);
    let shown = 0;
    const label = () => { nextBtn.textContent = steps.length > 1 ? (shown ? `Next step (${shown + 1} of ${steps.length})` : `Show step 1 of ${steps.length}`) : 'Show answer'; };
    const reveal = upto => {
      while (shown < upto) {
        const s = h(`<div><div class="step-n">${steps.length > 1 ? 'Step ' + (shown + 1) : 'Answer'}</div><div class="step md">${md(steps[shown], base)}</div></div>`);
        ansBox.append(s); shown++;
      }
      selfmark.hidden = false;
      if (shown >= steps.length) { nextBtn.hidden = true; allBtn.hidden = true; } else label();
    };
    nextBtn.onclick = () => reveal(shown + 1);
    allBtn.onclick = () => reveal(steps.length);
    hintBtn.onclick = () => { hintBox.hidden = !hintBox.hidden; };
    if (!q.from) hintBtn.hidden = true;
    if (steps.length < 2) allBtn.hidden = true;
    label();
    acts.append(hintBtn, nextBtn, allBtn);
    card.append(acts, hintBox, ansBox);
  }
  card.append(selfmark);
  if (markOf(q.key)) selfmark.hidden = false;
  paint();
  // any link to the formula sheet inside a card opens the modal
  card.addEventListener('click', e => { const a = e.target.closest('a[data-doc]'); if (a) { e.preventDefault(); openDoc(a.dataset.doc); } });
  return card;
}

// ---------------------------------------------------------------- data helpers
let INDEX = null;
let routeSeq = 0;
class Stale extends Error {}
const fresh = seq => { if (seq !== routeSeq) throw new Stale(); };
const parsedCache = {};
async function topicQs(t) {
  if (!parsedCache[t.file]) parsedCache[t.file] = load(t.file).then(txt => parseQuestions(txt, t));
  return parsedCache[t.file];
}
async function allQs() { return (await Promise.all(INDEX.topics.map(topicQs))).flatMap(p => p.qs); }
function tallyOf(qs) {
  const t = { got: 0, part: 0, miss: 0, total: qs.length };
  qs.forEach(q => { const v = markOf(q.key); if (v) t[v]++; });
  t.left = t.total - t.got - t.part - t.miss; return t;
}
const tallyHTML = t => `<b class="g">✓ ${t.got}</b><b class="p">~ ${t.part}</b><b class="m">✗ ${t.miss}</b><span>${t.left} not tried</span>`;
const barHTML = t => t.total ? `<div class="bar"><i class="g" style="width:${100 * t.got / t.total}%"></i><i class="p" style="width:${100 * t.part / t.total}%"></i><i class="m" style="width:${100 * t.miss / t.total}%"></i></div>` : '';
const weightText = w => { const dots = (w.match(/●/g) || []).length; return dots ? `<span class="dots" title="${esc(w)}">${'●'.repeat(dots)}</span> ${dots >= 3 ? 'must know' : dots === 2 ? 'should know' : 'skim'}` : ''; };
const tutOrder = q => { const m = (q.tut || '').match(/Ch(\d)\s*Q(\d+)([a-z]*)/i); return m ? (+m[1]) * 1000 + (+m[2]) * 10 + (m[3] ? m[3].charCodeAt(0) - 96 : 0) : 99999; };

// ---------------------------------------------------------------- views
async function viewHome(seq) {
  const { topics, mocks } = INDEX;
  const qs = await allQs(); fresh(seq);
  const tutCount = qs.filter(q => q.part === 'tut').length;
  const weak = qs.filter(q => ['miss', 'part'].includes(markOf(q.key))).length;
  const all = tallyOf(qs);
  app.innerHTML = '';
  app.append(h(`<section class="hero">
    <h1>Solid State Devices practice</h1>
    <p class="sub">EEEN20070 midterm · Ch1 Semiconductors + Ch2 Junctions &amp; pn diodes</p>
    <div class="callout"><b>The midterm will be a lot like the tutorials.</b><br>So start with the tutorial drill. Do it on paper first, then check here.</div>
    <div class="modes">
      <a class="mode primary" href="#/drill/tutorial"><span class="ic">🎯</span><b>Tutorial drill</b><small>All ${tutCount} tutorial questions, Ch1 Q1 → Ch2 Q13, in order</small></a>
      <a class="mode" href="#/drill/weak"><span class="ic">🔁</span><b>Weak spots</b><small>${weak ? weak + ' question' + (weak > 1 ? 's' : '') + ' you marked missed or partly' : 'Mark questions as you go, then redo the ones you missed'}</small></a>
      <a class="mode" href="#/drill/random"><span class="ic">🎲</span><b>Random 10</b><small>Mixed questions from every topic</small></a>
    </div>
    <div class="tally" style="margin-top:18px">${tallyHTML(all)}</div>${barHTML(all)}
  </section>`));
  for (const ch of [1, 2]) {
    const list = topics.filter(t => t.ch === ch); if (!list.length) continue;
    const sec = h(`<section><h2>Chapter ${ch} · ${ch === 1 ? 'Semiconductors' : 'Junctions &amp; pn diodes'}</h2><div class="topics"></div></section>`);
    for (const t of list) {
      const p = await topicQs(t); fresh(seq); const tl = tallyOf(p.qs);
      const pct = tl.total ? Math.round(100 * tl.got / tl.total) : 0;
      const C = 2 * Math.PI * 18;
      sec.querySelector('.topics').append(h(`<a class="topic" href="#/topic/${String(t.n).padStart(2, '0')}">
        <span class="num">${t.n}</span>
        <span><span class="t">${pretty(t.title)}</span>
          <span class="meta">${weightText(t.weight)}${t.tutQs ? `<span>Tutorial ${esc(t.tutQs)}</span>` : ''}<span>${tl.total} questions</span></span>${barHTML(tl)}</span>
        <svg class="ring" viewBox="0 0 46 46" aria-label="${pct}% got right"><circle cx="23" cy="23" r="18" fill="none" stroke="var(--line)" stroke-width="5"/>
          <circle cx="23" cy="23" r="18" fill="none" stroke="var(--good)" stroke-width="5" stroke-linecap="${pct ? 'round' : 'butt'}" stroke-dasharray="${C * pct / 100} ${C}" transform="rotate(-90 23 23)"/>
          <text x="23" y="27" text-anchor="middle">${pct}%</text></svg></a>`));
    }
    app.append(sec);
  }
  const ms = h(`<section><h2>Mock midterms</h2><p class="sub">Do these after the topics. Timed, closed book, formula sheet only.</p><div class="modes"></div></section>`);
  mocks.forEach(m => {
    const sc = mockScore(m.file);
    ms.querySelector('.modes').append(h(`<a class="mode" href="#/mock/${m.id}"><span class="ic">📝</span><b>${esc(m.title)}</b><small>${esc(m.note.replace(/[()]/g, '') || '50 minutes, 100 marks')}${sc.marked ? ` · last score ${sc.got}/${sc.marked}` : ''}</small></a>`));
  });
  app.append(ms);
  const foot = h(`<footer class="foot"><p>Questions are read straight from the <a href="${REPO_BLOB.replace('/blob/main/', '')}" target="_blank" rel="noopener">repo</a>'s <code>questions/</code> and <code>mock/</code> folders. Your progress is saved in this browser only.</p><button>Reset all my progress</button></footer>`);
  foot.querySelector('button').onclick = () => { if (confirm('Clear all your marks and mock scores?')) { store.clearAll(); route(); } };
  app.append(foot);
}

async function viewTopic(n, seq) {
  const t = INDEX.topics.find(x => x.n === +n); if (!t) return notFound();
  const p = await topicQs(t); fresh(seq);
  let filter = store.get('pref:filter', 'all');
  app.innerHTML = '';
  const idx = INDEX.topics.indexOf(t);
  const prev = INDEX.topics[idx - 1], next = INDEX.topics[idx + 1];
  app.append(h(`<div><div class="crumb"><a href="#/">← All topics</a></div>
    <h1>Topic ${t.n}: ${pretty(t.title)}</h1>
    <p class="sub">${weightText(t.weight)}${t.tutQs ? ` · Tutorial ${esc(t.tutQs)}` : ''} · <a href="${REPO_BLOB + t.notes}" target="_blank" rel="noopener">Open the notes ↗</a></p></div>`));
  if (p.intro) app.append(h(`<div class="intro md">${md(p.intro, 'questions/')}</div>`));
  const bar = h(`<div class="filters"><div class="seg">
      <button data-f="all">All</button><button data-f="tut">Tutorial</button><button data-f="mid">Midterm-style</button><button data-f="todo">Not done</button><button data-f="weak">Missed</button></div>
      <div class="tally"></div></div>`);
  app.append(bar);
  const list = h(`<div></div>`); app.append(list);
  const draw = () => {
    bar.querySelectorAll('.seg button').forEach(b => b.classList.toggle('on', b.dataset.f === filter));
    list.innerHTML = '';
    const shown = p.qs.filter(q => filter === 'all' || (filter === 'tut' && q.part === 'tut') || (filter === 'mid' && q.part === 'mid')
      || (filter === 'todo' && !markOf(q.key)) || (filter === 'weak' && ['miss', 'part'].includes(markOf(q.key))));
    let lastPart = null;
    shown.forEach(q => {
      if (q.part !== lastPart && (filter === 'all' || filter === 'todo' || filter === 'weak')) {
        list.append(h(`<h2>${q.part === 'tut' ? 'Part A · Tutorial questions' : 'Part B · Midterm-style questions'}</h2>`)); lastPart = q.part;
      }
      list.append(renderCard(q));
    });
    if (!shown.length) list.append(h(`<p class="empty">Nothing here yet. ${filter === 'todo' ? 'You have tried every question. 🎉' : ''}</p>`));
  };
  const updTally = () => { bar.querySelector('.tally').innerHTML = tallyHTML(tallyOf(p.qs)); };
  bar.querySelectorAll('.seg button').forEach(b => b.onclick = () => { filter = b.dataset.f; store.set('pref:filter', filter); draw(); updTally(); });
  draw(); updTally(); onMarks(updTally);
  app.append(h(`<div class="actions" style="justify-content:space-between;margin-top:40px">
    ${prev ? `<a class="btn" href="#/topic/${String(prev.n).padStart(2, '0')}">← Topic ${prev.n}</a>` : '<span></span>'}
    ${next ? `<a class="btn go" href="#/topic/${String(next.n).padStart(2, '0')}">Topic ${next.n} →</a>` : `<a class="btn go" href="#/mock/1">Mock midterm 1 →</a>`}</div>`));
}

async function viewDrill(kind, seq = routeSeq) {
  const qs = await allQs(); fresh(seq);
  let list, title, sub;
  if (kind === 'tutorial') {
    list = qs.filter(q => q.part === 'tut').sort((a, b) => tutOrder(a) - tutOrder(b));
    title = '🎯 Tutorial drill'; sub = 'Every tutorial question in order. Do each on paper first, then check.';
  } else if (kind === 'weak') {
    list = qs.filter(q => ['miss', 'part'].includes(markOf(q.key)));
    title = '🔁 Weak spots'; sub = 'Questions you marked missed or partly. Get them to ✓.';
  } else {
    list = [...qs].sort(() => Math.random() - .5).slice(0, 10);
    title = '🎲 Random 10'; sub = 'A fresh mix every time you open this page.';
  }
  app.innerHTML = '';
  app.append(h(`<div><div class="crumb"><a href="#/">← Home</a></div><h1>${title}</h1><p class="sub">${sub}</p></div>`));
  const bar = h(`<div class="filters"><div class="tally"></div>${kind === 'random' ? '<button class="btn" id="reroll">🎲 New 10</button>' : ''}</div>`);
  app.append(bar);
  const upd = () => { bar.querySelector('.tally').innerHTML = tallyHTML(tallyOf(list)); };
  upd(); onMarks(upd);
  const rr = bar.querySelector('#reroll'); if (rr) rr.onclick = () => viewDrill('random');
  if (!list.length) app.append(h(`<p class="empty">${kind === 'weak' ? 'No weak spots yet. Mark questions as ✗ or ~ and they show up here.' : 'No questions found.'}</p>`));
  list.forEach((q, i) => app.append(renderCard(q, { showTopic: true, index: i + 1 })));
}

// ---------------------------------------------------------------- mocks
function mockScore(file) {
  const s = store.get('mock:' + file, {}); let got = 0, marked = 0;
  Object.values(s).forEach(v => { if (v && v.max) { got += +v.got || 0; marked += +v.max; } });
  return { got, marked };
}
function parseMock(text) {
  const t = text.replace(/\r/g, '');
  const qi = t.search(/^##\s+Questions/m), ai = t.search(/^##\s+Answers/m);
  const intro = t.slice(0, qi < 0 ? 0 : qi).replace(/^#\s.*$/m, '').replace(/^\s*---\s*$/gm, '').trim();
  const qPart = t.slice(qi, ai < 0 ? undefined : ai), aPart = ai < 0 ? '' : t.slice(ai);
  const qs = [];
  qPart.split(/^###\s+/m).slice(1).forEach(block => {
    const [head, ...rest] = block.split('\n');
    const id = (head.match(/^(Q\d+)/) || [])[1] || head;
    const marks = +((head.match(/(\d+)\s*marks/i) || [])[1] || 0);
    qs.push({ id, head: head.trim(), marks, body: rest.join('\n').replace(/(\n\s*---\s*)+$/g, '').trim(), ans: '' });
  });
  for (const m of aPart.matchAll(/<summary>\s*(Q\d+)[^<]*<\/summary>([\s\S]*?)<\/details>/gi)) {
    const q = qs.find(x => x.id === m[1]); if (q) q.ans = m[2].trim();
  }
  return { intro, qs };
}
let timerHandle = null;
async function viewMock(id, seq) {
  const m = INDEX.mocks.find(x => x.id === String(id)); if (!m) return notFound();
  const { intro, qs } = parseMock(await load(m.file)); fresh(seq);
  const base = 'mock/';
  const saved = () => store.get('mock:' + m.file, {});
  const total = qs.reduce((s, q) => s + q.marks, 0) || 100;
  app.innerHTML = '';
  app.append(h(`<div><div class="crumb"><a href="#/">← Home</a></div><h1>📝 ${esc(m.title)}</h1><p class="sub">${esc(m.note.replace(/[()]/g, ''))}</p></div>`));
  app.append(h(`<div class="intro md">${md(intro, base)}</div>`));
  const tb = h(`<div class="timer"><span class="clock">50:00</span>
     <button class="btn go" data-a="start">▶ Start</button><button class="btn" data-a="reset">↺</button>
     <span class="score">Score <b>0</b> / ${total}</span></div>`);
  app.append(tb);
  const clock = tb.querySelector('.clock'), startBtn = tb.querySelector('[data-a=start]');
  const tkey = 'timer:' + m.file;
  const getT = () => store.get(tkey, { left: 50 * 60, running: false, at: 0 });
  const tick = () => {
    const t = getT(); let left = t.left;
    if (t.running) left = Math.max(0, t.left - (Date.now() - t.at) / 1000);
    const mm = Math.floor(left / 60), ss = Math.floor(left % 60);
    clock.textContent = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    clock.classList.toggle('low', left < 300);
    startBtn.textContent = t.running ? '❚❚ Pause' : (t.left < 3000 ? '▶ Resume' : '▶ Start');
    if (t.running && left <= 0) { store.set(tkey, { left: 0, running: false, at: 0 }); clock.textContent = "Time's up"; }
  };
  startBtn.onclick = () => {
    const t = getT();
    if (t.running) store.set(tkey, { left: Math.max(0, t.left - (Date.now() - t.at) / 1000), running: false, at: 0 });
    else store.set(tkey, { left: t.left || 3000, running: true, at: Date.now() });
    tick();
  };
  tb.querySelector('[data-a=reset]').onclick = () => { store.del(tkey); tick(); };
  clearInterval(timerHandle); timerHandle = setInterval(tick, 500); tick();

  const updScore = () => { const s = saved(); tb.querySelector('.score b').textContent = qs.reduce((a, q) => a + (+(s[q.id] || {}).got || 0), 0); };
  qs.forEach(q => {
    const card = h(`<article class="card"><div class="card-head"><span class="tag">${q.marks ? q.marks + ' marks' : 'Question'}</span><h3>${md(q.head.replace(/\s*—\s*\d+\s*marks/i, ''), base, true)}</h3></div>
      <div class="md">${md(q.body, base)}</div>
      <div class="actions"><button class="btn go">Show model answer</button></div>
      <div class="answer" hidden><div class="step md">${md(q.ans || '_No answer found for this question._', base)}</div></div>
      <div class="marks" hidden>Your mark: <input type="number" min="0" max="${q.marks}" inputmode="numeric"> / ${q.marks}</div></article>`);
    const btn = card.querySelector('.btn'), ans = card.querySelector('.answer'), mk = card.querySelector('.marks'), inp = mk.querySelector('input');
    const s0 = saved()[q.id]; if (s0) { inp.value = s0.got; ans.hidden = false; mk.hidden = false; btn.textContent = 'Hide model answer'; }
    btn.onclick = () => { ans.hidden = !ans.hidden; mk.hidden = false; btn.textContent = ans.hidden ? 'Show model answer' : 'Hide model answer'; };
    inp.oninput = () => {
      const s = saved();
      if (inp.value === '') delete s[q.id]; else s[q.id] = { got: Math.min(q.marks, Math.max(0, +inp.value)), max: q.marks };
      store.set('mock:' + m.file, s); updScore();
    };
    card.addEventListener('click', e => { const a = e.target.closest('a[data-doc]'); if (a) { e.preventDefault(); openDoc(a.dataset.doc); } });
    app.append(card);
  });
  updScore();
  app.append(h(`<p class="sub" style="margin-top:30px">Mark yourself honestly against the model answers. Each one says which topic and § to go back to.</p>`));
}

function notFound() { app.innerHTML = `<p class="empty">Page not found. <a href="#/">Go home</a></p>`; }

// ---------------------------------------------------------------- formula sheet modal
const modal = document.getElementById('modal'), modalBody = document.getElementById('modal-body');
async function openDoc(file) {
  modal.hidden = false; document.body.style.overflow = 'hidden';
  document.querySelectorAll('#modal-tabs button').forEach(b => b.classList.toggle('on', b.dataset.doc === file));
  modalBody.innerHTML = '<p class="loading">Loading…</p>';
  try { modalBody.innerHTML = md(await load(file), ''); } catch (e) { modalBody.innerHTML = `<p class="err">Couldn't load ${esc(file)}.</p>`; }
  modalBody.scrollTop = 0;
}
const closeModal = () => { modal.hidden = true; document.body.style.overflow = ''; };
document.getElementById('btn-formulas').onclick = () => openDoc('formula-sheet.md');
document.getElementById('modal-close').onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); const a = e.target.closest('a[data-doc]'); if (a) { e.preventDefault(); openDoc(a.dataset.doc); } };
document.querySelectorAll('#modal-tabs button').forEach(b => b.onclick = () => openDoc(b.dataset.doc));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

// ---------------------------------------------------------------- router
let markListeners = [];
const onMarks = fn => markListeners.push(fn);
document.addEventListener('marks-changed', () => markListeners.forEach(f => f()));

async function route() {
  markListeners = []; clearInterval(timerHandle);
  const hash = location.hash.replace(/^#\/?/, '');
  const [view, arg] = hash.split('/');
  try {
    const seq = ++routeSeq;
    if (!INDEX) INDEX = await loadIndex();
    fresh(seq);
    if (!view) await viewHome(seq);
    else if (view === 'topic') await viewTopic(arg, seq);
    else if (view === 'drill') await viewDrill(arg, seq);
    else if (view === 'mock') await viewMock(arg, seq);
    else notFound();
  } catch (e) {
    if (e instanceof Stale) return;
    console.error(e);
    app.innerHTML = `<div class="err"><b>Couldn't load the questions.</b><br>${esc(e.message)}<br><br>If you opened index.html straight from your disk, run a local server instead (for example <code>python3 -m http.server</code>) or use the GitHub Pages link.</div>`;
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
})();
