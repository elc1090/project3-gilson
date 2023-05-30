import React, { useEffect } from 'react';
import './FadeInAlert.css';

const FadeInAlert = ({ message, visible, setVisible }) => {

    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [visible]);

    return (
        <div className={`fade-in-alert ${visible ? 'visible' : ''}`}>
            {message}
        </div>

    );
};

export default FadeInAlert;
