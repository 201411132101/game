var black = document.getElementById("black");
var white = document.getElementById("white");
var canvas = document.getElementById("board");
var context = canvas.getContext('2d');

// 游戏模式：1为单人，2为双人
var mode = 1;
// 玩家属性：0为黑方，1为白方
var player = 0;

// 创建棋盘并初始化
var board = new Array();
for (var i = 0; i < 15; i++){
	board[i] = new Array(); 
	for (var j = 0; j < 15; j++)
		board[i][j] = 999;
}
drawBoard();

// 画棋盘
function drawBoard(){
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
}

// 清空棋盘
function clearBoard(){
	for (var i = 0; i < 15; i++)
	for (var j = 0; j < 15; j++)
		board[i][j] = 999;
	canvas.height=canvas.height;  
	drawBoard();
	document.getElementById("debug").innerHTML = "debug";
	players = 0;
	black.removeAttribute("hidden");
	white.setAttribute("hidden",true);
}
// 模式选择
function modeChoose(temp){
	clearBoard();
	mode = temp;
}