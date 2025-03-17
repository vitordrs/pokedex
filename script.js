const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const pokemonType = document.querySelector('#type');
const pokemonType2 = document.querySelector('#type2');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnInicio = document.querySelector('.random');
let searchPokemon = 1;
let holdTimeOut;

const typeColorMap = {
    'bug' : '#98FB98',
    'grass': '#008000',
    'fairy' : '#FF69B4',
    'normal' : '#708090',
    'dragon' : '#000080',
    'psychic' : '#FF00FF',
    'ghost' : '#4B0082',
    'ground': '#8B4513',
    'steel': '#4682B4',
    'fire' : '#FF8C00',
    'flying' : '#9370DB',
    'ice' : '#00FFFF',
    'electric' : '#FFD700',
    'rock' : '#D2B48C',
    'dark' : '#363636',
    'water' : '#00BFFF',
    'fighting' : '#C03028',
    'poison' :  '#8A2BE2'
};


const fetchpokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200) {
        const data  = await APIResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Procurando...";
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonType2.innerHTML = '';
    const data = await fetchpokemon(pokemon);
    if(data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        // pokemonType.innerHTML = data['types']['0']['type']['name'];
        // pokemonType2.innerHTML = data['types']['1']['type']['name'];
        
        const type1 = data.types[0].type.name;
        pokemonType.innerHTML = type1;
        pokemonType.style.color = typeColorMap[type1];
        if (data.types.length > 1){
            const type2 = data.types[1].type.name;
            pokemonType2.innerHTML = type2;
            pokemonType2.style.color = typeColorMap[type2];
        } else {
            pokemonType2.innerHTML = type1;
            pokemonType2.style.color = typeColorMap[type1]
        }
        input.value = '';
        searchPokemon = data.id
            } else {
                pokemonImg.style.display = 'none';
                pokemonName.innerHTML = "Not found";
                pokemonNumber.innerHTML = '';
                input.value = '';
            }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', ()=> {
    if(searchPokemon >1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', ()=> {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

btnInicio.addEventListener('click', () => {
    searchPokemon = Math.floor(Math.random() * 1000) + 1;
    renderPokemon(searchPokemon)
});


renderPokemon(searchPokemon)