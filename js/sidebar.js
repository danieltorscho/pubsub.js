import { getPlaces, subscribe } from './modules/data.js';

function renderCities(placesArray) {
    // Get the element for rendering the city
    const cities = document.getElementById('cities');

    // Clear list
    cities.innerHTML = '';

    // Populate
    placesArray.forEach((place) => {
        const city = document.createElement('li');
        city.innerText = place.name;
        cities.appendChild(city);
    });
}

renderCities(getPlaces());

// Pub/Sub Pattern (subscriber)
subscribe(renderCities);