//1
var particles_a = [];
var particles_b = [];
var particles_c = [];
var particles_d = [];
var nums =120;
var noiseScale = 600;

//2
let gra;
let font;
let deltaSec = 0;

function preload(){
  font = loadFont('assets/NIXGONFONTS.otf');
}

//3
let scrblrs = [];
const COLS = createCols("https://coolors.co/081a20-184c5e-60e1e0-fcfcfc-8b8bae");


//1
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(250,246,242);
  for(var n = 0; n < nums; n++){
    particles_a[n] = new Particle(random(0, width),random(0,height));
    particles_b[n] = new Particle(random(0, width),random(0,height));
    particles_c[n] = new Particle(random(0, width),random(0,height));
    particles_d[n] = new Particle(random(0, width),random(0,height));
  }
  
  init();
  
  for(let m=0; m < 250; m++)
  {
    scrblrs.push(new Scribbler(width/2, height /2));
  }
  
}


let value = 0;


function keyPressed() {
   if (key == '1') {
    background(250,246,242);
   }
}


function draw(){
  if(key=='1'){
    numone();
  }
  else if(key=='2'){
    numtwo();
  }
  else if(key=='3'){
    numthree();
  }
  
}
  
  
function numone(){
  noStroke();
  smooth();
  
  for(var c = 0; c <10; c++){
    for(var i = 0; i < nums; i++){  
      var radius = map(i,0,nums,1,2);
      var radiuss = map(i,0,nums,2,2);
      var alpha = map(i,0,nums,50,150);
      
      fill(255,111,171,alpha);
      particles_a[i].move();
      particles_a[i].display(radius);
      particles_a[i].checkEdge();
  
      fill(59,178,255,alpha);
      particles_b[i].move();
      particles_b[i].display(radius);
      particles_b[i].checkEdge();
  
      fill(54,97,95,alpha);
      particles_c[i].move();
      particles_c[i].display(radius);
      particles_c[i].checkEdge();
      
      fill(250,246,242);
      particles_d[i].move();
      particles_d[i].display(radiuss);
      particles_d[i].checkEdge();
    }
  }
}


function Particle(x, y){
 
  this.dir = createVector(0, 0);
  this.vel = createVector(0,0);
  this.pos = createVector(0,0);
  this.speed = 0.4;

  this.move = function(){
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*400;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  this.checkEdge = function(){
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(0, width);
      this.pos.y = random(0, height);
    }
  }

  this.display = function(r){
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}

//2
function numtwo()
{
  background(255);

  //reset layout
  let pSec = deltaSec;
  deltaSec = Math.floor(millis()/1000);
  if(pSec != deltaSec && deltaSec % 5 == 0)init();
  
  
  //gra
  gra.clear();
  gra.background(255);
  gra.blendMode(MULTIPLY);
  //hour
  gra.textAlign(CENTER,CENTER);
  gra.textSize(gra.width*0.15 + sin(frameCount/90)*gra.width/10);
  gra.fill(220);
  gra.push();
  gra.translate(gra.width/2,gra.height/2);
  gra.rotate(frameCount/80);
  gra.text("What's",0,0);
  gra.pop();
  //sec
  gra.textAlign(CENTER,BOTTOM);
  gra.textSize(gra.width*0.1);
  gra.fill(0);
  gra.text("in your",gra.width/2,(frameCount * 0.85)%(gra.height + gra.textSize()));
  //min
  gra.textAlign(RIGHT,CENTER);
  gra.textSize(gra.height*0.18);
  gra.fill(100);
  gra.text("mirror",frameCount % (gra.width + gra.textSize()*1.5),gra.height*0.3);
  //mask
  gra.erase();
  let triH = gra.width*0.5 * pow(3,0.5);
  gra.triangle(0,triH,0,0,gra.width/2,triH);
  gra.triangle(gra.width,triH,gra.width,0,gra.width/2,triH);
  gra.rect(0,triH,gra.width,gra.height-triH);
  gra.noErase();
  
  
  // tiling gra
  clear();
  let offY = 0; 
  for(let x = -gra.width; x < width + gra.width; x += gra.width*1.5)
  {
    for(let y = -triH; y < height + triH; y+= triH*2){drawHexa(x,y+offY);}
    offY = offY == 0 ? triH : 0;
  }
}


function init(){
  let graSize = Math.floor(max(width,height)/random(2,8));
  gra = createGraphics(graSize,graSize);
  gra.textFont(font);
  
  gra.noStroke();
}

function drawHexa(cx,cy,triGra = gra,radius = gra.width)
{  
  push();
  translate(cx,cy);
  for(let rad = 0; rad < TWO_PI; rad += TWO_PI/3)
  {
    push();
    rotate(rad);
    image(triGra,0,0);
    scale(1,-1);
    image(triGra,0,0);
    pop();
  }
  pop();
}

function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}


