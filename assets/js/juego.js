(() => {
    'use strict'
    /**
 * 2C = Two of Clubs
 * 2C = Two of Diaminds
 * 2C = Two of Hearts
 * 2C = Two of Spades
 */

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    const puntosHTML = document.querySelectorAll('small');

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        deck = _.shuffle(deck);
        return deck;
    }

    let deckJuego = crearDeck();

    //Esta funcion me permite tomar una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw new Error('No hay cartas en el deck');
        }

        let carta = deckJuego.pop();
        return carta;
    }

    //Funcion da el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor == 'A') ? 11 : 10
            : valor * 1;
    }

    //Turno de la computadora

    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.classList.add('carta')
            imgCarta.src = `assets/cartas/${carta}.png`
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            }
            else if (puntosMinimos > 21) {
                alert('Computadora gana');
            }
            else if (puntosComputadora > 21) {
                alert('Jugador gana');
            }
            else {
                alert('Computadora gana');
            }
        }, 20);

    }

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;

        //<img class="carta" src="assets/cartas/2C.png" alt="carta"></img>
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta')
        imgCarta.src = `assets/cartas/${carta}.png`
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        else if (puntosJugador === 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})()

