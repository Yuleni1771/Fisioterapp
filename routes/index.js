var express	= require('express');
var mysql	= require('../lib/mysql.js');
var router	= express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', async function (req, res, next) {
	console.table( req.body );
	try{
		await mysql.loginFisio( req.body );
		res.status(204).send();
	}catch( err ){
		if( err.status == 404 )
			res.status( 404 ).send();
		else
			res.status( 500 ).send();
	}
});

module.exports = router;
