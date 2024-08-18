import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";

const UpdatePatientForm = ({ open, onClose, onUpdate, patient }) => {
  const [weight, setWeight] = useState("");
  const [isNeutered, setIsNeutered] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  // Fetch owners when the dialog opens
  useEffect(() => {
    if (open) {
      const fetchOwners = async () => {
        try {
          const response = await fetch("http://localhost:8081/owner");
          if (!response.ok) {
            throw new Error("Failed to fetch owners");
          }
          const data = await response.json();
          setOwners(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchOwners();
    }
  }, [open]);

  // Populate form fields when patient data changes
  useEffect(() => {
    if (patient) {
      setWeight(patient.weight || "");
      setIsNeutered(patient.isNeutered || "");
      setOwnerId(patient.ownerId || "");
    }
  }, [patient]);

  const handleSubmit = async () => {
    const updatedPatient = {
      id: patient.id, // Ensure ID is included
      weight,
      isNeutered,
      ownerId,
      microchip: patient.microchip,
    };

    try {
      const response = await fetch(`http://localhost:8081/patient/${patient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatient),
      });

      if (response.ok) {
        onUpdate();
        toast.success("Patient updated successfully");
        onClose();
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to update patient: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating patient:", error.message);
      toast.error("Error updating patient: " + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Patient</DialogTitle>
      <DialogContent>
        <TextField
          label="Weight"
          type="number"
          fullWidth
          margin="normal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Is Neutered</InputLabel>
          <Select
            value={isNeutered}
            onChange={(e) => setIsNeutered(e.target.value)}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Owner</InputLabel>
          <Select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
          >
            {owners.map((owner) => (
              <MenuItem key={owner.id} value={owner.id}>
                {owner.firstName} {owner.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePatientForm;
