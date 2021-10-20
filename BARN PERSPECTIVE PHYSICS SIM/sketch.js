
let observerA;
let observerB;
let door1;
let door2;

function setup() {
  createCanvas(2000, 800);

  observerA = new Observer(100, 1200, 1);
  observerB = new Observer(300, 1200, 1);
  door1 = new Observer(1000, 760, 1);
  door2 = new Observer(1150, 760, 1);
  background(0);
}

function draw() {
  
  background(0);

  if (mouseIsPressed){ // CONTROLS ACCELERATION IN X-AXIS
    if (mouseButton === LEFT) {
     let accel = createVector(100, 0);
     observerA.applyForce(accel);
     observerB.applyForce(accel);
    }
    if (mouseButton === RIGHT) {
     let stop = createVector(-2, 0);
     observerA.applyForce(stop);
     observerB.applyForce(stop);
    }
  }

    // GRAVITY VECTOR
    let gravity = createVector(0, 0.8);
    let weightObsA = p5.Vector.mult(gravity, observerA.mass)
    let weightObsB = p5.Vector.mult(gravity, observerB.mass)
    observerA.applyForce(weightObsA);
    observerB.applyForce(weightObsB);

  //observerA.drag();
  //observerA.friction();
  observerA.update();
  observerA.ground();
  observerA.showLadder();
  setInterval(observerA.TimeDilation(), 1000);

  //observerB.drag();
  //observerB.friction();
  observerB.update();
  observerB.ground();
  observerB.showLadder();
  //setInterval(observerB.TimeDilation(), 1000);

  let c = 10;
   function LengthContraction(l){
    let velocity1 = observerB.vel.copy();
        if(velocity1.mag() >= 0.1){
            let speedSq = observerB.vel.magSq();
            let L = l * (Math.sqrt(Math.abs(1 - (speedSq/(c**2)))));
            //console.log([l, L]);
            return L;
        }
      }

      let L = LengthContraction(200);

      /* if (observerB.pos.x - observerB.pos.x < L){
        let Lcon = createVector(-1, 0);
        observerB.applyForce(Lcon);
      } */
      
      let velocity1 = observerB.vel.copy();
        if(velocity1.mag() >= 1){
      if (observerB.pos.x - observerA.pos.x > L){
        let Lcon2 = createVector(-1, 0);
        observerB.applyForce(Lcon2);
      }
      if (observerB.pos.x - observerA.pos.x < L){
        let Lcon = createVector(1, 0);
        observerB.applyForce(Lcon);
      }
    }

      /* console.log(observerB.pos.x - observerA.pos.x);
      console.log("Units between end of barn and end of ladder:")
      console.log(door2.pos.x - observerB.pos.x);
      console.log("Units between end of barn and start of ladder:")
      console.log(door2.pos.x - observerA.pos.x); */

      door1.update();
      door1.ground();
      let col = 255;
        stroke(255);
        strokeWeight(2);
            if (observerA.pos.x > door1.pos.x){
              col = 0;
            }
            if (observerB.pos.x > door2.pos.x){
              col = 255;
            }
        fill(255, col);
        rect(1000, 760, 10, 50);
        //point(this.pos.x, this.pos.y);
      
      door2.update();
      door2.ground();
      stroke(255);
        strokeWeight(2);
            if (observerA.pos.x > door1.pos.x){
               col = 0;
              }
            if (observerB.pos.x > door2.pos.x){
              col = 255;
            }
        fill(255, col);
        rect(1150, 760, 10, 50);

        let a = 0;
        let b = 0;
        if (observerA.pos.x > door1.pos.x){
          a = 1;
        }
        if (observerB.pos.x < door2.pos.x){
          b = 1;
        }
        if (a + b === 2){
          console.log("It fits!" + " " + L)
        }
        
        console.log(observerB.pos.x - observerA.pos.x);
        
      }