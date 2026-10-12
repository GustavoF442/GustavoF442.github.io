// relógio local (São João Batista, SC)
const clock = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
const tick = () => { clock.textContent = fmt.format(new Date()); };
tick();
setInterval(tick, 15000);

document.getElementById("year").textContent = new Date().getFullYear();

// código de barras da etiqueta, gerado a partir do usuário do GitHub
(function barcode() {
  const svg = document.getElementById("barcode");
  const ns = "http://www.w3.org/2000/svg";
  const bars = [];
  let x = 6;
  for (const ch of "GUSTAVOF442") {
    let n = ch.charCodeAt(0);
    for (let i = 0; i < 6; i++) {
      const w = (n & 1) + 1;
      bars.push([x, w]);
      x += w + ((n >> 1) & 1) + 1;
      n = (n >> 1) ^ (i * 7 + 3);
    }
    x += 2;
  }
  const scale = 288 / x;
  for (const [bx, w] of bars) {
    const r = document.createElementNS(ns, "rect");
    r.setAttribute("x", (bx * scale).toFixed(2));
    r.setAttribute("y", 0);
    r.setAttribute("width", (w * scale).toFixed(2));
    r.setAttribute("height", 50);
    svg.appendChild(r);
  }
})();

// progresso do roadmap: lê o data-status de cada etapa
(function roadmap() {
  const stages = [...document.querySelectorAll(".stage")];
  const done = stages.filter((s) => s.dataset.status === "done").length;
  const doing = stages.filter((s) => s.dataset.status === "doing").length;
  document.getElementById("pipe-progress").textContent = `${done}/${stages.length} concluídas`;
  const fill = document.getElementById("pipe-fill");
  const pct = ((done + doing * 0.5) / stages.length) * 100;
  // pelo menos um traço visível pra indicar o início do pipeline
  fill.dataset.pct = Math.max(pct, 3);
})();

// grade acesa seguindo o mouse no topo; alinhada com a grade fixa do fundo
(function spotlight() {
  const hero = document.getElementById("hero");
  const spot = hero.querySelector(".spot");
  hero.addEventListener("pointermove", (e) => {
    const r = spot.getBoundingClientRect();
    spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
    spot.style.setProperty("--my", `${e.clientY - r.top}px`);
    spot.style.setProperty("--gx", `${-r.left - 1}px`);
    spot.style.setProperty("--gy", `${-r.top - 1}px`);
  });
})();

// entrada dos blocos ao rolar
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    if (e.target.id === "pipeline") {
      const fill = document.getElementById("pipe-fill");
      fill.style.width = fill.dataset.pct + "%";
    }
    io.unobserve(e.target);
  }
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// copiar e-mail
const copy = document.getElementById("copy");
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("gustavohfraga1@gmail.com");
    copy.textContent = "copiado ✓";
  } catch {
    copy.textContent = "use o link acima";
  }
  setTimeout(() => { copy.textContent = "copiar e-mail"; }, 2200);
});
