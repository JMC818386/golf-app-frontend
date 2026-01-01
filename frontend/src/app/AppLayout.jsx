import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../components/nav/TopNav';
import BottomTabBar from '../components/nav/BottomTabBar';

const AppLayout = () => {
  return (
    <div className="gradient-shell">
      <div className="app-frame">
        <TopNav />
        <main className="app-main">
          <Outlet />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
};

export default AppLayout;
