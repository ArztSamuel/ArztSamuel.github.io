/**
 * Created by Samuel Arzt on 04.10.2015.
 */

var imgSource;
var nextImg = 0;
var curImgCont = 1; //Current image container with opacity == 0 (either 1 or 2)
var allSlctors = [];

const interval = 15000; //Time between two images (in ms)
const fadeSpeed = 75; //Time between each fading step
const fadeDelta = 0.04; //Amount that is increased/decreased each step

var decrOp;
var incrOp;
var intervalID;
var timeoutID;

//setImages: sets imageSource array. Images will be displayed in array order.
function setImageSources(imgs) {
    imgSource = imgs;
    imgSelectors = [];
    //Add imageSelectors
    var imgSlctors = document.getElementById("imgSlctors");
    for(var i = 0; i<imgs.length; i++){
        var div = document.createElement("div");
        div.className = "imgSlctor off";
        div.addEventListener("click", slctorClicked);
        div.addEventListener("mouseover", slctorMOver);
        div.addEventListener("mouseout", slctorMOut);
        imgSlctors.appendChild(div);
        allSlctors.push(div);
    }
    allSlctors[0].className = "imgSlctor on";


    //Preload images
    var body = document.getElementsByTagName("body")[0];
    for(var i = 1; i<imgs.length; i++){
        var imgPreload = document.createElement("img");
        imgPreload.setAttribute("style", "position: absolute; left: -99999px;");
        imgPreload.setAttribute("src", imgs[i]);
        imgPreload.className = "imgPreload";
        body.appendChild(imgPreload);
    }
    setTimeout(deletePreload, 500);
}

function deletePreload(){
    var body = document.getElementsByTagName("body")[0];
    $(body).children(".imgPreload").remove();
}


function run(){
    timeoutID = setTimeout(nextImage, interval);
}


function nextImage(){
    if(imgSource == null || imgSource.length == 0){
        console.log("Warning no images set for imageSlider!");
        return "ERROR_NO_IMAGES";
    }
    var curImg = nextImg;
    nextImg++;
    if(nextImg>=imgSource.length){
        nextImg = 0;
    }

    //Figure out which imageContainer is currently being shown/hidden
    var curImgContainer, nextImgContainer;
    if(curImgCont == 1){
        curImgContainer = document.getElementById("projectImg1");
        nextImgContainer = document.getElementById("projectImg2");
        curImgCont = 2;
    }else{
        curImgContainer = document.getElementById("projectImg2");
        nextImgContainer = document.getElementById("projectImg1");
        curImgCont = 1;
    }

    //Change image source of nextImageContainer
    nextImgContainer.setAttribute("src", imgSource[nextImg]);
    document.getElementById("imgLink").setAttribute("href", imgSource[nextImg]);

    //Update image selectors
    allSlctors[curImg].className = "imgSlctor off";
    allSlctors[nextImg].className = "imgSlctor on";

    //Image transition
    decrOp = 1;
    incrOp = 0;
    intervalID = setInterval(function(){decrIncrImgOpacity(curImgContainer, nextImgContainer)}, fadeSpeed);
}

function decrIncrImgOpacity(curImg, nextImg){
    //Decrease
    decrOp -= fadeDelta;
    curImg.style.opacity = decrOp;
    //Increase
    incrOp += fadeDelta;
    nextImg.style.opacity = incrOp;
    //Stop when done decreasing (increase should be finished as well..)
    if(curImg.style.opacity <= 0){
        clearInterval(intervalID);
        timeoutID = setTimeout(nextImage, interval);
    }
}


//Functions for selectors
function slctorClicked(){
    //Get the slctorIndex in order to display right image, simultaneously edit selectors to be on or off
    var childIndex = 0;
    for(var i = 0; i<allSlctors.length; i++){
        if(allSlctors[i] === this){
            childIndex = i;
            allSlctors[i].className = "imgSlctor on";
            continue;
        }
        allSlctors[i].className = "imgSlctor off";
    }

    //Determine which imgContainer is currently being shown
    var curImgContainer;
    if(curImgCont == 1){
        curImgContainer = document.getElementById("projectImg1");
    }else{
        curImgContainer = document.getElementById("projectImg2");
    }

    //Edit image source and image link to be the selected image
    curImgContainer.setAttribute("src", imgSource[childIndex]);
    document.getElementById("imgLink").setAttribute("href", imgSource[childIndex]);


    nextImg = childIndex;

    //Reset automatic image slider interval
    clearTimeout(timeoutID);
    timeoutID = setTimeout(nextImage, interval);
}


function slctorMOver(){
    if(this.className != "imgSlctor on"){
        this.className = "imgSlctor hover";
    }
}

function slctorMOut(){
    if(this.className === "imgSlctor hover"){
        this.className = "imgSlctor off";
    }
}