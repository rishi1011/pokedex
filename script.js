const container = document.getElementById('container');
const pokemonCount = 100;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const form = document.getElementById('form');
const search = document.getElementById('search');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = search.value;
    container.innerHTML = '';
    if (value === '') {
        fetchPokemons();
    } else {
        getPokemon(value);
    }
})

const main_types = Object.keys(colors);

function fetchPokemons() {
    for (let i = 1; i <= pokemonCount; i++){
        getPokemon(i);
    }
}

async function getPokemon(i) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const data = await fetch(url);
        const res = await data.json();
        createPokemonCard(res);
    } catch (err) {
        createErrorCard();
    }
}

function createPokemonCard(pokemon) {
    const div = document.createElement('div');
    div.classList.add('card');

    const id = pokemon.id.toString().padStart(3, '0');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const weight = pokemon.weight;
    const height = pokemon.height;
    const pokemon_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => pokemon_types.indexOf(type) > -1);

    div.style.backgroundColor = `${colors[type]}`;

    div.innerHTML = `
        <div class="img-container" style="background: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png') no-repeat center/cover">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <span class="type">${type[0].toUpperCase() + type.slice(1)}</span><br>
                <span class="height">${height} m</span>
                <span class="weight">${weight} kg</span>
            </div>
    `;

    container.appendChild(div);
}

function createErrorCard() {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerText = 'No Pokemon Card Found!';
    container.appendChild(div);
}

fetchPokemons();
