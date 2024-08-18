package com.example.demo.service;

import com.example.demo.domain.dto.MedicalRecordDto;
import com.example.demo.domain.dto.PatientMedicalRecordDto;
import jakarta.transaction.Transactional;

import java.util.List;

public interface MedicalRecordService {

    public List<MedicalRecordDto> getMedicalRecordsByPatientId(Long patientId);

    public MedicalRecordDto getMedicalRecordById(Long id);
}