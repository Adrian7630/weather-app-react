import React, { useState } from 'react';
import './index.css';

const api = 
{
  key: "5fc9722e3d6cf1a883c6db5266581d10",
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = arg => 
  {
    if (arg.key === 'Enter')
    {
      fetch (`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => 
        {
          setWeather(result); 
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = e =>
  {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[e.getDay()];
    let date = e.getDate();
    let month = months[e.getMonth()];
    let year = e.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  
  }

  return (
    <div className = {(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>

      <main>

        <div className = "search-box">

          <input type = "text" className = "search-bar"  placeholder = "Search..." onChange = {E => setQuery(E.target.value)}  value = {query} onKeyPress = {search} />

        </div>
        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className = "location-box">

            <div className = "location"> {weather.name}, {weather.sys.country}</div>
            <div className = "date">{dateBuilder(new Date())}</div>

          </div>

          <div className = "weather-box">

            <div className = "temp">{Math.round(weather.main.temp)}°c</div>
            <div className = "weather">{weather.weather[0].main}</div>

          </div>
        </div>
        ) : ('')}
      </main>

    </div>
   );
}

export default App;
