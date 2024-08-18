import React, { useEffect, useState } from "react";
import styled from "styled-components";
import homepage1 from "../src/pictures/homepage1.png";
import homepage2 from "../src/pictures/homepage2.png";
import icon3 from "../src/pictures/icon3.png";
import paw from "../src/pictures/paw.png";
import CustomButton from "../src/CustomButton.js";
import dog7 from "../src/pictures/dog7.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  position: relative; /* Required for positioning the pseudo-elements */
`;

const Title = styled.h1`
  font-size: 30px;
  line-height: 1.5em;
  margin-top: 0; /* Reset margin-top to 0 */
  padding: 20px 40px; /* Add padding around the text */
  font-family: "Playfair Display", serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  position: relative; /* Required for pseudo-elements positioning */
  z-index: 1; /* Ensure title is above other elements */
  background: linear-gradient(30deg, #0048bd, #44a7fd);
  border-radius: 24px; /* Increased border-radius for a rounder effect */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
  width: fit-content; /* Adjust the width to fit the content */
  margin: 0 auto; /* Center the title horizontally */
  
  &::before {
    position: absolute;
    left: 50%;
    margin-left: -30%;
    bottom: 20px;
    width: 60%;
    height: 1px;
    content: "";
    background-color: #777;
    z-index: 4;
  }

  &::after {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: 0;
    width: 40px;
    height: 40px;
    content: '\00a7';
    font-size: 30px;
    line-height: 40px;
    color: #c50000;
    font-weight: 400;
    z-index: 5;
    display: block;
    background-color: #f8f8f8;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px; /* Space between text and icon */
  vertical-align: middle; /* Align icon with text */
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  margin: 16px 0; /* Add some margin to separate from the title */
`;

const PawImage = styled.img`
  position: absolute;
  width: 60px; /* Adjust the size as needed */
  height: 50px;
  opacity: 10;
  transition: opacity 0.5s ease-in-out;
  z-index: -2;
`;

const PawImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none; /* Ensure paw images do not interfere with interactions */
  overflow: hidden;
`;

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position and set visibility accordingly
      const scrollTop = window.scrollY;
      setVisible(scrollTop > 100); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Title>Welcome to the Veterinary App</Title>
      <Icon src={icon3} alt="Icon 3" />
      <p>Always here for your pets</p>
      <CustomButton
        onClick={() =>
          (window.location.href = "http://localhost:3000/OwnersAndPatients")
        }
      >
        Get Started
      </CustomButton>
      <ImageContainer>
        <img src={homepage1} alt="Homepage 1" style={{ width: "20%" }} />
        <img src={homepage2} alt="Homepage 2" style={{ width: "15%" }} />
        <img src={dog7} alt="dog7" style={{ width: "10%" }} />
      </ImageContainer>
      {/* Repeat the paw image */}
      <PawImageContainer>
        {/* Right side */}
        <PawImage
          src={paw}
          style={{ top: "500px", left: "60%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "70%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "80%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "90%", opacity: visible ? 1 : 0 }}
        />
        
        {/* Left side */}
        <PawImage
          src={paw}
          style={{ top: "500px", left: "10%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "20%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "30%", opacity: visible ? 1 : 0 }}
        />
        <PawImage
          src={paw}
          style={{ top: "500px", left: "40%", opacity: visible ? 1 : 0 }}
        />
      </PawImageContainer>
    </Container>
  );
};

export default Home;
