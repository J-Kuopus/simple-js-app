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
    let pokemonList = document.querySelector('#pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function loadList() {
    //showLoadingMessage();
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
    //showLoadingMessage();
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

  /* function showLoadingMessage() {}

  function hideLoadingMessage() {} */

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  function showModal(name, height, imageUrl) {
    document.querySelector('.modal-title').innerText = name;
    document.querySelector('.modal-image').setAttribute('src', imageUrl);
    /* let modalContainer = document.querySelector('#modal-container');
    document.querySelector('.modal-title').innerText = name;
    let details = 'Height: ' + height;
    document.querySelector('.modal-text').innerHTML = details;
    document.querySelector('.modal-image').setAttribute('src', imageUrl);

    // This will close the modal with a click on Close button
    let closeButton = document.querySelector('.modal-close');
    closeButton.addEventListener('click', hideModal);

    // This will close the modal when the ESC key is pressed
    window.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        modalContainer.classList.contains('is-visible')
      ) {
        hideModal();
      }
    });

    //This will close modal when user clicks outside of it
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    // Adds 'is-visible' class to modalContainer
    modalContainer.classList.add('is-visible');
  }

  // Removes the 'is-visible class', hiding the modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible'); */
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
