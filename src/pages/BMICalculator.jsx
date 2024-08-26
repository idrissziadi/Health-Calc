import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Utiliser le thème
import { motion } from 'framer-motion'; // Importer Framer Motion pour les animations
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { Howl } from 'howler';

// Import the click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const BMICalculator = () => {
  const theme = useTheme(); // Utilisation du contexte de thème
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (bmi !== null) {
      setShowResult(true);
      const timer = setTimeout(() => setShowResult(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [bmi]);

  const handleCalculate = () => {
    clickSound.play();
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      alert("Please enter valid height and weight.");
      return;
    }
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setCategory('Normal weight');
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const handleReset = () => {
    clickSound.play();
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setShowResult(false);
  };

  const handleOpenDialog = () => {setOpenDialog(true); clickSound.play()}
  const handleCloseDialog = () => {setOpenDialog(false); clickSound.play()}

  return (
    <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.primary.main }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: "30px", borderRadius: theme.shape.borderRadius, background: theme.palette.background.paper }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Typography variant='h3'>BMI Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Height (cm)"
                variant="outlined"
                fullWidth
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate BMI
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {bmi && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`bmi-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Your BMI: {bmi}</Typography>
                  <Typography variant='h6'>Category: {category}</Typography>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button 
                color='secondary'
                variant='contained' 
                size='large' 
                onClick={() => { navigate('/Home') ; clickSound.play();}} // Redirection vers /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>BMI Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>What is BMI?</strong><br />
            Body Mass Index (BMI) is a measure of body fat based on your weight in relation to your height. It is used to categorize individuals into different weight categories: underweight, normal weight, overweight, and obesity.<br /><br />

            <strong>BMI Categories:</strong><br />
            - Underweight: BMI less than 18.5<br />
            - Normal weight: BMI 18.5 to 24.9<br />
            - Overweight: BMI 25 to 29.9<br />
            - Obesity: BMI 30 or more<br /><br />

            <strong>How to Calculate BMI:</strong><br />
            The formula for calculating BMI is:<br />
            BMI = weight (kg) / (height (m) x height (m))<br />
            For height in centimeters, convert it to meters by dividing by 100.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BMICalculator;
