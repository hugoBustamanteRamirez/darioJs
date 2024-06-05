const express = require("express");
const app = express();
let resultCon;
require("mysql2");
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const path=require('path');


const { createProxyMiddleware } = require('http-proxy-middleware'); 

const session = require("express-session");
const connection = mysql.createConnection({
    host: 'itzitacuaro.edu.mx',
    user: 'tzitacu_equipo4', 
    password: 'itzitacu_equipo4', 
    database: 'YrB~?piU2r0=' 
  });
  
  app.use(session({
    secret: 'secret', // Añade un valor secreto aquí
    resave: false,
    saveUninitialized: true,
    
}));
/*  app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
    })
}));*/
  function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect("/auth/login");
    }
}

  
//app.use("/classes/*", verificarAutenticacion);


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/public", express.static(__dirname + "/public"));
app.use("/assets", express.static(__dirname + "/assets"));

app.post('/soap', (req, res) => {
  soap.listen(app, '/soap', service, wsdl);
});
//para auth
app.get("/", function(req, res){
    res.render("auth/login");
});

app.get("/auth/login", function(req, res){
    res.render("auth/login");
    
});

app.get("/auth/customer_register", function(req, res){
    
    res.render("auth/customer_register");
    
});

    app.post('/insert-product', (req, res) => {
        const { product_id, product_title, product_price, product_image, product_keywords } = req.body;

    const url = 'https://back.itzitacuaro.edu.mx/equipo4/tiendadarioJs/index.ejs?wsdl';
    const args = {
        product_id,
        product_title,
        product_price,
        product_image,
        product_keywords
    };

    soap.createClient(url, (err, client) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        client.insertProduct(args, (err, result) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.send(result);
        });
    });
});
app.get("/auth/formulario", function(req, res){

    res.render("auth/formulario");
    
});

app.post("/auth/formulario", (req, res) => {
  // Handle form data here
  const { product_id, product_title, product_price, product_image, product_keywords } = req.body;
  // Process the data and send a response
  res.send('Form received');
});
app.use('/php', createProxyMiddleware({
    target: 'http://localhost:3000', // Dirección de tu servidor PHP
    changeOrigin: true,
    pathRewrite: {
        '^/php': '', // Elimina el prefijo /php de la URL
    },
}));


// Ruta para cerrar sesión
app.get("/auth/logout", function(req, res){
    if (req.session) {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect("/auth/login");
            }
        });
    } else {
        res.redirect("/auth/login");
    }
});



app.get("/auth/index", function(req, res){
    res.render("auth/index");
});

app.get("/auth/crear-cuenta", function(req, res){
    res.render("auth/crear-cuenta");
});

app.post("/validarlogin", async function(req, res) {
    const datos = req.body;
    if (!datos.email_user || !datos.password_user) {
        return res.status(400).send("Faltan datos requeridos");
    }
    const email_user = datos.email_user;
    const password_user = datos.password_user;

    const existEmailQuery = "SELECT email_user, password_user,cve_user,nom_user FROM usuarios WHERE email_user = '"+email_user+"' LIMIT 1";

    connection.query(existEmailQuery, [email_user], async function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                const storedPasswordHash = results[0].password_user;
                try {
                    const passwordMatch = await bcrypt.compare(password_user, storedPasswordHash);
                    if (passwordMatch) {
                        const user = results[0];
                        resultCon = user.cve_user;
                        
                        const userName = user.nom_user;
                  
                        // Now you can use these variables outside the callback function
                        console.log("User ID:", resultCon);
                        console.log("User Name:", userName);
                        res.redirect("/auth/index");
                    } else {
                        res.send("Invalid email or password. Try again <a href='/auth/login'>here</a>");
                    }
                } catch (error) {
                    throw error;
                }
            } else {
                res.send("Invalid email or password. Try again <a href='/auth/login'>here</a>");
            }
        }
    });
});

app.get("/auth/all_products", function(req, res) {
    connection.query("SELECT * FROM products ", function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            res.render("auth/all_products", {  products: results });
        }
    });
});


// Ruta para obtener los datos de la tabla classes


//adquirir/index

app.post("/adquirir", function(req, res) {
    // Verificar si el usuario está autenticado
       const index = req.params.index;
        const cve_user =resultCon;
        const cve_class = req.body.cve_class;
        const metodo_pago = req.body.metodo_pago;

        console.log(metodo_pago);

       
        if (!metodo_pago) {
            return res.status(400).send("Select a pay-method");
        }
        else if(metodo_pago==="paypal"){ return res.send("<script>alert('This method is not available at this moment'); </script>");}
        else if(metodo_pago==="transfer"){ 

        const insertQuery = "INSERT INTO inscripciones (cve_user, cve_class, metodopago_ins) VALUES (?, ?, ?)";
        connection.query(insertQuery, [cve_user, cve_class, metodo_pago], function(error, results, fields) {
            if (error) {
              
                console.error(error);
                res.status(500).send("Error al procesar la solicitud");
            } else {
                res.send("<script>alert(' successfully!'); window.location.href='/adquirir/Tranferphoto';</script>");
            }
        
        });
    }
    else if(metodo_pago==="cash"){
        const insertQuery = "INSERT INTO inscripciones (cve_user, cve_class, metodopago_ins) VALUES (?, ?, ?)";
        connection.query(insertQuery, [cve_user, cve_class, metodo_pago], function(error, results, fields) {
            if (error) {
              
                console.error(error);
                res.status(500).send("Error al procesar la solicitud");
            } else {
                res.send("<script>alert(' successfully!'); window.location.href='/adquirir/Tranferphoto';</script>");
            }
        
        });
    }
    
});

app.get("/adquirir/index", function(req, res) {
    const cve_user = resultCon;
    const cve_class = req.body.cve_class;
    const metodo_pago = req.body.metodo_pago;
    connection.query("SELECT u.nom_user AS nombre_usuario, i.cve_user, c.nom_class AS nombre_clase,  c.tipoclass_class AS type,  c.price_class AS precio_clase, i.metodopago_ins AS metodo_pago FROM inscripciones i INNER JOIN usuarios u ON i.cve_user = u.cve_user INNER JOIN classes c ON i.cve_class = c.cve_class WHERE i.cve_user='" + resultCon + "'", function(error, results, fields) {
        if (error) {
            throw error;
        } else {
            res.render("adquirir/index", { inscripciones: results });
        }
    });
});

app.get("/adquirir/Tranferphoto",function(req,res){
    res.render("adquirir/Tranferphoto");

});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

