import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './BottomNav.css';
import homeIcon from '../img/home.png';
import statsIcon from '../img/stats.png';
import calendarIcon from '../img/calendar.png';
import liveRoundIcon from '../img/live-round.png';
import request from '../services/api.request';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentRound, setCurrentRound] = useState(null);

    useEffect(() => {
        // Check localStorage for active round ID
        const activeRoundId = localStorage.getItem('activeRoundId');
        const activeRoundCourse = localStorage.getItem('activeRoundCourse');

        if (activeRoundId && activeRoundCourse) {
            setCurrentRound({
                id: activeRoundId,
                course: activeRoundCourse
            });
        }
    }, [location.pathname]);

    const handleLiveRoundClick = () => {
        if (currentRound) {
            navigate(`/round/${currentRound.id}/${currentRound.course}`);
        } else {
            navigate('/round-setup');
        }
    };

    const navItems = [
        { path: '/main', label: 'Home', icon: homeIcon, onClick: null },
        { path: '/round-history', label: 'Stats', icon: statsIcon, onClick: null },
        { path: '/player-portal', label: 'Portal', icon: calendarIcon, onClick: null },
        { path: null, label: 'Round', icon: liveRoundIcon, onClick: handleLiveRoundClick }
    ];

    const isActive = (path) => {
        if (!path) return false;
        return location.pathname === path;
    };

    return (
        <div className="bottom-nav">
            <div className="bottom-nav-background" />
            {navItems.map((item, index) => (
                <button
                    key={item.path || index}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''} ${item.label === 'Round' && currentRound ? 'has-active-round' : ''}`}
                    onClick={item.onClick || (() => navigate(item.path))}
                >
                    <div className="nav-icon-wrapper">
                        <img src={item.icon} alt={item.label} className="nav-icon" />
                        {item.label === 'Round' && (
                            <span className={`round-badge ${currentRound ? 'active' : 'inactive'}`}>
                                {currentRound ? '▶' : '+'}
                            </span>
                        )}
                    </div>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </div>
    );
};

export default BottomNav;
