document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault();
});
async function login() {
	switch( await fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user: document.getElementById("user").value,
				pass: document.getElementById("pass").value
			})
	}).status ){
		case 204:
			window.location = "/html/Menu.html";
		break;
		case 401:
			alert("Contraseña incorrecta");
		break;
		case 404:
			alert("Usuario no existe");
		break;
		case 500:
			alert("Problemas de servidor, intente más tarde");
		break;
		default:
			alert( res.status + " ??");
		break;
	}
}
