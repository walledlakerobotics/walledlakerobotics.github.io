//stores what position the slideshows are in. The index of the position corresponds to the id of the slideshow
let slideIndexes = []; 

const slideshowContainer = document.querySelector('.slideshow-container');

// Find the first image within the container
const firstImage = slideshowContainer.querySelector('img');

// Change the style of the first image
firstImage.style.transform = 'translate(-50%, -50%)';



//preloads an image into the browser's cache
function preloadImage(image){
  const img = new Image();
  img.src = image.src;
}

function changeSlide(direction, slideId){
  const slideshow = document.getElementById("slideshow" + slideId);
  let oldIndex = slideIndexes[slideId]
  let newIndex = slideIndexes[slideId] + (direction === "prev" ? -1 : 1);
  console.log(newIndex)
  const imgCount = slideshow.querySelectorAll("img").length;

  //going beyond the end
  if (newIndex >= imgCount){
    newIndex = 5;
    console.log("going beyond end");
  }
  //going before the beginning
  if (newIndex < 0){
    newIndex = 0;
    console.log("going beyond beginning");
  }

  //hide old index


  


  if (direction === "next"){
    slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.transform = "translate(-170%, -50%)"
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.display = "block";
  }
  if (direction === "prev"){
    slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.transform = "translate(170%, -50%)"
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.display = "block";
  }
  //show new index
  slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.display = "block";

  slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transform = "translate(-50%, -50%)"
  
  //update slide position
  slideIndexes[slideId] = newIndex;
}

//set up for the slideshows
const slideshows = document.querySelectorAll("div.slideshow-container");
slideshows.forEach((slideshow, i) => {
  slideshow.id = "slideshow" + i; 
  slideshow.querySelector("img").style.display = "block"; //show first image

  //preload all the images to reduce lag
  slideshow.querySelectorAll("img").forEach((img) => {
    preloadImage(img)
  })
  
  //make arrows work
  slideshow.querySelector("a.prev").onclick = function(){
    changeSlide("prev", i);
  }
  slideshow.querySelector("a.next").onclick = function(){
    changeSlide("next", i);
  }
  
  slideIndexes[i] = 0;
})
