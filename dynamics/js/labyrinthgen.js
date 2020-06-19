$(document).ready(function() {
  //Si no se ha llegado al nivel 10
  if (c != 10) {
    //Se recupera una cookie que determina el estado del juego
    var estado2 = getCookie("estado");
    if (estado2) {
      //Si existe ejecuta la función que te lleva al laberinto
      dirigir();
    }else{
      //De lo contrario te envia a la pantalla principal
      pantallaInicio();
    }
  } else {
    //Establece tu puntaje
    //En caso de que no funcione, comentarlo
    highScores("LA",makeHigh(puntaje,usuario,d));
    //Si ya se llego al nivel 10(solo hay 9 niveles), te lleva a tu resultado
    ende();
  }
  //Boton de rendirse
  $("#rend").click(()=>{
    //checkGen revisa que no se este dibujando el tablero al ocurrir un evento
    if (checkGen()) {
      //Borra casi todas las cookies
      deleteMostCookies();
      //Llama a una función de modelodecookies.js y establece los puntajes más altos
      //Igualmente en caso de no funcionar el boton de rendirse, comentar esta linea o establecer manualmente
      //la cookie con el siguiente comando en la consolo "document.cookie = "LAhighscores=[]""
      highScores("LA",makeHigh(puntaje,usuario,d));
      //Elimina la cookie estado, que causara que no te lleve más al laberinto
      document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      //Te envía a pantalla de resultados
      ende();
    }
  })
  //Boton de reinicio
  $("#reset").click(()=>{
    //Borra cookies
    deleteMostCookies();
    document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    //Refresh y al no haber cookie estado, te lleva a la página principal
    window.location.reload();
  })
  //Guardar
  $("#save").click(function(evt){
    //Checa si se genera el tablero
    if (checkGen()) {
      //Quita la cookie de estado
      document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      //Al tener un tablero lleno de objetos, nos importan las paredes de cada casilla
      let ctablero = [];
      let pos = [];
      //Dependiendo de la combinación de paredes, mete un número al array-cookie de tablero
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
      //Recupera la posición actual del jugador para establecer una cookie
      pos.push(current.i);
      pos.push(current.j);
      //Establece las cookies
      document.cookie = "nivel="+nivel;
      document.cookie = "tablero="+ctablero;
      document.cookie = "pos="+pos;
      document.cookie = "movimientos="+movimientos;
      document.cookie = "puntaje="+puntaje;
      document.cookie = "met="+met;
    }
  })
  //Variable de puntajes altos
  //Recupera l cookie de usuario y establece una nueva fecha
  var usuario = $.cookie("usuario");
  var d = new Date();
  //Cuando hay cookies y se esta en la pagInicio, se activa el boton de reanudar, darle en ese te lleva a tu laberinto guardado
  $("#oldGame").click(()=>{
    dirigir();
  });

});

//Funcion de recuperacion de cookies
function getCookie(name){
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : false;
}

//recuperacion de cookies
var c = getCookie("nivel");
var co = getCookie("tablero");
var coo = getCookie("pos");
var cook = getCookie("movimientos");
var cooki = getCookie("puntaje");
var cookie = getCookie("met");

//Funciones utiles
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

//Establece algunas variables universales para ser ocupadas en todo el codigo
let cols, filas, before,esq1,esq2,xesq,yesq,met,current,nivel,w, puntos, puntaje, movimientos;
let tablero = [];
let stack = [];
var timer = 0;

