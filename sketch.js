// variables to load the images
var antImage, obstacleImage,jamImage;

//variables to add the images
var jam, obstacle , ant , ground;

// groups
var FoodGroup, obstacleGroup;

// variable for the score
var score;

// variable to display score/survivalTime
survivalTime = 0;

// game states
var PLAY = 1 , END = 0; gameState = 1;

function preload(){
  
  
  antImage= loadImage("ant.png");
  jamImage = loadImage("jam.png");
  obstacleImage = loadImage("poison.jpg");
 
}



function setup() {
createCanvas(1200,800);
  
//creating the monkey
ant = createSprite(80,315,20,20);
ant.addImage( antImage);
ant.scale = 0.5;
  
//creating the ground
ground = createSprite(400,350,800,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);

// creating the groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  //creating the score
  score = 0;
  
}


function draw() {
background("white");
  
 if(ground.x < 0 ){
    ground.x = ground.width/2;
  }
   if(keyDown("space")){
    ant.velocityY = -12;
  
  }
   // add gravity 
    ant.velocityY = ant.velocityY + 0.8;
  
   // make the ant not fall of the ground
     ant.collide(ground);
   
 //call food and obstacles1 function
      food();
      obstacles1();

      camera.position.x = displayWidth/2;
      camera.position.y = displayHeight/2;

  
drawSprites();

  
 
 
  //display score/survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,100,50);
  


//if(gameState === END){
// destroy the jam and the obstacles if game ends
if(ant.isTouching(obstacleGroup)){
  ground.velocityX = 0;
  ant.velocityY = 0;
 // FoodGroup.destroyEach();
//  obstacleGroup.destroyEach();
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
}
} 
/*}
  
monkey.debug = true;

if(gameState === PLAY){
// destroy the banana when monkey touches it 
if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
}
 
    
  
}*/


// defining the function 'food'

function food(){
if(frameCount%80 === 0){
  jam = createSprite(600,120,10,10);
  jam.addImage(jamImage);
  jam.scale = 0.08;
  jam.y = Math.round(random(300,340));
  jam.velocityX = -3;
//assign lifetime to the banana
  jam.lifetime = 200;
  FoodGroup.add(jam);
  ant.depth = jam.depth+1;

}
}

// defining the function obstacles1

function obstacles1(){
if(frameCount% 300 === 0){
  obstacle = createSprite(400,310,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
 // obstacle.y = Math.round(random(140,200));
  obstacle.velocityX = -3;
  // assign lifetime to the obstacle
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
}
}