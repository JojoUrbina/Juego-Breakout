//barra
const btnInciar = document.querySelector("#iniciar-juego");
const btnReiniciar = document.querySelector("#reiniciar-juego");
const btnAumentarVelocidad = document.querySelector("#aumentar-velocidad");
const btnDisminuirVelocidad = document.querySelector("#disminuir-velocidad");
const spanVelocidadBola = document.querySelector("#velocidad-bola");
const perdiste = document.querySelector("#perdiste");
const marcador = document.querySelector("#marcador");

const movimientoDeBarraEnPixeles = 20;
let coordLeftBarra = 200;

let topDelta = (leftDelta = 5);
let topCoord = (leftCoord = 0);

const bola = document.querySelector(".ball");
const anchoBola = 25;
let direccionEjeVertical = "abajo";
let direccionEjeHorizontal = "derecha";
let puntos = 0;
let velocidadBola = 30;
let velocidadBolaMostrada = 0;

document.body.addEventListener("keydown", (e) => {
  moverBarra(e);
});

btnInciar.addEventListener("click", () => {
  empezarJuego(velocidadBola);
  btnInciar.textContent = "Continuar";
  perdiste.textContent = "...";
});
document.querySelector("#pausar-juego").addEventListener("click", () => {
  pausarJuego();
});
btnReiniciar.addEventListener("click", () => {
  reiniciarJuego();
});

btnAumentarVelocidad.addEventListener("click", () => {
  aumentarVelocidadBola();
});
btnDisminuirVelocidad.addEventListener("click", () => {
  disminuirVelocidadBola();
});

function moverBarra(e) {
  const anchoDeContenedor =
    document.querySelector(".ball-container").clientWidth;
  const barra = document.querySelector(".bar");
  const anchoBarra = 80;
  const direccion = e.code;
  if (direccion === "ArrowLeft") {
    coordLeftBarra = Math.max(0, coordLeftBarra - movimientoDeBarraEnPixeles);
  } else if (direccion === "ArrowRight") {
    coordLeftBarra = Math.min(
      anchoDeContenedor - anchoBarra,
      coordLeftBarra + movimientoDeBarraEnPixeles
    );
  }
  barra.style.left = `${coordLeftBarra}px`;
}

function moverPelota() {
  const fieldHeight = document.querySelector(".ball-container").clientHeight;
  const fieldWidth = document.querySelector(".ball-container").clientWidth;
  if (direccionEjeVertical === "abajo") {
    topCoord += topDelta;

    if (
      topCoord === fieldHeight - anchoBola - 20 &&
      leftCoord - coordLeftBarra >= -40 &&
      leftCoord - coordLeftBarra <= 80
    ) {
      puntos++;
      sumarMarcador(puntos);
      direccionEjeVertical = "arriba";
    }

    if (topCoord === fieldHeight - anchoBola) {
      //cuando pierde
      return perder();
    }
  } else if (direccionEjeVertical === "arriba") {
    topCoord -= topDelta;
    if (topCoord === 0) {
      direccionEjeVertical = "abajo";
    }
  }

  if (direccionEjeHorizontal === "derecha") {
    leftCoord = Math.min(fieldWidth - anchoBola, leftCoord + leftDelta);
    if (leftCoord === fieldWidth - anchoBola) {
      direccionEjeHorizontal = "izquierda";
    }
  } else if (direccionEjeHorizontal === "izquierda") {
    leftCoord = Math.max(0, leftCoord - leftDelta);
    if (leftCoord === 0) {
      direccionEjeHorizontal = "derecha";
    }
  }

  bola.style.left = `${leftCoord}px`;
  bola.style.top = `${topCoord}px`;
}

let intervalID = null;
function empezarJuego(velocidadBola) {
  if (intervalID !== null) {
    clearInterval(intervalID);
  }
  intervalID = setInterval(moverPelota, velocidadBola);
}
function perder() {
  reiniciarJuego();
  perdiste.textContent = `Perdiste`;
}
function pausarJuego() {
  clearInterval(intervalID);
}
function reiniciarJuego() {
  btnInciar.textContent = "Iniciar";
  direccionEjeVertical = "abajo";
  leftCoord = 0;
  topCoord = 0;
  bola.style.left = `0px`;
  bola.style.top = `0px`;
  reiniciarMarcador();
  pausarJuego();
  reiniciarVelocidad();
}

function sumarMarcador(puntos) {
  marcador.textContent = puntos;
}
function reiniciarMarcador() {
  const marcador = document.querySelector("#marcador");
  puntos = 0;
  marcador.textContent = puntos;
}
function aumentarVelocidadBola() {
  velocidadBola--;
  velocidadBolaMostrada++;
  pausarJuego();
  spanVelocidadBola.textContent = velocidadBolaMostrada;
}
function disminuirVelocidadBola() {
  velocidadBola++;
  velocidadBolaMostrada--;
  pausarJuego();
  spanVelocidadBola.textContent = velocidadBolaMostrada;
}
function reiniciarVelocidad() {
  velocidadBola = 30;
  velocidadBolaMostrada = 0;
  spanVelocidadBola.textContent = velocidadBolaMostrada;
}
