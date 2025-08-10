import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  Home as HomeIcon,
  Public as PublicIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Navigation from '../Navigation';
import { useAppSelector } from '../../store/hooks';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <HomeIcon sx={{ mr: 2, fontSize: 40 }} color="primary" />
            <Typography variant="h3" component="h1">
              Welcome Home
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            This is the home page of our authentication demo application. 
            You can navigate to different sections using the menu above.
          </Typography>

          {isAuthenticated && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
              <Typography variant="h6" color="success.contrastText">
                Welcome back, {user?.username}!
              </Typography>
              <Typography variant="body2" color="success.contrastText">
                You have {user?.roles.join(', ')} access level.
              </Typography>
            </Box>
          )}
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <PublicIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Public Section
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Access public content that's available to everyone, no login required.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate('/public')}>
                    Visit Public
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <SecurityIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Secure Section
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Protected content that requires authentication and shows user permissions.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/secure')}
                    disabled={!isAuthenticated}
                  >
                    {isAuthenticated ? 'Visit Secure' : 'Login Required'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" gutterBottom>
                      Authentication
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {isAuthenticated 
                      ? 'You are currently logged in. Manage your session here.' 
                      : 'Login to access protected features and personalized content.'
                    }
                  </Typography>
                </CardContent>
                <CardActions>
                  {isAuthenticated ? (
                    <Button size="small" onClick={() => navigate('/secure')}>
                      View Profile
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Home;