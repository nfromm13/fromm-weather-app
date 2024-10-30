import { config } from '../config';
import { FrommWeatherData } from '../interfaces';

export default class ApiHelper {
    private baseUrl: string;

    constructor() {
        this.baseUrl = config.frommWeatherBaseURL;
    }

    public async getCurrentWeather(latitude: string, longitude: string, date: string, timezone: string): Promise<FrommWeatherData> {
        const url = this.baseUrl + 'get-current-weather?' + new URLSearchParams({
            'latitude': latitude,
            'longitude': longitude,
            'date': date,
            'timezone': timezone
        })

        return await this.hitEndpoint(url)
    }

    public async getFiveDayForecast(latitude: string, longitude: string, startDate: string, timezone: string): Promise<FrommWeatherData> {
        const endDate = this.addDays(startDate, 5);

        const url = this.baseUrl + 'get-five-day-forecast?' + new URLSearchParams({
            'latitude': latitude,
            'longitude': longitude,
            'start_date': startDate,
            'end_date': endDate,
            'timezone': timezone
        }).toString();

        return await this.hitEndpoint(url)
    }

    // Helper function to add days to a date string
    private addDays(dateString: string, days: number): string {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date.toISOString().slice(0, 10);
    }

    private async hitEndpoint(url: string): Promise<FrommWeatherData> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.status}`);
            }
            const data = await response.json() as FrommWeatherData;
            return data;
        } catch (error) {
            throw new Error(`Error fetching weather data: ${error}`);
        }
    }
}