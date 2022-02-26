import { useEffect, useState } from 'react';
import './styles/App.css';
import axios from 'axios';

import foggy from "./images/foggy.jpeg";

function App() {
  const [cityName, setCityName] = useState("tbilisi")
  const [inputButton, setInputButton] = useState(false)

  const showDate = new Date()
  
  const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekdayNumber = showDate.getDay()
  const dayNumber = showDate.getUTCDate()
  const weekdayName = arrayOfWeekdays[weekdayNumber]
  const monthName = monthArr[showDate.getMonth()]


  const [weatherData, setWeatherData] = useState({
    temp: 0,
    name: 0,
    country: 0,
    description: 0 ,
    wind: 0 ,
    pressure: 0 ,
    humidity: 0 ,
    icon: "01d" ,
  })
  
  const displayFullDate = `${showDate.getHours()}:${showDate.getMinutes()} - ${weekdayName}  ${monthName.substring(0, 3)} ${dayNumber}`

  useEffect( async () =>{
    const data = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=add442c6298a4a9c04ac0999446c8bf9`)
    // console.log(data.data)
    setWeatherData({
      temp: data.data.main.temp,
      description: data.data.weather[0].description,
      wind: data.data.wind.speed,
      pressure: data.data.main.pressure,
      humidity: data.data.main.humidity,
      name: data.data.name,
      country: data.data.sys.country,
      icon: data.data.weather[0].icon
    })
  },[inputButton])

  return (
    <div className="App">
      <main className='weatherBox' style={{ backgroundImage: `url(${foggy}` }} >
        <div className='sign'>otoalasania</div>
        <div className='mainTemp'>
          <h1 className='mainTempH1'>{Math.floor(weatherData.temp - 273.15)}<span>°</span></h1>
          <div className='cityName'>
            <h1>{weatherData.name}<span>{weatherData.country}</span></h1>
            <p>{displayFullDate}</p>
          </div>
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}/>
        </div>
        <div className='rightInfo'>
          <div className='searchBox'>
            <div className='inputBox'>
              <input 
              type="text" 
              
              placeholder='Another Location'
              onChange={(e)=> setCityName(e.target.value)}
              />
            </div>
            <div className='searchIconBox'>
              <button onClick={() => setInputButton(!inputButton)}>
                <img src={"https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"}></img>
              </button>
            </div>
          </div>
          <div className='moreInfo'>
            <div className='moreInfoTop'>
              <li onClick={() => {setCityName("Batumi");setInputButton(!inputButton)}}>Batumi</li>
              <li onClick={() => {setCityName("Kutaisi");setInputButton(!inputButton)}}>Kutaisi</li>
              <li onClick={() => {setCityName("California");setInputButton(!inputButton)}}>California</li>
              <li onClick={() => {setCityName("Manchester");setInputButton(!inputButton)}}>Manchester</li>
            </div>
            <div className='moreInfoBottom'>
            <div><p>Weather Details</p></div>
              <ul>
                <li><p>Description</p><p>{weatherData.description}</p></li>
                <li><p>Wind</p><p>{`${Math.floor(weatherData.wind)}km/h`}</p></li>
                <li><p>Pressure</p><p>{weatherData.pressure}</p></li>
                <li><p>Humidity</p><p>{`${weatherData.humidity}%`}</p></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
