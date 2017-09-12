function get_score(r, c, player){
    var dir = [[1, 1, 1, 0], [-1, 0, 1, 1]]
	
	score = 0
	for (var k = 0; k < 4; k++){
		var rm = dir[0][k]
		var cm = dir[1][k]
		
        var ends_a = [r, c]
		while (true){
			var nr = ends_a[0] + rm
			var nc = ends_a[1] + cm
			if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != player)
				break
			ends_a[0] = nr
			ends_a[1] = nc
		}
		var ends_b = [r, c]
		while (true){
			var nr = ends_b[0] - rm
			var nc = ends_b[1] - cm
			if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != player)
				break
			ends_b[0] = nr
			ends_b[1] = nc
		}
		
        var length = Math.max(Math.abs(ends_a[0]-ends_b[0]), Math.abs(ends_a[1]-ends_b[1])) + 1
        if (length >= 5){
            score += Math.pow(10, 4)
            continue
		}

        var ex_length_a = 0
        var nnr = ends_a[0] + rm
		var nnc = ends_a[1] + cm
        if (0 <= nnr && nnr <= 14 && 0 <= nnc && nnc <= 14){
            if (board[nnr][nnc] == 999){
				var ex_ends_a = [nnr, nnc]
				while (true){
					var nr = ex_ends_a[0] + rm
					var nc = ex_ends_a[1] + cm
					if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != player)
						break
					ex_ends_a[0] = nr
					ex_ends_a[1] = nc
				}
                
                ex_length_a = Math.max(Math.abs(nnr-ex_ends_a[0]), Math.abs(nnc-ex_ends_a[1]))
                if (ex_length_a != 0){
                    var nr = ex_ends_a[0] + rm
					var nc = ex_ends_a[1] + cm
                    if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != 999)
                        ex_length_a -= 1
				}
			}
            else
                length -= 1
		}

        var ex_length_b = 0
        nnr = ends_b[0] - rm
		nnc = ends_b[1] - cm
        if (0 <= nnr && nnr <= 14 && 0 <= nnc && nnc <= 14){
            if (board[nnr][nnc] == 999){
				var ex_ends_b = [nnr, nnc]
				while (true){
					var nr = ex_ends_b[0] - rm
					var nc = ex_ends_b[1] - cm
					if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != player)
						break
					ex_ends_b[0] = nr
					ex_ends_b[1] = nc
				}
                
                ex_length_b = Math.max(Math.abs(nnr-ex_ends_b[0]), Math.abs(nnc-ex_ends_b[1]))
                if (ex_length_b != 0){
                    var nr = ex_ends_b[0] - rm
					var nc = ex_ends_b[1] - cm
                    if (!(0 <= nr && nr <= 14 && 0 <= nc && nc <= 14) || board[nr][nc] != 999)
                        ex_length_b -= 1
				}
			}
            else
                length -= 1
		}
		
		var length = Math.min(4, length + Math.max(ex_length_a, ex_length_b))
        if (Math.max(ex_length_a, ex_length_b) == 0)
            score += 2 * Math.pow(10, length-1)
        else
            score += Math.pow(10, length-1)
	}

    return score
}


function AI(){	
	var max_score = 0;
	var res_r = 7;
	var res_c = 7;
	for (var r = 0; r < 15; r++)
	for (var c = 0; c < 15; c++)
	{
		if (board[r][c] != 999)
        	continue
		
		var black_score, white_score
		var callbacks = $.Callbacks("stopOnFalse")
		callbacks.add(function() {  
			black_score = get_score(r, c, 0)
			white_score = get_score(r, c, 1)
		}) 
		callbacks.add(function() {  
			var score = black_score + white_score
			if (player == 0)
				score += white_score
			else
				score += black_score
            if (max_score < score){
                max_score = score
				res_r = r
				res_c = c
			}
		}) 
		callbacks.fire();
	}
	console.log('AI: (%d, %d) -- %d\n', res_r, res_c, max_score);
	
	return [res_r, res_c];
}



