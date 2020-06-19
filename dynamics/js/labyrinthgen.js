$(document).ready(function() {
  if (c != 10) {
    var estado2 = getCookie("estado");
    if (estado2) {
      dirigir();
    }else{
      pantallaInicio();
    }
  } else {
    ende();
  }
  $("#save").click(function(evt){
    if (checkGen()) {
      document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      let ctablero = [];
      let pos = [];
      for (var i = 0; i < tablero.length; i++) {
        switch(tablero[i].pared.join(" ")){
          case 'false false false false': ctablero.push(0);break;
          case 'true false false false': ctablero.push(1);break;
          case 'false true false false': ctablero.push(2);break;
          case 'false false true false': ctablero.push(3);break;
          case 'false false false true': ctablero.push(4);break;
          case 'true true false false': ctablero.push(5);break;
          case 'true false true false': ctablero.push(6);break;
          case 'true false false true': ctablero.push(7);break;
          case 'false true true false': ctablero.push(8);break;
          case 'false true false true': ctablero.push(9);break;
          case 'false false true true': ctablero.push(10);break;
          case 'true true true false': ctablero.push(11);break;
          case 'false true true true': ctablero.push(12);break;
          case 'true false true true': ctablero.push(13);break;
          case 'true true false true': ctablero.push(14);break;
        }
      }
      pos.push(current.i);
      pos.push(current.j);
      document.cookie = "nivel="+nivel;
      document.cookie = "tablero="+ctablero;
      document.cookie = "pos="+pos;
      document.cookie = "movimientos="+movimientos;
      document.cookie = "puntaje="+puntaje;
      document.cookie = "met="+met;
    }
  })
  var usuario = "Abraham";
  var d = new Date();
  $("#rend").click(()=>{
    if (checkGen) {
      deleteMostCookies();
      highScores("LA",makeHigh(puntaje,usuario,d));
      document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      ende();
    }
  })
  $("#oldGame").click(()=>{
    dirigir();
  });
  $("#reset").click(()=>{
    deleteMostCookies();
    document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    window.location.reload();
  })
});

function getCookie(name){
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : false;
}

function deleteMostCookies() {
  document.cookie = "nivel=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "tablero=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "pos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "movimientos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "puntaje=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "met=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
}

var pantallaA = "<div class='alles'>"+
  "<h1>Por tí, Potosí</h1>"+
  "<div class='buttons'>"+
    "<button type='button' id='newGame'>Juego Nuevo</button>";
var botonNoCookies = "<button type='button' id='noGame'>Reanudar Juego</button>";
var botonCookies = "<button type='button' id='oldGame'>Reanudar Juego</button>";
var pantallaB = "</div></div>";


function dirigir(){
  $(".juego").html("<canvas id='canvas' width='1600' height='800'></canvas>"+
    "<div id='moves'>"+
      "<p>Movimientos: 0</p>"+
    "</div>"+
    "<div id='imagen'></div>"+
    "<div class='ventana'></div>"+
    "<button type='button' id='save'>Guardar</button>"+
    "<button type='button' id='reset'>Reiniciar juego</button>"+
    "<button type='button' id='rend'>Rendirse</button>"
  );
  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");
  setTimeout(()=>{
    if (!co||!coo||!cook||!cookie) {
      setup();
      setInterval(draw,1);
    }
    else {
      recuperar();
      setInterval(redraw,1)
    }
  },1000);
  document.addEventListener("keydown",game);
}

function ende(){
  var rendido = "Te perdiste en el nivel "+nivel+" y tu perrito <br>nunca supo por que no regresaste";
  var ganado = "¡Regresaste a las patitas de tu perrito!"
  var feliz = "<div class='end'>"
  var sad = "<div class='endsad'>"
  var pantallaEndA = "<div class='resu'><h1 id='titel' align='center'>";
  var pantallaEndB = "</h1></div>"+
    "<div class='resul'>"+
      "<div class='thescore'>"+
        "<h2 class='given'>Puntaje: </h2>"+
        "<p class='abc'>"+puntaje+"</p>"+
      "</div>"+
      "<div class='themoves'>"+
        "<h2 class='given'>Movimientos: </h2>"+
        "<p class='abc'>"+parseInt(cook)+"</p>"+
      "</div>"+
    "</div>"+
    "<button type='button' id='reset'>Volver a la página de inicio</button>"+
  "</div>";
  if (c==10) {
    pantallaEndA = feliz + pantallaEndA;
    pantallaEndA += ganado;
  }else{
    pantallaEndA = sad + pantallaEndA;
    pantallaEndA += rendido;
  }
  pantallaEndA += pantallaEndB;
  $(".juego").html(pantallaEndA);
}

