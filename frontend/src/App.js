import logo from './logo.svg';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Clients from './pages/Clients';
import Sales from './pages/Sales';
import Items from './pages/item/Items';
import Navbar from './components/sidenav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <Dashboard /> } />
          <Route path="/clients" element={ <Clients /> } />
          <Route path="/items" element={ <Items /> } />
          <Route path="/sales" element={ <Sales /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
