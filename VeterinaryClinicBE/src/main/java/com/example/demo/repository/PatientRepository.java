package com.example.demo.repository;

import com.example.demo.domain.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PatientRepository extends JpaRepository<Patient, Long> {

     List<Patient> findByNameContainingIgnoreCase(String username);
     List<Patient> findBySpecies(String species);
}
