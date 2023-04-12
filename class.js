class Carta {
    static palos = ["oros", "copas", "espadas", "bastos"];
    static valores = ["as", "2", "3", "4", "5", "6", "7", "sota", "caballo", "rey"];

    constructor(palo, valor) {
        this.palo = palo;
        this.valor = valor;
    }
    get nombre(){
        return `${this.valor} de ${this.palo}`;
    }
}

class Baraja {
    constructor() {
        this.cartas = [];
        for (let palo of Carta.palos) {
            for (let valor of Carta.valores) {
                const carta = new Carta(palo, valor);
                this.cartas.push(carta);
            }
        }
    }
    shuffle() {
        this.cartas.sort(() => Math.random() - 0.5);
    }
}

export {Baraja}
