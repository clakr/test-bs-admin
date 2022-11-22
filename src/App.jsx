import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './views/users';
import Home from './views/home';
import { Page } from './components/Pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Page />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="*">404</Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
