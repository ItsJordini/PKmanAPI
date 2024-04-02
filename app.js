//constant variables 
 
 const mainScreen = document.querySelector('.main-screen');
 const pokeId = document.querySelector('.pokemon-id');
 const pokemonName2 = document.querySelector('.pokemon-name');
 const pokeBackImage1 = document.querySelector('.poke-back-image1');
 const pokeFrontImage2 = document.querySelector('.poke-front-image2');
 const pokeBackImage2 = document.querySelector('.poke-back-image2');
 const pokemonsList = document.querySelector('ul')


async function fetch1() {
    
    try {
        const pokemonName = document.getElementById('pokemonName');
        const inputValue = pokemonName.value;

        const response = await fetch(`https:pokeapi.co/api/v2/pokemon/${inputValue}`);

        if(!response.ok){
            throw new Error('Could not grab pokemans');
        }
        const data = await response.json();

        const pokeFrontImage1 = data.sprites.front_default;
        const pokeFrontImage1Data = document.getElementById('pokeFrontImage1');
        pokeFrontImage1Data.src = pokeFrontImage1;
        pokeFrontImage1Data.classList.add('pokemonSprite');

        const pokeBackImage1 = data.sprites.back_default;
        const pokeBackImage1Data = document.getElementById('poke-back-image1');
        pokeBackImage1Data.src = pokeBackImage1;
        pokeBackImage1Data.classList.add('pokemonSprite');

        const pokemonId = data.id;
        const pokemonIdElement = document.getElementById('pokemonId');
        pokemonIdElement.innerText = `ID: ${pokemonId}`;

    }   
    catch(error){
        console.error(error)
    }
}

 //append list items of pokemons or use selector ALL to create a loop
document.addEventListener('DOMContentLoaded', function() {
    const pokemonsList = document.getElementById('pokemonsList');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let list = 0;

    function fetchPokemons (list) {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${list}&limit=10`)
        .then(function (response){
            return response.json();
        })
        .then(function(json){
            pokemonsList.innerHTML = ''; //Clear previous list
            const pokemons = json.results;

            for (const g of pokemons) {
                fetchPokemonData(g.url);
            }
        });
    }

    function fetchPokemonData(url) {
        fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            const listItem = document.createElement('li');
            listItem.innerText = `${data.id}: ${data.name}`;
            listItem.classList.add('nameList');
            pokemonsList.appendChild(listItem);
        });
    }

    //Initial fetch
    fetchPokemons(list);

    //Event Listeners for Buttons
    prevBtn.addEventListener('click', function (){
        list = Math.max(0, list - 10); // Ensure list doesn't go below 0 which is how many is being pulled at a time.
    });

    nextBtn.addEventListener('click', function (){
        list += 10;
        fetchPokemons(list);
    });
})


 