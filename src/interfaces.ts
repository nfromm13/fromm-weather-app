export interface LocationData {
    city?: string;
    state?: string;
    zip?: string;
    longitude: number | null;
    latitude: number | null;
}

export interface FrommWeatherData {
    time: string[];
    temperature: number[];
    humidity: number[];
    apparentTemperature: number[];
    weatherCode: number[];
    windSpeed: number[];
};

export interface WeatherCondition {
    description: string;
    imagePath: string;
}