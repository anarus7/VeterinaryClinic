import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import toast from "react-hot-toast";

const AddAppointmentForm = ({
  open,
  onClose,
  onAppointmentAdded,
  selectedDate,
  vets,
  patients,
}) => {
  const [appointmentData, setAppointmentData] = useState({
    date: selectedDate || "",
    patientId: "",
    vetId: "", // Initialize as an empty string
    reason: "",
  });

  useEffect(() => {
    if (selectedDate) {
      setAppointmentData((prev) => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !appointmentData.date ||
      !appointmentData.patientId ||
      !appointmentData.vetId ||
      !appointmentData.reason
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        onAppointmentAdded();
        toast.success("Appointment added successfully");
        onClose();
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to add appointment: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      toast.error("Error adding appointment: " + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        <TextField
          name="date"
          label="Date"
          type="date"
          value={appointmentData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Patient</InputLabel>
          <Select
            name="patientId"
            value={appointmentData.patientId || ""} // Ensure it is a defined value
            onChange={handleChange}
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name} - {patient.species}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Veterinarian</InputLabel>
          <Select
            name="vetId"
            value={appointmentData.vetId || ""} // Ensure it is a defined value
            onChange={handleChange}
          >
            {vets.map((vet) => (
              <MenuItem key={vet.id} value={vet.id}>
                {vet.firstName} {vet.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="reason"
          label="Reason"
          value={appointmentData.reason}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAppointmentForm;
