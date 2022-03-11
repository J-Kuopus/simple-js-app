// This array contains the Pokemon data for the app
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
];

//This lists the Pokemon in the DOM and marks them if they are size 1 or larger
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1) {
    document.write(
      pokemonList[i].name +
        ' (height: ' +
        pokemonList[i].height +
        ')' +
        " - Wow, that's big!" +
        '<br>'
    );
  } else {
    document.write(
      pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '<br>'
    );
  }
}
