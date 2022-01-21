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

        //listPokemon.classList.add('listPokemon-class');
        listPokemon.classList.add('group-list-item');

        button.innerText = pokemon.name;
        button.classList.add('button-class', 'btn', 'btn-primary');

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
    
    /* SHOW MODAL FUNCTION INTRODUCED IN 1.10 USING BOOTSTRAP, shown on the video */

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalBody.empty();

        //creating element for name in modal content

        let nameElement = $('<h1>' + pokemon.name + '</h1>');
        //creating img in modal content
        let imageElementFront= $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', item.imageURLFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', image.imageURLBack);        
        //creating element for height in modal content
        let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
    }

    /* JS FOR PREVIOUS SHOW MODAL FUNCTION */

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

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});