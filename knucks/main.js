const words = ['ACES HIGH', 'ANEW HOPE', 'BABY LOVE', 'BLUE PILL', 'BONE YARD', 'CHOP SUEY', 'CRZY GIRL', 'DAMN FOOL', 'DEAD LOVE', 'DEAD MEAT', 'DEAD SEXY', 'BAD@ LYFE', 'DRUM ROLL', 'DUMB LUCK', 'EASY LIFE', 'FIST FULL', 'FREE BIRD', 'FREE PASS', 'FREE TIME', 'FOUL PLAY', 'GAME OVER', 'GEEK LIFE', 'GIVE TAKE', 'GLAM ROCK', 'GOOD GIRL', 'GRRL POWR', 'HAIL MARY', 'HALF DONE', 'HALF FULL', 'HARD CORE', 'HARD LUCK', 'HARD TIME', 'HELL BENT', 'HIGH ROAD', 'HOME WARD', 'HOPE LESS', 'HURT HEAL', 'JUST DRAW', 'KNOW LIFE', 'KNOW PAIN', 'LADY LOVE', 'LAST CALL', 'LIVE FAST', 'LIVE LIFE', 'LONE STAR', 'LONG HARD', 'LONG SHOT', 'LOOK DOWN', 'LOST SOUL', 'LOVE HARD', 'LOVE HATE', 'LOVE PAIN', 'MANS RUIN', 'NULL VOID', 'PAID DUES', 'READ MORE', 'REST STOP', 'RIFF RAFF', 'ROCK HARD', 'ROCK ROLL', 'SELF HELP', 'SHOW GIRL', 'SHOW TELL', 'SHOE TIME', 'SICK CHIC', 'SWIM SINK', 'SOME JOKE', 'SUCK MINE', 'STAY AWAY', 'STAY DOWN', 'STAY GOLD', 'TAKE THIS', 'THUG LIFE', 'THUG WIFE', 'TIME WALK', 'TRUE LOVE', 'TUFF LOVE', 'TWAS LOVE', 'VITA MORS', 'WALK TALL', 'WELL DONE', 'BIGG BUTT', 'WORD PLAY', 'YARD BIRD', 'ZERO HOUR', 'SUCK DICK', 'COOL BEAN', 'HAWT MAMA', 'RAIN GURL', 'CUMM LOVR', 'RAVE KING', 'SEXX HOGG', 'HUGE DICK'];
var words_1 = []
var words_2 = []
const button_labels = ["knuckin'", "truckin'", "fuckin'"]
words.forEach(function (v, i) {
  var new_word = v.split(" ");
  words_1.push(new_word[0])
  words_2.push(new_word[1])
});

console.log(words_1, words_2)

document.addEventListener("DOMContentLoaded", function () {
  makeWords();
  var button = document.getElementById("reload");
  button.addEventListener("click", function () {
    makeWords();
  });

});

function makeWords() {
  var word1 = words_1[Math.floor(Math.random() * words_1.length)];
  var word2 = words_2[Math.floor(Math.random() * words_2.length)];
  document.getElementById("reload").innerHTML = button_labels[Math.floor(Math.random() * button_labels.length)];
  var word1Div = document.getElementById("word1");
  var word2Div = document.getElementById("word2");

  displayWord(word1, word1Div);
  displayWord(word2, word2Div);
}

function displayWord(word, container) {
  var html = "";

  for (var i = 0; i < word.length; i++) {
    html += "<span>" + word[i] + "</span>";
  }

  container.innerHTML = html;
}
