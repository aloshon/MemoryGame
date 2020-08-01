const gameContainer = document.getElementById("game");
let chosenCard1 = null;
let chosenCard2 = null;
choiceCount = 0;
let cardsFlipped = 0;
cantClick = false;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
 
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
 
    // Decrease counter by 1
    counter--;
 
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
 
  return array;
}
 
let shuffledColors = shuffle(COLORS);
 
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
 
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
 
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
 
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
 
// TODO: Implement this function!
function handleCardClick(event) {
    if(cantClick){
        return;
    }
    if(event.target.classList.contains['flipped']){
        return;
    }
    let chosen = event.target;
    chosen.style.backgroundColor = chosen.classList[0];
    if(!chosenCard1 || !chosenCard2){
        chosen.classList.add('flipped');
        chosenCard1 = chosenCard1 || chosen;
        chosenCard2 = chosen === chosenCard1 ? null : chosen;
    }
 
    choiceCount++
    console.log("you just clicked", event.target);
    
    if(chosenCard1 && chosenCard2){
        cantClick = true;
        let card1 = chosenCard1.className;
        let card2 = chosenCard2.className;
 
        if (card1 === card2) {
            cardsFlipped += 2;
            chosenCard1.removeEventListener("click", handleCardClick);
            chosenCard2.removeEventListener("click", handleCardClick);
            chosenCard1 = null;
            chosenCard2 = null;
            cantClick = false;
          } else {
            setTimeout(function() {
              chosenCard1.style.backgroundColor = "";
              chosenCard2.style.backgroundColor = "";
              chosenCard1.classList.remove("flipped");
              chosenCard2.classList.remove("flipped");
              chosenCard1 = null;
              chosenCard2 = null;
              cantClick = false;
            }, 1000);
          }
        }
          if(COLORS.length === cardsFlipped){
              alert('Yas')
          }
        }    
 
let startButton = document.getElementById('startGame')
startButton.addEventListener('click', function(event){
    event.target = createDivsForColors(shuffledColors);
})