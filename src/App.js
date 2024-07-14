import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import FriendList from './components/FriendList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <div className="App-header-content">
          
          <a href='/'><img src="/logo.png" alt="Expense Splitter Logo" className="App-logo" /></a>
            <a href='/' className="link"><h1 className="navigation">Expense Splitter</h1></a>
            <Navbar className="navigation"/>
          </div>
          
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpenseForm />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route path="/friends" element={<FriendList />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </Router>
  );
}

export default App;
