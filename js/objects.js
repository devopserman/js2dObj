///////////////////////////////////////////////////////////
// Объекты

class Player {
	constructor(name, x, y, px, py, w, h, vector, speed, maxSpeed, angle, delay, color){
		this.name = name || 'Player';
		this.x = x || (width/2 - pw/2);		//	координаты X, Y
		this.y = y || (height/2 - ph/2);		//	
		this.w = w || pw;					//	ширина игрока
		this.h = h || ph;					//	высота игрока
		this.px = px;						//	нахождение в клетке поля X
		this.py = py;						//	нахождение в клетке поля Y
		this.vector = vector || 0;			//	вектор движения танка (0-вверх, 1-вправо, 2-вниз, 3-влево)
		this.speed = speed || 1.5;			//	текущая скорость
		this.maxSpeed = maxSpeed || 3;		//	максимальная скорость
		this.angle = angle || 0;			// 	угол для стрельбы
		this.delay = delay || 5;			// 	задержка стрельбы
		this.color = colors[color] || "#4B0082";//colors[Random(0, colors.length)];		
	}
	 drawPlayer() {
		ctx.fillStyle = this.color;
		ctx.fillRect((width/2-this.w/2), (height/2-this.h/2), this.w, this.h,h);
	} 
	drawGun() {
	} 
}

class Bullet {
	constructor(name, x, y, vx, vy, px, py, angle, speed, damage, health, color){
		this.name = name || 'b';
		this.x = x || (width/2 - w/2);		//	координаты X, Y
		this.y = y || (height/2 - h/2);		//	
		this.w = bw;						// 	ширина пули
		this.h = bh;						// 	высота пули
		this.vx = vx;						// 	
		this.vy = vy;						// 	
		this.px = px;						//	нахождение в клетке поля X
		this.py = py;						//	нахождение в клетке поля Y
		this.angle = angle || 0;			// 	угол полета
		this.speed = speed || 5;			//	скорость полета пули
		this.damage = damage || 5;			//	урон пули
		this.health = health || 100;		//	время жизни пули
		this.color = colors[color] || colors[Random(0, colors.length)];
	}
}

class Wall {
	constructor(x, y, type, zlayer, health, color){
		this.x = x || 0;					//	координаты X, Y
		this.y = y || 0;					//	
		this.type = type || 0;				//	тип препятствия (0-стена, 1-вода, 2-разрушаемое препятствие.....)
		this.zlayer = zlayer || 0;			//	слой отрисовки (0-стены, -1 - вода, 1-деревья, 2-облака)
		this.health = health || 100;		//	
		this.color = color || colors[Random(0, colors.length)];//	
	}		
}
//////////////////////////////////////////////////////
