import { useEffect, useState } from 'react';

const App = () => {
  const [counteryName, setCountryName] = useState('');
  const [searchedCountry, setSearchedCountry] = useState('');
  const [temperatureCount, setTemperatureCount] = useState(0);
  const [windCount, setWindCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [setForecastCount ] = useState('');

  useEffect(() => {
    const getDataFromApi = async () => {
      const request = await fetch('https://goweather.herokuapp.com/weather');
      const data = await request.json();
      setTemperatureCount(data.temperature);
      setWindCount(data.wind);
      setDescriptionCount(data.description);
      setForecastCount(data.forecast);
    };
    getDataFromApi();
  }, []);

  const onClick = async (e) => {
    const request = await fetch(
      'https://goweather.herokuapp.com/weather/' + counteryName
    );
    const data = await request.json();

    if (request.status !== 200) {
      alert(data.error.message);
      return;
    }

    //display weather info

    setSearchedCountry(counteryName);
    setTemperatureCount(data.temperature);
    setWindCount(data.wind);
    setDescriptionCount(data.description);
    setForecastCount(data.forecast.value);
    setCountryName('');
  };

  return (
    <div className='container'>
        <>
          <h1 className='text-center'>Weather App</h1>
          <div className='input-group  mt-3'>
            <input 
              type='text'
              value={counteryName}
              onChange={(e) => setCountryName(e.target.value)}
              className='card form-control'
              placeholder='input city name here'
            />
            
            <button onClick={onClick} className="form-control" type="button" id="basic-addon2" style={{ color: 'black' }}>Get Weather info</button>

            <h3 className='text-center mt-3 w-100'>
             The weather info in {' '} <span style={{ color: 'darkblue' }}>{searchedCountry}</span>: </h3>
            <div className='info mt-3'>
              <div className='flex'>
                <h3 className="card-Temperature">Temperature</h3>
                <h3 className="text-center">{temperatureCount}</h3>
              </div>
              <div className='flex'>
                <h3 className="card-Wind">Wind</h3>
                <h3 className="text-center">{windCount}</h3>
              </div>
              <div className='flex'>
                <h4 className="card1-Description">Description</h4>
                <h4 className="text-center">{descriptionCount}</h4>
              </div>
            </div>
          </div>
        </>
    </div>
  );
};

export default App;