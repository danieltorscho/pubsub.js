import { addPlace, getPlaces, accessToken } from './modules/data.js';
let map;

function init() {

    // If user's geolocation acquired
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            
            // Initialize and center the map
            map = L.map('map', {
                center: [
                    position.coords.latitude,
                    position.coords.longitude
                ],
                zoom: 13
            });

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: accessToken
            }).addTo(map);

            map.on('click', addMarker);

            renderMarkers();
        });
    }
    
}

function addMarker(event) {

    // Add place logic
    addPlace(event.latlng);

    // Show new marker on map
    L.marker(event.latlng).addTo(map)
}

function renderMarkers() {
    // Place markers on map
    getPlaces().forEach((place) => {
        // Place marker on map
        L.marker(place.position).addTo(map);
    });
}

// Initialize the script
init();