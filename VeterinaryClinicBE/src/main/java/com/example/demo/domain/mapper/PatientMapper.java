package com.example.demo.domain.mapper;

import com.example.demo.domain.dto.*;
import com.example.demo.domain.model.MedicalRecord;
import com.example.demo.domain.model.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface PatientMapper {


    Patient toEntity(PatientDto patientDto);

    PatientDto toDto(Patient patient);

    List<PatientDto> toListViewDto(List<Patient> patientList);

    PatientMedicalRecordDto patientMedicalRecordDto(Patient patient);

    MedicalRecordDto toMedicalRecordDto(MedicalRecord medicalRecord);






}
