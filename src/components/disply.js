import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, query, orderByChild, startAt, endAt } from "firebase/database";
import "../css/home.css";
import Header from "./Header";

const DisplyData = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    
        const db = getDatabase()
        const dataRef = ref(db, 'carData');

        useEffect(() => {
            const onDataChange = (snapshot) => {
              const data = snapshot.val();
              //console.log("data",data);
              setData(data);
            };
            const onError = (error) => {
              console.error('Error retrieving data:', error);
            };
        
            //const dataListener = onValue(dataRef, onDataChange, onError);
            //const searchValue="honda"

            const searchQuery = query(dataRef,  orderByChild('name'),startAt(search),endAt(search + '\uf8ff'));
            //const searchQuery = query(dataRef, orderByChild('company'), startAt(''), endAt('\uf8ff'));

            const dataListener = onValue(searchQuery, onDataChange, onError);
        
          // Clean up the listener when the component unmounts
          return () => {
            dataListener(); // Detach the listener 
          };
        }, [search]);


  return ( 
    <div>
      <Header setSearch={setSearch} mode={1} />
      <div className="products-wrapper">
        {data ? (
        <ul className="products">
        {Object.keys(data).map((key) => (
          <li className="product" key={key}>
            <div>
              <div className="product-image">
                <img src={data[key].img_url} alt="car"/>
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
      <>
      <section className="sec-loading">
      <div className="one">
      </div>
      </section>
      </>
    )}

      </div>
    </div>
  );
}
 
export default DisplyData;