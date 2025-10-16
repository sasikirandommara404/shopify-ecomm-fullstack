import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';
import "./nav.css";
import Login from '../pages/login.jsx';
import { useState, useRef } from "react";
import AuthLogOut from "../utils/logout.js";


const Navbar = () => {
  const logedin = useSelector((state)=>state.ecommerce.logedIn);
  const userdetails = useSelector((state)=>state.ecommerce.user)
  const [showlogin,setLoginPopUp] = useState(false);
  const navbarCollapseRef = useRef(null);

  // Function to close navbar on mobile after clicking a link
  const closeNavbar = () => {
    const navbarCollapse = navbarCollapseRef.current;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      // Use Bootstrap's collapse method
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        // Fallback: manually remove the 'show' class
        navbarCollapse.classList.remove('show');
      }
    }
  };

  return (
    <div className="main-navbar shadow-sm sticky-top">
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 my-auto d-none d-md-block">
              <NavLink
                to="/"
                className="brand-name"
              >
                Shopfy
              </NavLink>
            </div>

            <div className="col-md-5 my-auto">
              <form role="search">
                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Search your product"
                    className="form-control"
                  />
                  <button className="btn bg-white" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="col-md-5 my-auto">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link"> 
                    <i className="fa fa-shopping-cart"></i> Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/wishlist" className="nav-link">
                    <i className="fa fa-heart"></i> Wishlist
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <i className="fa fa-user"></i>{
                      userdetails ? `${userdetails.email.slice(0,2).toUpperCase()}`:'username'
                    }
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink to="/profile" className="dropdown-item">
                        <i className="fa fa-user"></i> Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/orders" className="dropdown-item">
                        <i className="fa fa-list"></i> My Orders
                      </NavLink>
                    </li>
                    <li>
                      {
                        logedin ?
                        (
                          <button className="dropdown-item" onClick={()=>AuthLogOut()}>
                            <i className="fa fa-sign-out-alt"></i> Logout
                          </button>
                        ):
                        (
                          <button className="dropdown-item" onClick={()=>setLoginPopUp(true)}>
                            <i className="fa fa-sign-in-alt"></i> Login
                          </button>
                        )
                      }
                    </li>
                    <li>
                      <NavLink to="/sellers" className="dropdown-item">
                        <i className="fas fa-hand-holding-dollar"></i> Become Seller
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink
            to="/"
            className="navbar-brand d-block d-md-none"
          >
            Shopfy
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div 
            className="collapse navbar-collapse" 
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={closeNavbar}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/newarrivals" className="nav-link" onClick={closeNavbar}>New Arrivals</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/featuredproducts" className="nav-link" onClick={closeNavbar}>Featured Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/electronics" className="nav-link" onClick={closeNavbar}>Electronics</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/fashion" className="nav-link" onClick={closeNavbar}>Fashions</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/accessories" className="nav-link" onClick={closeNavbar}>Accessories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/appliances" className="nav-link" onClick={closeNavbar}>Appliances</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

   
      {showlogin && <Login onClose={()=>setLoginPopUp(false)}/>}
    </div>
  );
};

export default Navbar;