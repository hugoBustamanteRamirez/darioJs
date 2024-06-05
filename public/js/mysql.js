const mysql = require('mysql2')


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'kakak' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error ', err);
    return;
  }
  console.log('Algo bien');
});

connection.end((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err);
    return;
  }
  console.log('Conexión cerrada');
});
