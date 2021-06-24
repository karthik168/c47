//Creating Variables
var PLAY      = 1;
var END       = 0;
var gameState = PLAY;

var house, houseImg;
var shinchan, shinchanImg;

var chocoChip, chocoChipImg, chocoChipGrp;
var pudding, puddingImg, puddingGrp;
var cake, cakeImg, cakeGrp;

var shimlaMirch, shimlaMirchImg, shimlaMirchGrp;

var bgMusic;
var invisibleLine;

var clickMe, clickMeImg;
var restart, restartIcon;
var gameover, gameoverIcon;

var score = 0;

function preload(){
  
//Loading Images and Sounds
houseImg         = loadImage("House Bg.png");
shinchanImg      = loadImage("Shinchan.png");
chocoChipImg     = loadImage("Choco Chip.png");
puddingImg       = loadImage("Pudding.png");
cakeImg          = loadImage("Stawberry Cake.png");
shimlaMirchImg   = loadImage("Shimla mirch.png");
restartIcon      = loadImage("StartImg.png");
gameoverIcon     = loadImage("shinchan croppped.png");
clickMeImg       = loadImage("Click me.png");
  
bgMusic          = loadSound("bg music.mp3");
  
}

function setup() {
  
//Creating a play area
createCanvas(windowWidth, windowHeight);


  
//Creating the house
house = createSprite(200,200);
house.addImage("house",houseImg);
house.scale     = 0.5;  
house.velocityX = 0.7;

//Creating Shinchan
shinchan = createSprite(450,360);
shinchan.addImage(shinchanImg);
shinchan.scale = 0.5;  
shinchan.setCollider("circle", 0,0,100);
shinchan.debug = false;
  
//Creating the invisibleLine
invisibleLine = createSprite(300,430,600,10);
invisibleLine.visible = false;

//Creating the restartIcon
restart = createSprite(300,300);
restart.addImage(restartIcon);
restart.scale = 0.5;  

//Creating the gameoverIcon
gameover = createSprite(300,200);
gameover.addImage(gameoverIcon);
  
//Creating the clickMeImg
clickMe = createSprite(300,400);
clickMe.addImage(clickMeImg);
clickMe.scale = 0.1; 
  
chocoChipGrp   = new Group();
puddingGrp     = new Group();
cakeGrp        = new Group();
shimlaMirchGrp = new Group();

}

function draw() {
  
//Fixing background color as white
background("white");

textSize(30);
text("press the space key to jump and for moving use right and left arrow key",30,510);
fill("blue");
  
if(gameState === PLAY){
  
house.visible    = true;
shinchan.visible = true;
gameover.visible = false;
restart.visible  = false;
clickMe.visible  = false;
  
//To create an effect of infinite scrolling
if(house.x > 340) {
   house.x = 300;
}
  
//To make sure that shinchan does not fall off
shinchan.collide(invisibleLine);
  
//To make the shinchan jump  
if(keyDown("space") || (touches.length > 0)){
shinchan.velocityY = -12;
  touches = []
 // bgMusic.loop();
}

//Adding gravity
shinchan.velocityY = shinchan.velocityY + 0.8;

//To control shinchan  
if(keyDown("left_arrow")) {
   shinchan.x = shinchan.x - 9; 
}
  
if(keyDown("right_arrow")) {
   shinchan.x = shinchan.x + 9; 
}
 
//To call the functions
food1();
food2();
food3();
enemy1();
  
if(shinchan.isTouching(chocoChipGrp)) {
score = score + 1;
chocoChipGrp.destroyEach();
}
  
if(shinchan.isTouching(puddingGrp)) {
score = score + 1;
puddingGrp.destroyEach();
}
  
if(shinchan.isTouching(cakeGrp)) {
score = score + 1;
cakeGrp.destroyEach();
}
 
if(shimlaMirchGrp.isTouching(shinchan)){
   gameState = END;
}
}
  
if (gameState === END) {
  
house.visible    = false;
shinchan.visible = false;
   
background("black");
  
//To display text
textSize(23);
stroke("yellow");
fill("yellow");
text("Click", 220,400);
  
//To display text
textSize(23);
stroke("yellow");
fill("yellow");
text("to play", 330,400);
  
//To display text
textSize(27);
stroke("red");
fill("red");
text("I hate shimla mirch", 300,150);

gameover.visible = true;
restart.visible  = true;
clickMe.visible  = true;

chocoChipGrp.destroyEach();
puddingGrp.destroyEach();
cakeGrp.destroyEach();
shimlaMirchGrp.destroyEach();
      
if(mousePressedOver(restart) || (touches.length > 0)) {
   reset();
   touches = []
}  
} 
 
//To draw the sprites
drawSprites()

//To display score
textSize(23);
stroke("purple");
fill("purple");
text("Score: "+ score, 50,450);
 
}

//Creating a function for chocoChip
function food1() {
if(frameCount % 100 === 0) {
chocoChip = createSprite(600,150,40,10);
chocoChip.velocityX = -9;
chocoChip.lifetime  = 120;
chocoChip.addImage(chocoChipImg);
chocoChip.scale = 0.2; 
chocoChip.y = Math.round(random(10,200));  
chocoChipGrp.add(chocoChip);  
}
}

//Creating a function for pudding
function food2() {
if(frameCount % 150 === 0) {
pudding = createSprite(600,150,40,10);
pudding.velocityX = -9;
pudding.lifetime  = 120;
pudding.addImage(puddingImg);
pudding.scale = 0.2;
pudding.y = Math.round(random(50,200));  
puddingGrp.add(pudding);  
}
}

//Creating a function for cake
function food3() {
if(frameCount % 200 === 0) {
cake = createSprite(600,150,40,10);
cake.velocityX = -9;
cake.lifetime  = 120;
cake.addImage(cakeImg);
cake.scale = 0.2;
cake.y = Math.round(random(100,200));  
cakeGrp.add(cake);  
}
}

//Creating a function for shimlaMirch
function enemy1() {
if(frameCount % 50 === 0) {
shimlaMirch = createSprite(600,50,40,10);
shimlaMirch.velocityX = -9;
shimlaMirch.lifetime  = 120;
shimlaMirch.addImage(shimlaMirchImg);
shimlaMirch.scale = 0.2;
shimlaMirch.y = Math.round(random(200,300));  
shimlaMirchGrp.add(shimlaMirch);  
}
}

function reset() {
gameState = PLAY;
shinchan.x = 450;
shinchan.y = 400;
score = 0;
}