import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseConfig from '../firebase';
import '../css/form.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Form = () => {

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const [img, setImg] = useState('');
  const [url, setURL] = useState('');
  const [alertShow, setAlertShow] = useState('');

    const notify = (mode,msg) => {
        if(mode == 'success'){
            toast.success(msg, {
            position: toast.POSITION.TOP_CENTER
            });
        }else if(mode == 'error'){
            toast.error(msg, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }


  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      company: company,
      model: model,
      img_url: img,
      url: url
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
    <div className='form-container'>
      <div className="text">
         Insert Your Data
      </div>
      <form className='inputform' onSubmit={submitHandler}>
      <div className="form-row">
            <div className="input-data">
               <input type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required />
               <div className="underline"></div>
               <label>Car Name</label>
            </div>
            <div className="input-data">
               <input type="text" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)}
                required />
               <div className="underline"></div>
               <label>Company Name</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="number" 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                required />
               <div className="underline"></div>
               <label>Model</label>
            </div>
            <div className="input-data">
               <input type="text" 
                value={img} 
                onChange={(e) => setImg(e.target.value)} 
                required />
               <div className="underline"></div>
               <label>Image Url</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" 
                value={url} 
                onChange={(e) => setURL(e.target.value)}
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
