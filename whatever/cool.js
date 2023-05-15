function generateName() {
  const initials = document.getElementById("initials").value.toUpperCase();
  const generator = document.getElementById("generator").value;
  const dataUrl = "generators/" + generator + ".json";

  fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      let result = "";
      for (let i = 0; i < initials.length; i++) {
        let letter = initials.charAt(i);
        if (data.hasOwnProperty(letter)) {
          let item = data[letter][Math.floor(Math.random() * data[letter].length)];
          result += item + " ";
        } else {
          result += letter + " ";
        }
      }
      document.getElementById("result").innerHTML = result.trim();
    })
    .catch(error => console.error(error));
}
