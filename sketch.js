var currentPath = [];
var drawing = [];
var isDrawing = false;
var database;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.mousePressed(startPath);
    canvas.parent('canvasContainer');
    canvas.mouseReleased(endPath);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    database = firebase.database();

    var ref = database.ref('drawings');
    ref.on('value', gotData, errorData);
}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}

function draw() {
    background("powderblue");

    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY,
        }
        currentPath.push(point);
    }

    stroke("white");
    strokeWeight(4);
    noFill();

    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }
}

function gotData() {
    var drawings = data.val();
    var keys = Object.keys(drawings);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // console.log(key);
        var hi = createElement('li', '');
        var ahref = createA('#', key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);
        hi.parent('drawing');
    }
}

function errorData(error) {
    console.log(error);
}

function showDrawing() {
    var key = this.html();
    var ref = database.ref('database/' + key);
    ref.on('value')
    console.log(this.html());
}

function clearDrawing() {
    drawing = [];
}