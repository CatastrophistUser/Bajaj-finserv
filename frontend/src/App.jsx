import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      setError('');
      const response = await axios.post('http://127.0.0.1:5000/api/endpoint', parsedData);
      setResponseData(response.data);

      setDropdownOptions([
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_alphabet', label: 'Highest alphabet' }
      ]);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { alphabets_array, numbers_array } = responseData;

    let displayData = {};

    selectedOptions.forEach(option => {
      if (option.value === 'alphabets') displayData.alphabets = alphabets_array;
      if (option.value === 'numbers') displayData.numbers = numbers_array;
      if (option.value === 'highest_alphabet') displayData.highest_alphabet = alphabets_array.sort().reverse()[0];
    });

    return (
      <div className="response">
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON API Frontend</h1>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON here'
        rows="10"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {responseData && (
        <Select
          isMulti
          options={dropdownOptions}
          onChange={handleSelectChange}
        />
      )}
      {renderResponse()}
    </div>
  );
};

export default App;
