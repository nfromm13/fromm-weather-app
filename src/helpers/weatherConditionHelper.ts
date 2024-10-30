import { WeatherCondition } from "../interfaces";

import clearIcon from '../assets/clear.png';
import mostlyClearIcon from '../assets/mostly-clear.png';
import partlyCloudyIcon from '../assets/partly-cloudy.png';
import overcastIcon from '../assets/overcast.png';
import fogIcon from '../assets/fog.png';
import drizzleIcon from '../assets/drizzle.png';
import freezingDrizzleIcon from '../assets/freezing-drizzle.png';
import rainIcon from '../assets/rain.png';
import freezingRainIcon from '../assets/freezing-rain.png';
import snowfallIcon from '../assets/snowfall.png';
import thunderstormIcon from '../assets/thunderstorm.png';


export const weatherConditionsMap: { [key: number]: WeatherCondition } = {
    0: { description: "Clear sky", imagePath: clearIcon },
    1: { description: "Mainly clear", imagePath: mostlyClearIcon },
    2: { description: "Partly cloudy", imagePath: partlyCloudyIcon },
    3: { description: "Overcast", imagePath: overcastIcon },
    45: { description: "Fog", imagePath: fogIcon },
    48: { description: "Depositing rime fog", imagePath: fogIcon },
    51: { description: "Drizzle: Light intensity", imagePath: drizzleIcon },
    53: { description: "Drizzle: Moderate intensity", imagePath: drizzleIcon },
    55: { description: "Drizzle: Dense intensity", imagePath: drizzleIcon },
    56: { description: "Freezing Drizzle: Light intensity", imagePath: freezingDrizzleIcon },
    57: { description: "Freezing Drizzle: Dense intensity", imagePath: freezingDrizzleIcon },
    61: { description: "Rain: Slight intensity", imagePath: rainIcon },
    63: { description: "Rain: Moderate intensity", imagePath: rainIcon },
    65: { description: "Rain: Heavy intensity", imagePath: rainIcon },
    66: { description: "Freezing Rain: Light intensity", imagePath: freezingRainIcon },
    67: { description: "Freezing Rain: Heavy intensity", imagePath: freezingRainIcon },
    71: { description: "Snow fall: Slight intensity", imagePath: snowfallIcon },
    73: { description: "Snow fall: Moderate intensity", imagePath: snowfallIcon },
    75: { description: "Snow fall: Heavy intensity", imagePath: snowfallIcon },
    77: { description: "Snow grains", imagePath: snowfallIcon },
    80: { description: "Rain showers: Slight intensity", imagePath: rainIcon },
    81: { description: "Rain showers: Moderate intensity", imagePath: rainIcon },
    82: { description: "Rain showers: Violent intensity", imagePath: rainIcon },
    85: { description: "Snow showers: Slight intensity", imagePath: snowfallIcon },
    86: { description: "Snow showers: Heavy intensity", imagePath: snowfallIcon },
    95: { description: "Thunderstorm: Slight or moderate", imagePath: thunderstormIcon },
    96: { description: "Thunderstorm with slight hail", imagePath: thunderstormIcon },
    99: { description: "Thunderstorm with heavy hail", imagePath: thunderstormIcon }
};
