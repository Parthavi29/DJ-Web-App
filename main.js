song="";
leftWristY=0;
rightWristY=0;
rightWristX=0;
leftWristX=0;
rightscore=0;
leftscore=0;

function preload(){
    song=loadSound("Song.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",getPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("#e53170");
    stroke("#ff8906")
    if(leftscore>0.2){
        circle(leftWristX,leftWristY,20);
        leftnumberY=Number(leftWristY);
        noDleftY=floor(leftnumberY);
        volume=noDleftY/500;
        console.log(volume);
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="Volume = " + volume;
    }
    if (rightscore>0.2){
        circle(rightWristX,rightWristY,20);
        if (rightWristY>0 && rightWristY<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed = 0.5x";
        }
        if (rightWristY>100 && rightWristY<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed = 1x";
        }
        if (rightWristY>200 && rightWristY<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed = 1.5x";
        }
        if (rightWristY>300 && rightWristY<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed = 2x";
        }
        if (rightWristY>400 && rightWristY<=500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed = 2.5x"
        }
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function modelLoaded(){
    console.log("Model has been identified!!!!!!!!!!!!!");
}

function getPoses(results){
    if (results.length>0){
        console.log(results);
        rightscore=results[0].pose.keypoints[10].score;
        leftscore=results[0].pose.keypoints[9].score;
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log("Left Wrist = "+leftWristY+" Right Wrist = "+rightWristY);
    }
}