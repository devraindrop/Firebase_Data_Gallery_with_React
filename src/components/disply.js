import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "../css/home.css";

const DisplyData = () => {
    const [data, setData] = useState(null);
    //const [search, setSearch] = useState('');
    const [quantity, setQuantity] = useState(1)
    
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };
  
    const handleDecrement = () => {
      setQuantity(quantity - 1);
    };

        const db = getDatabase()
        const dataRef = ref(db, 'carData');

        useEffect(() => {
            const onDataChange = (snapshot) => {
              const data = snapshot.val();
              console.log(data);
              setData(data);
            };
        const onError = (error) => {
            console.error('Error retrieving data:', error);
          };
        
          const dataListener = onValue(dataRef, onDataChange, onError);
        
          // Clean up the listener when the component unmounts
          return () => {
            dataListener(); // Detach the listener
          };
        }, []);


  return ( 
    <div>
      <div className="products-wrapper">
        {data ? (
        <ul className="products">
        {Object.keys(data).map((key) => (
          <li className="product" key={key}>
            <div>
              <div className="product-image">
                <img src={data[key].img_url}/>
              </div>
              <h4 className="product-name">{data[key].name} - {data[key].company}</h4> 
              <p className="product-price">{data[key].model}</p>
              <div className="product-action">
                <button className="cus-edit-btn" type="button" onClick={() => window.open(data[key].url)}>Go company page</button>
              </div>
              <div className="product-action">
                <button className="cus-delete-btn" type="button" onClick={localStorage.setItem('favorits', JSON.stringify(data[key]))}>Add to favorites</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>Loading data...</p>
    )}

      </div>
    </div>
  );
}
 
export default DisplyData;