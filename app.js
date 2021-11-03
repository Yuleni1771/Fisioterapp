const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


const connection = mysql.createConnection({
    //Aquí pongan los datos de su base de datos
    host: "localhost",
    user: "root",
    password: "",
    database: "proyectoAdmin"
  });
  
  app.get("/fisios", (req, res) => {
    res.json({ mensaje: "bienvenido" });
  });
  //Obtenemos los datos de los pacientes para manejar un select con los datos de los pacientes
  app.get("/pacientes",(req, res)=>{
    //Muestra la información para los pacientes 
    connection.query("Select idPaciente, nombre from paciente", (err, result)=>{
      for(let i = 0; i<result.length; i++){
        console.log("id: "+result[i].idPaciente+" nombre:"+result[i].nombre);
        res.status(200).send(result[i].idPaciente+":"+result[i].nombre);
      }
    });
  });
  //Obtenemos a los fisioterapeutas
  app.get("/fisioterapeutas", (req, result) => {
    connection.query("Select * from fisioterapeuta", (err, res) => {
      if (err) {
        console.log("error: " + err);
        //return null;
      } else {
        console.log("fisioterapeutas: ", res);
        result.send(JSON.stringify(res));
      }
    });
  });
  //función de crear un nuevo fisioterapeuta
  app.post("/insertFisio", (req, res) => {
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
  app.post("/loginFisio",(req, res)=>{
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
  app.post("/insertCitas", (req, res)=>{
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
  app.post("/insertPaciente",(req,res)=>{
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
  //
  //En que puerto es en el que trabaja el servidor
  app.listen(3000, function () {
    console.log("running at 3000");
  });
  app.use(function (req, res) {
    res.status(404).send("Error");
  });
