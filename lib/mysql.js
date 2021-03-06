const mysql = require("mysql");

var driver = {};

const connection = mysql.createConnection({
  //Aquí pongan los datos de su base de datos
  host: "localhost",
  user: "fisiotera",
  password: "fisiopass01",
  database: "proyectoAdmin"
});

driver.fisios = ({}) => { return new Promise( (resolve, reject) => {
//  res.json({ mensaje: "bienvenido" });
	return resolve({ mensaje: "bienvenido"});
});}

driver.pacientes = ({}) => { return new Promise( (resolve, reject) => {
	//Obtenemos los datos de los pacientes para manejar un select con los datos de los pacientes
	connection.query("Select idPaciente, nombre from paciente", (err, result)=>{
		for(let i = 0; i<result.length; i++){
		  console.log("id: "+result[i].idPaciente+" nombre:"+result[i].nombre);
		  resolve(result[i].idPaciente+":"+result[i].nombre);
		}
	});
});}

//Obtenemos a los fisioterapeutas
driver.fisioterapeutas = ({}) => { return new Promise( (resolve, reject) => {
  connection.query("Select * from fisioterapeuta", (err, result) => {
    if (err) {
      console.log("error: " + err);
      //return null;
    } else {
      console.log("fisioterapeutas: ", result);
      resolve(JSON.stringify(result));
    }
  });
});}

//función de crear un nuevo fisioterapeuta
driver.insertFisio = ({ nombre, apPaterno, apMaterno, dir, contacto1, contacto2, puesto, user, pass }) => 
{ return new Promise( (resolve, reject) => {

	console.log("Info formateada: "+nombre, apPaterno, apMaterno, dir, contacto1, contacto2, puesto, user, pass);
    const data = { nombre, apPaterno, apMaterno, dir, contacto1, contacto2, puesto, user, pass };

  connection.query( "INSERT INTO fisioterapeuta  SET ?",
    { nombre, apPaterno, apMaterno, dir, contacto1, contacto2, puesto, user, pass },
    (err, result) => {
      if (err) {
        console.log(err);
        return  reject( {status: 500} );
      } else return resolve( {status: 'success', data: data } );
    }
  );
});}

//Función para el login [Obtener un registro ingresado]
driver.loginFisio = async ({ user, pass }) => { return new Promise( (resolve, reject) => {
  connection.query("SELECT COUNT(*) as registro FROM fisioterapeuta WHERE user=? AND pass=?", [user, pass], (err, result)=>{
    if(err){
      console.log("error: "+err);
		return reject( err );
    }else{
      if(result[0].registro>0){
        //console.log("Se encontró el usuario: ", result);
        //Enconttramos el usuario, pasamos al index del usaurio
		return resolve("Usuario encontrado");
      }else{
        return reject( { status: 404 } );
      }
    }
  });
});}

//Función para la creación de citas
driver.insertCitas = ({ nombrePaciente, apPpaciente, apMpaciente, fecha, hora }) => 
{ return new Promise((resolve, reject) => {
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
        connection.query("INSERT INTO citas SET ?",
		{nombrePaciente, apPpaciente, apMpaciente, fecha , hora, idEmpleado, idPaciente},
        (err, result)=>{
          if(err){
            console.log(err);
          }else{
            resolve("Cita creada");
          }
        });
      }else{
        console.log("No encontramos al empleado");
        reject("ERROR");
      }
    }
  });
});}

driver.insertPaciente = ({ nombre, edad, diagnostico, tratamiento }) =>
{ return new Promise((resolve, reject) => {
	console.log("Info formar: "+nombre, edad, diagnostico, tratamiento);
	connection.query(
		"INSERT INTO paciente SET ?",
		{ nombre, edad, diagnostico, tratamiento },
		(err, result) => {
			if(err){
				console.log(err);
				reject({status: 500});
			}else return resolve({status: 'success', data: { nombre, edad, diagnostico, tratamiento }});
		});
});}

module.exports = driver;

/*OBJETO DE EJEMPLO PARA INSERTAR A UN FISIOTERAPEUTA
http://localhost:3000/fisioterapeutas
{"nombre":"Pedro", 
"apPaterno":"Rodriguez",
"apMaterno":"Rodriguez",
"dir":"prueba de direccion",
"contacto1":"5599887744",
"contacto2":"5566220011",
"puesto":"Recepcionista",
"user":"elPepe",
"pass":"PruebaDeContra"
});}
OBJETO PARA CREAR CITAS
http://localhost:3000/insertCitas
{
    "nombrePaciente":"Ricardo",
    "apPpaciente":"Fernandez",
    "apMpaciente":"Montiel",
    "fecha":"2021/10/27",
    "hora":"17:35:000",
    "idEmpleado":"2",
    "idPaciente":"1"
});}
OBJETO PARA EL LOGIN DEL FISIOTERAPEUTA
http://localhost:3000/loginFisio
{
    "user":"Manu465",
    "pass":"Elmanu290"
});}

http://localhost:3000/fisios
http://localhost:3000/loginFisio
http://localhost:3000/fisioterapeutas

 */
