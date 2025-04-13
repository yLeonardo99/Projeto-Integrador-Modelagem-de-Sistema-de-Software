


// Verifica o status de login ao carregar cada página

document.addEventListener('DOMContentLoaded', function () {
    updateLoginButtons();
});

// Função para atualizar os botões de login/logout

function updateLoginButtons() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginElements = document.querySelectorAll('#login-btn, .open-btn[onclick="openLogin()"]');
    const logoutElements = document.querySelectorAll('#logout-btn');

    // Atualiza todos os elementos de login

    loginElements.forEach(element => {
        element.style.display = isLoggedIn ? 'none' : 'block';
    });

    // Atualiza todos os elementos de logout
    logoutElements.forEach(element => {
        element.style.display = isLoggedIn ? 'block' : 'none';
    });
}

// Função de logout

function logout() {
    localStorage.removeItem('isLoggedIn');
    updateLoginButtons();
    window.location.href = 'index.html'; // Redireciona para a página inicial
}