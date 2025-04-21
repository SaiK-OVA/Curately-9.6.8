import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ChromeExtensionStats.scss'
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChromeExtensionStats: React.FC = () => {
  const data = {
    labels: ['04/11', '05/11', '06/11', '07/11', '08/11', '09/11', '10/11'],
    datasets: [
      {
        label: 'Messages',
        data: [100, 150, 200, 250, 180, 220, 190], // Replace with dynamic data as needed
        backgroundColor: '#3f51b5',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: '#9e9e9e' },
      },
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
      },
    },
  };

  const stats = [
    { label: 'First Message', value: 1504 },
    { label: 'Opened', value: 1253 },
    { label: 'Replied', value: 948 },
    { label: 'Interested', value: 636 },
  ];

  return (
    <div id="ChromeExtensionStats">
      <div className="header">
        <h2>Your Outreach Stats</h2>
        <select>
          <option>Last 7 days (04/11 - 10/11)</option>
          {/* Add more options if needed */}
        </select>
      </div>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <Grid container direction="row" key={index} className='stat-box'>
            <Grid size={4}   >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </Grid>
            <Grid size={8}  >
              <Bar data={data} options={options} height={150} />
            </Grid>
          </Grid>




        ))}
      </div>
    </div>
  );
};

export default ChromeExtensionStats;
