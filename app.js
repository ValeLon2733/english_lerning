const app = document.getElementById("app");
let P = JSON.parse(localStorage.getItem("prog") || "{}");
const save = () => localStorage.setItem("prog", JSON.stringify(P));
const K = (lv, b) => `${lv}-${b}`;
const st = (k) => (P[k] ||= { done: Array(10).fill(false), pass: false, fails: 0, tall: false });
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const say = (t) => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = "en-US"; u.rate = 0.85; speechSynthesis.speak(u); };
const passedBlocks = (lv) => [0,1,2,3,4,5,6].filter((b) => P[K(lv, b)]?.pass).length;
const levelOpen = (i) => i === 0 || P[K(LEVELS[i - 1], "F")]?.pass;
const gradeStr = (g) => g.toFixed(1).replace(".", ",");

// ---------- Preguntas (lectura + escucha) ----------
function makeQs(lv, words, n) {
  const all = pool(lv), ws = shuffle(words), qs = [];
  for (let i = 0; i < n; i++) {
    const [en, es] = ws[i % ws.length], type = i % 3;
    const opts = (f) => shuffle([f([en, es]), ...shuffle(all.filter((w) => w[0] !== en)).slice(0, 3).map(f)]);
    if (type === 0) qs.push({ q: `¿Qué significa "${en}"?`, opts: opts((w) => w[1]), ans: es });
    else if (type === 1) qs.push({ q: "🎧 Escucha y elige lo que oíste", say: en, opts: opts((w) => w[0]), ans: en });
    else qs.push({ q: "🎧 Escucha y escribe en inglés", say: en, ans: en, type: true });
  }
  return qs;
}

// ---------- Motor de preguntas ----------
function quiz(qs, done, exit) {
  let i = 0, ok = 0;
  const step = () => {
    if (i >= qs.length) return done(+((ok / qs.length) * 5).toFixed(1));
    const q = qs[i];
    app.innerHTML = `<div class="top"><button class="ghost" id="x">✕</button><div class="bar"><i style="width:${(i / qs.length) * 100}%"></i></div></div>
      <h2>${q.q}</h2>${q.say ? '<button class="big" id="s">🔊 Escuchar</button>' : ""}
      <div id="o"></div><p id="f" style="text-align:center"></p><div id="n"></div>`;
    document.getElementById("x").onclick = () => confirm("¿Salir? Perderás este intento.") && exit();
    if (q.say) { document.getElementById("s").onclick = () => say(q.say); say(q.say); }
    const answer = (right, btn) => {
      if (right) ok++;
      if (btn) btn.classList.add(right ? "ok" : "bad");
      document.getElementById("f").textContent = right ? "✅ ¡Correcto!" : `❌ Era: ${q.ans}`;
      document.querySelectorAll("#o button").forEach((b) => (b.disabled = true));
      document.getElementById("n").innerHTML = '<button class="big" id="c">Continuar</button>';
      document.getElementById("c").onclick = () => { i++; step(); };
    };
    const o = document.getElementById("o");
    if (q.type) {
      o.innerHTML = '<input id="t" placeholder="Escribe aquí" autocomplete="off"><button class="opt" id="k">Comprobar</button>';
      document.getElementById("k").onclick = () => answer(document.getElementById("t").value.trim().toLowerCase() === q.ans.toLowerCase());
    } else q.opts.forEach((t) => {
      const b = document.createElement("button"); b.className = "opt"; b.textContent = t;
      b.onclick = () => answer(t === q.ans, b); o.appendChild(b);
    });
  };
  step();
}

function result(g, min, msg, back) {
  const pass = g >= min;
  app.innerHTML = `<h2>${pass ? "🎉 ¡Aprobado!" : "😕 No aprobado"}</h2>
    <div class="grade">${gradeStr(g)}</div><p class="sub">Nota mínima: ${gradeStr(min)}</p>
    <p class="note">${msg(pass)}</p><button class="big" id="b">Continuar</button>`;
  document.getElementById("b").onclick = back;
}

