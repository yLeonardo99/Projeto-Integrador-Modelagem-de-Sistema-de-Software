document.addEventListener('DOMContentLoaded', function () {
    const btnAvaliacao = document.querySelector('.btn-avaliacao');

    if (btnAvaliacao) {
        btnAvaliacao.addEventListener('click', function (e) {
            e.preventDefault();
            criarAvaliacao();
        });
    }

    function isNomeFeminino(nome) {
        if (!nome) return false;
        
        // Converter para minúsculas para comparação

        const nomeLower = nome.toLowerCase();
        
        const sufixosFemininos = ['a', 'e', 'i', 'da', 'na', 'ra', 'la', 'ta', 'ca', 'ah', 'ah'];
        
        // Verificar se o nome termina com algum dos sufixos femininos

        return sufixosFemininos.some(sufixo => nomeLower.endsWith(sufixo));
    }

    function criarAvaliacao() {

        // Pede as informações para o usuário

        const nome = prompt("Digite seu nome:");
        if (!nome) return; // Se o usuário cancelar, não continua

        const titulo = prompt("Digite o título da sua mensagem:");
        if (!titulo) return;

        let estrelas;
        while (true) {
            estrelas = prompt("Sua avaliação de estrelas (1 a 5, sendo 1 ruim e 5 excelente):");
            if (!estrelas) return;

            estrelas = parseInt(estrelas);
            if (estrelas >= 1 && estrelas <= 5) break;

            alert("Por favor, digite um número entre 1 e 5.");
        }

        const mensagem = prompt("Digite sua mensagem de avaliação:");
        if (!mensagem) return;

        // Cria o novo card de avaliação

        const novoCard = document.createElement('div');
        novoCard.className = 'avaliacao-card';
        novoCard.style.opacity = '0';
        novoCard.style.transform = 'translateY(30px)';

        // Determinar o gênero com base no nome

        const genero = isNomeFeminino(nome) ? 'women' : 'men';
        const randomId = Math.floor(Math.random() * 100);

        // Formata a data atual

        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        // Cria as estrelas

        let estrelasHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= estrelas) {
                estrelasHTML += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= estrelas) {
                estrelasHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                estrelasHTML += '<i class="far fa-star"></i>';
            }
        }

        // Monta o HTML do card

        novoCard.innerHTML = `
            <div class="avaliacao-header">
                <img src="https://randomuser.me/api/portraits/${genero}/${randomId}.jpg" alt="${nome}" class="avaliacao-avatar">
                <div class="avaliacao-info">
                    <h3 class="avaliacao-nome">${nome}</h3>
                    <p class="avaliacao-data">${dataFormatada}</p>
                </div>
            </div>
            <div class="avaliacao-estrelas">
                ${estrelasHTML}
            </div>
            <p class="avaliacao-texto">${mensagem}</p>
            <p class="avaliacao-tatuagem"><i class="fas fa-tint"></i> ${titulo}</p>
        `;

        // Adiciona o card ao grid

        const grid = document.querySelector('.avaliacoes-grid');
        if (grid) {
            grid.appendChild(novoCard);

            // Animação de entrada

            setTimeout(() => {
                novoCard.style.opacity = '1';
                novoCard.style.transform = 'translateY(0)';
                novoCard.style.transition = 'all 0.8s ease';
            }, 100);
        }

        console.log(`Nova avaliação criada: ${nome}, ${estrelas} estrelas, "${mensagem}"`);
    }
});