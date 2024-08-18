import React from "react";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import cat1 from "../src/pictures/cat1.png"; // Import the cat image

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} PaperProps={{ className: "sidebar" }}>
      <List>
        {[
          { text: "Home", to: "/" },
          { text: "Patients", to: "/patients" },
          { text: "Owners", to: "/owners" },
          { text: "Appointments", to: "/about" },
          { text: "Owners and Patients", to: "/OwnersAndPatients" },
        ].map((item, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={item.to}
            className="sidebar-link"
            onClick={onClose} // Close sidebar when a link is clicked
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box className="cat-image-container">
        <img src={cat1} alt="Cat" className="cat-image" />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
