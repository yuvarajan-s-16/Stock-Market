import React, { useState, useEffect } from "react";
import "./Dash.css";

const Stock_key = "1df145b973264e5d9b24b7c37dc6b85a"; // import.meta.env.VITE_DASHSTOCKNAPI_KEY;

export default function Dashboard() {
  const userName = "Yuvarajan S";
  const [symbol, setSymbol] = useState("");
  const [stockList, setStockList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve stock list from local storage
    const storedStockList = JSON.parse(localStorage.getItem("stockList"));
    if (storedStockList) {
      setStockList(storedStockList);
    }
  }, []);

  useEffect(() => {
    // Save stock list to local storage whenever it changes
    localStorage.setItem("stockList", JSON.stringify(stockList));
  }, [stockList]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const fetchStockData = async () => {
    if (!symbol) return;
    try {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=7&apikey=${Stock_key}`
      );
      const data = await response.json();
      if (data.values) {
        setStockList((prevList) => [...prevList, data]);
        setError(null);
      } else {
        setError("Invalid symbol or data not available.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }
  };

  return (
    <div className="dashboard">
      <div className="timedisplay">
        <div className="welcome-message">
          <h1>Welcome back, {userName}!</h1>
          <p>
            Hello {userName}, what help do you need? We've added more features
            in the learning page.
          </p>
          <p>Just click and learn new technologies in the stock market.</p>
        </div>
      </div>

      <div className="watchlist">
        <h2 className="watchlist-heading">Favourite Stocks!!</h2>

        <div className="add-stock">
          <input
            type="text"
            placeholder="Enter stock symbol"
            className="watchlist-input"
            value={symbol}
            onChange={handleSymbolChange}
          />
          <button className="add-button" onClick={fetchStockData}>
            Add
          </button>
        </div>

        {error && <p className="text-red">{error}</p>}

        <table className="watchlist-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockList.length > 0 ? (
              stockList.map((stockData, index) => (
                <tr key={index}>
                  <td>{stockData.meta.symbol}</td>
                  <td>{stockData.values[0].open}</td>
                  <td>{stockData.values[0].high}</td>
                  <td>{stockData.values[0].low}</td>
                  <td>{stockData.values[0].close}</td>
                  <td>{stockData.values[0].volume || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available for this symbol</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
