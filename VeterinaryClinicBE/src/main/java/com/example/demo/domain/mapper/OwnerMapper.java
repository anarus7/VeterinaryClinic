package com.example.demo.domain.mapper;

import com.example.demo.domain.dto.OwnerDto;
import com.example.demo.domain.dto.OwnerPatientDto;
import com.example.demo.domain.model.Owner;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)

public interface OwnerMapper {

    OwnerDto toViewDto(Owner owner);

    Owner toEntity(OwnerDto ownerDto);

    List<OwnerPatientDto> toListViewOwnersPets(List<Owner> list);

    List<OwnerDto> toListViewDto(List<Owner> ownerList);

    List<Owner> toListView(List<OwnerDto> ownerDtoList);


}
