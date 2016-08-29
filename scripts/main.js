//      Audio
var audio = document.getElementById('theme');

var playTheme = function () {
  audio.play();
}
playTheme();
audio.loop = true;



//      Zooming Effect of Game Screen
setTimeout(function () {
  $('.intro_bg').addClass('zout');
}, 0);



//      Welcome Pop Up
$('.startmodal').hide().delay(1000).fadeIn(3000);
$('canvas').hide().delay(1000).fadeIn(4000);



//      Begin Game
var playbtn = document.getElementById('playbtn');
playbtn.addEventListener('click', function(event) {
    $('.startmodal').fadeOut(2000);
  });



//      Make Paddle
function makePaddle() {
  context.rect(pSpex.x, pSpex.y, pSpex.width, pSpex.height);
  context.fillStyle = "white";
  context.fill();
}



//      Make Ball + Bounce off 3 Walls / End of Game
var canvas = document.getElementById('game_window');
var context = canvas.getContext('2d');
var bSpex = { x: 400, y: 574, r: 10 }                      // ball specs
var pSpex = { x: 335, y: 585, width: 130, height: 15 }     // paddle specs
var xChange = 5
var yChange = -5

function makeBall() { 
  context.beginPath();
  context.fillStyle = "white";
  context.arc(bSpex.x, bSpex.y, bSpex.r, 0, 2*Math.PI, false); 
  context.fill();
  context.closePath();
}

function ballMove() {
  context.clearRect(0, 0, 800, 600); 
  makeBall();
  makePaddle();
  
  if ((bSpex.x + xChange + bSpex.r) > 800 || (bSpex.x + xChange) < bSpex.r) {
    xChange = -xChange;
  }
  else if ((bSpex.y + yChange) < bSpex.r) {
    yChange = -yChange;
  }
  else if (((bSpex.y + yChange + bSpex.r) > pSpex.y) && (((bSpex.x + bSpex.r) > pSpex.x) && ((bSpex.x) < (pSpex.x + pSpex.width)))) {  // collision detection between ball and paddle
      yChange = -yChange;
  }
  else if ((bSpex.y + yChange) > (600 - bSpex.r)) { 
      $('.endmodal').fadeIn(4000).css('visibility', 'visible');
      document.getElementById('restartbtn').addEventListener('click', function(event) {
      document.location.reload(true);
      });
  }
  bSpex.x += xChange;
  bSpex.y += yChange;
}
ballMove();



//      Key Press Events
var count = 0;
function counter(e) { 
  if (e.keyCode === 32) {
    count++;
  }
} 


function keyMove(e) {
  counter(e);
  globalID = requestAnimationFrame(ballMove);
  if (e.keyCode === 39) {
    pSpex.x += 15;    
  } 
  else if (e.keyCode === 37) {
    pSpex.x -= 15;
  }
  else if ((e.keyCode === 32) && (count % 2 === 0)) {
    // cancelAnimationFrame(globalID);
  }
  else if ((e.keyCode === 32) && (count % 2 !== 0)) {
    setInterval(ballMove, 30)
  } 
} 
document.onkeydown = keyMove;

