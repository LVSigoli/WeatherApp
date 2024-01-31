const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const error404 = document.querySelector(".not-found");
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box ");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const search = document.querySelector(".search-box button");
const weatherImage = document.querySelector(".weather-box img");
const weatherDetails = document.querySelector(".weather-details ");

function handle404(code) {
  if (code === "404") {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    return true;
  }
  error404.style.display = "none";
  error404.classList.add("remove");
  return false;
}

function handleChoseImage(weather, weatherImage) {
  switch (weather) {
    case "Clear":
      weatherImage.src = "../public/images/clear.png";
      break;
    case "Rain":
      weatherImage.src = "../public/images/rain.png";
      break;
    case "Clouds":
      weatherImage.src = "../public/images/cloud.png";
      break;
    case "Mist":
      weatherImage.src = "../public/images/mist.png";
      break;
    case "Snow":
      weatherImage.src = "../public/images/snow.png";
      break;
  }
}

function setContent(data) {
  temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span> `;
  description.innerHTML = `${data.weather[0].description}`;
  humidity.innerHTML = `${data.main.humidity}%`;
  wind.innerHTML = `${parseInt(data.wind.speed)}km/h`;
}

search.addEventListener("click", () => {
  const APIkey = "23cd2c043cbc019a788ce4e129ebb683";
  const city = document.querySelector(".search-box input").value;
  if ((city === "") | undefined) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIkey}`)
    .then((response) => response.json())
    .then((json) => {
      if (handle404(json.cod)) {
        return;
      }
      handleChoseImage(json.weather[0].main, weatherImage);
      setContent(json);

      weatherBox.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.style.display = "";
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
