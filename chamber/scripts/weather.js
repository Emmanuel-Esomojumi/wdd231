// fetches and displays current weather + 3-day forecast for Lagos Island using OpenWeatherMap
const apiKey = "9b4e1177eba7decb739823a370f745b0";
const lat = 6.45;
const lon = 3.39;
const units = "metric";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

const tempEl = document.getElementById("weatherTemp");
const descEl = document.getElementById("weatherDesc");
const iconEl = document.getElementById("weatherIcon");
const forecastEl = document.getElementById("weatherForecast");

async function getCurrentWeather() {
  try {
    const response = await fetch(currentUrl);
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    descEl.textContent = "Weather data is unavailable right now.";
    console.error("Error fetching current weather:", error);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  tempEl.textContent = `${temp}\u00B0C`;
  descEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconEl.alt = description;
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    forecastEl.innerHTML = "<li>Forecast unavailable</li>";
    console.error("Error fetching forecast:", error);
  }
}

function displayForecast(list) {
  // the API returns a reading every 3 hours; take the ~midday entry for each of the next 3 days
  const today = new Date().toISOString().split("T")[0];
  const dailyReadings = list.filter(
    (reading) => reading.dt_txt.includes("12:00:00") && !reading.dt_txt.startsWith(today)
  );
  const nextThreeDays = dailyReadings.slice(0, 3);

  forecastEl.innerHTML = nextThreeDays
    .map((reading) => {
      const date = new Date(reading.dt_txt);
      const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(reading.main.temp);
      return `
        <li class="weather__forecast-day">
          <p class="weather__forecast-label">${dayLabel}</p>
          <p class="weather__forecast-temp">${temp}\u00B0C</p>
        </li>
      `;
    })
    .join("");
}

getCurrentWeather();
getForecast();