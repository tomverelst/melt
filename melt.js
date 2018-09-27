
var mode = "days";
var melt = new Date(2019, 6, 18);
melt.setHours(0, 0, 0, 0);

var beating = false;
var heartIndex=1;

function updateImage(){
    console.log("updating image");
    var thatmode = mode;
    var counter = document.getElementById("counter");
    var subtext = document.getElementById("subtext");
    var index = parseInt(counter.getAttribute("data-index"));
    if(index < 9) {
        index++;
    } else {
        index = 1;
    }
    updateTime(false);
    setCounterClassName();
    subtext.className=thatmode;
    counter.setAttribute("data-index", index+"");

    setTimeout(updateImage, 50);
}

function setCounterClassName(){
    var counter = document.getElementById("counter");
    var index = parseInt(counter.getAttribute("data-index"));
    var thatmode = mode;
    if(thatmode === "heart"){
        counter.className="melt"+index + " heart"+heartIndex;
    } else {
        counter.className="melt"+index + " " + thatmode;
    }

}

function heartbeat(){
    var counter = document.getElementById("counter");
    var index = parseInt(counter.getAttribute("data-index"));

    if(heartIndex === 20){
        heartIndex = 1;
    } else {
        heartIndex++;
    }
    setCounterClassName();
    setTimeout(heartbeat, 50);
}

function getDaysLeft(){
    var today=new Date();
    var one_day=1000*60*60*24;
    var daysLeft = Math.ceil((melt.getTime()-today.getTime())/(one_day))
    return daysLeft;
}

function getSecondsLeft(){
    var today= new Date();
    var one_second=1000;
    var secondsLeft = Math.ceil((melt.getTime()-today.getTime())/(one_second))
    return secondsLeft;
}

function isTimeLeft(){
    return melt > new Date();
}

function getTimeLeft(){
    return new Date() - melt;
}

function updateTime(schedule){
    var thatmode = mode;
    var counter = document.getElementById("counter");
    var subtext = document.getElementById("subtext");
    var index = parseInt(counter.getAttribute("data-index"));
    if(thatmode === "days") {
        counter.innerText = getDaysLeft() + "";
        subtext.innerText = "days left";
    }
    if(thatmode === "seconds"){
        var secondsLeft = getSecondsLeft();
        counter.innerText = secondsLeft + "";
        if(secondsLeft !==1) {
            subtext.innerText = "seconds left";
        } else {
            subtext.innerText = "second left";
        }
    }
    if(thatmode === "heart"){
        counter.innerText = "<3";
        subtext.innerText = "party time!";
    }
    setCounterClassName();
    if(schedule) {
        setTimeout(function () {
            updateTime(true);
        }, 100);
    }
}


function updateMode(){
    if(isTimeLeft()) {
        var secondsLeft = getSecondsLeft();
        console.log(secondsLeft);
        if(secondsLeft < 86400) { // Less than one day
            mode = "seconds";
            setTimeout(updateMode, 100);
        } else {
            if (mode === "days") {
                mode = "seconds";
            } else {
                mode = "days";
            }
            if(secondsLeft > 10) {
                setTimeout(updateMode, 6666);
            } else {
                setTimeout(updateMode, 100);
            }
        }
    } else {
        mode = "heart";
        startBeatingHeart();
    }
}

function startBeatingHeart(){
    if(!beating){
        beating = true;
        setTimeout(heartbeat, 100);
    }
}

if(isTimeLeft()) {
    if(getSecondsLeft() > 86400) {
        setTimeout(updateMode, 6666);
    } else {
        updateMode();
    }
} else {
    mode = "heart";
    startBeatingHeart();
}

updateTime();
updateImage();
