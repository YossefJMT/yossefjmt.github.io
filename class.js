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

    get rutaimagen(){
        let numero = this.valor

        if (this.valor === "as"){
            numero = 1
        } else if(this.valor === "sota" ){
            numero = 10
        }else if(this.valor === "caballo" ){
            numero = 11
        }else if(this.valor === "rey" ){
            numero = 12
        }

        return `cards/${this.palo}_${numero}.jpg`
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

    donarCarta(cartatriada){
        console.log(this.cartas[cartatriada])
        return this.cartas[cartatriada]
    }
}


class Jugador {
    constructor(baraja, id) {
        this.codi = id;
        this.baraja = baraja;
        this.sumaPuntos = 0;
        this.mazo = [];
        this.cartesAgafades = 0
        this.plantat = false
        this.saldo = 0;
    }

    demanarCarta(cartesAgafades) {
        const carta = this.baraja.donarCarta(cartesAgafades);
        this.mazo.push(carta);
        console.log(carta)
    }

    calcularPuntuacio() {
        let puntos = 0;
        for (let carta of this.mazo) {
            if (carta.valor === "as") {
                puntos += 1;
            } else if (["sota", "caballo", "rey"].includes(carta.valor)) {
                puntos += 0.5;
            } else {
                puntos += parseInt(carta.valor);
            }
        }
        this.sumaPuntos = puntos;
        return this.sumaPuntos;
    }
}



export {Jugador}
export {Baraja}
