// Contador de dias
const dataInicio = new Date('2025-09-01T00:00:00');

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataInicio;
    
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);
    
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas-minutos').textContent = 
        `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

atualizarContador();
setInterval(atualizarContador, 1000);

// Animações
window.addEventListener('load', () => {
    const numeroDias = document.getElementById('dias');
    let contador = 0;
    const diasFinais = Math.floor((new Date() - dataInicio) / (1000 * 60 * 60 * 24));
    
    const animarContador = () => {
        if (contador <= diasFinais) {
            numeroDias.textContent = contador;
            contador++;
            setTimeout(animarContador, 50);
        }
    };
    
    setTimeout(animarContador, 500);
    
    const textosAnimados = document.querySelectorAll('.texto-animado');
    textosAnimados.forEach((texto, index) => {
        texto.style.opacity = '0';
        texto.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            texto.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            texto.style.opacity = '1';
            texto.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});

// Efeito de brilho
function efeitoBrilho() {
    const textos = document.querySelectorAll('.texto-animado');
    const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
    
    textoAleatorio.classList.add('brilho-ativo');
    setTimeout(() => {
        textoAleatorio.classList.remove('brilho-ativo');
    }, 1500);
}

setInterval(efeitoBrilho, 3000 + Math.random() * 5000);

// Controle de música
const audioPlayer = document.getElementById('background-music');
const playBtn = document.getElementById('btn-play');
const playIcon = document.getElementById('play-icon');
const volumeSlider = document.getElementById('volume-slider');

let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    } else {
        audioPlayer.play().catch(e => {
            console.log("Clique novamente para tocar a música");
        });
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value / 100;
});

// Player arrastável
const miniPlayer = document.getElementById('mini-player');
let isDragging = false;
let offsetX, offsetY;

miniPlayer.addEventListener('mousedown', startDrag);
miniPlayer.addEventListener('touchstart', startDrag);

function startDrag(e) {
    isDragging = true;
    const rect = miniPlayer.getBoundingClientRect();
    
    if (e.type === 'mousedown') {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    } else {
        const touch = e.touches[0];
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDrag);
    }
}

function onDrag(e) {
    if (!isDragging) return;
    
    let clientX, clientY;
    if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    
    const x = clientX - offsetX;
    const y = clientY - offsetY;
    
    const maxX = window.innerWidth - miniPlayer.offsetWidth;
    const maxY = window.innerHeight - miniPlayer.offsetHeight;
    
    miniPlayer.style.left = Math.min(Math.max(0, x), maxX) + 'px';
    miniPlayer.style.top = Math.min(Math.max(0, y), maxY) + 'px';
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
}