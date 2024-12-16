package com.infosys.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.entity.Register;
@Repository 
public interface RegisterRepo extends JpaRepository<Register, Integer> {
	
	Register findByEmail(String email); 
}