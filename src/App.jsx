import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Qwikgenhome from './pages/Qwikgenhome';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import './index.css';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [targetService, setTargetService] = useState(null);

  useEffect(() => {
    const titles = {
      "/": "Qwikgen | Home",
      "/about": "Qwikgen | About",
      "/services": "Qwikgen | Services",
      "/process": "Qwikgen | Process",
      "/contact": "Qwikgen | Contact",
    };
    document.title = titles[location.pathname] || "Qwikgen";
  }, [location.pathname]);

  const handleSetPage = (p) => {
    const routes = {
      Home: "/",
      About: "/about",
      Services: "/services",
      Process: "/process",
      Contact: "/contact",
    };
    navigate(routes[p] || "/");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleGoToService = (serviceId) => {
    setTargetService(serviceId);
    navigate("/services");
    // No scroll here — ServicesPage handles it via useLayoutEffect
  };

  return (
    <>
      <Cursor />
      <Navbar page={location.pathname} setPage={handleSetPage} />
      <main>
        <Routes>
          <Route path="/" element={<Qwikgenhome setPage={handleSetPage} goToService={handleGoToService} />} />
          <Route path="/about" element={<AboutPage setPage={handleSetPage} />} />
          <Route path="/services" element={
            <ServicesPage
              setPage={handleSetPage}
              targetService={targetService}
              onServiceHandled={() => setTimeout(() => setTargetService(null), 500)}
            />}
          />
          <Route path="/process" element={<ProcessPage setPage={handleSetPage} />} />
          <Route path="/contact" element={<ContactPage setPage={handleSetPage} />} />
        </Routes>
      </main>
      <Footer setPage={handleSetPage} goToService={handleGoToService} />
    </>
  );
}