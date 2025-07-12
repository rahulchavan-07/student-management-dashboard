import Add from "./pages/Add"
import Manage from "./pages/Manage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import PrivateRoute from "./pages/PrivateRoute";
function App() {

  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={<Login/>}> </Route>
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/add" element={<Add/>}> </Route>
          <Route path="/manage" element={<Manage/>}> </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>}> </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
