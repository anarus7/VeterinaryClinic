package com.example.demo.service.impl;

import com.example.demo.domain.dto.OwnerDto;
import com.example.demo.domain.dto.OwnerPatientDto;
import com.example.demo.domain.mapper.OwnerMapper;
import com.example.demo.domain.model.Owner;
import com.example.demo.domain.model.Patient;
import com.example.demo.repository.OwnerRepository;
import com.example.demo.repository.PatientRepository;
import com.example.demo.service.OwnerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;
    private final OwnerMapper ownerMapper;
    private final PatientRepository ownerPatientRepository;
    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public List<OwnerDto> findAll() {
        List<Owner> owners = ownerRepository.findAll();
        return ownerMapper.toListViewDto(owners);
    }

    @Override
    public List<OwnerPatientDto> findOwnersAndPets() {
        List<Owner> owners = ownerRepository.findAll();
        return ownerMapper.toListViewOwnersPets(owners);
    }



    @Override
    @Transactional
    public OwnerDto findOwnerById(Long id) {
         Owner owner=ownerRepository.findById(id).orElse(null);
         return ownerMapper.toViewDto(owner);
    }

    @Override
    @Transactional
    public void saveOwner(OwnerDto owner) {
        Owner ownerEntity = ownerMapper.toEntity(owner);
        ownerRepository.save(ownerEntity);
    }


    @Override
    @Transactional
    public void deleteOwner(Long id) {
       ownerRepository.deleteById(id);
    }


    @Override
    public List<OwnerDto> getOwnersByLastName(String lastName) {
       List<Owner> owners= ownerRepository.findOwnerByFirstNameContainingIgnoreCase(lastName);
        return ownerMapper.toListViewDto(owners);
    }

    @Override
    public void assignPatientToOwner(Long ownerId, Long patientId) {
        // Fetch the owner and patient from their respective repositories
        Optional<Owner> optionalOwner = ownerRepository.findById(ownerId);
        Optional<Patient> optionalPatient = patientRepository.findById(patientId);

        // Check if the owner and patient exist
//        if (optionalOwner.isEmpty()) {
//            throw new ResourceNotFoundException("Owner with ID " + ownerId + " not found");
//        }
//        if (optionalPatient.isEmpty()) {
//            throw new ResourceNotFoundException("Patient with ID " + patientId + " not found");
//        }

        // Get the actual Owner and Patient objects
        Owner owner = optionalOwner.get();
        Patient patient = optionalPatient.get();

        // Assign the patient to the owner
        owner.getPatients().add(patient);

        // Save the updated owner
        ownerRepository.save(owner);
    }

    @Override
    public void updateOneOwner(Long id, OwnerDto ownerDto ){
        // Ensure that the ID exists
        Owner existingOwner = ownerRepository.findById(id).orElseThrow(() -> new RuntimeException("Owner not found"));

        // Update fields except the ID
        existingOwner.setFirstName(ownerDto.getFirstName());
        existingOwner.setLastName(ownerDto.getLastName());
        existingOwner.setEmail(ownerDto.getEmail());
        existingOwner.setPhone(ownerDto.getPhone());
        existingOwner.setAddress(ownerDto.getAddress());

        // Save updated owner
        ownerRepository.save(existingOwner);
    }
    }