//3

function numthree()
{
  background(COLS[0]);

  for(const scrblr of scrblrs){
    scrblr.update();
    scrblr.display();
  }
}



class Scribbler
{
  constructor(x, y)
  {
    this.cX = x;
    this.cY = y;
    this.minRadius = 170;
    this.maxRadius = min(width, height) * 0.4;
    
    this.isMovingAngle = false;
    this.radius = random(this.minRadius, this.maxRadius);
    this.angle = random(TWO_PI);
    this.angleV = 0;
    this.radiusV = 0;
    this.randomVelocities();
    
    this.strokeW = random(1,2.5);
    this.strokeC = COLS[floor(random(1,COLS.length))];
    
    this.cache = [];
    this.cacheCapacity = 120;
    
    this.cycle = floor(random(200,300));
    this.rotateAngle = random(TAU);
    this.rotateAngleTarget = this.rotateAngle + random(-1, 1);
    this.ratio = 0;
    this.frameOffset = floor(random(this.cycle));
  }
  
  
  update()
  {
    //pos
    let curX = (cos(this.angle) * this.radius);
    let curY = (sin(this.angle) * this.radius);
    this.cache.push(createVector(curX,curY));
    if(this.cache.length > this.cacheCapacity) this.cache.shift();
    
    //param
    if(this.isMovingAngle)
    {
      this.angle += this.angleV;
    }
    else 
    {
      if(this.radius < this.minRadius && this.radiusV < 0)this.radius += 0;
      else this.radius += this.radiusV * (1 + this.radius * 0.005);
    }
    if(random(1) > 0.9)
    {
       this.swapMode();
    }
    
    //time
    const count = frameCount + this.frameOffset;
    const cycleRatio = (count % this.cycle) / this.cycle;
    const cycleRatioMult = min(cycleRatio * 4, 1);
    const cycleRatioEased = easingEaseInOutCubic(cycleRatioMult);
    this.ratio = cycleRatioEased;
    if(count % this.cycle == 0){
      this.rotateAngle = this.rotateAngleTarget;
      this.rotateAngleTarget = this.rotateAngle + random(-1, 1);
    }
  }
  
  display()
  {
    let rotateAngle =  lerp(this.rotateAngle, this.rotateAngleTarget, this.ratio);
    let vertRatio =  1 + sin((this.ratio) * TAU) * 0.01;
    stroke(this.strokeC);
    strokeWeight(this.strokeW);
    noFill();
    push();
    translate(this.cX, this.cY);
    rotate(rotateAngle);
    beginShape();
    for(const p of this.cache){
      vertex(p.x * vertRatio, p.y* vertRatio);
    }
    endShape();
    pop();
  }
  
  swapMode()
  {
     this.isMovingAngle = !this.isMovingAngle;
     this.randomVelocities();
  }
  
  randomVelocities()
  {
    const angleSP = 0.05;
    const radiusSP = 2;
    this.angleV = random() > 0.5 ? random(-angleSP, -angleSP * 0.1) : random(angleSP, angleSP * 0.1) ;
    if(this.radius < this.minRadius)this.radiusV =  random(radiusSP * 0.1, radiusSP);
    else if(this.radius > this.maxRadius)this.radiusV =  random(-radiusSP, -radiusSP * 0.1);
    else this.radiusV = random() > 0.5 ? random(radiusSP * 0.1, radiusSP) : random(-radiusSP, -radiusSP * 0.1);
  }
}


function easingEaseInOutCubic (x) {
  if(x < 0.5)return 0.5 * pow(2*x, 3);
  else return 0.5 * pow(2*(x-1), 3) + 1;
}

function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
