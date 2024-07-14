import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Dashboard.css';

function Dashboard() {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/balances/')
      .then(response => setBalances(response.data))
      .catch(error => console.error('Error fetching balances:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <ul>
        {balances.map((balance, index) => (
          <li key={index} className={balance.amount < 0 ? 'owe' : 'owed'}>
            {balance.amount < 0 
              ? `You owe ${balance.friend}: $${Math.abs(balance.amount)}`
              : `${balance.friend} owes you:  $${balance.amount/2}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