function pantallaInicio() {
  if (!co||!coo||!cook||!cookie) {
    pantallaA += botonNoCookies;
  } else{
    pantallaA += botonCookies;
  }
  pantallaA += pantallaB;
  $(".juego").html(pantallaA);
  $("#newGame").click(()=>{
    $(".juego").html("<div class='todo'>"+
      "<div class='title'>"+
        "<h1>Escoge a tu personaje</h1>"+
      "</div>"+
      "<div class='personajes'>"+
        "<div class='uno'>"+
          "<div id='aguacate' onclick='reply_click(this.id)'></div>"+
          "<p>El Luchador aguacate</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='bala' onclick='reply_click(this.id)'></div>"+
          "<p>La Bala Canibal</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='cactus' onclick='reply_click(this.id)'></div>"+
          "<p>El Cactus parásito</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='crayola' onclick='reply_click(this.id)'></div>"+
          "<p>La Crayola infernal</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='nieve' onclick='reply_click(this.id)'></div>"+
          "<p>El Paraíso encerrado</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='ojo' onclick='reply_click(this.id)'></div>"+
          "<div class='text'>"+
            "<p>Suspicious Looking Eye</p>"+
          "</div>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='pan' onclick='reply_click(this.id)'></div>"+
          "<p>El Pan mutante</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='pantalon' onclick='reply_click(this.id)'></div>"+
          "<div class='text'>"+
            "<p>El Pantalon consciente</p>"+
          "</div>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='papel' onclick='reply_click(this.id)'></div>"+
          "<p>El papel omnipotente</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='sal' onclick='reply_click(this.id)'></div>"+
          "<p>You salty?</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='tetris' onclick='reply_click(this.id)'></div>"+
          "<p>El quemar del pasado</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='vasin' onclick='reply_click(this.id)'></div>"+
          "<p>El vaso enigmático</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='destapa' onclick='reply_click(this.id)'></div>"+
          "<p>Pa limpiar tu baño</p>"+
        "</div>"+
        "<div class='uno'>"+
          "<div id='doge' onclick='reply_click(this.id)'></div>"+
          "<p>wow such cameo</p>"+
        "</div>"+
      "</div>"+
    "</div>")
  });
}

function reply_click(clicked_id){
  $.cookie("personaje",clicked_id);
  $.cookie("estado","xd");
  window.location.reload();
  setTimeout(()=>{
    dirigir();
  },10)
}

var figur = getCookie("personaje");
if (figur) {
  $(".juego").html(
  "<img id='charac' width='100' height='100' src='../../statics/media/personajes/"+figur+".png'>"+
  "<img id='door' width='0' height='0' src='../../statics/media/door.jpg'>"+
  "<img id='tile' width='0' height='0' src='../../statics/media/tile.jpg'>"
  )
  var personaje = document.getElementById("charac");
  var door = document.getElementById("door");
  var tile = document.getElementById("tile");
}



var c = getCookie("nivel");
var co = getCookie("tablero");
var coo = getCookie("pos");
var cook = getCookie("movimientos");
var cooki = getCookie("puntaje");
var cookie = getCookie("met");

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

let cols, filas, before,esq1,esq2,xesq,yesq,met,current,nivel,w, puntos, puntaje, movimientos;
let tablero = [];
let stack = [];
var timer = 0;

if (c) {
  nivel = c;
  setTimeout(()=>{
    document.cookie = "movimientos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "nivel=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "puntaje=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  },500)
  switch(parseInt(nivel)){
    case 1: w = 200;break;
    case 2: w = 160;break;
    case 3: w = 100;break;
    case 4: w = 80;break;
    case 5: w = 50;break;
    case 6: w = 40;break;
    case 7: w = 32;break;
    case 8: w = 25;break;
    case 9: w = 20;break;
    default: w = "Ganaste";break;
  }
  movimientos = cook;
  puntaje = parseInt(cooki);
}
else {
  puntaje = 0;
  w = 200;
  movimientos = 0;
  nivel = 1;
}



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
  current = tablero[index((cols/2)-1,(filas/2)-1)];
  current.pan = true;
  stack.push(current);

  met = random(1,4);
  determineMet(met);
}

function determineMet(met){
  if (met === 1) {
    esq1 = 0;
    esq2 = 0;
    xesq = 0;
    yesq = 0;
  }
  if (met === 2) {
    esq1 = cols-1;
    esq2 = 0;
    xesq = cvs.width - w;
    yesq = 0;
  }
  if (met === 3) {
    esq1 = 0;
    esq2 = filas-1;
    xesq = 0;
    yesq = cvs.height - w;
  }
  if (met === 4) {
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
  ctx.drawImage(door,xesq,yesq,w,w);
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
    ctx.drawImage(personaje,x,y,w,w)
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 7;
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
      ctx.drawImage(tile,x,y,w,w);
    }
  };
}

