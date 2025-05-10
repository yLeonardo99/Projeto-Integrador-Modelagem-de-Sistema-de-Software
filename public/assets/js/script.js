/* ---------------------------------------------------------LOGIN / CADASTRO  ------------------------------------------------ */

function openLogin() {
    const container = document.querySelector('.container-principal');
    container.style.display = 'flex';
    container.classList.remove('ativo');
    document.body.style.overflow = 'hidden';
}

function closeLogin() {
    const container = document.querySelector('.container-principal');
    container.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('.close-btn').addEventListener('click', closeLogin);

    document.querySelector('.container-principal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeLogin();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('link-cadastro')) {
            e.preventDefault();
            document.querySelector('.container-principal').classList.add('ativo');
        }

        if (e.target.classList.contains('link-login')) {
            e.preventDefault();
            document.querySelector('.container-principal').classList.remove('ativo');
        }
    });
});

// Vizualizar senha

document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.closest('.campo-input').querySelector('.password-input');
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else {
                input.type = 'password';
                this.textContent = '👁️';
            }
        });
    });
});

/************************************************************************************************************************/

/* ----------------------------------------------------------- HOME ------------------------------------------------------- */


// Efeito Parallax com apenas 2 imagens no fundo(Para ativar as demais habilite no CSS e HTML)

window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollPosition < windowHeight * 0.75) {
        document.getElementById('parallax-bg2').style.opacity = '1';
        document.getElementById('parallax-bg4').style.opacity = '0';
    } else {
        document.getElementById('parallax-bg2').style.opacity = '0';
        document.getElementById('parallax-bg4').style.opacity = '1';
    }

    document.getElementById('parallax-bg2').style.transform = `translateY(${scrollPosition * 0.4}px)`;
    document.getElementById('parallax-bg4').style.transform = `translateY(${scrollPosition * 0.6}px)`;

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

/************************************************************************************************************************/

/* ----------------------------------------------------------- PORTFÓLIO -------------------------------------------------------*/

dodocument.addEventListener('DOMContentLoaded', function () {
    const animateOnScroll = function () {
        const styleContainers = document.querySelectorAll('.style-container');

        styleContainers.forEach(container => {
            const containerPosition = container.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (containerPosition < screenPosition) {
                if (container.classList.contains('reverse')) {
                    container.classList.add('animate__fadeInRight');
                } else {
                    container.classList.add('animate__fadeInLeft');
                }
                container.style.opacity = '1';
            }
        });

        // Animar itens da galeria

        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (itemPosition < screenPosition) {
                // Delay para animação em cascata
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('animate__zoomIn');
            }
        });
    };

    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);

    // Modal de zoom

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    const closeModal = document.querySelector('.close-modal');

    zoomButtons.forEach(button => {
        button.addEventListener('click', function () {
            const container = this.closest('.style-container') || this.closest('.gallery-item').parentElement;
            const imgSrc = container.querySelector('img').src;
            const imgAlt = container.querySelector('img').alt;
            const title = container.querySelector('h3') ? container.querySelector('h3').textContent : 'Tatuagem';

            modal.style.display = 'block';
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            captionText.innerHTML = `<strong>${title}</strong> - ${imgAlt}`;
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        const parallaxBg1 = document.getElementById('parallax-bg1');
        const parallaxBg2 = document.getElementById('parallax-bg2');
        const parallaxBg4 = document.getElementById('parallax-bg4');

        parallaxBg1.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        parallaxBg2.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        parallaxBg4.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

/***********************************************************************************************************************/

/* ---------------------------------------------------------- ORÇAMENTO CLIENTE --------------------------------------------------*/

// Mostrar campo "Outro" quando selecionado

document.getElementById('estilo-tatuagem').addEventListener('change', function () {
    const outroContainer = document.getElementById('outro-estilo-container');
    outroContainer.style.display = this.value === 'outro' ? 'block' : 'none';

    if (this.value === 'outro') {
        document.getElementById('outro-estilo').setAttribute('required', 'required');
    } else {
        document.getElementById('outro-estilo').removeAttribute('required');
    }
});

// Envio do formulário

document.getElementById('form-orcamento').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validação 

    const inputs = document.querySelectorAll('#form-orcamento [required]');
    let valido = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.style.borderColor = "#ff6b6b";
            valido = false;
        } else {
            input.style.borderColor = "#4b1c76";
        }
    });

    if (!valido) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    alert("Solicitação enviada com sucesso! Entraremos em contato em até 48 horas.");
    this.reset();
    document.getElementById('outro-estilo-container').style.display = 'none';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/***********************************************************************************************************************/

/* ---------------------------------------------------------- AVALIAÇÃO CLIENTE -------------------------------------------------*/

// Animação dos cards 

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.avaliacao-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
});

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

/* --------------------------------------------------------- ANUNCIO PARA USUARIO / FAZER UM CADASTRO  --------------------------------------------------------------------------------------------------*/

function openRegister() {
    const container = document.querySelector('.container-principal');
    container.style.display = 'flex';
    container.classList.add('ativo');
}

// Verificar se o usuário está logado (simulação)

function checkLoggedIn() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const orcamentoBtn = document.getElementById('orcamento-btn');

    if (isLoggedIn) {
        orcamentoBtn.style.display = 'inline-block';
    } else {
        orcamentoBtn.style.display = 'none';
    }
}

// Chamar a função quando a página carregar

window.addEventListener('load', checkLoggedIn);

document.querySelector('.formulario.login form').addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    checkLoggedIn();

    window.location.href = 'orçamentoCliente.html';
});
