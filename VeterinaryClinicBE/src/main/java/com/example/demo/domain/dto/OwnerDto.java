package com.example.demo.domain.dto;

import lombok.Data;

@Data
public class OwnerDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;


}
