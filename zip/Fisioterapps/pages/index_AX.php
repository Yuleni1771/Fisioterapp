<?php
    session_start();
    include("./configBD.php");
    include("./getPosts.php");

    $respAX = array();
    $contrasena = md5($contrasena);
    $sqlLogin = "SELECT * FROM fisioterapeuta WHERE idfisioterapeuta = '$idfisioterapeuta' AND contrasena = '$contrasena'";
    $resLogin = mysqli_query($conexion, $sqlLogin);
    $numFilasLogins = mysqli_num_rows($resLogin);

    if($numFilasLogin == 1){
        $infFisio = mysqli_fetch_row($resLogin);
        $respAX["val"] = 1;
        $respAX["msj"] = "<h5 class='center-align'>Hola $infFisio[1] $infFisio[2] $infFisio[3]. Bienvenido :)</h5>";
        $_SESSION["idfisioterapeuta"] = $infFisio[0];  
    }else{
        $respAX["val"] = 0;
        $respAX["msj"] = "<h5 class='center-align'>Error. Favor de intentarlo nuevamente</h5>";
    }

    echo json_encode($respAX);
?>