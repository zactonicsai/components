import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Collapse,
  CircularProgress,
  Divider,
  Grid,
  Chip,
} from '@mui/material';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearError, login } from '../../store/authSlice';
import Navigation from '../Navigation';
import { USERS_DATA } from '../../data/users';


const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error, loading } = useAppSelector(state => state.auth);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/secure';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  // Clear error when user types
  useEffect(() => {
    if (error && (credentials.username || credentials.password)) {
      dispatch(clearError());
    }
  }, [credentials.username, credentials.password, error, dispatch]);

  const handleInputChange = (field: 'username' | 'password') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      dispatch(login(credentials));
    }
  };

  const handleDemoLogin = (username: string, password: string) => {
    setCredentials({ username, passsword });
    dispatch(login({ username, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev: any) => !prev);
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <LoginIcon sx={{ mr: 2, fontSize: 32 }} color="primary" />
                <Typography variant="h4" component="h1">
                  Login
                </Typography>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username"
                  value={credentials.username}
                  onChange={handleInputChange('username')}
                  margin="normal"
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={handleInputChange('password')}
                  margin="normal"
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || !credentials.username || !credentials.password}
                  sx={{ mt: 3, mb: 2 }}
                  startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Demo Credentials */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Demo Accounts
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Try different user roles to see varying permission levels:
              </Typography>

              <Button 
                variant="outlined" 
                onClick={() => setShowCredentials(!showCredentials)}
                fullWidth
                sx={{ mb: 2 }}
              >
                {showCredentials ? 'Hide' : 'Show'} All Credentials
              </Button>
              
              <Collapse in={showCredentials}>
                <Box sx={{ mt: 2 }}>
                  {USERS_DATA.map(user => (
                    <Card key={user.id} sx={{ mb: 2 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="h6">
                            {user.username}
                          </Typography>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleDemoLogin(user.username, user.password)}
                            disabled={loading}
                          >
                            Quick Login
                          </Button>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Password: <code>{user.password}</code>
                        </Typography>
                        
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Roles:
                          </Typography>
                          {user.roles.map(role => (
                            <Chip 
                              key={role} 
                              label={role} 
                              size="small" 
                              color="primary"
                              sx={{ ml: 0.5 }} 
                            />
                          ))}
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary">
                          Permissions: {Object.entries(user.permissions)
                            .filter(([, allowed]) => allowed)
                            .map(([action]) => action)
                            .join(', ') || 'None'}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Collapse>

              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary">
                Each account demonstrates different permission levels for the CRUD operations
                that will be implemented in future pages.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;