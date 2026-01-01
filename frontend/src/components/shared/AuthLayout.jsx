import React from 'react';
import './AuthLayout.css';

export const AuthLayout = ({ children, title }) => {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-card">
                    {title && <h2 className="auth-title">{title}</h2>}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
