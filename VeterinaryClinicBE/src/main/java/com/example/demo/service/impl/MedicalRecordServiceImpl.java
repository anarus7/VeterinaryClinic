package com.example.demo.service.impl;

import com.example.demo.domain.dto.MedicalRecordDto;
import com.example.demo.domain.mapper.MedicalRecordMapper;
import com.example.demo.domain.model.MedicalRecord;
import com.example.demo.repository.MedicalRecordRepository;
import com.example.demo.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordMapper medicalRecordMapper;


    public List<MedicalRecordDto> getMedicalRecordsByPatientId(Long patientId) {
        List<MedicalRecord> records = medicalRecordRepository.findByPatientId(patientId);
        return medicalRecordMapper.toDtoList(records);
    }

    public MedicalRecordDto getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id)
                .map(medicalRecordMapper::toDto)
                .orElseThrow(() -> new NoSuchElementException("Medical record not found"));
    }


}
