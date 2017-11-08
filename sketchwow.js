var ropes = [];
var collisionSize;
var debugMode = false;

var gravitySlider;
var airDragSlider;
var elasticitySlider;
var thicknessSlider;
var collisionSizeSlider;
var debugButton;


function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("imgs/bg04.png");  
  
  // Create on-screen controls.
  // gravitySlider = new SliderLayout("Gravity", 0.5, 5, 5, 0.1 );
  // airDragSlider = new SliderLayout("Air drag", 0.1, 0.5, 0.2, 0.1);
  // elasticitySlider = new SliderLayout("Elasticity", 0.05, 0.3, 0.1, 0.01);
  // thicknessSlider = new SliderLayout("Stroke thickness", 1, 4, 4, 0.1);
  // collisionSizeSlider = new SliderLayout("Collision size", 50, 150, 100, 1);
  // debugButton = createButton("Toggle debug display");
  // debugButton.position(100, collisionSizeSlider.slider.position().y+40);
  // debugButton.mousePressed(debugButtonOnClick);
  
  var ropeCount = 150;
  
  // Create a series of ropes along the scene's width.
  for (var i = 0; i < ropeCount; i++) {
    var x = map(i, 0, ropeCount, width/2-width, width/2+width);
    var y = 0;

    var newRope = new Rope(x, y, 10);
    ropes.push(newRope);
  }
} 


function draw() {
  background(255);
  image(img, 0, 0, width, height);
  collisionSize = 100;
  
  // Display collision object.
  noStroke();
  fill(255, 241, 1);
  ellipse(mouseX, mouseY, collisionSize*2, collisionSize*2);
  
  // React against collision object.
  for (var i = 0; i < ropes.length; i++) {
    for (var j = 0; j < ropes[i].objs.length; j++) {
      var d = dist(mouseX, mouseY, ropes[i].objs[j].pos.x, ropes[i].objs[j].pos.y);
      
      if (d < collisionSize) {
        // Push ball away from collision object.
        var force = new p5.Vector(ropes[i].objs[j].pos.x, ropes[i].objs[j].pos.y);
        force.sub(mouseX, mouseY);
        force.normalize();
        force.mult(2);
        ropes[i].objs[j].acc.add(force);
      }
    }
    
    ropes[i].display();
  }
  
  // Display on-screen controls.
  // gravitySlider.display();
  // airDragSlider.display();
  // elasticitySlider.display();
  // thicknessSlider.display();
  // collisionSizeSlider.display();
}

// Seeks after a target and creates a spring effect.
function Spring(x, y, maxForce) {
  
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.target = new p5.Vector(x, y);
  this.maxForce = maxForce;
  
  this.move = function() {
    var distThreshold = 20;
    
    // Move towards the target.
    var push = new p5.Vector(this.target.x, this.target.y);
    var distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    var force = map(min(distance, distThreshold), 0, distThreshold, 0, this.maxForce);
    push.sub(this.pos);
    push.normalize();
    push.mult(force);
    this.acc.add(push);
    
    // Add air-drag.
    this.vel.mult(1-0.2);
    
    // Move it.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.display = function() {
    strokeWeight(1);
    stroke(0);
    line(this.target.x, this.target.y, this.pos.x, this.pos.y);
    
    strokeWeight(5);
    stroke(0, 255, 0);
    point(this.pos.x, this.pos.y);
  }
}

// Attaches to another object and acts as a bouncy pendulum.
function Pendulum(x, y, parent) {
  
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.mass = 2;
  this.parent = parent;
  
  this.restLength = p5.Vector.dist(this.pos, this.parent.pos);
  
  this.move = function() {
    // Push down with gravity.
    var gravity = new p5.Vector(0, 5.3);
    gravity.div(this.mass);
    this.acc.add(gravity);
    
    // Add air-drag.
    this.vel.mult(1-0.2);
    this.vel.limit(5);
    
    // Move it.
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    // Adjust its spring.
    var currentLength = p5.Vector.dist(this.pos, this.parent.pos);
    
    var spring = new p5.Vector(this.pos.x, this.pos.y);
    spring.sub(this.parent.pos);
    spring.normalize();
    
    var stretchLength = currentLength-this.restLength;
    spring.mult(-0.1*stretchLength);
    spring.div(this.mass);
    this.acc.add(spring);
  }
  
  this.display = function() {
    if (this.parent != null) {
      strokeWeight(1);
      stroke(0);
      line(this.parent.pos.x, this.parent.pos.y, this.pos.x, this.pos.y);
    }
    
    strokeWeight(5);
    stroke(0, 255, 0);
    point(this.pos.x, this.pos.y);
  }
}

// Uses a series of dynamic objects but displays them as a single line.
function Rope(x, y, count) {
  
  this.objs = [];
  
  this.objs.push(new Spring(x, y, 1));

  for (var i = 0; i < count; i++) {
    this.objs.push(new Pendulum(x, y+i*15, this.objs[this.objs.length-1]))
  }
  
  this.display = function() {
    noFill();
    stroke(62,58,57);
    strokeWeight(7); //thickness
    
    beginShape();
    curveVertex(this.objs[0].pos.x, this.objs[0].pos.y);
    
    for (var i = 0; i < this.objs.length; i++) {
      this.objs[i].move();
      
      if (debugMode) {
        this.objs[i].display();
      } else {
        curveVertex(this.objs[i].pos.x, this.objs[i].pos.y);
      }
    }
    
    curveVertex(this.objs[this.objs.length-1].pos.x, this.objs[this.objs.length-1].pos.y);
    endShape();
  }
}