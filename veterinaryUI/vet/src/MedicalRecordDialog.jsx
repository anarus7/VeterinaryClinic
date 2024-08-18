import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import owner4 from "../src/pictures/owner4.png";

const MedicalRecordDialog = ({ open, onClose, patient, medicalRecords }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm" // Adjust to a smaller width (e.g., 'sm' for small or 'xs' for extra-small)
      sx={{
        "& .MuiDialog-paper": {
          width: '80%', // Adjust the width percentage
          maxWidth: '500px', // Set a maximum width
          height: '300', // Make height adjust automatically
          minHeight: '200px', // Set a minimum height if needed
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#33a4ff', // Background color for the title bar
          position: 'relative',
          padding: '8px 16px', // Adjust padding if necessary
        }}
      >
        Medical Records for {patient?.name}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#071cc', // Background color for the dialog content
          padding: 3 // Optional: Add padding for better spacing
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex="1">
            {medicalRecords.length > 0 ? (
              medicalRecords.map((record, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="h6" gutterBottom>
                    Record Date: {record.recordDate}
                  </Typography>
                  <Typography variant="body1">
                    Vet Notes: {record.vetNotes}
                  </Typography>
                  <Typography variant="body2">
                    Vet In Charge: {record.vetInCharge?.firstName} {record.vetInCharge?.lastName}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))
            ) : (
              <Typography variant="body1">No medical records found.</Typography>
            )}
          </Box>
          <Box
            component="img"
            src={owner4}
            alt="Owner"
            sx={{
              width: 200, // Adjust the size as needed
              height: 'auto',
              ml: 2, // Margin left for spacing
              display: { xs: 'none', md: 'block' }, // Hide image on small screens if desired
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MedicalRecordDialog;
