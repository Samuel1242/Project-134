img="";
Status="";
objects = [];

function preload(){
    img = loadImage('sleep.jpg');
    sound = loadSound('alarm_r.mp3')
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
};

function modelLoaded(){
    console.log("Model is Loaded");
    Status = "True";
    objectDetector.detect(img,gotresults);
}

function gotresults(error , results){
    if (error){
    console.error(error);
    }
    console.log(results);
    objects=results;
};


function draw(){
    image(img,0,0,640,420);

    if(Status != ""){
        for (i=0; i <objects.length; i++){
            if(objects.length < 0){
                sound.play();
            }
            document.getElementById("status").innerHTML="Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}