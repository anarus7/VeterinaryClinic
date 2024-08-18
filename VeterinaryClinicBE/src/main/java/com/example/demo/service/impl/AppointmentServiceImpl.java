package com.example.demo.service.impl;

import com.example.demo.domain.dto.AppointmentDto;
import com.example.demo.domain.mapper.AppointmentMapper;
import com.example.demo.domain.model.Appointment;
import com.example.demo.domain.model.Patient;
import com.example.demo.domain.model.User;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AppointmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public AppointmentDto createAppointment(AppointmentDto appointmentDto) {
        Patient patient = patientRepository.findById(appointmentDto.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        User vet = userRepository.findById(appointmentDto.getVetId())
                .orElseThrow(() -> new IllegalArgumentException("Vet not found"));

        Appointment appointment = appointmentMapper.toEntity(appointmentDto);
        appointment.setPatient(patient);
        appointment.setVet(vet);

        appointment = appointmentRepository.save(appointment);

        return appointmentMapper.toDto(appointment);
    }

    @Override
    public List<AppointmentDto> findAll() {
        return appointmentRepository.findAll().stream().map(appointmentMapper::toDto).toList();
    }

    @Override
    public AppointmentDto findAppointmentById(Long id) {
        return appointmentRepository.findById(id).map(appointmentMapper::toDto).orElse(null);
    }

    @Override
    public void deleteAppointmentById(Long id) {
        appointmentRepository.deleteById(id);

    }

}

