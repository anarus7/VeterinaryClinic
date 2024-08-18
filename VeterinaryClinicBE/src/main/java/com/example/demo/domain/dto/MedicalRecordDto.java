package com.example.demo.domain.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedicalRecordDto {

    private LocalDate recordDate;

    private String vetNotes;

    private UserDto vetInCharge;
}
