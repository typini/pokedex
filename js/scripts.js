//KEYARRAY is an array of required keys in a valid pokemon object
//const KEYARR = ['name', 'height', 'types'];
const KEYARR = ['name', 'detailsUrl'];

//IIFE = Immediately Invoked Function Expression
let pokemonRepository = (function () {
    let pokedex = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        //verify input in an object
        if (typeof pokemon === 'object') {
            //verify the object has all necessary keys
            let valid = true;
            KEYARR.forEach(function (key) {
                if (!pokemon.hasOwnProperty(key))
                    valid = false;
            });              
            if (valid)
                pokedex.push(pokemon);
            else
                console.warn("Pokemon data is missing information.  Pokemon not added.");
        } else {
        console.warn("Pokemon of type " + typeof pokemon + " was not added to the repository.");
        }
    }

    function addListItem(pokemon) {
        let $newLi = document.createElement("li");
        let $newButton = document.createElement("button");
        $newButton.innerText = (pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
        let $theList = document.querySelector(".the_list");
        $newLi.appendChild($newButton);
        $theList.appendChild($newLi);

        $newButton.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        document.getElementById("loading").style.visibility = "visible";
        loadDetails(pokemon);
    }

    function getAll() {
        return pokedex;
    }

    //Get the complete list of Pokemon and their urls
    //url:  https://pokeapi.co/api/v2/pokemon/
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
            });
        }).catch(function (e) {
            console.log('There was an error: ' + e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
            //display the item in the modal here, AKA after the info has loaded).
            modalClass.showModal(item.name, item.height, item.imageUrl);
            //console.log(item);
            setTimeout(function () { document.getElementById("loading").style.visibility = "hidden"; }, 400);
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//Modal IIFE
let modalClass = (function() {
    let $modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, imgUrl) {   
        $modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image');
        imageElement.src = imgUrl;

        let nameElement = document.createElement('p');
        nameElement.innerText = (name[0].toUpperCase() + name.slice(1));

        let heightElement = document.createElement('p');
        heightElement.innerHTML = "<span>Height: </span>" + height;

        modal.appendChild(imageElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(closeButtonElement);
        $modalContainer.appendChild(modal);

        $modalContainer.classList.add('is-visible');

//        document.querySelector('#show-modal').addEventListener('click', () => {
//            showModal('name', 'height', 'url');
//        });

    }

    function hideModal() {
        $modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        var $modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    $modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === $modalContainer) {
            hideModal();
        }
    });


    return {
        showModal: showModal,
        hideModal: hideModal
    }

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
        //modalClass.showModal("Test1", "7", "images/lupa.svg");
    });
});