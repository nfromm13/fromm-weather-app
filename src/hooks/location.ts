import { config } from '../config';
import { LocationData } from '../interfaces';

const getCurrentLocation = (): Promise<LocationData | null> => {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;

                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.googleAPIKey}`
                        );
                        const data = await response.json();

                        if (data.results.length > 0) {
                            const addressComponents = data.results[0].address_components;
                            const city = addressComponents.find((comp: { types: string[] }) => comp.types.includes('locality'))?.long_name || '';
                            const state = addressComponents.find((comp: { types: string[] }) => comp.types.includes('administrative_area_level_1'))?.short_name || '';
                            const zip = addressComponents.find((comp: { types: string[] }) => comp.types.includes('postal_code'))?.long_name || '';

                            resolve({ city, state, zip, longitude, latitude });
                        } else {
                            resolve(null);
                        }
                    } catch (error) {
                        resolve(null);
                    }
                },
                (error) => {
                    resolve(null);
                },
                { enableHighAccuracy: true }
            );
        } else {
            resolve(null);
        }
    });
};

export default getCurrentLocation;
