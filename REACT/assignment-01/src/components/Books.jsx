import React from 'react';
import { useState, useEffect } from 'react';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.freeapi.app/api/v1/public/books?page=1&limit=10&inc=kind%2Cid%2Cetag%2CvolumeInfo&query=tech',
        );
        const data = await response.json();
        const bookData = data?.data?.data;
        setBooks(bookData);
      } catch (error) {
        setError('Failed to fetch book');
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, []);

  return (
    <>
      <div className="section">
        <h1>📚 Books</h1>

        <div className="book-container">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <h2>{book.volumeInfo.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
