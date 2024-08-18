package com.example.demo.domain.dto;

import com.example.demo.domain.model.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String userName;

    private String password;
    private String firstName;
    private String lastName;

    private String email;

    private String phone;

    private UserRole userType;
}
