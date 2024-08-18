package com.example.demo.controller;

import com.example.demo.domain.dto.OwnerDto;
import com.example.demo.domain.dto.OwnerPatientDto;
import com.example.demo.service.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;


    @GetMapping
    public List<OwnerDto> getOwners() {
        return  ownerService.findAll();
    }

    @GetMapping("/{id}")
    public OwnerDto getOwner(@PathVariable Long id) {
        return ownerService.findOwnerById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwner(@PathVariable Long id) {
        ownerService.deleteOwner(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createOwner(@RequestBody OwnerDto ownerDto) {
        ownerService.saveOwner(ownerDto);
    }


    @GetMapping("/search")
    public List<OwnerDto> getOwnersByLastName(@RequestParam String lastName) {
        return  ownerService.getOwnersByLastName(lastName);
    }


    @GetMapping("/ownersPatients")
    public List<OwnerPatientDto> getOwnersAndPatients() {
        return  ownerService.findOwnersAndPets();
    }

    @PostMapping("/{ownerId}/assign-patient/{patientId}")
    public ResponseEntity<Void> assignPatientToOwner(
            @PathVariable Long ownerId,
            @PathVariable Long patientId) {
        try {
            ownerService.assignPatientToOwner(ownerId, patientId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateOwner(@PathVariable Long id, @RequestBody OwnerDto ownerDto) {
        // Ensure the ID in the path matches the ID in the request body
        if (!id.equals(ownerDto.getId())) {
            return ResponseEntity.badRequest().build();
        }

        // Check if the owner exists
        OwnerDto existingOwner = ownerService.findOwnerById(id);
        if (existingOwner == null) {
            return ResponseEntity.notFound().build();
        }

        // Update owner
        ownerService.updateOneOwner(id, ownerDto);

        return ResponseEntity.noContent().build();
    }



}
