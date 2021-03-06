import { apiKey } from './apikey.js';


document.addEventListener('DOMContentLoaded', () => {

    //selectors
    const ip = document.querySelector('.ip');
    const place = document.querySelector('.place');
    const time = document.querySelector('.time');
    const internet = document.querySelector('.internet');
    const input = document.querySelector('#search');
    const searchBtn = document.querySelector('.search-btn');
    let inputValue = "";

    // Regular expression to check if string is a IP address
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

    //user location & ip on first page load
    getData(inputValue);

    //event listeners
    searchBtn.addEventListener('click', getResult);
    // return on keyboard submits button 
    document.addEventListener('keydown', logKey);


    //main function triggered after clicking button 
    function getResult() {
        inputValue = input.value;
        getData(inputValue);
        input.value = "";
    }
    //function triggered by click on return button
    function logKey(event) {
        if (event.keyCode === 13) {
            getResult();
        };
    };


    //function to get info from apis
    function getData(input) {
        if (regexExp.test(input) === true || input === "") {
            let type = "&ipAddress="
            fetchData(input, type);
        } else {
            let type = "&domain="
            fetchData(input, type);
        }
    };

    //function that calls the fetch api depending on the input and type
    function fetchData(input, type) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${type}${input}`)
                .then(res => res.json())
                .then(data => {
                    ip.textContent = data.ip;
                    place.textContent = data.location.region;
                    time.textContent = data.location.timezone;
                    internet.textContent = data.isp;
                    getMap(data.location.lat, data.location.lng, data.location.city, data.location.country);
                });
    }
        


    // function to get map location based on lat & long
    function getMap(latitude, longtitude, city, country) { 
        //check if map is already initialized, if yes set it to null
        var container = L.DomUtil.get('map');
        if(container != null){
            container._leaflet_id = null;
        }
        //initialize map lat and long of user
        var map = L.map('map', {
            center: [latitude, longtitude],
            zoom: 15
        });
        //add a tile layer to map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        //add a marker on that location with a custom icon
        const locationIcon = L.icon({
            iconUrl: 'assets/icon-location.png', 

        });
        const marker = L.marker([latitude, longtitude], { icon: locationIcon }).addTo(map);

        var latlng = L.latLng(latitude, longtitude);
        //add a popup on the map with extra information
        var popup = L.popup()
        .setLatLng(latlng)
        .setContent(`<p>City: ${city} (${country})<br />Latitude: ${latitude} <br/> Longtitude: ${longtitude}</p>`)
        .openOn(map);
        
        
        
    };

    //change the value of placeholder so it doesnt overflow when screen resizes
    const placeholder = document.querySelector('#search');
    let placeValue = placeholder.getAttribute("placeholder")

    //selector
    window.addEventListener('resize', changePlaceholder);

    function changePlaceholder() {
        let width = document.body.clientWidth;
        if (width < 940) {
            placeValue = "Search IP";
            placeholder.setAttribute("placeholder", placeValue);
        };
    };

});

