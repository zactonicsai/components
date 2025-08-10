import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppSelector } from './store/hooks';
import Home from './components/Home/Home';
import Public from './components/Public/Public';
import Login from './components/Login/Login';
import Secure from './components/Secure/Secure';
import { store } from './store/store';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state: { auth: any; }) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// App Router component (separate from App to use hooks inside Provider)
const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public" element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/secure" 
          element={
            <ProtectedRoute>
              <Secure />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;