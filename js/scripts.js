const pokemonRepository = (function () {
    //IIFE Function

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

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

        listPokemon.classList.add('listPokemon-class');

        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
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
                console.log(pokemon);
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
            //console.log(pokemon);
            showModal(pokemon);
        });
    }    

    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = 'Height: ' + pokemon.height;

        let poekmonWeight = document.createElement('p');
        poekmonWeight.innerText = 'Weight: ' + pokemon.weight;

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('pokemon-modal-image');
        pokemonImage.src = pokemon.imageURL;

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(poekmonWeight);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,        
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
    };
}());

//console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});