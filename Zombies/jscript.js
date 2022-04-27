function button_IniciarOnclick() {
    document.getElementById("iniciar").style.visibility="hidden";
   }

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];


// Cartel perder
function hideElem()
{
    var perdiste = document.getElementById ('perdiste').style.visibility = "hidden";
} hideElem();
function showElem() {
    document.getElementById("perdiste").style.visibility = "visible";
}

// Cartel ganar
function hideWin()
{
    var ganaste = document.getElementById ('ganaste').style.visibility = "hidden";
} hideWin();
function showWin() {
    document.getElementById("ganaste").style.visibility = "visible";
}

// PLAYER
const player = {
    x: 100,
    y: 100,
    width: 20,
    height: 40,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
};

const playerSprite = new Image();
playerSprite.src = "/images/character_down.png";

const background = new Image();
background.src = "/images/map.png";

// ROAD
// const Road = {
//     x:0,
//     y:0,
//     width: canvas,
//     height: canvas,
//     frameX: 0,
//     frameY: 0,
//     speed: 9
// };
// const roadPasto = new Image();
// roadPasto.src = "/images/map_solo_pasto.png";

// ENEMIES
const EnemyZ = {
    x: 0,
    y: 150,
    width: 30,
    height: 17,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const zombieSprite = new Image();
zombieSprite.src = "/images/zombie_right.png";

const EnemyZ2 = {
    x: 720,
    y: 350,
    width: 30,
    height: 17,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const zombieSprite2 = new Image();
zombieSprite2.src = "/images/zombie_left.png";

const EnemyZ3 = {
    x: 0,
    y: 400,
    width: 30,
    height: 17,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const zombieSprite3 = new Image();
zombieSprite3.src = "/images/zombie_right.png";


// Trains
const EnemyTH = {
    x: 0,
    y: 275,
    width: 90,
    height: 30,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const trainHorizontal = new Image();
trainHorizontal.src = "/images/train_horizontal.png";

const EnemyTV = {
    x: 535,
    y: 0,
    width: 30,
    height: 90,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const trainVertical = new Image();
trainVertical.src = "/images/train_vertical.png";

const EnemyTV2 = {
    x: 560,
    y: 300,
    width: 30,
    height: 90,
    frameX: 0,   // para recortar del spritesheet
    frameY: 0,
    speed: 9,   //cambio de img en sprite animacion
}
const train_vertical2 = new Image();
train_vertical2.src = "/images/train_vertical.png";

// Win shape
const win = {
    x: 620,
    y: 400,
    width: 130,
    height: 30,
    frameX: 0,
    frameY: 0,
    speed: 9,
}
const winshape = new Image();
winshape.src = "/images/finish_line.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0,canvas.width, canvas.height);
    // drawSprite(roadPasto, 0, 0, Road.width, Road.height, Road.x, Road.y, Road.width, Road.height);
    drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    drawSprite(zombieSprite, 0, 0, EnemyZ.width, EnemyZ.height, EnemyZ.x, EnemyZ.y, EnemyZ.width, EnemyZ.height);
    drawSprite(zombieSprite2, 0, 0, EnemyZ2.width, EnemyZ2.height, EnemyZ2.x, EnemyZ2.y, EnemyZ2.width, EnemyZ2.height);
    drawSprite(zombieSprite3, 0, 0, EnemyZ3.width, EnemyZ3.height, EnemyZ3.x, EnemyZ3.y, EnemyZ3.width, EnemyZ3.height);
    drawSprite(trainHorizontal, 0, 0, EnemyTH.width, EnemyTH.height, EnemyTH.x, EnemyTH.y, EnemyTH.width, EnemyTH.height);
    drawSprite(trainVertical, 0, 0, EnemyTV.width, EnemyTV.height, EnemyTV.x, EnemyTV.y,EnemyTV.width, EnemyTV.height);
    drawSprite(train_vertical2, 0, 0, EnemyTV2.width, EnemyTV2.height, EnemyTV2.x, EnemyTV2.y,EnemyTV2.width, EnemyTV2.height);

    drawSprite(winshape, 0, 0, win.width, win.height, win.x, win.y, win.width, win.height);
    movePlayer();
    
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;

});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

function movePlayer(){
    if (stopMove === false) {
        if (keys[38] && player.y > 20) {
            player.y -= player.speed;
            playerSprite.src = "/images/character_up.png";
            player.width = 20;
            player.height = 40;
            detectColision();
            detectColisionZ2();
            detectColisionZ3();
            detectColisionTH();
            detectColisionTV();
            detectColisionTV2();
        //     detectColisionRoad();
            detectWin();
        }
        if (keys[37] && player.x > 55) {
            player.x -= player.speed;
           // player.frameY = 1; si fuera con spritesheet
           playerSprite.src = "/images/character_left.png";
            player.width = 40;
            player.height = 20;
            detectColision();
            detectColisionZ2();
            detectColisionZ3();
            detectColisionTH();
            detectColisionTV();
            detectColisionTV2();
         //   detectColisionRoad();
            detectWin();
        }
        if (keys[40] && player.y < 400) {
            player.y += player.speed;
            playerSprite.src = "/images/character_down.png";
            player.width = 20;
            player.height = 40;
            detectColision();
            detectColisionZ2();
            detectColisionZ3();
            detectColisionTH();
            detectColisionTV();
            detectColisionTV2();
         //   detectColisionRoad();
            detectWin();
        }
        if (keys[39] && player.x < 720) {
            player.x += player.speed;
           // player.frameY = 1;
           playerSprite.src = "/images/character_right.png";
            player.width = 40;
            player.height = 20;
            detectColision();
            detectColisionZ2();
            detectColisionZ3();
            detectColisionTH();
            detectColisionTV();
            detectColisionTV2();
         //   detectColisionRoad();
            detectWin();
        }
    }
}

var stopMove = false;
function moveZombie(){
    detectColision();
    if (stopMove ===false) {
         if (EnemyZ.x < canvas.width + EnemyZ.width) {
            EnemyZ.x ++;
        zombieSprite.src = "/images/zombie_right.png";
    } else {
        EnemyZ.x = 0 - EnemyZ.width;
        //stopMove = true;
    }
    }
}
setInterval(() => {
    moveZombie();
}, 25);

function moveZombie2(){
    detectColision();
    detectColisionZ2();

    detectColisionZ3();
    detectColisionTH();
    if (stopMove ===false) {
         if (EnemyZ2.x < canvas.width + EnemyZ2.width) {
            EnemyZ2.x --;
        zombieSprite2.src = "/images/zombie_left.png";
    } else {
        EnemyZ2.x = 0 - EnemyZ2.width;
        //stopMove = true;
    }
    }
}
setInterval(() => {
    moveZombie2();
}, 25);

function moveZombie3(){
    detectColision();
    detectColisionZ3();
    detectColisionZ2();
    if (stopMove ===false) {
         if (EnemyZ3.x < canvas.width + EnemyZ3.width) {
            EnemyZ3.x ++;
        zombieSprite3.src = "/images/zombie_right.png";
    } else {
        EnemyZ3.x = 0 - EnemyZ3.width;
        //stopMove = true;
    }
    }
}
setInterval(() => {
    moveZombie3();
}, 20);

function moveTrainHorizontal(){
    detectColisionTH();
    detectColision();
    if (stopMove ===false) {
         if (EnemyTH.x < canvas.width + EnemyTH.width) {
            EnemyTH.x ++;
        trainHorizontal.src = "/images/train_horizontal.png";
    } else {
        EnemyTH.x = 0 - EnemyTH.width;
       // stopMove = true;
    }
    }
}
setInterval(() => {
    moveTrainHorizontal();
}, .15);

function moveTrainVertical(){
    detectColisionTV();
    detectColision();
    if(stopMove === false){
        if (EnemyTV.y < canvas.height + EnemyTV.height) {
            EnemyTV.y ++
            trainVertical.src = "/images/train_vertical.png";
        }else{
            EnemyTV.y = 0 -EnemyTV.height;
        }
    }
}setInterval(() =>{
    moveTrainVertical();
}, .001);

function moveTrainVertical2(){
    detectColisionTV2();
    detectColision();
    if(stopMove === false){
        if (EnemyTV2.y < canvas.height + EnemyTV2.height) {
            EnemyTV2.y ++
            trainVertical2.src = "/images/train_vertical.png";
        }else{
            EnemyTV2.y = 0 -EnemyTV2.height;
        }
    }
}setInterval(() =>{
    moveTrainVertical2();
}, .001);

//Colision detection
function detectColision(){
    if (player.x > EnemyZ.x + EnemyZ.width ||
        player.x + player.width < EnemyZ.x ||
        player.y > EnemyZ.y + EnemyZ.height ||
        player.y + player.height < EnemyZ.y ) 
        {
            if (player.x > EnemyZ2.x + EnemyZ2.width ||
            player.x + player.width < EnemyZ2.x ||
            player.y > EnemyZ2.y + EnemyZ2.height ||
            player.y + player.height < EnemyZ2.y )
            {
                if (player.x > EnemyZ3.x + EnemyZ3.width ||
                player.x + player.width < EnemyZ3.x ||
                player.y > EnemyZ3.y + EnemyZ3.height ||
                player.y + player.height < EnemyZ3.y )
                {
                    if (player.x > EnemyTH.x + EnemyTH.width ||
                    player.x + player.width < EnemyTH.x ||
                    player.y > EnemyTH.y + EnemyTH.height ||
                    player.y + player.height < EnemyTH.y) 
                    {
                        if ((player.x > EnemyTV.x + EnemyTV.width ||
                            player.x + player.width < EnemyTV.x ||
                            player.y > EnemyTV.y + EnemyTV.height ||
                            player.y + player.height < EnemyTV.y)) 
                            {
                                if(player.x > EnemyTV2.x + EnemyTV2.width ||
                                    player.x + player.width < EnemyTV2.x ||
                                    player.y > EnemyTV2.y + EnemyTV2.height ||
                                    player.y + player.height < EnemyTV2.y)
                                    {
                                        //No collision
                                }
                            }
                        }     
                    }
                }    
    }  else {
        // Collision detected
        showElem();
        stopMove = true;
    }
}
function detectColisionTH(){
     if (player.x > EnemyTH.x + EnemyTH.width ||
        player.x + player.width < EnemyTH.x ||
        player.y > EnemyTH.y + EnemyTH.height ||
        player.y + player.height < EnemyTH.y) {
            // No collision
           // hideElem();
            
    } else{
        // Collision detected
        showElem();
       
        stopMove = true;
    }
}

function detectColisionTV(){
    if (player.x > EnemyTV.x + EnemyTV.width ||
       player.x + player.width < EnemyTV.x ||
       player.y > EnemyTV.y + EnemyTV.height ||
       player.y + player.height < EnemyTV.y) {
           // No collision
          // hideElem();
           
   } else{
       // Collision detected
       showElem();
      
       stopMove = true;
   }
}

function detectColisionTV2(){
    if (player.x > EnemyTV2.x + EnemyTV2.width ||
       player.x + player.width < EnemyTV2.x ||
       player.y > EnemyTV2.y + EnemyTV2.height ||
       player.y + player.height < EnemyTV2.y) {
           // No collision
          // hideElem();
           
   } else{
       // Collision detected
       showElem();
      
       stopMove = true;
   }
}

function detectColisionZ2(){
    if (player.x > EnemyZ2.x + EnemyZ2.width ||
        player.x + player.width < EnemyZ2.x ||
        player.y > EnemyZ2.y + EnemyZ2.height ||
        player.y + player.height < EnemyZ2.y) {
           // No collision
          // hideElem();
           
   } else{
       // Collision detected
       showElem();
       stopMove = true;
   }
}

function detectColisionZ3(){
    if (player.x > EnemyZ3.x + EnemyZ3.width ||
        player.x + player.width < EnemyZ3.x ||
        player.y > EnemyZ3.y + EnemyZ3.height ||
        player.y + player.height < EnemyZ3.y ) {
           // No collision           
   } else{
       // Collision detected
       showElem();
       stopMove = true;
   }
}

// function detectColisionRoad(){
//     if(player.x > Road.x + Road.width ||
//         player.x +player.width < Road.x ||
//         player.y > Road.y + Road.height ||
//         player.y + player.height < Road.y) {
//             //No colision
//         } else {
//             //Colision detected
//             stopMove = true;

//         }
// }

function detectWin(){
        if (player.x > win.x + win.width ||
            player.x + player.width < win.x ||
            player.y > win.y + winshape.height ||
            player.y + player.height < win.y ){
                // No collision
            } else {
                // Collision detected   WIN
                showWin();
                stopMove = true;
            }
            
}
