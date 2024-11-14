// Declaration of global variables for images and an array to store image data
let kiss;
let hearts; 
let turtle; 
let saturn;
let shards = [];

// Preload function to load images before setup
function preload() {  
  // Load images
  hearts = loadImage('assests/hearts.jpg');
  kiss = loadImage('assests/kiss.png');
  turtle = loadImage('assests/turtle.png'); 
  saturn = loadImage('assests/saturn.png');
  kitty = loadImage('assests/hellokitty.png');

  // Set pixel density
  pixelDensity(1); 
}

// Setup function to initialize canvas and other settings
function setup() {  
  // Create canvas with dimensions of hearts image
  createCanvas(hearts.width, hearts.height); 

  // Create mask for kiss image
  createMask(kiss);

  // Resize hearts image to fit canvas
  hearts.resize(width,height);

  // Loop to create shards and draw them
  for(var i = 0;i<10;i++){
    // Create shard object
    var shard =  {}
    shard.img = hearts;
    shard.sx = 0;
    shard.sy = 0;
    shard.sw = 35;
    shard.sh = 0;
    shard.dx = i*width/9 + random(-20,20);;
    shard.dy = 570+ random(-10,10);;
    shard.dw = 55+ random(-20,20);;
    shard.dh = 70 + random(-20,20);
    // Add shard to shards array
    shards.push(shard)
    // Draw shard
    drawShard(shard)
  }
  // Another loop to create more shards and draw them
  for(var i = 0;i<10;i++){
    var shard =  {}
    shard.img = hearts;
    shard.sx = 0;
    shard.sy = 0;
    shard.sw = 45;
    shard.sh = 0;
    shard.dx = i*width/9+ random(-10,10);;
    shard.dy = 23+ random(-10,10);;
    shard.dw = 55+ random(-20,20);
    shard.dh = 60+ random(-20,20);
    // Add shard to shards array
    shards.push(shard)
    // Draw shard
    drawShard(shard)
  }
}

// Draw function to render graphics on canvas
function draw() {
  // Set blending mode and color mode
  blendMode(BLEND);
  colorMode(RGB);

  // Draw hearts image
  image(hearts,0,0,width,height); 

  // Invert colors of saturn image
  saturn.filter(INVERT);

  // Apply threshold filter to image
  filter(THRESHOLD,10);

  // Loop through shards array and draw each shard
  for (let i=0; i<shards.length; i++)
  {
      drawShard(shards[i]);
  }
  // Stop draw loop after one iteration
  noLoop()

  // Draw kiss mask at random positions
  for(var i = 0; i< 50; i ++){
    drawMask(kiss,random(canvas.width),random(canvas.height),30,30);
  }

  // Draw hello kitty images with tint
  push()
    filter(BLUR,1.2);
    tint(100,10,100,255)
    image(kitty,10,100,200,200);
    image(kitty,400,360,200,200);
  pop();

  // Draw saturn images with blend mode
  push()
  drawMask(saturn,0,200,200,200);
  drawMask(saturn,-30,100,600,600);
  pop()

  tint(255,105,183) 

  // Draw saturn images with blend mode set to BURN
  imageMode(CORNER);
  blendMode(BURN);
  image(saturn, 50, 300, 200, 200);
  image(saturn, 180, 300, 200, 200);
  image(saturn, 235, 180, 200, 200);

  // Draw turtle images in rows
  push();
  let maxturtle = 12;
  translate(width/4, height/3);
  for (let n = 0; n < maxturtle; n++)
  {
    image(turtle, -130, 340, turtle.height/4,turtle.height/4);
    translate(turtle.width/3,0); 
  }
  pop();
    
  push();
  for (let i = 0; i < maxturtle; i++)
  {
    image(turtle, -130, 20, turtle.height/4,turtle.height/4);
    translate(turtle.width/3,0); 
  }
  pop();

  push();
  for (let i = 0; i < maxturtle; i++)
  {
    image(turtle, -130, 150, turtle.height/4,turtle.height/4);
    translate(turtle.width/3,0); 
  }
  pop();
} 

// Function to create a black and white mask image
function createMask(srcImage) {
  srcImage.filter(INVERT); // Invert colors
  srcImage.filter(THRESHOLD,0.75); // Apply threshold filter
  srcImage.filter(ERODE); // Erode image
}

// Function to draw a mask image onto the screen using SCREEN Blend mode
function drawMask(img, x, y, w, h){
    blendMode(ADD);
    image(img, x, y, w, h);
}

// Function to draw a shard
function drawShard(shard)
{
    image(shard.img,
      shard.dx,shard.dy,shard.dw,shard.dh,
      shard.sx,shard.sy,shard.sw,shard.sh)
}


