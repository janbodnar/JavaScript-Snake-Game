
// JavaScript Snake example
// Author Jan Bodnar
// http://zetcode.com/javascript/snake/

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE = 20;
const DELAY = 200;
const C_HEIGHT = 600;
const C_WIDTH = 600;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(C_WIDTH);
var y = new Array(C_HEIGHT);   

function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    

function loadImages() {
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 
}

function createSnake() {
    dots = 3;
    // initial position
    for (var z = 0; z < dots; z++) {
        x[z] = (3 * DOT_SIZE) - z * DOT_SIZE;
        y[z] = (3 * DOT_SIZE) ;
    }
}

function checkApple() {
    if ((x[0] == apple_x) && (y[0] == apple_y)) {
        dots++;
        locateApple();
    }
}    

function doDrawing() {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {
            
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
                console.log("ball", x, y)
            }
        }   

    } else {

        gameOver();
    }        
}

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 24px serif';
    
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {
    if ((x[0] == apple_x) && (y[0] == apple_y)) {
        dots++;
        locateApple();
    }
}

function move() {
    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection)
        x[0] -= DOT_SIZE;
    if (rightDirection)
        x[0] += DOT_SIZE;
    if (upDirection)
        y[0] -= DOT_SIZE;
    if (downDirection)
        y[0] += DOT_SIZE;
}    

function checkCollision() {
    for (var z = dots; z > 0; z--)
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z]))
            inGame = false;

    if (y[0] >= C_HEIGHT || y[0] < 0 || x[0] >= C_WIDTH  || x[0] < 0)
        inGame = false;
}

function locateApple() {
    var r = Math.floor(Math.random() * C_WIDTH / DOT_SIZE);
    apple_x = r * DOT_SIZE;
    console.log("not snek", r * DOT_SIZE)

    r = Math.floor(Math.random() * C_HEIGHT / DOT_SIZE);
    apple_y = r * DOT_SIZE;
}    

function gameCycle() {
    if (inGame) {
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {
    let key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    
