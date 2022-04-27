//INICIAR
function button_IniciarOnclick() {
    document.getElementById("iniciar").style.visibility="hidden";
}

const keys = [];
var stopMove = false;

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});


// CARTEL LOSE
function hideElem()
{
    var perdiste = document.getElementById ('perdiste').style.visibility = "hidden";
}hideElem();
function showElem() {
    document.getElementById("perdiste").style.visibility = "visible";
}
// CARTEL WIN
function hideWin()
{
    var ganaste = document.getElementById ('ganaste').style.visibility = "hidden";
} hideWin();
function showWin() {
    document.getElementById("ganaste").style.visibility = "visible";
}


//CANVAS
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

//BACKGROUND LOAD IMAGES
const background = new Image();
background.src = "/images/map.png";

// WIN SHAPE
const win = {
    x: 620,
    y: 400,
    width: 130,
    height: 30,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
}
const winshape = new Image();
winshape.src = "/images/finish_line.png";

// PLAYER
const playerSprite = new Image();
playerSprite.src = "/images/character_down.png";

class Player {
    constructor(){
        this.x = 100;
        this.y = 100;
        this.spriteWidth = 20;
        this.spriteHeight = 40;
        this.frameX = 0;    //para recortar de un spritesheet
        this.frameY = 0;
        this.speed = 9;
        //this.moving = false;
    }
    draw(){
        drawSprite(playerSprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    animate();
    
    movePlayer(){
        if (stopMove === false) {
            if (keys[38] && this.y > 20) {
                this.y -= this.speed;
                playerSprite.src = "/images/character_up.png";
                this.width = 20;
                this.height = 40;
                detectColision();
                detectWin();
            }
            if (keys[37] && this.x > 55) {
                this.x -= this.speed;
            // player.frameY = 1; si fuera con spritesheet
            playerSprite.src = "/images/character_left.png";
            this.width = 40;
            this.height = 20;
                detectColision();
                detectWin();
            }
            if (keys[40] && this.y < 400) {
                this.y += this.speed;
                playerSprite.src = "/images/character_down.png";
                this.width = 20;
                this.height = 40;
                detectColision();
                detectWin();
            }
            if (keys[39] && this.x < 720) {
                this.x += this.speed;
            // player.frameY = 1;
            playerSprite.src = "/images/character_right.png";
            this.width = 40;
            this.height = 20;
                detectColision();
                detectWin();
            }
        }
    }

    detectWin(){
        if (this.x > win.x + win.width ||
            this.x + this.width < win.x ||
            this.y > win.y + winshape.height ||
            this.y + this.height < win.y ){
                // No collision
            } else {
                // Collision detected   WIN
                showWin();
                stopMove = true;
            }   
    }
}

// ENEMIES
const zombieSprite = new Image();
zombieSprite.src = "/images/zombie_right.png";

class Enemy {
    constructor(){
        this.x = 0;
        this.y = 150;
        this.width = 30;
        this.height = 17;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
    }
    animate();
    
    increase(){
        Enemy.x ++;
        }
    decrease(){
        Enemy.x --;
        }
    moveEnemy(){
        detectColision();
            if (stopMove ===false) {
                if (this.x < canvas.width + this.width) {
                    this.x ++;
                zombieSprite.src = "/images/zombie_right.png";
            } else {
                this.x = 0 - this.width;
                stopMove = true;
                }
            }
        setInterval(this.moveEnemy, 25);
    }
}
    // function moveZombie(){
    //         detectColision();
    //         if (stop ===false) {
    //             if (EnemyZ.x < canvas.width + EnemyZ.width) {
    //                 EnemyZ.x ++;
    //             zombieSprite.src = "/images/zombie_right.png";
    //         } else {
    //             EnemyZ.x = 0 - EnemyZ.width;
    //             stop = true;
    //             }
    //     }
    // }
// setInterval(() => {
//     moveZombie();
// }, 25);


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0,canvas.width, canvas.height);
    Player.draw();
    //drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    drawSprite(zombieSprite, 0, 0, Enemy.width, Enemy.height, Enemy.x, Enemy.y, Enemy.width, Enemy.height);
    drawSprite(zombieSprite2, 0, 0, EnemyZ2.width, EnemyZ2.height, EnemyZ2.x, EnemyZ2.y, EnemyZ2.width, EnemyZ2.height);
    drawSprite(zombieSprite3, 0, 0, EnemyZ3.width, EnemyZ3.height, EnemyZ3.x, EnemyZ3.y, EnemyZ3.width, EnemyZ3.height);
    drawSprite(trainHorizontal, 0, 0, EnemyTH.width, EnemyTH.height, EnemyTH.x, EnemyTH.y, EnemyTH.width, EnemyTH.height);
    drawSprite(winshape, 0, 0, win.width, win.height, win.x, win.y, win.width, win.height);
    movePlayer();
    
    requestAnimationFrame(animate);
}
animate();



let player = new Player();
let enemyZ = new Enemy();
let enemyZ2 = new Enemy();
enemyZ2.x = 720;
enemyZ2.y = 350;
let enemyZ3 = new Enemy();
enemyZ3.y = 400;
