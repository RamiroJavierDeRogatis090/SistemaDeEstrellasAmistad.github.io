# ⭐ Sistema de Estrellas — La Amistad

Página web del **Club La Amistad** para visualizar el ranking de estrellas de sus integrantes, cargado automáticamente desde una planilla de Excel, con un diseño elegante en tema oscuro y acentos dorados.

![Captura principal](Capturas/home.png)

![Captura inferior](Capturas/homeInferior.png)

## ✨ Características

- 📊 **Tabla dinámica**: carga los datos desde `SistemaEstrellasAmistad.xlsx` en el navegador (sin backend).
- 🔍 **Búsqueda en tiempo real**: filtra integrantes mientras escribís.
- ↕️ **Ordenamiento**: hacé clic en cualquier encabezado para ordenar asc/desc (numérico o alfabético).
- ★ **Estrellas visuales**: la columna de puntaje se muestra como estrellas doradas.
- 🏆 **Último ganador**: tarjeta destacada con el Botín de Oro.
- 🎵 **Música de fondo**: botón flotante con ecualizador animado para reproducir/pausar.
- 💛 **Tema elegante**: fondo profundo, acentos gold, tipografías *Cinzel* + *Inter*, animaciones suaves y diseño responsivo (mobile-first).
- 🖱️ **Selección de fila**: clic en una fila para resaltarla.

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 | Estructura y diseño (CSS puro, sin frameworks) |
| JavaScript (ES6) | Lógica de tabla, búsqueda, orden y música |
| [SheetJS (xlsx)](https://sheetjs.com/) | Lectura del archivo `.xlsx` en el cliente |
| Google Fonts | Tipografías Cinzel e Inter |

## 🚀 Cómo ejecutarlo

El archivo Excel se carga con `fetch`, por lo que hace falta un servidor local (no se puede abrir con `file://`).

```bash
# opción 1
npx serve .

# opción 2 (Python)
python -m http.server 8000

# opción 3 (VS Code)
# extensión "Live Server" → Open with Live Server
```

Luego abrí [http://localhost:8000](http://localhost:8000).

## 📁 Estructura

```
├── index.html                 # Página principal
├── styles.css                 # Estilos (tema elegante oscuro/dorado)
├── index.js                   # Lógica: carga, orden, búsqueda, música
├── SistemaEstrellasAmistad.xlsx  # Datos del ranking
├── logo.png                   # Logo del club
├── botinoro.png               # Imagen del Botín de Oro
├── cancion.mp3                # Música de fondo
└── Capturas/                  # Capturas de pantalla
    ├── home.png
    └── homeInferior.png
```

## 📌 Notas

- Para actualizar el ranking, solo reemplazá el archivo `.xlsx` manteniendo el mismo nombre y estructura de columnas (la columna 3 se interpreta como puntaje en estrellas).
- La sección del último ganador está en `index.html` (bloque `#ultimoGanador`).

---

© 2026 Club La Amistad
