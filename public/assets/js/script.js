// Funções para manipulação de pop-ups
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
    document.body.style.overflow = "auto";
}

function switchPopup() {
    closePopup('loginPopup');
    openPopup('cadastroPopup');
}

function switchToLogin() {
    closePopup('cadastroPopup');
    openPopup('loginPopup');
}

// Fechar pop-ups
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-btn')) {
        const popup = event.target.closest('.popup-container');
        closePopup(popup.id);
    }
});

// Efeito Parallax simplificado com apenas 2 imagens
window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Alterna entre as duas imagens na metade da página
    if (scrollPosition < windowHeight * 0.75) {
        document.getElementById('parallax-bg2').style.opacity = '1';
        document.getElementById('parallax-bg4').style.opacity = '0';
    } else {
        document.getElementById('parallax-bg2').style.opacity = '0';
        document.getElementById('parallax-bg4').style.opacity = '1';
    }

    // Efeito parallax
    document.getElementById('parallax-bg2').style.transform = `translateY(${scrollPosition * 0.4}px)`;
    document.getElementById('parallax-bg4').style.transform = `translateY(${scrollPosition * 0.6}px)`;

    // Efeito no header
    document.querySelector('header').classList.toggle('scrolled', scrollPosition > 100);
});

// Controle do vídeo de fundo
function setupVideo() {
    const video = document.getElementById('header-video');
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.play().catch(e => {
        document.addEventListener('click', () => video.play(), { once: true });
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });
}

// Scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    setupVideo();
    setupSmoothScroll();
});