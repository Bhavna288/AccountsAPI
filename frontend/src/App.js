import logo from './logo.svg';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import Items from './pages/Items';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/clients" element={ <Clients /> } />
          <Route exact path="/items" element={ <Items /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
