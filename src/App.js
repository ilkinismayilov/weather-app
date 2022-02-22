import React, {useState} from 'react';
import './App.css';
const api = {
  key: "8170aa07ee677be61486c8808399f2a5",
  base: "http://api.weatherstack.com/"
}



function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const  search  =  (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}current?access_key=${api.key}&query=${query}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[new Date().getDay()];
    let date = new Date().getDate();
    let month = months[new Date().getMonth()];
    let year = new Date().getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
      <div className={(typeof weather.current != "undefined") ? ((weather.current.temperature > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          
          { (typeof weather.current != "undefined" ) ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.request.query}</div>
                <div className="date">{dateBuilder()}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.current.temperature)}°c
                </div>
                <div className="weather-img">
                  <img src={weather.current.weather_icons} alt="" />
                </div>
                <div className="weather">{weather.current.weather_descriptions}</div>
              </div>
            </div>
          ) : ('')
          }
          
        </main>
      </div>

  );
}

export default App;
