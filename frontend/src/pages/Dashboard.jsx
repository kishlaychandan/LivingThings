// src/pages/Dashboard.jsx
import Chart from '../components/Chart';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <h1 className='text-4xl mt-8'>Dashboard</h1>
      <Chart />
    </div>
  );
};

export default Dashboard;
