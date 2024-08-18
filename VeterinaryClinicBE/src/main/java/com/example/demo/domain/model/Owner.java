package com.example.demo.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@Setter
@Table(name = "owner")
public class Owner  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "owner_id_seq")
    @SequenceGenerator(name= "owner_id_seq", allocationSize = 1)
    @Column(name="id")
    private Integer id;
    @NotBlank(message = "First name cannot be blank")
    @Size(min = 1, max = 50, message = "First name must be between 1 and 50 characters")
    private String firstName;
    @Size(min = 1, max = 50, message = "Last name must be between 1 and 50 characters")
    private String lastName;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;
    @Pattern(regexp = "^\\+?\\d{5,15}$", message = "Phone number must be between 5 and 15 digits, optionally starting with '+'")
    private String phone;
    @Size(max = 255, message = "Address cannot exceed 255 characters")
    private String address;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Patient> patients;

    @Override
    public String toString() {
        return "Owner{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    public void addPatient(Patient patient) {
        this.patients.add(patient);
        patient.setOwner(this);
    }
}
