const form = document.getElementById("registro");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //obtenemos los datos del formulario
  let nombre = document.getElementById("nombre").value;
  let apP = document.getElementById("apPat").value;
  let apM = document.getElementById("apMat").value;
  //Información de la direccion
  //creación de la cadena de la dirección
  let calle = document.getElementById("calle").value;
  let colonia = document.getElementById("col").value;
  let delDato = document.getElementById("del");
  //obtenemos el valor del select
  let del1 = delDato.value;
  //obtenemos el valor de la etiqueta del select
  let del2 = delDato.options[delDato.selectedIndex].text;
  let calle1 = document.getElementById("calle1").value;
  let calle2 = document.getElementById("calle2").value;
  //num ext, int y cp
  let numExt = document.getElementById("nExt").value;
  let numInt = document.getElementById("nInt").value;
  let cp = document.getElementById("cp").value;
  //concatenamos la información obtenida
  var direccion;
  if (calle1 && calle2) {
    direccion =
      calle +
      " Colonia: " +
      colonia +
      " Delegacion: " +
      del2 +
      " Entre " +
      calle1 +
      " y " +
      calle2 +
      " Num. exterior " +
      numExt +
      " Num. interior " +
      numInt +
      " CP: " +
      cp;
  } else if (calle1 && !calle2) {
    direccion =
      calle +
      " Colonia: " +
      colonia +
      " Delegacion: " +
      del2 +
      " Entre " +
      calle1 +
      " Num. exterior " +
      numExt +
      " Num. interior " +
      numInt +
      " CP: " +
      cp;
  } else if (!calle1 && !calle2) {
    direccion =
      calle +
      " Colonia: " +
      colonia +
      " Delegacion: " +
      del2 +
      " Num. exterior " +
      numExt +
      " Num. interior " +
      numInt +
      " CP: " +
      cp;
  }

  //En la base de datos poner el valor de al menos 200 para la dirección

  let puestoRef = document.getElementById("tipoPuesto");
  //valor a almacenar
  let puestoFinal = puestoRef.options[puestoRef.selectedIndex].text;
  //Obtención de los numeros de contacto
  let cont1 = document.getElementById("cont1").value;
  let cont2 = document.getElementById("cont2").value;
  //obtenemos las credenciales
  let user = document.getElementById("user").value;
  //Combrobamos los valores de la contraseña
  var contra;
  if (
    document.getElementById("pass").value ==
    document.getElementById("passComp").value
  ) {
    contra = document.getElementById("pass").value;
    //alert("Credenciales: "+user + " Contra: "+contra);
  } else {
    alert("Las contraseñas no coinciden");
    document.getElementById("pass").style();
  }
  const info = {
    nombre: nombre,
    apPaterno: apP,
    apMaterno: apM,
    dir: direccion,
    contacto1: cont1,
    contacto2: cont2,
    puesto: puestoFinal,
    user: user,
    pass: contra,
  };
  envioBack(info);
});

function envioBack(info) {
  console.log(info);
  // console.log("JSON STRINGIFY:\n"+JSON.stringify(info));
  fetch("http://localhost:3000/insertFisio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
    //body: JSON.stringify()
  })
    .then((response) => response.json())
    .then(console.log);
  alert("Usuario creado");
  window.location.href = "../HTML/Login.html";
}

/*
{
            nombre : info.nombre,
            apPaterno : info.apP,
            apMaterno : info.apM,
            dir : info.direccion,
            contacto1 : info.cont1,
            contacto2 : info.cont2,
            puesto : info.puestoFinal,
            user : info.user,
            pass : info.contra
        }
*/
/* fetch('http://localhost:3000/fisioterapeutas',
    {
        method:"POST",
        headers: {"Content-Type":"text/plain"}
        //body: JSON.stringify()
    }).then(response=>response.json()).then(console.log);*/
/*    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 alert(this.responseText);
             }
        };
        xhttp.open("POST", "http://localhost:3000/insertFisio", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(info));
    */
/*const accionEnvia = async()=>{
    //const url = "http://localhost:3000/insertFisio";
    const response = await fetch('http://localhost:3000/insertFisio',{
        method : 'POST',
        body : JSON.stringify(info),
        headers : {'Content-type':'application/x-www-form-urlencoded'}
    });
    const myJSON = await response.json();
    }*/
/*const data = info;
    const parametros = {
        headers : {"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},
        body : JSON.stringify(info),
        method : "POST",
        mode : "cors"
    };
    fetch(url, parametros)
    .then(function(response){
        if(response.ok){
            return response.json();
        }else{
            throw new Error("Error al alcanzar a la API: "+response.statusText);
        }
    }).then(function(data){
        alert(data.encoded);
    }).catch(function(error){
        alert("Error: "+error.message);
    });
    return true;*/
/*const httpPost = ("http://localhost:3000/insertFisio", info, callback, err=console.error) => {
        const request = new XMLHttpRequest();
        request.open('POST', "http://localhost:3000/insertFisio", true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.onload = () => callback(request.responseText);
        request.onerror = () => err(request);
        request.send(info);
    };*/
