import React from 'react';
import './weatherCard.css';
import humidityIcon from '../assets/humidity.png'
import windIcon from '../assets/WindSpeed.png';
import { WeatherCondition } from '../interfaces';
import { weatherConditionsMap } from '../helpers/weatherConditionHelper';


interface WeatherCardProps {
    temperature: number;
    humidity: number;
    windSpeed: number;
    realFeel: number;
    weatherCode: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    temperature,
    humidity,
    windSpeed,
    realFeel,
    weatherCode
}) => {
    const condition: WeatherCondition = weatherConditionsMap[weatherCode]
    return (
        <div className="weather-card">
            <div className="weather-header">Current Weather</div>
            <div className="weather-info">
                <div className="weather-humidity">
                    <img src={humidityIcon} alt="Humidity" />
                    <div>Humidity: <br /> {humidity}%</div>
                </div>
                <div className="weather-condition">
                    <img src={condition.imagePath} alt="Weather Condition" />
                    <div>{condition.description}</div>
                </div>
                <div className="weather-wind">
                    <img src={windIcon} alt="Wind Speed" />
                    <div>Wind Speed: <br /> {windSpeed} MPH</div>
                </div>
            </div>
            <div className="weather-temperature">{temperature}°F</div>
            <div className="weather-real-feel">Feels like: {realFeel}°F</div>
        </div>
    );
};


export default WeatherCard;
