let modalContainer = document.querySelector('#modal-container');
// IIFE for pokemonList array
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    // This will log the Pokemon's name in the console when the button is clicked
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
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
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(title, text) {
  // This clears all existing modal content in HTML
  modalContainer.innerHTML = '';

  // This creates a new modal div
  let modal = document.createElement('div');
  modal.classList.add('modal');

   // This creates the close button on the modal
   let closeButtonElement = document.createElement('button');
   closeButtonElement.classList.add('modal-close');
   closeButtonElement.innerText = 'Close';
    // This will call the hideModal function on click
  closeButtonElement.addEventListener('click', hideModal);

   // This creates a new h1 element
   let titleElement = document.createElement('h1');
   titleElement.innerText = title;

   // This creates a new p element
  let contentElement = document.createElement('p');
  contentElement.innerText = text;
    };
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Loop that lists all the Pokemon
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/* Search Bar code
const searchInput = document.querySelector('#search-bar');

searchInput.addEventListener('input', (pokemon) => {
  let value = pokemon.target.value;
  if (value && value.trim().length > 0) {
    value = value.trim().toLowerCase();
  } else {
    return 'Invalid Input!';
  }
}); */
