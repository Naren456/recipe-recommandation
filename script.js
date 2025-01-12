let btn = document.querySelector(".submit")
let textArea = document.querySelector(".Text-Area")
let mainContainer = document.querySelector(".main-container")
btn.addEventListener('click',function(){
  let  value = textArea.value;
  console.log(value)
})