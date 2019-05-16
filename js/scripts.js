//KEYARRAY is an array of required keys in a valid pokemon object
const KEYARRAY = ['name', 'height', 'types'];

//IIFE = Immediately Invoked Function Expression
let pokemonRepository = (function () {
    let pokedex = [];

    function add(pokemon) {
        //verify input in an object
        if (typeof pokemon === 'object') {
            //verify the object has all necessary keys
            let valid = true;
            KEYARRAY.forEach(function (key) {
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

    function getAll() {
        return pokedex;
    }

    return {
        add: add,
        getAll: getAll
    };
})();


//The following entry will not work because the parameter's value is not an object
console.log('TEST: The following entry will not work because the parameter\'s value is not an object');
pokemonRepository.add('WillNotWorkExample');

//The following entry will not work because this object is missing the required key 'height'
console.log('TEST: The following entry will not work because this object is missing the required key \'height\'');
pokemonRepository.add({
    name: 'WontWorkExample',
    types: ['missing', 'height']
});

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

document.write("<ul>");
pokemonRepository.getAll().forEach(function (pokemon) {
    let comment = " - Normal";
    if (pokemon.height < 5) comment = " - very small.";
    if (pokemon.height > 50) comment = " - Wow, that's tall!";

    document.write('<li><h2>' + pokemon.name + '</h2><span class="declaration">(height: ' + pokemon.height + comment + ')</span></li>');
});
document.write("</ul>");
