import React, { useEffect, useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import axios from 'axios'
import { db } from '../firebase'
import './Introducere.css'

function Introducere() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

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
      setMessage(response.data.field1);
    };
    fetchData();
  }, []);


  const isDisabled = name === '' || email === '' || message === '';

  return (

    <div className="w-full min-h-screen bg-gray-400 p-12">

      <div className="flex flex-col p-6 font-bold items-center justify-center text-2xl">
        <h1 className='mb-6'>Real time Pulse :</h1>
        <iframe width="450" height="260" src="https://thingspeak.com/channels/2132916/widgets/643941"></iframe>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 items-center justify-center"
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-bold text-xl mb-2">
            Nume: <br></br>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-style"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-bold text-xl mb-2">
            Email: <br></br>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-style"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-bold text-xl mb-2">
            Nivel de oxigen: <br></br>
          </span>
          <input
            type="number"
            onChange={(e) => setMessage(e.target.value)}
            className="input-style"
            placeholder="Nivel de oxigen"
            value={message}
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
