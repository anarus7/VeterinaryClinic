package com.example.demo.service;

import com.example.demo.domain.dto.AppointmentDto;
import com.example.demo.domain.model.Appointment;

import java.util.List;

public interface AppointmentService {


    AppointmentDto createAppointment(AppointmentDto appointmentDto);
    List<AppointmentDto> findAll();

    AppointmentDto findAppointmentById(Long id);
    void deleteAppointmentById(Long id);
}
