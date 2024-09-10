const cityFormEl = document.querySelector('#city-form');
const cityContainerEl = document.querySelector('#city-container');
const searchTerm = document.querySelector('#search-term');
const cityInputEl = document.querySelector('#city');
const APIKey = '72e1b01d6c1f4698ba88bbe8cf59ae48';
const todayCity = document.querySelector('#today-city');
const blockSelector = document.querySelector('.block');
const cityList = document.querySelector('#city-list');
const city = document.querySelector('#city-search-term');

const formSubmitHandler = function (event) {
  event.preventDefault();

  const city = cityInputEl.value.trim();

  if (city) {
    clearCards();
    getCityCoordinates(city);
cities(city);
    cityInputEl.textContent = '';
    
  } else {
    alert('Please enter a City name');
  }
};

const cities = function (city) {

  const cityEl = document.createElement('button');
  cityEl.textContent = city;
  cityEl.classList = 'btn btn-secondary btn-block text-dark';
  cityList.appendChild(cityEl);
  cityEl.addEventListener('click', function () {
    clearCards();
    getCityCoordinates(city);
  });
}

const getCityCoordinates = function (city) {
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
      
        return response.json()
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .then(function (data) {
      const {lat, lon} = data[0];
      getCityWeather(lat,lon);
    })  
    .catch(function (error) {
      console.error('Unable to connect to API service');
    });
};


const getCityWeather = function (lat,lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        
        return response.json()

      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .then(function (data) {
      console.log(data);
      displayWeather (data);
    })
    .catch(function (error) {
      console.log(error);
      console.error('Unable to retrieve weather data');
    });
  
};
const displayOneDay = function (forecast) {
  const repoEl = document.createElement('div');
  repoEl.classList = 'list-item flex-row justify-space-between align-center';
 

  const titleEl = document.createElement('span');
  titleEl.textContent = forecast.dt_txt;

  repoEl.appendChild(titleEl);

  const statusEl = document.createElement('img');
  statusEl.classList = 'flex-row align-center';

  statusEl.setAttribute('src', `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`);

  const tempEl = document.createElement('span');
  tempEl.textContent =`${Math.round((forecast.main.temp - 273.15) * 9/5 + 32)}`+'°F';
  const humidityEl = document.createElement('span');
  humidityEl.textContent = forecast.main.humidity+'%';
  const windEl = document.createElement('span');
  windEl.textContent = forecast.wind.speed+'mph';

  repoEl.appendChild(statusEl);
  repoEl.appendChild(tempEl);
  repoEl.appendChild(humidityEl);
  repoEl.appendChild(windEl);
  blockSelector.appendChild(repoEl);
}
const clearCards = function () {
  cityContainerEl.textContent = '';
  // todayCity.textContent = '';
  blockSelector.textContent = '';
}
const displayWeather = function (forecast) {
  

  const {
    list,
    city: {name}
  }= forecast;
console.log(name);
  todayCity.textContent = name;
  displayOneDay(list[0]);
  for (let i = 0; i < list.length; i++) {
    const forecastObj = list[i];
    if (i % 8 === 0) {

    
      city.textContent = `${name}`;

    const repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
   

    const titleEl = document.createElement('span');
    titleEl.textContent = forecastObj.dt_txt;

    repoEl.appendChild(titleEl);

    const statusEl = document.createElement('img');
    statusEl.classList = 'flex-row align-center';

    statusEl.setAttribute('src', `https://openweathermap.org/img/wn/${forecastObj.weather[0].icon}.png`);

    const tempEl = document.createElement('span');
    tempEl.textContent = `${Math.round((forecastObj.main.temp - 273.15) * 9/5 + 32)} °F`;
    const humidityEl = document.createElement('span');
    humidityEl.textContent = `${forecastObj.main.humidity}` + '%';
    const windEl = document.createElement('span');
    windEl.textContent = `${forecastObj.wind.speed} mph`;

    repoEl.appendChild(statusEl);
    repoEl.appendChild(tempEl);
    repoEl.appendChild(humidityEl);
    repoEl.appendChild(windEl);

    cityContainerEl.appendChild(repoEl);
    }     
  }
};

cityFormEl.addEventListener('submit', formSubmitHandler);

