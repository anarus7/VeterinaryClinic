package com.example.demo.service;

import com.example.demo.domain.dto.*;
import com.example.demo.domain.model.Patient;

import java.util.List;

public interface PatientService {


    List<PatientDto> findAll();

    PatientDto findPatientByID(Long id);

    void savePatient(PatientDto patientDto);

    void deletePatient(Long id);

    PatientMedicalRecordDto findMedicalRecordByPatientID(Long id);

   List<PatientDto> findByName(String name);

   List<PatientDto> findBySpecies(String species);

   void updatePatient(Long id, PatientDto patientDto); // New method for updating a patient




}
