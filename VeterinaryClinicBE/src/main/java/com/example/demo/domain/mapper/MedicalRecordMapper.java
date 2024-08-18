package com.example.demo.domain.mapper;

import com.example.demo.domain.dto.MedicalRecordDto;
import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.model.MedicalRecord;
import com.example.demo.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface MedicalRecordMapper {


    @Mapping(source = "vetInCharge", target = "vetInCharge")
    MedicalRecordDto toDto(MedicalRecord medicalRecord);

    @Mapping(source = "vetInCharge", target = "vetInCharge")
    MedicalRecord toEntity(MedicalRecordDto medicalRecordDto);

    List<MedicalRecordDto> toDtoList(List<MedicalRecord> medicalRecords);

    List<MedicalRecord> toEntityList(List<MedicalRecordDto> medicalRecordDtos);

    UserDto toUserDto(User user);

    User toUserEntity(UserDto userDto);
}
