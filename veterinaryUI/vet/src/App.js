
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import Patient from "./Patient";
import Home from "./Home";
import About from "./About";
import Owners from "./Owners";
import OwnersAndPatients from "./OwnersAndPatients";
import icon8 from "./pictures/icon8.png";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString()); 
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "linear-gradient(30deg, #0048bd, #44a7fd)",
          borderTopRightRadius: "80px",
          borderBottomLeftRadius: "20px",
          height: "80px", // Slightly increased height to center text vertically
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between", // Align items on opposite ends
            alignItems: "center", // Center everything vertically
            padding: "0 0px", // Add padding for better alignment
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              color: "#fff", // Match the text color with the sidebar links
              "&:hover": {
                color: "#3f5efb", // Apply the same hover effect as in the sidebar
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#fff", // Match the text color
                fontSize: "24px", // Adjust font size as necessary
              }}
            >
              Veterinary App
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#fff", // Match the text color
                fontSize: "16px", // Adjust font size as necessary
              }}
            >
              {currentDate} - {currentTime}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* To push content below the AppBar */}
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <Box component="main" sx={{ padding: "20px", marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/about" element={<About />} />
          <Route path="/OwnersAndPatients" element={<OwnersAndPatients />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
