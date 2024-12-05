import React from 'react';
import './App.css';
import 'react-dadata/src/react-dadata.css';
import { AddressSuggestions } from '../../react-dadata/src/AddressSuggestions';


// token now handled by backend, so we don't need it here
const DADATA_TOKEN = 'some_token';

function App() {
  if (!DADATA_TOKEN) {
    return <div className="App">Пожалуйста, установите ваш API токен для DaData в `example/src/App.tsx:5`</div>;
  }
  return (
    <div className="App">
      <AddressSuggestions token={DADATA_TOKEN} selectOnBlur host="http://localhost:8000" />
    </div>
  );
}

export default App;
