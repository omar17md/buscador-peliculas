/************ Declaracion de Variables ************/

const boxPelicula = document.querySelector('#box-pelicula');
const menu = document.querySelector('#barra');
const title =  document.querySelector('#title');
const genres =  document.querySelector('#genres');
const year =  document.querySelector('#year');
const cast =  document.querySelector('#cast');
const btnReiniciar =  document.querySelector('#btnReiniciar');
const movies = JSON.parse(file).results;
let indexImg = 1;

const pelicula = {
    titulo : "",
    year : "",
    reparto : "",
    genero : ""
}


/************Eventos************/

document.addEventListener('DOMContentLoaded', () => {
    CargarGenres();
    MostrarHTML(movies);
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        BuscarPelicula();
    }
});

window.onload = function () {
    setInterval(change, 25000);
};



/************ Funciones ************/

function CargarGenres(){
    let generos = [];

    movies.forEach(movie => {

        movie.genres.forEach(genero => {
            if(!generos.includes(genero)){
                generos.push(genero);
            }
        });
    });


    generos.forEach(genero => {
        const opcionGenero =  document.createElement('option');
        opcionGenero.value = genero;
        opcionGenero.innerHTML = genero;
        genres.appendChild(opcionGenero);
    });
}

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
    
    if (pelicula.titulo != "" || pelicula.genero != "" ||
        pelicula.year != "" || pelicula.reparto != "") 
    {
        FiltrarPelicula();
        LimpiarCampos();
    }


};

function FiltrarPelicula(){
    const resultado = movies.filter(FilterTitle).filter(FilterYear).filter(FilterCast).filter(Filtergenres);

    if (resultado.length >= 1) {
        MostrarHTML(resultado);
    }else{
        sinResultados();
    }  

    btnReiniciar.style.visibility = "visible"; 
};

function FilterTitle(movie){
    return pelicula.titulo ?  movie.title.replace(/ /g, "").toLowerCase().includes(pelicula.titulo.replace(/ /g, "").toLowerCase())  : movies;
};

function FilterYear(movie){
    return pelicula.year ?  movie.year == pelicula.year : movies;
};

function FilterCast(movie){
    return pelicula.reparto ? 
    movie.cast.join("").replace(/ /g, "").toLowerCase().includes(pelicula.reparto.replace(/ /g, "").toLowerCase()) : movies;
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

function ReiniciarCampos(){
    LimpiarPeliculas();
    LimpiarCampos();
    MostrarHTML(movies);

    btnReiniciar.style.visibility = "hidden"; 
}

function change() {
    indexImg + 1 == 6 ? indexImg = 1 : indexImg++;
    menu.style.backgroundImage = `url(https://raw.githubusercontent.com/omar17md/buscador-peliculas/main/img/fondo${indexImg}.jpg)`;
 }

 function valideKey(evt){
    
    var code = (evt.which) ? evt.which : evt.keyCode;
    
    if(code==8) { 
      return true;
    } else if(code>=48 && code<=57) { 
      return true;
    } else{ 
      return false;
    }
}

