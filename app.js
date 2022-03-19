import { apiKey } from './apikey.js';
 

document.addEventListener('DOMContentLoaded', () => {
    const ip = document.querySelector('.ip');
    const place = document.querySelector('.place');
    const time = document.querySelector('.time');
    const internet = document.querySelector('.internet');
    const input = document.querySelector('#search');
    const searchBtn = document.querySelector('.search-btn');
    let ipAdress = "";
    getData();

    searchBtn.addEventListener('click', () => {
        ipAdress = input.value;
        getData();
        input.value = "";
    });


    function getData() {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAdress}`).then(res => res.json()).then(data => {
            ip.textContent = data.ip
            place.textContent = data.location.region
            time.textContent = data.location.timezone
            internet.textContent = data.isp
        });
    };

    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

    
});

// make so that they can search up domain names as well, add map