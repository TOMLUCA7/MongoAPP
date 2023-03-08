import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path='/'
          element={
            <Login/>
          }
        />
        <Route 
          path='/Register'
          element={
            <Register/>
          }
        />
        <Route 
          path='/DashBoard'
          element={
            <DashBoard/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
