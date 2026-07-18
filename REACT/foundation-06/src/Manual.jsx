import React from 'react';
import { useState } from 'react';

function Manual() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: 'frontend',
    exprience: '',
    cover: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = 'Name is required';
    if(!v.email.trim()) e.email = "email is required"
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return <div>Form submitted successFully: {values.name}</div>;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>
          Name:
          <input type="text" value={values.name} onChange={set('name')} />
          {errors.name && <span>{errors.name}</span>}
        </label>
        <label>
          Email:
          <input type="email" value={values.email} onChange={set('email')} />
          {errors.email && <span>{errors.email}</span>}
        </label>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Manual;
