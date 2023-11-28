//stores what position the slideshows are in. The index of the position corresponds to the id of the slideshow
let slideIndexes = []; 

const slideshowContainer = document.querySelector('.slideshow-container');

// Find the first image within the container
const firstImage = slideshowContainer.querySelector('img');

firstImage.style.left = "50%"
firstImage.style.transition = "left 1s"


//preloads an image into the browser's cache
function preloadImage(image){
  const img = new Image();
  img.src = image.src;
}

function changeSlide(direction, slideId){
    const slideshow = document.getElementById("slideshow" + slideId);
    let newIndex = slideIndexes[slideId] + (direction === "prev" ? -1 : 1);
    console.log(newIndex)
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
  
  

  
  
    if (direction === "next"){
      slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.left = "-151%"
    }
    if (direction === "prev"){
      slideshow.querySelector("img:nth-child(" + (slideIndexes[slideId]+1) + ")").style.left = "151%"
    }
    //show new index
    if (direction === "next"){
      
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transition = "left 0s"
    slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = '151%'
    
        requestAnimationFrame(() => {
            slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transition = "left 1s"
            slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = "50%"
        });
    }
    if (direction === "prev"){
      
        slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transition = "left 0s"
        slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = '-151%'
        
            requestAnimationFrame(() => {
                slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.transition = "left 1s"
                slideshow.querySelector("img:nth-child(" + (newIndex+1) + ")").style.left = "50%"
            });
        }
    //update slide position
    slideIndexes[slideId] = newIndex;
  }


//set up for the slideshows
const slideshows = document.querySelectorAll("div.slideshow-container");
slideshows.forEach((slideshow, i) => {
  slideshow.id = "slideshow" + i; 

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


