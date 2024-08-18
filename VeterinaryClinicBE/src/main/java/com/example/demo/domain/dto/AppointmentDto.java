package com.example.demo.domain.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class AppointmentDto {

//
    private Long id;
    private Long patientId;
    private Date date;
    private Long vetId;
    private String reason;

}
