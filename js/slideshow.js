//stores what position the slideshows are in. The index of the position corresponds to the id of the slideshow
let slideIndexes = []; 

//how long it takes to transition from one slide to another (in seconds)
const transitionTime = 0.75

//preloads an image into the browser's cache
function preloadImage(image){
  const img = new Image();
  img.src = image.src;
}

function changeSlide(direction, slideId, button){
  //temporarily disable the button
  button.style.pointerEvents = "none"

  //re-enable it after a short period of time to prevent spam-clicking 
  setTimeout(function() {
    button.style.pointerEvents = "auto"
  }, (transitionTime * 1000) - 300)

  const slideshow = document.getElementById("slideshow" + slideId);
  let newIndex = slideIndexes[slideId] + (direction === "prev" ? -1 : 1);
  //console.log(newIndex)
  const imgCount = slideshow.querySelectorAll("img").length;

  //going beyond the end
  if (newIndex >= imgCount){
    newIndex = 0;
  }
  //going before the beginning
  if (newIndex < 0){
    newIndex = imgCount - 1;
  }

  //Make old image slide left or right
  if (direction === "next"){
    slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.left = "-50.1%"
  }
  else if (direction === "prev"){
    slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.left = "150.1%"
  }

  //turn off transition delay for new image
  slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transitionDuration = "0s"

  //put new image into position to slide in
  if (direction === "next"){
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = '150.1%'
  }
  else if (direction === "prev"){
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = '-50.1%'
  }

  //update slide position
  slideIndexes[slideId] = newIndex;

  //wait until new image is in position and then gradually slide it into the middle of the container
  requestAnimationFrame(() => {
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transitionDuration = transitionTime + "s"
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = "50%"
  });

}


//set up for the slideshows
const slideshows = document.querySelectorAll("div.slideshow-container");
slideshows.forEach((slideshow, i) => {
  slideshow.id = "slideshow" + i; 

  //setup first image
  const firstImage = slideshow.querySelector("img")
  firstImage.style.transitionDuration = transitionTime + "s"

  //preload all the images to reduce lag (doesn't seem to work for some reason)
  slideshow.querySelectorAll("img").forEach((img) => {
    preloadImage(img)
  })
  
  //make arrows work
  const prev = slideshow.querySelector("a.prev")
  prev.onclick = function(){
    changeSlide("prev", i, prev);
  }

  const next = slideshow.querySelector("a.next")
  next.onclick = function(){
    changeSlide("next", i, next);
  }
  
  slideIndexes[i] = 0;
})
