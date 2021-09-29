import React, { useState } from "react";

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const signUp = () => {
    console.log(username, email, password, phone);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="phone Number"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <button title="sign up" onClick={signUp}>
        Sign UP
      </button>
    </div>
  );
};

export default SignUp;
