import {Jugador} from "./class.js";
import {Baraja} from "./class.js";

document.getElementById("iniciarjoc").addEventListener("click", empezar)
let divcartesjugador = $("#divjugador").find(".cartes");
let divcartescropier = $("#divcropier").find(".cartes");
let importapostat = document.getElementById("import")
let importotal = document.getElementById("total")
const botoapostar = document.getElementById("apostar");
const botoparar = document.getElementById("parar")
const titulo = document.getElementById('explicacionH2');
const parrafo = document.getElementById('explicacionP');
const botonuevojuego = document.getElementById("nuevojuego")
const objectiu = 7.5

titulo.addEventListener('click', () => {
    if (parrafo.style.display === 'none') {
        parrafo.style.display = 'block';
    } else {
        parrafo.style.display = 'none';
    }
});

const baraja = new Baraja();
const jugador1 = new Jugador(baraja, 1);
const cropier = new Jugador(baraja, 2);


$('#divjoc').hide()
function empezar() {
    botoapostar.disabled = true;
    botoparar.disabled = true;
    if (document.getElementById("totalinicial").value > 1){
        document.getElementById("total").value = document.getElementById("totalinicial").value
        $('#divinicial').fadeOut()
        setTimeout(() => {
            $('#divjoc').fadeIn()
        }, 1000)
        jugador1.saldo = document.getElementById("totalinicial").value
        repartirDeNuevo();
    }else {
        setTimeout(() => {
            Swal.fire(
                'Entra un import!',
                'No has introduit el valor amb el qual vols començar!',
                'question'
            )        }, 200)
    }
}

function repartirDeNuevo(){
    baraja.shuffle();
    const divjugador = document.getElementById("divjugador");
    while (divjugador.firstChild) {
        divjugador.removeChild(divjugador.firstChild);
    }
    crearDivJugador()
    const divcropier = document.getElementById("divcropier");
    while (divcropier.firstChild) {
        divcropier.removeChild(divcropier.firstChild);
    }
    crearDivCropier()

    for (let i = 0; i < divcartesjugador.length; i++) {
        divcartesjugador[i].style.backgroundImage = "url(cards/revers.jpg)";
    }
    for (let i = 0; i < divcartescropier.length; i++) {
        divcartescropier[i].style.backgroundImage = "url(cards/revers.jpg)";
    }
    jugador1.sumaPuntos = 0;
    jugador1.mazo = [];
    jugador1.cartesAgafades =0 ;
    jugador1.plantat = false;

    cropier.sumaPuntos = 0;
    cropier.mazo = [];
    cropier.cartesAgafades = 0;

    botonuevojuego.disabled = false;
    botoapostar.disabled = true;
    botoparar.disabled = true;
}

botonuevojuego.addEventListener("click", nuevojuego)
function nuevojuego() {
    repartirDeNuevo();
    if (parseInt(importapostat.value) > 0 && parseInt(importapostat.value) <= parseInt(importotal.value)){
        botoapostar.disabled = false;
        botoparar.disabled = false;
        botonuevojuego.disabled = true;
        importapostat.disabled = true;

        mostrarCarta(jugador1, crearDivJugador())
    }
    else if (parseInt(importapostat.value) <= 0 || importapostat.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes introducir un valor valido!',
        })
    }
    else if ( parseInt(importapostat.value) > parseInt(importotal.value)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes apostar mas del lo que tienes!',
        })
    }
}
botoapostar.addEventListener("click", function(){
    mostrarCarta(jugador1, crearDivJugador())
})

botoparar.addEventListener("click", () =>{
    jugador1.plantat = true
    botoapostar.disabled = true;
    mostrarCarta(cropier, crearDivCropier())
})

function crearDivJugador() {
    var divnou = document.createElement('div');
    divnou.classList.add('cartes');

    document.querySelector('#divjugador').appendChild(divnou);
    divcartesjugador = $("#divjugador").find(".cartes");
    return divcartesjugador
}
function crearDivCropier() {
    var divnou = document.createElement('div');
    divnou.classList.add('cartes');

    document.querySelector('#divcropier').appendChild(divnou);
    divcartescropier = $("#divcropier").find(".cartes");

    numcartes = jugador1.cartesAgafades
    return divcartescropier
}

