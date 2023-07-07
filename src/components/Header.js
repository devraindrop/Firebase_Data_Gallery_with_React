import {Link,  useNavigate} from 'react-router-dom';
import '../css/home.css';
import Login from './login';
import { useRef } from 'react';

const Header = ({setSearch , mode}) => {
    const History  = useNavigate();
    const refSearch = useRef();
    const handleSearch = (e) => {
        e.preventDefault();
        if(mode === 2){
            History('/');
            return
        }
        setSearch(refSearch.current.value.trim().substr(0, 1).toUpperCase() + refSearch.current.value.trim().substr(1))
        
    }

    return ( 
        <div className="header">
            <header>
                <div className='container'>
                    <div className='brand'>
                        <a href="/">
                            <img 
                            className="logo" 
                            src="logo.png" 
                            alt='logo'/>
                        </a>
                    </div>
                    <div className='nav-links mobile-menu'>
                        <Link className='link' to="/" >Home</Link>
                        <Link className='link' to="/AddData" >AddData</Link>
                    </div>
                    <div className="search">
                        <a className="mobile-search" href="#">
                            <img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" alt='mobile search'/>
                        </a>
                        <form action="#" method="get" className="search-form">
                            <input type="search" 
                                ref = {refSearch}
                                onKeyUp={handleSearch}
                                placeholder="Search Car Name" 
                                className="search-keyword" />
                             <button className="search-button" type="submit" disabled>
                            </button> 
                        </form>
                    </div>
                    <div className='cart'>
                        <div className='wishlist-icon'>
                            <img src="wishlist.png" alt="wishlist" />
                        </div>
                    </div>
                    <Login />
                </div>            
            </header>
        </div>
     );
}
 
export default Header;