let pokemonRepository = (function () {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    'object' == typeof e && 'name' in e && 'detailsUrl' in e
      ? t.push(e)
      : console.log('pokemon is not correct');
  }
  function o(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function i(t) {
    o(t).then(function () {
      !(function (t, e, n) {
        (document.querySelector('.modal-title').innerText = t),
          document.querySelector('.modal-image').setAttribute('src', n);
        let o = 'Height: ' + e;
        document.querySelector('.modal-text').innerText = o;
      })(t.name, t.height, t.imageUrl);
    });
  }
  return {
    add: n,
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      let e = document.querySelector('#pokemon-list'),
        n = document.createElement('li');
      n.classList.add('group-list-item');
      let o = document.createElement('button');
      o.classList.add('btn-primary'),
        o.setAttribute('data-toggle', 'modal'),
        o.setAttribute('data-target', '#pokemonModal'),
        o.addEventListener('click', function () {
          i(t);
        }),
        (o.innerText = t.name),
        o.classList.add('pokemon-button'),
        n.appendChild(o),
        e.appendChild(n);
    },
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: o,
    showDetails: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
