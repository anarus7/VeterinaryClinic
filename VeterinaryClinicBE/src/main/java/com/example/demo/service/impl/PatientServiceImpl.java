package com.example.demo.service.impl;

import com.example.demo.domain.dto.PatientDto;
import com.example.demo.domain.dto.PatientMedicalRecordDto;
import com.example.demo.domain.mapper.PatientMapper;
import com.example.demo.domain.model.Owner;
import com.example.demo.domain.model.Patient;
import com.example.demo.repository.OwnerRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.service.PatientService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

  private final PatientMapper patientMapper;
  private final PatientRepository patientRepository;
  private final OwnerRepository ownerRepository;


  @Override
  @Transactional

  public List<PatientDto> findAll() {
    List<Patient> patients = patientRepository.findAll();
    return patientMapper.toListViewDto(patients);
  }

  @Override
  @Transactional

  public PatientDto findPatientByID(Long id) {
    Patient patient = patientRepository.findById(id).orElse(null);
    return patientMapper.toDto(patient);
  }

  @Override
  @Transactional

  public void savePatient(PatientDto patientDto) {
    Patient patient = patientMapper.toEntity(patientDto);
    if (Objects.nonNull(patientDto.getOwnerId())) {
      ownerRepository.findById(patientDto.getOwnerId())
          .ifPresent((owner) -> owner.addPatient(patient));
    }
    patientRepository.save(patient);
  }

  @Override
  @Transactional

  public void deletePatient(Long id) {
    patientRepository.deleteById(id);
  }

  @Override
  @Transactional

  public PatientMedicalRecordDto findMedicalRecordByPatientID(Long id) {
    Patient patient = patientRepository.findById(id).orElse(null);
    if (patient == null) {
      return null;
    }
    return patientMapper.patientMedicalRecordDto(patient);

  }

  @Override
  public List<PatientDto> findByName(String name) {
    List<Patient> patients=patientRepository.findByNameContainingIgnoreCase(name);
    return patientMapper.toListViewDto(patients);
  }

  @Override
  public List<PatientDto> findBySpecies(String species) {
    List<Patient> patient=patientRepository.findBySpecies(species);
    return patientMapper.toListViewDto(patient);
  }

    @Override
    @Transactional
    public void updatePatient(Long id, PatientDto patientDto) {
      Patient patient = patientRepository.findById(id).orElse(null);
      if (patient != null) {
        patient.setName(patientDto.getName());
        patient.setSpecies(patientDto.getSpecies());
        patient.setBreed(patientDto.getBreed());
        patient.setBirthDate(patientDto.getBirthDate());
        patient.setGender(patientDto.getGender());
        patient.setWeight(patientDto.getWeight());
        patient.setIsNeutered(patientDto.getIsNeutered());
        // Update any other fields as needed

        if (Objects.nonNull(patientDto.getOwnerId())) {
          Owner owner = ownerRepository.findById(patientDto.getOwnerId()).orElse(null);
          if (owner != null) {
            patient.setOwner(owner);
          }
        }
        patientRepository.save(patient);
      }
    }
  }
