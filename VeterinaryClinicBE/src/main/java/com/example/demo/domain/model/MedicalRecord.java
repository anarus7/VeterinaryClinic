package com.example.demo.domain.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
@Table(name = "medical_record")
@Data
@SuperBuilder
@NoArgsConstructor
@Entity
@Setter

public class MedicalRecord  {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "medical_record_id_seq")
    @SequenceGenerator(name= "medical_record_id_seq", allocationSize = 1)
    @Column(name="id")
    private Integer id;


    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private LocalDate recordDate;

    private String vetNotes;

    @ManyToOne
    private User vetInCharge;

}