var bordas,  soloInvisivel; 
var imagemDaNuvem, pontuacao, grupoDeNuvens;
var imagemFimDoJogo;
var imagemReiniciar, somSalto, somMorte, somCheckPoint, fimDoJogo; 
var reiniciar, nuvem, fundo,sol, solImg;
var boy,boyImg;
var rodolfo,rodolfoImg;
var banana,bananaImg;
var grupodeBanana;
var latadelixo,latadelixoImg;
var grupodeLixo;
var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo= JOGAR;
var boliche;
var grupodeBoliche;
var bolicheImg;
var capacete;
var grupodeCapacete;
var capaceteImg;
var live = 4;


function preload(){
  
  fundo = loadImage('background.webp');
  solImg = loadImage('solcor.png');
  boyImg = loadImage('corredor.png');
  rodolfoImg = loadImage('Rodolfo.png');
  bananaImg = loadImage('banana.webp');
  latadelixoImg = loadImage('lixo.png');
  capaceteImg = loadImage('capacete.png');
  bolicheImg = loadImage('bola.png');
  
  
  
  
  //carregar imagem da nuvem
  imagemDaNuvem = loadImage("nuvemcor.png");
  
  //carregar imagens de final
  imagemFimDoJogo= loadImage("fimDoJogocor.png");
  imagemReiniciar= loadImage("reiniciarcor.png");
  
  //carregar sons
  somSalto = loadSound("pulo.mp3");
  somMorte = loadSound("morte.mp3");
  somCheckPoint = loadSound("checkPoint.mp3");
}

function setup(){
  
  //cria a tela
  createCanvas(windowWidth,windowHeight);
  
  sol = createSprite(width-50,40);
  sol.addImage('sol', solImg);
  sol.scale = 0.15;
  
  //cria solo
  //solo = createSprite(width/2,height,width,20);
  //adiciona imagem de solo
  //solo.addImage("solo", imagemDoSolo)
  //solo.x = width/2;
  //solo.scale = 0.6;
  
  //cria solo invisível
  soloInvisivel = createSprite(300,height-10,600,10);
  soloInvisivel.visible = false;
  
  //cria sprite do Personagem
   boy = createSprite(width-10,height-200);
   boy.addImage(boyImg);
   boy.velocity.x = -5;
   
   rodolfo = createSprite(width-10,height-200)
   rodolfo.addImage(rodolfoImg);
   rodolfo.velocity.x = -5;
   rodolfo.scale = 0.3;

  //adiciona a animação de Personagem 
 
  //adiciona a animação de Personagem 2 
  
  //atribuir valor inicial à pontuação
  pontuacao = 0
  
  //criar grupos de nuvens e obstáculos
  grupoDeNuvens = new Group();
  //adicionar e ajustar imagens do fim
  fimDoJogo = createSprite(width/2,height/2-20,400,20);
  fimDoJogo.addImage(imagemFimDoJogo);

  reiniciar = createSprite(width/2,height/2+20);
  reiniciar.addImage(imagemReiniciar);

  fimDoJogo.scale = 0.5;
  fimDoJogo.depth = fimDoJogo.depth+100
  reiniciar.scale = 0.07;
  reiniciar.depth = reiniciar.depth+100
  fimDoJogo.visible = false;
  reiniciar.visible = false;
  
  grupodeBanana = new Group();
  grupodeLixo = new Group();
  grupodeBoliche = new Group();
  grupodeCapacete = new Group();
  
  //para boy inteligente
  //boy.setCollider("rectangle",250,0);

}

