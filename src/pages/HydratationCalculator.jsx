import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

// Importer le son de clic
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const HydrationCalculator = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [hydration, setHydration] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (hydration !== null) {
      setShowResult(true);
      const timer = setTimeout(() => setShowResult(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hydration]);

  const handleCalculate = () => {
    clickSound.play();
    if (!weight || isNaN(weight) || !activityLevel) {
      alert("Please enter valid weight and select an activity level.");
      return;
    }
    const weightInKg = parseFloat(weight);
    const activityFactor = activityLevel === 'Low' ? 30 : activityLevel === 'Moderate' ? 35 : 40; // Facteurs d'activité
    const calculatedHydration = weightInKg * activityFactor;
    setHydration(calculatedHydration.toFixed(2));
  };

  const handleReset = () => {
    clickSound.play();
    setWeight('');
    setActivityLevel('');
    setHydration(null);
    setShowResult(false);
  };

  const handleOpenDialog = () => { setOpenDialog(true); clickSound.play(); }
  const handleCloseDialog = () => { setOpenDialog(false); clickSound.play(); }

  return (
    <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.primary.main }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: "30px", borderRadius: theme.shape.borderRadius, background: theme.palette.background.paper }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Typography variant='h3'>Hydration Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  label="Activity Level"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Hydration
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {hydration && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`hydration-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Recommended Hydration: {hydration} ml</Typography>
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
        <DialogTitle>Hydration Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Why is Hydration Important?</strong><br />
            Staying hydrated is crucial for maintaining overall health. Proper hydration helps in regulating body temperature, keeping joints lubricated, and ensuring proper function of organs. It also helps to transport nutrients and oxygen to cells and remove waste products from the body.<br /><br />

            <strong>How to Calculate Your Hydration Needs:</strong><br />
            A common guideline is to drink 30 to 40 milliliters of water per kilogram of body weight, depending on your activity level. For example, if you weigh 70 kilograms and have a high activity level, your recommended water intake would be 70 kg * 40 ml = 2800 ml (2.8 liters) per day.<br />
            This is a general guideline and individual needs may vary based on factors such as activity level, climate, and overall health.
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

export default HydrationCalculator;
