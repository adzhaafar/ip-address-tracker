import { apiKey } from './apikey.js';
 

document.addEventListener('DOMContentLoaded', () => {

    //selectors
    const ip = document.querySelector('.ip');
    const place = document.querySelector('.place');
    const time = document.querySelector('.time');
    const internet = document.querySelector('.internet');
    const input = document.querySelector('#search');
    const searchBtn = document.querySelector('.search-btn');
    let ipAdress = "";

    //user location & ip on first page load
    getData();

    //event listeners
    searchBtn.addEventListener('click', () => {
        ipAdress = input.value;
        getData();
        input.value = "";
    });


    //function to get info from apis
    function getData() {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAdress}`).then(res => res.json()).then(data => {
            ip.textContent = data.ip
            place.textContent = data.location.region
            time.textContent = data.location.timezone
            internet.textContent = data.isp
            getMap(data.location.lat, data.location.lng)
            // console.log(`[${data.location.lat}, ${data.location.lng}]`)
        });
    };

    // function to get map location based on lat & long
    function getMap(latitude, longtitude) { 
        var container = L.DomUtil.get('map');
        if(container != null){
            container._leaflet_id = null;
        }
        var map = L.map('map', {
            center: [latitude, longtitude],
            zoom: 15
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([latitude, longtitude]).addTo(map)
    };
});

// make so that they can search up domain names as well