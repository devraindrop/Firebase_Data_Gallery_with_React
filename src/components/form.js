import { useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseConfig from '../firebase';
import '../css/form.css';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './Header';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Form = () => {
  const nameRef = useRef();
  const companyRef = useRef();
  const modelRef = useRef();
  const imgRef = useRef();
  const urlRef = useRef();
  //const [name, setName] = useState('');
  //const [company, setCompany] = useState('');
  //const [model, setModel] = useState('');
  //const [img, setImg] = useState('');
  //const [url, setURL] = useState('');
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


  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef,
      company: companyRef,
      model: modelRef,
      img_url: imgRef,
      url: urlRef
    }

    try{
      await push(ref(database, 'carData'), data);
      console.log('Data added successfully');
      setAlertShow(notify('success','Data add Successfull'))
    } catch(error) {
      console.error('Error adding data:', error);
      setAlertShow(notify('error','Please login first'))
    };

    //setName('')

  }
  return ( 
   <div>
      <Header mode={2}/>
      {alertShow !== '' && 
         <div>
            {alertShow}
         </div>
      }
    <div className='form-container'>
      <div className="text">
         Insert Your Data
      </div>
      <form className='inputform' onSubmit={submitHandler}>
      <div className="form-row">
            <div className="input-data">
               <input type="text" 
                //value={name} 
                //onChange={(e) => setName(e.target.value.trim().substr(0, 1).toUpperCase() + e.target.value.trim().substr(1))}
                ref={nameRef}
                required />
               <div className="underline"></div>
               <label>Car Name</label>
            </div>
            <div className="input-data">
               <input type="text" 
                //value={company} 
                //onChange={(e) => setCompany(e.target.value.trim().substr(0, 1).toUpperCase() + e.target.value.trim().substr(1))}
                ref={companyRef}
                required />
               <div className="underline"></div>
               <label>Company Name</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="number" 
                //value={model} 
                //onChange={(e) => setModel(e.target.value)}
                ref={modelRef}
                required />
               <div className="underline"></div>
               <label>Model</label>
            </div>
            <div className="input-data">
               <input type="text" 
                //value={img} 
                //onChange={(e) => setImg(e.target.value)} 
                ref={imgRef}
                required />
               <div className="underline"></div>
               <label>Image Url</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" 
                //value={url} 
                //onChange={(e) => setURL(e.target.value)}
                ref={urlRef}
                required />
               <div className="underline"></div>
               <label>Company page Url</label>
            </div>
         </div>
        <button className='submit-btn custom-btn'>Submit</button>
      </form>
    </div>
    </div>
   );
}
 
export default Form;
