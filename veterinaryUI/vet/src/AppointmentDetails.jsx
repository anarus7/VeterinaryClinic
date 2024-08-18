import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const AppointmentDetails = ({ open, onClose, details }) => {
  if (!details) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)', // Gradient background
          borderRadius: 1, // Reduced border radius
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Reduced shadow
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#1976d2',
          color: '#ffffff',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '1.25rem', // Smaller font size
          py: 1, // Reduced padding
        }}
      >
        Appointment Details
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#ffffff',
          p: 1.5, // Reduced padding
          borderRadius: 1, // Reduced border radius
        }}
      >
       
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
          p: 1, // Reduced padding
        }}
      >
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          sx={{ fontSize: '0.75rem' }} // Smaller font size
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentDetails;
