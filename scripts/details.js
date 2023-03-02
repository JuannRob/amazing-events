import data from "../data/data.js";
const { events } = data;

const querystring = window.location.search;
const params = new URLSearchParams(querystring);
const eventFound = events.find(evento => evento._id == params.get('evento'));

document.getElementById('detail-container').innerHTML =
    `<div
    class="detail-card d-flex flex-column flex-lg-row justify-content-center justify-content-lg-center align-items-center gap-5 border border-dark border-1">
    <div
        class="col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-5 detail-img-container border border-dark border-1">
        <img src="${eventFound.image}" alt="${eventFound.name}">
    </div>
    <div class="col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-5 d-flex detail-text-container flex-column 
            border border-dark border-2 justify-content-center align-items-center fs-4 p-3">
        <h5 class="fs-2">${eventFound.name}</h5>
        <ul class="fs-5">
            <li><b>Date:</b> ${eventFound.date}</li>
            <li>
                <b>Description:</b> ${eventFound.description}
            </li>
            <li><b>Category:</b> ${eventFound.category}</li>
            <li><b>Place:</b> ${eventFound.place}</li>
            <li><b>Capacity:</b> ${eventFound.capacity}</li>
            <li><b>Assistance:</b> ${eventFound.assistance}</li>
            <li><b>Price:</b> ${eventFound.price}</li>
        </ul>
    </div>
</div>`

