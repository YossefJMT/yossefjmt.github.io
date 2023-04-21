import {Carta, Jugador, Baraja} from '../class';

/**
 * Test de la clase Carta
 */
describe('Carta', () => {
  // Prueba para comprobar que la clase tiene 4 palos posibles
  it('Debe tener 4 palos posibles: oros, copas, espadas, bastos', () => {
    expect(Carta.palos).toEqual(['oros', 'copas', 'espadas', 'bastos']);
  });

  // Prueba para comprobar que la clase
  // tiene 12 valores posibles
  it('Debe tener 12 valores posibles:' +
        'as, 2, 3, 4, 5, 6, 7, sota, caballo, rey', () => {
    expect(Carta.valores).toEqual(['as', '2', '3', '4', '5', '6', '7',
      'sota', 'caballo', 'rey']);
  });

  // Prueba para comprobar que se puede
  // construir una carta con un palo y un valor
  it('Debe construirse con un palo y un valor', () => {
    const carta = new Carta('oros', 'rey');
    expect(carta.palo).toBe('oros');
    expect(carta.valor).toBe('rey');
  });

  // Prueba para comprobar que el método 'nombre'
  // devuelve el nombre de la carta en una frase
  it('get nombre debe devolver la carta como "valor de palo"', () => {
    const carta = new Carta('copas', '4');
    expect(carta.nombre).toBe('4 de copas');
  });

  // Prueba para comprobar que el método 'rutaimagen'
  // devuelve la ruta de la imagen correspondiente
  it('get rutaimagen debe generar la ruta a la imagen correspondiente', () => {
    const carta = new Carta('espadas', '7');
    expect(carta.rutaimagen).toBe(`cards/espadas_7.jpg`);

    carta.valor = 'as';
    expect(carta.rutaimagen).toBe(`cards/espadas_1.jpg`);
  });
});

/**
 * Test de la clase Baraja
 */
describe('Baraja', () => {
  let baraja;

  beforeEach(() => {
    baraja = new Baraja();
  });

  describe('constructor', () => {
    it('should create a deck of cards', () => {
      expect(baraja.cartas.length).toBe(40);
    });
  });

  describe('shuffle', () => {
    it('should shuffle the deck of cards', () => {
      const originalDeck = [...baraja.cartas];
      baraja.shuffle();
      expect(baraja.cartas).not.toEqual(originalDeck);
    });
  });

  describe('donarCarta', () => {
    it('should return a card from the deck', () => {
      const carta = baraja.donarCarta(0);
      expect(carta).toBeInstanceOf(Carta);
    });
  });
});

/**
 * Test de la clase Jugador
 */
describe('Jugador', () => {
  let baraja;
  let jugador;

  beforeEach(() => {
    baraja = new Baraja();
    jugador = new Jugador(baraja, 1);
  });

  test('El jugador debe tener una baraja y un ID asignados', () => {
    expect(jugador.baraja).toBe(baraja);
    expect(jugador.codi).toBe(1);
  });

  test('el jugador demana una carta i es guarda al mazo', () => {
    jugador.demanarCarta(0);
    expect(jugador.mazo).toHaveLength(1);
  });

  test('el jugador calcula la puntuació del mazo', () => {
    jugador.mazo = [{palo: 'bastos', valor: '4'},
      {palo: 'oros', valor: '7'}, {palo: 'espadas', valor: 'rey'}];
    expect(jugador.calcularPuntuacio()).toBe(11.5);
  });

  test('el jugador reinicia les seves dades', () => {
    jugador.mazo = [{palo: 'bastos', valor: '4'},
      {palo: 'oros', valor: '7'}, {palo: 'espadas', valor: 'rey'}];
    jugador.sumaPuntos = 20;
    jugador.cartesAgafades = 2;
    jugador.plantat = true;

    jugador.noujoc();

    expect(jugador.mazo).toHaveLength(0);
    expect(jugador.sumaPuntos).toBe(0);
    expect(jugador.cartesAgafades).toBe(0);
    expect(jugador.plantat).toBe(false);
  });

  test('El jugador debe poder pedir una carta de la baraja', () => {
    const longitudAntes = jugador.mazo.length;
    jugador.demanarCarta(0);
    const longitudDespues = jugador.mazo.length;
    expect(longitudDespues).toBe(longitudAntes + 1);
  });

  test('El jugador debe poder calcular su puntuación', () => {
    jugador.mazo = [{palo: 'diamantes', valor: '7'},
      {palo: 'corazones', valor: 'rey'}, {palo: 'picas', valor: 'as'}];
    const puntuacion = jugador.calcularPuntuacio();
    expect(puntuacion).toBe(8.5);
  });
});


