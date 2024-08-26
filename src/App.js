import React from 'react';
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import BMICalculator from './pages/BMICalculator';
import CalorieCounter from './pages/CalorieCounter';
import SleepTracker from './pages/SleepTracker';
import BesoinCalorique from './pages/BesoinCalorique';
import HydratationCalculator from './pages/HydratationCalculator';
function App() {
  return (
    <ThemeProvider theme={theme}> 
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/Home' Component={Home}/>
          <Route path='/About' Component={AboutUs} />
          <Route path='/Contact' Component={ContactUs} />
          <Route path='/bmicalculator' Component={BMICalculator} />
          <Route path='/caloriecounter' Component={CalorieCounter} />
          <Route path='/sleeptracker' Component={SleepTracker} />
          <Route path='/besoincalorique' Component={BesoinCalorique} />
          <Route path='/hydratationcalculator' Component={HydratationCalculator} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
