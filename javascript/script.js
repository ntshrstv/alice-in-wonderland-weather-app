function formatDate(currentDate) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function formatTime(currentTime) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDate = new Date();

let date = document.querySelector("#date");

date.innerHTML = formatDate(currentDate);

let time = document.querySelector("#time");

time.innerHTML = formatTime(currentDate);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class='row'>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   
          <div class="col-2">
            <div class="day">${formatDay(forecastDay.dt)}</div>
            
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width='50'>
              <div class="weather-forecast-temperatures">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
              </div>

          </div>
       
  
  
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  units = "imperial";
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city-state").innerHTML = response.data.name;

  document
    .querySelector("#main-temp-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#main-temp-icon")
    .setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#main-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";

  let apiKey = "fdfabe036c67be1d93b704e0226c85d2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let form = document.querySelector("#location-search-form");

form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");

currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
