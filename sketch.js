const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var chao;
var corda;
var corda2;
var corda3;
var melancia;
var ligacao;
var ligacao2;
var ligacao3;
var fundo;
var comida;
var coelho;
var ricardao;
var botao;
var botao2;
var botao3;
var piscando;
var comendo;
var triste;
var musica;
var cortar;
var chorando;
var comer;
var sopro;
var balao;
var bot40;

function preload(){
  fundo = loadImage("./Imagens/background.png");
  comida = loadImage("./Imagens/melon.png");
  coelho = loadImage("./Imagens/Rabbit-01.png");
  piscando = loadAnimation("./Imagens/blink_1.png","./Imagens/blink_2.png","./Imagens/blink_3.png");
  comendo = loadAnimation("./Imagens/eat_0.png","./Imagens/eat_1.png","./Imagens/eat_2.png","./Imagens/eat_3.png","./Imagens/eat_4.png");
  triste = loadAnimation("./Imagens/sad_1.png","./Imagens/sad_2.png","./Imagens/sad_3.png");
  musica = loadSound("./Sons/sound1.mp3");
  cortar = loadSound("./Sons/rope_cut.mp3");
  chorando = loadSound("./Sons/sad.wav");
  comer = loadSound("./Sons/eating_sound.mp3");
  sopro = loadSound("./Sons/air.wav");

  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;

  piscando.looping = true;
  comendo.looping = false;
  triste.looping = false;
}

function setup() 
{
  var taOuN = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(taOuN){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight);
  }

  engine = Engine.create();
  world = engine.world;

  musica.play();
  musica.setVolume(0.5);
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  piscando.frameDelay = 10;
  comendo.frameDelay = 10;
  triste.frameDelay = 10;

  corda = new Rope(8,{x:40, y:30});
  corda2 = new Rope(7,{x:370, y:40});
  corda3 = new Rope(4,{x:400, y:225});
  melancia = Bodies.circle(300,300,15);
  Matter.Composite.add(corda.body,melancia);

  chao = new Chao(200,canH,600,20);
  ligacao = new Ligacao(corda,melancia);
  ligacao2 = new Ligacao(corda2,melancia);
  ligacao3 = new Ligacao(corda3,melancia);
  

  ricardao = createSprite(170,canH-110,100,100);
  ricardao.addImage(coelho);
  ricardao.scale = 0.3;
  ricardao.addAnimation("piscando", piscando);
  ricardao.addAnimation("comendo", comendo);
  ricardao.addAnimation("triste", triste);
  ricardao.changeAnimation("piscando");

  botao = createImg("./Imagens/cut_button.png");
  botao.position(20,30);
  botao.size(50,50);
  botao.mouseClicked(quebrar);

  botao2 = createImg("./Imagens/cut_button.png");
  botao2.position(330,35);
  botao2.size(50,50);
  botao2.mouseClicked(quebrar2);

  botao3 = createImg("./Imagens/cut_button.png");
  botao3.position(360,200);
  botao3.size(50,50);
  botao3.mouseClicked(quebrar3);

  bot40 = createImg("./Imagens/mute.png");
  bot40.position(450,20);
  bot40.size(50,50);
  bot40.mouseClicked(multa);
}

function draw() 
{
  background(51);
  image(fundo, width/2, height/2, displayWidth+80, displayHeight);
  Engine.update(engine);
  chao.mostrar();
  corda.mostrar();
  corda2.mostrar();
  corda3.mostrar();
  drawSprites();
  if (melancia!==null){
    image(comida,melancia.position.x, melancia.position.y, 100, 100);
  }
  if (colidir(melancia, ricardao) === true){
    ricardao.changeAnimation("comendo");
    comer.play();
  }
  if (melancia!==null && melancia.position.y >= height-70){
    ricardao.changeAnimation("triste");
    melancia = null;
    musica.stop();
    chorando.play();
  }
}

function quebrar(){
  cortar.play();
  corda.break();
  ligacao.quebrar();
  ligacao = null;
}

function quebrar2(){
  cortar.play();
  corda2.break();
  ligacao2.quebrar();
  ligacao2 = null;
}

function quebrar3(){
  cortar.play();
  corda3.break();
  ligacao3.quebrar();
  ligacao3 = null;
}

function colidir(corpo, sprite){
  if (corpo!==null){
    var distancia = dist(corpo.position.x, corpo.position.y, sprite.position.x, sprite.position.y);
    if (distancia <= 80){
      World.remove(engine.world, melancia);
      melancia = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function vento(){
  Matter.Body.applyForce(melancia, {x:0,y:0}, {x:0.01,y:0});
  sopro.play();
}

function multa(){
  if(musica.isPlaying()){
    musica.stop();
  } else {
    musica.play();
  }
}