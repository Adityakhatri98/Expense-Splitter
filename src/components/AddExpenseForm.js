import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [friend, setFriend] = useState('');
  const [friends, setFriends] = useState([]);

  // Fetch friends list when the component mounts
  useEffect(() => {
    axios.get('http://18.144.44.28:8000/api/friends/')
      .then(response => setFriends(response.data))
      .catch(error => console.error('Error fetching friends:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://18.144.44.28:8000/api/expenses/', { description, amount, friend })
      .then(response => {
        console.log('Expense added:', response.data);
        setDescription('');
        setAmount('');
        setFriend('');
        toast.success('Expense added successfully!');
      })
      .catch(error => {
        console.error('Error adding expense:', error);
        toast.error('Failed to add expense.');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select value={friend} onChange={e => setFriend(e.target.value)}>
        <option value="">Select Friend</option>
        {friends.map(friend => (
          <option key={friend.id} value={friend.id}>{friend.name}</option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
