// Função para abrir um pop-up
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
}

// Função para fechar um pop-up
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Alternar entre login e cadastro
function switchPopup() {
    closePopup('loginPopup');  // Fecha o login
    openPopup('cadastroPopup'); // Abre o cadastro
}

// Alternar de cadastro para login
function switchToLogin() {
    closePopup('cadastroPopup'); // Fecha o cadastro
    openPopup('loginPopup');  // Abre o login
}


// Fechar ao clicar fora do pop-up
window.onclick = function(event) {
    let loginPopup = document.getElementById("loginPopup");
    let cadastroPopup = document.getElementById("cadastroPopup");
    
    if (event.target == loginPopup) {
        loginPopup.style.display = "none";
    }
    if (event.target == cadastroPopup) {
        cadastroPopup.style.display = "none";
    }
}


