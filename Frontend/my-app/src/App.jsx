import './App.css';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/productList.jsx';
import EcommerceSlider from './pages/slider.jsx';
import Fashion from './pages/fasion.jsx'
import Electronics from './pages/electronics.jsx'
import Accessories from './pages/accessories.jsx'
import FeaturedProductsPage from './pages/featuredproducts.jsx'
import Appliances from './pages/Appliances.jsx'
import NewArrivals from './pages/newArrivals.jsx'
import ProductDetails from './pages/productPage.jsx'
import api,{ setAccessToken } from './api/axios.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser,updateUserInfo} from './slice/slice.jsx'
import {jwtDecode} from 'jwt-decode'
import Login from './pages/login.jsx';
import ShoppingCartPage from './pages/cartpage.jsx'
import FavoritesPage from './pages/favorites.jsx'
import UserProfilePage from './pages/profile.jsx'


function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const restoreLogin = async ()=>{
      try{
        const existingToken = sessionStorage.getItem('accessToken')
        
        if(existingToken){
          try {
            const decoded = jwtDecode(existingToken)
            
            if(decoded.exp * 1000 > Date.now()){
              setAccessToken(existingToken)
              dispatch(loginUser(true))
              dispatch(updateUserInfo(decoded))
              return 
            }
          } catch(err){
            console.log('Token decode failed:', err)
          }
        }
        
      
        const response = await api.post('/user/refresh/token')
        const newAccessToken = response.data.data.newAccessToken
        setAccessToken(newAccessToken)
        
        const data = jwtDecode(newAccessToken)
        dispatch(loginUser(true))
        dispatch(updateUserInfo(data))

      }catch(error){
        console.log('Restore login failed', error.response?.data || error.message)
        dispatch(loginUser(false))
        dispatch(updateUserInfo(null))
        setAccessToken(null)
      }
    }
    
    restoreLogin()
  },[dispatch])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <EcommerceSlider />
            <ProductList />
          </>
        } />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/fashion' element={<Fashion />} />
        <Route path='/accessories' element={<Accessories />} />
        <Route path='/featuredproducts' element={<FeaturedProductsPage />} />
        <Route path='/appliances' element={<Appliances />} />
        <Route path='/newarrivals' element={<NewArrivals />} />
        <Route path='/productdetails/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<ShoppingCartPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/wishlist' element={<FavoritesPage />}></Route>
        <Route path='/profile' element={<UserProfilePage/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;