let paused = true;
let refreshed = false;
var currLife;

window.onload = function() {
document.getElementById("start-game").onclick = function () {
  $(function() {
    $("canvas").show("slow");
    $("#intructiontext").hide("slow");
    $("#start-game").html("Pause");
    togglePause();
  });

    currLife <=0 ? stopGame() : startGame();
};

function startGame() {
  if (!refreshed) {
    toggleRefresh();
    setInterval(function() {
      drawEverything();
      if (!paused) {
    currLife <=0 ? stopGame() : update();

        // update();
      }
    }, 1000 / 60);
  }
}
};

function togglePause() {
  if (!paused) {
    paused = true;
  } else if (paused) {
    paused = false;
  }
}

function toggleRefresh() {
  if (!refreshed) {
    refreshed = true;
  } else if (paused) {
    refreshed = false;
  }
}

function stopGame() {
  // clearInterval(interval);
  return;
}

//Game variables 
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width;
var y = canvas.height*0.85;
var dx = 5;
var dy = 5;
var frames = 0;
var bg = new Background(ctx, "../Images/memphis-colorful.png", 2);
var cat = new Cat(ctx, "../Images/_cute.png");
var randomObsArr = []; //array of obstacles that randomlly appear on the screen
var obstaclesType = ["dog", "food", "dog2", "food"]; //possible types of obstacles that determine the image to display
var score = 0;
var lives = cat.lives;
var mouse = new Mouse(ctx,"../Images/brown-mouse.png");


//updating the canvas with all the functions
function update() {
  console.log(randomObsArr.length)
  bg.update();
  cat.update();
  mouse.update();
  randomObsArr.forEach(function(obstacle) {
    obstacle.update();
    if(cat.didCollide(obstacle)){
      obstacle.isTouched = true
      if(obstacle.type === "food"){
        PlayAudioFood()
        score +=5
      } else {
        playAudioHit()
        lives--
        currLife = lives
        //console.log( "MIAU")
//  
      }
    }
    if(obstacle.x < 0-obstacle.width) {
      lives--
      currLife = lives
   
    }
  });

  randomObsArr.forEach((obj,index) => {
    if(obj.isTouched || obj.x < 0 - obj.width){
      randomObsArr.splice(index,1)
    }

  })

  frames++;
  if (frames % 80 === 0) {
    console.log("Creating a new obstacle", frames);
    randomObsArr.push(
      new Obstacle(ctx, obstaclesType[Math.floor(Math.random() * obstaclesType.length)],y)
    );
  }
  // mouse.update()
  // if (lives === 0) {
  //  stopGame()
  // }
}



//Drawing the elements on the canvas
function drawEverything() {
  ctx.clearRect(0, 0, x, y);
  bg.draw();
  randomObsArr.forEach(function(obstacle) {
    obstacle.draw();
  });
  cat.draw();
  mouse.draw()
  

ctx.font = "18px Gloria Hallelujah"
ctx.fillStyle = "purple";
ctx.fillText("Score: " + score, 700, 30)

ctx.font = "18px Gloria Hallelujah"
ctx.fillStyle = "red";
ctx.fillText("Lives: " + lives, 700, 60)

}

//Moving the cat (main player)
$(document).keydown(function(event) {
  event.preventDefault();
  console.log("keydown", event.keyCode);
  switch (event.keyCode) {
    case 37:
      cat.movementX = "left";
      break;
    case 39:
      cat.movementX = "right";
      break;
    case 38:
      cat.movementY = "up";
      break;
    case 40:
      cat.movementY = "down";
      break;
  }
});

$(document).keyup(function(event) {
  event.preventDefault();
  console.log("keyup", event.keyCode);
  switch (event.keyCode) {
    case 37:
    case 39:
      cat.movementX = null;
      break;
    case 38:
    case 40:
      cat.movementY = null;
      break;
  }
});

window.addEventListener("keydown", function(e) {
  var key = e.keyCode;
  if (key === 80) {
    // p key
    togglePause();
  }
});



function playAudioHit(){
  var audio = new Audio("../audio/zapsplat_cartoon_voice_high_pitched_says_ouch_001_15792.mp3");
  audio.play();
}

function PlayAudioFood() {
  var audio = new Audio("../audio/animals_cat_meow_003.mp3");
  audio.play();
}




 