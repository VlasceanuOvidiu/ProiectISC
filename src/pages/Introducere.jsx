import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './introducere.css'

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

    return (
        <div className="w-full min-h-screen bg-gray-400 p-12">
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-style"
              />
            </label>
            <button className="mt-4 px-4 py-2 bg-red-500 border-black rounded-xl" type="submit">
              Trimite
            </button>
          </form>
        </div>
      );
}

export default Introducere
