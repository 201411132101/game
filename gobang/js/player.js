// 画出所下棋子
function draw_chess_piece(x, y, r){
	context.beginPath();
	if(player == 0)
		context.drawImage(black,x-r,y-r,2*r,2*r);
	else
		context.drawImage(white,x-r,y-r,2*r,2*r);
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

function show_res(){
	console.log('res: %d\n', player);
	if (player == 1){
		alert('黑方胜出');
		clearBoard();
	}
	else{
		alert('白方胜出');
		clearBoard();
	}
}

// 更新玩家
function playChess(nx, ny){
	var r = 18;
	var x = 40 * nx + 20;
	var y = 40 * ny + 20;
	draw_chess_piece(x, y, r);
	board[nx][ny] = player;
	
	console.log('before: %d\n', player);
	if (judge(nx, ny))	setTimeout("show_res()", 100);
	console.log('after: %d\n', player);
	
	player = 1 - player;
	if (player == 0){
		black.removeAttribute("hidden");
		white.setAttribute("hidden",true);
	}
	else{
		black.setAttribute("hidden",true);
		white.removeAttribute("hidden");
	}
}
function update(event){
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
	
	
	if (mode == 1){
		var plan = AI();
		playChess(plan[0], plan[1]);
	}
	
	// debug
	var mat = "mode: ";
	if (mode == 1)
		mat += "单人模式" + "<br/>";
	else
		mat += "双人模式" + "<br/>";
	mat += "board:<br/>";
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