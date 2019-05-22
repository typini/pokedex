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
        console.log(loadDetails(pokemon));
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
            console.log(item);
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


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});