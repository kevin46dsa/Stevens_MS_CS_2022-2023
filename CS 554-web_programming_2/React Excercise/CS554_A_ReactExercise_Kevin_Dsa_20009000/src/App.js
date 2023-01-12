import React from 'react';
import logo from './img/tvm-header-logo.png';
import './App.css';
//import ShowList from './components/ShowList';
import Show from './components/Show';
import Home from './components/Home';
import Showlistbypage from './components/ShowListbypage';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>
            Welcome to the React.js TV Maze API Example
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/shows/page/0'>
            Shows
          </Link>
          {/*<Link className='showlink' to='/shows/page/0'>
            Showsbypage
          </Link>  */}
          
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shows/page/:id' element={<Showlistbypage />} />
            <Route path='/shows/:id' element={<Show />} />
           {/* <Route path='/shows/page/:id' element={<Showlistbypage />} /> */} 
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
