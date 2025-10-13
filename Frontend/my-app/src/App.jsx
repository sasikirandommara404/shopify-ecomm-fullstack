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
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <>
              <EcommerceSlider></EcommerceSlider>
              <ProductList></ProductList>
            </>
            }>

          </Route>
          <Route path='/electronics' element={<Electronics></Electronics>}></Route>
          <Route path='/fashion' element={<Fashion></Fashion>}></Route>
          <Route path='/accessories' element={<Accessories></Accessories>}></Route>
          <Route path='/featuredproducts' element={<FeaturedProductsPage></FeaturedProductsPage>}></Route>
          <Route path='/appliances' element={<Appliances></Appliances>}></Route>
          <Route path='/newarrivals' element={<NewArrivals/>}></Route>
          <Route path='/productdetails/:id' element={<ProductDetails></ProductDetails>}></Route>
        </Routes>
        
        <Footer />
        
      </>
      
     
    </div>
  );
}

export default App;