let numcartes = 0
function mostrarCarta(jugador, divcartes) {

    if (jugador1.calcularPuntuacio() <= objectiu || cropier.calcularPuntuacio() < 6){
        divcartes[jugador.cartesAgafades].classList.add("rotar");
        jugador.demanarCarta(jugador.cartesAgafades + numcartes)
        console.log(jugador.mazo[jugador.cartesAgafades].rutaimagen)
        setTimeout(()=>{
            divcartes[jugador.cartesAgafades].style.backgroundImage = `url(${jugador.mazo[jugador.cartesAgafades].rutaimagen})`
            jugador.cartesAgafades +=1;
        }, 1000)

        if (jugador.codi === 1){
            setTimeout(()=>{
                document.getElementById("sumajugador").innerHTML =  "La mano del jugador es de : " + jugador.calcularPuntuacio();
            }, 2000)
        }

        if(jugador.codi === 2) {
            setTimeout(()=>{
                document.getElementById("sumacropier").innerHTML =  "La mano del cropier es de : " + jugador.calcularPuntuacio();
            }, 2000)

        }
    }
    if (jugador1.calcularPuntuacio() > 7.5 || jugador1.plantat === true ){
        botoapostar.disabled = true;
        botoparar.disabled = true;

        if (cropier.calcularPuntuacio() < 6){
            setTimeout(( ()=>{
                mostrarCarta(cropier, crearDivCropier())
            }), 2000)
        } else{
            setTimeout(( ()=>{
                botonuevojuego.disabled = false ;
                importapostat.disabled = false ;
                recuento()
            }), 3000)
        }
    }
}

function recuento() {

    if (jugador1.sumaPuntos > objectiu && cropier.sumaPuntos > objectiu){
        if (jugador1.sumaPuntos <= cropier.sumaPuntos){
            importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
            jugador1.saldo = parseInt(importotal.value)
            Swal.fire(
                'Buen trabajo!',
                'Has ganado la apuesta!',
                'success'
            )

        } else {
            importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
            jugador1.saldo = parseInt(importotal.value)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Que mala suerte!',
            })
        }

    }else if(jugador1.sumaPuntos < objectiu && cropier.sumaPuntos < objectiu){
        if (jugador1.sumaPuntos >= cropier.sumaPuntos){
            importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
            jugador1.saldo = parseInt(importotal.value)
            Swal.fire(
                'Buen trabajo!',
                'Has ganado la apuesta!',
                'success'
            )

        } else {
            importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
            jugador1.saldo = parseInt(importotal.value)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Que mala suerte!',
            })
        }
    } else if (jugador1.sumaPuntos <= objectiu && cropier.sumaPuntos > objectiu){
        importotal.value = parseInt(importotal.value) + parseInt(importapostat.value);
        jugador1.saldo = parseInt(importotal.value)
        Swal.fire(
            'Buen trabajo!',
            'Has ganado la apuesta!',
            'success'
        )

    } else if (jugador1.sumaPuntos > objectiu && cropier.sumaPuntos <= objectiu){
        importotal.value = parseInt(importotal.value) - parseInt(importapostat.value);
        jugador1.saldo = parseInt(importotal.value)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Que mala suerte!',
        })
    }
    document.getElementById("sumajugador").innerHTML =  "La mano del jugador es de : " + jugador1.sumaPuntos;
    document.getElementById("sumacropier").innerHTML =  "La mano del cropier es de : " + cropier.sumaPuntos;
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
    jugador1.saldo=0

    repartirDeNuevo()
    document.getElementById("totalinicial").value = 0;
    $('#divjoc').fadeOut()
    setTimeout(() => {
        $('#divinicial').fadeIn()
    }, 1000)

    for (let div = 0; div < divcartes.length; div++) {
        divcartes[div].classList.remove("rotar");
    }
    document.getElementById("sumajugador").innerHTML =  "La mano del jugador es de : " + jugador1.sumaPuntos;
    document.getElementById("sumacropier").innerHTML =  "La mano del cropier es de : " + cropier.sumaPuntos;
}







