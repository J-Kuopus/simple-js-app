// IIFE for pokemonList array
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //This adds the showModal
      showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
      console.log(
        'pokemon chosen: ' +
          pokemon.name +
          ',' +
          ' has height of:' +
          pokemon.height +
          ' ' +
          'and has the abilities of' +
          pokemon.types
      );
    });
  }

  function showModal(name, height, type, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

    document.querySelector('.pokemon-button').addEventListener('click', () => {
      showModal();
    });
    /*let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);
    //This creates h1 element
    let modalText = document.createElement('h1');
    modalText.classList.add('modal-text');
    modalText.appendChild(modal);
    // This creates img element
    let modalImage = document.createElement('img');
    modalImage.classList.add('modal-image');
    modalImage.appendChild(modal);*/

    /*let details = 'Height: ' + height + '<br>' + 'Type: ' + type;

    document.querySelector('.modal-text').innerHTML = details;
    document.querySelector('.modal-image').setAttribute('src', imageUrl);
    console.log(imageUrl);*/
  }

  // Hides the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  // This will call the hideModal function on click
  closeButtonElement.addEventListener('click', hideModal);

  // This will close the modal when the ESC key is pressed
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
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
})();

// Loop that lists all the Pokemon
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/* IIFE for Modal
let modalContainer = document.querySelector('#modal-container');
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

  // These append the new elements, making them legit elements
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  // This creates a new class list for the modal container
  modalContainer.classList.add('is-visible');
}

// Hides the modal
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

// This event listener will close the modal when the ESC key is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

// This will close the modal when the user clicks outside the modal
modalContainer.addEventListener('click', (e) => {
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
}); */
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
