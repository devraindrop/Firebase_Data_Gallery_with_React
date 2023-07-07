import { ToastContainer } from 'react-toastify';
import Footer from './components/footer';
import Form from "./components/form";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import DisplyData from './components/disply';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplyData />} />
          {<Route path='/AddData' element={<Form />} /> }
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
