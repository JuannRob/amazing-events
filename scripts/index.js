import data from "../data/data.js";
const { events } = data;

//----------CARDS DINÁMICAS----------

//Dado un array de objetos. Mapea cada item en una card y al finalizar renderiza el conjunto.
const renderCards = (objArray) => {
    let results = '';

    if (objArray.length > 0) {
        results = objArray.map((evento) =>
            `<div class="col-11 col-sm-5 col-xl-3 col-xxl-2">
        <div class="card border border-dark rounded-0 p-2" key=${evento._id}>
            <img src="${evento.image}" class="card-img-top rounded-0" alt="${evento.name}">
            <div class="card-body">
                <h5 class="card-title text-center fs-5">${evento.name}</h5>
                <p class="text-center">${evento.category}</p>
                <ul class="card-text h-75 d-flex flex-column justify-content-center">
                <li>Date: <b>${evento.date}</b></li>
                <li>Location: <b>${evento.place}</b></li>
                </ul>
            </div>
            <div class="card-footer row flex-column flex-md-row align-items-center gy-3 border-0 bg-transparent d-flex justify-content-around 
                        justify-content-sm-between justify-content-lg-around justify-content-xxl-between">
                <p class="col-6 col-md-5 col-lg-4 col-xl-5 col-xxl-5 align-baseline text-center">Price $${evento.price}</p>
                <a href="/details.html?evento=${evento._id}" class="col-4 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-6 
                        see-more text-center text-reset text-decoration-none px-0 px-sm-4 px-md-0 pb-1">Ver más...</a>
            </div>
        </div>
    </div>`
        ).join('');
    } else {
        results = '<div class="col-12 text-center py-5"><p class="fs-4">No se encontraron resultados.</p> <p class="fs-5">Prueba cambiando los filtros.</p></div>'
    }

    document.getElementById('cards-row').innerHTML = results;
}

//Inicializa la página con todos los eventos
renderCards(events);

//----------CATEGORIAS DINAMICAS----------

//Guarda las categorias en un array omitiendo las repetidas
let catArr = [];
events.forEach(evento => {
    if (!catArr.includes(evento.category)) catArr.push(evento.category)
});

//Convierte las categorias en inputs de tipo checkbox
const categoriesMap = catArr.map((category, i) =>
    `<div class="form-check mx-2 mx-md-0 mx-lg-2" id="category-${i}">
        <input class="form-check-input" type="checkbox" value="${category}" id="input${i}">
        <label class="form-check-label" for="input${i}">
        ${category}
        </label>
    </div>`
).join('');

//Inserta todas las categorias como columnas dentro de un row
document.getElementById('categories').innerHTML = categoriesMap;


//----------FILTROS COMBINADOS----------
let filters = {
    'searchStr': '',
    'categoriesArr': []
}

// const filterEvents = () => {
//     const { searchRes, catRes } = filters;
//     console.log('largo del search: ', searchRes.length, 'largo de cats: ', catRes.length);

//     if (searchRes.length === 0 && catRes.length === events.length) {
//         renderCards([]);
//     } else if (searchRes.length > 0 && catRes.length === events.length) {
//         renderCards(searchRes);
//     } else if (catRes.length < events.length && searchRes.length === 0) {
//         renderCards(catRes);
//     } else if (catRes.length < events.length && searchRes.length > 0) {
//         const combinedRes = catRes.filter(eventByCat => searchRes.includes(eventByCat))
//         renderCards(combinedRes);
//     }
// }


//----------BUSQUEDA DE NOMBRE----------
const searchBtn = document.getElementById('search-button');
const inputSearch = document.getElementById('input-search');

// const search = (arr = events) => {
//     const cardsResult = arr.filter(evento => evento.name.toLowerCase().includes(inputSearch.value.toLowerCase()) || evento.description.toLowerCase().includes(inputSearch.value.toLowerCase()));
//     if (cardsResult.length > 0) {
//         filters.searchRes = cardsResult;
//     } else {
//         filters.searchRes = [];
//     };
//     console.log(filters);
//     filterEvents();
// }



//---LISTENERS BUSCADOR----

//Si se presiona la tecla Enter y encuentra un string en input cambia el valor de búsqueda
inputSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && inputSearch.value !== '') {
        e.preventDefault();
        filters.searchStr = inputSearch.value
        console.log('searchStr: ', filters.searchStr);
    } else if (e.key === "Enter" && inputSearch.value === '') {
        e.preventDefault();
    }
});

//Al presionar buscar cambia el valor de búsqueda
searchBtn.addEventListener("click", () => {
    filters.searchStr = inputSearch.value
    console.log('searchStr: ', filters.searchStr);
})



//----------FILTRAR POR CATEGORIA----------
const catInputs = document.querySelectorAll('.form-check-input');
const filteredCards = [];
// catInputs.forEach(cat => {
//     cat.onchange = () => {
//         events.forEach(evento => {
//             if (cat.value === evento.category && !filteredCards.includes(evento)) {
//                 filteredCards.push(evento);
//             } else if (cat.value === evento.category && filteredCards.includes(evento)) {
//                 const eventIndex = filteredCards.findIndex(evnt => cat.value === evnt.category);
//                 filteredCards.splice(eventIndex, 1);
//             }
//         });

//         if (filteredCards.length > 0 && filteredCards.length < events.length) {
//             filters.catRes = filteredCards;
//         } else if (filteredCards.length === events.length || filteredCards.length === 0) {
//             filters.catRes = events;
//         }
//         console.log(filters);
//         filterEvents();
//     }
// })