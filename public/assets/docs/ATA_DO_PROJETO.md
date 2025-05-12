# ATA do Projeto - Sistema de Avaliações (FeedBack - Page. Portfólio)

Alterações na página Portfolio.html - implementação;

## 1. Funcionalidade Implementada
Foi desenvolvido um sistema interativo para criação de feedbacks na página de avaliações, onde os usuários podem:
- Inserir avaliações através de prompts
- Receber cards estilizados automaticamente
- Ter uma experiência visual dinâmica com animações

## 2. Mecanismo de Funcionamento

### 2.1 Fluxo Principal
1. **Acionamento**:
   - Ativado pelo botão "Fazer uma avaliação" (`btn-avaliacao`)
   - Intercepta o clique padrão para exibir prompts sequenciais

2. **Coleta de Dados**:
   - Captura via `prompt()`:
     - Nome do avaliador
     - Título da mensagem
     - Nota (1-5 estrelas)
     - Mensagem completa

3. **Processamento Inteligente**:

   - Detecta gênero pelo nome (sufixos femininos)
   - Gera avatar aleatório correspondente
   - Formata data atual automaticamente

### 2.2 Geração Dinâmica
- **Card HTML**:
  ```javascript
  novoCard.innerHTML = `
    <div class="avaliacao-header">
      <img src="avatar-gerado" alt="${nome}">
      <h3>${nome}</h3>
      <p>${dataFormatada}</p>
    </div>
    ${estrelasHTML} 
    <p>${mensagem}</p>
  `;


### ____________________________________________________________________________________________________________________________________________________________

# ATA do Projeto - Sistema de Orçamento com Controle de Acesso

## 📋 Visão Geral
Sistema que controla acesso ao formulário de orçamento baseado no status de autenticação do usuário.

## 🔒 Estados do Formulário  (Bloqueado usando icon para deixar mais animado)

### 🚫 Estado: Usuário Não Logado (Código Chave);

```html
<div id="login-message" class="login-message">
  <span>✋ Atenção!</span>
  <p>Para enviar seu orçamento, você precisa 
    <a href="#" onclick="openLogin()" class="highlight-link">fazer login</a> 
    ou <a href="#" class="highlight-link" onclick="openRegister()">criar uma conta</a>.
  </p>
</div>

<form id="form-orcamento" class="disabled-form">
  <!-- Campos desabilitados -->
</form>

 - Todos os campos desabilitados > (disabled=true)

 - Mensagem de login visível

### 🔐 Estados do Formulário  (Aberto);

 <form id="form-orcamento">
  <!-- Campos habilitados -->
</form>


### 🛠️ Função updateLoginStatus()

function updateLoginStatus() {
  const formOrcamento = document.getElementById('form-orcamento');
  if (!formOrcamento) return;

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginMessage = document.getElementById('login-message');
  const formInputs = formOrcamento.querySelectorAll('input, select, textarea, button');

  if (isLoggedIn) {
    loginMessage.style.display = 'none';
    formOrcamento.classList.remove('disabled-form');
    formInputs.forEach(input => input.disabled = false);
  } else {
    loginMessage.style.display = 'block';
    formOrcamento.classList.add('disabled-form');
    formInputs.forEach(input => input.disabled = true);
  }
}

### 🎨 Estilos CSS Relevantes;

.disabled-form {
  opacity: 0.7;
  pointer-events: none;
}

.login-message {
  background: #ffebee;
  border-left: 4px solid #f44336;
  padding: 1rem;
  margin-bottom: 2rem;
}

.highlight-link {
  color: #4b1c76;
  font-weight: bold;
  text-decoration: underline;
}
 
 <!-- ESTRUTURA DO PROJETO  -->
  OBS: feito um arquivo no formato md para mostrar a estrutura do projeto;

backend
└── php
    ├── cadastro.php
    ├── conecta.php
    └── login.php
    └── login.php
    └── login.php
public
├── assets
│   ├── css
│   │   ├── pages
│   │   │   ├── avaliações.css
│   │   │   ├── index.css
│   │   │   ├── mobile.css
│   │   │   ├── orcamentoCliente.css
│   │   │   └── portfolio.css
│   │   └── style.css (@import - para importar todos estilos em único link)
|   |
|   |
│   ├── images
│   │   ├── Fundo-Black.webp
│   │   ├── Fundo-Black2.webp
│   │   ├── Fundo-Black3.webp
│   │   ├── Fundo-Black4.webp
│   │   ├── espaço.png
│   │   ├── favicon.png
│   │   ├── image.png
│   │   ├── instagram-icon.png
│   │   ├── logo.png
│   │   ├── tatuador.png
│   │   ├── video.mp4
│   │   └── whatsapp-icon.png
|   |
│   ├── js
│   │   ├── avaliacoes.js
│   │   ├── mobile.js
│   │   ├── orçamentoCliente.js
│   │   └── script.js
|   |
│   └── sass
│       ├── _mobile.scss
│       └── style.scss
|
├── avaliações.html
├── index.html
├── orçamentoCliente.html
└── portfolio.html

### LInks para consultas de como fazer - Portfolio
  <!-- https://www.w3schools.com/howto/howto_css_star_rating.asp -->
  <!-- https://www.w3schools.com/js/js_htmldom_nodes.asp --> Criar um novo elemento.

   RESUMINDO;

   Na página portfolio.html foi implementado btn-avaliacao para que quando o usuário clicar ele exibe um prompt com as seguintes informações para que gere um FEEDBACK; 
     - Nome do avaliador
     - Título da mensagem
     - Nota (1-5 estrelas)
     - Mensagem completa
     Feito preenchendo essas informações ele gera um Feedback.

     Na Pagina Orçamento.html todos os campos ficam desabilitados até o usuário fazer a sessão ou seja Login ao realizar o Login o formulario será liberado para o preenchimento.
