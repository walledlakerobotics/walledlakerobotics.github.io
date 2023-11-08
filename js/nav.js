const hamburg = document.getElementById("burger");
const x = document.getElementById("mobile-x-button");
const mobileLinks = document.querySelector("div.mobile")

hamburg.onclick = function(){
  if(mobileLinks.style.cssText === "display: flex;"){
    mobileLinks.style.cssText = ""
  }
  else{
    mobileLinks.style.cssText = "display: flex;"
  }
} 

x.onclick = function(){
  mobileLinks.style.cssText = ""
}
