import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Service from './pages/Service';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './custom-bootstrap.scss';
import Pharmacies from './pages/services/Pharmacie';
import Appointement from './pages/services/Appointement';
import Hopital from './pages/services/Hopital';

function App() {
  console.log('App component rendered');
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/Hopital" element={<Hopital />} />
        <Route path="/appointement" element={<Appointement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
