import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

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
        <div className='w-full min-h-screen bg-gray-400 p-12'>
            <form onSubmit={handleSubmit} className='flex flex-col p-6 items-center justify-center'>
                <label className="block">
                    <span className="text-gray-700">Nume:</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label className="block">
                    <span className="text-gray-700">Email:</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label className="block">
                    <span className="text-gray-700">Nivel de oxigen:</span>
                    <input type="number" value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <button className='mt-4 px-4 py-2 bg-red-500 border-black rounded-xl' type="submit">Trimite</button>
            </form>
        </div>
    );
}

export default Introducere