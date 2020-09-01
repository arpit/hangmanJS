const movies = [
  "Indiana Jones",
  "Star Wars",
  "Ready Player One"
];


let usedLetters = [];

function selectMovie(){
  const index = getRandom(0, movies.length-1)
  return movies[index];
}

let movie = "";
let errorCount = 0;


function reset(){
  
  document.querySelectorAll(".slot").forEach(e => e.remove());
  document.querySelectorAll(".letter").forEach(e => e.remove());
  usedLetters = []
  errorCount = 0;
  document.getElementById("messages").innerHTML = `${11-errorCount} attempts remaining`;
}

function setup(){
  reset();
  movie = selectMovie();
  createSlots(movie);
  createLetters();
  
  
}

function createSlots(movie){
  const container = document.getElementById("output");
  const words = movie.split(" ")
  words.forEach( word => {
    const para = document.createElement("p");
    const chars = word.split("");
    chars.forEach( function(char){
      const span = document.createElement("span");
      span.classList.add("slot")
      span.classList.add("unfilled")
      span.classList.add(`slot_${ char == " " ? "space" : char.toUpperCase() }`)
      const text = document.createTextNode("?");
      span.appendChild(text)
      para.appendChild(span)
    })
    container.appendChild(para);
  } )
}

function createLetters(){
  let lettersContainer = document.getElementById("letters")
  var first = "A", last = "Z";
  for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
    var letter = String.fromCharCode(i);  
    const span = document.createElement("span");
    span.classList.add("letter")
    span.classList.add(`letter_${letter}`)
    const text = document.createTextNode(letter);
    span.appendChild(text)
    span.addEventListener( "click", (event)=>{
          onLetterTapped(event.target.childNodes[0].nodeValue)
    })
    lettersContainer.appendChild(span);
  }

}

function onLetterTapped(letter){
  if(usedLetters.includes(letter)) return;
  usedLetters.push(letter)
  document.querySelector(`.letter_${letter}`).style.opacity = 0.3
  
  if(!movie.toUpperCase().split("").includes(letter)){
    errorCount++;
    document.getElementById("messages").innerHTML = `${11-errorCount} attempts remaining`;
    if(errorCount == 11){
      alert("Game Over");
      setup();
    }
    return;
  }
  
  document.querySelectorAll(`.slot_${letter}`).forEach(e => {
    e.classList.add("filled")
    e.classList.remove("unfilled")
    e.innerHTML = letter.toUpperCase()
  })
  
  const empty = document.querySelectorAll(".unfilled").length;
  if(empty == 0){
    alert("You win!")
    setup();
  }
  
  
}

setup();


// Utils
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
