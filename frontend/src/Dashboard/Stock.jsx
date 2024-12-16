import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Stock.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stock = ({ symbol }) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPortfolioData(symbol);
  }, [symbol]);

  const fetchPortfolioData = async (symbol) => {
    try {
      const API_KEY = '1df145b973264e5d9b24b7c37dc6b85a';  // Replace with your Twelve Data API key
      const API_Call = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=7&apikey=${API_KEY}`;
      
      const response = await axios.get(API_Call);
      const data = response.data;
      console.log('API Response:', data);

      if (data && data.values) {
        setPortfolioData(data.values.reverse()); // Reverse to get oldest first
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching portfolio data:', error);
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: portfolioData.map((item) => item.datetime), // Dates for the x-axis
    datasets: [
      {
        label: 'Close Price',
        data: portfolioData.map((item) => parseFloat(item.close)), // Closing prices for the y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Stock Prices for ${symbol.toUpperCase()}`,
      },
    },
  };

  return (
    <div className="portfolio-and-graph">
      <div className="portfolio">
        <h2>Stock Data</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.length > 0 ? (
                portfolioData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.datetime}</td>
                    <td>{item.open}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.close}</td>
                    <td>{item.volume || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available for this symbol</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="graph">
        <h2>Data Chart</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <div className="stock-chart">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
