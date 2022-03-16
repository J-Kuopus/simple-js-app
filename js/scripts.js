// These arrays contain the Pokemon data for the app
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

pokemonList.forEach(function (pokemon) {
  let result = pokemon.height >= 1 ? " - Wow, that's big!" : '';
  document.write(
    '<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + result + '</p>'
  );
});

//This lists the Pokemon in the DOM and marks them if they are size 1 or larger
/* document.write('<ul>');
function printArrayDetails(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].height >= 1) {
      document.write(
        '<li>' +
          list[i].name +
          ' (height: ' +
          list[i].height +
          ')' +
          " - Wow, that's big!" +
          '</li>'
      );
    } else {
      document.write(
        '<li>' + list[i].name + ' (height: ' + list[i].height + ')' + '</li>'
      );
    }
  }
}
document.write('</ul>');

printArrayDetails(pokemonList);
printArrayDetails(pokemonList2); */
