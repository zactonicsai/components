import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Person as PersonIcon,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../store/hooks';
import Navigation from '../Navigation';


const Secure: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  if (!user) {
    return (
      <>
        <Navigation />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error">
            You must be logged in to view this page.
          </Alert>
        </Container>
      </>
    );
  }

  const permissions = user.permissions;

  const permissionData = [
    { action: 'Create', allowed: permissions.create, description: 'Add new records or content' },
    { action: 'Read', allowed: permissions.read, description: 'View existing records or content' },
    { action: 'Update', allowed: permissions.update, description: 'Modify existing records or content' },
    { action: 'Delete', allowed: permissions.delete, description: 'Remove records or content' },
  ];

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <SecurityIcon sx={{ mr: 2, fontSize: 40 }} color="primary" />
            <Typography variant="h3" component="h1">
              Secure Area
            </Typography>
          </Box>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body1">
              🎉 Welcome to the secure area, <strong>{user.username}</strong>! 
              You have successfully authenticated.
            </Typography>
          </Alert>
          
          <Grid container spacing={3}>
            {/* User Information Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      User Information
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Username</Typography>
                    <Typography variant="body1" fontWeight="bold">{user.username}</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Roles
                    </Typography>
                    <Box>
                      {user.roles.map(role => (
                        <Chip 
                          key={role} 
                          label={role} 
                          size="small" 
                          color="primary"
                          icon={<ShieldIcon />}
                          sx={{ mr: 1, mb: 1 }} 
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Groups
                    </Typography>
                    <Box>
                      {user.groups.map(group => (
                        <Chip 
                          key={group} 
                          label={group} 
                          size="small" 
                          color="secondary"
                          icon={<GroupIcon />}
                          sx={{ mr: 1, mb: 1 }} 
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Permissions Card */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      CRUD Permissions
                    </Typography>
                  </Box>
                  
                  <List dense>
                    {permissionData.map(({ action, allowed, description }) => (
                      <ListItem key={action} sx={{ px: 0 }}>
                        <ListItemIcon>
                          {allowed ? 
                            <CheckCircleIcon color="success" /> : 
                            <CancelIcon color="error" />
                          }
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography 
                              variant="body1" 
                              color={allowed ? 'success.main' : 'error.main'}
                              fontWeight="medium"
                            >
                              {action}
                            </Typography>
                          }
                          secondary={description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Permissions Table */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Permissions Overview
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Action</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionData.map(({ action, allowed, description }) => (
                    <TableRow key={action}>
                      <TableCell>{action}</TableCell>
                      <TableCell>
                        <Chip 
                          label={allowed ? 'Granted' : 'Denied'}
                          color={allowed ? 'success' : 'error'}
                          size="small"
                          icon={allowed ? <CheckCircleIcon /> : <CancelIcon />}
                        />
                      </TableCell>
                      <TableCell>{description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ p: 3, backgroundColor: 'info.light', borderRadius: 2 }}>
            <Typography variant="h6" color="info.contrastText" gutterBottom>
              Security Information
            </Typography>
            <Typography variant="body2" color="info.contrastText" paragraph>
              This secure content is only visible to authenticated users. Your permissions 
              determine what actions you can perform within the application.
            </Typography>
            <Typography variant="body2" color="info.contrastText">
              <strong>Session Status:</strong> Active and secure • 
              <strong> User Level:</strong> {user.roles.join(', ')} • 
              <strong> Access Groups:</strong> {user.groups.join(', ')}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Secure;