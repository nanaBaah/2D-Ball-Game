
/* 
*	Nana Baah 
*   Hamburg University of Applied Sciences (Information Engineering)
*	Matrikel Nr : 2061594 
*	January 6, 2014
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var start = Date.now();

function Smiley (radius, color) { 

    if (radius === undefined) {
        radius = 40;
    }

    this.color = color;
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.vx = 0;
    this.vy = 0;
    this.lineWidth = 1;
    this.angle = Math.PI/2;
}

Smiley.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();
    context.fill();

    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};

var redCircles = new Array();
var velx = 0;
var vely = 0;
var accx = 0;
var accy = 0;

var mySmiley = new Smiley(10, "yellow");
mySmiley.x = canvas.width/2;
mySmiley.y = canvas.height/2;

function keyPressDown(event) {
    switch (event.keyCode) {
        case 37:
        accx = -0.3;
        break;
        case 39:
        accx = 0.3;
        break;
        case 38:
        accy = -0.3;
        break;
        case 40:
        accy = 0.3;
        break;
    }
}

function keyPressUp() {
    velx = 0;
    vely = 0;
    accx = 0;
    accy = 0;
}

window.addEventListener('keydown', keyPressDown, false);
window.addEventListener('keyup', keyPressUp, false);

function addSmiley() {
    var redSmiley = new Smiley(10, "red");
    redSmiley.x = canvas.width/2;
    redSmiley.y = 10;
    redSmiley.vx = Math.random() * 3;
    redSmiley.vy = Math.random() * 3;
    redCircles.push(redSmiley);
}

var redSmileyer = setInterval(addSmiley, 1000 * Math.random() + 1);
redSmileyer;

function draw (redSmiley) {
    redSmiley.x += redSmiley.vx;
    redSmiley.y += redSmiley.vy;

    var boundY = Math.sqrt(Math.pow((mySmiley.x - canvas.width/2), 2) + Math.pow((mySmiley.y - canvas.height/2), 2) );
    var boundR = Math.sqrt(Math.pow((redSmiley.x - canvas.width/2), 2) + Math.pow((redSmiley.y - canvas.height/2), 2) );
    
    if (boundY > 300 - mySmiley.radius) {
        cancelAnimation();
        clearInterval(redSmileyer);
    }

    var left = 0;
    var right = canvas.width;
    var top = 0;
    var bottom = canvas.height;
    
    redSmiley.x += redSmiley.vx; redSmiley.y += redSmiley.vy;
    if (redSmiley.x + redSmiley.radius > right) {
        redSmiley.x = right - redSmiley.radius;
        redSmiley.vx *= -1;
    } else if (redSmiley.x - redSmiley.radius < left) {
        redSmiley.x = left + redSmiley.radius; redSmiley.vx *= -1;
    }

    if (redSmiley.y + redSmiley.radius > bottom) {
        redSmiley.y = bottom - redSmiley.radius;
        redSmiley.vy *= -1;
    } else if (redSmiley.y - redSmiley.radius < top) {
        redSmiley.y = top + redSmiley.radius;
        redSmiley.vy *= -1;
    }

    var dx = redSmiley.x - mySmiley.x;
    var dy = redSmiley.y - mySmiley.y;
    dist = Math.sqrt(dx * dx + dy * dy);
    
    if(dist < redSmiley.radius + mySmiley.radius) {
        cancelAnimation();
        clearInterval(redSmileyer);
    }
    
    redSmiley.draw(context);
}

function cancelAnimation() {
    var end = Date.now();
    var elapsed = (end - start)/1000;

    context.font = "25pt Algerian";
	context.fillStyle = 'blue';
    context.fillText("Game Over", 10, 50);
    context.fillText("Time Played: " + elapsed + " seconds", 30, 100);
    window.cancelAnimationFrame(request);
}

(function drawFrame () {
    request = window.requestAnimationFrame(drawFrame, canvas);
    request; context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(canvas.width/2, canvas.height/2, 300, 0, 2*Math.PI);
    context.stroke();

    velx += accx;
    vely += accy;
    mySmiley.x += velx;
    mySmiley.y += vely;

    var i = redCircles.length;

    while (i--) {
        draw(redCircles[i], i);
    }
        mySmiley.draw(context);
}
());

