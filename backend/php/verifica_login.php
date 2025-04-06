<?php
session_start();
include("conecta.php"); // Conexão com o banco

// evita  se email/senha não vierem no POST
if (isset($_POST['email'], $_POST['senha'])) {
    // escapando os dados para evitar SQL 
    $email = mysqli_real_escape_string($conexao, $_POST['email']);
    $senha = $_POST['senha'];

    // consulta no banco
    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = mysqli_query($conexao, $sql);

    if (mysqli_num_rows($result) == 1) {
        $usuario = mysqli_fetch_assoc($result);

        // verifica a senha
        if (password_verify($senha, $usuario['senha'])) {
            $_SESSION['usuario'] = $usuario['email'];
            header("Location: ../orçamentoCliente.html");

            exit();
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
} else {
    echo "Dados incompletos.";
}
?>
