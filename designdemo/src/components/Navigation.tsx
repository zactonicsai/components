import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <HomeIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Auth Demo App
        </Typography>
        
        <Button 
          color="inherit" 
          onClick={() => navigate('/')}
          sx={{ mr: 1 }}
          variant={isCurrentPage('/') ? 'outlined' : 'text'}
        >
          Home
        </Button>
        
        <Button 
          color="inherit" 
          onClick={() => navigate('/public')}
          sx={{ mr: 1 }}
          variant={isCurrentPage('/public') ? 'outlined' : 'text'}
        >
          Public
        </Button>
        
        {isAuthenticated ? (
          <Box display="flex" alignItems="center">
            <Button 
              color="inherit" 
              onClick={() => navigate('/secure')}
              sx={{ mr: 2 }}
              variant={isCurrentPage('/secure') ? 'outlined' : 'text'}
            >
              Secure
            </Button>
            <Chip 
              icon={<PersonIcon />}
              label={user?.username}
              color="secondary"
              sx={{ mr: 1 }}
            />
            <Button 
              color="inherit" 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button 
            color="inherit" 
            onClick={() => navigate('/login')}
            startIcon={<LoginIcon />}
            variant={isCurrentPage('/login') ? 'outlined' : 'text'}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;