var objects = [];
var status = "";
var thing = "";

function preload(){

}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function modelLoaded(){
    console.log("Model Is Initialized");
    status = true;

}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML =  "Object Is Being Detected";

    thing = document.getElementById('thing').value;
}

function draw(){
    image(video,0,0,380,380);
       if(status != ""){
        objectDetector.detect(video, gotResults);
         for(i = 0; i < objects.length; i++){
             var r = random(255);
             var g = random(255);
             var b = random(255);
            document.getElementById("status").innerHTML = "Object Is Detected";
            document.getElementById("number").innerHTML = "Number Of Objects = " + objects.length;
            noFill();
            var percent = floor(objects[0].confidence * 100);
            stroke(r,g,b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(thing == objects[i].label){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML =  thing + " Found"
                document.getElementById("number").innerHTML = objects.length + " = Number Of Objects Found";
                var synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(thing + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML =  thing + " Not Found"
            }
         }

    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}