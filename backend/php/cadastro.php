<?php
// iNFORMAÇÕES DO BANCO DE DADOS

$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'conexao';

$conn = new mysqli($host, $usuario, $senha, $banco);

// conexão com o banco

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// formulário foi enviado

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Pegando os dados do formulário

    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmar_senha = $_POST['confirmar_senha'] ?? '';

    //  se todos os campos foram preenchidos

    if (empty($nome) || empty($email) || empty($senha) || empty($confirmar_senha)) {
        die("Preencha todos os campos.");
    }

    // Verifica se as senhas são iguais

    if ($senha !== $confirmar_senha) {
        die("As senhas não conferem.");
    }

    // Criptografar a senha

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Verifica se o e-mail já está cadastrado

    $verifica_email = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $verifica_email->bind_param("s", $email);
    $verifica_email->execute();
    $verifica_email->store_result();

    if ($verifica_email->num_rows > 0) {
        die("Este e-mail já está cadastrado.");
    }

    $verifica_email->close();

    // Inserir no banco 

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $senha_hash);

    // caixinha pra confirmar que foi cadastrado

    if ($stmt->execute()) {
        echo "<!DOCTYPE html>
        <html>
        <head>
        <meta charset='UTF-8'><title>Cadastro</title></head>
        <body>
        <script>
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../../public/index.html';
        </script>
        </body>
        </html>";
        exit();
    }
}

$conn->close();