// ---------- Pantallas ----------
function home() {
  app.innerHTML = `<h1>📚 English Path</h1><p class="sub">Elige tu nivel</p>` + LEVELS.map((lv, i) => {
    const open = levelOpen(i), fin = P[K(lv, "F")]?.pass;
    const info = fin ? "✅ Completado" : open ? `${passedBlocks(lv)}/7 bloques` : `🔒 Aprueba el examen final de ${LEVELS[i - 1]}`;
    return `<button class="card ${fin ? "done" : open ? "" : "lock"}" ${open ? `onclick="levelScreen('${lv}')"` : "disabled"}><b>Nivel ${lv}</b><span>${info}</span></button>`;
  }).join("");
}

function levelScreen(lv) {
  const p = passedBlocks(lv);
  let h = `<button class="ghost" onclick="home()">← Niveles</button><h1>Nivel ${lv}</h1>`;
  for (let b = 0; b < 7; b++) {
    const open = b === 0 || P[K(lv, b - 1)]?.pass, ok = P[K(lv, b)]?.pass;
    h += `<button class="card ${ok ? "done" : open ? "" : "lock"}" ${open ? `onclick="blockScreen('${lv}',${b})"` : "disabled"}>
      <b>Bloque ${b + 1} · Lecciones ${b * 10 + 1}-${b * 10 + 10}</b><span>${ok ? "✅" : open ? "▶" : "🔒"}</span></button>`;
  }
  const fOpen = p === 7, fOk = P[K(lv, "F")]?.pass;
  h += `<button class="card ${fOk ? "done" : fOpen ? "" : "lock"}" ${fOpen ? `onclick="finalScreen('${lv}')"` : "disabled"}><b>🏆 Examen final ${lv}</b><span>${fOk ? "✅" : fOpen ? "Mín. 4,0" : "🔒"}</span></button>`;
  app.innerHTML = h;
}

function blockScreen(lv, b) {
  const s = st(K(lv, b)), all = s.done.every(Boolean);
  let h = `<button class="ghost" onclick="levelScreen('${lv}')">← Bloque</button><h1>Bloque ${b + 1}</h1>`;
  if (s.fails > 0 && !s.pass) h += `<p class="note">Debes repetir las 10 lecciones antes del examen.${s.tall ? " Además debes aprobar el <b>taller</b>." : ""}</p>`;
  for (let l = 0; l < 10; l++) {
    const open = l === 0 || s.done[l - 1], n = b * 10 + l;
    h += `<button class="card ${s.done[l] ? "done" : open ? "" : "lock"}" ${open ? `onclick="lesson('${lv}',${b},${l})"` : "disabled"}>
      <b>${getLesson(lv, n).title}</b><span>${s.done[l] ? "✅" : open ? "▶" : "🔒"}</span></button>`;
  }
  if (s.tall) h += `<button class="card" onclick="workshop('${lv}',${b})"><b>🛠 Taller de refuerzo</b><span>Obligatorio</span></button>`;
  h += `<button class="big" ${all && !s.tall ? "" : "disabled"} onclick="blockExam('${lv}',${b})">📝 Examen del bloque (mín. 3,5)</button>`;
  app.innerHTML = h;
}