function draw(){
  //fundo branco
  background(fundo);
  
  fill('white');
  textSize(16);
  text("Pontuação: "+pontuacao,width/2-50,30);
  
  //desenha os sprites
  drawSprites();
  
  //Personagem colide com o soloinvisivel
 
   
  //estados de jogo
  if(estadoJogo === JOGAR){
  
    
    //faz o T-Rex correr adicionando velocidade ao solo
    //solo.velocityX = -(8 + pontuacao/30);
    //faz o solo voltar ao centro se metade dele sair da tela
    if (boy.x<0){
      boy.x=width-10;
      
    }
    if (rodolfo.x<0){
      rodolfo.x=width-10;
      
    }
    //som a cada 100 pontos
    if(pontuacao>0 && pontuacao%100 === 0){
        somCheckPoint.play();
    }
    
    //Personagem pula ao apertar espaço
    if(touches.length>0 && boy.y>height-80 || keyDown('space') && boy.y>height-80){
      boy.velocityY = -16; 
      somSalto.play();
      touches = [];
    }
    
    //gravidade
    //boy.velocityY = boy.velocityY + 1;
    
    
    //gerar obstáculos
    gerarBanana();
    gerarBoliche();
    gerarCapacete();
    gerarlixo();
    gerarLive();
    
    //pontuação continua rodando
    pontuacao = pontuacao + Math.round(frameRate()/42)
    

    //imagens do fim ficam invisíveis
    fimDoJogo.visible = false;
    reiniciar.visible = false;
    
    //quando o boy toca o obstáculo, o jogo se encerra
    /*
    if(grupodeBanana.isTouching(boy)){
      estadoJogo = ENCERRAR;
      //som de morte
      somMorte.play();
      
      //boy inteligente
      //boy.velocityY= -12;
      //somSalto.play();
    }
    */
  } else if(estadoJogo === ENCERRAR){
    //para os sprites em movimento
   
    solo.velocityX = 0;
   
    
    //Altera a animação do Personagem colidido
   
    //mostrar imagens do fim
    fimDoJogo.visible = true;
    reiniciar.visible = true;
    
    if(mousePressedOver(reiniciar)|| touches.length>0){
      reinicie();
      touches = [];
    }
    
  }
}




function gerarBanana(){
  //criar sprite de obstáculo a cada 60 quadros
  if(frameCount %500 === 0){
    banana = createSprite(Math.round(random(0,width)),height-900,10,40);
    banana.addImage(bananaImg)
    banana.velocity.y= 5;
    banana.scale = 0.1;
  
   
    
    //atribuir escala e tempo de vida aos obstáculos
    //banana.scale = 0.4;
    //banana.lifetime = width/4;
    //ajustar profundidade da nuvem
    //banana.depth = boy.depth;
    //boy.depth = boy.depth +1;
    //adicionar a um grupo
    grupodeBanana.add(banana);
  } 
}


function reinicie(){
  estadoJogo = JOGAR;
  fimDoJogo.visible = false;
  reiniciar.visible = false;
  
  grupodeBanana.destroyEach();
  grupoDeNuvens.destroyEach();
  grupodeBoliche.destroyEach();
  grupodeCapacete.destroyEach();
  
  
//boy.changeAnimation("correndo", boy_correndo);
  
  pontuacao = 0;
}
function gerarlixo(){
  if(frameCount %100 === 0){
    latadelixo = createSprite(Math.round(random(0,width-10)),height-50,10,40);
    latadelixo.addImage(latadelixoImg);
    latadelixo.velocity.x= 5;
    
    //atribuir escala e tempo de vida aos obstáculos
    //banana.scale = 0.4;
    //banana.lifetime = width/4;
    //ajustar profundidade da nuvem
    //banana.depth = boy.depth;
    //boy.depth = boy.depth +1;
    //adicionar a um grupo
    grupodeLixo.add(latadelixo);
}



}
function gerarCapacete(){
   if(frameCount %1000 === 0){
    capacete = createSprite(Math.round(random(0,width-10)),height-900,10,40);
    capacete.addImage(capaceteImg);
    capacete.velocity.y= 5;
    capacete.scale = 0.09;
    grupodeCapacete.add(capacete);

   }






}
function gerarBoliche(){
  if(frameCount %200 === 0){
    boliche = createSprite(Math.round(random(0,width)),height-900,10,40);
    boliche.addImage(bolicheImg);
    boliche.scale = 0.1;
    boliche.velocity.y= 5;
    grupodeBoliche.add(boliche);
    



}
}
function gerarLive(){
  //live =live -1;
 if (grupodeLixo.isTouching(boy)) {
   live =live -1;
 }






}