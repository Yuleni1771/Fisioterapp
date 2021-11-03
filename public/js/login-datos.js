const form = document.getElementById("login");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let usuario = document.getElementById("user").value;
  let contra = document.getElementById("pass").value;
  const info = {
    user: usuario,
    pass: contra,
  };
  let i;
  fetch('http://localhost:3000/loginFisio',{
    method:'POST',
    body : JSON.stringify(info),
    headers : {
      'Content-type':'application/json; charset=UTF-8'
    }
  }).then(response=>response.json())
  .then(json => {
    i = JSON.parse(json)
    if (i == 1) {
      alert("Bienvenido");
      window.location.href = "../HTML/Menu.html";
    } else {
      alert("Error datos no encontrados");
    }
  });

  
});
