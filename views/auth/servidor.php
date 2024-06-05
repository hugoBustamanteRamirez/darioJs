<?php

require_once "soap/etc/src/nusoap.php";

$server = new soap_server();

$ns = "urn:claseServidorwsdl";

$server->configureWSDL("Mi Servidor Soap", $ns);
$server->schemaTargetrNamespace = $ns;


$server->register("MiFuncion", array("dato" => "xsd:string"), array("return" => "xsd:string"), $ns);

$server->register(
    "insertProduct",
    array(
        "product_id" => "xsd:int",
        "product_title" => "xsd:string",
        "product_price" => "xsd:float",
        "product_image" => "xsd:string",
        "product_keywords" => "xsd:string"
    ),
    array("return" => "xsd:string"),
    $ns,
    false,
    'rpc',
    'encoded',
    'Insertar un nuevo producto en la base de datos.'
);
function MiFuncion($dato)
{
    return "Hola desde el servidor remoto equipo 4" . $dato;
}

function insertProduct($product_id, $product_title, $product_price, $product_image, $product_keywords)
{
    $con = mysqli_connect("itzitacuaro.edu.mx", "itzitacu_equipo4", "YrB~?piU2r0=", "itzitacu_equipo4");
    if (mysqli_connect_errno()) {
        return "Failed to connect to MySQL: " . mysqli_connect_error();
    }


$product_cat = $product_id;
$product_brand = $product_id;
$product_desc = '<ul class="a-vertical a-spacing-none" style="box-sizing: border-box; color: #949494; padding: 0px; font-family: Arial, sans-serif; font-size: 13px; margin: 0px 0px 0px !important 18px;">
<li style="box-sizing: border-box; list-style: disc; word-wrap: break-word; margin: 0px;"><span class="a-list-item" style="box-sizing: border-box; color: #111111; word-wrap: break-word; display: block;">front having single button,two vents at back</span></li>
<li style="box-sizing: border-box; list-style: disc; word-wrap: break-word; margin: 0px;"><span class="a-list-item" style="box-sizing: border-box; color: #111111; word-wrap: break-word; display: block;">size:extra slim fit</span></li>
<li style="box-sizing: border-box; list-style: disc; word-wrap: break-word; margin: 0px;"><span class="a-list-item" style="box-sizing: border-box; color: #111111; word-wrap: break-word; display: block;">designed for party ,festive purpose</span></li>
<li style="box-sizing: border-box; list-style: disc; word-wrap: break-word; margin: 0px;"><span class="a-list-item" style="box-sizing: border-box; color: #111111; word-wrap: break-word; display: block;">fabric:RAYMOND cotton</span></li>
<li style="box-sizing: border-box; list-style: disc; word-wrap: break-word; margin: 0px;"><span class="a-list-item" style="box-sizing: border-box; color: #111111; word-wrap: break-word; display: block;">verify sizechart of BREGEO before placing order</span></li>
</ul>';


$stmt = $con->prepare("INSERT INTO products (product_id, product_cat, product_brand, product_title, product_price, product_desc, product_image, product_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    return "Error : " . $con->error;
}

$stmt->bind_param("iiisssss", $product_id, $product_cat, $product_brand, $product_title, $product_price, $product_desc, $product_image, $product_keywords);
if (!$stmt->execute()) {
    return "Error: " . $stmt->error;
}
$stmt->close();
$con->close();
return "Insert Exitoso.";
}


$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : "";
$server->service(file_get_contents("php://input"));
?>