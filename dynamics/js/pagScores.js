//Este archivo se llama pagScores.js
//Está agregado en la parte de abajo de la página SCORES.html
$(document).ready(function() {
  tablificar("Labyrinth",la);
});
var la = JSON.parse($.cookie("LAhighscores"));
// var te = JSON.parse($.cookie("TEhighscores"));
// var si = JSON.parse($.cookie("SIhighscores"));

function tablificar(juego,array){
  var tableStart = "<table>"+
  "<tr>"+
    "<th colspan='3'>"+juego+"</th>"+
  "</tr>"+
  "<tr>"+
    "<td class='class'>Nombre</td>"+
    "<td class='class'>Puntaje</td>"+
    "<td class='class'>Fecha</td>"+
  "</tr>";
  var content = "";
  for (var i = 0; i < array.length; i++) {
    let name = array[i].name;
    let score = array[i].score;
    let date = array[i].score;
    content += "<tr>"+
      "<td>"+name+"</td>"+
      "<td>"+score+"</td>"+
      "<td>"+date+"</td>"+
    "</tr>";
  }
  tableStart += content;
  tableStart += "</table>";
  $(".scoreJuego1").html(tableStart);
}
var d = new Date();
var cookie = [
  {name: "Abraham", score: 1000, date: d},
  {name: "Max", score: 5000, date: d},
  {name: "Diego", score: 1500, date: d},
  {name: "Gabriel", score: 2000, date: d}
];
$.cookie("LAhighscores",JSON.stringify(cookie));
