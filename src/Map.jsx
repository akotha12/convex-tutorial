import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function handlePayment() {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'http://localhost:8010/v3/check/digital',
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: '0d5fa59be2a7785a5ac5a4f6605b27e5:2aa10eb20520941bca2c4687e53b0bfd'
        },
        processData: false,
        data: '{"recipient":"justpaul@umich.edu","name":"Justin Paul","amount":5,"description":"Test Payment"}'
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

const StanfordMap = () => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const initializeMap = () => {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-122.1708, 37.4241],
                zoom: 13,
            });

            // Add markers for local businesses
            const localBusinesses = [
                {
                    name: 'Stanford Coffee',
                    location: [-122.1679, 37.4276],
                    product: 'Latte',
                    price: '$4.50',
                },
                {
                    name: "Hobee's",
                    location: [-122.1824, 37.4454],
                    product: 'Pancakes',
                    price: '$9.99',
                },
                // Add more local businesses here
            ];

            localBusinesses.forEach((business) => {
                const popupHtml = `
            <div class="popup-content">
            <h3>${business.name}</h3>
            <p><strong>Price:</strong> ${business.price}</p>
            <button>Buy now</button>
            </div>
        `;

                const marker = new mapboxgl.Marker()
                    .setLngLat(business.location)
                    .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
                    .addTo(map);

                // Add event listener to each marker
                marker.getElement().addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            });

            setMap(map);
        };

        if (!map) {
            initializeMap();
        } else {
            const handleClick = (event) => {
                // Check if any existing markers are within 300 meters of the clicked location
                const isNearbyMarker = markers.some((marker) => {
                    const { lng, lat } = marker.getLngLat();
                    const distance = marker.getLngLat().distance([event.lngLat.lng, event.lngLat.lat]);
                    return distance < 300;
                });

                if (!isNearbyMarker) {
                    // Add the new marker
                    const newMarker = new mapboxgl.Marker().setLngLat(event.lngLat).addTo(map);

                    const popupHtml = `
      <div class="popup-content">
        <h3><input type="text" placeholder="New Business" /></h3>
        <p><strong>Product:</strong> <input type="text" placeholder="Product name" /></p>
        <p><strong>Price:</strong> <input type="text" placeholder="Price" /></p>
        <button id="buy-now">Buy now</button>
      </div>
    `;

                    newMarker.setPopup(new mapboxgl.Popup().setHTML(popupHtml)).togglePopup();

                    setMarkers((markers) => [...markers, newMarker]);
                    // Find the button element and attach the event listener
                    const button = document.getElementById('buy-now');
                    button.addEventListener('click', handlePayment);
                }
            };


            map.on('click', handleClick);
        }
    }, [map, markers]);

    return <div id="map" style={{ height: '500px' }} />;
};

export default StanfordMap;
