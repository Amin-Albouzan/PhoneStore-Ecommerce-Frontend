import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/LoginComponents/Login';
import Navbar from './Components/Navbar/Navbar';
import AdminHome from './Components/AdminHome/AdminHome';
import AdminNavbar from './Components/AdminNavbar/AdminNavbar';
import Home from './Components/Home/Home';
import AdminEditProduct from './Components/AdminEditProductComponent/AdminEditProduct';
import CreateAcount from './Components/CreateAcountComponents/CreateAcount';
import AddNewProduct from './Components/AdminAddNewProductComponent/AddNewProduct';
import Cart from './Components/Cart/Cart';
import ComingSoon from './Components/Coming_Soon/ComingSoon';
import LoginNavbar from './Components/Login Navbar/LoginNavbar';
import AdminLogin from './Components/Admin Login Component/AdminLogin';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyShopping_List from './Components/MyShopping_List/MyShopping_List';
import UserDashboard from './Components/Admin User Dashboard/UserDashboard';
import ShoppingList from './Components/Admin Shopping List/ShoppingList';
import CategoriesList from './Components/Admin Categories List/CategoriesList';



const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
    locale: 'en'
};


function App() {
  return (
    <div >

<Elements stripe={stripePromise} options={options}>
   <Routes>

    <Route path='' element={<><LoginNavbar/><Login/></>}></Route>
    <Route path='/Admin' element={<><LoginNavbar/><AdminLogin/></>}></Route>
    <Route path='/Coming_Soon' element={<><Navbar/><ComingSoon/></>}></Route>
    <Route path='/CreateAccount' element={<><LoginNavbar/><CreateAcount/></>}></Route>
    <Route path='/Home' element={<><Navbar></Navbar><Home/></>}></Route>
    <Route path='/Admin/Home' element={<><AdminNavbar/><AdminHome/></>}></Route>
    <Route path='/Admin/AddNewProduct' element={<><AdminNavbar/><AddNewProduct/></>}></Route>
    <Route path='/Admin/EditProduct/:params' element={<><AdminNavbar/><AdminEditProduct/></>}></Route>
    <Route path='/Cart' element={<><Navbar/><Cart/></>}></Route>
    <Route path='/MyShopping_List' element={<><Navbar/><MyShopping_List/></>}></Route>
    <Route path='/Admin/User_Dashboard' element={<><AdminNavbar/><UserDashboard/></>}></Route>
    <Route path='/Admin/Shopping_List' element={<><AdminNavbar/><ShoppingList/></>}></Route>
    <Route path='/Admin/Categories_List' element={<><AdminNavbar/><CategoriesList/></>}></Route>
    


   </Routes>

   </Elements>

      
    </div>
  );
}

export default App;
