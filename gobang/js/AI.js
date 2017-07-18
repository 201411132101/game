function getScore(x, y){
	if (board[x][y] != 999)
		return 0;
	
	board[x][y] = 0;
	var blackScore = getLength(x, y);
	board[x][y] = 1;
	var whiteScore = getLength(x, y);
	board[x][y] = 999;
	
	var res = blackScore;
	if (whiteScore > blackScore)
		res = 993;
	if (blackScore >= 3)
		res = 994;
	if (whiteScore >= 3)
		res = 995;
	if (blackScore >= 4)
		res = 996;
	if (whiteScore >= 4)
		res = 997;
	if (blackScore >= 5)
		res = 998;
	if (whiteScore >= 5)
		res = 999;
		
	return res;
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
	for (var i = 0; i < 15; i++)
	for (var j = 0; j < 15; j++)
	{
		var temp = getScore(i, j);
		if (Max < temp)
		{
			Max = temp;
			x = i;
			y = j;
		}
	}
	console.log('AI: (%d, %d) -- %d\n', x, y, Max);
	
	return [x, y];
}