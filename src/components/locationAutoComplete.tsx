import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { config } from '../config';
import { LocationData } from '../interfaces';
import './locationAutocomplete.css';


const libraries: ("places")[] = ['places'];
interface LocationAutocompleteProps {
    onLocationSelect: (location: LocationData | null) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ onLocationSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: config.googleAPIKey,
        libraries: libraries,
    });

    useEffect(() => {
        if (isLoaded && inputRef.current && !autocomplete) {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current);
            autocompleteInstance.setComponentRestrictions({ country: 'us' });
            autocompleteInstance.addListener('place_changed', () => handlePlaceChanged(autocompleteInstance));
            setAutocomplete(autocompleteInstance);
        }
    }, [isLoaded, inputRef.current]);

    const handlePlaceChanged = (autocompleteInstance: google.maps.places.Autocomplete) => {
        const place = autocompleteInstance.getPlace();

        if (place.address_components && place.geometry) {
            const city = place.address_components.find(comp => comp.types.includes('locality'))?.long_name || '';
            const state = place.address_components.find(comp => comp.types.includes('administrative_area_level_1'))?.short_name || '';
            const zip = place.address_components.find(comp => comp.types.includes('postal_code'))?.long_name || '';
            const longitude = place.geometry.location?.lng() || 0;
            const latitude = place.geometry.location?.lat() || 0;

            setInputValue(place.formatted_address || '');
            onLocationSelect({ city, state, zip, longitude, latitude });
        } else {
            onLocationSelect(null);
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="location-autocomplete-container">
            <input
                type="text"
                className="location-autocomplete-input"
                placeholder="Search for a city, state, or zip"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
            />
        </div>
    );
};

export default LocationAutocomplete;
