/*var expiresdate = new Date(2021, 1, 02, 11, 20);
var cookievalue = "Hola Mundo!";
function crearCookie(){
  document.cookie = "comida_favorita=arroz; max-age=3600; path=/";
  document.cookie = "color_favorito=amarillo";

}*/
//document.cookie = “miCookie=Soy la cookie”;
//document.cookie = "nombre="cookievalue + "; expires=" + expiresdate.toUTCString();


/*
function guardarCookie(nombre,valor,fecha)
{
  document.cookie = nombre+"="+valor+";expires="+fecha;

}
var caduca = "31 Dec 2020 23:59:59 GMT"
function guardar(){
  tuCookie = "pruebaCookie"
  tuValor = document.dato.miCookie.value
  guardarCookie(tuCookie,tuValor,caduca)
}
		*/

document.cookie="LAhighscores=[]";
document.cookie="TEhighscores=[]";
document.cookie="SIhighscores=[]";   //$.cookie("usuario",document.getElementById("name-user-RG").value);    PARA EL USUARIO REGISTRADO

$.cookie("usuario",document.getElementById("name-user").value);
$.cookie("contrasenia",document.getElementById("password-user").value);
$.cookie("usuario");
$.cookie("contrasenia");

var cookieusuario = $.cookie("usuario");
var cookiecontrasenia = $.cookie("contrasenia");

console.log($.cookie("LAhighscores"));
console.log($.cookie("TEhighscores"));
console.log($.cookie("SIhighscores"))
console.log(cookieusuario);
/*var a = $.cookie("LAhighscores")
var b = $.cookie("TEhighscores")
var c = $.cookie("SIhighscores")*/
//(parse)
