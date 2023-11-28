//stores what position the slideshows are in. The index of the position corresponds to the id of the slideshow
let slideIndexes = []; 

//preloads an image into the browser's cache
function preloadImage(image){
  const img = new Image();
  img.src = image.src;
}

function changeSlide(direction, slideId){
  const slideshow = document.getElementById("slideshow" + slideId);
  let newIndex = slideIndexes[slideId] + (direction === "prev" ? -1 : 1);
  const imgCount = slideshow.querySelectorAll("img").length;
  //going beyond the end
  if (newIndex >= imgCount){
    newIndex = 0;
  }
  //going before the beginning
  if (newIndex < 0){
    newIndex = imgCount - 1;
  }
  //hide old index
  slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.display = "none";
  //show new index
  slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.display = "block";
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
