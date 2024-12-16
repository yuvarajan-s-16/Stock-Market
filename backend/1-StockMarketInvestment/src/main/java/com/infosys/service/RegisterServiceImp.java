package com.infosys.service;
 
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
 
import com.infosys.entity.Register;

import com.infosys.repo.RegisterRepo;
 
@Service

public class RegisterServiceImp implements RegisterService {
 
	@Autowired private RegisterRepo repo;

	@Override

	public Register saveNewUser(Register register) {

		return repo.save(register);

	}
 
	@Override
	public Register login(String email,String password) {
		
		 Register register = repo.findByEmail(email);
	        
	        if (register != null && register.getPassword().equals(password)) {
	            return register; 
	        } else {
	            return null;
	        }
	}
 
}