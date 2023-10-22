const hamburg = document.getElementById("burger");
hamburg.onclick = function(){
  document.querySelector("div.mobile").style.cssText = "display:flex;"
} 

const x = document.getElementById("mobile-x-button");
x.onclick = function(){
  document.querySelector("div.mobile").style.cssText = ""
}
