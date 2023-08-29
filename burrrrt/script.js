const jokeElement = document.getElementById("joke");
const punchlineElement = document.getElementById("punchline");
const jokes = [
  {
    setup: "Why did the toilet paper roll down the hill? ",
    punchline: "To get to the bottom."
  },
  {
    setup: "Why do ducks have feathers?",
    punchline: "To cover their butt quacks.",
  },
  {
    setup: "What’s the definition of surprise?",
    punchline: "A fart with a lump in it."
  },
  {
    setup: "Where do bees go to the bathroom?",
    punchline: "The BP station."
  },
  {
    setup: "What did Spock find in the Enterprise toilet?",
    punchline: "The Captain’s Log."
  },
  {
    setup: "What’s brown and sounds like a bell?",
    punchline: "Dung."
  },
  {
    setup: "Wanna hear a poop joke?",
    punchline: "Nevermind. It’s too corny.",
  },
  {
    setup: "What did one fly say to the other?",
    punchline: "“Is this stool taken?”"
  },
  {
    setup: "Why didn’t the soldier flush the toilet?",
    punchline: "It wasn’t his doody."
  },
  {
    setup: "I like toilets for two reasons.",
    punchline: "Number one and number two."
  },
  {
    setup: "I bought a toilet brush yesterday, but I’ve gotta say…",
    punchline: "I prefer toilet paper."
  },
  {
    setup: "It’s funny how corn maintains its shape after you poop it out…",
    punchline: "Yet it tastes completely different."
  },
  {
    setup: "What’s invisible and smells like carrots?",
    punchline: "A bunny fart!"
  },
  {
    setup: "Today I learned that diarrhea is hereditary. ",
    punchline: "It runs in your jeans."
  },
  {
    setup: "How come nobody at the king’s table laughed when he farted?",
    punchline: "Because noble gases don’t cause reactions."
  },
  {
    setup: "What do you call someone who helps you learn to fart?",
    punchline: "A Tooter."
  },
  {
    setup: "What is a fart fetishist’s favorite article of clothing?",
    punchline: "Windbreaker."
  },
  {
    setup: "What do roads and farts have in common?",
    punchline: "Asphalt."
  },
  {
    setup: "What’s the difference between a bad pun and a fart?",
    punchline: "A pun is a shift of wit…"
  },
  {
    setup: "Why was the fart traumatized?",
    punchline: "Because it’s been through some shit.  ",
  }
];

function displayRandomJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];

  jokeElement.textContent = randomJoke.setup;
  jokeElement.style.opacity = 1;

  setTimeout(() => {
    punchlineElement.textContent = randomJoke.punchline;
    punchlineElement.style.opacity = 1;

    setTimeout(() => {
      punchlineElement.style.opacity = 0;
      jokeElement.style.opacity = 0;
      setTimeout(displayRandomJoke, 1000); // Wait 0.5 seconds before displaying a new joke
    }, 3000); // Display punchline for 3 seconds
  }, 1000); // Show punchline after 1 second
}
document.addEventListener("DOMContentLoaded", function () {
  //fartScroll(100);
  displayRandomJoke();
});