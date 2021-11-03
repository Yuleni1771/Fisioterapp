<?php
	session_start();
	//session_destroy();
	$temp = $_REQUEST["nombreSesion"];
	unset($_SESSION[$temp]);
	header("location:../");
?>