const petition = document.getElementById("petition-input");
const fixedDisplay = "Oh ancient cards, please reveal the truth";

const cardsDiv = document.getElementById("cards");
const readingDiv = document.getElementById("reading");
const petitionInput = document.getElementById("petition-input");
const questionInput = document.getElementById("question");

let hiddenAnswer = "";
let insideSecret = false;
let fixedIndex = 0;
let previousText = ""; // store previous div content

function revealCards() {
  // show the cards
  cardsDiv.classList.remove("hidden");
  const cardElements = cardsDiv.querySelectorAll(".card");
  cardElements.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, index * 700); // reveal each card 700ms apart
  });
  // show reading after all cards flipped
  const totalTime = cardElements.length * 700;

  setTimeout(() => {
    // grab hidden answer from petition
    let hiddenAnswer = getHiddenAnswer().slice(0, -1);
    // grab the question
    const question = questionInput.value.trim();
    let readingText = "";
    let answer = "The cards don't feel like answering right now.";
    if (hiddenAnswer) {
      answer = `The cards reveal: "${hiddenAnswer || "??"}"`;
    }
    if (question){
      readingText = `Your question: "${question}"\n` + answer;
    }
    else {
      readingText = "No Question Provided.";
    }
    // display the reading
    readingDiv.textContent = readingText;
  }, totalTime);
}

petition.addEventListener("input", () => {
  const sel = window.getSelection();
  let text = petition.textContent;

// Only consider newly added characters
  let newChars = "";
  if (text.length > previousText.length) {
    newChars = text.slice(previousText.length);
  }
  previousText = text;

  let displayText = "";
  let newFixedIndex = 0;
  let addedHiddenChar = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === ".") {
      insideSecret = !insideSecret;
      displayText += fixedDisplay[newFixedIndex];
      newFixedIndex++;
      continue;
    }

    if (insideSecret) {
        if (addedHiddenChar == false){
            console.log(newChars);
            hiddenAnswer += newChars;
            addedHiddenChar = true;
        }
      if (newFixedIndex < fixedDisplay.length) {
        displayText += fixedDisplay[newFixedIndex];
        newFixedIndex++;
      }
    } else {
        displayText += char;
        newFixedIndex++;
    }
  }

  fixedIndex = newFixedIndex;
  petition.textContent = displayText;

  // Move cursor to end
  const range = document.createRange();
  range.selectNodeContents(petition);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
});

// This function just returns it for the button
function getHiddenAnswer() {
    console.log(hiddenAnswer);
  return hiddenAnswer;
}
