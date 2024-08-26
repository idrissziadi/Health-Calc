import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Utiliser le thème
import { motion } from 'framer-motion'; // Importer Framer Motion pour les animations
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { Howl } from 'howler';

// Import the click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const BesoinCalorique = () => {
  const theme = useTheme(); // Utilisation du contexte de thème
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [activity, setActivity] = useState('Moderate: exercise 4-5 times/week');
  const [calories, setCalories] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCalculate = () => {
    clickSound.play();
    if (!age || !weight || !height || isNaN(age) || isNaN(weight) || isNaN(height)) {
      alert("Please enter valid age, weight, and height.");
      return;
    }

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    let bmr;

    if (gender === 'Male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    let activityFactor;
    switch (activity) {
      case 'Sedentary: little or no exercise':
        activityFactor = 1.2;
        break;
      case 'Lightly active: light exercise/sports 1-3 days/week':
        activityFactor = 1.375;
        break;
      case 'Moderate: exercise 4-5 times/week':
        activityFactor = 1.55;
        break;
      case 'Very active: hard exercise/sports 6-7 days a week':
        activityFactor = 1.725;
        break;
      case 'Extra active: very hard exercise/physical job':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.55;
    }

    const dailyCalories = bmr * activityFactor;
    setCalories(dailyCalories.toFixed(2));

    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  const handleReset = () => {
    clickSound.play();
    setAge('');
    setWeight('');
    setHeight('');
    setGender('Male');
    setActivity('Moderate: exercise 4-5 times/week');
    setCalories(null);
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
              <Typography variant='h3'>Calculateur de Besoin Calorique</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
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

            <Grid item xs={12} sx={{ marginBottom: "20px" }}>
              <TextField
                select
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                fullWidth
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "20px" }}>
              <TextField
                select
                label="Activity Level"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant="outlined"
                fullWidth
              >
                <option value="Sedentary: little or no exercise">Sedentary: little or no exercise</option>
                <option value="Lightly active: light exercise/sports 1-3 days/week">Lightly active: light exercise/sports 1-3 days/week</option>
                <option value="Moderate: exercise 4-5 times/week">Moderate: exercise 4-5 times/week</option>
                <option value="Very active: hard exercise/sports 6-7 days a week">Very active: hard exercise/sports 6-7 days a week</option>
                <option value="Extra active: very hard exercise/physical job">Extra active: very hard exercise/physical job</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Calories
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {calories && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`calories-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Your Daily Calorie Need: {calories} kcal</Typography>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button 
                color='secondary'
                variant='contained' 
                size='large' 
                onClick={() => { navigate('/Home'); clickSound.play(); }} // Redirection vers /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Calorie Calculator Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>What is a Calorie Calculator?</strong><br />
            A calorie calculator estimates the number of calories you need to consume each day to maintain your weight, based on factors like age, weight, height, gender, and activity level.<br /><br />

            <strong>Factors Considered:</strong><br />
            - <strong>Age:</strong> Affects your basal metabolic rate (BMR).<br />
            - <strong>Weight:</strong> Heavier individuals require more calories.<br />
            - <strong>Height:</strong> Taller individuals require more calories.<br />
            - <strong>Gender:</strong> Generally, males require more calories than females.<br />
            - <strong>Activity Level:</strong> More active individuals require more calories.<br /><br />

            <strong>Tips for Calorie Management:</strong><br />
            - Balance calorie intake with physical activity.<br />
            - Monitor portion sizes.<br />
            - Choose nutrient-dense foods.
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

export default BesoinCalorique;
