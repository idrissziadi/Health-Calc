import React from 'react';
import { Grid, Typography, Box, Button, CardMedia, CardContent, Card } from '@mui/material';
import DrawerAppBar from '../components/DrawerAppBar';
import Carousel from 'react-material-ui-carousel';
import image from "../assets/card.png"; // Update the image to fit the health theme if necessary
import image2 from "../assets/cardd.png";
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';

const Home = () => {
  const carouselItems = [
    { image: image2, title: "Welcome to Health Calc", description: "Your ultimate tool for health and fitness calculations." },
    { image: image2, title: "Track Your Progress", description: "Monitor your health and achieve your fitness goals." },
    { image: image2, title: "Explore Health Tools", description: "Discover a wide range of health calculators and trackers." },
  ];

  return (
    <Grid container direction="column" sx={{ minHeight: '100vh', backgroundColor: theme => theme.palette.background.default }}>
      
      {/* Header Section */}
      <Grid item>
        <DrawerAppBar title="Health Calc" backgroundColor="primary" />
      </Grid>

      {/* Carousel Section */}
      <Grid item xs>
        <Carousel>
          {carouselItems.map((item, index) => (
            <Box key={index} sx={{ position: 'relative', height: '400px' }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ 
                  height: '100%', 
                  width: '100%', 
                  objectFit: 'cover', 
                  opacity: 0.9, // Augmenter l'opacité peut aider à améliorer la visibilité
                  filter: 'brightness(1.1)' // Ajustez la luminosité si nécessaire
                }}
              />
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>{item.title}</Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>{item.description}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 3 }}>Get Started</Button>
              </Box>
            </Box>
          ))}
        </Carousel>
      </Grid>

      {/* Health Tools Collection Section */}
      <Grid item xs sx={{ paddingBottom: { xs: '40px', md: '100px' } }}>
        <Grid container sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={9.8}>
            <Grid container spacing={6}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontSize: '24px',
                    lineHeight: '36px',
                    fontWeight: 700,
                    color: theme => theme.palette.primary.main,
                  }}
                >
                  Essential Health Tools
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {/* Health tool cards */}
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"BMI Calculator"} subTitle={"Calculate your Body Mass Index"} route="/bmicalculator" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"Calorie Counter"} subTitle={"Track your daily calorie intake"} route="/CalorieCounter" />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <GameCard image={image} title={"Sleep Tracker"} subTitle={"Monitor your sleep patterns"} route="/SleepTracker" />
                  </Grid>
                  {/* Add more HealthCard components as needed */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Grid item xs sx={{ backgroundColor: theme => theme.palette.grey[200], padding: '60px 0' }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={700}>Comprehensive Calculations</Typography>
              <Typography sx={{ mt: 2 }}>Access a variety of tools to monitor your health and fitness.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={700}>Personalized Results</Typography>
              <Typography sx={{ mt: 2 }}>Get tailored health advice based on your input.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={700}>User-Friendly Interface</Typography>
              <Typography sx={{ mt: 2 }}>Experience a seamless and intuitive platform.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Grid item xs sx={{ padding: '60px 0' }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>User 1</Typography>
                <Typography sx={{ mt: 2 }}>“Health Calc has been instrumental in my fitness journey. Highly recommend!”</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>User 2</Typography>
                <Typography sx={{ mt: 2 }}>“The variety of health tools available is impressive. It's my go-to app now.”</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Subscription Section */}
      <Grid item xs sx={{ backgroundColor: theme => theme.palette.primary.main, padding: '60px 0', textAlign: 'center' }}>
        <Typography variant="h5" color="white" fontWeight={700}>Subscribe to our Newsletter</Typography>
        <Typography color="white" sx={{ mt: 2 }}>Get the latest health tips and updates delivered to your inbox.</Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 4 }}>Subscribe Now</Button>
      </Grid>
      
      {/* Latest News Section */}
      <Grid item xs sx={{ padding: '60px 0', backgroundColor: theme => theme.palette.grey[100] }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 4, textAlign: 'center', color: theme => theme.palette.primary.main }}>
              Latest Health News
            </Typography>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Health Update 1.1 Released</Typography>
                <Typography sx={{ mt: 2 }}>Explore new tools and features in our latest update, aimed at improving your health management.</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Upcoming Health Webinar</Typography>
                <Typography sx={{ mt: 2 }}>Join our experts for a live webinar on how to maintain a healthy lifestyle.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Top Rated Health Tools Section */}
      <Grid item xs sx={{ padding: '60px 0' }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={9.8}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 4, textAlign: 'center', color: theme => theme.palette.primary.main }}>
              Top Rated Health Tools
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <GameCard image={image} title={"Body Fat Calculator"} subTitle={"Rated 5 Stars"} route="/BodyFatCalculator" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <GameCard image={image} title={"Calorie Counter"} subTitle={"Rated 4.8 Stars"} route="/CalorieCounter" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <GameCard image={image} title={"Heart Rate Monitor"} subTitle={"Rated 4.7 Stars"} route="/HeartRateMonitor" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid item>
        <Footer />
      </Grid>
      
    </Grid>
  );
};

export default Home;
