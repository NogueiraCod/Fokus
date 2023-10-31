const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPause = document.querySelector('#start-pause');
const startPausebt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const pauseBT = document.querySelector('.app__card-primary-butto-icon')
const tempoReproduzido = document.querySelector('#timer');
musica.loop = true
let playMusic = new Audio('/sons/play.wav');
let pauseMusic = new Audio('/sons/pause.mp3')
let beepMusic = new Audio('/sons/beep.mp3')
let contagemMinutos = 1500;
let intervaloID = null;




musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    contagemMinutos = 1500;
    tempoTela()
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    contagemMinutos = 300;
    tempoTela()
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    contagemMinutos = 900;
    tempoTela()
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const decrementarTempo = () => {
    if (contagemMinutos <= 0){
        zerar();
        beepMusic.play();
        return;
       }
    contagemMinutos -= 1;
    tempoTela()
}

startPause.addEventListener('click', iniciarOuPausar) //botao principal

function iniciarOuPausar(){      //inicia daqui com o valor intervaloID no 5.
    if (intervaloID){ // se o intervaloID é tem valor faça isso, se não
        zerar();
        pauseMusic.play();
        return;
    }
    playMusic.play(); // faça isso...
    intervaloID = setInterval(decrementarTempo,1000) // chama o decrementar.
    startPausebt.textContent = "Pausar";
    pauseBT.setAttribute('src','/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloID);
    startPausebt.textContent = "Começar";
    pauseBT.setAttribute('src','/imagens/play_arrow.png');
    intervaloID = null;
}

function tempoTela(){
    const tempo = new Date(contagemMinutos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoReproduzido.innerHTML = `${tempoFormatado}`;
}
tempoTela()