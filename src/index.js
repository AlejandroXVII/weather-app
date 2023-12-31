import "./style.css";

function showWeatherDOM(weatherData) {
  let $localName = document.getElementById("location-name");
  let $currentLastUpdate = document.getElementById("current-last-updated");
  let $currentTempCF = document.getElementById("current-temp-c-f");
  let $currentConditionText = document.getElementById("current-condition-text");
  let $currentFeelsLikeCF = document.getElementById("current-feels-like-c-f");
  let $currentHumidity = document.getElementById("current-humidity");

  let name = weatherData.location.name;
  let lastUpdate = weatherData.current.last_updated;
  let tempC = weatherData.current.temp_c + "°";
  let tempF = weatherData.current.temp_f + "°";
  let conditionText = weatherData.current.condition.text;
  let feelsLikeC = "Feel like: " + weatherData.current.feelslike_c + "C";
  let feelsLikeF = "Feel like: " + weatherData.current.feelslike_f + "F";
  let humidity = "Humidity: " + weatherData.current.humidity;

  $localName.textContent = name;
  $currentLastUpdate.textContent = lastUpdate;
  $currentConditionText.textContent = conditionText;
  $currentHumidity.textContent = humidity;

  const changeCelFar = () => {
    if ($slider.checked) {
      $currentTempCF.textContent = tempF;
      $currentFeelsLikeCF.textContent = feelsLikeF;
    } else {
      $currentTempCF.textContent = tempC;
      $currentFeelsLikeCF.textContent = feelsLikeC;
    }
  };
  const $slider = document.querySelector("#slider-input");
  $slider.addEventListener("click", changeCelFar);
  $slider.checked = "true";
  if ($slider.checked) {
    $currentTempCF.textContent = tempF;
    $currentFeelsLikeCF.textContent = feelsLikeF;
  }
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
