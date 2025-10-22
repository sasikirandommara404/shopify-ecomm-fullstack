import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../slice/slice.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import AddToCart from '../utils/cart.js';
import addToFavorite from '../utils/addtofavorite.js'
import { showError } from '../utils/toast.jsx';


export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ecommerce.productsList);
  const navigate = useNavigate()
  const user = useSelector(state=>state.ecommerce.user)
  const addtocart = (productId)=>{
    AddToCart(productId,user?.userId)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallproducts/home');
        console.log(response.data.data.products);
        dispatch(setProducts(response.data.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]); 
  const onProductLink = (id)=>{
    navigate(`/productdetails/${id}`)

  }

  const addtowishlist = (id)=>{
    if(!user){
      showError("Please login to add product in wishlist")
      return
    }
    addToFavorite(id,user.userId)
  }
  
  return (

    <div className="py-3 py-md-5 bg-light">
      <div className="container">
        <div className="row">

          {products && products.length > 0 ? (
            products.map((product) => (
              <div className="col-6 col-md-3 mb-4" key={product._id}>
                <div className="product-card">
                  <div className="product-card-img">
                    <img src={product.productImage[0]?.url} alt={product.productName} />
                  </div>
                  <div className="product-card-body">
                    <p className="product-brand">{product.productCategory[0]}</p>
                    <h5 className="product-name">
                      <a href="#">{product.productName}</a>
                    </h5>
                    <div>
                      <span className="selling-price">₹{product.productPrice}</span>
                      <span className="original-price">₹{Math.floor(product.productPrice * 1.2)}</span>
                    </div>
                    <div className="mt-2 button-row">
                      <button onClick={()=>addtocart(product.id)} className="btn btn1">Add To Cart</button>
                      <button onClick ={()=>addtowishlist(product.id)} className="btn btn1"><i className="fa fa-heart"></i></button>
                      <button onClick={()=>onProductLink(product.productId)} className="btn btn1">View</button>
                      <span className={`stock-badge ${product.productStock > 0 ? "bg-success" : "bg-danger"}`}>
                        {product.productStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductList;