document.getElementById("iniciarjoc").addEventListener("click", empezar)
$('#divjoc').hide()

function empezar() {
    console.log("iniciarjoc")
    if (document.getElementById("totalinicial").value > 1){
        document.getElementById("total").value = document.getElementById("totalinicial").value
        $('#divinicial').fadeOut()
        setTimeout(() => {
            $('#divjoc').fadeIn()
        }, 1000)
    }else {
        setTimeout(() => {
            window.alert("Introduzca el importe con el que deseas empezar")
        }, 2000)
    }
}



// creacio de baraja
const palos = ["oros", "copas", "espadas", "bastos"];
const valores = ["as", "2", "3", "4", "5", "6", "7", "sota", "caballo", "rey"];
const baraja = [];
// bucle per crear les cartes i afegirles
for (let palo of palos) {
    for (let valor of valores) {
        const nombre = `${valor} de ${palo}`;
        const carta = {
            palo,
            valor,
            nombre
        };
        baraja.push(carta);
    }
}
console.log(baraja)



// funcio per barajar les cartes
function mezclarcartas() {
    return Math.random() - 0.5;
}
baraja.sort(mezclarcartas);
console.log(baraja)

const divcartes = document.getElementsByClassName("cartes")
let importapostat = document.getElementById("import")
let importotal = document.getElementById("total")
importapostat.focus();
// apartat per apostar i posar la carta
const botoapostar = document.getElementById("apostar");
botoapostar.addEventListener("click", apostar);
let torn = 0;
let sumatotaljugador=0.0;
function apostar() {

    if (parseInt(importapostat.value) <= parseInt(importotal.value)){
        document.getElementById("import").disabled = true
        if (torn <= 4){
            divcartes[5 + torn].innerHTML = baraja[torn].nombre
            divcartes[5 + torn].setAttribute("value", baraja[torn].valor)
            contadordecartes(baraja[torn], sumatotaljugador);
            torn = torn +1;
        }else {
            parar();
            jugarcropier();
        }
    }else{
        window.alert("L'import apostat supera el saldo total")
    }
    console.log();
}

// comprueba constantment cuant porta, ho sigui la suma dels valors
function contadordecartes(carta) {
    if (carta.valor === "as") {
        sumatotaljugador = sumatotaljugador + 1;
    } else if (carta.valor === "sota" || carta.valor === "caballo" || carta.valor === "rey") {
        sumatotaljugador = sumatotaljugador + 0.5;
    } else {
        sumatotaljugador = sumatotaljugador + parseFloat(carta.valor);
    }
    console.log(sumatotaljugador);
}
function contadordecartes2(carta) {
    if (carta.valor === "as") {
        sumatotalcropier = sumatotalcropier + 1;
    } else if (carta.valor === "sota" || carta.valor === "caballo" || carta.valor === "rey") {
        sumatotalcropier = sumatotalcropier + 0.5;
    } else {
        sumatotalcropier = sumatotalcropier + parseFloat(carta.valor);
    }
    console.log(sumatotalcropier);
}

// parar
const botoparar = document.getElementById("parar")
botoparar.addEventListener("click", parar)
function parar() {
    botoapostar.disabled = true;
    botoparar.disabled = true;
    console.log("disabled")
    jugarcropier()
}

// nuevo juego
const botonuevojuego = document.getElementById("nuevojuego")
botonuevojuego.addEventListener("click", nuevojuego)
function nuevojuego() {
    botoapostar.disabled = false;
    botoparar.disabled = false;
    let importapostat = document.getElementById("import")
    botoapostar.disabled = false;
    importapostat.disabled = false;

    for (let div = 0; div < divcartes.length; div++){
        divcartes[div].innerHTML = "";
        divcartes[div].setAttribute("value", " " );
        divcartes[div].classList.add("rotar");
        setInterval(function() {
            divcartes[div].classList.remove("rotar");
        }, 2000)    }
    sumatotaljugador = 0;
    sumatotalcropier = 0;
    torn = 0;
    torncropier = 0;
    torn = 0;

    baraja.sort(mezclarcartas);
}




// jugar cropies
let sumatotalcropier = 0.0
let torncropier = 0;

function jugarcropier() {
    console.log("torn del cropier")
    while(torncropier <= 4 && sumatotalcropier < 6){
        divcartes[torncropier].innerHTML = baraja[torn + torncropier].nombre
        divcartes[torncropier].setAttribute("value", baraja[torn+torncropier].valor)
        contadordecartes2(baraja[torn+torncropier]);
        torncropier = torncropier +1;
    }
    recuento();
}

//partida acabada
function recuento() {
const marca = 7.5

    if (sumatotaljugador > marca && sumatotalcropier > marca){
        if (sumatotaljugador <= sumatotalcropier){
            importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
        } else {
            importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
        }
    }else if(sumatotaljugador < marca && sumatotalcropier < marca){
        if (sumatotaljugador >= sumatotalcropier){
            importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
        } else {
            importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
        }
    } else if (sumatotaljugador <= marca && sumatotalcropier > marca){
        importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
    } else if (sumatotaljugador > marca && sumatotalcropier <= marca){
        importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
    }
    document.getElementById("sumajugador").innerHTML =  "La mano del jugador es de : " + sumatotaljugador;
    document.getElementById("sumacropier").innerHTML =  "La mano del cropier es de : " + sumatotalcropier;
    if (parseInt(importotal.value) == 0){
        setTimeout(() => {
            window.alert("lo has perdido todo, vuelta a empezar")
        }, 500)
        document.getElementById("totalinicial").value = 0;
        $('#divjoc').fadeOut()
        setTimeout(() => {
            $('#divinicial').fadeIn()
        }, 1000)
        nuevojuego();
        empezar()
    }
}

