/*
api key: bac9d5dd20e75e2f881e59badc75cc18
*/

function loadData(){
    const data = JSON.parse(localStorage.getItem("selectedCity"));
    const weatherDataDiv = document.getElementById("weatherData");

    let dataHTML = `<div>Temp: ${data.temp}F</div>`;
    dataHTML = dataHTML +  `<div>Humidity: ${data.humidity}</div>`;
    dataHTML = dataHTML + `<div> Uvi: ${data.uvi}`;
    dataHTML = dataHTML + `<div> Wind Speed: ${data.windSpeed}`;
    weatherDataDiv.innerHTML = dataHTML;
}

async function getWeatherData(){
    const cityName =  document.getElementById("cityname").value;
    let getLatUrl = "http://api.openweathermap.org/geo/1.0/direct";
    getLatUrl = getLatUrl + `?q=${cityName}`;
    getLatUrl = getLatUrl + "&appId=bac9d5dd20e75e2f881e59badc75cc18";

    const cityRes = await fetch(getLatUrl);
    const cityData = await cityRes.json();
    console.log('city Data: ', cityData);
    const lat = cityData[0].lat;
    const lon = cityData[0].lon;

    let apiURL = "https://api.openweathermap.org/data/2.5/onecall";
    apiURL += `?lat=${lat}&lon=${lon}&appid=bac9d5dd20e75e2f881e59badc75cc18`;
    apiURL += "&units=imperial";
    const weatherRes = await fetch(apiURL);
    const data = await weatherRes.json();
    
    const weatherInfo = {
        temp: data.current.temp,
        humidity: data.current.humidity,
        uvi: data.current.uvi,
        windSpeed: data.current.wind_speed
    };

    localStorage.setItem("selectedCity", JSON.stringify(weatherInfo));
    loadData();
}

loadData();