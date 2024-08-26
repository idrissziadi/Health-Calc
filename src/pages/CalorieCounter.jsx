import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

const clickSound = new Howl({ src: ['/assets/button.wav'] });

const CalorieCounter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [calories, setCalories] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCalculate = () => {
    clickSound.play();
    if (!age || !weight || !height || isNaN(age) || isNaN(weight) || isNaN(height)) {
      alert("Please enter valid age, weight, and height.");
      return;
    }
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    setCalories(bmr.toFixed(2));
    setShowResult(true);
  };

  const handleReset = () => {
    clickSound.play();
    setAge('');
    setWeight('');
    setHeight('');
    setCalories(null);
    setShowResult(false);
  };

  const handleOpenDialog = () => {setOpenDialog(true); clickSound.play()}
  const handleCloseDialog = () => {setOpenDialog(false);clickSound.play()}

  return (
    <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.primary.main }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: "30px", borderRadius: theme.shape.borderRadius, background: theme.palette.background.paper }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Typography variant='h3'>Calorie Counter</Typography>
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
                label="Weight (kg)"
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <TextField
                label="Gender"
                select
                SelectProps={{ native: true }}
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{ marginBottom: "20px" }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Calories
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
            </Grid>

            {calories && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`calorie-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Your Daily Caloric Needs: {calories} kcal</Typography>
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
              <Button 
                color='primary'
                variant='outlined' 
                size='large'
                onClick={handleOpenDialog} 
                sx={{ ml: 2 }}
              >
                Learn More
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Calorie Calculator Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Mifflin-St Jeor Equation:</strong><br />
            For men: BMR = 10W + 6.25H - 5A + 5<br />
            For women: BMR = 10W + 6.25H - 5A - 161<br /><br />

            <strong>Revised Harris-Benedict Equation:</strong><br />
            For men: BMR = 13.397W + 4.799H - 5.677A + 88.362<br />
            For women: BMR = 9.247W + 3.098H - 4.330A + 447.593<br /><br />

            <strong>Katch-McArdle Formula:</strong><br />
            BMR = 370 + 21.6(1 - F)W<br />
            Where:<br />
            W is body weight in kg<br />
            H is body height in cm<br />
            A is age<br />
            F is body fat in percentage
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

export default CalorieCounter;
