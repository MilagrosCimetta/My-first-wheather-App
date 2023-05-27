window.onload = function () {
  function formatDate() {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let now = new Date();
    let date = now.getDay();
    let currentDay = days[date];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let currentMonth = months[now.getMonth()];
    let currentDate = now.getDate();
    let currentYear = now.getFullYear();
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let formattedTime = `${hours}:${minutes}`;

    let formattedDate = `${formattedTime}, ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
    document.getElementById("dateTime").innerText = formattedDate;
  }

  formatDate();
};

//tarea anterior
//function showPosition(position) {
//  let lat = position.coords.latitude;
//  let lon = position.coords.longitude;
//console.log(lat);
//console.log(lon);
//   let apiKey = "4b3503b2f08a729413c4d33ef1186004";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   axios.get(`${apiUrl}`).then(showTemperature);
// }

//tarea ahora

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
	 <div class="col">
		 <div class="card">
			 <div class="card-body">
				 <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
				 <div class="container-2">
					 <div class="row">
						 <div class="col-6 emoji"><img src="http://openweathermap.org/img/wn/${
               forecastDay.weather[0].icon
             }@2x.png" alt="" width="42"/></div>
						 <div class="col-6">
						 <div class="row">${Math.round(forecastDay.temp.max)}°</div>
						 <div class="row">${Math.round(forecastDay.temp.min)}°</div>
						 </div>
					 </div>
				 </div>
				 </div>
				 </div>
				 </div> 
				 `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function changeCityNameValue() {
  let city = document.getElementById("citySearchBar");
  let cityName = document.getElementById("locationName");
  cityName.textContent = city.value;
  //city.value = "";
}

function searchCity(event) {
  event.preventDefault();
  console.log("bleble");
  let city = document.getElementById("citySearchBar");
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  //https://api.openweathermap.org/data/2.5/weather?q=london&appid=4b3503b2f08a729413c4d33ef1186004&units=metric

  axios
    .get(apiUrl)
    .then(changeCityNameValue(city))
    .then((response) => {
      console.log("blublu");
      updateWeather(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function updateWeather(data) {
  const info = data;
  const temperature = Math.round(info.data.main.temp);
  const wind = Math.round(info.data.wind.speed);
  const humidity = Math.round(info.data.main.humidity);
  changeTemperature(temperature);
  changeCityNameValue();
  showWind(wind);
  showHumidity(humidity);
  getForecast(info.data.coord);
}

function showHumidity(humidityChanges) {
  let humidity = document.getElementById("humidity");
  humidity.textContent = humidityChanges + "%";
}

function changeTemperature(temperatureCelsius) {
  console.log(temperatureCelsius);
  console.log("Blabla");
  let temperature = document.getElementById("temperature");
  temperature.textContent = temperatureCelsius + " C°";
}
function showWind(windSpeed) {
  console.log(windSpeed);
  let wind = document.getElementById("wind");
  wind.textContent = windSpeed + " km/h";
}

//Changes the Title
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", searchCity);
//navigator.geolocation.getCurrentPosition(showPosition);
