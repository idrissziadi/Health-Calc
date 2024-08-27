import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

// Import click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const MuscleGains = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [dietQuality, setDietQuality] = useState('');
  const [muscleGains, setMuscleGains] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (muscleGains !== null) {
      setShowResult(true);
      const timer = setTimeout(() => setShowResult(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [muscleGains]);

  const handleCalculate = () => {
    clickSound.play();
    if (!age || isNaN(age) || !weight || isNaN(weight) || !height || isNaN(height) || !workoutFrequency || !dietQuality) {
      alert("Please enter valid data for all fields.");
      return;
    }

    const ageInYears = parseFloat(age);
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const workoutFactor = workoutFrequency === 'Low' ? 1.2 : workoutFrequency === 'Moderate' ? 1.5 : 1.8;
    const dietFactor = dietQuality === 'Poor' ? 0.8 : dietQuality === 'Average' ? 1 : 1.2;

    // Example formula for muscle gain estimation
    const calculatedMuscleGains = (weightInKg * heightInCm / ageInYears) * workoutFactor * dietFactor;
    setMuscleGains(calculatedMuscleGains.toFixed(2));
  };

  const handleReset = () => {
    clickSound.play();
    setAge('');
    setWeight('');
    setHeight('');
    setWorkoutFrequency('');
    setDietQuality('');
    setMuscleGains(null);
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
              <Typography variant='h3'>Muscle Gains Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age (years)"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">yrs</InputAdornment>,
                }}
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
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
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
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Workout Frequency</InputLabel>
                <Select
                  value={workoutFrequency}
                  onChange={(e) => setWorkoutFrequency(e.target.value)}
                  label="Workout Frequency"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Diet Quality</InputLabel>
                <Select
                  value={dietQuality}
                  onChange={(e) => setDietQuality(e.target.value)}
                  label="Diet Quality"
                >
                  <MenuItem value="Poor">Poor</MenuItem>
                  <MenuItem value="Average">Average</MenuItem>
                  <MenuItem value="Excellent">Excellent</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Muscle Gains
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {muscleGains && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`muscle-gains-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Estimated Muscle Gains: {muscleGains} kg</Typography>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button
                color='secondary'
                variant='contained'
                size='large'
                onClick={() => { navigate('/Home'); clickSound.play(); }} // Redirection to /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Muscle Gains Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Why is Muscle Gain Important?</strong><br />
            Building muscle mass not only enhances physical appearance but also boosts metabolism, improves strength and endurance, and supports overall health. Muscle gain can lead to better body composition, increased bone density, and improved functionality in daily activities.<br /><br />

            <strong>How to Maximize Muscle Gains:</strong><br />
            To maximize muscle gains, focus on a balanced diet rich in protein, engage in regular strength training exercises, ensure adequate recovery time, and maintain a healthy lifestyle. Tracking progress and making adjustments to your workout and nutrition plans can also help achieve your muscle gain goals.<br />
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

export default MuscleGains;
