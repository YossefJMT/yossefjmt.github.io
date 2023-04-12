import {Baraja} from "./class.js";

document.getElementById("iniciarjoc").addEventListener("click", empezar)
const divcartes = document.getElementsByClassName("cartes")
let importapostat = document.getElementById("import")
let importotal = document.getElementById("total")
const botoapostar = document.getElementById("apostar");
const botoparar = document.getElementById("parar")


$('#divjoc').hide()

function empezar() {
    console.log("iniciarjoc")
    botoapostar.disabled = true;
    botoparar.disabled = true;
    if (document.getElementById("totalinicial").value > 1){
        document.getElementById("total").value = document.getElementById("totalinicial").value
        $('#divinicial').fadeOut()
        setTimeout(() => {
            $('#divjoc').fadeIn()
        }, 1000)
    }else {
        setTimeout(() => {
            Swal.fire(
                'Entra un import!',
                'No has introduit el valor amb el qual vols començar!',
                'question'
            )        }, 200)
    }
}

const baraja = new Baraja();
console.log("Baraja ordenada: ")
console.log(baraja)

// funcio per barajar les cartes inicialment
baraja.shuffle();

console.log("baraja mezclada: ")
console.log(baraja)


importapostat.focus();
// apartat per apostar i posar la carta
botoapostar.addEventListener("click", apostar);
let torn = 0;
let sumatotaljugador=0.0;
function apostar() {

    if (parseInt(importapostat.value) <= parseInt(importotal.value)){
        document.getElementById("import").disabled = true
        if (torn <= 4){
            divcartes[5 + torn].innerHTML = baraja.cartas[torn].nombre
            divcartes[5 + torn].setAttribute("value", baraja.cartas[torn].valor)
            contadordecartes(baraja.cartas[torn], sumatotaljugador);
            torn = torn +1;
        }else {
            parar();
            jugarcropier();
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'L´import apostat supera el saldo total!',
        })
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
botoparar.addEventListener("click", parar)
function parar() {
    botoapostar.disabled = true;
    botoparar.disabled = true;
    botonuevojuego.disabled = false;
    importapostat.disabled = false;
    console.log("disabled")
    jugarcropier()
}

// nuevo juego
const botonuevojuego = document.getElementById("nuevojuego")
botonuevojuego.addEventListener("click", nuevojuego)


function nuevojuego() {
    if (parseInt(importapostat.value) > 0 && parseInt(importapostat.value) <= parseInt(importotal.value)){
        botoapostar.disabled = false;
        botoparar.disabled = false;
        botonuevojuego.disabled = true;
        importapostat.disabled = true;


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

        baraja.shuffle();
    }
    if (parseInt(importapostat.value) <= 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes introducir un valor valido!',
        })
    }
    if ( parseInt(importapostat.value) > parseInt(importotal.value)){
        console.log(importapostat.value+" > "+importotal.value)
        console.log(importotal.value)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes apostar mas del lo que tienes!',
        })
    }
}

// jugar cropies
let sumatotalcropier = 0.0
let torncropier = 0;

function jugarcropier() {
    console.log("torn del cropier")
    while(torncropier <= 4 && sumatotalcropier < 6){
        divcartes[torncropier].innerHTML = baraja.cartas[torn+torncropier].nombre
        divcartes[torncropier].setAttribute("value", baraja.cartas[torn+torncropier].valor)
        contadordecartes2(baraja.cartas[torn+torncropier]);
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
        Swal.fire({
            icon: 'error',
            title: 'VUELTA A EMPEZAR',
            text: 'HAS PERDIDO LA PARTIDA!',
        })
        reiniciarjoc();
    }
}

function reiniciarjoc() {
    document.getElementById("totalinicial").value = 0;
    $('#divjoc').fadeOut()
    setTimeout(() => {
        $('#divinicial').fadeIn()
    }, 1000)

    botoapostar.disabled = true;
    botoparar.disabled = true;
    botonuevojuego.disabled = false;

    importapostat.value = 0;
    importotal.value = 0;

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
    document.getElementById("sumajugador").innerHTML =  "La mano del jugador es de : " + sumatotaljugador;
    document.getElementById("sumacropier").innerHTML =  "La mano del cropier es de : " + sumatotalcropier;
}
