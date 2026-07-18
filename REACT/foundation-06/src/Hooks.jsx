import React from 'react';
import { useForm } from 'react-hook-form';

function Hooks() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm({ defaultValues: { name: 'Abhimanyu' }, mode: 'onTouched' });

  if (isSubmitSuccessful) {
    return (
      <div>
        <h1>Form submit successfully</h1>
      </div>
    );
  }

  function submit(data) {
    return new Promise((res) => console.log('Submitted', data));
  }
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <label>
          Full Name
          <input {...register('name', { required: 'Name is required' })} />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label>
          Email
          <input {...register('email', { required: 'Email is required' })} />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting....' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Hooks;
