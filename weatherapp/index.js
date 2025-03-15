// Weather app

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');

const card = document.querySelector('.card');

const apiKey = "98a6f3ec6c41a085dbe5512411727a25";

weatherForm.addEventListener('submit', async (e) => {
    // console.log("Event listener triggered"); // Debugging
    e.preventDefault();
    // console.log("Default behavior prevented");
    const city = cityInput.value;
    if (city) {
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch (error) {
            console.log(error);
            displayError(error);
        }
        
    }
    else {
        displayError("Please enter a city name");
    }
})

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // console.log("Fetching URL:", url); // Debugging
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

function displayWeather(data){

    const {name: city,
         main: {temp, humidity}, 
         weather: [{description, id}]} = data;
    
    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return '⛈️';
        case(weatherId < 500):
            return '🌧️';
        case(weatherId < 600):
            return '🌧️';
        case(weatherId < 700):
            return '❄️';
        case(weatherId < 800):
            return '🌫️';
        case(weatherId === 800):
            return '☀️';
        case(weatherId < 810):
            return '☁️';
        default:
            return '❓';
    }
}

function displayError(message){
    const error = document.createElement('p');
    error.textContent = message;
    error.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(error);

}