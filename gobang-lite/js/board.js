var canvas = document.getElementById("board");
var context = canvas.getContext('2d');

// 玩家属性：0为黑方，1为白方
var player = 0;
// 游戏是否结束
var over = false;

// 创建棋盘并初始化
var board = new Array();
for (var i = 0; i < 15; i++){
	board[i] = new Array(); 
	for (var j = 0; j < 15; j++)
		board[i][j] = 999;
}

// 画棋盘
for (var i = 20; i < 600; i += 40){
	// row
	context.beginPath();
	context.lineTo(i, 20);
	context.lineTo(i, 580);
	context.stroke();
	context.closePath();
	
	// column
	context.beginPath();
	context.lineTo(20, i);
	context.lineTo(580, i);
	context.stroke();
	context.closePath();
}

var pointX = [3, 3, 7, 11, 11];
var pointY = [3, 11, 7, 3, 11];
for (var i = 0; i < 5; i++){
	var x = 40 * pointX[i] + 20;
	var y = 40 * pointY[i] + 20;
	context.beginPath();
	context.arc(x,y,5,0,Math.PI*2);
	context.fillStyle="black";
	context.fill();
	context.closePath();
}
