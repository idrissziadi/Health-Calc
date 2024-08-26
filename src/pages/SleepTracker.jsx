import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Utiliser le thème
import { motion } from 'framer-motion'; // Importer Framer Motion pour les animations
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { Howl } from 'howler';

// Import the click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const SleepTracker = () => {
  const theme = useTheme(); // Utilisation du contexte de thème
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCalculate = () => {
    clickSound.play();
    if (!sleepHours || isNaN(sleepHours)) {
      alert("Please enter a valid number of sleep hours.");
      return;
    }
    const hours = parseFloat(sleepHours);

    if (hours < 5) {
      setSleepQuality('Poor');
    } else if (hours >= 5 && hours < 7) {
      setSleepQuality('Average');
    } else if (hours >= 7 && hours < 9) {
      setSleepQuality('Good');
    } else {
      setSleepQuality('Excellent');
    }

    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };

  const handleReset = () => {
    clickSound.play();
    setSleepHours('');
    setSleepQuality('');
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
              <Typography variant='h3'>Sleep Tracker</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Sleep Hours"
                variant="outlined"
                fullWidth
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Sleep Quality
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {sleepQuality && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                <motion.div
                  className={`sleep-result ${showResult ? 'show' : 'hide'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : -20 }}
                >
                  <Typography variant='h5'>Your Sleep Quality: {sleepQuality}</Typography>
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
        <DialogTitle>Sleep Tracker Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Why Track Sleep?</strong><br />
            Tracking your sleep helps you understand your sleep patterns and improve your sleep quality. Sleep quality is an important aspect of overall health and well-being.<br /><br />

            <strong>Sleep Quality Categories:</strong><br />
            - Poor: Less than 5 hours of sleep<br />
            - Average: 5 to 7 hours of sleep<br />
            - Good: 7 to 9 hours of sleep<br />
            - Excellent: More than 9 hours of sleep<br /><br />

            <strong>Tips for Better Sleep:</strong><br />
            - Maintain a regular sleep schedule.<br />
            - Create a restful environment.<br />
            - Limit exposure to screens before bedtime.<br />
            - Avoid caffeine and heavy meals close to bedtime.
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

export default SleepTracker;
