var spline;
var stepSlider;
var maxVelSlider;
var tolSlider;

function setup() {
  createCanvas(800, 600);
  spline = new Spline();
  createP("Generation settings");
  createP("StepSize");
  stepSlider = createSlider(0.1, 2, 0.5, 0.05);
  createP("MaxVel");
  maxVelSlider = createSlider(1, 10, 4, 0.05);
  createP("CurveTolerance");
  tolSlider = createSlider(10, 50, 20, 0.05);
  stepSlider.mousePressed(recalculatePoints);
  tolSlider.mousePressed(recalculatePoints);
  maxVelSlider.mousePressed(recalculatePoints);
}

function draw() {
  background(255);
  spline.update();
  updateSliders();
}

function updateSliders() {
  spline.step = stepSlider.value();
  spline.tol = tolSlider.value();
  spline.maxSpd = maxVelSlider.value();
}

function recalculatePoints() {
  background(255);
  spline.recalculatePoints();
  spline.update();
}

var Spline = function() {
  this.ctrlpoints = new Array();
  this.track = new Array();
  this.step = 0.5;
  this.tol = 20;
  this.debug = true;
  this.maxSpd = 4;
}

Spline.prototype.recalculatePoints = function() {
  var iter = 0;
  var pts = this.ctrlpoints;
  var tgt = createVector(pts[0].x, pts[0].y);
  var pos = createVector(pts[0].x, pts[0].y);
  var vel = createVector(0, 0);
  var last = createVector(pts[pts.length - 1].x, pts[pts.length - 1].y);

  for (var k = 0; k < pts.length * 800; k++) {
    var pl = createVector(tgt.x, tgt.y);
    var diff = pl.sub(pos);
    pl.normalize();
    pl.mult(this.step);
    vel.add(pl);
    vel.setMag(min(vel.mag(), this.maxSpd));
    pos.add(vel);

    if (dist(pos.x, pos.y, tgt.x, tgt.y) < this.tol) {
      iter++;
      tgt = createVector(this.ctrlpoints[iter].x, this.ctrlpoints[iter].y);
      //console.log("Reached waypoint");
    }

    if (dist(pos.x, pos.y, last.x, last.y) < this.tol) {
      break;
    }
    this.track.push(new LineN(pos.x, pos.y));
  }
}

Spline.prototype.display = function() {
  strokeWeight(15);
  //beginShape();
  for (var i = 1; i < this.track.length; i++) {
    //if(this.track[i].x !== this.track[1].x && this.track[i].y !== this.track[1].y)vertex(this.track[i].x, this.track[i].y);

    stroke(0, 0, 0);
    point(this.track[i].x, this.track[i].y);
  }
  //endShape();

  for (var j = 0; j < this.ctrlpoints.length; j++) {
    if (this.debug) {
      stroke(100, 100, 100, 100);
      strokeWeight(this.tol);
      point(this.ctrlpoints[j].x, this.ctrlpoints[j].y);
    }

    stroke(0, 0, 0);
    strokeWeight(3);
    if (i === 0) stroke(255, 0, 0);
    point(this.ctrlpoints[j].x, this.ctrlpoints[j].y);
  }
}

Spline.prototype.update = function() {
  this.display();
}

function mouseClicked() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    spline.ctrlpoints.push(new Node(mouseX, mouseY));
    if (spline.ctrlpoints.length !== 1) spline.recalculatePoints();
  }
}

var Node = function(x, y) {
  this.x = x;
  this.y = y
}

var LineN = function(x, y) {
  this.x = x;
  this.y = y;
}