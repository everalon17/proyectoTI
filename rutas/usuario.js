var ruta=require("express").Router();
const { where } = require("sequelize");
var {Alumno} = require("../conexion");
var {Reserva} = require("../conexion")

var sesion={};

ruta.get("/login",(req,res)=>{
    res.render("login");
});

ruta.post("/login",(req,res)=>{
    //console.log(req.body);
    Alumno.findOne({where:{usuario_alu:req.body.usuario,password_alu:req.body.password}})
        .then((alumno)=>{
            //console.log(alumno.dataValues.id_alu!="");
            if(alumno!=""){
                sesion.alumno = alumno.dataValues.id_alu;
                //console.log(sesion.alumno);
                res.redirect("/inicio")
            }else{
                res.redirect("/login");
            }
        })
        .catch((err)=>{
            console.log("Error en login..............."+err);
            res.redirect("/");
        });
})

ruta.get("/inicio",(req,res)=>{
    //console.log(sesion.alumno);
    if(sesion.alumno==undefined || sesion.alumno=="" || sesion.alumno==null){
        res.redirect("/login");
    }
    else{
        res.render("inicio");
    }
});

ruta.get("/salir",(req,res)=>{
    sesion.alumno=null;
    res.redirect("/")
});

ruta.get("/",(req,res)=>{
    res.redirect("/login");
});

ruta.get("/modificarUsuario",(req,res)=>{
    Alumno.findByPk(sesion.alumno)
    .then((alumno)=>{
        res.render("modificarUsuario",{alumno:alumno});
    })
    .catch((err)=>{
        console.log("error................"+err);
        res.redirect("/");
    });
});

ruta.post("/modificarUsuario",(req,res)=>{
    Alumno.update(req.body,{where:{id_alu:req.body.id_alu}})
    .then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log("Error..............."+err);
        res.redirect("/");
    })
});

ruta.get("/mostrarReserva",(req,res)=>{
    Reserva.findOne({where:{id_alu1:sesion.alumno}})
    .then((reserva)=>{
        if(reserva){
            res.render("mostrarReserva",{reserva:reserva})
        }else{
            return res.status(404).send("No tienes horario reservado");
        }
    })
    .catch((err)=>{
        console.log("Error......................"+err);
        res.redirect("/inicio");
    })
});

ruta.get("/eliminar/:folio",(req,res)=>{
    Reserva.destroy({where:{id_alu1:sesion.alumno}})
    .then(()=>{
        res.redirect("/inicio");
    })
    .catch((err)=>{
        console.log("Error..........."+err);
        res.redirect("/");
    });
});


ruta.get("/registro",(req,res)=>{
    res.render("registro");
});

ruta.post("/registro",(req,res)=>{
    Alumno.create(req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log("Error......"+err);
        res.redirect("/");
    });
});


ruta.get("/reserva",(req,res)=>{
    res.render("reserva");
});

ruta.post("/reserva",(req,res)=>{
    console.log(sesion.alumno);
    Reserva.findOne({where:{hor_r:req.body.hor_r,lab_r:req.body.lab_r}})
    .then((reserva)=>{
        if(reserva){
            return res.status(404).send("Horario reservado")
        }else{
            Alumno.findByPk(sesion.alumno)
            .then((alumno)=>{
                if (!alumno) {
                    return res.status(404).send("Alumno no encontrado");
                }
                Reserva.create({
                hor_r: req.body.hor_r,
                lab_r: req.body.lab_r,
                id_alu1: sesion.alumno
                })
                .then((reserva) => {
                    //console.log("Reserva creada:", reserva);
                    res.redirect("/reserva");
                })
                .catch((err) => {
                    //console.log("Error creando reserva:", err);
                    res.status(500).send("Error en el servidor");
                });
            })
            .catch((err)=>{
                //console.log("Error buscando alumno:", err);
                res.status(500).send("Error en el servidor");
            });
        }
    })
    .catch((err)=>{
        console.log("error.............."+err);
        res.redirect("/reserva")
    })

});

module.exports=ruta;