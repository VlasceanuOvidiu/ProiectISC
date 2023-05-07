import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import axios from 'axios'
import { db } from '../firebase'
import './Introducere.css'

function Introducere() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pulse, setPulse] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageDB = {
      text: message,
      name: name,
      createdAt: serverTimestamp(),

    }

    await addDoc(collection(db, 'users'),
      messageDB
    )

    setName('');
    setEmail('');
    setMessage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.thingspeak.com/channels/2132916/fields/1/last.json'
      );
      setPulse(response.data.field1);
    };
    fetchData();
  }, []);
  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if (!value.match(nameRegex)) {
      setNameError('Introduceti un nume valid');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /\S+@\S+\.\S+/;
    if (!value.match(emailRegex)) {
      setEmailError('Introduceti o adresa de email valida');
    } else {
      setEmailError('');
    }
  };

  const isDisabled = name === '' || email === '' || message === '';

  return (
    <div className="w-full min-h-screen bg-gray-400 p-12">
      <form onSubmit={handleSubmit} className="flex flex-col p-6 items-center justify-center">
        <label className="block mb-4">
          <span className="text-gray-700 font-bold text-xl mb-2">Nume: <br /></span>
          <input type="text" value={name} onChange={handleNameChange} className="input-style" />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-bold text-xl mb-2">Email: <br /></span>
          <input type="email" value={email} onChange={handleEmailChange} className="input-style" />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </label>

        <label className="block mb-4">
          <span className='text-gray-700 font-bold text-xl mb-2'>Pulsul in timp real: <br /></span>
          <input
            type="text"
            value={pulse}
            readOnly={true}
            className="input-style"
          />
        </label>
        <button
          className="mt-4 px-4 py-2 bg-red-500 border-black rounded-xl"
          type="submit"
          disabled={isDisabled}
        >
          Trimite
        </button>
      </form>
    </div>
  );
}

export default Introducere
