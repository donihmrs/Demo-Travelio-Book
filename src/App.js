import './App.css';
import BookIndex from './components/book/index'
import Header from './layouts/header'
import Footer from './layouts/footer'

import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
            <Routes>
              <Route path="/" element={<BookIndex />} />
              <Route path="/wishlist" element={<Footer />} />
            </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
