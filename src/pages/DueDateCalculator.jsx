import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';

// Import click sound
const clickSound = new Howl({ src: ['/assets/button.wav'] });

const DueDateCalculator = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [method, setMethod] = useState('LMP');
  const [lmpDate, setLmpDate] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [ultrasoundDate, setUltrasoundDate] = useState('');
  const [ivfDate, setIvfDate] = useState('');
  const [gestationalAge, setGestationalAge] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [lutealPhase, setLutealPhase] = useState(14);
  const [dueDate, setDueDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const calculateDueDate = (baseDate) => {
    if (!baseDate) return null;
    const date = new Date(baseDate);
    return new Date(date.setDate(date.getDate() + 280)).toDateString();
  };

  const handleCalculate = () => {
    clickSound.play();
    let resultDate;

    switch (method) {
      case 'LMP':
        resultDate = calculateDueDate(lmpDate);
        break;
      case 'Conception':
        resultDate = calculateDueDate(conceptionDate);
        break;
      case 'Ultrasound':
        resultDate = calculateDueDate(ultrasoundDate);
        break;
      case 'IVF':
        resultDate = calculateDueDate(ivfDate);
        break;
      case 'GestationalAge':
        const date = new Date();
        date.setDate(date.getDate() + parseInt(gestationalAge, 10));
        resultDate = calculateDueDate(date.toISOString().split('T')[0]);
        break;
      case 'Advanced':
        const averageCycleLength = parseInt(cycleLength, 10);
        const averageLutealPhase = parseInt(lutealPhase, 10);
        const adjustedDate = new Date(lmpDate);
        adjustedDate.setDate(adjustedDate.getDate() + averageCycleLength + averageLutealPhase);
        resultDate = calculateDueDate(adjustedDate.toISOString().split('T')[0]);
        break;
      default:
        resultDate = null;
    }
    setDueDate(resultDate);
  };

  const handleReset = () => {
    clickSound.play();
    setLmpDate('');
    setConceptionDate('');
    setUltrasoundDate('');
    setIvfDate('');
    setGestationalAge('');
    setCycleLength(28);
    setLutealPhase(14);
    setDueDate(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    clickSound.play();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    clickSound.play();
  };

  return (
    <Grid container minHeight={"100vh"} sx={{ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.primary.main }}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: "30px", borderRadius: theme.shape.borderRadius, background: theme.palette.background.paper }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Typography variant='h3'>Due Date Calculator</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="calculation-method"
                  name="calculation-method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <FormControlLabel value="LMP" control={<Radio />} label="First Day of Last Period" />
                  <FormControlLabel value="Conception" control={<Radio />} label="Conception Date" />
                  <FormControlLabel value="Ultrasound" control={<Radio />} label="Date of Ultrasound" />
                  <FormControlLabel value="IVF" control={<Radio />} label="IVF Transfer Day" />
                  <FormControlLabel value="GestationalAge" control={<Radio />} label="Parents Gestational Age" />
                  <FormControlLabel value="Advanced" control={<Radio />} label="Advanced Method" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {method === 'LMP' && (
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Last Menstrual Period (LMP)"
                  variant="outlined"
                  fullWidth
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
            )}

            {method === 'Conception' && (
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Conception Date"
                  variant="outlined"
                  fullWidth
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
            )}

            {method === 'Ultrasound' && (
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Date of Ultrasound"
                  variant="outlined"
                  fullWidth
                  value={ultrasoundDate}
                  onChange={(e) => setUltrasoundDate(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
            )}

            {method === 'IVF' && (
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="IVF Transfer Day"
                  variant="outlined"
                  fullWidth
                  value={ivfDate}
                  onChange={(e) => setIvfDate(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                />
              </Grid>
            )}

            {method === 'GestationalAge' && (
              <Grid item xs={12}>
                <TextField
                  label="Gestational Age (days)"
                  variant="outlined"
                  fullWidth
                  value={gestationalAge}
                  onChange={(e) => setGestationalAge(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                  type="number"
                />
              </Grid>
            )}

            {method === 'Advanced' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Average Cycle Length (days)"
                    variant="outlined"
                    fullWidth
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Average Luteal Phase Length (days)"
                    variant="outlined"
                    fullWidth
                    value={lutealPhase}
                    onChange={(e) => setLutealPhase(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Last Menstrual Period (LMP)"
                    variant="outlined"
                    fullWidth
                    value={lmpDate}
                    onChange={(e) => setLmpDate(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button variant='contained' size='large' onClick={handleCalculate}>
                Calculate Due Date
              </Button>
              <Button variant='contained' size='large' onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
              <Button variant='outlined' size='large' onClick={handleOpenDialog} sx={{ ml: 2 }}>
                Learn More
              </Button>
            </Grid>

            {dueDate && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Typography variant='h5'>Estimated Due Date: {dueDate}</Typography>
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <Button
                color='secondary'
                variant='contained'
                size='large'
                onClick={() => { navigate('/Home'); clickSound.play(); }} // Navigation to /Home
              >
                Go to Home
              </Button>
            </Grid>

          </Grid>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>About Due Date Calculation</DialogTitle>
        <DialogContent>
          <Typography>
            The due date calculator estimates the expected date of delivery based on various methods. 
            You can choose from the following methods:
            <ul>
              <li><strong>First Day of Last Period</strong>: Calculates the due date based on the first day of your last menstrual period.</li>
              <li><strong>Conception Date</strong>: Calculates the due date based on the date of conception.</li>
              <li><strong>Date of Ultrasound</strong>: Calculates the due date based on the ultrasound date.</li>
              <li><strong>IVF Transfer Day</strong>: Calculates the due date based on the day of IVF transfer.</li>
              <li><strong>Parents Gestational Age</strong>: Calculates the due date based on gestational age from parents' history.</li>
              <li><strong>Advanced Method</strong>: Uses average cycle length and luteal phase length for a more precise calculation.</li>
            </ul>
            Enter the appropriate data based on your chosen method to calculate your due date.
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

export default DueDateCalculator;
