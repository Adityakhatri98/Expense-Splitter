import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [friends, setFriends] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editFriend, setEditFriend] = useState('');

  useEffect(() => {
    fetchExpenses();
    fetchFriends();
  }, []);

  const fetchExpenses = () => {
    axios.get('http://18.144.44.28:8000/api/expenses/')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const fetchFriends = () => {
    axios.get('http://18.144.44.28:8000/api/friends/')
      .then(response => setFriends(response.data))
      .catch(error => console.error('Error fetching friends:', error));
  };

  const handleEdit = (expense) => {
    setEditExpenseId(expense.id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditFriend(expense.friend); // Assuming friend is the friend's ID
  };

  const handleSave = (expenseId) => {
    axios.put(`http://18.144.44.28:8000/api/expenses/${expenseId}/`, {
      description: editDescription,
      amount: editAmount,
      friend: editFriend
    })
      .then(response => {
        console.log('Expense updated:', response.data);
        setEditExpenseId(null);
        setEditDescription('');
        setEditAmount('');
        setEditFriend('');
        fetchExpenses();
      })
      .catch(error => console.error('Error updating expense:', error));
  };

  const handleDelete = (expenseId) => {
    axios.delete(`http://18.144.44.28:8000/api/expenses/${expenseId}/`)
      .then(response => {
        console.log('Expense deleted:', response.data);
        fetchExpenses();
      })
      .catch(error => console.error('Error deleting expense:', error));
  };

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {editExpenseId === expense.id ? (
              <>
                <input
                  type="text"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                />
                <select value={editFriend} onChange={e => setEditFriend(e.target.value)}>
                  <option value="">Select Friend</option>
                  {friends.map(friend => (
                    <option key={friend.id} value={friend.id}>{friend.name}</option>
                  ))}
                </select>
                <button onClick={() => handleSave(expense.id)}>Save</button>
              </>
            ) : (
              <>
                <span className="description">{expense.description}</span>
                <span className="amount">${expense.amount}</span>
                <span className="friend">Shared with: {expense.friend_name}</span>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
