// move to the end of world
function move(r, c, rm, cm, player){
    while (true){
        var nr = r + rm
		var nc = c + cm
		
		if (!(0 <= nr <= 14 && 0 <= nc <= 14) || board[nr][nc] != player)
			return [r, c]
        r = nr
		c = nc
	}
}


// 判断游戏是否结束
function is_game_over(r, c){
	var dir = [[1, 1, 1, 0], [-1, 0, 1, 1]]
	
	for (var k = 0; k < 4; k++){
		var rm = dir[0][k]
		var cm = dir[1][k]
		
		var pos_a = [r, c]
		while (true){
			var nr = pos_a[0] + rm
			var nc = pos_a[1] + cm
			if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != board[r][c])
				break
			pos_a[0] = nr
			pos_a[1] = nc
		}
		
        var pos_b = [r, c]
		while (true){
			var nr = pos_b[0] - rm
			var nc = pos_b[1] - cm
			if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != board[r][c])
				break
			pos_b[0] = nr
			pos_b[1] = nc
		}
		
		if (Math.max(Math.abs(pos_a[0] - pos_b[0]), Math.abs(pos_a[1]- pos_b[1])) + 1 >= 5)
			return true
	}
	
	return false
}


// 更新棋盘数据
function update(event){
	if (over) return 
	
	var x = event.clientX
	var y = event.clientY
	
	var r = Math.floor((y-35) / 40)
	var c = Math.floor((x-350) / 40)
	if (board[r][c] != 999) return
	board[r][c] = player
	mylist += String.fromCharCode(r + 65);
	mylist += String.fromCharCode(c + 65);
	updata_board()
	
	
	var pos
	var callbacks = $.Callbacks("stopOnFalse")
	callbacks.add(function() {  
		over = is_game_over(r, c)
	}) 
	callbacks.add(function() {  
		if (over){
			document.getElementById("debug").innerHTML = "你赢了"
			return false
		}
	})

	// 检查是否在 list 里面
	callbacks.add(function() {
		pos = searchinlist()
		if (pos[0] != -1) {
			console.log('List: (%d, %d)\n', pos[0], pos[1]);
		}
	})

	// AI
	callbacks.add(function() {
		let newpos = AI()
		if(pos[0] == -1) {
			pos[0] = newpos[0];
			pos[1] = newpos[1];
		}
	}) 
	callbacks.add(function() {  
		board[pos[0]][pos[1]] = 1 - player
		mylist += String.fromCharCode(pos[0]  + 65);
		mylist += String.fromCharCode(pos[1]  + 65);
		updata_board()
	})  
	callbacks.add(function() {  
		over = is_game_over(pos[0], pos[1])
	}) 
	callbacks.add(function() {  
		if (over){
			document.getElementById("debug").innerHTML = "你输了"
			return false
		}
	})  

	// debug
	callbacks.add(function() {
		var mat = "mode: ";
		if (mode == 1)
			mat += "单人模式" + "<br/>";
		else
			mat += "双人模式" + "<br/>";
		mat += "board:<br/>";
		for (var r = 0; r < 15; r++){
			for (var c = 0; c < 15; c++){
				if (board[r][c] == 0)
					mat += "0";
				else if(board[r][c] == 1)
					mat += "1";
				else
					mat += "#";
			}
			mat += "<br/>";
		}
		mat += mylist.substring(0, 8) + "<br/>";
                                mat += mylist.substring(8, 16) + "<br/>";
		document.getElementById("debug").innerHTML = mat;
	})  
	callbacks.fire();
}