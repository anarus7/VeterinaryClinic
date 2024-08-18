import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  Avatar
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AddOwnerForm from "./AddOwnerForm";
import UpdateOwnerForm from "./UpdateOwnerForm";
import owner3 from "../src/pictures/owner3.png";
import i1 from "../src/card_pictures/i1.png";
import i2 from "../src/card_pictures/i2.png";
import i3 from "../src/card_pictures/i3.png";

const icons = [i1, i2, i3];

const getIconForOwner = (index) => {
  return icons[index % icons.length];
};

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addOwnerOpen, setAddOwnerOpen] = useState(false);
  const [updateOwnerOpen, setUpdateOwnerOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("http://localhost:8081/owner");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOwners(data);
        setFilteredOwners(data);
        toast.success("Successfully loaded owners");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    const fetchOwnersByLastName = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(
            `http://localhost:8081/owner/search?lastName=${searchQuery}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setFilteredOwners(data);
        } catch (error) {
          setError(error.message);
        }
      } else {
        setFilteredOwners(owners);
      }
    };

    fetchOwnersByLastName();
  }, [searchQuery, owners]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/owner/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setOwners((prevOwners) =>
          prevOwners.filter((owner) => owner.id !== id)
        );
        setFilteredOwners((prevOwners) =>
          prevOwners.filter((owner) => owner.id !== id)
        );
        toast.success("Owner deleted successfully");
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete owner: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting owner:", error.message);
      setError(error.message);
    }
  };

  const handleAddOwnerOpen = () => {
    setAddOwnerOpen(true);
  };

  const handleAddOwnerClose = () => {
    setAddOwnerOpen(false);
  };

  const handleOwnerAdded = async () => {
    setAddOwnerOpen(false);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/owner");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOwners(data);
      setFilteredOwners(data);
      toast.success("Owners updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOwnerOpen = (owner) => {
    setSelectedOwner(owner);
    setUpdateOwnerOpen(true);
  };

  const handleUpdateOwnerClose = () => {
    setUpdateOwnerOpen(false);
    setSelectedOwner(null);
  };

  const handleOwnerUpdated = async () => {
    setUpdateOwnerOpen(false);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/owner");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOwners(data);
      setFilteredOwners(data);
      toast.success("Owners updated successfully");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
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
      p={2} // Added padding for consistent spacing
      sx={{
        background: "linear-gradient(30deg, #0048bd, #44a7fd)",
        borderRadius: "24px", // Increased border-radius for a rounder effect
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        width: "fit-content", // Make sure the width is adjusted to fit the content
        margin: "0 auto", // Center the title horizontally
      }}
    >
      <Typography variant="h4" component="h1" color="white">
        Owners
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <TextField
          label="Search by last name"
          variant="outlined"
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ maxWidth: 600 }} // Make the search field longer
        />
        <Box mx={2}>
          <img src={owner3} alt="Owner" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOwnerOpen}
        >
          Add Owner
        </Button>
      </Box>
      <Grid container spacing={2}>
        {filteredOwners.map((owner, index) => (
          <Grid item xs={12} sm={6} md={3} key={owner.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Box display="flex" justifyContent="center" mb={1}>
                  <Avatar
                    alt={`Owner Icon ${index + 1}`}
                    src={getIconForOwner(index)}
                    sx={{ width: 60, height: 60 }} // Resize the icon
                  />
                </Box>
                <Typography variant="h6" color="textPrimary" fontSize="1rem">
                  {owner.firstName} {owner.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                  Address: {owner.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                  Phone: {owner.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontSize="0.875rem">
                  Email: {owner.email}
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(owner.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateOwnerOpen(owner)}
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddOwnerForm
        open={addOwnerOpen}
        onClose={handleAddOwnerClose}
        onOwnerAdded={handleOwnerAdded}
      />
      <UpdateOwnerForm
        open={updateOwnerOpen}
        onClose={handleUpdateOwnerClose}
        onOwnerUpdated={handleOwnerUpdated}
        owner={selectedOwner}
      />
      <Toaster />
    </div>
  );
};

export default Owner;
