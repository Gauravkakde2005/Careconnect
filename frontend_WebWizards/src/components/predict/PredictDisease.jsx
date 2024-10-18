import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function PredictDisease() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [gender, setGender] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [diagnosisResults, setDiagnosisResults] = useState([]);

  useEffect(() => {
    const fetchSymptoms = async () => {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNoeWFtbmtvbGdlMjAyMEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMDczIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyNC0wMy0yMCIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTcxMDkzNTU3NywibmJmIjoxNzEwOTI4Mzc3fQ.inhikkO9R1hI6NhqSNDv6-oKQ2XPxcKQNhDfZwx28F8'; // Ensure you have your actual API key here
      const apiUrl = 'https://healthservice.priaid.ch/symptoms';
      try {
        const response = await axios.get(apiUrl, {
          params: {
            token: token,
            language: 'en-gb',
          },
        });
        setSymptoms(response.data.map(symptom => ({ value: symptom.ID, label: symptom.Name })));
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };
    fetchSymptoms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNoeWFtbmtvbGdlMjAyMEBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMDczIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyNC0wMy0yMCIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTcxMDkzNTU3NywibmJmIjoxNzEwOTI4Mzc3fQ.inhikkO9R1hI6NhqSNDv6-oKQ2XPxcKQNhDfZwx28F8'; // Ensure you have your actual API key here
    const apiUrl = 'https://healthservice.priaid.ch/diagnosis';
    const symptomsArray = selectedSymptoms.map(symptom => symptom.value); // Use selected symptoms for the diagnosis

    try {
      const response = await axios.get(apiUrl, {
        params: {
          token: token,
          symptoms: JSON.stringify(symptomsArray),
          gender: gender,
          year_of_birth: yearOfBirth,
          language: 'en-gb'
        }
      });

      setDiagnosisResults(response.data);
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 border rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          isMulti
          name="symptoms"
          options={symptoms}
          value={selectedSymptoms}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={setSelectedSymptoms}
          placeholder="Select your symptoms..."
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'lightblue',
              primary: 'blue',
            },
          })}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          value={yearOfBirth}
          onChange={(e) => setYearOfBirth(e.target.value)}
          placeholder="Enter year of birth"
          className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
        >
          Get Diagnosis
        </button>
      </form>
      <div className="mt-6">
        {diagnosisResults.length > 0 && (
          <ul className="list-disc pl-5">
            {diagnosisResults.map((result, index) => (
              <li key={index} className="mb-2">
                <p className="font-semibold">Issue: {result.Issue.Name} (Accuracy: {result.Issue.Accuracy}%)</p>
                <p>Specializations: {result.Specialisation.map(spec => spec.Name).join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PredictDisease;