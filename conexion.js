var Sequelize = require("sequelize");
var AlumnoModelo = require("./modelos/alumno");
var ReservaModelo = require("./modelos/reserva");
require("dotenv").config();

var db=process.env.DB_MYSQL_REMOTO;
var usuario=process.env.USUARIO_MYSQL_REMOTO;
var password=process.env.PASSWORD_MYSQL_REMOTO;
var host=process.env.HOST_MYSQL_REMOTO;
var port=process.env.PORT_MYSQL_REMOTO;

var conexion = new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect:"mysql",
    dialectOptions:{
        ssl:{
            rejectUnauthorized:true
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