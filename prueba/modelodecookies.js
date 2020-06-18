//Activenlo para el ejemplo, revisen los numeros aca y luego en lo que les imprime
// var object = [
//   {score: 100, name: "Diego", fecha: 15},
//   {score: 300, name: "Gabriel", fecha: 16},
//   {score: 450, name: "Abraham", fecha: 13},
//   {score: 600, name: "Max", fecha: 1},
//   {score: 1000, name: "Diosito", fecha: 3}
// ]
// $.cookie("LAhighscores",JSON.stringify(object));
//

// El modelo que vamos ocupar para las cookies de puntajes más altos es el siguiente:
// $high
// donde el $ es el codigo correspondiente del juego

//Valores para el parametro juego
//LA - Laberinto
//SI - Space Invaders
//TE - Tetris
/*
// El parametro de newHigh tiene que llevar el siguiente formato =
*/

function makeHigh(score, name, date){
  return {score: score, name: name, date: date};
}

function sortObjects(a,b){
  var scoreA = a.score;
  var scoreB = b.score;

  let comparacion = 0;
  if (scoreA < scoreB) {
    comparacion = 1;
  }
  else if (scoreA > scoreB) {
    comparacion = -1;
  }
  else if (scoreA == scoreB) {
    var dateA = a.date;
    var dateB = b.date;
    if (dateA < dateB) {
      comparacion = 1;
    }
    else if (dateA > dateB) {
      comparacion = -1;
    }
  }
  return comparacion;
}

function highScores(juego, newHigh){
  //Recupera la cookie
  var a = JSON.parse($.cookie(juego+"highscores"));
  //Si existe..
  if (a != null) {
    //En el arreglo mete al nuevo record
    a.push(newHigh);
    //Los organiza
    a.sort(sortObjects);
    //Si hay más de 5
    if (a.length>5) {
      //Elimina el menor de todos
      a.splice(a.length-1,a.length-5);
    }
  //Si aún no existe la cookie, lo inicia
  }else{
    a = newHigh;
  }
  $.cookie(juego+"highscores",JSON.stringify(a),365);
}
//Ejemplo
highScores("LA",makeHigh(5000,"Misperrines",5));
