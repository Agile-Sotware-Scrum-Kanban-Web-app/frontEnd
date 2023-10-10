
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/dashboard/Header';
import Hero from './components/dashboard/Hero';
import Section from './components/dashboard/Section';
import Testimonial from './components/dashboard/Testimonial';
import ContactUs from './components/dashboard/ContactUs';
import Footer from './components/dashboard/Footer';
import AboutUs from './components/dashboard/AboutUs';
import SignIn from './pages/SignIn'; // Import your SignIn component
import SignUp from './pages/SignUp'; // Import your SignUp component

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        {/* Other routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Hero />
      <Section />
      <AboutUs />
      <Testimonial />
      <ContactUs />
      <Footer />
      </ThemeProvider>
    </Router>

  );
}

export default App;
