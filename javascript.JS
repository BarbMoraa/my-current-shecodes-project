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

let days= ["Sun" ,"Mon", "Teu" ,"Wed" ,"Thur", "Fri", "Sat"];
let day =days[now.getDay()];

h4.innerHTML = `${day} ${hours}:${minutes}` 



function displayWeatherCondition(response) {


  document.querySelector("#city").innerHTML=response.data.name;
  document.querySelector("#temperature").innerHTML= Math.round(response.data.main.temp) ;
  document.querySelector("#humid").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML= response.data.weather[0].main;
  console.log(response.data);
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
search("New York");


function searchLocation(position){

  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey ="92bf7898e647c0f137c428cc127c6b73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=$lat=${lat}&lon${long}&appid=${apiKey}&units=metrics`
 axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event){
event.preventDefault();

navigator.geolocation.getCurrentPosition(searchLocation);

}


let currrentLocationButton= document.querySelector("#current-location-button");
currrentLocationButton.addEventListener("click", getCurrentLocation);

