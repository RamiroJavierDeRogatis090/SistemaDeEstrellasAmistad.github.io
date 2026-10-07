// ============================================================
// Sistema de Estrellas — La Amistad
// ============================================================

const COL_ESTRELLAS = 2;
let datosOriginales = [];
let estadoOrden = { col: null, asc: true };

// ---------- Carga y render de la planilla ----------

async function cargarExcel() {
  try {
    const response = await fetch("SistemaEstrellasAmistad.xlsx");
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    datosOriginales = json.filter((fila) => fila.some((c) => c !== undefined && c !== ""));
    renderTabla(datosOriginales);
  } catch (error) {
    document.getElementById("tabla").innerHTML =
      '<tbody><tr><td style="padding:24px;color:#c9a227">No se pudo cargar la planilla.</td></tr></tbody>';
  }
}

function pintarEstrellas(valor) {
  const n = Number(valor);
  if (!valor || isNaN(n)) return document.createTextNode(String(valor ?? ""));
  const llenas = Math.max(0, Math.min(10, Math.round(n)));
  const texto = "★".repeat(llenas) + "☆".repeat(Math.max(0, 10 - llenas));
  const span = document.createElement("span");
  span.className = "stars";
  span.textContent = texto;
  span.title = `${n} estrella${n === 1 ? "" : "s"}`;
  return span;
}

function renderTabla(filas) {
  const tabla = document.getElementById("tabla");
  const thead = tabla.querySelector("thead");
  const tbody = tabla.querySelector("tbody");
  thead.innerHTML = "";
  tbody.innerHTML = "";

  if (!filas.length) {
    document.getElementById("emptyMsg").hidden = false;
    actualizarStats([]);
    return;
  }
  document.getElementById("emptyMsg").hidden = true;

  // Encabezado
  const trHead = document.createElement("tr");
  filas[0].forEach((celda, j) => {
    const th = document.createElement("th");
    th.textContent = celda ?? "";
    th.dataset.col = j;
    th.innerHTML += '<span class="arrow">▲</span>';
    th.addEventListener("click", () => ordenarPor(j));
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  // Filas
  filas.slice(1).forEach((fila) => {
    const tr = document.createElement("tr");
    fila.forEach((celda, j) => {
      const td = document.createElement("td");
      if (j === COL_ESTRELLAS) td.appendChild(pintarEstrellas(celda));
      else td.textContent = celda ?? "";
      tr.appendChild(td);
    });
    tr.addEventListener("click", () => {
      tbody.querySelectorAll("tr").forEach((f) => f.classList.remove("seleccionado"));
      tr.classList.add("seleccionado");
    });
    tbody.appendChild(tr);
  });

  aplicarOrdenVisual();
  actualizarStats(filas.slice(1));
}

// ---------- Orden ----------

function ordenarPor(col) {
  if (estadoOrden.col === col) estadoOrden.asc = !estadoOrden.asc;
  else { estadoOrden.col = col; estadoOrden.asc = true; }
  aplicarOrdenVisual();
}

function aplicarOrdenVisual() {
  const filas = datosOriginales.slice(1);
  if (estadoOrden.col !== null) {
    const col = estadoOrden.col;
    const dir = estadoOrden.asc ? 1 : -1;
    filas.sort((a, b) => {
      const va = a[col], vb = b[col];
      const na = parseFloat(va), nb = parseFloat(vb);
      if (!isNaN(na) && !isNaN(nb)) return (na - nb) * dir;
      return String(va ?? "").localeCompare(String(vb ?? ""), "es") * dir;
    });
  }
  renderCuerpo(filas);

  document.querySelectorAll("#tabla thead th").forEach((th) => {
    const esIgual = Number(th.dataset.col) === estadoOrden.col;
    th.classList.toggle("sorted", esIgual);
    th.querySelector(".arrow").textContent = estadoOrden.asc ? "▲" : "▼";
  });
}

function renderCuerpo(filas) {
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = "";
  const filtro = document.getElementById("buscador").value.trim().toLowerCase();
  let visibles = 0;

  filas.forEach((fila) => {
    const texto = fila.join(" ").toLowerCase();
    if (filtro && !texto.includes(filtro)) return;
    visibles++;

    const tr = document.createElement("tr");
    fila.forEach((celda, j) => {
      const td = document.createElement("td");
      if (j === COL_ESTRELLAS) td.appendChild(pintarEstrellas(celda));
      else td.textContent = celda ?? "";
      tr.appendChild(td);
    });
    tr.addEventListener("click", () => {
      tbody.querySelectorAll("tr").forEach((f) => f.classList.remove("seleccionado"));
      tr.classList.add("seleccionado");
    });
    tbody.appendChild(tr);
  });

  document.getElementById("emptyMsg").hidden = visibles > 0;
}

// ---------- Búsqueda y estadísticas ----------

function actualizarStats(filas) {
  document.getElementById("contador").textContent = filas.length;
  const max = filas.reduce((m, f) => {
    const n = parseFloat(f[COL_ESTRELLAS]);
    return !isNaN(n) && n > m ? n : m;
  }, 0);
  document.getElementById("maxStars").textContent = max;
}

document.getElementById("buscador").addEventListener("input", () => renderCuerpo(datosOriginales.slice(1)));

// ---------- Música ----------

function configurarMusica() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");

  const alternar = () => {
    if (music.paused) {
      music.volume = 0.5;
      music.play().then(() => btn.classList.add("playing")).catch(() => {});
    } else {
      music.pause();
      btn.classList.remove("playing");
    }
  };

  btn.addEventListener("click", (e) => { e.stopPropagation(); alternar(); });
  document.body.addEventListener("click", alternar, { once: true });
}

// ---------- Aparición al hacer scroll ----------

function configurarReveal() {
  const observer = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.18 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ---------- Init ----------

window.addEventListener("DOMContentLoaded", () => {
  configurarMusica();
  configurarReveal();
  cargarExcel();
});
