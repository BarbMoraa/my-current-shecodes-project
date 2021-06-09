let now= new Date();
let h4= document.querySelector("#date-today");
let date= now.getDate();
let hours = now.getHours();
if( hours< 10){
    hours=`0${hours}`
}
let minutes = now.getMinutes();
if( minutes<10 ) {
   minutes = `0${minutes}`
}

let days= ["Sunday" ,"Monday", "Teusday" ,"Wednesday" ,"Thursday", "Friday", "Saturday"];
let day =days[now.getDay()];

h4.innerHTML = `${day} ${hours}:${minutes}`; 


//start of forecast info
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response){
  console.log(displayForecast);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//getting coordinates
function getForecast(coordinates) {
  let apiKey = "92bf7898e647c0f137c428cc127c6b73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}




function displayWeatherCondition(response) {

  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML= Math.round(response.data.main.temp) ;
  document.querySelector("#humid").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML= response.data.weather[0].description;

celsiusTemperature= response.data.main.temp;
 
  let iconElement= document.querySelector("#cool-icon");
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  getForecast(response.data.coord);
 
}


function searchLocation(position){

  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey ="92bf7898e647c0f137c428cc127c6b73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=$lat=${lat}&lon${long}&appid=${apiKey}&units=metrics`
 axios.get(apiUrl).then(displayWeatherCondition);

}

function search(city){

  let apiKey ="92bf7898e647c0f137c428cc127c6b73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayWeatherCondition);

}


function handleSubmit(event) {
    event.preventDefault();
  let city= document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


//fahreinheit temp conversion
function displayFahreinheitTemperature(event) {
event.preventDefault();
let FahreinheitTemperature= (celsiusTemperature * 9) / 5 + 32;
let temperatureElement= document.querySelector("#temperature");
temperatureElement.innerHTML= Math.round(FahreinheitTemperature);
}

//celsius temp conversion
function displayCelsiusTemperature(event) {
event.preventDefault();
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML= Math.round (celsiusTemperature);
}

let celsiusTemperature = null;


let fahreinheitLink= document.querySelector("#fah-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemperature);


let celsiusLink= document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
