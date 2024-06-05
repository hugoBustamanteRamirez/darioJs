const express = require('express');
const mysql = require('mysql2');

const Usuario = express();

// Middleware para analizar datos del cuerpo de la solicitud
Usuario.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kakak'
});

// Manejador de ruta para la solicitud POST desde el formulario
Usuario.post('crear-cuenta', (req, res) => {
  const { nom_user, ap_user, am_user, email_user, password_user, telefono} = req.body;

  // Consulta SQL para insertar datos en la tabla de usuarios
  const sql = 'INSERT INTO usuarios (nom_user, ap_user, am_user, email_user, password_user, Telefono,admin) VALUES (?, ?, ?, ?, ?, ?,?)';
  const values = [nom_user, ap_user, am_user, email_user, password_user, telefono,0];

  // Ejecutar la consulta SQL
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar usuario:', err);
      res.status(500).send('Error al crear cuenta');
      return;
    }
    console.log('Usuario insertado correctamente');
    res.send('Cuenta creada exitosamente');
  });
});

// Iniciar el servidor en el puerto 3000
