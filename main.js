//barra
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

function moverPelota() {
  const fieldWidth = document.querySelector(".ball-container").clientWidth;

  if (direccionEjeVertical === "abajo") {
    topCoord += topDelta;

    if (
      topCoord === fieldHeight - anchoBola - 20 &&
      leftCoord - left >= -40 &&
      leftCoord - left <= 80
    ) {
      direccionEjeVertical = "arriba";
    }

    if (topCoord === fieldHeight - anchoBola) {
      direccionEjeVertical = "arriba";
      console.log("perdiste");
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
const btnInciar = document.querySelector("#iniciar-juego");

btnInciar.addEventListener("click", () => {
  empezarJuego();
  btnInciar.textContent = "Continuar";
});

document.querySelector("#pausar-juego").addEventListener("click", () => {
  clearInterval(intervalID);
});

function empezarJuego() {
  if (intervalID !== null) {
    clearInterval(intervalID);
  }
  intervalID = setInterval(moverPelota, 50);
}
