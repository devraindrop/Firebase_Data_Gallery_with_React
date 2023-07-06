import { useState,useRef } from "react";
import '../css/form.css';
import '../css/home.css'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const [preview, setPreview] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false);
    const [alertShow, setAlertShow] = useState('');

    const notify = (mode,msg) => {
        if(mode === 'success'){
            toast.success(msg, {
            position: toast.POSITION.TOP_CENTER
            });
        }else if(mode === 'error'){
            toast.error(msg, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
 
    const openModal = () =>{
        setPreview(v => !v);
    }    

    const loginMe = (e) =>{
        e.preventDefault();
        const auth = getAuth();
            signInWithEmailAndPassword(auth
                , emailRef.current.value
                , passRef.current.value)

            .then((userCredential) => {
                //console.log('signin',userCredential);
                setLoggedIn(true);
                setAlertShow(notify('success','Login Successfull'))
                const user = userCredential.user;
            })
            .catch((error) => {
               // const errorCode = error.code;
               // const errorMessage = error.message;
                setAlertShow(notify('error','Login failed. Please check your email/password.'))
            });
    }
    
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            //console.log('sign out done.');
            setLoggedIn(false);
            setAlertShow(notify('success','Signed Out Successful'))
            // Sign-out successful
          })
          .catch((error) => {
            // Handle sign-out error
            console.error('Error signing out:', error);
            setAlertShow(notify('error',error.message))
          });
    };
 
    //console.log('login rendered!')

    return ( 
        <div className="login">
            {alertShow !== '' && 
            <div>
            {alertShow}
            </div>
            }

            <div className="container">
            <div className="cart">
            <a className="cart-icon" href="#">
                    <img src="login.png" alt="login" id="2" onClick={openModal}/>
            </a>
                {preview &&
                <div className="cart-preview active" id="1">
                    <div style={{position: "relative", overflow: "hidden", width: "360px", height: '375px'}}>
                        <div style={{position: 'absolute', inset: '0px', overflow: 'scroll', marginRight: '-15px', marginBottom: '-15px'}}>
                            {loggedIn && 
                            <div className="form-container form-container-2">
                            <button onClick={handleLogout}>
                            Logout
                            </button>
                            </div>
                            }
                            {!loggedIn &&
                            <div className="form-container form-container-1">
                                <div className="text">
                                    Signin
                                </div>
                                
                                <form className="inputform" onSubmit={loginMe}>
                                    <div className="form-row">
                                        <div className="input-data">
                                            <input type="text" ref={emailRef} required/>
                                            <div className="underline"></div>
                                            <label>Login</label>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                                <div className="input-data">
                                                <input type="password" ref={passRef} required/>
                                                <div className="underline"></div>
                                                <label>Password</label>
                                                </div>
                                    </div>
                                    <button className="custom-btn" >Signin with email</button>
                                    <button className="custom-btn cus-edit-btn" disabled>Signin with google</button>
                                    <div className="cus-signup">
                                    <p>you have no account? <a href="#">Signup</a></p>
                                    </div>
                                </form>
                            </div>
                            }
                        </div>
                    </div>        
                </div>
                }
                </div>
            </div>
        </div>
     );
}
 
export default Login;