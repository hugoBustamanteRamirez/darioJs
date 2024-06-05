<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">

    <title>Insertar Producto</title>

    <link rel="stylesheet" href="Css/app.css">



</head>

<body>



<div class="container">

    <div class="form-container">

    <h2>Insertar Nuevo Producto jijija</h2>

    

    <?php

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        require_once "soap/etc/src/nusoap.php";



        // Obtener datos del formulario

        $product_id = $_POST['product_id'];

        $product_title = $_POST['product_title'];

        $product_price = $_POST['product_price'];

        $product_image = $_POST['product_image']; // Este valor viene del combo

        $product_keywords = $_POST['product_keywords'];



        // Crear cliente SOAP

        $cliente = new nusoap_client("https://back.itzitacuaro.edu.mx/equipo4/servidor.php?wsdl", false);

        $parametros = array(

            "product_id" => $product_id,

            "product_title" => $product_title,

            "product_price" => $product_price,

            "product_image" => $product_image,

            "product_keywords" => $product_keywords

        );

        $respuesta = $cliente->call("insertProduct", $parametros);



        // Manejo de errores SOAP

        $err = $cliente->getError();

        if ($err) {

            echo "<h2>Error</h2>" . $err;

        } else {

            echo "<h2>Respuesta del servidor</h2>" . $respuesta;

        }

    }

    ?>



    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

        <label for="product_id">ID:</label>

        <input type="number" id="product_id" name="product_id" required><br>



        <label for="product_title">Título:</label>

        <input type="text" id="product_title" name="product_title" required><br>

        

        <label for="product_price">Precio:</label>

        <input type="number" step="0.01" id="product_price" name="product_price" required><br>

        

        <label for="product_image">Imagen:</label>

        <select id="product_image" name="product_image" required>

            <option value="a1.jpg">img1.jpg</option>

            <option value="areo.jpg">img2.jpg</option>

            <option value="suit1.jpg">img3.jpg</option>

            <option value="suit2.jpg">img4.jpg</option>

            <option value="suit3.jpg">img3.jpg</option>

            <option value="tommy hilf1.jpg">img4.jpg</option>

            <option value="ucb1.jpg">img4.jpg</option>

        </select><br>

        

        <label for="product_keywords">Palabras clave:</label>

        <input type="text" id="product_keywords" name="product_keywords" required><br>

        

        <input type="submit" value="Insertar Producto">

    </form>

    </div>

</div>



</body>

</html>

