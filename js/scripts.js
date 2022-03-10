// This array contains the Pokemon data for the app
let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 7,
    types: ['monster', 'grass'],
  },
  {
    name: 'Charmander',
    height: 6,
    types: ['monster', 'dragon'],
  },
  {
    name: 'Pikachu',
    height: 4,
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
