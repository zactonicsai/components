import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Public as PublicIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import Navigation from '../Navigation';

const Public: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <PublicIcon sx={{ mr: 2, fontSize: 40 }} color="primary" />
            <Typography variant="h3" component="h1">
              Public Content
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            This is a public page accessible to everyone. No authentication required!
          </Typography>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              Anyone can view this content without logging in. This demonstrates 
              how public content can be accessible alongside protected areas.
            </Typography>
          </Alert>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Public Features
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Open Access" 
                        secondary="No login required to view this content" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="General Information" 
                        secondary="Basic information suitable for all visitors" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="No Registration" 
                        secondary="Access immediately without creating an account" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Application Features
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <InfoIcon color="info" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Role-Based Access" 
                        secondary="Different user roles have different permissions" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Protected Routes" 
                        secondary="Some content requires authentication to access" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PublicIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Public Access" 
                        secondary="This page demonstrates publicly accessible content" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              About This Demo
            </Typography>
            <Typography variant="body2" paragraph>
              This application demonstrates a complete authentication system with:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>User authentication with login/logout functionality</li>
              <li>Role-based access control (RBAC)</li>
              <li>Protected routes that require authentication</li>
              <li>Public routes accessible to everyone</li>
              <li>CRUD permissions system for future features</li>
              <li>Material-UI components for modern design</li>
              <li>Redux Toolkit for state management</li>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Public;