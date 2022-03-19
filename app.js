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

    // map 

    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>')
        .openPopup();
    
    // var leadletIcon = L.icon({
    //     iconUrl: '/images/icon-location.svg'

    // });
    
    
});

// make so that they can search up domain names as well, add map