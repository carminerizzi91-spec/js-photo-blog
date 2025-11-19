const API_URL = "https://lanciweb.github.io/demo/api/pictures/";
const boardContainer = document.querySelector(".board");



// Funzione Chiamata axios

function loadPhoto() {
    axios
        .get(API_URL)
        .then(response => {
            const photo = response.data;
            let galleryHTML = '<div class="row g-4 justify-content-center">';

            photo.forEach(function (photo) {
                galleryHTML += createCardHtml(photo);
            });

            galleryHTML += '</div>';

            boardContainer.innerHTML = galleryHTML;

            addRotationListeners();
        })
}

// Funzione che genera il codice HTML di una singola colonna con la card.
function createCardHtml(photo) {
    return `
        <div class="col-12 col-md-4 col-lg-3 mb-5">
            <div class="card-polaroid rotatable-card">
                <div class="pin"></div>
                <div class="photo">
                    <img src="${photo.url}" alt="${photo.title}" class="img-fluid" style="border-radius: 4px; aspect-ratio: 1 / 1; object-fit: cover;">
                </div>
                <p class="caption">
                    <strong>${photo.title}</strong>
                    <br>
                    <small class="text-muted">${photo.date}</small>
                    <br>
                    Scopri di più!
                </p>
            </div>
        </div>
    `;
}

// Funzione per far ruotare la card

function addRotationListeners() {
    const cards = document.querySelectorAll('.rotatable-card');

    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease-out';

        card.addEventListener('click', function () {
            let rotationState = this.dataset.rotationState;

            const randomAngle = (Math.random() * 20 - 10).toFixed(1);
            this.style.transform = `rotate(${randomAngle}deg)`;
        });
    });
}

loadPhoto();