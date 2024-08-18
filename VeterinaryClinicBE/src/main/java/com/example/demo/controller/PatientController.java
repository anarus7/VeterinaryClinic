package com.example.demo.controller;

import com.example.demo.domain.dto.PatientDto;
import com.example.demo.domain.dto.PatientMedicalRecordDto;
import com.example.demo.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    public List<PatientDto> getPatients() {
        return patientService.findAll();
    }
    @GetMapping("/search")
    public List<PatientDto> getPatientByName(@RequestParam String name) {
        return patientService.findByName(name);
    }

    @GetMapping("/species")

    public List<PatientDto>getPatientBySpecies(@RequestParam String species) {
        return patientService.findBySpecies(species);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public PatientDto getPatient(@PathVariable Long id) {
        return patientService.findPatientByID(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPatient(@RequestBody PatientDto patientDto) {
        patientService.savePatient(patientDto);
    }

    @GetMapping("/{id}/medical-record-vetdetails")
    public ResponseEntity<PatientMedicalRecordDto> findMedicalRecordByPatientID(@PathVariable Long id) {
        PatientMedicalRecordDto medicalRecordDto = patientService.findMedicalRecordByPatientID(id);
        if (medicalRecordDto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(medicalRecordDto);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePatient(@PathVariable Long id, @RequestBody PatientDto patientDto) {
        if (!id.equals(patientDto.getId())) {
            return ResponseEntity.badRequest().build();
        }
        PatientDto existingPatient = patientService.findPatientByID(id);
        if (existingPatient == null) {
            return ResponseEntity.notFound().build();
        }

        // Update patient
        patientService.updatePatient(id, patientDto);

        return ResponseEntity.noContent().build();
    }
}
