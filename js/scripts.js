//repository is an array featuring Legendary Pokemon
let pokemonRepository = (function () {
    let repository = [
        {
            name: 'Articuno',
            type: ['flying', 'ice'],
            height: 9,
            pokedexNumber: '#145',
        },
        {
            name: 'Zapdos',
            type: ['flying', 'electric'],
            height: 10,
            pokedexNumber: '#145',
        },
        {
            name: 'Moltres',
            type: ['flying', 'fire'],
            height: 12,
            pokedexNumber: '#146',
        },
        {
            name: 'Lugia',
            type: ['flying', 'psychic'],
            height: 14,
            pokedexNumber: '#249',
        },
        {
            name: 'Ho-oh',
            type: ['flying', 'fire'],
            height: 13,
            pokedexNumber: '#250',
        },
    ];

    //Public Functions
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'type' in pokemon &&
            'height' in pokemon &&
            'pokedexNumber' in pokemon
        ) {
        repository.push(pokemon);
        } else {
            console.log('new pokemon information is not correct');
        }
    }
    function getAll() {
        return repository;
    }
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);

        //click event, display clicked pokemon name in the console
        button.addEventListener('click', function() {
            console.log(pokemon)
        });
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
}());

//Using a public function to add a legendary Pokemon to the list:
pokemonRepository.add({
    name: 'Kyogre',
    type: 'water',
    height: 15,
    pokedexNumber: '#382'
});

console.log(pokemonRepository.getAll());

//Loop to list Pokemon facts
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});