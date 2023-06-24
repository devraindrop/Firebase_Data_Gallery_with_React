import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer';
import Home from './components/home';
import Form from "./components/form";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {<Route path='/AddData' element={<Form />} /> }
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
