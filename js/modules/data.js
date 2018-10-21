// Obtain your access token from https://www.mapbox.com/account/
const accessToken = 'pk.eyJ1IjoiZGFuaWVsdG9yc2NobyIsImEiOiJjam5la2gzNmowaHY5M2tvNHhkZzI5eWl3In0.NP2gjp6xoCu-EMj3joie0A';
let myPlaces = [];

let changeListener = [];

// Pub/Sub Pattern (Publisher)
export function subscribe(callbackFunction) {
    changeListener.push(callbackFunction);
}

function publish(data) {
    changeListener.forEach((changeListener) => {
        changeListener(data);
    })
}

export function addPlace(position) {
    return fetch(geocoding(position).href)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        try {
            // Extract the city name
            let city = locate(data.address);

            // Add new data into the collection
            myPlaces.push({ position: position, name: city });

            publish(myPlaces);

            // Synchronize localstorage with new data
            localStorage.setItem('myPlaces', JSON.stringify(myPlaces));

        } catch (error) {
            // No city found
            console.log('No city found in this location.');
        }
    });
    
}

// Return the list of places
export function getPlaces() {
    return myPlaces;
}

// Return the accessToken key
export {accessToken};

// Build up a collection in LocalStorage
function initLocalStorage() {
    const placesFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
    if (Array.isArray(placesFromLocalStorage)) {
        myPlaces = placesFromLocalStorage;
        //publish();
    }
}

// Returns a correctly formated geocoding URL
function geocoding(position) {
    const url = new URL('https://nominatim.openstreetmap.org/reverse');
    const params = {
        format: 'jsonv2',
        lat: position.lat,
        lon: position.lng
    }

    // Add params to the url
    url.search = new URLSearchParams(params);

    return url;
}

// Resolve the address value
function locate(a) {
    if (a.city) {
        return a.city;
    } else if (a.suburb) {
        return a.suburb;
    } else if (a.village) {
        return a.village;
    } else if (a.state) {
        return a.state;
    } else {
        return a.country;
    }
}



// Initializations
initLocalStorage();
