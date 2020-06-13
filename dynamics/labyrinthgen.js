window.onload = function() {
  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");
  setInterval(draw,10)
}

function linea(x,y,a,b) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(a,b);
  ctx.stroke();
  ctx.closePath();
}
function random(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

let columnas, filas;
let n = 50;
let tablero = [];
let casilla;
let stack=[];

columnas = Math.floor(500/n);
filas = Math.floor(500/n);
for (let j = 0; j < filas; j++) {
  for (let i = 0; i < columnas; i++) {
    var celda = new Celda(i,j);
    tablero.push(celda);
  }
  casilla = tablero[0];
}

function draw(){
  for (var a = 0; a < tablero.length; a++) {
    tablero[a].zeigen();
  }
  casilla.pan = true;
  var vecinillo = casilla.espiar();
  if (vecinillo) {
    vecinillo.pan = true;


    casilla = vecinillo;
  }
}

function indice(i,j){
  if (i < 0 || j < 0 || i > columnas - 1 || j > filas - 1) {
    return -1;
  }
  return i + j * columnas;
}
function Celda(i,j){
  this.i = i;
  this.j = j;
  this.pared = [true,true,true,true];
  this.pan = false;

  this.zeigen = function(){
    let x = this.i*n;
    let y = this.j*n;
    if (this.pared[0] == true) {
      linea(x,y,x+n,y);//arriba
    }
    if (this.pared[1] == true) {
      linea(x+n,y,x+n,y+n);//derecha
    }
    if (this.pared[2] == true) {
      linea(x+n,y+n,x,y+n);//abajo
    }
    if (this.pared[3] == true) {
      linea(x,y+n,x,y);//izquierda
    }
    if (this.pan) {
      ctx.fillStyle="#69CCEF";
      ctx.fillRect(x,y,n,n);
    }
  }

  this.espiar = function(){
    let vecinos = [];
    let arriba = tablero[indice(1, j - 1)];
    let derecha = tablero[indice(i + 1, j)];
    let abajo = tablero[indice(i, j + 1)];
    let izquierda = tablero[indice(i - 1,j)];

    if (arriba && !arriba.pan) {
      vecinos.push(arriba)
    }
    if (derecha && !derecha.pan) {
      vecinos.push(derecha)
    }
    if (abajo && !abajo.pan) {
      vecinos.push(abajo)
    }
    if (izquierda && !izquierda.pan) {
      vecinos.push(izquierda)
    }

    if (vecinos.length >0) {
      var p = random(0, vecinos.length)
      return vecinos[p];
    }
    else {
      return undefined;
    }
  }
}
