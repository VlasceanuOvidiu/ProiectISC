import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import './Introducere.css'

function Introducere() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
	setShowSuccessMessage(true);
    };
    
    const isDisabled = name === '' || email === '' || message === '';

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
         <button
              className="mt-4 px-4 py-2 bg-red-500 border-black rounded-xl"
              type="submit"
              disabled={isDisabled}
            >
              Trimite
            </button>
          </form>
          <div class="container">
	          <div class="content">
		          <div class="heart-rate">
		        	  <svg >
                          <polyline fill="none" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"/>
                      </svg>
                      <div class="fade-in"> </div>
                      <div class="fade-out"> </div>
		          </div>
		   </div>
	   </div> 
	{showSuccessMessage && <p className="text-black-500 items-center justify-center ">Inregistrarea a fost facuta cu succes</p>}
        </div>
      );
}

export default Introducere
