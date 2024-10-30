import React from 'react';
import './ToggleSwitch.css';


interface ToggleSwitchProps {
    isWeekly: boolean;
    onToggle: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isWeekly, onToggle }) => {
    return (
        <div className="toggle-switch">
            <button onClick={() => onToggle(false)} className={!isWeekly ? 'active' : ''}>
                Daily
            </button>
            <button onClick={() => onToggle(true)} className={isWeekly ? 'active' : ''}>
                Weekly
            </button>
        </div>
    );
};

export default ToggleSwitch;