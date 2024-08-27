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
import FatMassCalculator from './pages/FatMassCalculator ';
import MuscleGains from './pages/MuscleGains';
import DueDateCalculator from './pages/DueDateCalculator';
import RestingHeartRate from './pages/RestingHeartRate';
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
          <Route path='/fatmasscalculator' Component={FatMassCalculator} />
          <Route path='/musclegains' Component={MuscleGains} />
          <Route path='/duedate' Component={DueDateCalculator} />
          <Route path='/restingheartrate' Component={RestingHeartRate} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
