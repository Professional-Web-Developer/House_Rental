import React, { useState } from 'react';
import axios from 'axios';

const Forgetpasswordemail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

//to send the mail to user for update the forget password

// function for send the mail to user and backend connectivity
  async function update() {
    try {
      const response = await axios.post('/forget-password', { email });
      setMessage('Password reset link has been sent to your email.');
      setError('');
    } catch (err) {
      setError('Error sending password reset link. Please try again.');
      setMessage('');
    }
  }

  return (
    <div className="min-h-full p-20 text-center m-52 bg-green-300">
      <h2 className="text-2xl">Enter Email to change password</h2>
      <div className="mt-5">
        <label className="text-xl mr-5">Email</label>
        <input
          className="max-w-44"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* input for email */}
      </div>
      <button className="bg-white p-2 mt-5" onClick={update}>
        Update Password
      </button>
      {/* button to sent the mail */}
      {message && <p className="text-green-500 mt-5">{message}</p>}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Forgetpasswordemail;
