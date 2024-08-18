package com.example.demo.domain.dto;

import com.example.demo.domain.model.Gender;
import com.example.demo.domain.model.MedicalRecord;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class PatientMedicalRecordDto {

    private String name;
    private long microchip;
    private String species;
    private String breed;
    private LocalDate birthDate;
    private Gender gender;
    private Double weight;
    private Boolean isNeutered;
    private Set<MedicalRecordDto> medicalRecords=new HashSet<>() ;

}
