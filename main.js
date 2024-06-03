//barra
const perdiste = document.querySelector("#perdiste");
const delta = 20;
let left = 200;
document.body.addEventListener("keydown", (e) => {
  moverBarra(e);
});

function moverBarra(e) {
  const anchoDeContenedor =
    document.querySelector(".ball-container").clientWidth;
  const barra = document.querySelector(".bar");
  const anchoBarra = 80;
  const direccion = e.code;
  if (direccion === "ArrowLeft") {
    left = Math.max(0, left - delta);
  } else if (direccion === "ArrowRight") {
    left = Math.min(anchoDeContenedor - anchoBarra, left + delta);
  }
  barra.style.left = `${left}px`;
}

//pelota
let topDelta = (leftDelta = 5);
let topCoord = (leftCoord = 0);
const fieldHeight = document.querySelector(".ball-container").clientHeight;

const bola = document.querySelector(".ball");
const anchoBola = 25;
let direccionEjeVertical = "abajo";
let direccionEjeHorizontal = "derecha";
let puntos = 0;
let velocidadBola = 30;
let velocidadBolaMostrada = 0;

function moverPelota() {
  const fieldWidth = document.querySelector(".ball-container").clientWidth;
  //crear ds funciones, que sean sobre movimiento en eje horizontal o vertical
  perdiste.textContent = "...";

  if (direccionEjeVertical === "abajo") {
    topCoord += topDelta;

    if (
      topCoord === fieldHeight - anchoBola - 20 &&
      leftCoord - left >= -40 &&
      leftCoord - left <= 80
    ) {
      puntos++;
      sumarMarcador(puntos);
      direccionEjeVertical = "arriba";
    }

    if (topCoord === fieldHeight - anchoBola) {
      //cuando pierde
      pausarJuego();
      perder();
      reiniciarMarcador();
      btnInciar.textContent = "Iniciar";
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
//botones
const btnInciar = document.querySelector("#iniciar-juego");
const btnReiniciar = document.querySelector("#reiniciar-juego");
const btnAumentarVelocidad = document.querySelector("#aumentar-velocidad");
const btnDisminuirVelocidad = document.querySelector("#disminuir-velocidad");
const spanVelocidadBola = document.querySelector("#velocidad-bola");
const marcador = document.querySelector("#marcador");
btnAumentarVelocidad.addEventListener("click", () => {
  aumentarVelocidadBola();
});
btnDisminuirVelocidad.addEventListener("click", () => {
  disminuirVelocidadBola();
});

btnInciar.addEventListener("click", () => {
  empezarJuego(velocidadBola);
  btnInciar.textContent = "Continuar";
});
btnReiniciar.addEventListener("click", () => {
  reiniciarJuego();
});

document.querySelector("#pausar-juego").addEventListener("click", () => {
  pausarJuego();
});

function empezarJuego(velocidadBola) {
  if (intervalID !== null) {
    clearInterval(intervalID);
  }
  intervalID = setInterval(moverPelota, velocidadBola);
}
function perder() {
  velocidadBola = 30;
  leftCoord = 0;
  topCoord = 0;
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
