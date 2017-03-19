var canvas = document.getElementById("chessboard");
var context = canvas.getContext('2d');

// 棋盘
var chessboard = new Array();
for (var i = 0; i < 15; i++){
	chessboard[i] = new Array(); 
	for (var j = 0; j < 15; j++)
		chessboard[i][j] = 999;
}

for(var i = 20; i < 600; i += 40){
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

var player = 0;
function draw_chess_piece(x, y, r){
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2,false);
	if(player == 0)
		context.fillStyle = 'black';
	else
		context.fillStyle = 'white';
	context.fill();
	context.closePath();
}

function judge(x, y)
{
	var sum;
	
	// 行
	sum = 0;
	for (var i = x; i < 15; i++){
		if (chessboard[i][y] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (chessboard[i][y] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	if (sum >= 5) return true;
	
	// 列
	sum = 0;
	for (var i = x; i < 15; i++){
		if (chessboard[x][i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (chessboard[x][i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	if (sum >= 5) return true;
	
	// 左上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i < 15; i++){
		if (chessboard[x+i][y+i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i >= 0; i--){
		if (chessboard[x+i][y+i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	if (sum >= 5) return true;
	
	// 右上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i >= 0; i++){
		if (chessboard[x+i][y-i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i < 15; i--){
		if (chessboard[x+i][y-i] != chessboard[x][y]) break;
		sum = sum + 1;
	}
	if (sum >= 5) return true;
	
	return false;
}

function show_res(){
	if (player == 1)
		alert('黑方胜出');
	else
		alert('白方胜出');
}

function update(event){
	var x = event.clientX;
	var y = event.clientY;
	
	var xmin = 350;
	var ymin = 35;
	var r = 18;
	
	x = Math.floor((x-xmin) / 40) * 40 + 20;
	y = Math.floor((y-ymin) / 40) * 40 + 20;
	var nx = Math.floor(x/40);
	var ny = Math.floor(y/40);
	if (chessboard[nx][ny] != 999) return;
	
	draw_chess_piece(x, y, r);
	chessboard[nx][ny] = player;
	
	var is_win = judge(nx, ny);
	if (is_win == true)	setTimeout("show_res()", 200);
	
	player = 1 - player;
	if (player == 0)
		document.getElementById("sign").src = "images/black.png";
	else
		document.getElementById("sign").src = "images/white.png";
	
	// debug
	mat = "chessboard:\n";
	for (var i = 0; i < 15; i++){
		for (var j = 0; j < 15; j++){
			if (chessboard[j][i] == 0)
				mat = mat + "0";
			else if(chessboard[j][i] == 1)
				mat = mat + "1";
			else
				mat = mat + "#";
		}
		mat = mat + "\n";
	}
	document.getElementById("rightbar").innerHTML = mat;
}