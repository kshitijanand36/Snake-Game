canvas = document.getElementById("mycanvas");

W = canvas.width = 650;
H = canvas.height = 650;


// pen  = canvas.getContext('2d');
pen = canvas.getContext('2d');
cs = 54.5
score = 0
food = getRandomfood()

function init(){

  food_img = new Image()
  food_img.src = "apple.png"
  trophy_img = new Image()
  trophy_img.src = "trophy.png"
  snake = {
      init_len : 4,
      cells : [],
      direction : 'right',

  createSnake : function(){
    for (let i =this.init_len;i>0;i--){
      this.cells.push({x : i, y: 0})
    }
  },
  drawSnake : function(){
    for(let i=0;i<this.cells.length;i++){
        pen.fillStyle = "Indigo";
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs , cs-2.5,cs-2.5)
    }
  },
  updateSnake : function(e){

    headX = this.cells[0].x
    headY = this.cells[0].y
    tailX = this.cells[this.cells.length -1].x
    tailY = this.cells[this.cells.length -1].y

    if(headX *cs>=W || headX<0||headY*cs>=H ||headY<0 || (headX==tailX && headY==tailY)){
        clearInterval(f)
        alert("Game Over :(")
    }

    if(food.x==headX &&food.y ==headY){
      food = getRandomfood()
      score++
    }
    else{
    this.cells.pop()
  }
    if(this.direction == 'right'){
      this.cells.unshift({x:headX +1, y: headY})
  }
  else if(this.direction == 'down'){
    this.cells.unshift({x:headX , y: headY+1})
  }
  else if(this.direction == 'left'){

    this.cells.unshift({x:headX-1 , y: headY})
  }
  else if(this.direction == 'up'){

    this.cells.unshift({x:headX , y: headY-1})
  }
  },
};
snake.createSnake()

function keyPressed(e){
  if(e.key == "ArrowLeft" && snake.direction!='right'){
    snake.direction = 'left'
  }
  else if(e.key == "ArrowRight" && snake.direction!='left'){
    snake.direction = 'right'
  }
  else if(e.key == "ArrowUp" && snake.direction!='down'){
    snake.direction = 'up'
  }
  else if(e.key == "ArrowDown" && snake.direction!='up'){
    snake.direction = 'down'
  }
}

document.addEventListener('keydown',keyPressed)
}

function getRandomfood(){
  var foodX = Math.round((Math.random()) *(W-cs)/cs)
  var foodY = Math.round((Math.random()) *(W-cs)/cs)

  food = {
    x : foodX,
    y:  foodY,
    color : "Red",
  }
  return food
}

game_over = false

function draw(){
  pen.clearRect(0,0,W,H)
  pen.fillStyle = 'blue'
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs)
  pen.drawImage(trophy_img,20,20,cs,cs)
  pen.font = "20px Roboto"
  pen.fillText(score,50,50)
  snake.drawSnake()

}

function update(e){
  snake.updateSnake(e)
}

function game_loop(){
  // snake.createSnake()
  draw()
  update()
}

init()
f = setInterval(game_loop,100)
