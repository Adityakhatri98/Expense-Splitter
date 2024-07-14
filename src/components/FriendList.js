import React, { useState, useEffect } from 'react';
import axios from 'axios';


function FriendList() {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState('');
  const [editName, setEditName] = useState('');
  const [editFriendId, setEditFriendId] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = () => {
    axios.get('http://localhost:8000/api/friends/')
      .then(response => setFriends(response.data))
      .catch(error => console.error('Error fetching friends:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/friends/', { name })
      .then(response => {
        console.log('Friend added:', response.data);
        setName('');
        fetchFriends(); // Refresh the friends list
      })
      .catch(error => console.error('Error adding friend:', error));
  };

  const handleEdit = (friend) => {
    setEditFriendId(friend.id);
    setEditName(friend.name);
  };

  const handleSave = (friendId) => {
    axios.put(`http://localhost:8000/api/friends/${friendId}/`, { name: editName })
      .then(response => {
        console.log('Friend updated:', response.data);
        setEditFriendId(null);
        setEditName('');
        fetchFriends(); // Refresh the friends list
      })
      .catch(error => console.error('Error updating friend:', error));
  };

  return (
    <div className="friendlist-container">
      <h2>Friend List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new friend"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Add Friend</button>
      </form>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            {editFriendId === friend.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
                <button onClick={() => handleSave(friend.id)}>Save</button>
              </>
            ) : (
              <>
                {friend.name}
                <button onClick={() => handleEdit(friend)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendList;
