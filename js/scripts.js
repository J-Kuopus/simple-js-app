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

//This lists the Pokemon in order by name, followed by height
let text = '';
let i = 0;
for (; pokemonList[i]; ) {
  text =
    text +
    ' ' +
    pokemonList[i].name +
    ' ' +
    '(height: ' +
    pokemonList[i].height +
    ')' +
    '<br>';
  i++;
}
document.write(text);

//This is supposed to mark a Pokemon with height: 1, or larger
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1) {
    document.write(" - Wow, that's big!");
  }
}
