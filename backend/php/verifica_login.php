<?php
session_start();
include("conecta.php"); // Conexão com o banco

if (isset($_POST['email'], $_POST['senha'])) {
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha'];

    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = mysqli_query($conexao, $sql);

    if (mysqli_num_rows($result) == 1) {
        $usuario = mysqli_fetch_assoc($result);

        if (password_verify($senha, $usuario['senha'])) {
            $_SESSION['usuario'] = $usuario['email'];
            header("Location: ../orçamentoCliente.html");
            exit();
        } else {
            echo "<script>alert('Senha incorreta.'); window.history.back();</script>";
            exit();
        }
    } else {
        echo "<script>alert('Usuário não encontrado.'); window.history.back();</script>";
        exit();
    }
} else {
    echo "<script>alert('Dados incompletos.'); window.history.back();</script>";
    exit();
}
?>