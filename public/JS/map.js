mapboxgl.accessToken = mapToken;

const centerCoordinates = mapListings?.coordinates ?? [77.1025, 28.7041];

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: centerCoordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

    // Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color: 'red'})
.setLngLat(mapListings.coordinates)        //we use here coordinates saved in geometry in listing schema.
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${titleListings.title}</h4><p>Exact location provided after booking!</p>`))
.addTo(map);