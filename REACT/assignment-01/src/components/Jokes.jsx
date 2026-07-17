import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function laughingJokes() {
      try {
        const response = await fetch(
          'https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%2Cid%2Ccontent&page=1',
        );
        const data = await response.json();
        const jokesArr = data?.data?.data || [];

        setJokes(jokesArr);
      } catch (error) {
        setError('failed to load Jokes');
      }
    }

    laughingJokes();
  }, []);

  return (
    <>
      <div className="section">
        <h1>😂 Science Jokes</h1>

        <div className="joke-container">
          {jokes.map((joke) => (
            <div className="joke-card" key={joke.id}>
              <p>{joke.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Jokes;
