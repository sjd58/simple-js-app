//PokemonList array featuring Legendary Bird Pokemon from Generations 1 and 2:
let pokemonRepository = (function () {
    let pokemonList = [
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
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
}());

//Using a public function to add a legendary Pokemon to the list:
pokemonRepository.add({
    name: 'Kyogre',
    type: 'water',
    height: 15,
    pokedexNumber: '#382'
})

//Loop to list Pokemon facts
pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >= 14) {
        document.write('<p>' + pokemon.name + ' (' + 'height: ' + pokemon.height + ') ' + pokemon.pokedexNumber + ' Wow! That\'s a big Pokemon!' + '</p>')
    } else {
    document.write('<p>' + pokemon.name + ' (' + 'height: ' + pokemon.height + ') ' + pokemon.pokedexNumber + '</p>')
    }
});