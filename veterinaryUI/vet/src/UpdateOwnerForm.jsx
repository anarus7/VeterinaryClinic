import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const UpdateOwnerForm = ({ open, onClose, onOwnerUpdated, owner }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    id: null
  });

  useEffect(() => {
    if (owner) {
      setFormData({
        firstName: owner.firstName || "",
        lastName: owner.lastName || "",
        email: owner.email || "",
        phone: owner.phone || "",
        address: owner.address || "",
        id: owner.id || null
      });
    }
  }, [owner]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Submitting update with data:", formData); // Debugging log
    try {
      const response = await fetch(`http://localhost:8081/owner/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get response text to debug
        throw new Error(`Failed to update owner: ${errorText}`);
      }

      onOwnerUpdated(); // Callback to refresh the owner list
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating owner:", error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Owner</DialogTitle>
      <DialogContent>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOwnerForm;
