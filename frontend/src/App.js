import logo from './logo.svg';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Client from './components/Client';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Client /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
