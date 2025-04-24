export const registrarUsuario = async (nombre, segundoNombre, apellido, segundoApellido, correo, celular, contrasena) => {
    try {
        const response = await fetch('http://192.168.1.5/api-php/index.php?ruta=registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                correo,
                celular,
                contrasena
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error de conexión:', error);
        return { error: 'Error no se pudo conectar con el servidor' };
    }

}

export const loginUsuario = async (correo, contrasena) => {
    try {
        const response = await fetch('http://192.168.1.5/api-php/index.php?ruta=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contrasena }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error de conexión:', error);
        return { error: 'Error no se pudo conectar con el servidor' };
    }
};