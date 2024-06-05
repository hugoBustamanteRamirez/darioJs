const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  user: 'root', 
  password: 'root', 
  database: 'kaka' 
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
