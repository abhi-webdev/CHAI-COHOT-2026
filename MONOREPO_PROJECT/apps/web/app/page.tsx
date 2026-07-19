"use client"

import { useState } from 'react';
import { createUserSchema } from '@MONOREPO_PROJECT/utils';
import { SubmitEvent } from 'react';
import axios from 'axios';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: SubmitEvent) {
    setError('');
    setSuccess('');
    e.preventDefault();
    const result = createUserSchema.safeParse({ name, email, password });

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      setError(message);
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/users',
        result.data,
      );
      setSuccess('User created successfully');
    } catch (error) {
      setError('Some user messages occured');
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} noValidate={true}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p> }
        {success && <p>{success}</p> }
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
