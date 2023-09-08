import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componentes/Pages/Home';
import Company from './Componentes/Pages/Company';
import Contact from './Componentes/Pages/Contact';
import NewProject from './Componentes/Pages/NewProject';
import Container from './Componentes/Layout/Container';
import NavBar from './Componentes/Layout/NavBar';
import Footer from './Componentes/Layout/Footer';
import Projects from './Componentes/Pages/Projects';
import ProjectId from './Componentes/Pages/ProjectId';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Container customClass="min-height"><Home /></Container>} />
        <Route path="/projects" element={<Container customClass="min-height"><Projects /></Container>} />
        <Route path="/company" element={<Container customClass="min-height"><Company /></Container>} />
        <Route path="/contact" element={<Container customClass="min-height"><Contact /></Container>} />
        <Route path="/newproject" element={<Container customClass="min-height"><NewProject /></Container>} />
        <Route path="/project/:id" element={<Container customClass="min-height"><ProjectId /></Container>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
