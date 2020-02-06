///////////////////////////////////////////////////////////
var width = 600, height = 600;		//	размер canvas
var w = 22, h = 22; 				//	размер ячейки
var pw = 16, ph = 16; 				//	размер игрока

var bw = 4, bh = 4; 				//	размер пули
var wallColor = "green";				//	цвет стен
var bulletColor = "red";				//	цвет стен
var infoBarWidth = 150;

var mapWidthP = 500;				//	ширина карты в клетках
var mapHeightP = 500;				//	высота карты в клетках
var maxWallCount = 10000; 			//	число объектов стен

var colors = [
	'#F08080',	'#DC143C',	'#FF0000',	'#8B0000',	'#FF69B4',	'#FF1493',	'#C71585',	'#FF7F50',	'#FF4500',	'#FF8C00',	'#FFFF00',	'#BDB76B',	'#EE82EE',	'#FF00FF',	'#9370DB',	'#9400D3',	'#800080',	'#4B0082',	'#8B4513',	'#008000'];

var mouseX = 0, mouseY = 0;

var players = [];	// массив игроков
var bullets = [];	// массив пуль
var walls = [];		// массив препятствий

ns4 = (document.layers)? true:false;
ie4 = (document.all)? true:false;

var cx = 0, cy = 0;
var btnUp = false;
var btnDown = false;
var btnLeft = false;
var btnRight = false;