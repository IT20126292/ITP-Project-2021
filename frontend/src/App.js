import './App.css';
import CreateAdmin from './Components/CreateAdmin';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Alladmins from './Components/Alladmins';
import Admindetails from './Components/Admindetails';
import UpdateAdmin from './Components/UpdateAdmin';
import Footer from './Components/Footer';
import WelcomeToAdmin from './Components/WelcomeToAdmin';
import AdminPanel from './Components/AdminPanel';

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={WelcomeToAdmin}/>
        <Route path="/home" exact component={AdminPanel}/>
        <Route path="/home" exact component={Alladmins}/>
        <Route path="/add" exact component={CreateAdmin}/>
        <Route path="/posts/:id" exact component={Admindetails}/>
        <Route path="/edit/:id" exact component={UpdateAdmin}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