function lesson(lv, b, l) {
  const L = getLesson(lv, b * 10 + l);
  app.innerHTML = `<button class="ghost" onclick="blockScreen('${lv}',${b})">← Volver</button><h2>${L.title}</h2>
    ${L.sample ? '<p class="note">Contenido de ejemplo: aún falta escribir esta lección en content.js</p>' : ""}
    <p class="sub">Toca 🔊 para escuchar cada palabra</p>
    ${L.w.map((w) => `<div class="w"><span><b>${w[0]}</b> — ${w[1]}</span><button class="ghost" onclick="say('${w[0].replace(/'/g, "\\'")}')">🔊</button></div>`).join("")}
    <button class="ghost opt" id="ex">💡 Explícame más</button>
    <div id="exb" class="note" style="display:none">${L.e}</div>
    <details><summary>❓ Tengo una pregunta</summary>
      <textarea id="qt" rows="3" placeholder="Escribe tu duda sobre esta lección"></textarea>
      <button class="opt" id="qs">Enviar pregunta</button><p id="qm" class="sub"></p>
    </details>
    <button class="big" id="go">Practicar</button>`;
  document.getElementById("ex").onclick = () => {
    const d = document.getElementById("exb");
    d.style.display = d.style.display === "none" ? "block" : "none";
  };
  document.getElementById("qs").onclick = () => {
    const t = document.getElementById("qt").value.trim();
    if (!t) return;
    const qs = JSON.parse(localStorage.getItem("questions") || "[]");
    qs.push({ lesson: L.title, text: t, date: new Date().toISOString() });
    localStorage.setItem("questions", JSON.stringify(qs));
    document.getElementById("qt").value = "";
    document.getElementById("qm").textContent = "✅ Pregunta guardada";
  };
  document.getElementById("go").onclick = () => quiz(makeQs(lv, L.w, 6), (g) => {
    const s = st(K(lv, b));
    if (g >= 3) { s.done[l] = true; save(); }
    result(g, 3, (p) => (p ? "Lección completada." : "Necesitas 3,0 para completarla. Inténtalo otra vez."), () => blockScreen(lv, b));
  }, () => blockScreen(lv, b));
}

// ---------- Exámenes y taller ----------
function runExam(lv, key, words, n, min, back) {
  quiz(makeQs(lv, words, n), (g) => {
    const s = st(key), isBlock = key !== K(lv, "F");
    if (g >= min) { s.pass = true; s.fails = 0; s.tall = false; }
    else { s.fails++; s.tall = s.fails >= 2; if (isBlock) s.done.fill(false); }
    save();
    result(g, min, (p) => p ? "¡Siguiente etapa desbloqueada!" :
      (isBlock ? "Debes repetir las 10 lecciones. " : "Puedes volver a intentarlo. ") + (s.tall ? "Como reprobaste dos veces seguidas, debes hacer el taller." : ""), back);
  }, back);
}
const blockWords = (lv, b) => Array.from({ length: 10 }, (_, l) => getLesson(lv, b * 10 + l).w).flat();
const blockExam = (lv, b) => runExam(lv, K(lv, b), blockWords(lv, b), 10, 3.5, () => blockScreen(lv, b));

function finalScreen(lv) {
  const s = st(K(lv, "F"));
  app.innerHTML = `<button class="ghost" onclick="levelScreen('${lv}')">← Nivel</button><h1>🏆 Examen final ${lv}</h1>
    <p class="sub">20 preguntas · Nota mínima 4,0</p>
    ${s.tall ? '<p class="note">Reprobaste dos veces seguidas: aprueba el taller para volver a intentarlo.</p><button class="big" id="t">🛠 Hacer taller</button>' : ""}
    <button class="big" id="e" ${s.tall ? "disabled" : ""}>Comenzar examen</button>`;
  if (s.tall) document.getElementById("t").onclick = () => workshop(lv, "F");
  document.getElementById("e").onclick = () => runExam(lv, K(lv, "F"), pool(lv), 20, 4.0, () => levelScreen(lv));
}

function workshop(lv, b) {
  const final = b === "F", words = final ? pool(lv) : blockWords(lv, b);
  const back = () => (final ? finalScreen(lv) : blockScreen(lv, b));
  quiz(makeQs(lv, words, 12), (g) => {
    if (g >= 3.5) { st(K(lv, b)).tall = false; save(); }
    result(g, 3.5, (p) => (p ? "Taller aprobado. Ya puedes presentar el examen." : "Repite el taller las veces necesarias."), back);
  }, back);
}

home();