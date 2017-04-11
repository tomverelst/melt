
function changeImage(){
    var counter = document.getElementById("counter");
    var index = parseInt(counter.getAttribute("data-index"));
    if(window.console) {
        window.console.log(index);
    }
    if(index < 9) {
        index++;
    } else {
        index = 1;
    }
    counter.className="melt"+index;
    counter.setAttribute("data-index", index+"");
    setTimeout(changeImage, 1000);
}

changeImage();