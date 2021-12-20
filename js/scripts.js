//PokemonList array featuring Legendary Bird Pokemon from Generations 1 and 2:
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
//Loop to list Pokemon facts
for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' ' + 'height: ' + pokemonList[i].height);
    //Conditional to insert a comment about Pokemon size
    if(pokemonList[i].height > 12) {
        document.write(' Wow! That\'s a big Pokemon!');
    }
    document.write('<br>');
}