package com.example.demo.domain.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.sql.Date;


@Data
@SuperBuilder
@NoArgsConstructor
@Entity
@Setter
@Table(name="appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "appointment_id_seq")
    @SequenceGenerator(name=  "appointment_id_seq", allocationSize = 1)
    @Column(name="id")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @Column(name="date")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "vet_id")
    private User vet;

    private String reason;
}