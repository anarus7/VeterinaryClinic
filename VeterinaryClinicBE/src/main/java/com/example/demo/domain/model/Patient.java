package com.example.demo.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@Setter
@Table(name ="patient")
public class Patient  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "patient_id_seq")
    @SequenceGenerator(name= "patient_id_seq", allocationSize = 1)
    @Column(name="id")
    private Long id;
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String name;
    private long microchip;
    private String species;
    @Size(min = 1, max = 50, message = "Breed must be between 1 and 50 characters")
    private String breed;
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;
    @Enumerated(value = EnumType.STRING)
    private Gender gender;
    private Double weight;
    private Boolean isNeutered;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="owner_id")
    private Owner owner;
    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MedicalRecord> medicalRecords ;

    @OneToMany(mappedBy = "patient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Appointment> appointments;


    @Override
    public String toString() {
        return "Patient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", microchip=" + microchip +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", birthDate=" + birthDate +
                ", gender=" + gender +
                ", weight=" + weight +
                ", isNeutered=" + isNeutered +
                '}';
    }
}

