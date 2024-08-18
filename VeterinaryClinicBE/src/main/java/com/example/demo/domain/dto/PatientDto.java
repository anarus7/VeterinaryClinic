package com.example.demo.domain.dto;

import com.example.demo.domain.model.Gender;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientDto {
    private Long id;
    private String name;
    private long microchip;
    private String species;
    private String breed;
    private LocalDate birthDate;
    private Gender gender;
    private Double weight;
    private Boolean isNeutered;
    private Long ownerId;

}
