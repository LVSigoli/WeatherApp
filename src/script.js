const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box ");
const weatherDetails = document.querySelector(".weather-details ");
const error404 = document.querySelector(".not-found");

function handle404(code) {
  if (code === "404") {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    return true;
  }
  return false;
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
      error404.style.display = "none";
      error404.classList.add("remove");
      const weatherImage = document.querySelector(".weather-box img");

      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");

      switch (json.weather[0].main) {
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

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span> `;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

      weatherBox.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.style.display = "";
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
