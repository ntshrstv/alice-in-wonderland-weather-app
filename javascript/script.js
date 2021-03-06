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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function formatTime(currentTime) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let amPM = "AM PM";

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours === 24) {
    hours = 12;
    amPM = "AM";
  } else if (hours === 12) {
    hours = 12;
    amPM = "PM";
  } else if (hours < 12) {
    amPM = "AM";
  } else {
    hours = hours - 12;
    amPM = "PM";
  }

  return `${hours}:${minutes} ${amPM}`;
}

let currentDate = new Date();

let date = document.querySelector("#date");

date.innerHTML = formatDate(currentDate);

let time = document.querySelector("#time");

time.innerHTML = formatTime(currentDate);

let animatedIcons = {
  "01d": "images/animated/clear-day.svg",
  "01n": "images/animated/clear-night.svg",
  "02d": "images/animated/partly-cloudy-day.svg",
  "02n": "images/animated/partly-cloudy-night.svg",
  "03d": "images/animated/cloudy.svg",
  "03n": "images/animated/cloudy.svg",
  "04d": "images/animated/overcast-day.svg",
  "04n": "images/animated/overcast-night.svg",
  "09d": "images/animated/rain.svg",
  "09n": "images/animated/rain.svg",
  "10d": "images/animated/partly-cloudy-day-rain.svg",
  "10n": "images/animated/partly-cloudy-night-rain.svg",
  "11d": "images/animated/thunderstorms-day.svg",
  "11n": "images/animated/thunderstorms-night.svg",
  "13d": "images/animated/snow.svg",
  "13n": "images/animated/snow.svg",
  "50d": "images/animated/mist.svg",
  "50n": "images/animated/mist.svg",
};

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
            
               <img src="${
                 animatedIcons[forecastDay.weather[0].icon]
               }" alt="weather-icon" width="100" />

              <div class='daily-description'>${
                forecastDay.weather[0].description
              }</div>

               <div class="weather-forecast-temperatures">
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}??</span>
              <span class="forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}??</span>
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
  document.querySelector("#city").innerHTML = response.data.name + ",";
  document.querySelector("#country").innerHTML = response.data.sys.country;

  document
    .querySelector("#main-temp-icon")
    .setAttribute("src", animatedIcons[response.data.weather[0].icon]);

  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#main-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 2.237
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let wonderlandImage = document.querySelector("#wonderland-image");

  if (
    response.data.weather[0].description === "thunderstorm" ||
    response.data.weather[0].description === "thunderstorm with light rain" ||
    response.data.weather[0].description === "thunderstorm with rain" ||
    response.data.weather[0].description === "thunderstorm with heavy rain" ||
    response.data.weather[0].description === "light thunderstorm" ||
    response.data.weather[0].description === "heavy thunderstorm" ||
    response.data.weather[0].description === "ragged thunderstorm" ||
    response.data.weather[0].description ===
      "thunderstorm with light drizzle" ||
    response.data.weather[0].description === "thunderstorm with drizzle" ||
    response.data.weather[0].description === "thunderstorm with heavy drizzle"
  ) {
    wonderlandImage.setAttribute(
      "src",
      "images/oraculum/alice-jabberwocky.jpg"
    );
    wonderlandImage.setAttribute("alt", "Alice fighting the Jabberwocky");
  } else if (
    response.data.weather[0].description === "drizzle" ||
    response.data.weather[0].description === "light intensity drizzle" ||
    response.data.weather[0].description === "heavy intensity drizzle" ||
    response.data.weather[0].description === "light intensity drizzle rain" ||
    response.data.weather[0].description === "drizzle rain" ||
    response.data.weather[0].description === "heavy intensity drizzle rain" ||
    response.data.weather[0].description === "shower rain and drizzle" ||
    response.data.weather[0].description === "heavy shower rain and drizzle" ||
    response.data.weather[0].description === "shower drizzle"
  ) {
    wonderlandImage.setAttribute("src", "images/oraculum/mad-march.jpg");
    wonderlandImage.setAttribute("alt", "Mad March");
  } else if (
    response.data.weather[0].description === "rain" ||
    response.data.weather[0].description === "light rain" ||
    response.data.weather[0].description === "moderate rain" ||
    response.data.weather[0].description === "heavy intensity rain" ||
    response.data.weather[0].description === "very heavy rain" ||
    response.data.weather[0].description === "extreme rain" ||
    response.data.weather[0].description === "freezing rain" ||
    response.data.weather[0].description === "light intensity shower rain" ||
    response.data.weather[0].description === "shower rain" ||
    response.data.weather[0].description === "heavy intensity shower rain" ||
    response.data.weather[0].description === "ragged shower rain"
  ) {
    wonderlandImage.setAttribute("src", "images/oraculum/cheshire.jpg");
    wonderlandImage.setAttribute("alt", "Cheshire");
  } else if (
    response.data.weather[0].description === "snow" ||
    response.data.weather[0].description === "light snow" ||
    response.data.weather[0].description === "heavy snow" ||
    response.data.weather[0].description === "sleet" ||
    response.data.weather[0].description === "light shower sleet" ||
    response.data.weather[0].description === "shower sleet" ||
    response.data.weather[0].description === "light rain and snow" ||
    response.data.weather[0].description === "rain and snow" ||
    response.data.weather[0].description === "light shower snow" ||
    response.data.weather[0].description === "shower snow" ||
    response.data.weather[0].description === "heavy shower snow"
  ) {
    wonderlandImage.setAttribute(
      "src",
      "images/oraculum/mad-hatter-dormouse.jpg"
    );
    wonderlandImage.setAttribute("alt", "Mad Hatter and Dormouse");
  } else if (
    response.data.weather[0].description === "few clouds" ||
    response.data.weather[0].description === "scattered clouds" ||
    response.data.weather[0].description === "broken clouds" ||
    response.data.weather[0].description === "overcast clouds"
  ) {
    wonderlandImage.setAttribute(
      "src",
      "images/oraculum/tweedledee-and-tweedledum.jpg"
    );
    wonderlandImage.setAttribute("alt", "Tweedledee and Tweedledum");
  } else {
    wonderlandImage.setAttribute("src", "images/oraculum/alice-oraculum.jpg");
    wonderlandImage.setAttribute("alt", "Alice after battle with Jabberwocky");
  }

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
