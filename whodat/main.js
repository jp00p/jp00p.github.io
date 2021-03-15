var CURRENT_POKEMON;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)+1);
}

function getPokemon(specific_pokemon){

    var max_id = 151; // max pokedex ID of pokemon
    var random_pokemon = getRandomInt(max_id);
    if (specific_pokemon != null){
        random_pokemon = specific_pokemon;
    }
    var request_url = "https://pokeapi.co/api/v2/pokemon/" + random_pokemon;

    fetch(request_url)
    .then( function(response){
        
        if(response.status == 404){
            getPokemon(); // restart
        } 

        return response.json();
    })
    .then( data => setPokemon(data) );
    
}

function setPokemon(pokemon){

    pokemon.name = pokemon.name.replace("-m", "").replace("-f", "");

    CURRENT_POKEMON = pokemon;

    var pokemon_name = document.getElementById("pokemon-name");
    var pokemon_image = document.getElementById("pokemon-image");

    pokemon_name.innerHTML = pokemon.name;
    pokemon_image.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];

    var guess_text = document.getElementById("guess");
    guess_text.value = "";
    guess_text.focus();


}


function startGame(){

    getPokemon();

    var start_button = document.getElementById("before-start");
    start_button.remove()

    var game_controls = document.getElementById("after-start");
    game_controls.className = "active";

    // start timer

}


function checkGuess(guess){
    
    
    if(guess.toLowerCase() == CURRENT_POKEMON.name){
        return true;
    }

    return false;

}


document.addEventListener("DOMContentLoaded", function(){

    var start_button = document.getElementById("start-game");
    var guess_button = document.getElementById("submit-guess");
    var guess_text = document.getElementById("guess");
    
    var guess_form = document.getElementById("guess-form");

    guess_form.addEventListener("submit", function(event){
        
        event.preventDefault();

        if(checkGuess(guess_text.value)){
            getPokemon();
        }

    });

    start_button.addEventListener("click", function(){
        
        startGame();

    });

});