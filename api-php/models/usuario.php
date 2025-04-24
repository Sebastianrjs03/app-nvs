<?php
require_once './config/database.php';

class Usuario
{
    public static function registrar($nombre, $segundoNombre, $apellido, $segundoApellido, $correo, $celular, $contrasena)
    {
        $conn = Database::conectar();
        $clave_hash = password_hash($contrasena, PASSWORD_DEFAULT);

        $sqlVerificar = "SELECT COUNT(*) FROM usuario WHERE correoUsuario = :correo";
        $stmt = $conn->prepare($sqlVerificar);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $existeCorreo = $stmt->fetchColumn();

        if ($existeCorreo > 0) {
            return 'correo_duplicado';
        }

        $sql = "INSERT INTO usuario (nombreUsuario, senombreUsuario, apellidoUsuario, 
        seapellidoUsuario, correoUsuario, celularUsuario, contrasenaUsuario, idRol) 
        VALUES (:nombreUsuario, :senombreUsuario, :apellidoUsuario, :seapellidoUsuario, 
        :correoUsuario, :celularUsuario, :contrasenaUsuario, :idRol)";
        $stmt = $conn->prepare($sql);
        return $stmt->execute([
            ':nombreUsuario' => $nombre,
            ':senombreUsuario' => $segundoNombre,
            ':apellidoUsuario' => $apellido,
            ':seapellidoUsuario' => $segundoApellido,
            ':correoUsuario' => $correo,
            ':celularUsuario' => $celular,
            ':contrasenaUsuario' => $clave_hash,
            ':idRol' => 1
        ]);
    }

    public static function login($correo, $contrasena)
    {
        $conn = Database::conectar();

        $stmt = $conn->prepare("SELECT * FROM usuario WHERE correoUsuario = :correo");
        $stmt->execute([':correo' => $correo]);

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($contrasena, $usuario['contrasenaUsuario'])) {

            return [
                'idUsuario' => $usuario['idUsuario'],
                'nombreUsuario' => $usuario['nombreUsuario'],
                'senombreUsuario' => $usuario['senombreUsuario'],
                'apellidoUsuario' => $usuario['apellidoUsuario'],
                'seapellidoUsuario' => $usuario['seapellidoUsuario'],
                'correoUsuario' => $usuario['correoUsuario'],
                'celularUsuario' => $usuario['celularUsuario'],
            ];
        }

        return false;
    }
}
