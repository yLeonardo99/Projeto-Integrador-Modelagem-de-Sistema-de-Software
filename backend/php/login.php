<?php
session_start();

$host = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'conexao';

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    if (empty($email) || empty($senha)) {
        die("Preencha todos os campos.");
    }

    $stmt = $conn->prepare("SELECT id, nome, email, senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();

        if (password_verify($senha, $usuario['senha'])) {
            $_SESSION['usuario'] = $usuario['email'];
            $stmt->close(); // <-- FECHA ANTES DO EXIT

            echo "<script>
localStorage.setItem('isLoggedIn', 'true');
// Força a atualização dos botões em todas as páginas
if (window.opener) {
    window.opener.postMessage('updateLoginStatus', '*');
}
window.location.href = '../../public/orçamentoCliente.html';
</script>";
            exit();
        } else {
            $stmt->close();
            echo "<script>alert('Senha incorreta.'); window.history.back();</script>";
            exit();
        }
    } else {
        $stmt->close();
        echo "<script>alert('Usuário não encontrado.'); window.history.back();</script>";
        exit();
    }
}

$conn->close();
