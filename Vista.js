import {repartirDeNuevo, jugador1} from './main.js';

document.getElementById('iniciarjoc').addEventListener('click', empezar);
export let divcartesjugador = $('#divjugador').find('.cartes');
export let divcartescropier = $('#divcropier').find('.cartes');
export const importotal = document.getElementById('total');
export const botoapostar = document.getElementById('apostar');
export const botoparar = document.getElementById('parar');
export const titulo = document.getElementById('explicacionH2');
export const parrafo = document.getElementById('explicacionP');


export const divInicial = document.querySelector('#divinicial');
divInicial.style.opacity = 1;
export const divJoc = document.querySelector('#divjoc');
divJoc.style.opacity = 0;


/**
 * funcio per començar el joc
 * aquesta funcio es cridara cada cop que el jugador es quedi a saldo 0
 */
export function empezar() {
  /** botoapostar.disabled pretén evitar que l'usuari
   * faci apostes mentre es desenvolupa el joc. */
  botoapostar.disabled = true;
  botoparar.disabled = true;

  /** Comprova que el valor introduït a totalinicial sigui
   * superior a 1. Si és així, assigna aquest valor a total
   * i amaga la divisió inicial, mentre mostra la divisió del
   * jocpassats 1000 mil·lisegons. */
  if (document.getElementById('totalinicial').value > 1) {
    importotal.value = document.getElementById('totalinicial').value;
    fadeOut(divInicial, 2000);
    setTimeout(() => {
      fadeIn(divJoc, 2200);
    }, 1000);

    /** Assigna el saldo inicial al jugador1,
     * igual al valor introduït a totalinicial.  */
    jugador1.saldo = document.getElementById('totalinicial').value;
    repartirDeNuevo();
  } else {
    /** Mostra un avís d'error passats 200
     * mil·lisegons si no s'ha introduït cap valor vàlid. */
    setTimeout(() => {
      Swal.fire(
          'Introduzca un valor!',
          'No has introducido un valor valido!',
          'question',
      );
    }, 200);
  }
}


/**
 * Crea un divjugador, es crea un cada cop que es demana
 * una carta per tal d'anar mostrant els necesaris.
 * @return {element} retorna lelement de divcartes jugador.
 */
export function crearDivJugador() {
  const divnou = document.createElement('div');
  divnou.classList.add('cartes');

  document.querySelector('#divjugador').appendChild(divnou);
  divcartesjugador = $('#divjugador').find('.cartes');
  return divcartesjugador;
}

/**
 * Crea un divCropier, es crea un cada cop que es demana
 * una carta per tal d'anar mostrant els necesaris.
 * @return {element} retorna lelement de divcartes cropier.
 */
export function crearDivCropier() {
  const divnou = document.createElement('div');
  divnou.classList.add('cartes');

  document.querySelector('#divcropier').appendChild(divnou);
  divcartescropier = $('#divcropier').find('.cartes');

  return divcartescropier;
}

/**
 * Equival a la funcio fadeIn de Jquery on l'element es va
 * difuminant durant la durada fins que acaba fent un visualitzador none.
 * @param {element} element
 * @param {duration} duration
 */
export function fadeOut(element, duration) {
  element.style.opacity = 1;
  const interval = setInterval(() => {
    element.style.opacity -= 0.1;
    if (element.style.opacity <= 0) {
      clearInterval(interval);
      element.style.display = 'none';
    }
  }, duration / 50);
}

/**
 * Equival a la funcio fadeIn de Jquery on l'element va
 * apareixent durant la durada fins que acaba fent un visualitzador grid.
 * @param {element} element
 * @param {duration} duration
 */
export function fadeIn(element, duration) {
  element.style.opacity = 0;
  element.style.display = 'grid';
  const interval = setInterval(() => {
    element.style.opacity = Number(element.style.opacity) + 0.1;
    if (element.style.opacity >= 1) {
      clearInterval(interval);
    }
  }, duration / 50);
}
