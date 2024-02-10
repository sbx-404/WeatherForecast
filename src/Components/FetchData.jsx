import { useState, useEffect } from "react";

import Clear from "../../public/img/clear.png"
import Fog from "../../public/img/fog.jpg"
import Haze from "../../public/img/haze.png"
import Clouds from "../../public/img/clouds.png"

  
import windSpd from "../../public/img/windSpeed.png";
import windDeg from "../../public/img/haze.png";
import search from "../../public/img/search.png";

const weatherImages = {
  Clouds: Clouds,
  Haze : Haze,
  Fog : Fog,
  Clear : Clear
  
}

//this is comment
  
const FetchData = () => {
  const [searchCity, setSearchCity] = useState("Delhi");
  const [temp, setTemp] = useState("");
  const [wind, setWind] = useState("");
  const [weatherName, setWeatherName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [currentWeather, setCurrentWeather] = useState()


  const URL = "https://api.openweathermap.org/data/2.5/weather";
  let API_KEY = "7fc3fff0144e9b2e4ae7d5eb058757e6";
  const FULL_URL = `${URL}?q=${searchCity}&appid=${API_KEY}&units=metric`;

  const fetching = async () => {
    const response = await fetch(`${FULL_URL}`);
    const data = await response.json();
    console.log(data);

    if (data.cod == "404") {
      setError(data.cod);
    } 
    if(data.cod == 200){
      setError(200);

    }
      setTemp(data.main);
      setWind(data.wind);
      setWeatherName(data.weather[0].main);
      setCountry(data.sys);
      setCurrentWeather(weatherImages[weatherName])
  };

  const handleInput = (e) => {
    setSearchCity(e.target.value);
  };

  const searchHandle = () => {
    fetching();
  };

  useEffect(() => {
    fetching();
  }, [error]);

  return (
    <div>
      <div className="w-6/12 bg-slate-300 h-[80vh] mx-auto rounded-lg my-11">
        <div className="flex justify-center mx-auto py-7">
          <input
            onChange={handleInput}
            type="text"
            placeholder="Enter Any City"
            className="p-2 rounded-lg border-solid border-2 border-indigo-600 outline-none"
          />

          <div className="bg-green-500 px-2 py-[2px] w-[13%] flex justify-between items-center rounded-tl-md rounded-bl-md">
            <img src={search} alt="" className="w-6 h-6" />
            <div className="text-white font-extrabold " onClick={searchHandle}>
              Search
            </div>
          </div>
        </div>

        {error == "404" ? (
          <p className="text-center text-3xl  text-red-500">
            This is not fare, give a right city name
          </p>
        ) : (
          <>
            <div className="w-[75%] h-40 my-8 rounded-xl px-5 bg-slate-600 mx-auto pr-10 flex justify-between items-center">

            
                <img
                src={currentWeather}
                alt="clear-weather"
                className=" w-28 h-[8rem] rounded-full"
                />
              

              <div className="flex items-center justify-between">
                <p className="text-white text-4xl font-medium">{searchCity} </p>
                {country.country == undefined ? "" :
                <p className="text-white text-4xl">, {country.country}</p>
                }
              </div>

              <div className="flex flex-col text-white space-y-6">
                <div className="text-center text-3xl font-extrabold">
                  {weatherName}
                </div>
                <div className="text-center text-2xl">
                  {Math.ceil(temp.temp)} °C
                </div>
              </div>
            </div>

            <div className="w-[75%] h-40 my-8 rounded-xl bg-slate-600 mx-auto pr-10 px-4 py-4 flex justify-between items-center">
              <div>
                <img
                  src={windSpd}
                  alt=""
                  className="w-20  bg-black rounded-full px-1 py-1"
                />
                <p className="text-white text-center text-3xl">
                  <span className="block  text-sm">Wind speed </span>
                  {wind.speed} <span className="text-sm">mph</span>
                </p>
              </div>

              <div className="text-white space-y-4">
                <p className="text-center font-extrabold text-6xl">
                  {Math.ceil(temp.temp) } °C
                </p>
                <p className="text-center text-xl">
                  <span className="text-sm">Feels Like</span>{" "}
                  {Math.ceil(temp.feels_like)} °C
                </p>
              </div>

              <div>
                <img
                  src={windDeg}
                  alt=""
                  className="w-20  bg-black rounded-full px-1 py-1"
                />
                <p className="text-white text-center text-3xl">
                  <span className="block  text-sm">Wind deg</span>
                  {wind.deg} °
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FetchData;







