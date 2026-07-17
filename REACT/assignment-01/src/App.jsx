import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import Books from './components/Books.jsx';
import Jokes from './components/Jokes.jsx';

function App() {

  return (
    <>
      <Books />
      <Jokes />
    </>
  );
}

export default App;
