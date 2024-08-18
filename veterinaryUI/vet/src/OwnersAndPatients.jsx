import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Avatar,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import icon4 from "../src/pictures/icon4.png";
import icon6 from "../src/pictures/icon6.png";
import user4 from "../src/pictures/user4.png";
import beam from "../src/pictures/beam.gif";
import iowner1 from "../src/pictures/iowner1.png";

const OwnersAndPatients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPatientDialog, setOpenPatientDialog] = useState(false);
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchOwnersAndPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/owner/ownersPatients"
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnersAndPatients();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;

  const ownersWithPets = data.filter((owner) => owner.patients.length > 0);

  // Calculate summary statistics
  const totalOwners = data.length;
  const totalPatients = data.reduce((sum, owner) => sum + owner.patients.length, 0);

  const speciesData = data.reduce((acc, owner) => {
    owner.patients.forEach((patient) => {
      acc[patient.species] = (acc[patient.species] || 0) + 1;
    });
    return acc;
  }, {});
  
  const chartData = Object.keys(speciesData).map((species) => ({
    name: species,
    value: speciesData[species],
  }));

  const genderData = data.reduce((acc, owner) => {
    owner.patients.forEach((patient) => {
      acc[patient.gender] = (acc[patient.gender] || 0) + 1;
    });
    return acc;
  }, {});

  const chartGenderData = Object.keys(genderData).map((gender) => ({
    name: gender,
    value: genderData[gender],
  }));

  const genderNeuteredData = data.reduce((acc, owner) => {
    owner.patients.forEach((patient) => {
      const key = `${patient.gender}-${patient.isNeutered ? 'Neutered' : 'Not Neutered'}`;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const chartGenderNeuteredData = Object.keys(genderNeuteredData).map((key) => {
    const [gender, neuteredStatus] = key.split('-');
    return {
      name: `${gender} - ${neuteredStatus}`,
      value: genderNeuteredData[key],
    };
  });

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setOpenPatientDialog(true);
  };

  const handleOwnerClick = (owner) => {
    setSelectedOwner(owner);
    setOpenOwnerDialog(true);
  };

  const handleClosePatientDialog = () => {
    setOpenPatientDialog(false);
  };

  const handleCloseOwnerDialog = () => {
    setOpenOwnerDialog(false);
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "40px",
            borderTopRightRadius: "40px",
            borderBottomLeftRadius: "40px",
            boxShadow: 3,
            width: "fit-content",
            textAlign: "center",
          }}
        >
          Owners and Patients
        </Typography>
        <img src={beam} alt="Dog" style={{ width: '200px', height: 'auto' }} />
      </Box>

      {/* Summary Statistics */}
      <Box mb={3}>
      <Typography
  variant="h5"
  component="h2"
  gutterBottom
  sx={{
    backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomLeftRadius: "40px",
    boxShadow: 3,
    width: "fit-content",
    textAlign: "center",
    marginBottom: "20px", // Adjust the spacing as needed
  }}
>
  Summary Statistics
</Typography>
        <Typography variant="body1">
          <strong>Total Owners:</strong> {totalOwners}
        </Typography>
        <Typography variant="body1">
          <strong>Total Patients:</strong> {totalPatients}
        </Typography>
      </Box>

      {/* Charts Section */}
      <Box display="flex" justifyContent="space-around" mb={3}>
        {/* Species Distribution Chart */}
        <Box>
        <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "40px",
              borderTopRightRadius: "40px",
              borderBottomLeftRadius: "40px",
              boxShadow: 3,
              width: "fit-content",
              textAlign: "center",
              marginBottom: "20px", // Adjust the spacing as needed
            }}
          >
            Patient Species Distribution
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>

        <Box>
        <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "40px",
              borderTopRightRadius: "40px",
              borderBottomLeftRadius: "40px",
              boxShadow: 5,
              width: "fit-content",
              textAlign: "center",
              marginBottom: "20px", // Adjust the spacing as needed
            }}
          >
            Patients by Gender
          </Typography>
          <PieChart width={300} height={400}>
            <Pie
              data={chartGenderData}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#82ca9d"
              label
            >
              {chartGenderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#FF8042", "#0088FE"][index % 2]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </Box>

      {/* Gender and Neutered Status Chart */}
      {/* Uncomment if needed */}
      {/* <Box mb={3}>
        <Typography variant="h5" component="h2" gutterBottom>
          Patients by Gender and Neutered Status
        </Typography>
        <BarChart
          width={600}
          height={300}
          data={chartGenderNeuteredData}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </Box> */}

      <Grid container spacing={3}>
        {ownersWithPets.map((owner, index) =>
          owner.patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  padding: 2,
                  width: 200,
                  transition: "transform 0.3s ease-in-out",
                  position: "relative",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Avatar
                      alt="Pet Image"
                      src={iowner1}
                      sx={{
                        width: 80,
                        height: 80,
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                      onClick={() => handlePatientClick(patient)}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    align="center"
                    onClick={() => handlePatientClick(patient)}
                  >
                    Pet: {patient.name}
                  </Typography>
                  <Typography
  variant="body2"
  align="center"
  sx={{
    backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    borderTopRightRadius: "20px",
    borderBottomLeftRadius: "20px",
    boxShadow: 2,
    width: "fit-content",
    margin: "0 auto", // Center the title
    cursor: "pointer",
  }}
  onClick={() => handleOwnerClick(owner)}
>
  Owner Name: {owner.firstName} {owner.lastName}
</Typography>

                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Patient Details Dialog */}
      <Dialog
        open={openPatientDialog}
        onClose={handleClosePatientDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar alt="Icon" src={icon6} sx={{ width: 60, height: 60 }} />
          </Box>
          <Typography variant="h5" color="textPrimary">
            Patient Details
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPatient && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                gap: 2,
                padding: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedPatient.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Species:</strong> {selectedPatient.species}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Breed:</strong> {selectedPatient.breed}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Gender:</strong> {selectedPatient.gender}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Weight:</strong> {selectedPatient.weight} kg
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Birth Date:</strong> {selectedPatient.birthDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Neutered:</strong>{" "}
                  {selectedPatient.isNeutered ? "Yes" : "No"}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleClosePatientDialog}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Owner Details Dialog */}
    <Dialog
  open={openOwnerDialog}
  onClose={handleCloseOwnerDialog}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}>
    <Box display="flex" justifyContent="center" mb={2}>
      <Avatar alt="Icon" src={user4} sx={{ width: 60, height: 60 }} />
    </Box>
    <Typography variant="h5" color="textPrimary">
      Owner Details
    </Typography>
  </DialogTitle>
  <DialogContent dividers>
    {selectedOwner && (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          gap: 2,
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {selectedOwner.firstName} {selectedOwner.lastName}
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="body1" color="textSecondary">
            <strong>Email:</strong> {selectedOwner.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Phone:</strong> {selectedOwner.phone}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="body1" color="textSecondary">
            <strong>Address:</strong> {selectedOwner.address}
          </Typography>
        </Box>

        {/* List of Pets */}
        <Box mt={3} width="100%">
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Pets
          </Typography>
          {selectedOwner.patients.map((patient, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                padding: 2,
                marginTop: 2,
                backgroundColor: "#f9f9f9",
                width: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {patient.name}
              </Typography>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Species:</strong> {patient.species}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Breed:</strong> {patient.breed}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Gender:</strong> {patient.gender}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Weight:</strong> {patient.weight} kg
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body1" color="textSecondary">
                  <strong>Birth Date:</strong> {patient.birthDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Neutered:</strong> {patient.isNeutered ? "Yes" : "No"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )}
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button
      onClick={handleCloseOwnerDialog}
      variant="contained"
      color="primary"
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </Container>
  );
};

export default OwnersAndPatients;
