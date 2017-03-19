var canvas = document.getElementById("chessboard");
var context = canvas.getContext('2d');

for(var i = 20; i < 600; i += 40)
{
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

function preview(event)
{
	x=event.clientX;
	y=event.clientY;
	document.getElementById("rightbar").innerHTML="Coordinates: (" + x + "," + y + ")";
}