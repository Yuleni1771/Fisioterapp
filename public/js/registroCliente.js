const form = document.getElementById("registrocliente");
form.addEventListener("submit", function(event){
    event.preventDefault();
    

    let nombre = document.getElementById("nombre").value;
    let apP = document.getElementById("apPat").value;
    let apM = document.getElementById("apMat").value;

    let nombreComp = nombre + " " + apP + " " + apM;

    let edad = document.getElementById("edad").value;
    
    let diag = document.getElementById("diag").value;
    let trat = document.getElementById("trat").value;
    

    const info = {
        nombre : nombreComp,
        edad : edad,
        diagnostico : diag,
        tratamiento : trat
    }
    envioBack(info);
});

function envioBack(info){
    console.log(info);

    fetch('http://localhost:3000/insertPaciente',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(info)
    }).then(response=>response.json()).then(console.log);
    alert("Praciente creado");
    window.location.href = "/html/Menu.html";
}
