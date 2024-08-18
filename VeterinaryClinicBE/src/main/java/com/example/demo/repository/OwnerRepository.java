package com.example.demo.repository;

import com.example.demo.domain.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface OwnerRepository extends JpaRepository<Owner, Long> {


    List<Owner> findOwnerByFirstNameContainingIgnoreCase(String username);

    @Query(value = "SELECT * FROM owner o  WHERE o.last_name ILIKE   %:searchName%",nativeQuery = true)
    List<Owner> findOwnersAndPatientsOrderById(@Param("searchName") String searchName);
}
