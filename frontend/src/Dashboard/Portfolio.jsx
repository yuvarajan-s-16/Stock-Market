import React, { useState } from "react";
import "./Portfolio.css";

export default function Portfolio() {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [budget, setBudget] = useState(0);
  const [assets, setAssets] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);

  const [assetName, setAssetName] = useState("");
  const [assetPrice, setAssetPrice] = useState("");
  const [assetQuantity, setAssetQuantity] = useState("");
  const [assetCurrentPrice, setAssetCurrentPrice] = useState("");
  const [assetGainPercent, setAssetGainPercent] = useState("");
  const [assetValue, setAssetValue] = useState("");

  const handleAddPortfolioClick = () => {
    setIsPortfolioModalOpen(true);
  };

  const handleAddBudgetClick = () => {
    setIsBudgetModalOpen(true);
  };

  const handleAddAssetClick = () => {
    setIsAssetModalOpen(true);
  };

  const handlePortfolioModalClose = () => {
    setIsPortfolioModalOpen(false);
    setPortfolioName("");
    setPortfolioDescription("");
  };

  const handleBudgetModalClose = () => {
    setIsBudgetModalOpen(false);
  };

  const handleAssetModalClose = () => {
    setIsAssetModalOpen(false);
    setAssetName("");
    setAssetPrice("");
    setAssetQuantity("");
    setAssetCurrentPrice("");
    setAssetGainPercent("");
    setAssetValue("");
  };

  const handlePortfolioSubmit = () => {
    if (portfolioName && portfolioDescription) {
      setPortfolios([
        ...portfolios,
        { name: portfolioName, description: portfolioDescription },
      ]);
      handlePortfolioModalClose();
    }
  };

  const handleBudgetSubmit = () => {
    const parsedBudget = parseFloat(budget);
    if (!isNaN(parsedBudget)) {
      setBudget(parsedBudget);
      handleBudgetModalClose();
    } else {
      console.error("Invalid budget input");
    }
  };

  const handleAssetSubmit = () => {
    const newAsset = {
      name: assetName,
      purchasePrice: assetPrice,
      quantity: assetQuantity,
      currentPrice: assetCurrentPrice,
      gainPercent: assetGainPercent,
      value: assetValue,
    };

    setAssets([...assets, newAsset]);

    const expenseAmount = parseFloat(assetQuantity) * parseFloat(assetPrice);
    setExpenseHistory([
      ...expenseHistory,
      {
        description: `Bought ${assetQuantity} of ${assetName}`,
        amount: expenseAmount,
      },
    ]);

    handleAssetModalClose();
  };

  return (
    <div className="portfolio-page">
      <div className="left-column">
        <div className="portfolio-header">
          <h1>My Portfolios</h1>
          <div className="portfolio-list">
            {portfolios.map((portfolio, index) => (
              <div className="portfolio-item" key={index}>
                <h3>{portfolio.name}</h3>
                <p>{portfolio.description}</p>
                <div className="portfolio-actions">
                  <span className="icon edit" title="Edit">
                    <i className="fas fa-edit"></i>
                  </span>
                  <span className="icon delete" title="Delete">
                    <i className="fas fa-trash"></i>
                  </span>
                </div>
              </div>
            ))}
            <button className="add-portfolio" onClick={handleAddPortfolioClick}>
              +
            </button>
          </div>
        </div>

        <div className="balance-section">
          <h2>Current Balance</h2>
          <h3 className="balance-amount">${budget}</h3>
          <button className="buy-stocks" onClick={handleAddAssetClick}>
            Invest Stocks
          </button>
          <button className="buy-stocks m-2" onClick={handleAddBudgetClick}>
            Add Budget
          </button>
        </div>

        <div className="assets-section">
          <h2>Your Assets</h2>
          <table className="assets-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Purchase Price</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Gain %</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.name}</td>
                  <td>{asset.purchasePrice}</td>
                  <td>{asset.quantity}</td>
                  <td>{asset.currentPrice}</td>
                  <td>{asset.gainPercent}</td>
                  <td>{asset.value}</td>
                  <td>
                    <button className="delete-asset">X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-column">
        <h2>Expense History</h2>
        <ul className="expense-history">
          {expenseHistory.map((expense, index) => (
            <li key={index}>
              {expense.description} - ${expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {isPortfolioModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Portfolio</h2>
            <button className="close-btn" onClick={handlePortfolioModalClose}>
              &times;
            </button>
            <input
              type="text"
              placeholder="Portfolio Name"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Portfolio Description"
              value={portfolioDescription}
              onChange={(e) => setPortfolioDescription(e.target.value)}
            />
            <button className="submit-btn" onClick={handlePortfolioSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {isBudgetModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Budget</h2>
            <button className="close-btn" onClick={handleBudgetModalClose}>
              &times;
            </button>
            <input
              type="number"
              placeholder="Enter Budget Amount"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <button className="submit-btn" onClick={handleBudgetSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {isAssetModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Asset</h2>
            <button className="close-btn" onClick={handleAssetModalClose}>
              &times;
            </button>
            <input
              type="text"
              placeholder="Asset Name"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={assetQuantity}
              onChange={(e) => setAssetQuantity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Purchase Price"
              value={assetPrice}
              onChange={(e) => setAssetPrice(e.target.value)}
            />

            <button className="submit-btn" onClick={handleAssetSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
