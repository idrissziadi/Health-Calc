import React from 'react';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
function App() {
  return (
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/Home' Component={Home}/>
          <Route path='/About' Component={AboutUs} />
          <Route path='/Contact' Component={ContactUs} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
