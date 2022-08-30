const boxPelicula = document.querySelector('#box-pelicula');
const title =  document.querySelector('#title');
const genres =  document.querySelector('#genres');
const year =  document.querySelector('#year');
const cast =  document.querySelector('#cast');
const movies = JSON.parse(file).results;

const pelicula = {
    titulo : "",
    year : "",
    reparto : "",
    genero : ""
}

document.addEventListener('DOMContentLoaded', () => {
    MostrarHTML(movies);
});


function MostrarHTML(movies){
    LimpiarPeliculas();

    movies.forEach(movie => {
       
        const cardPelicula =  document.createElement('div');
        cardPelicula.classList.add('card', 'mt-3');
        cardPelicula.style.width =  '18rem';
        cardPelicula.innerHTML = 
        `
            <div class="card-body justify-content-center">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text"><b>Año: </b>${movie.year}</p>
            <p class="card-text"><b>Reparto: </b>${movie.cast.length != 0 ? movie.cast.join(", ") : "N/A"}</p>
            <p class="card-text"><b>Genero: </b>${movie.genres.length != 0 ? movie.genres.join(", "): "N/A"}</p>
            </div>
        `;

        boxPelicula.appendChild(cardPelicula);
    });
};


function BuscarPelicula() {
    pelicula.titulo = title.value;
    pelicula.genero = genres.value;
    pelicula.year = year.value;
    pelicula.reparto = cast.value;

    FiltrarPelicula();
    LimpiarCampos();
};

function FiltrarPelicula(){
    const resultado = movies.filter(FilterTitle).filter(FilterYear).filter(FilterCast).filter(Filtergenres);

    if (resultado.length >= 1) {
        MostrarHTML(resultado);
    }else{
        sinResultados();
    }  
};

function FilterTitle(movie){
    return pelicula.titulo ?  movie.title == pelicula.titulo : movies;
};

function FilterYear(movie){
    return pelicula.year ?  movie.year == pelicula.year : movies;
};

function FilterCast(movie){
    return pelicula.reparto ? movie.cast.includes(pelicula.reparto) : movies;
};

function Filtergenres(movie){
    return pelicula.genero ? movie.genres.includes(pelicula.genero) : movies;
};



function LimpiarPeliculas(){
    while(boxPelicula.firstChild){
        boxPelicula.firstChild.remove();
    }
};

function sinResultados(){
    LimpiarPeliculas();
    const alertSearch = document.createElement('div');
    alertSearch.classList.add('alert', 'alert-danger', 'fs-2', 'w-100', 'mt-5', 'd-flex', 'justify-content-center');
    alertSearch.textContent = 'No se encontro ningun resultado para la busqueda';

    boxPelicula.appendChild(alertSearch);
};

function LimpiarCampos(){
    title.value = "";
    genres.value = "";
    year.value = "";
    cast.value = "";
}