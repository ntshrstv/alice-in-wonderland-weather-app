//SheCodes+ Week 4 HW

//Part - 1: Date and current time

//Current Date - format: full month, day (#), full year

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

//Current Time = format: hours:minutes

function formatTime(currentTime) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//Part - 2: Change city (HW week: 4)
//Homework- Week: 5 - Search Engine

function displayWeatherCondition(response) {
  console.log(response);
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

//Part: 1

let currentDate = new Date();

let date = document.querySelector("#date");

date.innerHTML = formatDate(currentDate);

let time = document.querySelector("#time");

time.innerHTML = formatTime(currentDate);

//Part: 2

let form = document.querySelector("#location-search-form");

form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");

currentLocationButton.addEventListener("click", getCurrentLocation);

//Part - 3: fahrenheit and celsius change - no need for conversion

//Fahrenheit

function displayFahrenheitTemperature(click) {
  click.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//Celsius

function displayCelsiusTemperature(click) {
  click.preventDefault();
  let temperatureElement = document.querySelector("#main-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//Part: 3

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Homework- Week: 5 - Search Engine - Current Location

searchCity("New York");
