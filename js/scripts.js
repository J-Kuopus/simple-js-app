/**
 * IIFE that includes all functions for Pokedex Repository
 * @namespace pokemonRepository
 */
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  /**
   * Adds new pokemon to the list and validates the input
   * @param {object} pokemon - name and details of pokemon
   * @memberof pokemonRepository
   */
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

  /**
   * Gets a list of all pokemon
   * @returns {array} - array of pokemon objects in JSON format
   * @memberof pokemonRepository
   */
  function getAll() {
    return pokemonList;
  }

  /**
   * Creates li tags for pokemon items, adds them to ul in "index.html"
   * @param {string} pokemon - name of pokemon
   * @memberof pokemonRepository
   */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('#pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');

    /**
     * Creates button element for each pokemon item
     * @function createElement
     * @memberof pokemonRepository
     */
    let button = document.createElement('button');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    /**
     * Adds event listener to pokemon buttons and activates showDetails function on click
     * @function addEventListener
     * @fires showDetails
     * @event click
     * @memberof pokemonRepository
     */
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });

    /**
     * Adds pokemon name to button element
     */
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');

    /**
     * Appends button elements to "index.html"
     */
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  /**
   * Fetches API data then returns JSON data as list
   * @returns {object} pokemon data - pokemon name and details
   * @memberof pokemonRepository
   */
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

  /**
   * Loads the JSON data details about each Pokemon
   * @param {string} item - name of pokemon
   * @returns {object} details- image, height, type traits of pokemon
   */
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

  /**
   * Loads the pokemon details into the modal
   * @param {object} pokemon - name and details of pokemon
   * @memberof pokemonRepository
   */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  /**
   * Opens modal when user clicks pokemon button and displays details
   * @param {string} name - name of pokemon
   * @param {string} height - height value of pokemon
   * @param {string} imageUrl - image url of pokemon
   * @memberof pokemonRepository
   */
  function showModal(name, height, imageUrl) {
    // Adds pokemon name as modal title
    document.querySelector('.modal-title').innerText = name;

    // Adds pokemon image into body of modal
    document.querySelector('.modal-image').setAttribute('src', imageUrl);

    // Adds pokemon height to body of modal
    let details = 'Height: ' + height;
    document.querySelector('.modal-text').innerText = details;
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
