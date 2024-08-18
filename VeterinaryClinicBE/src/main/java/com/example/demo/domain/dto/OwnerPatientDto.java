package com.example.demo.domain.dto;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Data
public class OwnerPatientDto {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;

    private Set<PatientDto> patients=new HashSet<>();
}
