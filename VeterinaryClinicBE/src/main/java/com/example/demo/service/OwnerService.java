package com.example.demo.service;

import com.example.demo.domain.dto.OwnerDto;
import com.example.demo.domain.dto.OwnerPatientDto;

import java.util.List;

public interface OwnerService {


    List<OwnerDto> findAll();

    List<OwnerPatientDto> findOwnersAndPets();

    OwnerDto findOwnerById(Long id);

    void saveOwner(OwnerDto owner);

    void deleteOwner(Long id);

     List<OwnerDto> getOwnersByLastName(String lastName) ;

    void assignPatientToOwner(Long ownerId, Long patientId);

    void updateOneOwner(Long id, OwnerDto owner);
}

