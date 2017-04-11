
var mode = "days";

function updateImage(){
    var thatmode = mode;
    var counter = document.getElementById("counter");
    var subtext = document.getElementById("subtext");
    var index = parseInt(counter.getAttribute("data-index"));
    if(index < 9) {
        index++;
    } else {
        index = 1;
    }
    updateTime();
    counter.className="melt"+index + " " + thatmode;
    counter.setAttribute("data-index", index+"");
    setTimeout(updateImage, 50);
}

function getDaysLeft(){
    var today=new Date();
    var melt=new Date(today.getFullYear(), 6, 14);
    var one_day=1000*60*60*24;
    var daysLeft = Math.ceil((melt.getTime()-today.getTime())/(one_day))
    return daysLeft;
}

function getSecondsLeft(){
    var today=new Date();
    var melt=new Date(today.getFullYear(), 6, 14);
    var one_second=1000;
    var secondsLeft = Math.ceil((melt.getTime()-today.getTime())/(one_second))
    return secondsLeft;
}

function updateTime(){
    var thatmode = mode;
    var counter = document.getElementById("counter");
    var subtext = document.getElementById("subtext");
    var index = parseInt(counter.getAttribute("data-index"));
    if(thatmode === "days") {
        counter.innerText = getDaysLeft() + "";
        subtext.innerText = "days left";
    }
    if(thatmode === "seconds"){
        counter.innerText = getSecondsLeft() + "";
        subtext.innerText = "seconds left";
    }
    counter.className="melt"+index + " " + thatmode;
    setTimeout(updateTime, 100);
}


function updateMode(){
    if(mode === "days"){
        mode = "seconds";
    } else {
        mode = "days";
    }
    setTimeout(updateMode, 6666);
}

updateTime()
updateImage();
setTimeout(updateMode, 6666);