package com.example.demo.domain.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@SuperBuilder
@Getter
@Setter
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "users_id_seq")
    @SequenceGenerator(name= "users_id_seq", allocationSize = 1)
    @Column(name="id")
    private Long id;

    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    @Enumerated(value = EnumType.STRING)
    private UserRole userType;

}
