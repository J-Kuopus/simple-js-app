// IIFE for pokemonList array
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Wartortle',
      height: 1.0,
      types: ['monster', 'water-1'],
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: ['monster', 'dragon'],
    },
    {
      name: 'Pikachu',
      height: 0.4,
      types: ['field', 'fairy'],
    },
    {
      name: 'Clefable',
      height: 1.3,
      types: ['fairy'],
    },
    {
      name: 'Pidgey',
      height: 0.3,
      types: ['flying'],
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['monster', 'water1'],
    },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonLoopList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    document.write(button.innerText);
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonLoopList.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

// Loop that lists all the Pokemon and marks them if they are size 1 or bigger

pokemonRepository.getAll().forEach(function (pokemon) {
  let pokemonLoopList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  document.write(button.innerText);
  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');
  listItem.appendChild(button);
  pokemonLoopList.appendChild(listItem);
});
