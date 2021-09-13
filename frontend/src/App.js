import './App.css';
import CreateAdmin from './Components/CreateAdmin';
// import Header from './Components/Header';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Alladmins from './Components/Alladmins';
import Admindetails from './Components/Admindetails';
import UpdateAdmin from './Components/UpdateAdmin';
import AdminPanel from './Components/AdminPanel';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <AdminPanel/>
      <div>
        {/* <Header/> */}
        <br/><br/><br/><br/>
        <Route path="/" exact component={Alladmins}/>
        <Route path="/add" exact component={CreateAdmin}/>
        <Route path="/posts/:id" exact component={Admindetails}/>
        <Route path="/edit/:id" exact component={UpdateAdmin}/>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
