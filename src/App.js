import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://server-app-xn5o.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1>O seu ajudante para evitar o desperdício!</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message} 
          placeholder="Coloque aqui os ingredientes que possui"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {response && 
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <b>Assistente:</b> {response}
        </div>
      }
    </div>
  );
  
}

export default App;
