// Inicialización
var express  = require('express');
var app      = express(); 							// Utilizamos express
var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080

// Configuracion
mongoose.connect('mongodb://localhost:27017/exam'); 	// Hacemos la conexión a la base de datos de Mongo

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); 						// activamos el log en modo 'dev'
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Cargamos los endpoints
require('./routes/index.js')(app);

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);
