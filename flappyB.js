var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var ball = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

ball.src = "images/ball.png" ;
bg.src = "images/bkg.png";
fg.src = "images/sg.png";
pipeNorth.src = "images/pipe.png";
pipeSouth.src = "images/pipe.png";

var gap = 125;
var constant;

var bX = 100;
var bY = 275;

var gravity = 2;

var score = 0;

document.addEventListener("keyup",moveUp);

function moveUp(){
    bY -= 30;
    
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        
        if( bX + ball.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+ball.height >= pipe[i].y+constant) || bY + ball.height >=  cvs.height - fg.height){
            location.reload(); 
        }
        
        if(pipe[i].x == 5){
            score++;
           
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(ball,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#fff";
    ctx.font = "40px  Verdana";
    ctx.fillText("Score : "+score,210,cvs.height-30);
    
    requestAnimationFrame(draw);
    
}

draw();
























