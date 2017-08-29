function getScore(x, y, color, callback){
	if (board[x][y] != 999)
		return 0;
	
	board[x][y] = color;
	if (getLength(x, y) >= 5){
		board[x][y] = 999
		if (color == 0) 
			return 999999;
		else
			return 999998;
	}
	var score = 0;
	
	// 行
	var sum = 0;
	for (var i = x; i < 15; i++){
		if (board[i][y] != color){
			if (board[i][y] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (board[i][y] != color){
			if (board[i][y] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	score += Math.pow(10, sum);
	
	// 列
	sum = 0;
	for (var i = x; i < 15; i++){
		if (board[x][i] != color){
			if (board[x][i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	for (var i = x-1; i >= 0; i--){
		if (board[x][i] != color){
			if (board[x][i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	score += Math.pow(10, sum);
	
	// 左上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i < 15; i++){
		if (board[x+i][y+i] != color){
			if (board[x+i][y+i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i >= 0; i--){
		if (board[x+i][y+i] != color){
			if (board[x+i][y+i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	score += Math.pow(10, sum);
	
	// 右上
	sum = 0;
	for (var i = 0; x + i < 15 && y + i >= 0; i++){
		if (board[x+i][y-i] != color){
			if (board[x+i][y-i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	for (var i = -1; x + i >= 0 && y + i < 15; i--){
		if (board[x+i][y-i] != color){
			if (board[x+i][y-i] == 999) sum = sum + 1; 
			break;
		}
		sum = sum + 1;
	}
	score += Math.pow(10, sum);
	
	if (color == 0) score += 1;
	board[x][y] = 999;
	return score;
}

function AI(){
	// 创建棋盘并初始化
	var score = new Array();
	for (var i = 0; i < 15; i++){
		score[i] = new Array(); 
		for (var j = 0; j < 15; j++)
			score[i][j] = 0;
	}
	
	var Max = 1;
	var x = 7;
	var y = 7;
	var debug = [0, 0];
	for (var i = 0; i < 15; i++)
	for (var j = 0; j < 15; j++)
	{
		var blackScore = getScore(i, j, 0);
		var whiteScore = getScore(i, j, 1);
		var temp = Math.max(blackScore, whiteScore);
		
		if (Max < temp)
		{
			Max = temp;
			x = i;
			y = j;
			debug[0] = blackScore;
			debug[1] = whiteScore;
		}
	}
	
	var str = '(' + x + ', ' + y + '): ' + Max + '<br/>blackScore: ' + debug[0] + '<br/>whiteScore: ' + debug[1];
	document.getElementById("plan").innerHTML = str;
	
	return [x, y];
}