function recuperar(){
  var ctablero = co;
  var pos = coo.split(",");
  var movimientos = cook;
  var met = cookie;

  var tablero2 = ctablero.split(",");
  cols = Math.floor(cvs.width / w);
  filas = Math.floor(cvs.height / w);

  for (var j = 0; j < filas; j++) {
    for (var i = 0; i < cols; i++) {
      var celda = new CeldaN(i,j,tablero2);
      tablero.push(celda);
    }
  }
  current = tablero[parseInt(pos[0])+parseInt(pos[1])*cols];

  determineMet(parseInt(met));
}

function redraw(){
  if (checkGen()) {
    (timer) += 1;
  }
  for (let i = 0; i < tablero.length; i++) {
    tablero[i].zeigen();
  }
  if (current) {
    current.highlight();
  }
  else if (before){
    before.highlight();
  }
  ctx.drawImage(door,xesq,yesq,w,w);
}
function CeldaN(i,j,tab) {
  this.i = i;
  this.j = j;
  let x = this.i * w;
  let y = this.j * w;
  this.pan = true;

  switch(parseInt(tab[index(i,j)])){
    case 0: this.pared = [false, false, false, false];break;
    case 1: this.pared = [true, false, false, false];break;
    case 2: this.pared = [false, true, false, false];break;
    case 3: this.pared = [false, false, true, false];break;
    case 4: this.pared = [false, false, false, true];break;
    case 5: this.pared = [true, true, false, false];break;
    case 6: this.pared = [true, false, true, false];break;
    case 7: this.pared = [true, false, false, true];break;
    case 8: this.pared = [false, true, true, false];break;
    case 9: this.pared = [false, true, false, true];break;
    case 10: this.pared = [false, false, true, true];break;
    case 11: this.pared = [true, true, true, false];break;
    case 12: this.pared = [false, true, true, true];break;
    case 13: this.pared = [true, false, true, true];break;
    case 14: this.pared = [true, true, false, true];break;
  }
  this.highlight = function() {
    ctx.drawImage(personaje,x,y,w,w)
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 7;
  }
  this.zeigen = function() {
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
    if(this.pan) {
      ctx.drawImage(tile,x,y,w,w);
    }
  }
}

//---------------Juego------------------

var on = true;

function game(evt) {
  if (on) {
    var crono = setInterval(()=>{
      timer++;
    },300);
    if (checkGen()) {
      let speedX, speedY, next;
      if (!current) {
        let current = tablero[index((cols/2)-1,(filas/2)-1)];
      }

      var meta = tablero[index(esq1,esq2)];
      if (before && !current) {
        movimientos--;
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
        case 87:
        if (!current.pared[0]) {
          next = tablero[index(current.i,current.j-1)];
          speedY -= 1;
        }
        break;
        case 68:
        if (!current.pared[1]) {
          next = tablero[index(current.i+1,current.j)];
          speedX += 1;
        }
        break;
        case 83:
        if (!current.pared[2]) {
          next = tablero[index(current.i,current.j+1)];
          speedY += 1;
        }
        break;
        case 65:
        if (!current.pared[3]) {
          next = tablero[index(current.i-1,current.j)];
          speedX -= 1;
        }
        break;
      }
      movimientos++;
      document.getElementById("moves").innerHTML = "<p>Movimientos: "+movimientos+"</p>";
      before = current;
      current = next;
      if (current && current.i == meta.i && current.j == meta.j) {
        on = false;
        clearInterval(crono);
        if (timer <= 3000 * nivel) {
          puntos = Math.round(3000 - (parseInt(timer)/Math.pow(nivel,2)));
        }
        else {
          puntos = 0;
        }
        puntaje += parseInt(puntos);
        nivel++;
        setTimeout(()=>{
          document.cookie = "nivel="+ nivel;
          document.cookie = "puntaje="+ puntaje;
          document.cookie = "movimientos="+ movimientos;
          $.cookie("estado","xd");
          document.cookie = "tablero=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          document.cookie = "pos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          document.cookie = "met=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          $(".ventana").css("animation","fade 1s ease-out 1")
          setTimeout(()=>{
            dirigir();
            window.location.reload();
          },900)
        },100);
      }
    }
  }
}

//---------Guardado---------
function checkGen(){
  var generando = 0;
  for (var i = 0; i < tablero.length; i++) {
    if(!tablero[i].pan){
      generando++;
    }
  }
  if (generando < 1) {
    return true;
  }else {
    return false;
  }
}
