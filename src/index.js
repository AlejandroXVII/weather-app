import "./style.css";

function showWeatherDOM(weatherData) {
  const $localName = document.getElementById("location-name");
  const $currentLastUpdate = document.getElementById("current-last-updated");
  const $currentTempCF = document.getElementById("current-temp-c-f");
  const $currentConditionText = document.getElementById(
    "current-condition-text",
  );
  const $currentFeelsLikeCF = document.getElementById("current-feels-like-c-f");
  const $currentHumidity = document.getElementById("current-humidity");
  const $currentConditionIcon = document.getElementById(
    "current-condition-icon",
  );

  let name = weatherData.location.name;
  let lastUpdate = weatherData.current.last_updated;
  let tempC = weatherData.current.temp_c;
  let tempF = weatherData.current.temp_f;
  let conditionText = weatherData.current.condition.text;
  let feelsLikeC = weatherData.current.feelslike_c;
  let feelsLikeF = weatherData.current.feelslike_f;
  let humidity = weatherData.current.humidity;
  let conditionIcon = weatherData.current.condition.icon;

  $localName.textContent = name;
  $currentLastUpdate.textContent = lastUpdate;
  $currentTempCF.textContent = tempC + "°";
  $currentConditionText.textContent = conditionText;
  $currentFeelsLikeCF.textContent = "Feel like: " + feelsLikeC;
  $currentHumidity.textContent = "Humidity: " + humidity;
  $currentConditionIcon.src = "https:" + conditionIcon;

  console.log(weatherData);
}

async function getWeather(city) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=060638c0bbb840d6a3204922233012&q=" +
      city,
    { mode: "cors" },
  );
  const weatherData = await response.json();
  showWeatherDOM(weatherData);
}

const $searchInput = document.querySelector("#search");
const $searchButton = document.querySelector("#search-bar>svg");
const $weatherContainer = document.querySelector("#weather-container");

$searchButton.addEventListener("click", searchCity);

function searchCity() {
  $weatherContainer.style.display = "grid";
  getWeather($searchInput.value);
}
