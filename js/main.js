var hor;
for (var i = 0; i < window.innerHeight/50 ; i++) {
	hor = new Path();
	hor.strokeColor = 'rgba(160,190,250,1)';
	hor.strokeWidth = 2;
	hor.add(new Point(0, 50*i), new Point(window.innerWidth, 50*i));
};
for (var i = 0; i < window.innerWidth/50; i++) {
	var myPath = new Path();
	myPath.strokeColor = 'rgba(160,190,250,1)';
	myPath.add(new Point(50*i, 0), new Point(50*i, window.innerHeight));
	//myPath.insert(1, new Point(x, y));
};

var myPath = new Path({segments: [[170, 0], 
					  [170, window.innerHeight]]
					});
myPath.strokeColor = 'rgba(100,130,250,1)';
myPath = new Path({segments: [[173, 0], 
					  [173, window.innerHeight]]
					});
myPath.strokeColor = 'rgba(100,130,250,1)';

var mouse;
var tool;

function onMouseDown(event){
	mouse = new Path();
	mouse.strokeColor = document.getElementById('strokeColor').value;
	mouse.strokeWidth = document.getElementById('strokeWidth').value;
	mouse.strokeCap = 'round';
	mouse.strokeJoin = 'round';
	mouse.selected = true;
	mouse.add(event.point);

	tool = document.getElementsByName("tool");
	for (var i = 0; i < tool.length; i++) {
		if(tool[i].checked){
			tool = tool[i].value;
			break;
		}
	};

}
//tool.minDistance = 20;
function onMouseDrag(event){
	switch(tool){
		case "brush":
			mouse.closed = true;
			mouse.fillColor = document.getElementById('fillColor').value;
			var step = event.delta/15;
			step.angle += 90;

			var top = event.middlePoint + step;
			var bottom = event.middlePoint - step;
			
			mouse.add(top);
			mouse.insert(0, bottom);
			mouse.smooth();
			break;
		default:
			if(document.getElementById('closed').checked){
				mouse.closed = true;
				mouse.fillColor = document.getElementById('fillColor').value;
			}
			mouse.add(event.point);
	}
}

function onMouseUp(event){
	mouse.selected = false;
	mouse.simplify();
}

document.getElementById("save").onclick = function (){
	var canvas = document.getElementById("main");
	var image = canvas.toDataURL("image/png");
	alert("Use Right Click > Save Image..");
	window.open(image);
}
/*/---------Cursor------
var x = 250;
var y = 250;

var cursor = new Path({segments:[[0, 0],
								 [0, 20],
								 [5, 18],
								 [12, 26],
								 [15, 23],
								 [8, 15],
								 [15, 17]]
					});
cursor.closed = true;
cursor.strokeColor = "#000000";
cursor.fillColor = "#FFFFFF";
function onMouseMove(event){
	x = event.point.x;
	y = event.point.y;
}
function onFrame(event){
	cursor.position.x = x;
	cursor.position.y = y;
}
//---------Cursor------/**/