var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
document.onkeydown = keyDown;
document.onkeyup = keyUp;

var blocVector = 0;

///////////////////////////////////////////////////////////

function Random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Координаты мыши
 function initMouse() {
    if (ns4) {document.getElementById('canvas').captureEvents(Event.MOUSEMOVE);}
    document.getElementById('canvas').onmousemove=mousemove;
}
function mousemove(event) {

    if (document.getElementById('canvas').attachEvent != null) {
        mouseX = window.getElementById('canvas').event.clientX - (width/2)+hero.x;
        mouseY = window.getElementById('canvas').event.clientY - (height/2)+hero.y;

    } else if (!document.attachEvent && document.getElementById('canvas').addEventListener) {
        mouseX = event.clientX - (width/2)+hero.x;
        mouseY = event.clientY - (height/2)+hero.y;
	}
} 



// Клавиатура
function keyDown(e){
	Concatenate();
	if (((e.keyCode == 38) || (e.keyCode == 87)) && (Concatenate() != 1)) { // UP
		btnUp = true;
		cx = 0;
		cy = - hero.speed;
	}
	 if (((e.keyCode == 39) || (e.keyCode == 68)) && (Concatenate() != 2)) {	// RIGHT
		btnRight = true;
		cx = hero.speed;
		cy = 0;
	}
	 if (((e.keyCode == 40) || (e.keyCode == 83)) && (Concatenate() != 3)) {	// DOWN
		btnDown = true;
		cx = 0;
		cy = hero.speed;
	}
	 if (((e.keyCode == 37) || (e.keyCode == 65)) && (Concatenate() != 4)) {	// LEFT
		btnLeft = true;
		cx = - hero.speed;
		cy = 0;
	}
}
function keyUp(e){
	if ((e.keyCode == 38) || (e.keyCode == 87)){
		btnUp = false;
	}
	if ((e.keyCode == 39) || (e.keyCode == 68)){
		btnRight = false;
	}
	if ((e.keyCode == 40) || (e.keyCode == 83)){
		btnDown = false;
	}
	if ((e.keyCode == 37) || (e.keyCode == 65)){
		btnLeft = false;
	}
	
	if (!btnUp && !btnRight && !btnDown && !btnLeft){	
		cx = 0;
		cy = 0;
	}
}

// проверка на столкновение (true = столкновение)
function Concatenate(){
let r=0;
	if ((cx !=0 ) || (cy != 0) ) {
		for (let i=0; i < walls.length;i++){
			if (((hero.x+pw+cx >= walls[i].x) && 
				(hero.y+ph+cy >= walls[i].y) && 
				(hero.x+cx <= walls[i].x+w) && 
				(hero.y+cy <= walls[i].y+h))
				){
					if (cy < 0) {
						r = 1;
					} else if (cx > 0) {
						r = 2;
					} else if (cy > 0) {
						r = 3;
					} else if (cx < 0) {
						r = 4;
						
					}
					cx = 0;
					cy = 0;
					break;
				} 
		}
	}
	blocVector = r;
	return r;
}


// Mouse DOWN

window.addEventListener("mousedown", (downe) => {
  if (downe.button !== 0) return;
  const interval = setInterval(newBullet(hero.x, hero.y, mouseX, mouseY), 1000/60);
  window.addEventListener("mouseup", (upe) => {
    if (upe.button === 0) clearInterval(interval);
  }, true, true);
});




// Очистка формы
var clear = function() {
	ctx.clearRect(0,0,width,height);
	ctx2.clearRect(0,0, infoBarWidth,height);
}

// Отрисовка прямоугольника
var rect = function(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x-camera.x, y-camera.y, w, h);

}

// Отрисовка прямоугольника
var drawText = function(str, x,y, color) {
	ctx2.fillStyle = color;
	ctx2.fillText(str, x, y);
}
// Движение камеры
var camera = {
	x : 0,
	y : 0,
	move : function(x, y) {
		this.x += x;
		this.y += y;
		hero.x += x;
		hero.y += y;
	}
}

// Отрисовка пули
 var drawBullet = function(x, y, color) {
		ctx.fillStyle = color || bulletColor;
		ctx.fillRect(x-camera.x, y-camera.y, bw, bh);
	}  

	
// Отрисовка стены
var drawWall = function(x, y, w, h, color) {	
		ctx.fillStyle = color;
		ctx.fillRect(x-camera.x, y-camera.y, w, h);
	} 









var hero = new Player (
	name = "hero",
);

for (let i=0; i<maxWallCount; i++) {
	walls.push(new Wall(
		Random(-((mapWidthP/2)),((mapWidthP/2))-1)*w,
		Random(-((mapHeightP/2)),((mapHeightP/2))-1)*h,
		0, 0, 100,
		colors[7],
		)
	);
}


function drawWalls(){
	for (let i=0; i<walls.length; i++) {
		drawWall(walls[i].x, walls[i].y, w, h, walls[i].color);
	}
}

function newBullet(x,y,mx,my){
		vx = getX(x,y,mx,my);
		vy = getY(x,y,mx,my);
		bullets.push(new Bullet('b'+bullets.length, x+pw/2, y+ph/2, vx, vy));
}
//пули летят криво. Надо исправить.
function getX(x,y,mx,my){
	// if (mx-pw/2 >= x) {
		// return 1;
	// } else {
		// return -1;
	// }
	let dx;
	let dy;
	let vx;
	if (my >= y) {
		dy = my - y;
	} else {
		dy = y - my;
	}	
	if (mx >= x) {
		dx = mx - x;
	} else {
		dx = x - mx;
	}
	
	vx = Math.atan(dx/dy);

	if (mx >= x) {
		return vx;
	} else {
		return -vx;
	}
	
}

function getY(x,y,mx,my){
	let dx;
	let dy;
	let vy;
	if (mx >= x) {
		dx = mx - x;
	} else {
		dx = x - mx;
	}	
	if (my >= y) {
		dy = my - y;
	} else {
		dy = y - my;
	}
	
	vy = Math.sin(dy/dx);

	if (my >= y) {
		return vy;
	} else {
		return -vy;
	}
	
}

function drawBullets() {
	for (let i=0; i < bullets.length; i++) {
		let x = bullets[i].x;
		let y = bullets[i].y;
		let mx = bullets[i].mx;
		let my = bullets[i].my;
		bullets[i].health -= 0.00001;
			drawBullet(bullets[i].x += bullets[i].vx*2, bullets[i].y += bullets[i].vy*2);
		
	}
}


function drawInfo() {
	drawText('mouse x='+mouseX, 10, 20);
	drawText('y='+mouseY, 90, 20);
	drawText('hero x='+hero.x, 10, 40);
	drawText('y='+hero.y, 90, 40);
	drawText('camera x='+camera.x, 10, 60);
	drawText('y='+camera.y, 90, 60);
 
	drawText('cx='+cx, 10, 80);
	drawText('cy='+cy, 90, 80);

	drawText('concatenate='+Concatenate(), 10, 100);

	drawText('vx='+getX(hero.x, hero.y, mouseX, mouseY)+' vy='+getY(hero.x, hero.y, mouseX, mouseY), 10, 140);
	
	
	
}

function draw(){
	initMouse();
	clear();
	hero.drawPlayer();
	drawWalls();
	drawBullets();
	hero.drawGun();
	drawInfo();
	camera.move(cx, cy);
	
}


setInterval(draw, 1000/60);