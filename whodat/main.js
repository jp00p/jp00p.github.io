var CURRENT_POKEMON;
var SCORE = 0;
var GAME_TIME = 60;

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

    pokemon.name = 
    pokemon.name.replace("nidoran-m", "nidoran")
                .replace("nidoran-f", "nidoran")
                .replace("mr-mime", "mr mime");

    CURRENT_POKEMON = pokemon;

    var pokemon_name = document.getElementById("pokemon-name");
    var pokemon_image = document.getElementById("pokemon-image");

    pokemon_name.innerHTML = pokemon.name;
    pokemon_image.src = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    pokemon_image.classList.remove("revealed");

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
    var countdown = setInterval(
        function(){

            GAME_TIME--;
            var timer = document.getElementById("timer");
            timer.innerHTML = GAME_TIME;

            if(GAME_TIME <= 0){
                clearInterval(countdown);
                gameOver();
            }

        },
        1000
    );

}


function checkGuess(guess){
    
    
    if(guess.toLowerCase() == CURRENT_POKEMON.name){
        return true;
    }

    return false;

}



function revealPokemon(){

    var pokemon_img = document.getElementById("pokemon-image");
    pokemon_img.classList.add("revealed");

}




function gameOver(){
    
    showMessage("Your final score was " + SCORE);

    var guess_form = document.getElementById("guess-form");
    guess_form.remove();

    var restart_button = document.getElementById("restart");
    restart_button.style.display = "inline-block";

    var game_over_msg = document.getElementById("game-over");
    game_over_msg.style.display = "block";


}


function showMessage(msg){
    var message = document.getElementById("message");
    message.innerHTML = msg;
}

document.addEventListener("DOMContentLoaded", function(){

    var start_button    = document.getElementById("start-game");
    var guess_button    = document.getElementById("submit-guess");
    var guess_text      = document.getElementById("guess");
    var guess_form      = document.getElementById("guess-form");
    var score           = document.getElementById("score");
    var game            = document.getElementById("game");
    var restart_button  = document.getElementById("restart");

    guess_form.addEventListener("submit", function(event){
        
        event.preventDefault();

        if(checkGuess(guess_text.value)){
            // if they get it right
            showMessage("Correct!")
            SCORE += 100;
            score.innerHTML = SCORE;
            revealPokemon();
            setTimeout(
                function(){ 
                    showMessage("")
                    getPokemon(); 
                },
                750
            )
            

        } else {
            // if they get it wrong
            game.classList.add("shake");
            showMessage("WRONG!!!")
            
            guess_form.reset();
            guess_text.focus();

            setTimeout(
                function(){ 
                    game.classList.remove("shake"); 
                    showMessage("");
                },
                500
            );


        }

    });




    start_button.addEventListener("click", function(){
        
        startGame();

    });

    restart_button.addEventListener("click", function(){
        
        location.reload();

    });

});