import { getPlaces } from './modules/data.js';

function renderCities() {
    // Get the element for rendering the city
    const cities = document.getElementById('cities');

    // Clear list
    cities.innerHTML = '';

    // Populate
    getPlaces().forEach((place) => {
        const city = document.createElement('li');
        city.innerText = place.name;
        cities.appendChild(city);
    });
}

renderCities();