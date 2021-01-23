var dog;
var happyDog;
var database;
var foodS;
var foodStock;

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){

  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250, 420);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

    /*Code To Feed The Dog
    This action will feed the dog one milk bottle.
    Deduct the count of food left from the firebase.*/

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  fill("Black");
  textSize(20)
  text("Food Remaining: " + foodS, 135, 200);
  textSize(10);
  stroke("black");
  text("Note: Press Up Arrow Key To Feed The Dog Milk!", 130, 10, 300, 20);

}

function readStock(data){
  foodS = data.val();
}
  
function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
  Food: x
 })
}