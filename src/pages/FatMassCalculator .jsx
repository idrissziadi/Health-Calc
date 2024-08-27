import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

// Import click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const BodyFatCalculator = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State variables
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [bodyFat, setBodyFat] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (bodyFat !== null) {
      setShowResult(true);
      const timer = setTimeout(() => setShowResult(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [bodyFat]);

  // Calculation function
  const handleCalculate = () => {
    clickSound.play();
    if (!gender || !age || isNaN(age) || !weight || isNaN(weight) || !height || isNaN(height) || !neck || isNaN(neck) || !waist || isNaN(waist)) {
      alert("Please enter valid inputs.");
      return;
    }

    const ageInYears = parseFloat(age);
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const neckInCm = parseFloat(neck);
    const waistInCm = parseFloat(waist);

    // Body fat calculation formula
    const bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistInCm - neckInCm) + 0.22100 * Math.log10(heightInCm)) - 450;
    setBodyFat(bodyFatPercentage.toFixed(2));
  };

  // Reset function
  const handleReset = () => {
    clickSound.play();
    setGender('');
    setAge('');
    setWeight('');
    setHeight('');
    setNeck('');
    setWaist('');
    setBodyFat(null);
    setShowResult(false);
  };

  // Dialog handlers
  const handleOpenDialog = () => { setOpenDialog(true); clickSound.play(); }
  const handleCloseDialog = () => { setOpenDialog(false); clickSound.play(); }

  return (
    <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.primary.main }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: "30px", borderRadius: theme.shape.borderRadius, background: theme.palette.background.paper }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Typography variant='h3'>Body Fat Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Weight"
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
                label="Height"
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
              <TextField
                label="Neck Circumference"
                variant="outlined"
                fullWidth
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Waist Circumference"
                variant="outlined"
                fullWidth
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Body Fat
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {bodyFat && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`body-fat-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Body Fat Percentage: {bodyFat}%</Typography>
                </motion.div>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button
                color='secondary'
                variant='contained'
                size='large'
                onClick={() => { navigate('/Home'); clickSound.play(); }} // Redirect to /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Body Fat Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Why is Body Fat Important?</strong><br />
            Body fat percentage is an important indicator of health. It helps to gauge the amount of fat relative to your body mass, which can influence overall health and fitness. Maintaining a healthy body fat percentage is essential for optimal physical performance and wellness.<br /><br />

            <strong>How to Calculate Body Fat:</strong><br />
            The body fat percentage can be estimated using various methods, including measurements of waist and neck circumferences. This calculator uses a formula to estimate body fat based on these inputs. However, individual results may vary and it's best to consult with a healthcare professional for precise measurements.
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

export default BodyFatCalculator;