//Si hay cookies las recupera y las elimina poco después para evitar conflictos y confusiones futuras
if (c) {
  nivel = c;
  setTimeout(()=>{
    document.cookie = "movimientos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "nivel=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "puntaje=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  },500)
  //Dependiendo del nivel establece divisor de columnas
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
//De lo contrario da valores bases
else {
  puntaje = 0;
  w = 200;
  movimientos = 0;
  nivel = 1;
}

//Borrar casi todas las cookies
function deleteMostCookies() {
  document.cookie = "nivel=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "tablero=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "pos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "movimientos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "puntaje=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
  document.cookie = "met=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
}

//Página de laberinto
function dirigir(){
  $(".juego").html("<canvas id='canvas' width='1600' height='800'></canvas>"+
    "<div id='debotones'>"+
      "<div id='moves'>"+
        "<p name='movi'>Movimientos: 0</p>"+
      "</div>"+
      "<div id='imagen'></div>"+
      "<div class='ventana'></div>"+
      "<div class='masbotones'>"+
        "<button type='button' id='save'>Guardar</button>"+
        "<button type='button' id='reset'>Reiniciar juego</button>"+
        "<button type='button' id='rend'>Rendirse</button>"+
        "</div>"+
    "</div>"
  );
  //Recupera el canvas
  cvs = document.getElementById("canvas");
  ctx = cvs.getContext("2d");
  //Si no hay cookies pinta un tablero desde 0
  if (!co||!coo||!cook||!cookie) {
    setup();
    setInterval(draw,1);
  }
  //De lo contrario pinta con las coookies proporcionadas
  else {
    recuperar();
    setInterval(redraw,1)
  }
  //Inicia el juego en cuanto se presione una tecla
  document.addEventListener("keydown",game);
}

//Página de resultados
function ende(){
  //Mensajes e imagenes distintas dependiendo de si se ha ganado o perdido
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
  //Se elige el mensaje e imagen
  if (c==10) {
    pantallaEndA = feliz + pantallaEndA;
    pantallaEndA += ganado;
  }else{
    pantallaEndA = sad + pantallaEndA;
    pantallaEndA += rendido;
  }
  pantallaEndA += pantallaEndB;
  //Se inserta en su lugar
  $(".juego").html(pantallaEndA);
  //Regresa al inicio un boton
  $("#reset").click(()=>{
    deleteMostCookies();
    document.cookie = "estado=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
    window.location.reload();
  })
}

//Pantalla A es pantalla de inicio, se establecen botones por si hay y por si no hay cookies
var pantallaA = "<div class='alles'>"+
  "<h1>Regresa</h1>"+
  "<div class='buttons'>"+
    "<button type='button' id='newGame'>Juego Nuevo</button>";
var botonNoCookies = "<button type='button' id='noGame'>Reanudar Juego</button>";
var botonCookies = "<button type='button' id='oldGame'>Reanudar Juego</button>";
var pantallaB = "</div></div>";
//Dentro de la función se elige el botón
function pantallaInicio() {
  if (!co||!coo||!cook||!cookie) {
    pantallaA += botonNoCookies;
  } else{
    pantallaA += botonCookies;
  }
  pantallaA += pantallaB;
  //Se inserta la pantalla en su lugar
  $(".juego").html(pantallaA);
  //Si se da click en nuevo juego, se inserta html de personajes que regresan su id al clickearlos
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

//Recupera el id del personaje elegido, que es el mismo que el nombre de su imagen respectiva
function reply_click(clicked_id){
  $.cookie("personaje",clicked_id);
  $.cookie("estado","xd");
  window.location.reload();
  //Te lleva al laberinto
  setTimeout(()=>{
    dirigir();
  },10)
}

//Establece las imagenes que se cargaran en el canvas
var figur = getCookie("personaje");
if (figur) {
  $(".juego").html(
  "<img id='charac' width='0' height='0' src='../../statics/media/personajes/"+figur+".png'>"+
  "<img id='door' width='0' height='0' src='../../statics/media/door.jpg'>"+
  "<img id='tile' width='0' height='0' src='../../statics/media/tile.jpg'>"
  )
  var personaje = document.getElementById("charac");
  var door = document.getElementById("door");
  var tile = document.getElementById("tile");
}

//Inicia un tablero nuevo
function setup() {
  //determina columnas y filas
  cols = Math.floor(cvs.width / w);
  filas = Math.floor(cvs.height / w);
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < cols; i++) {
      //Llena el tablero de celdas
      var celda = new Celda(i, j);
      tablero.push(celda);
    }
  }
  //Inicio de algoritmo de recursive backtracking
  //1 - Elige la celda inicial, la marca como visitada y hace push en el stack
  current = tablero[index((cols/2)-1,(filas/2)-1)];
  current.pan = true;
  stack.push(current);

  met = random(1,4);
  determineMet(met);
}

//Determina en que esquina estara la salida
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

//Dibuja el tablero evaluando cada objeto celda
function draw(){
  for (let i = 0; i < tablero.length; i++) {
    tablero[i].zeigen();
  }
  //Esto se explica más adelante
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

//Determina un indice con su posicion de i y j
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > filas - 1) {
    return -1;
  }
  return i + j * cols;
}

//Quitar paredes
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

//Establece elementos de cada objeto de celda
function Celda(i, j) {
  //posicion
  this.i = i;
  this.j = j;
  //Paredes iniciales
  this.pared = [true, true, true, true];
  //Si ha sido visitado antes [No]
  this.pan = false;

//Checa si hay vecinos no visitados y eligue uno al azar
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
  //Si el personaje esta aquí, dibuja su imagen
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    ctx.drawImage(personaje,x,y,w,w)
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 7;
  };

//Dibuja las lineas en el canvas
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

//Dibuja el suelo
    if (this.pan) {
      ctx.drawImage(tile,x,y,w,w);
    }
  };
}


