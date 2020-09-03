const MAX_ERROR_COUNT = 6;

const ALL_MOVIES = [
  "Indiana Jones",
  "Star Wars",
  "Ready Player One"
];


let selectedMovie = "";
let errorCount = 0;


function selectMovie(){
  const index = getRandom(0, ALL_MOVIES.length-1)
  return ALL_MOVIES[index];
}


function reset(){
  document.getElementById("hangman_graphic").setAttribute("src", `images/0.png`)
  document.querySelectorAll("#output p").forEach(e => e.remove());
  document.querySelectorAll(".letter").forEach(e => e.remove());
  errorCount = 0;
  document.getElementById("messages").innerHTML = `${MAX_ERROR_COUNT-errorCount} attempts remaining`;
}

function setup(){
  selectedMovie = selectMovie();
  createSlots(selectedMovie);
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
      span.classList.add("unfilled")
      span.classList.add(`slot_${ char.toUpperCase() }`)
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
    const button = createInputButton(letter)
    lettersContainer.appendChild(button);
  }

}

function createInputButton(letter){
  const button = document.createElement("button");
  button.classList.add("letter")
  button.classList.add(`letter_${letter}`)
  const text = document.createTextNode(letter);
  button.appendChild(text)
  button.addEventListener("click", onLetterTapped)
  return button
}

function onLetterTapped(event){
  event.target.removeEventListener("click", onLetterTapped)
  const letter = event.target.childNodes[0].nodeValue;
  event.target.style.opacity = 0.3
  
  if(!selectedMovie.toUpperCase().split("").includes(letter)){
    guessedWrong();
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

function guessedWrong(){
  errorCount++;
  document.getElementById("hangman_graphic").setAttribute("src", `images/${errorCount}.png`)
  document.getElementById("messages").innerHTML = `${MAX_ERROR_COUNT-errorCount} attempts remaining`;
  if(errorCount == MAX_ERROR_COUNT){
    alert("Game Over");
    reset();
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
