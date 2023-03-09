const { events } = data;

//----------CARDS DINÁMICAS----------
/* Dado un array con eventos, mapea cada item en forma de card y al finalizar renderiza el conjunto.
Si el array está vacío pide al cliente que cambie los filtros. */
const renderCards = (objArray) => {
    let res = '';
    if (objArray.length > 0) {
        res = objArray.map((evento) =>
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
        res = '<div class="col-12 text-center py-5"><p class="fs-4">No se encontraron resultados.</p> <p class="fs-5">Prueba cambiando los filtros.</p></div>'
    }

    document.getElementById('cards-row').innerHTML = res;
}

//Inicializa la página con todos los eventos.
renderCards(events);

//----------CATEGORIAS DINAMICAS----------
//Guarda las categorias en un array omitiendo las repetidas.
let catArr = [];
events.forEach(evento => {
    if (!catArr.includes(evento.category)) catArr.push(evento.category);
});

//Convierte las categorias en inputs de tipo checkbox.
const categoriesMap = catArr.map((category, i) =>
    `<div class="form-check mx-2 mx-md-0 mx-lg-2" id="category-${i}">
        <input class="form-check-input" type="checkbox" value="${category}" id="input${i}">
        <label class="form-check-label" for="input${i}">
        ${category}
        </label>
    </div>`
).join('');

//Inserta todas las categorias como columnas dentro de un row.
document.getElementById('categories').innerHTML = categoriesMap;


//----------FILTROS COMBINADOS----------
//Este objeto contiene el string de búsqueda, las categorias para filtrar y los eventos resultados de dichos filtros.
let filters = {
    'searchStr': '',
    'selectedCategories': [],
    'filteredEvents': events //Por defecto contiene todos los eventos.
};
let { searchStr, selectedCategories, filteredEvents } = filters;

/*Función invocada con cualquier cambio en los filtros. Primero filtra por categoría, si las hay, luego por string de búsqueda, 
si se encuentra. */
const applyFilters = () => {
    if (selectedCategories.length > 0) {
        const res = events.filter(evento => selectedCategories.includes(evento.category))
        filteredEvents = res;
    } else {
        filteredEvents = events;
    }

    if (searchStr !== '') {
        const res = filteredEvents.filter(evento => evento.name.trim().toLowerCase().includes(searchStr.trim().toLowerCase()) || evento.description.trim().toLowerCase().includes(searchStr.trim().toLowerCase()));
        filteredEvents = res;
    }

    renderCards(filteredEvents);
}

//-----------LISTENERS-------------
const searchBtn = document.getElementById('search-button');
const inputSearch = document.getElementById('input-search');

//Si se presiona la tecla Enter y la búsqueda no es la actual, cambia el valor de búsqueda.
inputSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchStr !== inputSearch.value) {
        e.preventDefault();
        searchStr = inputSearch.value
        applyFilters();
    }
});

//Al presionar 'buscar' cambia el valor de búsqueda solo si la búsqueda no es la actual.
searchBtn.addEventListener("click", () => {
    if (searchStr !== inputSearch.value) {
        searchStr = inputSearch.value;
        applyFilters();
    }
})

//Contiene todos los inputs y labels.
const catContainer = document.getElementById('categories');

/* Recibe cualquier click en el area. Si es un checkbox y el valor del mismo no está ya entre los filtros
lo agrega, de lo contrario lo quita. */
catContainer.addEventListener('click', (e) => {
    const target = e.target
    if (target.type === "checkbox" && !selectedCategories.includes(target.value)) {
        selectedCategories.push(target.value);
        applyFilters();
    } else if (target.type === "checkbox" && selectedCategories.includes(target.value)) {
        const catIndex = selectedCategories.findIndex(cat => cat === target.value);
        selectedCategories.splice(catIndex, 1);
        applyFilters();
    }
})