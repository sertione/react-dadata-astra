import React from 'react';
import './App.css';
import 'react-dadata/src/react-dadata.css';
import { AddressSuggestions } from '../../react-dadata/src/AddressSuggestions';


// for dadata server use token and no host
// for local/your backend server use jwt and host
const DADATA_TOKEN = 'some_token';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGlyZG8ucHciLCJjcm1faWQiOiI1YzQ5YWE5MS03MTcwLTRjOTgtYmYxMy02YzcyYTliYWVmYzUiLCJyb2xlIjoib3duZXIiLCJleHAiOjE3MzM0NDY3NTR9.ILbt6PSfem6OHHveP8wDMExTlZl0BsfIHQXphXLKIvo';

function App() {
  if (!JWT_TOKEN) {
    return <div className="App">Пожалуйста, установите ваш API токен для DaData в `example/src/App.tsx:5`</div>;
  }
  return (
    <div className="App">
      <AddressSuggestions jwt={JWT_TOKEN} selectOnBlur host="http://localhost:8000" />
    </div>
  );
}

export default App;
