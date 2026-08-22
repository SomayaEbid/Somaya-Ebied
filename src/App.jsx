import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Qualifications from './components/sections/Qualifications';
import Certifications from './components/sections/Certifications';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Qualifications />
      <Certifications />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
