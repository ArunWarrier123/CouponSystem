import './App.css';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import AdminHome from './Screens/AdminHomeScreen/AdminHome';
import CustomerHome from './Screens/CustomerHomeScreen/CustomerHome';
import PopUp from './Components/PopUpEdit/PopUp';
import CreateCoupon from './Screens/CreateCoupon/createCoupon';
import ProductScreen from './Screens/ProductScreen/ProductScreen';
import LandingScreen from './Screens/LandingScreen/LandingScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main>
      <Routes>

        <Route path='/' element={ <LandingScreen/>}/>
        <Route path='/login' element={ <LoginScreen/>}/>
        <Route path='/register' element={ <RegisterScreen/>}/>
        <Route path='/adminhome' element={ <AdminHome/>}/>
        <Route path='/userhome' element={ <CustomerHome/>}/>
        <Route path='/popup' element={ <PopUp/>}/>
        <Route path='/popupcreate' element={ <CreateCoupon/>}/>
        <Route path='/purchase' element={ <ProductScreen/>}/>

      </Routes>
      </main>
      {/* <Footer/> */}
    </Router>

    );
}

export default App;
