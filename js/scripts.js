/* eslint-disable no-undef */

const pokemonRepository = (function () {
    //IIFE Function

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
        pokemonList.push(pokemon);
        } else {
            console.log('New Pokemon information is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        const pokemonList = document.querySelector('.pokemon-list');
        const listPokemon = document.createElement('li');
        const button = document.createElement('button');

        //listPokemon.classList.add('listPokemon-class');
        listPokemon.classList.add('list-item-class'); //changed from 'group-list-item'

        button.innerText = pokemon.name;

        button.classList.add('button-class', 'btn', 'btn-primary');

        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                //uncomment to display pokemon information in the console
                //console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.types = details.types;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.abilities = details.abilities;
            pokemon.imageURL = details.sprites.front_default;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
        });
    }    

    function showModal(pokemon) {
        const modalBody = $('.modal-body');
        const modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        const nameElement = $('<h1>' + pokemon.name + '</h1>');
        const imageElement= $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', pokemon.imageURL);

        const heightElement = $('<p>' + 'Weight: ' + pokemon.height + ' m' + '</p>');
        const weightElement = $('<p>' + 'Weight: ' + pokemon.weight + ' kg' + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,        
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
    };
}());

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});