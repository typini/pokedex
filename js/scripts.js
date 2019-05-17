//KEYARRAY is an array of required keys in a valid pokemon object
const KEYARR = ['name', 'height', 'types'];

//IIFE = Immediately Invoked Function Expression
let pokemonRepository = (function () {
    let pokedex = [];

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
        $newButton.innerText = pokemon.name;
        let $theList = document.querySelector(".the_list");
        $newLi.appendChild($newButton);
        $theList.appendChild($newLi);

        $newButton.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return pokedex;
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        showDetails: showDetails
    };
})();

pokemonRepository.add({
    name: 'Birobirio',
    height: 80,
    types: ['dust', 'wind', 'cacti']
});

pokemonRepository.add({
    name: 'Chipozard',
    height: 2,
    types: ['bird', 'hooves', 'scales']
});

pokemonRepository.add({
    name: 'Drikka',
    height: 12,
    types: ['fur', 'electricity', 'teeth']
});

pokemonRepository.add({
    name: 'Fworasword',
    height: 15,
    types: ['metal', 'fire', 'scales']
});

pokemonRepository.add({
    name: 'Gub',
    height: 1,
    types: ['ooze', 'tentacles', 'slippery']
});


pokemonRepository.getAll().forEach(function (pokemon) {
    let comment = " - Normal";
    if (pokemon.height < 5) comment = " - very small.";
    if (pokemon.height > 50) comment = " - Wow, that's tall!";

    pokemonRepository.addListItem(pokemon);

});
