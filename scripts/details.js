const { events } = data;

const queryString = location.search;
const param = new URLSearchParams(queryString);
const eventFound = events.find(evento => evento._id == param.get('evento'));

document.getElementById('main-container2').innerHTML =
    `<div class="detail-card d-flex flex-column flex-lg-row justify-content-center justify-content-lg-center align-items-center 
            gap-md-5">
        <div class="col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-5 detail-img-container border border-dark border-2">
            <img src="${eventFound.image}" alt="${eventFound.name}">
        </div>
        <div class="col-10 col-sm-6 col-md-6 col-lg-5 col-xl-5 col-xxl-5 d-flex detail-text-container flex-column 
                border border-dark border-2 justify-content-center align-items-center fs-4 fs-xl-4 p-3">
            <p class="fs-2"><b>${eventFound.name}</b></p>
            <ul class="fs-5">
                <li><b>Date:</b> ${eventFound.date}</li>
                <li>
                    <b>Description:</b> ${eventFound.description}
                </li>
                <li><b>Category:</b> ${eventFound.category}</li>
                <li><b>Place:</b> ${eventFound.place}</li>
                <li><b>Capacity:</b> ${eventFound.capacity}</li>
                <li><b>Assistance:</b> ${eventFound.assistance}</li>
                <li><b>Price:</b> $${eventFound.price}</li>
            </ul>
        </div>
    </div>
    <div class="fs-4"><a href="${document.referrer}">Volver</a></div>`