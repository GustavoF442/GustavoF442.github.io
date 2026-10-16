document.getElementById("year").textContent = new Date().getFullYear();

// menu no celular
const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
};
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
});

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

// blocos entram ao rolar a página; a assinatura é "escrita" da esquerda para a direita
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal, .signature").forEach((el) => io.observe(el));

// copiar e-mail
const copy = document.getElementById("copy");
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("gustavohfraga1@gmail.com");
    copy.textContent = "E-mail copiado";
  } catch {
    copy.textContent = "Não foi possível copiar";
  }
  setTimeout(() => { copy.textContent = "Copiar e-mail"; }, 2200);
});
