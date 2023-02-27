import data from "../data/data.js";

const pastEvents = data.events.filter(evento => evento.date < data.currentDate);

const eventsMap = pastEvents.map((evento) =>
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
                <a href="./details.html" class="col-4 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-6 
                        see-more text-center text-reset text-decoration-none px-0 px-sm-4 px-md-0 pb-1">ver más...</a>
            </div>
        </div>
    </div>`
).join('');

document.getElementById('cards-row').innerHTML = eventsMap;