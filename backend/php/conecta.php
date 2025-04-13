<?php
$servername = "localhost";
$username = "root";  
$password = "";  
$dbname = "conexao";  

// conexão

$conn = new mysqli($servername, $username, $password, $dbname);

// verifica a conexão

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>

