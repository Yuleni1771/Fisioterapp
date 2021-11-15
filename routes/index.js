var router	= require('express').Router();
var db		= require('../lib/mysql.js');
var debug	= require('debug')('app:index:');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/index.html');
});

router.post('/login', async (req, res)=> {
	try{
		debug( req.body );
		if( await db.login( req.body ) )
			res.status(204).send();
		else res.status(401).send();
	}catch(err){
		debug(err);
		res.status(err.status).send();
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
router.post("/insertCitas", async (req, res)=>{
	try{
		res.status(200).send( await db.insertCitas( req.body ) );
	}catch(err){
		res.status(500).send("ERROR");
	}
});

//
router.post("/insertPaciente", async(req,res)=>{
	console.log(req.body);
	try{ 
		res.status(200).send( await db.insertPaciente( req.body ) );
	}catch(err){
		res.status(500).send();
	}
});

module.exports = router;
