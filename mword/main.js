let currentMovieIndex = 0;
let previousGuesses = [];
let movies = [];
let synonyms = {};
let filesLoaded = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getSynonym(word) {
  let capital_word = word.charAt(0).toUpperCase() + word.slice(1);
  if (synonyms[capital_word]) {
    const synonymList = synonyms[capital_word];
    return synonymList[Math.floor(Math.random() * synonymList.length)];
  }
  return word.toLowerCase();
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function generateClue(title) {
  return title.split(' ').map(word => {
    const cleanWord = word.replace(/[^\w\s]|_/g, "").toLowerCase();
    if (["the", "that", "of", "in", "and", "a", "to", "part", "i", "ii", "iii", "1", "2", "3"].includes(cleanWord)) {
      return `<span class="standard-word">${capitalize(word)}</span>`;
    }
    const synonym = getSynonym(cleanWord);
    if (synonym) {
      return capitalize(synonym);
    } else {
      return `<span class="standard-word">${capitalize(word)}</span>`;
    }
  }).join(' ');
}

function displayMovie() {
  const movie = movies[currentMovieIndex];
  document.getElementById('clue').innerHTML = generateClue(movie.title);
  document.getElementById('year').innerText = movie.year;
}

function normalizeString(str) {
  return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
}

function handleGuess(event) {
  if (event.key === 'Enter') {
    const guessInput = document.getElementById('guess-input');
    const guess = normalizeString(guessInput.value.trim());

    if (guess === normalizeString(movies[currentMovieIndex].title)) {
      guessInput.style.color = 'green';
      setTimeout(() => {
        previousGuesses.push(`<span style="color: white;">${guessInput.value.trim()}</span>`);
        document.getElementById('previous-guesses').innerHTML = previousGuesses.join(', ');
        guessInput.value = '';
        guessInput.style.color = '';
        currentMovieIndex = (currentMovieIndex + 1) % movies.length;
        displayMovie();
      }, 500);
    } else {
      guessInput.style.color = 'red';
      setTimeout(() => {
        previousGuesses.push(`<span style="color: red;">${guessInput.value.trim()}</span>`);
        document.getElementById('previous-guesses').innerHTML = previousGuesses.join(', ');
        guessInput.value = '';
        guessInput.style.color = '';
      }, 500);
    }
  }
}

function handleSkip() {
  const movie = movies[currentMovieIndex];
  previousGuesses.push(`<span style="color: red;">${movie.title}</span>`);
  document.getElementById('previous-guesses').innerHTML = previousGuesses.join(', ');
  currentMovieIndex = (currentMovieIndex + 1) % movies.length;
  displayMovie();
}

function loadJSON(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", file, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(null);
}

function checkFilesLoaded() {
  filesLoaded++;
  if (filesLoaded === 2) {
    shuffle(movies);
    displayMovie();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadJSON('movies.json', (data) => {
    movies = data;
    checkFilesLoaded();
  });

  loadJSON('words.json', (data) => {
    synonyms = data;
    checkFilesLoaded();
  });

  document.getElementById('guess-input').addEventListener('keydown', handleGuess);
  document.getElementById('skip-button').addEventListener('click', handleSkip);
});