var dog, happyDog;
var database;
var foodS, foodStock

function preload()
{
	doggie1 = loadImage("images/dogImg.png");
  doggieHappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500,500);

  database = firebase.database();
  console.log(database);

  doggie = createSprite(250,250,1,1);
  doggie.addImage(doggie1)
  doggie.scale = 0.2

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    doggie.addImage(doggieHappy)
   doggie.scale= 0.2;
  }

  drawSprites();

  textSize(15);
  stroke("black");
  fill("cyan");
  text("Food Remaining:" + foodS, 250,480);

}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

