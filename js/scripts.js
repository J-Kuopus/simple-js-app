// IIFE for pokemonList array
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Adds new pokemon to the list and validates the input
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  // Returns all the pokemon in the list
  function getAll() {
    return pokemonList;
  }
  // Creates li tags for pokemon items, adds them to ul in HTML
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('#pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');

    // Creates button for each pokemon item
    let button = document.createElement('button');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    // Activates showDetails function when user clicks pokemon button
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    // Adds pokemon name to button
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  // Fetches API data then returns JSON data as list
  function loadList() {
    return (
      fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        // Iterates over JSON data and defines pokemon variable
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }
  // Takes JSON data and organizes it
  function loadDetails(item) {
    let url = item.detailsUrl;
    return (
      fetch(url)
        .then(function (response) {
          return response.json();
        })

        // Adds details to the item
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }
  // Loads the pokemon details into the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }
  // Makes modal appear when user clicks Pokemon button
  function showModal(name, height, imageUrl) {
    // Adds pokemon name as modal title
    document.querySelector('.modal-title').innerText = name;

    // Adds pokemon image into body of modal
    document.querySelector('.modal-image').setAttribute('src', imageUrl);

    // Adds pokemon height to body of modal
    let details = 'Height: ' + height;
    document.querySelector('.modal-text').innerHTML = details;
  }

  // Return keys that allow you to access the IIFE functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Loop that iterates over the Pokemon list
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
