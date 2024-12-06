import React from 'react';
import './App.css';
import 'react-dadata/src/react-dadata.css';
import { AddressSuggestions } from '../../react-dadata/src/AddressSuggestions';


// for dadata server use token and no host
// for local/your backend server use jwt and host
const DADATA_TOKEN = 'some_token';
const JWT_TOKEN = 'some_jwt';

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
