var Sequelize = require("sequelize");
const conexion = require("../conexion");

module.exports=(conexion)=>{
    var reservaSchema = conexion.define('reserva',{
        folio:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        fech_r:{
            type:Sequelize.DATE,
            allowNull:false,
            defaultValue:Sequelize.DataTypes.NOW
        },
        hor_r:{
            type:Sequelize.STRING,
            allowNull:false
        },
        lab_r:{
            type:Sequelize.STRING,
            allowNull:false
        },
        id_alu1:{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    });
    return reservaSchema;
}