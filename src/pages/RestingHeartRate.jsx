import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem  , InputAdornment} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

// Import the click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const RestingHeartRate = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [heartRate, setHeartRate] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCalculate = () => {
    clickSound.play();
    if (!age || !sex || !weight || !height || !activityLevel) {
      alert("Please fill out all fields.");
      return;
    }

    // Example calculation (customize as needed)
    const heartRateResult = 220 - parseFloat(age) - (activityLevel === 'Active' ? 10 : 0);
    setHeartRate(heartRateResult.toFixed(2));

    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  const handleReset = () => {
    clickSound.play();
    setAge('');
    setSex('');
    setWeight('');
    setHeight('');
    setActivityLevel('');
    setHeartRate(null);
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
              <Typography variant='h3'>Resting Heart Rate Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ marginBottom: "20px" }}
                type="number"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  label="Sex"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                sx={{ marginBottom: "20px" }}
                type="number"
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
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
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
                  <MenuItem value="Sedentary">Sedentary</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Heart Rate
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {heartRate && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`heart-rate-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Your Resting Heart Rate: {heartRate} bpm</Typography>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button
                color='secondary'
                variant='contained'
                size='large'
                onClick={() => { navigate('/Home'); clickSound.play(); }} // Redirects to /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Heart Rate Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>What is Resting Heart Rate?</strong><br />
            Resting heart rate (RHR) is the number of times your heart beats per minute while at rest. It is an important indicator of your cardiovascular fitness and overall health. A lower RHR typically indicates a higher level of fitness and better heart health.<br /><br />

            <strong>How to Calculate Your Resting Heart Rate:</strong><br />
            To measure your RHR, count the number of beats you feel for one minute while you are at rest. This can be done first thing in the morning before getting out of bed. Factors such as age, sex, weight, height, and activity level can influence your RHR.<br />
            The formula used in this calculator provides an estimate based on general guidelines and may not account for individual variations.
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

export default RestingHeartRate;
