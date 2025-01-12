let btn = document.querySelector(".submit")
let textArea = document.querySelector(".Text-Area")
btn.addEventListener('click',function(){
  let  value = textArea.value;
  console.log(value)
})