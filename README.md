# ip-adress-tracker

# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)

## Overview

This is a project that allows users to search any valid ip adress or domain to get some information about their current place. This will give user the location, the timezone and the internet service provider associated with the ip adress/domain they looked up. There is also a map on the bottom of the page that will bring the icon to the exact location of the user and above the icon there is some information about the place (the city, latitude and longtitude).

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot
<!-- 
![Image of finished page](https://github.com/[adzhaafar]/[ip-address-tracker]/blob/[main]/screenshot%20ip%20address%20tracker.png?raw=true)

![image of finished page](ip-adress-tracker/screenshot%20ip%20address%20tracker.png) -->

![image](https://github.com/adzhaafar/ip-address-tracker/blob/main/assets/ip-pic.png)

### Links

- Solution URL: [https://adzhaafar.github.io/ip-address-tracker/] (GitHub pages) 

## My process

- Build the basic layout of the page

  - Place background-image, title and search bar
  - Create the information div and hardcode the values

- Make the search bar functional

  - Use fetch() for the IP Geolocation API (only with ip adress for now)

- Put the map on the page using the leaflet api ([LeafletJS](https://leafletjs.com/))

  - Initialize the map
  - Put tile from Open Street Maps
  - Add a marker and change its icon
  - Use the information from the ip geolocation api (latitide and longtitude) and set the icon on that location

- Create a functionality for the return button on keyboard
- Make it so users can search up domain names to get information
- Make page more responsive (media-queries)
- Create a popup with information (city, latitide/longtitude)
- Change placeholder of the input button through js when resizing the window (so the placeholder text is shorter)

### Built with

- Basic HTML5 markup
- CSS
- JavaScript
- Leaflet library
- IP Geolocation API by IPify

### What I learned

JavaScript:

- Basics of regular expressions
- Keydown events, keycodes for different buttons
- Import variables from external files
- setAttribute() and getAttribute()

APIs:

- What are api keys & how to use them
- How to use variables in the url of an api call
- Basics of Leaflet library

CSS:

- CSS positioning
- Working with responsive units (ems and rems)
- Using z-indices
- Responsive desing using flexbox and flex-direction
- Using justify-content, text-align
- Using media-queries

```css
/* media query for max width of 1000px */
@media (max-width: 1000px) {
  .container-info {
    flex-direction: column;
    top: 45%;
  }
  .solid {
    display: none;
  }
  .info-items {
    margin-right: 0;
    margin-bottom: 2em;
    justify-content: center;
  }
  .title {
    font-size: 1.5rem;
  }
}
```

```js
//function that calls the fetch api depending on the input and type
function fetchData(input, type) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${type}${input}`
  )
    .then((res) => res.json())
    .then((data) => {
      ip.textContent = data.ip;
      place.textContent = data.location.region;
      time.textContent = data.location.timezone;
      internet.textContent = data.isp;
      getMap(
        data.location.lat,
        data.location.lng,
        data.location.city,
        data.location.country
      );
    });
}
```

```js
// function to get map location based on lat & long
function getMap(latitude, longtitude, city, country) {
  //check if map is already initialized, if yes set it to null
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
  //initialize map lat and long of user
  var map = L.map("map", {
    center: [latitude, longtitude],
    zoom: 15,
  });
  //add a tile layer to map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  //add a marker on that location with a custom icon
  const locationIcon = L.icon({
    iconUrl: "assets/icon-location.png",
  });
  const marker = L.marker([latitude, longtitude], { icon: locationIcon }).addTo(
    map
  );

  var latlng = L.latLng(latitude, longtitude);
  //add a popup on the map with extra information
  var popup = L.popup()
    .setLatLng(latlng)
    .setContent(
      `<p>City: ${city} (${country})<br />Latitude: ${latitude} <br/> Longtitude: ${longtitude}</p>`
    )
    .openOn(map);
}
```

```js
// Regular expression to check if string is a IP address
const regexExp =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
```

### Useful resources

There are a lot of very useful resources I used but honestly I forgot to keep track of them, I will definitely do so for the next project
