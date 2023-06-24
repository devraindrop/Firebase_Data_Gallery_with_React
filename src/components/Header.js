import { Link } from 'react-router-dom';
import '../css/home.css';
import Login from './login';

const Header = () => {
    return ( 
        <div className="header">
            <header>
                <div className='container'>
                    <div className='brand'>
                        <img 
                        className="logo" 
                        src="logo.png" />
                    </div>
                    <div className='nav-links mobile-menu'>
                        <Link className='link' to="/" >Home</Link>
                        <Link className='link' to="/AddData" >AddData</Link>
                    </div>
                    <div className="search">
                        <a className="mobile-search" href="#">
                            <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" />
                        </a>
                        <form action="#" method="get" className="search-form">
                            <a className="back-button" href="#">
                                <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"/>
                            </a>
                            <input type="search" placeholder="Search for item in Store" className="search-keyword" />
                            <button className="search-button" type="submit">
                            </button>
                        </form>
                    </div>
                    <div className='cart'>
                        <div className='wishlist-icon'>
                            <img src="wishlist.png" alt="wishlist" />
                        </div>
                        {/* <div className="cart-preview active" id="1">
                            <div style={{position: "relative", overflow: "hidden", width: "360px", height: '375px'}}>
                            <div style={{position: 'absolute', inset: '0px', overflow: 'scroll', marginRight: '-15px', marginBottom: '-15px'}}>

                            </div>
                            </div>
                            
                    </div> */}
                    </div>
                    <Login />
                </div>            
            </header>
        </div>
     );
}
 
export default Header;