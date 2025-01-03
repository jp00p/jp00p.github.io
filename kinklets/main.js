document.addEventListener('DOMContentLoaded', () => {
  const BEAD_CLASSES = [
    'bead-red', 'bead-blue', 'bead-yellow',
    'bead-green', 'bead-purple', 'bead-orange',
    'bead-neon-green', 'bead-neon-pink', 'bead-neon-orange',
    'bead-neon-blue', 'bead-neon-purple', 'bead-neon-yellow',
    'bead-cyan', 'bead-magenta', 'bead-lime', 'bead-teal', 'bead-olive',
    'bead-maroon', 'bead-navy', 'bead-aqua', 'bead-fuchsia', 'bead-silver',
    'bead-gold', 'bead-coral', 'bead-salmon', 'bead-khaki', 'bead-plum',
    'bead-indigo', 'bead-violet', 'bead-turquoise', 'bead-lavender', 'bead-mint',
    'bead-rose', 'bead-peach', 'bead-amber', 'bead-emerald', 'bead-ruby',
    'bead-sapphire', 'bead-ivory', 'bead-cream', 'bead-bronze',
    'bead-copper', 'bead-pearl', 'bead-jade', 'bead-amethyst',
    'bead-topaz', 'bead-opal', 'bead-garnet', 'bead-quartz',
    'bead-tanzanite', 'bead-malachite', 'bead-lapis', 'bead-citrine', 'bead-peridot',
    'bead-aquamarine', 'bead-moonstone', 'bead-sunstone', 'bead-hematite'
  ];

  const randomStringDiv = document.getElementById('random-string');
  const newStringBtn = document.getElementById('new-string-btn');
  const copyImageBtn = document.getElementById('copy-image-btn');

  Promise.all([
    fetch('adjectives.txt').then(response => response.text()),
    fetch('list_of_words.txt').then(response => response.text())
  ]).then(([adjectivesText, wordsText]) => {
    const adjectives = processWords(adjectivesText);
    const words = processWords(wordsText);
    displayRandomString(adjectives, words);

    newStringBtn.addEventListener('click', () => {
      displayRandomString(adjectives, words);
    });

    copyImageBtn.addEventListener('click', () => {
      copyContentToClipboard();
    });
  });

  function processWords(text) {
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    return Array.from(new Set(words));
  }

  function displayRandomString(adjectives, words) {
    const randomString = generateRandomString(adjectives, words);
    randomStringDiv.innerHTML = ''; // Clear previous content

    const beadPattern = generateBeadPattern();

    // Add 10 beads on the left side
    for (let i = 0; i < 10; i++) {
      const bead = document.createElement('div');
      bead.className = `bead ${beadPattern[i % beadPattern.length]}`;
      randomStringDiv.appendChild(bead);
    }

    const wordsArray = randomString.split(' ');

    wordsArray.forEach((word, index) => {
      for (const char of word) {
        const img = document.createElement('img');
        img.src = `alpha/${char}.png`;
        img.alt = char;
        img.style.width = '20px'; // Adjust size as needed
        randomStringDiv.appendChild(img);
      }

      if (index < wordsArray.length - 1) {
        const bead = document.createElement('div');
        bead.className = `bead ${beadPattern[index % beadPattern.length]}`;
        randomStringDiv.appendChild(bead);
      }
    });

    // Add 10 beads on the right side
    for (let i = 0; i < 10; i++) {
      const bead = document.createElement('div');
      bead.className = `bead ${beadPattern[i % beadPattern.length]}`;
      randomStringDiv.appendChild(bead);
    }
  }

  function generateRandomString(adjectives, words) {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return `${randomAdjective} ${randomWord}`;
  }

  function getRandomBeadClass() {
    const randomIndex = Math.floor(Math.random() * BEAD_CLASSES.length);
    return BEAD_CLASSES[randomIndex];
  }

  function generateBeadPattern() {
    const beadClassesCopy = [...BEAD_CLASSES]; // Create a copy of the bead classes
    const numBeadTypes = Math.floor(Math.random() * 4) + 1;
    const selectedBeads = [];
    for (let i = 0; i < numBeadTypes; i++) {
      selectedBeads.push(beadClassesCopy.splice(Math.floor(Math.random() * beadClassesCopy.length), 1)[0]);
    }
    const patternLength = Math.floor(Math.random() * 3) + 1;
    const beadPattern = [];
    for (let i = 0; i < patternLength; i++) {
      beadPattern.push(selectedBeads[i % selectedBeads.length]);
    }
    return beadPattern;
  }

  function copyContentToClipboard() {
    const copyImageBtn = document.getElementById('copy-image-btn');
    html2canvas(document.getElementById('random-string'), { backgroundColor: '#000' }).then(canvas => {
      canvas.toBlob(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]).then(() => {
          const originalText = copyImageBtn.textContent;
          copyImageBtn.textContent = 'copied!';
          setTimeout(() => {
            copyImageBtn.textContent = originalText;
          }, 1500);
        }).catch(err => {
          console.error('Failed to copy image: ', err);
        });
      });
    });
  }
});