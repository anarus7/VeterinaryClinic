import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import toast from "react-hot-toast";
import AddAppointmentForm from "./AddAppointmentForm";
import AppointmentDetails from "./AppointmentDetails"; // Import the new component
import "./About.css"; // Import the CSS file
import heart from "../src/pictures/heart.gif";
import app from "../src/pictures/app.png"; // Import the app icon
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import image1 from "../src/pictures/image1.png"; // Import image1
import cat from "../src/pictures/cat.png"; // Import cat image

const About = () => {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [vets, setVets] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [showList, setShowList] = useState(false); // New state for list visibility

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/appointments");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setAppointments(data);
            setInitialEvents(
                data.map((appointment) => ({
                    id: appointment.id,
                    title: appointment.reason,
                    date: appointment.date,
                }))
            );
            toast.success("Successfully loaded appointments");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchVets = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8081/user");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                const vets = data.filter((user) => user.userType === "VET");
                setVets(vets);
                console.log("Fetched Vets:", vets); // Debugging line
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchPatients = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8081/patient");
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setPatients(data);
                console.log("Fetched Patients:", data); // Debugging line
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        fetchVets();
        fetchPatients();
    }, []);

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    };

    const handleDateSelect = (selectInfo) => {
        setSelectedDate(selectInfo.startStr);
        setAddAppointmentOpen(true);
    };

    const handleEventClick = async (clickInfo) => {
        const appointmentId = clickInfo.event.id;
        try {
            const response = await fetch(`http://localhost:8081/appointments/${appointmentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const clickedEvent = await response.json();
            const vet = vets.find(vet => vet.id === clickedEvent.vetId) || { name: "Unknown" };
            const patient = patients.find(patient => patient.id === clickedEvent.patientId) || { name: "Unknown" };
            setAppointmentDetails({
                id: clickedEvent.id,
                reason: clickedEvent.reason,
                date: clickedEvent.date,
                vetName: vet.name,
                patientName: patient.name,
                notes: clickedEvent.notes || "No additional notes",
            });
            setDetailsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching appointment details:", error);
            toast.error("Failed to fetch appointment details");
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete the appointment?")) {
            try {
                await fetch(`http://localhost:8081/appointments/${eventId}`, {
                    method: "DELETE",
                });
                fetchAppointments(); // Refresh the calendar after deletion
                toast.success("Appointment deleted successfully");
            } catch (error) {
                toast.error("Failed to delete the appointment");
            }
        }
    };

    const handleEvents = (events) => {
        setCurrentEvents(events);
    };

    const renderEventContent = (eventInfo) => (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="body2">
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </Typography>
            <img
                src={app}
                alt="Appointment Icon"
                className="appointment-icon"
                onClick={() => handleEventClick(eventInfo)}
            />
            <IconButton
                onClick={() => handleDelete(eventInfo.event.id)}
                size="small"
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );

    const handleAddAppointmentClose = () => {
        setAddAppointmentOpen(false);
    };

    const handleAppointmentAdded = async () => {
        setAddAppointmentOpen(false);
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8081/appointments");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setAppointments(data);
            setInitialEvents(
                data.map((appointment) => ({
                    id: appointment.id,
                    title: appointment.reason,
                    date: appointment.date,
                }))
            );
            toast.success("Appointments updated successfully");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div className="about-container">
            {/* Heart Image Above Title */}
            <Box display="flex" justifyContent="center" mb={2}>
                <img src={heart} alt="Heart" className="heart-image" />
            </Box>
            {/* Title and Cat Image Container */}
            <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
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
                        textAlign: "center",
                        marginRight: 2, // Space between title and image
                    }}
                >
                    Book Appointment
                </Typography>
                <Box
                    component="img"
                    src={cat}
                    alt="Cat"
                    sx={{
                        width: 150, // Adjust size as needed
                        height: 'auto',
                    }}
                />
            </Box>

            <AddAppointmentForm
                open={addAppointmentOpen}
                onClose={handleAddAppointmentClose}
                onAppointmentAdded={handleAppointmentAdded}
                selectedDate={selectedDate}
                vets={vets}
                patients={patients}
            />
            <Box className="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    events={initialEvents}
                    select={handleDateSelect}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    eventsSet={handleEvents}
                />
            </Box>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowList(!showList)} // Toggle the list visibility
                sx={{ mt: 2 }}
            >
                {showList ? "Hide Appointments List" : "Show Appointments List"}
            </Button>

            {/* Appointments List */}
            {showList && (
                <Box
                    sx={{
                        width: 'fit-content',   // Make the box width fit its content
                        margin: '0 auto',       // Center the box horizontally
                        backgroundColor: '#f0f0f0', // Light background color for contrast
                        borderRadius: 2,        // Rounded corners
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Soft shadow for a subtle lift
                        p: 2,                  // Padding inside the box
                        mb: 2,                 // Margin below the box
                        textAlign: 'center',   // Center align the text inside
                    }}
                >
                    <Typography
                        variant="h6"
                        mb={2}
                        sx={{
                            fontWeight: 'bold',  // Make the font bold
                            color: '#333',       // Darker text color for better readability
                            fontSize: '1.25rem', // Adjust font size to make it a bit smaller
                            paddingBottom: '8px', // Add some padding below the text
                        }}
                    >
                        Appointments List
                    </Typography>
                    <List
                        sx={{
                            padding: 0,  // Remove padding from the List
                            margin: 0,   // Remove margin from the List
                        }}
                    >
                        {appointments.map((appointment) => (
                            <ListItem
                                key={appointment.id}
                                sx={{
                                    backgroundColor: '#ffffff', // White background for each list item
                                    borderRadius: 1,            // Rounded corners for list items
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)', // Light shadow for list items
                                    mb: 1,                      // Margin bottom for spacing between items
                                    p: 1,                       // Padding inside each list item
                                    display: 'flex',            // Flexbox for layout
                                    justifyContent: 'space-between', // Space items apart
                                    alignItems: 'center',       // Center items vertically
                                    '&:hover': {                // Hover effect for better interaction
                                        backgroundColor: '#e0e0e0', // Light grey background on hover
                                    },
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        Reason: {appointment.reason}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Patient: {patients.find(p => p.id === appointment.patientId)?.name || "Unknown"}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'center' }}>
                                    <Typography variant="body2">
                                        Vet: {vets.find(v => v.id === appointment.vetId)?.firstName || "Unknown"} {vets.find(v => v.id === appointment.vetId)?.lastName || ""}
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, textAlign: 'right' }}>
                                    <Typography variant="body2">
                                        Date: {new Date(appointment.date).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Appointment Details Dialog */}
            <AppointmentDetails
                open={detailsDialogOpen}
                onClose={() => setDetailsDialogOpen(false)}
                details={appointmentDetails}
            />

            {/* Image in Bottom Left Corner */}
            <Box className="bottom-left-image">
                <img src={image1} alt="Decorative" />
            </Box>
        </div>
    );
};

export default About;
