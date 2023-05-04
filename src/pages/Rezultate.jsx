import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';
import './web.css';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

function Rezultate() {
  // Declare state variables for search query and search results
  const [searchName, setSearchName] = useState('');
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define chart state
  const [chartData, setChartData] = useState({});

  // Define a function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  // Use useEffect to fetch search results from the database
  useEffect(() => {
    // Set loading state to true while fetching data
    setLoading(true);

    // Define a query to search for messages that match the search query
    const q = query(
      collection(db, 'users'),
      where('name', '==', searchName),
      orderBy('createdAt', 'desc')
    );

    // Subscribe to the query and update state when new data is received
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setText(messages);
      setLoading(false);
    });

    // Unsubscribe from the query when the component unmounts
    return () => unsubscribe();
  }, [searchName]);

  // Use useEffect to update the chart data when the search results change
  useEffect(() => {
    // Define arrays to hold chart data
    const labels = [];
    const data = [];

    // Loop through search results and add data to chart arrays
    text.forEach((message) => {
      labels.push(new Date(message.createdAt.toDate()).toLocaleString());
      data.push(message.text);
    });

    // Define chart data
    const chartData = {
      labels: text.map((message) => new Date(message.createdAt.toDate()).toLocaleString()),
      datasets: [
        {
          label: 'Nivel de oxigen',
          data: text.map((message) => message.text),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          type: 'line',
          label: 'Limita de siguranta',
          data: Array(text.length).fill(90),
          fill: false,
          borderColor: 'red',
          tension: 0.1
        }
      ]
    };

    // Update chart data state
    setChartData(chartData);
  }, [text]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data si ora'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Nivel de oxigen (%)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Nivel de oxigen in timp'
      }
    }
  };

  return (
    <div className='flex flex-col'>
      <input type="text" value={searchName} onChange={handleSearchChange} placeholder="Căutare după numele pacientului" className='search-bar' />
      {loading && <div>Loading...</div>}
      {!loading && text.length > 0 && (
        <div className="">
          <table className="table-auto border-collapse w-full">
            <thead className="table-header">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nume</th>
                <th className="border border-gray-300 px-4 py-2">Nivel de oxigen</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {text.map((message) => (
                <tr key={message.id}>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{message.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{message.text}%</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(message.createdAt.toDate()).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='my-8 w-full md:w-2/3 lg:w-3/4 xl:w-1/2 mx-auto min-h-1/2 table-background'>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

      )}
    </div>
  );
}

export default Rezultate;
