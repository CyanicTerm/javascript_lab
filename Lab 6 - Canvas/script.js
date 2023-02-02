const canvas = document.getElementById("gameCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const ctx = canvas.getContext("2d");
let balls = [];


class Ball {
    constructor ()
    {
        this.x = getRandomInt(canvas.width);
        this.y = getRandomInt(canvas.height);
        this.dx = getRandomInt(4) - 2;
        this.dy = getRandomInt(4) - 2;
    }
    
    
    drawBall(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
    

    updatePosition() 
    {
        if (this.x + this.dx > canvas.width || this.x + this.dx < 0) {
            this.dx = -this.dx;
          }
          if (this.y + this.dy > canvas.height || this.y + this.dy < 0) {
            this.dy = -this.dy;
          }
        
          this.x += this.dx;
          this.y += this.dy;
    }
}

function generateBalls() {
    for (let i = 0; i < 10; i++) {
        balls.push(new Ball())
    }
}
startButton.addEventListener("click", clearBalls)
resetButton.addEventListener("click", clearBalls)

function clearBalls() {
    balls = [];
    generateBalls();
}

function drawLine(ball1, ball2) {
    const xDif = ball1.x - ball2.x;
    const yDif = ball1.y - ball2.y;
    const distance = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));
    if (distance < 300) {
        ctx.beginPath();
        ctx.moveTo(ball1.x, ball1.y);
        ctx.lineTo(ball2.x, ball2.y);
        ctx.stroke();
    }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall(ctx);
    balls[i].updatePosition();
    for (let j = i; j < balls.length; j++) {
        drawLine(balls[i], balls[j])        
    }    
  }
  requestAnimationFrame(update);
}

update();

function getRandomInt(max) {
    return Math.random() * max + 1;
}