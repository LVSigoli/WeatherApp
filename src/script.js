const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box ");
const weatherDetails = document.querySelector(".weather-details ");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIkey = "23cd2c043cbc019a788ce4e129ebb683";
  const city = document.querySelector(".search-box input").value;
  if ((city = "")) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${APIkey}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        //criar function
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
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
          weatherImage.src = "../public/images/clear";
          break;
        case "Rain":
          weatherImage.src = "../public/images/rain";
          break;
        case "Clouds":
          weatherImage.src = "../public/images/cloud";
          break;
        case "Mist":
          weatherImage.src = "../public/images/mist";
          break;
        case "Snow":
          weatherImage.src = "../public/images/snow";
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
