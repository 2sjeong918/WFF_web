const block_size=25;const block_core=1;const block_move_distance=5;const block_move_range=100;const block_scale=0.02;const ripple_speed=0.24;let mouse_speed;let fps,avgFps=0;let prevFrame=0;let prevTime=0;let fpsInterval=100;let blocks;let ripples=[];function setup(){createCanvas(windowWidth,windowHeight);noStroke();fill(255);rectMode(CENTER);noSmooth();let left_padding=Math.round(width%block_size)/2;let top_padding=Math.round(height%block_size)/2;blocks=Array.from({length:Math.floor(height/block_size)},(v,y)=>Array.from({length:Math.floor(width/block_size)},(v,x)=>new Block(left_padding+block_size*(x+0.5),top_padding+block_size*(y+0.5),y*Math.floor(width/block_size)+x)))}function draw(){fps=frameRate();if(millis()-prevTime>fpsInterval){avgFps=(frameCount-prevFrame)/fpsInterval*100;prevFrame=frameCount;prevTime=millis()}mouse_speed=dist(mouseX,mouseY,pmouseX,pmouseY);background(255,140);rectMode(CENTER);ripples.forEach((ripple,i)=>{ripple.updateRadius();ripple.checkKill()});noStroke();blocks.forEach((line,i)=>line.forEach((block,j)=>{block.calcDiff(ripples);block.render()}))}function mousePressed(){ripples.push(new Ripple(mouseX,mouseY,1))}function mouseMoved(){if(random()<pow(fps/60,3)*mouse_speed/30){ripples.push(new Ripple(mouseX,mouseY,0.15*mouse_speed/40))}}class Block{constructor(x,y,id){this.pos=createVector(x,y);this.id=id}render(){fill(cubicInOut(this.amp,20,235,10),cubicInOut(this.amp,20,210,10),1);rect(this.pos.x+this.diff.x,this.pos.y+this.diff.y,28,1);rect(this.pos.x+this.diff.x,this.pos.y+this.diff.y,1,28)}calcDiff(ripples){this.diff=createVector(0,0);this.amp=0;ripples.forEach((ripple,i)=>{if(!ripple.dists[this.id]){ripple.dists[this.id]=dist(this.pos.x,this.pos.y,ripple.pos.x,ripple.pos.y)};let distance=ripple.dists[this.id]-ripple.currRadius;if(distance<0&&distance>-block_move_range*2){if(!ripple.angles[this.id]){ripple.angles[this.id]=p5.Vector.sub(this.pos,ripple.pos).heading()};const angle=ripple.angles[this.id];const localAmp=cubicInOut(-abs(block_move_range+distance)+block_move_range,0,block_move_distance,block_move_range)*ripple.scale;this.amp+=localAmp;const movement=p5.Vector.fromAngle(angle).mult(localAmp);this.diff.add(movement)}})}}class Ripple{constructor(x,y,scale){this.pos=createVector(x,y);this.initTime=millis();this.currRadius=0;this.endRadius=max(dist(this.pos.x,this.pos.y,0,0),dist(this.pos.x,this.pos.y,0,height),dist(this.pos.x,this.pos.y,width,0),dist(this.pos.x,this.pos.y,height,width))+block_move_range;this.scale=scale;this.dists=[];this.angles=[]}checkKill(){if(this.currRadius>this.endRadius){ripples.splice(ripples.indexOf(this),1)}}updateRadius(){this.currRadius=(millis()-this.initTime)*ripple_speed}draw(){stroke(20,cubicInOut(this.scale,30,120,1));noFill();ellipse(this.pos.x,this.pos.y,this.currRadius*2,this.currRadius*2)}}function cubicInOut(t,b,c,d){if(t<=0)return b;else if(t>=d)return b+c;else{t/=d/2;if(t<1)return c/2*t*t*t+b;t-=2;return c/2*(t*t*t+2)+b}}