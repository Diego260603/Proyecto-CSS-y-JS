window.onload = function() {
  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");
  setup();
  setInterval(draw,1);
  document.addEventListener("keydown",game);

}

function line(x,y,a,b) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(a,b);
  ctx.stroke();
  ctx.closePath();
}
function random(min,max){
  return Math.round(Math.random()*(max-min)+min);
}

let cols, filas, before,esq1,esq2,xesq,yesq;
let w = 25;
let tablero = [];
let current;
let stack = [];


function setup() {
  cols = Math.floor(cvs.width / w);
  filas = Math.floor(cvs.height / w);

  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < cols; i++) {
      var celda = new Celda(i, j);
      tablero.push(celda);
    }
  }
  //1 - Elige la celda inicial, la marca como visitada y hace push en el stack
  current = tablero[0];
  current.pan = true;
  stack.push(current);

  var met = random(1,3);
  if (met === 1) {
    esq1 = cols-1;
    esq2 = 0;
    xesq = cvs.width - w;
    yesq = 0;
  }
  if (met === 2) {
    esq1 = 0;
    esq2 = filas-1;
    xesq = 0;
    yesq = cvs.height - w;
  }
  if (met === 3) {
    esq1 = cols-1;
    esq2 = filas-1;
    xesq = cvs.width - w;
    yesq = cvs.height - w;
  }
}

function draw(){

  for (let i = 0; i < tablero.length; i++) {
    tablero[i].zeigen();
  }
  if (current) {
    current.highlight();
  }
  else if (before){
    before.highlight();
  }

  //2 - Mientras el stack no este vacío
  if (stack.length > 0) {
    //2.1 - Haz pop de una celda y hazla la celda actual
    current = stack.pop();
    //2.2 - Si la celda actual tienen cualquier vecino que no hayan sido visitados
    let vecinillo = current.espiar();
    if (vecinillo) {
      //2.2.1 & 2.2.2 - Haz push de la celda en el stack y elige uno de los vecinos no visitados
      stack.push(current);
      //2.2.3 - Quita la pared entre celdas
      removepared(current,vecinillo);
      //2.2.4 - Marca la celda elegida como visitada y haz push en el stack
      vecinillo.pan = true;
      stack.push(vecinillo);
      current = vecinillo;
    }
  }

  ctx.fillStyle="#3CB47C";
  ctx.fillRect(xesq,yesq,w,w);
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > filas - 1) {
    return -1;
  }
  return i + j * cols;
}

function removepared(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.pared[3] = false;
    b.pared[1] = false;
  } else if (x === -1) {
    a.pared[1] = false;
    b.pared[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.pared[0] = false;
    b.pared[2] = false;
  } else if (y === -1) {
    a.pared[2] = false;
    b.pared[0] = false;
  }
}

function Celda(i, j) {
  this.i = i;
  this.j = j;
  this.pared = [true, true, true, true];
  this.pan = false;

  this.espiar = function() {
    let vecinos = [];

    let arriba = tablero[index(i, j - 1)];
    let derecha = tablero[index(i + 1, j)];
    let abajo = tablero[index(i, j + 1)];
    let izquierda = tablero[index(i - 1, j)];

    if (arriba && !arriba.pan) {
      vecinos.push(arriba);
    }
    if (derecha && !derecha.pan) {
      vecinos.push(derecha);
    }
    if (abajo && !abajo.pan) {
      vecinos.push(abajo);
    }
    if (izquierda && !izquierda.pan) {
      vecinos.push(izquierda);
    }
    if (vecinos.length != 0) {
      let r = random(0, vecinos.length-1);
      return vecinos[r];
    }
    else{
      return undefined;
    }
  };
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    ctx.fillStyle="#2F1E2E";
    ctx.fillRect(x,y,w,w);
  };

  this.zeigen = function() {
    let x = this.i * w;
    let y = this.j * w;
    if (this.pared[0]) {
      line(x, y, x + w, y);
    }
    if (this.pared[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.pared[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.pared[3]) {
      line(x, y + w, x, y);
    }

    if (this.pan) {
      ctx.fillStyle="#69CCEF";
      ctx.fillRect(x,y,w,w);
    }
  };
}

//-------------------------------------


function game(evt) {
  let speedX, speedY, next;
  if (!current) {
    let current = tablero[0];
  }

  var meta = tablero[index(esq1,esq2)];

  //console.log(current);
  if (before && !current) {
    current = before;
  }
  switch(evt.keyCode) {
    case 38:
    if (!current.pared[0]) {
      next = tablero[index(current.i,current.j-1)];
      speedY -= 1;
    }
    break;
    case 39:
    if (!current.pared[1]) {
      next = tablero[index(current.i+1,current.j)];
      speedX += 1;
    }
    break;
    case 40:
    if (!current.pared[2]) {
      next = tablero[index(current.i,current.j+1)];
      speedY += 1;
    }
    break;
    case 37:
    if (!current.pared[3]) {
      next = tablero[index(current.i-1,current.j)];
      speedX -= 1;
    }
    break;
  }
  before = current;
  current = next;
  if (current && current.i == meta.i && current.j == meta.j) {
    setTimeout(()=>{
      alert("Ganaste");
    },100);
  }
}
