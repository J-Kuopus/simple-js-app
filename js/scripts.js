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

let pokemonList2 = [
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

//This lists the Pokemon in the DOM and marks them if they are size 1 or larger
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1) {
    document.write(
      '<p>' +
        pokemonList[i].name +
        ' (height: ' +
        pokemonList[i].height +
        ')' +
        " - Wow, that's big!" +
        '</p>'
    );
  } else {
    document.write(
      '<p>' +
        pokemonList[i].name +
        ' (height: ' +
        pokemonList[i].height +
        ')' +
        '</p>'
    );
  }
}
