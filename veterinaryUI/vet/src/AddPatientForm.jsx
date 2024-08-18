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

const GENDER_OPTIONS = ["UNKNOWN", "FEMALE", "MALE"];
const SPECIES_OPTIONS = ["DOG", "CAT", "BIRD", "RABBIT", "REPTILE", "HAMSTER"];

const AddPatientForm = ({ open, onClose, onPatientAdded }) => {
  const [patientData, setPatientData] = useState({
    name: "",
    microchip: "",
    species: "",
    breed: "",
    birthDate: "",
    gender: "",
    weight: "",
    ownerId: "",
    isNeutered: false,
  });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  // Fetch owners on initial load
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("http://localhost:8081/owner"); // Endpoint to get all owners
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOwners(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOwners();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });
      if (response.ok) {
        onPatientAdded();
        toast.success("Patient added successfully");
        onClose();
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to add patient: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding patient:", error.message);
      toast.error("Error adding patient: " + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Owner</InputLabel>
          <Select
            name="owner"
            value={patientData.ownerId}
            onChange={(e) =>
              setPatientData({ ...patientData, ownerId: e.target.value })
            }
          >
            {owners.map((owner) => (
              <MenuItem key={owner.id} value={owner.id}>
                {owner.firstName} {owner.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="name"
          label="Name"
          value={patientData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="microchip"
          label="Microchip"
          value={patientData.microchip}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Species</InputLabel>
          <Select
            name="species"
            value={patientData.species}
            onChange={handleChange}
          >
            {SPECIES_OPTIONS.map((species) => (
              <MenuItem key={species} value={species}>
                {species}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="breed"
          label="Breed"
          value={patientData.breed}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="birthDate"
          label="Birth Date"
          type="date"
          value={patientData.birthDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
          >
            {GENDER_OPTIONS.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="weight"
          label="Weight"
          type="number"
          value={patientData.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Neutered</InputLabel>
          <Select
            name="isNeutered"
            value={patientData.isNeutered}
            onChange={(e) =>
              setPatientData({ ...patientData, isNeutered: e.target.value })
            }
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
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

export default AddPatientForm;
