import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './views/users';
import Home from './views/home';
import { Page } from './components/Pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUser from './components/Modals/AddUser';
import EditUser from './components/Modals/EditUser';
import DeleteUser from './components/Modals/DeleteUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Page />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />}>
            <Route path="create" element={<AddUser />} />
            <Route path=":id/edit" element={<EditUser />} />
            <Route path=":id/delete" element={<DeleteUser />} />
          </Route>
          <Route path="*">404</Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
