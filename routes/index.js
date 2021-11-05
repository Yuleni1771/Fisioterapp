var express	= require('express');
var mysql	= require('mysql');
var db		= require('../lib/mysql.js');
var router	= express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', async function (req, res, next) {
	console.table( req.body );
	try{
		await db.loginFisio( req.body );
		res.status(204).send();
	}catch( err ){
		if( err.status == 404 )
			res.status( 404 ).send();
		else
			res.status( 500 ).send();
	}
});

router.get("/fisios", async (req, res) => {
	res.json( await db.fisios() );
});

//Muestra la información para los pacientes
router.get("/pacientes", async (req, res)=>{
	res.status(200).send( await db.pacientes() );
});

//Obtenemos a los fisioterapeutas
router.get("/fisioterapeutas", async (req, res) => {
	res.send( await db.fisioterapeutas() );
});

  //función de crear un nuevo fisioterapeuta
  router.post("/insertFisio", (req, res) => {
    //console.log(req.body);
    console.log(req.body);

    const {
      nombre,
      apPaterno,
      apMaterno,
      dir,
      contacto1,
      contacto2,
      puesto,
      user,
      pass,
    } = req.body;
    console.log("Info formateada: "+nombre, apPaterno, apMaterno, dir, contacto1, contacto2, puesto, user, pass);
    connection.query(
      "INSERT INTO fisioterapeuta  SET ?",
      {
        nombre,
        apPaterno,
        apMaterno,
        dir,
        contacto1,
        contacto2,
        puesto,
        user,
        pass,
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return  res.sendStatus(500);
        } else  return res.status(200).json({status: 'success', data:res.body});
      }
    );
  });
  //Función para el login [Obtener un registro ingresado]
  router.post("/loginFisio",(req, res)=>{
    console.log(req.body);
    const {user, pass} = req.body;
    //console.log(user+"Contraseña "+pass);
    connection.query("SELECT COUNT(*) as registro FROM fisioterapeuta WHERE user=? AND pass=?", [user, pass], (err, result)=>{
      if(err){
        console.log("error: "+err);
      }else{
        if(result[0].registro>0){
          //console.log("Se encontró el usuario: ", result);
          //Enconttramos el usuario, pasamos al index del usaurio
        res.status(200).send("1");
        }else{
          res.send("0");
        }
      }
    });
  });
  //Función para la creación de citas
  router.post("/insertCitas", (req, res)=>{
    const{nombrePaciente, apPpaciente, apMpaciente, fecha, hora} = req.body;
    //let fecha = new Date(req.body.fecha).toString;
    idEmpleado = Number(req.body.idEmpleado);
    idPaciente = Number(req.body.idPaciente);
    //comprobamos que el id del empleado exista
    connection.query("SELECT COUNT(*) as filas FROM fisioterapeuta WHERE idEmpleado=?", idEmpleado, 
    (err, rows)=>{
      if(err){
        console.log("Error: ",err);
      }else{
        //console.log(rows[0].filas);
        if(rows[0].filas>0){
          //Encontramos el empleado 
          console.log("Encontramos al empleado");
          connection.query("INSERT INTO citas SET ?", {nombrePaciente, apPpaciente, apMpaciente, fecha , hora, idEmpleado, idPaciente},
          (err, result)=>{
            if(err){
              console.log(err);
            }else{
              res.status(200).send("Cita creada");
            }
          });
        }else{
          console.log("No encontramos al empleado");
          res.send("ERROR");
        }
      }
    });
  });
  //
  router.post("/insertPaciente",(req,res)=>{
    console.log(req.body);
    const {
      nombre,
      edad,
      diagnostico,
      tratamiento
    } = req.body;
    console.log("Info format: "+nombre, edad, diagnostico, tratamiento);
    connection.query(
      "INSERT INTO paciente  SET ?",
      {
        nombre,
        edad,
        diagnostico,
        tratamiento
      },
      (err, result) => {
        if (err) {
          console.log(err);
          return  res.sendStatus(500);
        } else  return res.status(200).json({status: 'success', data:req.body});
      });

      //res.status(200).send("OK");
  });

module.exports = router;
