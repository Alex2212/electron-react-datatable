import React from 'react';
import logo from './logo.svg';
import favicon from './favicon.ico';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={favicon} alt="logo" />
        <p>
          This is a test
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          This is also a test
        </a>
      </header>
    </div>
  );
}

export default App;
