var Sequelize = require("sequelize");
const conexion = require("../conexion");

module.exports=(conexion)=>{
    var AlumnosSchema = conexion.define('alumno',{
        id_alu:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        usuario_alu:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password_alu:{
            type:Sequelize.STRING,
            allowNull:false
        },
        grupo_alu:{
            type:Sequelize.STRING,
            allowNull:false
        },
        nom_alu:{
            type:Sequelize.STRING,
            allowNull:false
        },
        tip_cuenta:{
            type:Sequelize.STRING,
            allowNull:false
        }
    });

    return AlumnosSchema;
}