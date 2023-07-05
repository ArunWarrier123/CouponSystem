import './App.css';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import AdminHome from './Screens/AdminHomeScreen/AdminHome';
import CustomerHome from './Screens/CustomerHomeScreen/CustomerHome';

function App() {
  return (
    <Router>
      <Header/>
      <main>
      <Routes>

        <Route path='/login' element={ <LoginScreen/>}/>
        <Route path='/register' element={ <RegisterScreen/>}/>
        <Route path='/adminhome' element={ <AdminHome/>}/>
        <Route path='/userhome' element={ <CustomerHome/>}/>

      </Routes>
      </main>
      <Footer/>
    </Router>

    );
}

export default App;
