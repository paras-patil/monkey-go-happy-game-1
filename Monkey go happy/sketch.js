var monkey, monkey_running, ground;
var bananas, bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var survivalTime;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  survivalTime = 0;


  ground = createSprite(400, 355, 900, 10);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  ground.shapeColor = "brown";


  obstaclesGroup = new Group();
  FoodGroup = new Group();

  score = 0;
}


function draw() {
  background("darkgreen");

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  banana();
  obstacles();



  drawSprites();
  stroke("black");
  textSize(15);
  fill("black");
  text("Score:" + score, 300, 50);

  if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);


  }


  if (FoodGroup.isTouching(monkey)) {
    score = score + 4;
    FoodGroup.destroyEach();
  }



  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 50, 50);
}


function banana() {
  if (frameCount % 80 === 0) {
    bananas = createSprite(600, 250, 40, 10);
    bananas.y = Math.round(random(120, 200));
    bananas.velocityX = -4;


    bananas.lifetime = 300;
    monkey.depth = bananas.depth + 1;

    bananas.addImage(bananaImage);
    bananas.scale = 0.1;



    FoodGroup.add(bananas);

  }

}



function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -5;


    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;

    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }

}