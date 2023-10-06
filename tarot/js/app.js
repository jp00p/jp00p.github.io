let bounds;

function rotateToMouse(e, card = null) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2
  }
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  card.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
    translateY(0)
  `;

  card.querySelector('.glow').style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      #ffffff55,
      #0000000f
    )
  `;
}

document.querySelectorAll(".card").forEach(function (card) {

  card.addEventListener('mousemove', (ev) => {
    bounds = card.getBoundingClientRect();
    rotateToMouse(ev, card);
  });

  card.addEventListener('mouseleave', (ev) => {
    ev.target.style.transform = '';
  });

});

document.addEventListener("DOMContentLoaded", function () {

  const cards = Array.from(document.querySelectorAll(".card"));
  const shuffled = cards.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 3);
  selected.forEach((e, i) => {
    e.classList.add("show")
    e.classList.add("picked-" + (i + 1))
    if (Math.random() * 100 <= 10) {
      e.classList.add("reversed")
    }
  })


});
