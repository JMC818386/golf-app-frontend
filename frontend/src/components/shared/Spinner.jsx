import React from 'react';
import './Spinner.css';

export const Spinner = ({ size = 'md', color = 'accent' }) => {
    return (
        <div className={`spinner spinner-${size} spinner-${color}`}>
            <div className="spinner-circle"></div>
        </div>
    );
};

export default Spinner;
