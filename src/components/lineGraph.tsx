import { Line } from 'react-chartjs-2';
import './lineGraph.css';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { FrommWeatherData } from '../interfaces';
import './lineGraph.css';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
    Filler
);

interface TemperatureChartProps {
    dailyWeather: FrommWeatherData;
    fiveDayWeather: FrommWeatherData;
    isWeekly: boolean;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ isWeekly, dailyWeather, fiveDayWeather }) => {
    const formatTime = (time: string) => {
        const date = new Date(time);
        return `${date.getHours()}:00`; // Returns the hour in 'HH:00' format
    };

    const data = isWeekly ? {
        labels: fiveDayWeather.time.map(formatTime),
        datasets: [
            {
                label: 'Temperature',
                data: fiveDayWeather.temperature,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
            },
        ],
    }
        : {
            labels: dailyWeather.time.map(formatTime),
            datasets: [
                {
                    label: 'Temperature',
                    data: dailyWeather.temperature,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                },
            ],
        };

    const options = {
        plugins: {
            legend: { display: true, position: 'top' as const, },
            tooltip: { enabled: true, },
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', },
            },
            y: {
                title: { display: true, text: 'Temperature (°F)', },
            },
        },
    };

    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

export default TemperatureChart;

