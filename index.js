// Animar el título con un efecto de parpadeo rojo
function animarTitulo() {
  const titulo = document.querySelector("h1");
  setInterval(() => {
    titulo.style.color = titulo.style.color === "#e50914" ? "#fff" : "#e50914";
  }, 1000);
}

// Resaltar fila al hacer click
function activarResaltado() {
  const filas = document.querySelectorAll("#tabla tr");
  filas.forEach(fila => {
    fila.addEventListener("click", () => {
      filas.forEach(f => f.classList.remove("seleccionado"));
      fila.classList.add("seleccionado");
    });
  });
}

// Fade in de la tabla al cargar
function fadeInTabla() {
  const tabla = document.getElementById("tabla");
  tabla.style.opacity = 0;
  let op = 0;
  const intervalo = setInterval(() => {
    if (op >= 1) clearInterval(intervalo);
    tabla.style.opacity = op;
    op += 0.05;
  }, 50);
}

// Ejecutar todo al cargar
window.onload = () => {
  animarTitulo();
  fadeInTabla();
  activarResaltado();
};



// Reproducir música al hacer click
document.body.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  if (music.paused) {
    music.play();
  }
}, { once: true });