//Basicamente lo mismo que setup, pero recuperando cookies en vez de iniciando de 0
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
  //Current es la casilla actual
  current = tablero[parseInt(pos[0])+parseInt(pos[1])*cols];

  determineMet(parseInt(met));
}

//Draw pero con cookies
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

//Celda normal para cookies pero con un giro
function CeldaN(i,j,tab) {
  this.i = i;
  this.j = j;
  let x = this.i * w;
  let y = this.j * w;
  this.pan = true;

//La traducción de los números de las cookies pero de vuelta a paredes
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
  //Mismas funciones
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

//Si es falso el juego deja de funcionar, solo ocurre all llegar a la meta
var on = true;

function game(evt) {
  if (on) {
    //Establece un cronómetro para el puntaje
    var crono = setInterval(()=>{
      timer++;
    },300);
    if (checkGen()) {
      //Establece valores para el movimiento
      let speedX, speedY, next;
      //Establece un current si no existe aun ninguno
      if (!current) {
        let current = tablero[index((cols/2)-1,(filas/2)-1)];
      }
      //Recupera la meta
      var meta = tablero[index(esq1,esq2)];
      //Before funciona si se intenta mover en direccion a una pared, el before siempre oma el valor anterior de current y se ocupa ese
      if (before && !current) {
        movimientos--;
        current = before;
      }
      //Movimientos con flechas y WASD
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
      //Cada vez que se presiona se aumenta un movimiento
      movimientos++;
      //Se actualiza contador
      document.getElementById("moves").innerHTML = "<p>Movimientos: "+movimientos+"</p>";
      //Actualización de valores;
      before = current;
      current = next;
      //Si se llega a la meta
      if (current && current.i == meta.i && current.j == meta.j) {
        //Se apaga el juego
        on = false;
        //Se para el cronómetro
        clearInterval(crono);
        //Calculo de puntaje
        if (timer <= 3000 * nivel) {
          puntos = Math.round(3000 - (parseInt(timer)/Math.pow(nivel,2)));
        }
        else {
          puntos = 0;
        }
        //Se actualiza el puntaje total
        puntaje += parseInt(puntos);
        nivel++;
        //Establece cookies y borra las de tablero para crear un nuevo tablero del siguiente nivel
        setTimeout(()=>{
          document.cookie = "nivel="+ nivel;
          document.cookie = "puntaje="+ puntaje;
          document.cookie = "movimientos="+ movimientos;
          $.cookie("estado","xd");
          document.cookie = "tablero=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          document.cookie = "pos=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          document.cookie = "met=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
          //Pone la animación de apagado
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
