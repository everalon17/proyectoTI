var Sequelize = require("sequelize");
var AlumnoModelo = require("./modelos/alumno");
var ReservaModelo = require("./modelos/reserva");
require("dotenv").config();

var db=process.env.DB_MYSQL_LOCAL;
var usuario=process.env.USUARIO_MYSQL_LOCAL;
var password=process.env.PASSWORD_MYSQL_LOCAL;
var host=process.env.HOST_MYSQL_LOCAL;
var port=process.env.PORT_MYSQL_LOCAL;

var conexion = new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect:"mysql",
    dialectOptions:{
        ssl:{
            rejectUnauthorized:false
        },
    }
});

var Alumno=AlumnoModelo(conexion);
var Reserva=ReservaModelo(conexion);

conexion.sync({force:false})
.then(()=>{
    console.log("Conectado a mysql");
})
.catch((err)=>{
    console.log("Error al conectarse a mysql"+err);
})

module.exports={
    Alumno:Alumno,
    Reserva:Reserva
}