var express = require("express");
const session = require("cookie-session");
var path = require("path");
var usuarioRutas= require("./rutas/usuario");
const cookieSession = require("cookie-session");
require("dotenv").config();

var app=express();
app.use(cookieSession({
    name:'session',
    keys: [process.env.SECRETO_SESSION]
}));
app.set("view engine","ejs");
app.use("/web",express.static(path.join(__dirname,"web")));
app.use(express.urlencoded({extended:true}));


app.use("/", usuarioRutas);


var port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+port);
});