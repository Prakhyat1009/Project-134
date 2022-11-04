model_status="";
objects=[];
baby_status="";
function preload(){
sound = loadSound("z_alert.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
video.size(400,400);
video.hide();
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelloaded(){
    console.log("Model is loaded");
    model_status=true;

    }
    
    function got_results(error,results){
    if(error){
    console.error(error);
    }
    else{
    console.log(results);
    objects=results;
    }
    }

    function draw(){
        image(video,0,0,400,400);
        if(model_status != ""){
            object_detector.detect(video,got_results);
            for(i=0;i<objects.length;i++){
                stroke("blue");
                strokeWeight(2);
                noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            textSize(30);
            fill("white");
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+"   "+percent+"%",objects[i].x,objects[i].y-20);
            document.getElementById("no._of_objects").innerHTML="No. of objects detected in the room = "+objects.length;
            document.getElementById("status").innerHTML = "Status : Objects detected";  
        
        if(objects[i].label=="person"){
        document.getElementById("baby").innerHTML="Baby detected";
        sound.stop();
        }
        else{
            document.getElementById("baby").innerHTML="Baby not detected";
            sound.play();
        }
    }
        if(objects.length==0){
            document.getElementById("baby").innerHTML="Baby not detected";
            sound.play();
        }
    
}
    }