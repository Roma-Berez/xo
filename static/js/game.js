let cubes = document.querySelectorAll(".cube")
let main = document.querySelector('.main')
let active = true
let timer = document.querySelector('.timer')
let actualTimer = document.querySelector(".actual-timer");
let interval;
let sendThis = document.querySelector('.send-this')
let copyIcon = document.querySelector('.copy-icon')
//- - - - - - - - - - - - - - - - - - - - - - - -

if (symbol == 'o'){
  sendThis.style.display = 'none'
}

function copyText() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  copyIcon.src = "/img/tick.gif";

  setTimeout(function(){
    copyIcon.src = "/img/CopyIcon.png";
  }, 3000)
   
}

setInterval(async function () {
  if (!active) {
    let response = await fetch("/get-moves/" + id)
    let json = await response.json()
    let moves = json.historyMove // ['', 'o', 'x']
    console.log(moves)
    checkIfWin(moves);

    for (let i = 0; i < cubes.length; i++){
      cubes[i].textContent = moves[i]
    }
    
    
    let amountX = 0
    let amountO = 0

    for (let i = 0; i < moves.length; i++) {
      if (moves[i] == 'x') {
        amountX++
      }
      if (moves[i] == "o") {
        amountO++
      }
    }



    if (amountX > amountO ){
      if (symbol == 'o'){
        setActive(true)
      } else {
        setActive(false)
      }
    }
    

    if (amountX == amountO) {
      if (symbol == "x") {
        setActive(true)
      } else {
        setActive(false)
      }
    }

    







  }


 

}, 1000)


if (symbol == "o") {
  setActive(false)



}

for (let i = 0; i < cubes.length; i++) {
  cubes[i].addEventListener("click", function () {
    if (cubes[i].textContent != '') return
    if (active == false) {
      return undefined
    } else {
      cubes[i].textContent = symbol
      sendToBackend(symbol, i, id)
      setActive(false)
    }
  })
}
function setActive(activeStatus) {
  if (activeStatus == false){
     active = false
     clearInterval(interval)
     if (!main.classList.contains('not-active')) {  
       main.classList.add('not-active')
     }
    if (!timer.classList.contains("not-active")) {
      timer.classList.add("not-active");
      
    }
  } else {
    active = true
    main.classList.remove('not-active')
    timer.classList.remove("not-active");
    interval = setInterval(function(){
      actualTimer.textContent = +actualTimer.textContent-1
      if (actualTimer.textContent == 0){
        alert('You Loose!!!')
        location.href = '/'
      }
    },1000)
  }
  
}
function checkIfWin(moves) {
let isWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

for (let i = 0;i < isWin.length; i++){
  for (let j = 0; j < moves.length; j++) {
    if (
      moves[isWin[i][0]] == moves[isWin[i][1]] &&
      moves[isWin[i][1]] == moves[isWin[i][2]] &&
      moves[isWin[i][1]] != ''
    ) {
      alert("win " + moves[isWin[i][1]]);
      location.href = '/'
      break;
    }
  }
}





}

async function sendToBackend(symbol, i, id) {
  let response = await fetch(`/new-move/${symbol}/${i}/${id}`)
  let json = await response.json()
  return json.id
}
