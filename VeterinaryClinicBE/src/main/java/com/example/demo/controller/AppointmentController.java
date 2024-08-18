package com.example.demo.controller;

import com.example.demo.domain.dto.AppointmentDto;
import com.example.demo.domain.dto.OwnerDto;
import com.example.demo.domain.dto.PatientDto;
import com.example.demo.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {


    private final AppointmentService appointmentService;


    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        AppointmentDto createdAppointment = appointmentService.createAppointment(appointmentDto);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @GetMapping
    public List<AppointmentDto> getAppointments() {
        return appointmentService.findAll();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwner(@PathVariable Long id) {
        appointmentService.deleteAppointmentById(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public AppointmentDto getAppointment(@PathVariable Long id) {
        return appointmentService.findAppointmentById(id);
    }


}
