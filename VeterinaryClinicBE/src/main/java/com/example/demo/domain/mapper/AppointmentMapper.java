package com.example.demo.domain.mapper;

import com.example.demo.domain.dto.AppointmentDto;
import com.example.demo.domain.model.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface AppointmentMapper {

    @Mapping(source = "patientId", target = "patient.id")
    @Mapping(source = "vetId", target = "vet.id")
    Appointment toEntity(AppointmentDto appointmentDto);
    @Mapping(source = "patient.id", target = "patientId")
    @Mapping(source = "vet.id", target = "vetId")
    AppointmentDto toDto(Appointment appointment);


}
