var express	= require('express');
var db		= require('../lib/mysql.js');
var router	= express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
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
router.post("/insertFisio", async (req, res) => {
	console.log(req.body);
	try{
		res.status(200).json( await db.insertFisio( req.body ) );
	}catch(err){
		res.sendStatus(500);
	}
});

//Función para el login [Obtener un registro ingresado]
router.post("/loginFisio", async (req, res)=>{
	try{
		result = await db.loginFisio( req.body );
		res.status(200).send("1");
	}catch(err){
		res.send("0");
	}
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
