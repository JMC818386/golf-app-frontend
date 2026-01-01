import React from 'react';
import NavBar from './NavBar';
import BottomNav from './BottomNav';

const PlayerPortal = () => {
    return (
        <div className="background">
            <NavBar />
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <h2 className="text-title">Player Portal Coming Soon</h2>
            </div>
            <BottomNav />
        </div>
    );
};

export default PlayerPortal;
