playChess(7, 7);

// 画出所下棋子
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

// 计算最长链长度
function getLength(x, y){
	var sum;
	var Max = 0;
	
	// 行
	sum = 0;
	for (var i = x; i < 15; i++){
		if (board[i][y] != board[x][y]) break;
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (board[i][y] != board[x][y]) break;
		sum = sum + 1;
	}
	if (Max < sum) Max = sum;
	
	// 列
	sum = 0;
	for (var i = x; i < 15; i++){
		if (board[x][i] != board[x][y]) break;
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (board[x][i] != board[x][y]) break;
		sum = sum + 1;
	}
	if (Max < sum) Max = sum;
	
	// 左上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i < 15; i++){
		if (board[x+i][y+i] != board[x][y]) break;
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i >= 0; i--){
		if (board[x+i][y+i] != board[x][y]) break;
		sum = sum + 1;
	}
	if (Max < sum) Max = sum;
	
	// 右上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i >= 0; i++){
		if (board[x+i][y-i] != board[x][y]) break;
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i < 15; i--){
		if (board[x+i][y-i] != board[x][y]) break;
		sum = sum + 1;
	}
	if (Max < sum) Max = sum;
	
	return Max;
}

// 判断是否有人胜出
function judge(x, y)
{
	if (getLength(x, y) >= 5)
		return true;
	else
		return false;
}

// 更新玩家
function playChess(nx, ny){
	var r = 18;
	var x = 40 * nx + 20;
	var y = 40 * ny + 20;
	draw_chess_piece(x, y, r);
	board[nx][ny] = player;
	
	if (judge(nx, ny)){
		over = true;
		document.getElementById("debug").innerHTML = '游戏结束'; 
		return ;
	}
	
	player = 1 - player;
	if (player == 0)
		document.getElementById("color").innerHTML = '黑';
	else
		document.getElementById("color").innerHTML = '白';
}

function update(event){
	if (over) return ;
	
	var x = event.clientX;
	var y = event.clientY;
	
	var xmin = 350;
	var ymin = 35;
	
	x = Math.floor((x-xmin) / 40) * 40 + 20;
	y = Math.floor((y-ymin) / 40) * 40 + 20;
	var nx = Math.floor(x/40);
	var ny = Math.floor(y/40);
	if (board[nx][ny] != 999) return;
	
	playChess(nx, ny);
	
	if (!over){
		var plan = AI();
		playChess(plan[0], plan[1]);
	}
	
	// debug
	var mat = "board:<br/>";
	for (var i = 0; i < 15; i++){
		for (var j = 0; j < 15; j++){
			if (board[j][i] == 0)
				mat += "0";
			else if(board[j][i] == 1)
				mat += "1";
			else
				mat += "#";
		}
		mat += "<br/>";
	}
	document.getElementById("debug").innerHTML = mat;
}