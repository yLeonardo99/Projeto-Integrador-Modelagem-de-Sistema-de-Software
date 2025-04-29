/**
 * Verifica o status de login ao carregar cada página e atualiza os botões de login/logout
 * Também controla a exibição do formulário de orçamento com base no status de login
 */
document.addEventListener('DOMContentLoaded', function () {
    updateLoginButtons(); // Esta função ela é chamada em TODAS as páginas
    updateLoginStatus();  // Esta função só existe na página de orçamento
    setupTattooStyleSelector();
});

/**
 * Atualiza os botões de login/logout em TODAS as páginas
 * - Deve ser chamado em todas as páginas (index.html, portfolio.html, avaliações.html)
 */
function updateLoginButtons() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginElements = document.querySelectorAll('#login-btn, .open-btn[onclick="openLogin()"]');
    const logoutElements = document.querySelectorAll('#logout-btn');

    loginElements.forEach(element => {
        element.style.display = isLoggedIn ? 'none' : 'block';
    });

    logoutElements.forEach(element => {
        element.style.display = isLoggedIn ? 'block' : 'none';
    });
}

/**
 * Atualiza o status de login e controla o formulário de orçamento
 * - Esta função é específica para a página de orçamento (orçamentoCliente.html)
 */
function updateLoginStatus() {
    // Verifica se estamos na página de orçamento
    const formOrcamento = document.getElementById('form-orcamento');
    if (!formOrcamento) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginMessage = document.getElementById('login-message');
    const formInputs = formOrcamento.querySelectorAll('input, select, textarea, button');

    formOrcamento.style.display = 'block';

    if (isLoggedIn) {
        if (loginMessage) loginMessage.style.display = 'none';
        formOrcamento.classList.remove('disabled-form');
        formInputs.forEach(input => {
            input.disabled = false;
        });
    } else {
        if (loginMessage) loginMessage.style.display = 'block';
        formOrcamento.classList.add('disabled-form');
        formInputs.forEach(input => {
            input.disabled = true;
        });
    }
}

/**
 * Realiza o logout do usuário em TODAS as páginas
 */
function logout() {
    localStorage.removeItem('isLoggedIn');
    updateLoginButtons(); // Atualiza os botões antes de redirecionar
    window.location.href = 'index.html';
}

/**
 * Abre o modal de cadastro (comum a todas as páginas)
 */

function openRegister() {
    const container = document.querySelector('.container-principal');
    const formularioLogin = document.querySelector('.formulario.login');
    const formularioCadastro = document.querySelector('.formulario.cadastro');

    if (container) container.style.display = 'block';
    if (formularioLogin) formularioLogin.style.display = 'none';
    if (formularioCadastro) formularioCadastro.style.display = 'block';
}

/**
 * Abre o modal de login (comum a todas as páginas)
 */

function openLogin() {
    const container = document.querySelector('.container-principal');
    const formularioLogin = document.querySelector('.formulario.login');
    const formularioCadastro = document.querySelector('.formulario.cadastro');

    if (container) container.style.display = 'block';
    if (formularioLogin) formularioLogin.style.display = 'block';
    if (formularioCadastro) formularioCadastro.style.display = 'block';
}
