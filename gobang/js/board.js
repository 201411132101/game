var black = document.getElementById("black");
var white = document.getElementById("white");
var canvas = document.getElementById("board");
var context = canvas.getContext('2d');

// 游戏模式：1为玩家执黑，2为玩家执白
var mode = 1;
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
updata_board();


// 更新棋盘
function updata_board(){
	canvas.height=canvas.height;
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
	
	for (var r = 0; r < 15; r++)
	for (var c = 0; c < 15; c++){
		var x = 40 * c + 20
		var y = 40 * r + 20
		var radius = 18
		if (board[r][c] == 0)
			context.drawImage(black, x-radius, y-radius, 2*radius, 2*radius)
		else if (board[r][c] == 1)
			context.drawImage(white, x-radius, y-radius, 2*radius, 2*radius)
	}
	
}


// 清空棋盘
function clearBoard(){
	var callbacks = $.Callbacks();   
	callbacks.add(function() {  
		for (var i = 0; i < 15; i++)
		for (var j = 0; j < 15; j++)
			board[i][j] = 999;
		
		if (mode == 1){
			player = 0
			black.removeAttribute("hidden")
			white.setAttribute("hidden",true)
		}
		else{
			player = 1
			board[7][7] = 0
			white.removeAttribute("hidden")
			black.setAttribute("hidden",true)
		}
		
		document.getElementById("debug").innerHTML = "debug";
		over = false;
	}) 
	callbacks.add(function() {
		updata_board()
	}) 
	callbacks.fire()
}


// 模式选择
function modeChoose(temp){
	mode = temp;
	clearBoard();
}