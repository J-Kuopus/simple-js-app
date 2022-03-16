// These arrays contain the Pokemon data for the app
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

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  let result = pokemon.height >= 1 ? " - Wow, that's big!" : '';
  document.write(
    '<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + result + '</p>'
  );
});
