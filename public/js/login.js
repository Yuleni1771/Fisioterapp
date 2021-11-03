async function login() {
	xhr = await ajax({
		method:	"POST",
		url:	"/login",
		data:	{
			user: document.getElementById("usuario").value,
			pass: document.getElementById("contrasenna").value
		}
	});	
	switch(xhr.status){
		case 204:
			window.location = "/html/Menu.html";
		break;
		case 400:
			alert("Usuario o contraseña incorrecta");
		break;
		case 404:
			alert("Usuario no existe");
		break;
		case 500:
			alert("Problemas de servidor, intente más tarde");
		break;
		default:
			alert( xhr.status + " ??");
		break;
	}
}
