Status = "";
objects = [];
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}
function modelLoaded() {
    console.log(
        "model is loaded"
    );
    Status = true;
    objectdetecter.detect(video, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        objectdetecter.detect(video, gotResult);
        document.getElementById("Status").innerHTML = "Status : Object Detected";
        document.getElementById("No_object").innerHTML = "Number of object detected: " + objects.length;
        for (i = 0; i < objects.length; i++) {
            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percentage + "%", objects[i].x + 15, objects[i].y + 20);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}
function start() {
    objectdetecter = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("Status").innerHTML + "Status: detecting objects";

}

