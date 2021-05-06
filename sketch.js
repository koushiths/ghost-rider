var tower,towerImg
var door,doorImg,doorsGroup
var climber,climberImg,climbersGroup
var ghost,ghostImg
var invisibleBlock,invisibleBlocksGroup
var gameState="play"


function preload(){
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
  invisibleBlocksGroup=new Group()
  doorsGroup=new Group()
  climbersGroup=new Group()
}


function setup() {
  createCanvas(600, 600);
  
  tower=createSprite(300,300)
  tower.addImage(towerImg)
  tower.velocityY=1
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
}

function draw() {
  background(0);
  
  if(gameState==="play"){
  
  if(tower.y>400){
     tower.y=300
     }
  
  if(invisibleBlocksGroup.isTouching(ghost)){
    ghost.destroy()
    gameState="end"
  }
  
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3
}
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3
}
  
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
     
     }
  
  spawnDoors()
  
  drawSprites();
  }
  
  if(gameState==="end"){
    fill("red")
    textSize(30)
    text("GAMEOVER",230,250)
  }
}
function spawnDoors(){
  if(frameCount%240===0){
     door=createSprite(200,-50)
    climber=createSprite(200,10)
    invisibleBlock=createSprite(200,15,climber.width,2)
    climber.addImage(climberImg)
    door.addImage(doorImg)
    door.x=Math.round(random(120,400))
    climber.x=door.x
    climber.velocityY=1
    invisibleBlock.x=door.x
    invisibleBlock.lifetime=800
    invisibleBlock.velocityY=1
    climber.lifetime=800
    door.velocityY=1
    door.lifetime=800
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlocksGroup.add(invisibleBlock)
    invisibleBlock.debug=true
    ghost.depth=door.depth
    ghost.depth+=1
     }
}

