/**
 * Classe Carta per representar una carta de cartes.
 * Defineix propietats com palo (la collana de la carta)
 * i valor (el seu valor, com per exemple 2, rei, as, etc.)
 */
export class Carta {
  static palos = ['oros', 'copas', 'espadas', 'bastos'];
  static valores = ['as', '2', '3', '4', '5', '6', '7',
    'sota', 'caballo', 'rey'];
  /**
   * @param {String} palo El palo de la carta (oros, copas, espadas, bastos)
   * @param {String} valor El valor de la carta
   * (2, 3, 4, 5, 6, 7, 8, 9, as, rei, caballo, sota)
   */
  constructor(palo, valor) {
    this.palo = palo;
    this.valor = valor;
  }
  /**
   *Aquest get es per extreure el nom de la carta en una mateixa frase
   */
  get nombre() {
    return `${this.valor} de ${this.palo}`;
  }

  /**
   * Cada imatge te establerta un ruta en base al seu nom y valor,
   * aquesta funcio serveix per obtenir la ruta de cada carta.
   * @return {string} retorna la ruta
   */
  get rutaimagen() {
    let numero = this.valor;

    if (this.valor === 'as') {
      numero = 1;
    } else if (this.valor === 'sota' ) {
      numero = 10;
    } else if (this.valor === 'caballo' ) {
      numero = 11;
    } else if (this.valor === 'rey' ) {
      numero = 12;
    }

    return `cards/${this.palo}_${numero}.jpg`;
  }
}

/**
 * Classe Baraja per representar una baraja de cartes.
 * Conte la carta, el metode per barrejar la baraja
 * ii un metode per donar una carta a cada jugador.
 */
class Baraja {
  /**
   * en el constructor es crea la barrala
   * recoregent palos y valor de les cartas.
   */
  constructor() {
    this.cartas = [];
    for (const palo of Carta.palos) {
      for (const valor of Carta.valores) {
        const carta = new Carta(palo, valor);
        this.cartas.push(carta);
      }
    }
  }

  /**
   * metode/funcio per barrejar la baraja
   */
  shuffle() {
    this.cartas.sort(() => Math.random() - 0.5);
  }

  /**
   * funcio per donar una carta.
   * @param {object} cartatriada es per saber quina es la carta
   * de la barrala que li toca agafar en aquell moment
   * @return {object} carta retorna la carta corresponent de la barrala
   */
  donarCarta(cartatriada) {
    console.log(this.cartas[cartatriada]);
    const carta = this.cartas[cartatriada];
    return carta;
  }
}

/**
 * Classe Jugador per representar un jugador.
 * Recorda la seva mà de cartes, suma de punts, codi i saldo.
 * Demana cartes a la baraja i pot calcular la seva puntuació.
 *
 * @param {Baraja} baraja La baraja de cartes
 * @param {Number} id El codi identificador del jugador
 *
 */
class Jugador {
  /**
   * @param {Object} baraja al crear un jugador se li asigna una barrla
   * normalment es la mateixa que la dels altres
   * @param {int} id cada jugador te un id
   * no te un gran us demoment pero es podria
   * necesitar en cas de voler fer ampliacions en el joc.
   */
  constructor(baraja, id) {
    this.codi = id;
    this.baraja = baraja;
    this.sumaPuntos = 0;
    this.mazo = [];
    this.cartesAgafades = 0;
    this.plantat = false;
    this.saldo = 0;
  }

  /**
   * @param {int} cartesAgafades es per saber cuantes cartes
   * de la baraja ha agafat i quina li toca agafar en aquell moment
   */
  demanarCarta(cartesAgafades) {
    const carta = this.baraja.donarCarta(cartesAgafades);
    this.mazo.push(carta);
    console.log(carta);
  }

  /**
   * @return {number} retorna la suma de punts recorreguent
   * tots els valors de les cartes del mazo
   */
  calcularPuntuacio() {
    let puntos = 0;
    for (const carta of this.mazo) {
      if (carta.valor === 'as') {
        puntos += 1;
      } else if (['sota', 'caballo', 'rey'].includes(carta.valor)) {
        puntos += 0.5;
      } else {
        puntos += parseInt(carta.valor);
      }
    }
    this.sumaPuntos = puntos;
    return this.sumaPuntos;
  }

  /**
   * Aquesta funcio s'encarrega de reiniciar el valors
   * del jugador cada cop que torna a apostar.
   */
  noujoc() {
    this.sumaPuntos = 0;
    this.mazo = [];
    this.cartesAgafades = 0;
    this.plantat = false;
  }
}

export {Jugador};
export {Baraja};
