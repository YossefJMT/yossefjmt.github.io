import {Jugador} from './class.js';
import {Baraja} from './class.js';
import {
  fadeOut, fadeIn,
  botoapostar, botoparar,
  importotal, divcartesjugador,
  divcartescropier, divJoc, divInicial,
  crearDivJugador, crearDivCropier, titulo, parrafo,
} from './Vista.js';

const importapostat = document.getElementById('import');
const botonuevojuego = document.getElementById('nuevojuego');
const objectiu = 7.5;

export const baraja = new Baraja();
export const jugador1 = new Jugador(baraja, 1);
export const cropier = new Jugador(baraja, 2);

$('#divjoc').hide();

/**
 * Event listener per mostrar la explicacio del joc
 */
titulo.addEventListener('click', () => {
  if (parrafo.style.display === 'none') {
    parrafo.style.display = 'block';
  } else {
    parrafo.style.display = 'none';
  }
});


/**
 * RepartirDeNuevo() reparteix les cartes de nou
 * i reinicia els valors del jugador.
 */
export function repartirDeNuevo() {
  baraja.shuffle();
  jugador1.noujoc();
  cropier.noujoc();
  const divjugador = document.getElementById('divjugador');
  while (divjugador.firstChild) {
    divjugador.removeChild(divjugador.firstChild);
  }
  crearDivJugador();
  const divcropier = document.getElementById('divcropier');
  while (divcropier.firstChild) {
    divcropier.removeChild(divcropier.firstChild);
  }
  crearDivCropier();

  for (let i = 0; i < divcartesjugador.length; i++) {
    divcartesjugador[i].style.backgroundImage = 'url(cards/revers.jpg)';
  }
  for (let i = 0; i < divcartescropier.length; i++) {
    divcartescropier[i].style.backgroundImage = 'url(cards/revers.jpg)';
  }
  document.getElementById('sumajugador').innerHTML =
      'La mano del jugador es de : ' + jugador1.sumaPuntos;
  document.getElementById('sumacropier').innerHTML =
      'La mano del cropier es de : ' + cropier.sumaPuntos;
  botonuevojuego.disabled = false;
  botoapostar.disabled = true;
  botoparar.disabled = true;
}


botonuevojuego.addEventListener('click', nuevojuego);

/**
 * recull les cartes per tal de poder
 * fer unaltre partida
 */
function nuevojuego() {
  repartirDeNuevo();
  if (parseInt(importapostat.value) > 0 &&
      parseInt(importapostat.value) <= parseInt(importotal.value)) {
    botoapostar.disabled = false;
    botoparar.disabled = false;
    botonuevojuego.disabled = true;
    importapostat.disabled = true;

    mostrarCarta(jugador1, crearDivJugador());
  } else if (parseInt(importapostat.value) <= 0 || importapostat.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debes introducir un valor valido!',
    });
  } else if (parseInt(importapostat.value) > parseInt(importotal.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No puedes apostar mas del lo que tienes!',
    });
  }
}

botoapostar.addEventListener('click', function() {
  botoapostar.disabled = true;
  mostrarCarta(jugador1, crearDivJugador());
  setTimeout(() => {
    botoapostar.disabled = false;
  }, 2000);
});


botoparar.addEventListener('click', () => {
  jugador1.plantat = true;
  botoapostar.disabled = true;
  mostrarCarta(cropier, crearDivCropier());
});


/**
 * Adds two numbers together.
 * @param {jugador} jugador The first number.
 * @param {divcartes} divcartes The second number.
 */
function mostrarCarta(jugador, divcartes) {
  if (jugador1.calcularPuntuacio() <= objectiu ||
      cropier.calcularPuntuacio() < 6) {
    divcartes[jugador.cartesAgafades].classList.add('rotar');
    jugador.demanarCarta(jugador.cartesAgafades + jugador1.cartesAgafades);
    console.log(jugador.mazo[jugador.cartesAgafades].rutaimagen);
    setTimeout(() => {
      divcartes[jugador.cartesAgafades].style.backgroundImage =
          `url(${jugador.mazo[jugador.cartesAgafades].rutaimagen})`;
      jugador.cartesAgafades += 1;
    }, 1000);

    if (jugador.codi === 1) {
      setTimeout(() => {
        document.getElementById('sumajugador').innerHTML =
            'La mano del jugador es de : ' + jugador.calcularPuntuacio();
      }, 2000);
    }

    if (jugador.codi === 2) {
      setTimeout(() => {
        document.getElementById('sumacropier').innerHTML =
            'La mano del cropier es de : ' + jugador.calcularPuntuacio();
      }, 2000);
    }
  }
  if (jugador1.calcularPuntuacio() >= 7.5 || jugador1.plantat === true) {
    botoapostar.disabled = true;
    botoparar.disabled = true;

    if (cropier.calcularPuntuacio() < 6) {
      setTimeout((() => {
        mostrarCarta(cropier, crearDivCropier());
      }), 2000);
    } else {
      setTimeout((() => {
        botonuevojuego.disabled = false;
        importapostat.disabled = false;
        recuento();
      }), 3000);
    }
  }
}

/**
 * Adds two numbers together.

 */
function recuento() {
  if (jugador1.sumaPuntos > objectiu) {
    importotal.value =
        parseInt(importotal.value) -parseInt(importapostat.value);
    jugador1.saldo = parseInt(importotal.value);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Que mala suerte!',
    });
  } else if (jugador1.sumaPuntos <= objectiu &&
      cropier.sumaPuntos <= objectiu) {
    if (jugador1.sumaPuntos >= cropier.sumaPuntos) {
      importotal.value =
          parseInt(importotal.value) + parseInt(importapostat.value);
      jugador1.saldo = parseInt(importotal.value);
      Swal.fire({
        title: 'Buen trabajo!',
        text: 'Has ganado la apuesta!',
        icon: 'success',
      });
    } else {
      importotal.value =
          parseInt(importotal.value) - parseInt(importapostat.value);
      jugador1.saldo = parseInt(importotal.value);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Que mala suerte!',
      });
    }
  } else if (jugador1.sumaPuntos <= objectiu && cropier.sumaPuntos > objectiu) {
    importotal.value =
        parseInt(importotal.value) + parseInt(importapostat.value);
    jugador1.saldo = parseInt(importotal.value);
    Swal.fire({
      title: 'Buen trabajo!',
      text: 'Has ganado la apuesta!',
      icon: 'success',
    });
  }

  document.getElementById('sumajugador').innerHTML =
      'La mano del jugador es de : ' + jugador1.sumaPuntos;
  document.getElementById('sumacropier').innerHTML =
      'La mano del cropier es de : ' + cropier.sumaPuntos;

  if (parseInt(importotal.value) === 0) {
    Swal.fire({
      icon: 'error',
      title: 'VUELTA A EMPEZAR',
      text: 'HAS PERDIDO LA PARTIDA!',
    });
    reiniciarjoc();
  }
}

/**
 * quan el saldo del jugador arriba a 0
 * es reinicia la pagina sense recarregar la pagina
 */
function reiniciarjoc() {
  const divcartes = document.querySelectorAll('.cartes');
  jugador1.saldo = 0;

  repartirDeNuevo();
  document.getElementById('totalinicial').value = 0;
  fadeOut(divJoc, 2000);
  setTimeout(() => {
    fadeIn(divInicial, 2200);
  }, 1000);

  for (let div = 0; div < divcartes.length; div++) {
    divcartes[div].classList.remove('rotar');
  }
}

