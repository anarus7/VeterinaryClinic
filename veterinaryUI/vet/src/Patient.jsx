import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
  Avatar
} from "@mui/material";
import AddPatientForm from "./AddPatientForm";
import toast, { Toaster } from "react-hot-toast";
import dog3 from "../src/pictures/dog3.png";
import sammy from "../src/pictures/sammy.png";
import elemenenet from "../src/pictures/elemenet.gif";
import i1 from "../src/pictures/i1.png";
import i2 from "../src/pictures/i2.png";
import i3 from "../src/pictures/i3.png";
import i4 from "../src/pictures/i4.png";
import i5 from "../src/pictures/i5.png";
import i6 from "../src/pictures/i6.png";
import i7 from "../src/pictures/i7.png";
import i8 from "../src/pictures/i8.png";
import i9 from "../src/pictures/i9.png";
import i10 from "../src/pictures/i10.png";
import dog from "../src/pictures/dog.png";
import MedicalRecordDialog from "./MedicalRecordDialog";


const icons = [i1, i2, i3,i4,i5,i6,i7,i8,i9,i10]; // Add more icons as needed

const getIconForPatient = (index) => {
  return icons[index % icons.length];
};

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [medicalRecordDialogOpen, setMedicalRecordDialogOpen] = useState(false); // State for medical record dialog
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const [toastShown, setToastShown] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]); // State for medical records
  
    // Fetch patients on component mount
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await fetch("http://localhost:8081/patient");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setPatients(data);
          setFilteredPatients(data);
          if (!toastShown) {
            toast.success("Successfully loaded patients");
            setToastShown(true);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPatients();
    }, [toastShown]);
  
    // Fetch patients by name when search query changes
    useEffect(() => {
      const fetchPatientsByName = async () => {
        if (searchQuery) {
          try {
            const response = await fetch(
              `http://localhost:8081/patient/search?name=${searchQuery}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setFilteredPatients(data);
          } catch (error) {
            setError(error.message);
          }
        } else {
          setFilteredPatients(patients);
        }
      };
  
      fetchPatientsByName();
    }, [searchQuery, patients]);
  
    // Fetch medical records for a specific patient
    const fetchMedicalRecords = async (patientId) => {
      try {
        const response = await fetch(`http://localhost:8081/medical-records/patient/${patientId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch medical records");
        }
        const data = await response.json();
        setMedicalRecords(data);
      } catch (error) {
        console.error("Error fetching medical records:", error.message);
        toast.error("Error fetching medical records: " + error.message);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleDeleteClick = (id) => {
      setDeletingId(id);
      setDialogOpen(true);
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:8081/patient/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.id !== id)
          );
          setFilteredPatients((prevPatients) =>
            prevPatients.filter((patient) => patient.id !== id)
          );
          toast.success("Patient deleted successfully");
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to delete patient: ${errorText}`);
        }
      } catch (error) {
        console.error("Error deleting patient:", error.message);
        setError(error.message);
      }
    };
  
    const handleAddPatientOpen = () => {
      setAddPatientOpen(true);
    };
  
    const handleAddPatientClose = () => {
      setAddPatientOpen(false);
    };
  
    const handlePatientAdded = async () => {
      setAddPatientOpen(false);
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8081/patient");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
        toast.success("Patients updated successfully");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleMedicalRecordsOpen = async (patient) => {
      setSelectedPatient(patient);
      await fetchMedicalRecords(patient.id); // Fetch medical records
      setMedicalRecordDialogOpen(true); // Open the dialog
    };
  
    const handleMedicalRecordsClose = () => {
      setMedicalRecordDialogOpen(false);
      setSelectedPatient(null);
      setMedicalRecords([]);
    };
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <Typography variant="h6">Error: {error}</Typography>;
    }
  
    return (
      <div>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={3}
          p={2}
          sx={{
            background: "linear-gradient(30deg, #0048bd, #44a7fd)",
            borderRadius: "24px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" component="h1" color="white">
            All Pets
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          <TextField
            label="Search by name"
            variant="outlined"
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ maxWidth: 800 }}
          />
          <Box mx={2}>
            <img src={dog} alt="Dog" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPatientOpen}
          >
            Add Patient
          </Button>
        </Box>
        <Grid container spacing={2}>
          {filteredPatients.map((patient, index) => (
            <Grid item xs={12} sm={6} md={3} key={patient.id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={1}>
                    <Avatar
                      alt={`Patient Icon ${index + 1}`}
                      src={icons[index % icons.length]}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Box>
                  <Typography variant="h6" color="textPrimary" fontSize="1rem">
                    Patient Name: {patient.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                    Species: {patient.species} | Breed: {patient.breed}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                    Birth Date: {patient.birthDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                    Gender: {patient.gender}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                    Weight: {patient.weight} kg | Neutered: {patient.isNeutered ? "Yes" : "No"}
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(patient.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => handleMedicalRecordsOpen(patient)} // Open medical records dialog
                    >
                      View Records
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <AddPatientForm
          open={addPatientOpen}
          onClose={handleAddPatientClose}
          onPatientAdded={handlePatientAdded}
        />
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(deletingId);
                setDialogOpen(false);
              }}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <MedicalRecordDialog
          open={medicalRecordDialogOpen}
          onClose={handleMedicalRecordsClose}
          patient={selectedPatient}
          medicalRecords={medicalRecords}
        />
        <Toaster />
      </div>
    );
  };
  
  export default Patient;