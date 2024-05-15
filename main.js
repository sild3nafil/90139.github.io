var container = document.querySelectorAll("#container");
var cards = document.getElementsByClassName("card");
var imgs = document.getElementsByClassName("imgstyle")
var activeItem = null;
var active = false, moved = false;
var index_now = -1;
const xy = [0, 0], z = [5, 6, 7, 8, 9];

/*for(i = 0; i < container.length; i++) {
    console.log(container[i]);
    container[i].addEventListener("touchstart", dragStart, false);
    container[i].addEventListener("touchend", dragEnd, false);
    container[i].addEventListener("touchmove", drag, false);

    container[i].addEventListener("mousedown", dragStart, false);
    container[i].addEventListener("mouseup", dragEnd, false);
    container[i].addEventListener("mousemove", drag, false);
}*/

container[0].addEventListener("touchstart", dragStart, false);
container[0].addEventListener("touchend", dragEnd, false);
container[0].addEventListener("touchmove", drag, false);

container[0].addEventListener("mousedown", dragStart, false);
container[0].addEventListener("mouseup", dragEnd, false);
container[0].addEventListener("mousemove", drag, false);



//console.log(container);
loadData();
function loadData(){
    for(i = 0; i < cards.length; ++i){
        switch (i) {
            case 0:
                cards[i].style.left = "90%";
                cards[i].style.top =  "10%";
                break;
            case 1:
                cards[i].style.left = "20%";
                cards[i].style.top = "70%";
                break;
            case 2:
                cards[i].style.left = "50%";
                cards[i].style.top = "30%";
                break;
            case 3:
                cards[i].style.left = "70%";
                cards[i].style.top = "60%";
                break;
            case 4:
                cards[i].style.left = "10%";
                cards[i].style.top = "10%";
                break;
            default:
                console.log('Sorry');
        }
    }
    
    for(i = 0; i < cards.length; ++i){
        let XX = JSON.parse(localStorage.getItem("index" + i + "X")) + "px";
        let YY = JSON.parse(localStorage.getItem("index" + i + "Y")) + "px";
        //let ZZ = JSON.parse(localStorage.getItem("index" + i + "Z"));
        cards[i].style.left = XX;
        cards[i].style.top  = YY;
        //cards[i].style.zIndex = ZZ;
    }
}



function dragStart(e) {
    console.log(container);
    console.log("target:", e.target, "current: ", e.currentTarget);

    moved = false;
    if (e.target !== e.currentTarget) {
        
        //console.log(e.currentTarget.children[0]);
        //container[0].style.zIndex = 0;
        //e.currentTarget.zIndex = 0;
        active = true;

        // this is the item we are interacting with
        if(e.target.className == "card"){
            activeItem = e.target;
        } else{
            switch (e.target.className) {
                case "one":
                    activeItem = e.currentTarget.children[0];
                    break;
                case "two":
                    activeItem = e.currentTarget.children[1];
                    break;
                case "three":
                    activeItem = e.currentTarget.children[2];
                    break;
                case "four":
                    activeItem = e.currentTarget.children[3];
                    break;
                case "five":
                    activeItem = e.currentTarget.children[4];
                    break;
            }
        }

        for(i = 0; i < cards.length; ++i){
            //console.log(JSON.parse(localStorage.getItem("index" + i + "X")));
            e.currentTarget.children[i].style.border = "solid transparent";
            if(e.currentTarget.children[i] != activeItem){
                if(e.currentTarget.children[i].style.zIndex > activeItem.style.zIndex){
                    e.currentTarget.children[i].style.zIndex--;
                }
            } else{
                index_now = i;
            }
        }
        activeItem.style.border = "dashed white";
        activeItem.style.zIndex = 9;

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }

            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }

            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } 
            else {
                console.log("doing something!");
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    } else{
        for(i = 0; i < cards.length; ++i){
            e.currentTarget.children[i].style.border = "solid transparent";
        }
    }
}

function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
        xy[0] = JSON.stringify(activeItem.currentX + activeItem.offsetLeft);
        xy[1] = JSON.stringify(activeItem.currentY + activeItem.offsetTop);
        for(i = 0; i < cards.length; ++i){
            z[i] = JSON.stringify(cards[i].style.zIndex);
        }
        //xy[2] = JSON.stringify(activeItem.style.zIndex);
    }
    if(moved){
        console.log("moved");
    }else{
        console.log("not moved");
        if(active){
            switch(index_now){
                case 0:
                    window.location.href = "feeling.html";
                    break;
                case 1:
                    window.location.href = "calculation.html";
                    break;
                case 2:
                    window.location.href = "object.html";
                    break;
                case 3:
                    window.location.href = "video.html";
                    break;
                case 4:
                    window.location.href = "trashcan.html";
                    break;
            }
        }
    }
    active = false;
    activeItem = null;
}

function drag(e) {
    //console.log(activeItem.offsetLeft);
    moved = true;
    if (active) {
        e.preventDefault();
        //console.log(window.innerWidth, activeItem.offsetWidth);
        if (e.type === "touchmove") {
            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } 
        else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        if (activeItem.currentX < 0 - activeItem.offsetLeft || activeItem.currentX > window.innerWidth - activeItem.offsetWidth - activeItem.offsetLeft) {
            activeItem.currentX = activeItem.currentX < 0 - activeItem.offsetLeft ? 0 - activeItem.offsetLeft : window.innerWidth - activeItem.offsetWidth - activeItem.offsetLeft;
        }
        if (activeItem.currentY < 0 - activeItem.offsetTop || activeItem.currentY > window.innerHeight - activeItem.offsetHeight - activeItem.offsetTop) {
            activeItem.currentY = activeItem.currentY < 0 - activeItem.offsetTop ? 0 - activeItem.offsetTop : window.innerHeight - activeItem.offsetHeight - activeItem.offsetTop;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        //console.log(activeItem.offsetTop, activeItem.currentX, activeItem.currentY);
        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function saveData(){
    localStorage.setItem("index" + index_now + "X", xy[0]);
    localStorage.setItem("index" + index_now + "Y", xy[1]);
    /*for(i = 0; i < cards.length; ++i){
        localStorage.setItem("index" + i + "Z", z[i]);
    }*/
    //console.log(cards[0].style.zIndex);
    //localStorage.setItem("index" + index_now + "Z", xyz[2]);
    //localStorage.setItem(index_now, toBeSaved['StartY'])
}

setInterval(saveData, 250)


/*
let newX = 0, newY = 0, startX = 0, startY = 0;
var cards = document.getElementsByClassName("card");

for(var i = 0; i < cards.length; i++){

    move(cards[i]);
}

function move(card){
    

    function dragStart(e){
        startX = e.clientX
        startY = e.clientY
    
        card.addEventListener("touchend",   dragEnd);
        card.addEventListener("touchmove",  drag);
        card.addEventListener("mouseup",    dragEnd);
        card.addEventListener("mousemove",  drag);
    }
    
    function drag(e){
        newX = startX - e.clientX 
        newY = startY - e.clientY 
      
        startX = e.clientX
        startY = e.clientY
    
        card.style.top = (card.offsetTop - newY) + 'px'
        card.style.left = (card.offsetLeft - newX) + 'px'
    }

    function dragEnd(){
        document.removeEventListener('touchmove', drag)
        document.removeEventListener('mousemove', drag)
    }  
}
*/
