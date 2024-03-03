import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetch('http://localhost:3001/records')
      .then(response => response.json())
      .then(data => {
        setCustomers(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      return new Date(a.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = sortedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Customer Management</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="col-md-6">
          <select className="form-control" onChange={handleSortByChange} value={sortBy}>
            <option value="date">Sort by Date</option>
            <option value="time">Sort by Time</option>
          </select>
        </div>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">S. No</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {(currentCustomers.length>0)?(currentCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          )) ): (
            <tr>
              <td colSpan="7" className="text-center">
                <p>No customers found.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination justify-content-center ">
        {Array.from({ length: Math.ceil(sortedCustomers.length / customersPerPage) }, (_, i) => (
          <button key={i} className="btn btn-primary   " onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
